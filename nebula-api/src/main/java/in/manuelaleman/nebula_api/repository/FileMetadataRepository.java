package in.manuelaleman.nebula_api.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import in.manuelaleman.nebula_api.document.FileMetadataDocument;

@Repository
public interface FileMetadataRepository extends MongoRepository<FileMetadataDocument, String> {
    List<FileMetadataDocument> findByClerkId(String clerkId);

    Long countByClerkId(String clerkId);
}
