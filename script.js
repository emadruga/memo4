var verso_carta = '<p>❓</p>'
var frentes_de_carta  = ['🇧🇷','🇺🇸','🇫🇷','🇩🇪',
                         '🇧🇪','🇨🇭','🇯🇵','🇨🇦']
var todas = frentes_de_carta.concat(frentes_de_carta)
var primeiro_clique = false
var primeira_célula = null
var segundo_clique = false
var segunda_célula = null

//@@
var area = document.querySelector('body')
var tabela = document.createElement('table');
var num_linhas = 4
var num_colunas = 4

function inicia_tabela(nl,nc) {
    area.innerHTML = ''
    let tabela = document.createElement('table') //@@
    if (tabela != null) {
        for (let i = 0; i < nl; i++) {
            let linha = document.createElement('tr') //@@
            for (let j = 0; j < nc; j++)
            {
                let célula = document.createElement('td') //@@
                linha.appendChild(célula) //@@
                célula.onclick = function () {
                    cliqueiNaCélula(this);
                }
                let pos = frente_aleatória(0, todas.length)
                célula.dataset.frente = `<p>${todas[pos]}</p>`
                célula.innerHTML = verso_carta
                // deleta de 'todas' o elemento escolhido 
                todas.splice(pos,1)
            }
            tabela.appendChild(linha) //@@
        }
        area.appendChild(tabela) //@@
     }    
}

function cliqueiNaCélula(célula) {
    
    if (!primeiro_clique) {
        primeiro_clique = true
        primeira_célula = célula
        célula.innerHTML = célula.dataset.frente
        
    } else if (!segundo_clique) {
        segundo_clique = true
        segunda_célula = célula
        célula.innerHTML = célula.dataset.frente
        let éIgual = compara_células(primeira_célula, segunda_célula)
        if (éIgual){
            console.log('É igual!')
            primeira_célula.removeEventListener('click',cliqueiNaCélula)
            segunda_célula.removeEventListener('click',cliqueiNaCélula)
            reinicia()
        } else {
            console.log('Não é igual!')
            setTimeout(() => {
                primeira_célula.innerHTML = verso_carta
                segunda_célula.innerHTML = verso_carta
                reinicia()
              }, 3000);
        }
    }
}

function reinicia() {
    primeiro_clique = false
    segundo_clique = false
    primeira_célula = null
    segunda_célula = null
}

function compara_células(cel1, cel2) {
    let resultado = false
    console.log(cel1.dataset.frente)
    console.log(cel2.dataset.frente)
    resultado = (cel1.dataset.frente === cel2.dataset.frente)
    return resultado
}

function frente_aleatória(min, max){
    num = Number.parseInt(Math.random() * (max - min) + min)
    return num
}

inicia_tabela(num_linhas, num_colunas)