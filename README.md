#Toy Robot App

Frameworks Used:
- React 16
- Babel
- ES6
- Material UI
- Karma (tests)
- Mocha (tests)
- Enzyme (tests)
- Expect (tests)
- Node JS
- Webpack

Application:
The application has 3 Components. TableTop component is the one that controls the robot movement.
TableTop uses Styles attributes from css for the interface and inLineStyles for the Material UI components configuration.
As you can see described on the component, each state attribute has its own purpose. 

For the robot movement, evety time an action is done towards the robot a message is displayed on the interface to indidate the new robot's position.
If the new Robot position is invalid, a error message is displayed and the robot keeps the current position. 

Framework:
As indicated above I used React 16 to build the app. It's a framework that I enjoy and that I am getting more familiar with.
For testing I used Karma, Mocha and Enzyme. Enzyme is a very powerful tool that enables to instantiate the components, simluate events and verify prosp and states values.

On the backend I have created a simple NodeJS server with Webpack.


