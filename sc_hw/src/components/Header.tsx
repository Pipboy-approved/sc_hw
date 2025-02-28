import React from 'react';

const Header: React.FC<{ year: number; quarter: number; onNext: () => void; onPrev: () => void; }> = ({ year, quarter, onNext, onPrev }) => {
  return (
    <div>
      <h1>{`Year: ${year}, Quarter: ${quarter}`}</h1>
      <button onClick={onPrev}>&lt;&lt;</button>
      <button onClick={onNext}>&gt;&gt;</button>
      {/* Jah ma tean et suurem kui ja väiksem kui kasutus pole seksikas, aga noh ... neelame alla ja läheme eluga edasi*/}
    </div>
  );
};

export default Header; 