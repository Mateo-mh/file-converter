const dropArea = document.querySelector('.drop-area');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;

button.addEventListener ('click', (event) =>{
    input.click();
});

input.addEventListener('change', (event) => {
    files = input.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});

dropArea.addEventListener('dragleave', (event) => {
    event.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta el archivo";
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    files = event.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta el archivo";
});

function showFiles(files) {
    if(files.length === undefined) {
        processFile(files)
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}

function processFile(file) {
    const fileName = file.name;
    const fileExtension = fileName.slice((fileName.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
    const validExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];

    if (validExtensions.includes('.' + fileExtension)) {
        const fileReader = new FileReader ();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', (event) => {
            const fileUrl = fileReader.result;
            const doc = `
                <div id="${id}" class="file-container">
                    <doc src="${fileUrl}" alt="${file.name}" width="50">
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="status-text">
                            Loading...
                        </span>
                    </div>
                </div>
            `;
        const html = document.querySelector("#preview").innerHTML;
        document.querySelector("#preview").innerHTML = doc + html;
        });

        fileReader.readAsDataURL(file);
        uploadFile(file, id);
    } else {
        alert("No es un archivo válido");
    }
}

async function uploadFile(file, id) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData
        });

        const responseText = await response.text();
        console.log(responseText);

        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="success">Archivo subido correctamente</span>`
    } catch (error) {
        document.querySelector(`#${id} .status-text`).innerHTML = `<span class="failure">El archivo no pudo subirse</span>`
    }
}
