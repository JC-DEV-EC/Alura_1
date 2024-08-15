// Recuperar el nombre del almacenamiento local y mostrarlo en la página
var nombre = localStorage.getItem("nombreUsuario");
document.getElementById("username").innerText = nombre;

var currencies = {
    "USD": { name: "Dólar estadounidense", country: "Estados Unidos" },
    "EUR": { name: "Euro", country: "Unión Europea" },
    "JPY": { name: "Yen japonés", country: "Japón" },
    "GBP": { name: "Libra esterlina", country: "Reino Unido" },
    "AUD": { name: "Dólar australiano", country: "Australia" },
    "CAD": { name: "Dólar canadiense", country: "Canadá" },
    "CHF": { name: "Franco suizo", country: "Suiza" },
    "CNY": { name: "Yuan chino", country: "China" },
    "SEK": { name: "Corona sueca", country: "Suecia" },
    "NZD": { name: "Dólar neozelandés", country: "Nueva Zelanda" },
    "ARS": { name: "Peso argentino", country: "Argentina" },
    "BRL": { name: "Real brasileño", country: "Brasil" },
    "RUB": { name: "Rublo ruso", country: "Rusia" },
    "INR": { name: "Rupia india", country: "India" },
    "BTC": { name: "Bitcoin", country: "N/A" } 
};

// Función para llenar los select con las monedas disponibles
function populateCurrencySelect(selectId, excludedCurrency) {
    var select = document.getElementById(selectId);
    select.innerHTML = ""; // Limpiar el select antes de volver a llenarlo
    for (var currencyCode in currencies) {
        // Verificar si la moneda actual no es la excluida
        if (currencyCode !== excludedCurrency) {
            var currency = currencies[currencyCode];
            var option = document.createElement("option");
            option.value = currencyCode;
            option.text = currency.name + " - " + currencyCode + " (" + currency.country + ")";
            select.add(option);
        }
    }
}
// Manejar el cambio de selección en el select "De"
document.getElementById("fromCurrency").addEventListener("change", function() {
    var selectedCurrency = this.value;
    populateCurrencySelect("toCurrency", selectedCurrency);
});

// Llenar los select con las monedas disponibles
populateCurrencySelect("fromCurrency");
populateCurrencySelect("toCurrency", document.getElementById("fromCurrency").value); 

// Manejar el clic en el botón de conversión
document.getElementById("convertBtn").addEventListener("click", convertCurrency);

