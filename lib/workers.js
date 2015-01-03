/*
 * Copyright 2014,2015 Greizgh
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
var tabs = require("sdk/tabs");

var manager = new backend.ProfileManager();
var workerManager = new WorkerManager();

function WorkerManager() {
  this.workers = {};
  this.delayedUpdate = {};
}

WorkerManager.prototype.addWorker = function(worker) {
  var site = utils.grepUrl(worker.url);
  if (this.workers[site]) {
    this.workers[site].push(worker);
  } else {
    this.workers[site] = [worker];
  }
};

WorkerManager.prototype._delayWorkerUpdate = function(worker) {
  var site = utils.grepUrl(worker.url);
  if (this.delayedUpdate[site]) {
    this.delayedUpdate[site].push(worker);
  } else {
    this.delayedUpdate[site] = [worker];
  }
};

WorkerManager.prototype.updateDelayedWorkers = function(site=false) {
  if (site) {
    if (this.delayedUpdate[site]) {
      let delayed = this.delayedUpdate[site];
      delete this.delayedUpdate[site];
      delayed.forEach(this._updateWorker);
    }
  } else {
    let delayed = this.delayedUpdate;
    this.delayedUpdate = {};
    for (let worker_site in delayed) {
      delayed[worker_site].forEach(this._updateWorker);
    }
  }
};

WorkerManager.prototype.removeWorker = function(worker) {
  var site = utils.grepUrl(worker.url);
  if (this.workers[site]) {
    var index = this.workers[site].indexOf(worker);
    if (index != -1) {
      this.workers[site].splice(index, 1);
    }
    if (this.workers[site].length === 0) {
      delete this.workers[site];
    }
  }
};

WorkerManager.prototype._updateWorker = function(worker) {
  var site_settings = manager.getSiteSettings(utils.grepUrl(worker.url));
  var data = {
    site_settings: site_settings,
    profile: manager.getProfile(site_settings.profile_index)
  };
  try {
    worker.port.emit("update_profile", data);
  } catch(e) {
    // Worker's page is not visible anymore
    // Place worker in sync queue to update it later
    workerManager._delayWorkerUpdate(worker);
  }
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

tabs.on('pageshow', function(tab, persisted) {
  workerManager.updateDelayedWorkers(utils.grepUrl(tab.url));
});

exports.manager = workerManager;
