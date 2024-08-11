# Repopack Project Instructions

## Project Overview
Repopack is a tool designed to pack an entire repository into a single, AI-friendly file. It's primarily used to prepare codebases for analysis by Large Language Models (LLMs) such as Claude, ChatGPT, and Gemini. The tool aims to facilitate easier code reviews, refactoring suggestions, and overall project understanding by AI systems.

## Key Design Principles
1. **Simplicity**: The tool should be easy to use with minimal configuration.
2. **Flexibility**: Users should be able to customize what's included or excluded in the output.
3. **Security**: The tool should help prevent sensitive information from being accidentally included.
4. **AI-Optimized**: The output should be formatted in a way that's easy for AI models to process and understand.
5. **Performance**: The tool should be efficient, even when processing large repositories.

## Project Structure
- `bin/`: Contains the executable scripts
- `src/`: Contains the source code
  - `cli/`: Command-line interface related code
  - `config/`: Configuration handling
  - `core/`: Core functionality (file processing, output generation, etc.)
  - `shared/`: Shared utilities
- `tests/`: Contains all test files

## Key Components
1. **CLI (Command Line Interface)**: Handles user input and initiates the packing process.
2. **Config Loader**: Manages loading and merging of configuration from various sources (default, file, and CLI).
3. **File Searcher**: Responsible for finding and filtering files based on include/ignore patterns.
4. **File Sanitizer**: Processes individual files, handling encoding and optionally removing comments.
5. **Output Generator**: Creates the final packed output in either plain text or XML format.
6. **Security Checker**: Uses Secretlint to detect potentially sensitive information in files.
7. **Token Counter**: Counts tokens in files to provide information relevant for LLM context limits.

## Architecture and Data Flow
1. User invokes CLI with options
2. Config is loaded and merged from various sources
3. File Searcher identifies relevant files
4. Each file is processed by the File Sanitizer
5. Security Checker scans for sensitive information
6. Token Counter processes file contents
7. Output Generator creates the final packed file

## Important Rules and Conventions
1. Use TypeScript for all new code.
2. Follow the existing code style and use Prettier for formatting.
3. Write unit tests for all new functionality, aiming for high test coverage.
4. Use async/await for asynchronous operations.
5. Use meaningful variable and function names that describe their purpose.
6. Keep functions small and focused on a single task.
7. Use dependency injection to improve testability.
8. Handle errors gracefully and provide meaningful error messages.
9. Document public APIs and complex logic.
10. Use type annotations consistently to improve code reliability.

When analyzing or suggesting changes to the codebase, please keep these instructions in mind. Focus on maintaining the project's simplicity and flexibility while improving its functionality, performance, and security. Any suggestions should align with the project's goals and design principles.
