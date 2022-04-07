var mysql= require('mysql');

db={};
db.cnn={};
db.cnn.exec=function(query,callback){

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root123',
        database : 'backendnode'
      });
    connection.connect();
    connection.query(query, function (error, results, fields) {
        if (error) throw error;       
        callback(results,error);
        connection.end();
      });
}
 


var App={
    Arquivo:"C:/Users/Mário Gomes/Documents/arquivo/teste.txt",
    banco:db
} 

module.exports=App;