export function filterHandler(data, input) {
  let result = data.filter((i) => {
    return i.CharC1ode.toLowerCase().indexOf(input.toLowerCase()) > -1;
  });
  return result;
}
