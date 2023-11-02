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

function minify(base64) {
    // Substituir https://www. por nada
    base64 = base64.replace("https://www.", "");
    return base64;
}

var mensagem = document.getElementById("mensagem");
var resultado = document.getElementById("resultado");
document.getElementById("btn").addEventListener("click", function () {
    var url = document.getElementById("url").value;
    if (url.indexOf("https://") == 0) {
        url = base64UrlEncode(url);
        url = minify(url);
        url = "?link=" + url;

        resultado.style.display = "block";
        resultado.innerHTML = "https://matheushmafra.github.io/MatheusHMafra/" + url;

        mensagem.innerHTML += "Copie o link acima e cole no navegador para testar";
    } else {
        mensagem.innerHTML = "Link inválido (deve conter https:// no começo)";
    }
});