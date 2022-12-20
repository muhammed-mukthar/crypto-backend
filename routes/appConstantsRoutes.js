const {
  getConstant,
  addConstants,
} = require("../controllers/appConstantsController");

const router = require("express").Router();

router.get("/:name", getConstant);

router.use(require("../middlewares/Authorization"));
router.post("/", addConstants);

module.exports = router;
