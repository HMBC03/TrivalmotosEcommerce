//Aqui encuentra las rutas definidas para el carrito
package com.trivalApi.CRUD.controllers;

import com.trivalApi.CRUD.data_Transfer_Object.*;
import com.trivalApi.CRUD.services.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.trivalApi.CRUD.data_Transfer_Object.AgregarProductoCarritoDTO;
import com.trivalApi.CRUD.data_Transfer_Object.CarritoDTO;

@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "*")
public class CarritoController {
    
    @Autowired
    private CarritoService carritoService;
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<CarritoDTO> obtenerCarritoPorUsuario(@PathVariable Long usuarioId) {
        return carritoService.obtenerCarritoPorUsuario(usuarioId)
                .map(carrito -> ResponseEntity.ok().body(carrito))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/usuario/{usuarioId}/agregar")
    public ResponseEntity<CarritoDTO> agregarProductoAlCarrito(
            @PathVariable Long usuarioId, 
            @RequestBody AgregarProductoCarritoDTO request) {
        try {
            CarritoDTO carrito = carritoService.agregarProductoAlCarrito(usuarioId, request);
            return ResponseEntity.ok(carrito);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/usuario/{usuarioId}/producto/{productoId}")
    public ResponseEntity<Void> eliminarProductoDelCarrito(
            @PathVariable Long usuarioId,
            @PathVariable Long productoId) {
        if (carritoService.eliminarProductoDelCarrito(usuarioId, productoId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/usuario/{usuarioId}/limpiar")
    public ResponseEntity<Void> limpiarCarrito(@PathVariable Long usuarioId) {
        if (carritoService.limpiarCarrito(usuarioId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}