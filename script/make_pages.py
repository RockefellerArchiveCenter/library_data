#!/usr/bin/python

"""Creates pages from JSON data files so that the site will build correctly.

This code relies on Python 2. Using Python 3 will add byte strings to certain
page titles, which will cause YAML exceptions.
"""

import json
from os import listdir, mkdir, pardir
from os.path import abspath, basename, isdir, join

OBJ_PREFIX = "items"
DATA_DIR = abspath(join(__file__, pardir, pardir, "_data", "resource"))
PAGE_DIR = abspath(join(__file__, pardir, pardir, OBJ_PREFIX))


def clean_string(string):
    """Removes unwanted characters from strings."""
    return string.strip().replace("\n", "").replace('"', '\\"').encode("utf-8")


def make_pages():
    """Creates Markdown pages for each JSON file found in DATA_DIR.

    Data from the file to create a YAML header in the file.
    """
    if not isdir(PAGE_DIR):
        mkdir(PAGE_DIR)
    for f in listdir(DATA_DIR):
        with open(join(DATA_DIR, f), "r") as df:
            data = json.load(df)
            title = clean_string(data["title"])
            obj_id = data["uri"].split("/")[-1]
        with open(join(PAGE_DIR, "{}.md".format(obj_id)), "w") as page:
            page.write("---\nlayout: item\n")
            page.write("title: \"{}\" \n".format(title))
            page.write("id: {}\n".format(obj_id))
            page.write("permalink: {}/{}/\n".format(OBJ_PREFIX, obj_id))
            page.write("---")


if __name__ == "__main__":
    make_pages()
