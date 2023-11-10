// ImageUpload.js
import React from 'react';
import './ImageUpload.css';

function ImageUpload({ onUpload }) {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="ImageUpload">
      <h1 className="Title">Instagram Caption Generator</h1>
      <label htmlFor="image-upload" className="ImageUploadButton">
        <span>Upload Image</span>
        <input id="image-upload" type="file" accept="image/*" onChange={handleFileInput} />
      </label>
    </div>
  );
}

export default ImageUpload;
