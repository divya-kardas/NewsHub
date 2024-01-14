import React, { Component } from 'react'

export class NewsItems extends Component {

   
  render() {
    let {title, description, imageUrl, url, author, date, source}=this.props;
    return (
      <div className='my-3'>
            <div className="card">
              <div style={{display:'flex',
            justifyContent:"flex-end",
            position:'absolute',
            left:'0'}
            }>
            <span className="badge rounded-pill bg-danger" >{source}</span>
              </div>
            <img src={!imageUrl?"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202312/arctic-clouds-202050835-16x9_0.jpg?VersionId=8cEHNFLlZEUGpAASfrURfvkJ.GCDD9Kp":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'>
                <small className="text-muted">By {author} on {new Date(date).toGMTString()} </small> </p>
                <a href={url} target='_blank' rel="noreferrer" className="btn btm-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
