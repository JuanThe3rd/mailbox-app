"""empty message

Revision ID: d0cf860f6ea8
Revises: 43e0c0859382
Create Date: 2023-10-28 11:25:20.562237

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd0cf860f6ea8'
down_revision = '43e0c0859382'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('accounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('firstname', sa.String(), nullable=False),
    sa.Column('middlename', sa.String(), nullable=True),
    sa.Column('lastname', sa.String(), nullable=False),
    sa.Column('profile_pic', sa.String(), nullable=True),
    sa.Column('dob', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('about_me', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('logins')
    op.drop_table('pastorders')
    op.drop_table('menuitems')
    op.drop_table('restaurants')
    op.drop_table('past_orders')
    op.drop_table('reviews')
    op.drop_table('users')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('profile_pic', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('content', sa.VARCHAR(), nullable=False),
    sa.Column('review_type', sa.VARCHAR(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('restaurant_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name='fk_reviews_restaurant_id_restaurants'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_reviews_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('past_orders',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('total', sa.INTEGER(), nullable=True),
    sa.Column('menuItemIDs', sa.VARCHAR(), nullable=True),
    sa.Column('quantities', sa.VARCHAR(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('restaurant_id', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('restaurants',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.Column('image', sa.VARCHAR(), nullable=False),
    sa.Column('owner', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('menuitems',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('item', sa.VARCHAR(), nullable=True),
    sa.Column('image', sa.VARCHAR(), nullable=True),
    sa.Column('price', sa.INTEGER(), nullable=True),
    sa.Column('food_type', sa.VARCHAR(), nullable=True),
    sa.Column('quantity', sa.INTEGER(), nullable=True),
    sa.Column('restaurant_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name='fk_menuitems_restaurant_id_restaurants'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pastorders',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('total', sa.INTEGER(), nullable=True),
    sa.Column('menuItemIDs', sa.VARCHAR(), nullable=True),
    sa.Column('quantities', sa.VARCHAR(), nullable=True),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('restaurant_id', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('logins',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=False),
    sa.Column('password', sa.VARCHAR(), nullable=False),
    sa.Column('user_type', sa.VARCHAR(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=True),
    sa.Column('restaurant_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], name='fk_logins_restaurant_id_restaurants'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_logins_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('accounts')
    # ### end Alembic commands ###
