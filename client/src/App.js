import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import { ToastContainer } from 'react-toastify';
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import ContactForm from "./pages/Contact";
import Tutorials from "./pages/Tutorials";
import 'react-toastify/dist/ReactToastify.css';
import Suggestion from "./components/Suggestion";
import ChatComponent from "./components/ChatComponent";
import BlogPage from "./components/Blogs";
import BlogDetailPage from "./components/BlogDetails";
import AddBlog from "./components/AddBlog";
import AddBlogWithPreview from "./components/AddBlogWithPreview";
import EditBlog from "./components/EditBlog";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999999 }} 
        />
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/blogs" exact element={<Blogs />} />
              <Route path="/blog" exact element={<BlogPage />} />
              <Route path="/single" exact element={<BlogDetailPage />} />
              <Route path="/add-blog" exact element={<AddBlog />} />
              <Route path="/edit-blog/:editKey" exact element={<EditBlog />} />
              <Route path="/add-blog-with-preview" exact element={<AddBlogWithPreview />} />
              <Route path="/blog/:blogKey" element={<BlogDetails />} />
              <Route path="/contact" element={<ContactForm />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/ai-suggestions" element={<Suggestion />} />
              <Route path="/chat2" element={<ChatComponent />} />


            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
            <ToastContainer /> 
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
