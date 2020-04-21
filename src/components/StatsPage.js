import React, { Component } from 'react'
import Main from './Dashboard/FilterBar';
import Plot from './Plots'

export default class StatsPage extends Component {
    render() {
        return (
            <div>
                <div className="float-left pt-4">
                    <Main/>
                </div>
                <div className="row pt-5 pl-5">
                    <Plot/>
                </div>
            </div>
        )
    }
}
