//FoodEntryModel.js

// Mongoose for MongoDB object modeling
const mongoose = require('mongoose');

// Schema for food entries
const foodEntrySchema = new mongoose.Schema({
  date: Date, // Date for the food entry
  meal: String, // Name of the food
  calories: Number, // Calorie for the food
  calorieGoal: Number, // Users calorie goal
  userId: mongoose.Schema.Types.ObjectId // Reference to the user who made the entry
});

// Model for FoodEntry using the defined schema
const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

// Exporting FoodEntry to use in other parts
module.exports = FoodEntry;