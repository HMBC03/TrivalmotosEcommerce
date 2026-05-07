//Estructura de la base de datos para el producto de compras asegura las relaciones.
package com.trivalApi.CRUD.models.Producto;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class ProductoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    
    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private int cantidad;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(name = "imagen_url")
    private String imagenUrl;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "marca")
    private String marca;

    @Column(name = "compatibilidad")
    private String compatibilidad;

    @Column(name = "categoria")
    private String categoria;

}