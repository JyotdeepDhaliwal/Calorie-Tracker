// Information.js
import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap"; //  Bootstrap components
import { Accordion, AccordionTab } from "primereact/accordion"; // Accordion components from prime react
import "./Information.css";

function Information() {
  // Hook for storing information on gaining and losing calories
  const [info, setInfo] = useState({ gainCalories: {}, loseCalories: {} });

  // useEffect hook to fetch information from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/information")
      .then((response) => response.json())
      .then((data) => setInfo(data))
      .catch((error) => console.error("Error fetching information:", error));
  }, []);

  return (
    <div className="main">
      <Container>
        <h1 className="mytitle">Information on Calories</h1>
        {/* YouTube video */}
        <div className="youtubevideo">
          <center>
            <iframe
              src="https://www.youtube.com/embed/t1wqWgXoP60"
              allowFullScreen
              title="YouTube Video"
              width="800"
              height="415"
            ></iframe>
          </center>
        </div>
        {/* Accordion for displaying information */}
        <Accordion>
          <AccordionTab header={info.gainCalories.title}>
            {/* For information on gaining calories */}
            <Card>
              <Card.Body>
                <Card.Title>Gaining Calories</Card.Title>
                <Card.Text>{info.gainCalories.content}</Card.Text>
                <ul>
                  <li>{info.gainCalories.increase}</li>
                  <li>{info.gainCalories.NutrientDense}</li>
                  <li>{info.gainCalories.NutrientDense1}</li>
                  <li>{info.gainCalories.NutrientDense2}</li>
                  <li>{info.gainCalories.NutrientDense3}</li>
                  <li>{info.gainCalories.NutrientDense4}</li>
                  <li>{info.gainCalories.ProteinIntake}</li>
                  <li>{info.gainCalories.RegularMeal}</li>
                  <li>{info.gainCalories.StrengthTraining}</li>
                  <li>{info.gainCalories.StayHydrated}</li>
                  <li>{info.gainCalories.TrackProgress}</li>
                </ul>
              </Card.Body>
            </Card>
          </AccordionTab>
          <AccordionTab header={info.loseCalories.title}>
            {/* For information on losing calories */}
            <Card>
              <Card.Body>
                <Card.Title>Losing Calories</Card.Title>
                <Card.Text>{info.loseCalories.content}</Card.Text>
                <ul>
                  <li>{info.loseCalories.balancedDiet}</li>
                  <li>{info.loseCalories.portionControl}</li>
                  <li>{info.loseCalories.calorieTracking}</li>
                  <li>{info.loseCalories.physicalActivity}</li>
                  <li>{info.loseCalories.caloricDeficit}</li>
                  <li>{info.loseCalories.mindfulEating}</li>
                  <li>{info.loseCalories.hydration}</li>
                  <li>{info.loseCalories.seekSupport}</li>
                </ul>
              </Card.Body>
            </Card>
          </AccordionTab>
        </Accordion>
        {/* Additional resources */}
        <Row className="additional-resources">
          <Col>
            <Card className="resource-card">
              <Card.Img src="https://www.energy.fit/cdn/shop/articles/calories_1.jpg?v=1638556190&width=2048" />
              <Card.Body>
                <Card.Title>Exercise and Calorie Burn</Card.Title>
                <Card.Text>
                  Learn about the best exercises for burning calories.
                </Card.Text>
                <Button href="https://www.healthline.com/health/what-exercise-burns-the-most-calories">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="resource-card">
              <Card.Img src="https://food-guide.canada.ca/themes/custom/wxtsub_bootstrap/images/food_guide_visual_en.png" />
              <Card.Body>
                <Card.Title>Healthy Eating</Card.Title>
                <Card.Text>Discover healthy eating habits and tips.</Card.Text>
                <Button href="https://food-guide.canada.ca/en/">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Information;
