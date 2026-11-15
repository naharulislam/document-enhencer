import cv2
import numpy as np


def _robust_gaussian_sigma(gray_img: np.ndarray) -> float:
    """Gaussian noise sigma using the median absolute deviation of a Laplacian-type
    response. Unlike a mean-based estimate, salt & pepper outliers are ignored."""
    kernel = np.array([[1, -2, 1],
                       [-2, 4, -2],
                       [1, -2, 1]], dtype=np.float32)
    conv = cv2.filter2D(gray_img.astype(np.float32), -1, kernel)
    return float(1.4826 * np.median(np.abs(conv)) / 6.0)


def remove_noise(gray_img: np.ndarray, median_size: int = 3, morph_size: int = 2,
                 noise_sigma: float = 0.0) -> np.ndarray:
    """Median (salt & pepper) -> Non-local means (gaussian noise) -> light morphology."""
    if median_size % 2 == 0:
        median_size += 1

    # NLM strength from the gaussian part of the noise only
    h = float(np.clip(_robust_gaussian_sigma(gray_img) * 0.9, 3, 14))

    # 1. Median filter: removes salt & pepper noise
    out = cv2.medianBlur(gray_img, median_size)

    # 2. Non-local means: removes gaussian-type noise
    out = cv2.fastNlMeansDenoising(out, None, h=h, templateWindowSize=7, searchWindowSize=21)

    # 3. Morphological closing: fills tiny gaps inside character strokes
    if morph_size > 1:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (morph_size, morph_size))
        out = cv2.morphologyEx(out, cv2.MORPH_CLOSE, kernel)
    return out