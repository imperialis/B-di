/*import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import './Checkout.css';

const Checkout = ( {clearCart} ) => {
  const { profile } = useContext(UserContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: profile?.givenName || '',
    lastName: profile?.familyName || '', 
    email: profile?.email || '',
    phone: profile?.phoneNumber || '', 
    address: profile?.streetAddress || '', 
    postalCode: profile?.postalCode || '',
    city: profile?.locality || '', 
    country: profile?.country || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true)
    clearCart();
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    navigate('/');
  };
  return (
    <div className="CheckoutContainer">
      <div className="Checkout">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email"
            value={userData.email} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            name="firstName" 
            id="firstName"
            value={userData.firstName} 
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            name="lastName" 
            id="lastName"
            value={userData.lastName} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="address">Address</label>
          <input 
            type="text" 
            name="address" 
            id="address"
            value={userData.address} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="postalCode">Postal Code</label>
          <input 
            type="text" 
            name="postalCode" 
            id="postalCode"
            value={userData.postalCode} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="city">City</label>
          <input 
            type="text" 
            name="city" 
            id="city"
            value={userData.city} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="country">Country</label>
          <input 
            type="text" 
            name="country" 
            id="country"
            value={userData.country} 
            onChange={handleChange} 
            required 
          />

          <button type="submit" className="ContinueButton">Submit Order</button>
        </form>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal closeModal={closeConfirmationModal} />
      )}
    </div>
  );
};

export default Checkout;*/


//New code

import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
//import { useAffinidiVault } from '@affinidi/affinidi-vault-sdk';
import './Checkout.css';

const Checkout = ({ clearCart }) => {
  const { profile } = useContext(UserContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  // const { data, setData, isLoading: vaultLoading, error: vaultError } = useAffinidiVault({
  //   documentName: 'orderHistory', // Replace with actual document name
  // });

  const [userData, setUserData] = useState({
    firstName: profile?.givenName || '',
    lastName: profile?.familyName || '',
    email: profile?.email || '',
    phone: profile?.phoneNumber || '',
    address: profile?.address || '',
    postalCode: profile?.postalCode || '',
    city: profile?.locality || '',
    country: profile?.country || '',
    gender: profile?.gender || '',
    birthdate: profile?.birthdate || '',
  });
  console.log(userData.gender +"gender"+ userData.email);
  /*useEffect(() => {
    if (profile && !vaultLoading) {
      fetchOrderHistory();
    }
  }, [profile, vaultLoading]);

  const fetchOrderHistory = async () => {
    try {
      const response = await vault.read('orderHistory'); // Assuming data is stored in a document named 'orderHistory'
      setData(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
    clearCart();
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    navigate('/');
  };

  return (
    <div className="CheckoutContainer">
      <div className="Checkout">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={handleChange}

          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={userData.streetaddress}
            onChange={handleChange}
            required
            autoComplete="address"
          />

          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            value={userData.postalCode}
            onChange={handleChange}
            required
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={userData.city}
            onChange={handleChange}
            required
          />

          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={userData.country}
            onChange={handleChange}
            required
            autoComplete="country"
          />

          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            name="gender"
            id="gender"
            value={userData.gender}
            onChange={handleChange}
            required
          />
          

          <label htmlFor="birthdate">birthdate</label>
          <input
            type="text"
            name="birthdate"
            id="birthdate"
            value={userData.birthdate}
            onChange={handleChange}
            required
          />

          <button type="submit" className="ContinueButton">
            Submit Order
          </button>
        </form>

      </div>
      {showConfirmationModal && (
        <ConfirmationModal closeModal={closeConfirmationModal} />
      
      )}
    </div>
  );
};

export default Checkout;

