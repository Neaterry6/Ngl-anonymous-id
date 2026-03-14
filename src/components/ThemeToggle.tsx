import { useEffect, useState } from 'react';

const themeKey = 'vzn-theme';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = (localStorage.getItem(themeKey) as Theme | null) ?? 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button className="icon-btn theme-toggle" type="button" onClick={toggleTheme} aria-label="Toggle light and dark mode">
      <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
      <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  );
}
