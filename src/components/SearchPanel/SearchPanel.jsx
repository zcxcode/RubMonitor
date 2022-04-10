import { useDispatch } from "react-redux";
import { filterInput } from "../../redux/currenciesReducer/currencies.actions";
import style from "./SearchPanel.module.scss";

function SearchPanel(props) {
  const dispatch = useDispatch();

  const onInput = (e) => {
    if (e.target.value.length > 0) {
      dispatch(filterInput(e.target.value))
    } else {
      dispatch(filterInput(""))
    }
  };

  return (
    <>
      <input className={style.input} type="text" placeholder="Enter curr (Example usd)" onChange={onInput} />
    </>
  );
}

export default SearchPanel;
