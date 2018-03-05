import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { Grid, Divider, Menu, Item, Header, Container, Segment } from 'semantic-ui-react';
import { savePollingInfo } from '../actions/actions.js';
import helper from '../../../lib/serverHelpers.js';
import config from '../../../config.js';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import uuidv4 from 'uuid'

class ConnectedVoterInfoTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pollingInfo: []
    }
  }

  componentWillMount() {
    // create conditional to check if user is a voter -- THAT INFO IS NOT CURRENTLY STORED IN CURRENTUSER INFO
    // if so
      this.fetchPollingStations(this.props.savePollingInfo, '800 Brazos St Suite 500, Austin, TX 78701') //replace with currentUser location -- MUST TAKE IN AN ENTIRE ADDRESS, WHICH IS NOT CURRENTLY STORED IN CURRENTUSER INFO
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
    const numberOfPollingStations = 10;
    const location = this.props.pollingInfo.data ? this.props.pollingInfo.data : undefined;
    const styles = {
      header: {
        fontSize: '16px'
      },
      stations: {
        fontSize: '<14> </14>px'
      },
      locationName: {
        fontSize: '16px',
        fontWeight: 'bold'
      },
      address: {
        fontSize: '14px'
      },
      biggerAndBolder: {
        fontWeight: 'bold',
        fontSize: '17px'
      },
      bold: {
        fontWeight: 'bold'
      }
    }
    return (
      <Container>
      <Menu vertical fluid style={{overflowY: 'scroll', textAlign: 'center'}} size = 'huge'>
      <Menu.Item>
        <Link to='/'>
          <Header as='h2' textAlign='center' size='huge'>
            GRASSROOTS
          </Header>
        </Link>
      </Menu.Item>
      {this.props.pollingInfo.data 
        ? <div> 
            <Menu.Header>
              <span style={ styles.header }>The <span style={ styles.biggerAndBolder }>{ location.election.name }</span> is the next election in <span style={ styles.biggerAndBolder }>{ location.normalizedInput.zip }</span>.</span>
              <p>Voting occurs on <span style={ styles.biggerAndBolder }>{ location.election.electionDay }</span>.</p>
              <p style={ styles.stations }> Here are your <span style={ styles.biggerAndBolder }>{ numberOfPollingStations }</span> closest voting stations:</p>
            </Menu.Header>
            <Divider hidden />
            <Menu.Menu>
              {this.props.pollingInfo.data.pollingLocations.slice(0, numberOfPollingStations).map(location => ( // only takes in x number because there are a lot...
                <Menu.Item key={ uuidv4() }>
                  <Menu.Item style={ styles.locationName }>{ location.address.locationName }</Menu.Item>
                  <Menu.Item style={ styles.address }>Open from <span style={ styles.bold }>{ helper.separateTimes(location.pollingHours)[0] }</span> to <span style={ styles.bold }>{ helper.separateTimes(location.pollingHours)[1].split('(')[0] }</span></Menu.Item>  {/* removes '(Election Day)'*/}
                  <Menu.Item style={ styles.address }>{ location.address.line1 }</Menu.Item>
                  <Menu.Item style={ styles.address }>{ location.address.city}, {location.address.state } { location.address.zip } </Menu.Item>
                  <Divider fitted />
                </Menu.Item>
              ))}  
            </Menu.Menu>
          </div>
        : <div>
            <p>...loading your polling stations</p>
          </div>
      }   
      </Menu>
      </Container>
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
