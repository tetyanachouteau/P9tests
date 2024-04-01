import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills.js";
import { ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import router from "../app/Router.js";
import jsdom from "jest-environment-jsdom";

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
});

describe("Given I am connected as an employee", () => {
  beforeEach(() => {
    window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee'
    }));
    render(<BillsUI data={bills} loading={false} error={null} />);
    router();
    window.onNavigate(ROUTES_PATH.Bills);
  });

  test("Then bill icon in vertical layout should be highlighted", async () => {
    await waitFor(() => screen.getByTestId('icon-window'));
    const windowIcon = screen.getByTestId('icon-window');
    expect(windowIcon).toHaveClass('selected');
  });

  test("Then bills should be ordered from earliest to latest", () => {
    const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML);
    const antiChrono = (a, b) => ((a < b) ? 1 : -1);
    const datesSorted = [...dates].sort(antiChrono);
    expect(dates).toEqual(datesSorted);
  });

  test("Check if icon window is rendered", () => {
    render(<BillsUI data={bills} loading={false} error={null} />);
    const iconWindow = screen.getByTestId('icon-window');
    expect(iconWindow).toBeInTheDocument();
  });

  test("Check if dates have correct format", () => {
    render(<BillsUI data={bills} loading={false} error={null} />);
    const dateElements = screen.getAllByText(/\d{4}-\d{2}-\d{2}/); // Format YYYY-MM-DD
    dateElements.forEach((dateElement) => {
      expect(dateElement).toBeInTheDocument();
    });
  });

  test("Then it should render Bills page", async () => {
    await waitFor(() => {
      expect(screen.queryByText("Mes notes de frais")).toBeInTheDocument();
    });
  }); 
});
