// just for testing, replace with proper input methods later
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const starter_characters = require("./starter_characters.json");
const game_events = require("./game_events.json");
const acronyms = require("./acronyms.json");

async function game(char_num) {
    var player = starter_characters[char_num];
    for (let i = 0; i < game_events.length; i++) {
        let event = game_events[i];
        if (event.payday == 1) {
            console.log("Payday!"); // LINK: display this text on the webpage
            player.money += player.salary;
            console.log(`Money: ${player.salary}`)
        } else {
            console.log(event.text); // LINK: display this text on the webpage
            let response = await prompt(`type ${event.options[0].option} / ${event.options[1].option}: `);
            console.log(event.options[response].text); // LINK: create 2 buttons that input 0 or 1
            let results = event.options[response].results;
            for (let change in results) {
                console.log(`${acronyms[change]}: ${results[change]}`);
                player[change] += results[change];
            };
        };
        console.log(player); // LINK: display all stats, update when necessary
        console.log("\n");
    };
    rl.close();
};

// LINK: create a button that calls the game() function
(async () => {
    await game(0); // 0: Anne, 1: Rishabh, 2: Josh, 3: Jolene
})();