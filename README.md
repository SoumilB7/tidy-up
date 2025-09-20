# Tidy Up - Comment Cleaner

[![Version](https://img.shields.io/badge/version-1.0.3-blue.svg)](https://marketplace.visualstudio.com/items?itemName=SoumilB7.tidy-up)
[![Downloads](https://img.shields.io/badge/downloads-2-red.svg)](https://marketplace.visualstudio.com/items?itemName=SoumilB7.tidy-up)
[![Rating](https://img.shields.io/badge/rating-5.0-yellow.svg)](https://marketplace.visualstudio.com/items?itemName=SoumilB7.tidy-up)


A VS Code extension that removes all AI comments from your code files with a single keybind. Perfect for cleaning up code before sharing, documentation, or when you need a comment-free version of your files.

## ✨ Features

- **🚀 One-key solution**: Press `Ctrl+Alt+T` to remove all comments from the current file
- **🌍 Multi-language support**: Works with Python, JavaScript, TypeScript, Java, C/C++, Go, Rust, HTML, CSS, Shell scripts, YAML, and more
- **🧠 Smart comment detection**: Preserves strings and handles different comment styles correctly
- **💰 Preserve important comments**: Comments marked with `$` (like `# $ TODO` or `// $ Important`) are kept
- **🔒 Safe operation**: Only removes actual comments, not code within strings
- **📝 Context menu integration**: Right-click in editor to access the command
- **⚡ Lightning fast**: Processes files instantly

## 🎯 Supported Languages

| Language | Comment Styles | Example |
|----------|----------------|---------|
| **Python** | `#` | `# This comment will be removed` |
| **JavaScript/TypeScript** | `//`, `/* */` | `// Single line` or `/* Multi-line */` |
| **Java/C/C++/C#** | `//`, `/* */` | `// Single line` or `/* Multi-line */` |
| **Go/Rust** | `//`, `/* */` | `// Single line` or `/* Multi-line */` |
| **HTML** | `<!-- -->` | `<!-- HTML comment -->` |
| **CSS/SCSS/Less** | `/* */` | `/* CSS comment */` |
| **Shell/Bash** | `#` | `# Shell comment` |
| **YAML** | `#` | `# YAML comment` |
| **JSON** | `//`, `/* */` | `// Non-standard JSON comment` |

## 🎨 Preserve Important Comments

Use the `$` marker to preserve important comments:

```python
# This comment will be removed
# $ This comment will be preserved
import os  # This inline comment will be removed
import sys  # $ This inline comment will be preserved

def hello_world():
    # Regular comment - removed
    # $ TODO: Add error handling
    print("Hello, World!")  # Regular inline comment - removed
    print("Goodbye!")  # $ Important: Don't forget this message
    
    return True

# End of file comment - removed
# $ Remember to update version number
```

**After running Tidy Up:**
```python
# $ This comment will be preserved
import os
import sys  # $ This inline comment will be preserved

def hello_world():
    # $ TODO: Add error handling
    print("Hello, World!")
    print("Goodbye!")  # $ Important: Don't forget this message
    
    return True

# $ Remember to update version number
```

## 🚀 Installation

### From VS Code Marketplace
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Tidy Up - Comment Cleaner"
4. Click Install

### From VSIX Package
1. Download the `.vsix` file from the releases page
2. Open VS Code
3. Go to Extensions (`Ctrl+Shift+X`)
4. Click the "..." menu and select "Install from VSIX..."
5. Select the downloaded file

## 📖 Usage

### Method 1: Keyboard Shortcut (Recommended)
1. Open any code file
2. Press `Ctrl+Alt+T`
3. All comments are removed instantly!

### Method 2: Command Palette
1. Press `Ctrl+Shift+P`
2. Type "Tidy Up - Remove Comments"
3. Press Enter

### Method 3: Right-click Menu
1. Right-click in the editor
2. Select "Tidy Up - Remove Comments"

## ⚙️ Configuration

The extension works out of the box with no configuration needed. It automatically detects the file type and applies the appropriate comment removal logic.

## 🔧 Development

### Building from Source
```bash
git clone https://github.com/SoumilB7/tidy-up.git
cd tidy-up
npm install
npm run compile
```

### Running in Development Mode
```bash
npm run watch
# Then press F5 in VS Code to launch Extension Development Host
```

### Packaging for Distribution
```bash
npm install -g @vscode/vsce
vsce package
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports & Feature Requests

If you find a bug or have a feature request, please [open an issue](https://github.com/SoumilB7/tidy-up/issues).

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the VS Code community
- Inspired by the need for clean, comment-free code
- Thanks to all contributors and users

## 📊 Stats

- **Version**: 1.0.3
- **Last Updated**: Sept - 2025
- **VS Code Version**: ^1.74.0
- **Languages Supported**: 10+

---

**Made with ❤️ by [Soumil'](https://github.com/SoumilB7)**

[⭐ Star this repository](https://github.com/SoumilB7/tidy-up) | [🐛 Report an issue](https://github.com/SoumilB7/tidy-up/issues) | [💡 Request a feature](https://github.com/SoumilB7/tidy-up/issues)