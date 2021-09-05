import React from "react";
import Notification from "./notification";


class NotificationWrapper extends React.Component {

    render() {
        return (
                <div className="notification-wrapper noti-off">
                    <Notification message={this.props.message} type={this.props.type} onClose={this.props.onClose}/>
                </div>
        );
    }
}

export default NotificationWrapper
