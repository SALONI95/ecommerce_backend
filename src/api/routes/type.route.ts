import { Router } from "express";
import { addType, getAllTypes } from "@src/api/controllers/type.controller";
import { upload } from "@src/api/middlewares/upload-image";

const router = Router();

router.post("/", upload.single("typeImage"), addType);
router.get("/", getAllTypes);
export default router;
//   (req, res, next) => {
//   const type = new Type({
//     _id: new mongoose.Types.ObjectId(),
//     typeName: req.body.typeName,
//   });
//   type
//     .save()
//     .then((result) => {
//       console.log("Product Saved!!");
//       res.status(200).json({
//         new_type: "new type added",
//       });
//     })
//     .catch((err) => {
//       if (err)
//         res.status(500).json({
//           error: err,
//         });
//     });
// }

//   (req, res, body) => {
//   Type.find()
//     .then((result) => {
//       res.status(200).json({
//         dataList: result,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// }

// router.post("/delete-type", (req, res, next) => {
//   Type.deleteOne({ _id: req.body.id })
//     .then((result) => {
//       res.status(200).json({
//         data: result,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         error: err,
//       });
//     });
// });
