import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "./BlogForm";

const EditBlog = () => {
  const { editKey } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/blogs/${editKey}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error("Failed to fetch blog", err));
  }, [editKey]);

  // const handleUpdate = async (updatedBlog) => {
  //   try {
  //     const res = await fetch(`http://localhost:8080/api/blogs/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedBlog),
  //     });

  //     if (res.ok) {
  //       alert("Blog updated!");
  //       navigate(`/blogs/${id}`);
  //     } else {
  //       alert("Update failed");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return blog ? <BlogForm mode="edit" initialData={blog} /> : <div>Loading...</div>;
};

export default EditBlog;
