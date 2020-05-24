import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './test/Navbar'
import Landing from './test/Landing'
import Login from './test/Login'
import Register from './test/Register'


class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <div className="container">
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />

                    </div>
                </div>
            </Router>
        )
    }
}

export default App