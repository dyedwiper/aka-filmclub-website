import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
 
  :root{
      --aka-gelb: #ffee00;
      --aka-grau: #616161;
      --aka-hellgrau: lightgrey;
      --aka-red: darkred;
      --aka-secondary-color: white;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', 'Segoe UI', sans-serif;
    font-size: 16px;
    overflow-wrap: break-word;
  }

  input, button, textarea {
    padding: 5px;
    border: solid 1px black;
    font-family: inherit;
    font-size: 1em;
    appearance: none;
  }

  input {
    /* Fix for iPhone because inputs are somehow too wide elsewise. */
    width: 100%;

    &:disabled {
        border-color: var(--aka-hellgrau);
    }
  }

  input[type="checkbox"] {
    width: initial;
    appearance: auto;
  }

  input[type="file"] {
      border: none;
  }

  /* Fix for Safari because empty date inputs have no height otherwise. */
  input[type="date"]{
      min-height: 32px;
  }

  textarea{
    display: block;
    width: 100%;
    resize: none;
  }

  button {
    background-color: white;
    cursor: pointer;
    box-shadow: 1px 1px 1px black;

    &:active {
        background-color: var(--aka-gelb)
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
  }

  img {
    filter: grayscale();
    transition: filter 2.3s;

    &:hover{
        filter: none;
    }
  }

  a {
    text-decoration: none;
    color: var(--aka-grau);

    &.active,
    &:hover {
        text-decoration: underline var(--aka-gelb);
        text-decoration-thickness: 3px;
    }
  }

  ul {
    padding: 0;
    list-style: none;
  }

  p {
      margin: 10px 0;
      color: black;
      hyphens: auto;
  } 

  h2{
      font-size: 2.1em;
  }

  h3{
      margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
      color: black;
  }

  hr {
    height: 10px;
    width: 80%;
    margin: 20px 0;
    border: none;
    background-color: var(--aka-gelb);
  }

  input[id="openLinkInNewWindow"] {
    /* Fix for react-draft-wysiwyg, undoing the iPhone fix above. */
    width: initial;

    &:checked {
        background-color: black;
    }
  }

  /* Fix for link modal of react-draft-wysiwyg, because it is otherwise too small.*/
  div[class="rdw-link-modal"] {
      box-sizing: initial;
  }

`;
