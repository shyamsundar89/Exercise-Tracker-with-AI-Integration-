import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      required: true,
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // Reference to User model
    //   required: true,
    // },
    tags: {
      type: [String],
      default: [],
    },
    imgUrl: {
      type: String, // URL for blog image
      default: null,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);
