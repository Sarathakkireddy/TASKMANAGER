const express = require("express");
const cardcrt = require("../controllers/cardscrt");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { cardscrt, getcards, updatecard,deletecard } = require("../controllers/cardscrt");

router.post("/crtcard", protect, cardscrt);
router.get("/allcrds:id", protect, getcards);
router.patch("/update", protect, updatecard);
router.delete("/del:id",protect,deletecard);

module.exports = router;
