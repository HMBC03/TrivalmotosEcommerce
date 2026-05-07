package com.trivalApi.CRUD.services;

import com.trivalApi.CRUD.data_Transfer_Object.ProductoDTO;
import com.trivalApi.CRUD.models.Producto.ProductoModel;
import com.trivalApi.CRUD.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    public List<ProductoDTO> obtenerTodosLosProductos() {
        return productoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ProductoDTO> obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .map(this::convertirADTO);
    }
    
    public ProductoDTO crearProducto(ProductoDTO productoDTO) {
        ProductoModel producto = convertirAModelo(productoDTO);
        ProductoModel productoGuardado = productoRepository.save(producto);
        return convertirADTO(productoGuardado);
    }
    
    public Optional<ProductoDTO> actualizarProducto(Long id, ProductoDTO productoDTO) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setNombre(productoDTO.getNombre());
                    producto.setPrecio(productoDTO.getPrecio());
                    producto.setCantidad(productoDTO.getCantidad());
                    producto.setImagenUrl(productoDTO.getImagenUrl());
                    producto.setDescripcion(productoDTO.getDescripcion());
                    producto.setMarca(productoDTO.getMarca());
                    producto.setCompatibilidad(productoDTO.getCompatibilidad());
                    producto.setCategoria(productoDTO.getCategoria());
                    return convertirADTO(productoRepository.save(producto));
                });
    }
    
    public boolean eliminarProducto(Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<ProductoDTO> buscarProductosPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    public List<ProductoDTO> buscarProductosPorRangoPrecio(BigDecimal precioMin, BigDecimal precioMax) {
        return productoRepository.findByPrecioBetween(precioMin, precioMax).stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
    
    private ProductoDTO convertirADTO(ProductoModel producto) {
        return ProductoDTO.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .cantidad(producto.getCantidad())
                .precio(producto.getPrecio())
                .imagenUrl(producto.getImagenUrl())
                .descripcion(producto.getDescripcion())
                .marca(producto.getMarca())
                .compatibilidad(producto.getCompatibilidad())
                .categoria(producto.getCategoria())
                .build();
    }

    private ProductoModel convertirAModelo(ProductoDTO productoDTO) {
        return ProductoModel.builder()
                .nombre(productoDTO.getNombre())
                .cantidad(productoDTO.getCantidad())
                .precio(productoDTO.getPrecio())
                .imagenUrl(productoDTO.getImagenUrl())
                .descripcion(productoDTO.getDescripcion())
                .marca(productoDTO.getMarca())
                .compatibilidad(productoDTO.getCompatibilidad())
                .categoria(productoDTO.getCategoria())
                .build();
    }
}