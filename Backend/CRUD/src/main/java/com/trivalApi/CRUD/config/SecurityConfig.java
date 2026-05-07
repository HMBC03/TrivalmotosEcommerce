/**Dependencias de seguridad, incluye la arquitectura spring security 
Formulario email-password
Autenticación de google
Manager autenticator que a su vez implementa:   
    -Encoder para hashear conteaseñar con BCrypt
    -UserDetailService
*/
package com.trivalApi.CRUD.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import static org.springframework.security.config.Customizer.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.trivalApi.CRUD.services.CustomOAuth2UserService;
import com.trivalApi.CRUD.services.UserDetailServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2SuccesHandler;
    
     @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationProvider authProvider) throws Exception {
        return httpSecurity
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())          // Desactivar CSRF en APIs REST
                .authenticationProvider(authProvider)  // Registrar nuestro AuthenticationProvider
                .httpBasic(AbstractHttpConfigurer::disable)             // Usar HTTP Basic
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    // Endpoints públicos
                    .requestMatchers("/api/auth/register", "/api/auth/login", "/login/**","/public", "/oauth2/**", "/api/productos/**" ).permitAll()
                    
                    // Para probar el sistema es mejor permitir todas las solicitudes autenticadas
                    .anyRequest().permitAll()
                ).oauth2Login(oauth -> oauth
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService)
                )
                    .successHandler(oAuth2SuccesHandler)
            )
                
                
                .build();
    }

    /**
     * Manager de autenticación, usado internamente para validar credenciales.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Proveedor de autenticación que usa nuestro UserDetailServiceImpl y BCrypt para el password.
     */
    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailServiceImpl userDetailService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * BCryptPasswordEncoder para encriptar y comparar contraseñas.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    
 
}
