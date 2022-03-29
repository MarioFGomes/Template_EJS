var express = require('express');
var router = express.Router();
var fs=require('fs');
var pessoas=[];
const Arquivo="C:/Users/Mário Gomes/Documents/arquivo/teste.txt"

/* GET home page. */
router.get('/', function(req, res, next) {
  CarregarArquivo(function(err,data){
    if(err){
      console.log("Erro ao ler o arquivo:"+err);
    }
    pessoas=(JSON.parse(data));
    res.render('index', { title: 'Express',pessoa:pessoas });
  });
  
});



/* GET Pesquisa page. */
router.get('/pesquisa', function(req, res, next) {
  var dadopesquisa=req.query.busca;
  var result=[];
  CarregarArquivo(function(err,data){
    if(err){
      console.log("Erro ao ler o arquivo:"+err);
    }
    pessoas=(JSON.parse(data));
    if(dadopesquisa==""){
      res.render('index', { title: 'Express',pessoa:pessoas });
    }else{
      for(var i=0;i<pessoas.length;i++){
        /*if(dadopesquisa.toLowerCase()==pessoas[i].nome.toLowerCase()){
          result.push(pessoas[i]);
          res.render('index', { title: 'Express',pessoa:result });
        }*/
        var reg=new RegExp(dadopesquisa,"i");
        if(pessoas[i].nome.match(reg)!=null){
          result.push(pessoas[i]);
          res.render('index', { title: 'Express',pessoa:result });
        }
      }
    }
   
  });
  
});

/* POST Cadastro Page. */
router.post('/Cadastrar_pessoa', function(req, res, next) {

var obj={
  nome:req.body.nomes,
  sobrenome:req.body.sobre,
  bi:req.body.bi,
  endereco:req.body.endereco,
  telefone:req.body.telefone
};

  pessoas.push(obj);

  GarvarArquivo(pessoas);

  res.render('index', { title: 'Cadastrar Pessoa',pessoa:pessoas});
});


/* GET Excluir Page. */
router.get('/Excluir', function(req, res, next) {
  var BI=req.query.bi;
  var NovoArray=[];
  CarregarArquivo(function(err,data){
    if(err){
      console.log("Erro ao Pegar Dados para exclusão:"+err);
    }
    pessoas=(JSON.parse(data));
   
    for(i=0;i<pessoas.length;i++){
      if(pessoas[i].BI!=BI){
        NovoArray=pessoas[i];
        
      }
    }
    GarvarArquivo(NovoArray);
    res.render('index', { title: 'Express',pessoa:NovoArray });
  });
  
});


var CarregarArquivo=function(callback){
  fs.readFile(Arquivo,callback);
}

function GarvarArquivo(dados){

  fs.writeFile(Arquivo,JSON.stringify(dados),function(err){
    if(err){
      console.log("Erro ao salvar o arquivo:"+err);
    }else{
      console.log("Arquivo salvo com sucesso");
    }
  });
}

module.exports = router;
