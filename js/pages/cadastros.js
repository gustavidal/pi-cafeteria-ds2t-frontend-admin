'use strict'

import { renderizarPagina } from '../main.js'

export function criarCadastros() {
    const container = document.createElement('div')
    container.classList.add('screen-cadastros')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Cadastros'

    // Card Categorias
    const cardCategorias = document.createElement('div')
    cardCategorias.classList.add('cadastro-card')

    const labelCategorias = document.createElement('span')
    labelCategorias.classList.add('card-label')
    labelCategorias.textContent = 'CATEGORIAS'

    const descCategorias = document.createElement('p')
    descCategorias.classList.add('card-descricao')
    descCategorias.textContent = 'Adicione uma categoria para fins de separação e descrição.'

    const btnCategorias = document.createElement('button')
    btnCategorias.classList.add('card-btn')
    btnCategorias.type = 'button'
    btnCategorias.textContent = 'ADICIONAR'
    btnCategorias.onclick = () => renderizarPagina('cadastro-categoria')

    cardCategorias.append(labelCategorias, descCategorias, btnCategorias)

    // Card Produtos
    const cardProdutos = document.createElement('div')
    cardProdutos.classList.add('cadastro-card')

    const labelProdutos = document.createElement('span')
    labelProdutos.classList.add('card-label')
    labelProdutos.textContent = 'PRODUTOS'

    const descProdutos = document.createElement('p')
    descProdutos.classList.add('card-descricao')
    descProdutos.textContent = 'Adicione um produto, informe os detalhes, descrição e valores.'

    const btnProdutos = document.createElement('button')
    btnProdutos.classList.add('card-btn')
    btnProdutos.type = 'button'
    btnProdutos.textContent = 'ADICIONAR'
    btnProdutos.onclick = () => renderizarPagina('cadastro-produto')

    cardProdutos.append(labelProdutos, descProdutos, btnProdutos)

    container.append(titulo, cardCategorias, cardProdutos)
    return container
}
