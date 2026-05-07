import img1 from "./img/01.jpg";
import img2 from "./img/02.webp";
import img3 from "./img/03.webp";
import img4 from "./img/04.jpg";
import img5 from "./img/05.jpg";
import img6 from "./img/06.webp";
import img7 from "./img/07.jpeg";
import img8 from "./img/08.webp";
import img9 from "./img/09.png";
import img10 from "./img/10.webp";
import img11 from "./img/11.webp";
import img12 from "./img/12.webp";
import img13 from "./img/13.jpg";
import img14 from "./img/14.jpeg";
import img15 from "./img/15.webp";
import img16 from "./img/16.webp";
import img17 from "./img/17.webp";
import img18 from "./img/18.webp";
import img19 from "./img/19.jpg";
import img20 from "./img/20.jpeg";

const repuestosMoto = [
  {
    id: 1,
    imagen: img1,
    nombre: "Frenos de disco delantero",
    precio: 150.00,
    descripcion: `Marca: Brembo \n Cantidad: 1 unidad \n Color: Plateado\nMaterial: Acero Inoxidable\nTipo: Hidráulico\nCompatibilidad: Universal\nOrigen: Italia\nGarantía: 1 año`
  },
  {
    id: 2,
    imagen: img2,
    nombre: "Bujía NGK CR9E",
    precio: 20.00,
    descripcion: `Marca: NGK\nCantidad: 1 unidad\nColor: Plateado\nMaterial: Metal\nTipo: Bujía estándar\nCompatibilidad: Motos 125cc-250cc\nOrigen: Japón\nGarantía: 6 meses`
  },
  {
    id: 3,
    imagen: img3,
    nombre: "Cadena de transmisión 520",
    precio: 75.00,
    descripcion: `Marca: DID\nCantidad: 1 cadena\nColor: Dorado\nMaterial: Acero reforzado\nTipo: 520H\nCompatibilidad: Deportivas\nOrigen: Japón\nGarantía: 1 año`
  },
  {
    id: 4,
    imagen: img4,
    nombre: "Correa de transmisión automática",
    precio: 90.00,
    descripcion: `Marca: Gates\nCantidad: 1 unidad\nColor: Negro\nMaterial: Goma reforzada\nTipo: Correa dentada\nCompatibilidad: Scooters\nOrigen: EE.UU\nGarantía: 6 meses`
  },
  {
    id: 5,
    imagen: img5,
    nombre: "Amortiguador trasero regulable",
    precio: 200.00,
    descripcion: `Marca: YSS\nCantidad: Par de amortiguadores\nColor: Rojo/Negro\nMaterial: Acero y aluminio\nTipo: Gas y aceite\nCompatibilidad: Naked y Touring\nOrigen: Tailandia\nGarantía: 1 año`
  },
  {
    id: 6,
    imagen: img6,
    nombre: "Placa de matrícula universal",
    precio: 25.00,
    descripcion: `Marca: Genérica\nCantidad: 1 unidad\nColor: Negro\nMaterial: Plástico ABS\nTipo: Universal\nCompatibilidad: Todas\nOrigen: China\nGarantía: 3 meses`
  },
  {
    id: 7,
    imagen: img7,
    nombre: "Batería de gel 12V",
    precio: 100.00,
    descripcion: `Marca: Yuasa\nCantidad: 1 unidad\nColor: Negro\nMaterial: Plomo-Gel\nTipo: Libre de mantenimiento\nCompatibilidad: Hasta 500cc\nOrigen: Japón\nGarantía: 1 año`
  },
  {
    id: 8,
    imagen: img8,
    nombre: "Luces LED para faros",
    precio: 40.00,
    descripcion: `Marca: Philips\nCantidad: Par de bombillos\nColor: Blanco frío\nMaterial: Aluminio\nTipo: H4 LED\nCompatibilidad: Universal\nOrigen: Alemania\nGarantía: 1 año`
  },
  {
    id: 9,
    imagen: img9,
    nombre: "Filtro de aceite de cartridge",
    precio: 15.00,
    descripcion: `Marca: K&N\nCantidad: 1 unidad\nColor: Amarillo\nMaterial: Papel y metal\nTipo: Cartridge\nCompatibilidad: 150cc-300cc\nOrigen: EE.UU\nGarantía: 3 meses`
  },
  {
    id: 10,
    imagen: img10,
    nombre: "Neumático delantero 90/90-17",
    precio: 120.00,
    descripcion: `Marca: Michelin\nCantidad: 1 neumático\nColor: Negro\nMaterial: Caucho\nTipo: Radial\nCompatibilidad: Deportivas\nOrigen: Francia\nGarantía: 1 año`
  },
  {
    id: 11,
    imagen: img11,
    nombre: "Cúpula transparente para moto",
    precio: 80.00,
    descripcion: `Marca: Puig\nCantidad: 1 unidad\nColor: Transparente\nMaterial: Acrílico\nTipo: Aerodinámico\nCompatibilidad: Naked\nOrigen: España\nGarantía: 6 meses`
  },
  {
    id: 12,
    imagen: img12,
    nombre: "Espejo retrovisor tipo racing",
    precio: 35.00,
    descripcion: `Marca: Rizoma\nCantidad: Par de espejos\nColor: Negro\nMaterial: Aluminio\nTipo: Racing\nCompatibilidad: Naked y sport\nOrigen: Italia\nGarantía: 1 año`
  },
  {
    id: 13,
    imagen: img13,
    nombre: "Manillar estilo motocross",
    precio: 60.00,
    descripcion: `Marca: ProTaper\nCantidad: 1 manillar\nColor: Negro\nMaterial: Aluminio 7075\nTipo: Motocross\nCompatibilidad: Enduro/Cross\nOrigen: EE.UU\nGarantía: 1 año`
  },
  {
    id: 14,
    imagen: img14,
    nombre: "Caballetes laterales de aluminio",
    precio: 55.00,
    descripcion: `Marca: Genérica\nCantidad: 1 unidad\nColor: Plata\nMaterial: Aluminio\nTipo: Lateral\nCompatibilidad: Universal\nOrigen: China\nGarantía: 6 meses`
  },
  {
    id: 15,
    imagen: img15,
    nombre: "Sistema de escape deportivo",
    precio: 250.00,
    descripcion: `Marca: Akrapovic\nCantidad: 1 escape\nColor: Negro/Carbono\nMaterial: Acero y carbono\nTipo: Slip-on\nCompatibilidad: Racing/Sport\nOrigen: Eslovenia\nGarantía: 1 año`
  },
  {
    id: 16,
    imagen: img16,
    nombre: "Interruptor de luz de paso",
    precio: 12.00,
    descripcion: `Marca: Genérica\nCantidad: 1 unidad\nColor: Negro\nMaterial: Plástico\nTipo: Universal\nCompatibilidad: Scooters y motos pequeñas\nOrigen: China\nGarantía: 3 meses`
  },
  {
    id: 17,
    imagen: img17,
    nombre: "Guardabarros trasero",
    precio: 45.00,
    descripcion: `Marca: Acerbis\nCantidad: 1 guardabarros\nColor: Negro\nMaterial: Plástico reforzado\nTipo: Trasero\nCompatibilidad: Enduro y Motocross\nOrigen: Italia\nGarantía: 6 meses`
  },
  {
    id: 18,
    imagen: img18,
    nombre: "Repuestos de carburador Keihin",
    precio: 70.00,
    descripcion: `Marca: Keihin\nCantidad: Kit completo\nColor: Plateado\nMaterial: Metal\nTipo: Reparación\nCompatibilidad: 150cc-250cc\nOrigen: Japón\nGarantía: 6 meses`
  },
  {
    id: 19,
    imagen: img19,
    nombre: "Aceite de motor 10W-40",
    precio: 50.00,
    descripcion: `Marca: Motul\nCantidad: 1 litro\nColor: Ámbar\nMaterial: Sintético\nTipo: 10W-40\nCompatibilidad: 4 tiempos\nOrigen: Francia\nGarantía: 1 año`
  },
  {
    id: 20,
    imagen: img20,
    nombre: "Filtro de aire tipo cónico",
    precio: 30.00,
    descripcion: `Marca: K&N\nCantidad: 1 filtro\nColor: Rojo\nMaterial: Goma y algodón\nTipo: Cónico\nCompatibilidad: Universal\nOrigen: EE.UU\nGarantía: 1 año`
  }
];

export default repuestosMoto;
