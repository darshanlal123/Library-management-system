const express = require("express")
const {books} = require("../data/books.json")
const {users} = require("../data/user.json")

const router = express.Router()

/*
    *   Route : /books
    *   Method ; GET
    *   Desciptioin: Getl all books 
    *   Access: public
    *   Parameter : None
 */
router.get('/',(req, res)=>{
    res.status(200).json({
        success: true,
        data : books
    })
})


/*
    *   Route : /books/:id
    *   Method ; GET
    *   Desciptioin: Getl all books perticular book by id 
    *   Access: public
    *   Parameter : id
 */
router.get('/:id',(req, res)=>{
    const {id} = req.params;
    const book = books.find((each)=> each.id === id)
    if(!book){
        return res.status(404).json({
            success: false,
            message : `user is not found with id ${id}`

        })
    }
    res.status(200).json({
        success: true,
        data : book
    })
})

/*
    *   Route : /books
    *   Method : POST
    *   Description: Create a Books
    *   Assess : public
    *   Parameter : None   
*/

router.post('/', (req, res)=>{
    const {id,name, author, genre, price, publisher } = req.body

    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success:false,
            message: `Please fill all the details`
        })
    }

    const book = books.find((each)=> each.id === id)

    if(book){
        return res.status(409).json({
            success: true,
            message: `User id ${id} alredy ixist` 
        })
    }

    books.push({id,name, author, genre, price, publisher })
    res.status(201).json({
         success: true,
         message: `Books is created successfully`
    })
})



/*
    *   Route : /books/:id
    *   Method : PUT
    *   Description: Updating book detail using therire id
    *   Assess : public
    *   Parameter : id
*/
router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const {data} = req.body;

    const index = books.findIndex((each)=> each.id === id);

    if(index === -1){
        return res.status(404).json({
            success:false,
            message:`Book not found with id ${id}`
        })
    }

    // update the book
    books[index] = {
        ...books[index],
        ...data
    }

    res.status(200).json({
        success:true,
        data: books[index],
        message:"Book updated successfully"
    });
});

/*
    *   Route : /books/:id
    *   Method : DELETE
    *   Description: Deleting perticular book by id
    *   Assess : public
    *   Parameter : id
*/  

router.delete('/:id', (req, res)=>{
    const {id} = req.params;

    const index = books.findIndex((each)=> each.id === id);

    if(index === -1){
        return res.status(404).json({
            success:false,
            message:`Book not found with id ${id}`
        })
    }

    const deletedBook = books.splice(index,1);

    res.status(200).json({
        success:true,
        data: deletedBook[0],
        message:"Book deleted successfully"
    })
})


// book issued by user 

/*
    *   Route : /books/issued/for-user
    *   Method : GET
    *   Description: get all issued book
    *   Assess : public
    *   Parameter : None
*/  

router.get('/issued/for-user', (req, res)=>{
    const userWithIssuedBook = users.filter((each)=>{
        if (each.issuedBook){
            return each
        }
    })

    const issuedBook =[]

    userWithIssuedBook.forEach((each)=>{
        const book  = books.find((book)=>book.id === each.issuedBook)
        book.issuedby = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBook.push(book)

    })

    if(!issuedBook){
        return res.status(404).json({
            success: false,
            message: `No any book issued !` 
        })
    }

    res.status(200).json({
        success : true,
        data : issuedBook
    })
})

module.exports= router