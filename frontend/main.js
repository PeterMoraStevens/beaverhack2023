import axios from 'axios';

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

    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<h2>Processed PDF Text:</h2><pre>${response}</pre>`;
  } catch (error) {
    console.error(error);
  }
});