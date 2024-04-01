import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardFormUI from "../views/DashboardFormUI.js";
import { formatDate } from "../app/format.js";

const bill = {
  "id": "47qAXb6fIm2zOKkLzMro",
  "vat": "80",
  "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
  "status": "accepted",
  "type": "Hôtel et logement",
  "commentAdmin": "ok",
  "commentary": "séminaire billed",
  "name": "encore",
  "fileName": "preview-facture-free-201801-pdf-1.jpg",
  "date": "2004-04-04",
  "amount": 400,
  "email": "a@a",
  "pct": 20
};

const billAccepted = {
  ...bill,
  "status": "accepted"
};

const billPending = {
  ...bill,
  "status": "pending"
};

const billRefused = {
  ...bill,
  "status": "refused"
};

describe('Given I am connected as an Admin and I am on Dashboard Page', () => {
  describe('When bill data is passed to DashboardFormUI', () => {
    test(('Then, it should display them in the page'), () => {
      render(<DashboardFormUI {...bill} />);
      expect(screen.getByTestId('vat')).toHaveTextContent(bill.vat);
      expect(screen.getByTestId('type')).toHaveTextContent(bill.type);
      expect(screen.getByTestId('commentary')).toHaveTextContent(bill.commentary);
      expect(screen.getByTestId('name')).toHaveTextContent(bill.name);
      expect(screen.getByTestId('fileName')).toHaveTextContent(bill.fileName);
      expect(screen.getByTestId('date')).toHaveTextContent(formatDate(bill.date));
      expect(screen.getByTestId('amount')).toHaveTextContent(bill.amount.toString());
      expect(screen.getByTestId('pct')).toHaveTextContent(bill.pct.toString());
    });
  });

  describe('When pending bill is passed to DashboardFormUI', () => {
    test(('Then, it should show buttons and textArea'), () => {
      render(<DashboardFormUI {...billPending} />);
      expect(screen.getByText("Accepter")).toBeInTheDocument();
      expect(screen.getByText("Refuser")).toBeInTheDocument();
      expect(screen.getByTestId("commentary2")).toBeInTheDocument();
    });
  });


  describe('When accepted bill is passed to DashboardFormUI', () => {
    test(('Then, it should show admin commentary'), () => {
      render(<DashboardFormUI {...billAccepted} />);
      expect(screen.getByText(bill.commentAdmin)).toBeInTheDocument();
    });
  });

  describe('When refused bill is passed to DashboardFormUI', () => {
    test(('Then, it should show admin commentary'), () => {
      render(<DashboardFormUI {...billRefused} />);
      expect(screen.getByText(bill.commentAdmin)).toBeInTheDocument();
    });
  });
});
