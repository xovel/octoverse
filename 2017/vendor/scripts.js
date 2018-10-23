// LEAFLET MAP
var maps = [];
var leafletMaps = [];
var smallScreen = ($(window).width() > 550) ? true : false;

$('.Map').each(function(){
	maps.push($(this).attr('id'));
});

for (var i = 0; i < maps.length; i++) {
	leafletMaps[i] = new L.map(maps[i], {
		minZoom: 2,
		zoomControl: false,
		attributionControl: false,
		dragging: smallScreen,
		scrollWheelZoom: false
	}).setView([10.736175,70.312500], 3);

	if (smallScreen) {
		L.control.zoom({
		     position:'bottomright'
		}).addTo(leafletMaps[i]);
	}

	L.tileLayer('https://api.mapbox.com/styles/v1/brandonrosage/cj7uzoet62m512snvqwewl28s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJhbmRvbnJvc2FnZSIsImEiOiJBN1ZxRWZNIn0.PSpmBQp8BFSsTv5qC89T0Q', {
		subdomains: 'abcd',
		maxZoom: 19
	}).addTo(leafletMaps[i]);
}

// Add Geojson to map
function addDataToMap(id, data, color, colorFeatures) {
	var mapIndex = maps.indexOf(id);
	var markers = [];

	dataLayer = new L.geoJson(data, {
		style: function(feature) {
			var featureColor = color == "multiple" ? feature.properties.fillColor : color;

			return {
				color: "#ffffff",
				opacity: 0.2,
				weight: 1,
				fillColor: featureColor,
				fillOpacity: 1
			};
		},
		onEachFeature: function(feature, layer){
			var featureNum = feature.properties.bignum ? "<div class='Map-popup-num position-absolute f00 h'>"+feature.properties.bignum+"</div>" : "",
					featureDescription = feature.properties.description ? "<span class='d-block text-uppercase text-normal'>"+feature.properties.description+"</span>" : "";

			layer.bindPopup("<div class='Map-popup position-relative'> \
													<div class='Map-popup-circle position-relative d-flex flex-column flex-justify-center text-gray-dark text-center rounded-2 p-4'> \
														<strong class='d-block f4 h text-normal lh-condensed'>"+feature.properties.label+"</strong> \
														" + featureDescription + " \
													</div> \
													" + featureNum + " \
												</div>", {
													offset: [0,50]
												});
			markers.push(layer);
  	},
		pointToLayer: function (feature, latlng) {
    	return L.circleMarker(latlng, {
				radius: 8
			});
  	}
	});

	if (!leafletMaps[mapIndex].hasLayer(dataLayer)) {
		leafletMaps[mapIndex].fitBounds(dataLayer.getBounds(), {
			duration: 0,
			easeLinearity: 0
		}).addLayer(dataLayer);

		if (markers[0].feature.properties.popupPosition) {
			markers[0].openPopup(markers[0].feature.properties.popupPosition);
		}
	}
}

// CLONE NAV FOR STICKINESS
$('.Nav').clone().addClass('Nav--sticky py-2 pl-5 ml-5').appendTo('.Header-container');


// Show/hide sticky nav
var waypointStickyNav = new Waypoint.Inview({
  element: $('#body')[0],
	entered: function(direction) {
		$('.Nav--sticky').fadeOut(300);
	},
	exit: function(direction) {
		if (window.innerWidth > 770) {
			$('.Nav--sticky').fadeIn(300);
		}
	}
});

// Change masthead logo size when .Hero enters/exits
$.each(['Logo-waypoint'], function(i, classname) {
	var $elements = $('.' + classname)

	$elements.each(function() {
		new Waypoint.Inview({
			element: this,
			entered: function(direction) {
				$('.Universe-header').removeClass('Universe-header--compact');
			},
			exit: function(direction) {
				$('.Universe-header').addClass('Universe-header--compact');
		  },
			group: classname
		})
	})
});

// Listening for which Nav section is in view
$.each(['Nav-waypoint'], function(i, classname) {
	var $elements = $('.' + classname)

	$elements.each(function() {
		new Waypoint.Inview({
			element: this,
			enter: function(direction) {
				$('.Nav li').removeClass('active');
				$('.Nav-'+this.element.id).addClass('active');
			},
			group: classname
		})
	})
});

