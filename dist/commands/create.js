"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const fs_1 = require("fs");
const simple_git_1 = require("simple-git");
class Create extends core_1.Command {
    static args = {
        branchName: core_1.Args.string(),
    };
    async run() {
        const git = (0, simple_git_1.simpleGit)().clean(simple_git_1.CleanOptions.FORCE);
        const { args } = await this.parse(Create);
        this.log((await git.branch()).current);
        var existingBranchesTree;
        try {
            existingBranchesTree = JSON.parse((0, fs_1.readFileSync)('branches.json', 'utf-8'));
        }
        catch (err) {
            if (err.code == "ENONENT") {
                this.log('needs to initialize this repo, no branch tree is found');
            }
            // prompt question to chooose base branch
        }
    }
}
exports.default = Create;
