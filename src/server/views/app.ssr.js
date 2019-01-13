module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "d80fddfc9f316d7a800b";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app.ssr";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/client/components/App.js":
/*!**************************************!*\
  !*** ./src/client/components/App.js ***!
  \**************************************/
/*! exports provided: default, pages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader/root */ "react-hot-loader/root");
/* harmony import */ var react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loadable */ "react-loadable");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../store */ "./src/client/store/index.js");
/* harmony import */ var components_Routes_AppRoutes_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Routes/AppRoutes.js */ "./src/client/components/Routes/AppRoutes.js");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../pages */ "./src/client/pages/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pages", function() { return _pages__WEBPACK_IMPORTED_MODULE_7__["default"]; });

(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();










if (true) {
  __webpack_require__(/*! source-map-support */ "source-map-support").install();
}

var Router =  false ? undefined : react_router_dom__WEBPACK_IMPORTED_MODULE_4__["StaticRouter"];

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Routes_AppRoutes_js__WEBPACK_IMPORTED_MODULE_6__["default"], null);

var App = function App(props) {
  var initialData = props.initialData ? props.initialData : window.__INITIAL_DATA__;
  var store = Object(_store__WEBPACK_IMPORTED_MODULE_5__["createStore"])(initialData);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(daria_store__WEBPACK_IMPORTED_MODULE_3__["Provider"], store, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Router, {
    location: props.location,
    context: {}
  }, _ref));
};

var _default = Object(react_hot_loader_root__WEBPACK_IMPORTED_MODULE_1__["hot"])(App);

/* harmony default export */ __webpack_exports__["default"] = (_default);

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Router, "Router", "C:\\websites\\PopNetwork\\src\\client\\components\\App.js");
  reactHotLoader.register(App, "App", "C:\\websites\\PopNetwork\\src\\client\\components\\App.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\App.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Auth/LoginForm/LoginForm.js":
/*!***********************************************************!*\
  !*** ./src/client/components/Auth/LoginForm/LoginForm.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var informed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! informed */ "informed");
/* harmony import */ var informed__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(informed__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();





var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
  className: "label",
  htmlFor: "login-username"
}, "Username:");

var _ref2 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(informed__WEBPACK_IMPORTED_MODULE_1__["Text"], {
  className: "input",
  type: "text",
  field: "username",
  id: "login-username"
});

var _ref3 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
  className: "label",
  htmlFor: "login-password"
}, "Password:");

var _ref4 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(informed__WEBPACK_IMPORTED_MODULE_1__["Text"], {
  className: "input",
  field: "password",
  type: "password",
  id: "login-password"
});

var _ref5 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
  className: "input",
  type: "submit"
}, "Login");

var LoginForm = function LoginForm() {
  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_2__["useStore"])(),
      login = _useStore.login;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(informed__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    id: "intro-form",
    onSubmit: login
  }, _ref, _ref2, _ref3, _ref4, _ref5);
};

var _default = LoginForm;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LoginForm, "LoginForm", "C:\\websites\\PopNetwork\\src\\client\\components\\Auth\\LoginForm\\LoginForm.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Auth\\LoginForm\\LoginForm.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Routes/AppRoutes.js":
/*!***************************************************!*\
  !*** ./src/client/components/Routes/AppRoutes.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "core-js/modules/es6.object.assign");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "core-js/modules/es6.function.name");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../pages */ "./src/client/pages/index.js");
/* harmony import */ var components_Routes_LoggedOutRoute_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/Routes/LoggedOutRoute.js */ "./src/client/components/Routes/LoggedOutRoute.js");
/* harmony import */ var components_Routes_PrivateRoute_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/Routes/PrivateRoute.js */ "./src/client/components/Routes/PrivateRoute.js");



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var AppRoutes = function AppRoutes() {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Switch"], null, _pages__WEBPACK_IMPORTED_MODULE_4__["default"].map(function (Page) {
    var cfg = Page.pageConfig;
    var Route = cfg.authLevel === 'private' ? components_Routes_PrivateRoute_js__WEBPACK_IMPORTED_MODULE_6__["default"] : components_Routes_LoggedOutRoute_js__WEBPACK_IMPORTED_MODULE_5__["default"];
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Route, _extends({}, cfg, {
      component: Page,
      key: cfg.name
    }));
  }));
};

var _default = AppRoutes;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AppRoutes, "AppRoutes", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\AppRoutes.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\AppRoutes.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Routes/LoggedOutRoute.js":
/*!********************************************************!*\
  !*** ./src/client/components/Routes/LoggedOutRoute.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "core-js/modules/es6.object.assign");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var _Prefetcher_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Prefetcher.js */ "./src/client/components/Routes/Prefetcher.js");





(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var LoggedOutRoute = function LoggedOutRoute(_ref) {
  var component = _ref.component,
      rest = _objectWithoutProperties(_ref, ["component"]);

  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_6__["useStore"])(mapStateToProps),
      authenticated = _useStore.authenticated;

  var _ref2 =
  /*#__PURE__*/
  react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Prefetcher_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
    component: component
  });

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Route"], _extends({}, rest, {
    render: function render(props) {
      return !authenticated ? _ref2 : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Redirect"], {
        to: {
          pathname: '/dashboard',
          state: {
            from: props.location
          }
        }
      });
    }
  }));
};

function mapStateToProps(store) {
  return {
    authenticated: store.authenticated
  };
}

var _default = LoggedOutRoute;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LoggedOutRoute, "LoggedOutRoute", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Routes/Prefetcher.js":
/*!****************************************************!*\
  !*** ./src/client/components/Routes/Prefetcher.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ "core-js/modules/es7.symbol.async-iterator");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "core-js/modules/es6.symbol");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.regexp.match */ "core-js/modules/es6.regexp.match");
/* harmony import */ var core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_match__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "core-js/modules/es6.function.name");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_11__);










(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }



 // @TODO need to think about another implementation...unneeded re-renders and clunky utilisation...could probably make a usePrefetch custom hook

var _ref4 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", null, "Loading page data...");

var Prefetcher = function Prefetcher(_ref) {
  var Component = _ref.component,
      props = _objectWithoutProperties(_ref, ["component"]);

  var store = Object(daria_store__WEBPACK_IMPORTED_MODULE_10__["useStore"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_9__["useState"])(( false && false) === true),
      _useState2 = _slicedToArray(_useState, 2),
      fetching = _useState2[0],
      setFetching = _useState2[1];

  console.log("".concat(Component.pageConfig.name, " | FETCHING : ").concat(fetching, ", NEED PREFETCH :").concat(store.needPrefetch)); // useEffect doesnt support useEffect(async() => {...}, [])

  var fetchData =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return store['prefetch' + Component.pageConfig.name](props.match.params);

            case 2:
              setFetching(false);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function fetchData() {
      return _ref2.apply(this, arguments);
    };
  }();

  var enablePrefetch =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return store.setState({
                needPrefetch: true
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function enablePrefetch() {
      return _ref3.apply(this, arguments);
    };
  }();

  Object(react__WEBPACK_IMPORTED_MODULE_9__["useEffect"])(function () {
    if (store.needPrefetch) {
      fetchData();
    } else {
      enablePrefetch();
    }
  }, []);
  return fetching ? _ref4 : react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Component, null);
};

var _default = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_11__["withRouter"])(Prefetcher);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Prefetcher, "Prefetcher", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\Prefetcher.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\Prefetcher.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Routes/PrivateRoute.js":
/*!******************************************************!*\
  !*** ./src/client/components/Routes/PrivateRoute.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "core-js/modules/es6.object.assign");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var _Prefetcher_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Prefetcher.js */ "./src/client/components/Routes/Prefetcher.js");





(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var LoggedOutRoute = function LoggedOutRoute(_ref) {
  var component = _ref.component,
      rest = _objectWithoutProperties(_ref, ["component"]);

  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_6__["useStore"])(mapStateToProps),
      authenticated = _useStore.authenticated;

  var _ref2 =
  /*#__PURE__*/
  react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Prefetcher_js__WEBPACK_IMPORTED_MODULE_7__["default"], {
    component: component
  });

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Route"], _extends({}, rest, {
    render: function render(props) {
      return authenticated ? _ref2 : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["Redirect"], {
        to: {
          pathname: '/',
          state: {
            from: props.location
          }
        }
      });
    }
  }));
};

function mapStateToProps(store) {
  return {
    authenticated: store.authenticated
  };
}

var _default = LoggedOutRoute;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(LoggedOutRoute, "LoggedOutRoute", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\PrivateRoute.js");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\PrivateRoute.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Routes\\PrivateRoute.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Store/Provider.js":
/*!*************************************************!*\
  !*** ./src/client/components/Store/Provider.js ***!
  \*************************************************/
/*! exports provided: StoreContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreContext", function() { return StoreContext; });
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ "core-js/modules/es7.symbol.async-iterator");
/* harmony import */ var core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.symbol */ "core-js/modules/es6.symbol");
/* harmony import */ var core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_symbol__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es7_object_entries__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es7.object.entries */ "core-js/modules/es7.object.entries");
/* harmony import */ var core_js_modules_es7_object_entries__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es7_object_entries__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);









(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// store/UserProvider.js

var StoreContext = Object(react__WEBPACK_IMPORTED_MODULE_8__["createContext"])({}); // We need a reference to the state outside of the component to access it with hetState() otherwise we get the un-memoized verison of the state which is an empty object.

var _state;

var RenderPure = Object(react__WEBPACK_IMPORTED_MODULE_8__["memo"])(function (_ref) {
  var children = _ref.children;
  return children;
});

var makeStore = function makeStore(props, setState) {
  var stateUpdateFns = Object.entries(props).filter(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        value = _ref3[1];

    return typeof value === 'function';
  }).reduce(function (acc, _ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        value = _ref5[1];

    return _objectSpread({}, acc, _defineProperty({}, key, _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var newState,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('%cstore.' + key, 'color: blue');
              _context.next = 3;
              return value.apply(void 0, _args)(_state);

            case 3:
              newState = _context.sent;
              _state = _objectSpread({}, _state, newState);
              console.log('%cstore.' + key + ' finished', 'color: blue');
              return _context.abrupt("return", setState(_state));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }))));
  }, {});

  if (!_state) {
    _state = _objectSpread({}, props, stateUpdateFns);
  }

  return _state;
};

var Provider = function Provider(_ref7) {
  var children = _ref7.children,
      props = _objectWithoutProperties(_ref7, ["children"]);

  var _setState = function _setState() {
    return setState.apply(void 0, arguments);
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_8__["useState"])(makeStore(props, _setState)),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(StoreContext.Provider, {
    value: state
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(RenderPure, null, children));
};

var _default = Provider;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(StoreContext, "StoreContext", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(_state, "_state", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(RenderPure, "RenderPure", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(makeStore, "makeStore", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(Provider, "Provider", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Store/Subscribe.js":
/*!**************************************************!*\
  !*** ./src/client/components/Store/Subscribe.js ***!
  \**************************************************/
/*! exports provided: default, useStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStore", function() { return useStore; });
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "core-js/modules/es6.object.assign");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! hoist-non-react-statics */ "hoist-non-react-statics");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Provider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Provider.js */ "./src/client/components/Store/Provider.js");





(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var subscribe = function subscribe(mapStoreToProps) {
  return function (Wrapped) {
    var Subscribe = function Subscribe(props) {
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Provider_js__WEBPACK_IMPORTED_MODULE_6__["StoreContext"].Consumer, null, function (store) {
        // console.log(store);
        var mapped = mapStoreToProps && typeof mapStoreToProps === 'function' ? _objectSpread({}, mapStoreToProps(store), {
          setState: store.setstate
        }) : store;
        return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Wrapped, _extends({}, mapped, props));
      });
    };

    hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_5___default()(Subscribe, Wrapped);
    return Subscribe;
  };
};

var _default = subscribe;
/* harmony default export */ __webpack_exports__["default"] = (_default);

function useStore(mapStoreToProps) {
  var store = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_Provider_js__WEBPACK_IMPORTED_MODULE_6__["StoreContext"]);
  var mappedStore = mapStoreToProps && typeof mapStoreToProps === 'function' ? _objectSpread({}, mapStoreToProps(store), {
    setState: store.setstate
  }) : store;
  return mappedStore;
}


;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(subscribe, "subscribe", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Subscribe.js");
  reactHotLoader.register(useStore, "useStore", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Subscribe.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\components\\Store\\Subscribe.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/components/Store/index.js":
/*!**********************************************!*\
  !*** ./src/client/components/Store/index.js ***!
  \**********************************************/
/*! exports provided: Provider, StoreContext, subscribe, useStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Provider.js */ "./src/client/components/Store/Provider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return _Provider_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StoreContext", function() { return _Provider_js__WEBPACK_IMPORTED_MODULE_0__["StoreContext"]; });

/* harmony import */ var _Subscribe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscribe.js */ "./src/client/components/Store/Subscribe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return _Subscribe_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useStore", function() { return _Subscribe_js__WEBPACK_IMPORTED_MODULE_1__["useStore"]; });





/***/ }),

