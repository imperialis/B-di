/*import React from 'react';
import './ProductDisplay.css';

const ProductDisplay = ({ addToCart }) => {
  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png' },
    { id: 2, name: 'T-Shirt', price: 15, imageUrl: 'tee.png' },
  ];

  return (
    <div className="ProductDisplay">
      {products.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
      );
};

export default ProductDisplay;*/


//New code
/*
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext'; // Import UserContext
import './ProductDisplay.css';

const ProductDisplay = ({ addToCart }) => {
  const { profile } = useContext(UserContext); // Get user profile from UserContext
  const [showGenderPrompt, setShowGenderPrompt] = useState(false);
  const [filterByGender, setFilterByGender] = useState(false);

  // List of all products
 const products = [
  { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 2, name: 'T-Shirt (Men)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'male', ageGroup: 'adult' },
  { id: 3, name: 'T-Shirt (Women)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 4, name: 'Sneakers', price: 50, imageUrl: 'sneakers.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
  // Additional products...
  { id: 5, name: 'Jeans', price: 30, imageUrl: 'jeans.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 6, name: 'Dress', price: 40, imageUrl: 'dress.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 7, name: 'Shorts', price: 20, imageUrl: 'shorts.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 8, name: 'Sweatshirt', price: 25, imageUrl: 'sweatshirt.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 9, name: 'Sandals', price: 35, imageUrl: 'sandals.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
  { id: 10, name: 'Skirt', price: 30, imageUrl: 'skirt.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 11, name: 'Cap', price: 15, imageUrl: 'cap.png', category: 'accessories', gender: 'unisex', ageGroup: 'adult' },
  { id: 12, name: 'Jacket', price: 60, imageUrl: 'jacket.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  // Additional products...
];


  useEffect(() => {
    // Check if the user's profile includes gender information
    if (profile && profile.gender) {
      // If the user's gender is available, prompt them to filter by gender
      setShowGenderPrompt(true);
    }
  }, [profile]);

  const toggleFilterByGender = () => {
    setFilterByGender(!filterByGender);
  };

  // Logic to personalize recommendations based on user profile
  const personalizedProducts = getPersonalizedProducts(products, filterByGender, profile);

  // Function to filter products based on user preferences, age group, and gender
  function getPersonalizedProducts(products, filterByGender, profile) {
    // Filter products based on user preferences, age group, and gender
    return products.filter(product => {
      // Check if the product category matches any of the user preferences
      const categoryMatch = profile?.preferences?.includes(product.category) || !profile;
      // Check if the product is suitable for the user's age group
      const ageGroupMatch = product.ageGroup === 'adult' || profile.age >= 18 || !profile;
      // Check if the product is suitable for the user's gender or is unisex
      const genderMatch = product.gender === 'unisex' || product.gender === profile.gender || !filterByGender;
      
      // Return true if all conditions are met
      return categoryMatch && ageGroupMatch && genderMatch;
    });
  }

  return (
    <div className="ProductDisplay">
      {/* Gender Filter Prompt *//*}
      /*{showGenderPrompt && (
        <div className="GenderFilterPrompt">
          <p>Do you want to see products based on your gender?</p>
          <button onClick={toggleFilterByGender}>Yes</button>
        </div>
      )}

      {/* Product Listing *//*}
      /*{personalizedProducts.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;*/

