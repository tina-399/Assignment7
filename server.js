const express = require("express");

require("./config/dbconnect");

const authRoutes = require("./routers/authRouter");
const userRoutes = require("./routers/usersRouter");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(4000, () => console.log("Server up and running"));
