export function convertCurrentPrice(value, nom, toFixed) {
  return (value / nom).toFixed(toFixed);
}

export function result(val, nom, prev, toFixed) {
  return (((val / nom - prev / nom) / (prev / nom)) * 100).toFixed(toFixed);
}

export function toggleHistory(e, style) {
  e.target.querySelector("ul").classList.toggle(style.history);
}
