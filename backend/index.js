require('dotenv').config()
const OpenAI = require("openai");
const express = require('express')
const multer = require('multer');
const path = require('path');
const pdf = require('pdf-parse');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({
storage: storage,
});
  

const api_key = process.env.API_KEY

async function generateSchedule(pdfText) {
    const openai = new OpenAI({
        apiKey: api_key
    });

    try {
      const inputText = `Create a schedule with all my midterms, exams, and tests scheduled chronologically using the following PDF Text, if no exact hour is stated, leave blank: "${pdfText}"`;
  
      // Make a request to the GPT-3.5 Turbo engine
      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: inputText,
        max_tokens: 400,
    });
      // Extract the generated text from the API response
      const schedule = completion.choices[0].text;
  
      return schedule;
    } catch (error) {
      console.error('Error generating schedule:', error);
      return null;
    }
  }

app.post('/parse', async (req, res) => {
    body = req.body

    const inputText = `Create a schedule with all midterms, exams, and tests scheduled chronologically based on the following information ${body}.`;
    
    const schedule = await generateSchedule(inputText);

    if (schedule) {
        res.json(schedule);
    } else {
        res.status(500).json({ error: 'Failed to generate schedule' });
    }
});

app.post('/process', upload.single('syllabus'), async (req, res) => {
    req.on('error', function(err) {
        if (err.code === "ECONNRESET") {
            console.log("Timeout occurs");
            return;
        }
        //handle normal errors
    });

    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const pdfPath = req.file.path;
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdf(dataBuffer);
  
      const text = data.text;
      
      // Send the text to the client
      axios.post('/parse', text).then(res => {
        return res
        req.end()
      })
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while processing the PDF.');
    }
  });
  

PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`)
})