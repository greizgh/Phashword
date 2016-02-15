/*
 * Copyright 2014-2016 Greizgh
 *
 * This file is part of Phashword.
 *
 * Phashword is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Phashword is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Phashword.  If not, see <http://www.gnu.org/licenses/>.
 */

var data = require("sdk/self").data;

var prompt = require("sdk/panel").Panel({
    contentURL: data.url("prompt.html"),
    contentScriptFile: data.url('prompt.js'),
    contentStyleFile: data.url("stylesheets/prompt.css"),
    onHide: handleHide,
    width: 300,
    height: 30
});

prompt.on("show", function() {
    prompt.port.emit("show");
});

function handleHide() {
    prompt.port.emit("hide");
}

exports.prompt = prompt;
