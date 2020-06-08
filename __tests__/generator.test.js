import render from "./../src/render";

const contributorsList = [
    {
        login: "doitadrian",
        name: "Adrian Smijulj",
        avatar_url: "https://avatars0.githubusercontent.com/u/5121148?v=4",
        profile: "https://www.webiny.com"
    },
    {
        login: "Pavel910",
        name: "Pavel Denisjuk",
        avatar_url: "https://avatars1.githubusercontent.com/u/3920893?v=4",
        profile: "https://webiny.com/"
    },
    {
        login: "SvenAlHamad",
        name: "Sven",
        avatar_url: "https://avatars3.githubusercontent.com/u/3808420?v=4",
        profile: "https://webiny.com/"
    }
];

test("must correctly generate the list of contributors", () => {
    expect(render({ contributorsList })).toBe(`
<!-- CONTREEBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
Thanks goes to these wonderful people:
<table>
    <tr><td align="center">
                    <a href="https://www.webiny.com">
                        <img src="https://avatars0.githubusercontent.com/u/5121148?v=4" width="100px;" alt=""/>
                        <br />
                        <sub><b>Adrian Smijulj</b></sub>
                    </a>
                    <br />
                </td>,<td align="center">
                    <a href="https://webiny.com/">
                        <img src="https://avatars1.githubusercontent.com/u/3920893?v=4" width="100px;" alt=""/>
                        <br />
                        <sub><b>Pavel Denisjuk</b></sub>
                    </a>
                    <br />
                </td>,<td align="center">
                    <a href="https://webiny.com/">
                        <img src="https://avatars3.githubusercontent.com/u/3808420?v=4" width="100px;" alt=""/>
                        <br />
                        <sub><b>Sven</b></sub>
                    </a>
                    <br />
                </td></tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- CONTREEBUTORS-LIST:END -->`);
});
