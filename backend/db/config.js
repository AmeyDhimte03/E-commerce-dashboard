const mongoose= require('mongoose');
require('dotenv').config();
// mongoose.connect("mongodb://localhost:27017/e-commerce")
// dbName = "e-commerce";

// MONGO_URI="mongodb+srv://ameydhimtecoding:mongodbdatabasepassword@cluster0.rgln5qn.mongodb.net/";
// MONGO_URI="mongodb+srv://ameydhimtecoding:mongodbdatabasepassword@cluster0.rgln5qn.mongodb.net/"+dbName;

MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
}); 