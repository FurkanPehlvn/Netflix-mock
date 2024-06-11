import { useState } from "react";
import { profilesData } from "../Profiles";
import styled from "styled-components";
import Profile from "./Profile";

const ProfiesContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

function Profiles(props) {
  const [profiles] = useState(profilesData);
  const { setActiveProfile } = props;
  return (
    <ProfiesContainer>
      {profiles.map((profile, index) => {
        return (
          <Profile
            key={profile.id}
            profile={profile}
            setActiveProfile={setActiveProfile}
          />
        );
      })}
    </ProfiesContainer>
  );
}

export default Profiles;
