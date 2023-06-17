const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const { userRouter } = require("./routes/user.routes");
app.use("/api", userRouter);
const { adddataRouter } = require("./routes/data.routes");
app.use("/api", adddataRouter);
app.listen(port, () => {
  console.log(`Your Server Run Port No: http://localhost:${port}`);
});
