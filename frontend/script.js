const url = "http://localhost:3000";

const produtos = [];

const container = document.getElementById("produtos");
const modal = document.getElementById("cadastro");
const form = document.getElementById("formCard");

const inputBusca = document.getElementById("procurar");

function abrirModal() {
    modal.classList.remove("oculto");
}

function fecharModal() {
    modal.classList.add("oculto");
    form.reset();
    form.onsubmit = null; 
}

function listar() {
    fetch(url + "/listar")
        .then(res => res.json())
        .then(data => {
            produtos.length = 0;
            produtos.push(...data);
            listarCards();
        })
        .catch((e) => {
            console.error(e);
            alert("Erro ao carregar produtos");
        });
}

function listarCards() {
    container.innerHTML = "";
    produtos.forEach(p => criarCard(p));
}

function criarCard(p) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <img src="${p.imagem}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p>${p.categoria}</p>
        <p>R$ ${Number(p.preco).toFixed(2)}</p>
        <p>${p.classificacao}</p>

        <button onclick="deletar(${p.id})">Excluir</button>
        <button onclick="editar(${p.id})">Editar</button>
    `;

    container.appendChild(card);
}

function buscarProdutos() {
    const valor = inputBusca.value.toLowerCase();

    if (valor === "") {
        listarCards();
        return;
    }

    const filtrados = produtos.filter(p =>
        p.nome.toLowerCase().includes(valor) ||
        p.categoria.toLowerCase().includes(valor) ||
        p.classificacao.toLowerCase().includes(valor)
    );

    container.innerHTML = "";
    filtrados.forEach(p => criarCard(p));
}

inputBusca.addEventListener("input", buscarProdutos);


function configurarCadastro() {
    form.onsubmit = (e) => {
        e.preventDefault();

        const novoProduto = {
            nome: document.getElementById("nome").value,
            categoria: document.getElementById("categoria").value,
            preco: Number(document.getElementById("preco").value),
            imagem: document.getElementById("imagem").value,
            classificacao: document.getElementById("classificacao").value
        };

        fetch(url + "/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoProduto)
        })
            .then(() => {
                fecharModal();
                listar();
            })
            .catch((e) => {
                console.error(e);
                alert("Erro ao cadastrar");
            });
    };
}

function deletar(id) {
    fetch(url + "/excluir/" + id, {
        method: "DELETE"
    })
        .then(() => listar())
        .catch((e) => console.error(e));
}

function editar(id) {
    fetch(url + "/buscar/" + id)
        .then(res => res.json())
        .then(p => {
            document.getElementById("nome").value = p.nome;
            document.getElementById("categoria").value = p.categoria;
            document.getElementById("preco").value = p.preco;
            document.getElementById("imagem").value = p.imagem;
            document.getElementById("classificacao").value = p.classificacao;

            abrirModal();

            form.onsubmit = null;

            form.onsubmit = (e) => {
                e.preventDefault();

                const atualizado = {
                    nome: document.getElementById("nome").value,
                    categoria: document.getElementById("categoria").value,
                    preco: Number(document.getElementById("preco").value),
                    imagem: document.getElementById("imagem").value,
                    classificacao: document.getElementById("classificacao").value
                };

                fetch(url + "/atualizar/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(atualizado)
                })
                    .then(() => {
                        fecharModal();
                        listar();
                    })
                    .catch((e) => console.error(e));
            };
        });
}

configurarCadastro();

listar();