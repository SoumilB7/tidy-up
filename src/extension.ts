import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Tidy Up extension is now active!');

    const disposable = vscode.commands.registerCommand('tidy-up.removeComments', async () => {
        console.log('Tidy Up command triggered!');
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }

        const document = editor.document;
        const languageId = document.languageId;
        
        try {
            const originalText = document.getText();
            
            // Performance safeguard: warn for very large files
            if (originalText.length > 1000000) { // 1MB limit
                const proceed = await vscode.window.showWarningMessage(
                    'This file is very large. Processing may take a while. Continue?',
                    'Continue',
                    'Cancel'
                );
                if (proceed !== 'Continue') {
                    return;
                }
            }
            
            const cleanedText = removeComments(originalText, languageId);
            
            if (cleanedText === originalText) {
                vscode.window.showInformationMessage('No comments found to remove');
                return;
            }

            // Create a workspace edit to replace the entire document
            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(originalText.length)
            );
            edit.replace(document.uri, fullRange, cleanedText);
            
            // Apply the edit
            vscode.workspace.applyEdit(edit).then((success: boolean) => {
                if (success) {
                    vscode.window.showInformationMessage('Comments removed successfully!');
                } else {
                    vscode.window.showErrorMessage('Failed to remove comments');
                }
            });

        } catch (error) {
            vscode.window.showErrorMessage(`Error removing comments: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

function removeComments(text: string, languageId: string): string {
    const lines = text.split('\n');
    const cleanedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let cleanedLine = line;
        
        // Check if the original line was entirely a comment
        const wasEntirelyComment = isEntirelyComment(line, languageId);
        
        switch (languageId) {
            case 'python':
                cleanedLine = removePythonComments(line);
                break;
            case 'javascript':
            case 'typescript':
            case 'javascriptreact':
            case 'typescriptreact':
                cleanedLine = removeJavaScriptComments(line);
                break;
            case 'java':
            case 'c':
            case 'cpp':
            case 'csharp':
            case 'go':
            case 'rust':
                cleanedLine = removeCstyleComments(line);
                break;
            case 'html':
                cleanedLine = removeHtmlComments(line);
                break;
            case 'css':
            case 'scss':
            case 'less':
                cleanedLine = removeCSSComments(line);
                break;
            case 'shellscript':
            case 'bash':
                cleanedLine = removeShellComments(line);
                break;
            case 'yaml':
            case 'yml':
                cleanedLine = removeYamlComments(line);
                break;
            case 'json':
                // JSON doesn't support comments, but some parsers allow them
                cleanedLine = removeJSONComments(line);
                break;
            default:
                // Try to detect comment style automatically
                cleanedLine = removeCommentsAuto(line);
                break;
        }
        
        // Only skip the line if it was entirely a comment
        // Keep empty lines that weren't originally comments
        if (!wasEntirelyComment || cleanedLine.trim() !== '') {
            cleanedLines.push(cleanedLine);
        }
    }
    
    return cleanedLines.join('\n');
}

function removePythonComments(line: string): string {
    // Remove # comments, but preserve strings and $ comments
    let result = '';
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        // Handle string detection first
        if (!inString && (char === '"' || char === "'")) {
            inString = true;
            stringChar = char;
            result += char;
        } else if (inString && char === stringChar && line[i - 1] !== '\\') {
            inString = false;
            result += char;
        } else if (inString) {
            result += char;
        } else if (!inString && char === '#') {
            // Check if this is a $ comment that should be preserved
            if (nextChar === '$') {
                // Preserve the entire line (it's a $ comment)
                return line;
            }
            break; // Rest of the line is a comment
        } else {
            result += char;
        }
    }
    
    return result.trimEnd();
}

function removeJavaScriptComments(line: string): string {
    // Remove // comments and /* */ comments, but preserve $ comments and strings
    let result = '';
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        // Handle string detection
        if (!inString && (char === '"' || char === "'" || char === '`')) {
            inString = true;
            stringChar = char;
            result += char;
        } else if (inString && char === stringChar && line[i - 1] !== '\\') {
            inString = false;
            result += char;
        } else if (inString) {
            result += char;
        } else if (!inString && char === '/' && nextChar === '/') {
            // Check if this is a $ comment that should be preserved
            if (i + 2 < line.length && line[i + 2] === '$') {
                // Preserve the entire line (it's a $ comment)
                return line;
            }
            // Single line comment found outside of string
            break;
        } else if (!inString && char === '/' && nextChar === '*') {
            // Multi-line comment start found - only handle if it ends on the same line
            let j = i + 2;
            let foundEnd = false;
            while (j < line.length - 1) {
                if (line[j] === '*' && line[j + 1] === '/') {
                    i = j + 1; // Skip the entire comment
                    foundEnd = true;
                    break;
                }
                j++;
            }
            if (!foundEnd) {
                // Multi-line comment that doesn't end on this line - keep the line as is
                return line;
            }
        } else {
            result += char;
        }
    }
    
    return result.trimEnd();
}

