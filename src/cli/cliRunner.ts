import process from 'node:process';
import { program, OptionValues } from 'commander';
import { RepopackOutputStyle } from '../config/configTypes.js';
import { getVersion } from '../core/file/packageJsonParser.js';
import { handleError } from '../shared/errorHandler.js';
import { runInitAction } from './actions/initActionRunner.js';
import { runVersionAction } from './actions/versionActionRunner.js';
import { runDefaultAction } from './actions/defaultActionRunner.js';

export interface CliOptions extends OptionValues {
  version?: boolean;
  output?: string;
  include?: string;
  ignore?: string;
  config?: string;
  verbose?: boolean;
  topFilesLen?: number;
  outputShowLineNumbers?: boolean;
  style?: RepopackOutputStyle;
  init?: boolean;
  global?: boolean;
}

export async function run() {
  try {
    const version = await getVersion();

    program
      .version(version)
      .description('Repopack - Pack your repository into a single AI-friendly file')
      .arguments('[directory]')
      .option('-v, --version', 'show version information')
      .option('-o, --output <file>', 'specify the output file name')
      .option('--include <patterns>', 'list of include patterns (comma-separated)')
      .option('-i, --ignore <patterns>', 'additional ignore patterns (comma-separated)')
      .option('-c, --config <path>', 'path to a custom config file')
      .option('--top-files-len <number>', 'specify the number of top files to display', parseInt)
      .option('--output-show-line-numbers', 'add line numbers to each line in the output')
      .option('--style <type>', 'specify the output style (plain or xml)')
      .option('--verbose', 'enable verbose logging for detailed output')
      .option('--init', 'initialize a new repopack.config.json file')
      .option('--global', 'use global configuration (only applicable with --init)')
      .action((directory = '.', options: CliOptions) => executeAction(directory, process.cwd(), options));

    await program.parseAsync(process.argv);
  } catch (error) {
    handleError(error);
  }
}

const executeAction = async (directory: string, cwd: string, options: CliOptions) => {
  if (options.version) {
    await runVersionAction();
    return;
  }

  if (options.init) {
    await runInitAction(cwd, options.global || false);
    return;
  }

  await runDefaultAction(directory, cwd, options);
};
