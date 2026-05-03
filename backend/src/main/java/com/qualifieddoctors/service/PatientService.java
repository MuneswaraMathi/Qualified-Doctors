package com.qualifieddoctors.service;

import com.qualifieddoctors.model.RegisterPatient;
import com.qualifieddoctors.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    public String generatePatientId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        String id;
        do {
            long value = min + (long) (random.nextDouble() * (max - min + 1));
            id = String.valueOf(value);
        } while (patientRepository.existsById(id));
        return id;
    }

    public RegisterPatient registerPatient(RegisterPatient patient) {
        patient.setPatientId(generatePatientId());
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return patientRepository.save(patient);
    }
}
