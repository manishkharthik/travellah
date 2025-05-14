import { useState } from 'react';

export default function People({ expenses, onSelectPerson }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
  
    const people = ['Alice', 'Bob', 'Char', 'Dino'];

    const calculateAmountOwed = (personName) => {
      const personExpenses = expenses[personName] || [];

      return personExpenses.reduce((total, exp) => {
        if (exp.status !== 'Unsettled') return total;
        if (exp.paidBy === personName) {
          return total - Number(exp.cost);
        } else if (exp.paidBy === 'You') {
          return total + Number(exp.cost);
        }
        return total;
      }, 0);
    };

    const peopleWithAmounts = people.map((name) => ({
      name,
      amountOwed: calculateAmountOwed(name)
    }));
  

    const handleClick = (index) => {
      const alreadySelected = selectedIndex === index;
      setSelectedIndex(alreadySelected ? null : index);
      onSelectPerson(alreadySelected ? null : peopleWithAmounts[index]);
    };

    return (
      <div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '600', color: '#350a61', marginBottom: '1.5rem' }}>People</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: '400', color: '#350a61', marginBottom: '3rem' }}> Check who owes you, and how much </p>
        <div>
          {peopleWithAmounts.map((person, index) => (
            <div key={index} style={{ marginBottom: '3rem' }}>
              <button
                onClick={() => handleClick(index)}
                style={{ 
                  width: '100%',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: 'linear-gradient(to right, #dbeafe, #f0f9ff)',
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: '500',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                  color: '#350a61',
                  transition: 'transform 0.1s ease',
                  outline: selectedIndex === index ? '3px solid #818cf8' : 'none'
                }}>
                <p>{person.name}</p>
                <p style={{ 
                  marginTop: '0.5rem', 
                  fontSize: '1.5rem', 
                  fontWeight: '600',
                  color: person.amountOwed < 0 ? '#dc2626' : '#16a34a' 
                  }}>
                    {person.amountOwed < 0
                    ? `You owe: $${Math.abs(person.amountOwed)}` 
                    : `Owes you: $${person.amountOwed}`}
                </p>
              </button>
                {index < people.length - 1 && (
                    <hr style={{ marginTop: '2rem', border: 'none', height: '1px', backgroundColor: '#ddd' }} />
                )}
            </div>
          ))}
        </div>
      </div>
    );
}
  