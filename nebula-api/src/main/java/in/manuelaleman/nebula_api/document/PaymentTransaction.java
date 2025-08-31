package in.manuelaleman.nebula_api.document;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "payment_transaction")
public class PaymentTransaction {
    private String id;
    private String clerkId;
    private String orderId;
    private String paymentId;
    private String planId;
    private Long amount;
    private String currency;
    private int creditsAdded;
    private String status;
    private LocalDateTime transactionDate;
    private String paymentMethod;
    private String cardLast4;
    
    private String userEmail;
    private String userName;
}
