"use strict"
$(() => {
 $("#order").click(() => {
 let sizeData = $("input[name='size']:checked").val();
 let toppingData = $("input[name='toppings[]']:checked").map(
 function () { return $(this).val()} ).get()
 
 let order = { sizeData, toppingData }
 placeOrder(order)
 })
}
)
function placeOrder(order)
{
 let postData = {
 method:'POST',
 headers: {'Content-Type':'application/json; charset=UTF-8 '},
 body: JSON.stringify(order)
 }
 fetch('/order',postData)
 .then(response=>response.json())
 .then(confirmation=>{ updateForm(confirmation)})
 .catch(err=>{alert(err)})
}

function updateForm(confirmation)
{
 $("#details").text("Order Details")
 let size = "<td>" + confirmation.sizeData +"</td>"
 let toppings = "<td>" + confirmation.toppingData + "</td>"
 let price = "<td>$" + confirmation.price + "</td>"
 let row = `<tr>${size}${toppings}${price}</tr>`
 $("table").append(row)
 $("td").css(tdStyle)
 $("th").css(tdStyle)
 $("#tableID").css(tableStyle)
}

const tableStyle = 
{
    "border": "solid black",
    "border-collapse": "collapse"
}

const tdStyle = 
{
    "border": "solid black",
}

