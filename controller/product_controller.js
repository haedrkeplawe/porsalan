const User = require("../models/customerSchema");

const getProducts = async (req, res) => {
    try {
        const product = await User.find({})
        res.status(200).render("index", { arr: product });
    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await User.findById(id)
        res.status(200).render("user/view", { obj: product });
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async (req, res) => {
    try {
        const { comp, type } = req.body;
        const product = await User.create({
            comp,
            type,
            image: req.file.filename,
        })
        res.status(200).redirect("/");
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { comp, type } = req.body;
    try {
        const product = await User.findByIdAndUpdate(id, { comp, type, image: req.file.filename })
        if (!product) {
            res.status(404).json({ message: "product not found" })
        } else {
            res.status(200).redirect("/");
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await User.findByIdAndDelete(id)
        if (!product) {
            res.status(404).json({ message: "product not found" })
        } else {
            res.status(200).redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteAll = async (req, res) => {
    try {
        const product = await User.deleteMany({})
        if (!product) {
            res.status(404).json({ message: "product not found" })
        } else {
            res.status(200).json({ message: "dleted all succes", product })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAll,
}