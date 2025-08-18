import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={'outline'}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded border"
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}
