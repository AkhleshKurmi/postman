let addParamsCount = 1;


const urlField = document.getElementById("urlField")
//  console.log(urlField
let parameterBox = document.getElementById("parameterBox")
// console.log(parameterBox)
parameterBox.style.display="none" 

let paramsRadio = document.getElementById("paramsradio")
// console.log(paramsRadio)
paramsRadio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display="none"
    document.getElementById("parameterBox").style.display="block"
    document.getElementById("params").style.display= "block"
})
 
let jsonRadio = document.getElementById("jsonradio")
 jsonRadio.addEventListener("click", ()=>{
    document.getElementById("requestJsonBox").style.display="block"
    document.getElementById("parameterBox").style.display="none"
    document.getElementById("params").style.display= "none"
 })

 let addParams = document.getElementById("addParam")
//  console.log(addParams)
addParams.addEventListener("click",()=>{
 let params = document.getElementById("params")
//  console.log(params)
 let string = `
 <div id="parameterBox"> 
 <div class="form-row my-2"> 
   <label for="parameterkey${addParamsCount + 1}" class="col-sm-2 col-form-label">Parameter ${addParamsCount + 1}</label> 
   <div class="col-md-4"> 
     <input type="text" class="form-control" id="parameterkey${addParamsCount + 1}" placeholder="Enter Parameter ${addParamsCount + 1} Key"> 
   </div> 
   <div class="col-md-4"> 
     <input type="text" class="form-control" id="parametervalue${addParamsCount + 1}" placeholder="Enter Parameter ${addParamsCount + 1} Value"> 
   </div> 
   <button type="button" id="addParam" class="btn btn-primary deleteParam">-</button> 
 </div> 
</div> `
addParamsCount++;
// console.log("before",typeof string)
let childElement = getElementFromString(string)
// console.log("after",typeof childElement)
params.appendChild(childElement)


let deleteParam = document.getElementsByClassName("deleteParam")
// console.log(deleteParam)
for(item of deleteParam){

    // console.log(item)
    item.addEventListener("click",function(e){
        e.target.parentElement.remove();
        
    
    })
}
})

function getElementFromString(string){
    const div =document.createElement('div');
    div.innerHTML= string
    return div.firstElementChild
}



document.getElementById("submit").addEventListener("click",()=>{
    const url =urlField.value;
    // console.log(url)
    const requestType = document.querySelector("input[name = 'requestType']:checked").value;
    const contentType =document.querySelector("input[name =  'contentType']:checked").value;
    // console.log(contentType)

    if(contentType== 'params'){
        let data ={}
        for(let i =1; i<=addParamsCount;i++){

         const key = document.getElementById(`parameterkey${i}`).value
        //  console.log(key)
       
         let value = document.getElementById(`parametervalue${i}`).value;
         data[key] = [value];
        }
        // console.log(data)
        data= JSON.stringify(data)
    }else{
      data = document.getElementById("requestJsonText").value

    }
    // console.log(data)

    if(requestType=="GET"){
      fetch(url,{
      method : "GET"
    })
    .then(data => data.text())
    .then(res => {
      document.getElementById("responseJsonText").value= res
    })
    }
    if (requestType === "POST"){
    fetch(url,{
      method: "POST",
      body:data,
      headers:{
        "Content type":"application/json; charsetUTF-8"
      }
    })
    .then(res => res.text())
    .then(res =>{
      document.getElementById("responseJsonText").value= res
    })
    }

})

