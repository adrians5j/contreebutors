import render from "../files/RenderToFile/render";

const contributorsList = [
    {
        user: "doitadrian",
        name: "Adrian Smijulj",
        avatarUrl: "avatar1",
        profileUrl: "github.com/doitadrian"
    },
    {
        login: "Pavel910",
        name: "Pavel Denisjuk",
        profileUrl: "github.com/pavel910",
        avatarUrl: "avatar2",
        avatar_url: "https://avatars1.githubusercontent.com/u/3920893?v=4"
    },
    {
        login: "SvenAlHamad",
        name: "Sven",
        profileUrl: "github.com/sven",
        avatarUrl: "avatar3",
        avatar_url: "https://avatars3.githubusercontent.com/u/3808420?v=4"
    }
];

test("must correctly generate the list of contributors", () => {
    expect(render(contributorsList)).toBe(`<!-- CONTREEBUTORS:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
## Contributors

Thanks goes to these wonderful people:

<table>
    <tr><td align="center">
                    <a href="github.com/doitadrian">
                        <img src="avatar1" width="100px;" alt="Adrian Smijulj"/>
                        <br />
                        <sub><b>Adrian Smijulj</b></sub>
                    </a>
                    <br />
                </td><td align="center">
                    <a href="github.com/pavel910">
                        <img src="avatar2" width="100px;" alt="Pavel Denisjuk"/>
                        <br />
                        <sub><b>Pavel Denisjuk</b></sub>
                    </a>
                    <br />
                </td><td align="center">
                    <a href="github.com/sven">
                        <img src="avatar3" width="100px;" alt="Sven"/>
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
