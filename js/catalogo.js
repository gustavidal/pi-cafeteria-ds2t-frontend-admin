import "./categoria"
import { getCategoria } from "./categoria"

const categorias = getCategoria

//     {
//         id:1,
//         nome:'CAFÉS E BEBIDAS QUENTES', 
//         descricao:'Descrição da categoria.', 
//         imagem:'imgs/cafe.jpg' 
//     },
//     { 
//         id:2, 
//         nome:'DOCES E SOBREMESAS', 
//         descricao:'Descrição da categoria.', 
//         imagem:'imgs/doce.jpg' 
//     }, 
//     { 
//         id:3, 
//         nome:'SALGADOS', 
//         descricao:'Descrição da categoria.', 
//         imagem:'imgs/salgado.jpg' 
//     },
//     { 
//         id:4, 
//         nome:'BEBIDAS GELADAS', 
//         descricao:'Descrição da categoria.', 
//         imagem:'imgs/salgado.jpg' 
//     },
//     { 
//         id:5, 
//         nome:'CONVENIÊNCIA', 
//         descricao:'Descrição da categoria.', 
//         imagem:'imgs/salgado.jpg' 
//     }   
// ]; 

const container = document.getElementById('categorias')

function renderizar(lista){
    container.innerHTML = '';
    lista.forEach(categoria=>{
        container.innerHTML += ` 
        <div class="card">
        
            <img src="${categoria.imagem}"> 
            
            <div class="info">
                
                <h2>${categoria.nome}</h2>
                <p>${categoria.descricao}</p>

                <button onclick=" 
                location.href= 'produtos.html?categoria=${categoria.id}' ">
                 VEJA MAIS 
                </button> 
                
            </div> 
        </div> `; 
    }); 
} 
    
renderizar(categorias);