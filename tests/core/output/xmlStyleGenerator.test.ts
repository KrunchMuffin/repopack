import process from 'node:process';
import { expect, test, vi, describe, beforeEach } from 'vitest';
import { createMockConfig } from '../../testing/testUtils.js';
import { buildOutputGeneratorContext } from '../../../src/core/output/outputGenerator.js';
import { generateXmlStyle } from '../../../src/core/output/xmlStyleGenerator.js';

vi.mock('fs/promises');

describe('outputGenerator', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('generateXmlOutput should include user-provided header text', async () => {
    const mockConfig = createMockConfig({
      output: {
        filePath: 'output.txt',
        style: 'xml',
        headerText: 'Custom header text',
        topFilesLength: 2,
        showLineNumbers: false,
        removeComments: false,
        removeEmptyLines: false,
      },
    });

    const context = await buildOutputGeneratorContext(process.cwd(), mockConfig, [], []);
    const output = await generateXmlStyle(context);

    expect(output).toContain('Repopack Output File');
    expect(output).toContain('Custom header text');
  });
});
