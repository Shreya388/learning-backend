const express = require("express");
const { 
  handleGetAllUsers, 
  handleGetUserById, 
  handleUpdateUserByID, 
  handleDeleteUserById,
  handleCreateNewUser, 
} = require('../controllers/user');

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserByID)
  .delete(handleDeleteUserById);


router.post("/", async (req, res) => {
  
});

module.exports = router;