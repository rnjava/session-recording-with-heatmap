import React, { Component } from 'react'
import bg from './assets/bg.png';
import SRH from './srh'
import Heatmap from './components/Heatmap';

import './styles.css';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.srh = new SRH({ interval: 250 });
    this.simpleHeatRef = React.createRef();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.srh.start();
    setInterval(async () => {
      const data = await this.srh.getHeatMap();
      this.setState({
        data
      })
    }, 1000);
  }

  renderBlocks() {
    let blocks = [];
    for (let index = 0; index < 500; index++) {
      blocks.push(<div key={index} className="block" />);
    }
    return blocks;
  }

  render() {
    return (
      <div>
        <div className="block-container">
          {this.renderBlocks()}
        </div>
        <img src={bg} alt="bg" />
        <Heatmap
          id={this.state.data.length}
          ref={this.simpleHeatRef}
          width={window.screen.width}
          height={window.screen.height}
          data={this.state.data}
          maxOccurances={20}
          blur={100}
          radius={120} />
      </div >
    )
  }
}