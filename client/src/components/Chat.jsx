import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, TextField, Box, Typography, Card } from "@mui/material";
import styled from "styled-components";

// Styled components
const FormContainer = styled(Box)`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f6f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: auto;
  overflow-y: auto;
  flex-wrap: wrap; // Allow wrapping on smaller screens
  margin-top: 30px;
`;

const LeftSide = styled(Box)`
  flex: 1;  // Take up the remaining space on the left
  min-width: 300px; // Set a minimum width
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSide = styled(Box)`
  flex: 1;  // Take up the remaining space on the right
  min-width: 300px; // Set a minimum width
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const SuggestionsCard = styled(Card)`
  margin-top: 20px;
  background-color: #fafafa;
  padding: 16px;
  padding-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  min-height: 150px;
  height: 100%;
  overflow-y: auto;
`;

const Chat = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [exerciseSuggestions, setExerciseSuggestions] = useState(["Hello", "H", "World", "Hello", "H", "World", "H"]);
  const [dietSuggestions, setDietSuggestions] = useState(["World", "hell", "Hello", "H", "World"]);

  const handleSubmit = () => {
    if (!weight || !height || !goal) {
      toast.error("Please fill in all fields");
      return;
    }
    fetchExerciseAndDietRecommendations(weight, height, goal);
  };

  const fetchExerciseAndDietRecommendations = async (weight, height, goal) => {
    try {
      // Make the API request to your backend
      const response = await fetch("http://localhost:8080/get-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height, goal }),
      });
      const data = await response.json();
      
      // Save the response to state
      setExerciseSuggestions(data.exercises);
      setDietSuggestions(data.diet);

      toast.success("Recommendations fetched successfully!");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast.error("Failed to fetch recommendations");
    }
  };

  return (
    <FormContainer>
      <LeftSide>
        <Title variant="h4">Get Fitness Recommendations</Title>

        <TextField
          label="Weight (kg)"
          variant="outlined"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Height (cm)"
          variant="outlined"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Goal (e.g., weight loss, muscle gain)"
          variant="outlined"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          fullWidth
          required
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Get Recommendations
        </Button>
      </LeftSide>

      <RightSide>
        {exerciseSuggestions && (
          <SuggestionsCard>
            <Typography variant="h6">Exercise Recommendations:</Typography>
            <ul>
              {exerciseSuggestions.map((exercise, index) => (
                <li key={index}>{exercise}</li>
              ))}
            </ul>
          </SuggestionsCard>
        )}

        {dietSuggestions && (
          <SuggestionsCard>
            <Typography variant="h6">Diet Recommendations:</Typography>
            <ul>
              {dietSuggestions.map((diet, index) => (
                <li key={index}>{diet}</li>
              ))}
            </ul>
          </SuggestionsCard>
        )}
      </RightSide>
    </FormContainer>
  );
};

export default Chat;
