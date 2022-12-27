import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: normal;
    font-weight: normal;
    font-style: normal;
  }

  ul,
  ol {
    padding: 0;
  }


  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd,
  menu{
    margin: 0;
    padding: 0;
  }
  
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-family: "Roboto", sans-serif;
    background-color: ${({theme}) => theme.backgroundColor};
    caret-color: ${({theme}) => theme.colors.black};
    color: ${({theme}) => theme.colors.black};
  }
  

  ul,
  ol {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    text-decoration-skip-ink: auto;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button {
    background-color: transparent;
    cursor: pointer;
  }

  article > * + * {
    margin-top: 1em;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    border: none;
  }

  textarea {
    resize: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  form {
    width: 100%;
  }

  ::-webkit-calendar-picker-indicator {
    color-scheme: ${({theme}) => theme.backgroundColor === "white" ? "light" : "dark"};
  }


  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`

export default GlobalStyles;