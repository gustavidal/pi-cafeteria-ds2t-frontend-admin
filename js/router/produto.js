'use strict'
const URL = 'http://localhost:8090/v1/frequency80cafe/administracao/produto'

export async function getProdutos() {
    const response = await fetch(URL)
    if (!response.ok) throw new Error('Erro ao listar produtos?')
    return response.json()
}

export async function getProduto(id) {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar o produto de id ${id}`)
    return response.json()
}

export async function postProduto(produto) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    }

    const response = await fetch(URL, options)
    if (!response.ok) throw new Error('Erro ao criar um novo produto')
    return response.json()
}

export async function putProduto(id, produto) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error('Erro ao criar um novo produto')
    return response.json()
}

export async function deleteProduto(id) {
    const options = {
        method: 'DELETE'
    }
    
    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro ao excluir produto de id ${id}`)
}