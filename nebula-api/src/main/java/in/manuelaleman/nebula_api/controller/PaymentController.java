package in.manuelaleman.nebula_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.manuelaleman.nebula_api.dto.PaymentDTO;
import in.manuelaleman.nebula_api.dto.PaymentVerificationDTO;
import in.manuelaleman.nebula_api.service.PaymentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationDTO paymentVerificationDTO) {
        PaymentDTO response = paymentService.verifyPayment(paymentVerificationDTO);
        if (response.getSuccess())
            return ResponseEntity.ok(response);
        else
            return ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/create-checkout")
    public ResponseEntity<?> createCheckout(@RequestBody PaymentDTO paymentDTO) {
        PaymentDTO response = paymentService.createCheckoutSession(paymentDTO.getPlanId(), paymentDTO.getAmount());
        if (response.getSuccess())
            return ResponseEntity.ok(response);
        else
            return ResponseEntity.badRequest().body(response);
    }

}