function removeCstyleComments(line: string): string {
    // Similar to JavaScript but handles // and /* */ comments
    return removeJavaScriptComments(line);
}

function removeHtmlComments(line: string): string {
    // Remove <!-- --> comments, but preserve $ comments
    const trimmedLine = line.trim();
    
    // Check if this is a $ comment that should be preserved
    if (trimmedLine.startsWith('<!--') && trimmedLine.includes('$') && trimmedLine.endsWith('-->')) {
        return line; // Preserve $ comments
    }
    
    // Remove regular HTML comments
    return line.replace(/<!--[\s\S]*?-->/g, '').trimEnd();
}

function removeCSSComments(line: string): string {
    // Remove /* */ comments, but preserve $ comments and only if complete on same line
    const trimmedLine = line.trim();
    
    // Check if this is a $ comment that should be preserved
    if (trimmedLine.startsWith('/*') && trimmedLine.includes('$') && trimmedLine.endsWith('*/')) {
        return line; // Preserve $ comments
    }
    
    let result = '';
    let i = 0;
    
    while (i < line.length) {
        if (i < line.length - 1 && line[i] === '/' && line[i + 1] === '*') {
            // Multi-line comment start found - only handle if it ends on the same line
            let j = i + 2;
            let foundEnd = false;
            while (j < line.length - 1) {
                if (line[j] === '*' && line[j + 1] === '/') {
                    i = j + 2; // Skip the entire comment
                    foundEnd = true;
                    break;
                }
                j++;
            }
            if (!foundEnd) {
                // Multi-line comment that doesn't end on this line - keep the line as is
                return line;
            }
        } else {
            result += line[i];
            i++;
        }
    }
    
    return result.trimEnd();
}

