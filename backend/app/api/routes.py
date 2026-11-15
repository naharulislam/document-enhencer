import json

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from ..core.pipeline import enhance_document
from ..schemas import Settings
from ..utils import bytes_to_gray, image_to_base64

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/enhance")
async def enhance(
    file: UploadFile = File(...),
    settings: str = Form("{}"),
):
    # Settings JSON string hishebe ashe, parse kore validate kori
    try:
        cfg = Settings(**json.loads(settings)).model_dump()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid settings")

    data = await file.read()
    try:
        gray = bytes_to_gray(data)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid image file")

    result = enhance_document(gray, cfg)

    images = {name: image_to_base64(img) for name, img in result["images"].items()}

    return {
        "filename": file.filename,
        "shape": {"height": gray.shape[0], "width": gray.shape[1]},
        "images": images,
        "metrics": result["metrics"],
    }