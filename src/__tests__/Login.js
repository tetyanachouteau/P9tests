
import React from 'react';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../containers/Login';
import { ROUTES } from '../constants/routes';
import { localStorageMock } from '../__mocks__/localStorage';
import mockStore from '../__mocks__/store';

jest.mock('../app/store', () => mockStore);

describe('Given I am not connected', () => {
  describe('When I am on Login page', () => {
    test('Then, email input should be focused', () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };


      Object.defineProperty(window, 'localStorage', { value: localStorageMock });

      render(<Login onNavigate={onNavigate} />);

      const inputEmail = screen.getByPlaceholderText('Email');
      expect(inputEmail).toHaveFocus()
    });

    test('Then, user should be able to fill email input', () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });

      const login = new Login({ document, onNavigate });

      document.body.innerHTML = login.render();
      const inputEmail = document.querySelector('input[type="email"]');
      fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
      expect(inputEmail.value).toBe('test@test.com');
    });
  });
});

describe('Given I am connected as Admin', () => {
  describe('When I am on Login page', () => {
    test('Then, I should be redirected to Dashboard', () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Admin'
      }));

      const login = new Login({ document, onNavigate });
      login.redirectToDashboard();
      expect(window.location.href).toBe('http://localhost/dashboard');
    });
  });
});
