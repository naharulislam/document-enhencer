from pydantic import BaseModel


class Settings(BaseModel):
    median_size: int = 3
    morph_size: int = 2
    bg_sigma: float = 25
    clip_limit: float = 2.0
    tile_size: int = 8
    sharpen_amount: float = 2.5
    sharpen_sigma: float = 1.5
    block_size: int = 41
    c_value: int = 15
    upscale: float = 2.0
    sauvola_k: float = 0.2