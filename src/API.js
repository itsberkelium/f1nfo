const { default: Axios } = require("axios");

const API = Axios.create({ baseURL: "https://ergast.com/api/f1/" });

export default API;
