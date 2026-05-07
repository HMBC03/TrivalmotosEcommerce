package com.trivalApi.CRUD.repositories;

import com.trivalApi.CRUD.models.Producto.ProductoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<ProductoModel, Long> {
    
    Optional<ProductoModel> findByNombre(String nombre);
    
    List<ProductoModel> findByNombreContainingIgnoreCase(String nombre);
    
    List<ProductoModel> findByPrecioBetween(BigDecimal precioMin, BigDecimal precioMax);
}