import axios from 'axios';

const API_URL =
  'https://gabriel-control-financeiro.herokuapp.com/api/transaction?period=';
const API_URL_Trasaction =
  'https://gabriel-control-financeiro.herokuapp.com/api/transaction';
async function getAllGrades(yearMonth) {
  const res = await axios.get(API_URL + yearMonth);

  const grades = res.data.map((grade) => {
    const {
      _id,
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    } = grade;

    return {
      ...grade,
      _id: _id,
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    };
  });

  return grades;
}

async function insertGrade(grade) {
  const response = await axios.post(API_URL_Trasaction, grade);
  console.log(response.data);
  return response.data;
}

async function updateGrade(grade) {
  const response = await axios.patch(
    `${API_URL_Trasaction}?id=${grade.id}`,
    grade
  );
  return response.data;
}

async function deleteGrade(grade) {
  const response = await axios.delete(`${API_URL_Trasaction}?id=${grade._id}`);
  return response.data;
}

export { getAllGrades, insertGrade, updateGrade, deleteGrade };
