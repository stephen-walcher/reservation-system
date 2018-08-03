// Import base React packages
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// Import GraphQL syntax tag
import gql from 'graphql-tag';

// Import Error Message component
import ErrorMessage from './ErrorMessage';

// Create GraphQL mutation for creating new reservations
const CREATE_RESERVATION = gql`
    mutation createReservation($name: String!, $hotelName: String!, $arrivalDate: Date!, $departureDate: Date!) {
        createReservation(
            name: $name,
            hotelName: $hotelName,
            arrivalDate: $arrivalDate,
            departureDate: $departureDate
        ) {
            _id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`;

// Set up initial state for the form elements
const INITIAL_STATE = {
    name: '',
    hotelName: '',
    arrivalDate: '',
    departureDate: ''
};

// Make the createReservation component
// This one has extra processing, so we extend and make a base Component class
class CreateReservation extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        // Set up some scope bindings, because that's still a thing
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Update state when text is entered on a field
    onChange(event) {
        const {name, value} = event.target;

        this.setState({ [name]: value });
    }

    // Handle submissions of the form
    onSubmit(event, createReservationFn) {
        event.preventDefault();

        // Trigger the mutation
        createReservationFn({ variables: this.state }).then(async ({data}) => {
            // Reset the form fields
            this.setState(INITIAL_STATE);

            // Redirect to the main page
            this.props.history.push("/");
        });
    };

    render() {
        // Break up the state properties to a variable
        const { name, hotelName, arrivalDate, departureDate } = this.state;

        // Validation check for enabling/disabling the submit button
        const isInvalid = departureDate === '' || arrivalDate === '' || hotelName === '' || name === '';

        return (
            <Mutation
                mutation={CREATE_RESERVATION}
                variables={{
                    name,
                    hotelName,
                    arrivalDate,
                    departureDate
                }}
                refetchQueries={result => [{
                    query:  gql`
                        query getReservations {
                            reservations {
                                _id
                                name
                                hotelName
                                arrivalDate
                                departureDate
                            }
                        }
                    `
                }]}
            >
            {
                (createReservationFn, {data, loading, error}) => (
                    <div>
                        <div className="row">
                            <h1 className="col-md-8">New Reservation</h1>
                        </div>
                        <form onSubmit={event => this.onSubmit(event, createReservationFn)}>
                            <div className="input-group mb-3">
                                <input name="name" className="form-control" value={name} onChange={this.onChange} type="text" placeholder="Full Name"/>
                            </div>
                            <div className="input-group mb-3">
                                <input name="hotelName" className="form-control" value={hotelName} onChange={this.onChange} type="text" placeholder="Hotel Name"/>
                            </div>
                            <div className="input-group mb-3">
                                <input name="arrivalDate" className="form-control" value={arrivalDate} onChange={this.onChange} type="text" placeholder="Arrival Date"/>
                            </div>
                            <div className="input-group mb-3">
                                <input name="departureDate" className="form-control" value={departureDate} onChange={this.onChange} type="text" placeholder="Departure Date"/>
                            </div>
                            <button disabled={isInvalid || loading} className="btn btn-success" type="submit">
                                Create
                            </button>

                            {error && <ErrorMessage error={error}/>}
                        </form>
                    </div>
                )
            }
            </Mutation>
        );
    }
};

export default CreateReservation;
