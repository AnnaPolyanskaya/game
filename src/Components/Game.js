import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllWinners } from '../Redux/actions/actions';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import TopBar from './TopBar';
import WinnerList from './WinnersList';
import GameField from './GameField';


class Game extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            gameMode: [],
            name: "",
            field: null,
            delay: null,
            mode: null,
            play: false,
            winner: "",
            modalOpen: true,
            btnText: 'play',
            winners: [],
            ends: false
        }
        this.setWinner = this.setWinner.bind(this)
    }
    

    componentDidMount() {
        axios.get(`http://starnavi-frontend-test-task.herokuapp.com/game-settings`)
            .then(res => {
                var array = [];
                for(var key in res.data){
                    let result = {...res.data[key], gameMode: key}
                    array = [...array, result]
                }
                this.setState({
                    gameMode: array
                }, this.getWinners())
            })
            .catch(error => {
                console.log(error)
            })

    }       

    getWinners = () => {
        axios.get(`http://starnavi-frontend-test-task.herokuapp.com/winners`)
            .then(res => {
                this.props.allWinners(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    setGameMode = (mode) => {
        this.setState({
            mode
        })
    }

    onPlay = (play, name) => {
        if(name === "" || this.state.mode === null){
            window.alert('Please enter your name and choose game mode')
        }
        this.setState({
            play, 
            name,
            winner: ""
        })
    }


    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }


    setWinner = (winner) => {
        console.log(winner)
        let time = moment().format('MMMM Do YYYY, h:mm:ss a');
        console.log(time)
        axios.post(`http://starnavi-frontend-test-task.herokuapp.com/winners`, {
            winner: winner,
            date: time
        })
        .then(res => {
            console.log(res);
            if(res.data.error === undefined){
                this.props.allWinners(res.data);
                this.setState({
                    mode: null,
                    play: false
                }) 
            }
           
        })
        .catch(error => {
            console.log(error)
        })
        if(winner){
            if(winner === 'Computer'){
                this.setState({
                    winner: winner,
                    btnText: 'Try again'
                })    
            } else {
                this.setState({
                    winner: winner,
                }) 
            }
            
        }
        
    }

    render() {
        const { gameMode, modalOpen } = this.state;
        console.log(this.state.winner)
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TopBar 
                            gameMode={gameMode} 
                            startGame={this.startGame}
                            setGameMode={this.setGameMode}
                            onPlay={this.onPlay}
                            btnText={this.state.btnText}
                        />    
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {this.state.play && this.state.mode && this.state.name !== ""
                            ? <GameField
                                    mode={this.state.mode}
                                    play={this.state.play}
                                    name={this.state.name}
                                    setWinner={this.setWinner}
                                /> 
                            : null}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <WinnerList
                            winners={this.state.winners}
                        />
                    </Grid>
                    {this.state.winner !== ""
                        ? (
                            <Modal
                            aria-labelledby="Winner"
                            open={modalOpen}
                            onClose={this.toggleModal}
                        >
                            <div className='winner-modal'>
                                <Typography variant="h6" className='modal-txt' >
                                    Winner is {this.state.winner}
                                </Typography>    
                                <Button className='modal-btn' onClick={this.toggleModal}>Close</Button>
                            </div>
                            
                        </Modal>
                        )
                        : <React.Fragment />
                    }
                   
                </Grid>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return{
        allWinners : (winners) => {
            dispatch(getAllWinners(winners))
        }
    }
}



export default connect(
    null,
    mapDispatchToProps
)(Game)