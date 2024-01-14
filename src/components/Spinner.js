import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
         <img src={loading} className='my-3'  height='50px' width='50px' alt='loading'/>
      </div>
    )
  }
}
