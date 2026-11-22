require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./module/auth/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const courseRouter = require("./module/courses/course.routes");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser())

app.get("/users", (req, res) => {
  const user = {
    name: "Aman",
    age: 20,
    marks: 100,
  };

  res.send(user);
});

app.use("/api/v1", authRouter);
app.use("/api/v1", courseRouter)

// Error middleware must be after routes
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
