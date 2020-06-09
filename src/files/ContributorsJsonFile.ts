import writeJsonFile from "write-json-file";
import loadJsonFile from "load-json-file";

export type ContributorsListContributor = {
    username: string;
    name: string;
    profileUrl: string;
    avatarUrl: string;
    addedOn?: Date;
};

export type ContributorsList = ContributorsListContributor[];

export type ContributorsJsonFileConfig = {
    path: string;
};

export default class ContributorsJsonFile {
    config: ContributorsJsonFileConfig;
    content: ContributorsList;
    mocks: ContributorsList;
    constructor(config: ContributorsJsonFileConfig) {
        this.config = config;
        this.content = null;
        this.mocks = null;
    }

    async loadContributorsList() {
        if (this.content) {
            return this.content;
        }

        try {
            const loadedContent = (await loadJsonFile(this.config.path)) as ContributorsList;
            if (Array.isArray(loadedContent)) {
                this.content = loadedContent;
            }
        } catch {
            this.content = [];
        }

        return this.content;
    }

    saveContributorsList() {
        return writeJsonFile(this.config.path, this.content);
    }

    getContributorsList() {
        return this.content;
    }

    isAdded(user: ContributorsListContributor | string): boolean {
        if (typeof user === "string") {
            return Boolean(this.content.find(item => item.username === user));
        }

        return Boolean(this.content.find(item => item.username === user.username));
    }

    async add(user: ContributorsListContributor) {
        await this.loadContributorsList();

        if (this.isAdded(user)) {
            return;
        }

        const { username, name, profileUrl, avatarUrl } = user;
        this.content.push({
            username,
            name,
            profileUrl,
            avatarUrl,
            addedOn: new Date()
        });

        await this.saveContributorsList();
    }
}