// Listening for which Map is coming into view
$.each(['Map'], function(i, classname) {
	var $elements = $('.' + classname);

	$elements.each(function() {
		new Waypoint({
			element: this,
			handler: function(direction) {
				var elementId = this.element.id,
						color = $(this.element).data('color');

				$.getJSON('vendor/' + $(this.element).data('geojson') + '.geojson', function(data) {
					addDataToMap(elementId, data, color);
				});
			},
			offset: function(){
				return $(window).height() * 1.5;
			},
			group: classname
		})
	})
});

// Listening for which Map is coming into view
$.each(['Chart'], function(i, classname) {
	var $elements = $('.' + classname);

	$elements.each(function() {
		new Waypoint.Inview({
			element: this,
			enter: function(direction) {
				$(this.element).addClass('visible');
			},
			exited: function(direction) {
				$(this.element).removeClass('visible');
			},
			group: classname
		})
	})
});

var chartDeveloperProgram = new Chart(document.getElementById("chartDeveloperProgram").getContext('2d'), {
	type: 'line',
	data: {
		labels: ['Sep 2016', 'December', 'March', 'June', 'Sep 2017'],
		datasets: [{
			data: [14783, 15622, 16624, 21521, 25348],
			borderColor: '#EF4E7B',
			borderWidth: 2,
			fill: false,
			pointRadius: 0
		}]
	},
	options: {
		responsive: true,
		events: [],
		title:{
			display:false,
			text:'GitHub Developer Program memberships'
		},
		legend: false,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Year'
				},
				gridLines: {
					display: false
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Memberships'
				}
			}]
		}
	}
});

var chartIntegrationsGrowth = new Chart(document.getElementById("chartIntegrationsGrowth").getContext('2d'), {
	type: 'line',
	data: {
		labels: ["Sep 2016", "December", "March", "June", "Sep 2017"],
		datasets: [{
			data: [76, 285, 615, 1139, 1897],
			borderColor: '#A166AB',
			borderWidth: 2,
			fill: false,
			pointRadius: 0
		}]
	},
	options: {
		responsive: true,
		events: [],
		title:{
			display:false,
			text:'GitHub Developer Program memberships'
		},
		legend: false,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Year'
				},
				gridLines: {
					display: false
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Memberships'
				}
			}]
		}
	}
});

var chartClassroomSignups = new Chart(document.getElementById("chartClassroomSignups").getContext('2d'), {
	type: 'line',
	data: {
		labels: ["Jan 2017", "February", "March", "April", "May", "June", "July", "August", "September"],
		datasets: [{
			data: [45123, 40866, 36374, 44349, 35535, 28814, 35997, 37320, 47453],
			borderColor: '#5073B8',
			borderWidth: 2,
			fill: false,
			pointRadius: 0
		}]
	},
	options: {
		responsive: true,
		events: [],
		title:{
			display:false,
			text:'GitHub Developer Program memberships'
		},
		legend: false,
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Year'
				},
				gridLines: {
					display: false
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: false,
					labelString: 'Memberships'
				}
			}]
		}
	}
});

var chartOpenSourceSurveyIdentify = new Chart(document.getElementById("chartOpenSourceSurvey-identify").getContext('2d'), {
	type: 'pie',
	data: {
		labels: ["48%", "28%", "22%", "3%"],
		datasets: [{
			data: [48, 28, 22, 3],
			backgroundColor: ["#07b39b", "#6ad1c3", "#9ce1d7", "#cdf0eb"],
			borderWidth: 0
		}]
	},
	options: {
		responsive: true,
		cutoutPercentage: 60,
		rotation: 0.6 * Math.PI,
		events: [],
		title:{
			display:false,
			text:'How would you describe your level of programming experience?'
		},
		legend: false
	}
});

var chartOpenSourceSurveyExperience = new Chart(document.getElementById("chartOpenSourceSurvey-experience").getContext('2d'), {
	type: 'pie',
	data: {
		labels: ["45%", "45%", "10%"],
		datasets: [{
			data: [45, 45, 10],
			backgroundColor: ["#6fba82", "#a9d6b4", "#c5e3cd"],
			borderWidth: 0
		}]
	},
	options: {
		responsive: true,
		cutoutPercentage: 60,
		rotation: 0.8 * Math.PI,
		events: [],
		title:{
			display:false,
			text:'Which is closest to how you would describe yourself?'
		},
		legend: false
	}
});

Chart.defaults.global.defaultFontColor = "#959DA5";
Chart.defaults.global.defaultFontSize = 14;

// Parallax
var rellax = new Rellax('.rellax', {
    center: true
  });
