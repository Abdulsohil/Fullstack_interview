const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/userController");

router.use(auth);
router.post("/", ctrl.createUser);
router.get("/", ctrl.getUsers);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

module.exports = router;
