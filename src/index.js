import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TeamMembers extends React.Component {
  constructor() {
    super();
      this.state = {
      team_members: []
    }
  }
  
  componentDidMount() {
    let dataURL = "http://13.228.34.232/wp-json/wp/v2/team_member?_embed";
      fetch(dataURL)
        .then(res => res.json())
        .then(res => {
          this.setState({
            team_members: res
          })
    })
  }

  render() {
    let team_member_divs = this.state.team_members.map((team_member, index) => {
        return <div key={index}>
                {/* <img src={movie._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} alt='' />
                <p><strong>Title:</strong> {movie.title.rendered}</p>
                <p><strong>Release Year:</strong> {movie.acf.release_year}</p> */}
                <p><strong>Team Member:</strong> {team_member.my_name}</p>
                {/* <div><strong>Description:</strong><div dangerouslySetInnerHTML={ {__html: movie.acf.description} } /></div> */}
            </div>                
    });
    return (
      <div>
        {team_member_divs}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <TeamMembers />,
  document.getElementById('root')
);