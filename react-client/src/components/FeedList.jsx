import React from 'react';
import { Grid, Container, Header, Segment, Divider, Feed } from 'semantic-ui-react'
import Sidebar from './Sidebar.jsx'
import data from '../testdata.js'
const uuidv4 = require('uuid/v4')

const FeedList = () => (
    <div>
        <Grid container style={{paddingLeft: 230}}>
                <Sidebar />
            <Grid.Row style={{paddingTop: 130}}>
                <Header as='h1'>Feed</Header>
                <Divider/>
            </Grid.Row>
            <Divider/>
            <Grid.Row >
                
                <Feed>
                    {data.events.map((event) => {
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
               
            </Grid.Row>
        </Grid>
        
    </div>
)

export default FeedList