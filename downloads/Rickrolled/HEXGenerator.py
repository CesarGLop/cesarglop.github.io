import cv2
import os
import pandas as pd

# Configuración
input_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/FramesRecolored"  # Carpeta con los frames redimensionados (256x144)
output_excel = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/all_frames_single_sheet.xlsx"  # Nombre del archivo Excel
separator_rows = 1  # Cantidad de filas vacías entre frames

# Crear un DataFrame combinado
combined_df = pd.DataFrame()  # Inicializamos un DataFrame vacío
frame_list = sorted(os.listdir(input_folder))  # Lista de archivos ordenada

for frame_index, filename in enumerate(frame_list):
    if filename.endswith(".bmp"):
        input_path = os.path.join(input_folder, filename)

        # Leer la imagen y convertir a RGB
        img = cv2.imread(input_path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Convertir la imagen a un DataFrame con colores en formato HEX
        frame_data = [
            [f"#{pixel[0]:02x}{pixel[1]:02x}{pixel[2]:02x}" for pixel in row]
            for row in img_rgb
        ]
        frame_df = pd.DataFrame(frame_data)

        # Agregar un separador entre frames si no es el primero
        if not combined_df.empty:
            combined_df = pd.concat(
                [combined_df, pd.DataFrame([[""] * frame_df.shape[1]] * separator_rows)]
            )

        # Agregar el frame al DataFrame combinado
        combined_df = pd.concat([combined_df, frame_df], ignore_index=True)

        print(f"Procesado frame {frame_index + 1}/{len(frame_list)}: {filename}")

# Guardar el DataFrame combinado en una sola hoja de Excel
combined_df.to_excel(output_excel, sheet_name="All_Frames", header=False, index=False)
print(f"Archivo Excel guardado: {output_excel}")
