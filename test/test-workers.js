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

var workers = require("../lib/workers");
var manager = workers.manager;

// Mock content worker
function WorkerMock(url, id) {
  this.url = url;
  this.tab = {
    id: id
  };
  this.port = {
    emit: function(event, data) {}
  };
}

exports['test worker addition/removal'] = function(assert) {
  var worker = new WorkerMock('https://www.mozilla.org', 1);
  manager.addWorker(worker);
  assert.ok(manager.getWorkers().mozilla[0] === worker, "Worker manager should handle worker addition");
  manager.removeWorker(worker);
  assert.ok(manager.getWorkers().mozilla === undefined, "Worker manager should handle worker removal");
};

require("sdk/test").run(exports);
