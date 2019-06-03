import React, { Component } from 'react';
import '../assets/css/gameField.css';
import Box from './Box';


export default class GameField extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            fields: this.setFields(),
            winner: ""
        }
        this.timer = null;
    }


    componentDidMount() {
        this.getRandomField()
    }

    setFields = () => {
        let fields = []
        if(this.props.mode !== null){
            for (var i = 0; i < this.props.mode.field; i++) {
                fields.push([]);
                for (var j = 0; j < this.props.mode.field; j++) {
                    fields[fields.length - 1].push({active: false, computer: null, user: null, completed: false});
                }
            }
               
        }
        return fields 
        
    }
    

    getRandomField = () => {
        if(this.isFinished()){
            this.props.setWinner(this.state.winner)
           return;
        }
        var row = Math.floor(Math.random() * this.state.fields.length);
        var field = Math.floor(Math.random() * this.state.fields.length);
        let newField = this.state.fields;

            if(!newField[row][field].completed){
                newField[row][field].active = true;
                
                this.setState({
                    fields: newField,
                    row,
                    field
                }, this.timerFunc)    
            } else {
                this.getRandomField()
            }
                   
        
    }

    timerFunc = () => {
        this.timer = window.setTimeout(this.onEndTimeout, this.props.mode.delay);
    }

    onFieldClick = (box) => {
        if (this.timer) {
            if(box.active){
                clearTimeout(this.timer);
                this.timer = 0;
                this.setPlayerWins()
                this.getRandomField()
            }  else {
                clearTimeout(this.timer);
                this.timer = 0;
                this.setComputerWins()
                this.getRandomField()
            }
        }
        
    }

    onEndTimeout = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = 0;
            this.setComputerWins()
            this.getRandomField()
        }
    }

    setComputerWins = () => {
        let newFields = this.state.fields;
        newFields[this.state.row][this.state.field].computer = true;
        newFields[this.state.row][this.state.field].completed = true;
        this.setState({
            fields: newFields
        })
    }

    setPlayerWins = () => {
        let newFields = this.state.fields;
        newFields[this.state.row][this.state.field].user = true;
        newFields[this.state.row][this.state.field].completed = true;
        this.setState({
            fields: newFields
        })
    }

    isFinished = () => {
       return this.isCompWins() || this.isUserWins()
    }

    isUserWins = () => {
        let allBoxes = 0;
        let user = 0;
        this.state.fields.map((it) => {
            it.map(box => {
                allBoxes += 1;
                if(box.user){
                    user += 1
                }
            })
        })
        if(user > Math.floor(allBoxes / 2)){
            this.props.setWinner(this.props.name)
        }

        return (user > Math.floor(allBoxes / 2))
    }

    isCompWins = () => {
        let allBoxes = 0;
        let comp = 0;
        this.state.fields.map((it) => {
            it.map(box => {
                allBoxes += 1;
                if(box.computer){
                    comp += 1
                }
            })
        })
        if(comp > Math.floor(allBoxes / 2)){
            this.props.setWinner("Computer")
        }


        return (comp > Math.floor(allBoxes / 2))
    }



    render() {
        const { fields } = this.state;
        return (
            <div id='fields'>
                {fields.map((it, i) => (
                    <React.Fragment key={i}>
                        <div className='horizontal' > 
                            {it.map((box,i) => (
                                <Box
                                    key={i}
                                    box={box}
                                    onFieldClick={this.onFieldClick}
                                />
                            ))}  
                        </div>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

