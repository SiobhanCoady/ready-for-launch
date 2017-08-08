import React from 'react';
import { getLaunches } from '../utilities/requests';

class Launches extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      launches: []
    }
  }

  componentDidMount() {
    getLaunches()
      .then((launches) => {
        console.log(launches);
        this.setState({
          launches: launches
        });
      });
  }

  _renderLaunches() {
    return this.state.launches.map((launch) => {
      return (
        <div className="Launch" key={ launch.id }>
          <p>{ launch.name }</p>
          <p>{ launch.agency }</p>
          <p>{ launch.location }</p>
          <p>{ launch.time }</p>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Launches">
        <h2>Upcoming Launches</h2>
        { this._renderLaunches() }
      </div>
    );
  }

};

export default Launches;
