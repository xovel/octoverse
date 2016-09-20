(function() {
    var t;
    t = function() {
        var t, e, n;
        return e = $(".js-nav-trigger"),
        t = $(".js-nav"),
        n = $(".sticky-wrapper"),
        e.on("click", function() {
            return t.toggleClass("expanded", e.toggleClass("active", n.toggleClass("expanded")))
        })
    }
    ,
    $(function() {
        return $(".js-page-nav").sticky({
            topSpacing: 0,
            zIndex: 3
        }),
        t()
    })
}
).call(this),
function() {
    $(document).ready(function() {
        return $(".scroll").click(function(t) {
            var e, n, o, a, r;
            return t.preventDefault(),
            e = this.href,
            n = e.split("#"),
            r = n[1],
            o = $("#" + r).offset(),
            a = o.top,
            $("html, body").animate({
                scrollTop: a
            }, "slow")
        }),
        $(function() {
            var t, e, n, o, a, r, s, l, i, c, u, d, p;
            return o = $("#page-nav"),
            a = o.find("a.section-link"),
            i = {},
            e = $(document.documentElement),
            t = $(document.body),
            s = $(window),
            r = t,
            e.scrollTop() ? r = e : (l = t.scrollTop(),
            t.scrollTop(l + 1).scrollTop() === l ? r = e : t.scrollTop(l - 1)),
            a.each(function(t, e) {
                var n, o;
                return o = $(this).attr("href"),
                n = $(o),
                n.length ? i[this.href] = {
                    link: $(e),
                    target: n
                } : void 0
            }),
            o.delegate("a.scroll", "click", function(t) {
                return t.preventDefault(),
                i[this.href] && i[this.href].target ? r.animate({
                    scrollTop: i[this.href].target.position().top - 45
                }, 600, "swing") : void 0
            }),
            u = !1,
            p = !1,
            d = !1,
            c = function() {
                var e, n, o;
                return n = r.scrollTop(),
                e = t.height(),
                o = s.height() * (n / e),
                $.each(i, function(t, e) {
                    return n + o > e.target.position().top ? (d && d.removeClass("active"),
                    d = e.link.addClass("active")) : (e.link.removeClass("active"),
                    !1)
                }),
                clearTimeout(p),
                u = !1
            }
            ,
            n = $(document).scroll(function() {
                return u ? void 0 : (p = setTimeout(c, 250),
                u = !0)
            }),
            function() {
                return n.scroll(),
                setTimeout(arguments.callee, 1500)
            }()
        }),
        $(window).scroll(function() {
            var t;
            return t = $(".js-top-link"),
            $(this).scrollTop() > 600 ? t.removeClass("d-none") : t.addClass("d-none"),
            t.click(function(t) {
                return $("#page-nav a.section-link").removeClass("active")
            })
        })
    })
}
.call(this),
function() {
    $(document).on("data.loaded", function(t, e) {
        var n, o, a, r, s, l, i, c, u, d, p;
        return i = $(".js-community-map-panel"),
        l = $(".js-community-map"),
        r = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        p = i.width() - r.left - r.right,
        o = (i.width() - r.top - r.bottom) / 1.75,
        n = e.commEvents.filter(function(t) {
            return t.lat && t.lon
        }),
        a = function(t) {
            var e;
            return e = "",
            t.city && (e += t.city),
            t.city && t.state && (e += ", " + t.state),
            (e + " " + t.country).trim()
        }
        ,
        s = d3.nest().key(function(t) {
            return t.lat + ":" + t.lon
        }).rollup(function(t) {
            return {
                lat: parseFloat(t[0].lat),
                lon: parseFloat(t[0].lon),
                place: a(t[0]),
                events: t.map(function(t) {
                    return t.type.toLowerCase()
                })
            }
        }).entries(n),
        u = d3.geo.equirectangular().precision(.1),
        d = d3.tip().attr("class", "d3-tip community").offset([-10, 0]).html(function(t) {
            var e;
            return e = "<h3>" + t.values.place + "</h3>",
            e + " <span>" + t.values.events.join(", ") + "</span>"
        }),
        c = d3.geo.path().projection(u),
        d3.json("vendors/world-wo-a-110m.json", function(t, e) {
            var n, a, r, l, m, h;
            return null  != t ? console.log(t) : (r = topojson.feature(e, e.objects.land),
            a = topojson.mesh(e, e.objects.countries, function(t, e) {
                return t !== e
            }),
            u.scale(1).translate([0, 0]),
            n = c.bounds(r),
            l = 1 / Math.max((n[1][0] - n[0][0]) / p, (n[1][1] - n[0][1]) / o),
            m = [(p - l * (n[1][0] + n[0][0])) / 2, (o - l * (n[1][1] + n[0][1])) / 2],
            u.scale(l).translate(m),
            i.find("svg").remove(),
            h = d3.select(".js-community-map").append("svg").attr("id", "community-map map-graphic").attr("width", p).attr("height", o).call(d),
            h.insert("path").datum(r).attr("class", "land").attr("d", c),
            h.insert("path").datum(a).attr("class", "borders").attr("d", c),
            h.selectAll("circle").data(s).enter().append("circle").attr("class", function(t) {
                return t.values.events.join(" ") + " community-event"
            }).attr("r", 3.5).attr("id", function(t) {
                return t.name
            }).on("mouseover", function(t) {
                return d3.select(this).transition().duration(200).attr("r", 5),
                d.show(t)
            }).on("mouseout", function(t) {
                return d3.select(this).transition().duration(200).attr("r", 3.5),
                d.hide(t)
            }).each(function(t) {
                var e, n, o;
                return o = u([t.values.lon, t.values.lat]),
                e = o[0],
                n = o[1],
                d3.select(this).attr("cx", e).attr("cy", n)
            }))
        })
    })
}
.call(this),
function() {
    $.when($.ajax("vendors/totals.csv"), $.ajax("vendors/community-events.csv")).then(function(t, e) {
        var n, o, a, r, s, l;
        return l = d3.csv.parse(t[0]),
        n = d3.csv.parse(e[0]),
        a = ["#703293", "#9452A0", "#A3A3D1", "#6082C1", "#70C8E4", "#10ABD7", "#8ED4D9"],
        o = d3.scale.ordinal().range(a).domain(a.length),
        r = {
            total_pushes: "pushes",
            total_pull_requests: "pulls",
            pull_request_created: "pulls",
            total_comments: "comments",
            comments: "comments",
            total_issues: "issues",
            issues_created: "issues",
            gists: "gists",
            follows: "follows",
            watches: "watches",
            pushes: "pushes"
        },
        s = function() {
            return $(document).trigger("data.loaded", {
                commEvents: n
            })
        }
        ,
        s(),
        $(window).on("resize", s)
    })
}
.call(this);
