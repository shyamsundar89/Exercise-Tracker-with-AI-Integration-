import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import styled from "styled-components";

// Sample blog data
const blogs = [
  {
    id: 1,
    title: "Top 5 Tips to Stay Fit",
    summary: "Learn how to stay healthy and fit with these 5 effective and practical tips.",
    author: "Rohitash Singh",
    date: "May 8, 2025",
    image: "https://source.unsplash.com/random/800x600?fitness"
  },
  {
    id: 2,
    title: "Eating Clean: A Beginner's Guide",
    summary: "What does eating clean mean? This beginner guide will walk you through everything.",
    author: "Mahesh Sharma",
    date: "May 5, 2025",
    image: "https://source.unsplash.com/random/800x600?healthy-food"
  },
  {
    id: 3,
    title: "Workouts Without the Gym",
    summary: "Don't want to go to the gym? Here are workouts you can do at home or in the park.",
    author: "Anjali Verma",
    date: "April 30, 2025",
    image: "https://source.unsplash.com/random/800x600?workout"
  }
];

// Styled components
const BlogContainer = styled(Box)`
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  background-color: #fafafa;
`;

const BlogCard = styled(Card)`
  width: 320px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled(CardMedia)`
  height: 180px;
`;

const BlogContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AuthorBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  color: #757575;
  font-size: 0.875rem;
`;

const BlogPage = () => {
  return (
    <BlogContainer>
      {blogs.map((blog) => (
        <BlogCard key={blog.id}>
          <BlogImage image={blog.image} title={blog.title} />
          <BlogContent>
            <Typography variant="h6">{blog.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {blog.summary}
            </Typography>
            <AuthorBox>
              <span>{blog.author}</span>
              <span>{blog.date}</span>
            </AuthorBox>
          </BlogContent>
        </BlogCard>
      ))}
    </BlogContainer>
  );
};

export default BlogPage;
