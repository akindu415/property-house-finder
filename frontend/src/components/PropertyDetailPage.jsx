import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Property Detail Page Component
function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await api.getProperty(id);
                // Transform the data to match the expected structure
                const transformedData = {
                    ...data,
                    title: data.type, // Use type as title since we don't have a title field
                    AllPics: data.images.map(img => img.url), // Convert images array to AllPics
                    FloorPlan: data.FloorPlan || '/plans/default.webp', // Provide default if not available
                };
                setProperty(transformedData);
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
    if (!property) return <div>Property Not Found</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{property.type} in {property.location}</h1>

            {/* Display main property picture */}
            <img src={property.picture} alt={property.type} style={{ maxWidth: '600px' }} />

            {/* Display all property pictures */}
            <div className="gallery-container">
                {property.AllPics.map((pic, index) => (
                    <img 
                        key={index} 
                        className="thumbnail-image" 
                        src={pic} 
                        alt={`Thumbnail ${index}`} 
                    />
                ))}
            </div>

            {/* Property Details */}
            <p><strong>Type:</strong> {property.type}</p>
            <p><strong>Price:</strong> £{property.price}</p>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><strong>Tenure:</strong> {property.tenure}</p>
            
            {/* React Tabs Section */}
            <Tabs>
                {/* Tab Headers */}
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Google Map</Tab>
                </TabList>

                {/* Tab Panels */}
                <TabPanel>
                    <p>{property.description}</p>
                </TabPanel>

                <TabPanel>
                    <h3>Floor Plan</h3>
                    <img 
                        src={property.FloorPlan} 
                        alt="Floor Plan" 
                        style={{ maxWidth: '500px', border: '1px solid #ccc' }} 
                    />
                </TabPanel>

                <TabPanel>
                    <h3>Location Map</h3>
                    {/* Embed Google Map */}
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                        width="100%"
                        height="400px"
                        style={{ border: '1px solid #ccc' }}
                        allowFullScreen
                        loading="lazy"
                    />
                </TabPanel>
            </Tabs>

            {/* Back to Search Link */}
            <div style={{ marginTop: '20px' , textAlign: 'center' , fontSize: '20px' , textDecoration: 'none' }}>
                <a href="/">Back to Search</a>
            </div>
        </div>
    );
}

export default PropertyDetailPage;
