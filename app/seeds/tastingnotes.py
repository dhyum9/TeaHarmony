from app.models import db, TastingNote, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tasting_notes():
    note1 = TastingNote(
        user_id=3,
        tea_id=1,
        note="Love this tea! Super organic",
        score=93,
        flavors=""
    )

    note2 = TastingNote(
        user_id=4,
        tea_id=1,
        note="Bought this for the blackberry note, but the yam and honey taste was the most prevalent thing in the liquor. It has a lingering sweetness that sticks in your throat after you swallow and that pleasantly funky flavor and aroma that all Taiwan blacks seem to have. Almost like the old paper in an ancient book that aged out of the musty stage. Starting to think that Taiwan blacks aren’t for me because of this note, but that’s alright, this one was a pleasant experience.",
        score=89,
        flavors="Honey, Sweet, Yams"
    )

    note3 = TastingNote(
        user_id=3,
        tea_id=2,
        note="Great taste!!",
        score=92,
        flavors=""
    )

    note4 = TastingNote(
        user_id=4,
        tea_id=2,
        note="Grabbed a sample of this from the tea box, but I’ve been procrastinating trying it since it didn’t seem very exciting. Yeah, it was way too light and mild for my tastes in black tea. The color came out quite clear as well. I didn’t add milk because that would drown out all tea taste. Instead, I added some raspberry extract so that my cup would taste like something. The tea itself didn’t taste bad. It did have a nice flavor, but it was too light.",
        score=86,
        flavors=""
    )

    note5 = TastingNote(
        user_id=3,
        tea_id=3,
        note="This tea has been comforting me during the ice storm today. Hope all my fellow Midwestern Steepsterites are warm and safe!",
        score=95,
        flavors=""
    )

    note6 = TastingNote(
        user_id=4,
        tea_id=3,
        note="I’ll continue sipping this for a few more rounds. It is a nice richly satisfying Shu, without any of the musty or ammonia-like smells, it has a certain earthiness to it, a deeply grounding sensation more than a taste. Next time I’ll probably give it the full on 3 minute treatment, as I’m one who tends to surrender to the dark side!",
        score=83,
        flavors="Cocoa, Earth"
    )

    note7 = TastingNote(
        user_id=3,
        tea_id=4,
        note="This is the best Earl Grey I have ever tasted. PERIOD!!!",
        score=100,
        flavors="Bergamot, Flowers, Lemon, Orange"
    )

    note8 = TastingNote(
        user_id=4,
        tea_id=4,
        note="Thanks so much for the awesome swap, derk!  The swap was inspired by this tea — an Earl I’d never heard of before.  (Have to try ALL the bergamot.)  The leaves here are larger than is typically seen flavored with bergamot so I went with two loose teaspoons for a mug, so as not to spill any leaves all over the place… so it could really be 1 1/2 teaspoons if I was really packing the leaves into the teaspoon. The flavor is lovely this way but I will try it with less leaves next time anyway.   The black tea is brisk enough with two teaspoons, without being overpowering, but I didn’t really expect any astringency from these big leaves.  The bergamot is tasty — bright, strong citrus, sometimes hints of cream occasionally which is unexpected… or maybe I’m just imaginging this/wishing this.  I miss my unnatural as all getout cream EGs.  It’s amazing that some bergamot can be the best tasting flavor ever, but then others can be the most disgusting flavor.  Maybe this isn’t my favorite bergamot ever (it’s great!) but that will be tough to find these days (which is exactly the reason derk offered to send some of this over).  I will certainly enjoy the remainder of this sample!",
        score=77,
        flavors=""
    )

    note9 = TastingNote(
        user_id=3,
        tea_id=5,
        note="This tea tastes smooth and milky with a little caramel in the finish. It doesn’t have that cardboard taste that I find many oolongs have, which is what turns me off of oolongs. I haven’t figured out the perfect steeping parameters yet, but I think I like it oversteeped a bit since it gives a richer flavor.",
        score=89,
        flavors="Butter, Coconut, Cream, Custard, Mango, Mineral, Paper, Popcorn, Rice, Sweet, Warm Grass, Toasted Rice, Vanilla, Walnut, Wood"
    )

    note10 = TastingNote(
        user_id=4,
        tea_id=5,
        note="The scent is very distinctive. I love it but can’t accurately discribe it. Never smelled anything quite like it before. Someone commented that the smell is typical of oolongs. As this is my first oolong I can’t second that. The taste is very smooth, sweet and buttery. In stead of leaning towards vegetal, is has a somewhat nutty basis (very faint). It also reminds me a bit of avocado’s, not in terms of exact taste, but rather in a likeness of character.",
        score=88,
        flavors=""
    )

    note11 = TastingNote(
        user_id=3,
        tea_id=6,
        note="Very smooth with a slightly bitter sweetnes and a great Qi.",
        score=90,
        flavors=""
    )

    note12 = TastingNote(
        user_id=4,
        tea_id=6,
        note="This tea is a very strong contender in the “pine/resin/astringent/drying” category. There is a surprisingly mild, yet very balanced array of complexity in the flavors of this tea. The body is smooth and viscous and the color is a nice deeper golden yellow. It is slightly sweet, slightly herbaceous, and has a reasonably sufficient amount of the astringent mouth-drying effect, but without the offputting bitterness – this is a character I look for in these types of teas, and value quite highly in evaluation. Overall, I’d say this is a lighter, more balanced, “little brother” version of the 2005 Shenlin YQH (a personal favorite of mine). The Baotang delivers in quality without the mushroomy/earthy notes and the more potent drying effects of the 05 YQH. I do recommend giving this tea a try, it is certainly high caliber.",
        score=87,
        flavors="Astringent, Drying, Herbaceous, Resin, Sweet"
    )

    all_tasting_notes = [note1, note2, note3, note4, note5, note6,
                         note7, note8, note9, note10, note11, note12]
    add_tasting_notes = [db.session.add(tasting_note) for tasting_note in all_tasting_notes]
    db.session.commit()

    note13 = TastingNote(
        user_id=2,
        tea_id=7,
        note="",
        score=,
        flavors=""
    )

    note14 = TastingNote(
        user_id=4,
        tea_id=7,
        note="",
        score=,
        flavors=""
    )

    note15 = TastingNote(
        user_id=2,
        tea_id=8,
        note="",
        score=,
        flavors=""
    )

    note16 = TastingNote(
        user_id=4,
        tea_id=8,
        note="",
        score=,
        flavors=""
    )

    note17 = TastingNote(
        user_id=2,
        tea_id=9,
        note="",
        score=,
        flavors=""
    )

    note18 = TastingNote(
        user_id=4,
        tea_id=9,
        note="",
        score=,
        flavors=""
    )

    note19 = TastingNote(
        user_id=2,
        tea_id=10,
        note="",
        score=,
        flavors=""
    )

    note20 = TastingNote(
        user_id=4,
        tea_id=10,
        note="",
        score=,
        flavors=""
    )

    note21 = TastingNote(
        user_id=2,
        tea_id=11,
        note="",
        score=,
        flavors=""
    )

    note22 = TastingNote(
        user_id=4,
        tea_id=11,
        note="",
        score=,
        flavors=""
    )

    note23 = TastingNote(
        user_id=2,
        tea_id=12,
        note="",
        score=,
        flavors=""
    )

    note24 = TastingNote(
        user_id=4,
        tea_id=12,
        note="",
        score=,
        flavors=""
    )

  # note1 = TastingNote(
  #       user_id=3,
  #       tea_id=1,
  #       note="",
  #       score=,
  #       flavors=""
  #   )

  #   note2 = TastingNote(
  #       user_id=4,
  #       tea_id=1,
  #       note="",
  #       score=,
  #       flavors=""
  #   )




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
