'use strict'

import { getCategorias } from '../router/categoria.js'
import { renderizarPagina } from '../main.js'

export async function criarEdicaoCategorias() {
    const container = document.createElement('div')
    container.classList.add('screen-edicao-categorias')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Edição de Categorias'

    const subtitulo = document.createElement('p')
    subtitulo.classList.add('screen-subtitulo')
    subtitulo.textContent = 'Selecione a Categoria a ser alterada'

    const listaContainer = document.createElement('div')
    listaContainer.classList.add('lista-container')

    try {
        const categorias = await getCategorias()

        categorias.response.categorias.forEach(categoria => {
            const card = document.createElement('div')
            card.classList.add('item-card')

            const imagem = document.createElement('img')
            imagem.classList.add('item-card-imagem')
            imagem.src = categoria.imagem || './img/placeholder.svg'
            imagem.alt = categoria.categoria

            const info = document.createElement('div')
            info.classList.add('item-card-info')

            const nome = document.createElement('span')
            nome.classList.add('item-card-nome')
            nome.textContent = categoria.categoria

            const descricao = document.createElement('p')
            descricao.classList.add('item-card-descricao')
            descricao.textContent = categoria.descricao

            const btnEditar = document.createElement('button')
            btnEditar.classList.add('card-btn', 'card-btn--editar')
            btnEditar.type = 'button'
            btnEditar.textContent = 'EDITAR'
            btnEditar.onclick = () => renderizarPagina('form-edicao-categoria', categoria.id)

            info.append(nome, descricao, btnEditar)
            card.append(imagem, info)
            listaContainer.append(card)
        })

    } catch (erro) {
        const mensagem = document.createElement('p')
        mensagem.classList.add('screen-erro')
        mensagem.textContent = 'Erro ao carregar categorias.'
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
