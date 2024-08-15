// Recuperar el nombre del almacenamiento local y mostrarlo en la página
var nombre = localStorage.getItem("nombreUsuario");
document.getElementById("username").innerText = nombre;

// Definición de las unidades de medida
const units = {
    "Kilómetros": 1 / 9460730472580.8,
    "Millas": 1 / 5878625373183.6,
    "Metros": 1 / 9460730472580800,
    "Años luz": 1
};

// Función para realizar la conversión
function convertir() {
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const valor = parseFloat(document.getElementById("valor").value);
    
    // Validación de entrada
    if (isNaN(valor)) {
        document.getElementById("result").innerText = "Por favor, ingrese un valor válido.";
        return;
    }

    // Realizar la conversión
    const resultado = valor * units[fromUnit] / units[toUnit];
    
    // Mostrar resultado
    document.getElementById("result").innerText = `${valor} ${fromUnit} es aproximadamente ${resultado.toFixed(4)} ${toUnit}.`;
}

// Función para manejar el cambio en el menú "De"
function handleFromChange() {
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnitSelect = document.getElementById("toUnit");

    // Limpiar el menú "A"
    toUnitSelect.innerHTML = "";

    // Llenar el menú "A" excluyendo la opción seleccionada en "De"
    for (let unit in units) {
        if (unit !== fromUnit) {
            const option = document.createElement("option");
            option.text = unit;
            toUnitSelect.add(option);
        }
    }
}

// Asociar la función de conversión al botón
document.getElementById("convertButton").addEventListener("click", convertir);

// Asociar la función de manejo de cambio al menú "De"
document.getElementById("fromUnit").addEventListener("change", handleFromChange);

// Llenar las opciones de los select con las unidades definidas
document.addEventListener("DOMContentLoaded", function() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");
    
    for (let unit in units) {
        const option = document.createElement("option");
        option.text = unit;
        fromUnitSelect.add(option);
    }

    // Llenar inicialmente el menú "A" excluyendo la primera opción del menú "De"
    handleFromChange();
});

// Manejar clic en el botón "Volver al menú"
document.getElementById("volverBtn").addEventListener("click", function() {
    window.location.href = "index.html";
});
