package com.qualifieddoctors.controller;

import com.qualifieddoctors.model.RegisterAdmin;
import com.qualifieddoctors.service.AdminService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody RegisterAdmin admin,
                                           HttpSession session) {
        RegisterAdmin savedAdmin = adminService.registerAdmin(admin);
        session.setAttribute("admin", savedAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
    }

    @GetMapping("/myaccount")
    public ResponseEntity<?> getAdminAccount(HttpSession session) {
        RegisterAdmin admin = (RegisterAdmin) session.getAttribute("admin");
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized: Please register or log in.");
        }
        return ResponseEntity.ok(admin);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully.");
    }
}
