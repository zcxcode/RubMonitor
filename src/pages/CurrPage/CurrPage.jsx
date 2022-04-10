import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyCurr } from "../../services/requests/currency.request";
import { filterHandler } from "../../services/helpers/filterData.helper";
import { addCurrencies, addHistory, filterCurrency } from "../../redux/currenciesReducer/currencies.actions";
import style from "./CurrPage.module.scss";
import Spinner from "../../components/Spinner/Spinner";
import Header from "../../components/Header";
import CurrItem from "../../components/CurrItem";

function CurrBlock() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currReducer.currencies);
  const history = useSelector((state) => state.currReducer.history);
  const filterCurrencies = useSelector((state) => state.currReducer.filterCurrencies);
  const filterInput = useSelector((state) => state.currReducer.filterInput);

  async function refreshCurr() {
    const results = await historyCurr();
    const [result, resultHistory] = results;
    dispatch(addCurrencies(result));
    dispatch(addHistory(resultHistory));
  }

  useEffect(() => {
    refreshCurr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filteredList = filterHandler(currencies, filterInput);
    dispatch(filterCurrency(filteredList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterInput]);
  // debugger;
  function loadCurrencies(data) {
    return data.length === 0 ? (
      <Spinner />
    ) : (
      <CurrItem currList={filterInput.length > 0 ? [filterCurrencies, history] : [currencies, history]} />
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className={style.curr}>
          <ul className={style.list}>{loadCurrencies(currencies)}</ul>
        </section>
      </main>
    </>
  );
}

export default CurrBlock;
