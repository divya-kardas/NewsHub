import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6df0fc2c5625448090cf8283f710ab3e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);

    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
  }
  // handleNextClick= async()=>{
  //     console.log("next");
  //     // if(! (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

  //     // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6df0fc2c5625448090cf8283f710ab3e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //     // this.setState({loading:true});
  //     // let data= await fetch(url);
  //     // let parseddata= await data.json();

  //     // this.setState({
  //     //     page:this.state.page+1,
  //     //     articles:parseddata.articles,
  //     //     loading:false
  //     // })

  //    this.setState({page:this.state.page+1})
  //    this.updateNews();

  // }

  // handlePrevClick= async()=>{
  //     console.log("per");
  //         // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6df0fc2c5625448090cf8283f710ab3e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  //         // this.setState({loading:true});
  //         // let data= await fetch(url);
  //         // let parseddata= await data.json();

  //         // this.setState({
  //         //     page:this.state.page-1,
  //         //     articles:parseddata.articles,
  //         //     loading:false
  //     // })
  //     this.setState({page:this.state.page-1})
  //     this.updateNews();

  // }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsHub`;
  }
  async componentDidMount() {
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6df0fc2c5625448090cf8283f710ab3e&page=1&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});

    //     let data= await fetch(url);
    //     let parseddata= await data.json();
    //     console.log(parseddata);

    //     this.setState({articles:parseddata.articles,
    //     totalResults:parseddata.totalResults,
    //     loading:false
    // })

    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6df0fc2c5625448090cf8283f710ab3e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);

    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
      loading:false
    });
  };
  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "30px" }}>
          {" "}
          NewsHub - Top {this.capitalizeFirstLetter(
            this.props.category
          )}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
        //   scrollableTarget="scrollableDiv"
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      url={element.url}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Pervious</button>
       <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

       </div> */}
      </>
    );
  }
}

export default News;
