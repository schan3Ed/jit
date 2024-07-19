import { simpleGit, CleanOptions, SimpleGit } from "simple-git";
import { Node } from "typescript-tree";

import inquirer from "inquirer";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

const TREE_JSON_FILE = "/bin/jit/data/branchTree.json";

async function InitializeBranchTree(): Promise<void> {
  const inquirer = require("inquirer");

  const localBranches = Object.keys((await git.branchLocal()).branches);

  inquirer
    .prompt([
      {
        type: "list",
        name: "baseBranch",
        choices: localBranches,
        message: "Please select a base branch",
      },
    ])
    .then((answers: any) => {
      const root = new Node(answers.baseBranch);
      root.exportToFile(TREE_JSON_FILE);
    });
}

export default class Init extends Command {
  public async run(): Promise<void> {
    try {
      const root = new Node();
      root.importFromFile(TREE_JSON_FILE);

      inquirer
        .prompt([
          {
            type: "list",
            name: "option",
            choices: ["Initialize again", "Use existing"],
            message: "Please select a base branch",
          },
        ])
        .then((answers: any) => {
          if (answers.option === "Initialize again") {
            InitializeBranchTree();
          }
        });
    } catch (err) {
      if (err.code !== "ENOENT") {
        this.error(err);
      }
      await InitializeBranchTree();
    }
  }
}
