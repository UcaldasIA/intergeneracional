import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// PEGA AQUÍ TU firebaseConfig IGUAL QUE EN app.js
const firebaseConfig = {
  apiKey: "AIzaSyA1YqBCExT6pA-fiNvi4IGZGE4SfssvT90",
  authDomain: "interg-67cdf.firebaseapp.com",
  projectId: "interg-67cdf",
  storageBucket: "interg-67cdf.firebasestorage.app",
  messagingSenderId: "985137196922",
  appId: "1:985137196922:web:a79e40996f079d77c670c3",
  measurementId: "G-M3H00HJSEN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Leer el ID que viene en la URL (ej: detalle.html?id=12345)
const urlParams = new URLSearchParams(window.location.search);
const idProyecto = urlParams.get('id');

async function cargarDetalle() {
    const contenedor = document.getElementById('detalle-container');

    if (!idProyecto) {
        contenedor.innerHTML = "<h2>No se encontró el emprendimiento.</h2>";
        return;
    }

    try {
        // Buscar un solo documento por su ID
        const docRef = doc(db, "emprendimientos", idProyecto);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const proyecto = docSnap.data();
            
            // Mostrar toda la información
contenedor.innerHTML = `
                    <div class="detalle-wrapper">
                        <div class="detalle-header">
                            <h2>${proyecto.nombre}</h2>
                        </div>
                        
                        <img src="${proyecto.imagen}" alt="Pitch de ${proyecto.nombre}" class="detalle-img">
                        
                        <div class="detalle-body">
                            <p class="descripcion">${proyecto.descripcion}</p>
                            <hr>
                            <p><strong>📍 Ubicación:</strong> ${proyecto.ciudad}</p>
                            <p><strong>🏷️ Categoría:</strong> ${proyecto.categoria || 'Sin categoría'}</p>
                            <p><strong>📧 Contacto:</strong> <a href="mailto:${proyecto.correo}">${proyecto.correo}</a></p>
                            <p><strong>📱 WhatsApp:</strong> <a href="https://wa.me/${proyecto.telefono}" target="_blank">${proyecto.telefono}</a></p>
                        </div>
                    </div>
                `;
                
                // Quitamos estilos centrados del contenedor principal para que herede nuestro diseño
                contenedor.style.textAlign = 'left';
                contenedor.style.background = 'transparent';
                contenedor.style.padding = '0';
                contenedor.style.boxShadow = 'none';
        } else {
            contenedor.innerHTML = "<h2>El emprendimiento ya no existe.</h2>";
        }
    } catch (error) {
        console.error("Error obteniendo documento:", error);
        contenedor.innerHTML = "<h2>Hubo un error cargando los datos.</h2>";
    }
}

cargarDetalle();