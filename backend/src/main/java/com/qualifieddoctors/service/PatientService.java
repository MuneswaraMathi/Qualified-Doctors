package com.qualifieddoctors.service;

import com.qualifieddoctors.model.RegisterPatient;
import com.qualifieddoctors.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    private final Random random = new Random();

    public String generatePatientId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        long id = min + (long) (random.nextDouble() * (max - min + 1));
        return String.valueOf(id);
    }

    public RegisterPatient registerPatient(RegisterPatient patient) {
        patient.setPatientId(generatePatientId());
        return patientRepository.save(patient);
    }
}
