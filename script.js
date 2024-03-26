document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores del formulario
    var nombre = document.getElementById("nombre").value;
    var conversion = document.getElementById("conversion").value;

    // Guardar el nombre y la selección de conversión en el almacenamiento local
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("tipoConversion", conversion);

    // Redirigir a otra página web según la opción seleccionada
    var selectedOption = document.getElementById("conversion").value;
    switch (selectedOption) {
        case "moneda":
            window.location.href = "conversor_monedas.html";
            break;
        case "temperatura":
            window.location.href = "conversor_temperatura.html";
            break;
        case "distancia":
            window.location.href = "conversor_interestelar.html";
            break;
        default:
            // Si no se selecciona ninguna opción, redirigir a otra página por defecto
            window.location.href = "otra_pagina.html";
            break;
    }
});
