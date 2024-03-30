import jsdom from "jest-environment-jsdom";

import React from "react";

export default () => {

  return (
    <div className="page-div">
      <div className="row">
        <div className="title-container"> 
          <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-receipt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            {/* Contenu du SVG */}
          </svg>
          <h1> Billed </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <form className="form-signin" data-testid="form-employee">
                <h2 className="h3 mb-3 font-weight-normal">Employé</h2>
                <label htmlFor="inputEmail">Votre email</label>
                <input type="email" data-testid="employee-email-input" className="form-control" placeholder="johndoe@email.com" required autoFocus />
                <label htmlFor="inputPassword">Mot de passe</label>
                <input type="password" data-testid="employee-password-input" className="form-control" placeholder="******" required />
                <button className="btn btn-lg btn-primary btn-block" data-testid="employee-login-button" style={{ backgroundColor: '#0E5AE5' }} type="submit">Se connecter</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <form className="form-signin" data-testid="form-admin">
                <h2 className="h3 mb-3 font-weight-normal">Administration</h2>
                <label htmlFor="inputEmail">Votre email</label>
                <input type="email" data-testid="admin-email-input" className="form-control" placeholder="johndoe@email.com" required autoFocus />
                <label htmlFor="inputPassword">Mot de passe</label>
                <input type="password" data-testid="admin-password-input" className="form-control" placeholder="******" required />
                <button className="btn btn-lg btn-primary btn-block" data-testid="admin-login-button" style={{ backgroundColor: '#0E5AE5' }} type="submit">Se connecter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}