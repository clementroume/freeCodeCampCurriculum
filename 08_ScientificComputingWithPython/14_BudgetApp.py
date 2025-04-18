#!/opt/homebrew/bin/python3

class Category:
    def __init__(self, category):
        self.category = category
        self.ledger = []

    def __str__(self):
        title = f"{self.category:*^30}\n"
        items = ""
        for entry in self.ledger:
            desc = entry["description"][:23].ljust(23)
            amt = f"{entry['amount']:.2f}"[:7].rjust(7)
            items += f"{desc}{amt}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total

    def deposit(self, amount, description=""):
        self.ledger.append({'amount': amount, 'description': description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        return False

    def get_balance(self):
        return sum(item['amount'] for item in self.ledger)

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.category}")
            category.deposit(amount, f"Transfer from {self.category}")
            return True
        return False

    def check_funds(self, amount):
        return self.get_balance() >= amount


food = Category('Food')
food.deposit(1000, 'deposit')
food.withdraw(10.15, 'groceries')
food.withdraw(15.89, 'restaurant and more food for dessert')
clothing = Category('Clothing')
food.transfer(50, clothing)
print(food)


def create_spend_chart(categories):
    # Calculate total withdrawals and each category's spent amount
    spent_per_category = []
    for category in categories:
        spent = sum(
            -item['amount'] for item in category.ledger if item['amount'] < 0
        )
        spent_per_category.append(spent)

    total_spent = sum(spent_per_category)
    percentages = [(spend / total_spent) * 100 for spend in spent_per_category]

    # Round down to nearest 10
    rounded_percentages = [int(p // 10) * 10 for p in percentages]

    # Chart title
    chart = "Percentage spent by category\n"

    # Chart body (from 100 to 0)
    for i in range(100, -1, -10):
        line = f"{i:>3}|"
        for percent in rounded_percentages:
            line += " o " if percent >= i else "   "
        chart += line + " \n"

    # Separator
    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    # Category name labels (vertical)
    names = [cat.category for cat in categories]
    max_length = max(len(name) for name in names)

    for i in range(max_length):
        line = "    "
        for name in names:
            line += f" {name[i] if i < len(name) else ' '} "
        chart += line + " \n"

    return chart.rstrip("\n")


print(create_spend_chart([food, clothing]))
