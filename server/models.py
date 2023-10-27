from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Account(db.Model, db.SerializerMixin):
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

    def __repr__(self):
        return f'<Account name: {self.firstname} {self.lastname} DOB: {self.dob} >'