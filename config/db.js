const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(db);
    console.log('Database connected');
    mongoose.connection.useDb('bloggar-app');
  } catch (error) {
    console.error(error.message);
    console.log('DB connection failed');
    process.exit(1);
  }
};

module.exports = connectDb;
