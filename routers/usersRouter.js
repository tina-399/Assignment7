const router =  require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../controllers/authControllers");

router.get("./", userController.getAllUsers);
router.get("./:id", userController.getSingleUser);
router.patch("./:id", userController.updateUser);
router.delete("./:id", userController.deleteUser);

module.exports= router;
