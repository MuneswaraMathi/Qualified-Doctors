package com.qualifieddoctors.service;

import com.qualifieddoctors.model.RegisterDoctor;
import com.qualifieddoctors.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    public String generateDoctorId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        String id;
        do {
            long value = min + (random.nextLong() % (max - min + 1) + (max - min + 1)) % (max - min + 1);
            id = String.valueOf(value);
        } while (doctorRepository.existsById(id));
        return id;
    }

    public RegisterDoctor registerDoctor(RegisterDoctor doctor) {
        doctor.setDoctorId(generateDoctorId());
        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        return doctorRepository.save(doctor);
    }
}
