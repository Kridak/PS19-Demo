import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Link } from 'react-router-dom';

const FieldExtraction = () => {
  const [field, setField] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [extractedValue, setExtractedValue] = useState('');
  const [formData, setFormData] = useState({
    extractedField: ''
  });

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImage(URL.createObjectURL(selectedFile));
    setExtractedValue('');
    setFormData({ extractedField: '' });
  };

  const extractField = async () => {
    if (file && field) {
      try {
        const { data } = await Tesseract.recognize(image, 'eng');
        const extractedText = data.text;

        const regex = new RegExp(`${field}:\\s*(.+)`, 'i');
        const match = extractedText.match(regex);
        const value = match ? match[1].trim() : 'Field not found';
        setExtractedValue(value);
        setFormData({ extractedField: value });
      } catch (error) {
        console.error('Error extracting field:', error);
      }
    }
  };

  return (
    <div>
      <h2>Field Extractor</h2>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {image && <img src={image} alt="Uploaded" style={{ maxWidth: '400px' }} />}
      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="field" style={{ marginRight: '0.5rem' }}>Field:</label>
        <input
          type="text"
          id="field"
          value={field}
          onChange={(e) => setField(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={extractField} disabled={!file || !field} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: '#007bff', color: '#fff' }}  type="submit">
          Extract Field
        </button>
      </div>
      {extractedValue && (
        <form style={{ marginTop: '2rem' }}>
          <div style={{ margin: '1rem 0' }}>
            <label htmlFor="extractedField" style={{ marginRight: '0.5rem' }}>Extracted Field:</label>
            <input
              type="text"
              id="extractedField"
              value={formData.extractedField}
              readOnly
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        </form>
      )}

<div style={{ marginTop: '1rem' }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#007bff',
            fontSize: '14px'
          }}
        >
          Click here for Previous Page
        </Link>
      </div>
    </div>

    
  );
};

export default FieldExtraction;
