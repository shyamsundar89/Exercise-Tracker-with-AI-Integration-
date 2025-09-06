import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { marked } from "marked";

// Styled Components
const Container = styled(Box)`
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 16px;
  flex-wrap: wrap;
`;

const EditorSection = styled(Box)`
  flex: 1;
  min-width: 300px;
`;

const PreviewSection = styled(Box)`
  flex: 1;
  min-width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
`;

const MarkdownContent = styled.div`
  h1, h2, h3 {
    color: #1976d2;
  }
  p {
    line-height: 1.6;
  }
  ul {
    margin-left: 20px;
  }
  pre {
    background: #eee;
    padding: 8px;
    overflow-x: auto;
  }
`;

const AddBlogWithPreview = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title || !summary || !imageUrl || !content) {
      alert("Please fill all fields");
      return;
    }

    const blogData = {
      title,
      summary,
      imageUrl,
      content,
      createdAt: new Date().toISOString(),
    };

    console.log("Blog Submitted:", blogData);
    alert("Blog added successfully!");

    // Reset
    setTitle("");
    setSummary("");
    setImageUrl("");
    setContent("");
  };

  return (
    <Container>
      {/* Left: Editor */}
      <EditorSection>
        <Paper elevation={3} style={{ padding: "24px" }}>
          <Typography variant="h5" gutterBottom>Add New Blog</Typography>

          <TextField
            label="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Content (Markdown)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={10}
            margin="normal"
          />

          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
            Add Blog
          </Button>
        </Paper>
      </EditorSection>

      {/* Right: Preview */}
      <PreviewSection>
        <Typography variant="h6">Live Preview</Typography>
        {imageUrl && <img src={imageUrl} alt="Blog Banner" style={{ maxWidth: "100%", marginBottom: "16px" }} />}
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>{summary}</Typography>
        <MarkdownContent dangerouslySetInnerHTML={{ __html: marked(content || "") }} />
      </PreviewSection>
    </Container>
  );
};

export default AddBlogWithPreview;
