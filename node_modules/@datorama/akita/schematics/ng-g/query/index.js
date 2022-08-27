"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils");
function default_1(options) {
    return (host, context) => {
        options.path = (0, utils_1.getProjectPath)(host, options);
        const parsedPath = (0, utils_1.parseName)(options);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            options.spec ? (0, schematics_1.noop)() : (0, schematics_1.filter)(path => !path.endsWith('.spec.ts')),
            (0, schematics_1.template)({
                ...utils_1.stringUtils,
                ...options
            }),
            (0, schematics_1.move)(parsedPath.path)
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.branchAndMerge)((0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)]))])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map