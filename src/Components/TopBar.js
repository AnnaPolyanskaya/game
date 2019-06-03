import React from 'react';
import '../assets/css/topBar.css';
import { connect } from 'react-redux';
import V4 from 'uuid';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';


export default class TopBar extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            dropdownOpen: false,
            name: ""
        }
    }

    toggle = () =>{
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }
    
    handleInputChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    chooseMode = (mode) => {
        this.toggle()
        this.props.setGameMode(mode)
    }
    


    

    render() {
        const { dropdownOpen } = this.state;
        const { gameMode } = this.props;
        return (
            <div className='top-bar__container'>
                <Button
                    aria-owns='simple-menu'
                    variant="contained"
                    color="primary"
                    onClick={this.toggle}
                    className='top-bar__menu-btn'
                    id="simple-menu"
                >
                        Choose game mode
                </Button>
                <Menu
                    anchorEl='simple-menu'
                    
                    open={this.state.dropdownOpen}
                    onClose={this.toggle}
                >
                    {gameMode.map((mode,i) => (
                        <MenuItem 
                            key={i} 
                            onClick={() => this.chooseMode(mode)}
                        >
                            <ListItemText
                                className="winner__name"
                                primary={mode.gameMode} 
                            />
                    </MenuItem>
                    ))} 
                </Menu>

                <TextField
                    id="outlined-name"
                    label="Name"
                    onChange={this.handleInputChange}
                    margin="normal"
                    variant="outlined"
                />

                <Button 
                    variant="contained" 
                    color="secondary" 
                    className='play-btn'  
                    onClick={() => this.props.onPlay(true, this.state.name)}  
                >
                    {this.props.btnText}
                </Button>
            </div>             
        )
    }
}