/***/ "./src/client/pages/Dashboard/Dashboard.js":
/*!*************************************************!*\
  !*** ./src/client/pages/Dashboard/Dashboard.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();





function mapStateToProps(store) {
  return {
    logout: store.logout,
    getCurrentUser: store.getCurrentUser,
    currentUser: store.currentUser
  };
}

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading user data...");

var Dashboard = function Dashboard() {
  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_2__["useStore"])(mapStateToProps),
      logout = _useStore.logout,
      currentUser = _useStore.currentUser;

  var profileUrl = "/profile/".concat(currentUser.id);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, !currentUser ? _ref : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Hello, ", currentUser.username, " !"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
    to: profileUrl
  }, "Your Profile"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      return logout();
    }
  }, "logout"));
};

Dashboard.pageConfig = {
  name: 'Dashboard',
  path: '/dashboard',
  exact: true,
  authLevel: 'private'
};
var _default = Dashboard;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\websites\\PopNetwork\\src\\client\\pages\\Dashboard\\Dashboard.js");
  reactHotLoader.register(Dashboard, "Dashboard", "C:\\websites\\PopNetwork\\src\\client\\pages\\Dashboard\\Dashboard.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\pages\\Dashboard\\Dashboard.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/pages/Home/Home.js":
/*!***************************************!*\
  !*** ./src/client/pages/Home/Home.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var components_Auth_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Auth/LoginForm/LoginForm */ "./src/client/components/Auth/LoginForm/LoginForm.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ "./src/client/resources/utils/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();






function mapStateToProps(store) {
  return {
    authenticated: store.authenticated
  };
}

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Auth_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__["default"], null);

var Home = function Home() {
  var state = Object(daria_store__WEBPACK_IMPORTED_MODULE_1__["useStore"])(mapStateToProps);
  return _ref;
};

Home.getInitialState = function () {};

Home.pageConfig = {
  name: 'Home',
  path: '/',
  exact: true,
  authLevel: 'public'
};
var _default = Home;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\websites\\PopNetwork\\src\\client\\pages\\Home\\Home.js");
  reactHotLoader.register(Home, "Home", "C:\\websites\\PopNetwork\\src\\client\\pages\\Home\\Home.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\pages\\Home\\Home.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/pages/Profile/Profile.js":
/*!*********************************************!*\
  !*** ./src/client/pages/Profile/Profile.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();




function mapStateToProps(store) {
  return {
    logout: store.logout,
    getProfile: store.getProfile,
    profile: store.profile,
    isOwnProfile: store.isOwnProfile
  };
}

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Loading Profile...");

var Profile = function Profile() {
  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_1__["useStore"])(mapStateToProps),
      logout = _useStore.logout,
      profile = _useStore.profile;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, !profile ? _ref : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, JSON.stringify(profile), " !"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: function onClick() {
      return logout();
    }
  }, "logout"));
};

Profile.pageConfig = {
  name: 'Profile',
  path: '/profile/:id',
  exact: true,
  authLevel: 'private'
};
var _default = Profile;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "C:\\websites\\PopNetwork\\src\\client\\pages\\Profile\\Profile.js");
  reactHotLoader.register(Profile, "Profile", "C:\\websites\\PopNetwork\\src\\client\\pages\\Profile\\Profile.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\pages\\Profile\\Profile.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/pages/index.js":
/*!***********************************!*\
  !*** ./src/client/pages/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Home_Home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home/Home.js */ "./src/client/pages/Home/Home.js");
/* harmony import */ var _Dashboard_Dashboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard/Dashboard.js */ "./src/client/pages/Dashboard/Dashboard.js");
/* harmony import */ var _Profile_Profile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Profile/Profile.js */ "./src/client/pages/Profile/Profile.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();




var pages = [_Home_Home_js__WEBPACK_IMPORTED_MODULE_0__["default"], _Dashboard_Dashboard_js__WEBPACK_IMPORTED_MODULE_1__["default"], _Profile_Profile_js__WEBPACK_IMPORTED_MODULE_2__["default"]];
var _default = pages;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(pages, "pages", "C:\\websites\\PopNetwork\\src\\client\\pages\\index.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\pages\\index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/resources/models/UserModel.js":
/*!**************************************************!*\
  !*** ./src/client/resources/models/UserModel.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "core-js/modules/es6.object.assign");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var services_RESTService_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! services/RESTService.js */ "./src/client/resources/services/RESTService.js");







(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var UserModel =
/*#__PURE__*/
function () {
  function UserModel(modelDef) {
    _classCallCheck(this, UserModel);

    Object.assign(this, _objectSpread({}, modelDef));
  }

  _createClass(UserModel, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return services_RESTService_js__WEBPACK_IMPORTED_MODULE_6__["default"].get("/users/".concat(this.id));

              case 2:
                data = _context.sent;
                Object.assign(this, _objectSpread({}, data));
                return _context.abrupt("return", this);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getSelf",
    value: function () {
      var _getSelf = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return services_RESTService_js__WEBPACK_IMPORTED_MODULE_6__["default"].get("/users/self");

              case 2:
                data = _context2.sent;
                Object.assign(this, _objectSpread({}, data));
                return _context2.abrupt("return", this);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSelf() {
        return _getSelf.apply(this, arguments);
      }

      return getSelf;
    }()
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return UserModel;
}();

var _default = UserModel;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserModel, "UserModel", "C:\\websites\\PopNetwork\\src\\client\\resources\\models\\UserModel.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\resources\\models\\UserModel.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/resources/services/AuthService.js":
/*!******************************************************!*\
  !*** ./src/client/resources/services/AuthService.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! constants */ "constants");
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(constants__WEBPACK_IMPORTED_MODULE_2__);



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var AUTH_URL = constants__WEBPACK_IMPORTED_MODULE_2___default.a.AUTH_URL;

var AuthService =
/*#__PURE__*/
function () {
  function AuthService() {
    _classCallCheck(this, AuthService);
  }

  _createClass(AuthService, null, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(body) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(AUTH_URL + '/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                });

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.text();

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }() //@TODO should probably do more than this lol

  }, {
    key: "logout",
    value: function () {
      var _logout = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(AUTH_URL + '/logout');

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }]);

  return AuthService;
}();

var _default = AuthService;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AUTH_URL, "AUTH_URL", "C:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  reactHotLoader.register(AuthService, "AuthService", "C:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/resources/services/RESTService.js":
/*!******************************************************!*\
  !*** ./src/client/resources/services/RESTService.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var wretch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wretch */ "wretch");
/* harmony import */ var wretch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(wretch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var wretch_middlewares__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wretch-middlewares */ "wretch-middlewares");
/* harmony import */ var wretch_middlewares__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(wretch_middlewares__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! constants */ "constants");
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(constants__WEBPACK_IMPORTED_MODULE_4__);



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var _w = wretch__WEBPACK_IMPORTED_MODULE_2___default()(constants__WEBPACK_IMPORTED_MODULE_4___default.a.API_URL).middlewares([Object(wretch_middlewares__WEBPACK_IMPORTED_MODULE_3__["dedupe"])()]).options({
  credentials: 'include',
  mode: 'cors'
}).resolve(function (resolver) {
  return resolver.notFound(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(error, req) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(error); // TODO

              return _context.abrupt("return", {
                error: 404
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()).unauthorized(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(error, req) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(error); // TODO
              // throw new Error(error);

              return _context2.abrupt("return", {
                error: 401
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()).internalError(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(error, req) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(error);
              return _context3.abrupt("return", {
                error: 500
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()).json(function (json) {
    return json;
  });
});

var _default = {
  w: function w() {
    return _w;
  },
  get: function get(url, params) {
    return _w.url(url).query(params).get();
  },
  post: function post(url, body) {
    return _w.url(url).json(body).post();
  },
  put: function put(url, body) {
    return _w.url(url).json(body).put();
  },
  delete: function _delete(url) {
    return _w.url(url).delete();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_w, "w", "C:\\websites\\PopNetwork\\src\\client\\resources\\services\\RESTService.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\resources\\services\\RESTService.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/resources/utils/index.js":
/*!*********************************************!*\
  !*** ./src/client/resources/utils/index.js ***!
  \*********************************************/
/*! exports provided: noop, LocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noop.js */ "./src/client/resources/utils/noop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _localStorage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./localStorage.js */ "./src/client/resources/utils/localStorage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalStorage", function() { return _localStorage_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./src/client/resources/utils/localStorage.js":
/*!****************************************************!*\
  !*** ./src/client/resources/utils/localStorage.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function get(key) {
  var item = localStorage.getItem(key);

  try {
    var json = JSON.parse(item);
    return json;
  } catch (e) {
    return item;
  }
}

function set(key, data) {
  try {
    var json = JSON.stringify(item);
    localStorage.setItem(key, json);
  } catch (e) {
    localStorage.setItem(key, data);
  }
}

function remove(key) {
  localStorage.removeItem(key);
}

var _default = {
  get: get,
  set: set,
  remove: remove
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(get, "get", "C:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  reactHotLoader.register(set, "set", "C:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  reactHotLoader.register(remove, "remove", "C:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/resources/utils/noop.js":
/*!********************************************!*\
  !*** ./src/client/resources/utils/noop.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return noop; });
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function noop() {
  return void 0;
}
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(noop, "noop", "C:\\websites\\PopNetwork\\src\\client\\resources\\utils\\noop.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/store/auth.js":
/*!**********************************!*\
  !*** ./src/client/store/auth.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var resources_services_AuthService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! resources/services/AuthService */ "./src/client/resources/services/AuthService.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ "./src/client/resources/utils/index.js");



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var _default = {
  authenticated: false,
  login: function login(values) {
    return (
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(state) {
          var id;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return resources_services_AuthService__WEBPACK_IMPORTED_MODULE_2__["default"].login(values);

                case 3:
                  id = _context.sent;
                  utils__WEBPACK_IMPORTED_MODULE_3__["LocalStorage"].set('uid', id);
                  return _context.abrupt("return", {
                    authenticated: true
                  });

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", {
                    authenticated: false
                  });

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 8]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()
    );
  },
  logout: function logout(values) {
    return (
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(state) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return resources_services_AuthService__WEBPACK_IMPORTED_MODULE_2__["default"].logout(values);

                case 2:
                  return _context2.abrupt("return", {
                    authenticated: false,
                    currentUser: undefined
                  });

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }()
    );
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\store\\auth.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/store/index.js":
/*!***********************************!*\
  !*** ./src/client/store/index.js ***!
  \***********************************/
/*! exports provided: default, createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return createStore; });
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "core-js/modules/web.dom.iterable");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "core-js/modules/es6.array.iterator");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "core-js/modules/es6.object.keys");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.js */ "./src/client/store/auth.js");
/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.js */ "./src/client/store/user.js");
/* harmony import */ var _prefetchers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./prefetchers.js */ "./src/client/store/prefetchers.js");




(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var store = _objectSpread({}, _auth_js__WEBPACK_IMPORTED_MODULE_3__["default"], _user_js__WEBPACK_IMPORTED_MODULE_4__["default"], _prefetchers_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
  // @FIXME this should be created in the Provider component but it has some weird bugs
  setState: function setState(newState) {
    return function (state) {
      return _objectSpread({}, newState);
    };
  }
});

var createStore = function createStore(initialStore) {
  return _objectSpread({}, store, initialStore);
};

var _default = store;
/* harmony default export */ __webpack_exports__["default"] = (_default);

;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(store, "store", "C:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  reactHotLoader.register(createStore, "createStore", "C:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/store/prefetchers.js":
/*!*****************************************!*\
  !*** ./src/client/store/prefetchers.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var models_UserModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/UserModel */ "./src/client/resources/models/UserModel.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ "./src/client/resources/utils/index.js");



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var _default = {
  prefetchHome: function prefetchHome() {
    return function (state) {
      return state;
    };
  },
  prefetchDashboard: function prefetchDashboard() {
    return (
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(state) {
          var currentUser;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  currentUser = new models_UserModel__WEBPACK_IMPORTED_MODULE_2__["default"]();
                  _context.prev = 1;
                  _context.next = 4;
                  return currentUser.getSelf();

                case 4:
                  return _context.abrupt("return", {
                    currentUser: currentUser
                  });

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](1);
                  console.log(_context.t0);
                  return _context.abrupt("return", {
                    currentUserError: _context.t0
                  });

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 7]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()
    );
  },
  prefetchProfile: function prefetchProfile(_ref2) {
    var id = _ref2.id;
    return (
      /*#__PURE__*/
      function () {
        var _ref3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(state) {
          var user;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  user = new models_UserModel__WEBPACK_IMPORTED_MODULE_2__["default"]({
                    id: id
                  });
                  _context2.prev = 1;
                  _context2.next = 4;
                  return user.get();

                case 4:
                  return _context2.abrupt("return", {
                    profile: user,
                    isOwnProfile: id == utils__WEBPACK_IMPORTED_MODULE_3__["LocalStorage"].get('uid')
                  });

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](1);
                  console.log(_context2.t0);
                  return _context2.abrupt("return", {
                    profileError: _context2.t0
                  });

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this, [[1, 7]]);
        }));

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }()
    );
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\store\\prefetchers.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/client/store/user.js":
/*!**********************************!*\
  !*** ./src/client/store/user.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var models_UserModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! models/UserModel */ "./src/client/resources/models/UserModel.js");



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var _default = {
  getCurrentUser: function getCurrentUser() {
    return (
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(state) {
          var currentUser;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  currentUser = new models_UserModel__WEBPACK_IMPORTED_MODULE_2__["default"]();
                  _context.prev = 1;
                  _context.next = 4;
                  return currentUser.getSelf();

                case 4:
                  return _context.abrupt("return", {
                    currentUser: currentUser
                  });

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](1);
                  console.log(_context.t0);
                  return _context.abrupt("return", {
                    currentUserError: _context.t0
                  });

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 7]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()
    );
  }
};
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(_default, "default", "C:\\websites\\PopNetwork\\src\\client\\store\\user.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ 0:
/*!********************************************!*\
  !*** multi ./src/client/components/App.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\websites\PopNetwork\src\client\components\App.js */"./src/client/components/App.js");


