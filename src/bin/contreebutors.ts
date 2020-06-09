#! /usr/bin/env node
import yargs from "yargs";
import { Contreebutors } from "./..";
import { red, yellow, green } from "chalk";

const createHandler = callback => {
    return async (...args) => {
        try {
            await callback(...args);
            process.exit(0);
        } catch (e) {
            if (e.type === "warning") {
                console.log(yellow(e.message));
                process.exit(0);
            }

            console.log(red(e.message));
            const exitCode = args[0].noErrors ? 0 : 1;
            process.exit(exitCode);
        }
    };
};

yargs.command({
    command: "add",
    describe: "Adds a new contributor to the contributors list",
    builder: {
        username: {
            type: "string",
            demandOption: true,
            describe: "GitHub username"
        },
        noErrors: {
            type: "boolean",
            describe: "Forces the process to finish with exit code 0"
        }
    },
    handler: createHandler(async function(argv: { username: string }) {
        const contreebutors = new Contreebutors();
        await contreebutors.add(argv);
        console.log(
            green(`🌳 User "${argv.username}" was successfully added to the contributors list.`)
        );
    })
});

yargs.command({
    command: "render",
    describe: "Renders the contributors list in specified file (README.md by default)",
    builder: {
        noErrors: {
            type: "boolean",
            describe: "Forces the process to finish with exit code 0"
        }
    },
    handler: createHandler(async function() {
        const contreebutors = new Contreebutors();
        await contreebutors.render();
        console.log(green(`🌳 The contributors list was successfully rendered.`));
    })
});

yargs.parse();
