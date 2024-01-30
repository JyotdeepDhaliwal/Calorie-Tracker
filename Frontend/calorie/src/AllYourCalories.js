//AllYourCalories.js
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap'; // Bootstrap for the button and table
import './AllYourCalories.css';

function AllYourCalories() {
  const [foodEntries, setFoodEntries] = useState([]); // Hook for storing all the food entries

  // Function to fetch all the food entries from the backend
  const fetchFoodEntries = async () => {
    try {
      const response = await fetch('http://localhost:3001/food-entries'); // Sending a Get request to fetch the information
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`); // Throws an error if response is not OK
      }
      const data = await response.json(); // Parsing the response data as JSON
      setFoodEntries(data); // Setting the fetched data to the state
    } catch (error) {
      console.error('Fetch error:', error); // Logging error
    }
  };

  // Function that groups and calculates total calories by date
  const groupByDate = (entries) => {
    const grouped = entries.reduce((acc, entry) => {
      const date = new Date(entry.date).toLocaleDateString(); // Formatting the date to show in order
      if (!acc[date]) {
        acc[date] = {
          totalCalories: 0,
          entries: []
        };
      }
      acc[date].totalCalories += entry.calories; // Adding calories to the total
      acc[date].entries.push(entry); // Adding the entry to the array
      return acc;
    }, {});

    return grouped;
  };

  const groupedEntries = groupByDate(foodEntries); // Grouping the entries by the date

  
  return (
    <div>
      <center>
        <Button onClick={fetchFoodEntries}>Load My Food Information</Button>
      </center>
      {/* Mapping through each group of entries and displaying them */}
      {Object.entries(groupedEntries).map(([date, group]) => (
        <div key={date}>
          <h3 className="total-calories">Total Calories for {date}: {group.totalCalories}</h3>
          {/* Table to display each food entry */}
          <Table striped bordered hover className='table'> 
            <thead>
              <tr>
                <th>Meal</th>
                <th>Calories</th>
                <th>Calorie Goal</th>
              </tr>
            </thead>
            <tbody>
              {group.entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.meal}</td>
                  <td>{entry.calories}</td>
                  <td>{entry.calorieGoal}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}

export default AllYourCalories;
