import React, { Component, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import DatePicker from "react-datepicker";
import Plot from 'react-plotly.js';
import { Range } from 'rc-slider';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-virtualized/styles.css';
import 'rc-slider/assets/index.css';
import './filter.css'

const querystring = require('querystring');
const apiEndpoint = 'http://localhost:8080';

/**
* Converts a day number to a string.
*
* @param {Number} dayIndex
* @return {String} Returns day as string
*/
function dayOfWeekAsString(dayIndex) {
    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
  }

export default class FilterView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            init: true,
            startDate: new Date('1970-01-01Z00:00:00:000'),
            endDate: new Date(),
            startDay: 0 /*minutes*/,
            endDay: 24*60 /*minutes*/,
            violationTypes: [],
            locations: [],
            statusTypes: [],
            tickets: [],
            violationPerDay: [],
            violationPerType: [],
            violationPerLocation: [],
            violationPerStatus: [],
        };

        this.handleGetFormattedTime = this.handleGetFormattedTime.bind(this);
    }

    grabTickets() {
        axios.get(`${apiEndpoint}/tickets/query_limited?` +  
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
                if (!response) {
                    return;
                }
                const tickets = response.data.docs;
                if (!tickets) {
                    console.log('ohoh');
                    return;
                }
                this.setState({
                    tickets: tickets,
                });

                let minimumDate = new Date();
                let maximumDate = new Date();

                const locations = new Map();
                const violations = new Map();
                const status = new Map();

                const fillViolation = (object, object2, object3, fun) => {
                    let index = object2[object3];
                    if (fun) {
                        index = fun(object2[object3]);
                    }
                    if (!object[index]) {
                        object[index] = [];
                    }

                    object[index].push(object2);
                }
                
                const violationPerLocation = {};
                const violationPerType = {};
                const violationPerDay = {};
                const violationPerStatus = {};
                tickets.forEach((ticket) => {

                    fillViolation(violationPerLocation, ticket, 'location');
                    fillViolation(violationPerDay, ticket, 'createdAt', (date) => new Date(date).getDay());
                    fillViolation(violationPerType, ticket, 'violation');
                    fillViolation(violationPerStatus, ticket, 'status');


                    if (!violationPerLocation[ticket.location]) {
                        violationPerLocation[ticket.location] = [];
                    }

                    violationPerLocation[ticket.location].push(ticket);

                    locations.set(ticket.location, 1 + (locations.get(ticket.location) || 0));
                    violations.set(ticket.violation, 1 + (violations.get(ticket.violation) || 0));
                    status.set(ticket.status, 1 + (status.get(ticket.status) || 0));

                    const ticketDate = new Date(ticket.createdAt);
                    minimumDate = minimumDate > ticketDate ? ticketDate : minimumDate;
                    maximumDate = maximumDate < ticketDate ? ticketDate : maximumDate;
                });

                const _violations = [];
                violations.forEach((v,k,m) => {
                    _violations.push([v,k]);
                })

                const _locations = [];
                locations.forEach((v,k,m) => {
                    _locations.push([v,k]);
                })

                if (this.state.init) {
                    this.setState({
                        startDate: minimumDate,
                        endDate: maximumDate,
                        init: false,
                    });
                }

                this.setState({
                    violationTypes: _violations,
                    locations: _locations,
                    violationPerLocation: violationPerLocation,
                    violationPerType: violationPerType,
                    violationPerStatus: violationPerStatus,
                    violationPerDay: violationPerDay,
                });

                console.log(violationPerDay);
                console.log(Object.values(violationPerLocation).map(violationArray => violationArray.length));
            });
    }

    handleStartDateChange = date => {
        if (date > this.state.endDate) {
            return;
        }
        this.setState({
            startDate: date,
        }, this.grabTickets());
    }
