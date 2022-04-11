import style from "./CurrItem.module.scss";
import PropTypes from "prop-types";

function convertCurrentPrice(value, nom, toFixed) {
  return (value / nom).toFixed(toFixed);
}

function result(val, nom, prev, toFixed) {
  return (((val / nom - prev / nom) / (prev / nom)) * 100).toFixed(toFixed);
}

function toggleHistory(e, style) {
  e.target.querySelector("ul").classList.toggle(style.history);
}

function CurrItem({ currList }) {
  const [currItem, historyItem] = currList;

  function checkErr(currItem) {
    return (
      <p className={style.error} key={currItem[1]}>
        {currItem[0]}
      </p>
    );
  }

  function checkEmpty(currItem) {
    return <p className={style.error}>Нет результатов</p>;
  }

  // Check error with ID - 111
  if (currItem[1] === 111) {
    checkErr(currItem);
  }

  // Check empty data
  if (currItem.length === 0) {
    checkEmpty(currItem);
  }

  return currItem.map((i, index) => {
    const { Value: value, Previous: prev, Nominal: nominal } = i;

    const currColor = value < prev ? "red" : value === prev ? "gray" : "green";

    return (
      <li
        className={style.item}
        key={i.ID}
        style={{ border: `4px solid ${currColor}`, backgroundColor: currColor === "red" ? "#fee4e6" : "#d6fccf" }}
        tabIndex={index + 1}
        onClick={(e) => {
          toggleHistory(e, style);
        }}
        title="Нажмите для показа истории курса"
      >
        <p>{i.CharCode}</p>
        <p className={style.tooltip}>{i.Name}</p>
        <p>
          Текущая стоимость: <br />
          <span className={style.current}>{convertCurrentPrice(value, nominal, 2)}</span> RUB
        </p>
        <p>
          Прошлая стоимость: <br />
          <span className={style.previous}>{convertCurrentPrice(prev, nominal, 2)}</span> RUB
        </p>
        <p style={{ color: currColor }}>
          <span className={style.result}>Итог: {result(value, nominal, prev, 2)} %</span>
        </p>
        <ul style={{ display: "none" }}>
          {historyItem.map((j) => {
            return (
              <li key={i.ID + Math.random()}>
                {j.Date.replace(/T.*/, "")} Курс:{" "}
                {(j.Valute[i.CharCode].Value / j.Valute[i.CharCode].Nominal).toFixed(2)}
              </li>
            );
          })}
        </ul>
      </li>
    );
  });
}

CurrItem.propTypes = {
  currList: PropTypes.arrayOf((i) => {
    if (typeof i !== "object") {
      return new Error("Incorrect props in CurrItem");
    }
  })
};

export default CurrItem;
