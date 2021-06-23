import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div
          className="nav-wrapper green darken-1"
          style={{ padding: '0 2rem' }}
        >
          <span className="brand-logo">Vaccine database acces</span>
        </div>
      </nav>
    </div>
  );
};