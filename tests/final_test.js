// Comprehensive test for all edge cases
// $ This comment should be preserved

function comprehensiveTest() {
    // $ TODO: This comment should be preserved
    const test1 = "String with // patterns"; // This comment should be removed
    const test2 = 'Another string with /* patterns */'; // This comment should be removed
    const test3 = `Template with "quotes" and 'single' quotes`; // This comment should be removed
    
    // Test regex patterns
    const regex1 = /\/\/.*$/; // This regex should be preserved
    const regex2 = /\/\*[\s\S]*?\*\//g; // This regex should be preserved
    
    // Test URLs
    const url1 = "https://example.com/path"; // This comment should be removed
    const url2 = 'http://site.com/route'; // This comment should be removed
    
    // Test escaped quotes
    const escaped1 = "He said \"Hello // world\""; // This comment should be removed
    const escaped2 = 'She said \'Don\'t use /* here\''; // This comment should be removed
    
    /* $ This multi-line comment should be preserved
       because it has the $ marker */
    
    /* This multi-line comment should be removed
       completely */
    
    return true; // This comment should be removed
}

// $ IMPORTANT: This comment should be preserved
// Regular comment should be removed
