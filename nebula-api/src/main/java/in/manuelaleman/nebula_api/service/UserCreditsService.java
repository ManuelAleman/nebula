package in.manuelaleman.nebula_api.service;

import org.springframework.stereotype.Service;

import in.manuelaleman.nebula_api.document.UserCredits;
import in.manuelaleman.nebula_api.repository.UserCreditsRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserCreditsService {
    private final UserCreditsRepository userCreditsRepository;
    public UserCredits createInitialCredits(String clerkId){
        UserCredits userCredits = UserCredits.builder()
        .clerkId(clerkId)
        .credits(5)
        .plan("BASIC")
        .build();

        return userCreditsRepository.save(userCredits);

    }

    public boolean exists(String clerkId) {
        return userCreditsRepository.existsByClerkId(clerkId);
    }
}
