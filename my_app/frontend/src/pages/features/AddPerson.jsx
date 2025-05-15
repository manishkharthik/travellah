import { useState } from 'react';

export default function AddPerson({ onAdd }) {
    const [name, setName] = useState('');

    {/* Function to handle form submission */}
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        if (name.length > 20) {
            alert('Name is too long. Please enter a name with 20 characters or less.');
        } else if (name.length < 3) {
            alert('Name is too short. Please enter a name with at least 3 characters.');
        } else {
            onAdd(name.trim());
            setName('');
        }
    };

    {/* Form specification */}
    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    width: '80%',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#350a61',
                    outline: 'none',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                }}
            />
            {/* Submit button */}
            <button
                type="submit"
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    backgroundColor: '#818cf8',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#6366f1')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#818cf8')}
            >
                Add Person
            </button>
            {/* Specification message */}
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Name should be between 3 and 20 characters.
            </p>
        </form>
    )
}
