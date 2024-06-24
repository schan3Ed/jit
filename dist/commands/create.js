"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const fs_1 = require("fs");
const simple_git_1 = require("simple-git");
const init_1 = require("../util/init");
class Create extends core_1.Command {
    static args = {
        branchName: core_1.Args.string({
            required: true,
        }),
    };
    async run() {
        const { args } = await this.parse(Create);
        try {
            const existingBranchesTree = JSON.parse((0, fs_1.readFileSync)('branchTree.json', 'utf-8'));
            // check if current branch is in the branch tree
            // if it is, create new branch and add that to current branch tree, otherwise, tell them to track current branch first
            const git = (0, simple_git_1.simpleGit)().clean(simple_git_1.CleanOptions.FORCE);
            git.checkoutLocalBranch(args.branchName);
            const newTree = {
                ...existingBranchesTree,
                [args.branchName]: {},
            };
            console.log(newTree);
        }
        catch (err) {
            if (err.code !== "ENOENT") {
                this.error(err);
            }
            (0, init_1.InitializeBranchTree)();
        }
    }
}
exports.default = Create;