/***/ }),

/***/ "constants":
/*!****************************!*\
  !*** external "constants" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),

/***/ "core-js/modules/es6.array.iterator":
/*!*****************************************************!*\
  !*** external "core-js/modules/es6.array.iterator" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.array.iterator");

/***/ }),

/***/ "core-js/modules/es6.function.name":
/*!****************************************************!*\
  !*** external "core-js/modules/es6.function.name" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.function.name");

/***/ }),

/***/ "core-js/modules/es6.object.assign":
/*!****************************************************!*\
  !*** external "core-js/modules/es6.object.assign" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.object.assign");

/***/ }),

/***/ "core-js/modules/es6.object.keys":
/*!**************************************************!*\
  !*** external "core-js/modules/es6.object.keys" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.object.keys");

/***/ }),

/***/ "core-js/modules/es6.promise":
/*!**********************************************!*\
  !*** external "core-js/modules/es6.promise" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.promise");

/***/ }),

/***/ "core-js/modules/es6.regexp.match":
/*!***************************************************!*\
  !*** external "core-js/modules/es6.regexp.match" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.regexp.match");

/***/ }),

/***/ "core-js/modules/es6.symbol":
/*!*********************************************!*\
  !*** external "core-js/modules/es6.symbol" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es6.symbol");

/***/ }),

/***/ "core-js/modules/es7.object.entries":
/*!*****************************************************!*\
  !*** external "core-js/modules/es7.object.entries" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es7.object.entries");

/***/ }),

/***/ "core-js/modules/es7.symbol.async-iterator":
/*!************************************************************!*\
  !*** external "core-js/modules/es7.symbol.async-iterator" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/es7.symbol.async-iterator");

/***/ }),

/***/ "core-js/modules/web.dom.iterable":
/*!***************************************************!*\
  !*** external "core-js/modules/web.dom.iterable" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/modules/web.dom.iterable");

/***/ }),

/***/ "hoist-non-react-statics":
/*!******************************************!*\
  !*** external "hoist-non-react-statics" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),

/***/ "informed":
/*!***************************!*\
  !*** external "informed" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("informed");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-hot-loader":
/*!***********************************!*\
  !*** external "react-hot-loader" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),

/***/ "react-hot-loader/root":
/*!****************************************!*\
  !*** external "react-hot-loader/root" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader/root");

/***/ }),

/***/ "react-loadable":
/*!*********************************!*\
  !*** external "react-loadable" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-loadable");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime/runtime");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),

/***/ "wretch":
/*!*************************!*\
  !*** external "wretch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("wretch");

/***/ }),

