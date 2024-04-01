import jsdom from "jest-environment-jsdom";
import React from "react";
import { screen } from "@testing-library/dom";
import LoadingPage from "../views/LoadingPage.js";

describe('Given I am connected on app (as an Employee or an HR admin)', () => {
  describe('When LoadingPage is called', () => {
    test(('Then, it should render Loading...'), () => {
      const html = LoadingPage();
      document.body.innerHTML = html;
      const loadingTextElements = screen.getAllByText('Loading...');
      expect(loadingTextElements.length).toBeGreaterThan(0);
    });
  });
});
