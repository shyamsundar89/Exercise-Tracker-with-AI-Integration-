import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { toast } from "react-toastify";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg_primary};
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 24px;
  background: ${({ theme }) => theme.bg_secondary};
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.text_primary};
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  outline: none;
  resize: none;
  height: 120px;
  &:focus {
    border-color: ${({ theme }) => theme.text_primary};
  }
`;

// const SubmitButton = styled.button`
//   padding: 12px;
//   font-size: 18px;
//   background: ${({ theme }) => theme.popup_text_primary};
//   color: ${({ theme }) => theme.bg_secondary};
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: 0.3s ease;
//   &:hover {
//     background: ${({ theme }) => theme.text_secondary};
//   }
//   &:disabled {
//     background: gray;
//     cursor: not-allowed;
//   }
// `;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Check if all fields are filled
    const isValid =
      updatedFormData.name.trim() !== "" &&
      updatedFormData.email.trim() !== "" &&
      updatedFormData.message.trim() !== "";

    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    toast("Message Sent Successfully!");
    setFormData({ name: "", email: "", message: "" });
    setIsFormValid(false);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Contact Us</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        <Button text="Submit" small disabled={!isFormValid} onClick={handleSubmit} />

        </Form>
      </FormWrapper>
    </Container>
  );
};

export default ContactForm;
