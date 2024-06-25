const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001;

const filmesPath = path.join(__dirname, 'filmes.json');
const filmesData = fs.readFileSync(filmesPath, 'utf-8');
const filmes = JSON.parse(filmesData);

function buscarFilmesPorGenero(genero) {
    if (!genero) return filmes;
    return filmes.filter(filme => filme.gênero.toLowerCase() === genero.toLowerCase());
}

function gerarTabelaDeFilmes(filmes) {
    let filmesTable = '';
    filmes.forEach(filme => {
        filmesTable += `
        <tr>
            <td>${filme.título}</td>
            <td>${filme.gênero}</td>
            <td>${filme.diretor}</td>
            <td>${filme.ano}</td>
            <td><img src="${filme.cartaz}" alt="${filme.título}" style="max-width: 100px;"></td>
        </tr>
        `;
    });
    return filmesTable;
}

app.get('/buscar-filme', (req, res) => {
    const generoBuscado = req.query.genero;
    const filmesEncontrados = buscarFilmesPorGenero(generoBuscado);
    const filmesTable = gerarTabelaDeFilmes(filmesEncontrados);
    const htmlContent = fs.readFileSync(path.join(__dirname, 'dadosfilme.html'), 'utf-8');
    const finalHtml = htmlContent.replace('{{filmesTable}}', filmesTable);

    res.send(finalHtml);
});

app.get('/', (req, res) => {
    const generoBuscado = req.query.genero;
    const filmesEncontrados = buscarFilmesPorGenero(generoBuscado);
    const filmesTable = gerarTabelaDeFilmes(filmesEncontrados);
    const htmlContent = fs.readFileSync(path.join(__dirname, 'dadosfilme.html'), 'utf-8');
    const finalHtml = htmlContent.replace('{{filmesTable}}', filmesTable);

    res.send(finalHtml);
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});
