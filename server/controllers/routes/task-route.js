const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');

const TaskModel = require("../../models/task-model");
const { toInt } = require("../tools/functions.js");
const { TaskValidator } = require('../tools/validators.js');

const router = express.Router();


/**
 * route:  GET /api/task/all?page=n
 * desc:   retrieve all user todos
 * access: PRIVATE
 */
router.get("/all", isLoggedIn, async (req, resp, next) => {
  try {
    // const page = toInt(req.query?.page, 1);
    const todos = await TaskModel.findAllForUser(req.user._id);

    resp.json(todos);
  } catch (err) {
    next(err);
  }
});


/**
 * route:  GET /api/task/examples
 * desc:   retrieve sample todos for home page
 * access: PUBLIC
 */
router.get("/examples", async (req, resp, next) => {
  try {
    const todos = await TaskModel.findExamples();

    resp.json(todos);
  } catch (err) {
    next(err);
  }
});


/**
 * route:  GET /api/task/:id
 * desc:   retrieve a todo by its id
 * access: PRIVATE
 */
router.get("/:id", isLoggedIn, async (req, resp, next) => {
  try {
    const todo_id = toInt(req.params.id);
    let user_id = req.user._id;

    // example todos
    if(todo_id >= 1 && todo_id <= 6) user_id = 1;


    const todo = await TaskModel.findById(todo_id, user_id);
    TaskValidator.notFound(todo);

    resp.json(todo);
  } catch (err) {
    next(err);
  }
});


/**
 * route:  POST /api/task
 * desc:   create a new user task
 * access: PRIVATE
 */
router.post("/", isLoggedIn, async (req, resp, next) => {
  try {
    const {title, description, priority, due_date} = req.body;
    TaskValidator.todoData({ title, priority });


    const todo = await TaskModel.create({ 
      user_id: req.user._id,
      title, 
      description,
      priority,
      due_date
    });
    

    resp.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});


/**
 * route:  PUT /api/task/done/:id
 * desc:   mark a todo as complete
 * access: PRIVATE
 */
router.put("/done/:id", isLoggedIn, async (req, resp, next) => {
  try {
    const todo_id = toInt(req.params.id);
    await TaskModel.done({ id: todo_id, user_id: req.user._id }); 

    resp.status(202).json({});
  } catch (err) {
    next(err);
  }
});


/**
 * route:  PUT /api/task/:id
 * desc:   edit a user task
 * access: PRIVATE
 */
router.put("/:id", isLoggedIn, async (req, resp, next) => {
  try {
    const todo_id = toInt(req.params.id);
    const {title, description, priority, due_date} = req.body;


    await TaskModel.edit({ 
      id: todo_id, 
      user_id: req.user._id, 
      data: [title, description, priority, due_date]
    });


    resp.status(202).json({});
  } catch (err) {
    next(err);
  }
});


/**
 * route:  DEL /api/task/:id
 * desc:   edit a user task
 * access: PRIVATE
 */
router.delete("/:id", isLoggedIn, async (req, resp, next) => {
  try {
    const todo_id = toInt(req.params.id);
    await TaskModel.deleteById({ id: todo_id, user_id: req.user._id });

    resp.status(204).json({});
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;