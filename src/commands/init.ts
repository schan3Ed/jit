
import { Args, Command } from "@oclif/core";

import { readFileSync } from "fs";

import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';
import { InitializeBranchTree } from "@src/util/init";

export default class Init extends Command {
    static args = {
        branchName: Args.string(),
    }

	public async run(): Promise<void> {
        const { args } = await this.parse(Init)
        
        try {
            const existingBranchesTree = JSON.parse(readFileSync('branchTree.json', 'utf-8'))
            
            const base = Object.keys(existingBranchesTree).at(0)

            this.log(`JIT is already initialized, do you want to keep "${base}" as your base branch?`)
        } catch (err) {
            if (err.code !== "ENOENT") {
                this.error(err)
            }
            
            this.log('needs to initialize this repo, no branch tree is found')
            this.log("run jit init to initialize this repo")
        }
    }
}