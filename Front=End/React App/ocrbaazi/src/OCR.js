import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Link } from 'react-router-dom';

const OCR = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    billNo: ''
  });
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const recognizeText = async () => {
    if (file) {
      const { data } = await Tesseract.recognize(image, 'eng');
      const extractedText = data.text;

      const extractedName = extractFieldValue(extractedText, 'Name');
      const extractedDate = extractFieldValue(extractedText, 'Date');
      const extractedBillNo = extractFieldValue(extractedText, 'Bill No');

      setFormData({
        name: extractedName,
        date: extractedDate,
        billNo: extractedBillNo
      });

      setShowForm(true); // Show the form after recognizing text
    }
  };

  const extractFieldValue = (text, field) => {
    const regex = new RegExp(`${field}:\\s*(.+)`, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : 'Not found';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Code to handle form submission with formData
    // You can access the name, date, and billNo values from formData

    // Reset the form fields and formData
    setFile(null);
    setImage(null);
    setFormData({ name: '', date: '', billNo: '' });
    setShowForm(false); // Hide the form after submitting
  };

  return (
    <div>
      <h2>OCR App</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {image && <img src={image} alt="Uploaded" />}
      <button onClick={recognizeText} disabled={!image}>
        Recognize Text
      </button>

      {showForm && ( // Conditional rendering of the form
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '1rem 0' }}>
            <label style={{ marginRight: '0.5rem' }}>Name:</label>
            <input
              type="text"
              value={formData.name}
              readOnly
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          <div style={{ margin: '1rem 0' }}>
            <label style={{ marginRight: '0.5rem' }}>Date:</label>
            <input
              type="text"
              value={formData.date}
              readOnly
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          <div style={{ margin: '1rem 0' }}>
            <label style={{ marginRight: '0.5rem' }}>Bill No:</label>
            <input
              type="text"
              value={formData.billNo}
              readOnly
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        </form>
      )}

      <div style={{ marginTop: '1rem' }}>
        <Link
          to="/FieldExtraction"
          style={{
            textDecoration: 'none',
            color: '#007bff',
            fontSize: '14px'
          }}
        >
          Click here if you want to extract a specific Field
        </Link>
      </div>
    </div>
  );
};

export default OCR;
