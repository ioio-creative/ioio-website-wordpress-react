import React, {Component} from 'react';

import Footer from 'containers/footer/Footer';

import $ from 'jquery';

import {getAbsoluteUrlFromRelativeUrl} from 'utils/setStaticResourcesPath';

import './Tapping.css';


class TappingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('#root').addClass('tapping-page');
  }

  componentWillUnmount() {
    $('#root').removeClass('tapping-page');
  }

  render() {
    return (
      <div className="wow fadeIn">
        <div className="video-wrapper">
          <video src={getAbsoluteUrlFromRelativeUrl("video/tapping.mp4")} controls />
        </div>
        <div className="details">
          <p><i>Tapping</i> is a wind-powered artificial landscape instrument, assembled by an expandable modular sculpture system.</p>
          <h4>An Intimate listening event</h4>
          <p>Contrasting to the common setting of the public address system in which they are mostly rigged or installed on robust stands, the touchable design of these light-weight cubes, serving also as the speaker cabinet — resonator leave chance for visitors to touch. The French “Acousmonium” shows the possibility of “staging” the loudspeakers that the audience listen to them as if they are singing on the stage like creatures. Hendrix’s notable style of guitar feedback suggests a closer distance between the loudspeaker and the performer, while The Kinksradically cuts the paper cone for an organic and subtle distortion effect. These examples have casted the lights on a kind of intimacy that could possibly lead to a ludic outcome that a sound-based installation, or any technological devices could bare.</p>
          <p>Rather than creating a high-fidelity listening field, we instead want to be thoughtful about an intimate listening event between the spectators and the loudspeakers. This idea returns to the fundamental issue of how we embody sound. The story telling is then not only limited to what is played, whereas the experience, or precisely the act of experiencing becomes the story itself. Before the technological arrival of a brand new design for outputting audio (imagine the loudspeaker is a tent that we can be immersed physically and sonically), Tapping speculates not only the way how loudspeakers appear to us, but more importantly in what ways we engage with them through any possible listening gesture. </p>
          <h4>Sound Mapping: kinetic; synchronisation of motion and sound driven by wind</h4>
          <p>The installation serves no more than a sculpture reacting with wind. It is the visitors’ intervention which bring forth the quality of the loudspeaker, deconstructing the naturally synchronised form into individuals. In other words, such “play” reinforces the individuality within the genuine multichannel setup, transforming it from an artificially organic status into a series of subjective events. </p>
          <p>However, wind is not only the source of energy to animate the installation, it is also the very tactile sensation of feeling air movement. As a source of energy, it sets the installation into an oscillation, both the physical movement of each individual sculpture and the sense of immersing in oscillating sounds.</p>
          <p>The structure of an individual sculpture is similar to “a sail on a mast“ on a sailing boat. The only difference is our mast is easily bendable. When the cube catches the wind, it bends the metal rod and sets the sculpture into a damped oscillating motion. The motion of the cube is then translate into sound and light by the motion sensor in real-time. Instead of playing a pre-recorded sequence, it generates lights and sounds on the fly according to the algorithm. This gives the translation (between wind, motion, and sound) much finer details and more varieties.</p>
          <p>This mapping of visual [movement of nodes] and audio [real-time synthesised sound] makes the installation relatively consistent. But because of the randomness of the air current, the installation also has this unpredictable quality built-in. As an ensemble, it resonates with the wind into a tightly choreographed, and yet spontaneous and ephemeral performance. </p>
          <h4>The Artiﬁciality</h4>
          <p>Something unusual has come out of this combination of the artificial and the organic. It is neither the experience of seeing a choreographed, dancing robot nor seeing long grass under wind. We suggest it is the feeling of resemblance and yet different, the uncanny feeling of something artificial and yet it carries some qualities resemblance of life. It is not the same kind of “life” we experience in animatronics. Maybe it is the life of an artificial being, even though it is only shown in the way how the installation respond. This quality speculates along the trajectory of artificial entities that give us the sense of being. </p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TappingPage;
