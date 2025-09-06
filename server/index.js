import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./routes/User.js";
import  Groq  from "groq";
import bodyParser from "body-parser";
import axios from "axios";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

const HUGGING_FACE_TOKEN = process.env.HF_TOKEN;

app.use("/api/user/", UserRoutes);
// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// POST API to interact with LLaMA model
app.post('/api/get-ai-suggestions', async (req, res) => {
  const { weight, height, goal } = req.body;

  const prompt = `
    I am ${weight} kg and ${height} cm tall. My goal is ${goal}.
     Suggest a diet and workout plan in JSON format with \"diet\" and \"exercises\" arrays.
    `;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {

    const requestBody = {
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1
    };
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    const content = response.data?.choices?.[0]?.message?.content || "";
    res.json({ content });

  } catch (error) {
    console.error('Error fetching response:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from LLaMA model' });
  }
});


// ************************************ First Phase ****************************** //
app.post('/get-suggestions', async (req, res) => {
  const { weight, height, goal } = req.body;

  // Generate exercise and diet suggestions based on the goal
  const exerciseSuggestions = getExerciseSuggestions(weight, height, goal);
  const dietSuggestions = getDietSuggestions(weight, height, goal);

  // Respond with the generated suggestions
  return res.json({
    exercises: exerciseSuggestions,
    diet: dietSuggestions,
  });
});

const getExerciseSuggestions = (weight, height, goal) => {
  // Example of generating exercise suggestions based on the goal
  const exercises = [];

  if (goal.toLowerCase() === "weight loss") {
    exercises.push("Running 30 minutes daily");
    exercises.push("HIIT workout");
    exercises.push("Jump Rope 15 minutes");
  } else if (goal.toLowerCase() === "muscle gain") {
    exercises.push("Weightlifting: Squats, Deadlifts");
    exercises.push("Push-ups");
    exercises.push("Bench press");
  } else {
    exercises.push("Yoga for flexibility");
    exercises.push("Walking 30 minutes");
    exercises.push("Cycling");
  }

  return exercises;
};

const getDietSuggestions = (weight, height, goal) => {
  const diet = [];

  if (goal.toLowerCase() === "weight loss") {
    diet.push("Eat 500 fewer calories than your maintenance");
    diet.push("High-protein, low-carb meals");
    diet.push("Avoid sugar and processed foods");
  } else if (goal.toLowerCase() === "muscle gain") {
    diet.push("Eat a calorie surplus");
    diet.push("High-protein meals with moderate carbs");
    diet.push("Eat lean meats, eggs, and beans");
  } else {
    diet.push("Maintain a balanced diet");
    diet.push("Include plenty of fruits and vegetables");
    diet.push("Hydrate well with water");
  }

  return diet;
};

// ************************************ First Phase ****************************** //

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
