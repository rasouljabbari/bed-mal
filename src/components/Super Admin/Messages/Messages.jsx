import React, {Component} from 'react';

class Messages extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.location.state?.id}</h1>
                <h1>{this.props.location.state?.type}</h1>
            </div>
        );
    }
}

export default Messages;