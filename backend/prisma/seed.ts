import { PrismaClient } from '@prisma/client';
import propertiesData from './properties.json';

const prisma = new PrismaClient();


async function main() {
    for (const property of propertiesData.properties) {
      // First insert the property (without AllPics)
      const createdProperty = await prisma.property.create({
        data: {
          id: property.id,
          type: property.type,
          bedrooms: property.bedrooms,
          price: property.price,
          tenure: property.tenure,
          description: property.description,
          location: property.location,
          picture: property.picture,
          FloorPlan: property.FloorPlan,
          Postcode: property.Postcode,
          url: property.url,
          added_month: property.added.month,
          added_day: property.added.day,
          added_year: property.added.year,
        },
      });
  
      // Then insert related images (AllPics)
      for (const pic of property.AllPics) {
        await prisma.image.create({
          data: {
            url: pic,
            propertyId: createdProperty.id,
          },
        });
      }
    }
  }
  
  main()
    .then(() => {
      console.log('✅ Seeding complete');
      return prisma.$disconnect();
    })
    .catch((e) => {
      console.error(e);
      return prisma.$disconnect();
    });