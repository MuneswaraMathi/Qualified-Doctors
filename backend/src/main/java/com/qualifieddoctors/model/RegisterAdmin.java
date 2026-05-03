package com.qualifieddoctors.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admin_profile_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterAdmin {

    @Id
    @Column(name = "admin_id", length = 10)
    private String adminId;

    @NotBlank
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotBlank
    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(name = "password", nullable = false)
    private String password;

    @Transient
    private String confirmPassword;

    @NotBlank
    @Column(name = "mobile_number", nullable = false)
    private String mobileNumber;
}
