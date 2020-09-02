# RAC Library Discovery Catalog System

A Jekyll web application which provides the front-end user interface for the online discovery of bibliographic materials at the Rockefeller Archive Center.

## Dependencies

* [Python 3](https://www.python.org/download/releases/3.0/)
* [Ruby 2.5.0 or higher](https://www.ruby-lang.org/en/)
* [Jekyll](https://jekyllrb.com/)
* [Node.js](https://nodejs.org/en/)

## Local Development

Install [Jekyll](https://jekyllrb.com/docs/installation/)

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/library_discovery.git

To create the item pages in markdown, you must first run `scripts/make_pages.py` against your data directory. This script will check for ArchivesSpace resource record `.json` files in the `_data/resource/` directory. From the project's root directory run

    $ python scripts/make_pages.py

Once you have made item pages for each resource, you should install Node dependencies. From the project's root run

    $ npm install

After making the item pages and installing the node dependencies, you can serve application.

    $ bundle exec jekyll serve

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:4000`

With the application running, in a separate terminal window you need to build the search index.

    $ node js/create-index.js

You will need to recreate the search index after every update to the application code.

When you're done, shut down application with `ctrl+c`.

## License

This code is released under an [MIT License](LICENSE).
