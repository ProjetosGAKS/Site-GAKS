const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
});
window.onload = function() {
    const textos = document.querySelectorAll('.texto'); // Seleciona todos os textos
    let index = 0; // Inicia o índice no primeiro texto
    
    function alternarTexto() {
        // Oculta todos os textos
        textos.forEach(texto => {
            texto.style.opacity = '0';
        });
        
        // Exibe o texto atual
        textos[index].style.opacity = '1';
        
        // Atualiza o índice para o próximo texto (se chegar no final, volta para o primeiro)
        index = (index + 1) % textos.length;
    }

    // Chama a função a cada 3 segundos (3000 ms)
    setInterval(alternarTexto, 3000);

    // Exibe o primeiro texto ao carregar a página
    alternarTexto();
};
// Função para criar entradas de Xi e Fi
function criarEntradas() {
    const numVariaveis = parseInt(document.getElementById("num-variaveis").value);
    const entradasDiv = document.getElementById("entradas");
    const resultadoDiv = document.getElementById("resultado");

    if (isNaN(numVariaveis) || numVariaveis <= 0) {
        alert("Digite um número válido de variáveis.");
        return;
    }

    // Limpa as entradas anteriores
    entradasDiv.innerHTML = "";
    resultadoDiv.innerHTML = "";

    for (let i = 0; i < numVariaveis; i++) {
        const row = document.createElement("div");
        row.className = "input-row";

        row.innerHTML = `
            <label>Xi${i + 1}: <input type="number" class="xi-input"></label>
            <label>Fi${i + 1}: <input type="number" class="fi-input"></label>
        `;

        entradasDiv.appendChild(row);
    }

    // Adiciona os botões de cálculo
    const buttons = document.createElement("div");
    buttons.innerHTML = `
        <button onclick="calcular(1)">ΣFi (N)</button>
        <button onclick="calcular(2)">Média (x̅)</button>
        <button onclick="calcular(3)">Variância (s²)</button>
        <button onclick="calcular(4)">Desvio Padrão (s)</button>
        <button onclick="calcular(5)">Coeficiente de Variação (CV)</button>
    `;
    entradasDiv.appendChild(buttons);
}

// Função para realizar os cálculos
function calcular(tipoResultado) {
    const xiInputs = document.querySelectorAll(".xi-input");
    const fiInputs = document.querySelectorAll(".fi-input");

    const Xi = Array.from(xiInputs).map(input => parseFloat(input.value));
    const Fi = Array.from(fiInputs).map(input => parseFloat(input.value));

    if (Xi.some(isNaN) || Fi.some(isNaN)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const N = Fi.reduce((sum, f) => sum + f, 0);
    const somaMedia = Xi.reduce((sum, x, i) => sum + x * Fi[i], 0);
    const media = parseFloat((somaMedia / N).toFixed(2));

    const somaVar = Xi.reduce((sum, x, i) => sum + ((x - media) ** 2) * Fi[i], 0);
    const varPopulacional = parseFloat((somaVar / (N - 1)).toFixed(2));
    const desvioPadrao = parseFloat(Math.sqrt(varPopulacional).toFixed(2));
    const coefVar = parseFloat(((desvioPadrao / media) * 100).toFixed(2));

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    switch (tipoResultado) {
        case 1:
            resultadoDiv.innerHTML = `ΣFi (N): ${N}`;
            break;
        case 2:
            resultadoDiv.innerHTML = `Média (x̅): ${media}`;
            break;
        case 3:
            resultadoDiv.innerHTML = `Variância (s²): ${varPopulacional}`;
            break;
        case 4:
            resultadoDiv.innerHTML = `Desvio Padrão (s): ${desvioPadrao}`;
            break;
        case 5:
            resultadoDiv.innerHTML = `Coeficiente de Variação (CV): ${coefVar}%`;
            break;
    }
}

