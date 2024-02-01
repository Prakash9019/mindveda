import React, { useState } from 'react';

const MentalHealthJournal = () => {
  const [entry, setEntry] = useState('');
  const [savedEntries, setSavedEntries] = useState([]);

  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  const saveEntry = () => {
    if (entry.trim() !== '') {
      setSavedEntries([...savedEntries, entry]);
      setEntry('');
    }
  };

  const deleteEntry = (index) => {
    const updatedEntries = [...savedEntries];
    updatedEntries.splice(index, 1);
    setSavedEntries(updatedEntries);
  };

  return (
    <div className="mental-health-journal">
      <h1>Tranquil Reflections</h1>
      <p>Welcome to your serene space for mindful journaling.</p>
      <div className="journal-entry">
        <textarea
          className="journal-entry-textarea"
          placeholder="Start typing your journal entry..."
          value={entry}
          onChange={handleChange}
        />
        <button className="save-button" onClick={saveEntry}>Save</button>
      </div>
      <div className="saved-entries">
        <h2>Saved Entries</h2>
        {savedEntries.map((entry, index) => (
          <div key={index} className="entry">
            <p>{entry}</p>
            <button className="delete-button" onClick={() => deleteEntry(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentalHealthJournal;