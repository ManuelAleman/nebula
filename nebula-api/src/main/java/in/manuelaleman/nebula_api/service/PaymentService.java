package in.manuelaleman.nebula_api.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import in.manuelaleman.nebula_api.document.PaymentTransaction;
import in.manuelaleman.nebula_api.document.ProfileDocument;
import in.manuelaleman.nebula_api.dto.PaymentDTO;
import in.manuelaleman.nebula_api.dto.PaymentVerificationDTO;
import in.manuelaleman.nebula_api.repository.PaymentTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final ProfileService profileService;
    private final UserCreditsService userCreditsService;
    private final PaymentTransactionRepository paymentTransactionRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${frontend.url.redirect.payment}")
    private String redirectUrl;

    public PaymentDTO verifyPayment(PaymentVerificationDTO paymentVerificationDTO) {
        try {
            Stripe.apiKey = stripeSecretKey;

            Session session = Session.retrieve(paymentVerificationDTO.getPaymentId());

            if ("complete".equals(session.getStatus()) && "paid".equals(session.getPaymentStatus())) {

                PaymentTransaction transaction = paymentTransactionRepository
                        .findByPaymentId(session.getId());

                if (transaction != null && "PENDING".equals(transaction.getStatus())) {
                    transaction.setStatus("COMPLETED");
                    paymentTransactionRepository.save(transaction);

                    int creditsToAdd = 0;
                    String plan = "BASIC";

                    switch (transaction.getPlanId()) {
                        case "premium":
                            creditsToAdd = 500;
                            plan = "PREMIUM";
                            break;
                        case "ultimate":
                            creditsToAdd = 5000;
                            plan = "ULTIMATE";
                            break;
                    }

                    if (creditsToAdd > 0) {
                        userCreditsService.addCredits(transaction.getClerkId(), creditsToAdd, plan);
                        updateTransactionStatus(transaction.getPaymentId(), "SUCCESS", creditsToAdd);

                        return PaymentDTO.builder()
                                .success(true)
                                .message("Payment verified and credits added successfully")
                                .paymentId(transaction.getPaymentId())
                                .build();
                    }
                }
            }

            return PaymentDTO.builder()
                    .success(false)
                    .message("Payment not successful")
                    .build();

        } catch (StripeException e) {
            return PaymentDTO.builder()
                    .success(false)
                    .message("Error verifying payment: " + e.getMessage())
                    .build();
        }
    }

    private void updateTransactionStatus(String paymentIntentId, String status, Integer creditsAdded) {
        PaymentTransaction transaction = paymentTransactionRepository.findByPaymentId(paymentIntentId);
        if (transaction != null) {
            transaction.setStatus(status);
            if (creditsAdded != null) {
                transaction.setCreditsAdded(creditsAdded);
            }
            paymentTransactionRepository.save(transaction);
        }
    }

    public PaymentDTO createCheckoutSession(String planId, Long amount) {
        try {
            Stripe.apiKey = stripeSecretKey;

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(
                            System.getenv("FRONTEND_URL") + "/subscription-success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(System.getenv("FRONTEND_URL") + "/subscriptions")
                    .setCustomerEmail(profileService.getCurrentProfile().getEmail())
                    .setLocale(SessionCreateParams.Locale.EN)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(amount)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName(planId)
                                                                    .build())
                                                    .build())
                                    .setQuantity(1L)
                                    .build())
                    .build();

            Session session = Session.create(params);
            ProfileDocument currentProfile = profileService.getCurrentProfile();
            PaymentTransaction transaction = PaymentTransaction.builder()
                    .clerkId(currentProfile.getClerkId())
                    .paymentId(session.getId())
                    .planId(planId)
                    .amount(amount)
                    .currency("usd")
                    .status("PENDING")
                    .transactionDate(LocalDateTime.now())
                    .userEmail(currentProfile.getEmail())
                    .userName(currentProfile.getFirstName() + " " + currentProfile.getLastName())
                    .build();

            paymentTransactionRepository.save(transaction);
            return PaymentDTO.builder()
                    .paymentId(session.getId())
                    .clientSecret(session.getUrl())
                    .success(true)
                    .message("Checkout session created")
                    .build();

        } catch (Exception e) {
            return PaymentDTO.builder()
                    .success(false)
                    .message("Error creating checkout session: " + e.getMessage())
                    .build();
        }
    }

}