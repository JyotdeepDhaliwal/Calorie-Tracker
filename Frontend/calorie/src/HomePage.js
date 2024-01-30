//HomePage.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap'; // React Bootstrap components
import { Calendar } from 'primereact/calendar'; // Calendar component from PrimeReact
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // PrimeReact core styles
import 'primeicons/primeicons.css'; // PrimeReact icons
import './HomePage.css'; // Importing CSS for the HomePage

function HomePage() {
  // State hooks for managing form inputs
  const [date, setDate] = useState(null);
  const [calorieGoal, setCalorieGoal] = useState('');
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    // Constructing food information data object
    const foodEntry = {
      date,
      calorieGoal,
      meal,
      calories
    };

    // Sending the food entry data to the backend
    try {
      const response = await fetch('http://localhost:3001/food-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foodEntry),
      });

      if (response.ok) {
        alert('Data saved successfully'); // Alert after we submit
        
        // Resetting form fields
        setDate(null);
        setCalorieGoal('');
        setMeal('');
        setCalories('');
      } else {
        alert('Failed to save data'); // Alert if failed 
      }
    } catch (error) {
      alert('An error occurred. Please try again later.'); // Error alert
    }
  };

  return (
    <Container className='homepage'>
      <center>
        <h1 >Welcome To Calorie Snap</h1>
        <p>Track your daily calorie intake and manage your diet.</p>
        <p>This app can help you cut your calories in half by keeping track of what your intake is and how you could improve your health.</p>
      </center>
      
      
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Calorie Goal for the Day</Form.Label>
          <Form.Control
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(e.target.value)}
            placeholder="Enter your daily calorie goal"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>What did you eat?</Form.Label>
          <Form.Control
            type="text"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            placeholder="Describe your meal"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Calories</Form.Label>
          <Form.Control
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories consumed"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date:</Form.Label>
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            dateFormat="dd/mm/yy"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default HomePage;
