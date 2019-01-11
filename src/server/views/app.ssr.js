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
/******/ 	var hotCurrentHash = "4ecbd61e15cef5c1e2c2";
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

  reactHotLoader.register(Router, "Router", "c:\\websites\\PopNetwork\\src\\client\\components\\App.js");
  reactHotLoader.register(App, "App", "c:\\websites\\PopNetwork\\src\\client\\components\\App.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\App.js");
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

  reactHotLoader.register(LoginForm, "LoginForm", "c:\\websites\\PopNetwork\\src\\client\\components\\Auth\\LoginForm\\LoginForm.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Auth\\LoginForm\\LoginForm.js");
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

  reactHotLoader.register(AppRoutes, "AppRoutes", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\AppRoutes.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\AppRoutes.js");
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





(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var LoggedOutRoute = function LoggedOutRoute(_ref) {
  var Component = _ref.component,
      rest = _objectWithoutProperties(_ref, ["component"]);

  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_6__["useStore"])(mapStateToProps),
      authenticated = _useStore.authenticated;

  var _ref2 =
  /*#__PURE__*/
  react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, null);

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

  reactHotLoader.register(LoggedOutRoute, "LoggedOutRoute", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
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





(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var LoggedOutRoute = function LoggedOutRoute(_ref) {
  var Component = _ref.component,
      rest = _objectWithoutProperties(_ref, ["component"]);

  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_6__["useStore"])(mapStateToProps),
      authenticated = _useStore.authenticated;

  var _ref2 =
  /*#__PURE__*/
  react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Component, null);

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

  reactHotLoader.register(LoggedOutRoute, "LoggedOutRoute", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\PrivateRoute.js");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\PrivateRoute.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\PrivateRoute.js");
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

var _state = {};
var RenderPure = Object(react__WEBPACK_IMPORTED_MODULE_8__["memo"])(function (_ref) {
  var children = _ref.children;
  return children;
});

var makeStore = function makeStore(props, _setState2) {
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
              _context.next = 2;
              return value.apply(void 0, _args)(_state);

            case 2:
              newState = _context.sent;
              _state = _objectSpread({}, _state, newState);
              return _context.abrupt("return", _setState2(_state));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }))));
  }, {});
  _state = _objectSpread({}, props, stateUpdateFns, {
    setState: function setState(newState) {
      return _setState2(newState);
    }
  });
  return _state;
};

var Provider = function Provider(props) {
  var _setState = function _setState() {
    return setState.apply(void 0, arguments);
  };

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_8__["useState"])(makeStore(props, _setState)),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(StoreContext.Provider, {
    value: state
  }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(RenderPure, null, props.children));
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

  reactHotLoader.register(StoreContext, "StoreContext", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(_state, "_state", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(RenderPure, "RenderPure", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(makeStore, "makeStore", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(Provider, "Provider", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Provider.js");
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

  reactHotLoader.register(subscribe, "subscribe", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Subscribe.js");
  reactHotLoader.register(useStore, "useStore", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Subscribe.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Store\\Subscribe.js");
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
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var components_Auth_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/Auth/LoginForm/LoginForm */ "./src/client/components/Auth/LoginForm/LoginForm.js");
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();





function mapStateToProps(store) {
  return {
    logout: store.logout
  };
}

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "I am the dashboard !");

var Dashboard = function Dashboard() {
  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_1__["useStore"])(mapStateToProps),
      logout = _useStore.logout;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, _ref, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
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

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "c:\\websites\\PopNetwork\\src\\client\\pages\\Dashboard\\Dashboard.js");
  reactHotLoader.register(Dashboard, "Dashboard", "c:\\websites\\PopNetwork\\src\\client\\pages\\Dashboard\\Dashboard.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\pages\\Dashboard\\Dashboard.js");
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

  reactHotLoader.register(mapStateToProps, "mapStateToProps", "c:\\websites\\PopNetwork\\src\\client\\pages\\Home\\Home.js");
  reactHotLoader.register(Home, "Home", "c:\\websites\\PopNetwork\\src\\client\\pages\\Home\\Home.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\pages\\Home\\Home.js");
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
(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();



var pages = [_Home_Home_js__WEBPACK_IMPORTED_MODULE_0__["default"], _Dashboard_Dashboard_js__WEBPACK_IMPORTED_MODULE_1__["default"]];
var _default = pages;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(pages, "pages", "c:\\websites\\PopNetwork\\src\\client\\pages\\index.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\pages\\index.js");
  leaveModule(module);
})();

;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

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

  reactHotLoader.register(AUTH_URL, "AUTH_URL", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  reactHotLoader.register(AuthService, "AuthService", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
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
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return resources_services_AuthService__WEBPACK_IMPORTED_MODULE_2__["default"].login(values);

                case 3:
                  return _context.abrupt("return", {
                    authenticated: true
                  });

                case 6:
                  _context.prev = 6;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", {
                    authenticated: false
                  });

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 6]]);
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
                    authenticated: false
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

  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\store\\auth.js");
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




