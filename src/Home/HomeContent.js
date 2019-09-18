import React, {Component} from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

class HomeContent extends Component {

  render() {
    return(
      <div>
        <div id="home">
          <p>Hi! My name is Cecil, and I am a Full Stack Web Developer. I started to learn coding on my own, and then after a couple of years of teaching myself, I went to the Devpoint Labs coding bootcamp.</p>
          <p>I have also participated in several game jams where I've made many types of games.</p>
          <h2>Social</h2>
          <TwitterTimelineEmbed sourceType="profile" screenName="kitsune_76" options={{width: 400, height: 300}} />
          <ReactTwitchEmbedVideo channel="KiTsuNe_23"/>
        </div>
      </div>
    )
  }
}

export default HomeContent;