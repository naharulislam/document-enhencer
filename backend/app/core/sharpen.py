import cv2
import numpy as np


def sharpen_text(gray_img: np.ndarray, amount: float = 1.5, sigma: float = 1.0) -> np.ndarray:
    """Unsharp masking."""
    blurred = cv2.GaussianBlur(gray_img, (0, 0), sigma)
    return cv2.addWeighted(gray_img, 1 + amount, blurred, -amount, 0)
