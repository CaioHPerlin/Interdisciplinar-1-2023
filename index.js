const express = require('express');
const path = require('path');
const Pessoa = require("./models/pessoa");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/pessoas', async function(req, res){
  try {
    var pessoas = await Pessoa.select();
    res.json(pessoas.rows);
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar pessoas' });
  }
});

app.post('/pessoas', async function(req, res){
  try {
    var pessoas = await Pessoa.insert(req.body);
    res.json(pessoas.rows);
  } catch (error) {
    console.error('Erro ao criar novas pessoas:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar novas pessoas' });
  }
});

app.delete('/pessoas', async function(req, res){
  try {
    var pessoas = await Pessoa.delete(req.body.id);
    res.json(pessoas.rows);
  } catch (error) {
    console.error('Erro ao deletar:', error);
    res.status(500).json({ error: 'Ocorreu um erro na deletação' });
  }
});

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});