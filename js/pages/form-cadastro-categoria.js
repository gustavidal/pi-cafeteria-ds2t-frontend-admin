'use strict'

import { postCategoria } from '../router/categoria.js'
import { uploadParaCloudinary } from '../cloudinary.js'
import { renderizarPagina } from '../main.js'

export async function criarFormCadastroCategoria() {
    const container = document.createElement('div')
    container.classList.add('screen-form')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Adição de Categorias'

    // ── Área principal do form ──
    const form = document.createElement('form')
    form.classList.add('form-edicao')

    // Coluna esquerda — foto
    const colunaFoto = document.createElement('div')
    colunaFoto.classList.add('form-coluna-foto')

    const fotoLabel = document.createElement('p')
    fotoLabel.classList.add('form-label-foto')
    fotoLabel.textContent = 'Adicionar Foto'

    const fotoBox = document.createElement('div')
    fotoBox.classList.add('form-foto-box')

    const fotoPreview = document.createElement('img')
    fotoPreview.classList.add('form-foto-preview')
    fotoPreview.alt = 'Preview'

    const fotoInput = document.createElement('input')
    fotoInput.type = 'file'
    fotoInput.accept = 'image/*'
    fotoInput.classList.add('form-foto-input')

    fotoInput.addEventListener('change', ({ target }) => {
        if (target.files[0]) {
            fotoPreview.src = URL.createObjectURL(target.files[0])
            fotoPreview.style.display = 'block'
        }
    })

    fotoBox.addEventListener('click', () => fotoInput.click())
    fotoBox.append(fotoPreview, fotoInput)
    colunaFoto.append(fotoLabel, fotoBox)

    // Coluna direita — campos de texto
    const colunaCampos = document.createElement('div')
    colunaCampos.classList.add('form-coluna-campos')

    const labelNome = document.createElement('label')
    labelNome.classList.add('form-label')
    labelNome.textContent = 'Nome da Categoria'
    labelNome.htmlFor = 'form-categoria-nome'

    const inputNome = document.createElement('input')
    inputNome.type = 'text'
    inputNome.id = 'form-categoria-nome'
    inputNome.classList.add('form-input')
    inputNome.maxLength = 45
    inputNome.placeholder = 'Ex: Cafés e Bebidas Quentes'

    const labelDesc = document.createElement('label')
    labelDesc.classList.add('form-label')
    labelDesc.textContent = 'Descrição'
    labelDesc.htmlFor = 'form-categoria-descricao'

    const textareaDesc = document.createElement('textarea')
    textareaDesc.id = 'form-categoria-descricao'
    textareaDesc.classList.add('form-textarea')
    textareaDesc.placeholder = 'Descrição da categoria...'
    textareaDesc.rows = 5

    colunaCampos.append(labelNome, inputNome, labelDesc, textareaDesc)
    form.append(colunaFoto, colunaCampos)

    // ── Botões de ação ──
    const acoes = document.createElement('div')
    acoes.classList.add('form-acoes')

    const btnSalvar = document.createElement('button')
    btnSalvar.type = 'button'
    btnSalvar.classList.add('form-btn', 'form-btn--salvar')
    btnSalvar.textContent = 'Salvar e Adicionar'

    const btnDescartar = document.createElement('button')
    btnDescartar.type = 'button'
    btnDescartar.classList.add('form-btn', 'form-btn--descartar')
    btnDescartar.textContent = 'Descartar Adição'
    btnDescartar.onclick = () => renderizarPagina('cadastros')

    acoes.append(btnSalvar, btnDescartar)

    // ── Salvar (POST) ──
    btnSalvar.onclick = async () => {
        const nome = inputNome.value.trim()
        const descricao = textareaDesc.value.trim()
        const temImagem = fotoInput.files[0]

        if (!nome || !descricao || !temImagem) {
            alert('Preencha todos os campos: nome, descrição e foto.')
            return
        }

        try {
            btnSalvar.disabled = true
            btnSalvar.textContent = 'Salvando...'

            const urlImagem = await uploadParaCloudinary(fotoInput.files[0])

            await postCategoria({
                categoria: nome,
                descricao,
                imagem: urlImagem
            })

            renderizarPagina('cadastros')

        } catch (erro) {
            console.error('Erro ao salvar categoria:', erro)
            btnSalvar.textContent = 'Erro ao salvar'
            btnSalvar.disabled = false
        }
    }

    const btnVoltar = document.createElement('button')
    btnVoltar.classList.add('btn-voltar')
    btnVoltar.type = 'button'
    btnVoltar.textContent = '←'
    btnVoltar.onclick = () => renderizarPagina('cadastros')

    container.append(titulo, form, acoes, btnVoltar)
    return container
}
