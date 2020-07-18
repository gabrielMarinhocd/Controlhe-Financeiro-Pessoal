import React from 'react';
import css from './css/Modal.module.css';
export default function InputType({ handleType, type }) {
  const handleInput = (event) => {
    handleType(event.target.value);
  };

  return (
    <div>
      {type === '-' && (
        <div>
          <label className={css.space}>
            <input
              name="type"
              type="radio"
              value={type}
              onChange={handleType}
              disabled={true}
              checked={true}
            />
            <span>Despesa</span>
          </label>

          <label className={css.space}>
            <input
              name="type"
              type="radio"
              value={type}
              onChange={handleType}
              disabled={true}
            />
            <span>Receita</span>
          </label>
        </div>
      )}

      {type === '+' && (
        <div>
          <label className={css.space}>
            <input
              name="type"
              type="radio"
              value={type}
              onChange={handleType}
              disabled={true}
            />
            <span>Despesa</span>
          </label>

          <label className={css.space}>
            <input
              name="type"
              type="radio"
              value={type}
              onChange={handleType}
              disabled={true}
              checked={true}
            />
            <span>Receita</span>
          </label>
        </div>
      )}

      {type === undefined && (
        <div>
          <label className={css.space}>
            <input name="type" type="radio" value="-" onChange={handleInput} />
            <span className={css.badGrade}>Despesa </span>
          </label>

          <label className={css.space}>
            <input name="type" type="radio" value="+" onChange={handleInput} />
            <span className={css.goodGrade}>Receita </span>
          </label>
        </div>
      )}
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    padding: '10px',
  },

  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
  },
  label: {
    alignItems: 'center',
  },
};