/*This code now includes the functionality to filter products
 based on user preferences, 
age group, and gender. Additionally, it prompts the user to filter products
 by gender if gender information is available in their profile.

**/
//latest code
/*
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext'; // Import UserContext
import './ProductDisplay.css';
//import {lCurrencyrate,cSymbol} from './Header';

const ProductDisplay = ({ addToCart }) => {
  const { profile } = useContext(UserContext); // Get user profile from UserContext
  const [showGenderPrompt, setShowGenderPrompt] = useState(false);
  const [filterByGender, setFilterByGender] = useState(false);
  //const currencySymbol = cSymbol;
  //const localCurrencyrate = lCurrencyrate;


  //values
  const getLocalCurrencyrate = async (countryCode) => {
    try {
      // Call the Fixer.io API to get exchange rates for the given country code
     const fixerIoResponse =  await fetch('http://data.fixer.io/api/latest?access_key=20d928a17664d7ed622da7c642cc3921&base=EUR&symbols=NGN');
      //const fixerIoResponse = await fetch(`https://api.fixer.io/latest?base=USD&symbols=${countryCode}`);
      //const fixerIoResponse = await fetch(`https://data.fixer.io/20d928a17664d7ed622da7c642cc3921/latest`);
      const fixerIoData = await fixerIoResponse.json();
      console.log(fixerIoData+"c.code"+ "countryCode");
      //https://data.fixer.io/api/latest
      
      // Extract the relevant currency code from the response data
      //const localCurrencyrate = Object.keys(fixerIoData.rates)[0];
      const localCurrencyrate = Object.values(fixerIoData.rates)[0];
      console.log(localCurrencyrate+"currency rate");
      return localCurrencyrate;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return null;
    }
  };
  
   const fetchLocation = async () => {
    try {
      // Fetch user's location using IP2Location API
      const ip2LocationResponse = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=57808a99c37e4ddd8dc0002899b43c4f');
      const ip2LocationData = await ip2LocationResponse.json();
      const currencyCode = ip2LocationData.currency?.code;
      const currencySymbol = ip2LocationData.currency?.symbol;
      const countryCode = ip2LocationData.country_code3;
      console.log(countryCode+"from ipgeolocation"+ currencySymbol+"c.sym");
  
      // Determine the local currency based on the user's country code
     // const localCurrency = await getLocalCurrency(countryCode);
      const localCurrency = currencyCode;
      console.log(localCurrency+"FROM IPGEOLOCATION" + getLocalCurrencyrate(currencyCode));
      if (localCurrency) {
        setLocalCurrency(localCurrency);
      }
      return currencySymbol;
    } catch (error) {
      console.error('Error fetching location and exchange rates:', error);
    }
  };

  // List of all products
  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
    { id: 2, name: 'T-Shirt (Men)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'male', ageGroup: 'adult' },
    { id: 3, name: 'T-Shirt (Women)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
    { id: 4, name: 'Sneakers', price: 50, imageUrl: 'tee.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
    // Additional products...
  { id: 5, name: 'Jeans', price: 30, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 6, name: 'Dress', price: 40, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 7, name: 'Shorts', price: 20, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 8, name: 'Sweatshirt', price: 25, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 9, name: 'Sandals', price: 35, imageUrl: 'tee.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
  { id: 10, name: 'Skirt', price: 30, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 11, name: 'Cap', price: 15, imageUrl: 'tee.png', category: 'accessories', gender: 'unisex', ageGroup: 'adult' },
  { id: 12, name: 'Jacket', price: 60, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  // Additional products...
  ];

  useEffect(() => {
    // Check if the user's profile includes gender information
    if (profile && profile.gender) {
      // If the user's gender is available, prompt them to filter by gender
      setShowGenderPrompt(true);
    }
  }, [profile]);

  const toggleFilterByGender = () => {
    setFilterByGender(prevState => !prevState);
    setShowGenderPrompt(false);
    console.log("called");
  };

  // Logic to personalize recommendations based on user profile
  const personalizedProducts = getPersonalizedProducts(products, filterByGender, profile);

  // Function to filter products based on user preferences, age group, and gender
  function getPersonalizedProducts(products, filterByGender, profile) {
    // Filter products based on user preferences, age group, and gender
    return products.filter(product => {
      const hasPreferences = profile && profile.preferences;

      // Check if the product category matches any of the user preferences (if available)
      const categoryMatch = hasPreferences ? profile.preferences.includes(product.category) : true;


      // Check if the product category matches any of the user preferences
      //const categoryMatch = profile?.preferences?.includes(product.category) || !profile;
      // Check if the product is suitable for the user's age group
      const ageGroupMatch = product.ageGroup === 'adult' || profile?.age >= 18 || !profile;
      // Check if the product is suitable for the user's gender or is unisex
      const genderMatch = product.gender === 'unisex' || product.gender === profile?.gender || !filterByGender;
      
      // Return true if all conditions are met
      return categoryMatch && ageGroupMatch && genderMatch;
    });
  }

  return (
    <div className="ProductDisplay">
      {/* Gender Filter Prompt *//*}
      {/* {showGenderPrompt && (
        <div className="GenderFilterPrompt">
          <p>Do you want to see products based on your gender?</p>
          <button onClick={toggleFilterByGender}>Yes</button>
        </div>
      )} *//*}

      {/* Product Listing *//*}
      {personalizedProducts.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{currencySymbol}({product.price}*{localCurrencyrate})</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
        {/* Gender Filter Prompt *//*}
        {showGenderPrompt && (
        <div className="GenderFilterPrompt">
          <p>Do you want to see products based on your gender?</p>
          <button onClick={toggleFilterByGender}>Yes</button>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
*/

//new code;

