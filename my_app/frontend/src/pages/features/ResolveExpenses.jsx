export default function ResolveExpenses({ disabled, onResolve, onCancel,}) {
    if (disabled) return null;   

    return (
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={onResolve}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          Resolve Payment
        </button>
  
        <button
          onClick={onCancel}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#f87171',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    );
  }