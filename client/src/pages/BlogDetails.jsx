import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blogs } from "../utils/data";
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import axios from "axios";
import { marked } from "marked";

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
const Title = styled.h1`
  font-size: 26px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
`;
const IconWrapper = styled.div`
  font-size: 40px;
  color: ${({ theme }) => theme.text_secondary};
`;
const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BlogDetails = () => {
  const { blogKey } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/blogs/${blogKey}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching blogs", error);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <Container><Wrapper>Blog not found</Wrapper></Container>;

  return (
    <Container>
      <Wrapper>
        <Link onClick={() => navigate(-1)}><IconWrapper><KeyboardBackspaceSharpIcon /></IconWrapper></Link>
        
        <Title>{blog.title}</Title>
        <Description dangerouslySetInnerHTML={{ __html: marked(blog.content || "") }} />
      </Wrapper>
    </Container>
  );
};

export default BlogDetails;
