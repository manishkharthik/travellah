import { useState } from 'react';
import {card, primaryBtn} from './uiStyles';

export default function SortExpenses({ current, onApply, onClose }) {
    const [choice, setChoice] = useState(current);

    return (
        <form style={card} onSubmit={e => { e.preventDefault(); onApply(choice); }}>
            <select
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
                style={{ 
                    padding: '0.75rem', 
                    borderRadius: '0.5rem', 
                    border: '1px solid #ccc', 
                    width: '100%', 
                    marginBottom: '1rem' 
                }}
            >
                <option value=''>Original order</option> 
                <option value='name'>Sort by name (A‑Z)</option>
                <option value='cost'>Sort by price (high → low)</option>
                <option value='payer'>Sort by who paid (You/Person)</option>
                <option value='status'>Sort by status (Unsettled first)</option>
            </select>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'flex-end', marginTop:'1rem' }}>
                <button type='submit' style={{ ...primaryBtn, background:'#10b981', color:'#fff' }}>
                    Apply
                </button>
                <button type='button' onClick={onClose} style={{ ...primaryBtn, background:'#f87171', color:'#fff' }}>
                    Cancel
                </button>
            </div>
        </form>
    );
}
  