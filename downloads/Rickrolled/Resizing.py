import cv2
import os
from concurrent.futures import ProcessPoolExecutor

# Carpetas de entrada y salida
input_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/frames"
output_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/frames_resized"
output_size = (256, 144)  # Tamaño de salida en píxeles (ancho, alto)

# Crear carpeta de salida si no existe
os.makedirs(output_folder, exist_ok=True)

def redimensionar_imagen(filename):
    """
    Redimensiona una imagen y la guarda en la carpeta de salida.
    Args:
        filename: Nombre del archivo de la imagen.
    """
    if filename.endswith(".bmp"):  # Procesar solo imágenes BMP
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Leer y redimensionar la imagen
        img = cv2.imread(input_path)
        resized_img = cv2.resize(img, output_size, interpolation=cv2.INTER_AREA)

        # Guardar la imagen redimensionada
        cv2.imwrite(output_path, resized_img)
        print(f"Redimensionado: {filename} a {output_size}")

def redimensionar_todas_las_imagenes():
    """
    Redimensiona todas las imágenes en la carpeta de entrada en paralelo.
    """
    # Lista de archivos en la carpeta de entrada
    file_list = [f for f in os.listdir(input_folder) if f.endswith(".bmp")]

    # Procesar en paralelo
    with ProcessPoolExecutor() as executor:
        executor.map(redimensionar_imagen, file_list)

    print("Proceso de redimensionamiento completado.")

# Ejecutar el procesamiento
if __name__ == "__main__":
    redimensionar_todas_las_imagenes()
