/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

// MongoDB Schema and Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true},
  comments: [String]
});

const Book = mongoose.model("Book", bookSchema);

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      const allBooks = await Book.find({});

      const formattedBooks = allBooks.map(book => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length
      }));

      return res.json(formattedBooks);
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      //response will contain new book object including at least _id and title

      // Check if title is empty or just empty spaces
      if (!title || title.trim().length === 0) {
        return res.send("missing required field title");
      }

      const newBook = await Book.create({ title: title });

      return res.json({
        _id: newBook._id,
        title: newBook.title,
      })
    })
    
    .delete(async function(req, res){
      //if successful response will be 'complete delete successful'
      
      try {
        await Book.deleteMany({});

        return res.send("complete delete successful");

      } catch (err) {
        return console.log(err)
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      
      if (!mongoose.Types.ObjectId.isValid(bookid)) {
        return res.send("no book exists");
      }

      try {
        const searchedBook = await Book.findById(bookid);

        // If no book is found
        if (!searchedBook) {
          return res.send("no book exists");
        }

        return res.json({
          _id: searchedBook._id,
          title: searchedBook.title,
          comments: searchedBook.comments
        });

      } catch (err) {
        return res.send("no book exists");
      }      
    })
    
    .post(async function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      // Check if comment is empty or just empty spaces
      if (!comment || comment.trim().length === 0) {
        return res.send("missing required field comment");
      }

      try {
        const searchedBook = await Book.findByIdAndUpdate(bookid,
          { $push: { comments: comment } },
          { new: true }
        );

        // If no book is found
        if (!searchedBook) {
          return res.send("no book exists");
        }

        return res.json({
          _id: searchedBook._id,
          title: searchedBook.title,
          comments: searchedBook.comments
        });

      } catch (err) {
        return res.send("no book exists");
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      try {
        const searchedBook = await Book.findByIdAndDelete(bookid);

        // If no book is found
        if (!searchedBook) {
          return res.send("no book exists");
        }

        return res.send("delete successful");

      } catch (err) {
        return res.send("no book exists");
      }
    });
  
};
