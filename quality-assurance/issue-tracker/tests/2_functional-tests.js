const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const { send } = require('express/lib/response');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Create an issue with every field (POST)", (done) => {
        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "Test Title",
            issue_text: "Test Text",
            created_by: "Creator",
            assigned_to: "Assignee",
            status_text: "Status Text"
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepInclude(res.body, {
                issue_title: "Test Title",
                issue_text: "Test Text",
                created_by: "Creator",
                assigned_to: "Assignee",
                status_text: "Status Text"
            })
            
            done();
        });
    });

    test("Create an issue with only required fields (POST)", (done) => {
        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "Test Title 2",
            issue_text: "Test Text 2",
            created_by: "Creator 2",
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepInclude(res.body, {
                issue_title: "Test Title 2",
                issue_text: "Test Text 2",
                created_by: "Creator 2",
                assigned_to: "",
                status_text: ""
            });

            done();
        });
    });

    test("Create an issue with missing required fields (POST)", (done) => {
        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_text: "Test Text 3",
            created_by: "Creator 3",
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, {
                error: "required field(s) missing"
            });

            done();
        });
    });

    test("View issues on a project (GET)", (done) => {
        const issues = [
            { issue_title: "Title 1", issue_text: "Text 1", created_by: "Test 1" },
            { issue_title: "Title 2", issue_text: "Text 2", created_by: "Test 2" },
            { issue_title: "Title 3", issue_text: "Text 3", created_by: "Test 3" }
        ];

        const randomInteger = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
        const generateRandomProject = "/api/issues/chai_test_get_all_" + randomInteger;

        let completedRequests = 0;

        // Loop through the issues array and make POST requests
        for (let i = 0; i < issues.length; i++) {
            chai.request(server)
            .post(generateRandomProject)
            .send(issues[i])
            .end((err, res) => {
                completedRequests++;

                // Check if all POST requests were done and move to GET
                if (completedRequests === issues.length) {
                    chai.request(server)
                    .get(generateRandomProject)
                    .end((err, res) => {
                        assert.strictEqual(res.status, 200);
                        assert.lengthOf(res.body, 3);
                    });
                    
                    done();
                }
            });
        }
    });

    test("View issues on a project with one filter (GET)", (done) => {
        chai.request(server)
        .get("/api/issues/chai_test")
        .query({ created_by: "Creator" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.isArray(res.body);
            assert.deepInclude(res.body[0], { created_by: "Creator" });

            done();
        })
    });

    test("View issues on a project with multiple filters (GET)", (done) => {
        chai.request(server)
        .get("/api/issues/chai_test")
        .query({ created_by: "Creator", assigned_to: "Assignee" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.isArray(res.body);
            assert.deepInclude(res.body[0], { created_by: "Creator", assigned_to: "Assignee" });

            done();
        })
    });

    test("Update one field on an issue (PUT)", (done) => {
        let _id;
        let record;

        // Create a new record
        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "PUT Title",
            issue_text: "PUT Text",
            created_by: "PUT Creator",
        })
        .end((err, res) => {
            _id = res.body._id

            // Update created record
            chai.request(server)
            .put("/api/issues/chai_test")
            .send({
                _id: _id,
                issue_title: "UPDATED PUT Title"
            })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, {
                    result: "successfully updated",
                    _id: _id
                });

                // Check if value got updated
                chai.request(server)
                .get("/api/issues/chai_test")
                .query({ _id: _id })
                .end((err, res) => {
                    assert.deepInclude(res.body[0], { issue_title: "UPDATED PUT Title" });

                    done();
                });
            });
        });
    });

    test("Update multiple fields on an issue (PUT)", (done) => {
        let _id;
        let record;

        // Create a new record
        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "PUT Title Multiple Fields",
            issue_text: "PUT Text Multiple Fields",
            created_by: "PUT Creator Multiple Fields",
        })
        .end((err, res) => {
            _id = res.body._id

            // Update created record
            chai.request(server)
            .put("/api/issues/chai_test")
            .send({
                _id: _id,
                issue_title: "UPDATED PUT Multiple Fields",
                created_by: "UPDATED PUT Creator Multiple Fields"
            })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, {
                    result: "successfully updated",
                    _id: _id
                });

                // Check if value got updated
                chai.request(server)
                .get("/api/issues/chai_test")
                .query({ _id: _id })
                .end((err, res) => {
                    assert.deepInclude(res.body[0], {
                        issue_title: "UPDATED PUT Multiple Fields",
                        created_by: "UPDATED PUT Creator Multiple Fields"
                    });

                    done();
                });
            });
        });
    });

    test("Update an issue with missing _id (PUT)", (done) => {
        chai.request(server)
        .put("/api/issues/chai_test")
        .query({ issue_title: "UPDATED PUT Title" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, { error: "missing _id" });

            done();
        });
    });

    test("Update an issue with no fields to update (PUT)", (done) => {
        let _id;

        // Create a new record
        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "PUT Title Nothing",
            issue_text: "PUT Text Nothing",
            created_by: "PUT Creator Nothing",
        })
        .end((err, res) => {
            _id = res.body._id

            // Update created record
            chai.request(server)
            .put("/api/issues/chai_test")
            .send({ _id: _id })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, {
                    error: "no update field(s) sent",
                    _id: _id
                });

                done();
            });
        });
    });

    test("Update an issue with an invalid _id (PUT)", (done) => {
        chai.request(server)
        .put("/api/issues/chai_test")
        .send({
            _id: "bla-id",
            issue_title: "PUT Title Invalid ID"
        })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, {
                error: "could not update",
                _id: "bla-id"
            });

            done();
        });
    });

    test("Delete an issue (DELETE)", (done) => {
        // Create record
        let _id;

        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "DELETE Title",
            issue_text: "DELETE Text",
            created_by: "DELETE Creator",
        })
        .end((err, res) => {
            _id = res.body._id;

            // Delete record
            chai.request(server)
            .delete("/api/issues/chai_test")
            .send({ _id: _id })
            .end((err, res) => {
                assert.strictEqual(res.status, 200);
                assert.deepEqual(res.body, {
                    result: "successfully deleted",
                    _id: _id
                });

                // Check if record is deleted
                chai.request(server)
                .delete("/api/issues/chai_test")
                .send({ _id: _id })
                .end((err, res) => {
                    assert.deepEqual(res.body, {
                        error: "could not delete",
                        _id: _id
                    });

                    done();
                });
            });
        });
    });

    test("Delete an issue with an invalid _id (DELETE)", (done) => {
        chai.request(server)
        .delete("/api/issues/chai_test")
        .send({ _id: "bla-id" })
        .end((err, res) => {
            assert.strictEqual(res.status, 200);
            assert.deepEqual(res.body, {
                error: "could not delete",
                _id: "bla-id"
            });

            done();
        });
    });

    test("Delete an issue with missing _id (DELETE)", (done) => {
        // Create record
        let _id;

        chai.request(server)
        .post("/api/issues/chai_test")
        .send({
            issue_title: "DELETE Title",
            issue_text: "DELETE Text",
            created_by: "DELETE Creator",
        })
        .end((err, res) => {
            _id = res.body._id;

            // Delete record
            chai.request(server)
            .delete("/api/issues/chai_test")
            .send({ _id: _id })
            .end((err, res) => {

                // Check if record is deleted
                chai.request(server)
                .delete("/api/issues/chai_test")
                .send({ _id: _id })
                .end((err, res) => {
                    assert.strictEqual(res.status, 200);
                    assert.deepEqual(res.body, {
                        error: "could not delete",
                        _id: _id
                    });

                    done();
                });
            });
        });
    });

});
