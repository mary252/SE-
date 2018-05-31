
import React, { Component } from 'react';
import t from 'tcomb-form';
import Box from 'grommet/components/Box';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import { Helmet } from 'react-helmet';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import Schemas from '../../../../../Services/Schemas';
import FormsLayout, { TextLayout } from '../../../Components/RatingForm';
import RatingFooter from '../../../Components/RatingFooter';
import RateAction from '../../../../../Redux/RatingRedux';

class rating extends Component {
  constructor(props) {
    super(props);
    this.schema = t.struct({ // Validate inputs as per Schemas.js
      Review: Schemas.message
    });
    this.options = {
      template: FormsLayout,
      fields: {
        Review: {
          factory: TextLayout,
          label: 'Review Box',
          config: {
            placeholder: 'Give Us a Rating ...'
          }
        }
      },
      config: {
        footer: (
          <div>
            <RatingFooter
              label='Submit Your Review'
              submit={e => this.submit(e)} // Call method Submit
            />
          </div>
        )
      }
    };
    this.state = {
      form: {
        Review: '' // Review message
      },
      stars: 0, //Rating from 1-5 0 is a default Value that doesn't get included in calculations
      report: '0' // Do you want to report the user flag ?
    };
  }
  submit(e) {
    e.preventDefault();
    if (this.state.stars < 2) {
      const value = {
        Rating: this.state.stars,
        message: this.form.getValue().Review.toString(),
        Report: this.state.report }; // Depending on Whether the user clicked on i want to report or not .. set the Report flag
      this.props.add(value); // Call method add in mapDispatchToProps
    } else {
      const value = { Rating: this.state.stars, message: this.form.getValue().Review.toString(), Report: '0' }; // Send Comment with report flag=0
      this.props.add(value);
    }
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className=".react-confirm-alert-body">
            <h1>Your Review was Submitted .. Goodbye</h1>
            <button className=".react-confirm-alert-button-group" onClick={() => {
              onClose();
            }}>Bye</button>
          </div>
        );
      }
    });
  }
  onStarClick(nextValue, prevValue, name) {
    console.log(this.state.stars);
    this.setState({ stars: nextValue });
    if (nextValue < 2) { // If they click on less than 2 starts .. ask them if they want to report
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className=".react-confirm-alert-body">
              <h1>Would you Like to Report the user?</h1>
              <button className=".react-confirm-alert-button-group" onClick={() => {
                this.setState({ report: '0' });
                onClose();
              }}>No</button>

              <button className='.react-confirm-alert-button-group' onClick={() => {
                this.setState({ report: '1' });
                onClose();
              }}>Yes</button>
            </div>
          );
        }
      });
    }
  }
  render() {
    return (
      <Box className='login-wrapper' size='large'>
        <Helmet>
          <title>Office Hours | Review </title>
        </Helmet>

        <Heading align='center' className='screen-title'>
                Give a Review
        </Heading>

        <Box
          className='office-hours-identity'
          direction='row'
          align='center'
          justify='center'
          margin={{ vertical: 'large' }}>
          <div className='logo'>
            <img src='/img/main-logo.svg' />
          </div>
          <div className='info'>
            <Title>RiseUp Office Hours</Title>
          </div>
        </Box>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={this.state.stars}
          onStarClick={this.onStarClick.bind(this)}
        />
        <t.form.Form
          ref={form => { this.form = form; }}
          value={this.state.form}
          options={this.options}
          type={this.schema}
          onChange={form => this.setState({ form })}
        />
      </Box>
    );
  }
}
const mapStateToProps = store => {
  return {
    token: store.rate.token,
    value: store.rate.data,
    loading: store.rate.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    add: data => {
      return dispatch(RateAction.rate(data), dispatch(push('/account'))); // Call method rate in RatingRedux.js then go back to account
    }
  };
};
rating.propTypes = {
  add: PropTypes.func,
  loading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(rating);
