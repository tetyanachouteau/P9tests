import React, { useState } from 'react';

const NewBillForm = () => {
  const [expenseType, setExpenseType] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [vat, setVat] = useState('');
  const [pct, setPct] = useState('');
  const [commentary, setCommentary] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de soumission du formulaire
  };

  return (
    <form data-testid="form-new-bill" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="col-half">
            <label htmlFor="expense-type" className="bold-label">Type de dépense</label>
            <select required className="form-control blue-border" data-testid="expense-type">
              <option>Transports</option>
              <option>Restaurants et bars</option>
              <option>Hôtel et logement</option>
              <option>Services en ligne</option>
              <option>IT et électronique</option>
              <option>Equipement et matériel</option>
              <option>Fournitures de bureau</option>
            </select>
          </div>
          <div className="col-half">
            <label htmlFor="expense-name" className="bold-label">Nom de la dépense</label>
            <input type="text" className="form-control blue-border" data-testid="expense-name" placeholder="Vol Paris Londres" />
          </div>
          <div className="col-half">
            <label htmlFor="datepicker" className="bold-label">Date</label>
            <input required type="date" className="form-control blue-border" data-testid="datepicker" />
          </div>
          <div className="col-half">
            <label htmlFor="amount" className="bold-label">Montant TTC </label>
            <input required type="number" className="form-control blue-border input-icon input-icon-right" data-testid="amount" placeholder="348"/>
          </div>
          <div className="col-half-row">
            <div className="flex-col"> 
              <label htmlFor="vat" className="bold-label">TVA</label>
              <input type="number" className="form-control blue-border" data-testid="vat" placeholder="70" />
            </div>
            <div className="flex-col">
              <label htmlFor="pct" className="white-text">%</label>
              <input required type="number" className="form-control blue-border" data-testid="pct" placeholder="20" />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="col-half">
            <label htmlFor="commentary" className="bold-label">Commentaire</label>
            <textarea className="form-control blue-border" data-testid="commentary" rows="3"></textarea>
          </div>
          <div className="col-half">
            <label htmlFor="file" className="bold-label">Justificatif</label>
            <input required type="file" className="form-control blue-border" data-testid="file" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="col-half">
            <button type="submit" id="btn-send-bill" className="btn btn-primary">Envoyer</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewBillForm;
