
const express = require("express");
const UserService = require("../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema, getUserSchema, updateUserSchema } = require("../schemas/users.schemas");
const router = express.Router();
const service = new UserService();

router.get("/", async (req, res) => {
  try {
    const users = await service.find();
    res.json(users);
  }
  catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);

    } catch (error) {
      next(error);
    }
  });

router.post("/",
  validatorHandler(createUserSchema, "body"),
  async (req, res) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    }
    catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = service.update(id, body);
      res.json({
        msg: 'You are updating a user',
        data: user,
      });
    }
    catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  });


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await service.delete(id);
    res.status(200).json(answer);
  }
  catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
});

module.exports = router;
