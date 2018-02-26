import React from 'react';
import { Grid, Container, Header, Segment, Divider, Feed } from 'semantic-ui-react'
import Sidebar from './Sidebar.jsx'
import data from '../testdata.js'

const FeedList = () => (
    <div>
        <Grid container style={{paddingLeft: 230}}>
                <Sidebar />
            <Grid.Row style={{paddingTop: 130}}>
                <Header as='h1'  >Feed</Header>
                <Divider/>
            </Grid.Row>
            <Divider/>
            <Grid.Row >
                <Segment>
                <Feed>
                    <Feed.Event>
                    <Feed.Label image='/assets/images/avatar/small/laura.jpg' />
                    <Feed.Content>
                        <Feed.Date>3 days ago</Feed.Date>
                        <Feed.Summary>
                        <a>Laura Faucet</a> created a post
                        </Feed.Summary>
                        <Feed.Extra text>
                        Have you seen what's going on in Israel? Can you believe it.
                        </Feed.Extra>
                    </Feed.Content>
                    </Feed.Event>
                </Feed>
                </Segment>
            </Grid.Row>
        </Grid>
        
    </div>
)

export default FeedList