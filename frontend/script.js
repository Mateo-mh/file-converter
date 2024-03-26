document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf'; // Aquí puedes especificar el tipo de archivo permitido
        
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                // Aquí puedes realizar las validaciones necesarias antes de cargar el archivo
                console.log('Archivo seleccionado:', file);
            } else {
                console.log('No se seleccionó ningún archivo.');
            }
        };
        
        input.click();
    });
});
