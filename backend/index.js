const express = require("express");
const cors = require("cors");
require("./db/config");
require('dotenv').config();
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.jwtKey;
const app = express();

app.use(express.json());
app.use(cors()); // a middleware

app.post("/register", async (req, resp) => {
  
  const existingUser = await User.findOne({ "email":req.body.email });
  
  if (existingUser) {
    return resp.status(400).json({ message: "User already exists" });
  }
  
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "48h" }, (err, token) => {
    if (err) {
      resp.send("Something went wrong");
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password"); // get all field except results
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "48h" }, (err, token) => {
        if (err) {
          resp.send("Something went wrong");
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No User found" });
    }
  } else {
    resp.send({ result: "No User found" });
  }
});

app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  const { userId } = req.query;
  const products = await Product.find({ userId: userId });
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// Haven't used parameterized URLs for update and delete functionality coz they will be available to update and delete only to authenticated user and they are being filtered out by their id

app.get("/product/:id", verifyToken, async (req, resp) => {
  //deleting product
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  //updating product
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  const { userId } = req.query;
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
    userId: userId,
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please provide token with headers" });
  }
}

app.listen(5000);
