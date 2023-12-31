// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Define your routes here
// Route to create a new Constraint
app.post('/constraints', async (req, res) => {
  try {
    const { name, type, values } = req.body;

    // Check if a constraint with the same name already exists
    const existingConstraint = await prisma.constraint.findUnique({
      where: {
        name: name,
      },
    });

    if (existingConstraint) {
      // If a constraint with the same name exists, return an error response
      return res.status(400).json({ error: 'A constraint with the same name already exists.' });
    }

    if(!name || name == '' || !type || type == ''){
      // If the name is empty, return an error response
      return res.status(400).json({ error: 'Cannot create a constraint with an empty name or an empty type.' });
    }

    // Create a new Constraint in the database using Prisma
    const newConstraint = await prisma.constraint.create({
      data: {
        name,
        type,
        values,
      },
    });

    res.json(newConstraint);
  } catch (error) {
    console.error('Error creating Constraint:', error);
    res.status(500).json({ error: 'An error occurred while creating the Constraint.' });
  }
});

// Route to get all Constraints
app.get('/constraints', async (req, res) => {
  try {
    // Query all activities from the database using Prisma
    const allConstraints = await prisma.constraint.findMany();
    res.json(allConstraints);
  } catch (error) {
    console.error('Error fetching constraints:', error);
    res.status(500).json({ error: 'An error occurred while fetching constraints.' });
  }
});

// Route to get a Constraint by name
app.get('/constraints/:name', async (req, res) => {
  try {
    const constraintName = req.params.name;

    // Find the Constraint by name in the database using Prisma
    const constraint = await prisma.constraint.findUnique({
      where: {
        name: constraintName,
      },
    });

    if (!constraint) {
      // If the constraint is not found, return a not found response
      return res.status(404).json({ error: 'Constraint ${constraintName} not found.' });
    }

    res.json(constraint);
  } catch (error) {
    console.error('Error retrieving Constraint:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the Constraint.' });
  }
});

// Route to create a new Activity
app.post('/activities', async (req, res) => {
  try {
    const { name, constraints } = req.body;

    // Check if an activity with the same name already exists
    const exisitingActivity = await prisma.activity.findUnique({
      where: {
        name: name,
      },
    });

    if (exisitingActivity) {
      // If an activity with the same name exists, return an error response
      return res.status(400).json({ error: 'An activity with the same name already exists.' });
    }

    if(!name || name == ''){
      // If the name is empty, return an error response
      return res.status(400).json({ error: 'Cannot create an activity with an empty name.' });
    }

    // Create a new Activity in the database using Prisma
    const newActivity = await prisma.activity.create({
      data: {
        name,
        constraints,
      },
    });

    res.json(newActivity);
  } catch (error) {
    console.error('Error creating Activity:', error);
    res.status(500).json({ error: 'An error occurred while creating the Activity.' });
  }
});

// Route to get all Activities
app.get('/activities', async (req, res) => {
  try {
    // Query all activities from the database using Prisma
    const allActivities = await prisma.activity.findMany();
    res.json(allActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'An error occurred while fetching activities.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
