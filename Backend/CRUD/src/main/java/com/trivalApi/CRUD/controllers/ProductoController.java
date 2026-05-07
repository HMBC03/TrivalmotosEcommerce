//Aqui encuentra las rutas definidas para el producto

package com.trivalApi.CRUD.controllers;
import com.trivalApi.CRUD.data_Transfer_Object.ProductoDTO;
import com.trivalApi.CRUD.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/productos")

public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerTodosLosProductos() {
        List<ProductoDTO> productos = productoService.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }

     @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerProductoPorId(@PathVariable Long id) {
        return productoService.obtenerProductoPorId(id)
                .map(producto -> ResponseEntity.ok().body(producto))
                .orElse(ResponseEntity.notFound().build());
    }   
    
    @PostMapping("")
    public ResponseEntity<ProductoDTO> crearProducto(@RequestBody ProductoDTO productoDTO) {
        ProductoDTO nuevoProducto = productoService.crearProducto(productoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(@PathVariable Long id, @RequestBody ProductoDTO productoDTO) {
        return productoService.actualizarProducto(id, productoDTO)
                .map(producto -> ResponseEntity.ok().body(producto))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        if (productoService.eliminarProducto(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoDTO>> buscarProductosPorNombre(@RequestParam String nombre) {
        List<ProductoDTO> productos = productoService.buscarProductosPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/precio")
    public ResponseEntity<List<ProductoDTO>> buscarProductosPorRangoPrecio(
            @RequestParam BigDecimal min, 
            @RequestParam BigDecimal max) {
        List<ProductoDTO> productos = productoService.buscarProductosPorRangoPrecio(min, max);
        return ResponseEntity.ok(productos);
    }
}
    
   
