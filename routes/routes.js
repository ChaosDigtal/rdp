const express = require("express");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.post('/signin', async (req, res) => {
    console.log("signin");
    res.json({
        result: "success",
        data: ""
    });
});

router.post('/signup', async (req, res) => {
    console.log("signup");
    res.json({
        result: "success",
        data: ""
    });
});

module.exports = router;