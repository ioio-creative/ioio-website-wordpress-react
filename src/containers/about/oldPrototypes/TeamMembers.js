import React, { Component } from 'react';
import { fetchTeamMembers } from 'websiteApi';

class TeamMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team_members: []
        }
    }

    componentDidMount() {
        fetchTeamMembers((teamMembers) => {
            this.setState({
                team_members: teamMembers
            });
        });        
    }

    render() {
        let members = this.state.team_members.map((member) => {
            return (
                <div key={member.my_name}>
                    <p>{member.my_name}</p>
                </div>
            );
        });
        return (
            <div>
                <div><strong>Team Members</strong></div>
                <div>
                    {members}
                </div>
            </div>
        );
    }
}

export default TeamMembers;