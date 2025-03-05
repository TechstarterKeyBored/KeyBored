// Test file for Header component - Testing Husky pre-commit hook
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../src/AuthContext';
import Header from '../src/components/Header';

// Mock-Komponente für den Test
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}>
      {children}
    </AuthContext.Provider>
  </BrowserRouter>
);

describe('Header Component', () => {
  it("h1 element contains the text 'KeyBored'", () => {
    render(<Header />, { wrapper: TestWrapper });
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('KeyBored');
  });

  it('Header contains a navigation element', () => {
    render(<Header />, { wrapper: TestWrapper });
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('Header is visible', () => {
    render(<Header />, { wrapper: TestWrapper });
    const header = screen.getByRole('banner');
    expect(header).toBeVisible();
  });
});
