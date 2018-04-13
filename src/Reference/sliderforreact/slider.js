/**

Created by maximvlasenko on 1/19/17.
*/
import React from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import { Navigation, Link, Router, Route, IndexRoute, browserHistory } from 'react-router'

var MenuItem = React.createClass({
render: function(){
return (
<li className={this.props.menu.href === browserHistory.getCurrentLocation().pathname ?
"active td relative" : "td relative"}>

{this.props.menu.title}


);
}
});

var GalleryItemImage = React.createClass({
render: function() {
var image = this.props.photo.image;
var style = {
backgroundImage: url(${image})
}
return (

)
}
});

var GalleryItem = React.createClass({
render: function(){
console.log(this.props.galleries);
var galleryItemImage = this.props.galleries.map(function(gallery, i, galleries){
return
});
return (

{galleryItemImage}

);
}
});
var GallerySlider = React.createClass({
render: function(){
/var galleryItem = this.props.galleries.map(function(gallery, i){
return
});/
var settings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,

    };
    console.log(this.props);
    //<div id="pager" className="slider-pager flex img center absolute"></div>
    return (
        <div className="inside absolute">
            <div className="slider-box img absolute">
                {this.props.galleries.length &&
                    <Slider {...settings}>
                        {this.props.galleries.map(function (gallery, i) {
                            return <div><GalleryItem galleries={gallery} count={i}/></div>
                        })}
                    </Slider>
                }
            </div>
        </div>
    );
}
});

var GalleryInformation = React.createClass({
getInitialState: function() {
return {
gallery: [],
menu: []
}
},
getDataFromServer: function(){
var _this = this;
this.serverRequest =
axios.get('/api/sub/' + browserHistory.getCurrentLocation().pathname)
.then((res) => {
console.log(res);
_this.setState({
gallery: res.data.photos,
menu: res.data.menu
});
});
},
componentWillReceiveProps: function (nextProps) {
this.getDataFromServer();
},
componentDidMount: function() {
this.getDataFromServer();

},
chunks: function(arr, size) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Input should be Array');
    }
    if (typeof size !== 'number') {
        throw new TypeError('Size should be a Number');
    }
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, size + i));
    }
    return result;
},
render: function() {
    var galleries = this.chunks(this.state.gallery, 8);

    var menuItem = this.state.menu.map(function(menu, i){
        return <MenuItem menu={menu} />
    });
    return (
        <div>
            <nav className="bottom-nav absolute table nobr">
                <ul className="tr">
                    {menuItem}
                </ul>
            </nav>
            <GallerySlider galleries={galleries} />
        </div>
    )
}










/*

<section id="slideshow">
  <div className="intro-container">
    <div id="introCarousel" className="carousel slide carousel-fade" data-ride="carousel">
      <ol className="carousel-indicators text-right"/>
      <Slideshow slides={slides.length && slides}/>
      <a className="carousel-control-prev" href="#introCarousel" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon ion-chevron-left" aria-hidden="true"/>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#introCarousel" role="button" data-slide="next">
        <span className="carousel-control-next-icon ion-chevron-right" aria-hidden="true"/>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
</section>
*/
