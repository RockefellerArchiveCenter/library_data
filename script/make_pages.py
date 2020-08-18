#!/usr/bin/python3

import json
import pathlib

OBJ_PREFIX = "items"
DATA_DIR = pathlib.Path(pathlib.Path(__file__).resolve().parents[1], "_data", "resource")
PAGE_DIR = pathlib.Path(pathlib.Path(__file__).resolve().parents[1], OBJ_PREFIX)


def clean_string(string):
    return string.strip().replace("\n", "")


def make_pages():
    if not PAGE_DIR.is_dir():
        PAGE_DIR.mkdir()
    for f in DATA_DIR.iterdir():
        with f.open() as df:
            data = json.load(df)
            title = clean_string(data["title"])
            obj_id = data["uri"].split("/")[-1]
        with (PAGE_DIR / "{}.md".format(obj_id)).open(mode="w") as page:
            page.write("---\nlayout: item\n")
            page.write("title: \"{}\" \n".format(title))
            page.write("id: {}\n".format(obj_id))
            page.write("permalink: {}/{}/\n".format(OBJ_PREFIX, obj_id))
            page.write("---")


if __name__ == "__main__":
    make_pages()
