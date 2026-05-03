package com.qualifieddoctors.repository;

import com.qualifieddoctors.model.RegisterAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<RegisterAdmin, String> {
}
