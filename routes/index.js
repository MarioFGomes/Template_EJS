var express = require('express');
var router = express.Router();
var Pessoa=require('../public/javascripts/Pessoa');
var obj=[];


/* GET home page. */
router.get('/', function(req, res, next) {
  Pessoa.Todos(function(pessoa){
    res.render('index', { title: 'Express',pessoa:pessoa });
  });
  
});



/* GET Pesquisa page. */
router.get('/pesquisa', function(req, res, next) {
  var dadopesquisa=req.query.busca;

  Pessoa.BuscarPornome(dadopesquisa,function(results,erro){
    if(erro){
      console.log("deu erro"+erro);
    }else{
      
      res.render('index', { title: 'Express',pessoa:results});
    }
  });
 /* var result=[];
  CarregarArquivo(function(err,data){
    if(err){
      console.log("Erro ao ler o arquivo:"+err);
    }
    pessoas=(JSON.parse(data));
    if(dadopesquisa==""){
      res.render('index', { title: 'Express',pessoa:pessoas });
    }else{
      for(var i=0;i<pessoas.length;i++){
        if(dadopesquisa.toLowerCase()==pessoas[i].nome.toLowerCase()){
          result.push(pessoas[i]);
          res.render('index', { title: 'Express',pessoa:result });
        }
        var reg=new RegExp(dadopesquisa,"i");
        if(pessoas[i].nome.match(reg)!=null){
          result.push(pessoas[i]);
          res.render('index', { title: 'Express',pessoa:result });
        }
      }
    }
   
  });*/
  
});

/* POST Cadastro Page. */
router.post('/Cadastrar_pessoa', function(req, res, next) {

  var pessoas=new Pessoa();
  pessoas.Nome=req.body.nomes;
  pessoas.SobreNome=req.body.sobre;
  pessoas.BI=req.body.bi;
  pessoas.Enderenco=req.body.endereco;
  pessoas.telefone=req.body.telefone;
  
  Pessoa.SalvarTodos(pessoas);
  res.redirect("/");
  
});


/* GET Alterar Page. */
router.get('/alterar', function(req, res, next) {
 
  Pessoa.Buscar(req.query.bi,function(pessoas){
    if(pessoas==null){
      console.log("Erro  Usuario não encontrado");
      res.render('alterar', { title: 'Alterar',pessoa:{} });
    }else{
      res.render('alterar', { title: 'Alterar',pessoa:pessoas });
    }
    
  });
  
});


/* POST Alterar Page. */
router.post('/alterar-pessoa', function(req, res, next) {
  var pessoas=new Pessoa();
  pessoas.Nome=req.body.nomes;
  pessoas.SobreNome=req.body.sobre;
  pessoas.BI=req.body.bi;
  pessoas.Enderenco=req.body.endereco;
  pessoas.telefone=req.body.telefone;
  pessoas.Salvar(function(){
    res.redirect("/");
  },req.body.bi);
  
});



/* GET Excluir Page. */
router.get('/Excluir', function(req, res, next) {
  var pessoas=new Pessoa();
  pessoas.Excluir(function(){
    res.redirect("/");
  },req.query.bi);

  /*CarregarArquivo(function(err,data){
    if(err){
      console.log("Erro ao Pegar Dados para exclusão:"+err);
    }
    pessoas=(JSON.parse(data));
   
    for(i=0;i<pessoas.length;i++){
      if(pessoas[i].BI!=BI){
        NovoArray.push(pessoas[i]);
        
      }
    }
    GarvarArquivo(NovoArray);
    res.render('index', { title: 'Express',pessoa:NovoArray });
  });*/
  
});


router.get('/provincias.js', function(req, res, next) {
  res.send([
    {
    "LP":"Luanda"
  },
  {
    "KZ":"Kwanza-Norte"
    
  },
  {
    "KS":"Kwanza-Sul"
  }
])
  
});


router.get('/bairros.js', function(req, res, next) {

  var bairrosprovincias=[
    {"LP":
    ["Rangel","Cazenga","Viana"]
  },
    {"KZ":
    ["Danlatando","Zavula","Pedreira"]
  },
    {"KS":
    ["Bandeira","Zola","Yetu"]
  }
  ]

  if(req.query.estado!=undefined && req.query.estado!=""){
    var bairros=[]
    for(i=0;i<bairrosprovincias.length;i++){
      var bairrorequest=req.query.estado.toLocaleUpperCase();
      if(bairrosprovincias[i][bairrorequest]!=undefined){
        bairros=bairrosprovincias[i][bairrorequest];
      }
    }
    if(bairros==[]){
      bairros=bairrosprovincias;
    }
    res.send(bairros);
  }else{
    res.send(bairrosprovincias)
  }
  
  
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
