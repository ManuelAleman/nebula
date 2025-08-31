package in.manuelaleman.nebula_api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.manuelaleman.nebula_api.document.PaymentTransaction;
import in.manuelaleman.nebula_api.document.ProfileDocument;
import in.manuelaleman.nebula_api.repository.PaymentTransactionRepository;
import in.manuelaleman.nebula_api.service.ProfileService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {
    
    private final PaymentTransactionRepository paymentTransactionRepository;
    private final ProfileService profileService;

    @GetMapping("/my-transactions")
    public ResponseEntity<?> getUserTransactions() {
        ProfileDocument currentProfile = profileService.getCurrentProfile();
        String clerkId = currentProfile.getClerkId();
        List<PaymentTransaction> transactions = paymentTransactionRepository.findByClerkIdAndStatusOrderByTransactionDateDesc(clerkId, "SUCCESS");
        return ResponseEntity.ok(transactions);

    }
}
