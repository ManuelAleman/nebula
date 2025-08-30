package in.manuelaleman.nebula_api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import in.manuelaleman.nebula_api.document.UserCredits;

public interface UserCreditsRepository extends MongoRepository<UserCredits, String> {

    Optional<UserCredits> findByClerkId(String clerkId);
}
