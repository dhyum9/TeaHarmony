from app.models import db, Tea, environment, SCHEMA
from sqlalchemy.sql import text


def seed_teas():
    tea1 = Tea(
        user_id=2,
        name="Taiwan Wild 'Shan Cha' Black Tea",
        company='What-Cha',
        type='Black Tea',
        sold_in='Loose Leaf',
        certification='',
        ingredients='Black Tea Leaves',
        caffeine='High',
        description='A most unique tea which is indigenous to Taiwan and still grows wild in certain areas. It is rarely sold as the plant loses its distinct characteristics when cultivated and so the only tea production is from the surviving wild growing bushes.',
        image_url='https://www.filepicker.io/api/file/TBYaZlNR5svTwLegnptw/convert?fit=max&h=480&w=940'
    )

    tea2 = Tea(
        user_id=2,
        name='Royal Ceylon Flowery Black Tea',
        company='Elephant Chateau',
        type='Black Tea',
        sold_in='Bulk, Loose Leaf',
        certification='Fair Trade, Kosher, Organic, Vegan',
        ingredients='Ceylon Black Tea, Organic Black Tea',
        caffeine='Medium',
        description='Royal Ceylon Flowery Black Tea leaves selected by the very best Ceylon Master Teamen and presented to you with the permission of the Elephant Chateau and the Ceylon Flavor Foundation. Every ethically sourced product we offer is certified organic and prepared with the utmost attention to quality.',
        image_url='https://www.filepicker.io/api/file/GsQJmEVRTtirFOiK0eX1/convert?fit=max&h=480&w=940'
    )

    tea3 = Tea(
        user_id=2,
        name='Special Dark',
        company='Mandala Tea',
        type="Pu'erh Tea",
        sold_in='Bulk, Loose Leaf',
        certification='',
        ingredients='',
        caffeine='',
        description="We call this Special Dark for good reason. This decadent tea is hand crafted in small batches within cotton bags, and fermented more extensively requiring great attention and intention. Creamy, rich, dark, and smooth. This cocoa-y indulgence is one of our most unique pu’er teas. An excellent change-up from the norm for you lovers of the shu.",
        image_url='https://www.filepicker.io/api/file/Foy1egmTcyLp5cpJKzHq/convert?fit=max&h=480&w=940'
    )

    tea4 = Tea(
        user_id=2,
        name='Persian Choice Royal Earl Grey',
        company="Alvin's of San Francisco",
        type='Black Tea',
        sold_in='',
        certification='',
        ingredients='',
        caffeine='',
        description='In the ancient Persian court, legend says that the ideas of royalty, excellence and the good life evolved around the sacred tea ceremonies where only the very best tea blends were served. Centuries later tea is still a staple of Persian cuisine. We are proud to present Persian Choice Royal Earl Gray Tea, a secret blend prepared in accordance with these ancient sentiments. Made from the absolute highest quality tea leaves from Ceylon, Assam, and Darjeeling, this pungent Earl Grey blend has been transformed into pure royalty.',
        image_url='https://www.filepicker.io/api/file/wgmZkAT3ul10JTAxdlvQ/convert?fit=max&h=480&w=940'
    )

    tea5 = Tea(
        user_id=2,
        name="J.E. Oolong Milky",
        company="THEODOR",
        type="Oolong Tea",
        sold_in="Loose Leaf",
        certification="Kosher",
        ingredients="Oolong Tea",
        caffeine="",
        description="In some way you and I are very much alike... I live in a huge, cozy, Haussmann-style apartment with view on the Eiffel Tower, with about twenty rooms, one more spacious than the one next to it. So we appreciate good things and we take delight in sitting on our sofa and drinking a ‘J.E Oolong Milky – Jin Xuan’ plain green tea, elixir of heaven, with milky and vanilla-flavored notes.",
        image_url="https://www.filepicker.io/api/file/uDVCOgTzTcmMoO6oRhQn/convert?fit=max&h=480&w=940"
    )

    tea6 = Tea(
        user_id=2,
        name="2012 EoT Baotang Puerh",
        company="The Essence of Tea",
        type="Pu'erh Tea",
        sold_in="Bulk, Loose Leaf",
        certification="Fair Trade, Vegan",
        ingredients="",
        caffeine="",
        description="Baotang is located in the Mengsong region of Menghai. This tea is produced from trees averaging around 300-400 years old in cooperation with a local friend from Menghai, who stayed in the village for 2 months this Spring, setting up a hand-processing workshop and processing the fresh leaves himself.",
        image_url="https://www.filepicker.io/api/file/XGTQheU2TmzRR21gCGIH/convert?fit=max&h=480&w=940"
    )

    user1_teas = [tea1, tea2, tea3, tea4, tea5, tea6]
    add_user1_teas = [db.session.add(user1_tea) for user1_tea in user1_teas]
    db.session.commit()

    # tea5 = Tea(
    #     user_id=2,
    #     name="",
    #     company="",
    #     type="",
    #     sold_in="",
    #     certification="",
    #     ingredients="",
    #     caffeine="",
    #     description="",
    #     image_url=""
    # )



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_teas():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teas RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teas"))

    db.session.commit()
