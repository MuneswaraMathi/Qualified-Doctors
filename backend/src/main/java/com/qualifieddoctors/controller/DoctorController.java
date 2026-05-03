package com.qualifieddoctors.controller;

import com.qualifieddoctors.model.RegisterDoctor;
import com.qualifieddoctors.service.DoctorService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping("/register")
    public ResponseEntity<?> registerDoctor(@Valid @RequestBody RegisterDoctor doctor,
                                            HttpSession session) {
        if (doctor.getConfirmPassword() == null || !doctor.getConfirmPassword().equals(doctor.getPassword())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Password and confirmation password do not match."));
        }
        try {
            RegisterDoctor savedDoctor = doctorService.registerDoctor(doctor);
            session.setAttribute("doctor", savedDoctor);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDoctor);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with this email already exists."));
        }
    }

    @GetMapping("/myaccount")
    public ResponseEntity<?> getDoctorAccount(HttpSession session) {
        RegisterDoctor doctor = (RegisterDoctor) session.getAttribute("doctor");
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Unauthorized: Please register or log in."));
        }
        return ResponseEntity.ok(doctor);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully."));
    }
}
