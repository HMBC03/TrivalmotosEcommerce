package com.trivalApi.CRUD.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trivalApi.CRUD.models.UsuarioModel;
import com.trivalApi.CRUD.services.UsuarioService;


@RestController
@RequestMapping("/user")//Server direction 
public class UsuarioController {
    @Autowired
    UsuarioService usuarioService;

    @GetMapping()
    public ArrayList<UsuarioModel> getUser(){
        return  usuarioService.getUser();
    }

    @PostMapping()
    public UsuarioModel saveUser(@RequestBody UsuarioModel usuario){
        return this.usuarioService.createUser(usuario);
    }

    @GetMapping(path= "/{id}")
    public Optional<UsuarioModel> getById(@PathVariable("id") Long id)
   {
      return this.usuarioService.getById(id);
   }

   @GetMapping("/query")
   public ArrayList<UsuarioModel> getUserByCorreo(@RequestParam("correo") String correo){
    return this.usuarioService.getUserByCorreo(correo);
   }

   @DeleteMapping(path="/{id}")
public String deleteById(@PathVariable("id") Long id){
    boolean ok= this.usuarioService.deleteUser(id);
        if(ok){
            return "Usuario eliminado con ID " +id;}
        else
        {   return "No fue posible elimar el usuario " +id;
        } 
}

}
