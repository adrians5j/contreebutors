import fs from "fs";
import ContributorsJsonFile from "./ContributorsJsonFile";
import { ContributorsRenderer } from "..";
import render from "./RenderToFile/render";

export type RenderToFileConfig = {
    path: string;
};

export type GenerateArgs = {
    contributorsListFile: ContributorsJsonFile;
    renderer?: ContributorsRenderer;
};

export default class RenderToFile {
    private config: RenderToFileConfig;
    private content: string;

    constructor(config: RenderToFileConfig) {
        this.config = config;
        this.content = null;
    }

    load() {
        if (this.content !== null) {
            return this.content;
        }

        try {
            this.content = fs.readFileSync(this.config.path, "utf8");
        } catch {
            this.content = "";
        }

        return this.content;
    }

    save() {
        return fs.writeFileSync(this.config.path, this.content);
    }

    getContent() {
        return this.content;
    }

    generate({ contributorsListFile, renderer }: GenerateArgs) {
        const content = render(contributorsListFile.getContributorsList(), renderer);
        const regex = new RegExp(/<!-- CONTREEBUTORS:START.*<!-- CONTREEBUTORS:END -->/s);
        if (this.content.match(regex)) {
            this.content = this.content.replace(regex, content);
        } else {
            this.content += `\n${content}`;
        }

        return this;
    }
}
