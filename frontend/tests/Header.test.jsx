// Test file for Header component - Testing Husky pre-commit hook
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../src/AuthContext';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

// Mock-Komponente für den Test
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthContext.Provider value={{ isLoggedIn: false, setIsLoggedIn: () => {} }}>
      {children}
    </AuthContext.Provider>
  </BrowserRouter>
);

const TestWrapper1 = ({ children }) => (
  <BrowserRouter>
    <AuthContext.Provider value={{ isLoggedIn: true, setIsLoggedIn: () => {} }}>
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

  it('should render correctly and have the correct classes', () => {
    render(<Header />, { wrapper: TestWrapper });
    const appElement = screen.getByTestId('app');
    expect(appElement).toHaveClass('flex');
  });

  it('shows login and register links when not logged in', () => {
    render(<Header />, { wrapper: ({ children }) => <TestWrapper isLoggedIn={false}>{children}</TestWrapper> });
    expect(screen.getByText(/Registrieren/i)).toBeInTheDocument();
    expect(screen.getByText(/Anmelden/i)).toBeInTheDocument();
  });
  
  it('shows login and register links when not logged in', () => {
    render(<Header />, { wrapper: ({ children }) => <TestWrapper1 isLoggedIn={true}>{children}</TestWrapper1> });
    expect(screen.getByText(/Typing Trainer/i)).toBeInTheDocument();
    expect(screen.getByText(/Abmelden/i)).toBeInTheDocument();
  });

  it('has correct link destinations when not logged in', () => {
    render(<Header />, { wrapper: TestWrapper });
    expect(screen.getByText(/Registrieren/i).closest('a')).toHaveAttribute('href', '/register');
    expect(screen.getByText(/Anmelden/i).closest('a')).toHaveAttribute('href', '/login');
  });

  it('has correct link destination for Typing Trainer when logged in', () => {
    render(<Header />, { wrapper: TestWrapper1 });
    expect(screen.getByText(/Typing Trainer/i).closest('a')).toHaveAttribute('href', '/typing-trainer');
  });

  it('header has the correct styling', () => {
    render(<Header />, { wrapper: TestWrapper });
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('text-white');
    expect(header).toHaveClass('z-50');
    expect(header).toHaveClass('py-2');
  });

});

describe('Footer Component', () => {
  it('should render correctly and have the correct classes', () => {
    render(<Footer />, { wrapper: TestWrapper });
    const appElement = screen.getByTestId('footapp');
    expect(appElement).toHaveClass('text-white');
  });
});
