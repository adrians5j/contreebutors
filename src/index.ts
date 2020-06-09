import got from "got";
import ContributorsJsonFile, { ContributorsList } from "./files/ContributorsJsonFile";
import path from "path";
import RenderToFile from "./files/RenderToFile";
import { red, green } from "chalk";

export type ContributorsRenderer = (contributorsList: ContributorsList) => string;

export type ContreebutorsConfig = {
    cwd?: string;
    contributorsListPath?: string;
    renderToPath?: string;
    renderer?: ContributorsRenderer;
};

export class Contreebutors {
    config: ContreebutorsConfig;
    constructor(config: ContreebutorsConfig = {}) {
        this.config = {
            cwd: process.cwd(),
            renderToPath: "./README.md",
            contributorsListPath: "./contreebutors.json",
            ...config
        };
    }

    async add(args: { username: string }) {
        let user;

        try {
            const response = await got.get(`https://api.github.com/users/${args.username}`, {
                responseType: "json"
            });
            user = response.body;
        } catch (e) {
            console.log(
                red(
                    `The following error occurred while trying to fetch data for user "${args.username}":`
                )
            );
            console.log(red(e.message));
            return;
        }

        const contributorsListFile = new ContributorsJsonFile({
            path: path.join(this.config.cwd, this.config.contributorsListPath)
        });

        await contributorsListFile.add({
            username: user.login,
            name: user.name,
            profileUrl: user.html_url,
            avatarUrl: user.avatar_url
        });

        const renderToFile = new RenderToFile({
            path: path.join(this.config.cwd, this.config.renderToPath)
        });

        await renderToFile.generate({ contributorsListFile, renderer: this.config.renderer });

        console.log(green(`🌳 User "${args.username}" was successfully added to the contributors list.`))
    }
}
