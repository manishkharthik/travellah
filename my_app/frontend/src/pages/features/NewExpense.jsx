import { useState, useEffect } from 'react';
import { card, input, primaryBtn } from './uiStyles';

export default function NewExpense({ person, onAdd, onEdit, onClose, isEditing = false, initialData = {} }) {
    {/* This component is used to add a new expense. It takes in the following props: */}
    const [formData, setFormData] = useState({
      name: initialData.name || '',
      cost: initialData.cost || '',
      paidBy: initialData.paidBy || 'Paid by',
      status: initialData.status || 'Select status',
    });

    {/* Initialise with empty values */}
    useEffect(() => {
      if (!isEditing) {
        setFormData(f => ({ ...f,}));
      }
    }, [person, isEditing]);

    {/* This function handles the change event for the input fields */}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
    {/* This function handles the submit event for the form */}
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
          onEdit({ ...formData, id: initialData.id });
        } else {
          onAdd(formData);
        }
        onClose();
    };

    {/* Form design and logic */}
    return (
        <form style={card} onSubmit={handleSubmit}>
          <input style={input} name="name" placeholder="Expenditure" value={formData.name} onChange={handleChange} required />
          <input style={input} name="cost" placeholder="Cost" type="number" value={formData.cost} onChange={handleChange} required />
          <select style={input} name="paidBy" value={formData.paidBy} onChange={handleChange} required>
            <option value="">Paid by</option>
            <option value="You">You</option>
            <option value={person.name}>{person.name}</option>
          </select>
          <select style={input} name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="Settled">Settled</option>
            <option value="Unsettled">Unsettled</option>
          </select>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              style={{ ...primaryBtn, backgroundColor: '#10b981', color: '#fff' }}
            >
              {isEditing ? 'Update' : 'Submit'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ ...primaryBtn, backgroundColor: '#f87171', color: '#fff'}}
            >
              Cancel
            </button>
          </div>
        </form>
    );
}