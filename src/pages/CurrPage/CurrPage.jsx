import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { historyCurr } from "../../services/currency.request";
import { filterHalndler } from "../../services/filterData.helper";
import style from "./CurrPage.module.scss";
import Spinner from "../../components/Spinner/Spinner";
import Header from "../../components/Header";
import CurrItem from "../../components/CurrItem";

function CurrBlock() {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencies);
  const history = useSelector((state) => state.history);
  const filterCurrencies = useSelector((state) => state.filterCurrencies);
  const filterInput = useSelector((state) => state.filterInput);

  async function refreshCurr() {
    const results = await historyCurr();
    const [result, resultHistory] = results;
    dispatch({ type: "ADD_CURRENCIES", content: result });
    dispatch({ type: "ADD_HISTORY", content: resultHistory });
  }

  useEffect(() => {
    refreshCurr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filteredList = filterHalndler(currencies, filterInput);
    dispatch({ type: "FILTER_CURRENCIES", content: filteredList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterInput]);

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
