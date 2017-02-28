angular.module('kura.directives',[])

    .directive('kuraView', function($parse) {
	
    return {
        
        restrict : 'EAC',
		scope: {
            data: '=',
            colorby: '=?',
            sizeby: '=?',
        },
		link : function(scope, element, attr) {

            var margin = {
                            left: 30,
                            right: 30,
                            top: 20,
                            bottom: 30 }, 
            width = 560, 
            height = 560;
            
            
            var element = element[0];

            var svg = d3.select(element).append("svg")
                    .style("padding-top", "0px")
                    // .style("padding-bottom", "5px")
                    .style("margin-top", "10px")
                    .style("margin-bottom", "0px")
                    .style("margin-right", "0px")
                    .style("margin-left", "10px")
		            // 25 plus total width
                    .attr("width", "850px")
		            .attr("height", "620px");

            scope.getColorBy = function() {
                var colors = null;
                if (scope.colorby == "Region") {
                  colors = scope.colorby;
                    console.log("here")
                } else {
                  colors = null;
                }
                return colors;
              };
            
            scope.getSizeBy = function() {
                var sizes = null;
                if (scope.sizeby) {
                  sizes = scope.sizeby;
                } else {
                  sizes = null;
                }
                return sizes;
              };
            
        // Data Provider Watch
        scope.$watch('dataFile', function (dataFile) {
            console.log("dataFile has changed");
            scope.render(scope.data);
         });
            
        scope.$watch('colorby', function (dataFile) {
            console.log("Color has changed");
            console.log(scope.colorby);
            svg.selectAll("*").remove();
            scope.render(scope.data);
         });
            
        scope.$watch('sizeby', function (dataFile) {
            console.log("Size has changed");
            console.log(scope.sizeby);
            svg.selectAll("*").remove();
            scope.render(scope.data);
         });
            
        scope.render = function(data) {
            
        // If we don't pass any data, return out of the element
        if (!data) return;
          
        console.log("data loaded to chart");

            var x = d3.scale.linear()
                .range([0, width]);
            
            var y = d3.scale.linear()
                .range([height,0]);
            
            
            
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("top")
                .ticks(10)
                .innerTickSize(-height);
            
            var xAxis2 = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(10);
            
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10)
                .innerTickSize(-width);
            
            var yAxis2 = d3.svg.axis()
                .scale(y)
                .orient("right")
                .ticks(10);
		
            var colorValues = scope.getColorBy();
            var sizeValues = scope.getSizeBy();
            
        data.forEach(function(d) {
                    d.ccode = d.CountryCode;
                    d.cname = d.CountryName;
                    d.region = d.Region;
                    d.devstatus = d.DevelopmentStatus; 
                    d.membership = d.Membership;
                    d.vcount = d.NbYesVotes;
                    d.hdi = d.HDIScore;
                    d.gpi = d.GlobalPeaceIndex;
                    d.sfi = d.StateFragilityIndex;
                    d.devstatus = d.DevelopmentStatus;
                    d.hdicat = d.HDICategory
                    d.col1 = +d.Col1;  // x axis
                    d.col2 = +d.Col2;  // y-axis
        });
        
        // r.domain(d3.extent(data, function(d) { return d.sizeValues; }));
        // c.domain(d3.extent(data, function(d) { return d.colorValues; }));   
            
        x.domain(d3.extent(data, function(d) { return d.col1; }));
        y.domain(d3.extent(data, function(d) { return d.col2; }));
        
        var RegionColor = d3.scale.ordinal()
                .domain(["Australia and New Zealand", 
                         "Caribbean", 
                         "Central America", 
                         "Central Asia", 
                         "Eastern Africa", 
                         "Eastern Asia", 
                         "Eastern Europe", 
                         "Melanesia", 
                         "Micronesia",
                         "Middle Africa",
                         "Northern Africa",
                         "Northern America",
                         "Northern Europe",
                         "Polynesia",
                         "South America",
                         "South-Eastern Asia",
                         "Southern Africa",
                         "Southern Asia",
                         "Southern Europe",
                         "Western Africa",
                         "Western Asia",
                         "Western Europe"])
                
                .range(["#6200EA", // Australia and New Zealand
                        "#2196F3", // Caribbean
                        "#03A9F4", // Central America
                        "#D50000", // Central Asia
                        "#FF5722", // Eastern Africa
                        "#FF1744", // Eastern Asia
                        "#00C853", // Eastern Europe
                        "#651FFF", // Melanesia
                        "#7C4DFF", // Micronesia
                        "#FF6D00", // Middle Africa
                        "#FF9100", // Northern Africa
                        "#0D47A1", // Northern America
                        "#00E676", // Northern Europe
                        "#B388FF", // Polynesia
                        "#00BCD4", // South America
                        "#FF5252", // South-Eastern Asia
                        "#FFAB40", // Southern Africa
                        "#FF8A80", // Southern Asia
                        "#64DD17", // Southern Europe
                        "#FFAB00", // Western Africa
                        "#E57373", // Western Asia
                        "#AEEA00"]); // Western Europe
        
        var HdiStatusColor = d3.scale.ordinal()
                .domain(["VERY HIGH HUMAN DEVELOPMENT", 
                         "HIGH HUMAN DEVELOPMENT",
                         "MEDIUM HUMAN DEVELOPMENT",
                         "LOW HUMAN DEVELOPMENT",
                        ""])
                
                .range(["#FF1744", // VERY HIGH HUMAN DEVELOPMENT"
                        "#FFAB00", // HIGH HUMAN DEVELOPMENT
                        "#03A9F4", // MEDIUM HUMAN DEVELOPMENT
                        "#AEEA00", // LOW HUMAN DEVELOPMENT
                       "#FFFFFF"]); 
        
        var DevStatusColor = d3.scale.ordinal()
                .domain(["developing country", 
                         "developed country"])
                
                .range(["#FFAB00", // developing country
                        "#AEEA00"]); // developed country
            
        var open_max = d3.max(data, function(d) { if (scope.sizeby == "HDI Score") {
                                                            return d.hdi;
                                                            } else if (scope.sizeby == "Global Peace Index") {
                                                            return d.gpi;
                                                            } else if (scope.sizeby == "State Fragility Index") {
                                                            return d.sfi;
                                                            }  else {
                                                            return d.hdi;
                                                            } });
                        // var open_max = data[0].domainmax;

        var radius = d3.scale.quantize().domain([0,open_max]).range([3,5,8,10]);
            
        var tooltip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Country:</strong> <span style='color:#777777'>" + d.cname + "</span><br><strong>Region:</strong> <span style='color:#777777'>" + d.region + "</span><br><strong>Development Status:</strong> <span style='color:#777777'>" + d.devstatus + "</span><br><strong>Count Yes Votes:</strong> <span style='color:#777777'>" + d.vcount + "</span><br><strong>HDI:</strong> <span style='color:#777777'>" + d.hdi + "</span><br><strong>Global Peace Index:</strong> <span style='color:#777777'>" + d.gpi + "</span><br><strong>State Fragility Index:</strong> <span style='color:#777777'>" + d.sfi + "</span>";});

		
        svg.call(tooltip);
        
        var kurachart = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
           
           
            
            kurachart.append("g")
		                .attr("class", "x axis")
                        .attr("transform", "translate(0,0)")
		                .call(xAxis);
            
            kurachart.append("g")
		                .attr("class", "x axis")
                        .attr("transform", "translate(0," + height + ")")
		                .call(xAxis2);
                   
            kurachart.append("g")
		                .attr("class", "y axis")
                        .attr("transform", "translate(0,0)")
                        .call(yAxis);
            
            kurachart.append("g")
		                .attr("class", "y axis")
                        .attr("transform", "translate(" + width + ",0)")
                        .call(yAxis2);
            
            kurachart.selectAll(".dot")
                        .data(data)
                        .enter().append("circle")
                          // .attr("r", 1.5)  
                          // .attr("r", 5)
                       // .attr("r", function (d) { return (sizeValues); })
                       // .attr("r", function (d) { return quantile(d.col1); })
                        //  .attr("r", function(d) { return radius(d.hdi); })
                       //   .attr("r", "3")
                            .attr("r", function(d) {if (scope.sizeby == "HDI Score") {
                                                            return radius(d.hdi);
                                                            } else if (scope.sizeby == "Global Peace Index") {
                                                            return radius(d.gpi);
                                                            } else if (scope.sizeby == "State Fragility Index") {
                                                            return radius(d.sfi);
                                                            }  else {
                                                            return radius(d.hdi);
                                                            }})
                          .attr("cx", function(d) { return x(d.col1); })
                          .attr("cy", function(d) { return y(d.col2); })
                          //.attr("stroke", function (d) { return RegionColor(d.region); })
                          .attr("stroke", function (d) { if (scope.colorby == "Region") {
                                                            return RegionColor(d.region);
                                                            } else if (scope.colorby == "Development Status") {
                                                            return DevStatusColor(d.devstatus);
                                                            } else if (scope.colorby == "HDI Category") {
                                                            return HdiStatusColor(d.hdicat);
                                                            }  else {
                                                            return (colorValues);
                                                            } })
                          .attr("stroke-width", 1)
                          // .style("fill", "#B71C1C")
                          // .style("fill", function (d) { return color(d.region); })
                          .style("fill", function (d) { if (scope.colorby == "Region") {
                                                            return RegionColor(d.region);
                                                            } else if (scope.colorby == "Development Status") {
                                                            return DevStatusColor(d.devstatus);
                                                            } else if (scope.colorby == "HDI Category") {
                                                            return HdiStatusColor(d.hdicat);
                                                            }  else {
                                                            return (colorValues);
                                                            }})
                        
                          // .style("fill-opacity", function (d) { return opac(d.cstatus_n); });
                          .style("fill-opacity", 0.6)
                        .on('mouseover', tooltip.show)
                        .on('mouseout', tooltip.hide);
            
            // Need to hard code CSS styles
            kurachart.selectAll(".axis line, .axis path")
                        .style("fill", "none")
                        .style("stroke", "#777777")
                        .style("opacity", 0.5)
                        .style("shape-rendering", "crispEdges");
                        
            kurachart.selectAll(".tick line")
                        .style("opacity", 0.2)
                        .style("shape-rendering", "crispEdges");
            
            kurachart.selectAll("text")
                        .style("font-family", "Open Sans Condensed, monospace")
                        .style("font-size", "11px")
                        // .style("font-weight", 300)
                        .style("color", "#AAAAAA");
            
//svg.selectAll(".point")
//      .data(data)
//    .enter().append("path")
//      .attr("class", "point")
//      .attr("d", d3.svg.symbol().type("triangle-up"))
//      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });


//Shape types are:

//["circle", "cross", "diamond", "square", "triangle-down", "triangle-up"]            
            
// add legend   
            var legend = svg.append("g")
              .attr("class", "legend")
              .attr("x", 650)
              .attr("y", 25)
              .attr("height", 100)
              .attr("width", 100);

            var legendData = data.map(function (d) { if (scope.colorby == "Region") {
                                                            return d.region;
                                                            } else if (scope.colorby == "Development Status") {
                                                            return d.devstatus;
                                                            } else if (scope.colorby == "HDI Category") {
                                                            return d.hdicat;
                                                            }  else {
                                                            return (colorValues);
                                                            } });

            var unique = legendData.filter(function (elem, pos) {
                return legendData.indexOf(elem) == pos; });
        
            legend.selectAll('g').data(unique)
              .enter()
              .append('g')
              .each(function(d, i) {
                var g = d3.select(this);
                g.append("rect")
                  .attr("x", 650)
                  .attr("y", i*15)
                  .attr("width", 5)
                  .attr("height", 5)
                  .style("fill", function (d) { if (scope.colorby == "Region") {
                                                            return RegionColor(d);
                                                            } else if (scope.colorby == "Development Status") {
                                                            return DevStatusColor(d);
                                                            } else if (scope.colorby == "HDI Category") {
                                                            return HdiStatusColor(d);
                                                            }  else {
                                                            return (colorValues);
                                                            } });

                g.append("text")
                  .attr("x", 660)
                  .attr("y", i * 15 + 8)
                  .attr("height",30)
                  .attr("width",100)
                  .style("color", "#AAAAAA")
                  .style("font-family", "Open Sans Condensed, monospace")
                  .style("font-size", "11px")
                  .text(function (d) { return (d); });
            });
                
            }; // end render function            
		} // end link function
	}
});