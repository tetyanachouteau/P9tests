import React from "react";
import { render, screen } from "@testing-library/dom"
import Actions from "../views/Actions.js"
import '@testing-library/jest-dom/extend-expect'


describe('Given I am connected as an Employee', () => {
  describe('When I am on Bills page and there are bills', () => {
    test(('Then, it should render icon eye'), () => {
      render(<Actions url="/fake_url"/>);
      expect(screen.getByTestId('icon-eye')).toBeTruthy()
    })
  })
  describe('When I am on Bills page and there are bills with url for file', () => {
    test(('Then, it should save given url in data-bill-url custom attribute'), () => {
      const url = '/fake_url'
      render(<Actions url={url} />);
      expect(screen.getByTestId('icon-eye')).toHaveAttribute('data-bill-url', url)
    })
  })
})
