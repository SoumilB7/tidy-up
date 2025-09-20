// Test 1: Nested strings and escaped quotes
const nested = 'He said "Hello // world" to me'; // This comment should be removed
const escaped = "She said \"Don't use // here\""; // This comment should be removed
const backtick = `Template with "quotes" and 'single' quotes`; // This comment should be removed

// Test 2: Complex regex patterns
const regex1 = /\/\/.*$/; // This should be preserved
const regex2 = /\/\*[\s\S]*?\*\//g; // This should be preserved
const regex3 = new RegExp("//.*$"); // This should be preserved

// Test 3: URLs and paths
const url1 = "https://example.com/path"; // This comment should be removed
const url2 = 'http://site.com/route'; // This comment should be removed
const path = "C:\\Users\\name\\file.js"; // This comment should be removed

// Test 4: Multi-line strings
const multiline1 = `This is a multi-line
string with // patterns
that should be preserved`; // This comment should be removed

const multiline2 = "This is another \
multi-line string with /* patterns */ \
that should be preserved"; // This comment should be removed

// Test 5: Complex comment patterns
/* This is a multi-line comment
   that spans multiple lines
   and should be removed completely */

function complexFunction() {
    // $ This comment should be preserved
    console.log("Hello"); // This comment should be removed
    
    /* $ This multi-line comment should be preserved
       because it has the $ marker */
    
    return true; // This comment should be removed
}

// Test 6: Edge cases with strings and comments
const mixed1 = "String with // inside"; /* Multi-line comment */ // Single line comment
const mixed2 = 'Another string'; // Comment after string
const mixed3 = `Template ${variable}`; // Comment after template

// Test 7: Preserved comments with $ marker
// $ This entire line should be preserved
// $ TODO: Fix this function
// $ IMPORTANT: Don't remove this

// Test 8: Complex nested structures
const obj = {
    prop1: "value1", // This comment should be removed
    prop2: "value2", // This comment should be removed
    regex: /\/\/.*$/, // This regex should be preserved
    url: "https://api.example.com" // This comment should be removed
};

// Test 9: Function with complex string handling
function stringTest() {
    const msg = "Error: // not found"; // This comment should be removed
    const pattern = /\/\/.*$/; // This regex should be preserved
    return msg.match(pattern); // This comment should be removed
}

// Test 10: Edge case with empty strings and comments
const empty = ""; // This comment should be removed
const justComment = ""; /* This comment should be removed */ // This comment should be removed
