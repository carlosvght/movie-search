document.getElementById('formulario').addEventListener('submit', pesquisarFilme);

function pesquisarFilme(e) {
  var filmePesquisa = document.getElementById('txt').value;
  buscarFilme(filmePesquisa);
  e.preventDefault();
}

function buscarFilme(filmePesquisa) {

  axios.get("http://www.omdbapi.com/?apikey=fdbcc99a&s=" + filmePesquisa)
    .then(function (response) {
      console.log(response);
      let filmes = response.data.Search;
      let mostrarFilmes = '';

      for (let i = 0; i < filmes.length; i++) {
        mostrarFilmes += `
        <div id="poster">
          <div>
            <img src="${filmes[i].Poster}" id="img">
            <h4>${filmes[i].Title}</h4>
            <p><a href="#" id="dtl" onclick="filmeDetalhes('${filmes[i].imdbID}')"><strong>Ver Detalhes</strong></a></p>
          </div>
        </div>
        `;
      }
      document.getElementById('filmes').innerHTML = mostrarFilmes;
    })
    .catch(function (error) {
      console.log(error);
    });
  if (filmePesquisa.length < 3) {
    alert('Informe no mínimo 3 caracteres.');
  }
}


function filmeDetalhes(id) {
  sessionStorage.setItem('filmeID', id);
  window.location = 'detalhes.html';
  return false;
}

function mostrarFilme() {
  const filmeID = sessionStorage.getItem('filmeID');
  axios.get("http://www.omdbapi.com/?apikey=fdbcc99a&i=" + filmeID)
    .then(function (response) {
      let filme = response.data;
      console.log(filme);
      let mostraFilme = `
          <div id="title">
            <img src="${filme.Poster}"
          </div>
          <div id="infos">
            <p><h2><strong>${filme.Title}</strong></h2></p>
            <p><strong>Gênero: </strong>${filme.Genre}</p>
            <p><strong>Lançamento: </strong>${filme.Released}</p>
            <p><strong>Duração: </strong>${filme.Runtime}</p>
            <p><strong>Idiomas: </strong>${filme.Language}</p>
            <p><strong>Prêmios: </strong>${filme.Awards}</p>
            <p><strong>Atores: </strong>${filme.Actors}</p>

            <h3>Descrição</h3>
            ${filme.Plot}
            <hr>
          </div>
        
          <a href="http://imdb.com/title/${filme.imdbID}" class="links" target="_blank">Ver no IMDB</a>
          <a href="index.html" class="links">Voltar a pesquisar</a>
          
      `

      document.getElementById('descricao').innerHTML = mostraFilme;
    })
    .catch(function (error) {
      console.log(error);
    });
}