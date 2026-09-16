## 🚀 Vitrina de Emprendimientos

### 🌟 Sobre el Proyecto
Una plataforma web moderna, rápida y responsiva diseñada para que estudiantes y profesionales compartan sus proyectos tipo "Pitch". Este sistema permite descubrir, visualizar y clasificar emprendimientos locales de manera profesional, reduciendo la fricción al no requerir inicio de sesión para el usuario final.

### ✨ Características Principales
* **Galería Dinámica:** Visualización en cuadrícula (Grid) que se adapta perfectamente a pantallas de celulares, tablets y computadoras de escritorio.
* **Filtros en Tiempo Real:** Búsqueda y segmentación instantánea de proyectos según la ciudad de residencia y el área de negocio.
* **Vistas de Detalle:** Páginas dedicadas para cada emprendimiento con información completa, descripción del problema que resuelven y botones de contacto (WhatsApp y Correo).
* **Gestor Seguro:** Sistema CRUD de administración mantenido de forma estrictamente local para garantizar la seguridad de los datos.

---

**Arquitectura del Software**

| Categoría | Tecnología | Propósito en el Proyecto |
| :--- | :--- | :--- |
| **Estructura y Diseño** | HTML5 y CSS3 | Interfaz de usuario, variables de diseño y adaptabilidad móvil. |
| **Lógica e Interacción** | JavaScript (Vanilla) | Consumo de APIs, renderizado dinámico y manejo de eventos. |
| **Base de Datos** | Firebase Firestore | Almacenamiento ágil en la nube (NoSQL) para los datos textuales. |
| **Almacenamiento** | ImgBB API | Hosting externo para imágenes, superando límites de capacidad. |

---

### 🛠️ Configuración Local
Si deseas descargar este código y probarlo en tu propia máquina, sigue estas instrucciones:

1. Clona este repositorio o descarga los archivos en tu computadora.
2. Crea un proyecto gratuito en la consola de Firebase y habilita *Firestore Database*.
3. Crea una cuenta gratuita en ImgBB para obtener tu *API Key* de alojamiento de imágenes.
4. Abre los archivos `.js` (`app.js` y `detalle.js`) y reemplaza el objeto `firebaseConfig` y la llave de ImgBB con tus propias credenciales.

> **Nota de Seguridad:** Los archivos de administración y control total han sido excluidos de este repositorio público mediante `.gitignore` para proteger la integridad de los datos.