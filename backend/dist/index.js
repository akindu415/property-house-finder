"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = 4002;
//enable cors
app.use((0, cors_1.default)());
//route to get all properties
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            include: {
                images: true, // Include related images
            },
        });
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// GET /api/properties/:id - Get one property with images
app.get('/api/properties/:id', async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching property' });
    }
});
//start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
