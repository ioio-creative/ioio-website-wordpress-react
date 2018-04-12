import React, {Component} from 'react';

class About05 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    return (
      <section id="the-team">
      <div className="container">
        <header className="section-header">
          <h3>The Team</h3>
          <p>Our team brings a wealth of experience from some of the world’s most
            formidable production studios, agencies and startups.</p>
        </header>
        <div className="row">
          {/* Change data items for xs,sm,md and lg display items respectively. Ex:data-items="1,3,5,6" Change data slide for slides per click Ex:data-slide="1"  */}
          <div className="MultiCarousel" data-items="1,1.5,2.5,3.5" data-slide={1} id="MultiCarousel" data-interval={1000}>
            <div className="MultiCarousel-inner">
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
              <div className="item">
                <div className="pad15">
                  <img className="the-team-img" alt src="img/about/team1.jpg" />
                  <h3 className="lead">Chan Siu Ming</h3>
                  <p>Intern</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary leftLst">&lt;</button>
            <button className="btn btn-primary rightLst">&gt;</button>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

export default About05;
