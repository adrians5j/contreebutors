import got from "got";
import ContributorsJsonFile, { ContributorsList } from "./files/ContributorsJsonFile";
import path from "path";
import RenderToFile from "./files/RenderToFile";
import { ContreebutorsError } from "./ContreebutorsError";

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
        const contributorsListFile = new ContributorsJsonFile({
            path: path.join(this.config.cwd, this.config.contributorsListPath)
        });

        await contributorsListFile.load();

        if (contributorsListFile.isAdded(args.username)) {
            throw new ContreebutorsError({
                type: "warning",
                message: `User "${args.username}" already added to the contributors list. Skipping...`
            });
        }

        let user;

        try {
            const response = await got.get(`https://api.github.com/users/${args.username}`, {
                responseType: "json"
            });
            user = response.body;
            user = {
                username: user.login,
                name: user.name,
                profileUrl: user.html_url,
                avatarUrl: user.avatar_url
            };
        } catch (e) {
            throw new ContreebutorsError({
                message: `The following error occurred while trying to fetch data for user "${args.username}": ${e.message}`
            });
        }

        await contributorsListFile.add(user).save();

        await this.render({ contributorsListFile });
    }

    async render(args: { contributorsListFile?: ContributorsJsonFile } = {}) {
        const renderToFile = new RenderToFile({
            path: path.join(this.config.cwd, this.config.renderToPath)
        });

        await renderToFile.load();

        let contributorsListFile = args.contributorsListFile;
        if (!contributorsListFile) {
            contributorsListFile = new ContributorsJsonFile({
                path: path.join(this.config.cwd, this.config.contributorsListPath)
            });
            await contributorsListFile.load();
        }

        await renderToFile
            .generate({ contributorsListFile, renderer: this.config.renderer })
            .save();
    }
}
