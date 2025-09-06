import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, TextField, Box, Typography, Card } from "@mui/material";
import styled from "styled-components";

// Styled components
const MarkdownBox = styled(Box)`
  white-space: pre-wrap;
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  color: #333;
`;

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
  flex-wrap: wrap;
  margin-top: 30px;
`;

const LeftSide = styled(Box)`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightSide = styled(Box)`
  flex: 1;
  min-width: 300px;
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
  height: auto;
`;

// 👇 Extract JSON from ```json blocks
function extractJSONBlock(text) {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match || !match[1]) return null;
  try {
    return JSON.parse(match[1]);
  } catch (err) {
    console.warn("JSON parsing failed:", err);
    return null;
  }
}

const ChatComponent = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [exerciseSuggestions, setExerciseSuggestions] = useState([]);
  const [dietSuggestions, setDietSuggestions] = useState([]);
  const [rawPlainText, setRawPlainText] = useState("");

  const handleSubmit = () => {
    if (!weight || !height || !goal) {
      toast.error("Please fill in all fields");
      return;
    }
    fetchRecommendations(weight, height, goal);
  };

  const fetchRecommendations = async (weight, height, goal) => {
    try {
      const response = await fetch("http://localhost:8080/api/get-ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height, goal }),
      });

      const data = await response.json();
      const content = data?.content;
      if (!content) {
        toast.error("No response from AI");
        return;
      }

      // Extract JSON from content
      const json = extractJSONBlock(content);
      if (json) {
        setDietSuggestions(json.diet || []);
        setExerciseSuggestions(json.exercises || []);
      } else {
        setDietSuggestions([]);
        setExerciseSuggestions([]);
      }

      // Extract the plain markdown (remove JSON code block)
      const markdownRemoved = content.replace(/```json\s*[\s\S]*?```/, "");
      setRawPlainText(markdownRemoved.trim());

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
        {rawPlainText && (
          <SuggestionsCard>
            <Typography variant="h6">AI Summary</Typography>
            <MarkdownBox>{rawPlainText}</MarkdownBox>
          </SuggestionsCard>
        )}

        {dietSuggestions.length > 0 && (
          <SuggestionsCard>
            <Typography variant="h6">Diet Plan</Typography>
            <MarkdownBox component="table">
              <thead>
                <tr>
                  <th>Meal</th>
                  <th>Food</th>
                  <th>Calories</th>
                  <th>Protein (g)</th>
                </tr>
              </thead>
              <tbody>
                {dietSuggestions.map((item, i) => (
                  <tr key={i}>
                    <td>{item.meal}</td>
                    <td>{item.food}</td>
                    <td>{item.calories}</td>
                    <td>{item.protein}</td>
                  </tr>
                ))}
              </tbody>
            </MarkdownBox>
          </SuggestionsCard>
        )}

        {exerciseSuggestions.length > 0 && (
          <SuggestionsCard>
            <Typography variant="h6">Exercise Plan</Typography>
            {exerciseSuggestions.map((day, i) => (
              <Box key={i} mb={2}>
                <Typography variant="subtitle1">{day.day}</Typography>
                {day.exercises && day.exercises.length > 0 ? (
                  <ul>
                    {day.exercises.map((ex, j) => (
                      <li key={j}>
                        <strong>{ex.name}</strong>: {ex.sets} sets × {ex.reps} reps
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body2">Rest Day</Typography>
                )}
              </Box>
            ))}
          </SuggestionsCard>
        )}
      </RightSide>
    </FormContainer>
  );
};

export default ChatComponent;
