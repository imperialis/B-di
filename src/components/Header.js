import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth';
import './Header.css';

const Header = () => {
  const { setProfile } = useContext(UserContext);
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
  });

  const [localProfile, setLocalProfile] = useState(null);

  useEffect(() => {
  // Convert objects to strings to compare them
  const currentProfileStr = JSON.stringify(profile);
  const localProfileStr = JSON.stringify(localProfile);

  // Only update if the stringified versions differ
  if (currentProfileStr !== localProfileStr) {
    setLocalProfile(profile);
    setProfile(profile); // assuming setProfile comes from a context and is stable
  }
}, [profile])

  const logout = () => {
    handleLogout();
    window.location.href = "/";
  };

  const renderLoginState = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (error) {
      handleLogout();
      return (
        <div>
          <p>Unable to load user data. Please try again later.</p>
        </div>
      );
    }
    if (profile) {
        return (
          <div>
            <span>Welcome, {profile.givenName}</span>
            <button onClick={logout}>Logout</button>
          </div>
        );
      }
  
  return <AffinidiLoginButton />;
    };
  
    return (
      <header className="Header">
        <Link to="/">
          <h1>StackShop</h1>
        </Link>
        <nav>
          {renderLoginState()}
          <Link to="/cart" className="CartIcon">
            <img src="/cart.png" alt="Cart"/>
          </Link>
        </nav>
      </header>
    );
    };
  
  export default Header;



  //New version

/*
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth';
import './Header.css';

const Header = () => {
  const { setProfile, userProfile } = useContext(UserContext); // Assuming userProfile includes location data
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
  });
  const [showCurrencyPrompt, setShowCurrencyPrompt] = useState(false);
  const [localCurrency, setLocalCurrency] = useState(null);

  useEffect(() => {
    // Fetch user's approximate location based on IP address
    fetchLocation();

    // Check if user has previously selected a local currency
    const savedCurrency = localStorage.getItem('localCurrency');
    if (savedCurrency) {
      setLocalCurrency(savedCurrency);
    } else {
      // If no local currency is saved, prompt the user to choose
      setShowCurrencyPrompt(true);
    }
  }, []);

  const logout = () => {
    handleLogout();
    window.location.href = "/";
  };

  const fetchLocation = async () => {
    try {
      // Fetch user's location using IP2Location API
      const ip2LocationResponse = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=57808a99c37e4ddd8dc0002899b43c4f');
      const ip2LocationData = await ip2LocationResponse.json();
      const countryCode = ip2LocationData.country?.code;

      // Determine the local currency based on the user's country code
      const localCurrency = await getLocalCurrency(countryCode);
      if (localCurrency) {
        setLocalCurrency(localCurrency);
      }
    } catch (error) {
      console.error('Error fetching location and exchange rates:', error);
    }
  };

  const getLocalCurrency = async (countryCode) => {
    try {
      // Call the Fixer.io API to get exchange rates for the given country code
      const fixerIoResponse = await fetch(`https://api.fixer.io/latest?base=USD&symbols=${countryCode}`);
      const fixerIoData = await fixerIoResponse.json();
      
      // Extract the relevant currency code from the response data
      const localCurrency = Object.keys(fixerIoData.rates)[0];
      return localCurrency;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return null;
    }
  };
// fixer api key 20d928a17664d7ed622da7c642cc3921
  const changeCurrency = (currency) => {
    setLocalCurrency(currency);
    localStorage.setItem('localCurrency', currency);
    setShowCurrencyPrompt(false);
  };

  return (
    <header className="Header">
      <Link to="/">
        <h1>StackShop</h1>
      </Link>
      <nav>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div>
            <p>Unable to load user data. Please try again later.</p>
          </div>
        ) : profile ? (
          <div>
            <span>Welcome, {profile.givenName}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <AffinidiLoginButton />
        )}
        {showCurrencyPrompt && (
          <div>
            <p>Would you like to switch to your local currency?</p>
            <button onClick={() => changeCurrency('USD')}>Yes</button>
            <button onClick={() => setShowCurrencyPrompt(false)}>No</button>
          </div>
        )}
       <span>Language: English</span> {/* Display localized language *//*}/*
        <span>Currency: {localCurrency || 'USD'}</span> {/* Display localized currency *//*}/*
        <Link to="/cart" className="CartIcon">
          <img src="/cart.png" alt="Cart"/>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
*/


