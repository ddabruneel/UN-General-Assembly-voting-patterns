# Welcome to Kura!

Kura means "vote" in Swahili and is a  solution to the [UNGAviz - Textual Analytics and Visualization challenge](https://unite.un.org/ideas/content/ungaviz). The solution is based on Multidimensional Scaling as described below.

A live version of the solution is available [here](https://ddabruneel.github.io)

## Data source
The dataset used was [votes.csv](https://drive.google.com/file/d/0BzCpVV4_zQ2OcmVRTE1PWXJMTkU/view) which was offered as an unofficial dataset.

General Assembly resolutions were filtered to include only resolutions that came to a vote, and for resolutions that took place after January 1st 2000.

Each vote was assigned a score as below
  - Yes vote = 2
  - No show = 1
  - adstain or no = 0

## Computation:

First: A Distance Matrix calculation presented the votes for each pair of countries relative to each other.

Third: Votes were divided by topic based on the parsing of the title text field. Four topics with significant votes were identified:
  - Disarmament
  - Palestine
  - Non-proliferation
  - Human Rights

Third: [MDS (Multidimensional Scaling)](https://en.wikipedia.org/wiki/Multidimensional_scaling) was used to map multidimension space into a two dimension space.

Fifth: The result by topic is presented on a single graph, letting the user
**This Git contains** the source code to 

[Run Working Demo here](https://ddabruneel.github.io/scatterplot.html)


- Computation: Knime Analytics
the Knime workflow is available to donwload here: 





