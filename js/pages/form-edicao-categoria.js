'use strict'

import { getCategoria, putCategoria, deleteCategoria } from '../router/categoria.js'
import { uploadParaCloudinary } from '../cloudinary.js'
import { renderizarPagina } from '../main.js'

export async function criarFormEdicaoCategoria(id) {
    const container = document.createElement('div')
    container.classList.add('screen-form')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Edição de Categorias'

    // ── Corpo do formulário ──
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
    fotoPreview.id = 'form-foto-preview'
    fotoPreview.alt = 'Preview'

    const fotoInput = document.createElement('input')
    fotoInput.type = 'file'
    fotoInput.accept = 'image/*'
    fotoInput.id = 'form-foto-input'
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

    // Botões de ação
    const acoes = document.createElement('div')
    acoes.classList.add('form-acoes')

    const btnSalvar = document.createElement('button')
    btnSalvar.type = 'button'
    btnSalvar.classList.add('form-btn', 'form-btn--salvar')
    btnSalvar.textContent = 'Salvar e Adicionar'

    const btnDescartar = document.createElement('button')
    btnDescartar.type = 'button'
    btnDescartar.classList.add('form-btn', 'form-btn--descartar')
    btnDescartar.textContent = 'Descartar Edição'
    btnDescartar.onclick = () => renderizarPagina('edicao-categorias')

    const btnDeletar = document.createElement('button')
    btnDeletar.type = 'button'
    btnDeletar.classList.add('form-btn', 'form-btn--deletar')
    btnDeletar.textContent = 'Deletar Categoria'

    acoes.append(btnSalvar, btnDescartar, btnDeletar)

    // Pré-carregar dados da categoria
    try {
        const categoria = await getCategoria(id)
        inputNome.value = categoria.response.categoria[0].categoria || ''
        textareaDesc.value = categoria.response.categoria[0].descricao || ''
        if (categoria.response.categoria[0].imagem) {
            fotoPreview.src = categoria.response.categoria[0].imagem
            fotoPreview.style.display = 'block'
        }
    } catch (erro) {
        console.error('Erro ao carregar categoria:', erro)
    }

    // Salvar (PUT)
    btnSalvar.onclick = async () => {
        const nome = inputNome.value.trim()
        const descricao = textareaDesc.value.trim()
        const temImagem = fotoInput.files[0] || fotoPreview.src

        if (!nome || !descricao || !temImagem) {
            alert('Preencha todos os campos: nome, descrição e foto.')
        } else {
            try {
                btnSalvar.disabled = true
                btnSalvar.textContent = 'Salvando...'
    
                let urlImagem = fotoPreview.src || ''
    
                if (fotoInput.files[0]) {
                    urlImagem = await uploadParaCloudinary(fotoInput.files[0])
                }
    
                const dados = {
                    categoria: nome,
                    descricao: descricao,
                    imagem: urlImagem
                }
    
                await putCategoria(id, dados)
                renderizarPagina('edicao-categorias')
    
            } catch (erro) {
                console.error('Erro ao salvar categoria:', erro)
                btnSalvar.textContent = 'Erro ao salvar'
                btnSalvar.disabled = false
            }
        }
    }

    // ── Deletar ──
    btnDeletar.onclick = async () => {
        if (!confirm('Tem certeza que deseja deletar esta categoria?')) return
        try {
            await deleteCategoria(id)
            renderizarPagina('edicao-categorias')
        } catch (erro) {
            console.error('Erro ao deletar categoria:', erro)
        }
    }

    // ── Botão voltar ──
    const btnVoltar = document.createElement('button')
    btnVoltar.classList.add('btn-voltar')
    btnVoltar.type = 'button'
    btnVoltar.textContent = '←'
    btnVoltar.onclick = () => renderizarPagina('edicao-categorias')

    container.append(titulo, form, acoes, btnVoltar)
    return container
}
