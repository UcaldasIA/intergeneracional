// 1. Importar las funciones de Firebase (usamos la versión compatible con módulos)
/* import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// 2. PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE (La que copiaste en el paso 1)
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1YqBCExT6pA-fiNvi4IGZGE4SfssvT90",
  authDomain: "interg-67cdf.firebaseapp.com",
  projectId: "interg-67cdf",
  storageBucket: "interg-67cdf.firebasestorage.app",
  messagingSenderId: "985137196922",
  appId: "1:985137196922:web:a79e40996f079d77c670c3",
  measurementId: "G-M3H00HJSEN"
};

// 3. PEGA AQUÍ TU API KEY DE IMGBB
const IMGBB_API_KEY = "a0a8c5ce9b36a52b827d03d6b9f50911";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

// Referencias a los elementos del HTML
const form = document.getElementById('pitch-form');
const loadingMsg = document.getElementById('loading-msg');
const submitBtn = document.getElementById('submit-btn');
const projectsGrid = document.getElementById('projects-grid');
const filtroCiudad = document.getElementById('filtro-ciudad');
const filtroCategoria = document.getElementById('filtro-categoria');

// Escuchar cambios para recargar la galería automáticamente
filtroCiudad.addEventListener('change', cargarProyectos);
filtroCategoria.addEventListener('change', cargarProyectos);

// 4. Función para subir la imagen a ImgBB
async function subirImagenAImgBB(archivo) {
    const formData = new FormData();
    formData.append('image', archivo);

    try {
        const respuesta = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const datos = await respuesta.json();
        return datos.data.url; // Retorna el link público de la imagen
    } catch (error) {
        console.error("Error subiendo imagen:", error);
        alert("Hubo un error subiendo la imagen.");
        return null;
    }
}

// 5. Evento cuando alguien envía el formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página recargue

    // Mostrar estado de carga
    submitBtn.disabled = true;
    loadingMsg.style.display = 'block';

    // Capturar datos del formulario
    const nombre = document.getElementById('nombre').value;
    const ciudad = document.getElementById('ciudad').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const categoria = document.getElementById('categoria').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenInput = document.getElementById('imagen');
    
    // Subir imagen y obtener el link
    const urlImagen = await subirImagenAImgBB(imagenInput.files[0]);

    if (urlImagen) {
        // Guardar todo en Firebase Firestore
        try {
            await addDoc(collection(db, "emprendimientos"), {
                nombre: nombre,
                ciudad: ciudad,
                correo: correo,
                telefono: telefono,
                categoria: categoria,
                descripcion: descripcion,
                imagen: urlImagen,
                fecha: new Date()
            });
            
            alert("¡Emprendimiento publicado con éxito!");
            form.reset(); // Limpiar el formulario
            cargarProyectos(); // Recargar la galería
        } catch (error) {
            console.error("Error guardando datos:", error);
            alert("Error al guardar en la base de datos.");
        }
    }

    // Restaurar el botón
    submitBtn.disabled = false;
    loadingMsg.style.display = 'none';
});

// 6. Función para cargar y filtrar los proyectos
async function cargarProyectos() {
    projectsGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Cargando proyectos...</p>'; 
    
    try {
        const q = query(collection(db, "emprendimientos"), orderBy("fecha", "desc"));
        const querySnapshot = await getDocs(q);
        
        projectsGrid.innerHTML = ''; // Limpiar galería
        
        const ciudadSeleccionada = filtroCiudad.value;
        const categoriaSeleccionada = filtroCategoria.value;
        let proyectosMostrados = 0;
        
        querySnapshot.forEach((doc) => {
            const proyecto = doc.data();
            const idProyecto = doc.id;
            
            // Verificamos si el proyecto cumple con los filtros elegidos
            const pasaFiltroCiudad = (ciudadSeleccionada === "Todas" || proyecto.ciudad === ciudadSeleccionada);
            const pasaFiltroCategoria = (categoriaSeleccionada === "Todas" || proyecto.categoria === categoriaSeleccionada);
            
            if (pasaFiltroCiudad && pasaFiltroCategoria) {
                proyectosMostrados++;
                const cardHTML = `
                    <a href="detalle.html?id=${idProyecto}" target="_blank" style="text-decoration: none; color: inherit;">
                        <div class="project-card">
                            <img src="${proyecto.imagen}" alt="Pitch" class="project-image" loading="lazy">
                            <div class="project-info">
                                <h3>${proyecto.nombre}</h3>
                                <p style="display: inline-block; background: #E0E7FF; color: var(--primary); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; margin-bottom: 10px;">
                                    ${proyecto.categoria || 'Sin categoría'}
                                </p>
                                <p><strong>📍 Ciudad:</strong> ${proyecto.ciudad}</p>
                                <p style="color: var(--primary); margin-top: 10px; font-weight: 600;">Ver detalles &rarr;</p>
                            </div>
                        </div>
                    </a>
                `;
                projectsGrid.innerHTML += cardHTML;
            }
        });

        // Si no hay resultados, mostramos un mensaje
        if (proyectosMostrados === 0) {
            projectsGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-muted);">No hay emprendimientos que coincidan con tu búsqueda.</p>';
        }
        // Actualizar el número del contador en el HTML
        document.getElementById('total-count').textContent = proyectosMostrados;

    } catch (error) {
        console.error("Error cargando proyectos:", error);
    }
}
// Cargar los proyectos apenas se abre la página
cargarProyectos();