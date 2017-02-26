angular.module('kura.directives',[])

    .directive('kuraView', function($parse) {
	
    return {
        
        restrict : 'EAC',
		scope: {
            data: '='
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
                    .style("margin-left", "140px")
		            // 25 plus total width
                    .attr("width", "620px")
		            .attr("height", "620px");

            
        // Data Provider Watch
        scope.$watch('dataFile', function (dataFile) {
            console.log("dataFile has changed");
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
		
        data.forEach(function(d) {
                    d.ccode = d.CountryCode;
                    d.cname = d.CountryName;
                    d.region = d.Region;
                    d.devstatus = d.DevelopmentStatus; 
                    d.membership = d.Membership;
                    d.col1 = +d.Col1;  // x axis
                    d.col2 = +d.Col2;  // y-axis
        });
        
        x.domain(d3.extent(data, function(d) { return d.col1; }));
        y.domain(d3.extent(data, function(d) { return d.col2; }));
        
        var color = d3.scale.ordinal()
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
        
        var tooltip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong>Country:</strong> <span style='color:#777777'>" + d.cname + "</span><br><strong>Region:</strong> <span style='color:#777777'>" + d.region + "</span><br><strong>Development Status:</strong> <span style='color:#777777'>" + d.devstatus + "</span>";
          });

		
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
                          .attr("r", 5)
                          .attr("cx", function(d) { return x(d.col1); })
                          .attr("cy", function(d) { return y(d.col2); })
                          .attr("stroke", function (d) { return color(d.region); })
                          .attr("stroke-width", 1)
                          // .style("fill", "#B71C1C")
                          .style("fill", function (d) { return color(d.region); })
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

                
            }; // end render function            
		} // end link function
	}
});