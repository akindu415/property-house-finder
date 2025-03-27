import express,{Request,Response} from 'express';

import cors from 'cors';
import propertiesData from './data/properties.json';

const app = express();
const PORT = 5000;

//enable cors
app.use(cors());

//route to get all properties
app.get('/api/properties', (req: Request, res:Response) => {
    return res.json(propertiesData.properties.find((p))=> p.id === id);
});

//route to get property by id
app.get('/api/properties/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const property = propertiesData.properties.find((p) => p.id === id);
  
    if (property) {
      return res.json(property);
    } else {
      return res.status(404).json({ error: 'Property not found' });
    }
  });

  interface Property {
    id: string;
    name: string;
    price: number;
    title: string;}

  //start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });