// Recuperar el nombre del almacenamiento local y mostrarlo en la página
var nombre = localStorage.getItem("nombreUsuario");
document.getElementById("username").innerText = nombre;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('convertButton').onclick = function() {
        var fromUnit = document.getElementById('fromUnit').value;
        var toUnit = document.getElementById('toUnit').value;
        var temperature = parseFloat(document.getElementById('temperature').value);
        var result = document.getElementById('result');
        
        // Realizar la conversión
        var convertedTemperature;
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            convertedTemperature = (temperature * 9/5) + 32;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            convertedTemperature = temperature + 273.15;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            convertedTemperature = (temperature - 32) * 5/9;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            convertedTemperature = (temperature - 32) * 5/9 + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            convertedTemperature = temperature - 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            convertedTemperature = (temperature - 273.15) * 9/5 + 32;
        } else {
            convertedTemperature = temperature; // No se realiza ninguna conversión
        }

        // Mostrar el resultado
        result.innerHTML = temperature + ' ' + fromUnit + ' es ' + convertedTemperature.toFixed(2) + ' ' + toUnit;
    };
});

// Manejar clic en el botón "Volver al menú"
document.getElementById("volverBtn").addEventListener("click", function() {
    window.location.href = "home.html";
});