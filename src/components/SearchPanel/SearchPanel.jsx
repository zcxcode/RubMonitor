import { useDispatch } from "react-redux";
import style from "./SearchPanel.module.scss";

function SearchPanel(props) {
  const dispatch = useDispatch();

  const onInput = (e) => {
    if (e.target.value.length > 0) {
      dispatch({type: "FILTER_INPUT", content: e.target.value})
    } else {
      dispatch({type: "FILTER_INPUT", content: ""})
    }
  };

  return (
    <>
      <input className={style.input} type="text" placeholder="Enter curr (Example usd)" onChange={onInput} />
    </>
  );
}

export default SearchPanel;
