package com.trivalApi.CRUD.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trivalApi.CRUD.models.UsuarioModel;
import com.trivalApi.CRUD.repositories.UsuarioRepository;
import com.trivalApi.CRUD.security.Util;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    //Return all users
    public ArrayList<UsuarioModel> getUser() {
        return (ArrayList<UsuarioModel>) usuarioRepository.findAll();
    }

    //Create User
    public UsuarioModel createUser(UsuarioModel usuario) {
        Optional<UsuarioModel> userExists = usuarioRepository.findByCorreo(usuario.getCorreo());

        if (userExists.isPresent()) {
            throw new RuntimeException("El correo ingresado ya esta registrado");

        } else {
            //Here we add hash security for password
            String hashedPassword = Util.hashPassword(usuario.getPassword());
            usuario.setPassword(hashedPassword);

            return usuarioRepository.save(usuario);
        }

    }

    //Get by Id
    public Optional<UsuarioModel> getById(Long id) {
        return usuarioRepository.findById(id);
    }

    //Get by correo was for proof of API
    //public ArrayList<UsuarioModel> getUserByCorreo(String correo) {
    //  return usuarioRepository.findByCorreo(correo);
    //}
    //Delete user by id
    public boolean deleteUser(Long id) {
        try {
            usuarioRepository.deleteById(id);
            return true;
        } catch (Exception err) {
            return false;
        }

    }

    //Login USER
    public Optional<UsuarioModel> login(String correo, String password) {
        return usuarioRepository.findByCorreo(correo)
                .filter(usuario -> Util.checkPassword(password, usuario.getPassword()));
    }

}
