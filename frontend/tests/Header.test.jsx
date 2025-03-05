import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Header renders correctly", () => {
  render(<header />);
  const Header = screen.getByRole("banner");
  expect(Header).toBeInTheDocument();
});

test("h1 element contains the text 'KeyBored'", () => {
  render(<h1>KeyBored</h1>);
  const headingText = screen.getByText("KeyBored");
  expect(headingText).toBeInTheDocument();
});

test("Header contains a navigation element", () => {
  render(<nav />);
  const navigation = screen.getByRole("navigation");
  expect(navigation).toBeInTheDocument();
});
