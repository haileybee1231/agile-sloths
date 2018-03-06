import React from 'react';
import { Grid, Container, Button, Header, Segment, Divider, Feed } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEventsAction, getUser, setUser, setCandidateFollowers } from '../../src/actions/actions.js';
import Sidebar from './Sidebar.jsx';
import EventForm from './EventForm.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import $ from 'jquery';
const uuidv4 = require('uuid/v4');

class FeedList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moreEvents: false // renders loading message vs end of events message in feed
    }
    this.fetchMoreEvents = this.fetchMoreEvents.bind(this);
  }

  componentDidMount() { // on component mount,
    this.fetchEvents(); // fetch events starting at 0
    this.eventTimer = setInterval(() => { // then start a time to grab more every 5 seconds
      this.fetchMoreEvents()
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.eventTimer); // if you click away from feed page, stop automatic update
  }

  handleClick(e) {
    let name = e.target.innerHTML;
    $.ajax({
      type: 'GET',
      url: `user/${name}`,
      success: user => {
        // since voter names can be clicked here too, we need to either make it so they don't lead anywhere or create a voter page that maybe shows just their events and favorites?
        this.props.history.push(`/user${name}`);
      }
    })
  }

  fetchEvents() {
    !this.props.events || this.props.events.length === 0 ? // should only fire when there are no events in memory on client
    $.ajax({
      type: 'GET',
      url: `/api/events?0`,
      success: newEvents => {
        newEvents = JSON.parse(newEvents);
        if (newEvents.fetchedCount < 10) { // if less than 10 events come back, it means there are currently no more messages, so feed should display that it has reached the end
          this.setState({
            moreEvents: false
          })
        } else {
          this.setState({
            moreEvents: true
          })
        }
        let eventIds = []; // event id array used to make sure duplicate arrays don't end up in feed
        if (newEvents && newEvents.events.length > 0) {
          newEvents.events.forEach(event => {
            eventIds.push(event.id);
            event.time = event.time.slice(0, event.time.length - 3); // parse time as in event card
            if (+event.time.substr(0, 2) > 12) {
              event.time = `${+event.time.slice(0, 2) - 12}:${event.time.slice(3, 5)} PM`
            } else if (event.time.substr(0, 2) === '00') {
              event.time = `12:${event.time.slice(3, 5)} AM`
            } else {
              event.time = `${+event.time.slice(0, 2)}:${event.time.slice(3, 5)} AM`
            }
          })
        }
        this.props.fetchEventsAction(newEvents.events, eventIds, newEvents.fetchedCount); // finally, send parsed events to action to be set to state along with eventIds array and fetchcount
      },
      error: (err) => {
        console.error('Could not fetch events: ', err);
      }
    }) : null
  }

  fetchMoreEvents() { // does exactly the same as above, but fires when there already ARE events in memory. This way, you can end up with infinite scroll, as this fires when you scroll down in addition to every 5 seconds
    this.props.events && this.props.events.length > 0 ?
    $.ajax({
      type: 'GET',
      url: `/api/events?${this.props.events.length}`,
      success: newEvents => {
        newEvents = JSON.parse(newEvents);
        if (newEvents.fetchedCount < 10) {
          this.setState({
            moreEvents: false
          })
        } else {
          this.setState({
            moreEvents: true
          })
        }
        let eventIds = [];
        if (newEvents && newEvents.events.length > 0) {
          newEvents.events.forEach(event => {
            eventIds.push(event.id)
            event.time = event.time.slice(0, event.time.length - 3);
            if (+event.time.substr(0, 2) > 12) {
              event.time = `${+event.time.slice(0, 2) - 12}:${event.time.slice(3, 5)} PM`
            } else if (event.time.substr(0, 2) === '00') {
              event.time = `12:${event.time.slice(3, 5)} AM`
            } else {
              event.time = `${+event.time.slice(0, 2)}:${event.time.slice(3, 5)} AM`
            }
          })
        }
        this.props.fetchEventsAction(newEvents.events, eventIds, newEvents.fetchedCount);
      },
      error: (err) => {
        console.error('Could not fetch events: ', err);
      }
    }) : null;
  }

  handleClick(e){ // visitor can access user pages by clicking event names in feed
    let name = e.target.innerHTML;
    $.ajax({
      type: 'GET',
      url: `/api/user?${name}`,
      success: user => {
        this.props.setUser(JSON.parse(user));
        this.props.history.push(`/user?${name}`);
      },
      error: err => {
        console.error('Error retrieving user: ', err);
      }
    })
    $.ajax({
      type: 'GET',
      url: `/api/candidatefollowers?${name}`,
      success: followers => {
        this.props.setCandidateFollowers(followers);
      }
    })
  }

  render() {
    return (
      <div>
        <Grid container style={{paddingLeft: 230}}>
          <Sidebar />
          <Grid.Row style={{paddingTop: 130}}>
            <Grid.Column floated='left' width={3}>
              <Header as='h1'>Feed</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <EventForm/>
            </Grid.Column>
            <Divider/>
          </Grid.Row>
          <Divider/>
          <Grid.Row>

            <InfiniteScroll
              height={600}
              next={this.fetchEvents.bind(this)}
              hasMore={this.state.moreEvents}
              loader={<h4><img href="https://media1.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"></img>Loading...</h4>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>No more events to display. Why not host one yourself?</b>
                </p>
              }
              >
              <Feed style={{ width: 900 }}>
                {this.props.events && this.props.events.length > 0 ?
                  this.props.events.slice().reverse().map((event) => {
                  return (
                    <Feed.Event key={uuidv4()}>
                      <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/laura.jpg' />
                      <Feed.Content>
                        <Feed.Date>{moment(event.created).fromNow()} ago</Feed.Date>
                        <Feed.Summary>
                          <a onClick={this.handleClick.bind(this)}>{`${event.firstname} ${event.lastname}`}</a> created an event: {event.title}
                          </Feed.Summary>
                          <Feed.Extra text>
                            {event.description}
                          </Feed.Extra>
                          <Feed.Extra text>
                            {moment(event.date).format('MMMM Do, YYYY')} at {event.time}
                          </Feed.Extra>
                          <Feed.Extra text>
                            <span style={{fontWeight: 'bold'}}>Where:</span> {`${event.streetAddress}, ${event.city}, ${event.state}`}
                          </Feed.Extra>
                          <Feed.Extra style={{ paddingRight: 50, paddingBottom: 35 }}>
                            <Button positive size='mini' floated='right' >
                              Attend Event
                            </Button>
                          </Feed.Extra>
                          <Divider/>
                        </Feed.Content>
                      </Feed.Event>
                    )
                  }) : <h2>No Events To Display. Why Not Host One?</h2>}
                </Feed>
              </InfiniteScroll>
            </Grid.Row>
          </Grid>

        </div>
      )
    }
  }

const mapStateToProps = (state) => ({
  events: state.data.events,
  eventIds: state.data.eventIds,
  fetchedCount: state.data.fetchedCount
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEventsAction, setUser, setCandidateFollowers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
