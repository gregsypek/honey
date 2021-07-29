const multer = require('multer');
const sharp = require('sharp');
const Honey = require('../models/honeyModel');
const catchAsync = require('../utils/catchAsync');

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

exports.uploadHoneyImage = upload.single('photo');

exports.resizeHoneyImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  //I put the image filenames on request.body. And I do that so that in the next middleware,which is the actual route handler,it will then put that data onto the new document when it updates
  req.body.image = `honey-${req.params.id}-${Date.now()}-cover.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/src/images/honeys/${req.body.image}`);

  next();
});

const factory = require('./handlerFactory');

exports.getAllHoney = factory.getAll(Honey);
exports.getHoney = factory.getOne(Honey, { path: 'reviews' });
exports.createHoney = factory.createOne(Honey);
exports.updateHoney = factory.updateOne(Honey);
exports.deleteHoney = factory.deleteOne(Honey);
