require('dotenv').config()
const OpenAI = require("openai");
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const api_key = process.env.API_KEY

async function generateSchedule(pdfText) {
    const openai = new OpenAI({
        apiKey: api_key
    });

    try {
      const inputText = `Create a schedule with all midterms, exams, and tests scheduled chronologically. PDF Text: "${pdfText}"`;
  
      // Make a request to the GPT-3.5 Turbo engine
      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: inputText,
        max_tokens: 100,
    });
      // Extract the generated text from the API response
      const schedule = response.choices[0].text;
  
      return schedule;
    } catch (error) {
      console.error('Error generating schedule:', error);
      return null;
    }
  }

app.get('/parse', async (req, res) => {
    body = req.body

    const inputText = `Create a schedule with all midterms, exams, and tests scheduled chronologically based on the following information ${body.content}.`;
    
    const schedule = await generateSchedule(inputText);

    if (schedule) {
        res.json({ schedule });
    } else {
        res.status(500).json({ error: 'Failed to generate schedule' });
    }
});

PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})

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