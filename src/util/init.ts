import { writeFileSync } from "fs";
import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';

export async function InitializeBranchTree(): Promise<void> {
    const inquirer = require('inquirer');
    const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE)

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