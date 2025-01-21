from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from database import Base

# Creating book table
class Book(Base):
    __tablename__= 'book'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    isbn = Column(String(14), nullable=False, index=True)
    title = Column(String(50), nullable=False)
    author = Column (String(50), nullable=False)
    tags = relationship('Tag', secondary='book_tag', back_populates='books', cascade="all, delete")
    publisher = Column(String(50), nullable=False)
    page_count = Column(Integer, nullable=False)
    year_published = Column(Integer, nullable=False)
    genre_id = Column(Integer, ForeignKey('genre.id'), nullable=False)
    directory = Column(String(256), nullable=False)
    shelf_id = Column(Integer, ForeignKey('shelf.id'), nullable=True)

class Genre(Base):
    __tablename__ = 'genre'
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50), unique=True, nullable=False)

class Tag(Base):
    __tablename__ = 'tag'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False, unique=True)
    books = relationship('Book', secondary='book_tag', back_populates='tags')

class BookTag(Base):
    __tablename__ = 'book_tag'
    book_id = Column(Integer, ForeignKey('book.id'), primary_key=True)
    tag_id = Column(Integer, ForeignKey('tag.id'), primary_key=True)

# Creating a shelf table to store the books on a single shelf
class Shelf(Base):
    __tablename__= 'shelf'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    shelf_name = Column(String(32), nullable=False)
    shelf_identifier = Column(String(16), nullable=False, index=True)
    bookcase_id = Column(Integer, ForeignKey('bookcase.id'), nullable=False, index=True)


class Bookcase(Base):
    __tablename__ = 'bookcase'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    bookcase_name = Column(String(64), nullable=False)
    bookcase_identifier = Column(String(32), nullable=False, index=True)

class BookLocationHistory(Base):
    __tablename__ = "book_location_history"
    id = Column(Integer, primary_key=True, autoincrement=True)
    book_id = Column(Integer, ForeignKey("book.id"), nullable=False, index=True)
    shelf_id = Column(Integer, ForeignKey("shelf.id"), nullable=False, index=True)
    bookcase_id = Column(Integer, ForeignKey("bookcase.id"), nullable=False, index=True)
    timestamp = Column(DateTime, nullable=False, default=func.now())