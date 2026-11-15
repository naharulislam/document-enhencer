import base64
import cv2
import numpy as np


def bytes_to_gray(data: bytes, max_side: int = 2000) -> np.ndarray:
    """Upload kora file bytes ke grayscale numpy array te convert kore.
    Boro image (jemon 4K) hole max_side e chhoto kore, jate processing druto hoy."""
    arr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise ValueError("Invalid image file")

    h, w = img.shape
    scale = max_side / max(h, w)
    if scale < 1:
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    return img


def image_to_base64(img: np.ndarray) -> str:
    """Numpy image ke base64 PNG data-URL e convert kore (frontend e dekhanor jonno)."""
    ok, buf = cv2.imencode(".png", img)
    if not ok:
        raise ValueError("Could not encode image")
    b64 = base64.b64encode(buf.tobytes()).decode("utf-8")
    return f"data:image/png;base64,{b64}"