from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import TastingNote
from datetime import date
from ..forms.tastingnote_form import TastingNoteForm
from ..models.db import db

tastingnote_routes = Blueprint('tastingnotes', __name__)


@tastingnote_routes.route('/')
def get_all_tastingnotes():
    """
    Query for all notes and returns them in a list of note dictionaries
    """

    notes = TastingNote.query.all()

    notes_list = [note.to_dict() for note in notes]

    return {"tastingnotes": notes_list}


@tastingnote_routes.route('/current')
@login_required
def get_all_user_tastingnotes():
    """
    GET all owned notes of the current user
    """

    notes = TastingNote.query.all()
    notes_list = [note.to_dict() for note in notes if note.user_id == current_user.id]

    return {"tastingnotes": notes_list}


@tastingnote_routes.route('/<int:tastingNoteId>', methods=["PUT"])
@login_required
def update_tastingnote(tastingNoteId):
    """
    Route to update a note
    """

    form = TastingNoteForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    note = TastingNote.query.get(tastingNoteId)
    if note.user_id == current_user.id:
        if form.validate_on_submit():
            note.note = form.data["note"]
            note.score = form.data["score"]
            note.flavors = form.data["flavors"]
            db.session.commit()
            return note.to_dict(), 201

        else:
            print(form.errors)
            return { "errors": form.errors }, 400

    else:
        return { "message": "FORBIDDEN" }, 403


# @tea_routes.route("/<int:teaId>", methods=["DELETE"])
# @login_required
# def delete(teaId):
#     """
#     Route to delete a tea
#     """
#     target_tea = Tea.query.get(teaId)

#     if target_tea:
#         if target_tea.user_id == current_user.id:
#             db.session.delete(target_tea)
#             db.session.commit()
#             return { "message": "Delete successful!" }
#         else:
#             return { "message": "FORBIDDEN" }, 403
#     else:
#         return { "message": "Tea not found!" }, 404
