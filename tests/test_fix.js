function removeCommentsAuto(line: string): string {
    // Auto-detect comment style based on common patterns
    if (line.trim().startsWith('#')) {
        return ''; // Python/shell style
    } else if (line.includes('//')) {
        return removeJavaScriptComments(line); // JavaScript style
    } else if (line.includes('/*')) {
        return removeCSSComments(line); // CSS style
    }
    
    return line;
}

/* This is a multi-line comment
   that spans multiple lines
   and should be preserved as is */

function anotherFunction() {
    console.log("This should work correctly now");
}
