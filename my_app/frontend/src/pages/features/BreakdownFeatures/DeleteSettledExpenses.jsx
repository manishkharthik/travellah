export default function DeleteSettledExpensesButton({ disabled, onClick }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          padding: '1rem 2rem',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1.2rem',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        Delete all settled expenses
      </button>
    );
  }
  