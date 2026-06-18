'use strict'

import { renderizarPagina } from '../main.js'

export function criarEdicao() {
    const container = document.createElement('div')
    container.classList.add('screen-edicao')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Edição'

    // Card Categorias
    const cardCategorias = document.createElement('div')
    cardCategorias.classList.add('cadastro-card')

    const labelCategorias = document.createElement('span')
    labelCategorias.classList.add('card-label')
    labelCategorias.textContent = 'CATEGORIAS'

    const descCategorias = document.createElement('p')
    descCategorias.classList.add('card-descricao')
    descCategorias.textContent = 'Altere uma categoria junto das filagens e descrição.'

    const btnCategorias = document.createElement('button')
    btnCategorias.classList.add('card-btn')
    btnCategorias.type = 'button'
    btnCategorias.textContent = 'ALTERAR'
    btnCategorias.onclick = () => renderizarPagina('edicao-categorias')

    cardCategorias.append(labelCategorias, descCategorias, btnCategorias)

    // Card Produtos
    const cardProdutos = document.createElement('div')
    cardProdutos.classList.add('cadastro-card')

    const labelProdutos = document.createElement('span')
    labelProdutos.classList.add('card-label')
    labelProdutos.textContent = 'PRODUTOS'

    const descProdutos = document.createElement('p')
    descProdutos.classList.add('card-descricao')
    descProdutos.textContent = 'Altere um produto junto das imagens, descrição e valores.'

    const btnProdutos = document.createElement('button')
    btnProdutos.classList.add('card-btn')
    btnProdutos.type = 'button'
    btnProdutos.textContent = 'ALTERAR'
    btnProdutos.onclick = () => renderizarPagina('edicao-produtos')

    cardProdutos.append(labelProdutos, descProdutos, btnProdutos)

    container.append(titulo, cardCategorias, cardProdutos)
    return container
}
