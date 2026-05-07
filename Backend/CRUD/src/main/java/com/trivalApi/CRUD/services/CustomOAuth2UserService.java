package com.trivalApi.CRUD.services;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.trivalApi.CRUD.models.Usuario.UsuarioModel;
import com.trivalApi.CRUD.models.Usuario.RolModel;
import com.trivalApi.CRUD.repositories.UsuarioRepository;
import com.trivalApi.CRUD.repositories.RolRepository;
import java.util.HashSet;
import java.util.Set;
import com.trivalApi.CRUD.models.Usuario.RolEnum;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oauthUser = super.loadUser(request);

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        Optional<UsuarioModel> usuarioExistente = usuarioRepository.findByCorreo(email);
        UsuarioModel usuario;

        if (usuarioExistente.isPresent()) {
            usuario = usuarioExistente.get();
        } else {
            usuario = crearNuevoUsuarioGoogle(email, name);
        }

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                oauthUser.getAttributes(),
                "email"
        );
    }

    private UsuarioModel crearNuevoUsuarioGoogle(String email, String name) {
        // Buscar el rol usando el enum correctamente
        Optional<RolModel> rolUser = rolRepository.findByRolEnum(RolEnum.USER);
        Set<RolModel> roles = new HashSet<>();

        if (rolUser.isPresent()) {
            roles.add(rolUser.get());
        } else {
            throw new RuntimeException("Rol USER no encontrado");
        }

        UsuarioModel usuario = UsuarioModel.builder()
                .correo(email)
                .nombre(name)
                .isEnabled(true)
                .accountNoExpired(true)
                .accountNoLocked(true)
                .credentialNoExpired(true)
                .roles(roles)
                .build();

        return usuarioRepository.save(usuario);
    }

}
