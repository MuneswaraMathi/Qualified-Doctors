package com.qualifieddoctors.service;

import com.qualifieddoctors.model.LoginRequest;
import com.qualifieddoctors.model.RegisterAdmin;
import com.qualifieddoctors.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    public String generateAdminId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        String id;
        do {
            long value = min + (random.nextLong() % (max - min + 1) + (max - min + 1)) % (max - min + 1);
            id = String.valueOf(value);
        } while (adminRepository.existsById(id));
        return id;
    }

    public RegisterAdmin registerAdmin(RegisterAdmin admin) {
        admin.setAdminId(generateAdminId());
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Optional<RegisterAdmin> login(LoginRequest request) {
        return adminRepository.findByEmail(request.getEmail())
                .filter(admin -> passwordEncoder.matches(request.getPassword(), admin.getPassword()));
    }
}
