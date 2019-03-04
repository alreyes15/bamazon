var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "jacEl6509",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id: ' + connection.threadId);
  runSearch();
});
// --------------Welcoming Inquirer Prompt-----------
function runSearch() {
    inquirer
    .prompt ({
      name: "confirm",
      type: "confirm",
      message: "Welcome to Bamazon! Would you like you look around?",
      default: true
}).then (function(customer) {
    if (customer.confirm === true) {
        queryInventory();
    }else {
        console.log("Thank you! Have a nice day!")
    }
 });

}

//----------------Function Inventory------------------------
function queryInventory() {
    console.log("                          Items for sale       ");
    console.log("--------------------------------------------------------------------");
    connection.query("SELECT*FROM products", function(err, res) {
        for (var i = 0; i <res.length; i++) {
            console.log(res[i].item_id + "| " + res[i].product_name + "| " + res[i].department_name + "| Price: $" + res[i].price + "| Remaining: " + res[i].stock_quantity );
            console.log("--------------------------------------------------------------------")

        }
        question();
    });

} 

//---------------Question for customer-----
 function question() {
    inquirer.prompt ({
      name: "confirm",
      type: "confirm",
      message: "Would you like to buy an item?",
      default: true
}).then (function(customer) {
    if (customer.confirm === true) {
        itemSelection();
    }else {
        console.log("Thank you! Have a nice day!")
    }
 });
 }
//--------Customer makes their selections---------------

function itemSelection() {

    inquirer.prompt ([{
        name: "inputId",
        type: "input",
        message: "Please enter the item's ID number to select product.",
    },
    {
        name: "inputNum",
        type: "input",
        message: "Please enter the number of units you would like purchase.",
    }
// -------------- Making purchases -------------- 
]).then(function(customerPurchase) {
    connection.query("SELECT * FROM products WHERE item_id =  " + customerPurchase.inputId, function(err, res) {
        

        for(var i = 0; i < res.length; i++) {
            
            if (parseInt(customerPurchase.inputNum)> res[i].stock_quantity){
                console.log("****************************************");
                console.log(" Sorry! Insufficient quantity in stock. ");
                console.log("                                         ")
            } else {
                console.log("+++++++++++++++++++++++++++++++++++++++++++");
                console.log("You have selected: ");
                console.log(res[i].item_id + "| " + res[i].product_name + "| " + res[i].department_name + "| Price: $" + res[i].price + "| Number of Item(s): " + customerPurchase.inputNum );
                console.log("                                      ");
                console.log("Your total:" + res[i].price * customerPurchase.inputNum);
                
                var newQuantity = (res[i].stock_quantity - customerPurchase.inputNum);
                var purchaseId = (customerPurchase.inputId);
                
                confirmPrompt(newQuantity, purchaseId);

            }
        }
    });
});
}
// ---------- #8 Updating Stock -----------------

function confirmPrompt(newQuantity,purchaseId) {

    inquirer.prompt([{
      name: "confirm",
      type: "confirmPurchase",
      message: "Are you sure about this amount?",
      default: true

    }]).then(function(customerConfirms){

    if (customerConfirms.confirm === true) {

        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
        },
        {
            item_id: purchaseId
    }], function(err, res) {});
        console.log("Order is submitted, your items should arrive in 2-3 days");
        console.log("Thank you for shopping on Bamazon Elite");
        runSearch();
    }else {
    console.log("Thank you, maybe next time!")
    runSearch();
    }
  });
};
