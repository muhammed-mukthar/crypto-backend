const { addQuery, getAllQueries } = require("../controllers/queryController");
const router = require("express").Router();

router.post("/", addQuery);

router.use(require("../middlewares/Authorization"));

router.get("/all", getAllQueries);

module.exports = router;
