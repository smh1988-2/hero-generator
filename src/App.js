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
  const [bgColor, setBgColor] = useState("");

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

  function generateBgColor() {
    return `Return a CSS hex code for a color to be used on a startup's website`
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
      setCompanyName(response.data.choices[0].text);
      generateHeadlineDescription(response.data.choices[0].text, tone)
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function generateHeadlineDescription(name, tone) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: [generateHeading(name), generateSubheading(name), generateBgColor()],
        temperature: 1,
        max_tokens: 4000,
      });

      console.log(response); 

      setHeadingResult(response.data.choices[0].text.replace(/['"]+/g, ''));
      setSubheadingResult(response.data.choices[1].text.replace(/['"]+/g, ''));
      setBgColor(response.data.choices[2].text)
      setLoading(false);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (

    <main>
      <Nav companyName={companyName} loading={loading} bgColor={bgColor}/>
      <Hero headingResult={headingResult} subheadingResult={subheadingResult} loading={loading} bgColor={bgColor} />

      <div className="select-container">
        <label htmlFor="tone">Choose a tone:</label>

        <select name="tone" id="tone" onChange={handleToneChange}>
          <option value="exciting">Exciting</option>
          <option value="innovative">Innovative</option>
          <option value="disruptive">Disruptive</option>
          <option value="satirical">Satirical</option>
          <option value="wellness">Wellness</option>
        </select>
      </div>

      <div className="button-container">
        <button className="generate-button" onClick={handleButtonClick}>Create a new company</button>
      </div>
    </main>
  );
}

export default App;
