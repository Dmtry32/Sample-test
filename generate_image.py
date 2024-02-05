from PIL import Image, ImageDraw
import numpy as np

def generate_happy_badge(size=512):
    # Create a blank image with a transparent background
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    # Draw a filled circle with happy colors (green in this case)
    center = (size // 2, size // 2)
    radius = size // 2
    for x in range(size):
        for y in range(size):
            distance_to_center = np.sqrt((x - center[0]) ** 2 + (y - center[1]) ** 2)
            if distance_to_center <= radius:
                draw.point((x, y), fill=(0, 255, 0, 255))  # Green color

    # Save the image
    image.save("image.png")
    image.show()

# Appeler la fonction pour générer l'image joyeuse avec une couleur verte
generate_happy_badge()
