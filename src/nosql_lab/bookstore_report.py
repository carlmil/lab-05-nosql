#!/usr/bin/env python3

# importing packages and libraries
import logging
import os

from bson.json_util import dumps
from pymongo import MongoClient

# Reading my mongodb url, user, and pwd 
url  = os.getenv("MONGODB_ATLAS_URL")
username = os.getenv("MONGODB_ATLAS_USER")
password = os.getenv("MONGODB_ATLAS_PWD")

logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)

#
def main():
	"""" returns each author in author collection and their books and publishing years"""
	try:
		client = MongoClient(url, username=username, password=password) # connects to mongodb atlas
		logger.info("Connected to MongoDB Atlas")
		db = client["bookstore"] # puts us in bookstore db
		authors = db.authors # gets authors collection
		books = db.books # gets books collection
		print(f"\nAuthors: {authors.count_documents({})}\n") # prints number of authors in authors collection
		for author in authors.find(): # for each author in collection, it prints author name, their books with their respective publishing year
			print(author['name'])
			for book in books.find({"author_ids": author['_id'] }):
				print(f"   {book['title']} ({book['published_year']})")
			print("\n")

	except Exception as e: # if code above does not work, output error message
		logger.error(f"Error: {e}")

if __name__ == "__main__":
	main()
	