// Función para convertir moneda
function convertCurrency() {
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;
    var amount = parseFloat(document.getElementById("amount").value);

    // Definir tasas de conversión (ejemplo)
    var exchangeRates = {
        USD: { EUR: 0.84, GBP: 0.73, JPY: 108.92, AUD: 1.29, CAD: 1.25, CHF: 0.92, CNY: 6.44, SEK: 8.61, NZD: 1.38, ARS: 95.41, BRL: 5.43, RUB: 75.05, INR: 72.59, KRW: 1126.27, BTC: 0.00002 },
        EUR: { USD: 1.19, GBP: 0.87, JPY: 130.08, AUD: 1.55, CAD: 1.51, CHF: 1.11, CNY: 7.77, SEK: 10.38, NZD: 1.66, ARS: 114.55, BRL: 6.53, RUB: 90.02, INR: 87.20, KRW: 1345.47, BTC: 0.00002 },
        JPY: { USD: 0.0092, EUR: 0.0077, GBP: 0.0069, AUD: 0.011, CAD: 0.011, CHF: 0.0083, CNY: 0.058, SEK: 0.078, NZD: 0.012, ARS: 0.81, BRL: 0.046, RUB: 0.63, INR: 0.61, KRW: 9.47, BTC: 0.00002 },
        GBP: { USD: 1.38, EUR: 1.15, JPY: 144.71, AUD: 1.72, CAD: 1.67, CHF: 1.23, CNY: 8.62, SEK: 11.51, NZD: 1.84, ARS: 127.01, BRL: 7.24, RUB: 99.79, INR: 96.80, KRW: 1490.20, BTC: 0.00002 },
        AUD: { USD: 0.78, EUR: 0.64, JPY: 89.85, GBP: 0.58, CAD: 0.97, CHF: 0.71, CNY: 4.98, SEK: 6.66, NZD: 1.07, ARS: 73.51, BRL: 4.18, RUB: 57.75, INR: 55.96, KRW: 864.61, BTC: 0.00002 },
        CAD: { USD: 0.80, EUR: 0.66, JPY: 89.85, GBP: 0.60, AUD: 1.03, CHF: 0.74, CNY: 5.18, SEK: 6.91, NZD: 1.11, ARS: 76.57, BRL: 4.35, RUB: 60.03, INR: 58.20, KRW: 899.58, BTC: 0.00002 },
        CHF: { USD: 1.09, EUR: 0.90, JPY: 120.44, GBP: 0.81, AUD: 1.40, CAD: 1.36, CNY: 7.00, SEK: 9.36, NZD: 1.50, ARS: 103.54, BRL: 5.90, RUB: 81.35, INR: 79.08, KRW: 1219.17, BTC: 0.00002 },
        CNY: { USD: 0.16, EUR: 0.13, JPY: 17.19, GBP: 0.12, AUD: 0.20, CAD: 0.19, CHF: 0.14, SEK: 1.33, NZD: 0.21, ARS: 14.55, BRL: 0.83, RUB: 11.49, INR: 11.14, KRW: 172.15, BTC: 0.00002 },
        SEK: { USD: 0.12, EUR: 0.10, JPY: 12.81, GBP: 0.09, AUD: 0.15, CAD: 0.14, CHF: 0.11, CNY: 0.75, NZD: 0.16, ARS: 10.97, BRL: 0.63, RUB: 8.69, INR: 8.45, KRW: 130.37, BTC: 0.00002 },
        NZD: { USD: 0.72, EUR: 0.60, JPY: 79.97, GBP: 0.54, AUD: 0.94, CAD: 0.90, CHF: 0.67, CNY: 4.70, SEK: 6.30, ARS: 43.45, BRL: 2.48, RUB: 34.28, INR: 33.32, KRW: 514.44, BTC: 0.00002 },
        ARS: { USD: 0.011, EUR: 0.0087, JPY: 1.23, GBP: 0.0079, AUD: 0.014, CAD: 0.013, CHF: 0.0091, CNY: 0.069, SEK: 0.091, NZD: 0.023, BRL: 0.057, RUB: 0.79, INR: 0.77, KRW: 11.92, BTC: 0.00002 },
        BRL: { USD: 0.18, EUR: 0.15, JPY: 20.78, GBP: 0.14, AUD: 0.24, CAD: 0.23, CHF: 0.16, CNY: 1.21, SEK: 1.61, NZD: 0.40, ARS: 17.46, RUB: 13.81, INR: 1.34, KRW: 207.01, BTC: 0.00002 },
        RUB: { USD: 0.013, EUR: 0.011, JPY: 1.59, GBP: 0.010, AUD: 0.017, CAD: 0.016, CHF: 0.012, CNY: 0.087, SEK: 0.12, NZD: 0.029, ARS: 1.26, BRL: 0.072, INR: 0.97, KRW: 15.05, BTC: 0.00002 },
        INR: { USD: 0.014, EUR: 0.011, JPY: 1.64, GBP: 0.011, AUD: 0.018, CAD: 0.018, CHF: 0.013, CNY: 0.091, SEK: 0.12, NZD: 0.029, ARS: 1.30, BRL: 0.75, RUB: 1.03, KRW: 15.95, BTC: 0.00002 },
        KRW: { USD: 0.00089, EUR: 0.00074, JPY: 0.11, GBP: 0.00067, AUD: 0.0012, CAD: 0.0011, CHF: 0.00082, CNY: 0.0058, SEK: 0.0077, NZD: 0.0019, ARS: 0.084, BRL: 0.0048, RUB: 0.067, INR: 0.063, BTC: 0.00000088 }
    };

    var bitcoinValue = exchangeRates[fromCurrency]["BTC"];
    var convertedToBitcoin = amount * bitcoinValue;
    var resultTextBitcoin = "Bitcoin: " + convertedToBitcoin.toFixed(8) + " BTC";

    if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
        var convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
        var resultText = fromCurrency + " " + convertedAmount.toFixed(2) + " " + toCurrency;
        document.getElementById("result").innerText = resultText;
        document.getElementById("resultBitcoin").innerText = resultTextBitcoin;
    } else {
        document.getElementById("result").innerText = "No se encontró la tasa de conversión.";
        document.getElementById("resultBitcoin").innerText = resultTextBitcoin;
    }
}

// Manejar clic en el botón "Volver al menú"
document.getElementById("volverBtn").addEventListener("click", function() {
    window.location.href = "index.html";
});
