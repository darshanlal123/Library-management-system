const express = require("express")

// importing the respective routes 
const usersRouter=require("./routes/users")
const booksRouter = require("./routes/books") 


const app =express()
const port = 8081

app.use(express.json())

// This is home page code 
app.get("/", (req, res)=>{
    res.status(200).json({
        "message":"Home page"
    })
})


// all routes define here 
app.use("/users", usersRouter)
app.use("/books", booksRouter)



// app.all(/(.*)/, (req, res)=>{
//     res.status(500).json({
//         "message":"Page not found"
//     })
// })

app.listen(port, ()=>{
    console.log(`Your server is runnig on http://localhost:${port}`)    
})