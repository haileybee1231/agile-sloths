import React from 'react'
import { signup, login, saverace } from '../actions/actions.js'
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment, Input, Select, Dropdown, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import $ from 'jquery'
const uuidv4 = require('uuid/v4');
import axios from 'axios'


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
            failure: false,
            raceoptions: undefined,
            header: '',
            messageContent: '',
            currentRace: '',
            raceKey: undefined
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRaceAddition = this.handleRaceAddition.bind(this)
        this.getAllRaces = this.getAllRaces.bind(this)
        this.handleRaceValue = this.handleRaceValue.bind(this)
    }

    handleSubmit(email, password, firstname, lastname, bio, role, zipcode, race) {
      if (email.indexOf('@') < 0 || !email.match('com')) {
        this.setState({failure: true,
                       header: 'Please enter a valid email address.',
                       messageContent: 'We require a .com domain for emails.' })
        return;
      }
      if (!password) {
          this.setState({
              failure: true,
              header: 'Please enter a password.',
              messageContent: 'Use a combination of letters, numbers, and symbols.'
          })
        return;
      }
      if (!firstname || !lastname) {
        this.setState({
            failure: true,
            header: 'Please enter a full name.',
            messageContent: 'Use a combination of letters, numbers, and symbols.'
        })
        return;
      }
      let data = {
          email: email,
          password: password,
          role: this.state.role,
          firstname: firstname,
          lastname: lastname,
          zipcode: zipcode,
          bio: bio,
          race: race
      }
      let bound = this;
         axios.post('/signup', data)
         .then(function(response) {
             bound.props.signup(response)
         })
         .then(function(response) {
             bound.setState({success: true})
         })
         .then(function(response) {
             setTimeout(() => {
                 bound.props.history.push('/login')
             }, 3000)
         })
         .catch(function(error) {
             bound.setState({
                 failure: true,
                 header: 'That email already exists.',
                 messageContent: 'A user already has signed up using that email.  Try logging in!'
             })
         })
    }

    //grabs every race from the database and populates the race dropdown with it to select from
    getAllRaces() {
        let bound = this;
        let list = [];
        axios.get('/races')
        .then(function(response) {
            let races = response.data
            races.forEach(race => {
                list.push({
                    key: race.id,
                    text: race.office,
                    value: race.office
                })
            })
        })
        .then(function(response) {
            bound.setState({
                raceoptions: list, ...bound.state.raceoptions
            })
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    //handles what role is selected, displays form info accordingly
    handleChange(e, {value}) {
        if (value === 'voter') {
            this.setState({CandidateTrue: false, role: 'Voter'})
        } else {
            this.setState({CandidateTrue: true, role: 'Candidate'})
        }
    }

    //this function grabs the value from the race field and adds it to the database, if its not there already
    handleRaceAddition(date, state, city, district, office) {
        if (office === '') {
            this.setState({
                failure: true,
                header: 'Please enter a Race.',
                messageContent: 'To be a candidate you have to run for election!'
            })
            return;
        }
        if (!date) {
            this.setState({
                failure: true,
                header: 'Please enter a date.',
                messageContent: 'The date should be when your election is being held.'
            })
        }
        if (!state) {
            this.setState({
                failure: true,
                header: 'Please enter your state.',
                messageContent: 'Before adding a new race, we need to know where it will be!'
            })
        }
        let data = {
            date: date,
            state: state,
            city: city,
            district: district,
            office: office
        }
        let bound = this;
        axios.post('/races', data)
        .then(function(race) {
            bound.props.saverace(race)
        })
        .catch(function(error) {
            console.log(error)
        })
        this.getAllRaces()
    }

    //each race, when created, is assigned a key which is tied to a user by foriegn key. this function grabs that key for user creation
    handleRaceValue(e, data) {
        let races = data.options;
        let currRaceValue = data.value
        races.forEach(race => {
            if (race.value === currRaceValue) {
                this.setState({
                    raceKey: race.key
                })
            }
        })
        this.setState({
            currentRace: data.value
        })
    }

    componentDidMount() {
        //grab all Races from database and populates the race dropdown with them
        this.getAllRaces()
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
                    <Link to='/'>
                      <Header size='huge' style={{ fontSize: 60 }}>
                        GRASSROOTS
                      </Header>
                    </Link>
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
                          header={this.state.header}
                          content={this.state.messageContent}
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
                            <div key='candidatediv'>
                                <Form.Group widths='equal' key="1">
                                    <Form.Field key="2"
                                                required
                                                control={TextArea}
                                                type='text'
                                                name='bio'
                                                label='Bio'
                                                placeholder='Tell us about yourself' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field key='3'
                                                required
                                                label='Date of Race'
                                                fluid
                                                name='date'
                                                control={Input}
                                                type='date'/>
                                    <Form.Field key='4'
                                                required
                                                label='State of Race'
                                                fluid
                                                name='state'
                                                control={Input}
                                                type='state'/>
                                    <Form.Field key='5'
                                                label='City of Race'
                                                fluid
                                                name='city'
                                                control={Input}
                                                type='city'/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field key='5'
                                                label='District of Race'
                                                fluid
                                                name='district'
                                                control={Input}
                                                type='city'/>
                                    <Form.Field key='7'
                                                fluid
                                                search
                                                selection
                                                allowAdditions
                                                onAddItem={() => {this.handleRaceAddition(
                                                    $('input[name=date]').val(),
                                                    $('input[name=state]').val(),
                                                    $('input[name=city]').val(),
                                                    $('input[name=district]').val(),
                                                    this.state.currentRace
                                                )}}
                                                required
                                                options={this.state.raceoptions}
                                                control={Dropdown}
                                                onChange={this.handleRaceValue}
                                                label='Race'
                                                placeholder='What office are you running for?'/>
                                </Form.Group>
                            </div>
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
                                                this.state.raceKey || null
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
    return bindActionCreators({ signup, login, saverace }, dispatch)
}

export default connect(null, mapDispatchToProps)(withRouter(SignUpForm));
