import multer from "multer";
import path from "path";
// Image Storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({ storage });

// const uploadMiddleware = (req, res, next) => {
//   // Use multer upload instance
//   console.log("middleware request to upload file", req);
//   upload.array("product", 4)(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }

//     // Retrieve uploaded files
//     const files = req.files;
//     const errors = [];

//     // Validate file types and sizes
//     files.forEach((file) => {
//       const allowedTypes = ["image/jpeg", "image/png"];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       if (!allowedTypes.includes(file.mimetype)) {
//         errors.push(`Invalid file type: ${file.originalname}`);
//       }

//       if (file.size > maxSize) {
//         errors.push(`File too large: ${file.originalname}`);
//       }
//     });

//     // Handle validation errors
//     if (errors.length > 0) {
//       // Remove uploaded files
//       files.forEach((file) => {
//         fs.unlinkSync(file.path);
//       });

//       return res.status(400).json({ errors });
//     }

//     // Attach files to the request object
//     console.log(req.files);
//     req.files = files;

//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// module.exports = uploadMiddleware;
