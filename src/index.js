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

  stripAtrributes (data) {
    const { series, labels } = data
    const dataIsObj = series.every((element) => typeof element === 'object')
    const dataIsInt = series.every((element) => !isNaN(element))
    const dataIsString = series.every((element) => typeof element === 'string')
    return {
      labels,
      series: [series.map((s) => {
        if (dataIsObj && s.value) {
          return s.value
        } else if (dataIsInt || dataIsString) {
          return s
        }
      })]
    }
  }

  render () {
    const { data, caption, seriesHeader, summary, elementId, visuallyHiddenStyles } = this.props
    const multiPoint = data.series.length > 1
    const _data = this.stripAtrributes(data)
    return (
      <div style={visuallyHiddenStyles || {position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden'}} id={elementId || this.getId()}>
        <table summary={summary}>
          <caption>{caption || 'A  graphical chart'}</caption>
             <tbody>
                <tr>
                  <th scope='col' role='columnheader'>{seriesHeader}</th>
                  {_data.labels.map((l, i) => <th key={i} scope='col' role='columnheader'>{l}</th>)}
                </tr>
                {multiPoint &&
                  _data.series.map((s, i) => {
                    return (
                      <tr key={i}>
                        <th scope='row' role='rowheader'>{`${i + 1}. Series`}</th>
                        {s.map((ss, ii) => <td key={ii}>{this.valueTransform(ss)}</td>)}
                      </tr>
                    )
                  })
                }
                {!multiPoint &&
                  <tr>
                     <th scope='row' role='rowheader'>1. Series</th>
                     {console.log(_data.series)}
                     {_data.series[0].map((s, i) => {
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
