import axios from "axios";

export default axios.create({
  baseURL: "https://books-app-reactjs.firebaseio.com/",
});
