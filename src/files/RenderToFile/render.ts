import { ContributorsList } from "../ContributorsJsonFile";
import defaultRenderer from "./defaultRenderer";

export default (contributorsList: ContributorsList, renderer = defaultRenderer) => {
    return `<!-- CONTREEBUTORS:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
${renderer(contributorsList)}
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- CONTREEBUTORS:END -->`;
};
