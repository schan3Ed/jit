
import { Args, Command } from "@oclif/core";

import { writeFileSync, readFileSync, writeFile } from "fs";

export default class Auth extends Command {
    static args = {
        token: Args.string(),
    }

	public async run(): Promise<void> {
        const { args } = await this.parse(Auth)

        this.log('saving auth key')
        writeFileSync("token.key", args.token, {flag: "w"})
    }
}