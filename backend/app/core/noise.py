import cv2
import numpy as np


def estimate_noise(gray_img: np.ndarray) -> float:
    """Laplacian-based noise sigma estimation."""
    H, W = gray_img.shape
    kernel = np.array([[1, -2, 1],
                       [-2, 4, -2],
                       [1, -2, 1]])
    conv = cv2.filter2D(gray_img.astype(np.float64), -1, kernel)
    sigma = np.sum(np.abs(conv)) * np.sqrt(0.5 * np.pi) / (6 * (W - 2) * (H - 2))
    return float(sigma)
