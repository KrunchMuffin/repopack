import process from 'node:process';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { generatePlainStyle } from '../../../src/core/output/plainStyleGenerator.js';
import { createMockConfig } from '../../testing/testUtils.js';
import { buildOutputGeneratorContext } from '../../../src/core/output/outputGenerator.js';

vi.mock('fs/promises');

describe('outputGenerator', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('generatePlainOutput should include user-provided header text', async () => {
    const mockConfig = createMockConfig({
      output: {
        filePath: 'output.txt',
        style: 'plain',
        headerText: 'Custom header text',
        topFilesLength: 2,
        showLineNumbers: false,
        removeComments: false,
        removeEmptyLines: false,
      },
    });

    const context = await buildOutputGeneratorContext(process.cwd(), mockConfig, [], []);
    const output = await generatePlainStyle(context);

    expect(output).toContain('Repopack Output File');
    expect(output).toContain('Custom header text');
  });
});
