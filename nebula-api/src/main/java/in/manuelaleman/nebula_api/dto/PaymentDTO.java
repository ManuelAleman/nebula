package in.manuelaleman.nebula_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDTO {
    private String clerkId;
    private String planId;
    private Long amount;
    private String currency;
    private Integer credits;
    private String paymentMethod;
    private Boolean success;
    private String paymentId;
    private String clientSecret;
    private String message;

}
