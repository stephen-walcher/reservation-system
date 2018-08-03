// Import React packages
import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

// Import Apollo packages
import { ApolloClient } from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

// Import components
import Home from './components/Home';
import CreateReservation from './components/CreateReservation';
import NotFound from './components/NotFound';

// Set up Apollo Client
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
    cache: new InMemoryCache()
});

// Set up base page Component, including Router Switching
const App = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div className="App container home-container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/create" component={CreateReservation}/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    </ApolloProvider>
);

export default App;
