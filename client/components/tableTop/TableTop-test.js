import React from 'react';
import TableTop from './TableTop';
var { shallow, mount } = require('enzyme');
const chai = require('chai');
const expect = chai.expect;

describe('TableTop', function () {
    let wrapperMount;
    let component;
    let instance;

    beforeEach(() => {
        wrapperMount = mount(<TableTop />);
        component = wrapperMount.find('TableTop');
        instance = component.instance();
    });

    it('Test initialized Robot', function () {
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-0, Facing: NORTH');
    });

    it('Test Robot Rotation', function () {
        instance.state.robot.face = 'EAST';
        instance.rotateRobot(true);
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-0, Facing: SOUTH');
        instance.rotateRobot(false);
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-0, Facing: EAST');
        instance.rotateRobot(false);
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-0, Facing: NORTH');
    });

    it('Test Robot Movement - NORTH', function () {
        instance.state.robot.face = 'NORTH';
        instance.state.robot.rx = 0;
        instance.state.robot.ry = 0;
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-1, Facing: NORTH');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(1);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-2, Facing: NORTH');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(2);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-3, Facing: NORTH');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(3);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-4, Facing: NORTH');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(4);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is out of Bounds. Back to the last valid position.');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(4);        
    });

    it('Test Robot Movement - EAST', function () {
        instance.state.robot.face = 'EAST';
        instance.state.robot.rx = 2;
        instance.state.robot.ry = 2;
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 3-2, Facing: EAST');
        expect(instance.state.robot.rx).to.equal(3);
        expect(instance.state.robot.ry).to.equal(2);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 4-2, Facing: EAST');
        expect(instance.state.robot.rx).to.equal(4);
        expect(instance.state.robot.ry).to.equal(2);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is out of Bounds. Back to the last valid position.');
        expect(instance.state.robot.rx).to.equal(4);
        expect(instance.state.robot.ry).to.equal(2);   
    });

    it('Test Robot Movement - WEST and rotate', function () {
        instance.state.robot.face = 'WEST';
        instance.state.robot.rx = 1;
        instance.state.robot.ry = 2;
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-2, Facing: WEST');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(2);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is out of Bounds. Back to the last valid position.');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(2); 
        instance.rotateRobot(false); 
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-2, Facing: SOUTH');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(2); 
    });

    it('Test Robot Movement - SOUTH and rotate', function () {
        instance.state.robot.face = 'SOUTH';
        instance.state.robot.rx = 3;
        instance.state.robot.ry = 1;
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 3-0, Facing: SOUTH');
        expect(instance.state.robot.rx).to.equal(3);
        expect(instance.state.robot.ry).to.equal(0);
        instance.rotateRobot(true); 
        expect(instance.state.reportStatus).to.equal('Robot is at position: 3-0, Facing: WEST');
        expect(instance.state.robot.rx).to.equal(3);
        expect(instance.state.robot.ry).to.equal(0);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 2-0, Facing: WEST');
        expect(instance.state.robot.rx).to.equal(2);
        expect(instance.state.robot.ry).to.equal(0);
    });

    it('Test Place Robot', function() {
        const state = instance.state;
        state.robot.face = 'NORTH';
        state.robot.rx = 0;
        state.robot.ry = 0;

        state.placeInput.x = 3;
        state.placeInput.y = 3;
        state.placeInput.face = 'NORTH';
        instance.placeRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 3-3, Facing: NORTH');
        expect(instance.state.robot.rx).to.equal(3);
        expect(instance.state.robot.ry).to.equal(3);

        state.placeInput.x = 0;
        state.placeInput.y = 3;
        state.placeInput.face = 'EAST';
        instance.placeRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-3, Facing: EAST');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(3);

        state.placeInput.x = 99;
        state.placeInput.y = 0;
        state.placeInput.face = 'EAST';
        instance.placeRobot();
        expect(instance.state.reportStatus).to.equal('Robot is out of Bounds. Back to the last valid position.');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(3);

        state.placeInput.x = 1;
        state.placeInput.y = -10;
        state.placeInput.face = 'EAST';
        instance.placeRobot();
        expect(instance.state.reportStatus).to.equal('Robot is out of Bounds. Back to the last valid position.');
        expect(instance.state.robot.rx).to.equal(0);
        expect(instance.state.robot.ry).to.equal(3);
    });

    it('Test Robot - Example B', function () {
        const state = instance.state;
        state.placeInput.x = 0;
        state.placeInput.y = 0;
        state.placeInput.face = 'NORTH';
        instance.placeRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-0, Facing: NORTH');
        
        instance.rotateRobot(false);
        expect(instance.state.reportStatus).to.equal('Robot is at position: 0-0, Facing: WEST');
    });
 
    it('Test Robot - Example C', function () {
        const state = instance.state;
        state.placeInput.x = 1;
        state.placeInput.y = 2;
        state.placeInput.face = 'EAST';
        instance.placeRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 1-2, Facing: EAST');
        
        instance.moveRobot();
        instance.moveRobot();
        instance.rotateRobot(false);
        instance.moveRobot();
        expect(instance.state.reportStatus).to.equal('Robot is at position: 3-3, Facing: NORTH');
    });
    
});
