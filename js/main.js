/*
Copyright 2012, Michael Pacchioli.
 
This file is part of Optical Schemes.

Optical Schemes is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 3,
as published by the Free Software Foundation.

Optical Schemes is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Optical Schemes.  If not, see <http://www.gnu.org/licenses/>.
*/

var apiURL = 'http://www.colourlovers.com/api/palettes';

var art = [
    {title: 'Liquid Particles', url: '/liquid-particles/liquid-particles.html'},
    {title: 'Ball Pool', url: '/ball-pool/ball-pool.html'},
    {title: 'Bubbles', url: '/bubbles/bubbles.html'},
    {title: 'CoolClock', url: '/coolclock/coolclock.html', webkitOnly: true},
    {title: 'js-fireworks', url: '/js-fireworks/js-fireworks.html', text: true, webkitOnly: true},
    {title: 'Starfield', url: '/starfield/starfield.html'},
    {title: 'Starfield with flux', url: '/starfield-flux/starfield-flux.html'},
    {title: '3D Landscape', url: '/3d-landscape/3d-landscape.html', webkitOnly: true},
    {title: 'Canvascape', url: '/canvascape/canvascape.html'},
    {title: 'Same Game', url: '/same/same.html'},
];


$(document).ready(function() {

    if (!$.browser.webkit) {
        $('#browser-modal').modal('show');
    }


    $('#form1').submit(function() {
	keywords = $('#keywords').val();
	getPalettes(keywords);
	
	return false;
    });

});


// modified from colourlovers.rainbowgelati.com/fatline/js/colourlovers.js

function getPalettes(keywords) {
    $.getJSON(
	"http://www.colourlovers.com/api/palettes/top?jsonCallback=?",
	{
	    keywords: keywords,
	    orderCol: "numVotes",
	    sortBy: "desc"
	},
	function(palettes) { generateMenu(palettes); }
    );
}


function generateMenu(palettes) { 
    if ($('.palette')) { $('.palette').remove(); }
    
    $('#results').show();
    
    $.each(palettes, function(i, palette) {
	var paletteDIV = $('<div class="palette"></div>');
	var stripesDIV = $('<div class="stripes"></div>');
	var artListDIV = $('<div class="art-list"></div>');
        
	title =
	    '<b>' + palette.title + '</b>'
	    + ' by <a target="_blank" href="' + palette.url + '">' + palette.userName + '</a>'
	;
	    
	paletteDIV.append(title);	
	
	$.each(palette.colors, function(i, color) {
	    stripesDIV.append(
		$("<div>&nbsp;</div>").css("background", "#" + color)
	    );
        });

	paletteDIV.append(stripesDIV);
	
	var artList = '';
	var paramString = '';
	
	$.each(art, function(i, data) {
	    if (!$.browser.webkit && data.webkitOnly) { return; }

	    // console.log(data);
	    paramString = '?colors=';

	    $.each(palette.colors, function(j, color) {
		paramString += color + '|';
	    });
	    
	    paramString = paramString.slice(0, -1);
            // console.log(paramString);
	    
	    if (data.text) {
	     	paramString += "&text=" + escape(palette.title);
	    }
	    
	    artListDIV.append('<div class="art-title"><a target="_blank" href="' + data.url + paramString + '">(' + data.title + ')</a></div>');
	});
	
	artListDIV.append('<div class="clear"></div>');
	
	paletteDIV.append(artListDIV);
	
	$('#palettes').append(paletteDIV);
    });   
}

