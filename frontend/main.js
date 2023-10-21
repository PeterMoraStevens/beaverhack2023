import './style.css'

const myForm = document.getElementById("myForm");
const syllFile = document.getElementById("syllFile");

myForm.addEventListener("submit", e => {
    e.preventDefault();

    const endpoint = "upload.php";
    const formData = new FormData();

    console.log(syllFile.files);

    formData.append("syllFile", syllFile.files[0]);

    fetch(endpoint, {
        method: "post",
        body: formData
    }).catch(console.error);

});