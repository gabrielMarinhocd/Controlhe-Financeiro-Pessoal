import React from 'react';

export default function CreateGrade({ grades, onPersist, id, filter }) {
  const handleActionClick = () => {
    const grade = grades.findIndex((grade) => grade.id === id);

    onPersist(grade);
  };

  const handleFilter = async (event) => {
    filter(event.target.value);
  };

  return (
    <div>
      <div>
        <form action="#">
          <div className="file-field input-field">
            <input
              className="waves-effect waves-light  btn"
              type="button"
              onClick={handleActionClick}
              value="+ Novo Lançamento"
            />

            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Filtro"
                onChange={handleFilter}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
