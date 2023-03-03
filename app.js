const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

// routes
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

// Sample data
app.get("/seedusers", require("./seeders/seedController").seedUsers);
app.get("/seedproducts", require("./seeders/seedController").seedProducts);

app.use(errorMiddleware); // error middleware
module.exports = app;
