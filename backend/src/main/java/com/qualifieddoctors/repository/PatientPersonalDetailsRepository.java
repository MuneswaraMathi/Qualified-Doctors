package com.qualifieddoctors.repository;

import com.qualifieddoctors.model.PatientPersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientPersonalDetailsRepository extends JpaRepository<PatientPersonalDetails, String> {
    Optional<PatientPersonalDetails> findFirstByPatientIdOrderByUpdatedDateTimeDesc(String patientId);
}