/***/ "wretch-middlewares":
/*!*************************************!*\
  !*** external "wretch-middlewares" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("wretch-middlewares");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZWZhdWx0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RlZmF1bHQvKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0uanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9Sb3V0ZXMvQXBwUm91dGVzLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvUm91dGVzL0xvZ2dlZE91dFJvdXRlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvUm91dGVzL1ByZWZldGNoZXIuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9Sb3V0ZXMvUHJpdmF0ZVJvdXRlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvU3RvcmUvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9TdG9yZS9TdWJzY3JpYmUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9TdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9wYWdlcy9EYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3BhZ2VzL0hvbWUvSG9tZS5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9wYWdlcy9Qcm9maWxlL1Byb2ZpbGUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcmVzb3VyY2VzL21vZGVscy9Vc2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcmVzb3VyY2VzL3NlcnZpY2VzL0F1dGhTZXJ2aWNlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3Jlc291cmNlcy9zZXJ2aWNlcy9SRVNUU2VydmljZS5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9yZXNvdXJjZXMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcmVzb3VyY2VzL3V0aWxzL2xvY2FsU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9yZXNvdXJjZXMvdXRpbHMvbm9vcC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9zdG9yZS9hdXRoLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3N0b3JlL3ByZWZldGNoZXJzLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3N0b3JlL3VzZXIuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ25cIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5c1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2VcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNi5yZWdleHAubWF0Y2hcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2xcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllc1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvclwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJob2lzdC1ub24tcmVhY3Qtc3RhdGljc1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJpbmZvcm1lZFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdC1ob3QtbG9hZGVyXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlYWN0LWhvdC1sb2FkZXIvcm9vdFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdC1sb2FkYWJsZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJzb3VyY2UtbWFwLXN1cHBvcnRcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwid3JldGNoXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcIndyZXRjaC1taWRkbGV3YXJlc1wiIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJpbnN0YWxsIiwiUm91dGVyIiwiX19JU19CUk9XU0VSX18iLCJCcm93c2VyUm91dGVyIiwiU3RhdGljUm91dGVyIiwiQXBwIiwicHJvcHMiLCJpbml0aWFsRGF0YSIsIndpbmRvdyIsIl9fSU5JVElBTF9EQVRBX18iLCJzdG9yZSIsImNyZWF0ZVN0b3JlIiwibG9jYXRpb24iLCJob3QiLCJMb2dpbkZvcm0iLCJ1c2VTdG9yZSIsImxvZ2luIiwiQXBwUm91dGVzIiwicGFnZXMiLCJtYXAiLCJQYWdlIiwiY2ZnIiwicGFnZUNvbmZpZyIsIlJvdXRlIiwiYXV0aExldmVsIiwiUHJpdmF0ZVJvdXRlIiwiTG9nZ2VkT3V0Um91dGUiLCJuYW1lIiwiY29tcG9uZW50IiwicmVzdCIsIm1hcFN0YXRlVG9Qcm9wcyIsImF1dGhlbnRpY2F0ZWQiLCJwYXRobmFtZSIsInN0YXRlIiwiZnJvbSIsIlByZWZldGNoZXIiLCJDb21wb25lbnQiLCJ1c2VTdGF0ZSIsImZldGNoaW5nIiwic2V0RmV0Y2hpbmciLCJjb25zb2xlIiwibG9nIiwibmVlZFByZWZldGNoIiwiZmV0Y2hEYXRhIiwibWF0Y2giLCJwYXJhbXMiLCJlbmFibGVQcmVmZXRjaCIsInNldFN0YXRlIiwidXNlRWZmZWN0Iiwid2l0aFJvdXRlciIsIlN0b3JlQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJfc3RhdGUiLCJSZW5kZXJQdXJlIiwibWVtbyIsImNoaWxkcmVuIiwibWFrZVN0b3JlIiwic3RhdGVVcGRhdGVGbnMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidmFsdWUiLCJyZWR1Y2UiLCJhY2MiLCJuZXdTdGF0ZSIsIlByb3ZpZGVyIiwiX3NldFN0YXRlIiwic3Vic2NyaWJlIiwibWFwU3RvcmVUb1Byb3BzIiwiV3JhcHBlZCIsIlN1YnNjcmliZSIsIm1hcHBlZCIsInNldHN0YXRlIiwiaG9pc3ROb25SZWFjdFN0YXRpYyIsInVzZUNvbnRleHQiLCJtYXBwZWRTdG9yZSIsImxvZ291dCIsImdldEN1cnJlbnRVc2VyIiwiY3VycmVudFVzZXIiLCJEYXNoYm9hcmQiLCJwcm9maWxlVXJsIiwiaWQiLCJ1c2VybmFtZSIsInBhdGgiLCJleGFjdCIsIkhvbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJnZXRQcm9maWxlIiwicHJvZmlsZSIsImlzT3duUHJvZmlsZSIsIlByb2ZpbGUiLCJKU09OIiwic3RyaW5naWZ5IiwiVXNlck1vZGVsIiwibW9kZWxEZWYiLCJhc3NpZ24iLCJBUEkiLCJnZXQiLCJkYXRhIiwiQVVUSF9VUkwiLCJjb25zdGFudHMiLCJBdXRoU2VydmljZSIsImJvZHkiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJyZXNwb25zZSIsInRleHQiLCJ3Iiwid3JldGNoIiwiQVBJX1VSTCIsIm1pZGRsZXdhcmVzIiwiZGVkdXBlIiwib3B0aW9ucyIsImNyZWRlbnRpYWxzIiwibW9kZSIsInJlc29sdmUiLCJyZXNvbHZlciIsIm5vdEZvdW5kIiwiZXJyb3IiLCJyZXEiLCJ1bmF1dGhvcml6ZWQiLCJpbnRlcm5hbEVycm9yIiwianNvbiIsInVybCIsInF1ZXJ5IiwicG9zdCIsInB1dCIsImRlbGV0ZSIsIml0ZW0iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicGFyc2UiLCJlIiwic2V0Iiwic2V0SXRlbSIsInJlbW92ZSIsInJlbW92ZUl0ZW0iLCJub29wIiwidmFsdWVzIiwiTG9jYWxTdG9yYWdlIiwidW5kZWZpbmVkIiwiYXV0aCIsInVzZXIiLCJwcmVmZXRjaGVycyIsImluaXRpYWxTdG9yZSIsInByZWZldGNoSG9tZSIsInByZWZldGNoRGFzaGJvYXJkIiwiVXNlciIsImdldFNlbGYiLCJjdXJyZW50VXNlckVycm9yIiwicHJlZmV0Y2hQcm9maWxlIiwicHJvZmlsZUVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUE2QjtBQUM3QixxQ0FBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBa0IsOEJBQThCO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBYyw0QkFBNEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUJBQWUsNEJBQTRCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsdUNBQXVDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsZ0JBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFjLHdDQUF3QztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBc0MsdUJBQXVCOzs7QUFHN0Q7QUFDQTs7Ozs7Ozs7Ozs7O0FDNXVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLElBQUosRUFBcUI7QUFDakJBLHFCQUFPLENBQUMsOENBQUQsQ0FBUCxDQUE4QkMsT0FBOUI7QUFDSDs7QUFFRCxJQUFNQyxNQUFNLEdBQUdDLE1BQWMsR0FBR0MsU0FBSCxHQUFtQkMsNkRBQWhEOzs7O0FBV2dCLDJEQUFDLHNFQUFELE87O0FBVGhCLElBQU1DLEdBQUcsR0FBRyxTQUFOQSxHQUFNLENBQUFDLEtBQUssRUFBSTtBQUNqQixNQUFNQyxXQUFXLEdBQUdELEtBQUssQ0FBQ0MsV0FBTixHQUNkRCxLQUFLLENBQUNDLFdBRFEsR0FFZEMsTUFBTSxDQUFDQyxnQkFGYjtBQUdBLE1BQU1DLEtBQUssR0FBR0MsMERBQVcsQ0FBQ0osV0FBRCxDQUF6QjtBQUVBLFNBQ0ksMkRBQUMsb0RBQUQsRUFBY0csS0FBZCxFQUNJLDJEQUFDLE1BQUQ7QUFBUSxZQUFRLEVBQUVKLEtBQUssQ0FBQ00sUUFBeEI7QUFBa0MsV0FBTyxFQUFFO0FBQTNDLFVBREosQ0FESjtBQU9ILENBYkQ7O2VBY2VDLGlFQUFHLENBQUNSLEdBQUQsQzs7QUFBSDtBQUVmOzs7Ozs7Ozs7Ozs7MEJBbEJNSixNOzBCQUVBSSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmTjtBQUNBO0FBQ0E7Ozs7QUFNWTtBQUFPLFdBQVMsRUFBQyxPQUFqQjtBQUF5QixTQUFPLEVBQUM7QUFBakMsZTs7OztBQUdBLDJEQUFDLDZDQUFEO0FBQ0ksV0FBUyxFQUFDLE9BRGQ7QUFFSSxNQUFJLEVBQUMsTUFGVDtBQUdJLE9BQUssRUFBQyxVQUhWO0FBSUksSUFBRSxFQUFDO0FBSlAsRTs7OztBQU1BO0FBQU8sV0FBUyxFQUFDLE9BQWpCO0FBQXlCLFNBQU8sRUFBQztBQUFqQyxlOzs7O0FBR0EsMkRBQUMsNkNBQUQ7QUFDSSxXQUFTLEVBQUMsT0FEZDtBQUVJLE9BQUssRUFBQyxVQUZWO0FBR0ksTUFBSSxFQUFDLFVBSFQ7QUFJSSxJQUFFLEVBQUM7QUFKUCxFOzs7O0FBTUE7QUFBUSxXQUFTLEVBQUMsT0FBbEI7QUFBMEIsTUFBSSxFQUFDO0FBQS9CLFc7O0FBdEJaLElBQU1TLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFBQSxrQkFDRkMsNERBQVEsRUFETjtBQUFBLE1BQ1pDLEtBRFksYUFDWkEsS0FEWTs7QUFFcEIsU0FDSSwyREFBQyw2Q0FBRDtBQUFNLE1BQUUsRUFBQyxZQUFUO0FBQXNCLFlBQVEsRUFBRUE7QUFBaEMsc0NBREo7QUF5QkgsQ0EzQkQ7O2VBNkJlRixTO0FBQUE7Ozs7Ozs7Ozs7OzswQkE3QlRBLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSk47QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNRyxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLFNBQ2QsMkRBQUMsdURBQUQsUUFDS0MsOENBQUssQ0FBQ0MsR0FBTixDQUFVLFVBQUFDLElBQUksRUFBSTtBQUNmLFFBQU1DLEdBQUcsR0FBR0QsSUFBSSxDQUFDRSxVQUFqQjtBQUNBLFFBQU1DLEtBQUssR0FDUEYsR0FBRyxDQUFDRyxTQUFKLEtBQWtCLFNBQWxCLEdBQThCQyx5RUFBOUIsR0FBNkNDLDJFQURqRDtBQUVBLFdBQU8sMkRBQUMsS0FBRCxlQUFXTCxHQUFYO0FBQWdCLGVBQVMsRUFBRUQsSUFBM0I7QUFBaUMsU0FBRyxFQUFFQyxHQUFHLENBQUNNO0FBQTFDLE9BQVA7QUFDSCxHQUxBLENBREwsQ0FEYztBQUFBLENBQWxCOztlQVdlVixTO0FBQUE7Ozs7Ozs7Ozs7OzswQkFYVEEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNUyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLE9BQTRCO0FBQUEsTUFBekJFLFNBQXlCLFFBQXpCQSxTQUF5QjtBQUFBLE1BQVhDLElBQVc7O0FBQUEsa0JBQ3JCZCw0REFBUSxDQUFDZSxlQUFELENBRGE7QUFBQSxNQUN2Q0MsYUFEdUMsYUFDdkNBLGFBRHVDOztBQUFBO0FBQUE7QUFPL0IsNkRBQUMsc0RBQUQ7QUFBWSxhQUFTLEVBQUVIO0FBQXZCLElBUCtCOztBQUUvQyxTQUNJLDJEQUFDLHNEQUFELGVBQ1FDLElBRFI7QUFFSSxVQUFNLEVBQUUsZ0JBQUF2QixLQUFLO0FBQUEsYUFDVCxDQUFDeUIsYUFBRCxXQUdJLDJEQUFDLHlEQUFEO0FBQ0ksVUFBRSxFQUFFO0FBQ0FDLGtCQUFRLEVBQUUsWUFEVjtBQUVBQyxlQUFLLEVBQUU7QUFBRUMsZ0JBQUksRUFBRTVCLEtBQUssQ0FBQ007QUFBZDtBQUZQO0FBRFIsUUFKSztBQUFBO0FBRmpCLEtBREo7QUFpQkgsQ0FuQkQ7O0FBcUJBLFNBQVNrQixlQUFULENBQXlCcEIsS0FBekIsRUFBZ0M7QUFDNUIsU0FBTztBQUNIcUIsaUJBQWEsRUFBRXJCLEtBQUssQ0FBQ3FCO0FBRGxCLEdBQVA7QUFHSDs7ZUFFY0wsYztBQUFBOzs7Ozs7Ozs7Ozs7MEJBM0JUQSxjOzBCQXFCR0ksZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQlQ7QUFDQTtDQUdBOzs7O0FBNkJzQiwrRjs7QUE1QnRCLElBQU1LLFVBQVUsR0FBRyxTQUFiQSxVQUFhLE9BQXdDO0FBQUEsTUFBMUJDLFNBQTBCLFFBQXJDUixTQUFxQztBQUFBLE1BQVp0QixLQUFZOztBQUN2RCxNQUFNSSxLQUFLLEdBQUdLLDZEQUFRLEVBQXRCOztBQUR1RCxrQkFFdkJzQixzREFBUSxDQUNwQyxDQUFDbkMsTUFBYyxJQUFJUSxLQUFuQixNQUEyQyxJQURQLENBRmU7QUFBQTtBQUFBLE1BRWhENEIsUUFGZ0Q7QUFBQSxNQUV0Q0MsV0FGc0M7O0FBS3ZEQyxTQUFPLENBQUNDLEdBQVIsV0FFUUwsU0FBUyxDQUFDZCxVQUFWLENBQXFCSyxJQUY3QiwyQkFHcUJXLFFBSHJCLDhCQUdpRDVCLEtBQUssQ0FBQ2dDLFlBSHZELEdBTHVELENBVXZEOztBQUNBLE1BQU1DLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNSakMsS0FBSyxDQUFDLGFBQWEwQixTQUFTLENBQUNkLFVBQVYsQ0FBcUJLLElBQW5DLENBQUwsQ0FBOENyQixLQUFLLENBQUNzQyxLQUFOLENBQVlDLE1BQTFELENBRFE7O0FBQUE7QUFFZE4seUJBQVcsQ0FBQyxLQUFELENBQVg7O0FBRmM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBSDs7QUFBQSxvQkFBVEksU0FBUztBQUFBO0FBQUE7QUFBQSxLQUFmOztBQUtBLE1BQU1HLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNicEMsS0FBSyxDQUFDcUMsUUFBTixDQUFlO0FBQUVMLDRCQUFZLEVBQUU7QUFBaEIsZUFBZixDQURhOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUg7O0FBQUEsb0JBQWRJLGNBQWM7QUFBQTtBQUFBO0FBQUEsS0FBcEI7O0FBSUFFLHlEQUFTLENBQUMsWUFBTTtBQUNaLFFBQUl0QyxLQUFLLENBQUNnQyxZQUFWLEVBQXdCO0FBQ3BCQyxlQUFTO0FBQ1osS0FGRCxNQUVPO0FBQ0hHLG9CQUFjO0FBQ2pCO0FBQ0osR0FOUSxFQU1OLEVBTk0sQ0FBVDtBQVFBLFNBQU9SLFFBQVEsV0FBcUMsMkRBQUMsU0FBRCxPQUFwRDtBQUNILENBN0JEOztlQStCZVcsb0VBQVUsQ0FBQ2QsVUFBRCxDOztBQUFWOzs7Ozs7Ozs7Ozs7MEJBL0JUQSxVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1ULGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FBNEI7QUFBQSxNQUF6QkUsU0FBeUIsUUFBekJBLFNBQXlCO0FBQUEsTUFBWEMsSUFBVzs7QUFBQSxrQkFDckJkLDREQUFRLENBQUNlLGVBQUQsQ0FEYTtBQUFBLE1BQ3ZDQyxhQUR1QyxhQUN2Q0EsYUFEdUM7O0FBQUE7QUFBQTtBQU8vQiw2REFBQyxzREFBRDtBQUFZLGFBQVMsRUFBRUg7QUFBdkIsSUFQK0I7O0FBRS9DLFNBQ0ksMkRBQUMsc0RBQUQsZUFDUUMsSUFEUjtBQUVJLFVBQU0sRUFBRSxnQkFBQXZCLEtBQUs7QUFBQSxhQUNUeUIsYUFBYSxXQUdULDJEQUFDLHlEQUFEO0FBQ0ksVUFBRSxFQUFFO0FBQ0FDLGtCQUFRLEVBQUUsR0FEVjtBQUVBQyxlQUFLLEVBQUU7QUFBRUMsZ0JBQUksRUFBRTVCLEtBQUssQ0FBQ007QUFBZDtBQUZQO0FBRFIsUUFKSztBQUFBO0FBRmpCLEtBREo7QUFpQkgsQ0FuQkQ7O0FBcUJBLFNBQVNrQixlQUFULENBQXlCcEIsS0FBekIsRUFBZ0M7QUFDNUIsU0FBTztBQUNIcUIsaUJBQWEsRUFBRXJCLEtBQUssQ0FBQ3FCO0FBRGxCLEdBQVA7QUFHSDs7ZUFFY0wsYztBQUFBOzs7Ozs7Ozs7Ozs7MEJBM0JUQSxjOzBCQXFCR0ksZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCVDtBQUNBO0FBRU8sSUFBTW9CLFlBQVksR0FBR0MsMkRBQWEsQ0FBQyxFQUFELENBQWxDLEMsQ0FFUDs7QUFDQSxJQUFJQyxNQUFKOztBQUVBLElBQU1DLFVBQVUsR0FBR0Msa0RBQUksQ0FBQztBQUFBLE1BQUdDLFFBQUgsUUFBR0EsUUFBSDtBQUFBLFNBQWtCQSxRQUFsQjtBQUFBLENBQUQsQ0FBdkI7O0FBRUEsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ2xELEtBQUQsRUFBUXlDLFFBQVIsRUFBcUI7QUFDbkMsTUFBTVUsY0FBYyxHQUFHQyxNQUFNLENBQUNDLE9BQVAsQ0FBZXJELEtBQWYsRUFDbEJzRCxNQURrQixDQUNYLGlCQUFrQjtBQUFBO0FBQUEsUUFBaEJDLEdBQWdCO0FBQUEsUUFBWEMsS0FBVzs7QUFDdEIsV0FBTyxPQUFPQSxLQUFQLEtBQWlCLFVBQXhCO0FBQ0gsR0FIa0IsRUFJbEJDLE1BSmtCLENBS2YsVUFBQ0MsR0FBRDtBQUFBO0FBQUEsUUFBT0gsR0FBUDtBQUFBLFFBQVlDLEtBQVo7O0FBQUEsNkJBQ09FLEdBRFAsc0JBRUtILEdBRkw7QUFBQTtBQUFBLDRCQUVXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0hyQixxQkFBTyxDQUFDQyxHQUFSLENBQVksYUFBYW9CLEdBQXpCLEVBQThCLGFBQTlCO0FBREc7QUFBQSxxQkFFb0JDLEtBQUssTUFBTCxnQkFBZVYsTUFBZixDQUZwQjs7QUFBQTtBQUVHYSxzQkFGSDtBQUdIYixvQkFBTSxxQkFBUUEsTUFBUixFQUFtQmEsUUFBbkIsQ0FBTjtBQUNBekIscUJBQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQWFvQixHQUFiLEdBQW1CLFdBQS9CLEVBQTRDLGFBQTVDO0FBSkcsK0NBS0lkLFFBQVEsQ0FBQ0ssTUFBRCxDQUxaOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBRlg7QUFBQSxHQUxlLEVBZWYsRUFmZSxDQUF2Qjs7QUFrQkEsTUFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDVEEsVUFBTSxxQkFDQzlDLEtBREQsRUFFQ21ELGNBRkQsQ0FBTjtBQUlIOztBQUVELFNBQU9MLE1BQVA7QUFDSCxDQTNCRDs7QUE2QkEsSUFBTWMsUUFBUSxHQUFHLFNBQVhBLFFBQVcsUUFBNEI7QUFBQSxNQUF6QlgsUUFBeUIsU0FBekJBLFFBQXlCO0FBQUEsTUFBWmpELEtBQVk7O0FBQ3pDLE1BQU02RCxTQUFTLEdBQUcsU0FBWkEsU0FBWTtBQUFBLFdBQWFwQixRQUFRLE1BQVIsbUJBQWI7QUFBQSxHQUFsQjs7QUFEeUMsa0JBRWZWLHNEQUFRLENBQUNtQixTQUFTLENBQUNsRCxLQUFELEVBQVE2RCxTQUFSLENBQVYsQ0FGTztBQUFBO0FBQUEsTUFFbENsQyxLQUZrQztBQUFBLE1BRTNCYyxRQUYyQjs7QUFJekMsU0FDSSwyREFBQyxZQUFELENBQWMsUUFBZDtBQUF1QixTQUFLLEVBQUVkO0FBQTlCLEtBQ0ksMkRBQUMsVUFBRCxRQUFhc0IsUUFBYixDQURKLENBREo7QUFLSCxDQVREOztlQVdlVyxRO0FBQUE7Ozs7Ozs7Ozs7OzswQkEvQ0ZoQixZOzBCQUdURSxNOzBCQUVFQyxVOzBCQUVBRyxTOzBCQTZCQVUsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q047QUFDQTtBQUNBOztBQUVBLElBQU1FLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUFDLGVBQWU7QUFBQSxTQUFJLFVBQUFDLE9BQU8sRUFBSTtBQUM1QyxRQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFBakUsS0FBSztBQUFBLGFBQ25CLDJEQUFDLHlEQUFELENBQWMsUUFBZCxRQUNLLFVBQUFJLEtBQUssRUFBSTtBQUNOO0FBQ0EsWUFBTThELE1BQU0sR0FDUkgsZUFBZSxJQUFJLE9BQU9BLGVBQVAsS0FBMkIsVUFBOUMscUJBRVdBLGVBQWUsQ0FBQzNELEtBQUQsQ0FGMUI7QUFHVXFDLGtCQUFRLEVBQUVyQyxLQUFLLENBQUMrRDtBQUgxQixhQUtNL0QsS0FOVjtBQU9BLGVBQU8sMkRBQUMsT0FBRCxlQUFhOEQsTUFBYixFQUF5QmxFLEtBQXpCLEVBQVA7QUFDSCxPQVhMLENBRG1CO0FBQUEsS0FBdkI7O0FBZUFvRSxrRUFBbUIsQ0FBQ0gsU0FBRCxFQUFZRCxPQUFaLENBQW5CO0FBQ0EsV0FBT0MsU0FBUDtBQUNILEdBbEJnQztBQUFBLENBQWpDOztlQW9CZUgsUztBQUFBOztBQUVmLFNBQVNyRCxRQUFULENBQWtCc0QsZUFBbEIsRUFBbUM7QUFDL0IsTUFBTTNELEtBQUssR0FBR2lFLHdEQUFVLENBQUN6Qix5REFBRCxDQUF4QjtBQUNBLE1BQU0wQixXQUFXLEdBQ2JQLGVBQWUsSUFBSSxPQUFPQSxlQUFQLEtBQTJCLFVBQTlDLHFCQUVhQSxlQUFlLENBQUMzRCxLQUFELENBRjVCO0FBR1VxQyxZQUFRLEVBQUVyQyxLQUFLLENBQUMrRDtBQUgxQixPQUtNL0QsS0FOVjtBQU9BLFNBQU9rRSxXQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7OzswQkFsQ01SLFM7MEJBc0JHckQsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBOztBQUVBLFNBQVNlLGVBQVQsQ0FBeUJwQixLQUF6QixFQUFnQztBQUM1QixTQUFPO0FBQ0htRSxVQUFNLEVBQUVuRSxLQUFLLENBQUNtRSxNQURYO0FBRUhDLGtCQUFjLEVBQUVwRSxLQUFLLENBQUNvRSxjQUZuQjtBQUdIQyxlQUFXLEVBQUVyRSxLQUFLLENBQUNxRTtBQUhoQixHQUFQO0FBS0g7Ozs7QUFRZSw2Rjs7QUFOaEIsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksR0FBTTtBQUFBLGtCQUNZakUsNERBQVEsQ0FBQ2UsZUFBRCxDQURwQjtBQUFBLE1BQ1orQyxNQURZLGFBQ1pBLE1BRFk7QUFBQSxNQUNKRSxXQURJLGFBQ0pBLFdBREk7O0FBRXBCLE1BQU1FLFVBQVUsc0JBQWVGLFdBQVcsQ0FBQ0csRUFBM0IsQ0FBaEI7QUFDQSxTQUNJLHdIQUNLLENBQUNILFdBQUQsVUFHRyxpRkFBV0EsV0FBVyxDQUFDSSxRQUF2QixPQUpSLEVBTUksMkRBQUMscURBQUQ7QUFBTSxNQUFFLEVBQUVGO0FBQVYsb0JBTkosRUFPSTtBQUFRLFdBQU8sRUFBRTtBQUFBLGFBQU1KLE1BQU0sRUFBWjtBQUFBO0FBQWpCLGNBUEosQ0FESjtBQVdILENBZEQ7O0FBZ0JBRyxTQUFTLENBQUMxRCxVQUFWLEdBQXVCO0FBQ25CSyxNQUFJLEVBQUUsV0FEYTtBQUVuQnlELE1BQUksRUFBRSxZQUZhO0FBR25CQyxPQUFLLEVBQUUsSUFIWTtBQUluQjdELFdBQVMsRUFBRTtBQUpRLENBQXZCO2VBT2V3RCxTO0FBQUE7Ozs7Ozs7Ozs7OzswQkEvQk5sRCxlOzBCQVFIa0QsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWk47QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU2xELGVBQVQsQ0FBeUJwQixLQUF6QixFQUFnQztBQUM1QixTQUFPO0FBQ0hxQixpQkFBYSxFQUFFckIsS0FBSyxDQUFDcUI7QUFEbEIsR0FBUDtBQUdIOzs7O0FBSVUsMkRBQUMsMkVBQUQsTzs7QUFGWCxJQUFNdUQsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUNmLE1BQU1yRCxLQUFLLEdBQUdsQiw0REFBUSxDQUFDZSxlQUFELENBQXRCO0FBQ0E7QUFDSCxDQUhEOztBQUtBd0QsSUFBSSxDQUFDQyxlQUFMLEdBQXVCLFlBQU0sQ0FBRSxDQUEvQjs7QUFFQUQsSUFBSSxDQUFDaEUsVUFBTCxHQUFrQjtBQUNkSyxNQUFJLEVBQUUsTUFEUTtBQUVkeUQsTUFBSSxFQUFFLEdBRlE7QUFHZEMsT0FBSyxFQUFFLElBSE87QUFJZDdELFdBQVMsRUFBRTtBQUpHLENBQWxCO2VBT2U4RCxJO0FBQUE7Ozs7Ozs7Ozs7OzswQkFwQk54RCxlOzBCQU1Id0QsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hOO0FBQ0E7O0FBRUEsU0FBU3hELGVBQVQsQ0FBeUJwQixLQUF6QixFQUFnQztBQUM1QixTQUFPO0FBQ0htRSxVQUFNLEVBQUVuRSxLQUFLLENBQUNtRSxNQURYO0FBRUhXLGNBQVUsRUFBRTlFLEtBQUssQ0FBQzhFLFVBRmY7QUFHSEMsV0FBTyxFQUFFL0UsS0FBSyxDQUFDK0UsT0FIWjtBQUlIQyxnQkFBWSxFQUFFaEYsS0FBSyxDQUFDZ0Y7QUFKakIsR0FBUDtBQU1IOzs7O0FBUWUsMkY7O0FBTmhCLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQU07QUFBQSxrQkFDVTVFLDREQUFRLENBQUNlLGVBQUQsQ0FEbEI7QUFBQSxNQUNWK0MsTUFEVSxhQUNWQSxNQURVO0FBQUEsTUFDRlksT0FERSxhQUNGQSxPQURFOztBQUdsQixTQUNJLHdIQUNLLENBQUNBLE9BQUQsVUFHRyxzRUFBSUcsSUFBSSxDQUFDQyxTQUFMLENBQWVKLE9BQWYsQ0FBSixPQUpSLEVBTUk7QUFBUSxXQUFPLEVBQUU7QUFBQSxhQUFNWixNQUFNLEVBQVo7QUFBQTtBQUFqQixjQU5KLENBREo7QUFVSCxDQWJEOztBQWVBYyxPQUFPLENBQUNyRSxVQUFSLEdBQXFCO0FBQ2pCSyxNQUFJLEVBQUUsU0FEVztBQUVqQnlELE1BQUksRUFBRSxjQUZXO0FBR2pCQyxPQUFLLEVBQUUsSUFIVTtBQUlqQjdELFdBQVMsRUFBRTtBQUpNLENBQXJCO2VBT2VtRSxPO0FBQUE7Ozs7Ozs7Ozs7OzswQkEvQk43RCxlOzBCQVNINkQsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pOO0FBQ0E7QUFDQTtBQUVBLElBQU16RSxLQUFLLEdBQUcsQ0FBQ29FLHFEQUFELEVBQU9OLCtEQUFQLEVBQWtCVywyREFBbEIsQ0FBZDtlQUVlekUsSztBQUFBOzs7Ozs7Ozs7Ozs7MEJBRlRBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSk47O0lBRU00RSxTOzs7QUFDRixxQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUNsQnJDLFVBQU0sQ0FBQ3NDLE1BQVAsQ0FBYyxJQUFkLG9CQUF5QkQsUUFBekI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7dUJBR3NCRSwrREFBRyxDQUFDQyxHQUFKLGtCQUFrQixLQUFLaEIsRUFBdkIsRTs7O0FBQWJpQixvQjtBQUNOekMsc0JBQU0sQ0FBQ3NDLE1BQVAsQ0FBYyxJQUFkLG9CQUF5QkcsSUFBekI7aURBQ08sSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFJWUYsK0RBQUcsQ0FBQ0MsR0FBSixlOzs7QUFBYkMsb0I7QUFDTnpDLHNCQUFNLENBQUNzQyxNQUFQLENBQWMsSUFBZCxvQkFBeUJHLElBQXpCO2tEQUNPLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFJQUwsUztBQUFBOzs7Ozs7Ozs7Ozs7MEJBbEJUQSxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZOO0lBRVFNLFEsR0FBYUMsZ0QsQ0FBYkQsUTs7SUFFRkUsVzs7Ozs7Ozs7Ozs7OytDQUNpQkMsSTs7Ozs7Ozt1QkFDUUMsS0FBSyxDQUFDSixRQUFRLEdBQUcsUUFBWixFQUFzQjtBQUM5Q0ssd0JBQU0sRUFBRSxNQURzQztBQUU5Q0MseUJBQU8sRUFBRTtBQUNMLG9DQUFnQjtBQURYLG1CQUZxQztBQUs5Q0gsc0JBQUksRUFBRVgsSUFBSSxDQUFDQyxTQUFMLENBQWVVLElBQWY7QUFMd0MsaUJBQXRCLEM7OztBQUF0Qkksd0I7O3VCQVFPQSxRQUFRLENBQUNDLElBQVQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRWpCOzs7Ozs7Ozs7Ozs7O3VCQUVVSixLQUFLLENBQUNKLFFBQVEsR0FBRyxTQUFaLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUlKRSxXO0FBQUE7Ozs7Ozs7Ozs7OzswQkFwQlBGLFE7MEJBRUZFLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pOO0FBQ0E7QUFDQTs7QUFFQSxJQUFNTyxFQUFDLEdBQUdDLDZDQUFNLENBQUNULGdEQUFTLENBQUNVLE9BQVgsQ0FBTixDQUNMQyxXQURLLENBQ08sQ0FBQ0MsaUVBQU0sRUFBUCxDQURQLEVBRUxDLE9BRkssQ0FFRztBQUFFQyxhQUFXLEVBQUUsU0FBZjtBQUEwQkMsTUFBSSxFQUFFO0FBQWhDLENBRkgsRUFHTEMsT0FISyxDQUdHLFVBQUFDLFFBQVE7QUFBQSxTQUNiQSxRQUFRLENBQ0hDLFFBREw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUNjLGlCQUFPQyxLQUFQLEVBQWNDLEdBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNOakYscUJBQU8sQ0FBQ0MsR0FBUixDQUFZK0UsS0FBWixFQURNLENBRU47O0FBRk0sK0NBR0M7QUFBRUEscUJBQUssRUFBRTtBQUFULGVBSEQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FEZDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQU1LRSxZQU5MO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw0QkFNa0Isa0JBQU9GLEtBQVAsRUFBY0MsR0FBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1ZqRixxQkFBTyxDQUFDQyxHQUFSLENBQVkrRSxLQUFaLEVBRFUsQ0FFVjtBQUNBOztBQUhVLGdEQUlIO0FBQUVBLHFCQUFLLEVBQUU7QUFBVCxlQUpHOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTmxCOztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BWUtHLGFBWkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQVltQixrQkFBT0gsS0FBUCxFQUFjQyxHQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDWGpGLHFCQUFPLENBQUNDLEdBQVIsQ0FBWStFLEtBQVo7QUFEVyxnREFFSjtBQUFFQSxxQkFBSyxFQUFFO0FBQVQsZUFGSTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVpuQjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQWdCS0ksSUFoQkwsQ0FnQlUsVUFBQUEsSUFBSTtBQUFBLFdBQUlBLElBQUo7QUFBQSxHQWhCZCxDQURhO0FBQUEsQ0FIWCxDQUFWOztlQXVCZTtBQUNYZixHQUFDLEVBQUU7QUFBQSxXQUFNQSxFQUFOO0FBQUEsR0FEUTtBQUVYWCxLQUFHLEVBQUUsYUFBQzJCLEdBQUQsRUFBTWhGLE1BQU47QUFBQSxXQUNEZ0UsRUFBQyxDQUNJZ0IsR0FETCxDQUNTQSxHQURULEVBRUtDLEtBRkwsQ0FFV2pGLE1BRlgsRUFHS3FELEdBSEwsRUFEQztBQUFBLEdBRk07QUFPWDZCLE1BQUksRUFBRSxjQUFDRixHQUFELEVBQU10QixJQUFOLEVBQWU7QUFDakIsV0FBT00sRUFBQyxDQUNIZ0IsR0FERSxDQUNFQSxHQURGLEVBRUZELElBRkUsQ0FFR3JCLElBRkgsRUFHRndCLElBSEUsRUFBUDtBQUlILEdBWlU7QUFhWEMsS0FBRyxFQUFFLGFBQUNILEdBQUQsRUFBTXRCLElBQU47QUFBQSxXQUNETSxFQUFDLENBQ0lnQixHQURMLENBQ1NBLEdBRFQsRUFFS0QsSUFGTCxDQUVVckIsSUFGVixFQUdLeUIsR0FITCxFQURDO0FBQUEsR0FiTTtBQWtCWEMsUUFBTSxFQUFFLGlCQUFBSixHQUFHO0FBQUEsV0FBSWhCLEVBQUMsQ0FBQ2dCLEdBQUYsQ0FBTUEsR0FBTixFQUFXSSxNQUFYLEVBQUo7QUFBQTtBQWxCQSxDO0FBQUE7Ozs7Ozs7Ozs7OzswQkF2QlRwQixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREEsU0FBU1gsR0FBVCxDQUFhckMsR0FBYixFQUFrQjtBQUNkLE1BQU1xRSxJQUFJLEdBQUdDLFlBQVksQ0FBQ0MsT0FBYixDQUFxQnZFLEdBQXJCLENBQWI7O0FBQ0EsTUFBSTtBQUNBLFFBQU0rRCxJQUFJLEdBQUdoQyxJQUFJLENBQUN5QyxLQUFMLENBQVdILElBQVgsQ0FBYjtBQUNBLFdBQU9OLElBQVA7QUFDSCxHQUhELENBR0UsT0FBT1UsQ0FBUCxFQUFVO0FBQ1IsV0FBT0osSUFBUDtBQUNIO0FBQ0o7O0FBRUQsU0FBU0ssR0FBVCxDQUFhMUUsR0FBYixFQUFrQnNDLElBQWxCLEVBQXdCO0FBQ3BCLE1BQUk7QUFDQSxRQUFNeUIsSUFBSSxHQUFHaEMsSUFBSSxDQUFDQyxTQUFMLENBQWVxQyxJQUFmLENBQWI7QUFDQUMsZ0JBQVksQ0FBQ0ssT0FBYixDQUFxQjNFLEdBQXJCLEVBQTBCK0QsSUFBMUI7QUFDSCxHQUhELENBR0UsT0FBT1UsQ0FBUCxFQUFVO0FBQ1JILGdCQUFZLENBQUNLLE9BQWIsQ0FBcUIzRSxHQUFyQixFQUEwQnNDLElBQTFCO0FBQ0g7QUFDSjs7QUFFRCxTQUFTc0MsTUFBVCxDQUFnQjVFLEdBQWhCLEVBQXFCO0FBQ2pCc0UsY0FBWSxDQUFDTyxVQUFiLENBQXdCN0UsR0FBeEI7QUFDSDs7ZUFFYztBQUNYcUMsS0FBRyxFQUFIQSxHQURXO0FBRVhxQyxLQUFHLEVBQUhBLEdBRlc7QUFHWEUsUUFBTSxFQUFOQTtBQUhXLEM7QUFBQTs7Ozs7Ozs7Ozs7OzBCQXZCTnZDLEc7MEJBVUFxQyxHOzBCQVNBRSxNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CTSxTQUFTRSxJQUFULEdBQWdCO0FBQzNCLFNBQU8sS0FBSyxDQUFaO0FBQ0g7Ozs7Ozs7Ozs7OzswQkFGdUJBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBeEI7QUFDQTtlQUVlO0FBQ1g1RyxlQUFhLEVBQUUsS0FESjtBQUVYZixPQUFLLEVBQUUsZUFBQTRILE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0NBQUksaUJBQU0zRyxLQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFFUXFFLHNFQUFXLENBQUN0RixLQUFaLENBQWtCNEgsTUFBbEIsQ0FGUjs7QUFBQTtBQUVIMUQsb0JBRkc7QUFHVDJELG9FQUFZLENBQUNOLEdBQWIsQ0FBaUIsS0FBakIsRUFBd0JyRCxFQUF4QjtBQUhTLG1EQUlGO0FBQUVuRCxpQ0FBYSxFQUFFO0FBQWpCLG1CQUpFOztBQUFBO0FBQUE7QUFBQTtBQUFBLG1EQU1GO0FBQUVBLGlDQUFhLEVBQUU7QUFBakIsbUJBTkU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FGRjtBQVdYOEMsUUFBTSxFQUFFLGdCQUFBK0QsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQ0FBSSxrQkFBTTNHLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQ1JxRSxzRUFBVyxDQUFDekIsTUFBWixDQUFtQitELE1BQW5CLENBRFE7O0FBQUE7QUFBQSxvREFFUDtBQUFFN0csaUNBQWEsRUFBRSxLQUFqQjtBQUF3QmdELCtCQUFXLEVBQUUrRDtBQUFyQyxtQkFGTzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFKOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVhILEM7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSGY7QUFDQTtBQUNBOztBQUVBLElBQU1wSSxLQUFLLHFCQUNKcUksZ0RBREksRUFFSkMsZ0RBRkksRUFHSkMsdURBSEk7QUFJUDtBQUNBbEcsVUFBUSxFQUFFLGtCQUFBa0IsUUFBUTtBQUFBLFdBQUksVUFBQWhDLEtBQUs7QUFBQSwrQkFBVWdDLFFBQVY7QUFBQSxLQUFUO0FBQUE7QUFMWCxFQUFYOztBQVFBLElBQU10RCxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBdUksWUFBWTtBQUFBLDJCQUFVeEksS0FBVixFQUFvQndJLFlBQXBCO0FBQUEsQ0FBaEM7O2VBRWV4SSxLO0FBQUE7QUFFZjs7Ozs7Ozs7Ozs7OzBCQVpNQSxLOzBCQVFBQyxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pOO0FBQ0E7ZUFFZTtBQUNYd0ksY0FBWSxFQUFFO0FBQUEsV0FBTSxVQUFBbEgsS0FBSztBQUFBLGFBQUlBLEtBQUo7QUFBQSxLQUFYO0FBQUEsR0FESDtBQUVYbUgsbUJBQWlCLEVBQUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0NBQU0saUJBQU1uSCxLQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNmOEMsNkJBRGUsR0FDRCxJQUFJc0Usd0RBQUosRUFEQztBQUFBO0FBQUE7QUFBQSx5QkFHWHRFLFdBQVcsQ0FBQ3VFLE9BQVosRUFIVzs7QUFBQTtBQUFBLG1EQUlWO0FBQUV2RSwrQkFBVyxFQUFYQTtBQUFGLG1CQUpVOztBQUFBO0FBQUE7QUFBQTtBQU1qQnZDLHlCQUFPLENBQUNDLEdBQVI7QUFOaUIsbURBT1Y7QUFBRThHLG9DQUFnQjtBQUFsQixtQkFQVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFOOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUZSO0FBWVhDLGlCQUFlLEVBQUU7QUFBQSxRQUFHdEUsRUFBSCxTQUFHQSxFQUFIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdDQUFZLGtCQUFNakQsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDbkIrRyxzQkFEbUIsR0FDWixJQUFJSyx3REFBSixDQUFTO0FBQUVuRSxzQkFBRSxFQUFGQTtBQUFGLG1CQUFULENBRFk7QUFBQTtBQUFBO0FBQUEseUJBR2Y4RCxJQUFJLENBQUM5QyxHQUFMLEVBSGU7O0FBQUE7QUFBQSxvREFJZDtBQUNIVCwyQkFBTyxFQUFFdUQsSUFETjtBQUVIdEQsZ0NBQVksRUFBRVIsRUFBRSxJQUFJMkQsa0RBQVksQ0FBQzNDLEdBQWIsQ0FBaUIsS0FBakI7QUFGakIsbUJBSmM7O0FBQUE7QUFBQTtBQUFBO0FBU3JCMUQseUJBQU8sQ0FBQ0MsR0FBUjtBQVRxQixvREFVZDtBQUFFZ0gsZ0NBQVk7QUFBZCxtQkFWYzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVpOLEM7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSGY7ZUFFZTtBQUNYM0UsZ0JBQWMsRUFBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQ0FBTSxpQkFBTTdDLEtBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1o4Qyw2QkFEWSxHQUNFLElBQUlzRSx3REFBSixFQURGO0FBQUE7QUFBQTtBQUFBLHlCQUdSdEUsV0FBVyxDQUFDdUUsT0FBWixFQUhROztBQUFBO0FBQUEsbURBSVA7QUFBRXZFLCtCQUFXLEVBQVhBO0FBQUYsbUJBSk87O0FBQUE7QUFBQTtBQUFBO0FBTWR2Qyx5QkFBTyxDQUFDQyxHQUFSO0FBTmMsbURBT1A7QUFBRThHLG9DQUFnQjtBQUFsQixtQkFQTzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFOOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURMLEM7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZmLHNDOzs7Ozs7Ozs7OztBQ0FBLCtEOzs7Ozs7Ozs7OztBQ0FBLDhEOzs7Ozs7Ozs7OztBQ0FBLDhEOzs7Ozs7Ozs7OztBQ0FBLDREOzs7Ozs7Ozs7OztBQ0FBLHdEOzs7Ozs7Ozs7OztBQ0FBLDZEOzs7Ozs7Ozs7OztBQ0FBLHVEOzs7Ozs7Ozs7OztBQ0FBLCtEOzs7Ozs7Ozs7OztBQ0FBLHNFOzs7Ozs7Ozs7OztBQ0FBLDZEOzs7Ozs7Ozs7OztBQ0FBLG9EOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLGtEOzs7Ozs7Ozs7OztBQ0FBLDJDOzs7Ozs7Ozs7OztBQ0FBLDZDOzs7Ozs7Ozs7OztBQ0FBLHdEOzs7Ozs7Ozs7OztBQ0FBLCtDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLCtDIiwiZmlsZSI6ImFwcC5zc3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgY2h1bmsgPSByZXF1aXJlKFwiLi9cIiArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIik7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rLmlkLCBjaHVuay5tb2R1bGVzKTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KCkge1xuIFx0XHR0cnkge1xuIFx0XHRcdHZhciB1cGRhdGUgPSByZXF1aXJlKFwiLi9cIiArIFwiXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNvblwiKTtcbiBcdFx0fSBjYXRjaCAoZSkge1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVwZGF0ZSk7XG4gXHR9XG5cbiBcdC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuXG4gXHR2YXIgaG90QXBwbHlPblVwZGF0ZSA9IHRydWU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50SGFzaCA9IFwiZDgwZmRkZmM5ZjMxNmQ3YTgwMGJcIjtcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xuIFx0dmFyIGhvdEN1cnJlbnRNb2R1bGVEYXRhID0ge307XG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IFtdO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXG4gXHRcdFx0YXBwbHk6IGhvdEFwcGx5LFxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aWYgKCFsKSByZXR1cm4gaG90U3RhdHVzO1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZFN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90U3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vaW5oZXJpdCBmcm9tIHByZXZpb3VzIGRpc3Bvc2UgY2FsbFxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxuIFx0XHR9O1xuIFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSB1bmRlZmluZWQ7XG4gXHRcdHJldHVybiBob3Q7XG4gXHR9XG5cbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcbiBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG4gXHR9XG5cbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzID0gMDtcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90RGVmZXJyZWQ7XG5cbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xuIFx0XHR2YXIgaXNOdW1iZXIgPSAraWQgKyBcIlwiID09PSBpZDtcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwiaWRsZVwiKSB7XG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XG4gXHRcdH1cbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcbiBcdFx0cmV0dXJuIGhvdERvd25sb2FkTWFuaWZlc3QoaG90UmVxdWVzdFRpbWVvdXQpLnRoZW4oZnVuY3Rpb24odXBkYXRlKSB7XG4gXHRcdFx0aWYgKCF1cGRhdGUpIHtcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcbiBcdFx0XHR9XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xuIFx0XHRcdGhvdFVwZGF0ZU5ld0hhc2ggPSB1cGRhdGUuaDtcblxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxuIFx0XHRcdFx0XHRyZWplY3Q6IHJlamVjdFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHRob3RVcGRhdGUgPSB7fTtcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IFwiYXBwLnNzclwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMCkoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsTW9kdWxlKSB7XG5cdGlmICghb3JpZ2luYWxNb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0dmFyIG1vZHVsZSA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxNb2R1bGUpO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImV4cG9ydHNcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyL3Jvb3QnO1xyXG5pbXBvcnQgTG9hZGFibGUgZnJvbSAncmVhY3QtbG9hZGFibGUnO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ2RhcmlhLXN0b3JlJztcclxuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgU3RhdGljUm91dGVyLCBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAnLi8uLi9zdG9yZSc7XHJcbmltcG9ydCBBcHBSb3V0ZXMgZnJvbSAnY29tcG9uZW50cy9Sb3V0ZXMvQXBwUm91dGVzLmpzJztcclxuaW1wb3J0IHBhZ2VzIGZyb20gJy4vLi4vcGFnZXMnO1xyXG5cclxuaWYgKCFfX0lTX0JST1dTRVJfXykge1xyXG4gICAgcmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0JykuaW5zdGFsbCgpO1xyXG59XHJcblxyXG5jb25zdCBSb3V0ZXIgPSBfX0lTX0JST1dTRVJfXyA/IEJyb3dzZXJSb3V0ZXIgOiBTdGF0aWNSb3V0ZXI7XHJcblxyXG5jb25zdCBBcHAgPSBwcm9wcyA9PiB7XHJcbiAgICBjb25zdCBpbml0aWFsRGF0YSA9IHByb3BzLmluaXRpYWxEYXRhXHJcbiAgICAgICAgPyBwcm9wcy5pbml0aWFsRGF0YVxyXG4gICAgICAgIDogd2luZG93Ll9fSU5JVElBTF9EQVRBX187XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKGluaXRpYWxEYXRhKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8UHJvdmlkZXIgey4uLnN0b3JlfT5cclxuICAgICAgICAgICAgPFJvdXRlciBsb2NhdGlvbj17cHJvcHMubG9jYXRpb259IGNvbnRleHQ9e3t9fT5cclxuICAgICAgICAgICAgICAgIDxBcHBSb3V0ZXMgLz5cclxuICAgICAgICAgICAgPC9Sb3V0ZXI+XHJcbiAgICAgICAgPC9Qcm92aWRlcj5cclxuICAgICk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGhvdChBcHApO1xyXG5cclxuZXhwb3J0IHsgcGFnZXMgfTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybSwgVGV4dCB9IGZyb20gJ2luZm9ybWVkJztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcblxyXG5jb25zdCBMb2dpbkZvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGxvZ2luIH0gPSB1c2VTdG9yZSgpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Rm9ybSBpZD1cImludHJvLWZvcm1cIiBvblN1Ym1pdD17bG9naW59PlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxcIiBodG1sRm9yPVwibG9naW4tdXNlcm5hbWVcIj5cclxuICAgICAgICAgICAgICAgIFVzZXJuYW1lOlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgZmllbGQ9XCJ1c2VybmFtZVwiXHJcbiAgICAgICAgICAgICAgICBpZD1cImxvZ2luLXVzZXJuYW1lXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsXCIgaHRtbEZvcj1cImxvZ2luLXBhc3N3b3JkXCI+XHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZDpcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0XCJcclxuICAgICAgICAgICAgICAgIGZpZWxkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgIGlkPVwibG9naW4tcGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICAgICAgTG9naW5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9Gb3JtPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luRm9ybTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBwYWdlcyBmcm9tICcuLy4uLy4uL3BhZ2VzJztcclxuaW1wb3J0IExvZ2dlZE91dFJvdXRlIGZyb20gJ2NvbXBvbmVudHMvUm91dGVzL0xvZ2dlZE91dFJvdXRlLmpzJztcclxuaW1wb3J0IFByaXZhdGVSb3V0ZSBmcm9tICdjb21wb25lbnRzL1JvdXRlcy9Qcml2YXRlUm91dGUuanMnO1xyXG5cclxuY29uc3QgQXBwUm91dGVzID0gKCkgPT4gKFxyXG4gICAgPFN3aXRjaD5cclxuICAgICAgICB7cGFnZXMubWFwKFBhZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjZmcgPSBQYWdlLnBhZ2VDb25maWc7XHJcbiAgICAgICAgICAgIGNvbnN0IFJvdXRlID1cclxuICAgICAgICAgICAgICAgIGNmZy5hdXRoTGV2ZWwgPT09ICdwcml2YXRlJyA/IFByaXZhdGVSb3V0ZSA6IExvZ2dlZE91dFJvdXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gPFJvdXRlIHsuLi5jZmd9IGNvbXBvbmVudD17UGFnZX0ga2V5PXtjZmcubmFtZX0gLz47XHJcbiAgICAgICAgfSl9XHJcbiAgICA8L1N3aXRjaD5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlcztcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGUsIFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnZGFyaWEtc3RvcmUnO1xyXG5pbXBvcnQgUHJlZmV0Y2hlciBmcm9tICcuL1ByZWZldGNoZXIuanMnO1xyXG5cclxuY29uc3QgTG9nZ2VkT3V0Um91dGUgPSAoeyBjb21wb25lbnQsIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgY29uc3QgeyBhdXRoZW50aWNhdGVkIH0gPSB1c2VTdG9yZShtYXBTdGF0ZVRvUHJvcHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Um91dGVcclxuICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT5cclxuICAgICAgICAgICAgICAgICFhdXRoZW50aWNhdGVkID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxQcmVmZXRjaGVyIGNvbXBvbmVudD17Y29tcG9uZW50fSAvPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICA8UmVkaXJlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG89e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiAnL2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogeyBmcm9tOiBwcm9wcy5sb2NhdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHN0b3JlLmF1dGhlbnRpY2F0ZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2dlZE91dFJvdXRlO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbi8vIEBUT0RPIG5lZWQgdG8gdGhpbmsgYWJvdXQgYW5vdGhlciBpbXBsZW1lbnRhdGlvbi4uLnVubmVlZGVkIHJlLXJlbmRlcnMgYW5kIGNsdW5reSB1dGlsaXNhdGlvbi4uLmNvdWxkIHByb2JhYmx5IG1ha2UgYSB1c2VQcmVmZXRjaCBjdXN0b20gaG9va1xyXG5jb25zdCBQcmVmZXRjaGVyID0gKHsgY29tcG9uZW50OiBDb21wb25lbnQsIC4uLnByb3BzIH0pID0+IHtcclxuICAgIGNvbnN0IHN0b3JlID0gdXNlU3RvcmUoKTtcclxuICAgIGNvbnN0IFtmZXRjaGluZywgc2V0RmV0Y2hpbmddID0gdXNlU3RhdGUoXHJcbiAgICAgICAgKF9fSVNfQlJPV1NFUl9fICYmIHN0b3JlLm5lZWRQcmVmZXRjaCkgPT09IHRydWVcclxuICAgICk7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICBgJHtcclxuICAgICAgICAgICAgQ29tcG9uZW50LnBhZ2VDb25maWcubmFtZVxyXG4gICAgICAgIH0gfCBGRVRDSElORyA6ICR7ZmV0Y2hpbmd9LCBORUVEIFBSRUZFVENIIDoke3N0b3JlLm5lZWRQcmVmZXRjaH1gXHJcbiAgICApO1xyXG4gICAgLy8gdXNlRWZmZWN0IGRvZXNudCBzdXBwb3J0IHVzZUVmZmVjdChhc3luYygpID0+IHsuLi59LCBbXSlcclxuICAgIGNvbnN0IGZldGNoRGF0YSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBzdG9yZVsncHJlZmV0Y2gnICsgQ29tcG9uZW50LnBhZ2VDb25maWcubmFtZV0ocHJvcHMubWF0Y2gucGFyYW1zKTtcclxuICAgICAgICBzZXRGZXRjaGluZyhmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGVuYWJsZVByZWZldGNoID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGF3YWl0IHN0b3JlLnNldFN0YXRlKHsgbmVlZFByZWZldGNoOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChzdG9yZS5uZWVkUHJlZmV0Y2gpIHtcclxuICAgICAgICAgICAgZmV0Y2hEYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZW5hYmxlUHJlZmV0Y2goKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgcmV0dXJuIGZldGNoaW5nID8gPGRpdj5Mb2FkaW5nIHBhZ2UgZGF0YS4uLjwvZGl2PiA6IDxDb21wb25lbnQgLz47XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFByZWZldGNoZXIpO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCBQcmVmZXRjaGVyIGZyb20gJy4vUHJlZmV0Y2hlci5qcyc7XHJcblxyXG5jb25zdCBMb2dnZWRPdXRSb3V0ZSA9ICh7IGNvbXBvbmVudCwgLi4ucmVzdCB9KSA9PiB7XHJcbiAgICBjb25zdCB7IGF1dGhlbnRpY2F0ZWQgfSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxSb3V0ZVxyXG4gICAgICAgICAgICB7Li4ucmVzdH1cclxuICAgICAgICAgICAgcmVuZGVyPXtwcm9wcyA9PlxyXG4gICAgICAgICAgICAgICAgYXV0aGVudGljYXRlZCA/IChcclxuICAgICAgICAgICAgICAgICAgICA8UHJlZmV0Y2hlciBjb21wb25lbnQ9e2NvbXBvbmVudH0gLz5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPFJlZGlyZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogJy8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHsgZnJvbTogcHJvcHMubG9jYXRpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAvPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdG9yZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhdXRoZW50aWNhdGVkOiBzdG9yZS5hdXRoZW50aWNhdGVkXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dnZWRPdXRSb3V0ZTtcclxuIiwiLy8gc3RvcmUvVXNlclByb3ZpZGVyLmpzXHJcbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgbWVtbyB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmV4cG9ydCBjb25zdCBTdG9yZUNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHt9KTtcclxuXHJcbi8vIFdlIG5lZWQgYSByZWZlcmVuY2UgdG8gdGhlIHN0YXRlIG91dHNpZGUgb2YgdGhlIGNvbXBvbmVudCB0byBhY2Nlc3MgaXQgd2l0aCBoZXRTdGF0ZSgpIG90aGVyd2lzZSB3ZSBnZXQgdGhlIHVuLW1lbW9pemVkIHZlcmlzb24gb2YgdGhlIHN0YXRlIHdoaWNoIGlzIGFuIGVtcHR5IG9iamVjdC5cclxubGV0IF9zdGF0ZTtcclxuXHJcbmNvbnN0IFJlbmRlclB1cmUgPSBtZW1vKCh7IGNoaWxkcmVuIH0pID0+IGNoaWxkcmVuKTtcclxuXHJcbmNvbnN0IG1ha2VTdG9yZSA9IChwcm9wcywgc2V0U3RhdGUpID0+IHtcclxuICAgIGNvbnN0IHN0YXRlVXBkYXRlRm5zID0gT2JqZWN0LmVudHJpZXMocHJvcHMpXHJcbiAgICAgICAgLmZpbHRlcigoW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAucmVkdWNlKFxyXG4gICAgICAgICAgICAoYWNjLCBba2V5LCB2YWx1ZV0pID0+ICh7XHJcbiAgICAgICAgICAgICAgICAuLi5hY2MsXHJcbiAgICAgICAgICAgICAgICBba2V5XTogYXN5bmMgKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnJWNzdG9yZS4nICsga2V5LCAnY29sb3I6IGJsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IGF3YWl0IHZhbHVlKC4uLmFyZ3MpKF9zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3N0YXRlID0geyAuLi5fc3RhdGUsIC4uLm5ld1N0YXRlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJyVjc3RvcmUuJyArIGtleSArICcgZmluaXNoZWQnLCAnY29sb3I6IGJsdWUnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2V0U3RhdGUoX3N0YXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIHt9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICBpZiAoIV9zdGF0ZSkge1xyXG4gICAgICAgIF9zdGF0ZSA9IHtcclxuICAgICAgICAgICAgLi4ucHJvcHMsXHJcbiAgICAgICAgICAgIC4uLnN0YXRlVXBkYXRlRm5zXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gX3N0YXRlO1xyXG59O1xyXG5cclxuY29uc3QgUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4ge1xyXG4gICAgY29uc3QgX3NldFN0YXRlID0gKC4uLmFyZ3MpID0+IHNldFN0YXRlKC4uLmFyZ3MpO1xyXG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShtYWtlU3RvcmUocHJvcHMsIF9zZXRTdGF0ZSkpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFN0b3JlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17c3RhdGV9PlxyXG4gICAgICAgICAgICA8UmVuZGVyUHVyZT57Y2hpbGRyZW59PC9SZW5kZXJQdXJlPlxyXG4gICAgICAgIDwvU3RvcmVDb250ZXh0LlByb3ZpZGVyPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgaG9pc3ROb25SZWFjdFN0YXRpYyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XHJcbmltcG9ydCB7IFN0b3JlQ29udGV4dCB9IGZyb20gJy4vUHJvdmlkZXIuanMnO1xyXG5cclxuY29uc3Qgc3Vic2NyaWJlID0gbWFwU3RvcmVUb1Byb3BzID0+IFdyYXBwZWQgPT4ge1xyXG4gICAgY29uc3QgU3Vic2NyaWJlID0gcHJvcHMgPT4gKFxyXG4gICAgICAgIDxTdG9yZUNvbnRleHQuQ29uc3VtZXI+XHJcbiAgICAgICAgICAgIHtzdG9yZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdG9yZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWQgPVxyXG4gICAgICAgICAgICAgICAgICAgIG1hcFN0b3JlVG9Qcm9wcyAmJiB0eXBlb2YgbWFwU3RvcmVUb1Byb3BzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ubWFwU3RvcmVUb1Byb3BzKHN0b3JlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U3RhdGU6IHN0b3JlLnNldHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzdG9yZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8V3JhcHBlZCB7Li4ubWFwcGVkfSB7Li4ucHJvcHN9IC8+O1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgIDwvU3RvcmVDb250ZXh0LkNvbnN1bWVyPlxyXG4gICAgKTtcclxuICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWMoU3Vic2NyaWJlLCBXcmFwcGVkKTtcclxuICAgIHJldHVybiBTdWJzY3JpYmU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdWJzY3JpYmU7XHJcblxyXG5mdW5jdGlvbiB1c2VTdG9yZShtYXBTdG9yZVRvUHJvcHMpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdXNlQ29udGV4dChTdG9yZUNvbnRleHQpO1xyXG4gICAgY29uc3QgbWFwcGVkU3RvcmUgPVxyXG4gICAgICAgIG1hcFN0b3JlVG9Qcm9wcyAmJiB0eXBlb2YgbWFwU3RvcmVUb1Byb3BzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAuLi5tYXBTdG9yZVRvUHJvcHMoc3RvcmUpLFxyXG4gICAgICAgICAgICAgICAgICBzZXRTdGF0ZTogc3RvcmUuc2V0c3RhdGVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDogc3RvcmU7XHJcbiAgICByZXR1cm4gbWFwcGVkU3RvcmU7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHVzZVN0b3JlIH07XHJcbiIsImltcG9ydCBQcm92aWRlciwgeyBTdG9yZUNvbnRleHQgfSBmcm9tICcuL1Byb3ZpZGVyLmpzJztcclxuaW1wb3J0IHN1YnNjcmliZSwgeyB1c2VTdG9yZSB9IGZyb20gJy4vU3Vic2NyaWJlLmpzJztcclxuXHJcbmV4cG9ydCB7IFByb3ZpZGVyLCBTdG9yZUNvbnRleHQsIHN1YnNjcmliZSwgdXNlU3RvcmUgfTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyB1c2VTdG9yZSB9IGZyb20gJ2RhcmlhLXN0b3JlJztcclxuXHJcbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdG9yZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2dvdXQ6IHN0b3JlLmxvZ291dCxcclxuICAgICAgICBnZXRDdXJyZW50VXNlcjogc3RvcmUuZ2V0Q3VycmVudFVzZXIsXHJcbiAgICAgICAgY3VycmVudFVzZXI6IHN0b3JlLmN1cnJlbnRVc2VyXHJcbiAgICB9O1xyXG59XHJcblxyXG5jb25zdCBEYXNoYm9hcmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGxvZ291dCwgY3VycmVudFVzZXIgfSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICBjb25zdCBwcm9maWxlVXJsID0gYC9wcm9maWxlLyR7Y3VycmVudFVzZXIuaWR9YDtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgeyFjdXJyZW50VXNlciA/IChcclxuICAgICAgICAgICAgICAgIDxwPkxvYWRpbmcgdXNlciBkYXRhLi4uPC9wPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPHA+SGVsbG8sIHtjdXJyZW50VXNlci51c2VybmFtZX0gITwvcD5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPExpbmsgdG89e3Byb2ZpbGVVcmx9PllvdXIgUHJvZmlsZTwvTGluaz5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBsb2dvdXQoKX0+bG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59O1xyXG5cclxuRGFzaGJvYXJkLnBhZ2VDb25maWcgPSB7XHJcbiAgICBuYW1lOiAnRGFzaGJvYXJkJyxcclxuICAgIHBhdGg6ICcvZGFzaGJvYXJkJyxcclxuICAgIGV4YWN0OiB0cnVlLFxyXG4gICAgYXV0aExldmVsOiAncHJpdmF0ZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCBMb2dpbkZvcm0gZnJvbSAnY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0nO1xyXG5pbXBvcnQgeyBub29wIH0gZnJvbSAndXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHN0b3JlLmF1dGhlbnRpY2F0ZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmNvbnN0IEhvbWUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICByZXR1cm4gPExvZ2luRm9ybSAvPjtcclxufTtcclxuXHJcbkhvbWUuZ2V0SW5pdGlhbFN0YXRlID0gKCkgPT4ge307XHJcblxyXG5Ib21lLnBhZ2VDb25maWcgPSB7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICBwYXRoOiAnLycsXHJcbiAgICBleGFjdDogdHJ1ZSxcclxuICAgIGF1dGhMZXZlbDogJ3B1YmxpYydcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnZGFyaWEtc3RvcmUnO1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvZ291dDogc3RvcmUubG9nb3V0LFxyXG4gICAgICAgIGdldFByb2ZpbGU6IHN0b3JlLmdldFByb2ZpbGUsXHJcbiAgICAgICAgcHJvZmlsZTogc3RvcmUucHJvZmlsZSxcclxuICAgICAgICBpc093blByb2ZpbGU6IHN0b3JlLmlzT3duUHJvZmlsZVxyXG4gICAgfTtcclxufVxyXG5cclxuY29uc3QgUHJvZmlsZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgbG9nb3V0LCBwcm9maWxlIH0gPSB1c2VTdG9yZShtYXBTdGF0ZVRvUHJvcHMpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgeyFwcm9maWxlID8gKFxyXG4gICAgICAgICAgICAgICAgPHA+TG9hZGluZyBQcm9maWxlLi4uPC9wPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPHA+e0pTT04uc3RyaW5naWZ5KHByb2ZpbGUpfSAhPC9wPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGxvZ291dCgpfT5sb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8Lz5cclxuICAgICk7XHJcbn07XHJcblxyXG5Qcm9maWxlLnBhZ2VDb25maWcgPSB7XHJcbiAgICBuYW1lOiAnUHJvZmlsZScsXHJcbiAgICBwYXRoOiAnL3Byb2ZpbGUvOmlkJyxcclxuICAgIGV4YWN0OiB0cnVlLFxyXG4gICAgYXV0aExldmVsOiAncHJpdmF0ZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2ZpbGU7XHJcbiIsImltcG9ydCBIb21lIGZyb20gJy4vSG9tZS9Ib21lLmpzJztcclxuaW1wb3J0IERhc2hib2FyZCBmcm9tICcuL0Rhc2hib2FyZC9EYXNoYm9hcmQuanMnO1xyXG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuL1Byb2ZpbGUvUHJvZmlsZS5qcyc7XHJcblxyXG5jb25zdCBwYWdlcyA9IFtIb21lLCBEYXNoYm9hcmQsIFByb2ZpbGVdO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGFnZXM7XHJcbiIsImltcG9ydCBBUEkgZnJvbSAnc2VydmljZXMvUkVTVFNlcnZpY2UuanMnO1xyXG5cclxuY2xhc3MgVXNlck1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKG1vZGVsRGVmKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IC4uLm1vZGVsRGVmIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldCgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgQVBJLmdldChgL3VzZXJzLyR7dGhpcy5pZH1gKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHsgLi4uZGF0YSB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXRTZWxmKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBBUEkuZ2V0KGAvdXNlcnMvc2VsZmApO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyAuLi5kYXRhIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBVc2VyTW9kZWw7XHJcbiIsImltcG9ydCBjb25zdGFudHMgZnJvbSAnY29uc3RhbnRzJztcclxuXHJcbmNvbnN0IHsgQVVUSF9VUkwgfSA9IGNvbnN0YW50cztcclxuXHJcbmNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICAgIHN0YXRpYyBhc3luYyBsb2dpbihib2R5KSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChBVVRIX1VSTCArICcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICB9XHJcbiAgICAvL0BUT0RPIHNob3VsZCBwcm9iYWJseSBkbyBtb3JlIHRoYW4gdGhpcyBsb2xcclxuICAgIHN0YXRpYyBhc3luYyBsb2dvdXQoKSB7XHJcbiAgICAgICAgYXdhaXQgZmV0Y2goQVVUSF9VUkwgKyAnL2xvZ291dCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRoU2VydmljZTtcclxuIiwiaW1wb3J0IHdyZXRjaCBmcm9tICd3cmV0Y2gnO1xyXG5pbXBvcnQgeyBkZWR1cGUgfSBmcm9tICd3cmV0Y2gtbWlkZGxld2FyZXMnO1xyXG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJ2NvbnN0YW50cyc7XHJcblxyXG5jb25zdCB3ID0gd3JldGNoKGNvbnN0YW50cy5BUElfVVJMKVxyXG4gICAgLm1pZGRsZXdhcmVzKFtkZWR1cGUoKV0pXHJcbiAgICAub3B0aW9ucyh7IGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsIG1vZGU6ICdjb3JzJyB9KVxyXG4gICAgLnJlc29sdmUocmVzb2x2ZXIgPT5cclxuICAgICAgICByZXNvbHZlclxyXG4gICAgICAgICAgICAubm90Rm91bmQoYXN5bmMgKGVycm9yLCByZXEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE9cclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiA0MDQgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnVuYXV0aG9yaXplZChhc3luYyAoZXJyb3IsIHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiA0MDEgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmludGVybmFsRXJyb3IoYXN5bmMgKGVycm9yLCByZXEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7IGVycm9yOiA1MDAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmpzb24oanNvbiA9PiBqc29uKVxyXG4gICAgKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIHc6ICgpID0+IHcsXHJcbiAgICBnZXQ6ICh1cmwsIHBhcmFtcykgPT5cclxuICAgICAgICB3XHJcbiAgICAgICAgICAgIC51cmwodXJsKVxyXG4gICAgICAgICAgICAucXVlcnkocGFyYW1zKVxyXG4gICAgICAgICAgICAuZ2V0KCksXHJcbiAgICBwb3N0OiAodXJsLCBib2R5KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHdcclxuICAgICAgICAgICAgLnVybCh1cmwpXHJcbiAgICAgICAgICAgIC5qc29uKGJvZHkpXHJcbiAgICAgICAgICAgIC5wb3N0KCk7XHJcbiAgICB9LFxyXG4gICAgcHV0OiAodXJsLCBib2R5KSA9PlxyXG4gICAgICAgIHdcclxuICAgICAgICAgICAgLnVybCh1cmwpXHJcbiAgICAgICAgICAgIC5qc29uKGJvZHkpXHJcbiAgICAgICAgICAgIC5wdXQoKSxcclxuICAgIGRlbGV0ZTogdXJsID0+IHcudXJsKHVybCkuZGVsZXRlKClcclxufTtcclxuIiwiaW1wb3J0IG5vb3AgZnJvbSAnLi9ub29wLmpzJztcclxuaW1wb3J0IExvY2FsU3RvcmFnZSBmcm9tICcuL2xvY2FsU3RvcmFnZS5qcyc7XHJcblxyXG5leHBvcnQgeyBub29wLCBMb2NhbFN0b3JhZ2UgfTtcclxuIiwiZnVuY3Rpb24gZ2V0KGtleSkge1xyXG4gICAgY29uc3QgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGl0ZW0pO1xyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXQoa2V5LCBkYXRhKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGpzb24pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGdldCxcclxuICAgIHNldCxcclxuICAgIHJlbW92ZVxyXG59O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub29wKCkge1xyXG4gICAgcmV0dXJuIHZvaWQgMDtcclxufVxyXG4iLCJpbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSAncmVzb3VyY2VzL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSAndXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgYXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICBsb2dpbjogdmFsdWVzID0+IGFzeW5jIHN0YXRlID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGF3YWl0IEF1dGhTZXJ2aWNlLmxvZ2luKHZhbHVlcyk7XHJcbiAgICAgICAgICAgIExvY2FsU3RvcmFnZS5zZXQoJ3VpZCcsIGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgYXV0aGVudGljYXRlZDogdHJ1ZSB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgYXV0aGVudGljYXRlZDogZmFsc2UgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbG9nb3V0OiB2YWx1ZXMgPT4gYXN5bmMgc3RhdGUgPT4ge1xyXG4gICAgICAgIGF3YWl0IEF1dGhTZXJ2aWNlLmxvZ291dCh2YWx1ZXMpO1xyXG4gICAgICAgIHJldHVybiB7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLCBjdXJyZW50VXNlcjogdW5kZWZpbmVkIH07XHJcbiAgICB9XHJcbn07XHJcbiIsImltcG9ydCBhdXRoIGZyb20gJy4vYXV0aC5qcyc7XG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXIuanMnO1xuaW1wb3J0IHByZWZldGNoZXJzIGZyb20gJy4vcHJlZmV0Y2hlcnMuanMnO1xuXG5jb25zdCBzdG9yZSA9IHtcbiAgICAuLi5hdXRoLFxuICAgIC4uLnVzZXIsXG4gICAgLi4ucHJlZmV0Y2hlcnMsXG4gICAgLy8gQEZJWE1FIHRoaXMgc2hvdWxkIGJlIGNyZWF0ZWQgaW4gdGhlIFByb3ZpZGVyIGNvbXBvbmVudCBidXQgaXQgaGFzIHNvbWUgd2VpcmQgYnVnc1xuICAgIHNldFN0YXRlOiBuZXdTdGF0ZSA9PiBzdGF0ZSA9PiAoeyAuLi5uZXdTdGF0ZSB9KVxufTtcblxuY29uc3QgY3JlYXRlU3RvcmUgPSBpbml0aWFsU3RvcmUgPT4gKHsgLi4uc3RvcmUsIC4uLmluaXRpYWxTdG9yZSB9KTtcblxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XG5cbmV4cG9ydCB7IGNyZWF0ZVN0b3JlIH07XG4iLCJpbXBvcnQgVXNlciBmcm9tICdtb2RlbHMvVXNlck1vZGVsJztcclxuaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSAndXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgcHJlZmV0Y2hIb21lOiAoKSA9PiBzdGF0ZSA9PiBzdGF0ZSxcclxuICAgIHByZWZldGNoRGFzaGJvYXJkOiAoKSA9PiBhc3luYyBzdGF0ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSBuZXcgVXNlcigpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGN1cnJlbnRVc2VyLmdldFNlbGYoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgY3VycmVudFVzZXIgfTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBjdXJyZW50VXNlckVycm9yOiBlIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByZWZldGNoUHJvZmlsZTogKHsgaWQgfSkgPT4gYXN5bmMgc3RhdGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBuZXcgVXNlcih7IGlkIH0pO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHVzZXIuZ2V0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlOiB1c2VyLFxyXG4gICAgICAgICAgICAgICAgaXNPd25Qcm9maWxlOiBpZCA9PSBMb2NhbFN0b3JhZ2UuZ2V0KCd1aWQnKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHByb2ZpbGVFcnJvcjogZSB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwiaW1wb3J0IFVzZXIgZnJvbSAnbW9kZWxzL1VzZXJNb2RlbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBnZXRDdXJyZW50VXNlcjogKCkgPT4gYXN5bmMgc3RhdGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gbmV3IFVzZXIoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBjdXJyZW50VXNlci5nZXRTZWxmKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGN1cnJlbnRVc2VyIH07XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgY3VycmVudFVzZXJFcnJvcjogZSB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29uc3RhbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM2LnJlZ2V4cC5tYXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImluZm9ybWVkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhvdC1sb2FkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaG90LWxvYWRlci9yb290XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWxvYWRhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3cmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid3JldGNoLW1pZGRsZXdhcmVzXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=