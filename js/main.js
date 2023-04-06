const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const esvaziar = document.getElementById("esvaziar");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        //se ja existir um item de mesmo nome, atribui-se o id desse item para este "novo" item
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        //sobrescrever
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
        //se o item for novo, o id dele vai ser do tamanho da lista, pois sera adicionado ao final
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;
        criaElemento(itemAtual);
        
        itens.push(itemAtual);   
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

esvaziar.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})

function criaElemento(item) {
    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;

    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);   
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}