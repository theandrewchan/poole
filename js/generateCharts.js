var OPACITY_DURATION = 500;
var DEFAULT_HEIGHT = 700;

var generateChart = function(info, loc, department_id) {
    var nodes = [];
    var prereqs = [];
    var classHash = {};
    var type_ids = []
    var types = {}
    var max_depth = 0;
    var h = DEFAULT_HEIGHT;
    var w = loc.parent().width();
    var NODE_RADIUS = 30;
    var LEGEND_OFFSET = 6*NODE_RADIUS;
    loc = loc[0];

    var addClass = function(course) {
        if(type_ids.indexOf(course.type_id) < 0) {
            type_ids.push(course.type_id);
        }
        max_depth = course.depth > max_depth ? course.depth : max_depth;
        if(course.bias_x === undefined || course.bias_x === null) {
            course.bias_x = 0;
        }
        if(course.bias_y === undefined || course.bias_y === null) {
            course.bias_y = 0;
        }
        if(course.link === undefined || course.link === null) {
            course.link = "/";
        }
        prereq = course.prereqs;
        if(prereq === undefined || prereq === null)
            prereq = [];
        newclass = {
            id : course.id,
            name: course.name.toUpperCase(),
            image: course.image,
            type: course.type_id,
            radius: NODE_RADIUS,
            depth: course.depth,
            prereqs: course.prereqs,
            link: course.link,
            bias_x: course.bias_x,
            bias_y: course.bias_y,
            y: h*course.depth/max_depth
        };
        nodes.push(newclass);
        classHash[course.id] = newclass;
    };

    var course_data;
    if(department_id == 2) {
        course_data = info.cs_courses;
    } else if (department_id == 1) {
        course_data = info.ee_courses;
    }
    for(var i = 0; i < course_data.length; i++) {
        addClass(course_data[i]);
    }

    // generate link array
    nodes.forEach(function(node) {
        node.prereqs.forEach(function(prereq) {
            if(!(classHash[prereq.prereq_id] === undefined)) {
            prereqs.push({source: classHash[prereq.prereq_id], target: node, recommended: prereq.is_recommended});
            }
        });
    });

    // generate class type information
    type_ids.forEach(function(type_id) {
        types[type_id] = info.types.filter(function(type) {
            return type.id == type_id;
        })[0];
    });

    // create svg object
    var svg = d3.select(loc)
    .append("svg")
    .attr("height",h)
    .attr("width",w);

    var svgDefs = svg.append("defs");
    nodes.forEach(function(d) {
        svgDefs.append("pattern")
            .attr("id", "pattern:" + d.name)
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", NODE_RADIUS)
            .attr("width", NODE_RADIUS)
            .append("image")
            .attr("x", -NODE_RADIUS)
            .attr("y", 0)
            .attr("height", NODE_RADIUS*4)
            .attr("width", NODE_RADIUS*4)
            .attr("xlink:href", d.image);

    });

    // create force
    var force = d3.layout.force()
    .nodes(nodes)
    .charge(-450)
    .linkDistance(function(link) {
        if(link.source.type == link.target.type) {
            return 50;
        } else {
            return 300;
        }
    })
    .size([w,h]);

    // gets the base class for a given edge object (either edge recommended or edge required)
    var getBaseEdge = function(prereq) {
        var base = "edge";
        if(prereq.recommended) {
            base += " recommended";
        } else {
            base += " required" ;
        }
        return base;
    };
    var legendMouseOver = function(d) {
        circle.attr("class", function(course) {
            if(course.type == d.id) { // TODO: make sure this is right
                return "course highlight";
            }
        });
    };

    // function that gets called when a node is moused over
    var classMouseOver = function(d) {
        var prereqs = [];
        var post = []; // classes that have d as a prereq
        var traverse = function(node) {
            prereqs.push(node.id);
            node.prereqs.forEach(function(p) {
                traverse(classHash[p.prereq_id]);
            });
        };
        traverse(d);
        nodes.forEach(function(node) {
            node.prereqs.forEach(function(prereq) {
                if(prereq.prereq_id == d.id) {
                    post.push(node.id);
                }
            });
        });
        edges.attr("class", function(prereq) {
            var base = getBaseEdge(prereq);
            if(prereqs.indexOf(prereq.target.id) > -1) {
                base += " prereq";
            }
            if(prereqs.indexOf(prereq.target.id) > -1 || (post.indexOf(prereq.target.id) > -1 && prereq.source.id == d.id)) {
                base += " highlight";
            }
            if(post.indexOf(prereq.target.id) > -1 && prereq.source.id == d.id) {
                base += " post";
            }
            return base;

        });
        edges.transition().attr("opacity", function(prereq) {
            if(prereqs.indexOf(prereq.target.id) > -1 || (post.indexOf(prereq.target.id) > -1 && prereq.source.id == d.id)) {
                return 1;
            }
            return 0.2;
        }).duration(OPACITY_DURATION);

        circle.attr("class", function(prereq) {
            var base= "course";
            if(prereqs.indexOf(prereq.id) > -1 || post.indexOf(prereq.id) > -1) {
                base += " highlight";
            }
            if(prereqs.indexOf(prereq.id) > -1 || post.indexOf(prereq.id) > -1) {
                base += " prereq";
            }
            return base;
        });
        circle.transition().attr("opacity", function(prereq) {
            if(prereqs.indexOf(prereq.id) > -1 || post.indexOf(prereq.id) > -1) {
                return 1;
            }
            return 0.2;
        }).duration(OPACITY_DURATION);

        texts.transition().attr("opacity", function(prereq) {
            if(prereqs.indexOf(prereq.id) > -1 || post.indexOf(prereq.id) > -1) {
                return 1;
            }
            return 0.2;
        }).duration(OPACITY_DURATION);
    };
    //
    // function called when a course is moused off
    var classMouseOff = function(d) {
        edges.transition().attr("opacity", 1).duration(OPACITY_DURATION);
        //TODO: distinguish between recommended and required
        edges.attr("class", getBaseEdge);
        texts.transition().attr("opacity", 1.0).duration(OPACITY_DURATION);
        circle.attr("class", "course");
        circle.transition().attr("opacity", 1.0).duration(OPACITY_DURATION);
    };

    // function called when node is clicked
    var classClick = function(d) {
        if (d3.event.defaultPrevented) return;
        window.open(d.link, '_blank');
    };

    // draw edges
    var edges = svg.selectAll("line")
    .data(prereqs)
    .enter()
    .append("line")
    // TODO: recommneded/required difference
    .attr("class", getBaseEdge)
    .attr("marker-end", "url(#end)");
    // draw arrows
    svg.append("svg:defs")
    .selectAll("marker")
    .data(["end"])
    .enter().append("svg:marker")
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 0)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("markerUnits", "userSpaceOnUse")
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

    // draw nodes
    var nodeGroups = svg.selectAll("g.nodes")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "nodes")
    .on("mouseover", classMouseOver)
    .on("mouseleave", classMouseOff)
    .on("click", classClick);
    var circle = nodeGroups
    .append("circle")
    .attr("r", NODE_RADIUS)
    .attr("class", "course")
    .attr("opacity", 1.0)
    .attr("id", function(d) { return d.name; })
    .style("fill", function(d) { return "url(#pattern:" + d.name + ")"; });
    //.style("fill", function(d) { return types[d.type].color; });

    var texts = nodeGroups
    .append("text")
    .attr("class", "courseNames")
    .attr("id", function(d) { return d.name; })
    .attr("text-anchor", "middle");
    //.text(function(d) { return d.name; });

    // draw the legend for colors
    var categories = [];
    type_ids.forEach(function(key, index) {
        categories.push({id: key, name: types[key].name, index: index, color: types[key].color});
    });
    var colorLegend = svg.selectAll("circle.colorLegend")
    .data(categories)
    .enter()
    .append("circle")
    .attr("class", "colorLegend")
    .attr("cx", function(d) { return (w-3*NODE_RADIUS)*d.index/(categories.length-1) + NODE_RADIUS; })
    .attr("cy", NODE_RADIUS+5)
    .attr("r", NODE_RADIUS)
    .on("mouseover", legendMouseOver)
    .on("mouseout", classMouseOff)
    .style("fill", function(d) { return d.color; });

    var colorText = svg.selectAll("text.textLegend")
    .data(categories)
    .enter()
    .append("text")
    .attr("class", "legendText")
    .attr("x", function(d) { return (w-3*NODE_RADIUS)*d.index/(categories.length-1) +NODE_RADIUS;})
    .attr("y", 3*NODE_RADIUS)
    .attr("text-anchor", "middle")
    .text(function(d) { return d.name;});

    // draw the legend for arrows
    var arrowLegend = svg.selectAll('g.arrowLegend').data([{ name: "Recommended", "stroke-dasharray": "5, 5"}, {name: "Required", "stroke-dasharray": null}])
    .enter()
    .append('g')
    .attr("x", w-100)
    .attr("y", 25)
    .attr("height", 50)
    .attr("width", 100)
    .each(function(d, i) {
        var g = d3.select(this);
        g.append("text")
        .attr("class", "legendText")
        .attr("x", w-80)
        .attr("y", h-i*25)
        .attr("text-anchor", "end")
        .text(d.name);
        g.append("line")
        .attr("class", "highlight")
        .style("stroke-dasharray", d["stroke-dasharray"])
        .attr("x1", w-70)
        .attr("y1", h-i*25-4)
        .attr("x2", w-30)
        .attr("y2", h-i*25-4)
        .attr("marker-end", "url(#end)");
    });

    // turn on force
    force.on("tick", function(e) {
        edges.each(function(d) {
            var x1 = d.source.x;
            var y1 = d.source.y;
            var x2 = d.target.x;
            var y2 = d.target.y;
            // make arrows end at edge rather than center
            var angle = Math.atan(Math.abs((y2-y1)/(x2-x1)));
            x2 += (x1 < x2 ? -1 : 1) * (NODE_RADIUS+9)*Math.cos(angle);
            y2 += (y1 < y2 ? -1 : 1) * (NODE_RADIUS+9)*Math.sin(angle);
            d3.select(this).attr({
                'x1': x1,
                'y1': y1,
                'x2': x2,
                'y2': y2,
            });
        });

        var k = 0.1*e.alpha;
        nodes.forEach(function(o,i) {
            var charth = h - LEGEND_OFFSET - 2*NODE_RADIUS; // amount of space to draw on not including the legend
            var targety = 0;
            var targetx = 0;
            targetx += w*types[o.type].chart_pref_x;
            targety += charth*types[o.type].chart_pref_y;
            targety += (o.depth-1)*charth/(max_depth-1);
            targetx += o.bias_x;
            targety += o.bias_y;
            targety += LEGEND_OFFSET + 2*NODE_RADIUS;

            o.y += (targety-o.y)*k;
            o.x += (targetx-o.x)*k;
            circle.attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            });
            texts.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });

        //collision
        var collide = function(node) {
            var r = node.radius + 16;
            nx1 = node.x - r;
            nx2 = node.x + r;
            ny1 = node.y - r;
            ny2 = node.y + r;
            return function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== node)) {
                    var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                    if (l < r) {
                        l = (l - r) / l * 0.5;
                        node.x -= x *= l;
                        node.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            };
        };
        var q = d3.geom.quadtree(nodes),
        j = 0,
        n = nodes.length;
        while (++j < n) {
            q.visit(collide(nodes[j]));
        }
        svg.selectAll("circle.course")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    });
    var done = false;
    force.on("end", function() {
        done = true;
        force.stop();
    });
    force.on("start", function() {
        while(!done) {
        force.tick();
        }
    });
    force.start();
};
