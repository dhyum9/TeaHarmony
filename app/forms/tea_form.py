from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, URLField, TextAreaField, SelectMultipleField
from wtforms.validators import DataRequired

type_choices=["Black", "Bubble Tea", "Chai", "Dark/Heicha", "Flavored", "Flowering",
              "Food", "Fruit", "Green", "Guayusa", "Herbal", "Honeybush",
              "Kombucha", "Matcha", "Oolong", "Pu'erh", "Pu'erh (Sheng)", "Pu'erh (Shou)",
              "Purple", "Rooibos", "Spice", "White", "Yaupon", "Yellow", "Yerba Maté"]

sold_in_choices=["Bulk", "Canned/Bottled", "Compressed", "Loose Leaf", "Powder/Instant",
                 "Sachet", "Tea Bag"]

certification_choices=["Fair Trade", "Kosher", "Organic", "Vegan"]

caffeine_choices=["Low", "Medium", "High", "Decaffeinated", "Caffeine Free"]

class TeaForm(FlaskForm):
    image_url = URLField("Featured Image")
    name = StringField("Tea Name", validators=[DataRequired()])
    company = StringField("Company Name", validators=[DataRequired()])
    type = SelectMultipleField("Restaurant Type", choices=type_choices)
    sold_in = SelectMultipleField("Available In", choices=sold_in_choices)
    certification = SelectMultipleField("Certifications", choices=certification_choices)
    ingredients = StringField("Ingredients")
    caffeine = SelectField("Certifications", choices=caffeine_choices)
    description = TextAreaField("Tea Info")
    submit = SubmitField("SUBMIT TEA")
