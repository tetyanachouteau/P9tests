import { ROUTES_PATH } from '../constants/routes.js';

export let PREVIOUS_LOCATION = '';

export default class Login {
  constructor({ document, localStorage, onNavigate, PREVIOUS_LOCATION, store }) {
    this.document = document;
    this.localStorage = localStorage;
    this.onNavigate = onNavigate;
    this.PREVIOUS_LOCATION = PREVIOUS_LOCATION;
    this.store = store;

    const formEmployee = this.document.querySelector(`form[data-testid="form-employee"]`);
    formEmployee.addEventListener("submit", this.handleSubmitEmployee.bind(this));

    const formAdmin = this.document.querySelector(`form[data-testid="form-admin"]`);
    formAdmin.addEventListener("submit", this.handleSubmitAdmin.bind(this));
  }

  extractUserData = (e) => {
    const email = e.target.querySelector(`input[data-testid="employee-email-input"]`).value;
    const password = e.target.querySelector(`input[data-testid="employee-password-input"]`).value;
    return {
      type: e.target.dataset.type,
      email,
      password,
      status: "connected"
    };
  }

  handleSubmitEmployee = (e) => {
    e.preventDefault();
    const user = this.extractUserData(e);
    this.handleLogin(user, ROUTES_PATH.Bills);
  }

  handleSubmitAdmin = (e) => {
    e.preventDefault();
    const user = this.extractUserData(e);
    this.handleLogin(user, ROUTES_PATH.Dashboard);
  }

  handleLogin = (user, route) => {
    this.localStorage.setItem("user", JSON.stringify(user));
    this.login(user)
      .catch((err) => this.createUser(user))
      .then(() => {
        this.onNavigate(route);
        this.PREVIOUS_LOCATION = route;
        document.body.style.backgroundColor = "#fff";
      });
  }

  login = (user) => {
    if (this.store) {
      return this.store.login(JSON.stringify({
        email: user.email,
        password: user.password,
      })).then(({ jwt }) => {
        localStorage.setItem('jwt', jwt);
      });
    } else {
      return null;
    }
  }

  createUser = (user) => {
    if (this.store) {
      return this.store.users().create({
        data: JSON.stringify({
          type: user.type,
          name: user.email.split('@')[0],
          email: user.email,
          password: user.password,
        })
      }).then(() => {
        console.log(`User with ${user.email} is created`);
        return this.login(user);
      });
    } else {
      return null;
    }
  }
}
