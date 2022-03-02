import * as React from 'react';
import { LOGO_URL, COPYRIGHT } from '../constants';

export default function Layout({ children, className }) {
  return (
    <div className="Layout">
      <header>
        <a href="/">
          <img src={LOGO_URL} alt="Logo" className="Layout-logo" />
        </a>
      </header>
      <main className={`Layout-content has-shadow ${className || ''}`}>
        {children}
      </main>
      <footer>
        © {new Date().getFullYear()} {COPYRIGHT}
      </footer>
    </div>
  );
}