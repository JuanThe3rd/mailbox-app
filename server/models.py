from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    firstname = db.Column(db.String, nullable=False)
    middlename = db.Column(db.String)
    lastname = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)
    dob = db.Column(db.String)
    phone_number = db.Column(db.String)
    about_me = db.Column(db.String)

    friendships = db.relationship('Friendship', cascade='all, delete', backref='account')

    serialize_rules = ('-friendships.account',)

    def __repr__(self):
        return f'<Account Name: {self.firstname} {self.lastname} DOB: {self.dob}/>'


class Friendship(db.Model, SerializerMixin):
    __tablename__ = 'friendships'

    id = db.Column(db.Integer, primary_key=True)
    chat = db.Column(db.String)

    sender_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    receiver_id = db.Column(db.Integer)

    serialize_rules = ('-messages.friendship',)

    def __repr__(self):
        return f'<Friendship first_id: {self.sender_id}, second_id: {self.receiver_id} />'