import React from 'react';
import { Grid, Container, Header, Segment, Divider, Feed } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from '../../src/actions/actions.js';
import Sidebar from './Sidebar.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
const uuidv4 = require('uuid/v4');

const FeedList = (props) => (
  <div>
    <Grid container style={{paddingLeft: 230}}>
      <Sidebar />
      <Grid.Row style={{paddingTop: 130}}>
        <Header as='h1'>Feed</Header>
          <Divider/>
      </Grid.Row>
      <Divider/>
      <Grid.Row>

        <InfiniteScroll
          height={600}
          next={props.fetchEvents}
          hasMore={true}
          loader={<h4><img href="https://media1.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"></img>Loading...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>No more events to display. Why not host one yourself?</b>
            </p>
          }
        >
          <Feed>
            {props.events.map((event) => {
                return (
                    <Feed.Event key={uuidv4()}>
                        <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/laura.jpg' />
                        <Feed.Content>
                            <Feed.Date>3 days ago</Feed.Date>
                            <Feed.Summary>
                            <a>{event.host}</a> created an event {event.title}
                            </Feed.Summary>
                            <Feed.Extra text>
                            {event.description}
                            </Feed.Extra>
                        </Feed.Content>
                    </Feed.Event>
                  )
            })}
          </Feed>
        </InfiniteScroll>
      </Grid.Row>
    </Grid>

  </div>
)

const mapStateToProps = (state) => ({
  events: state.data.events
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEvents }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
