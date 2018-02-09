import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';
import Table from './Table';
import {Button, Form, FormGroup, Label, Input, FormText, Container, Col} from 'reactstrap'
import axios from 'axios'

import serialize from "form-serialize";

class ActionLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.handleClick}>
                {this.props.value}
            </button>
        )
    }
}

class LoggingBtn extends Component {
    handleClick(e) {
        console.log("this is ", this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>Logging</button>
        );
    }
}

class LogginButton extends Component {
    handleClick(e) {
        console.log("this is ", this);
    }

    render() {
        return (
            <button onClick={(e) => this.handleClick(e)}>Logging</button>
        );
    }
}

class Greeter extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), toggle: false, status: 'Stop'};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState((prevProps => ({status: prevProps.toggle ? "Start" : "Stop", toggle: !prevProps.toggle})));
        console.log('The link was clicked.');
    }

    render() {
        const messages = ['React', 'Re: React', 'Re:Re: React'];
        const numbers = [1, 2, 3, 4, 5];
        return (
            <div className={styles.root}>
                {/*<h1>{config.greetText}</h1>*/}
                {/*<h2>It is {this.state.date.toLocaleTimeString()}.</h2>*/}
                {/*<Table/>*/}
                {/*<ActionLink handleClick={this.handleClick} value={this.state.status}/>*/}
                {/*<br/>*/}
                {/*<LoggingBtn/>*/}
                {/*<LogginButton/>*/}
                {/*<LogginControl/>*/}
                {/*<MailBox unreadMessages={messages}/>*/}
                {/*<Page/>*/}
                {/*<NumberList numbers={numbers}/>*/}
                {/*<NameForm/>*/}
                <EssayForm/>
            </div>
        );
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        if (this.state.toggle) {
            this.setState({date: new Date()});
        }
    }
}

class UserGreeting extends Component {
    render() {
        return <h1>Welcome back!</h1>;
    }
}

class GuestGreeting extends Component {
    render() {
        return <h1>Please sign up.</h1>;
    }
}

class Greeting extends Component {
    render() {
        const isLoggedIn = this.props.isLoggedIn;
        if (isLoggedIn) {
            return <UserGreeting/>
        } else {
            return <GuestGreeting/>
        }
    }
}

class LoginButton extends Component {
    render() {
        return (
            <button onClick={this.props.handleLoginClick}>Login</button>
        );
    }
}

class LogoutButton extends Component {
    render() {
        return (
            <button onClick={this.props.handleLogoutClick}>Logout</button>
        )
    }
}

class LogginControl extends Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false}

    }

    handleLoginClick(e) {
        e.preventDefault();
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick(e) {
        e.preventDefault();
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn}/>
                {isLoggedIn ? <LogoutButton handleLogoutClick={this.handleLogoutClick}/> :
                    <LoginButton handleLoginClick={this.handleLoginClick}/>}
            </div>

        );
    }
}

class MailBox extends Component {
    render() {
        const unreadMessages = this.props.unreadMessages;
        return (
            <div>
                <h1>Hello!</h1>
                {unreadMessages.length < 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
                }
            </div>
        );
    }
}


/**
 * show or hide component
 */

class WarningBanner extends Component {
    render() {
        return this.props.warn ? null : <div className="warning">
            Warning!
        </div>
    }
}

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {warn: false};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick(e) {
        e.preventDefault();
        this.setState((prevProps) => ({warn: !prevProps.warn}));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.warn}/>
                <button onClick={this.handleToggleClick}>{this.state.warn ? "Show" : "Hide"}</button>
            </div>

        );
    }
}

/**
 * list and keys
 */

class NumberList extends Component {
    render() {
        const numbers = this.props.numbers;
        const itemList = numbers.map((number) => {
            return <li key={number.toString()}>{number}</li>
        });
        return (<ul>{itemList}</ul>);
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label className="col-md-4">
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = serialize(event.target, {hash: true, disabled: true, empty: true});
        console.log(formData);
        axios.get("http://localhost:8090/index/userInfo", {
            // headers: {'Access-Control-Allow-Origin': '*'}
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

    handleClick(event) {
        console.log(event);
    }

    render() {
        return (
            <Container>
                <Col sm={{size: 8, offset: 2}}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="exampleEmail" placeholder="email address"/>
                                <FormText color="muted">We will never share your email with any one.</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePassword" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="examplePassword"
                                       placeholder="password"/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelect" sm={2}>Select</Label>
                            <Col sm={10}>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option value="0">男</option>
                                    <option value="1">女</option>
                                    <option value="2">未知</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleSelectMulti" sm={2}>Select Multiple</Label>
                            <Col sm={10}>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                                    <option value="football">足球</option>
                                    <option value="basketball">篮球</option>
                                    <option value="tennis">网球</option>
                                    <option value="swim">游泳</option>
                                    <option value="skateBoard">滑板</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Text Area</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="text" id="exampleText"/>
                            </Col>
                        </FormGroup>
                        {/*<FormGroup row>*/}
                        {/*<Label for="exampleFile" sm={2}>File</Label>*/}
                        {/*<Col sm={10}>*/}
                        {/*<Input type="file" name="file" id="exampleFile"/>*/}
                        {/*<FormText color="muted">*/}
                        {/*This is some placeholder block-level help text for the above input.*/}
                        {/*It's a bit lighter and easily wraps to a new line.*/}
                        {/*</FormText>*/}
                        {/*</Col>*/}
                        {/*</FormGroup>*/}
                        <FormGroup tag="fieldset" row>
                            <legend className="col-form-label col-sm-3">Radio Buttons</legend>
                            <Col sm={9}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2"/>{' '}
                                        Option one is this and that—be sure to include why it's great
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio2"/>{' '}
                                        Option two can be something else and selecting it will deselect option one
                                    </Label>
                                </FormGroup>
                                <FormGroup check disabled>
                                    <Label check>
                                        <Input type="radio" name="radio2"/>{' '}
                                        Option three is disabled
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{size: 4, offset: 4}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" id="checkbox2" name="checkbox2"/>{' '}
                                        Check me out
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{size: 4, offset: 4}}>
                                <Button color="primary">Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </Container>
        );
    }
}

export default Greeter