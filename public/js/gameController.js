"use strict";
let previousDoor = null;
//the password you need to get to win
const correctPass = ["8","2","1","3","5"];
//the password the player is entering
let password=["0","0","0","0","0"];
//helps the door hold onto if it's open or not so it can be toggled easily
AFRAME.registerComponent('doorInfo', {
    schema: {
        open: {type: "boolean", default:false},  
      },
});




function teleportPlayer(playerRole, mode) {
    const playerCamRig = document.querySelector('#cameraRig');
    document.querySelector('#button_sfx').play();
    
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

    const nav = document.querySelector('#navmesh');
    const allnav = document.querySelector('#allnavmesh');
    const rednav = document.querySelector('#rednavmesh');
    const yellownav = document.querySelector('#yellownavmesh');
    const greennav = document.querySelector('#greennavmesh');
    const bluenav = document.querySelector('#bluenavmesh');
    

    if(door == "red")
    {
        document.querySelector('#redDoorFrame').components.sound.playSound();
        if(redDoor.getAttribute('doorInfo').open == true)
        {
            
            //close the red door
            console.log("closing red door");
            redDoor.setAttribute('doorInfo','open:false');
            closeDoor(redDoor);
            nav.setAttribute('gltf-model',allnav.getAttribute("gltf-model"))
        }
        else
        {
            //open the red door and close all others
            console.log("opening red door");
            redDoor.setAttribute('doorInfo','open:true');
            openDoor(redDoor);
            console.log()
            nav.setAttribute('gltf-model',rednav.getAttribute("gltf-model"));
        }
    }
    else if (door == "yellow")
    {
        document.querySelector('#yellowDoorFrame').components.sound.playSound();
        if(yellowDoor.getAttribute('doorInfo').open ==true)
        {
            //close the yellow door
            yellowDoor.setAttribute('doorInfo','open:false');
            closeDoor(yellowDoor);
            nav.setAttribute('gltf-model',allnav.getAttribute("gltf-model"))
        }
        else
        {
            //open the yellow door and close all others
            yellowDoor.setAttribute('doorInfo','open:true');
            openDoor(yellowDoor);
            nav.setAttribute('gltf-model',yellownav.getAttribute("gltf-model"));
        }
    }
    else if (door == "green")
    {
        document.querySelector('#greenDoorFrame').components.sound.playSound();
        if(greenDoor.getAttribute('doorInfo').open == true)
        {
            //close the green door
            greenDoor.setAttribute('doorInfo','open:false');
            closeDoor(greenDoor);
            nav.setAttribute('gltf-model',allnav.getAttribute("gltf-model"))
        }
        else
        {
            //open the green door and close all others
            greenDoor.setAttribute('doorInfo','open:true');
            openDoor(greenDoor);
            nav.setAttribute('gltf-model',greennav.getAttribute("gltf-model"));
        }
    }
    else if (door == "blue")
    {
        document.querySelector('#blueDoorFrame').components.sound.playSound();
        if(blueDoor.getAttribute('doorInfo').open == true)
        {
            //close the blue door
            blueDoor.setAttribute('doorInfo','open:false');
            closeDoor(blueDoor);
            nav.setAttribute('gltf-model',allnav.getAttribute("gltf-model"))
        }
        else
        {
            //open the blue door and close all others
            blueDoor.setAttribute('doorInfo','open:true');
            openDoor(blueDoor);
            nav.setAttribute('gltf-model',bluenav.getAttribute("gltf-model"));
        }
    }
    
}

//animates door opening
function openDoor(door)
{
    document.querySelector('#button_sfx').play();
    //closes the last door that was open
    if(previousDoor != null)
    {
        closeDoor(previousDoor);
    }
    door.emit('openDoor',null,false);
    
 
    previousDoor = door;
}
function closeDoor(door)
{
    document.querySelector('#button_sfx').play();
    door.emit('closeDoor',null,false);
    
    door.getAttribute('doorInfo').open = false;
    //all doors will be shut
    previousDoor = null;
}
//take a key input and add it to an array code, 
function keyInput(keyInput){
    let passwordText = document.querySelector('#passwordText');
    //clear the password
    if(keyInput =="-1")
    {
        document.querySelector('#button_sfx').play();
        password = ["0","0","0","0","0"];

    }
    //confirms password
    else if (keyInput == "0")
    {
        
        //if all of the digits are correct then the player who entered it first wins!
        if(password[0] == correctPass[0] && password[1] == correctPass[1] && password[2] == correctPass[2] && password[3] == correctPass[3] && password[4] == correctPass[4])
        {
            document.querySelector('#button_sfx').play();
            endGame();
        }
        else
        {
         //play bad sound
         document.querySelector('#wrong_sfx').play();
         console.log("wrong answer");
        }
    }
    else
    {
        
        //keeps track of how many digits of the code are filled, if it finds all are filled, it makes a sound
        let filledCount = 0;
        for (let i = 0; i < password.length; i++) {
            
            //the first instance it finds where the index is still 0 it inserts the number there
            if(password[i] == "0")
            {
                password[i] = keyInput;
                break;
            }
            else{
                filledCount += 1;
            }
            
        }
        if(filledCount>= password.length)
        {
            console.log("code too long");
            document.querySelector('#tooMany_sfx').play();
        }
        else{
            document.querySelector('#button_sfx').play();
        }
        //resets count
        filledCount = 0;

    }
    //displays the current password on the in-game text on the wall
    passwordText.setAttribute("value",password[0]+password[1]+password[2]+password[3]+password[4]);
    console.log(password);
}
//reloads page, used when a player wins the game
function restart()
{
    location.reload();
}
