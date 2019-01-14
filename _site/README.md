# jacobproffer.com

This repository contains the source code for my personal site. The core of the site is structured with Jekyll/Liquid, built from scratch following the documentation. I've also integrated Gulp (V3) as a task runner, which handles the minification and compiling of Sass and JavaScript files. HTML minification is handled by Jekyll through a custom file within the layouts directory.

For development, I typically have two terminal tabs open. One tab is dedicated to Gulp and the other Jekyll.

## How to Use

First, you'll want to fork the repository or download the zip file. Then, `cd` into the gulp directory. From within this directory, run either `npm install` or `yarn` (Or whichever package manager you prefer). Once the node_modules are installed, run the default `gulp` command.

Within a separate terminal tab or window, run `jekyll serve` from within the root directory of the project.