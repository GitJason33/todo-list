require("dotenv").configDotenv({ path: "./.env" });

const express = require('express');
const cors = require('cors');
const logger = require("morgan");

const ErrorHandler = require("./controllers/middlewares/ErrorHandler.js");
const APIKeyChecker = require("./controllers/middlewares/ApiKeyChecker.js");

const userRouter = require("./controllers/routes/user-route.js");
const taskRouter = require("./controllers/routes/task-route.js");


// init variables
const app = express();
const PORT = process.env.PORT || 12_000;


// middlewares
app.use(logger('dev'));
app.use(cors({ origin: JSON.parse(process.env.ALLOWED_CLIENTS) }));
app.use(APIKeyChecker);
app.use(express.json());



// endpoint routers
app.get("/api", (req, resp) => {
  resp.json({ msg: "welcome to todo_list app" })
});
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);



// end route is the error one
app.use(ErrorHandler);



// app listens at port on localhost
app.listen(
  PORT, 
  () => console.log(`API running at ${
    process.env.DEV_MODE === 'dev' 
      ? 'http://localhost:12000/api'
      : 'http://api-todolistjason33/api'
  }`)
);