(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var store = _objectSpread({}, _auth_js__WEBPACK_IMPORTED_MODULE_3__["default"]);

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

  reactHotLoader.register(store, "store", "c:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  reactHotLoader.register(createStore, "createStore", "c:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\store\\index.js");
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

module.exports = __webpack_require__(/*! c:\websites\PopNetwork\src\client\components\App.js */"./src/client/components/App.js");


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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZWZhdWx0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RlZmF1bHQvKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0uanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9Sb3V0ZXMvQXBwUm91dGVzLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvUm91dGVzL0xvZ2dlZE91dFJvdXRlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvUm91dGVzL1ByaXZhdGVSb3V0ZS5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9jb21wb25lbnRzL1N0b3JlL1Byb3ZpZGVyLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvU3RvcmUvU3Vic2NyaWJlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvU3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcGFnZXMvRGFzaGJvYXJkL0Rhc2hib2FyZC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9wYWdlcy9Ib21lL0hvbWUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcGFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcmVzb3VyY2VzL3NlcnZpY2VzL0F1dGhTZXJ2aWNlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3N0b3JlL2F1dGguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvbnN0YW50c1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy9lczYuZnVuY3Rpb24ubmFtZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ25cIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3Qua2V5c1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2LnByb21pc2VcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNi5zeW1ib2xcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllc1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvclwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJob2lzdC1ub24tcmVhY3Qtc3RhdGljc1wiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJpbmZvcm1lZFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdC1ob3QtbG9hZGVyXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlYWN0LWhvdC1sb2FkZXIvcm9vdFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdC1sb2FkYWJsZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiIl0sIm5hbWVzIjpbIlJvdXRlciIsIl9fSVNfQlJPV1NFUl9fIiwiQnJvd3NlclJvdXRlciIsIlN0YXRpY1JvdXRlciIsIkFwcCIsInByb3BzIiwiaW5pdGlhbERhdGEiLCJ3aW5kb3ciLCJfX0lOSVRJQUxfREFUQV9fIiwic3RvcmUiLCJjcmVhdGVTdG9yZSIsImxvY2F0aW9uIiwiaG90IiwiTG9naW5Gb3JtIiwidXNlU3RvcmUiLCJsb2dpbiIsIkFwcFJvdXRlcyIsInBhZ2VzIiwibWFwIiwiUGFnZSIsImNmZyIsInBhZ2VDb25maWciLCJSb3V0ZSIsImF1dGhMZXZlbCIsIlByaXZhdGVSb3V0ZSIsIkxvZ2dlZE91dFJvdXRlIiwibmFtZSIsIkNvbXBvbmVudCIsImNvbXBvbmVudCIsInJlc3QiLCJtYXBTdGF0ZVRvUHJvcHMiLCJhdXRoZW50aWNhdGVkIiwicGF0aG5hbWUiLCJzdGF0ZSIsImZyb20iLCJTdG9yZUNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiX3N0YXRlIiwiUmVuZGVyUHVyZSIsIm1lbW8iLCJjaGlsZHJlbiIsIm1ha2VTdG9yZSIsInNldFN0YXRlIiwic3RhdGVVcGRhdGVGbnMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidmFsdWUiLCJyZWR1Y2UiLCJhY2MiLCJuZXdTdGF0ZSIsIlByb3ZpZGVyIiwiX3NldFN0YXRlIiwidXNlU3RhdGUiLCJzdWJzY3JpYmUiLCJtYXBTdG9yZVRvUHJvcHMiLCJXcmFwcGVkIiwiU3Vic2NyaWJlIiwibWFwcGVkIiwic2V0c3RhdGUiLCJob2lzdE5vblJlYWN0U3RhdGljIiwidXNlQ29udGV4dCIsIm1hcHBlZFN0b3JlIiwibG9nb3V0IiwiRGFzaGJvYXJkIiwicGF0aCIsImV4YWN0IiwiSG9tZSIsIkFVVEhfVVJMIiwiY29uc3RhbnRzIiwiQXV0aFNlcnZpY2UiLCJib2R5IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwidGV4dCIsInZhbHVlcyIsImF1dGgiLCJpbml0aWFsU3RvcmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsNkJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUFrQiw4QkFBOEI7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLGVBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLDJCQUEyQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsdUNBQXVDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQWMsd0NBQXdDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBLDhDQUFzQyx1QkFBdUI7OztBQUc3RDtBQUNBOzs7Ozs7Ozs7Ozs7QUM1dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsTUFBTSxHQUFHQyxNQUFjLEdBQUdDLFNBQUgsR0FBbUJDLDZEQUFoRDs7OztBQVdnQiwyREFBQyxzRUFBRCxPOztBQVRoQixJQUFNQyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxDQUFBQyxLQUFLLEVBQUk7QUFDakIsTUFBTUMsV0FBVyxHQUFHRCxLQUFLLENBQUNDLFdBQU4sR0FDZEQsS0FBSyxDQUFDQyxXQURRLEdBRWRDLE1BQU0sQ0FBQ0MsZ0JBRmI7QUFHQSxNQUFNQyxLQUFLLEdBQUdDLDBEQUFXLENBQUNKLFdBQUQsQ0FBekI7QUFFQSxTQUNJLDJEQUFDLG9EQUFELEVBQWNHLEtBQWQsRUFDSSwyREFBQyxNQUFEO0FBQVEsWUFBUSxFQUFFSixLQUFLLENBQUNNLFFBQXhCO0FBQWtDLFdBQU8sRUFBRTtBQUEzQyxVQURKLENBREo7QUFPSCxDQWJEOztlQWNlQyxpRUFBRyxDQUFDUixHQUFELEM7O0FBQUg7QUFFZjs7Ozs7Ozs7Ozs7OzBCQWxCTUosTTswQkFFQUksRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWE47QUFDQTtBQUNBOzs7O0FBTVk7QUFBTyxXQUFTLEVBQUMsT0FBakI7QUFBeUIsU0FBTyxFQUFDO0FBQWpDLGU7Ozs7QUFHQSwyREFBQyw2Q0FBRDtBQUNJLFdBQVMsRUFBQyxPQURkO0FBRUksTUFBSSxFQUFDLE1BRlQ7QUFHSSxPQUFLLEVBQUMsVUFIVjtBQUlJLElBQUUsRUFBQztBQUpQLEU7Ozs7QUFNQTtBQUFPLFdBQVMsRUFBQyxPQUFqQjtBQUF5QixTQUFPLEVBQUM7QUFBakMsZTs7OztBQUdBLDJEQUFDLDZDQUFEO0FBQ0ksV0FBUyxFQUFDLE9BRGQ7QUFFSSxPQUFLLEVBQUMsVUFGVjtBQUdJLE1BQUksRUFBQyxVQUhUO0FBSUksSUFBRSxFQUFDO0FBSlAsRTs7OztBQU1BO0FBQVEsV0FBUyxFQUFDLE9BQWxCO0FBQTBCLE1BQUksRUFBQztBQUEvQixXOztBQXRCWixJQUFNUyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxHQUFNO0FBQUEsa0JBQ0ZDLDREQUFRLEVBRE47QUFBQSxNQUNaQyxLQURZLGFBQ1pBLEtBRFk7O0FBRXBCLFNBQ0ksMkRBQUMsNkNBQUQ7QUFBTSxNQUFFLEVBQUMsWUFBVDtBQUFzQixZQUFRLEVBQUVBO0FBQWhDLHNDQURKO0FBeUJILENBM0JEOztlQTZCZUYsUztBQUFBOzs7Ozs7Ozs7Ozs7MEJBN0JUQSxTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUcsU0FBUyxHQUFHLFNBQVpBLFNBQVk7QUFBQSxTQUNkLDJEQUFDLHVEQUFELFFBQ0tDLDhDQUFLLENBQUNDLEdBQU4sQ0FBVSxVQUFBQyxJQUFJLEVBQUk7QUFDZixRQUFNQyxHQUFHLEdBQUdELElBQUksQ0FBQ0UsVUFBakI7QUFDQSxRQUFNQyxLQUFLLEdBQ1BGLEdBQUcsQ0FBQ0csU0FBSixLQUFrQixTQUFsQixHQUE4QkMseUVBQTlCLEdBQTZDQywyRUFEakQ7QUFFQSxXQUFPLDJEQUFDLEtBQUQsZUFBV0wsR0FBWDtBQUFnQixlQUFTLEVBQUVELElBQTNCO0FBQWlDLFNBQUcsRUFBRUMsR0FBRyxDQUFDTTtBQUExQyxPQUFQO0FBQ0gsR0FMQSxDQURMLENBRGM7QUFBQSxDQUFsQjs7ZUFXZVYsUztBQUFBOzs7Ozs7Ozs7Ozs7MEJBWFRBLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTjtBQUNBO0FBQ0E7O0FBRUEsSUFBTVMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixPQUF1QztBQUFBLE1BQXpCRSxTQUF5QixRQUFwQ0MsU0FBb0M7QUFBQSxNQUFYQyxJQUFXOztBQUFBLGtCQUNoQ2YsNERBQVEsQ0FBQ2dCLGVBQUQsQ0FEd0I7QUFBQSxNQUNsREMsYUFEa0QsYUFDbERBLGFBRGtEOztBQUFBO0FBQUE7QUFPMUMsNkRBQUMsU0FBRCxPQVAwQzs7QUFFMUQsU0FDSSwyREFBQyxzREFBRCxlQUNRRixJQURSO0FBRUksVUFBTSxFQUFFLGdCQUFBeEIsS0FBSztBQUFBLGFBQ1QsQ0FBQzBCLGFBQUQsV0FHSSwyREFBQyx5REFBRDtBQUNJLFVBQUUsRUFBRTtBQUNBQyxrQkFBUSxFQUFFLFlBRFY7QUFFQUMsZUFBSyxFQUFFO0FBQUVDLGdCQUFJLEVBQUU3QixLQUFLLENBQUNNO0FBQWQ7QUFGUDtBQURSLFFBSks7QUFBQTtBQUZqQixLQURKO0FBaUJILENBbkJEOztBQXFCQSxTQUFTbUIsZUFBVCxDQUF5QnJCLEtBQXpCLEVBQWdDO0FBQzVCLFNBQU87QUFDSHNCLGlCQUFhLEVBQUV0QixLQUFLLENBQUNzQjtBQURsQixHQUFQO0FBR0g7O2VBRWNOLGM7QUFBQTs7Ozs7Ozs7Ozs7OzBCQTNCVEEsYzswQkFxQkdLLGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QlQ7QUFDQTtBQUNBOztBQUVBLElBQU1MLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsT0FBdUM7QUFBQSxNQUF6QkUsU0FBeUIsUUFBcENDLFNBQW9DO0FBQUEsTUFBWEMsSUFBVzs7QUFBQSxrQkFDaENmLDREQUFRLENBQUNnQixlQUFELENBRHdCO0FBQUEsTUFDbERDLGFBRGtELGFBQ2xEQSxhQURrRDs7QUFBQTtBQUFBO0FBTzFDLDZEQUFDLFNBQUQsT0FQMEM7O0FBRTFELFNBQ0ksMkRBQUMsc0RBQUQsZUFDUUYsSUFEUjtBQUVJLFVBQU0sRUFBRSxnQkFBQXhCLEtBQUs7QUFBQSxhQUNUMEIsYUFBYSxXQUdULDJEQUFDLHlEQUFEO0FBQ0ksVUFBRSxFQUFFO0FBQ0FDLGtCQUFRLEVBQUUsR0FEVjtBQUVBQyxlQUFLLEVBQUU7QUFBRUMsZ0JBQUksRUFBRTdCLEtBQUssQ0FBQ007QUFBZDtBQUZQO0FBRFIsUUFKSztBQUFBO0FBRmpCLEtBREo7QUFpQkgsQ0FuQkQ7O0FBcUJBLFNBQVNtQixlQUFULENBQXlCckIsS0FBekIsRUFBZ0M7QUFDNUIsU0FBTztBQUNIc0IsaUJBQWEsRUFBRXRCLEtBQUssQ0FBQ3NCO0FBRGxCLEdBQVA7QUFHSDs7ZUFFY04sYztBQUFBOzs7Ozs7Ozs7Ozs7MEJBM0JUQSxjOzBCQXFCR0ssZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJUO0FBQ0E7QUFFTyxJQUFNSyxZQUFZLEdBQUdDLDJEQUFhLENBQUMsRUFBRCxDQUFsQyxDLENBRVA7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFFQSxJQUFNQyxVQUFVLEdBQUdDLGtEQUFJLENBQUM7QUFBQSxNQUFHQyxRQUFILFFBQUdBLFFBQUg7QUFBQSxTQUFrQkEsUUFBbEI7QUFBQSxDQUFELENBQXZCOztBQUVBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNwQyxLQUFELEVBQVFxQyxVQUFSLEVBQXFCO0FBQ25DLE1BQU1DLGNBQWMsR0FBR0MsTUFBTSxDQUFDQyxPQUFQLENBQWV4QyxLQUFmLEVBQ2xCeUMsTUFEa0IsQ0FDWCxpQkFBa0I7QUFBQTtBQUFBLFFBQWhCQyxHQUFnQjtBQUFBLFFBQVhDLEtBQVc7O0FBQ3RCLFdBQU8sT0FBT0EsS0FBUCxLQUFpQixVQUF4QjtBQUNILEdBSGtCLEVBSWxCQyxNQUprQixDQUtmLFVBQUNDLEdBQUQ7QUFBQTtBQUFBLFFBQU9ILEdBQVA7QUFBQSxRQUFZQyxLQUFaOztBQUFBLDZCQUNPRSxHQURQLHNCQUVLSCxHQUZMO0FBQUE7QUFBQSw0QkFFVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQ29CQyxLQUFLLE1BQUwsZ0JBQWVYLE1BQWYsQ0FEcEI7O0FBQUE7QUFDR2Msc0JBREg7QUFFSGQsb0JBQU0scUJBQVFBLE1BQVIsRUFBbUJjLFFBQW5CLENBQU47QUFGRywrQ0FHSVQsVUFBUSxDQUFDTCxNQUFELENBSFo7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FGWDtBQUFBLEdBTGUsRUFhZixFQWJlLENBQXZCO0FBZ0JBQSxRQUFNLHFCQUNDaEMsS0FERCxFQUVDc0MsY0FGRDtBQUdGRCxZQUFRLEVBQUUsa0JBQUFTLFFBQVE7QUFBQSxhQUFJVCxVQUFRLENBQUNTLFFBQUQsQ0FBWjtBQUFBO0FBSGhCLElBQU47QUFLQSxTQUFPZCxNQUFQO0FBQ0gsQ0F2QkQ7O0FBeUJBLElBQU1lLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUEvQyxLQUFLLEVBQUk7QUFDdEIsTUFBTWdELFNBQVMsR0FBRyxTQUFaQSxTQUFZO0FBQUEsV0FBYVgsUUFBUSxNQUFSLG1CQUFiO0FBQUEsR0FBbEI7O0FBRHNCLGtCQUVJWSxzREFBUSxDQUFDYixTQUFTLENBQUNwQyxLQUFELEVBQVFnRCxTQUFSLENBQVYsQ0FGWjtBQUFBO0FBQUEsTUFFZnBCLEtBRmU7QUFBQSxNQUVSUyxRQUZROztBQUl0QixTQUNJLDJEQUFDLFlBQUQsQ0FBYyxRQUFkO0FBQXVCLFNBQUssRUFBRVQ7QUFBOUIsS0FDSSwyREFBQyxVQUFELFFBQWE1QixLQUFLLENBQUNtQyxRQUFuQixDQURKLENBREo7QUFLSCxDQVREOztlQVdlWSxRO0FBQUE7Ozs7Ozs7Ozs7OzswQkEzQ0ZqQixZOzBCQUdURSxNOzBCQUVFQyxVOzBCQUVBRyxTOzBCQXlCQVcsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQ047QUFDQTtBQUNBOztBQUVBLElBQU1HLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUFDLGVBQWU7QUFBQSxTQUFJLFVBQUFDLE9BQU8sRUFBSTtBQUM1QyxRQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFBckQsS0FBSztBQUFBLGFBQ25CLDJEQUFDLHlEQUFELENBQWMsUUFBZCxRQUNLLFVBQUFJLEtBQUssRUFBSTtBQUNOO0FBQ0EsWUFBTWtELE1BQU0sR0FDUkgsZUFBZSxJQUFJLE9BQU9BLGVBQVAsS0FBMkIsVUFBOUMscUJBRWFBLGVBQWUsQ0FBQy9DLEtBQUQsQ0FGNUI7QUFHVWlDLGtCQUFRLEVBQUVqQyxLQUFLLENBQUNtRDtBQUgxQixhQUtNbkQsS0FOVjtBQU9BLGVBQU8sMkRBQUMsT0FBRCxlQUFha0QsTUFBYixFQUF5QnRELEtBQXpCLEVBQVA7QUFDSCxPQVhMLENBRG1CO0FBQUEsS0FBdkI7O0FBZUF3RCxrRUFBbUIsQ0FBQ0gsU0FBRCxFQUFZRCxPQUFaLENBQW5CO0FBQ0EsV0FBT0MsU0FBUDtBQUNILEdBbEJnQztBQUFBLENBQWpDOztlQW9CZUgsUztBQUFBOztBQUVmLFNBQVN6QyxRQUFULENBQWtCMEMsZUFBbEIsRUFBbUM7QUFDL0IsTUFBTS9DLEtBQUssR0FBR3FELHdEQUFVLENBQUMzQix5REFBRCxDQUF4QjtBQUNBLE1BQU00QixXQUFXLEdBQ2JQLGVBQWUsSUFBSSxPQUFPQSxlQUFQLEtBQTJCLFVBQTlDLHFCQUVhQSxlQUFlLENBQUMvQyxLQUFELENBRjVCO0FBR1VpQyxZQUFRLEVBQUVqQyxLQUFLLENBQUNtRDtBQUgxQixPQUtNbkQsS0FOVjtBQU9BLFNBQU9zRCxXQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7OzswQkFsQ01SLFM7MEJBc0JHekMsUTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU2dCLGVBQVQsQ0FBeUJyQixLQUF6QixFQUFnQztBQUM1QixTQUFPO0FBQ0h1RCxVQUFNLEVBQUV2RCxLQUFLLENBQUN1RDtBQURYLEdBQVA7QUFHSDs7OztBQU1XLCtGOztBQUpaLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFBQSxrQkFDRG5ELDREQUFRLENBQUNnQixlQUFELENBRFA7QUFBQSxNQUNaa0MsTUFEWSxhQUNaQSxNQURZOztBQUVwQixTQUNJLDhIQUVJO0FBQVEsV0FBTyxFQUFFO0FBQUEsYUFBTUEsTUFBTSxFQUFaO0FBQUE7QUFBakIsY0FGSixDQURKO0FBTUgsQ0FSRDs7QUFVQUMsU0FBUyxDQUFDNUMsVUFBVixHQUF1QjtBQUNuQkssTUFBSSxFQUFFLFdBRGE7QUFFbkJ3QyxNQUFJLEVBQUUsWUFGYTtBQUduQkMsT0FBSyxFQUFFLElBSFk7QUFJbkI1QyxXQUFTLEVBQUU7QUFKUSxDQUF2QjtlQU9lMEMsUztBQUFBOzs7Ozs7Ozs7Ozs7MEJBdkJObkMsZTswQkFNSG1DLFM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVk47QUFDQTtBQUNBOztBQUVBLFNBQVNuQyxlQUFULENBQXlCckIsS0FBekIsRUFBZ0M7QUFDNUIsU0FBTztBQUNIc0IsaUJBQWEsRUFBRXRCLEtBQUssQ0FBQ3NCO0FBRGxCLEdBQVA7QUFHSDs7OztBQUlVLDJEQUFDLDJFQUFELE87O0FBRlgsSUFBTXFDLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFDZixNQUFNbkMsS0FBSyxHQUFHbkIsNERBQVEsQ0FBQ2dCLGVBQUQsQ0FBdEI7QUFDQTtBQUNILENBSEQ7O0FBS0FzQyxJQUFJLENBQUMvQyxVQUFMLEdBQWtCO0FBQ2RLLE1BQUksRUFBRSxNQURRO0FBRWR3QyxNQUFJLEVBQUUsR0FGUTtBQUdkQyxPQUFLLEVBQUUsSUFITztBQUlkNUMsV0FBUyxFQUFFO0FBSkcsQ0FBbEI7ZUFPZTZDLEk7QUFBQTs7Ozs7Ozs7Ozs7OzBCQWxCTnRDLGU7MEJBTUhzQyxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWTjtBQUNBO0FBQ0EsSUFBTW5ELEtBQUssR0FBRyxDQUFDbUQscURBQUQsRUFBT0gsK0RBQVAsQ0FBZDtlQUVlaEQsSztBQUFBOzs7Ozs7Ozs7Ozs7MEJBRlRBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRk47SUFFUW9ELFEsR0FBYUMsZ0QsQ0FBYkQsUTs7SUFFRkUsVzs7Ozs7Ozs7Ozs7OytDQUNpQkMsSTs7Ozs7Ozt1QkFDUUMsS0FBSyxDQUFDSixRQUFRLEdBQUcsUUFBWixFQUFzQjtBQUM5Q0ssd0JBQU0sRUFBRSxNQURzQztBQUU5Q0MseUJBQU8sRUFBRTtBQUNMLG9DQUFnQjtBQURYLG1CQUZxQztBQUs5Q0gsc0JBQUksRUFBRUksSUFBSSxDQUFDQyxTQUFMLENBQWVMLElBQWY7QUFMd0MsaUJBQXRCLEM7OztBQUF0Qk0sd0I7O3VCQVFPQSxRQUFRLENBQUNDLElBQVQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRWpCOzs7Ozs7Ozs7Ozs7O3VCQUVVTixLQUFLLENBQUNKLFFBQVEsR0FBRyxTQUFaLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUlKRSxXO0FBQUE7Ozs7Ozs7Ozs7OzswQkFwQlBGLFE7MEJBRUZFLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKTjtlQUVlO0FBQ1h4QyxlQUFhLEVBQUUsS0FESjtBQUVYaEIsT0FBSyxFQUFFLGVBQUFpRSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdDQUFJLGlCQUFNL0MsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUVIc0Msc0VBQVcsQ0FBQ3hELEtBQVosQ0FBa0JpRSxNQUFsQixDQUZHOztBQUFBO0FBQUEsbURBR0Y7QUFBRWpELGlDQUFhLEVBQUU7QUFBakIsbUJBSEU7O0FBQUE7QUFBQTtBQUFBO0FBQUEsbURBS0Y7QUFBRUEsaUNBQWEsRUFBRTtBQUFqQixtQkFMRTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFKOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUZGO0FBVVhpQyxRQUFNLEVBQUUsZ0JBQUFnQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdDQUFJLGtCQUFNL0MsS0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFDUnNDLHNFQUFXLENBQUNQLE1BQVosQ0FBbUJnQixNQUFuQixDQURROztBQUFBO0FBQUEsb0RBRVA7QUFBRWpELGlDQUFhLEVBQUU7QUFBakIsbUJBRk87O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFWSCxDO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGZjs7QUFFQSxJQUFNdEIsS0FBSyxxQkFBUXdFLGdEQUFSLENBQVg7O0FBRUEsSUFBTXZFLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUF3RSxZQUFZO0FBQUEsMkJBQVV6RSxLQUFWLEVBQW9CeUUsWUFBcEI7QUFBQSxDQUFoQzs7ZUFFZXpFLEs7QUFBQTtBQUVmOzs7Ozs7Ozs7Ozs7MEJBTk1BLEs7MEJBRUFDLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSk4sc0M7Ozs7Ozs7Ozs7O0FDQUEsK0Q7Ozs7Ozs7Ozs7O0FDQUEsOEQ7Ozs7Ozs7Ozs7O0FDQUEsOEQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7Ozs7O0FDQUEsK0Q7Ozs7Ozs7Ozs7O0FDQUEsc0U7Ozs7Ozs7Ozs7O0FDQUEsNkQ7Ozs7Ozs7Ozs7O0FDQUEsb0Q7Ozs7Ozs7Ozs7O0FDQUEscUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsa0Q7Ozs7Ozs7Ozs7O0FDQUEsMkM7Ozs7Ozs7Ozs7O0FDQUEsNkM7Ozs7Ozs7Ozs7O0FDQUEsd0QiLCJmaWxlIjoiYXBwLnNzci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiKTtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmsuaWQsIGNodW5rLm1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIuL1wiICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpO1xuIFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodXBkYXRlKTtcbiBcdH1cblxuIFx0Ly9lc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI0ZWNiZDYxZTE1Y2VmNWMxZTJjMlwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJhcHAuc3NyXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGhvdCB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXIvcm9vdCc7XHJcbmltcG9ydCBMb2FkYWJsZSBmcm9tICdyZWFjdC1sb2FkYWJsZSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnZGFyaWEtc3RvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyUm91dGVyLCBTdGF0aWNSb3V0ZXIsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICcuLy4uL3N0b3JlJztcclxuaW1wb3J0IEFwcFJvdXRlcyBmcm9tICdjb21wb25lbnRzL1JvdXRlcy9BcHBSb3V0ZXMuanMnO1xyXG5pbXBvcnQgcGFnZXMgZnJvbSAnLi8uLi9wYWdlcyc7XHJcblxyXG5jb25zdCBSb3V0ZXIgPSBfX0lTX0JST1dTRVJfXyA/IEJyb3dzZXJSb3V0ZXIgOiBTdGF0aWNSb3V0ZXI7XHJcblxyXG5jb25zdCBBcHAgPSBwcm9wcyA9PiB7XHJcbiAgICBjb25zdCBpbml0aWFsRGF0YSA9IHByb3BzLmluaXRpYWxEYXRhXHJcbiAgICAgICAgPyBwcm9wcy5pbml0aWFsRGF0YVxyXG4gICAgICAgIDogd2luZG93Ll9fSU5JVElBTF9EQVRBX187XHJcbiAgICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKGluaXRpYWxEYXRhKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxQcm92aWRlciB7Li4uc3RvcmV9PlxyXG4gICAgICAgICAgICA8Um91dGVyIGxvY2F0aW9uPXtwcm9wcy5sb2NhdGlvbn0gY29udGV4dD17e319PlxyXG4gICAgICAgICAgICAgICAgPEFwcFJvdXRlcyAvPlxyXG4gICAgICAgICAgICA8L1JvdXRlcj5cclxuICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgKTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgaG90KEFwcCk7XHJcblxyXG5leHBvcnQgeyBwYWdlcyB9O1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb3JtLCBUZXh0IH0gZnJvbSAnaW5mb3JtZWQnO1xyXG5pbXBvcnQgeyB1c2VTdG9yZSB9IGZyb20gJ2RhcmlhLXN0b3JlJztcclxuXHJcbmNvbnN0IExvZ2luRm9ybSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgbG9naW4gfSA9IHVzZVN0b3JlKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxGb3JtIGlkPVwiaW50cm8tZm9ybVwiIG9uU3VibWl0PXtsb2dpbn0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsYWJlbFwiIGh0bWxGb3I9XCJsb2dpbi11c2VybmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgVXNlcm5hbWU6XHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxUZXh0XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbnB1dFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICBmaWVsZD1cInVzZXJuYW1lXCJcclxuICAgICAgICAgICAgICAgIGlkPVwibG9naW4tdXNlcm5hbWVcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxcIiBodG1sRm9yPVwibG9naW4tcGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgIFBhc3N3b3JkOlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgZmllbGQ9XCJwYXNzd29yZFwiXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgaWQ9XCJsb2dpbi1wYXNzd29yZFwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiaW5wdXRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgICAgICBMb2dpblxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L0Zvcm0+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5Gb3JtO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHBhZ2VzIGZyb20gJy4vLi4vLi4vcGFnZXMnO1xyXG5pbXBvcnQgTG9nZ2VkT3V0Um91dGUgZnJvbSAnY29tcG9uZW50cy9Sb3V0ZXMvTG9nZ2VkT3V0Um91dGUuanMnO1xyXG5pbXBvcnQgUHJpdmF0ZVJvdXRlIGZyb20gJ2NvbXBvbmVudHMvUm91dGVzL1ByaXZhdGVSb3V0ZS5qcyc7XHJcblxyXG5jb25zdCBBcHBSb3V0ZXMgPSAoKSA9PiAoXHJcbiAgICA8U3dpdGNoPlxyXG4gICAgICAgIHtwYWdlcy5tYXAoUGFnZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IFBhZ2UucGFnZUNvbmZpZztcclxuICAgICAgICAgICAgY29uc3QgUm91dGUgPVxyXG4gICAgICAgICAgICAgICAgY2ZnLmF1dGhMZXZlbCA9PT0gJ3ByaXZhdGUnID8gUHJpdmF0ZVJvdXRlIDogTG9nZ2VkT3V0Um91dGU7XHJcbiAgICAgICAgICAgIHJldHVybiA8Um91dGUgey4uLmNmZ30gY29tcG9uZW50PXtQYWdlfSBrZXk9e2NmZy5uYW1lfSAvPjtcclxuICAgICAgICB9KX1cclxuICAgIDwvU3dpdGNoPlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwUm91dGVzO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBSb3V0ZSwgUmVkaXJlY3QgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcblxyXG5jb25zdCBMb2dnZWRPdXRSb3V0ZSA9ICh7IGNvbXBvbmVudDogQ29tcG9uZW50LCAuLi5yZXN0IH0pID0+IHtcclxuICAgIGNvbnN0IHsgYXV0aGVudGljYXRlZCB9ID0gdXNlU3RvcmUobWFwU3RhdGVUb1Byb3BzKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFJvdXRlXHJcbiAgICAgICAgICAgIHsuLi5yZXN0fVxyXG4gICAgICAgICAgICByZW5kZXI9e3Byb3BzID0+XHJcbiAgICAgICAgICAgICAgICAhYXV0aGVudGljYXRlZCA/IChcclxuICAgICAgICAgICAgICAgICAgICA8Q29tcG9uZW50IC8+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIDxSZWRpcmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bz17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiB7IGZyb206IHByb3BzLmxvY2F0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLz5cclxuICAgICk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RvcmUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYXV0aGVudGljYXRlZDogc3RvcmUuYXV0aGVudGljYXRlZFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VkT3V0Um91dGU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJvdXRlLCBSZWRpcmVjdCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyB1c2VTdG9yZSB9IGZyb20gJ2RhcmlhLXN0b3JlJztcclxuXHJcbmNvbnN0IExvZ2dlZE91dFJvdXRlID0gKHsgY29tcG9uZW50OiBDb21wb25lbnQsIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgY29uc3QgeyBhdXRoZW50aWNhdGVkIH0gPSB1c2VTdG9yZShtYXBTdGF0ZVRvUHJvcHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Um91dGVcclxuICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT5cclxuICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0ZWQgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPENvbXBvbmVudCAvPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICA8UmVkaXJlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG89e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiAnLycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogeyBmcm9tOiBwcm9wcy5sb2NhdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHN0b3JlLmF1dGhlbnRpY2F0ZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2dlZE91dFJvdXRlO1xyXG4iLCIvLyBzdG9yZS9Vc2VyUHJvdmlkZXIuanNcclxuaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlLCBtZW1vIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFN0b3JlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30pO1xyXG5cclxuLy8gV2UgbmVlZCBhIHJlZmVyZW5jZSB0byB0aGUgc3RhdGUgb3V0c2lkZSBvZiB0aGUgY29tcG9uZW50IHRvIGFjY2VzcyBpdCB3aXRoIGhldFN0YXRlKCkgb3RoZXJ3aXNlIHdlIGdldCB0aGUgdW4tbWVtb2l6ZWQgdmVyaXNvbiBvZiB0aGUgc3RhdGUgd2hpY2ggaXMgYW4gZW1wdHkgb2JqZWN0LlxyXG5sZXQgX3N0YXRlID0ge307XHJcblxyXG5jb25zdCBSZW5kZXJQdXJlID0gbWVtbygoeyBjaGlsZHJlbiB9KSA9PiBjaGlsZHJlbik7XHJcblxyXG5jb25zdCBtYWtlU3RvcmUgPSAocHJvcHMsIHNldFN0YXRlKSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZVVwZGF0ZUZucyA9IE9iamVjdC5lbnRyaWVzKHByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgKGFjYywgW2tleSwgdmFsdWVdKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgLi4uYWNjLFxyXG4gICAgICAgICAgICAgICAgW2tleV06IGFzeW5jICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSBhd2FpdCB2YWx1ZSguLi5hcmdzKShfc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9zdGF0ZSA9IHsgLi4uX3N0YXRlLCAuLi5uZXdTdGF0ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXRTdGF0ZShfc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAge31cclxuICAgICAgICApO1xyXG5cclxuICAgIF9zdGF0ZSA9IHtcclxuICAgICAgICAuLi5wcm9wcyxcclxuICAgICAgICAuLi5zdGF0ZVVwZGF0ZUZucyxcclxuICAgICAgICBzZXRTdGF0ZTogbmV3U3RhdGUgPT4gc2V0U3RhdGUobmV3U3RhdGUpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIF9zdGF0ZTtcclxufTtcclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gcHJvcHMgPT4ge1xyXG4gICAgY29uc3QgX3NldFN0YXRlID0gKC4uLmFyZ3MpID0+IHNldFN0YXRlKC4uLmFyZ3MpO1xyXG4gICAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShtYWtlU3RvcmUocHJvcHMsIF9zZXRTdGF0ZSkpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPFN0b3JlQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17c3RhdGV9PlxyXG4gICAgICAgICAgICA8UmVuZGVyUHVyZT57cHJvcHMuY2hpbGRyZW59PC9SZW5kZXJQdXJlPlxyXG4gICAgICAgIDwvU3RvcmVDb250ZXh0LlByb3ZpZGVyPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb3ZpZGVyO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgaG9pc3ROb25SZWFjdFN0YXRpYyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XHJcbmltcG9ydCB7IFN0b3JlQ29udGV4dCB9IGZyb20gJy4vUHJvdmlkZXIuanMnO1xyXG5cclxuY29uc3Qgc3Vic2NyaWJlID0gbWFwU3RvcmVUb1Byb3BzID0+IFdyYXBwZWQgPT4ge1xyXG4gICAgY29uc3QgU3Vic2NyaWJlID0gcHJvcHMgPT4gKFxyXG4gICAgICAgIDxTdG9yZUNvbnRleHQuQ29uc3VtZXI+XHJcbiAgICAgICAgICAgIHtzdG9yZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdG9yZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWQgPVxyXG4gICAgICAgICAgICAgICAgICAgIG1hcFN0b3JlVG9Qcm9wcyAmJiB0eXBlb2YgbWFwU3RvcmVUb1Byb3BzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5tYXBTdG9yZVRvUHJvcHMoc3RvcmUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGF0ZTogc3RvcmUuc2V0c3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc3RvcmU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPFdyYXBwZWQgey4uLm1hcHBlZH0gey4uLnByb3BzfSAvPjtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICA8L1N0b3JlQ29udGV4dC5Db25zdW1lcj5cclxuICAgICk7XHJcbiAgICBob2lzdE5vblJlYWN0U3RhdGljKFN1YnNjcmliZSwgV3JhcHBlZCk7XHJcbiAgICByZXR1cm4gU3Vic2NyaWJlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3Vic2NyaWJlO1xyXG5cclxuZnVuY3Rpb24gdXNlU3RvcmUobWFwU3RvcmVUb1Byb3BzKSB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHVzZUNvbnRleHQoU3RvcmVDb250ZXh0KTtcclxuICAgIGNvbnN0IG1hcHBlZFN0b3JlID1cclxuICAgICAgICBtYXBTdG9yZVRvUHJvcHMgJiYgdHlwZW9mIG1hcFN0b3JlVG9Qcm9wcyA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgICAgLi4ubWFwU3RvcmVUb1Byb3BzKHN0b3JlKSxcclxuICAgICAgICAgICAgICAgICAgc2V0U3RhdGU6IHN0b3JlLnNldHN0YXRlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA6IHN0b3JlO1xyXG4gICAgcmV0dXJuIG1hcHBlZFN0b3JlO1xyXG59XHJcblxyXG5leHBvcnQgeyB1c2VTdG9yZSB9O1xyXG4iLCJpbXBvcnQgUHJvdmlkZXIsIHsgU3RvcmVDb250ZXh0IH0gZnJvbSAnLi9Qcm92aWRlci5qcyc7XHJcbmltcG9ydCBzdWJzY3JpYmUsIHsgdXNlU3RvcmUgfSBmcm9tICcuL1N1YnNjcmliZS5qcyc7XHJcblxyXG5leHBvcnQgeyBQcm92aWRlciwgU3RvcmVDb250ZXh0LCBzdWJzY3JpYmUsIHVzZVN0b3JlIH07XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnZGFyaWEtc3RvcmUnO1xyXG5pbXBvcnQgTG9naW5Gb3JtIGZyb20gJ2NvbXBvbmVudHMvQXV0aC9Mb2dpbkZvcm0vTG9naW5Gb3JtJztcclxuXHJcbmZ1bmN0aW9uIG1hcFN0YXRlVG9Qcm9wcyhzdG9yZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2dvdXQ6IHN0b3JlLmxvZ291dFxyXG4gICAgfTtcclxufVxyXG5cclxuY29uc3QgRGFzaGJvYXJkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgeyBsb2dvdXQgfSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxkaXY+SSBhbSB0aGUgZGFzaGJvYXJkICE8L2Rpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBsb2dvdXQoKX0+bG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59O1xyXG5cclxuRGFzaGJvYXJkLnBhZ2VDb25maWcgPSB7XHJcbiAgICBuYW1lOiAnRGFzaGJvYXJkJyxcclxuICAgIHBhdGg6ICcvZGFzaGJvYXJkJyxcclxuICAgIGV4YWN0OiB0cnVlLFxyXG4gICAgYXV0aExldmVsOiAncHJpdmF0ZSdcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCBMb2dpbkZvcm0gZnJvbSAnY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0nO1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHN0b3JlLmF1dGhlbnRpY2F0ZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmNvbnN0IEhvbWUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICByZXR1cm4gPExvZ2luRm9ybSAvPjtcclxufTtcclxuXHJcbkhvbWUucGFnZUNvbmZpZyA9IHtcclxuICAgIG5hbWU6ICdIb21lJyxcclxuICAgIHBhdGg6ICcvJyxcclxuICAgIGV4YWN0OiB0cnVlLFxyXG4gICAgYXV0aExldmVsOiAncHVibGljJ1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcclxuIiwiaW1wb3J0IEhvbWUgZnJvbSAnLi9Ib21lL0hvbWUuanMnO1xyXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vRGFzaGJvYXJkL0Rhc2hib2FyZC5qcyc7XHJcbmNvbnN0IHBhZ2VzID0gW0hvbWUsIERhc2hib2FyZF07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlcztcclxuIiwiaW1wb3J0IGNvbnN0YW50cyBmcm9tICdjb25zdGFudHMnO1xyXG5cclxuY29uc3QgeyBBVVRIX1VSTCB9ID0gY29uc3RhbnRzO1xyXG5cclxuY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgc3RhdGljIGFzeW5jIGxvZ2luKGJvZHkpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFVVEhfVVJMICsgJy9sb2dpbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgIH1cclxuICAgIC8vQFRPRE8gc2hvdWxkIHByb2JhYmx5IGRvIG1vcmUgdGhhbiB0aGlzIGxvbFxyXG4gICAgc3RhdGljIGFzeW5jIGxvZ291dCgpIHtcclxuICAgICAgICBhd2FpdCBmZXRjaChBVVRIX1VSTCArICcvbG9nb3V0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGhTZXJ2aWNlO1xyXG4iLCJpbXBvcnQgQXV0aFNlcnZpY2UgZnJvbSAncmVzb3VyY2VzL3NlcnZpY2VzL0F1dGhTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGF1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgbG9naW46IHZhbHVlcyA9PiBhc3luYyBzdGF0ZSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgQXV0aFNlcnZpY2UubG9naW4odmFsdWVzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgYXV0aGVudGljYXRlZDogdHJ1ZSB9O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgYXV0aGVudGljYXRlZDogZmFsc2UgfTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgbG9nb3V0OiB2YWx1ZXMgPT4gYXN5bmMgc3RhdGUgPT4ge1xyXG4gICAgICAgIGF3YWl0IEF1dGhTZXJ2aWNlLmxvZ291dCh2YWx1ZXMpO1xyXG4gICAgICAgIHJldHVybiB7IGF1dGhlbnRpY2F0ZWQ6IGZhbHNlIH07XHJcbiAgICB9XHJcbn07XHJcbiIsImltcG9ydCBhdXRoIGZyb20gJy4vYXV0aC5qcyc7XG5cbmNvbnN0IHN0b3JlID0geyAuLi5hdXRoIH07XG5cbmNvbnN0IGNyZWF0ZVN0b3JlID0gaW5pdGlhbFN0b3JlID0+ICh7IC4uLnN0b3JlLCAuLi5pbml0aWFsU3RvcmUgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlO1xuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29uc3RhbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImluZm9ybWVkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhvdC1sb2FkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaG90LWxvYWRlci9yb290XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWxvYWRhYmxlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=