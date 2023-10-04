from app.models import db, TastingNote, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tasting_notes():
    tea1 = TastingNote(
    )



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasting_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasting_notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasting_notes"))

    db.session.commit()
