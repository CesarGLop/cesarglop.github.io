import cv2
import os

# Configurar variables
video_path = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/RickAstley-NeverGonnaGiveYouUp.mp4"
output_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/frames"
interval = 0.1  # Intervalo en segundos

# Crear carpeta para guardar cuadros
os.makedirs(output_folder, exist_ok=True)

# Abrir el video
cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error: No se pudo abrir el archivo de video.")
    exit()

fps = cap.get(cv2.CAP_PROP_FPS)  # FPS del video
if fps == 0.0:
    print("Error: No se pudieron obtener los FPS del video.")
    exit()

print(f"FPS del video: {fps}")
frame_interval = int(fps * interval)  # Calcular intervalo en cuadros
print(f"Frame interval: {frame_interval}")

frame_count = 0
saved_count = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        print(f"No se pudieron leer más cuadros después del cuadro {frame_count}.")
        break
    
    # Guardar solo cada n cuadros
    if frame_count % frame_interval == 0:
        frame_filename = os.path.join(output_folder, f"frame_{saved_count:04d}.bmp")
        cv2.imwrite(frame_filename, frame)
        saved_count += 1
        print(f"Guardando cuadro: {frame_filename}")

    frame_count += 1

cap.release()
print(f"Se extrajeron {saved_count} cuadros en {output_folder}")
