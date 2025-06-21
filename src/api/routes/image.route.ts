import { Router } from "express";
import { uploadImages } from "@src/api/controllers/image.controller";
import { upload } from "@src/api/middlewares/upload-image";

const router = Router();

router.post("/upload", upload.array("product", 4), uploadImages);

export default router;
