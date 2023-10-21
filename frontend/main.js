import './style.css'

function uploadFile(){
    var formData = new FormData();
    formData.append("filename", "syllabusFile");
    formData.append("uploadedFile", fileInputElement.files[0]);
    axios.post('/upload', formData).then(rest => {console.log(res)})
}