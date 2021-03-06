import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RatingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: []
    };
  }

  componentWillMount() {
    this.getRatings();
  }
  getRatings() {
    axios.get('http://localhost:3001/api/Ratings')
      .then(response => {
        this.setState({ ratings: response.data }, () => {
          // console.log(this.state);
        });
      });
  }

  render() {
    const ratingItems = this.state.ratings.map((rating, i) => {
      return (
        <div key={i}>
          <If condition ={ this.props.account.id === rating.userID }>
            <label className='collection-item' key={i}>
              <h4>Rating :{rating.rate}</h4>
              <br />
              <br />
            </label>
          </If>
        </div>
      );
    });
    return (
      <div>
        <h1>Ratings</h1>
        <ul>
          {ratingItems}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    account: store.account.data,
    fetching: store.account.fetching
  };
};

RatingScreen.propTypes = {
  get: PropTypes.func,
  fetching: PropTypes.bool,
  account: PropTypes.object,
  comment: PropTypes.object
};
export default connect(mapStateToProps)(RatingScreen);
