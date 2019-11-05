import React, { Component } from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios';


export default class GlobalStat extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           average: null
        }
      }
      
      componentDidMount() {
        axios.get(`https://api-akson.000webhostapp.com/scoreAvg`)
          .then(res => {        
            this.setState({ average: Number(res.data.average) });
            console.log("type:",typeof Number(res.data.average));
          })
      }
    
    render() {
        
        
        return (
            <div>
                <Chart
                          width={"400px"}
                          height={"400px"}
                          chartType="ColumnChart"
                          loader={<div>Loading Chart</div>}
                          data={[
                            ["Kriteria", "Poin", { role: "style" }, { role: "annotation" }],
                            ["Rata-rata", this.state.average, "#37883d", this.state.average],
                            ["Baru Saja", 25, "#F3B431", 25]
                          ]}
                          options={{
                            // Material design options                            
                            bar: { groupWidth: "50%" },
                            hAxis: {
                              textStyle: {
                                color: "#1D1D1D",
                                fontName: "Carter One"
                              }
                            },
                            vAxis: {
                              textStyle: {
                                color: "#1D1D1D",
                                fontName: "Carter One"
                              }
                            },
                            annotation: {
                              textStyle: {
                                color: "#FFFFFF",
                                fontName: "Carter One"
                              }
                            },
                            legend: { position: "none" }
                          }}
                          // For tests
                          
                        />
            </div>
        )
    }
}
