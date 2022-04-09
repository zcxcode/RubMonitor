export function createData(data) {
  const storageCurr = JSON.stringify(data);
  localStorage.setItem("data", storageCurr);
}

export function createMark() {
  const reqDate = Date.now();
  localStorage.setItem("marker", reqDate);
}