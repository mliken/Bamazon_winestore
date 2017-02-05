var mysql = require("mysql");
var inquirer = require("inquirer");
var myPassword = require('./keys.js');

var connection = myPassword.connection;
//var connection = mysql.createConnection({
  //host: "localhost",
  //port: 3306,

  // Your username
  //user: "root",

  // Your password
  //password: "********",
  //database: "bamazon_winestore"
//});

connection.connect(function(err) {
  if (err) throw err;
  displayRequest();
  setTimeout(userPrompt, 1000);
});

function userPrompt(){

  inquirer.prompt ([
  {
    type:"input",
    message: "Please provide the ID of the product you would like to purchase?",
    name: "id"
  },

  {
    type: "input",
    message: "How many units of the product would like to purchase?",
    name: "quantity"
  }


    //end of inquirer prompt
    ]).then(function(response){
      // console.log(response);

      //select stock quantity column from products table

      var responseID = response.id;

      var responseQuantity = response.quantity;

      connection.query('SELECT stock_quantity, product_name, price FROM products WHERE item_id =?' , responseID, function(err, res){
        // console.log(res);
        if (err){
          throw err;
        }
        
        
        
//creating a conditional statement that updates stock inventory based on users request
if (res[0].stock_quantity>=
  response.quantity) {
  var updateInventory = res[0]
.stock_quantity - response.quantity;
connection.query('UPDATE products SET stock_quantity =? WHERE item_id = ?',[
  updateInventory, response.id], function(error, result){

    if(error){
      throw error;
    }

  });

    // creating variable that takes the price and multiplying it by the quantity of products the user orders

    var itemCost = res[0].price * response.quantity;
    console.log("Customer Cart Total:" + itemCost);
    console.log("Excellent taste in wine!");
    displayRequest();
  }   
  else if (res.stock_quantity ===0){
    console.log("That item is currently unavailable");
    continuePrompt();
  }
});
    });
  }   

  // write a function to display all relevant parameters 

  function displayRequest(){
      // creating a query function and consoling the data to display the table
      connection.query('Select * FROM products',
        function(err, res){
          for (var i =0; i< res.length; i++){
            console.log(res[i].item_id + "|" 
              + res[i].product_name + "|"
              + res[i].department_name + "|"
              + res[i].price + "|" +
              res[i].stock_quantity);
          }
          console.log("____________");

        });
    } 
    function continuePrompt(){
      inquirer.prompt([
      { 
        type: 'confirm',
        name: 'continue',
        message: 'Would you like to purchase more items?'
      }
      ]).then(function(response){
        if(response.continue){
          console.log();
          displayRequest(userPrompt);
        }
        else{
          console.log("Come back soon!");
          connection.end();
        }
      });
    }

      











