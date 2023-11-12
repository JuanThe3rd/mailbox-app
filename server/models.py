from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!
class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    firstname = db.Column(db.String, nullable=False)
    middlename = db.Column(db.String)
    lastname = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)
    dob = db.Column(db.String)
    phone_number = db.Column(db.String)
    about_me = db.Column(db.String)

    messages = db.relationship('Message', cascade = 'all, delete', backref = 'account')

    serialize_rules = ('-messages.account',)

    def __repr__(self):
        return f'<Account Name: {self.firstname} {self.lastname} />'


class Message(db.Model, SerializerMixin):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.String, nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    receiver_id = db.Column(db.Integer)
    timestamp = db.Column(db.String)
    seen = db.Column(db.Boolean)

    serialize_rules = ('-account.messages',)

    def __repr__(self):
        return f'<Message Receiver ID: {self.receiver_id} Time: {self.timestamp} />'
