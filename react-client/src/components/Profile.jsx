import React from 'react';

import { Icon, List, Card, Grid, Header, Container, Image, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sidebar from './Sidebar.jsx';
import TabMenu from './Tabs.jsx'

const uuidv4 = require('uuid/v4');

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			placeholder: []
		}
	}

	render() {
		const user = this.props.selectedUser.user;
		return (
			<Container style={{paddingLeft: 210}}>
				<Grid container style={{paddingTop: 63}}>
					<Sidebar />

					<Grid.Column width={6}>
						<Card>
							<Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg/800px-Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg'/>
							<Card.Header style={{paddingLeft: 15, paddingRight: 15, fontSize: 20, paddingTop: 10, fontWeight: 800, paddingBottom: 10}}>
								{`${user.firstname} ${user.lastname}`}
							</Card.Header>
							<Card.Meta style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
							location goes here?
							</Card.Meta>
							<Card.Description style={{paddingLeft: 15, paddingRight: 15}}>
								{user.bio}
							</Card.Description>
							<Card.Content extra>
								10 followers
							</Card.Content>
						</Card>
					</Grid.Column>

					<Grid.Column width={10}>

					<TabMenu />

					</Grid.Column>

				</Grid>

			</Container>)

	}
}


const mapStateToProps = state => ({
	selectedUser: state.data.selectedUser,
	races: state.data.races,
	events: state.data.events
});

const mapDispatchToProps = dispatch => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
