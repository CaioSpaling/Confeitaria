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


const URL_CARDAPIO = "https://confeitaria-api-l3xg.onrender.com/cardapio";

const imagensBolo = {
    "Bolo de cenoura ": "https://static.itdg.com.br/images/360-240/b2b92774c7fec4a05604e5573ef5a294/365326-original.jpg",
    "Bolo de fubá": "https://static.itdg.com.br/images/360-240/6e568c96326ae47d7a75bf9d2e96bb60/bolo-de-fuba-simples.jpg",
    "Bolo Red Velvet": "https://www.estadao.com.br/resizer/qE_Ym-VsxCMh1Ux-Br1m1vUGf9Q=/arc-anglerfish-arc2-prod-estadao/public/NWRHISDZQ5O2TAHNCID5EF3WW4.jpg"
};

async function buscarEExibirCardapio() {
  const container = document.getElementById('cardapio');
  
  container.innerHTML = '<p>Carregando as delícias do cardápio...</p>';

  try {
    const resposta = await fetch(URL_CARDAPIO);

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: Status ${resposta.status}`);
    }

    const cardapio = await resposta.json();
    
    exibirCardapioNoHTML(cardapio, container);
    
  } catch (erro) {
    console.error("Ocorreu um erro ao buscar o cardápio:", erro);
    container.innerHTML = `<p style="color: red; font-weight: bold;">❌ Falha ao carregar o cardápio. Tente novamente mais tarde.</p>`;
  }
}

function exibirCardapioNoHTML(cardapio, container) {
  container.innerHTML = ''; 

  if (!cardapio || cardapio.length === 0) {
    container.innerHTML = '<p>Nenhum bolo encontrado no cardápio.</p>';
    return;
  }

  const fragmento = document.createDocumentFragment();
  
  cardapio.forEach(bolo => {
    const itemBolo = document.createElement('div');
    itemBolo.classList.add('item-bolo');

    const urlImagem = imagensBolo[bolo.nome];
    if (urlImagem) {
        const imagem = document.createElement('img');
        imagem.src = urlImagem;
        imagem.alt = `Imagem de ${bolo.nome}`;
        imagem.classList.add('bolo-imagem');
        itemBolo.appendChild(imagem);
    }
    
    const nome = document.createElement('h3');
    nome.textContent = bolo.nome || "Bolo sem nome";

    const preco = document.createElement('p');
    const precoFormatado = bolo.preco ? `R$ ${parseFloat(bolo.preco).toFixed(2)}` : 'Preço indisponível';
    preco.textContent = precoFormatado;

    itemBolo.appendChild(nome);
    itemBolo.appendChild(preco);
    
    fragmento.appendChild(itemBolo);
  });

  container.appendChild(fragmento);
}

document.addEventListener('DOMContentLoaded', buscarEExibirCardapio);
