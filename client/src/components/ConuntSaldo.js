import React from 'react';
import css from './css/Count.module.css';
import { formatMoney } from './FormaValue';

export default function ConuntSaldo({ grades }) {
  let counterLacamentos = 0;
  let saldo = 0;
  let dispesas = 0;
  let receita = 0;
  let gradeStyle = '';

  const counter = grades.forEach(({ type, value }) => {
    counterLacamentos++;
    if (type === '+') {
      saldo = saldo + value;
      receita = receita + value;
    } else {
      dispesas = dispesas + value;
      saldo = saldo - value;
    }

    gradeStyle = saldo >= 0 ? css.goodGrade : css.badGrade;
  });

  return (
    <div className={css.modalBody}>
      {grades.length > 0 && counter}
      <hr />
      <div className="row">
        <div className="col s3">
          <b>Laçamentos: </b> {counterLacamentos}
        </div>
        <div className="col s3">
          <b> Receita: </b>
          <span className={css.goodGrade}>{formatMoney(receita)} </span>{' '}
        </div>
        <div className="col s3">
          <b> Dispesas: </b>{' '}
          <span className={css.badGrade}>{formatMoney(dispesas)} </span>{' '}
        </div>
        <div className="col s3">
          <b> Saldo: </b>{' '}
          <span className={gradeStyle}>{formatMoney(saldo)} </span>{' '}
        </div>
      </div>
      <br />
    </div>
  );
}
