var App=require('../../Config/App.js');
var fs=require("fs");

var Pessoa=function(){
    this.Nome="";
    this.SobreNome="";
    this.BI="";
    this.Enderenco="";
    this.telefone="";

    this.Salvar=function(callback,bialteracao){
        
        var nome=this.Nome;
        var sobre_nome=this.SobreNome;
        var endereco=this.Enderenco;
        var telefone=this.telefone;
        Pessoa.Todos(function(pessoas){
         
            if(pessoas==[]){
                console.log("Pessoa não encontrada");
                callback.call(null,null);
            }else{    
                for(var i=0;i<pessoas.length;i++){
                    if(pessoas[i].BI==bialteracao){
                        pessoas[i].Nome=nome;
                        pessoas[i].Sobrenome=sobre_nome;
                        pessoas[i].endereco=endereco;
                        pessoas[i].telefone=telefone;                       
                        Pessoa.Atualizar(pessoas[i]);
                        break;
                    }
                }

               
                
            }
            callback.call();

        }); 

    }

    this.Excluir=function(callback,biExclusao){
        
        Pessoa.Todos(function(pessoas){
         
            if(pessoas==[]){
                console.log("Pessoa não encontrada");
                callback.call(null,null);
            }else{    
                for(var i=0;i<pessoas.length;i++){
                    if(pessoas[i].BI==biExclusao){                                            
                        Pessoa.ExcluirDados(pessoas[i]);
                        break;
                    }
                }

               
                
            }
            callback.call();

        });     
    
    }

}

Pessoa.Buscar=function(bi,callback){
    
    Pessoa.Todos(function(pessoa,erro){
      if(pessoa==null){
        console.log("Pessoa não encontrada");
        callback.call(null,null);
      }else{
        var Usuario=null;
        for(var i=0;i<pessoa.length;i++){
            if(pessoa[i].BI==bi){
                Usuario=pessoa[i];
                break; 
            }
        }
        
        callback.call(null,Usuario);
      }
      
      
     
    });

}

Pessoa.BuscarPornome=function(nome,callback){
    var query="SELECT * FROM backendnode.clientedb where Nome like '%"+nome+"%'";
    App.banco.cnn.exec(query,function(results,error){
        if(error){
            console.error("Erro ao executar a pesquisa na base de dados ");
           callback.call(null,[]);
        }else{
            callback.call(null,results);
        }  
    })
}

Pessoa.SalvarTodos=function(Pessoa){

    var query="insert into clientedb (BI,Nome,telefone,endereco,Sobrenome) values ('"+Pessoa.BI+"','"+Pessoa.Nome+"','"+Pessoa.telefone+"','"+Pessoa.Enderenco+"','"+Pessoa.SobreNome+"')";
    App.banco.cnn.exec(query,function(results,erro){
        if(erro){
            console.log("erro ao salvar os dados do  bando de dados");
            
        }else{
            console.log("Pessoa Salva com sucesso");
        }
    });


    /*fs.writeFile(App.Arquivo,JSON.stringify(Pessoa),function(err){
        if(err){
          console.log("Erro ao salvar o arquivo:"+err);
        }else{
          console.log("Arquivo salvo com sucesso");
        }
      });*/
}


Pessoa.Atualizar=function(Pessoa){

    var query="update clientedb set Nome='"+Pessoa.Nome+"',Sobrenome='"+Pessoa.Sobrenome+"',endereco='"+Pessoa.endereco+"',telefone='"+Pessoa.telefone+"' where ID="+Pessoa.ID+"";
    App.banco.cnn.exec(query,function(results,erro){
        if(erro){
            console.log("erro ao atualizar os dados do  bando de dados");
            
        }else{
            console.log("Dados atualizados com sucesso");
        }
    });

}


Pessoa.ExcluirDados=function(Pessoa){

    var query="delete from clientedb where ID="+Pessoa.ID+"";
    App.banco.cnn.exec(query,function(results,erro){
        if(erro){
            console.log("erro ao deletar os dados do  bando de dados");
            
        }else{
            console.log("Dados deletado com sucesso");
        }
    });

}

Pessoa.Todos=function(callback){ 
    var query="SELECT * FROM backendnode.clientedb";
    App.banco.cnn.exec(query,function(results,erro){
        if(erro){
            console.log("erro ao pegar os dados do  bando de dados");
            callback.call(null,[])
        }else{
            callback.call(null,results);
        }
    });
   /* fs.readFile(App.Arquivo,function(err,data){
        var pessoa=[];
        if(err){
            console.log("Erro ao buscar dados")
        }else{
            pessoa=JSON.parse(data);
        }

        callback.call(null,pessoa);
    });*/
}

module.exports=Pessoa;