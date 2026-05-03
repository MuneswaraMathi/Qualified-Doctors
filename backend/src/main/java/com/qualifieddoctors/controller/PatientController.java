package com.qualifieddoctors.controller;

import com.qualifieddoctors.model.RegisterPatient;
import com.qualifieddoctors.service.PatientService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@Valid @RequestBody RegisterPatient patient,
                                             HttpSession session) {
        if (patient.getConfirmPassword() == null || !patient.getConfirmPassword().equals(patient.getPassword())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Password and confirmation password do not match."));
        }
        try {
            RegisterPatient savedPatient = patientService.registerPatient(patient);
            session.setAttribute("patient", savedPatient);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "An account with this email already exists."));
        }
    }

    @GetMapping("/myaccount")
    public ResponseEntity<?> getPatientAccount(HttpSession session) {
        RegisterPatient patient = (RegisterPatient) session.getAttribute("patient");
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Unauthorized: Please register or log in."));
        }
        return ResponseEntity.ok(patient);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully."));
    }
}
