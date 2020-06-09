import fs from "fs";
import ContributorsJsonFile from "./ContributorsJsonFile";
import { ContributorsRenderer } from "..";
import render from "./RenderToFile/render";
import { cyan } from "chalk";

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

    private loadRenderTo() {
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

    private saveRenderTo() {
        return fs.writeFileSync(this.config.path, this.content);
    }

    getContent() {
        return this.content;
    }

    async generate({ contributorsListFile, renderer }: GenerateArgs) {
        await this.loadRenderTo();

        const content = render(contributorsListFile.getContributorsList(), renderer);
        const regex = new RegExp(/<!-- CONTREEBUTORS:START.*<!-- CONTREEBUTORS:END -->/s);
        if (this.content.match(regex)) {
            this.content = this.content.replace(regex, content);
        } else {
            this.content += `\n${content}`;
        }

        await this.saveRenderTo();
        console.log(cyan(`${this.config.path} file updated.`));
    }
}
