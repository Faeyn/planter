package nl.navara.java_hta.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private boolean emailExists(String email) {
        boolean exists = userRepository.existsByEmail(email);
        if (!exists) {
            System.out.println("Email is not unique");
        }
        return userRepository.existsByEmail(email);
    }

    // Create a new user
    public ResponseEntity<String> createUser(User user) {

        if (user.getName().length() < 2) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name is too short");
        }

        if (emailExists(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exist");
        }

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user
    public ResponseEntity<String> updateUser(Long id, User userDetails) {
        if (emailExists(userDetails.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exist");
        }

        Optional<User> user = userRepository.findById(id);


        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setName(userDetails.getName());
            existingUser.setEmail(userDetails.getEmail());
            userRepository.save(existingUser);
            return ResponseEntity.status(HttpStatus.OK).body("User updated");
        }
        return null;
    }

    // Delete all users
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Other business logic related to users
    public boolean checkEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}