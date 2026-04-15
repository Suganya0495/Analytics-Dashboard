import sqlite3

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    amount INTEGER,
    date TEXT
)
""")

data = [
    ("Laptop", "Electronics", 50000, "2024-01-01"),
    ("Shirt", "Clothing", 2000, "2024-01-02"),
    ("Mobile", "Electronics", 30000, "2024-01-03"),
    ("Shoes", "Footwear", 4000, "2024-01-04"),
    ("TV", "Electronics", 45000, "2024-01-05"),
    ("Watch", "Accessories", 3000, "2024-01-06"),
    ("Bag", "Accessories", 2500, "2024-01-07")
]

cursor.executemany(
    "INSERT INTO sales (name, category, amount, date) VALUES (?, ?, ?, ?)",
    data
)

conn.commit()
conn.close()

print("Database initialized successfully!")