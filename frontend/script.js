const dropArea = document.querySelector('.drop-area');
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('#input-file');
let files;

button.addEventListener ('click', (event) =>{
    input.click();
});

input.addEventListener('change', (event) => {
    files = this.files;
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
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta el archivo";
});

dropArea.addEventListener('drop', (event) => {
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
    
}