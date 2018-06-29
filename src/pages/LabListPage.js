import React, {Component} from 'react';

import Footer from 'containers/footer/Footer';
import LabCategories from 'containers/labList/LabCategories';
import LabItems from 'containers/labList/LabItems';
import CategoriesAndItemsWithShuffle from 'components/CategoriesAndItemsWithShuffle';
import withShuffle from 'components/WithShuffle';

// import ReactPlayer from 'react-player';

// import Measure from 'react-measure';
// import withContentRect from 'react-measure';

// import $ from 'jquery';

import {fetchActiveLab, fetchLabCategories} from 'websiteApi';
import getSearchObjectFromHistory from 'utils/queryString/getSearchObjectFromHistory';

import './LabListPage.css';


class LabCategoriesAndItemsContainer extends Component {
  render() {
    const props = this.props;

    return (
      <section id="lab-list" className="lab-bg wow fadeIn">
        <div className="container-fluid">
          <div class="row">
            <div className="col-md-1"></div>
            <div className="col-md-10" id="lab-list-frame">
              {props.children}            
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    );
  }
}


class LabCategoriesAndItemsWithShuffle extends Component {
  render() {
    const props = this.props;

    return (
      <CategoriesAndItemsWithShuffle
        categoriesAndItemsComponent={LabCategoriesAndItemsContainer}
        itemsComponent={LabItems}
        categoriesComponent={LabCategories}
        shuffleSelectorClass='portfolio-item'
        allCategoryName='All'
        items={props.labItems}
        categories={props.categories}
        categoryFilterSlugFromQuery={props.categoryFilterSlugFromQuery}
        shuffle={props.shuffle}
        setShuffleRefFunc={props.setShuffleRefFunc}
        setWithShuffleParamsFunc={props.setWithShuffleParamsFunc}
      />
    );
  }
}


// https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
const LabCategoriesAndItemsWithShuffleAdded = withShuffle(LabCategoriesAndItemsWithShuffle);


class LabListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lab: null,
      labCategories: [],
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
  }

  handleResize(){
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    })
  }

  componentDidMount() {
    fetchActiveLab((aLab) => {
      this.setState({lab: aLab});
    });

    fetchLabCategories((categories) => {
      this.setState({labCategories: categories});
    });

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  /**
  * Remove event listener
  */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  render() {
    const lab = this.state.lab;
    if (lab === null) {
      return null;
    }

    const labItems = lab.lab_item;

    const labCategories = this.state.labCategories;
    if (labCategories.length === 0) {
      return null;
    }

    const bg = {
      //backgroundImage: url,
      /*
      backgroundSize: 'auto',
      backgroundPosition: 'center'
      */
    };

    const blackBg = {
      background: 'black'
    };

    const categoryFilterSlugFromQuery = getSearchObjectFromHistory(this.props.history).category || null;

    return (
      <div style={blackBg}>
        <div id="hover-cover">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="row hover-text">
                <div className="col-md-4 hover-left"></div>
                <div className="col-md-4 hover-middle"></div>
                <div className="col-md-4 hover-right"></div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
        <section id="lab-video-landing" className="lab-bg wow fadeIn" data-wow-delay="0.8s">
          <div className="video-landing-div">
            <div className="container-fluid">
              <div className="player-wrapper">
                <video className="react-player" width={'100%'} height={'auto'} poster={lab.top_video_preload_image.guid} autoPlay={"autoPlay"} loop={"loop"} muted={"muted"} playsInline={"playsInline"}>
                  <source className="wow fadeIn" src={lab.top_video.guid} type="video/mp4"/> {/* //TODO add webm <source src="https://multicdn.synq.fm/projects/bb/56/bb56f28429b942c08dc5128e4b7ba48c/derivatives/videos/71/43/71439ccd73c74ecc8bbab7abd3bb98bc/webm_720/71439ccd73c74ecc8bbab7abd3bb98bc_webm_720.webm" type="video/webm"/> */}
                  <img className="wow fadeIn" src={lab.top_video_preload_image.guid} title="Your browser does not support the <video> tag"/>
                </video>
              </div>
              <div className="video-text wow fadeIn">
                <div className="row">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">
                    <h3>{lab.subcaption}</h3>
                    <h1>{lab.caption}</h1>
                  </div>
                  <div className="col-md-1"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="lab-top" className="wow fadeIn lab-bg" style={bg}>
          <div className="container-fluid row text-left">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="lab-top-img text-right">
                <img id="lab-top-img3" src={lab.top_image_3.guid} alt="" className="img-fluid"/>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </section>

        <LabCategoriesAndItemsWithShuffleAdded labItems={labItems}
          categoryFilterSlugFromQuery={categoryFilterSlugFromQuery}
          categories={labCategories} />

        <section id="lab-bottom">
            <div className="container-fluid">
              <div className="row lab-bottom-detail">
                <div className="col-md-1"></div>
                <div className="col-md-5 additional-info"><span id="ioio-text-l">IOIO</span><span id="ioio-text-r">LAB</span></div>
                <div className="col-md-5 " id="lab-bottom-detail-desc">
                  <p>The research team is to disrupt usual habitat that lives in virtual and physical worlds through art and technology. It is also out catfish, to challenge, to inspire and to experiment.</p>
                </div>
                <div className="col-md-1"></div>
              </div>
            </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default LabListPage;
