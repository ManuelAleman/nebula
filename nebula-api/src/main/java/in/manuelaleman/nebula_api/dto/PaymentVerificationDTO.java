package in.manuelaleman.nebula_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerificationDTO {
    private String paymentId; 
    private String planId;
}
