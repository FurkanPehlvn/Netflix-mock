import axios from "axios";
import styled from "styled-components";
import Movies from "./Movies";
import { useEffect, useState } from "react";

const Card = styled.div`
  padding: 1rem;
`;
const Title = styled.h2`
  color: white;
`;

function Suggestion(props) {
  const [movies, setMovies] = useState([]);
  const { suggestion } = props;
  const { title, category } = suggestion;

  useEffect(() => {
    axios
      .get("https://movies-api14.p.rapidapi.com/" + category, {
        headers: {
          "x-rapidapi-key":
            "2ce04038e2msh104054e193ec289p18cdf9jsnb6a4a44d19e9",
          "x-rapidapi-host": "movies-api14.p.rapidapi.com",
        },
      })
      .then((response) => {
        console.log(response.data);
        const random = Math.floor(
          Math.random() * (response.data.movies.length - 6)
        );
        setMovies(response.data.movies.slice(random, random + 6)); //response.data)
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [category]);

  return (
    <Card>
      <Title>{title}</Title>
      <Movies movies={movies} />
    </Card>
  );
}

export default Suggestion;
