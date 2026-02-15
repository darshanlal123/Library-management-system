const express = require("express")
const {users} = require("./data/user.json")
const app =express()
const port = 8081

app.use(express.json())

// This is home page code 
app.get("/", (req, res)=>{
    res.status(200).json({
        "message":"Home page"
    })
})

// users 
/*
    *   Route : /user/:id
    *   Method : Get
    *   Description: Get all user list in the system
    *   Assess : public
    *   Parameter : None    
*/
app.get('/users', (req, res)=>{
    res.status(200).json({
        "success": true,
        data: users

    })
})

/*
    *   Route : /users/:id
    *   Method : Get
    *   Description: Get perticular user list in the system
    *   Assess : public
    *   Parameter : id    
*/
app.get("/users/:id", (req, res)=>{

    const {id} = req.params;
    const user = users.find((each)=> each.id === id);
    if (!user){
        return res.status(404).json({
            success: false,
            message: `user is not found ${id}`
        })
    }
    res.status(200).json({
        success:true,
        data:user
    })
})

/*
    *   Route : /users
    *   Method : POST
    *   Description: Create a user
    *   Assess : public
    *   Parameter : None   
*/


    app.post('/users', (req, res)=>{

        const {id, name,surname,email,issuedBook,subscriptionType,subscriptionDate}=req.body
        
        if(!id || !name || !surname || !email || !issuedBook || !subscriptionType || !subscriptionDate){
            return res.status(400).json({
                success: false,
                message: `Please fill all required fields`
            })
        }

        const user  = users.find((each)=>each.id === id)
 
        if (user){
            return res.status(409).json({
                success: false,
                message: `UserID ${id} is already exist`
            })
        }

        users.push({id, name,surname,email,issuedBook,subscriptionType,subscriptionDate})
        res.status(201).json({
            success: true,
            message: `User created successfull !!`

        })
    })

/*
    *   Route : /users/:id
    *   Method : PUT
    *   Description: Updating user detail using therire id
    *   Assess : public
    *   Parameter : id
*/
    app.put('/users/:id', (req, res)=>{
        const {id} = req.params;
        const {data} =req.body;
        const user = users.find((each)=> each.id === id);
        if(!user){
            return res.status(409).json({
                success: false,
                message: `User is not found with id ${id}`
            })
        }

        // object.assign(user, data)
        // with spread oprator
         
        const updateUser= users.map((each)=>{
            if(each.id===id){
                return{
                    ...each,
                    ...data
                }
            }
            return each
        })

        res.status(200).json({
            success:true,
            message: `User updated successfully `
        })

    })

// app.all(/(.*)/, (req, res)=>{
//     res.status(500).json({
//         "message":"Page not found"
//     })
// })

app.listen(port, ()=>{
    console.log(`Your server is runnig on http://localhost:${port}`)    
})