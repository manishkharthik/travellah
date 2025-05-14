import { useState } from 'react';
import NewExpense from './NewExpense';

export default function Breakdown({ person, expenses, setExpenses }) {
    const [showForm, setShowForm] = useState(false);

    const handleAddExpense = (expense) => {
        setExpenses([...expenses, expense]); // works for individual person
    };
    
    if (!person) return null;

    // Calculate total unsettled amount
    const totalOwed = expenses.reduce((acc, exp) => {
        if (exp.status === 'Unsettled') {
            // If the expense is unsettled, add or subtract the cost
            return acc + (exp.paidBy === 'You' ? parseFloat(exp.cost) : -parseFloat(exp.cost));
        }
        return acc;
    }, 0); // Default to 0 if no unsettled expenses

    return (
        <div style={{
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          background: 'linear-gradient(to top right, #e0f7fa, #fef9c3)',
          borderRadius: '1rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
          height: '100%',
        }}>
          {/* Title with Expense button*/}
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0d9488' }}>
                Breakdown for {person.name}
            </h2>
            <button onClick={() => setShowForm(true)} style={{
                padding: '0.6rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
            }}>
                Add expense
            </button>
          </div>

          {/* Summary text */}
          <p style={{ fontSize: '1.2rem', maxWidth: '60%', lineHeight: 1.6, color: '#444' }}>
            Amount {totalOwed < 0 ? 'you owe them' : 'they owe you'}: 
            <strong style={{ color: totalOwed < 0 ? '#dc2626' : '#16a34a' }}>
              {' $' + Math.abs(totalOwed)}
            </strong>
          </p>

          {/* Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
            gap: '1rem',
            fontWeight: '600',
            fontSize: '1.1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#e0e7ff',
            color: '#1e3a8a',
            borderRadius: '8px',
            width: '100%',
            marginBottom: '1rem',
        }}>
            <div>Expenditure</div>
            <div>Cost</div>
            <div>Paid by</div>
            <div>Status</div>
          </div>

          {/* Expenses */}
          {expenses.map((exp, idx) => (
            <div key={idx} style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1.5fr 1fr',
              gap: '1rem',
              fontSize: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
              width: '100%',
              color: '#333',
              marginBottom: '0.5rem',
            }}>
              <div>{exp.name}</div>
              <div>${exp.cost}</div>
              <div>{exp.paidBy}</div>
              <div style={{ color: exp.status === 'Settled' ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                {exp.status}
              </div>
            </div>
          ))}

          {showForm && (
            <NewExpense
              person={person}
              onAdd={handleAddExpense}
              onClose={() => setShowForm(false)}
            />
          )}
        </div> 
    );
}