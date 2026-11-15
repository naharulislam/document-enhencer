import cv2
import numpy as np


def _score(bw: np.ndarray, angle: float) -> float:
    h, w = bw.shape
    M = cv2.getRotationMatrix2D((w / 2, h / 2), angle, 1.0)
    rot = cv2.warpAffine(bw, M, (w, h), flags=cv2.INTER_NEAREST)
    prof = rot.sum(axis=1, dtype=np.float32)
    return float(np.sum(np.diff(prof) ** 2))  # text lines sharp => high score


def estimate_skew(gray_img: np.ndarray, max_angle: float = 10.0) -> float:
    """Projection-profile method: find the rotation that makes text lines sharpest."""
    h, w = gray_img.shape
    s = min(1.0, 800 / max(h, w))
    small = cv2.resize(gray_img, (int(w * s), int(h * s)), interpolation=cv2.INTER_AREA)
    small = cv2.GaussianBlur(small, (3, 3), 0)
    _, bw = cv2.threshold(small, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    coarse = np.arange(-max_angle, max_angle + 0.01, 0.5)
    best = max(coarse, key=lambda a: _score(bw, a))
    fine = np.arange(best - 0.5, best + 0.51, 0.1)
    best = max(fine, key=lambda a: _score(bw, a))
    return float(round(best, 2))


def deskew(gray_img: np.ndarray, max_angle: float = 10.0):
    """Returns (straightened_image, angle_used)."""
    angle = estimate_skew(gray_img, max_angle)
    if abs(angle) < 0.2:
        return gray_img, 0.0
    h, w = gray_img.shape
    M = cv2.getRotationMatrix2D((w / 2, h / 2), angle, 1.0)
    out = cv2.warpAffine(gray_img, M, (w, h), flags=cv2.INTER_CUBIC,
                         borderMode=cv2.BORDER_REPLICATE)
    return out, angle