import styled from "styled-components";

const Card = styled.img`
  width: 15%;
`;

function Movie(props) {
  const { movie } = props;

  return <Card src={movie.poster_path}></Card>;
}

export default Movie;
