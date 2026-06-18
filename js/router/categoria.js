'use strict'

const URL = 'http://localhost:8080/v1/frequency80cafe/administracao/categoria'

export async function getCategorias() {
    const response = await fetch(URL)
    if (!response.ok) throw new Error('Erro ao listar categorias?')
    return response.json()
}

export async function getCategoria(id) {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar o contato de id ${id}`)
    return response.json()
}

export async function postCategoria(categoria) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(categoria)
    }

    const response = await fetch(URL, options)
    if (!response.ok) throw new Error('Erro ao criar uma nova categoria')
    return response.json()
}

export async function putCategoria(id, categoria) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(categoria)
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error('Erro ao atualizar uma categoria')
    return response.json()
}

export async function deleteCategoria(id) {
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro ao excluir a categoria de id ${id}`)
}
