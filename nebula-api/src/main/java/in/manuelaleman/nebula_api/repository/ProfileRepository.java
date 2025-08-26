package in.manuelaleman.nebula_api.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.manuelaleman.nebula_api.document.ProfileDocument;


@Repository
public interface ProfileRepository extends MongoRepository<ProfileDocument, String>{
    Optional<ProfileDocument> findByEmail(String email);

    Optional<ProfileDocument> findByClerkId(String clerkId);

    Boolean existsByClerkId(String clerkId);
}
