import { describe, test, expect } from 'vitest';
import Header from "../src/components/Header.jsx";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

test("Header renders correctly", () => {
render(<header />);
const Header = screen.getByRole("header");
expect(Header).toBeInTheDocument();
});