# Change Log

All notable changes to the "Tidy Up - Comment Cleaner" extension will be documented in this file.

## [1.0.3] - 2025-09-20

### Added
- Initial release of Tidy Up - Comment Cleaner
- Support for multiple programming languages:
  - Python (`#` comments)
  - JavaScript/TypeScript (`//` and `/* */` comments)
  - Java/C/C++/C# (`//` and `/* */` comments)
  - Go/Rust (`//` and `/* */` comments)
  - HTML (`<!-- -->` comments)
  - CSS/SCSS/Less (`/* */` comments)
  - Shell/Bash (`#` comments)
  - YAML (`#` comments)
  - JSON (`//` and `/* */` comments)
- Smart comment detection that preserves strings and handles different comment styles
- Preserve important comments marked with `$` (e.g., `# $ TODO`, `// $ Important`)
- Keyboard shortcut `Ctrl+Alt+T` for quick access
- Command palette integration
- Right-click context menu integration
- Auto-detection for unsupported languages
- Safe operation that only removes actual comments, not code within strings
- Complete removal of entire comment lines (no empty lines left behind)
- Preservation of empty lines that weren't originally comments

### Features
- One-key solution for removing comments
- Multi-language support with language-specific comment handling
- Intelligent comment preservation system
- Fast and reliable comment removal
- User-friendly interface with multiple access methods

### Technical Details
- Built with TypeScript
- VS Code extension API integration
- Comprehensive error handling
- Optimized performance for large files
- Cross-platform compatibility

---

## Future Releases

### Planned Features
- Custom comment preservation patterns
- Batch processing for multiple files
- Comment removal statistics
- Undo/redo support
- Custom keybindings configuration
- File-specific comment rules
- Integration with other formatters

---

For more information, visit the [GitHub repository](https://github.com/SoumilB7/tidy-up).
