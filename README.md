# GAChallenge

I am happy to present this solution to the [UNGAviz - Textual Analytics and Visualization challenge](https://unite.un.org/ideas/content/ungaviz)

- Data source: votes.csv
Data was filtered to include only votes that happened since the year 2000.

Computation:
First each vote was assigned a score as below
  - Yes vote = 2
  - No show = 1
  - adstain or no = 0

Second: A Distance Matrix calculation presented the votes for each pair of countries relative to each other.

Third: Votes were divided by topic based on the parsing of the title text field. 4 significant topics were identified. 

Fourth: MDS to map multidimension space into a two dimension space.

Fifth: The result by topic is presented on a single graph, letting the user
**This Git contains** the source code to 

[Run Working Demo here](https://ddabruneel.github.io/scatterplot.html)


- Computation: Knime Analytics
the Knime workflow is available to donwload here: 





