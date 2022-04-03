export async function requestCurr() {
  try {
    const markerCheck = parseInt(localStorage.getItem("marker"));
    const nowCheck = Date.now();
    if (nowCheck - markerCheck > 40000 || isNaN(markerCheck)) {
      // Fetch data
      let getCurr = await fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
        method: "GET"
      });
      getCurr = await getCurr.json();

      // Replace data
      let lastCurr = getCurr.PreviousURL.replace(/\/{2}/, "https://");
      let getHistory = [];

      for (let i = 0; i < 11; i++) {
        let res = await fetch(`${lastCurr}`, {
          method: "GET"
        });
        res = await res.json();
        lastCurr = await res.PreviousURL.replace(/\/{2}/, "https://");
        getHistory.push(res);
      }

      // Create req-check
      const reqDate = Date.now();
      localStorage.setItem("marker", reqDate);

      getCurr = getCurr.Valute;

      const storageCurr = JSON.stringify([getCurr, getHistory]);
      localStorage.setItem("data", storageCurr);

      return [getCurr, getHistory];
    } else {
      const backupDate = JSON.parse(localStorage.getItem("data"));
      const [getCurr, getHistory] = backupDate;
      return [getCurr, getHistory];
    }
  } catch {
    let getCurr = [
      {
        CharCode: "Произошла ошибка загрузки",
        ID: 111
      }
    ];
    return getCurr;
  }
}

export async function historyCurr() {
  let response = await requestCurr();
  let result = [];
  let resultHistory = [];
  for (let i in response[0]) {
    result.push(response[0][i]);
  }
  for (let i in response[1]) {
    resultHistory.push(response[1][i]);
  }
  return [result, resultHistory];
}
