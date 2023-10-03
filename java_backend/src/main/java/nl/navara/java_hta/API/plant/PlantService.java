package nl.navara.java_hta.API.plant;

import nl.navara.java_hta.API.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;

    public Plant createPlant(Plant plant) {
        plant.setLastWatered(LocalDate.now());
        return plantRepository.save(plant);
    }

    public List<Plant> getAllPlants() {

        List<Plant> plants = plantRepository.findAll();

        plants.forEach((plant) -> {
            int daysLastWatered = (int) ChronoUnit.DAYS.between(plant.getLastWatered(), LocalDate.now());

            int daysUntilWatering = plant.getFrequentie()  - daysLastWatered;
            plant.setDaysUntilWatering(daysUntilWatering);
        } );

        return plants;
    }

    public Plant waterPlant(Plant plant) {
        plant.setLastWatered(LocalDate.now());
        return plantRepository.save(plant);
    }

    public List<Plant> waterAllPlant(List<Plant> plants) {
        System.out.println(plants);
        plants.forEach((plant) -> {
            this.waterPlant(plant);
        } );

        return this.getAllPlants();
    }

    public void deletePlant(Plant plant) {plantRepository.delete(plant);};

    };
