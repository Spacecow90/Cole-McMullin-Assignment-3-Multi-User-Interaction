"use strict";
let previousDoor = null;


AFRAME.registerComponent('doorInfo', {
    schema: {
        open: {type: "boolean", default:false},  
      },
});




function teleportPlayer(playerRole, mode) {
    const playerCamRig = document.querySelector('#cameraRig');

//used when the players are starting the game and picking roles
if(mode == "start")
{
    if(playerRole == "runner")
    {    
        playerCamRig.setAttribute("position","0 0 -20")    
    }
    else if (playerRole == "guide")
    {
        playerCamRig.setAttribute("position","55 0 -60")
    }
}
//used when the maze runner has completed the maze, it will teleport all the players to their final rooms. 
else if(mode == "end")
{ 
    playerCamRig.setAttribute("position","0 0 -90") 
}
//updates the players location so that when they moved they aren't returned to the confines of their previous navmesh
playerCamRig.components['movement-controls'].updateNavLocation();
}


//takes an input of a door object with a certain id that matches the naming of the objects, it then moves that door down into the floor, this closes all other doors. 
function moveDoor(door){

    const redDoor = document.querySelector('#redDoor');
    const yellowDoor = document.querySelector('#yellowDoor');
    const greenDoor = document.querySelector('#greenDoor');
    const blueDoor = document.querySelector('#blueDoor');

    if(door == "red")
    {
        
        if(redDoor.getAttribute('doorInfo').open == true)
        {
            //close the red door
            console.log("closing red door");
            redDoor.setAttribute('doorInfo','open:false');
            closeDoor(redDoor);
        }
        else
        {
            //open the red door and close all others
            console.log("opening red door");
            redDoor.setAttribute('doorInfo','open:true');
            openDoor(redDoor);
        }
    }
    else if (door == "yellow")
    {
        if(yellowDoor.getAttribute('doorInfo').open ==true)
        {
            //close the yellow door
            yellowDoor.setAttribute('doorInfo','open:false');
            closeDoor(yellowDoor);
        }
        else
        {
            //open the red door and close all others
            yellowDoor.setAttribute('doorInfo','open:true');
            openDoor(yellowDoor);
        }
    }
    else if (door == "green")
    {
        if(greenDoor.getAttribute('doorInfo').open == true)
        {
            //close the red door
            greenDoor.setAttribute('doorInfo','open:false');
            closeDoor(greenDoor);
        }
        else
        {
            //open the red door and close all others
            greenDoor.setAttribute('doorInfo','open:true');
            openDoor(greenDoor);
        }
    }
    else if (door == "blue")
    {
        if(blueDoor.getAttribute('doorInfo').open == true)
        {
            //close the red door
            blueDoor.setAttribute('doorInfo','open:false');
            closeDoor(blueDoor);
        }
        else
        {
            //open the red door and close all others
            blueDoor.setAttribute('doorInfo','open:true');
            openDoor(blueDoor);
        }
    }
    
}

//animates door opening
function openDoor(door)
{
    //closes the last door that was open
    if(previousDoor != null)
    {
        closeDoor(previousDoor);
    }
    console.log(door);
    door.emit('openDoor',null,false);
    previousDoor = door;
}
function closeDoor(door)
{
    door.emit('closeDoor',null,false);
    door.getAttribute('doorInfo').open = false;
    //all doors will be shut
    previousDoor = null;
}
//take a key input and add it to an array code, 
function keyInput(){

}