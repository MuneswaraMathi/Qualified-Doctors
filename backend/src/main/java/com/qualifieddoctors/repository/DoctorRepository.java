package com.qualifieddoctors.repository;

import com.qualifieddoctors.model.RegisterDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<RegisterDoctor, String> {
}
