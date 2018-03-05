import React from 'react';
import { Icon, Item, List, Card, Grid, Header, Container, Image, Button, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { attendEventAction } from '../../src/actions/actions.js';
import $ from 'jquery';

const EventCard = props => {

  const attendEvent = () => {
    let data = { event: props.event.title, user: props.currentUser }
    $.ajax({
      type: 'POST',
      url: '/attend',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: response => {
        console.log(response);
        if (JSON.parse(response) === 'You are already attending that event.') {
          alert(JSON.parse(response));
        } else {
          attendEventAction(event, data.user);
        }
      }
    })
  }

  return (
    <Item style={{marginBottom: 12, padding: 5, border: '1px solid #b7b7b7'}}>
      <Item.Extra>
        <Button positive size='mini' floated='right' onClick={attendEvent}>
          Attend Event
          <Icon name='right chevron' />
        </Button>
      </Item.Extra>
      <Item.Header as='as' style={{fontWeight: 700, color: '#0099ff'}}>{props.event.title} </Item.Header>
      <Item.Meta> <span style={{fontWeight: 700}}> {props.event.date} {props.event.time} </span> </Item.Meta>
      <Item.Description>
        <div> Hosted by {props.event.host} </div>
        <div> {props.event.description} </div>
        <div><span style={{fontWeight: 700}}>Location:</span> {`${props.event.streetAddress}, ${props.event.city}, ${props.event.state}`}</div>
      </Item.Description>
      <Item.Extra><span style={{fontWeight: 700}}>Attendees: </span><a href='#'>{props.event.attendees ?
        props.event.attendees.length : 0}</a></Item.Extra>
    </Item>
  )
}

const mapStateToProps = state => ({
  currentUser: state.data.currentUser
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ attendEventAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
