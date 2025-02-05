from models import db, Flashcard
from app import app  # Import after db to avoid circular import

with app.app_context():  # Ensure database operations run in the correct context
    db.create_all()  # Create tables if they don’t exist

    # Create some flashcards
    flashcards = [
        Flashcard(category="Math", title="Pythagorean Theorem", description="a² + b² = c²"),
        Flashcard(category="Science", title="Law of Gravity", description="Force of attraction between masses."),
    ]

    # Add and commit to the database
    db.session.add_all(flashcards)
    db.session.commit()

    print("Database seeded successfully!")
