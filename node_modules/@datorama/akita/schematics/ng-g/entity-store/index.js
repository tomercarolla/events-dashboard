"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const utils_1 = require("../utils");
const active_state_enum_1 = require("./models/active-state.enum");
function getExtensionState({ idType, name, withActive }) {
    const isID = idType === 'string' || idType === 'number';
    const entityName = name.split('/').pop();
    const entityType = utils_1.stringUtils.singular(utils_1.stringUtils.classify(entityName));
    const generics = [entityType];
    if (isID) {
        generics.push(idType);
    }
    const extensions = [`EntityState<${generics.join(', ')}>`];
    if (withActive) {
        let activeState = withActive === active_state_enum_1.ActiveStateType.Single ? `ActiveState` : `MultiActiveState`;
        activeState += isID ? `<${idType}>` : ``;
        extensions.push(activeState);
    }
    return extensions.join(', ');
}
function getImportsString({ withActive }) {
    const imports = ['EntityState', 'EntityStore', 'StoreConfig'];
    if (withActive) {
        imports.push(`${withActive}State`);
    }
    return imports.join(', ');
}
function default_1(options) {
    return (host, context) => {
        options.path = (0, utils_1.getProjectPath)(host, options);
        // Build state based on options
        const extensionState = getExtensionState(options);
        const importsString = getImportsString(options);
        const parsedPath = (0, utils_1.parseName)(options);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            options.spec ? (0, schematics_1.noop)() : (0, schematics_1.filter)((path) => !path.endsWith('.spec.ts')),
            (0, schematics_1.template)({
                ...utils_1.stringUtils,
                ...options,
                extensionState,
                importsString,
            }),
            (0, schematics_1.move)(parsedPath.path),
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.branchAndMerge)((0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)]))])(host, context);
    };
}
exports.default = default_1;
//# sourceMappingURL=index.js.map