import numpy as np


def _mse(a: np.ndarray, b: np.ndarray) -> float:
    diff = a.astype(np.float64) - b.astype(np.float64)
    return float(np.mean(diff ** 2))


def _psnr(a: np.ndarray, b: np.ndarray, data_range: float = 255.0) -> float:
    m = _mse(a, b)
    if m == 0:
        return 100.0
    return float(10 * np.log10((data_range ** 2) / m))


def evaluate_quality(original: np.ndarray, processed: np.ndarray) -> dict:
    return {
        "psnr": round(_psnr(original, processed), 2),
        "mse": round(_mse(original, processed), 2),
        "contrast": round(float(processed.astype(np.float64).std()), 2),
    }


def text_pixel_ratio(binary_img: np.ndarray) -> float:
    black = np.sum(binary_img == 0)
    return round(float(100 * black / binary_img.size), 2)
