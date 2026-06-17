'use strict'
const URL = 'http://localhost:8090/v1/frequency80cafe/imagem'

export async function getImagens(){
    const response = await fetch (URL)
    if(!response.ok) throw new Error('Erro ao listar imagems?')
    return response.json()
}

export async function getImagem(id){
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar o imagem de id ${id}`)
}

export async function postImagem(imagem){
    const options = {
        method: 'POST',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(imagem)
    }
    const response = await fetch(URL, options)
    if  (!response.ok) throw new Error ('Erro ao criar um novo imagem')
    return response.json()
}
export async function putImagem(id,imagem){
    const options = {
        method: 'PUT',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(imagem)
    }
    const response = await fetch(`${URL}/${id}`, options)
    if  (!response.ok) throw new Error ('Erro ao criar um novo imagem')
    return response.json()
}

export async function deleteImagem(id){
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(`${URL}/${id}`, options)
    if(!response.ok) throw new Error (`Erro ao excluir imagem de id ${id}`)
}

