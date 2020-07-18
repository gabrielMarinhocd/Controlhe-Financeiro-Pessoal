import React, { useState, useEffect } from 'react';
import * as api from './api/ApiServices';
import Spinner from './components/Spinnner';
import GradesControl from './components/GradesControl';
import FormPesquisa from './components/FormPesquisa';
import ConuntSaldo from './components/ConuntSaldo';
import ModalGrade from './components/ModalGrade';
import CreateGrade from './components/CreateGrade';

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [yearMonth, setYearMonth] = useState('2020-07');
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades(yearMonth);
      setAllGrades(grades);
    };

    getGrades();
  }, [yearMonth]);

  const handleActionAllGrades = (data) => {
    setAllGrades(data);
  };

  const handleActionYearMonth = (data) => {
    setYearMonth(data);
  };

  const handleClearGrades = () => {
    setAllGrades([]);
  };

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await api.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade.id === gradeToDelete.id
      );

      const newGrades = Object.assign([], allGrades);
      newGrades.splice(deletedGradeIndex, 1);

      setAllGrades(newGrades);
    }
  };

  const handlePersist = (grades) => {
    setSelectedGrade(grades);

    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const { id } = formData;
    const newGrades = Object.assign([], allGrades);
    let gradeToPersist = null;

    if (id !== undefined) {
      gradeToPersist = newGrades.find(({ _id }) => _id === id);
      gradeToPersist = formData;
      const deletedGradeIndex = newGrades.findIndex(({ _id }) => _id === id);
      newGrades.splice(deletedGradeIndex, 1);
      const valueInsert = await api.updateGrade(gradeToPersist);
      newGrades.push(valueInsert);
    } else {
      gradeToPersist = formData;
      const valueInsert = await api.insertGrade(gradeToPersist);
      newGrades.push(valueInsert);
    }

    setAllGrades(newGrades);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (filter) => {
    const filterLowerCase = filter.toLowerCase();

    const filtereLaçamenteos = allGrades.filter(({ description }) => {
      const newDescription = description.toLowerCase();
      return newDescription.includes(filterLowerCase);
    });

    setAllGrades(filtereLaçamenteos);
  };

  return (
    <div className="container" style={styles.containerBody}>
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <h2> Bootcamp Full Stacks - Desafio Final</h2>
        <h4>Controlhe Financeiro Pessoal</h4>
      </div>
      <hr />
      {!isModalOpen && (
        <FormPesquisa
          yearMonth={yearMonth}
          onPersist={handleActionAllGrades}
          actionYearMonth={handleActionYearMonth}
          clearGrades={handleClearGrades}
        />
      )}
      <ConuntSaldo grades={allGrades} />
      {!isModalOpen && (
        <CreateGrade
          onPersist={handlePersist}
          grades={allGrades}
          filter={handleFilter}
        />
      )}

      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}

const styles = {
  containerBody: {
    backgroundColor: 'white',
    padding: '15px',
  },
};
