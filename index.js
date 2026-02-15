const express = require("express")
const app =express()
const port = 8081

app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).json({
        "message":"Home page"
    })
})

app.all(/(.*)/, (req, res)=>{
    res.status(500).json({
        "message":"Page not found"
    })
})

app.listen(port, ()=>{
    console.log(`Your server is runnig on http://localhost:${port}`)    
})