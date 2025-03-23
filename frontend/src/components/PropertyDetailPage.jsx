
import React from 'react';
import { useParams } from 'react-router-dom';
import propertyData from '../data/properties.json';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Property Detail Page Component
function PropertyDetailPage() {
    const { id } = useParams(); 
    const property = propertyData.properties.find(prop => prop.id === id);

    // If property is not found return property not found message
    if (!property) {
        return <h2>Property Not Found</h2>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>{property.title}</h1>

            {/* Display main property picture */}
            <img src={property.picture} alt={property.title} style={{ maxWidth: '600px' }} />

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
            <p><strong>Bedrooms:</strong>{property.bedrooms}</p>
            
            
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
