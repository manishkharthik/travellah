import { useState, useEffect } from 'react';

export default function NewExpense({ person, onAdd, onClose }) {
    {/* This component is used to add a new expense. It takes in the following props: */}
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        paidBy: '',
        status: '',
    });

    {/* Initialise with empty values */}
    useEffect(() => {
        setFormData(f => ({ ...f, paidBy: '' }));
      }, [person]);

    {/* This function handles the change event for the input fields */}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
    {/* This function handles the submit event for the form */}
    const handleSubmit = (e) => {
        e.preventDefault();
        // Make sure cost is a number
        onAdd({
            ...formData,
            cost: parseFloat(formData.cost), // Convert cost to number
        });
        setFormData({ name: '', cost: '', paidBy: '', status: '' });
        onClose(); // hide form
    };

    {/* Form design and logic */}
    return (
        <form onSubmit={handleSubmit} style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
        }}>
          <input name="name" placeholder="Expenditure" value={formData.name} onChange={handleChange} required />
          <input name="cost" placeholder="Cost" type="number" value={formData.cost} onChange={handleChange} required />
          <select name="paidBy" value={formData.paidBy} onChange={handleChange} required>
            <option value="">Paid by</option>
            <option value="You">You</option>
            <option value={person.name}>{person.name}</option>
          </select>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="Settled">Settled</option>
            <option value="Unsettled">Unsettled</option>
          </select>
          <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{
            padding: '0.6rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}>
            Submit
          </button>
          <button type="button" onClick={onClose} style={{
            padding: '0.6rem',
            backgroundColor: '#f87171',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
          </div>
        </form>
    );
}