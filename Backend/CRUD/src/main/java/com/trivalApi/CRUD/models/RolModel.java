package com.trivalApi.CRUD.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name ="rol")
public class RolModel {
    @Id
    private Long id;

    private String name;

    
}
