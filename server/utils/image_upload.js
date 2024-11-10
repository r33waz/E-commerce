import multer from "multer";

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix); // generate unique filename
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Invalid File type. Only images allowed."), false); // reject file
  }
};

export const upload = multer({
    storage,
    limits: {
      fileSize: 60 * 1024 * 1024,
    },
    fileFilter,
  });
  


