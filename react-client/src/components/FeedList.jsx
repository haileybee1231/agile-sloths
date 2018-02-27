import React from 'react';
import { Grid, Container, Header, Segment, Divider, Feed } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidebar from './Sidebar.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
const uuidv4 = require('uuid/v4');

const refresh = () => {
}
const fetchData = () => {
}

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
                pullDownToRefresh
                pullDownToRefreshContent={
                  <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                  <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                }
                refreshFunction={refresh}
                height={600}
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                  </p>
              }>
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

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
