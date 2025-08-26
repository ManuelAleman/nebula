package in.manuelaleman.nebula_api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.manuelaleman.nebula_api.document.UserCredits;

public interface UserCreditsRepository extends MongoRepository<UserCredits, String> {
    boolean existsByClerkId(String clerkId);
}
