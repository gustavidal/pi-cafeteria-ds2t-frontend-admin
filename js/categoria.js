'use strict'
const URL = 'http://localhost:8090/v1/frequency80cafe/categoria'

export async function getCategorias(){
    const response = await fetch (URL)
    if(!response.ok) throw new Error('Erro ao listar categorias?')
    return response.json()
}

export async function getCategoria(id){
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar o contato de id ${id}`)
}

export async function postCategoria(categoria){
    const options = {
        method: 'POST',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    }
    const response = await fetch(URL, options)
    if  (!response.ok) throw new Error ('Erro ao criar uma nova categoria')
    return response.json()
}
export async function putCategoria(id,categoria){
    const options = {
        method: 'PUT',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(categoria)
    }
    const response = await fetch(`${URL}/${id}`, options)
    if  (!response.ok) throw new Error ('Erro ao criar uma nova categoria')
    return response.json()
}

export async function deleteCategoria(id){
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(`${URL}/${id}`, options)
    if(!response.ok) throw new Error (`Erro ao excluir a categoria de id ${id}`)
}

module.export = {
    getCategorias,
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}