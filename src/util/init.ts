import { writeFileSync } from "fs";
import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';

export async function InitializeBranchTree(): Promise<void> {
    const inquirer = require('inquirer');
    const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE)

    const localBranches = Object.keys((await git.branchLocal()).branches)
    
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