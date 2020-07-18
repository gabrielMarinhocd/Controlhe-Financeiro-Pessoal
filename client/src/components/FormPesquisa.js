import React from 'react';

export default function FomPesquisa({
  yearMonth,
  actionYearMonth,
  onPersist,
  clearGrades,
}) {
  const handleInputChange = async (event) => {
    actionYearMonth(event.target.value);
    clearGrades([]);
    const data =
      'https://gabriel-control-financeiro.herokuapp.com/api/transaction?period=' +
      yearMonth;

    const res = await fetch(data);
    let dados = await res.json();
    onPersist(dados);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form>
        <input
          className="input-field "
          onChange={handleInputChange}
          type="month"
          key="MesAno"
          value={yearMonth}
        />
      </form>
    </div>
  );
}
