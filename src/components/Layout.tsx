import * as React from 'react';
import { LOGO_URL, COPYRIGHT } from '../constants';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
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