// 1:32PM
    handleEndDateChange = date => {
        if (date < this.state.startDate) {
            return;
        }
        this.setState({
            endDate: date,
        }, this.grabTickets());
    }

    handleSliderChange = slider => {
        const startDayMinutes = slider[0];
        const endDayMinutes = slider[1];

        this.setState({
            startDay: startDayMinutes,
            endDay: endDayMinutes,
        })
    }

    handleSliderDoneChange = slider => {
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

    renderViolationDivs() {
        const divs = [];
        this.state.violationTypes.forEach(violation => {
            divs.push(
                <div>
                    <div class="row">
                        <div class="col-3">
                            <input type="checkbox"/>
                        </div>
                        <div class="col-6">
                            <label>{violation[1]}</label>
                        </div>
                        <div class="col-2">
                            <label>{violation[0]}</label>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        });

        return divs;
    }

    renderLocationDivs() {
        const divs = [];
        this.state.locations.forEach(locations => {
            divs.push(
                <div>
                    <div class="row">
                        <div class="col-3">
                            <input type="checkbox"/>
                        </div>
                        <div class="col-6">
                            <label>{locations[1]}</label>
                        </div>
                        <div class="col-2">
                            <label>{locations[0]}</label>
                        </div>
                    </div>
                    <hr/>
                </div>
            )
        });

        return divs;
    }

    componentDidMount() {
        this.grabTickets();
    }
    
    render() {

        const { 
            violationPerDay, 
            violationPerLocation,
            violationPerType,
            date, date_1, date_2, date_3, date_4, 
            day0tix, day1tix, day2tix, day3tix, day4tix,
        } = this.state;
        //var month = (date.getMonth() + 1).toString();
        
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


            <div>

                <Plot   // Violation per location pie chart
                    data={[
                    {
                        values: Object.values(violationPerLocation).map(violationArray => violationArray.length),
                        labels: Object.keys(violationPerLocation),
                      type: 'pie'
                    }
                    ]}
                    layout={ {width: 380, height: 380, title: 'Violations Per Location'} }

                />
                <Plot   // Violation type pie chart
                    data={[
                        {
                            values: Object.values(violationPerType).map(violationArray => violationArray.length),
                            labels: Object.keys(violationPerType),
                            type: 'pie'
                    }
                    ]}
                    layout={ {width: 380, height: 380, title: 'Violation Type Ratio'} }

                />
                <Plot   // Violations per day bar graph
                    data={[
                        {
                            x: Object.keys(violationPerDay).map(intDay => dayOfWeekAsString(intDay)),
                            y: Object.values(violationPerDay).map(violationArray => violationArray.length),
                            type: 'bar'
                    }
                    ]}
                    layout={ {width: 380, height: 380, title: 'Violations Per Day', xaxis:{title:'Day'}, yaxis:{title:'Violations'}} }

                    
                />

                <div class="container filter-container">
                    <div class="top-padding"/>
                    <div class="row row-label">
                        Date:
                    </div>
                    <div class="row">
                        <div class="col-6 text-center">
                            <label>Start Day</label>
                            <div>
                                <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                />

                            </div>
                        </div>
                        <div class="col-6 text-center">
                        <label>End Day</label>

                            <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        />
                        </div>
                    </div>

                    <hr/>

                    <div class="row row-label">
                        Time of Day:
                    </div>
                    <div class="row">
                        <div class="col-6 text-center">
                        <label>{
                            <label>{this.handleGetFormattedTime(this.state.startDay)}</label>
                        }</label>
                        </div>
                        <div class="col-6 text-center">
                        <label>{
                            <label>{this.handleGetFormattedTime(this.state.endDay)}</label>
                        }</label>
                        </div>
                    </div>

                    <div class="row range">
                        <div class="col-1"></div>
                        <div class="col-10">
                        <Range
                            min={0}
                            max={1440}
                            allowCross={false}
                            defaultValue={[0, 1440]}
                            onChange={this.handleSliderChange}
                            onAfterChange={this.handleSliderDoneChange}
                        />
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <hr/>

                    <div class="row row-label">
                        Violation Types:
                    </div>
                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10 row-container">
                            <hr/>
                            {this.renderViolationDivs()}
                        </div>
                        <div class="col-1"></div>
                    </div>

                    <hr/>

                    <div class="row row-label">
                        Locations:
                    </div>

                    <div class="row">
                        <div class="col-1"></div>
                        <div class="col-10 row-container">
                            <hr/>
                            {this.renderLocationDivs()}
                        </div>
                        <div class="col-1"></div>
                    </div>
                    <div class="row row-label">
                        
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

            //         </div>

            //     </div>



            // </div>

        );
    }
}