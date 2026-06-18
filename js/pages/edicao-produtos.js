'use strict'

import { getProdutos } from '../router/produto.js'
import { renderizarPagina } from '../main.js'

export async function criarEdicaoProdutos() {
    const container = document.createElement('div')
    container.classList.add('screen-edicao-produtos')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Edição de Produtos'

    const subtitulo = document.createElement('p')
    subtitulo.classList.add('screen-subtitulo')
    subtitulo.textContent = 'Selecione o Produto a ser alterado'

    const listaContainer = document.createElement('div')
    listaContainer.classList.add('lista-container')

    try {
        const produtos = await getProdutos()

        produtos.forEach(produto => {
            const card = document.createElement('div')
            card.classList.add('item-card')

            const imagem = document.createElement('img')
            imagem.classList.add('item-card-imagem')
            imagem.src = produto.imagem[0].url
            imagem.alt = produto.nome

            const info = document.createElement('div')
            info.classList.add('item-card-info')

            const nome = document.createElement('span')
            nome.classList.add('item-card-nome')
            nome.textContent = produto.nome

            const descricao = document.createElement('p')
            descricao.classList.add('item-card-descricao')
            descricao.textContent = produto.descricao

            const rodape = document.createElement('div')
            rodape.classList.add('item-card-rodape')

            const preco = document.createElement('span')
            preco.classList.add('item-card-preco')
            preco.textContent = `R$ ${Number(produto.preco).toFixed(2)}`

            const btnEditar = document.createElement('button')
            btnEditar.classList.add('card-btn', 'card-btn--editar')
            btnEditar.type = 'button'
            btnEditar.textContent = 'EDITAR'
            btnEditar.onclick = () => renderizarPagina('form-edicao-produto', produto.id)

            rodape.append(preco, btnEditar)
            info.append(nome, descricao, rodape)
            card.append(imagem, info)
            listaContainer.append(card)
        })

    } catch (erro) {
        const mensagem = document.createElement('p')
        mensagem.classList.add('screen-erro')
        mensagem.textContent = 'Erro ao carregar produtos.'
        listaContainer.append(mensagem)
    }

    const btnVoltar = document.createElement('button')
    btnVoltar.classList.add('btn-voltar')
    btnVoltar.type = 'button'
    btnVoltar.textContent = '←'
    btnVoltar.onclick = () => renderizarPagina('edicao')

    container.append(titulo, subtitulo, listaContainer, btnVoltar)
    return container
}
