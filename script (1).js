function getProducts(){
return JSON.parse(localStorage.getItem("products"))||[];
}

function saveProducts(p){
localStorage.setItem("products",JSON.stringify(p));
}

function login(){
let storedPass = localStorage.getItem("password") || "123";

if(username.value=="admin" && password.value==storedPass){
show("menu");
}else alert("Invalid Login");
}

function logout(){show("login");}

function show(id){
document.querySelectorAll(".container, #inventory")
.forEach(x=>x.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

function back(){show("menu");}

function addProduct(){

let id=pid.value.trim();
let name=pname.value.trim();
let priceVal=parseFloat(price.value);
let qtyVal=parseInt(qty.value);

if(!id||!name||isNaN(priceVal)||isNaN(qtyVal)){
alert("Fill all fields"); return;
}

let products=getProducts();

if(products.find(p=>p.id==id)){
alert("Duplicate ID"); return;
}

products.push({id,name,price:priceVal,qty:qtyVal});
saveProducts(products);

alert("Product Added");
back();
}

function updateProduct(){

let id=uid.value;
let newPrice=parseFloat(uprice.value);
let newQty=parseInt(uqty.value);

let products=getProducts();
let p=products.find(x=>x.id==id);

if(p){

if(!isNaN(newPrice)) p.price=newPrice;
if(!isNaN(newQty)) p.qty=newQty;

saveProducts(products);
alert("Updated");
back();

}else alert("Product Not Found");
}

function showInventory(){

let products=getProducts();
let data="";

products.forEach((p,i)=>{
data+=`<tr>
<td>${p.id}</td>
<td>${p.name}</td>
<td>${p.price}</td>
<td>${p.qty}</td>
<td><button onclick="deleteProduct(${i})">Delete</button></td>
</tr>`;
});

tableData.innerHTML=data;
show("inventory");
}

function deleteProduct(i){
if(confirm("Delete?")){
let products=getProducts();
products.splice(i,1);
saveProducts(products);
showInventory();
}
}

function generateBill(){

let id=bid.value;
let qty=parseInt(bqty.value);

let products=getProducts();
let p=products.find(x=>x.id==id);

if(p && p.qty>=qty){

let totalAmount=p.price*qty;
let paymentVal=totalAmount;
let balance=0;

p.qty-=qty;
saveProducts(products);

document.getElementById("total").innerHTML=
"Product: "+p.name+"<br>"+
"Quantity: "+qty+"<br>"+
"Total Amount: ₹ "+totalAmount+"<br>"+
"Payment: ₹ "+paymentVal+"<br>"+
"Balance: ₹ "+balance;

}else{
alert("Product not available or insufficient stock");
}
}

function searchProduct(){
let id=sid.value;
let p=getProducts().find(x=>x.id==id);

if(p){
result.innerHTML=`${p.name} | ₹${p.price} | Qty: ${p.qty}`;
}else result.innerHTML="Not Found";
}

function showReport(){

let products=getProducts();
let totalProducts=products.length;
let totalStock=products.reduce((sum,p)=>sum+p.qty,0);

reportData.innerHTML=
"Total Products: "+totalProducts+"<br>Total Stock: "+totalStock;

show("report");
}

function changePassword(){

let oldP=oldPass.value;
let newP=newPass.value;

let storedPass = localStorage.getItem("password") || "123";

if(oldP===storedPass){

if(newP.length<3){
alert("Password too short"); return;
}

localStorage.setItem("password",newP);
alert("Password Changed");
back();

}else alert("Incorrect Old Password");
}