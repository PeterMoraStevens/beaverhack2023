import axios from 'axios';
// import * as fsExtra from "fs-extra";


const myForm = document.getElementById("myForm");
const syllFile = document.getElementById("syllFile");
const schedule = document.getElementsByClassName("returned-schedule");

myForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(myForm);

  try {
    const response = await axios.post('/process', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    

    const gpt = await axios.post('/parse', response)
    
    // fsExtra.emptyDirSync('backend/uploads');
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<pre>${gpt.data}</pre>`;
  } catch (error) {
    console.error(error);
  }
});