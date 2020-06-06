const glob = require("glob");
const fs = require("fs");
const get = require("lodash.get");
const parse = require("./parse");

const isIgnoredPath = ({ path, instance, contreebutorsRc }) => {
    let dirs = get(instance, "config.ignoreDirs") || [];
    for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i];
        if (path.includes(dir)) {
            return true;
        }
    }

    dirs = get(contreebutorsRc, "ignoreDirs") || [];
    for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i];
        if (path.includes(dir)) {
            return true;
        }
    }

    return false;
};

module.exports = ({ dir, instance, contreebutorsRc }) => {
    const fileExtensions = ['js', 'ts', 'tsx'];
    const paths = [];
    for (let i = 0; i < fileExtensions.length; i++) {
        let fileExtension = fileExtensions[i];
        paths.push(...glob.sync(dir + `/**/*.${fileExtension}`));
    }

    const deps = [];
    paths.forEach(path => {
        if (isIgnoredPath({ path, instance, contreebutorsRc })) {
            return true;
        }

        const src = fs.readFileSync(path, "utf8");
        const importsRequires = parse({
            path,
            src,
            config: {
                parser: {
                    ...get(contreebutorsRc, "parser", get(instance, "config.parser", {}))
                },
                traverse: get(contreebutorsRc, "traverse", get(instance, "config.traverse"))
            }
        });

        importsRequires.forEach(name => {
            // is relative import?
            if (!name || name.startsWith(".")) {
                return true;
            }

            // already included in deps?
            if (deps.includes(name)) {
                return true;
            }

            deps.push(name);
        });
    });

    return deps;
};
