#!/usr/bin/env node

const readline = require('readline');

const freezing = 0;
const boiling = 100;
const fluctuation = 0.5;
let state = '';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getTemperaturePair = (ary, index) => {
	return [ary[index],ary[index + 1]];
}

const checkState = (prevTemp, temp) => {
  // check freezing
  if (prevTemp > freezing && temp <= freezing) {
    state = 'freezing';
  }
  // check unfreezing
  if (prevTemp <= freezing && temp > (freezing + fluctuation)) {
    state = 'unfreezing';
  }
  // check boiling
  if (prevTemp < boiling && temp >= boiling) {
    state = 'boiling';
  }
  // check unboiling
  if (prevTemp >= boiling && temp < (boiling - fluctuation)) {
    state = 'unboiling';
  }
}

rl.question('\nTemperature Input: ', (input) => {
  let temperatureArray = input.split(' ');
  let tempArrayLength = temperatureArray.length - 1;
  let result = `${temperatureArray[0]} `;

  for(let tempArrayIndex = 0; tempArrayIndex < tempArrayLength; tempArrayIndex++) {
    let tempPair = getTemperaturePair(temperatureArray, tempArrayIndex);
    let prevState = state;

    checkState(tempPair[0], tempPair[1]);

    if (state !== prevState) {
      result += `${tempPair[1]} ${state} `;
    } else {
      result += `${tempPair[1]} `;
    }
  }

  console.log(`\nCalculated result: ${result}`);

  rl.close();
});
