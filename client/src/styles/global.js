import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
                 sans-serif;
    background-color: ${({ theme }) => theme.bgPrimary};
    color: ${({ theme }) => theme.textPrimary};
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    outline: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bgSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;