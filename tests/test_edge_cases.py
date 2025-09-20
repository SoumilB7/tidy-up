# Test 1: Python string handling
nested = 'He said "Hello # world" to me'  # This comment should be removed
escaped = "She said \"Don't use # here\""  # This comment should be removed
raw = r"C:\Users\name\file.py"  # This comment should be removed

# Test 2: Multi-line strings
multiline1 = """This is a multi-line
string with # patterns
that should be preserved"""  # This comment should be removed

multiline2 = '''This is another
multi-line string with # patterns
that should be preserved'''  # This comment should be removed

# Test 3: Complex comment patterns
def complex_function():
    # $ This comment should be preserved
    print("Hello")  # This comment should be removed
    
    return True  # This comment should be removed

# Test 4: Preserved comments with $ marker
# $ This entire line should be preserved
# $ TODO: Fix this function
# $ IMPORTANT: Don't remove this

# Test 5: Edge cases with strings and comments
mixed1 = "String with # inside"  # Comment after string
mixed2 = 'Another string'  # Comment after string
mixed3 = f"Template {variable}"  # Comment after f-string

# Test 6: Complex nested structures
obj = {
    "prop1": "value1",  # This comment should be removed
    "prop2": "value2",  # This comment should be removed
    "path": "C:\\Users\\name",  # This comment should be removed
}

# Test 7: Function with complex string handling
def string_test():
    msg = "Error: # not found"  # This comment should be removed
    pattern = r"#.*$"  # This comment should be removed
    return msg  # This comment should be removed

# Test 8: Edge case with empty strings and comments
empty = ""  # This comment should be removed
just_comment = ""  # This comment should be removed

# Test 9: Docstrings (should be preserved)
def documented_function():
    """This is a docstring with # patterns that should be preserved"""
    return True

class DocumentedClass:
    """This is a class docstring with # patterns that should be preserved"""
    pass

# Test 10: Complex string concatenation
path = "C:\\Users\\" + username + "\\file.py"  # This comment should be removed
