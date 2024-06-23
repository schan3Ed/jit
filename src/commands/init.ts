
import { Args, Command } from "@oclif/core";

import { writeFileSync, readFileSync, writeFile } from "fs";

import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';

export default class Init extends Command {
    static args = {
        branchName: Args.string(),
    }

	public async run(): Promise<void> {
        const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE)
        const { args } = await this.parse(Init)

        try {
            const existingBranchesTree = JSON.parse(readFileSync('branchTree.json', 'utf-8'))
        } catch (err) {

            const inquirer = require('inquirer');

            if (err.code == "ENOENT") {
                this.log('needs to initialize this repo, no branch tree is found')
            }
            
            const allBranches = (await git.branch()).branches
            
            const localBranches = Object.keys(allBranches).filter(key => {
                return !key.startsWith("remotes/")
            })

            console.log(localBranches)

            inquirer.prompt([
                {
                    type: "list",
                    name: "baseBranch",
                    choices: localBranches,
                    message: "Please select a base branch",
                }
            ]).then((answers: any) => {
                writeFileSync("branchTree.json", JSON.stringify({
                    [answers.baseBranch]: {},
                }), {flag: "w"})
            })

            
        }
    }
}