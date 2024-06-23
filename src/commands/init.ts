
import { Args, Command } from "@oclif/core";

import { readFileSync } from "fs";

import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';
import { InitializeBranchTree } from "../util/init";

export default class Init extends Command {
    static args = {
        branchName: Args.string(),
    }

	public async run(): Promise<void> {
        const { args } = await this.parse(Init)
        
        try {
            const existingBranchesTree = JSON.parse(readFileSync('branchTree.json', 'utf-8'))

            // check if current branch is in the branch tree
            
            // if it is, create new branch and add that to current branch tree, otherwise, tell them to track current branch first

            
            
            const base = Object.keys(existingBranchesTree).at(0)

            this.log(`JIT is already initialized, do you want to keep "${base}" as your base branch?`)
        } catch (err) {
            if (err.code !== "ENOENT") {
                this.error(err)
            }
            
            InitializeBranchTree()
        }
    }
}