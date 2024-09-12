import express  from "express"; 
import mysql    from "mysql";
import cors     from "cors";

const APP = express();
APP.use(cors());

const DB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_new_password",
    database: "test"
});

// Middleware para analisar JSON
APP.use(express.json());

// Inicia o servidor
APP.listen(8800, () => {
    console.log('ok baby!');
})

APP.post('/newBook', (req, res) => {
    const QUERY = "INSERT INTO books (`title`, `description`, `price`,`cover`) VALUES (?)";
    const VALUES = [
        req.body.title, 
        req.body.description, 
        req.body.price,
        req.body.cover
    ];

    DB.query(QUERY, [VALUES], (err, data) => {
        if (err) return res.json(err);
    
        return res.json(data);
    })
})

APP.get('/', (req, res) => {
    const QUERY = "SELECT * FROM books";
    
    DB.query(QUERY, (err, data) => {
   	    if (err) return res.json(err);

	    return res.json(data);
    })
})

APP.delete('/books/:bookId', (req, res) => { 
    let bookId = req.params.bookId;
    const QUERY = "DELETE FROM books WHERE id = ?";
     
    DB.query(QUERY, [bookId], (err, data) => {
        if (err) return res.json(err);

        return res.json("book has been deleted successfuly.");
    })
})

APP.put('/book/update/:bookID', (req, res) => {
    const BOOK_ID = req.params.bookID;

    let updates = [];
    let values = [];

    if (req.body.title) {
        updates.push("title = ?");
        values.push(req.body.title);
    }

    if (req.body.description) {
        updates.push("description = ?");
        values.push(req.body.description);
    }

    if (req.body.price) {
        updates.push("price = ?");
        values.push(req.body.price);
    }

    if (req.body.cover) {
        updates.push("cover = ?");
        values.push(req.body.cover);
    }
    
    if (updates.length === 0) {
        return res.status(400).json("No fields to update.");
    }
    
    const QUERY = `UPDATE books SET ${updates.join(', ')} WHERE id = ?`;
    values.push(BOOK_ID);
    
    DB.query(QUERY, values, (err, data) => {
        if (err) return res.json(err);

        return res.json("book has been updated successfuly.");
    });
})