import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { saveCandidateInfo } from '../actions/actions.js';
import helper from '../../../lib/serverHelpers.js';
import config from '../../../config.js';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import uuidv1 from 'uuid'

class ConnectedCandidateInfoTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      candidateInfo: []
    }
  }

  componentWillMount() {
    // create conditional to check if user is a voter
    // if so
    this.fetchCandidateInfo(this.props.saveCandidateInfo, window.localStorage.zipCode || '78701') //replace with currentUser zip (can take any address though)
    // else
    // do nothing
  }

  fetchCandidateInfo(dispatch, address) {
    let location = helper.encodeRequest(address);
    axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${config.GOOGLE_API_KEY}&address=${location}&levels=administrativeArea1`)
      .then(function (response) {
        dispatch(response)
        console.log('Candidate info successfully updated', response)
      })
      .catch(function (error) {
        console.log('There was an error retrieving the candidate information from the API', error)
      })
  }

  render() {
    // const searchedLocation = this.props.candidateInfo.data.normalizedInput; // returning undefined
    const styles = {
      header: {
        fontSize: '24px'
      },
      name: {
        fontSize: '16px'
      },
      hours: {
        fontSize: '13px'
      },
      address: {
        fontSize: '12px'
      }
    }
    return (
      <div>
        {/* <p style={styles.header}>Representatives in { this.props.candidateInfo.data.normalizedInput.city }, { this.props.candidateInfo.data.normalizedInput.state }</p> // returning undefined */}
        <p style={ styles.header }>Other Representatives in Your Area</p>{/* would rather specify based on searched location like above */}
        <Grid divided='vertically'>
          {this.props.candidateInfo && // checks to see if there is candidateInfo object
            this.props.candidateInfo.data && // checks if that object has  officials before iterating
            this.props.candidateInfo.data.officials.map(candidate => ( // takes the first 10 (because there are a lot)
              <Grid.Row columns={1} key={uuidv1()}>
                <Grid.Column>
                  <div>
                    <p style={ styles.name }>{ candidate.name } | { candidate.party }</p>
                    <p style={ styles.address }>{ candidate.address[0].line1 }</p> {/* refactor to accommodate an array of addresses */}
                    <p style={ styles.address }>{ candidate.address[0].city }, { candidate.address[0].state } </p>
                    <p style={ styles.address }>{ candidate.address[0].zip }</p>
                  </div>
                </Grid.Column>
              </Grid.Row>
            ))}
        </Grid>
      </div>
    )
  }
}

let mapDispatchToProps = dispatch => {
  return { saveCandidateInfo: results => dispatch(saveCandidateInfo(results)) };
}

let mapStateToProps = state => {
  return {
    candidateInfo: state.data.candidateInfo,
    currentUser: state.data.currentUser
  };
}

const CandidateInfoTab = connect(mapStateToProps, mapDispatchToProps)(withRouter(ConnectedCandidateInfoTab));
export default CandidateInfoTab;
