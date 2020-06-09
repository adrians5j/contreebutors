#! /usr/bin/env node
import yargs from "yargs";
import { Contreebutors } from "./..";

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
    handler: function(argv: { username: string }) {
        const contreebutors = new Contreebutors();
        return contreebutors.add(argv);
    }
});

yargs.parse();
