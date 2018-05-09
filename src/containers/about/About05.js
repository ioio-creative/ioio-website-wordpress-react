import React, {Component} from 'react';
import $ from 'jquery'

import OwlCarousel from 'react-owl-carousel';
import 'containers/slideshow.css';

function Slideshow(props) {
  const member_items = props.members.map((member, id) => {
    return (<div className="item" key={id}>
      <div className="the-team-text">
        <img className="the-team-img" alt="alt" src={member.image.guid}/>
        <h3 className="the-team-name">{member.my_name}</h3>
        <p className="the-team-title">{member.my_title}</p>
      </div>
    </div>);
  });

  return (<OwlCarousel className="slideshow owl-theme the-team" loop={true} nav={false} autoplay={true} dots={true} dotsEach={true} items={4.5} margin={5} slideBy={1} autoplayTimeout={2500}>
    {member_items}
  </OwlCarousel>);
}

class About05 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  componentDidMount() {
    /*
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function() {
      var condition = $(this).hasClass("leftLst");
      if (condition)
        click(0, this);
      else
        click(1, this)
    });

    ResCarouselSize();

    $(window).resize(function() {
      ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
      var incno = 0;
      var dataItems = ("data-items");
      var itemClass = ('.item');
      var id = 0;
      var btnParentSb = '';
      var itemsSplit = '';
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $('body').width();
      $(itemsDiv).each(function() {
        id = id + 1;
        var itemNumbers = $(this).find(itemClass).length;
        btnParentSb = $(this).parent().attr(dataItems);
        itemsSplit = btnParentSb.split(',');
        $(this).parent().attr("id", "MultiCarousel" + id);

        if (bodyWidth >= 1200) {
          incno = itemsSplit[3];
          itemWidth = sampwidth / incno;
        } else if (bodyWidth >= 992) {
          incno = itemsSplit[2];
          itemWidth = sampwidth / incno;
        } else if (bodyWidth >= 768) {
          incno = itemsSplit[1];
          itemWidth = sampwidth / incno;
        } else {
          incno = itemsSplit[0];
          itemWidth = sampwidth / incno;
        }
        $(this).css({
          'transform': 'translateX(0px)',
          'width': itemWidth * itemNumbers
        });
        $(this).find(itemClass).each(function() {
          $(this).outerWidth(itemWidth);
        });

        $(".leftLst").addClass("over");
        $(".rightLst").removeClass("over");
      });
    }

    //this function used to move the items
    function ResCarousel(e, el, s) {
      var leftBtn = ('.leftLst');
      var rightBtn = ('.rightLst');
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
        translateXval = parseInt(xds) - parseInt(itemWidth * s);
        $(el + ' ' + rightBtn).removeClass("over");

        if (translateXval <= itemWidth / 2) {
          translateXval = 0;
          $(el + ' ' + leftBtn).addClass("over");
        }
      } else if (e == 1) {
        var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
        translateXval = parseInt(xds) + parseInt(itemWidth * s);
        $(el + ' ' + leftBtn).removeClass("over");

        if (translateXval >= itemsCondition - itemWidth / 2) {
          translateXval = itemsCondition;
          $(el + ' ' + rightBtn).addClass("over");
        }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
      var Parent = "#" + $(ee).parent().attr("id");
      var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
    }
*/
  }

  render() {
    let a = this.props.about
    let members = a.team_members
    return (<section id="the-team" className="about-section-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <header className="section-header">
              <h3>{a.team_section_title}</h3>
              <p>{a.team_section_desc}</p>
            </header>
            <div className="row">
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              {/* Change data items for xs,sm,md and lg display items respectively. Ex:data-items="1,3,5,6" Change data slide for slides per click Ex:data-slide="1"
                                  <div className="MultiCarousel" data-items="1,1.5,2.5,3.5" data-slide={1} id="MultiCarousel" data-interval={1000}>*/
              }
              <Slideshow members={members}/>
            </div>
          </div>

        </div>
      </div>

    </section>);
  }
}

export default About05;
