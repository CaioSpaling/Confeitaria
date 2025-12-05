function criarItemCardapio(titulo, descricao, foto) {
    const divItemCardapio = document.createElement('div')
    divItemCardapio.className = 'item-cardapio'
    //colocar classe
    
    const h3Titulo = document.createElement('h3')
    h3Titulo.textContent = titulo

    const pDescricao = document.createElement('p')
    pDescricao.textContent = descricao
    pDescricao.className = 'descricao'

    const img = document.createElement('img')
    img.src = foto
    img.className = 'img-item'

    const divC = document.getElementById('cardapio')

    divItemCardapio.appendChild(h3Titulo)
    divItemCardapio.appendChild(pDescricao)
    divItemCardapio.appendChild(img)

    divC.appendChild(divItemCardapio)
}


function carregarCardapio() {
    fetch('bolos.json')
        .then(response => {
            if (!response.ok) { 
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(dadosBolos => {
            dadosBolos.forEach(bolo => {
                criarItemCardapio(bolo.titulo, bolo.descricao, bolo.foto);
            });
        })
        .catch(error => {
            console.error('Houve um problema ao carregar o cardápio:', error);
            
            document.getElementById('cardapio').innerHTML = '<p>Não foi possível carregar o cardápio no momento. Tente novamente mais tarde.</p>';
        });
}

carregarCardapio();
