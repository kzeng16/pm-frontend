import React, { Component, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Range } from 'rc-slider';
import DatePicker from "react-datepicker";
import axios from 'axios';

//import 'react-datepicker/dist/react-datepicker.css';
//import 'react-virtualized/styles.css';
//import 'rc-slider/assets/index.css';
//import './filter.css'

const querystring = require('querystring');
const apiEndpoint = 'http://localhost:8080';

// all props are passed by the List component
const Row = ({ index, style, data }) => {
    if (!data[index]) {
        return '';
    }
    const count = data[index][0];
    const violation = data[index][1];

    // style is passed by the List component to give our Row the correct dimensions
    return (
      <div style={style} key={index}>
        {violation} {count}
      </div>
    );
};

export default class FilterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date('1970-01-01Z00:00:00:000'),
            endDate: new Date(),
            startDay: 0 /*minutes*/,
            endDay: 24*60 /*minutes*/,
            violationTypes: [],
            locations: [],
            statusTypes: [],
            tickets: [],
        };

        this.handleGetFormattedTime = this.handleGetFormattedTime.bind(this);
    }

    grabTickets() {
        axios.get(`${apiEndpoint}/tickets/query?` +  
                    querystring.stringify({
                        created_after: this.state.startDate.getTime(),
                        created_before: this.state.endDate.getTime(),
                        day_start: this.state.startDay,
                        day_end: this.state.endDay,
                    })
            )
            .catch((error) => {
                console.log('error2');
                console.log(error);
            })
            .then((response) => {
                console.log(response);
                const tickets = response.data.docs;
                this.setState({
                    tickets: tickets,
                });

                let minimumDate = new Date();
                let maximumDate = new Date();

                const locations = new Map();
                const violations = new Map();
                const status = new Map();

                tickets.forEach((ticket) => {
                    locations.set(ticket.location, 1 + (locations.get(ticket.location) || 0));
                    violations.set(ticket.violation, 1 + (locations.get(ticket.violation) || 0));
                    status.set(ticket.status, 1 + (locations.get(ticket.status) || 0));

                    const ticketDate = new Date(ticket.createdAt);
                    minimumDate = minimumDate > ticketDate ? ticketDate : minimumDate;
                    maximumDate = maximumDate < ticketDate ? ticketDate : maximumDate;
                });

                const _violations = [];
                locations.forEach((v,k,m) => {
                    _violations.push([v,k]);
                })

                this.setState({
                    startDate: minimumDate,
                    endDate: maximumDate,
                    violationTypes: _violations,
                });

                console.log(this.state.violationTypes);

                console.log(minimumDate);
                console.log(maximumDate);
            });
    }

    handleStartDateChange = date => {
        if (date > this.state.endDate) {
            return;
        }
        this.setState({
            startDate: date,
        });

        this.grabTickets();
    }
// 1:32PM
    handleEndDateChange = date => {
        if (date < this.state.endDate) {
            return;
        }
        this.setState({
            endDate: date,
        });

        this.grabTickets();
    }

    handleSliderChange = slider => {
        const startDayMinutes = slider[0];
        const endDayMinutes = slider[1];

        this.setState({
            startDay: startDayMinutes,
            endDay: endDayMinutes,
        });

        this.grabTickets();
    }

    handleGetFormattedTime = _minutes => {
        var hours = Math.floor(_minutes / 60);
        var minutes = _minutes % 60;
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    componentDidMount() {
        this.grabTickets();
    }
    
    render() {
        return (
            // <div className="container border border-danger">
            //     <div clasName="row">
            //         <div className="col">
            //             tt
            //         </div>
            //         <div className="col">
            //             tt
            //         </div>
            //         <div className="col border border-primary">
            //             text
            //         </div>
            //         <div className="col border border-primary">
            //             text
            //         </div>
            //     </div>
            // </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                    1 of 3
                    </div>
                    <div class="col">
                        width of 2 other columns
                    </div>
                </div>
            </div>
            // <div>
            //     <DatePicker
            //         selected={this.state.startDate}
            //         onChange={this.handleStartDateChange}
            //     />
            //     <DatePicker
            //         selected={this.state.endDate}
            //         onChange={this.handleEndDateChange}
            //     />
            //     <div class="grid-container slider-grid">
            //         <div class="grid-item slider-date">
            //             <label>{
            //             <label>{this.handleGetFormattedTime(this.state.startDay)}</label>
            //         }</label>
            //         </div>
            //         <div class="grid-item slider-date">
            //         <label>{
            //             <label>{this.handleGetFormattedTime(this.state.endDay)}</label>
            //         }</label>
            //         </div>
            //         <Range class="grid-item slider"
            //             min={0}
            //             max={1440}
            //             allowCross={false}
            //             defaultValue={[0, 1440]}
            //             onChange={this.handleSliderChange}
            //         />
            //     </div>

            //     <List
            //         className="List"
            //         height={500}
            //         itemCount={3}
            //         itemSize={35}
            //         width={300}
            //         itemData={this.state.violationTypes}
            //     >
            //         {Row}
            //     </List>

            // </div>

        );
    }
}