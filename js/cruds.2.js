//get Total
//creat Data
//store inside localstorage
//clear Data in input
//show data
//delete
//deleteAll
//count
//update
//search
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit= document.getElementById("submit");

let mood ="create";

let tmp;
//get Total (f1)

function getTotal(){

if(price.value != ""){
 let result = (+price.value + +taxes.value + +ads.value)- +discount.value

total.innerHTML = result;
total.style.background = "white";
total.style.color ="#8f6837";

}else{
    total.innerHTML = "";
    total.style.background= "#8f6837";
}
}

//create Data (f2)
// store inside localstorage(f3) && Array


let dataPro;
if(localStorage.productsAll!= null){
    dataPro = JSON.parse(localStorage.productsAll);
}else{
    dataPro =[];
}


submit.onclick = function(){

let newPro = {
title : title.value.toLowerCase(),
price : price.value,
taxes : taxes.value,
ads   : ads.value,
discount:discount.value,
total : total.innerHTML,
count : count.value,
category: category.value.toLowerCase(),
}

if ( newPro.title!= "" 
    && newPro.price!= ""
    && newPro.category!= ""
    && count.value < 100){
if (mood === "create"){
    if (newPro.count > 1){
        for( i = 0; i <newPro.count; i++){
            dataPro.push(newPro);
        } 
    }else{
        dataPro.push(newPro);
    }
}else{

     dataPro[  tmp ] = newPro;  
     mood = "create";
     submit.innerHTML = "create";
    count.style.display ="block";
}
clearInputs();
}

localStorage.setItem ("productsAll",      JSON.stringify(dataPro)    );
// console.log(dataPro)
readData();
}
// //clear Data in input  (f4)
function clearInputs(){
    title.value = "" ;
    price.value = "";
    taxes.value = "";
    ads.value   = "";
    discount.value= "";
    total.innerHTML= "";
    count.value= "";
    category.value = "";
}

// //show data(f5)

function readData(){

    let table = "";

    for(i =0; i < dataPro.length; i++ ){
        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td> <button onclick = "updateData(${i})"id ="btn Up">Update</button></td>
            <td><button onclick ="deleteEle(${i})" id ="btn Delete">Delete</button></td>
        </tr> 
        `

    }
    document.getElementById("tbody").innerHTML = table;

   let deleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0){
      deleteAll.innerHTML=`<button onclick ="deAll()"id ="btn Up">DeleteAll(${dataPro.length})</button>`
    }else{
        deleteAll.innerHTML ="";
    }
}
readData();

// //delete (f6)

function deleteEle(i){
dataPro.splice(i,1);

localStorage.productsAll =JSON.stringify(dataPro);
readData()
}

// // //deleteAll(f7)
function deAll(){
localStorage.clear();
dataPro.splice(0);
readData()
}

// //update (f8)
function updateData(i){

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value   = dataPro[i].ads;
    discount.value= dataPro[i].discount;
    getTotal()
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML = "Update";

    mood = "update";

    tmp = i;

    scroll({
        top:0,
        behavior:"smooth"
    })
}

// // search (1) (f8)

let searchMood = "Title";

function searchWithCaT(id){

    let search = document.getElementById("search")
    if (id == "searchTitle"){
        searchMood = "Title";
    }else{
        searchMood = "category";
    }
search.placeholder = "search by" +  searchMood;
search.focus();
search.value = "";
readData()
}

// //search 2 (f9)
function searchWithData(value){

    let table = "";

    for(let i = 0; i < dataPro.length; i++ ){
        if(searchMood == "Title"){
        if (dataPro[i].title.includes(value.toLowerCase())){

        table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td> <button onclick = "updateData(${i})"id ="btn Up">Update</button></td>
            <td><button onclick = "deleteEle(${i})"id ="btn Delete">Delete</button></td>
        </tr> 
        `
        }

    }else{
        if (dataPro[i].category.includes(value.toLowerCase())){
            table +=`
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td> <button onclick = "updateData(${i})"id ="btn Up">Update</button></td>
            <td><button onclick = "deleteEle(${i})"id ="btn Delete">Delete</button></td>
        </tr> `
        }

    }

    }
    document.getElementById("tbody").innerHTML = table;
}