/*
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext'; // Import UserContext
import './ProductDisplay.css';

const ProductDisplay = ({ addToCart }) => {
  const { profile } = useContext(UserContext); // Get user profile from UserContext
  const [showGenderButton, setShowGenderButton] = useState(false);
  const [showCurrencychangeButton, setShowCurrencychangeButton] = useState(false);
  const [filterByGender, setFilterByGender] = useState(false);
  const [useLocalCurrency, setUseLocalCurrency] = useState(false); // State to track whether to use local currency
  const [currencySymbol, setCurrencySymbol] = useState('€'); // Default currency symbol
  const [localCurrencyRate, setLocalCurrencyRate] = useState(1); // Default local currency rate

  // List of all products
  const products = [
    // Product data...
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', category: 'clothing', gender: 'unisex', ageGroup: 'general' },
    { id: 2, name: 'T-Shirt (Men)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'male', ageGroup: 'general' },
    { id: 3, name: 'T-Shirt (Women)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
    { id: 4, name: 'Sneakers', price: 50, imageUrl: 'tee.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
    
    // Additional products...
  { id: 5, name: 'Jeans', price: 30, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 6, name: 'Dress', price: 40, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'general' },
  { id: 7, name: 'Shorts', price: 20, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 8, name: 'Sweatshirt', price: 25, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 9, name: 'Sandals', price: 35, imageUrl: 'tee.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
  { id: 10, name: 'Alcohol', price: 30, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 11, name: 'Cap', price: 15, imageUrl: 'tee.png', category: 'accessories', gender: 'unisex', ageGroup: 'adult' },
  { id: 12, name: 'Jacket', price: 60, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 18, name: 'Dress', price: 40, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'general' },
  { id: 13, name: 'T-Shirt (Men)', price: 20, imageUrl: 'tee.png', category: 'clothing', gender: 'male', ageGroup: 'general' },
  { id: 14, name: 'Socks', price: 5, imageUrl: 'socks.png', category: 'clothing', gender: 'unisex', ageGroup: 'general' },
  { id: 15, name: 'Notebook', price: 10, imageUrl: 'notebook.png', category: 'stationery', gender: 'unisex', ageGroup: 'general' },
  { id: 16, name: 'Backpack', price: 30, imageUrl: 'backpack.png', category: 'accessories', gender: 'unisex', ageGroup: 'general' },
  { id: 17, name: 'Water Bottle', price: 15, imageUrl: 'bottle.png', category: 'accessories', gender: 'unisex', ageGroup: 'general' },

  ];

  useEffect(() => {
    // Check if the user's profile includes gender information
    if (profile && profile.gender) {
      // If the user's gender is available, prompt them to filter by gender
      setShowGenderButton(true);
    }
  }, [profile]);

  const fetchLocation = async () => {
    try {
      // Fetch user's location using IP2Location API
      const ip2LocationResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=57808a99c37e4ddd8dc0002899b43c4f`);

      const ip2LocationData = await ip2LocationResponse.json();
      const currencyCode = ip2LocationData.currency?.code;
      const currencySymbol = ip2LocationData.currency?.symbol;
      const country =ip2LocationData.country_name;
      console.log(currencyCode+"from ipgeolocation"+ currencySymbol+"c.sym"+country+"country");

      // Determine the local currency based on the user's country code
      setCurrencySymbol(currencySymbol);
      const localCurrencyRate = await getLocalCurrencyrate(currencyCode)
      setLocalCurrencyRate(localCurrencyRate);
      return ip2LocationData;
    } catch (error) {
      console.error('Error fetching location and exchange rates:', error);
    }
  };

  
  useEffect(() => {
    const fetchAndCheckLocation = async () => {
      try {
        const ip2LocationData = await fetchLocation();
        const countryFromAPI = ip2LocationData.country_name;
  
        if (profile && profile?.country && profile?.country.toLowerCase() === countryFromAPI.toLowerCase()) {
          setShowCurrencychangeButton(true);
        }
      } catch (error) {
        console.error('Error fetching location and exchange rates:', error);
      }
    };
  
    fetchAndCheckLocation();
  }, [profile]);
  

  const toggleFilterByGender = () => {
    setFilterByGender(prevState => !prevState);
    //setShowGenderButton(false);
    console.log("called");
  };

  // Function to toggle between using local currency and default currency
  const toggleCurrency = () => {
    setUseLocalCurrency(prevState => !prevState);
    // If using local currency, fetch local currency rate and symbol
    if (!useLocalCurrency) {
      fetchLocation();
    } else {
      // If using default currency, reset to default values
      setCurrencySymbol('€'); // Default to EUR for example
      setLocalCurrencyRate(1); // Assuming EUR as base
    }
  };

  // Function to fetch user's location and determine local currency


  // Function to fetch local currency rate based on country code
  const getLocalCurrencyrate = async (countryCode) => {
    try {
      // Call the Fixer.io API to get exchange rates for the given country code
      const fixerIoResponse = await fetch(`http://data.fixer.io/api/latest?access_key=21f98c57eb62a2acf30ab2a7d615a9d5&base=EUR&symbols=${countryCode}`);

      const fixerIoData = await fixerIoResponse.json();
      // Extract the relevant currency rate from the response data
      const localCurrencyrate = Object.values(fixerIoData.rates)[0];
      console.log(localCurrencyrate+"currency rate");
      return localCurrencyrate;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return null;
    }
  };

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
  
    // Adjust age if birth month is after current month or birth day is after current day
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age - 1;
    }
    
    return age;
  }
  

  // Logic to personalize recommendations based on user profile
  const personalizedProducts = getPersonalizedProducts(products, filterByGender, profile);
 // Get the date of birth from the profile
console.log(profile?.birthdate)

// Calculate age based on date of birth
//const age = dateOfBirth ? calculateAge(dateOfBirth) : null;

// Function to calculate age


// Store the calculated age in a constant
var AGE = 0;
console.log(AGE)


  // Function to filter products based on user preferences, age group, and gender
  function getPersonalizedProducts(products, filterByGender, profile) {
    // Filter products based on user preferences, age group, and gender
    return products.filter(product => {
      const hasPreferences = profile && profile.preferences;

      // Check if the product category matches any of the user preferences (if available)
      const categoryMatch = hasPreferences ? profile.preferences.includes(product.category) : true;

      // Check if the product is suitable for the user's age group
      //const ageGroupMatch = product.ageGroup === 'adult' || AGE >= 18 || !profile;
      var AGE = profile?.birthdate ? calculateAge(profile?.birthdate) : null;
      const ageGroupMatch =AGE >= 18  || product.ageGroup === 'general' || !profile;
      console.log(AGE+"CHECK");

      // Check if the product is suitable for the user's gender or is unisex
      const genderMatch = product.gender === 'unisex' || product.gender === profile?.gender || !filterByGender;

      // Return true if all conditions are met
      return categoryMatch && ageGroupMatch && genderMatch;
    });
  }

  return (
    <div className="ProductDisplay">
    
     {/* Toggle Currency Button *//*}/*
     {showCurrencychangeButton && (<div>
        <button onClick={toggleCurrency}>
          {useLocalCurrency ? "Reset to Default Currency" : "Use Currency Native to Your Location"}
        </button>
      </div>
      )}

      {/* Gender Filter Prompt *//*}/*
      {showGenderButton && (
        <div className="GenderFilterButton">
          <button onClick={toggleFilterByGender}>{filterByGender ? 'Unfilter by Gender' : 'Filter by Gender'}</button>
        </div>
      )}
      <div  className="Space" ></div>
      {/* Product Listing *//*}/*
      {personalizedProducts.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          {/* Display price in selected currency *//*}/*
          <p>{currencySymbol}{Math.round(product.price * (useLocalCurrency ? localCurrencyRate : 1))}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

     
    </div>
  );
};

export default ProductDisplay;*/

