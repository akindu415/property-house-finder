// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import propertyData from '../data/properties.json';
import 'react-datepicker/dist/react-datepicker.css';
import { useDrag, useDrop } from 'react-dnd';
import DatePicker from 'react-datepicker';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './SearchStyle.css';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, handleAddFavourite }) => {
    // Enable drag for property card
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'property',
        item: property,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="property-card"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <h3>{property.title}</h3>
            <img src={property.picture} alt={property.title} className="property-image" />
            <p>Type: {property.type}</p>
            <p>Price: £{property.price}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            
            {/* Add to Favourites Button */}
            <button onClick={() => handleAddFavourite(property)} className="favourite-btn">
                 Add to Favourites
            </button>

            {/* View More Button */}
            <Link to={`/property/${property.id}`}>
                <button className="view-more-btn">View More</button>
            </Link>
        </div>
    );
};

const FavouriteCard = ({ property, handleRemoveFavourite }) => {
  return (
      <div className="favourite-card">
          <h3>{property.title}</h3>
          <img src={property.picture} alt={property.title} className="property-image" />
          <p>Type: {property.type}</p>
          <p>Price: £{property.price}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          {/* Remove Button */}
          <button onClick={() => handleRemoveFavourite(property.id)} className="remove-btn">
               Remove
          </button>
      </div>
  );
};

function SearchPage() {
    // State for form fields and favourites
    const [type, setType] = useState('any');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBedrooms, setMinBedrooms] = useState('');
    const [maxBedrooms, setMaxBedrooms] = useState('');
    const [afterDate, setAfterDate] = useState('');
    const [postcode, setPostcode] = useState('');
    const [favouriteProperties, setFavouriteProperties] = useState([]);

    // All properties from JSON data
    const allProperties = propertyData.properties;

    

    // Filtering properties based on criteria
    const getFilteredProperties = () => {
      return allProperties.filter((prop) => {
        // 3.1 Filter by type
        if (type !== 'any' && prop.type.toLowerCase() !== type.toLowerCase()) {
          return false;
        }
  
        // 3.2 Filter by price range
        if (minPrice && prop.price < Number(minPrice)) {
          return false;
        }
        if (maxPrice && prop.price > Number(maxPrice)) {
          return false;
        }
  
        // 3.3 Filter by bedrooms range
        if (minBedrooms && prop.bedrooms < Number(minBedrooms)) {
          return false;
        }
        if (maxBedrooms && prop.bedrooms > Number(maxBedrooms)) {
          return false;
        }
  
        // 3.4 Filter by date
        if (afterDate) {
          const afterDateObj = new Date(afterDate); // user’s date
          const propertyDateObj = convertToDate(prop.added);
  
          // Only include if propertyDateObj >= afterDateObj
          if (propertyDateObj < afterDateObj) {
            return false;
          }
        }
  
        // 3.5 Filter by postcode
        if (postcode && prop.Postcode) {
          if (!prop.Postcode.toUpperCase().startsWith(postcode.toUpperCase())) {
              return false;
          }
      }
  
        return true; // If all filters pass
      });
  
    };

     // Helper to convert {year, month, day} to a real JS Date
  const convertToDate = ({ year, month, day }) => {
    // A small helper to convert month name to index, or handle numeric months
    const monthMap = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11
    };

    let monthIndex;
    if (typeof month === 'string') {
      monthIndex = monthMap[month] ?? 0; // default to 0 if month not found
    } else {
      // If it's already a number, might need to subtract 1 if data has 1 for January
      monthIndex = Number(month) - 1; 
    }

    return new Date(year, monthIndex, day);
  };

    const filteredProperties = getFilteredProperties();

    // Prevent duplicates when adding to favourites
    const handleAddFavourite = (property) => {
        if (!favouriteProperties.some((fav) => fav.id === property.id)) {
            setFavouriteProperties((prev) => [...prev, property]);
            localStorage.setItem('myfavourites', JSON.stringify([...favouriteProperties, property]));
        } else {
            alert('Property already added to favourites!');
        }
    };

    // Remove from Favourites
    const handleRemoveFavourite = (propertyId) => {
      const updatedFavourites = favouriteProperties.filter((fav) => fav.id !== propertyId);
      setFavouriteProperties(updatedFavourites);
      localStorage.setItem('myfavourites', JSON.stringify(updatedFavourites));
  };

    // Drop zone for drag-and-drop
    const [, drop] = useDrop(() => ({
        accept: 'property',
        drop: (item) => handleAddFavourite(item),
    }));

    return (
        <div style={{ display: 'flex', gap: '2rem' }}>
            {/* === Left Column: Search Form === */}
            <div style={{ minWidth: '300px' }}>
                <h1>Your Dream Home Starts From Here</h1>
                <form>
                    <Autocomplete
                        options={['Any', 'House', 'Flat']}
                        value={type}
                        onChange={(event, newValue) => setType(newValue || 'any')}
                        renderInput={(params) => <TextField {...params} label="Type" />}
                        fullWidth
                    />
                    

                    {/* Min/Max Price */}
                        <label>Min Price:</label>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        <label>Max Price:</label>
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

                        {/* Min/Max Bedrooms */}
                        <label>Min Bedrooms:</label>
                        <input type="number" value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} />
                        <label>Max Bedrooms:</label>
                        <input type="number" value={maxBedrooms} onChange={(e) => setMaxBedrooms(e.target.value)} />

                        {/* Postcode */}
                        <label>Postcode:</label>
                        <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />


                    {/* Date Picker */}
                    <label>Added After:</label>
                    <DatePicker
                        selected={afterDate}
                        onChange={(date) => setAfterDate(date)}
                        dateFormat="yyyy-MM-dd"
                        showMonthDropdown
                        showYearDropdown
                    />

                    {/* Submit Button */}
                    <div style={{ marginTop: '1rem' }}>
                      <button type="submit">Search</button>
                    </div>
                    
                </form>
            </div>

            {/* === Right Column: Property Listings === */}
            <div>
                
                <div className="property-gallery">
                    {filteredProperties.map((prop) => (
                        <PropertyCard
                            key={prop.id}
                            property={prop}
                            handleAddFavourite={handleAddFavourite}
                        />
                    ))}
                </div>
            </div>

            {/* === Favourites Section with Drag-and-Drop === */}
            <div ref={drop} className="favourites-list">
                <h2>Favourites</h2>
                {favouriteProperties.length === 0 ? (
                    <p>No favourites added yet.</p>
                ) : (
                    favouriteProperties.map((fav) => (
                      <FavouriteCard
                      key={fav.id}
                      property={fav}
                      handleRemoveFavourite={handleRemoveFavourite}
                  />
                    ))
                )}
            </div>
        </div>
    );
}

export default SearchPage;
