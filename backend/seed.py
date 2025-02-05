from app import app
from models import db, Flashcard

# List of financial flashcards
flashcards_data = [
    {"category": "Finance", "title": "What is EBITDA?", "description": "Earnings Before Interest, Taxes, Depreciation, and Amortization."},
    {"category": "Finance", "title": "What are the 3 financial statements?", "description": "Income Statement, Balance Sheet, and Cash Flow Statement."},
    {"category": "Finance", "title": "What is DCF valuation?", "description": "Discounted Cash Flow valuation calculates the value of an investment based on future cash flows."},
    {"category": "Finance", "title": "What is a leveraged buyout (LBO)?", "description": "A leveraged buyout is the acquisition of a company using a significant amount of borrowed money to meet the cost of acquisition."},
    {"category": "Finance", "title": "What is the difference between the income statement and the balance sheet?", "description": "The income statement shows a company's profitability over a period, while the balance sheet shows a company's financial position at a specific point in time."},
    {"category": "Finance", "title": "What is a cash flow statement?", "description": "The cash flow statement shows how changes in balance sheet accounts and income affect cash and cash equivalents."},
    {"category": "Finance", "title": "What is working capital?", "description": "Working capital is the difference between a company’s current assets and current liabilities."},
    {"category": "Finance", "title": "What is a multiple?", "description": "A multiple is a financial measurement used to evaluate a company's relative value, typically in the form of a ratio of price to earnings or revenue."},
    {"category": "Finance", "title": "What is WACC?", "description": "WACC stands for Weighted Average Cost of Capital, which is the average rate of return a company is expected to pay to finance its assets."},
    {"category": "Finance", "title": "What is the P/E ratio?", "description": "The P/E ratio is the price-to-earnings ratio, calculated by dividing the current market price of a stock by its earnings per share."},
    {"category": "Finance", "title": "What is a bond?", "description": "A bond is a fixed income instrument that represents a loan made by an investor to a borrower."},
    {"category": "Finance", "title": "What is a stock?", "description": "A stock represents ownership in a company and constitutes a claim on part of the company’s assets and earnings."},
    {"category": "Finance", "title": "What is an IPO?", "description": "An IPO, or Initial Public Offering, is the process by which a private company offers its shares to the public for the first time."},
    {"category": "Finance", "title": "What is a merger?", "description": "A merger is the combination of two companies into one, typically to create efficiencies or expand market share."},
    {"category": "Finance", "title": "What is a dividend?", "description": "A dividend is a payment made by a corporation to its shareholders, usually as a distribution of profits."},
    {"category": "Finance", "title": "What is an amortization schedule?", "description": "An amortization schedule details each periodic payment on a loan, breaking down the interest and principal amounts."},
    {"category": "Finance", "title": "What is the time value of money?", "description": "The time value of money is the concept that money available today is worth more than the same amount in the future due to its potential earning capacity."},
    {"category": "Finance", "title": "What is a capital asset?", "description": "A capital asset is a long-term asset, such as real estate or equipment, used to produce income or capital appreciation."},
    {"category": "Finance", "title": "What is return on equity (ROE)?", "description": "Return on equity is a measure of profitability calculated by dividing net income by shareholder equity."},
    {"category": "Finance", "title": "What is an equity stake?", "description": "An equity stake represents the ownership interest of shareholders in a company, expressed as a percentage of the total shares outstanding."},
]

# Seed the database
with app.app_context():
    db.create_all()  # Ensure tables exist

    # Check if flashcards already exist
    if Flashcard.query.first() is None:
        flashcards = [Flashcard(**data) for data in flashcards_data]
        db.session.add_all(flashcards)
        db.session.commit()
        print("Database seeded successfully!")
    else:
        print("Flashcards already exist, skipping seeding.")
