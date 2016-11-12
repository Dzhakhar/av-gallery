import React from "react";

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: undefined
        }

        this.renderImages = this.renderImages.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
    }

    renderImages() {
        let self = this;
        let images = this.props.images;
        let active = this.state.active || 0;
        let callback = this.props.onRendered || false;

        if (images.length > 0) {
            return <div className="item">
                <img src={images[active]}></img>
            </div>
        }

        if (callback) {
            callback()
        }
    }

    nextImage() {
        let tmp = this.state.active;
        let callback = this.props.onSwitch || false;

        if (tmp + 1 < this.props.images.length) {
            tmp += 1;
        } else {
            tmp = 0;
        }

        this.setState({
            active: tmp
        }, function () {
            if (callback) {
                callback(tmp)
            }
        })
    }

    prevImage() {
        let tmp = this.state.active;
        let callback = this.props.onSwitch || false;

        if (tmp - 1 > -1) {
            tmp -= 1;
        } else {
            tmp = this.props.images.length - 1;
        }

        this.setState({
            active: tmp
        }, function () {
            if (callback) {
                callback(tmp)
            }
        })
    }

    componentWillMount() {
        this.setState({
            active: parseInt(this.props.active) || 0
        })
    }


    render() {
        return <div className="av-gallery">
            <span className="controls left" onClick={this.prevImage}></span>
            {this.renderImages()}
            <span className="controls right" onClick={this.nextImage}></span>
        </div>
    }
}


export default Gallery;
