from fastapi import FastAPI, HTTPException, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from datatypes import *
import models
from models import *
from datatypes import *

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
        raise HTTPException(status_code=400, detail="Tag already exists")
    
    new_tag = Tag(name=tag.name)
    db.add(new_tag)
    db.commit()
    db.refresh(new_tag)
    
    return new_tag

@app.get("/tags/", response_model=List[TagModel])
def get_all_tags(db: db_dependency):
    all_tags = db.query(Tag).all()
    if not all_tags:
        raise HTTPException(status_code=404, detail="No tags found")
    return all_tags

@app.post("/genres/", response_model=GenreModel)
def create_genre(genre: GenreCreate, db: db_dependency):
    existing_genre = db.query(Genre).filter(Genre.name == genre.name).first()
    
    if existing_genre:
        raise HTTPException(status_code=400, detail="Genre already exists")
    
    new_genre = Genre(name=genre.name)
    db.add(new_genre)
    db.commit()
    db.refresh(new_genre)
    
    return new_genre

@app.get("/genres/", response_model=List[GenreModel])
def get_all_genres(db: db_dependency):
    all_genres = db.query(Genre).all()
    if not all_genres:
        raise HTTPException(status_code=404, detail="No genres found")
    return all_genres

@app.post("/bookshelf/", response_model=BookcaseModel)
def create_bookcase(bookcase: BookcaseCreate, db: db_dependency):
    existing_bookcase = db.query(Bookcase).filter(Bookcase.bookcase_name == bookcase.bookcase_name).first()
    
    if existing_bookcase:
        raise HTTPException(status_code=400, detail="A bookcase with that name already exists")

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
        raise HTTPException(status_code=404, detail="No bookcases found")
    return all_bookcases

@app.get("/shelves/", response_model=List[ShelfModel])
def get_all_shelves(db: db_dependency):
    all_shelves = db.query(Shelf).all()
    if not all_shelves:
        raise HTTPException(status_code=404, detail="No shelves found")
    return all_shelves