const express = require("express")
const {users} = require("../data/user.json")

const router = express.Router()

// users 
/*
    *   Route : /user/:id
    *   Method : Get
    *   Description: Get all user list in the system
    *   Assess : public
    *   Parameter : None    
*/
router.get('/', (req, res)=>{
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
router.get("/:id", (req, res)=>{

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


router.post('/', (req, res)=>{

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
router.put('/:id', (req, res)=>{
    const {id} = req.params;                                  //getting id from url
    const {data} =req.body;                                   //getting all data from form
    const user = users.find((each)=> each.id === id);
    if(!user){
        return res.status(409).json({
            success: false,
            message: `User is not found with id ${id}`
        })
    }
    Object.assign(user, data)
    
    // with spread oprator 
    // const updateUser= users.map((each)=>{
    //     if(each.id===id){
    //         return{...each, ...data}
    //     }
    //     return each
    // })
    
    let updateUser =  users.find((each)=> each.id === id);
    res.status(200).json({
        success:true,
        data : updateUser,
        message: `User updated successfully `
    })

})


/*
    *   Route : /users/:id
    *   Method : DELETE
    *   Description: Deleting perticular user by id
    *   Assess : public
    *   Parameter : id
*/  
router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=>each.id ===id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User is not found ${id}"
        })
}
// 1st method 
const index = users.indexOf(user)
users.splice(index,1)

// 2nd method 
const updatedUser = users.filter((each)=> each.id !==id )

    res.status(200).json({
            success: true,
            // data: users,
            data: updatedUser,
            message: "User deleted successfully"        
        })
})

module.exports= router


