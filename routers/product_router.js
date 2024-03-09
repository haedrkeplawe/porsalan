const express = require("express")
const product_controller = require("../controller/product_controller")
const router = express.Router()
const multer = require("multer");
const path = require("path");
const User = require("../models/customerSchema");

//up image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },

});

const upload = multer({ storage: storage });

router.get("/", product_controller.getProducts)

router.get("/user/add", (req, res) => {
    res.render("user/add");
});

router.get("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await User.findById(id)
        res.status(200).render("user/edit", { obj: product });
    } catch (error) {
        console.log(error);
    }
});

router.get("/view/:id", product_controller.getProduct)

router.post("/user/add", upload.single("image"), product_controller.addProduct)

router.post("/user/add/:id", upload.single("image"), product_controller.updateProduct)

router.get("/delete/:id", product_controller.deleteProduct)

router.delete("/deleteAll", product_controller.deleteAll)

module.exports = router