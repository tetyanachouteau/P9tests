import React from "react";
import { screen } from "@testing-library/react"; // Utilisation de @testing-library/react au lieu de @testing-library/dom
import ErrorPage from "../views/ErrorPage.js";

describe('Given I am connected on app (as an Employee or an HR admin)', () => {
  describe('When ErrorPage is called without an error in its signature', () => { // Correction: "without an error" au lieu de "without and error"
    test(('Then, it should render ErrorPage with no error message'), () => {
      const html = ErrorPage();
      document.body.innerHTML = html;
      expect(screen.getAllByText('Erreur')).toBeTruthy();
      expect(screen.getByTestId('error-message').innerHTML.trim().length).toBe(0);
    });
  });
  describe('When ErrorPage is called with an error message in its signature', () => { // Correction: "with an error" au lieu de "with error message"
    test(('Then, it should render ErrorPage with its error message'), () => {
      const error = 'Erreur de connexion internet';
      const html = ErrorPage(error);
      document.body.innerHTML = html;
      expect(screen.getAllByText(error)).toBeTruthy();
    });
  });
});
