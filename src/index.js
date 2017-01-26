import React, { Component } from 'react'
import Chartist from 'chartist'
import uuid from 'node-uuid'

export default class ChartistAccessibility extends Component {
  getId () {
    const { elementId } = this.props
    return `ct-accessibility-table-${elementId || uuid.v4()}`
  }

  valueTransform (value) {
    const { valueTransform } = this.props
    const _valueTransform = typeof valueTransform === 'function' ? valueTransform : Chartist.noop
    return `${_valueTransform(value)}`
  }

  componentDidMount () {
    const { data } = this.props
    this.multiPoint = data.series.length > 1
  }

  render () {
    const { data, caption, seriesHeader, summary, elementId, visuallyHiddenStyles } = this.props
    console.log(data)
    return (
      <div style={visuallyHiddenStyles || {position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden'}} id={elementId || this.getId()}>
        <table summary={summary}>
          <caption>{caption || 'A  graphical chart'}</caption>
             <tbody>
                <tr>
                  <th scope='col' role='columnheader'>{seriesHeader}</th>
                  {data.labels.map((l, i) => <th key={i} scope='col' role='columnheader'>{l}</th>)}
                </tr>
                {this.multiPoint &&
                  data.series.map((s, i) => {
                    return (
                      <tr key={i}>
                        <th scope='row' role='rowheader'>{`${i + 1}. Series`}</th>
                        {s.map((ss, ii) => <td key={ii}>{this.valueTransform(ss)}</td>)}
                      </tr>
                    )
                  })
                }
                {!this.multiPoint &&
                  <tr>
                     <th scope='row' role='rowheader'>1. Series</th>
                     {data.series[0].map((s, i) => {
                       console.log(s, this.valueTransform(s))
                       return (
                         <td key={i}>{this.valueTransform(s)}</td>
                       )
                     })}
                  </tr>
                }
             </tbody>
        </table>
      </div>
    )
  }
}
