import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        // Add local state to class component
        this.state = { 
            date: new Date(),
            locale: ""
        };
    }

    // Add lifecycle methods
    // When a component is rendered to the DOM for the first time
    // this is called "mounting"

    // Setup a timer when <Clock /> is mounted (rendered to the DOM for first time)
    // runs after the components output has been rendered to the DOM
    componentDidMount() {
        this.getLocale();
        this.timer_id = setInterval(() => {
            this.tick();
        }, 1000);
    }

    // Clear the time whenever the DOM produced by <Clock /> is removed, this is called "unmounting"
    componentWillUnmount() {
        // teardown the timer when component is removed
        clearInterval(this.timer_id);
    }

    // schedule updates to component local state with timer every 1s (1000ms)
    tick() {
        this.setState({ date: new Date() });
    }

    getLocale() {
        let localesArr = navigator.languages;
        this.setState({
            locale: (localesArr && localesArr.length) ? localesArr[0] : navigator.language
        });
    }

    render() {
        return (
            <div className="clock">
                <time dateTime={this.state.date.toISOString()}>
                    {!this.state.date.toLocaleTimeString() ? 'Loading' : this.state.date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
            </div>
        )
    }
}

export default Clock;
