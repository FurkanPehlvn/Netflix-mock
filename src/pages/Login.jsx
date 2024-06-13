import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";

const Form = styled.form`
  padding: 1.5rem;
  width: 50%;
  min-width: 400px;
  margin: auto;
`;
const Label = styled.label`
  font-size: 1.1rem;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.3rem 0.5rem;

  &.inline-input {
    display: inline;
    margin-right: 1rem;
  }
`;

const Button = styled.button`
  width: 100%;
  background: red;
  color: white;
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
`;

const Row = styled.div`
  margin-bottom: 1rem;
`;

const Step = styled.p`
  color: black;
  font-size: 0.8em;
`;

const Description = styled(Step)`
  font-size: 1.1em;
`;
const Title = styled(Step)`
  font-size: 2rem;
  color: white;
`;

const ErrorMessage = styled.p`
  padding: 0.5rem;
  color: red;
  background: ff8f8f;
  border-radius: 0.3rem;
`;

const initialFormData = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Geçerli bir email adresi giriniz!",
  password: "büyüklü küçüklü sağlam şifre yap",
  terms: "Devam etmeden önce anlaşma şartlarını kabul ediniz.",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const [isValid, setIsValid] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const { email, password, terms } = formData;
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateTerms(terms)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;
    const URL = "https://reqres.in/api/users";
    axios.post(URL, formData).then((response) => {
      setFormData(initialFormData);
      console.log(response);
      history.push("/welcome");
    });
  }

  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function validatePassword(password) {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return regex.test(password);
  }

  function validateTerms(terms) {
    return terms;
  }
  function handleChange(event) {
    let { name, value, type, checked } = event.target;
    value = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "password") {
      if (validatePassword(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    if (name === "terms") {
      if (validateTerms(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Step>1 of 3</Step>
      <Title>Plesae login to continue</Title>
      <Description>Bir iki ufak adım sonra izlersin</Description>
      <Row>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email giriniz"
          value={formData.email}
        />
        {errors.email && <ErrorMessage>{errorMessages.email}</ErrorMessage>}
      </Row>
      <Row>
        <Label htmlFor="password">password</Label>
        <Input
          id="password"
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password giriniz"
          value={formData.password}
        />
        {errors.password && (
          <ErrorMessage>{errorMessages.password}</ErrorMessage>
        )}
      </Row>
      <Row>
        <Input
          id="Terms"
          name="Terms"
          onChange={handleChange}
          type="checkbox"
          className="inline-input"
          checked={formData.terms}
        />
        <Label htmlFor="term">Terms</Label>
        {errors.term && <ErrorMessage>{errorMessages.term}</ErrorMessage>}
      </Row>
      <Row>
        <Button>Login</Button>
      </Row>
    </Form>
  );
}
