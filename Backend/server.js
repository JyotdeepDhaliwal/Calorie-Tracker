//server.js
const express = require('express'); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); // bcryptjs for hashing and securing passwords
const session = require('express-session'); // express-session for handling user sessions
const bodyParser = require('body-parser'); // body-parser to parse incoming request bodies
const cors = require('cors'); 
const FoodEntry = require('./FoodEntryModel'); 

// Initializing the app
const app = express();

// Connecting to the MongoDB database using Mongoose
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected')) //  message when connected
  .catch(err => console.error('MongoDB connection error:', err)); // will show when connection errors

// The User Schema for MongoDB, specifying the structure of user data
const UserSchema = new mongoose.Schema({
  username: String, // Field for username
  password: String, // Field for password
});
const User = mongoose.model('User', UserSchema,'User'); // Creating model for the User

// Middlewares
app.use(cors()); // Enables cors for all the routes
app.use(bodyParser.json()); // Enables parsing for JSON bodies in requests
app.use(session({
  secret: 'secret', // Secret key for session
  resave: false,
  saveUninitialized: false
}));

// Post route for user register
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; // Extracting username and password from request body
    const existingUser = await User.findOne({ username }); // It will be checking if the user already exists
    if (existingUser) {
      return res.status(400).send('Username already exists'); // Will return error if user exists
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
    const user = new User({ username, password: hashedPassword }); // Creating a new user with hashed password
    await user.save(); // Saving the new user to the database
    res.status(201).send('User registered'); // Sends success response
  } catch (err) {
    console.error('Registration error:', err); // Logs any errors
    res.status(500).send('Error registering new user'); // Sends error response
  }
});

// Post route for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Extracting username and password from request
    const user = await User.findOne({ username }); // It will find user by username
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id; // It will Store user ID in session if password matches
      res.send('Logged in'); // Sends success response
    } else {
      res.status(400).send('Invalid Information'); // Sends error response for invalid information
    }
  } catch (err) {
    console.error('Login error:', err); // Logs any errors
    res.status(500).send('Error logging in'); // Sends error response
  }
});

// Post route for adding a new food entry
app.post('/food-entry', async (req, res) => {
  try {
    const newFoodEntry = new FoodEntry(req.body); // Creates a new food entry from the request body
    await newFoodEntry.save(); // Saves the new food entry to the database
    res.status(201).send('Food entry saved'); // Sends success response
  } catch (err) {
    console.error('Error saving food entry:', err); // Logs any errors
    res.status(500).send('Error saving food entry'); // Sends error response
  }
});

// Get route for fetching all food entries
app.get('/food-entries', async (req, res) => {
  try {
    const entries = await FoodEntry.find({}); // Finds all food entries in the database
    res.json(entries); // Sends the entries as JSON response
  } catch (err) {
    console.error('Error fetching food entries:', err); // Logs any errors
    res.status(500).send('Error fetching food entries'); // Sends error response
  }
});

// Information on gaining and losing calories
const informationData = {
  gainCalories: {
    title: "Gaining Calories In A Healthy Way For Weight Gain Or Muscle Building",
    content: "Gaining calories in a healthy way involves increasing your calorie intake while prioritizing dense foods. Here's how to do it:",
    increase:"Increase Calorie Intake: To gain weight, you need to consume more calories than your body burns. This is often referred to as a caloric surplus",
    NutrientDense:"Choose Nutrient-Dense Foods: Focus on foods that provide essential nutrients along with calories. Include plenty of the following in your diet: ",
    NutrientDense1:"Lean proteins: Chicken, turkey, fish, lean beef, tofu, legumes, and dairy products.",
    NutrientDense2: "Healthy fats: Avocado, nuts, seeds, olive oil, and fatty fish like salmon.",
    NutrientDense3: "Complex carbohydrates: Whole grains (brown rice, quinoa, whole wheat bread), starchy vegetables (sweet potatoes, squash), and legumes (beans, lentils).",
    NutrientDense4: "Fruits and vegetables: These provide vitamins, minerals, and fiber.",
    ProteinIntake: "Protein Intake: Ensure you're getting an adequate amount of protein to support muscle growth and repair. Protein-rich foods like lean meats, dairy, and plant based sources (tofu, tempeh, legumes) are essential.",
    RegularMeal: "Regular Meals and Snacks: Eat multiple smaller meals and snacks throughout the day to increase your overall calorie intake.",
    StrengthTraining: "Strength Training: Incorporate regular strength training exercises to build muscle mass. This helps you gain healthy weight and promotes a more muscular physique.",
    StayHydrated: "Stay Hydrated:  Hydration is important for overall health and can support muscle function and digestion.",
    TrackProgress: "Track Your Progress: Consider keeping a food diary to track your calorie intake and make sure you're consistently in a caloric surplus.",
  },
  loseCalories: {
    title: "Losing Calories In A Healthy Way For Weight Loss",
    content: "Losing calories in a healthy way involves creating a caloric deficit, where you burn more calories than you consume. Here are some tips for healthy weight loss:",
    balancedDiet: "Balanced Diet: Focus on a well-balanced diet that includes lean proteins, whole grains, fruits, vegetables, and healthy fats.",
    portionControl: "Portion Control: Be mindful of portion sizes to avoid overeating. Use smaller plates and practice portions.",
    calorieTracking: "Calorie Tracking: Use a calorie tracking app or journal to monitor your daily calorie intake. This can help you stay within your calorie goals.",
    physicalActivity: "Regular Physical Activity: Engage in regular cardio exercises (e.g: jogging, cycling, swimming) and strength training to burn calories and maintain muscle mass.",
    caloricDeficit: "Caloric Deficit: Gradually reduce your calorie intake to create a moderate caloric deficit, typically 500 to 1,000 calories per day. This can result in a safe and sustainable weight loss of about 1-2 pounds per week.",
    mindfulEating: "Mindful Eating: Pay attention to your body's hunger and fullness cues. Avoid emotional or mindless eating.",
    hydration: "Hydration: Drink plenty of water to stay hydrated, as thirst can sometimes be mistaken for hunger.",
    seekSupport: "Seek Support: Consider working with a registered dietitian, nutritionist, or a certified fitness professional to create a personalized plan and receive guidance on healthy weight loss."
  }
};

// Route to get information on gaining and losing calories
app.get('/information', (req, res) => {
  res.json(informationData); // Sends the calorie management information as a JSON response
});

// Setting the port for the server and starting it
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // console logging the port for which the server is running on
