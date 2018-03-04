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
      location: '',
      date: '',
      time: '',
      description: '',
      host: this.props.currentUser
    }
  }

  handleChange(e, { name, value }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { title, location, date, time, description, host } = this.state;
    if (!title) {
      alert('Please enter a title for your event!')
    }
    if (!location) {
      alert('Please enter a location for your event!')
    }
    if (!date) {
      alert('Please enter a date for your event!')
    }
    if (!time) {
      alert('Please enter a time for your event!')
    }
    let data = {
      title: title,
      location: location,
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
        this.props.createEvent(data);
      },
      error: err => {
        alert(err.responseText);
      }
    })
  }

  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }

  render () {
    const { open, title, date, time, location, description} = this.state;

    return (
      <Modal trigger={<Button>Host An Event</Button>}>
        <Modal.Header>Host An Event</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='calendar' />
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
                    placeholder='mm/dd/yyyy'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Field
                    required control={Input}
                    label='Time'
                    name='time'
                    value={time}
                    placeholder='Zip code'
                    onChange={this.handleChange.bind(this)}
                  />
                  <Form.Field
                    required control={Input}
                    label='Zip code'
                    name='location'
                    value={location}
                    placeholder='Zip code'
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
