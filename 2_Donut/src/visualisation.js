var visualisation = function(d3) {

    var width = 800; 
    var height = 800; 

    function initMainCanvas() {
        var svg = d3.select("#circles svg");

        svg.attr({
                width: width,
                height: height,
                class: "canvas"
            })
            .append("g");
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    function draw() {
        var svg = d3.select("#circles svg g");

        var x0 = width/2;
        var y0 = height/2;

        var donutMinRadius = 100;
        var donutMaxRadius = 300;

        var donutData = [{
            x: x0,
            y: y0,
            radius: donutMinRadius 
        }, {
            x: x0,
            y: y0,
            radius: donutMaxRadius 
        }];

        var pointRadius = 10;
        var pointsCount = 100;

        var points = d3.range(pointsCount).map(function() { 
            var angle = Math.random()*Math.PI*2;
            var r = getRandomInt(donutMinRadius + pointRadius, donutMaxRadius - pointRadius);

            var x = x0 + Math.cos(angle)*r;
            var y = y0 + Math.sin(angle)*r;

            return { 
                radius: pointRadius,
                x: x,
                y: y,
            }; 
        });
        
        var color = d3.scale.category10();

        svg.selectAll("circle")
            .data(donutData)
            .enter()
            .append("circle")
            .style({
                fill: "transparent",
                stroke: "#B25C3D"
            })
            .attr({
                r: function(d) { return d.radius; },
                cx: function(d) { return d.x; },
                cy: function(d) { return d.y; }
            });
                
        svg.selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .style({
                fill: function(d, i) { return color(i); },
                stroke: function(d, i) { return shadeColor(color(i), -20); }
            })
            .attr({
                r: function(d) { return d.radius; },
                cx: function(d) { return d.x; },
                cy: function(d) { return d.y; }
            });
    }

    function shadeColor(color, percent) {
        var num = parseInt(color.slice(1),16);
        var amt = Math.round(2.55 * percent);
        var R = (num >> 16) + amt;
        var G = (num >> 8 & 0x00FF) + amt; 
        var B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255)*0x10000 + 
            (G < 255 ? G < 1 ? 0 : G : 255)*0x100 + 
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    return {
        show: function() {
            initMainCanvas();
            draw();
        },
    };
}(d3);