//
import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './ProductDisplay.css';

const ProductDisplay = ({ addToCart }) => {
  const { profile } = useContext(UserContext);
  const [showGenderButton, setShowGenderButton] = useState(false);
  const [showCurrencyChangeButton, setShowCurrencyChangeButton] = useState(false);
  const [filterByGender, setFilterByGender] = useState(false);
  const [useLocalCurrency, setUseLocalCurrency] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState('€');
  const [localCurrencyRate, setLocalCurrencyRate] = useState(1);

  useEffect(() => {
    if (profile && profile.gender) {
      setShowGenderButton(true);
    }
  }, [profile]);

  useEffect(() => {
    const fetchAndCheckLocation = async () => {
      try {
        const ip2LocationData = await fetchLocation();
        const countryFromAPI = ip2LocationData.country_name;

        if (profile && profile.country && profile.country.toLowerCase() === countryFromAPI.toLowerCase()) {
          setShowCurrencyChangeButton(true);
        }
      } catch (error) {
        console.error('Error fetching location and exchange rates:', error);
      }
    };

    fetchAndCheckLocation();
  }, [profile]);

  const fetchLocation = async () => {
    try {
      const ip2LocationResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=57808a99c37e4ddd8dc0002899b43c4f`);
      const ip2LocationData = await ip2LocationResponse.json();
      const currencyCode = ip2LocationData.currency?.code;
      const currencySymbol = ip2LocationData.currency?.symbol;

      setCurrencySymbol(currencySymbol);
      const localCurrencyRate = await getLocalCurrencyRate(currencyCode);
      setLocalCurrencyRate(localCurrencyRate);

      return ip2LocationData;
    } catch (error) {
      console.error('Error fetching location and exchange rates:', error);
    }
  };

  const toggleFilterByGender = () => {
    setFilterByGender(prevState => !prevState);
  };

  const toggleCurrency = () => {
    setUseLocalCurrency(prevState => !prevState);
    if (!useLocalCurrency) {
      fetchLocation();
    } else {
      setCurrencySymbol('€');
      setLocalCurrencyRate(1);
    }
  };
  const products = [
    // Product data...
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', category: 'clothing', gender: 'unisex', ageGroup: 'general' },
    { id: 2, name: 'T-Shirt (Men)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'male', ageGroup: 'general' },
    { id: 3, name: 'T-Shirt (Women)', price: 15, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
    { id: 4, name: 'Sneakers', price: 50, imageUrl: 'tee.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
    
    // Additional products...
  { id: 5, name: 'Jeans', price: 30, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 6, name: 'Dress', price: 40, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'general' },
  { id: 7, name: 'Shorts', price: 20, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 8, name: 'Sweatshirt', price: 25, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 9, name: 'Sandals', price: 35, imageUrl: 'tee.png', category: 'shoes', gender: 'unisex', ageGroup: 'adult' },
  { id: 10, name: 'Alcohol', price: 30, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'adult' },
  { id: 11, name: 'Cap', price: 15, imageUrl: 'tee.png', category: 'accessories', gender: 'unisex', ageGroup: 'adult' },
  { id: 12, name: 'Jacket', price: 60, imageUrl: 'tee.png', category: 'clothing', gender: 'unisex', ageGroup: 'adult' },
  { id: 18, name: 'Dress', price: 40, imageUrl: 'tee.png', category: 'clothing', gender: 'female', ageGroup: 'general' },
  { id: 13, name: 'T-Shirt (Men)', price: 20, imageUrl: 'tee.png', category: 'clothing', gender: 'male', ageGroup: 'general' },
  { id: 14, name: 'Socks', price: 5, imageUrl: 'socks.png', category: 'clothing', gender: 'unisex', ageGroup: 'general' },
  { id: 15, name: 'Notebook', price: 10, imageUrl: 'notebook.png', category: 'stationery', gender: 'unisex', ageGroup: 'general' },
  { id: 16, name: 'Backpack', price: 30, imageUrl: 'backpack.png', category: 'accessories', gender: 'unisex', ageGroup: 'general' },
  { id: 17, name: 'Water Bottle', price: 15, imageUrl: 'bottle.png', category: 'accessories', gender: 'unisex', ageGroup: 'general' },

  ];


  const getLocalCurrencyRate = async (countryCode) => {
    try {
      const fixerIoResponse = await fetch(`http://data.fixer.io/api/latest?access_key=21f98c57eb62a2acf30ab2a7d615a9d5&base=EUR&symbols=${countryCode}`);
      const fixerIoData = await fixerIoResponse.json();
      return Object.values(fixerIoData.rates)[0];
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return null;
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      return age - 1;
    }
    
    return age;
  }

  const getPersonalizedProducts = (products, filterByGender, profile) => {
    return products.filter(product => {
      const hasPreferences = profile && profile.preferences;
      const categoryMatch = hasPreferences ? profile.preferences.includes(product.category) : true;
      const AGE = profile?.birthdate ? calculateAge(profile?.birthdate) : null;
      const ageGroupMatch = AGE >= 18 || product.ageGroup === 'general' || !profile;
      const genderMatch = product.gender === 'unisex' || product.gender === profile?.gender || !filterByGender;

      return categoryMatch && ageGroupMatch && genderMatch;
    });
  }

  const personalizedProducts = getPersonalizedProducts(products, filterByGender, profile);

  return (
    <div className="ProductDisplay">
      {showCurrencyChangeButton && (
        <div>
          <button onClick={toggleCurrency}>
            {useLocalCurrency ? "Reset to Default Currency" : "Use Currency Native to Your Location"}
          </button>
        </div>
      )}
      
      {showGenderButton && (
        <div className="GenderFilterButton">
          <button onClick={toggleFilterByGender}>{filterByGender ? 'Unfilter by Gender' : 'Filter by Gender'}</button>
        </div>
      )}
      <div  className="Space" ></div>

      {personalizedProducts.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{currencySymbol}{Math.round(product.price * (useLocalCurrency ? localCurrencyRate : 1))}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
