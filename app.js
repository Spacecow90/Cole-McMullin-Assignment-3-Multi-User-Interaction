const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/2D.html' );
});

app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/3D.html' );
});

//socket.io stuff
//https://socket.io/docs/v3/emit-cheatsheet/
io.on('connection', (socket) => {
    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("runner", (data) => {
        console.log( "runner button pressed" );
        io.emit('assignOtherRole', "runner");       //to all connected clients
    });
    socket.on("guide", (data) => {
        console.log( "guide button pressed" );
        io.emit('assignOtherRole', "guide");         //to all connected clients
    });
    
    socket.on("endmaze", (data) => {
        console.log( "maze end reached" );
        io.emit('competitive_start', "guide");         //to all connected clients
    });
    //when the runner wins this is called
    socket.on("runnerwins", (data) => {
        console.log( "runner wins the game" );
        io.emit('display_winner', "runner");         //to all connected clients
    });
    //when the guide wins this is called
    socket.on("guidewins", (data) => {
        console.log( "guide wins the game" );
        io.emit('display_winner', "guide");         //to all connected clients
    });

    // door signal codes
    //open and close the red door
    socket.on("togglered", (data) => {
        console.log( "red door toggle" );
        io.emit('door_control', "red");         //to all connected clients
    });
    //open and close the blue door
    socket.on("toggleblue", (data) => {
        console.log( "blue door toggle" );
        io.emit('door_control', "blue");         //to all connected clients
    });
    //open and close the green door
    socket.on("togglegreen", (data) => {
        console.log( "green door toggle" );
        io.emit('door_control', "green");         //to all connected clients
    });
    //open and close the yellow door
    socket.on("toggleyellow", (data) => {
        console.log( "yellow door toggle" );
        io.emit('door_control', "yellow");         //to all connected clients
    });


    //question 1: how do you continuously update the network, e.g., users position and orientation?
    //question 2: how do you synch clients to current state?
});

app.use(express.static(__dirname + '/public')); //set root path of server ...
server.listen(LISTEN_PORT);
console.log("Listening on port: " + LISTEN_PORT );