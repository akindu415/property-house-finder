import express from 'express';
import {Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
const PORT = 5001;

//enable cors
app.use(cors());

//route to get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        images: true, // Include related images
      },
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/properties/:id - Get one property with images
app.get('/api/properties/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching property' });
  }
});

const startServer = (port: number) => {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}...`);
      server.close();
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);