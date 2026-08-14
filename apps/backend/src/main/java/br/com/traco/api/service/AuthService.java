package br.com.traco.api.service;

import br.com.traco.api.dto.Dtos.AuthResponse;
import br.com.traco.api.dto.Dtos.LoginRequest;
import br.com.traco.api.dto.Dtos.RegisterRequest;
import br.com.traco.api.dto.Dtos.UserDto;
import br.com.traco.api.exception.ApiException;
import br.com.traco.api.model.User;
import br.com.traco.api.repo.UserRepository;
import br.com.traco.api.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (req.name() == null || req.name().isBlank()) {
            throw new ApiException("Informe seu nome completo.");
        }
        if (req.email() == null || !req.email().contains("@")) {
            throw new ApiException("E-mail inválido.");
        }
        if (req.password() == null || req.password().length() < 6) {
            throw new ApiException("A senha deve ter pelo menos 6 caracteres.");
        }
        String email = req.email().toLowerCase().trim();
        if (userRepository.existsByEmail(email)) {
            throw new ApiException("E-mail já cadastrado.", 409);
        }
        User user = new User();
        user.setName(req.name().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(req.role() == null || req.role().isBlank() ? "engenheiro" : req.role());
        user = userRepository.save(user);
        return new AuthResponse(jwtService.generateToken(user.getId(), user.getEmail()), UserDto.from(user));
    }

    public AuthResponse login(LoginRequest req) {
        String email = req.email() == null ? "" : req.email().toLowerCase().trim();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("Credenciais inválidas.", 401));
        if (!passwordEncoder.matches(req.password() == null ? "" : req.password(), user.getPassword())) {
            throw new ApiException("Credenciais inválidas.", 401);
        }
        return new AuthResponse(jwtService.generateToken(user.getId(), user.getEmail()), UserDto.from(user));
    }
}