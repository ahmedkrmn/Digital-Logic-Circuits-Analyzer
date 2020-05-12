## Digital Logic Circuits Analyzer

A modern web application based on deep learning and advanced image processing techniques to analyze images of logic circuits and simulate their truth table.

#### Application Demo

![Demo](demo.gif)

#### Tech Stack

The application is made up of three separate parts interacting with each other to produce this final output.

1. A frontend using JavaScript, jQuery, Bootstrap, HTML, CSS and an open source circuit drawing [tool](https://github.com/circuitdiagram).
2. A [server](https://github.com/ahmedkrmn/Digital-Logic-Circuits-Analyzer-Server) with Python installed which is responsible for the analysis and computations.
3. A REST API written in Express and Nodejs which glues the previous two parts together.

**The only configuration that you have to change if you want to deploy your modified version of this frontend, is to set your backend API link in the `config.js` file in the root of this directory.**
