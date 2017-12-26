'use strict'

const xSize = 99
const ySize = 99
const exits = [[0,0], [99, 99]]
let currentLocation = [0,0]
let previous = [0,0]
let steps = 0
let arrivedAtExit = false
let validSteps
let chosenStep
//walk the grid
while (!arrivedAtExit){
  
  validSteps = getValidSteps(currentLocation, previous)
  //pick a step:
  chosenStep = randomIntFromInterval(0,validSteps.length-1)
  //go to that step
  currentLocation = validSteps[chosenStep]
  //increment counter
  steps++

  //check if the walk is done.
  arrivedAtExit = atExit(currentLocation)
}

console.log('steps to exit:'+steps)
//array comparison in javascript: not my favorite.
function atExit(currentLocation){
  let i
  //can't use forEach here because the return true just ends the forEach's anonymous function!
  for (i=0;i<exits.length;i++){
    if (exits[i][0] == currentLocation[0] && exits[i][1] == currentLocation[1]){
      return true
    }
  }
  
  return false
}

/*returns an array of valid potential steps in the walk. We must step somewhere, and we won't retread the previous step.*/
function getValidSteps(currentLocation, previous){
  let validSteps = []
  //these are a little silly but they make validation a bit easier to read.
  const x = currentLocation[0]
  const y = currentLocation[1]
  let xPlusOne = currentLocation[0]+1
  let yPlusOne = currentLocation[1]+1
  let xMinusOne = currentLocation[0]-1
  let yMinusOne = currentLocation[1]-1
  //validate these
  if (xPlusOne > xSize){
    xPlusOne = false;
  }
  if (xMinusOne < 0){
    xMinusOne = false;
  }
  if (yPlusOne > ySize){
    yPlusOne = false;
  }
  if (yMinusOne < 0){
    yMinusOne = false;
  }
  //eight potential steps:
  //x+1, y+1
  if (xPlusOne && yPlusOne && (xPlusOne != previous[0] || yPlusOne != previous[1]) ){
    validSteps.push([xPlusOne, yPlusOne])
  }
  //x+0, y+1
  if (yPlusOne && (x != previous[0] || yPlusOne != previous[1]) ){
    validSteps.push([x, yPlusOne])
  }
  //x-1, y+1
  if (xMinusOne && yPlusOne && (xMinusOne != previous[0] || yPlusOne != previous[1]) ){
    validSteps.push([xMinusOne, yPlusOne])
  }
  //x+1, y
  if (xPlusOne && (xPlusOne != previous[0] || y != previous[1]) ){
    validSteps.push([xPlusOne, y])
  }
  //x-1, y
  if (xMinusOne && (xMinusOne != previous[0] || y != previous[1]) ){
    validSteps.push([xMinusOne, y])
  }
  //x+1, y-1
  if (xPlusOne && yMinusOne && (xPlusOne != previous[0] || yMinusOne != previous[1]) ){
    validSteps.push([xPlusOne, yMinusOne])
  }
  //x, y-1
  if (yMinusOne && (x != previous[0] || yMinusOne != previous[1] )){    
    validSteps.push([x, yMinusOne])
  }
  //x-1, y-1
  if (xMinusOne && yMinusOne && (xMinusOne != previous[0] ||  yMinusOne != previous[1]) ){
    validSteps.push([xMinusOne, yMinusOne])
  }
  return validSteps
} 
//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}