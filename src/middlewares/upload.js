const multer = require('multer');

const eateryThumbnail = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/eateries/');
  },
  filename: (req, file, cb) => {
    const mext = file.mimetype.split('/');
    const ext = `.${mext[1]}`;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const mealThumbnail = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/meals/');
  },
  filename: (req, file, cb) => {
    const mext = file.mimetype.split('/');
    const ext = `.${mext[1]}`;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const uploadEaterythumbnail = multer({ storage: eateryThumbnail });
const uploadMealThumbnail = multer({ storage: mealThumbnail });

module.exports = {
  uploadEaterythumbnail,
  uploadMealThumbnail,
};
