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

Although is not required to create an interface I thought it would be useful to display the control of the robot. And since I decided to create in React I think it will make ore sense as well.
The UI is very simple where the user indicates where he needs to place the robot. There is a validation for the right values on the input. But again, the 
interface is very simple since this was not the purpose of the application.

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


