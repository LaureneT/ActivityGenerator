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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
