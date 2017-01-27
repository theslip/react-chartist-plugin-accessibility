# react-chartist-plugin-accessibility

Accessibility plugin for [react-chartist](https://github.com/fraserxu/react-chartist).
###### Note: this module is waiting on this [PR](https://github.com/fraserxu/react-chartist/pull/49).

### Installation

```
$ npm i react-chartist-plugin-accessibility
```

### Usage

```javascript
import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'

export default class example extends Component {
  render () {
    const data = {
      labels: ['Jan.', 'Feb.', 'Mar.'],
      series: [
        [2, 3, 4],
        [4, 5, 7]
      ]
    }
    return (
      <ChartistGraph
        data={data}
        type={'Line'}
        responsiveOptions={[
          ['screen and (max-width: 868px)', {
            width: '100%',
            axisX: {
              labelInterpolationFnc: (value, index) => index % 2 === 0 ? value : ''
            }
          }]
        ]}>
        <ChartistAccessibility
          caption={'caption'}
          summary={`summary`}
          seriesHeader={'header'}
        />
      </ChartistGraph>
    )
  }
}
```

Check out [chartist-plugin-accessibility](https://github.com/gionkunz/chartist-plugin-accessibility) for more details.
