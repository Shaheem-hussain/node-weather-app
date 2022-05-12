


let form =document.querySelector("form");
let search=document.querySelector("input");
let messageOne=document.querySelector("#forecast");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let searchValue=search.value;
   
    fetch(`/weather?address=${searchValue}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.forecast
        }
    })
}).catch((error)=>{
    console.log(error)
})
})