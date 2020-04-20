import React, { Component } from 'react';
import axios from 'axios';

const querystring = require('querystring');

const apiEndpoint = 'http://localhost:8080';

export default class FilterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start_date: new Date(8640000000000000),
            end_date: new Date(8640000000000000),
            start_day: 0 /*minutes*/,
            end_day: 24*60 /*minutes*/,
            violationTypes: [],
            locations: [],
            statusType: [],
            tickets: [],
        };
    }

    grabTickets() {
        axios.get(`${apiEndpoint}/enums`)
            .catch((error) => {
                console.log('error1');
                console.log(error);
            })
            .then((response) => {
                console.log(response);
            })
            .then(() => {
                return axios.get(`${apiEndpoint}/tickets/query?` +  
                    querystring.stringify({
                        created_after: this.state.start_date.getTime(),
                        //created_before: this.state.end_date.getMilliseconds(),
                        day_start: this.state.start_day,
                        day_end: this.state.end_day,
                    })
                );
            })
            .catch((error) => {
                console.log('error2');
                console.log(error);
            })
            .then((response) => {
                console.log(response);
            });
    }

    componentDidMount() {
        this.grabTickets();
    }

    render() {
        return (
            <div>test</div>
        );
    }
}