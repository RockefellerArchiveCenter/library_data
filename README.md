# RAC Library Discovery Catalog System

A web application which provides the front-end user interface for the online discovery of bibliographic materials at the Rockefeller Archive Center.

## Dependencies

* [Python 3.8 or higher](https://www.python.org/downloads/)
* [Ruby 2.5.0 or higher](https://www.ruby-lang.org/en/)
* [Jekyll 4.1.1 or higher](https://jekyllrb.com/)
* [Node.js 12.18.3 or higher](https://nodejs.org/en/)

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/library_discovery.git

Once you have made item pages for each resource, you should install Node dependencies. From the project's root run

    $ npm install

You can use `/script/build` to create item pages in markdown, initially build the `_site` directory, and create a search index. The `make_pages.py` script will check for ArchivesSpace resource record `.json` files in the `_data/resource/` directory. From the project's root directory run

    $ ./script/make_pages.py

You can serve the application locally from the project's root with

    $ bundle exec jekyll serve

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:4000`

When you're done, shut down the application with `ctrl+c`.

## License

This code is released under an [MIT License](LICENSE).
