import React from 'react';
import Action from './Action';
import css from './css/GradesControl.module.css';
import { formatMoney } from './FormaValue';

export default function GradesControl({ grades, onDelete, onPersist }) {
  grades = grades.sort((a, b) => a.day - b.day);

  const handleActionClick = async (id, type) => {
    const grade = await grades.find((grade) => grade._id === id);

    if (type === 'delete') {
      await onDelete(grade);
      return;
    }

    await onPersist(grade);
  };

  return (
    <div>
      <ul key="ul">
        {grades.map(({ _id: id, description, value, category, day, type }) => {
          const gradeStyle = type !== '-' ? css.goodGrade : css.badGrade;
          return (
            <li key={`${id}`} className={`  ${gradeStyle} ${css.grade}`}>
              <div className="row">
                <div className={`col s2 ${css.centerEndFont} `}>{day} Dia</div>
                <div className="col s5">
                  {' '}
                  <p>
                    <span className={css.title}>
                      {' '}
                      <b>{category} </b>
                    </span>{' '}
                    <br />
                    <span>{description}</span>
                  </p>
                </div>
                <div className={`col s3 ${css.centerEndFont} `}>
                  {formatMoney(value)}
                </div>
                <div className={`col s2 ${css.centerEndFont} `}>
                  <Action
                    onActionClick={handleActionClick}
                    id={id}
                    type="edit"
                  />
                  <Action
                    onActionClick={handleActionClick}
                    id={id}
                    type="delete"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
