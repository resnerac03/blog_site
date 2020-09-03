import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Table, Container, Row, Col } from 'react-bootstrap';
import Home from './pages/Home';
import Post from './pages/Post';

const App = () => {
    return (
       
        <Router>
            <Container>
                <Route exact path="/" component={Home} />
                <Route path="/post" component={Post} />
            </Container>
        </Router>
       
    )
}

export default App;