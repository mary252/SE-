import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../../Constants';


class ViewExpert extends Component {
  DeleteCard(id) {
    if (confirm('Are you sure you want to delete ?')) {
      axios.delete(`http://localhost:3001/api/Cards/${id}?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
        .then(res => {
          console.log(res);
          console.log('it works');
        })
        .catch(error => {
          console.log(error);
        });
      this.props.onDel(id);
    }
  }


  AcceptCard(data) {
    if (confirm('Are you sure you want to accept?')) {
      axios.post(`http://localhost:3001/api/Accounts?access_token=${localStorage.getItem(constants.storageKeys.token)}`, {
        role: 'expert',
        name: data.name,
        description: data.description,
        field: data.field,
        email: data.emailAddress,
        password: data.password
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      axios.delete(`http://localhost:3001/api/Cards/${data.id}?access_token=${localStorage.getItem(constants.storageKeys.token)}`)
        .then(res => {
          console.log(res);
          console.log('it works');
        })
        .catch(error => {
          console.log(error);
        });
      this.props.onDel(data.id);
    }
  }

  render() {
    let cards;
    if (this.props.cards) {
      cards = this.props.cards.map(
        card =>
          <div key={card.id}>
            <table>
              <tbody>
                <tr>Name: {card.name}</tr>
                <tr>Description: {card.description}</tr>
                <tr>Field:{card.field}</tr>
                <tr>Email: {card.emailAddress}</tr>
              </tbody>
            </table>
            <button type="button" onClick={this.AcceptCard.bind(this, card)}>Accept</button>
            <button type="button" onClick={this.DeleteCard.bind(this, card.id)}>Delete</button>
            <p></p>
          </div>
      );
    }
    return (
      <div>{cards}</div>
    );
  }
}

export default ViewExpert;
