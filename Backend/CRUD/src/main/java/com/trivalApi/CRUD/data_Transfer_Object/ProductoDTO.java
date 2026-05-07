//Paradigma DTO para la gestión de producto
package com.trivalApi.CRUD.data_Transfer_Object;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoDTO {
    
    private Long id;
    private String nombre;
    private BigDecimal precio;
    private String imagenUrl;
    private int cantidad;
    private String descripcion;
    private String marca;
    private String compatibilidad;
    private String categoria;
}