'use strict';

// Connect to MongoDB
const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }
}
connectDb();

// Define schema and model
const issueSchema = new mongoose.Schema({
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: String,
  status_text: String,
  created_on: { type: Date, required: true },
  updated_on: { type: Date, required: true },
  open: { type: Boolean, default: true },
});

// Middleware to check if project exists
const checkProjectMiddleware = async (req, res, next) => {
  const project = req.params.project;

  try {
    const projectExists = mongoose.models[project];
    if (!projectExists) {
      return res.json({ error: "could not find project" });
    }
    next();

  } catch (err) {
    return res.json({ error: "An error occurred while checking the project" });
  }
};


module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(checkProjectMiddleware, async function (req, res){
      const project = mongoose.models[req.params.project];

      // Check for queries
      let queryFilter = {};

      Object.entries(req.query).forEach(([query, value]) => {
        if (value) {
          queryFilter[query] = value;
        }
      });

      // Query DB for all Issues and remove "__v" property from results as it's not needed
      const allIssues = await project.find(queryFilter).select("-__v");

      return res.json(allIssues);
      
    })
    
    .post(async function (req, res){
      const projectInput = req.params.project;

      // Check if project exists and create one if necessary
      if (!mongoose.models[projectInput]) {
        mongoose.model(projectInput, issueSchema);
      }

      const project = mongoose.models[projectInput];

      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      } = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: "required field(s) missing" });
      }

      const newIssue = await project.create({
        issue_title: issue_title,
        issue_text: issue_text,
        created_by: created_by,
        assigned_to: assigned_to || "",
        status_text: status_text || "",
        created_on: new Date(),
        updated_on: new Date()
      });

      return res.json({
        _id: newIssue._id,
        issue_title: newIssue.issue_title,
        issue_text: newIssue.issue_text,
        created_on: newIssue.created_on,
        updated_on: newIssue.updated_on,
        created_by: newIssue.created_by,
        assigned_to: newIssue.assigned_to,
        open: newIssue.open,
        status_text: newIssue.status_text
      });

    })
    
    .put(checkProjectMiddleware ,async function (req, res){
      const project = mongoose.models[req.params.project];
      const _id = req.body._id;

      // Return error if no _id is provided
      if (!_id) {
        return res.json({ error: "missing _id" });
      }

      // Get values that need to be updated
      let valuesToUpdate = { updated_on: new Date() };

      Object.entries(req.body).forEach(([key, value]) => {
        if (value && key !== "_id") {
          valuesToUpdate[key] = value;
        }
      });

      // Check if the update contains any values to update
      if (Object.keys(valuesToUpdate).length <= 1) {
        return res.json({
          error: "no update field(s) sent",
          _id: _id
        });
      }

      // Update issue with new values
      try {
        const updatedIssue = await project.findByIdAndUpdate(_id, valuesToUpdate);

        // No document found with the provided _id
        if (!updatedIssue) {
          return res.json({
            error: "could not update",
            _id: _id
          });
        }

        return res.json({
          result: "successfully updated",
          _id: updatedIssue._id
        });

      } catch (err) {
        return res.json({
          error: "could not update",
          _id: _id 
        });
      }

    })
    
    .delete(checkProjectMiddleware, async function (req, res){
      const project = mongoose.models[req.params.project];
      const _id = req.body._id;

      // Return error if no _id is provided
      if (!_id) {
        return res.json({ error: "missing _id" });
      }

      // Delete issue
      try {
        const issueToDelete = await project.findByIdAndDelete(_id);

        // No document found with the provided _id
        if (!issueToDelete) {
          return res.json({
            error: "could not delete",
            _id: _id
          });
        }

        return res.json({
          result: "successfully deleted",
          _id: issueToDelete._id
        });

      } catch (err) {
        return res.json({
          error: "could not delete",
          _id: _id
        });
        
      }
      
    });
    
};
