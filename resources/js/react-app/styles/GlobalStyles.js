import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }
 
  :root{
      --aka-gelb: #ffea0d;
      --aka-grau: lightgrey;
      --aka-secondary-color: white;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', 'Segoe UI', sans-serif;
    font-size: 16px;
    overflow-wrap: break-word;
  }

  input, button, textarea {
    font-family: inherit;
    font-size: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: solid 1px black;
    border-radius: 5px;
    padding: 5px;
  }

  input {
    /* Fix for iPhone because inputs are somehow too wide elsewise. */
    width: 100%;

    &:disabled {
        border-color: var(--aka-grau);
    }
  }

  input[type="file"]{
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
  }

  img {
    filter: grayscale();
  }

  a {
    text-decoration: none;
    color: black;

    &.active,
    &:hover {
        text-decoration: underline var(--aka-gelb);
    }
  }

  ul {
    padding: 0;
    list-style: none;
  }

  /* h1, h2, h3, h4, h5, h6, p {
      margin: 0;
  } */

  h2{
      font-size: 2.1em;
  }

  h3{
      margin: 0;
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

  div[class="rdw-editor-main"] a {
      color:  #757575;
  }

  /* Fix for link modal of react-draft-wysiwyg, because it is otherwise too small.*/
  div[class="rdw-link-modal"] {
      box-sizing: initial;
  }

`;
