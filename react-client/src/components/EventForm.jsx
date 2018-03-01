import React from 'react';
import { Button, Icon, Modal, Form, Grid, Header, Message, Segment, Input, Select, Dropdown, TextArea } from 'semantic-ui-react';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      location: null,
      time: null,
      description: null,
      host: null, // change to be logged in user
    }
  }

  open() {
    this.setState({ open: true });
  }
  close() {
    this.setState({ open: false });
  }

  render () {
    const { open } = this.state

    return (
      <Modal trigger={<Button>Host An Event</Button>}>
        <Modal.Header>Host An Event</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='calendar' />
          </div>
          <Modal.Description>
            <Form size='large'>
              <Segment>
                <Form.Group widths='equal'>
                  <Form.Field required control={Input} label='Title' placeholder='Title' />
                  <Form.Field required control={Input} label='Date' placeholder='mm/dd/yyyy'/>
                  <Form.Field required control={Input} label='Zip code' placeholder='Zip code' />
              </Form.Group>
              <Form.Group>
                  <Form.Field width={16} control={TextArea} label='Description' placeholder='Tell us about your event' />
              </Form.Group>

                  <Form.Field control={Button}>Submit</Form.Field>
                </Segment>


              </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default EventForm;
