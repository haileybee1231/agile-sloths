import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment, Input, Select, Dropdown, TextArea } from 'semantic-ui-react'

const options = [
    { key: 'v', text: 'Voter', value: 'voter' },
    { key: 'c', text: 'Candidate', value: 'candidate' },
  ]

class SignUpForm extends React.Component {
    constructor(props) {
        super()
        this.state = {
            CandidateTrue: undefined
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, {value}) {
        if (value === 'voter') {
            this.setState({
                CandidateTrue: false
            })
        } else {
            this.setState({
                CandidateTrue: true
            })
        }
    }

    render() {
      return (
        <div className='login-form'>
          <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
              height: 100%;
          }
          `}</style>
          <Grid
              textAlign='center'
              style = {{ height: '100%' }}
              verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 750 }}>
            <Header size='huge' style={{ fontSize: 60 }}>
              <Link to='/'>
                GRASSROOTS
              </Link>
            </Header>
            <Header as='h2' color='green' textAlign='center'>
                {' '}Sign up for an account
            </Header>
            <Form size='large'>
              <Segment>
                <Form.Group widths='equal'>
                  <Form.Field required control={Input} label='Email' placeholder='Email' />
                  <Form.Field required control={Input} label='Password' placeholder='Password' />
                  <Form.Field required control={Dropdown}
                              fluid
                              label='Role'
                              selection options={options}
                              placeholder='Role'
                              onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group>
                  <Form.Field required control={Input} label='First Name' placeholder='First name' />
                  <Form.Field required control={Input} label='Last Name' placeholder='Last name' />
                  <Form.Field required control={Input} label='Zip code' placeholder='Zip code' />
              </Form.Group>

              { this.state.CandidateTrue && [
                  <Form.Group widths='equal' key="1">
                      <Form.Field key="2" control={TextArea} label='Bio' placeholder='Tell us about yourself' />
                      <Form.Field key ="3" control={Input} label='Race' placeholder='What office are you running for?'/>
                  </Form.Group>

                  ]
              }

                  <Form.Field control={Button}>Submit</Form.Field>
                </Segment>


              </Form>
            </Grid.Column>
          </Grid>
        </div>
        )
    }
}

export default withRouter(SignUpForm);
