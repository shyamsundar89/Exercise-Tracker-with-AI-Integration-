import BlogForm from "./BlogForm";

const AddBlog = () => {
  const handleAdd = async (data) => {
    const res = await fetch("http://localhost:8080/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Blog added!");
    } else {
      alert("Failed to add");
    }
  };

  return <BlogForm mode="add" onSubmit={handleAdd} />;
};

export default AddBlog;