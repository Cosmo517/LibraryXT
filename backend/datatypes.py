from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional, Dict
from fastapi import UploadFile

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
    isbn: str
    title: str
    author: str
    publisher: str
    page_count: int
    year_published: int
    tags: Optional[List[TagCreate]] = []

class BookModel(BookBase):
    id: int
    tags: List[TagModel] = []

    class Config:
        from_attributes = True

# Deals with the Genre data
class GenreBase(BaseModel):
    name: str

class GenreCreate(GenreBase):
    pass

class GenreModel(GenreBase):
    id: int
    class config:
        from_atrributes = True

# Deals with the Shelf data
class ShelfCreate(BaseModel):
    shelf_name: str

class ShelfModel(BaseModel):
    id: int
    shelf_name: str
    bookcase_id: int

    class Config:
        orm_mode = True

# Deals with the Bookcase data
class BookcaseCreate(BaseModel):
    bookcase_name: str
    shelves: List[Dict[str, str]]

class BookcaseModel(BaseModel):
    id: int
    bookcase_name: str
    class Config:
        orm_mode = True

# Deals with the Book Location History data
class BookLocationHistoryBase(BaseModel):
    id: int
    book_id: int
    shelf_id: int
    bookcase_id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True