import React from 'react';
import { Tab, Grid, Header, Container, Item } from 'semantic-ui-react';
import data from '../testdata.js'



const panes = [
	{ menuItem: 'Events', 
	render: () => <Tab.Pane attached={true}>

	</Tab.Pane>
	},
	{ menuItem: 'Election Info',
	render: () => <Tab.Pane attached={true}>

	</Tab.Pane>
	},
	{ menuItem: 'Followers',
	render: () => <Tab.Pane attached={true}>

	</Tab.Pane>
	}
]

const TabMenu = () => (
	<Tab menu={{ pointing: true }} panes={panes} />
)

export default TabMenu

// const EventsList = (props) => (
// 	<Item.Group>
// 		{this.props.events.map(event => (
// 			<Item> 
// 				<Item.Content>
// 					<Item.Header as='a'> {event.title} </Item.Header> 
// 					<Item.Meta> {event.date}, {event.time} </Item.Meta>
// 					<Item.Extra> {event.location} </Item.Extra>
// 					<Item.Description> {event.description} </Item.Description>
// 				</Item.Content>
// 			</Item>
// 			))}
// 	</Item.Group>

// );

// export default EventsList;