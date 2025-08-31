package in.manuelaleman.nebula_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.manuelaleman.nebula_api.document.UserCredits;
import in.manuelaleman.nebula_api.dto.UserCreditsDTO;
import in.manuelaleman.nebula_api.service.UserCreditsService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping(("/users"))
@RequiredArgsConstructor
public class UserCreditsController {

    private final UserCreditsService userCreditsService;
    @GetMapping("/credits")
    public ResponseEntity<?> getUserCredits() {
        UserCredits userCredits = userCreditsService.getUserCredits();
        UserCreditsDTO response =  UserCreditsDTO.builder()
        .credits(userCredits.getCredits())
        .plan(userCredits.getPlan())
        .build();

        return ResponseEntity.ok(response);
    }
    
}
