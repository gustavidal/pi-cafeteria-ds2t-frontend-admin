'use strict'

const URL = 'http://localhost:8090/v1/frequency80cafe/administracao/imagem'

export async function getImagens() {
    const response = await fetch(URL)
    if (!response.ok) throw new Error('Erro ao listar imagens.')
    return response.json()
}

export async function getImagem(id) {
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar a imagem de id ${id}.`)
    return response.json()
}

export async function postImagem(imagem) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(imagem)
    }

    const response = await fetch(URL, options)
    if (!response.ok) throw new Error('Erro ao criar uma nova imagem.')
    return response.json()
}

export async function putImagem(id, imagem) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(imagem)
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error('Erro ao atualizar uma imagem existente.')
    return response.json()
}

export async function deleteImagem(id) {
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro ao excluir imagem de id ${id}`)
}
