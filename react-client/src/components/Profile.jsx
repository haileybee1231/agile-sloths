import React from 'react';
import $ from 'jquery';


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
			followStatus: null,
			following: [] // this should be taken out later when we can get followers by querying votercandidate
		}
		this.handleFollow = this.handleFollow.bind(this);
	}

	handleFollow() {
		console.log('follow click')
		// ajax post request to add to database
		$.ajax({
			type: 'POST',
			url: '/follow',
			data: JSON.stringify({voter: this.props.currentUser, candidate: this.props.selectedUser.user.id, following: this.state.followStatus}), 
			contentType: 'application/json',
			success: () => {
				// change following in state to change text of follow button
				var selectedUserName = this.props.selectedUser.user.firstname + ' ' + this.props.selectedUser.user.lastname;
				if (!this.state.followStatus) {
					// toggle button and add name to following list
					this.setState({followStatus: true, following: this.state.following.concat([selectedUserName])});
				} else {
					// toggle button
					var index = this.state.following.indexOf(selectedUserName);
					// splice out candidate name from following 
					var updatedFollowing = this.state.following;
					updatedFollowing.splice(index, 1);
					this.setState({followStatus: false, following: updatedFollowing});
				}
			},
			error: () => {
				console.log('follow POST error');
			}
		})
		
	}
  
	render() {
		const user = this.props.selectedUser.user;
		var followMessage;
		if (this.state.followStatus) {
			followMessage = 'Following';
		} else { // covers false or null
			followMessage = 'Follow';
		}

		return (
			<Container style={{paddingLeft: 210}}>
				<Grid container style={{paddingTop: 63}}>
					<Sidebar />

					<Grid.Column width={6}>
						<Grid.Row>
							<Card>
								<Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg/800px-Beto_O%27Rourke%2C_Official_portrait%2C_113th_Congress.jpg'/>
								<Card.Header style={{paddingLeft: 15, paddingRight: 15, fontSize: 20, paddingTop: 10, fontWeight: 800, paddingBottom: 10}}>
									{`${user.firstname} ${user.lastname}`}
								</Card.Header>
								<Card.Meta style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 10}}>
									{user.location}
								</Card.Meta>
								<Card.Description style={{paddingLeft: 15, paddingRight: 15}}>
									{user.bio}
								</Card.Description>
								<Card.Content extra>
									10 followers
								</Card.Content>
							</Card>
						</Grid.Row>

						<Grid.Row>
							<Button style={{marginTop: 20}} onClick={this.handleFollow}> {followMessage} </Button>
						</Grid.Row>

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
	events: state.data.events,
	currentUser: state.data.currentUser,
	selectedUser: state.data.selectedUser
});

const mapDispatchToProps = dispatch => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
