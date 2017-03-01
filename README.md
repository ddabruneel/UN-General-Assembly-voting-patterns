# Welcome to Kura!

Kura means "vote" in Swahili and is a  solution to the [UNGAviz - Textual Analytics and Visualization challenge](https://unite.un.org/ideas/content/ungaviz). The solution is based on Multidimensional Scaling as described below.

A live version of the solution is available [here](https://ddabruneel.github.io)

## Usage
The user is presented with one simple page with one graph.
Each dot represent a country. the coordinate of the dot represent its voting pattern relative to other countries: Countries close to each other signify that their voting behavior is very similar. Countries far apart represent a sharp divergence of views.
A user can choose from 3 drop down menus which allows to change:
- The topic of interest ("Human Rights", "Palestine", "Non-proliferation"
- The color of the dots (to highlight "Region", "Development Status", "HDI Category"  )
- The size of the dots ("HDI Score", "Global Peace Index", "State Fragility Index", "set size"). Note that "set size" just realign all shapes to a default size.
- The shape of the dots ("Development Status", "Circle"). Note that again the last option "Circle" just assign a circle to all dots.
A legend indicate the meaning of the various colors

Hovering over a dot displays the country name, Region, Development Status, Cound of Yes Votes for a particular topic, HDI score, Global Peace Index and State Fragility Index.

## Data source
The dataset used was [votes.csv](https://drive.google.com/file/d/0BzCpVV4_zQ2OcmVRTE1PWXJMTkU/view) which was offered as an unofficial dataset.

General Assembly resolutions were filtered to include only resolutions that came to a vote, and for resolutions that took place after January 1st 2000.

Each vote was assigned a score as below
  - Yes vote = 2
  - No show = 1
  - abstain or no = 0

## Computation:

All data computations were performed using [Knime analytics](https://www.knime.org/knime-analytics-platform), an open platform providing a comprehensite toolbox for data analysis.

First, votes were divided by topic based on the parsing of the title text field. Three topics with significant votes were identified:
  - Palestine
  - Non-proliferation
  - Human Rights
  
Votes were then computed into a Distance Matrix, presenting the distance between countries for a partiular topic into a square matrix. 

Finally, [MDS (Multidimensional Scaling)](https://en.wikipedia.org/wiki/Multidimensional_scaling) was used to map the distance matrix into a two dimension space.

## Data visualization

The visual rendering was created using HTML, CSS, [D3 Library](https://d3js.org/) and [AngularJS Platform](https://angularjs.org/)

## References 

The idea for this solution was mainly inspired by these 2 papers:
- Voeten, Erik. 2000. Clashes in the assembly. The IO Foundation and the Massachusetts Institute of Technology
- Kim, Soo Yeon. Russett, Bruce. 1996. The new politics of voting alignments in the United Nations General Assembly. The IO Foundation and the Massachusetts Institute of Technology

## Country Enriched data sources
[Fragile States Index](http://fsi.fundforpeace.org/rankings-2016)

[State Fragility Index](http://www.systemicpeace.org/inscrdata.html)

[Global Peace Index](https://en.wikipedia.org/wiki/Global_Peace_Index)

[Human Development Index](http://hdr.undp.org/en/composite/HDI)

[UNStats](https://unstats.un.org/unsd/methods/m49/m49alpha.htm)

## Moving forward
The intention here was mainly to showcase the potential of this approach. This platform could easily be enriched with additional data sources, expended with additonal topics, different time periods, so an end-user can explore further potential relationships between votes and the characteristics of a country.

Enjoy!




