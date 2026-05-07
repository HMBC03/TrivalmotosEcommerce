import React, { useState, useEffect, useContext, useMemo, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import axios from "axios";

import css from "./Trivalmotos.module.css";
import Header from "../components/Header";
import Boton from "../components/Boton";
import { CarritoContext } from "../context/CarritoContext";

/* ─── Datos estáticos ─── */

const YOUTUBE_VIDEO_ID = "PSHTkGHfSVo";

const HERO_SLIDES = [
  {
    image: "https://images.pexels.com/photos/2607333/pexels-photo-2607333.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    badge: "Envíos a todo Colombia",
    title: "Repuestos",
    titleBreak: "originales",
    accent: "para tu moto",
    sub: "Las mejores marcas al mejor precio. Calidad garantizada.",
  },
  {
    image: "https://images.pexels.com/photos/2377894/pexels-photo-2377894.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    badge: "Nuevos productos",
    title: "Kit de arrastre",
    titleBreak: "premium",
    accent: "rendimiento total",
    sub: "Transmisión de calidad para todas las marcas de motos.",
  },
  {
    image: "https://images.pexels.com/photos/2396045/pexels-photo-2396045.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    badge: "Asesoría gratis",
    title: "Protección",
    titleBreak: "que importa",
    accent: "cascos y guantes",
    sub: "Equipamiento certificado para rodar seguro en cada viaje.",
  },
];

const MOTOS_VENTA = [
  {
    id: 1,
    nombre: "Thunder",
    modelo: "250R",
    imagen: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG3132.png",
    specs: [
      { label: "Motor", value: "249 cc" },
      { label: "Potencia", value: "26 HP" },
      { label: "Torque", value: "23 Nm" },
      { label: "Peso", value: "158 kg" },
      { label: "Vel. máx", value: "140 km/h" },
      { label: "Frenos", value: "ABS" },
    ],
    colores: ["#1a1a1a", "#EE2424", "#f5f5f5"],
    precio: "12.500.000",
    tagline: "Potencia urbana",
    subtag: "Espíritu deportivo",
  },
  {
    id: 2,
    nombre: "Raptor",
    modelo: "400",
    imagen: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5341.png",
    specs: [
      { label: "Motor", value: "399 cc" },
      { label: "Potencia", value: "44 HP" },
      { label: "Torque", value: "38 Nm" },
      { label: "Peso", value: "172 kg" },
      { label: "Vel. máx", value: "175 km/h" },
      { label: "Frenos", value: "ABS" },
    ],
    colores: ["#0a0a0a", "#1e3a5f", "#8b8b8b"],
    precio: "18.900.000",
    tagline: "Aventura sin límites",
    subtag: "Alma viajera",
  },
  {
    id: 3,
    nombre: "Viper",
    modelo: "650",
    imagen: "https://pngimg.com/uploads/motorcycle/motorcycle_PNG5342.png",
    specs: [
      { label: "Motor", value: "649 cc" },
      { label: "Potencia", value: "72 HP" },
      { label: "Torque", value: "63 Nm" },
      { label: "Peso", value: "189 kg" },
      { label: "Vel. máx", value: "210 km/h" },
      { label: "Frenos", value: "ABS Dual" },
    ],
    colores: ["#111111", "#EE2424", "#c4a032"],
    precio: "28.700.000",
    tagline: "Potencia pura",
    subtag: "Espíritu salvaje",
  },
];

const PRODUCTOS_FALLBACK = [
  {
    id: "fb1",
    nombre: "Casco integral deportivo",
    precio: 289000,
    imagenUrl: "https://pngimg.com/uploads/motorcycle_helmets/motorcycle_helmets_PNG103224.png",
  },
  {
    id: "fb2",
    nombre: "Cadena reforzada Revo 428H",
    precio: 95000,
    imagenUrl: "https://ragmotos.com.co/wp-content/uploads/2021/03/Cadena-428-520-Dorada-Reforzada-Oring-Orrinada-Encauchetada-Revo-ragmotos-repuestos-accesorios-Moto-Racing7.jpg",
  },
  {
    id: "fb3",
    nombre: "Aceite Motul 7100 10W-40",
    precio: 62000,
    imagenUrl: "https://adnmotoracing.com/wp-content/uploads/2022/01/Motul-7100-10W40-4T.jpg",
  },
  {
    id: "fb4",
    nombre: "Llanta Michelin Pilot Street 2",
    precio: 185000,
    imagenUrl: "https://dxm.contentcenter.michelin.com/api/wedia/dam/transform/b98rpyxf61b4qzptzsictt3x6a/mo-93_tire_michelin_pilot-street-2_ww_set_a_main_1-30_nopad.webp",
  },
];

const OPINIONES = [
  {
    nombre: "Carlos Méndez",
    ciudad: "Bogotá",
    texto: "Excelente calidad en los repuestos. El kit de arrastre que compré para mi Yamaha FZ quedó perfecto. Envío rápido y bien empacado.",
    rating: 5,
  },
  {
    nombre: "Laura Gómez",
    ciudad: "Medellín",
    texto: "Llevo 3 compras y siempre me ha ido bien. Los precios son competitivos y el aceite Motul que pedí llegó original. Muy recomendados.",
    rating: 5,
  },
  {
    nombre: "Andrés Patiño",
    ciudad: "Cali",
    texto: "Buen servicio al cliente. Tuve una duda con la compatibilidad de unas pastillas de freno y me asesoraron muy bien antes de comprar.",
    rating: 4,
  },
  {
    nombre: "María Fernanda López",
    ciudad: "Barranquilla",
    texto: "El casco LS2 que compré tiene muy buena relación calidad-precio. La tienda online es fácil de usar y el proceso de pago es seguro.",
    rating: 5,
  },
  {
    nombre: "Diego Ramírez",
    ciudad: "Pereira",
    texto: "Compré un kit de arrastre DID y las pastillas de freno. Todo llegó en dos días y la calidad es impecable. Volveré a comprar seguro.",
    rating: 5,
  },
  {
    nombre: "Valentina Torres",
    ciudad: "Bucaramanga",
    texto: "Me encantó la atención personalizada. Me ayudaron a elegir el aceite correcto para mi Honda CB190R. Precios justos y envío rápido.",
    rating: 4,
  },
  {
    nombre: "Sebastián Herrera",
    ciudad: "Cartagena",
    texto: "Las llantas Michelin que pedí llegaron en perfecto estado. Se nota la diferencia en agarre y frenado. Totalmente satisfecho con la compra.",
    rating: 5,
  },
  {
    nombre: "Camila Ríos",
    ciudad: "Manizales",
    texto: "Pedí unos espejos retrovisores y un kit de luces LED. Todo original y a buen precio. La página es muy fácil de navegar.",
    rating: 4,
  },
  {
    nombre: "Jorge Castillo",
    ciudad: "Cúcuta",
    texto: "Compré la batería Yuasa para mi Pulsar 200 y funciona de maravilla. El envío fue rápido y llegó bien protegida. Recomendado.",
    rating: 5,
  },
  {
    nombre: "Natalia Vargas",
    ciudad: "Ibagué",
    texto: "Muy buena experiencia. El disco de freno Galfer que compré es de excelente calidad. Ya llevo dos meses y cero problemas.",
    rating: 5,
  },
  {
    nombre: "Felipe Moreno",
    ciudad: "Villavicencio",
    texto: "Encontré repuestos que en otras tiendas no tenían. El amortiguador trasero para mi FZ quedó perfecto. Gran variedad de productos.",
    rating: 4,
  },
];

/* ─── Variantes de animación ─── */

const contentContainerVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const contentItemVariants = {
  enter: { opacity: 0, y: 30, filter: "blur(4px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
};

/* ─── Subcomponentes ─── */

function StarRating({ count }) {
  return (
    <span className={css.stars} aria-label={`${count} de 5 estrellas`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function OpinionCard({ opinion }) {
  const iniciales = opinion.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className={css.opinionCard}>
      <StarRating count={opinion.rating} />
      <p className={css.opinionTexto}>{opinion.texto}</p>
      <div className={css.opinionAutor}>
        <div className={css.opinionAvatar}>{iniciales}</div>
        <div className={css.opinionAutorInfo}>
          <strong>{opinion.nombre}</strong>
          <span>{opinion.ciudad}</span>
        </div>
      </div>
    </div>
  );
}

function OpinionesSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (progress) => {
    if (!trackRef.current) return 0;
    const trackW = trackRef.current.scrollWidth;
    const viewW = window.innerWidth;
    const range = Math.max(0, trackW - viewW + 80);
    return -progress * range;
  });

  return (
    <section ref={containerRef} className={css.opinionesPinWrapper}>
      <div className={css.opinionesSticky}>
        <div className={css.opinionesHeader}>
          <h2 className={css.opinionesTitulo}>
            Nuestros <span className={css.heroAccent}>clientes</span>
          </h2>
          <p className={css.opinionesSub}>
            La confianza de quienes nos eligen nos impulsa a seguir mejorando
          </p>
        </div>
        <motion.div ref={trackRef} style={{ x }} className={css.opinionesTrack}>
          {OPINIONES.map((opinion) => (
            <OpinionCard key={opinion.nombre} opinion={opinion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductoCard({ producto, onAgregar }) {
  return (
    <div className={css.productoCard}>
      <Link to={`/Trivalmotos/tienda/productos/${producto.id}`} className={css.productoImgLink}>
        <img src={producto.imagenUrl} alt={producto.nombre} loading="lazy" className={css.productoImg} />
      </Link>
      <div className={css.productoInfoTop}>
        <Link to={`/Trivalmotos/tienda/productos/${producto.id}`} className={css.productoNombreLink}>
          <h6 className={css.productoNombre}>{producto.nombre}</h6>
        </Link>
      </div>
      <div className={css.productoInfoBottom}>
        <p className={css.productoPrecio}>
          $ {Number(producto.precio).toLocaleString("es-CO")}
        </p>
        <Boton
          texto="Agregar"
          funcion={() => onAgregar(producto)}
          style={{
            fontSize: "0.5rem",
            padding: "0.3rem 0.7rem",
            background: "rgba(238, 36, 36, 0.9)",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            width: "fit-content",
          }}
        />
      </div>
    </div>
  );
}

function MotoSlider() {
  const [motoIndex, setMotoIndex] = useState(0);
  const [motoDir, setMotoDir] = useState(1);
  const [colorActivo, setColorActivo] = useState(0);
  const moto = MOTOS_VENTA[motoIndex];

  const paginateMoto = useCallback((dir) => {
    setMotoDir(dir);
    setColorActivo(0);
    setMotoIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return MOTOS_VENTA.length - 1;
      if (next >= MOTOS_VENTA.length) return 0;
      return next;
    });
  }, []);

  // Auto-play cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => paginateMoto(1), 6000);
    return () => clearInterval(interval);
  }, [paginateMoto]);

  return (
    <section className={css.motosSection}>
      <div className={css.motosSectionHeader}>
        <h2 className={css.motosSectionTitle}>
          Nuestras <span className={css.heroAccent}>motos</span>
        </h2>
        <p className={css.motosSectionSub}>
          Encuentra la moto perfecta para tu estilo de vida
        </p>
      </div>

      <div className={css.motoSliderWrap}>
        {/* Lado izquierdo: info */}
        <div className={css.motoInfo}>
          <AnimatePresence mode="wait" custom={motoDir}>
            <motion.div
              key={moto.id}
              custom={motoDir}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={css.motoInfoInner}
            >
              <span className={css.motoTag}>{moto.tagline}</span>
              <h3 className={css.motoNombre}>{moto.nombre}</h3>
              <span className={css.motoModelo}>{moto.modelo}</span>

              <div className={css.motoSpecs}>
                {moto.specs.map((spec) => (
                  <div key={spec.label} className={css.motoSpecRow}>
                    <span className={css.motoSpecLabel}>{spec.label}</span>
                    <span className={css.motoSpecValue}>{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className={css.motoBottom}>
                <div className={css.motoColores}>
                  {moto.colores.map((color, i) => (
                    <button
                      key={color}
                      className={`${css.motoColorDot} ${i === colorActivo ? css.motoColorDotActive : ""}`}
                      style={{ background: color }}
                      onClick={() => setColorActivo(i)}
                      aria-label={`Color ${i + 1}`}
                    />
                  ))}
                </div>
                <div className={css.motoPrecioWrap}>
                  <span className={css.motoPrecioDesde}>Desde</span>
                  <span className={css.motoPrecio}>$ {moto.precio}</span>
                </div>
              </div>

              <span className={css.motoSubtag}>{moto.subtag}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lado derecho: imagen (overlap effect) */}
        <div className={css.motoImgWrap}>
          <AnimatePresence mode="sync" custom={motoDir}>
            <motion.img
              key={moto.id}
              src={moto.imagen}
              alt={`${moto.nombre} ${moto.modelo}`}
              className={css.motoImg}
              custom={motoDir}
              initial={(dir) => ({ x: dir > 0 ? "80%" : "-80%", opacity: 0, scale: 0.85, zIndex: 2 })}
              animate={{ x: "0%", opacity: 1, scale: 1, zIndex: 2, transition: { type: "spring", stiffness: 80, damping: 18, mass: 1.2 } }}
              exit={(dir) => ({ x: dir > 0 ? "-40%" : "40%", opacity: 0, scale: 0.9, zIndex: 1, transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } })}
              loading="lazy"
            />
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

/* ─── Componente Principal ─── */

function Trivalmotos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productos, setProductos] = useState([]);
  const [videoReady, setVideoReady] = useState(false);
  const ytPlayerRef = useRef(null);
  const { agregarProducto } = useContext(CarritoContext);

  const slide = HERO_SLIDES[currentIndex];

  const paginate = useCallback((dir) => {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return HERO_SLIDES.length - 1;
      if (next >= HERO_SLIDES.length) return 0;
      return next;
    });
  }, []);

  // Texto del banner siempre itera (independiente del video)
  useEffect(() => {
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  // Cargar YouTube IFrame API y crear player (loop permanente)
  useEffect(() => {
    let cancelled = false;

    const initPlayer = () => {
      if (cancelled || ytPlayerRef.current) return;
      ytPlayerRef.current = new window.YT.Player("yt-hero-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: (e) => {
            e.target.setPlaybackQuality("highres");
            if (!cancelled) {
              setVideoReady(true);
              e.target.playVideo();
            }
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING && !cancelled) {
              if (e.target._limitTimer) clearTimeout(e.target._limitTimer);
              const currentTime = e.target.getCurrentTime();
              const remaining = Math.max(0, (20 - currentTime) * 1000);
              e.target._limitTimer = setTimeout(() => {
                if (e.target.getPlayerState() === window.YT.PlayerState.PLAYING) {
                  e.target.seekTo(0);
                  e.target.playVideo();
                }
              }, remaining);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        initPlayer();
      };
    }

    return () => {
      cancelled = true;
      if (ytPlayerRef.current?.destroy) {
        ytPlayerRef.current.destroy();
        ytPlayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/productos")
      .then((res) => setProductos(res.data))
      .catch(() => setProductos([]));
  }, []);

  const masVendidos = useMemo(
    () => (productos.length > 0 ? productos.slice(0, 4) : PRODUCTOS_FALLBACK),
    [productos]
  );

  const handleAgregar = useCallback(
    (producto) => agregarProducto(producto),
    [agregarProducto]
  );

  return (
    <div className={css.body}>
      <Header />

      {/* ═══ HERO BANNER ═══ */}
      <section className={css.hero}>
        <div className={css.heroCarousel}>
          {/* Imagen estática siempre debajo (evita spinner al loop) */}
          <img
            src={HERO_SLIDES[0].image}
            alt="Trivalmotos banner"
            className={css.heroImg}
          />

          {/* Video YouTube de fondo (loop permanente, encima de la imagen) */}
          <div className={`${css.heroVideo} ${videoReady ? css.heroVideoVisible : ""}`}>
            <div id="yt-hero-player" className={css.heroYtInner} />
          </div>

          <div className={css.heroOverlay} />
        </div>

        {/* Texto itera siempre sobre el video */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={css.heroContent}
            variants={contentContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.span className={css.heroBadge} variants={contentItemVariants}>
              {slide.badge}
            </motion.span>
            <motion.h1 className={css.heroTitle} variants={contentItemVariants}>
              {slide.title} {slide.titleBreak} <br /><span className={css.heroAccent}>{slide.accent}</span>
            </motion.h1>
            <motion.p className={css.heroSub} variants={contentItemVariants}>
              {slide.sub}
            </motion.p>
            <motion.div className={css.heroCtas} variants={contentItemVariants}>
              <Link to="/Trivalmotos/tienda" className={css.ctaPrimary}>Ver tienda</Link>
              <Link to="/Trivalmotos/masinformacion" className={css.ctaSecondary}>Conoce más</Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* ═══ VENTA DE MOTOS (SLIDER) ═══ */}
      <MotoSlider />

      {/* ═══ MÁS VENDIDOS ═══ */}
      <section className={css.seccion}>
        <div className={css.seccionHeaderCenter}>
          <h2>Más <span className={css.heroAccent}>vendidos</span></h2>
          <Link to="/Trivalmotos/tienda" className={css.verTodo}>Ver todo →</Link>
        </div>
        <div className={css.productosGrid}>
          {masVendidos.length > 0 ? (
            masVendidos.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} onAgregar={handleAgregar} />
            ))
          ) : (
            <p className={css.sinProductos}>Cargando productos...</p>
          )}
        </div>
      </section>

      {/* ═══ BANNER PROMOCIONAL ═══ */}
      <section className={css.promoBanner}>
        <div className={css.promoContent}>
          <h2>Calidad que se siente en cada kilómetro</h2>
          <p>Más de 500 referencias disponibles para todas las marcas de motos en Colombia.</p>
          <Link to="/Trivalmotos/tienda" className={css.ctaPrimary}>Explorar catálogo</Link>
        </div>
      </section>

      {/* ═══ OPINIONES (horizontal scroll pinned) ═══ */}
      <OpinionesSection />

      {/* ═══ FOOTER ═══ */}
      <footer className={css.footer}>
        <div className={css.footerTop}>
          <div className={css.footerBrand}>
            <Link to="/Trivalmotos" className={css.footerLogo}>Trivalmotos</Link>
            <p className={css.footerBrandDesc}>
              Tu aliado en repuestos originales para motos.<br />
              Calidad, precio justo y envíos a todo Colombia.
            </p>
          </div>
          <div className={css.footerSocial}>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>

        <div className={css.footerDivider} />

        <div className={css.footerGrid}>
          <div className={css.footerCol}>
            <h6 className={css.footerColTitle}>Navegación</h6>
            <ul>
              <li><Link to="/Trivalmotos">Inicio</Link></li>
              <li><Link to="/Trivalmotos/tienda">Tienda</Link></li>
              <li><Link to="/Trivalmotos/contacto">Contacto</Link></li>
              <li><Link to="/Trivalmotos/masinformacion">Más información</Link></li>
            </ul>
          </div>
          <div className={css.footerCol}>
            <h6 className={css.footerColTitle}>Soporte</h6>
            <ul>
              <li><Link to="/Trivalmotos/masinformacion">Preguntas frecuentes</Link></li>
              <li><Link to="/Trivalmotos/masinformacion">Envíos y devoluciones</Link></li>
              <li><Link to="/Trivalmotos/masinformacion">Garantía</Link></li>
            </ul>
          </div>
          <div className={css.footerCol}>
            <h6 className={css.footerColTitle}>Contacto</h6>
            <ul>
              <li>charlymora332@gmail.com</li>
              <li>Lun - Sáb: 8:00 AM - 6:00 PM</li>
              <li>Colombia</li>
            </ul>
          </div>
          <div className={css.footerCol}>
            <h6 className={css.footerColTitle}>Legal</h6>
            <ul>
              <li><Link to="/Trivalmotos/masinformacion">Términos y condiciones</Link></li>
              <li><Link to="/Trivalmotos/masinformacion">Política de privacidad</Link></li>
              <li><Link to="/Trivalmotos/masinformacion">Política de cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className={css.footerDivider} />

        <div className={css.footerBottom}>
          <span>© 2026 Trivalmotos S.A.S.</span>
          <span className={css.footerBottomRight}>Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  );
}

export default Trivalmotos;
