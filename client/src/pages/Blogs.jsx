import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { blogs } from "../utils/data";
import BlogsCard from "../components/cards/BlogsCard";
import axios from "axios";
import { Button } from "@mui/material";
// import { addWorkout, getDashboardDetails, getWorkouts } from "../api";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 22px;
  padding: 0px 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axios
    .get("http://localhost:8080/api/user/blogs")
    .then((response) => {
      setBlogs(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching blogs", error);
    });
}, []);

if (loading) {
  return <p>Loading...</p>;
}
  
  return (
    <Container>
      <Wrapper>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Title>Blogs</Title>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          component={Link}
          to="/add-blog"
        >
          Add Blog
        </Button>
        </div>
        <FlexWrap>
          {blogs?.map((item) => (
            
            <BlogsCard item={item} />
          ))}
        </FlexWrap>
        </Wrapper>
        </Container>
  )
};

export default Blogs;
