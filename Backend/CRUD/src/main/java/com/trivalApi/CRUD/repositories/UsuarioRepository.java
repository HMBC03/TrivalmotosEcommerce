package com.trivalApi.CRUD.repositories;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.trivalApi.CRUD.models.UsuarioModel;




@Repository
public interface  UsuarioRepository extends CrudRepository<UsuarioModel, Long> {

    //Create method 
    Optional<UsuarioModel> findByCorreo(String correo);

    
}
