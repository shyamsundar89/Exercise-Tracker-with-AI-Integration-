import React, { useState } from "react";
import { Box, Typography, TextField, Button, Divider, Card, CardMedia, CardContent } from "@mui/material";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

// Sample data
const recentBlogs = [
  { id: 101, title: "How to Stay Motivated", image: "https://source.unsplash.com/random/200x120?motivation" },
  { id: 102, title: "Cardio vs Strength Training", image: "https://source.unsplash.com/random/200x120?cardio" },
  { id: 103, title: "Protein-Rich Diets", image: "https://source.unsplash.com/random/200x120?protein" },
];

const mostViewedBlogs = [
  { id: 201, title: "10-Minute Home Workouts", image: "https://source.unsplash.com/random/300x160?homeworkout" },
  { id: 202, title: "Yoga Benefits for Mind", image: "https://source.unsplash.com/random/300x160?yoga" },
  { id: 203, title: "Intermittent Fasting Guide", image: "https://source.unsplash.com/random/300x160?fasting" },
];

// Styled Components
const PageContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 32px;
  padding: 40px;
  background: #fefefe;
`;

const Sidebar = styled(Box)`
  width: 25%;
`;

const MainContent = styled(Box)`
  width: 75%;
`;

const BlogImage = styled(CardMedia)`
  height: 300px;
  border-radius: 10px;
  margin-bottom: 24px;
`;

const BlogText = styled(Box)`
  line-height: 1.7;
  font-size: 1rem;
`;

const BlogListCard = styled(Card)`
  display: flex;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
`;

const CommentBox = styled(Box)`
  margin-top: 40px;
`;

const SocialIcons = styled(Box)`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  svg {
    font-size: 24px;
    color: #555;
    cursor: pointer;
    &:hover {
      color: #1976d2;
    }
  }
`;

const BlogDetailPage = () => {
  const [comments, setComments] = useState([
    { id: 1, name: "Aman", text: "Great post, very helpful!" },
    { id: 2, name: "Sneha", text: "Loved the tips, thank you!" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), name: "Guest", text: newComment }]);
    setNewComment("");
  };

  return (
    <PageContainer>
      <MainContent>
        <Typography variant="h4" gutterBottom>Top 5 Tips to Stay Fit</Typography>
        <Typography variant="subtitle2" color="textSecondary">By Rohitash Singh • May 8, 2025</Typography>
        <BlogImage image="https://source.unsplash.com/random/800x400?fitness" />
        <BlogText>
          <p>Staying fit is about consistency and small improvements. Here are 5 effective ways:</p>
          <ul>
            <li>Start your day with water and stretching.</li>
            <li>Follow a protein-rich breakfast.</li>
            <li>Do at least 30 mins of daily workout.</li>
            <li>Sleep 7-8 hours and manage stress.</li>
            <li>Track your progress and stay positive.</li>
          </ul>
        </BlogText>

        {/* Social Share */}
        <Typography variant="h6" mt={4}>Share this blog</Typography>
        <SocialIcons>
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
          <FaWhatsapp />
        </SocialIcons>

        {/* Comments */}
        <CommentBox>
          <Typography variant="h5" gutterBottom>Comments</Typography>
          {comments.map((cmt) => (
            <Box key={cmt.id} my={1}>
              <Typography variant="subtitle2"><strong>{cmt.name}</strong></Typography>
              <Typography variant="body2">{cmt.text}</Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))}

          <TextField
            label="Add a comment"
            fullWidth
            multiline
            minRows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button variant="contained" onClick={handleAddComment}>Add Comment</Button>
        </CommentBox>

        {/* Most Viewed */}
        <Box mt={6}>
          <Typography variant="h5" gutterBottom>Most Viewed Blogs</Typography>
          <Box display="flex" gap={2}>
            {mostViewedBlogs.map(blog => (
              <Card key={blog.id} sx={{ width: "30%" }}>
                <CardMedia component="img" height="160" image={blog.image} />
                <CardContent>
                  <Typography variant="body1">{blog.title}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </MainContent>

      {/* Sidebar - Recent Blogs */}
      <Sidebar>
        <Typography variant="h6" gutterBottom>Recent Blogs</Typography>
        {recentBlogs.map(blog => (
          <BlogListCard key={blog.id}>
            <CardMedia
              component="img"
              sx={{ width: 80 }}
              image={blog.image}
              alt={blog.title}
            />
            <CardContent>
              <Typography variant="body2">{blog.title}</Typography>
            </CardContent>
          </BlogListCard>
        ))}
      </Sidebar>
    </PageContainer>
  );
};

export default BlogDetailPage;
