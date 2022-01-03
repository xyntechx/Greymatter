// just for testing, replace with proper input methods later
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const starter_characters = require("./starter_characters.json");
const game_events = require("./game_events.json");

async function game(char_num) {
    var player = starter_characters[char_num];
    for (let i = 0; i < game_events.length; i++) {
        let event = game_events[i];
        console.log(event.text);
        let response = await prompt("type 0/1: ") 
        if (response == "0") {
            console.log(event.yes.text);
            modify(player, event.yes.results);
        }
        else if (response == "1") {
            console.log(event.no.text);
            modify(player, event.no.results);
        };
    };
    rl.close();
};

function modify(player, results) {
    for (let change in results) {
        player[change] += results[change];
    };
};

(async () => {
    await game(0); // 0: Anne, 1: Rishabh, 2: Josh, 3: Jolene
})();