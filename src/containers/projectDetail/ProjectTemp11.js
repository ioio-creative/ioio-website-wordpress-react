import React, {Component} from 'react';
/**
 * scrollable png sequences template
 */
class ProjectTemp11 extends Component {
  constructor(props) {
    super(props);
    this.containerEl = null;
    this.animationFrame = null;
    this.state = {
      winH: window.innerHeight,
      winW: window.innerWidth,
      containerW: window.innerWidth,
      containerH: window.innerHeight,
      spriteStep: 0,
      spriteActive: false,
    }
    this.spriteWidth = parseInt('0' + props.sprite_image_width);
    this.spriteHeight = parseInt('0' + props.sprite_image_height);
    this.spriteCount = parseInt('0' + props.sprite_images_count);
    this.scrollStep = parseInt('0' + props.sprite_scroll_distance);
    this.scrollOffsetToStep = this.scrollOffsetToStep.bind(this);
    this.onResize = this.onResize.bind(this);
    this.spriteCalculation = this.spriteCalculation.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollOffsetToStep);
    window.addEventListener('resize', this.onResize);
  }
  scrollOffsetToStep = () => {
    // check if the container is visible or not
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.animationFrame = requestAnimationFrame(this.spriteCalculation);
  }
  spriteCalculation = () => {
    const spriteCount = this.spriteCount;
    const scrollStep = this.scrollStep;
    const currentScrollTop = window.scrollY; // + window.innerHeight;
    const currentScrollBottom = currentScrollTop + window.innerHeight;
    const containerTop = this.containerEl.offsetTop;
    const containerBottom = containerTop + this.containerEl.offsetHeight;
    if (currentScrollTop >= containerTop && currentScrollBottom <= containerBottom) {
      // whole image on screen now
      // calculate the Y offset and turn into sprite index
      let currentStep = ~~((currentScrollTop - containerTop) / scrollStep);
      currentStep = Math.max(currentStep, 0)
      currentStep = Math.min(currentStep, spriteCount - 1);
      this.setState({
        spriteActive: true,
        spriteStep: currentStep
      })
    } else if (currentScrollTop < containerTop) {
      this.setState({
        spriteActive: false,
        spriteStep: 0
      })
    } else if (currentScrollBottom > containerBottom) {
      this.setState({
        spriteActive: false,
        spriteStep: spriteCount - 1
      })
    } else {
      console.log(currentScrollTop, currentScrollBottom, containerTop, containerBottom);
    }
  }
  onResize = () => {
    // resize the container
    this.setState({
      winH: window.innerHeight,
      winW: window.innerWidth,
      containerW: this.containerEl.offsetWidth,
      containerH: window.innerHeight
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollOffsetToStep);
    window.removeEventListener('resize', this.onResize);
  }
  render() {
    const props = this.props;
    const state = this.state;
    const spriteWidth = this.spriteWidth;
    const spriteHeight = this.spriteHeight;
    const spriteCount = this.spriteCount;
    const scrollStep = this.scrollStep;
    return (<section className="scrollSprite" ref={(ref) => this.containerEl = ref} style={{
      height: `${scrollStep * spriteCount}px`,
    }}>
      <div className="spriteImage" style={{
        backgroundImage: `url(${props.images && props.images[0]['guid']})`,
        height: state.containerH,
        width: state.containerW,
        backgroundPosition: `center ${-state.containerH * state.spriteStep}px`,
        backgroundSize: `${state.containerH / spriteHeight * spriteWidth}px ${state.containerH * spriteCount}px`,
        backgroundRepeat: 'no-repeat',
        position: `${state.spriteActive? 'fixed': 'relative'}`,
        top: (!state.spriteActive && state.spriteStep === spriteCount - 1? scrollStep * spriteCount - state.containerH: 0)
      }}>
      </div>
    </section>);
  }
}

export default ProjectTemp11;
