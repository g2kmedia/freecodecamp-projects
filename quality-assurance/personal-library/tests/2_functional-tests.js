/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let globalBookId;
let globalBookTitle;

suite('Functional Tests', function () {

  suite('Routing tests', function () {


    suite('POST /api/books with title => create book object/expect book object', function () {

      test('Test POST /api/books with title', function (done) {
        chai.request(server)
          .post("/api/books")
          .send({ title: "Test Title" })
          .end((err, res) => {

            // Store _id, title globally for other tests
            globalBookId = res.body._id;
            globalBookTitle = res.body.title;

            assert.strictEqual(res.status, 200);
            assert.deepInclude(res.body, { title: "Test Title" }, "Output title should match input");
            assert.typeOf(res.body._id, "string", "_id should be of type String");

            done();
          });
      });

      test('Test POST /api/books with no title given', function (done) {
        chai.request(server)
          .post("/api/books")
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "missing required field title");

            done();
          });
      });
    });


    suite('GET /api/books => array of books', function () {

      test('Test GET /api/books', function (done) {
        chai.request(server)
          .get("/api/books")
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.isArray(res.body, "The response should be an array containing all books");
            assert.typeOf(res.body[0]._id, "string", "Book should have a string _id");
            assert.typeOf(res.body[0].title, "string", "Book should have a string title");
            assert.typeOf(res.body[0].commentcount, "number", "Book should have a commentscount that is a number");

            done();
          });
      });

    });


    suite('GET /api/books/[id] => book object with [id]', function () {

      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .get("/api/books/bla123id")
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "no book exists");

            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .get(`/api/books/${globalBookId}`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.body._id, globalBookId, "Output _id should match input");
            assert.strictEqual(res.body.title, globalBookTitle, "Title should be the same as the one previously stored");
            assert.isArray(res.body.comments, "Should return comments property of type Array");

            done();
          });
      });
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function () {

      test('Test POST /api/books/[id] with comment', function (done) {
        chai.request(server)
          .post(`/api/books/${globalBookId}`)
          .send({ comment: "Test comment" })
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepStrictEqual(res.body,
              {
                _id: globalBookId,
                title: globalBookTitle,
                comments: ["Test comment"]
              },
              "Response should contain previously added infos as well as the new comment"
            );

            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', function (done) {
        chai.request(server)
          .post(`/api/books/${globalBookId}`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "missing required field comment");

            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', function (done) {
        chai.request(server)
          .post("/api/books/bla123id")
          .send({ comment: "Test comment 2" })
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "no book exists");

            done();
          });
      });

    });

    suite('DELETE /api/books/[id] => delete book object id', function () {

      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai.request(server)
          .delete(`/api/books/${globalBookId}`)
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "delete successful");

            done();
          });
      });

      test('Test DELETE /api/books/[id] with id not in db', function (done) {
        chai.request(server)
          .delete("/api/books/bla123id")
          .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.strictEqual(res.text, "no book exists");

            done();
          });
      });
    });

  });

});
