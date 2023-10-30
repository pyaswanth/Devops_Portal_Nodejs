import { performance } from 'perf_hooks';

// Start the timer
const startTime = performance.now();

// Your task here
// Example task: adding numbers from 1 to 10000000
let sum = 0;
for (let i = 1; i <= 1000000000000000; i++) {
    sum += i;
}

// End the timer
const endTime = performance.now();

// Calculate the time taken in milliseconds
const timeTakenInMilliseconds = endTime - startTime;

// Convert milliseconds to minutes and seconds
const timeTakenInMinutes = Math.floor(timeTakenInMilliseconds / 60000);
const remainingMilliseconds = timeTakenInMilliseconds % 60000;
const timeTakenInSeconds = remainingMilliseconds / 1000;

// Output the time taken in minutes and seconds
console.log(`Time taken: ${timeTakenInMinutes} minutes and ${timeTakenInSeconds} seconds.`);
