const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}

async function handleUpdateUserByID(req, res) {
    await User.findByIdAndUpdate(req.params.id, { title: 'Changed' });
    return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
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

  return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserByID,
    handleDeleteUserById,
    handleCreateNewUser,
};