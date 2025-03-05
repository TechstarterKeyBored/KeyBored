// Test file for Header component
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

describe('Header Component', () => {
  it("h1 element contains the text 'KeyBored'", () => {
    render(<Header />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('KeyBored');
  });

  it('Header contains a navigation element', () => {
    render(<Header />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('Header is visible', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeVisible();
  });
});
