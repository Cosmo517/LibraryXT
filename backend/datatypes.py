from pydantic import BaseModel

class Books(BaseModel):
    id: int
    isbn: str
    title: str
    author: str
    publisher: str
    page_count: int
    year_published: int
    genre: str
    directory: str

class Shelf(BaseModel):
    id: int
    shelf_name: str
    shelf_identifier: str
    book_id: int
    bookcase_id: int

class Bookcase(BaseModel):
    id: int
    bookcase_name: str
    bookcase_identifier: str