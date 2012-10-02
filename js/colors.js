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

var colors = [];
var numColors;

function getColors() {
    var data = getURLParameter("colors");
    var list = data.split('|');
    
    for (i = 0; i < list.length; i++) {
	colors.push('#' + list[i]);
    }
    
    numColors = colors.length;
}


// from www.netlobo.com/url_query_string_javascript.html

function getURLParameter(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp( regexS );
    
    var results = regex.exec( window.location.href );
    
    if (results == null) {
	return "";
    } else {
	return results[1];          
    }
}


function getRandomColor() {
    r = Math.floor( Math.random() * numColors );
    color = colors[r];
    
    return color;
}


// from www.javascripter.net/faq/hextorgb.htm

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
