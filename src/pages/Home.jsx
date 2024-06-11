import { useEffect, useState } from "react";
import { userSuggestionsData } from "../userSuggestions";
import Suggestion from "../components/Suggestion";

export default function Home(props) {
  const [suggestions, setSuggestions] = useState([]);
  const { activeProfile } = props;
  const { name } = activeProfile;

  useEffect(() => {
    const suggestionData = userSuggestionsData[activeProfile.id];
    setSuggestions(suggestionData);
  }, [activeProfile]);

  return (
    <>
      <div>Home {name}</div>
      {suggestions.map((suggestion, index) => {
        return <Suggestion key={index} suggestion={suggestion} />;
      })}
    </>
  );
}
