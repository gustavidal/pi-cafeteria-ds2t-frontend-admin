'use strict'

import { criarLogin }                 from './pages/login.js'
import { criarCadastros }             from './pages/cadastros.js'
import { criarEdicao }                from './pages/edicao.js'
import { criarFormCadastroCategoria } from './pages/form-cadastro-categoria.js'
import { criarFormCadastroProduto }   from './pages/form-cadastro-produto.js'
import { criarEdicaoCategorias }      from './pages/edicao-categorias.js'
import { criarFormEdicaoCategoria }   from './pages/form-edicao-categoria.js'
import { criarEdicaoProdutos }        from './pages/edicao-produtos.js'
import { criarFormEdicaoProduto }     from './pages/form-edicao-produto.js'

const paginas = {
    login: {
        titulo: 'Login',
        renderizar: criarLogin
    },
    cadastros: {
        titulo: 'Cadastros',
        renderizar: criarCadastros
    },
    edicao: {
        titulo: 'Edição',
        renderizar: criarEdicao
    },
    'cadastro-categoria': {
        titulo: 'Adição de Categorias',
        renderizar: criarFormCadastroCategoria
    },
    'cadastro-produto': {
        titulo: 'Adição de Produtos',
        renderizar: criarFormCadastroProduto
    },
    'edicao-categorias': {
        titulo: 'Edição de Categorias',
        renderizar: criarEdicaoCategorias
    },
    'form-edicao-categoria': {
        titulo: 'Edição de Categorias',
        renderizar: criarFormEdicaoCategoria
    },
    'edicao-produtos': {
        titulo: 'Edição de Produtos',
        renderizar: criarEdicaoProdutos
    },
    'form-edicao-produto': {
        titulo: 'Edição de Produtos',
        renderizar: criarFormEdicaoProduto
    }
}

export async function renderizarPagina(nomePagina, id = null) {
    const pagina = await paginas[nomePagina].renderizar(id)
    document.getElementById('screen').replaceChildren(pagina)
}

// Navegação da navbar
document.getElementById('nav-cadastros')
    .addEventListener('click', () => renderizarPagina('cadastros'))

document.getElementById('nav-edicao')
    .addEventListener('click', () => renderizarPagina('edicao'))

// Botão SAIR
document.getElementById('nav-sair')
    .addEventListener('click', () => {
        localStorage.removeItem('token')
        renderizarPagina('login')
    })

// Rota inicial
const token = localStorage.getItem('token')
if (token) {
    renderizarPagina('cadastros')
} else {
    renderizarPagina('login')
}