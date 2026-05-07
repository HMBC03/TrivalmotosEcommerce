package com.trivalApi.CRUD.services;

import com.trivalApi.CRUD.data_Transfer_Object.*;
import com.trivalApi.CRUD.models.Carrito.*;
import com.trivalApi.CRUD.models.Producto.ProductoModel;
import com.trivalApi.CRUD.models.Usuario.UsuarioModel;
import com.trivalApi.CRUD.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import java.util.HashSet;


@Service
@Transactional
public class CarritoService {
    
    @Autowired
    private CarritoRepository carritoRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Optional<CarritoDTO> obtenerCarritoPorUsuario(Long usuarioId) {
        return carritoRepository.findByUsuarioIdWithProductos(usuarioId)
                .map(this::convertirADTO);
    }
    
    public CarritoDTO agregarProductoAlCarrito(Long usuarioId, AgregarProductoCarritoDTO request) {
        UsuarioModel usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        ProductoModel producto = productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        CarritoModel carrito = carritoRepository.findByUsuario(usuario)
                .orElseGet(() -> crearNuevoCarrito(usuario));
        
        carrito.getProductos().add(producto);
        carritoRepository.save(carrito);
        
        return convertirADTO(carritoRepository.findByUsuarioIdWithProductos(usuarioId).get());
    }
    
    public boolean eliminarProductoDelCarrito(Long usuarioId, Long productoId) {
        CarritoModel carrito = carritoRepository.findByUsuarioId(usuarioId)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        
        ProductoModel producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        boolean removed = carrito.getProductos().remove(producto);
        if (removed) {
            carritoRepository.save(carrito);
        }
        return removed;
    }
    
    public boolean limpiarCarrito(Long usuarioId) {
        Optional<CarritoModel> carritoOpt = carritoRepository.findByUsuarioId(usuarioId);
        if (carritoOpt.isPresent()) {
            CarritoModel carrito = carritoOpt.get();
            carrito.getProductos().clear();
            carritoRepository.save(carrito);
            return true;
        }
        return false;
    }
    
    private CarritoModel crearNuevoCarrito(UsuarioModel usuario) {
        CarritoModel nuevoCarrito = CarritoModel.builder()
                .usuario(usuario)
                .productos(new HashSet<>())
                .build();
        return carritoRepository.save(nuevoCarrito);
    }
    
    private CarritoDTO convertirADTO(CarritoModel carrito) {
        List<ProductoDTO> productos = carrito.getProductos().stream()
                .map(this::convertirProductoADTO)
                .collect(Collectors.toList());
        
        BigDecimal total = productos.stream()
                .map(ProductoDTO::getPrecio)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        return CarritoDTO.builder()
                .id(carrito.getId())
                .usuarioId(carrito.getUsuario().getId())
                .nombreUsuario(carrito.getUsuario().getNombre())
                .fechaCreacion(carrito.getFechaCreacion())
                .fechaActualizacion(carrito.getFechaActualizacion())
                .productos(productos)
                .total(total)
                .totalProductos(productos.size())
                .build();
    }
    
    private ProductoDTO convertirProductoADTO(ProductoModel producto) {
        return ProductoDTO.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .precio(producto.getPrecio())
                .imagenUrl(producto.getImagenUrl())
                .build();
    }
}