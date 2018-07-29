import React, { Component } from "react";
import axios from "axios";
import ModalVideo from "react-modal-video";
// import { Glyphicon } from "reactstrap";
import { URL_DETAIL, VIDEOS, API_KEY } from "../../const";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            videoID: ""
        };
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        // const url = `${VIDEO_LINK}${id}/videos${API_KEY}`;
        const url = `${URL_DETAIL}${this.props.modal}${VIDEOS}${API_KEY}`;
        axios.get(url).then(response => {
            this.setState({ videoID: response.data.results[0].key });
        });
    }
    openModal() {
        this.setState({ isOpen: true });
    }

    render() {
        let videoID;
        if (this.state.videoID !== "") {
            videoID = this.state.videoID;
        }

        return (
            <div className="play-list">
                <ModalVideo
                    channel="youtube"
                    isOpen={this.state.isOpen}
                    videoId={videoID}
                    onClose={() => this.setState({ isOpen: false })}
                />
                <div onClick={this.openModal}>
                    <i class="fas fa-play movie-icons"></i> Play Trailer
                </div>
            </div>
        );
    }
}

export default Modal;