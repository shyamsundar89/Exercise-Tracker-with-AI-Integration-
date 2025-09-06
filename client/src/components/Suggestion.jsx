import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress, TextField, Button, Box, Typography, Paper, IconButton, Card } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { toast } from "react-toastify";
import { marked } from 'marked';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


// ✅ Extract JSON block
function extractJSONBlock(text) {
    const match = text.match(/```json\s*([\s\S]*?)```/);
    if (!match || !match[1]) return null;
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }

// Layout
const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftPanel = styled(Box)`
  width: 320px;
  padding: 24px;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  height: 100vh;
  overflow-y: auto;
  position: fixed;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    padding: 5px;
    height: auto;
    border-right: none;
    display: none;
    border-bottom: 1px solid #ddd;
  }
`;

const RightPanel = styled(Box)`
  margin-left: 350px;
  padding: 32px;
  height: 100vh;
  overflow-y: auto;
  width: calc(100% - 320px);
  background-color: #fff;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 0px;
    height: auto;
  }
`;

const ResponseBox = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
  white-space: pre-wrap;
  font-family: "Segoe UI", sans-serif;
  line-height: 1.6;
`;

// Chat Toggle Button
const ChatToggleButton = styled(IconButton)`
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: #1976d2;
  color: white;
  z-index: 1000;

  &:hover {
    background-color: #115293;
  }

  @media (min-width: 769px) {
    display: none !important; // only show on mobile
  }
`;

// Chat Form Overlay
const ChatFormOverlay = styled(Box)`
  position: fixed;
  bottom: 64px;
  right: 16px;
  width: 90%;
  max-width: 360px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 16px;
  z-index: 999;

  @media (min-width: 769px) {
    display: none; // only for mobile
  }
  @media (max-width: 768px) {
    right: 8px;
    width: 90%;
    padding: 10px;
  }
`;

const SuggestionsCard = styled(Card)`
  margin-top: 20px;
  background-color: #fafafa;
  padding: 16px;
  padding-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const MarkdownBox = styled(Box)`
  white-space: pre-wrap;
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  color: #333;
`;

const Suggestion = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [responseText, setResponseText] = useState("");
  const [dietSuggestions, setDietSuggestions] = useState([]);
  const [exerciseSuggestions, setExerciseSuggestions] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [sanitizedHTML, setSanitizedHTML] = useState("");
  const [loading, setLoading] = useState(true);

    const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async () => {
    if (!weight || !height || !goal) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/get-ai-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height, goal }),
      });

      const data = await res.json();
      const content = data?.content;

      if (!content) {
        toast.error("No response from AI");
        return;
      }

      const json = extractJSONBlock(content);
      if (json) {
        setDietSuggestions(json.diet || []);
        setExerciseSuggestions(json.exercises || []);
      } else {
        setDietSuggestions([]);
        setExerciseSuggestions([]);
      }

      const markdownRemoved = content.replace(/```json\s*[\s\S]*?```/, "");
      setResponseText(markdownRemoved.trim());

      toast.success("Recommendations fetched successfully!");
      setShowChat(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch AI response");
    }
  };

  console.log(exerciseSuggestions);
  const parsedHTML = marked(responseText);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Container>
        <LeftPanel>
          <Typography variant="h6" gutterBottom>Enter Your Info</Typography>
          <TextField
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Goal (e.g., weight loss)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </LeftPanel>

        <RightPanel>
          <Typography variant="h5" style={{paddingTop: "10px", paddingLeft: "15px"}} gutterBottom>AI Suggestions for your good health!!</Typography>
          {responseText ? (
            <Box variant="h6" style={{ marginBottom: isSmallScreen ? '20px' : '140px' }}>
            <SuggestionsCard>
              <Typography variant="h6">Summary</Typography>
              <div dangerouslySetInnerHTML={{ __html: parsedHTML }} />
            </SuggestionsCard>
            </Box>
          ): (
            <Box variant="h6" style={{ marginBottom: isSmallScreen ? '20px' : '140px' }}>
            <SuggestionsCard>
              <Typography variant="h6">Please enter your doubts in the left side panel...</Typography>
            </SuggestionsCard>
            </Box>
          )}
            {dietSuggestions.length > 0 && (
            <SuggestionsCard>
              <Typography variant="h6" style={{paddingBottom: "10px"}}>Diet Plan</Typography>
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
                <Box variant="h6" style={{ marginBottom: isSmallScreen ? '20px' : '140px' }}>
            <SuggestionsCard>
                    <Typography variant="h6" style={{paddingBottom: "10px"}}>Exercise Plan</Typography>
                    {exerciseSuggestions.map((day, i) => (
                        <Box key={i} mb={2}>
                        <Typography variant="subtitle1">{day.exercise}</Typography>
                            <ul>
                                <li key={day}>
                                <strong>{day.name}</strong>: {day.sets} sets × {day.reps} reps
                                </li>
                            </ul>
                        </Box>
                    ))}
            </SuggestionsCard>
              </Box>
          )}
        </RightPanel>
      </Container>

      {/* FAB Chat Icon */}
      <ChatToggleButton onClick={() => setShowChat(!showChat)}>
        <ChatIcon />
      </ChatToggleButton>

      {/* Chat Form Popup */}
      {showChat && (
        <ChatFormOverlay>
          <Typography variant="h6" gutterBottom>Enter Your Info</Typography>
          <TextField label="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} fullWidth margin="normal" />
          <TextField label="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth margin="normal" />
          <TextField label="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} fullWidth margin="normal" />
          <Button variant="contained" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </ChatFormOverlay>
      )}
    </>
  );
};

export default Suggestion;
