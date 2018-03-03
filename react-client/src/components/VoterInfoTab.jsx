import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { savePollingInfo } from '../actions/actions.js';
import helper from '../../../lib/serverHelpers.js';
import config from '../../../config.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios'

class ConnectedVoterInfoTab extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // create conditional to check if user is a voter
    // if so
      this.fetchPollingStations(this.props.savePollingInfo, '800 Brazos St Suite 500, Austin, TX 78701') //replace with currentUser location
    // else 
    // do nothing
  }

  fetchPollingStations(dispatch, address) {
    let location = helper.encodeRequest(address);
    axios.get(`https://www.googleapis.com/civicinfo/v2/voterinfo?key=${config.GOOGLE_API_KEY}&address=${location}`)
      .then(function (response) {
        dispatch(response)
        console.log('Polling info successfully updated', response.data)
      })
      .catch(function (error) {
        console.log('There was an error retrieving the polling information from the API', error)
      })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {/* {this.props.pollingInfo.map(el => (
          el
        ))} */}
      </div>
    )
  }
}

let mapDispatchToProps = dispatch => {
  return { savePollingInfo: results => dispatch(savePollingInfo(results)) };
}

let mapStateToProps = state => {
  return {
    pollingInfo: state.data.pollingInfo,
    currentUser: state.data.currentUser
  };
}

const VoterInfoTab = connect(mapStateToProps, mapDispatchToProps)(withRouter(ConnectedVoterInfoTab));
export default VoterInfoTab;