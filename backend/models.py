from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

# Creating books table
class Books(Base):
    __tablename__= 'books'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    isbn = Column(String(14), nullable=False)
    title = Column(String(50), nullable=False)
    author = Column (String(50), nullable=False)
    publisher = Column(String(50), nullable=False)
    page_count = Column(Integer, nullable=False)
    year_published = Column(Integer, nullable=False)
    genre = Column(String(50), nullable=False)
    directory = Column(String(256), nullable=False)

# Creating reading list table
class Shelf(Base):
    __tablename__= 'shelf'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    shelf_name = Column(String(32), nullable=False)
    shelf_identifier = Column(String(16), nullable=False)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    bookcase_id = Column(Integer, ForeignKey('bookcase.id'), nullable=False)


class Bookcase(Base):
    __tablename__ = 'bookcase'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    bookcase_name = Column(String(64), nullable=False)
    bookcase_identifier = Column(String(32), nullable=False)