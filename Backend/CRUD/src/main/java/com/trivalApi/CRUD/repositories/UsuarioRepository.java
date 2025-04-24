package com.trivalApi.CRUD.repositories;

import java.util.ArrayList;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.trivalApi.CRUD.models.UsuarioModel;




@Repository
public interface  UsuarioRepository extends CrudRepository<UsuarioModel, Long> {

    //Create method 
    public abstract ArrayList<UsuarioModel> findByCorreo(String correo); 
    
}
