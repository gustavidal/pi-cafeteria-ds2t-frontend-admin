'use strict'

import { postProduto } from '../router/produto.js'
import { postImagem } from '../router/imagem.js'
import { getCategorias } from '../router/categoria.js'
import { uploadParaCloudinary } from '../cloudinary.js'
import { renderizarPagina } from '../main.js'

export async function criarFormCadastroProduto() {
    const container = document.createElement('div')
    container.classList.add('screen-form')

    const titulo = document.createElement('h2')
    titulo.textContent = 'Adição de Produtos'



    const form = document.createElement('form')
    form.classList.add('form-edicao')



    const colunaFoto = document.createElement('div')
    colunaFoto.classList.add('form-coluna-foto')

    const fotoLabel = document.createElement('p')
    fotoLabel.classList.add('form-label-foto')
    fotoLabel.textContent = 'Adicione uma foto'

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

    const labelValor = document.createElement('label')
    labelValor.classList.add('form-label')
    labelValor.textContent = 'Valor'
    labelValor.htmlFor = 'form-produto-valor'

    const inputValor = document.createElement('input')
    inputValor.type = 'number'
    inputValor.id = 'form-produto-valor'
    inputValor.classList.add('form-input')
    inputValor.placeholder = 'Insira aqui'
    inputValor.min = '0'
    inputValor.max = '999.99'
    inputValor.step = '0.01'

    colunaFoto.append(fotoLabel, fotoBox, labelValor, inputValor)


    
    const colunaCampos = document.createElement('div')
    colunaCampos.classList.add('form-coluna-campos')

    const labelNome = document.createElement('label')
    labelNome.classList.add('form-label')
    labelNome.textContent = 'Nome do Produto'
    labelNome.htmlFor = 'form-produto-nome'

    const inputNome = document.createElement('input')
    inputNome.type = 'text'
    inputNome.id = 'form-produto-nome'
    inputNome.classList.add('form-input')
    inputNome.maxLength = 100
    inputNome.placeholder = 'Digite aqui'

    const labelDesc = document.createElement('label')
    labelDesc.classList.add('form-label')
    labelDesc.textContent = 'Descrição'
    labelDesc.htmlFor = 'form-produto-descricao'

    const textareaDesc = document.createElement('textarea')
    textareaDesc.id = 'form-produto-descricao'
    textareaDesc.classList.add('form-textarea')
    textareaDesc.placeholder = 'Digite aqui'
    textareaDesc.rows = 6

    colunaCampos.append(labelNome, inputNome, labelDesc, textareaDesc)
    form.append(colunaFoto, colunaCampos)



    const categoriasSection = document.createElement('div')
    categoriasSection.classList.add('form-categorias-section')

    const categoriasLabel = document.createElement('p')
    categoriasLabel.classList.add('form-label')
    categoriasLabel.textContent = 'Atribua a uma categoria'

    const categoriasLista = document.createElement('div')
    categoriasLista.classList.add('form-categorias-lista')

    const categoriasSelecionadas = new Set()

    try {
        const categorias = await getCategorias()
        categorias.response.categorias.forEach(cat => {
            const item = document.createElement('label')
            item.classList.add('form-categoria-item')

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.value = cat.id
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) categoriasSelecionadas.add(cat.id)
                else categoriasSelecionadas.delete(cat.id)
            })

            item.append(checkbox, document.createTextNode(cat.categoria))
            categoriasLista.append(item)
        })
    } catch (erro) {
        console.error('Erro ao carregar categorias:', erro)
    }

    const btnConfirmar = document.createElement('button')
    btnConfirmar.type = 'button'
    btnConfirmar.classList.add('form-btn-confirmar')
    btnConfirmar.textContent = 'Confirmar'

    categoriasSection.append(categoriasLabel, categoriasLista, btnConfirmar)



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



    const rodape = document.createElement('div')
    rodape.classList.add('form-rodape')
    rodape.append(categoriasSection, acoes)



    btnSalvar.onclick = async () => {
        const nome = inputNome.value.trim()
        const descricao = textareaDesc.value.trim()
        const valor = parseFloat(inputValor.value)
        const temImagem = fotoInput.files[0]

        if (!nome || !descricao || !temImagem || isNaN(valor)) {
            alert('Preencha todos os campos: nome, descrição, foto e valor.')
            return
        }

        if (valor < 0 || valor > 999.99) {
            alert('O valor deve ser entre R$ 0,00 e R$ 999,99.')
            return
        }

        try {
            btnSalvar.disabled = true
            btnSalvar.textContent = 'Salvando...'



            const categoriasArray = [...categoriasSelecionadas].map(id => ({ id }))

            const produto = await postProduto({
                nome,
                descricao,
                preco: valor,
                categoria: categoriasArray
            })



            const urlImagem = await uploadParaCloudinary(fotoInput.files[0])

            await postImagem({
                url: urlImagem,
                id_produto: produto.response.id
            })

            renderizarPagina('cadastros')

        } catch (erro) {
            console.error('Erro ao salvar produto:', erro)
            btnSalvar.textContent = 'Erro ao salvar'
            btnSalvar.disabled = false
        }
    }

    const btnVoltar = document.createElement('button')
    btnVoltar.classList.add('btn-voltar')
    btnVoltar.type = 'button'
    btnVoltar.textContent = '←'
    btnVoltar.onclick = () => renderizarPagina('cadastros')

    container.append(titulo, form, rodape, btnVoltar)
    return container
}
