var express = require('express')
var path = require ('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.listen(3000,()=>{
    console.log('Server has started')
})
app.set('view engine','pug')

app.use(session(
    {
    secret: 'secret-comp-206', // Choose a ‘secret’ key for the session object
    resave: false, // Don't save session data after request if no changes made
    saveUninitialized: false // Only save session if data has been added
    }
   ))

app.get("/",(request,response)=>{
    response.sendFile(path.join(__dirname, '/public/order.html'))
})
app.get('/submitOrder',(req,res)=>{
    res.render("pizzaOrder", {data: req.session})
})
app.post('/order',(req,res)=>{
    let orderItem = req.body
    switch (orderItem.sizeData)
    {
        case "small": basePrice = 10; toppingPrice=2; break;
        case "medium": basePrice = 15; toppingPrice=3; break;
        case "large": basePrice = 20; toppingPrice=4; break;
     }
    orderItem.price = basePrice + toppingPrice * orderItem.toppingData.length

    if(!req.session.order)
    {
        req.session.order = {orderItems:[], totalPrice:0}
    } 
    req.session.order.totalPrice += orderItem.price   
    req.session.order.orderItems.push(orderItem)

    res.send(orderItem)
})
