from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, URLField, TextAreaField, SelectMultipleField
from wtforms.validators import DataRequired, Optional

# type_choices=["Black", "Bubble Tea", "Chai", "Dark/Heicha", "Flavored", "Flowering",
#               "Food", "Fruit", "Green", "Guayusa", "Herbal", "Honeybush",
#               "Kombucha", "Matcha", "Oolong", "Pu'erh", "Pu'erh (Sheng)", "Pu'erh (Shou)",
#               "Purple", "Rooibos", "Spice", "White", "Yaupon", "Yellow", "Yerba Maté"]

# sold_in_choices=["Bulk", "Canned/Bottled", "Compressed", "Loose Leaf", "Powder/Instant",
#                  "Sachet", "Tea Bag"]

# certification_choices=["Fair Trade", "Kosher", "Organic", "Vegan"]

# caffeine_choices=["Low", "Medium", "High", "Decaffeinated", "Caffeine Free"]

class TeaForm(FlaskForm):
    image_url = URLField("Featured Image")
    name = StringField("Tea Name")
    company = StringField("Company Name")
    type = StringField("Restaurant Type")
    sold_in = StringField("Available In")
    certification = StringField("Certifications")
    ingredients = StringField("Ingredients")
    caffeine = StringField("Caffeine")
    description = TextAreaField("Tea Info")
    submit = SubmitField("SUBMIT TEA")
