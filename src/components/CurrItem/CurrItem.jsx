import style from "./CurrItem.module.scss";
import PropTypes from 'prop-types';

function CurrItem({ currList }) {
  const [currItem, historyItem] = currList;
  if (currItem[1] === 111) {
    return <p className={style.error} key={currItem[1]}>{currItem[0]}</p>
  }
  return currItem.map((i, index) => {
    const { Value: value, Previous: prev, Nominal: nominal } = i;

    const currColor = value < prev ? "red" : value === prev ? "gray" : "green";

    const convertCurrentPrice = (value) => {
      return (value / nominal).toFixed(2);
    };

    const result = () => {
      return (((value / nominal - prev / nominal) / (prev / nominal)) * 100).toFixed(2);
    };

    const toggleHistory = (e) => {
      e.target.querySelector("ul").classList.toggle(style.history);
    };

    return (
      <li
        className={style.item}
        key={i.ID}
        style={{ border: `4px solid ${currColor}`, backgroundColor: currColor === "red" ? "#fee4e6" : "#d6fccf" }}
        tabIndex={index + 1}
        onClick={toggleHistory}
        title="Нажмите для показа истории курса"
      >
        <p>{i.CharCode}</p>
        <p className={style.tooltip}>{i.Name}</p>
        <p>
          Текущая стоимость: <br />
          <span className={style.current}>{convertCurrentPrice(value)}</span> RUB
        </p>
        <p>
          Прошлая стоимость: <br />
          <span className={style.previous}>{convertCurrentPrice(prev)}</span> RUB
        </p>
        <p style={{ color: currColor }}>
          <span className={style.result}>Итог: {result()} %</span>
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
      return new Error("Incorrect props in CurrItem")
    }
  })
}

export default CurrItem;