//code 3 ; latest code
/*
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { AffinidiLoginButton, useAffinidiProfile } from '@affinidi/affinidi-react-auth';
import './Header.css';
//export  const cSymbol = currencySymbol;
//export  const lCurrencyrate = localCurrencyrate;
const Header = () => {
  const { setProfile, userProfile } = useContext(UserContext); // Assuming userProfile includes location data
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile({
    authCompleteUrl: '/api/affinidi-auth/complete'
  });
  const [showCurrencyPrompt, setShowCurrencyPrompt] = useState(false);
  const [localCurrency, setLocalCurrency] = useState(null);
  const [localProfile, setLocalProfile] = useState(null);
  const [originalCurrency, setOriginalCurrency] = useState('EUR'); // Hardcoded initial currency as EUR


  useEffect(() => {
    // Fetch user's approximate location based on IP address
    fetchLocation();

    // Check if user has previously selected a local currency
    const savedCurrency = localStorage.getItem('localCurrency');
    if (savedCurrency) {
      setLocalCurrency(savedCurrency);
    } else {
      // If no local currency is saved, prompt the user to choose
      setShowCurrencyPrompt(true);
    }
  }, []);
  //added code
  useEffect(() => {
    // Convert objects to strings to compare them
    const currentProfileStr = JSON.stringify(profile);
    const localProfileStr = JSON.stringify(localProfile);
  
    // Only update if the stringified versions differ
    if (currentProfileStr !== localProfileStr) {
      setLocalProfile(profile);
      setProfile(profile); // assuming setProfile comes from a context and is stable
    }
  }, [profile])
//added code ends
  const logout = () => {
    handleLogout();
    window.location.href = "/";
  };
//fetch location's original location
const fetchLocation = async () => {
  try {
    // Fetch user's location using IP2Location API
    const ip2LocationResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.APIKEYIPGEO}`);
    const ip2LocationData = await ip2LocationResponse.json();
    const currencyCode = ip2LocationData.currency?.code;
    const currencySymbol = ip2LocationData.currency?.symbol;
    const countryCode = ip2LocationData.country_code3;
    const country =ip2LocationData.country_name;
    console.log(countryCode+"from ipgeolocation"+ currencySymbol+"c.sym"+""+"cnmae"+country);

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
  

  const resetCurrency = () => {
    setLocalCurrency(originalCurrency); // Reset local currency to the original currency
    localStorage.setItem('localCurrency', originalCurrency); // Save original currency to local storage
    setShowCurrencyPrompt(false); // Hide currency prompt
  };
  
//add export statement
const getLocalCurrencyrate = async (countryCode) => {
  try {
    // Call the Fixer.io API to get exchange rates for the given country code
    const fixerIoResponse = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.APIKEYFIXER}&base=EUR&symbols=${countryCode}`);

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

  const changeCurrency = (currency) => {
    setLocalCurrency(currency);
    localStorage.setItem('localCurrency', currency);
    setShowCurrencyPrompt(false);
  };

  return (
    <header className="Header">
      <Link to="/">
        <h1>StackShop</h1>
      </Link>
      <nav>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div>
            <p>Unable to load user data. Please try again later.</p>
          </div>
        ) : profile ? (
          <div>
            <span>Welcome, {profile.givenName}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <AffinidiLoginButton />
        )}
        {showCurrencyPrompt && (
  <div>
    <p>Would you like to switch to your local currency?</p>
    <button onClick={() => changeCurrency(localCurrency)}>Yes</button>
    <button onClick={() => setShowCurrencyPrompt(false)}>No</button>
  </div>
)}
        <button onClick={resetCurrency}>Reset</button> {/* Button to reset currency to original *//*}
        //<span>Language: English</span> {/* Display localized language *//*}
        //<span>Currency: {localCurrency || 'NGN'}</span> {/* Display localized currency *//*}
        /*<Link to="/cart" className="CartIcon">
       <img src="/cart.png" alt="Cart"/>
        </Link>
      </nav>
    </header>
  );
};
export default Header;*/

   //final version;*/