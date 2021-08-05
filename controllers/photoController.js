const multer = require('multer');
const sharp = require('sharp');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Plik nie jest zdjęciem! Proszę wybrać zdjęcie', 400),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhotoImage = upload.single('photo');

exports.resizePhotoImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  //I put the image filenames on request.body. And I do that so that in the next middleware,which is the actual route handler,it will then put that data onto the new document when it updates
  req.body.image = `photo-${req.params.id}-${Date.now()}-img.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/src/images/gallery/${req.body.image}`);

  next();
});

exports.getAllPhoto = factory.getAll(Photo);
exports.getPhoto = factory.getOne(Photo);
exports.createPhoto = factory.createOne(Photo);
exports.updatePhoto = factory.updateOne(Photo);
exports.deletePhoto = factory.deleteOne(Photo);
