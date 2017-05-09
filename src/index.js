/*
1. Create new repo not including my YouTube API key and pin it to my profile
2. Include SASS
3. Style this
*/

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import SearchBar from './components/search_bar';

const API_KEY = /* [insert YouTube API key here] */;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('surfboards');

  }

  videoSearch(term){
    YTSearch({key:API_KEY, term:term}, (videos)=>{
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
