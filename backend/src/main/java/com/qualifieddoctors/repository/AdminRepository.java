package com.qualifieddoctors.repository;

import com.qualifieddoctors.model.RegisterAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<RegisterAdmin, String> {
    Optional<RegisterAdmin> findByEmail(String email);
}
