import { describe, test, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

test("Header renders correctly", () => {
render(<header />);
const Header = screen.getByRole("banner");
expect(Header).toBeInTheDocument();
});