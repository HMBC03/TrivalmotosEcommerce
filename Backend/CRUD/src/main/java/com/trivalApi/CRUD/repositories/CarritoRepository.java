package com.trivalApi.CRUD.repositories;

import com.trivalApi.CRUD.models.Carrito.CarritoModel;
import com.trivalApi.CRUD.models.Usuario.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<CarritoModel, Long> {
    
    Optional<CarritoModel> findByUsuario(UsuarioModel usuario);
    
    Optional<CarritoModel> findByUsuarioId(Long usuarioId);
    
    @Query("SELECT c FROM CarritoModel c LEFT JOIN FETCH c.productos WHERE c.usuario.id = :usuarioId")
    Optional<CarritoModel> findByUsuarioIdWithProductos(@Param("usuarioId") Long usuarioId);
    
    boolean existsByUsuario(UsuarioModel usuario);
}