# Welcome to Kura!

Kura means "vote" in Swahili and is a  solution to the [UNGAviz - Textual Analytics and Visualization challenge](https://unite.un.org/ideas/content/ungaviz). The solution is based on Multidimensional Scaling as described below.

A live version of the solution is available [here](https://ddabruneel.github.io)

## Data source
The dataset used was [votes.csv](https://drive.google.com/file/d/0BzCpVV4_zQ2OcmVRTE1PWXJMTkU/view) which was offered as an unofficial dataset.

General Assembly resolutions were filtered to include only resolutions that came to a vote, and for resolutions that took place after January 1st 2000.

Each vote was assigned a score as below
  - Yes vote = 2
  - No show = 1
  - abstain or no = 0

## Computation:

All data computations were performed using [Knime analytics](https://www.knime.org/knime-analytics-platform), an open platform providing a comprehensite toolbox for data analysis.

First, votes were divided by topic based on the parsing of the title text field. Four topics with significant votes were identified:
  - Disarmament
  - Palestine
  - Non-proliferation
  - Human Rights
  
Votes were then computed into a Distance Matrix, presenting the distance between countries for a partiular topic into a square matrix. 

Finally, [MDS (Multidimensional Scaling)](https://en.wikipedia.org/wiki/Multidimensional_scaling) was used to map the distance matrix into a two dimension space.

## Data visualization

The visual rendering was created using HTML, CSS, [D3 Library](https://d3js.org/) and [AngularJS Platform](https://angularjs.org/)

Enjoy!




