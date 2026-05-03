package com.qualifieddoctors.service;

import com.qualifieddoctors.model.RegisterAdmin;
import com.qualifieddoctors.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    private final Random random = new Random();

    public String generateAdminId() {
        long min = 1_000_000_000L;
        long max = 9_999_999_999L;
        long id = min + (long) (random.nextDouble() * (max - min + 1));
        return String.valueOf(id);
    }

    public RegisterAdmin registerAdmin(RegisterAdmin admin) {
        admin.setAdminId(generateAdminId());
        return adminRepository.save(admin);
    }
}
