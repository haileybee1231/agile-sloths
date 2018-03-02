import React from 'react'
import { signup } from '../actions/actions.js'
import { Link, withRouter } from 'react-router-dom';
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
        super(props)
        this.state = {
            CandidateTrue: undefined,
            role: '',
            success: false,
            failure: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(email, password, firstname, lastname, bio, role, zipcode, race) {
        let data = JSON.stringify({
            email: email,
            password: password,
            role: this.state.role,
            firstname: firstname,
            lastname: lastname,
            zipcode: zipcode,
            bio: bio,
            race: race
        })
        $.ajax({
            type: 'POST',
            url: '/signup',
            contentType: 'application/json',
            data: data,
            success: user => {
                this.props.signup(user)
                this.setState({success: true})
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 3000)
            },
            error: err => {
                this.setState({failure: true})
            }
        })
    }

    handleChange(e, {value}) {
        if (value === 'voter') {
            this.setState({CandidateTrue: false, role: 'Voter'})
        } else {
            this.setState({CandidateTrue: true, role: 'Candidate'}) 
        }
    }

    componentDidMount() {
        //grab all races from database
        //populate the race dropdown with all races
        $.ajax({
            type: 'GET',
            url: '/races',
            success: races => {
                console.log(races)
            },
            error: err => {
                console.log(err)
            }
        })
    }

    render(props) {
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
                    {this.state.success && [
                          <Message
                          key='1'
                          success
                          header='Your user registration was successful!'
                          content='Redirecting you to the login page soon'
                        />
                    ]
                    }
                    {this.state.failure && [
                          <Message
                          key='1'
                          negative
                          header='There was a problem with your submission'
                          content='The email you entered already exists.  Please use another.'
                        />
                    ]
                    }
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
                                        selection
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
                                <Form.Field key ="3"
                                            fluid multiple search selection 
                                            options={options}
                                            control={Dropdown}
                                            allowAdditions 
                                            type='text' 
                                            name='race' 
                                            label='Race' 
                                            placeholder='What office are you running for?'/>
                                
                            </Form.Group>
                            
                            ]
                        }
                            <Form.Field control={Button} 
                                        type='submit' 
                                        color='green'
                                        onClick={() => {
                                            this.handleSubmit(
                                                $('input[name=email]').val(),
                                                $('input[name=password]').val(),
                                                $('input[name=firstName]').val(),
                                                $('input[name=lastName]').val(),
                                                $('textArea[name=bio]').val() || null,
                                                this.state.role,
                                                $('input[name=zipCode]').val(),
                                                $('input[name=race]').val() || null
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
//export default withRouter(SignUpForm);
