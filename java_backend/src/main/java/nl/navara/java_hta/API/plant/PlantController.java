package nl.navara.java_hta.API.plant;

import lombok.Getter;
import nl.navara.java_hta.API.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("plant")
public class PlantController {
    @Autowired
    private PlantService plantService;

    @PostMapping
    public Plant createPlant(@RequestBody Plant plant) {
        return plantService.createPlant(plant);
    }

    @GetMapping
    public List<Plant> getAllPlants() {
        return plantService.getAllPlants();
    }

    @PutMapping
    public Plant updatePlant(@RequestBody Plant plant) {
        return plantService.waterPlant(plant);
    }

    @PutMapping("/all")
    public List<Plant> updatePlants(@RequestBody List<Plant> plants) {
        return plantService.waterAllPlant(plants);
    }

    @DeleteMapping
    public void deletePlant(@RequestBody Plant plant) {
        plantService.deletePlant(plant);
    }

}
