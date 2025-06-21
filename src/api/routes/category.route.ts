import { Router } from "express";
import {
  addCategory,
  getAllCategories,
} from "@src/api//controllers/category.controller";
import { upload } from "@src/api/middlewares/upload-image";
const router = Router();

router.post("/", upload.single("categoryImage"), addCategory);
router.get("/", getAllCategories);
//   (req, res, next) => {
//   const category = new Category({
//     _id: new mongoose.Types.ObjectId(),
//     categoryName: req.body.categoryName,
//   });
//   category
//     .save()
//     .then((result) => {
//       console.log("Category Saved!!");
//       res.status(200).json({
//         new_category: "new category added",
//       });
//     })
//     .catch((err) => {
//       if (err)
//         res.status(500).json({
//           error: err,
//         });
//     });
// }

//  (req, res, body) => {
//   Category.find()
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

// router.post("/delete-category", (req, res, next) => {
//   Category.deleteOne({ _id: req.body.id })
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

export default router;
