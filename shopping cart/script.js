//Define variables
let renderData =document.querySelector(".renderData");
let renderCartData =document.querySelector(".renderCartData");
let dynamic_count =document.querySelector(".dynamic-count");
let tcontainer =document.querySelector(".tcontainer");
let line =document.querySelector(".line");
let total_price =document.getElementById("total_price");
let arrr=[];
let calculetTotal =[];
// get Data from Api
async function getdata(){
    const res= await fetch("https://fakestoreapi.com/products");
    const data= await res.json();
    // console.log(data);
    

    data.map((ele)=>{
        let productMainDiv = document.createElement("div");
        let createImgEle = document.createElement("img");
        let createTitle =  document.createElement("p");
        let createPriceEle = document.createElement("p");
        let btnEle = document.createElement("button");
        let btnText = document.createTextNode("Add to cart");
        
        let createPriceText = document.createTextNode(`price:$${ele.price}`);
        let createTextTitle = document.createTextNode(ele.title.slice(0,30));
        createImgEle.setAttribute("src",ele.image);
        createImgEle.setAttribute("class","myImages");
        productMainDiv.setAttribute("class", "box-main");
        createTitle.appendChild(createTextTitle);
        createPriceEle.setAttribute("class",'price-element');
        btnEle.setAttribute("class",'btn-element');
        createPriceEle.appendChild(createPriceText);
        createTitle.setAttribute("class", 'productTitles');
        btnEle.appendChild(btnText);
        productMainDiv.appendChild(createImgEle);
        productMainDiv.appendChild(createTitle);
        productMainDiv.appendChild(createPriceEle);
        productMainDiv.appendChild(btnEle);
     
        renderData.appendChild(productMainDiv);

        function addToCart(img,price){
           arrr.push({ii: img, pp: price});
           console.log(arrr);
            alert("product Added to cart");
            dynamic_count.innerHTML++;
        let cartMDiv = document.createElement("div");
        let cartImgEle =document.createElement("img");
        let cartTrashBtn = document.createElement("i");
        cartTrashBtn.setAttribute("class","fa-solid fa-trash");
        tcontainer.style.display="flex";
        line.style.display="block";
        function deleteItem(){

            cartMDiv.remove();
            dynamic_count.innerHTML--;
        }
        cartTrashBtn.addEventListener("click",deleteItem);
        cartImgEle.setAttribute("src",img);
        cartImgEle.setAttribute("class","cartImageElement");
        cartMDiv.setAttribute("class","cart-styling");
        let cartPriceEle = document.createElement("p");
        let cartPriceText = document.createTextNode(`$${price}`);
        cartPriceEle.setAttribute("class", "cart-pprice")

        cartPriceEle.appendChild(cartPriceText);
        
         cartMDiv.appendChild(cartImgEle);
         cartMDiv.appendChild(cartPriceEle);
         cartMDiv.appendChild(cartTrashBtn);
         renderCartData.appendChild(cartMDiv);
         calculetTotal.push(price);
        //  console.log(calculetTotal);
         let myTotal = calculetTotal.reduce((accum,curval)=>{
            return accum + curval
         })
         total_price.innerHTML = `Total price : $${myTotal}`;

        }

        btnEle.addEventListener("click", ()=>addToCart(ele.image,ele.price))
    })

}

getdata();
