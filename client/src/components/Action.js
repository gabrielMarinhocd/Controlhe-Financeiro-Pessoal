import React from 'react';

export default function Action({ id, type, onActionClick }) {
  const handleIconClick = async () => {
    await onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: 'pointer' }}
    >
      {type}
    </span>
  );
}
