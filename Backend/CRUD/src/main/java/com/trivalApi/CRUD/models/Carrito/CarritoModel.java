//Estructura de la base de datos para el carrito de compras asegura las relaciones.
package com.trivalApi.CRUD.models.Carrito;

import com.trivalApi.CRUD.models.Usuario.UsuarioModel;
import jakarta.persistence.*;
import lombok.*;
import com.trivalApi.CRUD.models.Producto.ProductoModel;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "carrito")
public class CarritoModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModel usuario;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(
        name = "carrito_producto",
        joinColumns = @JoinColumn(name = "carrito_id"),
        inverseJoinColumns = @JoinColumn(name = "producto_id")
    )
    private Set<ProductoModel> productos = new HashSet<>();
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
}