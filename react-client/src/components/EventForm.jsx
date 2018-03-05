import React from 'react';
import { Button, Icon, Modal, Form, Grid, Header, Message, Segment, Input, Select, Dropdown, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents } from '../../src/actions/actions.js';
import { createEvent } from '../../src/actions/actions.js';
import $ from 'jquery';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      state: '',
      city: '',
      streetAddress: '',
      date: '',
      time: '',
      description: '',
      host: this.props.currentUser,
      success: false,
      failure: false,
    }
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, state, city, streetAddress, date, time, description, host } = this.state;
    if (!title) {
      this.setState({
          failure: true,
          header: 'Please Enter A Title',
          messageContent: 'All events must have a title!'
        })
    }
    if (!state) {
      this.setState({
          failure: true,
          header: 'Please Enter A State',
          messageContent: 'All events must have a state!'
        })
    }
    if (!city) {
      this.setState({
          failure: true,
          header: 'Please Enter A City',
          messageContent: 'All events must have a city!'
        })
    }
    if (!streetAddress) {
      this.setState({
          failure: true,
          header: 'Please Enter An Address',
          messageContent: 'All events must have a street address!'
        })
    }
    if (!date) {
      this.setState({
          failure: true,
          header: 'Please Enter A Date',
          messageContent: 'All events must have a date!'
        })
    }
    if (!time) {
      this.setState({
          failure: true,
          header: 'Please Enter A Time',
          messageContent: 'All events must have a time!'
        })
    }
    let data = {
      title: title,
      state: state,
      city: city,
      streetAddress: streetAddress,
      date: date,
      time: time,
      description: description,
      host: host
    };
    $.ajax({
      type: 'POST',
      url: '/api/events',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: response => {
        this.setState({success: true})
        this.props.createEvent({...data, firstname: window.localStorage.firstname, lastname: window.localStorage.lastname});
      },
      error: err => {

      }
    })
  }

  render () {
    const { open, title, date, time, state, city, streetAddress, description} = this.state;

    return (
      <Modal trigger={<Button>Host An Event</Button>}>
        <Modal.Header>Host An Event</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='calendar' />
            {this.state.success && [
              <Message
                key='1'
                success
                header='Your event has been created!'
                content='You should see it in the feed shortly.'
                />
            ]
          }
          {this.state.failure && [
            <Message
              key='1'
              negative
              header={this.state.header}
              content={this.state.messageContent}
              />
          ]
        }
          </div>
          <Modal.Description>
            <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
              <Segment>
                <Form.Group>
                  <Form.Field
                    required control={Input}
                    width={16}
                    label='Title'
                    name='title'
                    value={title}
                    placeholder='Title'
                    onChange={this.handleChange.bind(this)}
                  />
              </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    required control={Input}
                    label='Date'
                    name='date'
                    value={date}
                    type='date'
                    placeholder='mm/dd/yyyy'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Field
                    required control={Input}
                    label='Time'
                    name='time'
                    value={time}
                    type='time'
                    placeholder='Zip code'
                    onChange={this.handleChange.bind(this)}
                  />
              </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field
                    required control={Input}
                    label='State'
                    name='state'
                    value={state}
                    placeholder='State'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Field
                    required control={Input}
                    label='City'
                    name='city'
                    value={city}
                    placeholder='City'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Field
                    required control={Input}
                    label='Street Address'
                    name='streetAddress'
                    value={streetAddress}
                    placeholder='Street Address'
                    onChange={this.handleChange.bind(this)}
                  />
              </Form.Group>
              <Form.Group>
                  <Form.Field
                    width={16}
                    control={TextArea}
                    label='Description'
                    name='description'
                    value={description}
                    placeholder='Tell us about your event'
                    onChange={this.handleChange.bind(this)}
                  />
              </Form.Group>

                  <Form.Button content='Submit' />
                </Segment>
              </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.data.currentUser
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({createEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
