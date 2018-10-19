var inquirer = require("inquirer");

// Set initial health amounts.
var userHealth = 70;
var zombieHealth = 15;

// Function that checks if the user won or lost.
function checkRound() {

  console.log("");
  console.log("");

  // If the user has less than 0 health.... then the user lost.
  if (userHealth <= 0) {

    console.log("###############################################");
    console.log("");
    console.log("Game over dude. It looks like you're dead.");
    console.log("");
    console.log("###############################################");

    // Exit the game
    process.exit();
  }

  // If the zombie has less than 0 health.... then the user won.
  if (zombieHealth <= 0) {

    console.log("###############################################");
    console.log("");
    console.log("Victory! You defeated the zombie and survived!");
    console.log("");
    console.log("###############################################");

    // Exit the game
    process.exit();
  }

  // After performing the "check", the next round is initiated.
  playRound();

}


// This function holds the game logic
function playRound() {

  // List prompt specifying that the user must pick a random number between 1 and 5.
  inquirer.prompt([
    {
      type: "list",
      name: "userGuess",
      message: "Try to stay alive! Guess a number between [1-5]",
      choices: ["1", "2", "3", "4", "5"]
    }

  ]).then(function(guess) {

    // If the user is still alive or the zombie is still alive
    if (userHealth > 0 || zombieHealth > 0) {

      // Assign a random damage value for the round.
      var damage = Math.floor(Math.random() * 5) + 1;

      // The zombie should choose a random number.
      var zombieNum = Math.floor((Math.random() * 5)) + 1;
      console.log("");
      console.log("");
      console.log("Zombie rolled " + zombieNum);

      // If the user's guess matches the number then...
      if (zombieNum === parseInt(guess.userGuess)) {

        // Subtract the damage amount from the zombie's health.
        zombieHealth -= damage;
        console.log("YOU HIT THE ZOMBIE WITH " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();
      }

      else {
        // Subtract the damage amount from the user's health.
        userHealth -= damage;
        console.log("OH NO! The zombie slashed you with " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();

      }
    }
  });
}

// Starts the game!
playRound();
