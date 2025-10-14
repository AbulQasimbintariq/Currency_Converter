const url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns= document.querySelectorAll(".dropdown select")
const btn = document.querySelector(".btn")
let fromcurr=document.querySelector(".from select")
let tocurr=document.querySelector(".to select")
let msg=document.querySelector(".msg")


document.addEventListener("load",()=>{
  updateExchangeRate()
})

for( let select of dropdowns){
    for (curcode in countryList){
     let newoption=document.createElement("option")
     newoption.innerText=curcode
     newoption.value=curcode
     if(select.name==="from" && curcode==="USD"){
        newoption.selected="selected"
     } else if(select.name==="to" && curcode==="INR"){
        newoption.selected="selected"
     }
     select.append(newoption)
} 

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  console.log(amtVal)
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
}
  const url=`${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}`
  let responce=await fetch(url)
  let data= await responce.json()
  let rate=data[tocurr.value.toLowerCase()]
  let finalamount=amtVal*rate
  msg=`${amtVal}${fromcurr.value}={finalamount}${tocurr.value}`
  console.log(responce)
}

const updateFlag = (element) => {
    //  console.log(element)
  let currCode = element.value;
  console.log(currCode)
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
      updateExchangeRate();
});