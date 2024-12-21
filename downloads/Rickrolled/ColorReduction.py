import os
import cv2
import numpy as np
from sklearn.cluster import KMeans
from concurrent.futures import ProcessPoolExecutor

# Directorios de entrada y salida
input_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/frames_resized"
output_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/FramesRecolored"

# Crear la carpeta de salida si no existe
os.makedirs(output_folder, exist_ok=True)

def reducir_colores(img, n_colores=16):
    """
    Reduce los colores de una imagen usando KMeans.
    Args:
        img: Imagen en formato numpy array (RGB).
        n_colores: Número de colores en la paleta final.
    Returns:
        Imagen con colores reducidos.
    """
    # Aplanar la imagen para pasarla a KMeans
    datos = img.reshape((-1, 3))
    datos = np.float32(datos)

    # Aplicar KMeans para reducir colores
    kmeans = KMeans(n_clusters=n_colores, random_state=42, n_init=10)
    etiquetas = kmeans.fit_predict(datos)
    colores_cuantizados = kmeans.cluster_centers_.astype("uint8")

    # Reconstruir la imagen con los colores reducidos
    img_reducida = colores_cuantizados[etiquetas].reshape(img.shape)
    return img_reducida

def procesar_frame(filename):
    """
    Procesa un frame individual para reducir sus colores y guardarlo.
    Args:
        filename: Nombre del archivo de la imagen.
    """
    input_path = os.path.join(input_folder, filename)
    output_path = os.path.join(output_folder, filename)

    # Leer la imagen
    img = cv2.imread(input_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convertir a RGB

    # Reducir colores
    img_reducida = reducir_colores(img_rgb, n_colores=16)

    # Guardar la imagen cuantizada
    img_reducida_bgr = cv2.cvtColor(img_reducida, cv2.COLOR_RGB2BGR)  # Convertir de nuevo a BGR para guardar
    cv2.imwrite(output_path, img_reducida_bgr)

    print(f"Procesado: {filename}")

def procesar_todos_los_frames():
    """
    Procesa todos los frames en paralelo.
    """
    frame_list = [f for f in os.listdir(input_folder) if f.endswith(".bmp")]  # Filtrar solo imágenes BMP

    # Procesar en paralelo
    with ProcessPoolExecutor() as executor:
        executor.map(procesar_frame, frame_list)  # Ejecutar la función en paralelo

    print(f"Cuantización completa. Frames guardados en: {output_folder}")

# Ejecutar el procesamiento
if __name__ == "__main__":
    procesar_todos_los_frames()

