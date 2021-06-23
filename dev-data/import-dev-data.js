const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Honey = require('../models/honeyModel');
//And so what this command will now do is to read our variables from the file and save them into node JS environment variables.
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// console.log(process.env);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

//READ JSON FILE
const honey = JSON.parse(fs.readFileSync(`${__dirname}/honey.json`, 'utf-8'));

//  IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Honey.create(honey);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Honey.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// node dev-data/import-dev-data.js --delete