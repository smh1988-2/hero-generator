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
  const [tone, setTone] = useState("");

  const [loading, setLoading] = useState(false);

  function generateCompanyName() {
    return `Return a name for a ${tone} startup. No quotes.`;
  }

  function generateHeading(companyName) {
    return `Return a short ${tone} slogan for a ${tone} startup called ${companyName}. No quotes.`;
  }

  function generateSubheading(companyName) {
    return `Return a short ${tone} paragraph for a ${tone} startup called ${companyName}.`;
  }

  function handleToneChange(event) {
    console.log(event.target.value)
    setTone(event.target.value)
  }

  async function handleButtonClick(event) {
    event.preventDefault();

    setLoading(true)

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generateCompanyName(),
        temperature: 1.5,
        max_tokens: 4000,
      });

      console.log("results:", response);

      setCompanyName(response.data.choices[0].text);
      generateHeadlineDescription(response.data.choices[0].text)
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function generateHeadlineDescription(name) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: [generateHeading(name), generateSubheading(name)],
        temperature: 1,
        max_tokens: 4000,
      });

      setHeadingResult(response.data.choices[0].text.replace(/['"]+/g, ''));
      setSubheadingResult(response.data.choices[1].text.replace(/['"]+/g, ''));
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (

    <main>
      <Nav companyName={companyName} loading={loading} />
      <Hero headingResult={headingResult} subheadingResult={subheadingResult} loading={loading} />

      <div className="button-container">
        <label for="tone">Choose a tone:</label>

        <select name="tone" id="tone" onChange={handleToneChange}>
          <option value="exciting">Exciting</option>
          <option value="innovative">Innovative</option>
          <option value="disruptive">Disruptive</option>
          <option value="satirical">Satirical</option>
        </select>
      </div>

      <div className="button-container">
        <button className="generate-button" onClick={handleButtonClick}>Create a new company</button>
      </div>
    </main>
  );
}

export default App;
