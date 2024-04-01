import React from "react";

import { screen } from "@testing-library/react"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then the New Bill form should be rendered", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      // Vérifier si un élément spécifique du formulaire est rendu
      expect(screen.getByLabelText('Amount')).toBeInTheDocument();
      // Vous pouvez ajouter d'autres assertions selon vos besoins
    });
  })
})
