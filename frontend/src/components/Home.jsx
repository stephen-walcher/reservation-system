// Import base React packages
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// Import Moment package
import Moment from 'react-moment';

// Import GraphQL syntax tag
import gql from "graphql-tag";

// Create GraphQL query for getting all reservations
const reservationsQuery = gql`
    query getReservations {
        reservations {
            _id
            name
            hotelName
            arrivalDate
            departureDate
        }
    }
`;

const Home = () => (
    <Query query={reservationsQuery}>
        {result => {
            const { loading, error, data } = result;

            if (loading) {
                return <div>Loading</div>;
            }

            return (
                <div>
                    <div className="row">
                        <h1 className="col-md-8">Reservations</h1>
                        <Link className="col-md-4 text-right" to="/create">
                            <button className="createReservation btn btn-success">Add Reservation</button>
                        </Link>
                    </div>
                    {error && <ErrorMessage error={error}/>}
                    <div className="row">
                        <div className="col-md-12">
                            <table className="reservationsList">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Hotel</th>
                                        <th className="text-center">Arrival</th>
                                        <th className="text-center">Departure</th>
                                    </tr>
                                </thead>
                                <tbody>
                            { data.reservations.map( reservation =>
                                (
                                    <tr key={reservation._id} className="reservation">
                                        <td>{reservation.name}</td>
                                        <td>{reservation.hotelName}</td>
                                        <td className="text-center"><Moment format="MMM Do, YYYY">{reservation.arrivalDate}</Moment></td>
                                        <td className="text-center"><Moment format="MMM Do, YYYY">{reservation.departureDate}</Moment></td>
                                    </tr>
                                )
                            )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }}
    </Query>
);

export default Home;
