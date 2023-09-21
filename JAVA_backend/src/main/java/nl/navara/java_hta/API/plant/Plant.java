package nl.navara.java_hta.API.plant;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Table
@Entity
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String locatie;
    private int water;
    private int frequentie;
    private LocalDate lastWatered;

    @Transient
    private int daysUntilWatering;
}
