"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const fs_1 = require("fs");
class Auth extends core_1.Command {
    static args = {
        token: core_1.Args.string(),
    };
    async run() {
        const { args } = await this.parse(Auth);
        this.log('saving auth key');
        (0, fs_1.writeFileSync)("token.key", args.token, { flag: "w" });
    }
}
exports.default = Auth;
