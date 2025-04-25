from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, Form, Query
from typing import Annotated
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import json
from datatypes import *
import models
from models import *
from datatypes import *
import os
import base64

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

models.Base.metadata.create_all(bind=engine)

# No matter what this will always close our database since we dont want to keep our databases open for too long
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# FastAPI endpoints

@app.post("/tags/", response_model=TagModel)
def create_tag(tag: TagCreate, db: db_dependency):
    existing_tag = db.query(Tag).filter(Tag.name == tag.name).first()
    if existing_tag:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Tag already exists")
    
    new_tag = Tag(name=tag.name)
    db.add(new_tag)
    db.commit()
    db.refresh(new_tag)
    
    return new_tag

@app.get("/tags/", response_model=List[TagModel])
def get_all_tags(db: db_dependency):
    all_tags = db.query(Tag).all()
    if not all_tags:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No tags found")
    return all_tags

@app.post("/genres/", response_model=GenreModel)
def create_genre(genre: GenreCreate, db: db_dependency):
    existing_genre = db.query(Genre).filter(Genre.name == genre.name).first()
    
    if existing_genre:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Genre already exists")
    
    new_genre = Genre(name=genre.name)
    db.add(new_genre)
    db.commit()
    db.refresh(new_genre)
    
    return new_genre

@app.get("/genres/", response_model=List[GenreModel])
def get_all_genres(db: db_dependency):
    all_genres = db.query(Genre).all()
    if not all_genres:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No genres found")
    return all_genres

@app.post("/bookshelf/", response_model=BookcaseModel)
def create_bookcase(bookcase: BookcaseCreate, db: db_dependency):
    existing_bookcase = db.query(Bookcase).filter(Bookcase.bookcase_name == bookcase.bookcase_name).first()
    
    if existing_bookcase:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A bookcase with that name already exists")

    # Create the bookcase
    new_bookcase = Bookcase(bookcase_name=bookcase.bookcase_name)
    db.add(new_bookcase)
    db.commit()
    db.refresh(new_bookcase)

    # Create shelves
    shelf_objects = []
    for shelf in bookcase.shelves:
        new_shelf = Shelf(shelf_name=shelf['shelf_name'], bookcase_id=new_bookcase.id)
        db.add(new_shelf)
        shelf_objects.append(new_shelf)

    db.commit()

    # Return the created bookcase with shelves
    new_bookcase.shelves = shelf_objects  # Attach shelves to bookcase for response
    return new_bookcase

@app.get("/bookcases/", response_model=List[BookcaseModel])
def get_all_bookcases(db: db_dependency):
    all_bookcases = db.query(Bookcase).all()
    if not all_bookcases:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No bookcases found")
    return all_bookcases

@app.get("/shelves/", response_model=List[ShelfModel])
def get_all_shelves(db: db_dependency):
    all_shelves = db.query(Shelf).all()
    if not all_shelves:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No shelves found")
    return all_shelves

@app.post("/books/", response_model=BookModel)
async def create_genre(
    isbn: str = Form(...),
    title: str = Form(...),
    author: str = Form(...),
    publisher: str = Form(...),
    page_count: int = Form(...),
    year_published: int = Form(...),
    genre: int = Form(...),
    shelf: int = Form(...),
    tags: str = Form(...),
    cover: UploadFile = Form(...),
    spine: UploadFile = Form(...),
    db: Session = Depends(get_db),
):
    try:
        parsed_tags = json.loads(tags)  # Convert JSON string to a Python list
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid tags format")
    
    book_exists = db.query(Book).filter(Book.isbn == isbn).first()
    
    if book_exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Book already exists with that ISBN")
    
    # Handle book creation
    new_book = Book(
        isbn=isbn,
        title=title,
        author=author,
        publisher=publisher,
        page_count=page_count,
        year_published=year_published,
        genre_id=genre,
        shelf_id=shelf,
    )
    db.add(new_book)
    db.commit()

    # Associate tags
    for tag_id in parsed_tags:
        tag = db.query(Tag).get(tag_id)
        if tag:
            new_book.tags.append(tag)
    db.commit()
    db.refresh(new_book)
    
    # Save cover and spine files
    cover_data = await cover.read()
    spine_data = await spine.read() 

    with open(f"imgs/{new_book.isbn}_cover.jpg", "wb") as f:
        f.write(cover_data) 
    
    with open(f"imgs/{new_book.isbn}_spine.jpg", "wb") as f:
        f.write(spine_data)

    return new_book

PAGE_SIZE = 5

@app.get("/books/")
def getBooks(db: db_dependency, 
    page: int = Query(1, alias="page", ge=1),
    search: Optional[str] = Query(None, alias="search"),
    searchType: Optional[str] = Query(None, alias="searchType"),
    genre: Optional[int] = Query(None, alias="genre"),
    ):    
    query = db.query(Book)
    
    if searchType == "Title":
        query = query.filter(Book.title.contains(search))
    elif searchType == "Author":
        query = query.filter(Book.author.contains(search))
    elif searchType == "Genre":
        query = query.filter(Book.genre_id == genre)
    
    start = (page - 1) *  PAGE_SIZE
    
    books = query.offset(start).limit(PAGE_SIZE).all()
    
    has_more = query.offset(start + PAGE_SIZE).first()
    more_books = False
    if has_more:
        more_books = True
    
    print("Title:", search, "Type:", searchType, "Genre:", genre, "Page:", page)
    
    if not books:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No more books")
    
    # Only read the data from no image and encode it once
    with open(f"common/no_image.jpg", "rb") as f:
        no_image_data = f.read()
    no_image_encode = base64.b64encode(no_image_data)
    
    books_dict = [BookModel.model_validate(book).model_dump() for book in books]
    for book in books_dict:
        try:
            with open(f"imgs/{book['isbn']}_cover.jpg", "rb") as f:
                data = f.read()
            book['cover'] = base64.b64encode(data)
            
            with open(f"imgs/{book['isbn']}_spine.jpg", "rb") as f:
                data = f.read()
            book['spine'] = base64.b64encode(data)
        except:
            book['cover'] = no_image_encode
            book['spine'] = no_image_encode

    return {"books": books_dict, "has_more": more_books}
