import * as React from "react";

import {
    withRouter
} from 'react-router-dom';

class ScrollToTopComponent extends React.Component{

    componentWillReceiveProps(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export let ScrollToTop = withRouter(ScrollToTopComponent);