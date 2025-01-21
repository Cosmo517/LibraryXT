from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# Handles dealing with Tag related data
class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagModel(TagBase):
    id: int

    class Config:
        from_attributes = True

class BookTagBase(BaseModel):
    book_id: int
    tag_id: int

class BookTagModel(BookTagBase):
    class Config:
        from_attributes = True

# Helps with handling Book related data
class BookBase(BaseModel):
    id: int
    isbn: str
    title: str
    author: str
    publisher: str
    page_count: int
    year_published: int
    genre: int
    directory: str
    
class BookCreate(BookBase):
    tags: Optional[List[TagCreate]] = []

class BookModel(BookBase):
    id: int
    tags: List[TagModel] = []

    class Config:
        from_attributes = True

# Deals with the Genre data
class GenreBase(BaseModel):
    id: int
    name: str
    class config:
        from_atrributes = True

# Deals with the Shelf data
class ShelfBase(BaseModel):
    id: int
    shelf_name: str
    shelf_identifier: str
    book_id: int
    bookcase_id: int
    class Config:
        from_attributes = True

# Deals with the Bookcase data
class BookcaseBase(BaseModel):
    id: int
    bookcase_name: str
    bookcase_identifier: str
    
    class Config:
        from_attributes = True

# Deals with the Book Location History data
class BookLocationHistoryBase(BaseModel):
    id: int
    book_id: int
    shelf_id: int
    bookcase_id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True