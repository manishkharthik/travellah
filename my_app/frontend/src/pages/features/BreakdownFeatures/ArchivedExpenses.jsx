export default function ArchivedExpenses({ archivedExpenses, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '1rem',
    }}>
      <div style={{
        background: '#f3f4f6',
        borderRadius: '1rem',
        padding: '2rem',
        width: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        textAlign: 'left',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: '#0d9488' }}>
          Archived Expenses
        </h3>
        {archivedExpenses.length === 0 ? (
          <p>No archived expenses.</p>
        ) : (
          archivedExpenses.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#333' }}>
              <span>{exp.name} : ${exp.cost} by {exp.paidBy}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

