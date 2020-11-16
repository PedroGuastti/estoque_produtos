class Produto {
    constructor(){
        this.produtos = localStorage.getItem('tbProdutos') === null
        ? []
        : JSON.parse(localStorage.getItem('tbProdutos'))
    }

    salva(produto){
        if(document.getElementById('codigo').getAttribute('disabled') === 'disabled'){
            this.apaga(produto.codigo)
        }
        this.produtos.push(produto)
        localStorage.setItem('tbProdutos',JSON.stringify(this.produtos))
        alert('Registro salvo!')

    }
    apaga(codigo){
        let index = this.produtos.findIndex(produto => produto.codigo === codigo)
        this.produtos.splice(index,1)
        localStorage.setItem('tbProdutos',JSON.stringify(this.produtos))
        produto.atualiza()
    }

    edita(produto){
        document.getElementById('codigo').value = produto.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('produto').value = produto.produto
        document.getElementById('estoque').value = produto.estoque
        document.getElementById('andar').value = produto.andar
        document.getElementById('corredor').value = produto.corredor
        document.getElementById('armario').value = produto.armario
        document.getElementById('observacoes').value = produto.observacoes
    }
    lista(){
        const listagem = this.produtos.map((produto) =>(
            `<tr>
                <td>${produto.codigo}</td>
                <td>${produto.produto}</td>
                <td>${produto.estoque}</td>
                <td>${produto.andar}</td>
                <td>${produto.corredor}</td>
                <td>${produto.armario}</td>
                <td>${produto.observacoes}</td>
                <td>
                <button id='apagar' onClick='produto.apaga(${produto.codigo})'>🗑️ Apagar </button>
                <button id='editar' onClick='produto.edita(${JSON.stringify(produto)})'>📝 Editar </button>
                </td>                  
            </tr>`
    )).join("")
    return (`<table border='1' class='paleBlueRows'>
    <caption>Relação dos Produtos</caption>
    <thead>
        <th>Código</th>
        <th>Produto</th>
        <th>Estoque</th>
        <th>Andar</th>
        <th>Corredor</th>
        <th>Armário</th>
        <th>Observações</th>
        <th>Opções</th>
    </thead>
    <tbody>${listagem}</tbody>
    </table>
    `)
    }

    atualiza(){
        document.getElementById('listagem').innerHTML = produto.lista()
    }
}

const produto = new Produto()

document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        produto: document.getElementById('produto').value,
        estoque: document.getElementById('estoque').value,
        andar: document.getElementById('andar').value,
        corredor: document.getElementById('corredor').value,
        armario: document.getElementById('armario').value,
        observacoes: document.getElementById('observacoes').value
    }
    if(registro.codigo === ''){
        alert('Por favor, preencher o código do produto')
        return false
    }
    if(registro.produto === ''){
        alert('Por favor, preencher o nome do produto')
        return false
    }
    if(registro.estoque === ''){
        alert('Por favor, preencher a quantidade do produto em estoque')
        return false
    }
    if(registro.andar === '' || registro.corredor === '' || registro.armario === ''){
        alert('Por favor, preencher a localização completa do produto')
        return false
    }

    produto.salva(registro)
}

window.onload = function (){
    produto.atualiza()
}