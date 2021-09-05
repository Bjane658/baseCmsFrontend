import React from "react";


class Notification extends React.Component {

    render = () => {
        return (

            <div className="notification">
                <div className="notification-content">
                    {this.props.type === "failure" ?
                        (<>
                            <img src="../dashboard/notification-error-icon.svg" className="hacken-notification"/>
                            <p>{this.props.message}</p>
                        </>)
                        :
                        (<>
                            <img src="../dashboard/notification-check.svg" className="hacken-notification"/>
                            <p>{this.props.message}</p>
                        </>)}
                </div>
            </div>

        )
    };
}

export default Notification
