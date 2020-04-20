import React, { Component } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

export default class Plots extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total_tickets: 0,
            tickets_by_violation:{
                "expired_tag": 0,
                "no_tag": 0,
                "improper_tag": 0
            },
            tickets_by_location: {
                "garage_a": 0,
                "garage_b": 0
            },
            date: new Date(),
            date_1: new Date(),
            date_2: new Date(),
            date_3: new Date(),
            date_4: new Date(),
            date_5: new Date(),
            day0tix: 0,
            day1tix: 0,
            day2tix: 0,
            day3tix: 0,
            day4tix: 0
        };

    }
    
    grabData() {
        const { tickets_by_location, tickets_by_violation} = this.state;
        // Get initial data for two pie charts
        axios.get((`/tickets/stats`), {withCredentials:true})
        .then(result => {

            if (result.data.tickets_by_location["Garage A"] != undefined)   
                tickets_by_location.garage_a = result.data.tickets_by_location["Garage A"];

            if (result.data.tickets_by_location["Garage B"] != undefined)
                tickets_by_location.garage_b = result.data.tickets_by_location["Garage B"];

            if(result.data.tickets_by_violation["Expired Tag"] != undefined)
                tickets_by_violation.expired_tag = result.data.tickets_by_violation["Expired Tag"];

            if(result.data.tickets_by_violation["No Tag"] != undefined)
                tickets_by_violation.no_tag = result.data.tickets_by_violation["No Tag"];

            if(result.data.tickets_by_violation["Improper Tag"] != undefined)
                tickets_by_violation.improper_tag = result.data.tickets_by_violation["Improper Tag"];

            this.setState({
                total_tickets: result.data.total_tickets,
                // tickets_by_violation: result.data.tickets_by_violation,
                // tickets_by_location: result.data.tickets_by_location
            })
            

        })
        .catch(error => {
            console.log(error)
        })
    }

    // Gets tickets by day for the bar graph
    getTicketsbyDay(dateBefore, dateAfter, day) {

        axios.get((`/tickets/stats`), {
            withCredentials:true,
            params: {
                created_before: dateBefore,
                created_after: dateAfter
            }
        })
        .then(result => {
            if(day == 0){
                this.setState({
                    day0tix: result.data.total_tickets,
                })
            }
            if(day == 1){
                this.setState({
                    day1tix: result.data.total_tickets,
                })
            }
            if(day == 2){
                this.setState({
                    day2tix: result.data.total_tickets,
                })
            }
            if(day == 3){
                this.setState({
                    day3tix: result.data.total_tickets,
                })
            }
            if(day == 4){
                this.setState({
                    day4tix: result.data.total_tickets,
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
         // Set all 4 days, 5th day is for lower bound
            this.state.date_1.setDate(this.state.date.getDate() - 1);
            this.state.date_2.setDate(this.state.date.getDate() - 2);
            this.state.date_3.setDate(this.state.date.getDate() - 3);
            this.state.date_4.setDate(this.state.date.getDate() - 4);
            this.state.date_5.setDate(this.state.date.getDate() - 5);
        
        this.grabData();
        this.getTicketsbyDay(this.state.date.getTime(), this.state.date_1.getTime(), 0);
        this.getTicketsbyDay(this.state.date_1.getTime(), this.state.date_2.getTime(), 1);
        this.getTicketsbyDay(this.state.date_2.getTime(), this.state.date_3.getTime(), 2);
        this.getTicketsbyDay(this.state.date_3.getTime(), this.state.date_4.getTime(), 3);
        this.getTicketsbyDay(this.state.date_4.getTime(), this.state.date_5.getTime(), 4);
    }




    render() {
        const { 
            tickets_by_location, 
            tickets_by_violation, 
            date, date_1, date_2, date_3, date_4, 
            day0tix, day1tix, day2tix, day3tix, day4tix,
        } = this.state;
        var month = (date.getMonth() + 1).toString();
        return (    
            
            <div className="container pt-5 mt-2">

                <Plot   // Violation per location pie chart
                    data={[
                    {
                      values: [tickets_by_location.garage_a, tickets_by_location.garage_b],
                      labels:['Garage A', 'Garage B'],
                      type: 'pie'
                    }
                    ]}
                    layout={ {width: 360, height: 360, title: 'Violations Per Location'} }
                />

                <Plot   // Violation type pie chart
                    data={[
                    {
                      values: [tickets_by_violation.expired_tag, tickets_by_violation.no_tag, tickets_by_violation.improper_tag],
                      labels:['Expired Tag', 'No Tag', 'Improper Tag'],
                      type: 'pie'
                    }
                    ]}
                    layout={ {width: 360, height: 360, title: 'Violation Type Ratio'} }
                />
                <Plot   // Violations per day bar graph
                    data={[
                    {
                      x: [month +'/' + date_4.getDate().toString(), month +'/' + date_3.getDate().toString(), month +'/' + date_2.getDate().toString(),month +'/' + date_1.getDate().toString(), month +'/' + date.getDate().toString()],
                      y:[day4tix, day3tix, day2tix, day1tix, day0tix],
                      type: 'bar'
                    }
                    ]}
                    layout={ {width: 360, height: 360, title: 'Violations Per Day', xaxis:{title:'Day'}, yaxis:{title:'Violations'}} }
                    
                />
            </div>
        )
    }
}
