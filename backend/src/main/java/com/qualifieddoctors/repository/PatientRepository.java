package com.qualifieddoctors.repository;

import com.qualifieddoctors.model.RegisterPatient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<RegisterPatient, String> {
    Optional<RegisterPatient> findByEmail(String email);
}
