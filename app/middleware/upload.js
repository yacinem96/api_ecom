const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const DIR = "./app/public/uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(" ").join("-");
    const savedFilename = uuidv4() + "-" + filename;
    cb(null, savedFilename);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg , .jpeg format allowed "));
    }
  },
});

module.exports = upload;
