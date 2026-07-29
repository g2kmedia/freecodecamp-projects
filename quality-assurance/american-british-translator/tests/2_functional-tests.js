const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

const highlightText = (text) => {
    return `<span class="highlight">${text}</span>`;
}

suite('Functional Tests', () => {
    test("POST with valid fields", (done) => {
        chai.request(server)
        .post("/api/translate")
        .send({
            text: "Mangoes are my favorite fruit.",
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, {
                text: "Mangoes are my favorite fruit.",
                translation: `Mangoes are my ${highlightText("favourite")} fruit.`
            });

            done();
        });
    });

    test("POST with text and invalid locale", (done) => {
        chai.request(server)
        .post("/api/translate")
        .send({
            text: "Mangoes are my favorite fruit.",
            locale: "german-to-british"
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, { error: "Invalid value for locale field" });

            done();
        });
    });

    test("POST with missing text", (done) => {
        chai.request(server)
        .post("/api/translate")
        .send({ locale: "american-to-british" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, { error: "Required field(s) missing" });

            done();
        });
    });

    test("POST with missing locale", (done) => {
        chai.request(server)
        .post("/api/translate")
        .send({ text: "Mangoes are my favorite fruit." })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, { error: "Required field(s) missing" });

            done();
        });
    });

    test("POST with empty text", (done) => {
        chai.request(server)
        .post("/api/translate")
        .send({
            text: "",
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, { error: "No text to translate" });

            done();
        });
    });

    test("POST with text that needs no translation", (done) => {
        chai.request(server)
        .post("/api/translate")
        .send({
            text: "Text that needs no translation.",
            locale: "american-to-british"
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, {
                text: "Text that needs no translation.",
                translation: "Everything looks good to me!"
            });

            done();
        });
    });
});
