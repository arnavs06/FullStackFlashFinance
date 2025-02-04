from app import app
from models import db, Flashcard

app.app_context().push()  # Ensure app context is available

# Create some flashcards
flashcards = [
    Flashcard(category="Math", title="Pythagorean Theorem", description="a² + b² = c²"),
    Flashcard(category="Science", title="Law of Gravity", description="Force of attraction between masses."),
]

# Add and commit to the database
db.session.add_all(flashcards)
db.session.commit()

print("Database seeded!")
