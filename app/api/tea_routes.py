from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Tea, TastingNote
from ..forms.tea_form import TeaForm
from ..forms.tastingnote_form import TastingNoteForm
from datetime import date
from ..models.db import db

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


@tea_routes.route('/', methods=["POST"])
@login_required
def create_tea():
    """
    Route to create a new tea
    """

    form = TeaForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        type_string = ', '.join(form.data["type"])
        sold_in_string = ', '.join(form.data["sold_in"])
        certification_string = ', '.join(form.data["certification"])

        new_tea = Tea(
            user_id=current_user.id,
            name=form.data["name"],
            company=form.data["company"],
            type=type_string,
            sold_in=sold_in_string,
            certification=certification_string,
            ingredients=form.data["ingredients"],
            caffeine=form.data["caffeine"],
            description=form.data["description"],
            image_url=form.data["image_url"],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_tea)
        db.session.commit()
        return new_tea.to_dict(), 201

    else:
        print(form.errors)
        return { "errors": form.errors }, 400


@tea_routes.route("/<int:teaId>", methods=["PUT"])
@login_required
def update_tea(teaId):
    """
    Route to update a tea
    """
    form = TeaForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    target_tea = Tea.query.get(teaId)
    if target_tea.user_id == current_user.id:
        if form.validate_on_submit():

            type_string = ', '.join(form.data["type"])
            sold_in_string = ', '.join(form.data["sold_in"])
            certification_string = ', '.join(form.data["certification"])

            target_tea.name = form.data["name"]
            target_tea.company = form.data["company"]
            target_tea.type = type_string
            target_tea.sold_in = sold_in_string
            target_tea.certification = certification_string
            target_tea.ingredients = form.data["ingredients"]
            target_tea.caffeine = form.data["caffeine"]
            target_tea.description = form.data["description"]
            target_tea.image_url = form.data["image_url"]
            db.session.commit()
            return target_tea.to_dict()

        else:
            return { "errors": form.errors }, 400

    else:
        return { "message": "FORBIDDEN" }, 403


@tea_routes.route("/<int:teaId>", methods=["DELETE"])
@login_required
def delete(teaId):
    """
    Route to delete a tea
    """
    target_tea = Tea.query.get(teaId)

    if target_tea:
        if target_tea.user_id == current_user.id:
            db.session.delete(target_tea)
            db.session.commit()
            return { "message": "Delete successful!" }
        else:
            return { "message": "FORBIDDEN" }, 403
    else:
        return { "message": "Tea not found!" }, 404


@tea_routes.route('/<int:teaId>/tastingnotes')
def get_all_tea_tastingnotes(teaId):
    """
    Query for all notes for a specific tea
    """

    notes = TastingNote.query.all()

    notes_list = [note.to_dict() for note in notes if note.tea_id == teaId]

    return {"tastingnotes": notes_list}


@tea_routes.route('/<int:teaId>/tastingnotes', methods=["POST"])
@login_required
def create_tastingnote(teaId):
    """
    Route to create a new note
    """

    form = TastingNoteForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        new_note = TastingNote(
            tea_id=teaId,
            user_id=current_user.id,
            note=form.data["note"],
            score=form.data["score"],
            flavors=form.data["flavors"],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict(), 201

    else:
        print(form.errors)
        return { "errors": form.errors }, 400
