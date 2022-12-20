const {
  getAllCategories,
  addCategory,
} = require("../controllers/categoryController");
const router = require("express").Router();

router.get("/all", getAllCategories);

router.use(require("../middlewares/Authorization"));

router.post("/", addCategory);

module.exports = router;
