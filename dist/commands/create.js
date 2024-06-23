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
        try {
            const existingBranchesTree = JSON.parse((0, fs_1.readFileSync)('branches.json', 'utf-8'));
        }
        catch (err) {
            const inquirer = require('inquirer');
            if (err.code == "ENOENT") {
                this.log('needs to initialize this repo, no branch tree is found');
            }
            const allBranches = (await git.branch()).branches;
            const localBranches = Object.keys(allBranches).filter(key => {
                return !key.startsWith("remotes/");
            });
            console.log(localBranches);
            inquirer.prompt([
                {
                    type: "list",
                    name: "baseBranch",
                    choices: localBranches,
                    message: "Please select a base branch",
                }
            ]).then((answers) => { console.log(answers.baseBranch); });
        }
    }
}
exports.default = Create;
