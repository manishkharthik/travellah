import { useState } from 'react';
import People from '@/pages/features/PeopleFeatures/People';
import Details from '@/pages/features/OtherFeatures/Details';
import Breakdown from '@/pages/features/BreakdownFeatures/Breakdown';

export default function SmartCostSplitting() {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [expenses, setExpenses] = useState({});

    {/* Functions to handle adding people */}
    const handleAddPerson = (newPerson) => {
      setExpenses((prev) => {
        if (prev[newPerson]) return prev; // prevent duplicates
        return { ...prev, [newPerson]: [] };
      });
    };

    return (
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
        {/* Sidebar - People */}
        <div style={{ 
            width: '35%', 
            background: 'linear-gradient(to bottom right, #fdf6e3, #f1ece2)',
            padding: '2.5rem', 
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflowY: 'auto',
            boxShadow: '2px 0 10px rgba(0, 0, 0, 0.05)',
        }}>
          <People 
            expenses={expenses} 
            onSelectPerson={setSelectedPerson} 
            onAddPerson={handleAddPerson} 
          />
        </div>
        {/* Main Content - Details or Breakdown */}
        <div style={{ width: '65%', backgroundColor: '#fafafa', padding: '2rem' }}>
          {/* If a person is selected, show breakdown; otherwise, show general details */}
          {selectedPerson ? (
            <Breakdown 
              person={selectedPerson} 
              expenses={expenses[selectedPerson.name] || []} 
              setExpenses={(newList) => setExpenses(prev => ({
                ...prev,
                [selectedPerson.name]: newList
               }))} />
          ) : <Details />}
        </div>
      </div>
    );
}
