import React, { Component } from 'react'
import uuid from 'uuid'

export default class ChartistAccessibility extends Component {
  getId () {
    const { elementId } = this.props
    return `ct-accessibility-table-${elementId || uuid.v4()}`
  }

  valueTransform (value) {
    const { valueTransform } = this.props
    const _valueTransform = typeof valueTransform === 'function' ? valueTransform : (value) => value
    return `${_valueTransform(value)}`
  }

  componentDidMount () {
    this.Chartist = require('chartist')
  }

  stripAtrributes (data) {
    const { series, labels } = data
    const isMultiDimensional = series.every((element) => Array.isArray(element))
    const _series = series.map((s) => {
      if (s.value) {
        return s.value
      } else {
        return s
      }
    })
    return {
      labels,
      series: isMultiDimensional ? _series : [_series]
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
                  <th scope='col'>{seriesHeader}</th>
                  {_data.labels.map((l, i) => <th key={i} scope='col'>{l}</th>)}
                </tr>
                {multiPoint &&
                  _data.series.map((s, i) => {
                    return (
                      <tr key={i}>
                        <th scope='row'>{`${i + 1}. Series`}</th>
                        {s.map((ss, ii) => <td key={ii}>{this.valueTransform(ss)}</td>)}
                      </tr>
                    )
                  })
                }
                {!multiPoint &&
                  <tr>
                     <th scope='row'>1. Series</th>
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
