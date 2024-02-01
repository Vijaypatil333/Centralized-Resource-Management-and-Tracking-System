const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  deleteInventoryController,
  getSearchedInventoryController,
  getStatisticsInventoryController,
  //getAvailableQuantityController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//add inventory || post
router.post("/create-inventory", authMiddleware, createInventoryController);

//delete inventory
router.delete(
  "/delete-inventory/:_id",
  authMiddleware,
  deleteInventoryController
);

//get all records
router.get("/get-inventory", authMiddleware, getInventoryController);

//get searched all records
router.get(
  "/get-inventory/:searchQuery",
  authMiddleware,
  getSearchedInventoryController
);

//statistics
router.get("/statistics", authMiddleware, getStatisticsInventoryController);

module.exports = router;
