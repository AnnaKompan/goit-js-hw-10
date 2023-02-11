export default fetchCountries;

// const options = {
//   headers: {},
// };

function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}`;
  return fetch(URL).then(response => response.json());
}
