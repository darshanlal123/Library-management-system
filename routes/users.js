const express = require("express")
const {users} = require("../data/user.json")

const router = express.Router()

// users 
/*
    *   Route : /user
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


router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each)=> each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id ${id}`
        })
    }

    Object.assign(user, data);

    res.status(200).json({
        success:true,
        data : user,
        message: `User updated successfully`
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

    const index = users.findIndex((each)=> each.id === id);

    if(index === -1){
        return res.status(404).json({
            success:false,
            message:`User not found with id ${id}`
        })
    }

    const deletedUser = users.splice(index,1);

    res.status(200).json({
        success:true,
        data: deletedUser[0],
        message:"User deleted successfully"
    })
})


module.exports= router


