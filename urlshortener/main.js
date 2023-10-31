// Tema claro e escuro
// Pega o checkbox
const botaoDark = document.getElementById('toggle-dark');

// Verifica se tem no localStorage seleção do dark theme
if (localStorage.getItem('data-theme') == 'dark') {
    botaoDark.checked = true;
}

// Liga a função ao checkbox
botaoDark.addEventListener('change', () => {
    if (!botaoDark.checked) {
        changeThemeToLight()
    } else {
        changeThemeToDark()
    }
});

const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
}

const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", 'light');
}
let theme = localStorage.getItem('data-theme');
if (theme == 'dark') changeThemeToDark();

/*
Diminuir url:
1) Converter url para base64 caso se o link conter https:// no começo
2) Mostar url com o final diferente: ?link=(base64) caso se o link conter https:// no começo
3) Se alguem entrar com o ?link=(base64) redirecionar ele caso se o link conter https:// no começo
*/
// Função para codificar URL em Base64 URL-Safe
function base64UrlEncode(url) {
    var base64 = btoa(url);
    // Substituir caracteres não seguros para URLs
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Função para decodificar Base64 URL-Safe
function base64UrlDecode(encoded) {
    // Adicione padding se necessário
    while (encoded.length % 4 !== 0) {
        encoded += '=';
    }
    // Reverter substituições de caracteres não seguros para URLs
    encoded = encoded.replace('-', '+').replace('_', '/');
    return atob(encoded);
}

var mensagem = document.getElementById("mensagem");
var resultado = document.getElementById("resultado");
document.getElementById("btn").addEventListener("click", function () {
    var url = document.getElementById("url").value;
    if (url.indexOf("https://") == 0) {
        url = base64UrlEncode(url);
        url = "?link=" + url;

        resultado.style.display = "block";
        resultado.innerHTML = window.location.href + url;

        mensagem.innerHTML = "Copie o link acima e cole no navegador para testar";
    } else {
        mensagem.innerHTML = "Link inválido (deve conter https:// no começo)";
    }
});

// Caso entre com ?link=(base64) redirecionar ele
if (window.location.href.includes('?link=')) {
    var url = window.location.href.split('?link=')[1];
    url = base64UrlDecode(url);
    window.location.href = url;
}