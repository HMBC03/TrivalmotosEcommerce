/**
 * Evita que un cliente tenga dos usuarios al ingresar con google y con gmail evitando problemas
 * de normalización en la BD
 */
package com.trivalApi.CRUD.config;

import java.io.IOException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.trivalApi.CRUD.models.Usuario.UsuarioModel;
import com.trivalApi.CRUD.repositories.UsuarioRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UsuarioRepository usuarioRepository;

    public OAuth2AuthenticationSuccessHandler(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {
        //  Extraemos el OAuth2User
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name  = oauthUser.getAttribute("name");

        //  Creamos en BD si no existe
        if (email != null) {
            usuarioRepository.findByCorreo(email)
                .orElseGet(() -> {
                    UsuarioModel u = new UsuarioModel();
                    u.setCorreo(email);
                    u.setNombre(name != null ? name : "Sin nombre");
                    return usuarioRepository.save(u);
                });
        }

        // Finalmente, redirige
        response.sendRedirect("http://localhost:5173/Trivalmotos");
    }
}