import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ currentUser, onSave }) => {
  const [formData, setFormData] = useState({
    username: currentUser.username,
    bio: currentUser.bio || ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/users/${currentUser._id}`, formData);
      onSave(formData);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={formData.username} onChange={handleChange} />
      <textarea name="bio" value={formData.bio} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditProfileForm;