import React, { useState } from "react";
import "./Journal.css";

interface JournalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Journal: React.FC<JournalProps> = ({ isOpen, onClose }) => {
  const [journalNote, setJournalNote] = useState("");

  const handleJournalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJournalNote(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="journal-modal">
      <div className="journal-content">
        <textarea
          className="journal-textarea"
          value={journalNote}
          onChange={handleJournalChange}
          placeholder="Write your notes here..."
        />
        <button className="close-journal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Journal;