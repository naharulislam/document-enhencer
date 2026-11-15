import cv2
import numpy as np


def normalize_illumination(gray_img: np.ndarray, bg_sigma: float = 25,
                           clip_limit: float = 2.0, tile_size: int = 8) -> np.ndarray:
    """Background division -> white-point stretch -> gentle CLAHE -> re-whiten paper.
    Paper becomes pure white, text stays dark, so the result is high contrast."""
    h, w = gray_img.shape
    k = max(15, int(min(h, w) / 40) | 1)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
    background = cv2.morphologyEx(gray_img, cv2.MORPH_CLOSE, kernel)
    background = cv2.GaussianBlur(background, (0, 0), sigmaX=bg_sigma, sigmaY=bg_sigma)
    background = np.maximum(background, 1)

    norm = np.clip(gray_img.astype(np.float32) / background.astype(np.float32), 0, 1)

    def stretch(img):
        # Only push paper to white (white point = median). Dark end is left
        # untouched so blurred strokes do not turn into fat black blobs.
        white = np.percentile(img, 50)
        return np.clip(img / max(white, 1e-3), 0, 1)

    out = (stretch(norm) * 255).astype(np.uint8)

    clahe = cv2.createCLAHE(clipLimit=min(clip_limit, 2.0), tileGridSize=(tile_size, tile_size))
    out = clahe.apply(out)

    # CLAHE greys the paper slightly: push paper back to white
    out = (stretch(out.astype(np.float32)) * 255).astype(np.uint8)
    return out