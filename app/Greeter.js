import React, {Component} from 'react';
import config from './config.json';
import styles from './Greeter.css';
import Table from './Table';

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
        this.state = {date: new Date(), toggle: true, status: 'Stop'};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState((prevProps => ({status: prevProps.toggle ? "Start" : "Stop", toggle: !prevProps.toggle})));
        console.log('The link was clicked.');
    }

    render() {
        const messages = ['React', 'Re: React', 'Re:Re: React'];
        return (
            <div className={styles.root}>
                <h1>{config.greetText}</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <Table/>
                <ActionLink handleClick={this.handleClick} value={this.state.status}/>
                <br/>
                {/*<LoggingBtn/>*/}
                {/*<LogginButton/>*/}
                <LogginControl/>
                <MailBox unreadMessages={messages}/>
                <Page/>
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
                {unreadMessages.length > 0 &&
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

export default Greeter