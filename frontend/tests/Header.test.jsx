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
  
  // it('shows Typing Trainer and logout button when logged in', () => {
  //   renderHeader(true);
  //   screen.debug();
  //   render(<Header />, { wrapper: ({ children }) => <TestWrapper isLoggedIn={true}>{children}</TestWrapper> });
  //   expect(screen.getByText('Typing Trainer')).toBeInTheDocument();
  //   expect(screen.getByText('Abmelden')).toBeInTheDocument();
  // });
});

describe('Header Component', () => {
  const renderHeader = (isLoggedIn) => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: () => {} }}>
          <Header />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  it('shows Typing Trainer and logout button when logged in', () => {
    renderHeader(true);
    screen.debug(); 
    expect(screen.getByText(/Typing Trainer/i)).toBeInTheDocument();
    expect(screen.getByText(/Abmelden/i)).toBeInTheDocument();
  });
});

describe('Footer Component', () => {
  it('should render correctly and have the correct classes', () => {
    render(<Footer />, { wrapper: TestWrapper });
    const appElement = screen.getByTestId('footapp');
    expect(appElement).toHaveClass('text-white');
  });
});

