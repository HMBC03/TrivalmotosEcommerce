//Aqui encuentra las rutas definidas para realizar consultas de prueba
package com.trivalApi.CRUD.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class HelloController {

    
    @GetMapping("/public")
    @PreAuthorize("permitAll()")
    public String publicEndpoint() {
        return "Este es un endpoint público que cualquiera puede acceder";
    }

    @GetMapping("/protected")
    public String protectedEndpoint() {
        return "Este endpoint requiere estar autenticado";
    }

    @PreAuthorize("hasAuthority('READ')")
    @GetMapping("/read-only")
    public String readOnlyEndpoint() {
        return "Este endpoint requiere el permiso READ";
    }

    @PreAuthorize("hasAuthority('CREATE')")
    @GetMapping("/create-only")
    public String createOnlyEndpoint() {
        return "Este endpoint requiere el permiso CREATE";
    }

    @PreAuthorize("hasAuthority('UPDATE')")
    @GetMapping("/update-only")
    public String updateOnlyEndpoint() {
        return "Este endpoint requiere el permiso UPDATE";
    }
}