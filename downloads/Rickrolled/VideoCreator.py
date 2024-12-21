import cv2
import os
from moviepy import VideoFileClip, AudioFileClip

# Directorio que contiene las capturas de pantalla
input_folder = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/Screenshot_Cropped"
output_file = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/output_video.avi"
audio_file = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/NeverGonnaGiveYouUp.mp3"  # Ruta a tu archivo de audio

# Configuración del video
frame_rate = 12.47  # Número de frames por segundo (ajusta según lo necesario)
images = [img for img in os.listdir(input_folder) if img.endswith(".png")]

# Asegurar que las imágenes se ordenen correctamente
images.sort(key=lambda x: int(x.split('_')[1].split('.')[0]))

# Leer la primera imagen para obtener las dimensiones
frame = cv2.imread(os.path.join(input_folder, images[0]))
height, width, layers = frame.shape

# Crear el video
fourcc = cv2.VideoWriter_fourcc(*'XVID')
video = cv2.VideoWriter(output_file, fourcc, frame_rate, (width, height))

# Añadir todas las imágenes al video
for image in images:
    video.write(cv2.imread(os.path.join(input_folder, image)))

# Liberar el objeto video
cv2.destroyAllWindows()
video.release()

# Añadir la pista de audio al video usando moviepy
video_clip = VideoFileClip(output_file)
audio_clip = AudioFileClip(audio_file)

# Ajustar la duración del audio para que coincida con la del video
#audio_clip = audio_clip.set_duration(video_clip.duration)

# Combinar video y audio
final_clip = video_clip.with_audio(audio_clip)
final_output = "C:/Users/cglsy/OneDrive/Desktop/ProyectoNeverGGYU/final_output_video.mp4"
final_clip.write_videofile(final_output, codec="libx264", audio_codec="aac")

print(f"Video con audio creado exitosamente en {final_output}")
