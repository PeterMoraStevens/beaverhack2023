import axios from 'axios';

const myForm = document.getElementById("myForm");
const syllFile = document.getElementById("syllFile");
const schedule = document.getElementsByClassName("returned-schedule");

myForm.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData();

    console.log(syllFile.files);

    formData.append("syllFile", syllFile.files[0]);

    
    axios.post('/process', formData).then((res) => {
      axios.post('/parse', res.data).then((returnedSchedule) => {
        schedule.innerHTML += `${returnedSchedule}`
      }).catch(console.error);
    })});