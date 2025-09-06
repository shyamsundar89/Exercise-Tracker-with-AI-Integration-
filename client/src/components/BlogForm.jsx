import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { marked } from "marked";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

const AddBlogWithPreview = ({ mode = "add", onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    imgUrl: "",
    tags: "",
    category: "",
    ...initialData,
  });
  console.log("Form Data:", formData);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { editKey } = useParams(); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const blogPayload = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      imgUrl: formData.imgUrl,
      category: formData.category,
    };

    console.log("Blog Payload:", blogPayload);

    
    if (mode === "edit") {
      // Update blog API call
      axios
        .put(`http://localhost:8080/api/user/blogs/${editKey}`, blogPayload)
        .then((response) => {
          setLoading(false);
          navigate("/blogs"); // Redirect to blog list or details page
        })
        .catch((error) => {
          setLoading(false);
          setError("Error updating the blog");
        });
    } else {
      // Create new blog API call
      axios
        .post("http://localhost:8080/api/user/blogs", blogPayload)
        .then((response) => {
          setLoading(false);
          navigate("/blogs"); // Redirect to blog list or details page
        })
        .catch((error) => {
          setLoading(false);
          setError("Error creating the blog");
        });
    }
  };


  return (
    <Container>
      {/* Left: Editor */}
      <EditorSection>
        <Paper elevation={3} style={{ padding: "24px" }}>
          <Typography variant="h5" gutterBottom>{mode === "edit" ? "Edit Blog" : "Add Blog"}</Typography>

          <TextField
            label="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Summary"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Image URL"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Content (Markdown)"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
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
        {formData.imgUrl && <img src={formData.imgUrl} alt="Blog Banner" style={{ maxWidth: "100%", marginBottom: "16px" }} />}
        <Typography variant="h5">{formData.title}</Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>{formData.summary}</Typography>
        <MarkdownContent dangerouslySetInnerHTML={{ __html: marked(formData.content || "") }} />
      </PreviewSection>
    </Container>
  );
};

export default AddBlogWithPreview;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const BlogForm = ({ isUpdate = false }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     summary: "",
//     content: "",
//     imgUrl: "",
//     tags: "",
//     category: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { id } = useParams();  // Only needed for Update
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If it's update, fetch the blog data to populate the form
//     if (isUpdate && id) {
//       axios
//         .get(`http://localhost:5000/api/blogs/${id}`)
//         .then((response) => {
//           setFormData(response.data);
//         })
//         .catch((error) => {
//           setError("Error fetching the blog data");
//         });
//     }
//   }, [isUpdate, id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     const blogPayload = {
//       title: formData.title,
//       summary: formData.summary,
//       content: formData.content,
//       imgUrl: formData.imgUrl,
//       tags: formData.tags.split(",").map((tag) => tag.trim()), // Split tags into array
//       category: formData.category,
//     };

//     if (isUpdate) {
//       // Update blog API call
//       axios
//         .put(`http://localhost:5000/api/user/blogs/${id}`, blogPayload)
//         .then((response) => {
//           setLoading(false);
//           navigate("/blogs"); // Redirect to blog list or details page
//         })
//         .catch((error) => {
//           setLoading(false);
//           setError("Error updating the blog");
//         });
//     } else {
//       // Create new blog API call
//       axios
//         .post("http://localhost:5000/api/user/blogs", blogPayload)
//         .then((response) => {
//           setLoading(false);
//           navigate("/blogs"); // Redirect to blog list or details page
//         })
//         .catch((error) => {
//           setLoading(false);
//           setError("Error creating the blog");
//         });
//     }
//   };

//   return (
//     <div>
//       <h2>{isUpdate ? "Update Blog" : "Add New Blog"}</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Summary</label>
//           <input
//             type="text"
//             name="summary"
//             value={formData.summary}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Content</label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Image URL</label>
//           <input
//             type="text"
//             name="imgUrl"
//             value={formData.imgUrl}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Tags</label>
//           <input
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleInputChange}
//           />
//           <small>Enter tags separated by commas</small>
//         </div>

//         <div>
//           <label>Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Technology">Technology</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Health">Health</option>
//             {/* Add more categories as needed */}
//           </select>
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Processing..." : isUpdate ? "Update Blog" : "Create Blog"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;
