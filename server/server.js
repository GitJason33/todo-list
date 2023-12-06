const express = require('express');
const cors = require('cors');
const config = require('config');

const ErrorHandler = require("./controllers/middlewares/ErrorHandler.js");
const APIKeyChecker = require("./controllers/middlewares/APIKeyChecker.js");

const userRouter = require("./controllers/routes/user-route.js");
const taskRouter = require("./controllers/routes/task-route.js");


// init variables
const app = express();
const PORT = process.env.PORT || 4500;


// middlewares
app.use(cors({ origin: config.get("allowed_clients") }));
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
  () => console.log(`API running at http://localhost:${PORT}/api`)
);