import React from "react";
import { render, screen } from "@testing-library/react";
import VerticalLayout from "../views/VerticalLayout.js";

describe('Given I am connected as Employee', () => {
  test("Then Icons should be rendered", () => {
    // Configuration du localStorageMock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Simuler un utilisateur connecté de type Employee
    const user = { type: 'Employee' };
    window.localStorage.setItem('user', JSON.stringify(user));

    // Rendre le composant VerticalLayout
    render(<VerticalLayout windowHeight={120} />);

    // Vérifier que les icônes sont rendues
    expect(screen.getByTestId('icon-window')).toBeTruthy();
    expect(screen.getByTestId('icon-mail')).toBeTruthy();
  });

  test("Then Layout elements should be present", () => {
    // Configuration du localStorageMock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Simuler un utilisateur connecté de type Employee
    const user = { type: 'Employee' };
    window.localStorage.setItem('user', JSON.stringify(user));

    // Rendre le composant VerticalLayout
    render(<VerticalLayout windowHeight={120} />);

    // Vérifier la présence d'autres éléments de mise en page
    expect(screen.getByTestId('sidebar')).toBeTruthy(); // Vérifie la présence de la barre latérale
    expect(screen.getByTestId('header')).toBeTruthy(); // Vérifie la présence de l'en-tête

    // Assurez-vous que le composant se rend correctement sans erreurs
    expect(screen.queryByTestId('error-message')).toBeNull();
  });
});
