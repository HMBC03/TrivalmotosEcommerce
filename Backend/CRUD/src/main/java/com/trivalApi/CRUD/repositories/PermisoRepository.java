package com.trivalApi.CRUD.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.trivalApi.CRUD.models.Usuario.PermisosModel;

@Repository
public interface PermisoRepository extends JpaRepository<PermisosModel, Long> {

    /**
     * Busca un permiso por su nombre.
     * @param name Aqui se indica el nombre del permiso (por ejemplo "CREATE", "READ") que se crearon con Rol
     * @return Optional con el permiso si existe.
     */
    Optional<PermisosModel> findByName(String name);

    /**
     * Verifica si existe un permiso con el nombre indicado en la Bd.
     * @param name nombre del permiso similar al anterior.
     * @return true si existe, false en caso contrario.
     */
    boolean existsByName(String name);

    /**
     * Obtiene la lista de permisos cuyos nombres estén en la lista dada.
     * @param names lista de nombres de permisos.
     * @return lista de permisos que coinciden.
     */
    List<PermisosModel> findByNameIn(List<String> names);
}
