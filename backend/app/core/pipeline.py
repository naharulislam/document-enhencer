import cv2
import numpy as np

from .noise import estimate_noise
from .denoise import remove_noise
from .deskew import deskew
from .illumination import normalize_illumination
from .sharpen import sharpen_text
from .binarize import binarize
from .metrics import evaluate_quality, text_pixel_ratio


def enhance_document(original: np.ndarray, settings: dict) -> dict:
    """Full pipeline. `original` hocche grayscale image (numpy array)."""

    # 1. Noise estimation
    noise_sigma = estimate_noise(original)

    # 2. Noise removal
    denoised = remove_noise(
        original,
        median_size=settings["median_size"],
        morph_size=settings["morph_size"],
        noise_sigma=noise_sigma,
    )

    # 3. Deskew (tilt thik kora)
    deskewed, skew_angle = deskew(denoised)

    # 4. Illumination normalization
    normalized = normalize_illumination(
        deskewed,
        bg_sigma=settings["bg_sigma"],
        clip_limit=settings["clip_limit"],
        tile_size=settings["tile_size"],
    )

    # 5. Text edge sharpening
    sharpened = sharpen_text(
        normalized,
        amount=settings["sharpen_amount"],
        sigma=settings["sharpen_sigma"],
    )

    # 6. Upscale (smooth character edges) then binarize
    scale = float(settings["upscale"])
    if scale > 1.0:
        h, w = sharpened.shape
        big = cv2.resize(sharpened, (int(w * scale), int(h * scale)),
                         interpolation=cv2.INTER_CUBIC)
    else:
        big = sharpened

    otsu_bin, adaptive_bin, sauvola_bin = binarize(
        big,
        block_size=settings["block_size"],
        c_value=settings["c_value"],
        scale=scale,
        sauvola_k=settings["sauvola_k"],
    )

    return {
        "images": {
            "original": original,
            "denoised": denoised,
            "deskewed": deskewed,
            "normalized": normalized,
            "sharpened": sharpened,
            "otsu": otsu_bin,
            "adaptive": adaptive_bin,
            "sauvola": sauvola_bin,
        },
        "metrics": {
            "noise_sigma": round(noise_sigma, 3),
            "skew_angle": skew_angle,
            "denoise": evaluate_quality(original, denoised),
            "final": evaluate_quality(original, sharpened),
            "otsu_text_ratio": text_pixel_ratio(otsu_bin),
            "adaptive_text_ratio": text_pixel_ratio(adaptive_bin),
            "sauvola_text_ratio": text_pixel_ratio(sauvola_bin),
        },
    }