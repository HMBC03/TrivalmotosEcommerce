package com.trivalApi.CRUD;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.trivalApi.CRUD.models.Producto.ProductoModel;
import com.trivalApi.CRUD.models.Usuario.*;

import com.trivalApi.CRUD.repositories.*;

import jakarta.transaction.Transactional;

@SpringBootApplication
public class CrudApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudApplication.class, args);
    }
    @Bean
    @Transactional
    CommandLineRunner init(
    UsuarioRepository usuarioRepository,
    RolRepository rolRepo,
    PermisoRepository permisoRepo,
    ProductoRepository productoRepo
) {
    return args -> {
        System.out.println("Iniciando carga de permisos y roles...");
        
        // 1 Crear los permisos si no existen
        List<String> names = List.of("READ", "CREATE", "UPDATE", "DELETE", "REFACTOR");
        names.forEach(name -> {
            if (!permisoRepo.existsByName(name)) {
                PermisosModel permiso = PermisosModel.builder()
                    .name(name)
                    .build();
                permisoRepo.save(permiso);
                System.out.println("Permiso creado: " + name);
            }
        });

        // 2 Crear rol USER con READ, CREATE, UPDATE
        if (rolRepo.findByRolEnum(RolEnum.USER).isEmpty()) {
            // Obtener permisos frescos directamente de la base de datos
            List<PermisosModel> permisos = permisoRepo.findByNameIn(List.of("READ", "CREATE", "UPDATE"));
            System.out.println("Permisos encontrados para USER: " + permisos.size());
            
            // Crear un nuevo rol sin permisos inicialmente
            RolModel rolUser = RolModel.builder()
                .rolEnum(RolEnum.USER)
                .permisoList(new HashSet<>())  // Inicializar vacío
                .build();
            
            // Guardar primero el rol
            rolUser = rolRepo.save(rolUser);
            
            // Ahora agregar los permisos al rol guardado
            rolUser.setPermisoList(new HashSet<>(permisos));
            rolRepo.save(rolUser);
            
            System.out.println("Rol USER creado con " + permisos.size() + " permisos");
        }
        
        // 3 Crear rol ADMIN con todos los permisos
        if (rolRepo.findByRolEnum(RolEnum.ADMIN).isEmpty()) {
            // Obtener permisos frescos directamente de la base de datos
            List<PermisosModel> todosPermisos = permisoRepo.findAll();
            System.out.println("Permisos encontrados para ADMIN: " + todosPermisos.size());
            
            // Crear un nuevo rol sin permisos inicialmente
            RolModel rolAdmin = RolModel.builder()
                .rolEnum(RolEnum.ADMIN)
                .permisoList(new HashSet<>())  // Inicializar vacío
                .build();
            
            // Guardar primero el rol
            rolAdmin = rolRepo.save(rolAdmin);
            
            // Ahora agregar los permisos al rol guardado
            rolAdmin.setPermisoList(new HashSet<>(todosPermisos));
            rolRepo.save(rolAdmin);
            
            System.out.println("Rol ADMIN creado con " + todosPermisos.size() + " permisos");
        }
        
        System.out.println("Finalizado proceso de inicialización. Roles en BD: " + rolRepo.count());

        // 4 Crear productos de prueba si no existen
        if (productoRepo.count() == 0) {
            System.out.println("Creando productos de prueba...");

            List<ProductoModel> productos = List.of(
                ProductoModel.builder()
                    .nombre("Casco integral deportivo")
                    .cantidad(25)
                    .precio(new BigDecimal("289000.00"))
                    .imagenUrl("https://pngimg.com/uploads/motorcycle_helmets/motorcycle_helmets_PNG103224.png")
                    .descripcion("Casco integral full-face deportivo con doble visor. Certificacion DOT. Ligero y aerodinamico.")
                    .marca("LS2")
                    .compatibilidad("Universal")
                    .categoria("Cascos")
                    .build(),
                ProductoModel.builder()
                    .nombre("Cadena reforzada Revo 428H")
                    .cantidad(10)
                    .precio(new BigDecimal("95000.00"))
                    .imagenUrl("https://ragmotos.com.co/wp-content/uploads/2021/03/Cadena-428-520-Dorada-Reforzada-Oring-Orrinada-Encauchetada-Revo-ragmotos-repuestos-accesorios-Moto-Racing7.jpg")
                    .descripcion("Cadena extra reforzada dorada O-Ring para motos. Compatible con modelos 125cc-250cc.")
                    .marca("Revo")
                    .compatibilidad("125cc - 250cc")
                    .categoria("Transmision")
                    .build(),
                ProductoModel.builder()
                    .nombre("Disco de freno Galfer")
                    .cantidad(40)
                    .precio(new BigDecimal("32000.00"))
                    .imagenUrl("https://galfer.eu/moto/wp-content/uploads/sites/2/disc_types_rws.jpg")
                    .descripcion("Disco de freno delantero ventilado para Bajaj Pulsar NS200, RS200 y similares.")
                    .marca("Galfer")
                    .compatibilidad("Bajaj Pulsar")
                    .categoria("Frenos")
                    .build(),
                ProductoModel.builder()
                    .nombre("Llanta Michelin Pilot Street 2")
                    .cantidad(8)
                    .precio(new BigDecimal("185000.00"))
                    .imagenUrl("https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4qzptzsictt3x6a/mo-93_tire_michelin_pilot-street-2_ww_set_a_main_1-30_nopad.webp")
                    .descripcion("Llanta delantera Michelin Pilot Street radial, excelente agarre en mojado y seco.")
                    .marca("Michelin")
                    .compatibilidad("Universal")
                    .categoria("Llantas")
                    .build(),
                ProductoModel.builder()
                    .nombre("Aceite Motul 7100 10W-40")
                    .cantidad(50)
                    .precio(new BigDecimal("62000.00"))
                    .imagenUrl("https://adnmotoracing.com/wp-content/uploads/2022/01/Motul-7100-10W40-4T.jpg")
                    .descripcion("Aceite 100% sintetico para motos 4T. Proteccion maxima del motor y caja de cambios.")
                    .marca("Motul")
                    .compatibilidad("Universal")
                    .categoria("Lubricantes")
                    .build(),
                ProductoModel.builder()
                    .nombre("Bujia NGK CR7HSA")
                    .cantidad(60)
                    .precio(new BigDecimal("28000.00"))
                    .imagenUrl("https://bbrmotorsports.shop/cdn/shop/products/413-NGK-0007_A_XXLarge.jpg?v=1703784509")
                    .descripcion("Bujia de alto rendimiento NGK. Mayor durabilidad y mejor arranque en frio.")
                    .marca("NGK")
                    .compatibilidad("125cc - 250cc")
                    .categoria("Electrico")
                    .build(),
                ProductoModel.builder()
                    .nombre("Manubrio ProTaper Contour")
                    .cantidad(12)
                    .precio(new BigDecimal("320000.00"))
                    .imagenUrl("https://motoparte.mx/cdn/shop/files/022064.webp?v=1770137052")
                    .descripcion("Manubrio de aluminio ProTaper con pad protector. Resistente y ergonomico.")
                    .marca("ProTaper")
                    .compatibilidad("Universal")
                    .categoria("Direccion")
                    .build(),
                ProductoModel.builder()
                    .nombre("Amortiguador trasero Yamaha FZ")
                    .cantidad(30)
                    .precio(new BigDecimal("415000.00"))
                    .imagenUrl("https://ragmotos.com.co/wp-content/uploads/2020/11/fz-16-monoshock-amortiguador-original-yamaha-ragmotos-repuesto-moto-rojo21.jpg")
                    .descripcion("Amortiguador trasero monoshock de gas regulable. Original Yamaha FZ16.")
                    .marca("Yamaha")
                    .compatibilidad("Yamaha FZ 16")
                    .categoria("Suspension")
                    .build(),
                ProductoModel.builder()
                    .nombre("Bateria Yuasa YTX9-BS")
                    .cantidad(15)
                    .precio(new BigDecimal("125000.00"))
                    .imagenUrl("https://media.navarrohermanos.es/30770-thickbox_default/bateria-moto-yuasa-ytx9-bs.jpg")
                    .descripcion("Bateria sellada libre de mantenimiento 12V 8Ah. Compatible con AKT, Yamaha, Honda 125-250cc.")
                    .marca("Yuasa")
                    .compatibilidad("125cc - 250cc")
                    .categoria("Electrico")
                    .build(),
                ProductoModel.builder()
                    .nombre("Espejos retrovisores deportivos")
                    .cantidad(20)
                    .precio(new BigDecimal("75000.00"))
                    .imagenUrl("https://importacionespegaso.com/cdn/shop/files/51NF_81gafL._AC_SL1500.jpg?v=1722624402")
                    .descripcion("Par de espejos retrovisores deportivos en aluminio. Instalacion universal para manubrio.")
                    .marca("Generico")
                    .compatibilidad("Universal")
                    .categoria("Accesorios")
                    .build()
            );

            productoRepo.saveAll(productos);
            System.out.println("Productos de prueba creados: " + productos.size());
        }
    };
}
   
}