package com.qualifieddoctors.service;

import com.qualifieddoctors.model.LoginRequest;
import com.qualifieddoctors.model.PatientPersonalDetails;
import com.qualifieddoctors.model.RegisterPatient;
import com.qualifieddoctors.repository.PatientPersonalDetailsRepository;
import com.qualifieddoctors.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientPersonalDetailsRepository personalDetailsRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    public String generatePatientId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        String id;
        do {
            long value = min + (random.nextLong() % (max - min + 1) + (max - min + 1)) % (max - min + 1);
            id = String.valueOf(value);
        } while (patientRepository.existsById(id));
        return id;
    }

    public RegisterPatient registerPatient(RegisterPatient patient) {
        patient.setPatientId(generatePatientId());
        patient.setPassword(passwordEncoder.encode(patient.getPassword()));
        return patientRepository.save(patient);
    }

    public Optional<RegisterPatient> login(LoginRequest request) {
        return patientRepository.findByEmail(request.getEmail())
                .filter(patient -> passwordEncoder.matches(request.getPassword(), patient.getPassword()));
    }

    public String generatePersonalDetailId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        String id;
        do {
            long value = min + (random.nextLong() % (max - min + 1) + (max - min + 1)) % (max - min + 1);
            id = String.valueOf(value);
        } while (personalDetailsRepository.existsById(id));
        return id;
    }

    public PatientPersonalDetails addPersonalDetails(PatientPersonalDetails details) {
        Optional<PatientPersonalDetails> existing =
                personalDetailsRepository.findFirstByPatientIdOrderByUpdatedDateTimeDesc(details.getPatientId());
        if (existing.isPresent()) {
            PatientPersonalDetails toUpdate = existing.get();
            toUpdate.setFullName(details.getFullName());
            toUpdate.setDateOfBirth(details.getDateOfBirth());
            toUpdate.setAge(details.getAge());
            toUpdate.setHeight(details.getHeight());
            toUpdate.setWeight(details.getWeight());
            toUpdate.setUpdatedDateTime(LocalDateTime.now());
            return personalDetailsRepository.save(toUpdate);
        }
        details.setPersonalDetailId(generatePersonalDetailId());
        details.setUpdatedDateTime(LocalDateTime.now());
        return personalDetailsRepository.save(details);
    }

    public Optional<PatientPersonalDetails> getPersonalDetails(String patientId) {
        return personalDetailsRepository.findFirstByPatientIdOrderByUpdatedDateTimeDesc(patientId);
    }

    public Optional<PatientPersonalDetails> updatePersonalDetails(String patientId, PatientPersonalDetails incoming) {
        return personalDetailsRepository.findFirstByPatientIdOrderByUpdatedDateTimeDesc(patientId).map(existing -> {
            existing.setFullName(incoming.getFullName());
            existing.setDateOfBirth(incoming.getDateOfBirth());
            existing.setAge(incoming.getAge());
            existing.setHeight(incoming.getHeight());
            existing.setWeight(incoming.getWeight());
            existing.setUpdatedDateTime(LocalDateTime.now());
            return personalDetailsRepository.save(existing);
        });
    }
}
