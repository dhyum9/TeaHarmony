from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Tea, TastingNote

tea_routes = Blueprint('teas', __name__)


@tea_routes.route('/')
def get_all_teas():
    """
    Query for all teas and returns them in a list of tea dictionaries
    """

    teas = Tea.query.all()
    notes = TastingNote.query.all()

    teas_list = [tea.to_dict() for tea in teas]
    notes_list = [note.to_dict() for note in notes]

    for tea in teas_list:
        tea_notes = [ note for note in notes_list if note["tea_id"] == tea["id"] ]
        sum_score = 0
        for tea_note in tea_notes:
            sum_score += tea_note["score"]
        if sum_score > 0:
            avg_rating = sum_score / len(tea_notes)
            tea["avg_score"] = avg_rating
            tea["num_notes"] = len(tea_notes)
        else:
            tea["avg_score"] = None
            tea["num_notes"] = 0

    return {"teas": teas_list}


@tea_routes.route('/<int:id>')
def get_tea_by_id(id):
    """
    Query for tea by tea.id
    """

    target_tea = Tea.query.get(id)

    if not target_tea:
      return { "message": "Tea not found!" }, 404

    one_tea = target_tea.to_dict()

    notes = TastingNote.query.all()
    notes_list = [note.to_dict() for note in notes]

    tea_notes = [ note for note in notes_list if note["tea_id"] == one_tea["id"] ]
    sum_score = 0

    for tea_note in tea_notes:
        sum_score += tea_note["score"]
    if sum_score > 0:
        avg_rating = sum_score / len(tea_notes)
        one_tea["avg_score"] = avg_rating
        one_tea["num_notes"] = len(tea_notes)
    else:
        one_tea["avg_score"] = None
        one_tea["num_notes"] = 0

    return one_tea


@tea_routes.route('/current')
@login_required
def get_owned_teas():
    """
    GET all owned teas of the current user
    """

    teas = Tea.query.all()
    notes = TastingNote.query.all()
    owned_teas = [ tea.to_dict() for tea in teas if tea.user_id == current_user.id ]

    notes_list = [note.to_dict() for note in notes]

    for tea in owned_teas:
        tea_notes = [ note for note in notes_list if note["tea_id"] == tea["id"] ]
        sum_score = 0
        for tea_note in tea_notes:
            sum_score += tea_note["score"]
        if sum_score > 0:
            avg_rating = sum_score / len(tea_notes)
            tea["avg_score"] = avg_rating
            tea["num_notes"] = len(tea_notes)
        else:
            tea["avg_score"] = None
            tea["num_notes"] = 0


    return { "teas": owned_teas }
