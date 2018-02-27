import React from 'react'
import signup from '../actions/actions.js'
import { Button, Form, Grid, Header, Message, Segment, Input, Select, Dropdown, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'

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
            this.setState({CandidateTrue: false})
        } else {
            this.setState({CandidateTrue: true}) 
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
                    <Header size='huge' style={{ fontSize: 60 }}>GRASSROOTS</Header>
                    <Header as='h2' color='green' textAlign='center'>
                        {' '}Sign up for an account
                    </Header>
                    <Form size='large'>
                    <Segment>
                        <Form.Group widths='equal'>
                            <Form.Field required control={Input} type='email' name='email' label='Email' placeholder='Email' />
                            <Form.Field required control={Input} type='password' name='password' label='Password' placeholder='Password' />
                            <Form.Field required control={Dropdown}
                                        fluid
                                        type='text'
                                        label='Role' 
                                        selection options={options} 
                                        placeholder='Role'
                                        onChange={this.handleChange}
                                        name='role'/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field required control={Input} type='text' name='firstName' label='First Name' placeholder='First name' />
                            <Form.Field required control={Input} type='text' name='lastName' label='Last Name' placeholder='Last name' />
                            <Form.Field required control={Input} type='number' name='zipCode' label='Zip code' placeholder='Zip code' />
                        </Form.Group>

                        { this.state.CandidateTrue && [
                            <Form.Group widths='equal' key="1">
                                <Form.Field key="2" control={TextArea} type='text' name='bio' label='Bio' placeholder='Tell us about yourself' />
                                <Form.Field key ="3" control={Input} type='text' name='race' label='Race' placeholder='What office are you running for?'/>
                            </Form.Group>
                            
                            ]
                        }

                            <Form.Field control={Button} 
                                        type='submit' 
                                        color='green'
                                        onClick={() => {
                                props.signup($('input[type=email]').val(),
                                             $('input[type=password]').val(),
                                             $('input[type=text]').val(),
                                             $('input[type=text]').val(),
                                             $('input[type=text]').val(),
                                             $('input[type=number]').val(),
                                             $('input[type=text]').val(),
                                             $('input[type=text]').val()
                                )}}>Submit</Form.Field>
                        </Segment>
                        
                        
                    </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({signup}, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpForm)