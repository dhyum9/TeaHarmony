from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class TastingNoteForm(FlaskForm):
    note = TextAreaField("Note")
    score = IntegerField("Score")
    flavors = StringField("Flavors")
    submit = SubmitField("Save Tasting Note")
