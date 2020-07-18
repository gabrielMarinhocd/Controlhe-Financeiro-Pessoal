import React, { useState } from 'react';
import Modal from 'react-modal';
import css from './css/Modal.module.css';
import InputType from './InputType';

Modal.setAppElement('#root');
export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const {
    _id: id,
    description,
    value,
    category,
    yearMonthDay,
    type,
  } = selectedGrade;

  const [descriptionValue, setDescriptionValue] = useState(
    description !== undefined ? description : ''
  );
  const [gradeValue, setGradeValue] = useState(value !== undefined ? value : 0);
  const [categoryValue, setCategoryValue] = useState(
    category !== undefined ? category : ''
  );
  const [yearMonthDayValue, setYearMonthDayValue] = useState(yearMonthDay);
  const [dateString, setDateString] = useState(yearMonthDay);
  const [typeValue, setTypeValue] = useState(type !== undefined ? type : '');
  let handleDate = null;

  const handleDescription = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleValue = (event) => {
    setGradeValue(+event.target.value);
  };

  const handleCategory = (event) => {
    setCategoryValue(event.target.value);
  };

  const handleYearMonthDay = (event) => {
    setDateString(event.target.value);
    toDate(event.target.value);
  };

  const toDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');

    let newDate = new Date(year, month, day);
    handleDate = newDate;

    setYearMonthDayValue(newDate);
  };

  const handleType = (value) => {
    setTypeValue(value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (typeof yearMonthDayValue === 'string') {
      toDate(yearMonthDayValue);

      let month = handleDate.getMonth();
      if (month < 10) {
        month = '0' + month;
      }
      const formData = {
        id: id,
        description: descriptionValue,
        value: parseFloat(gradeValue),
        category: categoryValue,
        year: handleDate.getFullYear(),
        month: handleDate.getMonth(),
        day: handleDate.getDate(),
        yearMonth: `${handleDate.getFullYear()}-${month}`,
        yearMonthDay: dateString,
        type: typeValue,
      };
      console.log(formData);
      onSave(formData);
    } else {
      let month = yearMonthDayValue.getMonth();
      if (month < 10) {
        month = '0' + month;
      }

      const formData = {
        description: descriptionValue,
        value: parseFloat(gradeValue),
        category: categoryValue,
        year: yearMonthDayValue.getFullYear(),
        month: yearMonthDayValue.getMonth(),
        day: yearMonthDayValue.getDate(),
        yearMonth: `${yearMonthDayValue.getFullYear()}-${month}`,
        yearMonthDay: dateString,
        type: typeValue,
      };
      onSave(formData);
    }
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const title = () => {
    if (id !== undefined) {
      return 'Alterar Lançamento ';
    } else {
      return 'Cadastrar Lançamento ';
    }
  };

  return (
    <div>
      <Modal isOpen={true} style={customStyles}>
        <div style={styles.flexRow}>
          <span style={styles.title}>{title()} </span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleModalClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className={css.modalBody}>
          <InputType type={type} handleType={handleType} />

          <div className="input-field  col s6">
            <input
              id="description"
              type="text"
              value={descriptionValue}
              onChange={handleDescription}
            />
            <label className="active" htmlFor="inputName">
              Descrição:
            </label>
          </div>

          <div className="input-field col s6 ">
            <input
              id="category"
              type="text"
              value={categoryValue}
              onChange={handleCategory}
            />
            <label className="active" htmlFor="inputSubject">
              Categoria:
            </label>
          </div>

          <div className="input-field col s6">
            <input id="value" type="text" onChange={handleValue} />

            <label className="active" htmlFor="inputType">
              Valor:
            </label>
          </div>

          <div className="input-field col s6">
            <input
              id="inputGrade"
              type="date"
              value={dateString}
              onChange={handleYearMonthDay}
            />
          </div>

          <div style={styles.flexRow}>
            <button className="waves-effect waves-light btn">Salvar</button>
            <span style={styles.errorMessage}></span>
          </div>
        </form>
      </Modal>
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
