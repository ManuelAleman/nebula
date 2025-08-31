package in.manuelaleman.nebula_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.manuelaleman.nebula_api.document.PaymentTransaction;
import java.util.List;

@Repository
public interface PaymentTransactionRepository extends MongoRepository<PaymentTransaction, String>{
    List<PaymentTransaction> findByClerkId(String clerkId);

    List<PaymentTransaction>findByClerkIdOrderByTransactionDateDesc(String clerkId);

    List<PaymentTransaction>findByClerkIdAndStatusOrderByTransactionDateDesc(String clerkId, String status);

    PaymentTransaction findByPaymentId(String paymentId);
}
