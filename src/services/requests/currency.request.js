import { createData, createMark } from "../helpers/localStorage.helper";
import { createError } from "../handlers/errors.handler";

export async function requestCurr() {
  try {
    const markerCheck = parseInt(localStorage.getItem("marker"));
    const nowCheck = Date.now();
    if (nowCheck - markerCheck > 40000 || isNaN(markerCheck)) {
      // Fetch data
      let getCurr = await request("https://www.cbr-xml-daily.ru/daily_json.js");
      // Replace data
      let getHistory = await multiplyRequest(getCurr);
      // Create req-check
      createMark();

      let resCurr = getCurr.Valute;

      createData([resCurr, getHistory]);
      return [resCurr, getHistory];
    } else {
      const backupDate = JSON.parse(localStorage.getItem("data"));
      const [getCurr, getHistory] = backupDate;
      return [getCurr, getHistory];
    }
  } catch (e) {
    return createError(e);
  }
}

export async function historyCurr() {
  let response = await requestCurr();

  if (response.ID === 111) return [[response], []];

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

async function request(url) {
  try {
    let getCurr = await fetch(url, {
      method: "GET"
    });
    getCurr = await getCurr.json();
    return getCurr;
  } catch {
    return createError();
  }
}

async function multiplyRequest(getCurr) {
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
  return getHistory;
}
