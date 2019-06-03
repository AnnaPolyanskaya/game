import React, { Component } from 'react'
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

class WinnersList extends Component {
    render() {
        const { winners } = this.props;
        return (
            <div className="winner__container">
                <List>
                    {winners.map((winner, i) => (
                        <ListItem key={i} className="winner__item">
                            <ListItemText
                                primary={winner.winner}
                            />
                            <span className="winner__date">{winner.date}</span>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        winners: state.winners
    }
}

export default connect(
    mapStateToProps,
    null
)(WinnersList)