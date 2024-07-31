import React from 'react'
import { Link } from 'react-router-dom';

export default function NewsItem (props) {
    let {title, description, imgSrc, newsUrl, date, author, source} = props;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }).format(new Date(date));
    return (
      <div>
        <div className="card my-3">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {source} </span>

            <img src={imgSrc?imgSrc:"https://images.hindustantimes.com/img/2024/07/28/1600x900/Prime-Minister-Narendra-Modi---File-_1722169316946.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title?title.slice(0,45): "Title not Found"}</h5>

                <p className="card-text">{description?description.slice(0,88):"Description not found"}...</p>
                <Link href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</Link>
            </div>
              <div className="card-footer text-muted">
                <p> <strong>Author: </strong>     {author?author:"Unknown"}</p>
                <p><strong>Date: </strong>     {formattedDate}</p>
    
  </div>
        </div>
      </div>
    )

}
