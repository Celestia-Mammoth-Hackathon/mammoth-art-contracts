# Contributing to Forma Art

First off, thank you for considering contributing to Forma Art! It's people like you that make Forma Art such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

If you have a suggestion for the project, we'd love to hear it. Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* A clear and descriptive title
* A detailed description of the proposed enhancement
* Specific examples of how this enhancement would be useful
* If possible, a general outline of how this could be implemented

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

1. Clone the repository
```bash
git clone https://github.com/Celestia-Mammoth-Hackathon/mammoth-bros-contracts.git
```

2. Install dependencies
```bash
yarn install
```

3. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and commit them
```bash
git add .
git commit -m "Description of changes"
```

5. Push to your fork and submit a pull request
```bash
git push origin feature/your-feature-name
```

### Smart Contract Development Guidelines

1. **Testing**
   - Write comprehensive tests for all new features
   - Maintain test coverage above 90%
   - Include both unit and integration tests

2. **Documentation**
   - Add NatSpec comments for all public functions
   - Update technical documentation when changing functionality
   - Include inline comments for complex logic

3. **Gas Optimization**
   - Consider gas costs in your implementation
   - Use appropriate data structures
   - Optimize loops and storage usage

4. **Security**
   - Follow security best practices
   - Consider reentrancy, overflow/underflow, and other common vulnerabilities
   - Add appropriate access controls

## Style Guide

### Solidity

- Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use 4 spaces for indentation
- Maximum line length of 120 characters
- Use `private` instead of `public` when possible
- Order functions: constructor, receive/fallback, external, public, internal, private
- Add NatSpec comments for all public/external functions

### TypeScript

- Use ESLint with provided configuration
- Follow TypeScript best practices
- Use async/await over promises
- Add JSDoc comments for complex functions

## Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Questions?

Don't hesitate to ask questions by creating an issue or contacting the maintainers directly.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

---

<p align="center">
  Thank you for contributing to MammothArt! 🎨
</p> 