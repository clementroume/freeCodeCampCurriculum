def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return 'Error: Too many problems.'

    top_line = []
    bottom_line = []
    dashes = []
    results = []

    for problem in problems:
        left, operator, right = problem.split()

        if operator != "+" and operator != "-":
            return "Error: Operator must be '+' or '-'."

        if len(left) > 4 or len(right) > 4:
            return 'Error: Numbers cannot be more than four digits.'

        if not left.isdigit() or not right.isdigit():
            return 'Error: Numbers must only contain digits.'

        if operator == '+':
            result = str(int(left) + int(right))
        else:
            result = str(int(left) - int(right))

        width = max(len(left), len(right)) + 2

        top_line.append(" " * (width - len(left)) + left)
        bottom_line.append(operator + " " * (width - len(right) - 1) + right)
        dashes.append('-' * width)
        results.append(" " * (width - len(result)) + result)

    arranged = [
        '    '.join(top_line),
        '    '.join(bottom_line),
        '    '.join(dashes),
    ]

    if show_answers:
        arranged.append('    '.join(results))

    return '\n'.join(arranged)


# Example usage:
print(arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"]))
print(arithmetic_arranger(["32 + 8", "1 - 3801", "9999 + 9999", "523 - 49"],
                          True))
print(arithmetic_arranger(["32 + 8", "1 - 3801", "9999 + 9999", "523 - 49",
                           "1 + 2", "5 - 3"]))
print(arithmetic_arranger(["3 * 855", "3801 - 2"]))
print(arithmetic_arranger(["3a + 855", "3801 - 2"]))
print(arithmetic_arranger(["12345 + 6789", "1 - 2"]))
