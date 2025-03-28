import { useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import React from 'react';

interface Property {
  title: ReactNode;
  // define your property interface
  id: string;
  // other properties...
}

export const PropertyDetails = ({ id }: { id: string }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await api.getProperty(id);
        setProperty(data);
      } catch (err) {
        setError('Failed to fetch property details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div>
      {/* Render your property details */}
      <h1>{property.title}</h1>
      {/* ... other property details ... */}
    </div>
  );
}; 