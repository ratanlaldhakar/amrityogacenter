def check_braces(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple brace matching
    stack = []
    line_no = 1
    col_no = 0
    errors = []
    
    for i, char in enumerate(content):
        if char == '\n':
            line_no += 1
            col_no = 0
        else:
            col_no += 1
            
        if char in ['{', '[', '(']:
            stack.append((char, line_no, col_no, i))
        elif char in ['}', ']', ')']:
            if not stack:
                errors.append(f"Extra closing '{char}' at line {line_no}, col {col_no}")
                continue
            last_char, l_no, c_no, _ = stack.pop()
            if (char == '}' and last_char != '{') or \
               (char == ']' and last_char != '[') or \
               (char == ')' and last_char != '('):
                errors.append(f"Mismatched '{char}' at line {line_no}, col {col_no} matching '{last_char}' from line {l_no}, col {c_no}")
                
    while stack:
        char, l_no, c_no, _ = stack.pop()
        errors.append(f"Unclosed '{char}' from line {l_no}, col {c_no}")
        
    return errors

errors = check_braces('d:\\yoga\\js\\app.js')
if errors:
    print("Syntax Errors found:")
    for err in errors[:10]:
        print("-", err)
else:
    print("No brace matching errors found in db.js!")
