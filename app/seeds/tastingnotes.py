# from app.models import db, TastingNote, environment, SCHEMA
# from sqlalchemy.sql import text


# def seed_tasting_notes():
#     tea1 = Tea(
#         user_id=2,
#         name="Taiwan Wild 'Shan Cha' Black Tea",
#         company='What-Cha',
#         type='Black Tea',
#         sold_in='Loose Leaf',
#         certification='',
#         ingredients='Black Tea Leaves',
#         caffeine='High',
#         description='A most unique tea which is indigenous to Taiwan and still grows wild in certain areas. It is rarely sold as the plant loses its distinct characteristics when cultivated and so the only tea production is from the surviving wild growing bushes.',
#         image_url='https://www.filepicker.io/api/file/TBYaZlNR5svTwLegnptw/convert?fit=max&h=480&w=940'
#     )

#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(bobbie)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_tasting_notes():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.tasting_notes RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM tasting_notes"))

#     db.session.commit()
