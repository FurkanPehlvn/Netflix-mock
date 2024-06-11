import Profiles from "../components/Profiles";
import styled from "styled-components";

const Button = styled.div`
  color: grey;
  padding: 0.5rem 1.5rem;
  border: 1px solid grey;
  display: inline-block;
`;

export default function Welcome(props) {
  const { setActiveProfile } = props;
  return (
    <>
      <h1>Who's watching?</h1>
      <Profiles setActiveProfile={setActiveProfile} />
      <Button>Manage Profiles</Button>
    </>
  );
}
