import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
 
  :root{
      --aka-gelb: #ffea0d;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', 'Segoe UI', sans-serif;
    font-size: 16px;
    overflow-wrap: break-word;
  }

  input, button, textarea {
    border: none;
    font-family: inherit;
    font-size: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 5px;
    padding: 5px;
  }

  input {
    /* Fix for iPhone because inputs are somehow too wide elsewise */
    width: 100%;
  }

  button {
    background-color: white;
    cursor: pointer;
  }

  img {
    filter: grayscale();
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul {
    padding: 0;
    list-style: none;
  }
`;
