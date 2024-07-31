
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import NewsItem from "./newsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar';
import ScrollToTop from "react-scroll-to-top";

export default function News (props) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [progress, setProgress] = useState(0);
    



//   Function to update the progress bar progress state
//   setProgress = (progress) => {
//     setProgress(progress)
    
//   };

//   Function to capitalize the first letter of string
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const updateNews = async()=> {
    setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&page=${page}&country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
    setLoading(true)
    
    let data = await fetch(url);
    setProgress(30);
    let parsedData = await data.json();
    setProgress(70);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    setProgress(100);
    
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    updateNews();
}, [])
  


  const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&page=${page}&country=${props.country}&apiKey=${props.apiKey}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        // this.setState({loading: true})
        let data = await fetch(url);
        // this.setProgress(30);
        let parsedData = await data.json();
        // this.setProgress(70);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
        
        // this.setProgress(100);
        
    
  };
  

    return (
      <>
      <LoadingBar color='#f11946' height={5}  progress={progress} onLoaderFinished={() => setProgress(0)} />
        <h2 className="text-center">
          NewsMonkey Top-Headlines from {capitalizeFirstLetter(props.category)}
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
          >
        
        <div className="container">
          <div className="row my-3 text-center center">
            {!loading &&
              articles.map((elements) => {
                return (
                  <div className="col-md-4" key={elements.url}>
                    <NewsItem
                      title={elements.title}
                      description={elements.description}
                      imgSrc={elements.urlToImage}
                      source={elements.source.name}
                      author={elements.author}
                      date={elements.publishedAt}
                      newsUrl={elements.url}
                    />
                  </div>
                );
              })}
          </div>
          </div>


        </InfiniteScroll>
        <ScrollToTop  smooth />
      </>
    );
  
}

News.defaultProps = {
    pageSize: 9,
    country: "in",
    category: "general",
  };
News.propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    country: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
  };
