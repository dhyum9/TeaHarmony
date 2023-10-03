from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class TastingNote(db.Model):
    __tablename__ = 'tasting_notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    tea_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("teas.id"), ondelete="CASCADE"), nullable=False)
    note = db.Column(db.String)
    score = db.Column(db.Integer, default=50)
    # tea_amount = db.Column(db.Integer)
    # water_amount = db.Column(db.Integer)
    # steep_time = db.Column(db.String)
    # temperature = db.Column(db.String)
    flavors = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships
    user = db.relationship("User", back_populates="tasting_notes")
    tea = db.relationship("Tea", back_populates="tasting_notes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'company': self.company,
            'type': self.type,
            'flavors': self.flavors,
            'sold_in': self.sold_in,
            'certification': self.certification,
            'ingredients': self.ingredients,
            'caffeine': self.caffeine,
            'description': self.description,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
