
import { Args, Command } from "@oclif/core";

import { writeFileSync, readFileSync, writeFile } from "fs";

import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';


export default class Create extends Command {
    static args = {
        branchName: Args.string(),
    }

	public async run(): Promise<void> {
        const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);
        const { args } = await this.parse(Create)
        

        this.log((await git.branch()).current)
        var existingBranchesTree;
        try {
            existingBranchesTree = JSON.parse(readFileSync('branches.json', 'utf-8'))
        } catch (err) {
            if (err.code == "ENONENT") {
                this.log('needs to initialize this repo, no branch tree is found')
            }
            
            // prompt question to chooose base branch
        }
    }
}