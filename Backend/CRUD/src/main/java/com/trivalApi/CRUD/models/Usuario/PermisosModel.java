//Estructura de la base de datos para el permisos asegura las relaciones.
package com.trivalApi.CRUD.models.Usuario;

import jakarta.persistence.*;
import lombok.*;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Permisos")

public class PermisosModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique=true, nullable=false, updatable= false)
    private String name;

    
}
