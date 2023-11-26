"""initial revision

Revision ID: f038857d7850
Revises: 
Create Date: 2023-11-20 12:19:16.860595

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f038857d7850'
down_revision = None
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
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.Column('sent_timestamp', sa.String(), nullable=True),
    sa.Column('read_timestamp', sa.String(), nullable=True),
    sa.Column('seen', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['sender_id'], ['accounts.id'], name=op.f('fk_messages_sender_id_accounts')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    op.drop_table('accounts')
    # ### end Alembic commands ###