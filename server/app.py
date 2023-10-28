#!/usr/bin/env python3

# Standard library imports

from flask import request, make_response
from flask_restful import Resource
from config import app, db, api
import os

from models import Account, Friendship

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

@app.route('/')
def index():
    return '<h1>Mail-Box Server</h1>'


class Accounts(Resource):
    def get(self, id = None):
        if id:
            account = Account.query.filter_by(id = id).first()

            if account:
                return make_response(account.to_dict(), 200)
            else:
                return make_response({'error': 'Account not found'}, 404)
        else:
            accounts = Account.query.all()
            return make_response([account.to_dict() for account in accounts], 200)

    def post(self):
        new_account = Account(**request.json)
        db.session.add(new_account)
        db.session.commit()
        return make_response(new_account.to_dict(), 201)

    def patch(self, id):
        account = Account.query.filter_by(id = id).first()

        if account:
            for key, value in request.json.items():
                setattr(account, key, value)
                db.session.commit()
                return make_response(account.to_dict(), 200)
        else:
            return make_response({'error': 'Account not found'})
        
    def delete(self, id):
        account = Account.query.filter_by(id = id).first()

        if account:
            db.session.delete(account)
            db.session.commit()
            return make_response({'result': 'Account deleted'}, 200)
        else:
            return make_response({'error': 'Account not found'}, 404)


class Friendships(Resource):
    def get(self, id = None):
        if id:
            friendship = Friendship.query.filter_by(id = id).first()

            if friendship:
                return make_response(friendship.to_dict(), 200)
            else:
                return make_response({'error': 'Friendship not found'}, 404)
        else:
            friendships = Friendship.query.all()
            return make_response([friendship.to_dict() for friendship in friendships], 200)
    
    def post(self):
        new_friendship = Friendship(**request.json)
        db.session.add(new_friendship)
        db.session.commit()
        return make_response(new_friendship.to_dict(), 201)

    def patch(self, id):
        friendship = Friendship.query.filter_by(id = id).first()

        if friendship:
            for key, value in request.json.items():
                setattr(friendship, key, value)
                db.session.commit()
                return make_response(friendship.to_dict(), 200)
        else:
            return make_response({'error': 'Friendship not found'})
        
    def delete(self, id):
        friendship = Friendship.query.filter_by(id = id).first()

        if friendship:
            db.session.delete(friendship)
            db.session.commit()
            return make_response({'result': 'Friendship deleted'}, 200)
        else:
            return make_response({'error': 'Friendship not found'}, 404)


api.add_resource(Accounts, '/accounts', '/accounts/<int:id>')
api.add_resource(Friendships, '/friendships', '/friendships/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

