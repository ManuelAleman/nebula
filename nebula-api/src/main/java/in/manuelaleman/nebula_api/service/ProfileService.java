package in.manuelaleman.nebula_api.service;

import java.time.Instant;
import java.util.function.Consumer;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import in.manuelaleman.nebula_api.document.ProfileDocument;
import in.manuelaleman.nebula_api.dto.ProfileDTO;
import in.manuelaleman.nebula_api.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileDTO createProfile(ProfileDTO profileDTO) {
        if (profileRepository.existsByClerkId(profileDTO.getClerkId())) {
            return updateProfile(profileDTO);
        }
        ProfileDocument savedProfile = profileRepository.save(fromDto(profileDTO));

        return toDto(savedProfile);
    }

    public ProfileDTO updateProfile(ProfileDTO profileDTO) {
        ProfileDocument existingProfile = profileRepository.findByClerkId(profileDTO.getClerkId())
                .orElse(null);

        if (existingProfile == null)
            return null;

        updateIfNotEmpty(profileDTO.getEmail(), existingProfile::setEmail);
        updateIfNotEmpty(profileDTO.getFirstName(), existingProfile::setFirstName);
        updateIfNotEmpty(profileDTO.getLastName(), existingProfile::setLastName);
        updateIfNotEmpty(profileDTO.getPhotoUrl(), existingProfile::setPhotoUrl);

        profileRepository.save(existingProfile);

        return toDto(existingProfile);
    }

    public void deleteProfile(String clerkId) {
        ProfileDocument existingProfile = profileRepository.findByClerkId(clerkId).orElse(null);
        if (existingProfile != null)
            profileRepository.delete(existingProfile);
    }

    public ProfileDocument getCurrentProfile() {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new UsernameNotFoundException("User not authenticated");
        }

        String clerkId = SecurityContextHolder.getContext().getAuthentication().getName();
        return profileRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found for clerkId: " + clerkId));
    }

    private void updateIfNotEmpty(String newValue, Consumer<String> setter) {
        if (newValue != null && !newValue.isBlank()) {
            setter.accept(newValue);
        }
    }

    private ProfileDocument fromDto(ProfileDTO dto) {
        return ProfileDocument.builder()
                .clerkId(dto.getClerkId())
                .email(dto.getEmail())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .photoUrl(dto.getPhotoUrl())
                .credits(5)
                .createdAt(Instant.now())
                .build();
    }

    private ProfileDTO toDto(ProfileDocument profile) {
        return ProfileDTO.builder()
                .id(profile.getId())
                .clerkId(profile.getClerkId())
                .email(profile.getEmail())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .photoUrl(profile.getPhotoUrl())
                .credits(profile.getCredits())
                .createdAt(profile.getCreatedAt())
                .build();
    }

    public boolean existsByClerkId(String clerkId) {
        return profileRepository.existsByClerkId(clerkId);
    }
}
