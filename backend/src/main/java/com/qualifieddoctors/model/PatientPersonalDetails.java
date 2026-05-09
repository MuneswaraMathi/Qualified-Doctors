package com.qualifieddoctors.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient_personal_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientPersonalDetails {

    @Id
    @Column(name = "personal_detail_id", length = 10)
    private String personalDetailId;

    @Column(name = "patient_id", length = 10, nullable = false)
    private String patientId;

    @NotBlank
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @NotNull
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull
    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "height")
    private Double height;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "updated_date_time", nullable = false)
    private LocalDateTime updatedDateTime;
}
