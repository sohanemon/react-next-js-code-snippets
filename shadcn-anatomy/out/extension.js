"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode_1 = require("vscode");
const basicInput_1 = require("./lib/basicInput");
const multiStepInput_1 = require("./lib/multiStepInput");
const quickOpen_1 = require("./lib/quickOpen");
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('shadcn.installComponents', () => __awaiter(this, void 0, void 0, function* () {
        const options = {
            showQuickPick: basicInput_1.showQuickPick,
            showInputBox: basicInput_1.showInputBox,
            multiStepInput: multiStepInput_1.multiStepInput,
            quickOpen: quickOpen_1.quickOpen,
        };
        const quickPick = vscode_1.window.createQuickPick();
        quickPick.items = Object.keys(options).map((label) => ({ label }));
        quickPick.onDidChangeSelection((selection) => {
            if (selection[0]) {
                options[selection[0].label](context).catch(console.error);
            }
        });
        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    })));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map