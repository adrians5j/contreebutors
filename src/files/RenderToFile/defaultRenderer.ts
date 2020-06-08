import chunk from "lodash.chunk";
import { ContributorsRenderer } from "../..";
import { ContributorsListContributor } from "../ContributorsJsonFile";

const Td = (contributor: ContributorsListContributor) => {
    return `<td align="center">
                    <a href="${contributor.profileUrl}">
                        <img src="${contributor.avatarUrl}" width="100px;" alt="${contributor.name}"/>
                        <br />
                        <sub><b>${contributor.name}</b></sub>
                    </a>
                    <br />
                </td>`;
};

const defaultRenderer: ContributorsRenderer = contributorsList => {
    return `## Thanks goes to these wonderful people:

<table>
    ${chunk(contributorsList, 6)
        .map(
            contributorsChunk =>
                `<tr>${contributorsChunk.map(contributor => Td(contributor)).join("")}</tr>`
        )
        .join("")}
</table>`;
};

export default defaultRenderer;
