import { ROUTES_PATH } from '../constants/routes.js';
import { formatDate, formatStatus } from "../app/format.js";
import Logout from "./Logout.js";

export default class BillsPage {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document;
    this.onNavigate = onNavigate;
    this.store = store;
    this.localStorage = localStorage;

    this.initListeners();
    new Logout({ document, localStorage, onNavigate });
  }

  initListeners() {
    const buttonNewBill = this.document.querySelector(`button[data-testid="btn-new-bill"]`);
    if (buttonNewBill) {
      buttonNewBill.addEventListener('click', this.handleClickNewBill);
    }

    const iconEye = this.document.querySelectorAll(`div[data-testid="icon-eye"]`);
    if (iconEye) {
      iconEye.forEach(icon => {
        icon.addEventListener('click', () => this.handleClickIconEye(icon));
      });
    }
  }

  handleClickNewBill = () => {
    this.onNavigate(ROUTES_PATH.NewBill);
  }

  handleClickIconEye = (icon) => {
    const billUrl = icon.getAttribute("data-bill-url");
    const imgWidth = Math.floor($('#modaleFile').width() * 0.5);
    $('#modaleFile').find(".modal-body").html(`<div style='text-align: center;' class="bill-proof-container"><img width=${imgWidth} src=${billUrl} alt="Bill" /></div>`);
    $('#modaleFile').modal('show');
  }

  async getBills() {
    try {
      if (this.store) {
        const snapshot = await this.store.bills().list();
        const bills = snapshot.map(doc => ({
          ...doc,
          date: formatDate(doc.date),
          status: formatStatus(doc.status)
        }));
        console.log('length', bills.length);
        return bills;
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
      // Handle error gracefully, e.g., show error message to user
    }
  }
}
