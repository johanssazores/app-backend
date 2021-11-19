const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// set up server
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      `${process.env.FRONTEND_URL}`,
    ],
    credentials: true,
  })
);

// connect to mongoDB

mongoose.connect(
  process.env.MDB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

// set up routes
app.use("/auth", require("./routers/userRouter"));
app.use("/customer", require("./routers/customerRouter"));
app.use("/division", require("./routers/divisionRouter"));
app.use("/person", require("./routers/personRouter"));


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));