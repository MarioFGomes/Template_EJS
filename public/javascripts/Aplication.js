PreencharComboProvincias();

    var nome=document.getElementById("nome");
    var BI=document.getElementById("bi");
   
    var filde=document.getElementById("fildecadastro");
    var btnCadastro=document.getElementById("btncadastro");
  
    
     function LimparCampos(){
     nome.value=null;
     sobre_nome.value=null;
     BI.value=null;
     endereco.value=null;
     telefone.value=null;
    
     }
    
     function mostrarFormulario(){
        filde.style.display="block";
       btnCadastro.style.display="none";
     }
    


 var Apagar=function(BI){
    
    if(confirm("Tem Certeza que deseja excluir este dado?")){
        window.location.href="/Excluir?bi="+BI;
        
    }
   }


   var Alterar=function(BI){
    
    if(BI!=null){
        window.location.href="/alterar?bi="+BI;     
    }
   }


   function Validacao(){
    debugger;
    if(nome.value==undefined || nome.value==""){
        alert("O campo Nome deve ser preenchido");
        return false;
    }
    if(BI.value==undefined || BI.value==""){
        alert("O número do Bilhete deve ser preenchido");
        return false;
    }

    return true;

}


function PreencharComboProvincias(){
    $.ajax("/provincias.js").done(function(dados){
      for(var i=0;i<dados.length;i++){  
        var key=Object.keys(dados[i])[0];
        var value=dados[i][key];
        $("#provincia").append("<option value='"+key+"'>"+value+"</option>");
      }
    });
}

var CarregarBairro=function(){
    var estado=$("#provincia").val();
    $.ajax("/bairros.js?estado="+estado).done(function(dados){
        $("#bairro").html("");
        for(var i=0;i<dados.length;i++){           
          var value=dados[i];
          $("#bairro").append("<option value='"+value+"'>"+value+"</option>");
        }
      });
}