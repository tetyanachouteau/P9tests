import React from "react";
import VerticalLayout from './VerticalLayout.js'
import ErrorPage from "./ErrorPage.js"
import LoadingPage from "./LoadingPage.js"
import Actions from './Actions.js'

const Row = ({ bill }) => (
  <tr>
    <td>{bill.type}</td>
    <td>{bill.name}</td>
    <td>{bill.date}</td>
    <td>{bill.amount} €</td>
    <td>{bill.status}</td>
    <td>
      <Actions fileUrl={bill.fileUrl} />
    </td>
  </tr>
);

const Rows = ({ data }) => {
  if (!data || !data.length) return null;
  const sortedBills = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sortedBills.map(bill => <Row key={bill.id} bill={bill} />);
}

const Modal = () => (
  <div className="modal fade" id="modaleFile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Justificatif</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body"></div>
      </div>
    </div>
  </div>
);

const BillsUI = ({ data, loading, error }) => {
  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;
  
  return (
    <div className='layout'>
      <VerticalLayout height={120} />
      <div className='content'>
        <div className='content-header'>
          <div className='content-title'> Mes notes de frais </div>
          <button type="button" data-testid='btn-new-bill' className="btn btn-primary">Nouvelle note de frais</button>
        </div>
        <div id="data-table">
          <table id="example" className="table table-striped" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Nom</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody data-testid="tbody">
              <Rows data={data} />
            </tbody>
          </table>
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default BillsUI;
