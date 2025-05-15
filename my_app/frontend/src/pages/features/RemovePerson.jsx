import { useState } from 'react';

export default function RemovePerson({ people, deleteMode, toggleDeleteMode, selectedToDelete, setSelectedToDelete, onConfirmDelete }) {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
          <button
            onClick={toggleDeleteMode}
            style={{
                padding: '0.5rem 1rem',
                backgroundColor: deleteMode ? '#dc2626' : '#f87171',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = deleteMode ? '#b91c1c' : '#ef4444')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = deleteMode ? '#dc2626' : '#f87171')
              }
          >
            {deleteMode ? 'Cancel Delete' : 'Delete People'}
          </button>
          {deleteMode && selectedToDelete.size > 0 && (
          <button
            onClick={onConfirmDelete}
            style={{
            padding: '0.6rem 1rem',
            backgroundColor: '#b91c1c',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            height: '40px',
          }}
        >
            Confirm Delete ({selectedToDelete.size})
          </button>
        )}
    </div>
  );
}