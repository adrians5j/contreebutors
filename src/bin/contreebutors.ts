#! /usr/bin/env node
import yargs from "yargs";
import { Contreebutors } from "./..";

yargs.command({
    command: "add",
    describe: "Adds a new contributor to the contributors list.",
    builder: {
        user: {
            type: "string",
            demandOption: true,
            describe: "GitHub username"
        }
    },
    handler: function(argv) {
        const contreebutors = new Contreebutors();
        contreebutors.add(argv.user);
    }
});

yargs.parse();