function removeShellComments(line: string): string {
    // Remove # comments, but preserve $ comments
    const hashIndex = line.indexOf('#');
    if (hashIndex === -1) {
        return line;
    }
    
    // Check if this is a $ comment that should be preserved
    if (hashIndex + 1 < line.length && line[hashIndex + 1] === '$') {
        return line; // Preserve the entire line (it's a $ comment)
    }
    
    // Check if # is inside quotes
    const beforeHash = line.substring(0, hashIndex);
    const singleQuotes = (beforeHash.match(/'/g) || []).length;
    const doubleQuotes = (beforeHash.match(/"/g) || []).length;
    
    if (singleQuotes % 2 === 1 || doubleQuotes % 2 === 1) {
        return line; // # is inside quotes
    }
    
    return line.substring(0, hashIndex).trimEnd();
}

function removeYamlComments(line: string): string {
    // Remove # comments, but preserve $ comments and not inside strings
    const hashIndex = line.indexOf('#');
    if (hashIndex === -1) {
        return line;
    }
    
    // Check if this is a $ comment that should be preserved
    if (hashIndex + 1 < line.length && line[hashIndex + 1] === '$') {
        return line; // Preserve the entire line (it's a $ comment)
    }
    
    // Simple check: if line starts with spaces followed by #, it's likely a comment
    if (line.trim().startsWith('#')) {
        return '';
    }
    
    // For inline comments, remove from # onwards
    return line.substring(0, hashIndex).trimEnd();
}

function removeJSONComments(line: string): string {
    // Remove // and /* */ comments (non-standard JSON)
    return removeJavaScriptComments(line);
}

function removeCommentsAuto(line: string): string {
    // Auto-detect comment style based on common patterns
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('#')) {
        // Check if it's a preserved comment
        if (trimmedLine.startsWith('#$')) {
            return line; // Preserve $ comments
        }
        return ''; // Python/shell style
    } else if (trimmedLine.startsWith('//')) {
        // Check if it's a preserved comment
        if (trimmedLine.startsWith('//$')) {
            return line; // Preserve $ comments
        }
        return removeJavaScriptComments(line); // JavaScript style
    } else if (trimmedLine.startsWith('/*')) {
        return removeCSSComments(line); // CSS style
    }
    
    // For lines that don't start with comment markers, be more careful
    // Only remove comments if they're clearly at the end of the line after code
    let result = '';
    let inString = false;
    let stringChar = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        // Handle string detection
        if (!inString && (char === '"' || char === "'" || char === '`')) {
            inString = true;
            stringChar = char;
            result += char;
        } else if (inString && char === stringChar && line[i - 1] !== '\\') {
            inString = false;
            result += char;
        } else if (inString) {
            result += char;
        } else if (!inString && char === '/' && nextChar === '/') {
            // Found // comment outside of string
            break;
        } else if (!inString && char === '/' && nextChar === '*') {
            // Found /* comment outside of string - check if it ends on same line
            let j = i + 2;
            let foundEnd = false;
            while (j < line.length - 1) {
                if (line[j] === '*' && line[j + 1] === '/') {
                    i = j + 1; // Skip the entire comment
                    foundEnd = true;
                    break;
                }
                j++;
            }
            if (!foundEnd) {
                // Multi-line comment - preserve the line
                return line;
            }
        } else {
            result += char;
        }
    }
    
    return result.trimEnd();
}

function isEntirelyComment(line: string, languageId: string): boolean {
    const trimmedLine = line.trim();
    
    // Empty lines are not comments
    if (trimmedLine === '') {
        return false;
    }
    
    switch (languageId) {
        case 'python':
            return trimmedLine.startsWith('#') && !trimmedLine.startsWith('#$');
        case 'javascript':
        case 'typescript':
        case 'javascriptreact':
        case 'typescriptreact':
        case 'java':
        case 'c':
        case 'cpp':
        case 'csharp':
        case 'go':
        case 'rust':
            return (trimmedLine.startsWith('//') && !trimmedLine.startsWith('//$')) || 
                   (trimmedLine.startsWith('/*') && trimmedLine.endsWith('*/'));
        case 'html':
            return trimmedLine.startsWith('<!--') && trimmedLine.endsWith('-->');
        case 'css':
        case 'scss':
        case 'less':
            return trimmedLine.startsWith('/*') && trimmedLine.endsWith('*/');
        case 'shellscript':
        case 'bash':
            return trimmedLine.startsWith('#') && !trimmedLine.startsWith('#$');
        case 'yaml':
        case 'yml':
            return trimmedLine.startsWith('#') && !trimmedLine.startsWith('#$');
        case 'json':
            return (trimmedLine.startsWith('//') && !trimmedLine.startsWith('//$')) || 
                   (trimmedLine.startsWith('/*') && trimmedLine.endsWith('*/'));
        default:
            // Auto-detect
            return (trimmedLine.startsWith('#') && !trimmedLine.startsWith('#$')) || 
                   (trimmedLine.startsWith('//') && !trimmedLine.startsWith('//$')) || 
                   (trimmedLine.startsWith('/*') && trimmedLine.endsWith('*/'));
    }
}

export function deactivate() {}
