from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Tea

tea_routes = Blueprint('teas', __name__)


@tea_routes.route('/')
def get_all_teas():
    """
    Query for all teas and returns them in a list of tea dictionaries
    """

    teas = Tea.query.all()
    # reviews = Review.query.all()

    teas_list = [tea.to_dict() for tea in teas]
    # all_review_list = [review.to_dict() for review in reviews]


    # for restaurant_obj in all_restaurant_list:
    #     # print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", restaurant_obj.review)
    #     restaurant_reviews = [ review for review in all_review_list if review["restaurant_id"] == restaurant_obj["id"] ]
    #     sum_stars = 0
    #     for restaurant_review in restaurant_reviews:
    #         sum_stars += restaurant_review["stars"]
    #     if sum_stars > 0:
    #         avg_rating = sum_stars / len(restaurant_reviews)
    #         restaurant_obj["avg_rating"] = avg_rating
    #         restaurant_obj["num_reviews"] = len(restaurant_reviews)

    return {"teas": teas_list}


@tea_routes.route('/<int:id>')
def get_tea_by_id(id):
    """
    Query for tea by tea.id
    """

    one_tea = Tea.query.get(id).to_dict()
    # reviews = Review.query.all()
    # all_reviews = [review.to_dict() for review in reviews]

    # restaurant_reviews = [ review for review in all_reviews if review["restaurant_id"] == one_restaurant["id"] ]
    # sum_stars = 0

    # for review in restaurant_reviews:
    #     sum_stars += review["stars"]
    # if sum_stars > 0:
    #     avg_rating = sum_stars / len(restaurant_reviews)
    #     one_restaurant["avg_rating"] = avg_rating
    #     one_restaurant["num_reviews"] = len(restaurant_reviews)

    if not one_tea:
        return { "message": "Tea not found!" }, 404

    return one_tea
