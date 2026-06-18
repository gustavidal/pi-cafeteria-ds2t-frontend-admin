'use strict'

const URL = 'http://localhost:8090/v1/frequency80cafe/administracao/admin'

export async function getAdmins() {
    const options = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const response = await fetch(URL, options)
    if (!response.ok) throw new Error('Erro ao listar admins?')
    return response.json()
}

export async function getAdmin(id) {
    const options = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro ao buscar o admin de id ${id}`)
    return response.json()
}

export async function postAdmin(admin) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(admin)
    }

    const response = await fetch(URL, options)
    if (!response.ok) throw new Error('Erro ao criar um novo admin')
    return response.json()
}

export async function putAdmin(id, admin) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(admin)
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error('Erro ao atualizar um admin')
    return response.json()
}

export async function deleteAdmin(id) {
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    const response = await fetch(`${URL}/${id}`, options)
    if (!response.ok) throw new Error(`Erro ao excluir admin de id ${id}`)
}

export async function loginAdmin(login) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    }

    const response = await fetch(`${URL}/login`, options)
    if (!response.ok) throw new Error('Erro ao fazer login.')
    return response.json()
}
