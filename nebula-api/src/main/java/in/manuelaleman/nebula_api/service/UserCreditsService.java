package in.manuelaleman.nebula_api.service;

import org.springframework.stereotype.Service;

import in.manuelaleman.nebula_api.document.UserCredits;
import in.manuelaleman.nebula_api.repository.UserCreditsRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserCreditsService {

    private final ProfileService profileService;
    private final UserCreditsRepository userCreditsRepository;

    public UserCredits createInitialCredits(String clerkId){
        UserCredits userCredits = UserCredits.builder()
        .clerkId(clerkId)
        .credits(5)
        .plan("BASIC")
        .build();

        return userCreditsRepository.save(userCredits);
    }

    public UserCredits getUserCredits(String clerkId){
        return userCreditsRepository.findByClerkId(clerkId)
        .orElseGet(() -> createInitialCredits(clerkId));
    }

    public UserCredits getUserCredits() {
        String clerkId = profileService.getCurrentProfile().getClerkId();
        return getUserCredits(clerkId);
    }

    public Boolean hasEnoughtCredits(int requiredCredits) {
        UserCredits userCredits = getUserCredits();
        return userCredits.getCredits() >= requiredCredits;
    }

    public UserCredits consumeCredit(){
        UserCredits userCredits = getUserCredits();

        if(userCredits.getCredits() <= 0) return null;

        userCredits.setCredits(userCredits.getCredits() - 1);
        return userCreditsRepository.save(userCredits);
    }

}
