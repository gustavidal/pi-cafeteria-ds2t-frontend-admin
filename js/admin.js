'use strict'
const URL = 'http://localhost:8090/v1/frequency80cafe/admin'

export async function getAdmins(){
    const response = await fetch (URL)
    if(!response.ok) throw new Error('Erro ao listar admins?')
    return response.json()
}

export async function getAdmin(id){
    const response = await fetch(`${URL}/${id}`)
    if (!response.ok) throw new Error(`Erro ao buscar o admin de id ${id}`)
}

export async function postAdmin(admin){
    const options = {
        method: 'POST',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(admin)
    }
    const response = await fetch(URL, options)
    if  (!response.ok) throw new Error ('Erro ao criar um novo admin')
    return response.json()
}
export async function putAdmin(id,admin){
    const options = {
        method: 'PUT',
        headers: {
            'Conten-Type': 'application/json'
        },
        body: JSON.stringify(admin)
    }
    const response = await fetch(`${URL}/${id}`, options)
    if  (!response.ok) throw new Error ('Erro ao criar um novo admin')
    return response.json()
}

export async function deleteAdmin(id){
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(`${URL}/${id}`, options)
    if(!response.ok) throw new Error (`Erro ao excluir admin de id ${id}`)
}

