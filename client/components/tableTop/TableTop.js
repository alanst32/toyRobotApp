import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField';
import styles from './TableTop.css';
import { withStyles } from '@material-ui/core/styles';

const inLineStyles = theme => ({
    textFieldInput: {
        fontSize: '16px'
    },
    reportLabel: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'red'
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'black',
        marginRight: '20px',
        marginLeft: '20px',
        paddingTop: '10px'
    },
    button: {
        fontSize: '16px',
        marginLeft: '20px'
    }
});

class TableTop extends React.Component {
    constructor(){
        super();

        this.state={
            // Atrribute that display the robot report status
            reportStatus: '',
            direction: {
                NORTH: 'NORTH',
                SOUTH: 'SOUTH',
                EAST: 'EAST',
                WEST: 'WEST'
            },
            // Attributes that control the boundaries of the grid
            grid: {
                ix: 0, // X initial value
                sx: 4, // X size
                iy: 0, // Y initial value
                sy: 4, // Y size
            },
            // Attributes that control the robot's position
            robot: {
                rx: 0, // X robot position,
                ry: 0,// Y robot position,
                face: 'NORTH'
            },
            // Atributes that control the input values
            placeInput: {
                x: 0,
                y: 0,
                face: 'NORTH'
            },
            // Attribute that control the messages according the scenarios
            msg: {
                INVALID: 'Invalid parameters',
                OUT_OF_BOUNDS: 'Robot is out of Bounds. Back to the last valid position.',
                ROBOT_POSITION: 'Robot is at position:',
                FACING: 'Facing: '
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // set the intial position of the robot
        this.setState((state) => {
            state.robot.rx = 0;
            state.robot.ry = 0;
            state.robot.face = this.state.direction.NORTH;
        });
        this.publishesReport();
    }

    /**
     * Handle the change of the inputs
     * @param {*} event
     */
    handleChange(event) {
        event.persist();
        this.setState((state) => state.placeInput[event.target.id] = event.target.value);
    }

    /**
     * Publishes the report on the UI
     */
    publishesReport = () => {
        const msg = `${this.state.msg.ROBOT_POSITION} ${this.state.robot.rx}-${this.state.robot.ry}, ${this.state.msg.FACING}${this.state.robot.face}`;  
        this.setState((state) => state.reportStatus = msg);
    }

    /**
     * Publishes out of bounds msg
     */
    publishOutOfBounds = () => {
        const msg = `${this.state.msg.OUT_OF_BOUNDS}`;  
        this.setState((state) => state.reportStatus = msg);
    }

    /**
     * Publishes Invalid Parameters msg
     */
    publishInvalidParameters = () => {
        const msg = `${this.state.msg.INVALID}`;  
        this.setState((state) => state.reportStatus = msg);
    }
    
    /**
     * Check if the robot is in a valid position. Otherwise publishes out of bounds msg
     */
    isValidPosition = (newX, newY) => {
        if(newX === 0 && newY === 0) return true;
        if(newX >= this.state.grid.ix && 
            newX <= this.state.grid.sx &&
            newY >= this.state.grid.iy &&
            newY <= this.state.grid.sy ) {
                return true;
        }
        this.publishOutOfBounds();
        return false;
    }

    /**
     * Place the robot according to the text fields
     */
    placeRobot = () => {
        let isInvalid = false;
        if(this.state.placeInput.x === ''||
            this.state.placeInput.y === '' ||
            this.state.placeInput.face === '') {
                isInvalid = true;    
        }
        
        if(this.state.placeInput.face !== this.state.direction.NORTH &&
            this.state.placeInput.face !== this.state.direction.EAST &&
            this.state.placeInput.face !== this.state.direction.WEST &&
            this.state.placeInput.face !== this.state.direction.SOUTH ) {
            isInvalid = true;
        } 

        if(isInvalid) {
            this.publishInvalidParameters();
            return;
        }

        const newX = this.state.placeInput.x;
        const newY = this.state.placeInput.y;
        if(this.isValidPosition(newX, newY)) {
            this.setState((state) => {
                state.robot.rx = newX;
                state.robot.ry = newY;
                state.robot.face = this.state.placeInput.face;
                this.publishesReport();
            });
        }
    }

    /**
     * Move the robot one step further its direction
     */
    moveRobot = () => {
        switch(this.state.robot.face) {
            case this.state.direction.NORTH:
                this.setState((state) => {
                    const sameX = state.robot.rx;
                    const newY = state.robot.ry + 1;
                    if(this.isValidPosition(sameX, newY)) {
                        state.robot.ry = newY;
                        this.publishesReport()
                    }
                });
                return;
            case this.state.direction.EAST:
                this.setState((state) => {
                    const newX = state.robot.rx + 1;
                    const sameY = state.robot.ry;
                    if(this.isValidPosition(newX, sameY)) {
                        state.robot.rx = newX;
                        this.publishesReport()
                    }
                });
                return;
            case this.state.direction.SOUTH:
                this.setState((state) => {
                    const sameX = state.robot.rx;
                    const newY = state.robot.ry - 1;
                    if(this.isValidPosition(sameX, newY)) {
                        state.robot.ry = newY;
                        this.publishesReport()
                    }
                });
                return;
            case this.state.direction.WEST:
                this.setState((state) => {
                    const newX = state.robot.rx - 1;
                    const sameY = state.robot.ry;
                    if(this.isValidPosition(newX, sameY)) {
                        state.robot.rx = newX;
                        this.publishesReport();
                    }
                });
                return;
        }
    }

    /**
     * Rotate the robot Left or Right direction
     */
    rotateRobot = (isRight) => {
        switch(this.state.robot.face) {
            case this.state.direction.NORTH:
                this.setState((state) => {
                    state.robot.face = isRight ? this.state.direction.EAST :
                        this.state.direction.WEST;
                    this.publishesReport();
                });
                return;
            case this.state.direction.EAST:
                this.setState((state) => {
                    state.robot.face = isRight ? this.state.direction.SOUTH :
                        this.state.direction.NORTH;
                    this.publishesReport();
                });
                return;
            case this.state.direction.SOUTH:
                this.setState((state) => {
                    state.robot.face = isRight ? this.state.direction.WEST :
                        this.state.direction.EAST;
                    this.publishesReport();
                });
                return;
            case this.state.direction.WEST:
                this.setState((state) => {
                    state.robot.face = isRight ? this.state.direction.NORTH :
                        this.state.direction.SOUTH;
                    this.publishesReport();
                });
                return;
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={styles.divStyle}>
                <div className={styles.reportStatus}>
                    <InputLabel
                        classes={{
                            root: classes.reportLabel
                        }}>
                        {this.state.reportStatus}
                    </InputLabel>
                </div>
                <div className={styles.components}>
                    <InputLabel
                        classes={{
                            root: classes.label
                        }}>
                        1) PLACE
                    </InputLabel>
                </div>   
                <div className={styles.components}>
                    <InputLabel 
                        classes={{
                            root: classes.label
                        }}>
                        X:
                    </InputLabel>
                    <TextField id='x'
                        placeholder="X"
                        className={styles.textField}
                        InputProps={{
                            classes: {
                                input: classes.textFieldInput
                            }
                        }}
                        onBlur={this.handleChange}/>          
                    <InputLabel 
                        classes={{
                            root: classes.label
                        }}>
                        Y:
                    </InputLabel>
                    <TextField id='y'
                        placeholder="Y"
                        className={styles.textField}
                        InputProps={{
                            classes: {
                                input: classes.textFieldInput
                            }
                        }}
                        onBlur={this.handleChange}/>     
                    <InputLabel 
                        classes={{
                            root: classes.label
                        }}>
                        Face:
                    </InputLabel>
                    <TextField id='face'
                        placeholder="Face"
                        className={styles.textField}
                        InputProps={{
                            classes: {
                                input: classes.textFieldInput
                            }
                        }}
                        onChange={(event) => this.handleChange(event)}/>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={(event) => this.placeRobot(event)}
                        classes={{
                            root: classes.button
                        }}>
                        PLACE
                    </Button>
                </div>
                <div className={styles.components}>
                    <InputLabel
                        classes={{
                            root: classes.label
                        }}>
                        2) MOVE
                    </InputLabel>
                </div>
                <div className={styles.components}>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={(event) => this.moveRobot()}
                        classes={{
                            root: classes.button
                        }}>
                        MOVE
                    </Button>
                </div>  
                <div className={styles.components}>
                    <InputLabel
                        classes={{
                            root: classes.label
                        }}>
                        3) ROTATE
                    </InputLabel>
                </div>
                <div className={styles.components}>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={(event) => this.rotateRobot(false)}
                        classes={{
                            root: classes.button
                        }}>
                        LEFT
                    </Button>
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={(event) => this.rotateRobot(true)}
                        classes={{
                            root: classes.button
                        }}>
                        RIGHT
                    </Button>
                </div>    
            </div>
        );
    }
}

export default withStyles(inLineStyles)(TableTop);
