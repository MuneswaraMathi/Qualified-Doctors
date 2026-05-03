package com.qualifieddoctors.controller;

import com.qualifieddoctors.model.RegisterPatient;
import com.qualifieddoctors.service.PatientService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@Valid @RequestBody RegisterPatient patient,
                                             HttpSession session) {
        RegisterPatient savedPatient = patientService.registerPatient(patient);
        session.setAttribute("patient", savedPatient);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPatient);
    }

    @GetMapping("/myaccount")
    public ResponseEntity<?> getPatientAccount(HttpSession session) {
        RegisterPatient patient = (RegisterPatient) session.getAttribute("patient");
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please register or log in.");
        }
        return ResponseEntity.ok(patient);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully.");
    }
}
