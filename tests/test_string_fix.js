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
    
    return line;
}

const message = "This is a URL: https://example.com/path"; // This comment should be removed
const anotherMessage = "Check this out: http://site.com"; // This comment should be removed
const regexPattern = /\/\/.*$/; // This regex should be preserved
const templateString = `This contains // and /* patterns`; // This comment should be removed
