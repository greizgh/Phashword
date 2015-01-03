/*
 * Copyright 2014 Greizgh
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

var utils = require("utils");
var backend = require("backend");

var manager = new backend.ProfileManager();

function WorkerManager() {
  this.workers = {};
  this.tabs = {};
}

WorkerManager.prototype.addWorker = function(worker) {
  var site = utils.grepUrl(worker.url);
  if (this.workers[site]) {
    this.workers[site].push(worker);
  } else {
    this.workers[site] = [worker];
  }
  if (this.tabs[worker.tab.id]) {
    this.removeWorker(this.tabs[worker.tab.id]);
    delete this.tabs[worker.tab.id];
  }
  this.tabs[worker.tab.id] = worker;
};

WorkerManager.prototype.removeWorker = function(worker) {
  var site = utils.grepUrl(worker.url);
  if (this.workers[site]) {
    var index = this.workers[site].indexOf(worker);
    if (index != -1) {
      this.workers[site].splice(index, 1);
    }
  }
};

WorkerManager.prototype._updateWorker = function(worker) {
  var site_settings = manager.getSiteSettings(utils.grepUrl(worker.url));
  var data = {
    site_settings: site_settings,
    profile: manager.getProfile(site_settings.profile_index)
  };
  worker.port.emit("update_profile", data);
};

WorkerManager.prototype.updateWorkers = function(site=false) {
  if (site) {
    if (this.workers[site]) {
      this.workers[site].forEach(this._updateWorker);
    }
  } else {
    for (let worker_site in this.workers) {
      this.workers[worker_site].forEach(this._updateWorker);
    }
  }
};

WorkerManager.prototype.getWorkers = function() {
  return this.workers;
};

exports.WorkerManager = WorkerManager;
