import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Hero from "./components/Hero";
import Nav from "./components/Nav";


function App() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const [companyName, setCompanyName] = useState("")
  const [headingResult, setHeadingResult] = useState("");
  const [subheadingResult, setSubheadingResult] = useState("");

  function generateCompanyName() {
    return `Return a name for a cutting-edge startup. No quotes.`;
  }

  async function handleButtonClick(event) {
    event.preventDefault();

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generateCompanyName(),
        temperature: 0.5,
        max_tokens: 4000,
      });

      console.log("results:", response);

      setCompanyName(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (

    <main>
    <Nav companyName={companyName} />
    <Hero headingResult={headingResult} subheadingResult={subheadingResult} />

    <div className="button-container">
      <button className="generate-button" onClick={handleButtonClick}>Create a new company</button>
    </div>
  </main>
  );
}

export default App;
