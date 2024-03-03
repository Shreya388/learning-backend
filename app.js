const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose');


const app = express();
const PORT = 8000;

// Connection
mongoose
.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  director: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
  },
  email: {
    type: String,
  },
},
{ timestamps: true }
);

const User = mongoose.model('user', userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method}: ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});


// Routes
app.get('/users', async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
    ${allDbUsers
      .map(user => `<li>${user.title} - ${user.email} - ${user.rating}</li>`)
      .join("")}
  </ul>
  `;
  res.send(html);
})

//REST API
app.get('/api/users', async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app
  .route('/api/users/:id')
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { title: 'Changed' });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" });
  });

app.patch("/api/users/:id", (req, res) => {
  // TODO: Edit the user with id
  return res.json({ status: "pending" });
})

app.delete("/api/users/:id", (req, res) => {
  // TODO: Delete the user with id
  return res.json({ status: "pending" });
})

app.post("/api/users", async(req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.title ||
    !body.year ||
    !body.director ||
    !body.rating ||
    !body.email
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  const result = await User.create({
    title: body.title,
    year: body.year,
    director: body.director,
    rating: body.rating,
    email: body.email,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log(`Server is currently running at port ${PORT}`));
