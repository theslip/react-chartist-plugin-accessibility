# react-chartist-plugin-accessibility

Accessibility plugin for [react-chartist](https://github.com/fraserxu/react-chartist).

### Installation

```
$ npm i react-chartist-plugin-accessibility --save
```

### Usage

```javascript
import React, { Component } from 'react'
import ChartistGraph from 'react-chartist'
import ChartistAccessibility from 'react-chartist-plugin-accessibility'

export default class example extends Component {
  render () {
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [29, 38, 69, 28, 18, 49, 33, 28, 28, 23, 93, 27, 34],
        [48, 39, 47, 19, 43, 50, 85, 94, 29, 93, 46, 67, 60]
      ]
    }
    return (
      <ChartistGraph
        data={data}
        type={'Line'}
        options={{
          axisX: {
            labelInterpolationFnc: (value, index) => `${value}.`
          }
        }}
        responsiveOptions={[
          ['screen and (max-width: 768px)', {
            width: '100%',
            axisX: {
              labelInterpolationFnc: (value, index) => index % 2 === 0 ? value : ''
            }
          }]
        ]}>
        <ChartistAccessibility
          caption={'caption'}
          summary={'summary'}
          seriesHeader={'header'}
        />
      </ChartistGraph>
    )
  }
}

```

Check out [chartist-plugin-accessibility](https://github.com/gionkunz/chartist-plugin-accessibility) for more details.

[npm-url]: https://www.npmjs.com/package/react-chartist-plugin-accessibility
