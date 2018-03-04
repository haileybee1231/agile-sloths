import React from 'react';
import { Grid, Container, Button, Header, Segment, Divider, Feed } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEventsAction, getUser } from '../../src/actions/actions.js';
import Sidebar from './Sidebar.jsx';
import EventForm from './EventForm.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import $ from 'jquery';
const uuidv4 = require('uuid/v4');

class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchEvents();
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
    let numOfEvents;
    this.props.events ?
    numOfEvents = this.props.events.length - 1 :
    numOfEvents = 10;
    $.ajax({
      type: 'GET',
      url: `/api/events?${numOfEvents}`,
      success: newEvents => {
        this.props.fetchEventsAction(JSON.parse(newEvents));
      },
      error: (err) => {
        console.error('Could not fetch events: ', err);
      }
    });
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
              hasMore={true}
              loader={<h4><img href="https://media1.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"></img>Loading...</h4>}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>No more events to display. Why not host one yourself?</b>
                </p>
              }
              >
              <Feed>
                {this.props.events && this.props.events.length > 0 ?
                  this.props.events.map((event) => {
                  return (
                    <Feed.Event key={uuidv4()}>
                      <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/laura.jpg' />
                      <Feed.Content>
                        <Feed.Date>3 days ago</Feed.Date>
                        <Feed.Summary>
                          <a onClick={this.handleClick.bind(this)}>{`${event.firstname} ${event.lastname}`}</a> created an event: {event.title}
                          </Feed.Summary>
                          <Feed.Extra text>
                            {event.description}
                          </Feed.Extra>
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
  events: state.data.events
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEventsAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
