 
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