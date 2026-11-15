import cv2
import numpy as np


def _despeckle(binary: np.ndarray, min_area: int) -> np.ndarray:
    """Remove tiny black specks (noise) from a text-black / paper-white image."""
    inv = (binary == 0).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(inv, connectivity=8)
    keep = np.zeros(n, dtype=bool)
    keep[1:] = stats[1:, cv2.CC_STAT_AREA] >= min_area
    return np.where(keep[labels], 0, 255).astype(np.uint8)


def _odd(n: float) -> int:
    n = int(round(n))
    return n if n % 2 == 1 else n + 1


def sauvola(gray: np.ndarray, window: int, k: float = 0.2, R: float = 128.0) -> np.ndarray:
    """Sauvola local threshold: T = mean * (1 + k * (std / R - 1)). Made for documents."""
    g = gray.astype(np.float32)
    mean = cv2.boxFilter(g, -1, (window, window), normalize=True, borderType=cv2.BORDER_REFLECT)
    sq = cv2.boxFilter(g * g, -1, (window, window), normalize=True, borderType=cv2.BORDER_REFLECT)
    std = np.sqrt(np.maximum(sq - mean * mean, 0))
    thresh = mean * (1 + k * (std / R - 1))
    return np.where(g > thresh, 255, 0).astype(np.uint8)


def binarize(gray_img: np.ndarray, block_size: int = 41, c_value: int = 15,
             scale: float = 1.0, sauvola_k: float = 0.2):
    """Returns (otsu, adaptive, sauvola). `scale` = how much the image was upscaled,
    so window sizes grow with it."""
    block = max(_odd(block_size * scale), 3)

    smooth = cv2.GaussianBlur(gray_img, (0, 0), 0.8)
    min_area = max(6, (gray_img.shape[0] * gray_img.shape[1]) // 200000)

    _, otsu = cv2.threshold(smooth, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    adaptive = cv2.adaptiveThreshold(
        smooth, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, block, c_value
    )
    sauv = sauvola(smooth, window=block, k=sauvola_k)

    return (_despeckle(otsu, min_area),
            _despeckle(adaptive, min_area),
            _despeckle(sauv, min_area))