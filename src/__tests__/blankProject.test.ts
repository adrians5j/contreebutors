import { Contreebutors } from "..";
import fs from "fs";
import loadJsonFile from "load-json-file";
import path from "path";
import rimraf from "rimraf";

const BLANK_PROJECT_DIR = path.join(__dirname, "blank-project");

beforeEach(() => {
    rimraf.sync(BLANK_PROJECT_DIR);
});

afterEach(() => {
    rimraf.sync(BLANK_PROJECT_DIR);
});

test("must correctly generate the contreebutors.json file and add initial content into README.md", async () => {
    const contreebutors = new Contreebutors({ cwd: BLANK_PROJECT_DIR });

    await contreebutors.add({ username: "doitadrian" });
    await contreebutors.add({ username: "pavel910" });
    await contreebutors.add({ username: "SvenAlHamad" });

    const contreebutorsJson = await loadJsonFile(
        path.join(BLANK_PROJECT_DIR, "contreebutors.json")
    );

    expect(contreebutorsJson).toEqual([
        {
            username: "doitadrian",
            name: "Adrian Smijulj",
            profileUrl: "https://github.com/doitadrian",
            avatarUrl: "https://avatars0.githubusercontent.com/u/5121148?v=4",
            addedOn: contreebutorsJson[0].addedOn
        },
        {
            username: "Pavel910",
            name: "Pavel Denisjuk",
            profileUrl: "https://github.com/Pavel910",
            avatarUrl: "https://avatars1.githubusercontent.com/u/3920893?v=4",
            addedOn: contreebutorsJson[1].addedOn
        },
        {
            addedOn: contreebutorsJson[2].addedOn,
            avatarUrl: "https://avatars3.githubusercontent.com/u/3808420?v=4",
            name: "Sven",
            profileUrl: "https://github.com/SvenAlHamad",
            username: "SvenAlHamad"
        }
    ]);

    const readmeMd = fs.readFileSync(path.join(BLANK_PROJECT_DIR, "README.md"), "utf8");
    expect(readmeMd).toBe(`
<!-- CONTREEBUTORS:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
## Contributors

Thanks goes to these wonderful people:

<table>
    <tr><td align="center">
                    <a href="https://github.com/doitadrian">
                        <img src="https://avatars0.githubusercontent.com/u/5121148?v=4" width="100px;" alt="Adrian Smijulj"/>
                        <br />
                        <sub><b>Adrian Smijulj</b></sub>
                    </a>
                    <br />
                </td><td align="center">
                    <a href="https://github.com/Pavel910">
                        <img src="https://avatars1.githubusercontent.com/u/3920893?v=4" width="100px;" alt="Pavel Denisjuk"/>
                        <br />
                        <sub><b>Pavel Denisjuk</b></sub>
                    </a>
                    <br />
                </td><td align="center">
                    <a href="https://github.com/SvenAlHamad">
                        <img src="https://avatars3.githubusercontent.com/u/3808420?v=4" width="100px;" alt="Sven"/>
                        <br />
                        <sub><b>Sven</b></sub>
                    </a>
                    <br />
                </td></tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- CONTREEBUTORS:END -->`);
});
