const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
const multer = require("multer");

app.set("view engine", "ejs");
app.use(express.static("public"));

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

// GET
app.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add", (req, res) => {
  res.render("user/add");
});

app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// POST Requst
app.post("/user/add", upload.single("image"), (req, res) => {
  const { comp, type } = req.body;
  User.create({
    comp,
    type,
    image: req.file.filename,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user/add/:id", upload.single("image"), (req, res) => {
  const { comp, type } = req.body;
  User.updateOne({ comp, type, image: req.file.filename })
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete Requst
app.get("/delete/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.redirect("/");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose
  .connect(
    "mongodb+srv://alihassanhaedr:c4a@cluster0.ue5ezcc.mongodb.net/porsalan?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
