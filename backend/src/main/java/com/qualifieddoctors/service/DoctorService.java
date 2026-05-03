package com.qualifieddoctors.service;

import com.qualifieddoctors.model.RegisterDoctor;
import com.qualifieddoctors.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    private final Random random = new Random();

    public String generateDoctorId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        long id = min + (long) (random.nextDouble() * (max - min + 1));
        return String.valueOf(id);
    }

    public RegisterDoctor registerDoctor(RegisterDoctor doctor) {
        doctor.setDoctorId(generateDoctorId());
        return doctorRepository.save(doctor);
    }
}
