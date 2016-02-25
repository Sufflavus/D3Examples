var visualisation = function(d3) {

    var width = 700;
    var height = 700;

    function initMainCanvas() {
        var svg = d3.select("#circles svg");

        svg.attr({
                width: width,
                height: height,
                class: "canvas"
            })
            .append("g");
    }

    function draw() {
        var svg = d3.select("#circles svg g")/*.call(zoom);*/
            
        var nodesCount = 20;
        var alfa = 2*Math.PI/nodesCount;
        var radius = 200;
        var x0 = width/2;
        var y0 = height/2;

        var nodes = [];
        var links = [];

        d3.range(nodesCount).forEach(function(point, i) {
            var x = radius*Math.cos(i*alfa);
            var y = radius*Math.sin(i*alfa);
            x = x0 + x;
            y = y0 - y;

            nodes.push({ x: x, y: y, name: i });
            links.push({ "target": i + 1, "source": 0 });
        });

        var centerNode = { "x": x0, "y": y0, name: "root" };
        nodes.unshift(centerNode);

        var link = svg.selectAll(".child-node-link")
            .data(links)
            .enter()
            .append("line")
            .attr({
                class: "child-node-link",
                "x1": function(d) { return nodes[d.source].x; },
                "y1": function(d) { return nodes[d.source].y; },
                "x2": function(d) { return nodes[d.target].x; },
                "y2": function(d) { return nodes[d.target].y; },
                "opacity": 0
            });

        var nodeWrapper = svg.selectAll(".child-node")
            .data(nodes)
            .enter()
            .append("g")
            .attr({
                class: function(d, i) { return i === 0 ? "root-node" : "child-node"; },
            })
            .attr("transform", function(d){ return "translate("+ d.x +"," + d.y + ")" });

        nodeWrapper.append("title")
          .text(function(d) { return d.name; });
        
        var node = nodeWrapper.append("circle")
            .attr({
                "r": 15,
                "opacity": 0
            });

        link.transition()
            .delay(200)
            .duration(750)
            .attr({
                "opacity": 1
            });

        node.transition()
            .delay(200)
            .duration(750)
            .attr({
                "r": 30,
                "opacity": 1
            });
    }

    return {
        show: function() {
            initMainCanvas();
            draw();
        },
    };
}(d3);