import { useState } from 'react';
import NewExpense from './NewExpense';
import ResolveExpenses from './ResolveExpenses';
import SettleAllExpenses from './SettleAllExpenses';
import DeleteSettledExpenses from './DeleteSettledExpenses';
import SortExpenses from './SortExpenses';
import ArchivedExpenses from './ArchivedExpenses';

export default function Breakdown({ person, expenses, setExpenses }) {
    const [showForm, setShowForm] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [archivedExpenses, setArchivedExpenses] = useState([]);
    const [selectedExpenseIndex, setSelectedExpenseIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [history, setHistory] = useState([]);
    const [originalOrder, setOriginalOrder] = useState(null);
    const [redoStack, setRedoStack] = useState([]);

    {/* Function to handle adding a new expense */}
    const handleAddExpense = (expense) => {
      setHistory(prev => [...prev, { expenses: [...expenses], archivedExpenses: [...archivedExpenses] }]);
      setExpenses([...expenses, expense]);
      setSortBy('');
      setRedoStack([]);
    };

    {/* Function to handle editing an existing expense */}
    const handleEditExpense = () => {
        if (selectedExpenseIndex !== null) {
            setIsEditing(true);
            setShowForm(true);
        }
    };

    {/* Function to handle sorting expenses */}
    const sortedExpenses = [...expenses].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'cost':
          return parseFloat(b.cost) - parseFloat(a.cost);
        case 'payer':
          return b.paidBy.localeCompare(a.paidBy);
        case 'status':
          return a.status === 'Unsettled' ? -1 : 1;
        default:
          return 0;
      }
    });

    {/* check if any expenses are settled or unsetlled */}
    const hasSettled = expenses.some(e => e.status === 'Settled');
    const hasUnsettled = expenses.some(e => e.status === 'Unsettled');
    
    if (!person) return null;

    {/* Calculate total owed */}
    const totalOwed = expenses.reduce((acc, exp) => {
        if (exp.status === 'Unsettled') {
            // If the expense is unsettled, add or subtract the cost
            return acc + (exp.paidBy === 'You' ? parseFloat(exp.cost) : -parseFloat(exp.cost));
        }
        return acc;
    }, 0); 

    return (
        <div style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          background: 'linear-gradient(to top right, #e0f7fa, #fef9c3)',
          borderRadius: '1rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
          height: '100%',
        }}>
          {/* Title with Expense buttons (add, sort, edit, undo, redo) */}
          <div 
          style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '2.3rem',
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem', color: '#0d9488' }}>
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
            <button onClick={() => setShowSort(true)} disabled={expenses.length == 0} style={{
              padding:'0.6rem 1rem',
              background:'#6366f1',
              color:'#fff', border:'none',
              borderRadius:'0.5rem', fontSize:'1rem',
              cursor: expenses.length == 0 ? 'not-allowed' : 'pointer',
              opacity: expenses.length == 0 ? 0.6 : 1
              }}
            >
              Sort expenses
            </button>
            <button onClick={handleEditExpense} disabled={selectedExpenseIndex == null}
              style={{
                padding: '0.6rem 1rem',
                backgroundColor: '#facc15',
                color: '#000',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: selectedExpenseIndex == null ? 'not-allowed' : 'pointer',
                opacity: selectedExpenseIndex == null ? 0.6 : 1
              }}
            >
              Edit expense
            </button>
            <button onClick={() => {
              if (history.length === 0) {
                if (originalOrder) {
                  setRedoStack(prev => [...prev, {
                    expenses: expenses.map(e => ({ ...e })),
                    archivedExpenses: archivedExpenses.map(e => ({ ...e })),
                    sortBy
                  }]);
                  setExpenses(originalOrder.map(e => ({ ...e })));
                  setOriginalOrder(null);
                }
                return;
              }
              const lastState = history[history.length - 1];
              setRedoStack(prev => [...prev, {
                expenses: expenses.map(e => ({ ...e })),
                archivedExpenses: archivedExpenses.map(e => ({ ...e })),
                sortBy
              }]);
              setExpenses(lastState.expenses);
              setArchivedExpenses(lastState.archivedExpenses);
              setHistory(prev => prev.slice(0, -1));
              setSelectedExpenseIndex(null);
              setSortBy(lastState.sortBy);
            }}
              disabled={history.length === 0 && !originalOrder}
              style={{
                padding: '0.6rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: history.length === 0 ? 'not-allowed' : 'pointer',
                opacity: history.length === 0 ? 0.6 : 1
              }}
            >
              Undo
            </button>
            <button
              onClick={() => {
                if (redoStack.length === 0) return;
                const redoState = redoStack[redoStack.length - 1];
                setHistory(prev => [...prev, {
                  expenses: expenses.map(e => ({ ...e })),
                  archivedExpenses: archivedExpenses.map(e => ({ ...e })),
                  sortBy
                }]);
                setExpenses(redoState.expenses.map(e => ({ ...e })));
                setArchivedExpenses(redoState.archivedExpenses.map(e => ({ ...e })));
                setSortBy(redoState.sortBy);
                setRedoStack(prev => prev.slice(0, -1));
                setSelectedExpenseIndex(null);
              }}
              disabled={redoStack.length === 0}
              style={{
                padding: '0.6rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: redoStack.length === 0 ? 'not-allowed' : 'pointer',
                opacity: redoStack.length === 0 ? 0.6 : 1
              }}
            >
              Redo
            </button>
          </div>

          {/* Summary text */}
          <p style={{ fontSize: '1.2rem', maxWidth: '60%', lineHeight: 1.6, color: '#444' }}>
            {totalOwed == 0 ? 'All payments are settled!' : totalOwed < 0 ? 'Amount you owe them' : 'Amount they owe you'}: 
            <strong style={{ color: totalOwed == 0 ? '#6b7280' : totalOwed < 0 ? '#dc2626' : '#16a34a' }}>
              {' $' + Math.abs(totalOwed)}
            </strong>
          </p>

          {/* Expense Headers */}
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
            width: '96%',
            marginBottom: '1rem',
        }}>
            <div>Expenditure</div>
            <div>Cost</div>
            <div>Paid by</div>
            <div>Status</div>
          </div>

          {/* Expenses list*/}
          {sortedExpenses.map((exp, idx) => {
            const isUnsettled = exp.status === 'Unsettled';
            return (
              <button
                key={idx}
                onClick={() => setSelectedExpenseIndex(idx)} 
                style={{
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
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  opacity: isUnsettled ? 1 : 0.6,
                }}
              >
                <div>{exp.name}</div>
                <div>${exp.cost}</div>
                <div>{exp.paidBy}</div>
                <div style={{ color: exp.status === 'Settled' ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                  {exp.status}
                </div>
              </button>
            );
          })}

          {/* Popup form to create new expense */}
          {showForm && (
            <NewExpense
              person={person}
              onAdd={handleAddExpense}
              onEdit={(updatedExpense) => {
                setHistory(prev => [...prev, { expenses: [...expenses], archivedExpenses: [...archivedExpenses] }]);
                const updated = [...expenses];
                updated[selectedExpenseIndex] = updatedExpense;
                setExpenses(updated);
                setIsEditing(false);
                setShowForm(false);
                setSelectedExpenseIndex(null);
              }}
              onClose={() => {
                setShowForm(false);
                setIsEditing(false);
                setSelectedExpenseIndex(null);
              }}
              isEditing={isEditing}
              initialData={expenses[selectedExpenseIndex]}
            />
          )}

          {/* Popup form to sort expenses */}
          {showSort && (
            <SortExpenses
              current={sortBy}
              onApply={(choice) => {
                if (!originalOrder) {
                  setOriginalOrder(expenses.map(e => ({ ...e })));
                }
                setHistory(prev => [...prev, {
                  expenses: expenses.map(e => ({ ...e })),
                  archivedExpenses: archivedExpenses.map(e => ({ ...e })),
                  sortBy,
                }]);
                const sorted = [...expenses].sort((a, b) => {
                  if (choice === 'name') return a.name.localeCompare(b.name);
                  if (choice === 'cost') return b.cost - a.cost;
                  return 0;
                });
                setExpenses(sorted);
                setSortBy(choice);
                setShowSort(false);
              }}
              onClose={() => setShowSort(false)}
            />
          )}

          {/* Popup to resolve expense */}
          <ResolveExpenses
            disabled={selectedExpenseIndex == null || expenses[selectedExpenseIndex].status === 'Settled'}
            onResolve={() => {
              setHistory(prev => [...prev, { 
                expenses: expenses.map(e => ({ ...e })), 
                archivedExpenses: archivedExpenses.map(e => ({ ...e }))
              }]);
              const updated = expenses.map(e => ({ ...e })); 
              updated[selectedExpenseIndex].status = 'Settled';
              setExpenses(updated);
              setSelectedExpenseIndex(null);
            }}
            onCancel={() => setSelectedExpenseIndex(null)}
          />

          {/* Instructions to resolve payment */}
          <p style={{
            fontSize: '1rem',
            maxWidth: '80%',
            lineHeight: 3,
            color: '#444',
            marginTop: '2rem',
          }}>
            If an expense is unsettled, you can resolve it by clicking on it.
            <br />
            To add a new expense, click the "Add expense" button.
            <br />
            To edit an existing expense, click on the expense, followed by the "Edit expense" button.
            <br />
            To delete all settled expenses, click the "Delete" button.
          </p>
          
          {/* Bottom buttons to settle all expenses and delete settled expenses */}
          <div
            style={{
              display: 'flex',
              gap: '10rem',
              marginTop: '2rem',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <SettleAllExpenses
              disabled={!hasUnsettled}
              onClick={() => {
                const msg = `Are you sure you want to settle all expenses?\n\n${
                  totalOwed < 0
                    ? `You owe them $${Math.abs(totalOwed)}`
                    : `They owe you $${Math.abs(totalOwed)}`
                }`;
                if (!window.confirm(msg)) return;
                setHistory(prev => [...prev, { expenses: [...expenses], archivedExpenses: [...archivedExpenses] }]);
                setExpenses(expenses.map(exp => ({ ...exp, status: 'Settled' })));
              }}
            />
            <DeleteSettledExpenses
              disabled={!hasSettled}
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all settled expenses?')) {
                  const settled = expenses.filter(exp => exp.status === 'Settled');
                  const remaining = expenses.filter(exp => exp.status !== 'Settled');
                  setHistory(prev => [...prev, { expenses: [...expenses], archivedExpenses: [...archivedExpenses] }]);
                  setArchivedExpenses(prev => [...prev, ...settled]);
                  setExpenses(remaining);
                }
              }}
            />
            {/* Button to view archived expenses */}
            <button
              onClick={() => setShowArchived(!showArchived)}
              disabled={archivedExpenses.length === 0}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#6b7280',   // archive button color
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1.2rem',
                cursor: archivedExpenses.length === 0 ? 'not-allowed' : 'pointer',
                opacity: archivedExpenses.length === 0 ? 0.6 : 1,
                marginLeft: '0.5rem',
              }}
            >
              View Archived Expenses
            </button>
          </div>
          {showArchived && (
              <ArchivedExpenses 
                archivedExpenses={archivedExpenses} 
                onClose={() => setShowArchived(false)}
              />
          )}  
        </div>
    );
}