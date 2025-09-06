import express from "express";
import {
  UserLogin,
  UserRegister,
  addWorkout,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getUserDashboard,
  getWorkoutsByDate,
  updateBlog,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

// ✅  blogs
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

export default router;
