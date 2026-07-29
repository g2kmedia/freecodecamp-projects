import React from "react";

class Key extends React.Component {
    constructor(props) {
        super(props);
        this.playAudioClick = this.playAudioClick.bind(this);
        this.playAudioPress = this.playAudioPress.bind(this);

        this.audioRef = React.createRef();
        this.keyRef = React.createRef();
    }

    playAudioClick() {
        if (this.props.showLegend) {
            return window.alert("Turn the legend off to play")
        }

        if (this.keyRef.current) {
            this.keyRef.current.classList.add("active");

            setTimeout(() => {
                this.keyRef.current.classList.remove("active");
            }, 300);
        }

        this.props.updateCurrentTrack(this.props.name);

        const audio = this.audioRef.current;

        audio.volume = this.props.volume / 100;

        audio.play();
    }

    playAudioPress(event) {
        if (event.key.toUpperCase() === this.props.letter) {
            this.playAudioClick();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.playAudioPress);
    }

    // Remove event listenerer to prevent issues
    componentWillUnmount() {
        document.removeEventListener('keydown', this.playAudioPress);
    }

    render() {
        return (
            <div tabIndex={0} onClick={this.playAudioClick} onKeyDown={this.playAudioPress} className="drum-pad" id={"key-" + this.props.letter.toLowerCase()} ref={this.keyRef}>{this.props.showLegend ? this.props.name : this.props.letter}
                <audio src={this.props.audio} className="clip" id={this.props.letter} ref={this.audioRef}></audio>
            </div>
        );
    }
}

export default Key;