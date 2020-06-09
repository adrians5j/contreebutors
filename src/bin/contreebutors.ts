#! /usr/bin/env node
import yargs from "yargs";
import { Contreebutors } from "./..";
import { red } from "chalk";

const createHandler = callback => {
    return async (...args) => {
        try {
            await callback(...args);
            process.exit(0);
        } catch (e) {
            console.log(red(e.message));
            process.exit(1);
        }
    };
};

yargs.command({
    command: "add",
    describe: "Adds a new contributor to the contributors list.",
    builder: {
        username: {
            type: "string",
            demandOption: true,
            describe: "GitHub username"
        }
    },
    handler: createHandler(async function(argv: { username: string }) {
        const contreebutors = new Contreebutors();
        return contreebutors.add(argv);
    })
});

yargs.command({
    command: "render",
    describe: "Renders the contributors list in specified file (README.md by default).",
    handler: createHandler(async function() {
        const contreebutors = new Contreebutors();
        return contreebutors.render();
    })
});

yargs.parse();
