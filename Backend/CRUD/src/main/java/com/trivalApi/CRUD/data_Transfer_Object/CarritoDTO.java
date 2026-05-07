//Paradigma DTO para la gestión de carrito
package com.trivalApi.CRUD.data_Transfer_Object;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarritoDTO {

    private Long id;
    private Long usuarioId;
    private String nombreUsuario;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private List<ProductoDTO> productos;
    private BigDecimal total;
    private Integer totalProductos;


}
