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
/******/ 	var hotCurrentHash = "7579a1f0fc871e085705";
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

  reactHotLoader.register(LoggedOutRoute, "LoggedOutRoute", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  reactHotLoader.register(mapStateToProps, "mapStateToProps", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\LoggedOutRoute.js");
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
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es6.function.name */ "core-js/modules/es6.function.name");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_8__);







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





var _ref4 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, "Loading page data...");

var Prefetcher = function Prefetcher(_ref) {
  var Component = _ref.component;
  var store = Object(daria_store__WEBPACK_IMPORTED_MODULE_7__["useStore"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_6__["useState"])(( false && false) === true),
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
              return Component.getInitialState(store);

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

  Object(react__WEBPACK_IMPORTED_MODULE_6__["useEffect"])(function () {
    if (store.needPrefetch) {
      console.log('%cPrefetcher: fetch data', 'color: magenta');
      fetchData();
    } else if (!store.needPrefetch) {
      console.log('%cPrefetcher: set needPrefetch to true', 'color: magenta');
      enablePrefetch();
    } else {
      console.log('%cPrefetcher: set fetching to true', 'color: magenta');
      setFetching(false);
    }
  }, []);
  return fetching ? _ref4 : react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, null);
};

var _default = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_8__["withRouter"])(Prefetcher);

/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").default;

  var leaveModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Prefetcher, "Prefetcher", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\Prefetcher.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\components\\Routes\\Prefetcher.js");
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
  console.log('%cmakeStore', 'color: lime');
  console.log(_state);
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
              console.log('%cstore.' + key + ', current state :', 'color: blue');
              console.log(_state);
              _context.next = 4;
              return value.apply(void 0, _args)(_state);

            case 4:
              newState = _context.sent;
              _state = _objectSpread({}, _state, newState);
              console.log('%cstore.' + key + ', current state :', 'color: blue');
              console.log(_state);
              return _context.abrupt("return", setState(_state));

            case 9:
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

  console.log('%cPROVIDER RENDER', 'color: red');

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
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var components_Auth_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Auth/LoginForm/LoginForm */ "./src/client/components/Auth/LoginForm/LoginForm.js");



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





function mapStateToProps(store) {
  return {
    logout: store.logout,
    getCurrentUser: store.getCurrentUser,
    currentUser: store.currentUser
  };
}

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Loading user data...");

var Dashboard = function Dashboard() {
  var _useStore = Object(daria_store__WEBPACK_IMPORTED_MODULE_3__["useStore"])(mapStateToProps),
      logout = _useStore.logout,
      currentUser = _useStore.currentUser,
      getCurrentUser = _useStore.getCurrentUser; // useEffect(() => {
  //     getCurrentUser();
  // }, []);


  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, !currentUser ? _ref : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Hello, ", currentUser.username, " !"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
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

Dashboard.getInitialState =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var getCurrentUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            getCurrentUser = _ref2.getCurrentUser;
            _context.next = 3;
            return getCurrentUser();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}();

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
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.promise */ "core-js/modules/es6.promise");
/* harmony import */ var core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var daria_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! daria-store */ "./src/client/components/Store/index.js");
/* harmony import */ var components_Auth_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/Auth/LoginForm/LoginForm */ "./src/client/components/Auth/LoginForm/LoginForm.js");
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utils */ "./src/client/resources/utils/index.js");



(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






function mapStateToProps(store) {
  return {
    authenticated: store.authenticated
  };
}

var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(components_Auth_LoginForm_LoginForm__WEBPACK_IMPORTED_MODULE_4__["default"], null);

var Home = function Home() {
  var state = Object(daria_store__WEBPACK_IMPORTED_MODULE_3__["useStore"])(mapStateToProps);
  return _ref;
};

Home.getInitialState = function () {};

Home.pageConfig = {
  name: 'Home',
  path: '/',
  exact: true,
  authLevel: 'public'
};
Home.getInitialState =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Object(utils__WEBPACK_IMPORTED_MODULE_5__["noop"])();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));
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

    if (!modelDef.id) {
      throw new Error('USerModel definition needs an id.');
    }

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

  reactHotLoader.register(UserModel, "UserModel", "c:\\websites\\PopNetwork\\src\\client\\resources\\models\\UserModel.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\resources\\models\\UserModel.js");
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

  reactHotLoader.register(AUTH_URL, "AUTH_URL", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  reactHotLoader.register(AuthService, "AuthService", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\AuthService.js");
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

  reactHotLoader.register(_w, "w", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\RESTService.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\resources\\services\\RESTService.js");
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

  reactHotLoader.register(get, "get", "c:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  reactHotLoader.register(set, "set", "c:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  reactHotLoader.register(remove, "remove", "c:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\resources\\utils\\localStorage.js");
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

  reactHotLoader.register(noop, "noop", "c:\\websites\\PopNetwork\\src\\client\\resources\\utils\\noop.js");
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
/* harmony import */ var _user_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.js */ "./src/client/store/user.js");




(function () {
  var enterModule = __webpack_require__(/*! react-hot-loader */ "react-hot-loader").enterModule;

  enterModule && enterModule(module);
})();

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var store = _objectSpread({}, _auth_js__WEBPACK_IMPORTED_MODULE_3__["default"], _user_js__WEBPACK_IMPORTED_MODULE_4__["default"], {
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

  reactHotLoader.register(store, "store", "c:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  reactHotLoader.register(createStore, "createStore", "c:\\websites\\PopNetwork\\src\\client\\store\\index.js");
  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\store\\index.js");
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
/* harmony import */ var utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils */ "./src/client/resources/utils/index.js");



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
          var id, user;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  id = utils__WEBPACK_IMPORTED_MODULE_3__["LocalStorage"].get('uid');
                  user = new models_UserModel__WEBPACK_IMPORTED_MODULE_2__["default"]({
                    id: id
                  });
                  _context.prev = 2;
                  _context.next = 5;
                  return user.get();

                case 5:
                  return _context.abrupt("return", {
                    currentUser: user
                  });

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](2);
                  console.log(_context.t0);
                  return _context.abrupt("return", {
                    currentUserError: _context.t0
                  });

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[2, 8]]);
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

  reactHotLoader.register(_default, "default", "c:\\websites\\PopNetwork\\src\\client\\store\\user.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZWZhdWx0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RlZmF1bHQvKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9BcHAuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0uanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9Sb3V0ZXMvQXBwUm91dGVzLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvUm91dGVzL0xvZ2dlZE91dFJvdXRlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvUm91dGVzL1ByZWZldGNoZXIuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9Sb3V0ZXMvUHJpdmF0ZVJvdXRlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L2NvbXBvbmVudHMvU3RvcmUvUHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9TdG9yZS9TdWJzY3JpYmUuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvY29tcG9uZW50cy9TdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9wYWdlcy9EYXNoYm9hcmQvRGFzaGJvYXJkLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3BhZ2VzL0hvbWUvSG9tZS5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9yZXNvdXJjZXMvbW9kZWxzL1VzZXJNb2RlbC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9yZXNvdXJjZXMvc2VydmljZXMvQXV0aFNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvcmVzb3VyY2VzL3NlcnZpY2VzL1JFU1RTZXJ2aWNlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3Jlc291cmNlcy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0Ly4vc3JjL2NsaWVudC9yZXNvdXJjZXMvdXRpbHMvbG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3Jlc291cmNlcy91dGlscy9ub29wLmpzIiwid2VicGFjazovL2RlZmF1bHQvLi9zcmMvY2xpZW50L3N0b3JlL2F1dGguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGVmYXVsdC8uL3NyYy9jbGllbnQvc3RvcmUvdXNlci5qcyIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29uc3RhbnRzXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3JcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwiY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnblwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy9lczYucHJvbWlzZVwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM2LnN5bWJvbFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJjb3JlLWpzL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImNvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImhvaXN0LW5vbi1yZWFjdC1zdGF0aWNzXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcImluZm9ybWVkXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlYWN0LWhvdC1sb2FkZXJcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwicmVhY3QtaG90LWxvYWRlci9yb290XCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlYWN0LWxvYWRhYmxlXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vZGVmYXVsdC9leHRlcm5hbCBcInNvdXJjZS1tYXAtc3VwcG9ydFwiIiwid2VicGFjazovL2RlZmF1bHQvZXh0ZXJuYWwgXCJ3cmV0Y2hcIiIsIndlYnBhY2s6Ly9kZWZhdWx0L2V4dGVybmFsIFwid3JldGNoLW1pZGRsZXdhcmVzXCIiXSwibmFtZXMiOlsicmVxdWlyZSIsImluc3RhbGwiLCJSb3V0ZXIiLCJfX0lTX0JST1dTRVJfXyIsIkJyb3dzZXJSb3V0ZXIiLCJTdGF0aWNSb3V0ZXIiLCJBcHAiLCJwcm9wcyIsImluaXRpYWxEYXRhIiwid2luZG93IiwiX19JTklUSUFMX0RBVEFfXyIsInN0b3JlIiwiY3JlYXRlU3RvcmUiLCJsb2NhdGlvbiIsImhvdCIsIkxvZ2luRm9ybSIsInVzZVN0b3JlIiwibG9naW4iLCJBcHBSb3V0ZXMiLCJwYWdlcyIsIm1hcCIsIlBhZ2UiLCJjZmciLCJwYWdlQ29uZmlnIiwiUm91dGUiLCJhdXRoTGV2ZWwiLCJQcml2YXRlUm91dGUiLCJMb2dnZWRPdXRSb3V0ZSIsIm5hbWUiLCJjb21wb25lbnQiLCJyZXN0IiwibWFwU3RhdGVUb1Byb3BzIiwiYXV0aGVudGljYXRlZCIsInBhdGhuYW1lIiwic3RhdGUiLCJmcm9tIiwiUHJlZmV0Y2hlciIsIkNvbXBvbmVudCIsInVzZVN0YXRlIiwiZmV0Y2hpbmciLCJzZXRGZXRjaGluZyIsImNvbnNvbGUiLCJsb2ciLCJuZWVkUHJlZmV0Y2giLCJmZXRjaERhdGEiLCJnZXRJbml0aWFsU3RhdGUiLCJlbmFibGVQcmVmZXRjaCIsInNldFN0YXRlIiwidXNlRWZmZWN0Iiwid2l0aFJvdXRlciIsIlN0b3JlQ29udGV4dCIsImNyZWF0ZUNvbnRleHQiLCJfc3RhdGUiLCJSZW5kZXJQdXJlIiwibWVtbyIsImNoaWxkcmVuIiwibWFrZVN0b3JlIiwic3RhdGVVcGRhdGVGbnMiLCJPYmplY3QiLCJlbnRyaWVzIiwiZmlsdGVyIiwia2V5IiwidmFsdWUiLCJyZWR1Y2UiLCJhY2MiLCJuZXdTdGF0ZSIsIlByb3ZpZGVyIiwiX3NldFN0YXRlIiwic3Vic2NyaWJlIiwibWFwU3RvcmVUb1Byb3BzIiwiV3JhcHBlZCIsIlN1YnNjcmliZSIsIm1hcHBlZCIsInNldHN0YXRlIiwiaG9pc3ROb25SZWFjdFN0YXRpYyIsInVzZUNvbnRleHQiLCJtYXBwZWRTdG9yZSIsImxvZ291dCIsImdldEN1cnJlbnRVc2VyIiwiY3VycmVudFVzZXIiLCJEYXNoYm9hcmQiLCJ1c2VybmFtZSIsInBhdGgiLCJleGFjdCIsIkhvbWUiLCJub29wIiwiVXNlck1vZGVsIiwibW9kZWxEZWYiLCJpZCIsIkVycm9yIiwiYXNzaWduIiwiQVBJIiwiZ2V0IiwiZGF0YSIsIkFVVEhfVVJMIiwiY29uc3RhbnRzIiwiQXV0aFNlcnZpY2UiLCJib2R5IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwidGV4dCIsInciLCJ3cmV0Y2giLCJBUElfVVJMIiwibWlkZGxld2FyZXMiLCJkZWR1cGUiLCJvcHRpb25zIiwiY3JlZGVudGlhbHMiLCJtb2RlIiwicmVzb2x2ZSIsInJlc29sdmVyIiwibm90Rm91bmQiLCJlcnJvciIsInJlcSIsInVuYXV0aG9yaXplZCIsImludGVybmFsRXJyb3IiLCJqc29uIiwidXJsIiwicGFyYW1zIiwicXVlcnkiLCJwb3N0IiwicHV0IiwiZGVsZXRlIiwiaXRlbSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZSIsImUiLCJzZXQiLCJzZXRJdGVtIiwicmVtb3ZlIiwicmVtb3ZlSXRlbSIsInZhbHVlcyIsIkxvY2FsU3RvcmFnZSIsInVuZGVmaW5lZCIsImF1dGgiLCJ1c2VyIiwiaW5pdGlhbFN0b3JlIiwiVXNlciIsImN1cnJlbnRVc2VyRXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUFBLG1EQUtQO0FBQUViLCtCQUFXLEVBQUU2RDtBQUFmLG1CQUxPOztBQUFBO0FBQUE7QUFBQTtBQU9kbkcseUJBQU8sQ0FBQ0MsR0FBUjtBQVBjLG1EQVFQO0FBQUVxRyxvQ0FBZ0I7QUFBbEIsbUJBUk87O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBTjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFETCxDO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIZixzQzs7Ozs7Ozs7Ozs7QUNBQSwrRDs7Ozs7Ozs7Ozs7QUNBQSw4RDs7Ozs7Ozs7Ozs7QUNBQSw4RDs7Ozs7Ozs7Ozs7QUNBQSw0RDs7Ozs7Ozs7Ozs7QUNBQSx3RDs7Ozs7Ozs7Ozs7QUNBQSx1RDs7Ozs7Ozs7Ozs7QUNBQSwrRDs7Ozs7Ozs7Ozs7QUNBQSxzRTs7Ozs7Ozs7Ozs7QUNBQSw2RDs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSxrRDs7Ozs7Ozs7Ozs7QUNBQSwyQzs7Ozs7Ozs7Ozs7QUNBQSw2Qzs7Ozs7Ozs7Ozs7QUNBQSx3RDs7Ozs7Ozs7Ozs7QUNBQSwrQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwrQyIsImZpbGUiOiJhcHAuc3NyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIGNodW5rID0gcmVxdWlyZShcIi4vXCIgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCIpO1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVuay5pZCwgY2h1bmsubW9kdWxlcyk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRNYW5pZmVzdCgpIHtcbiBcdFx0dHJ5IHtcbiBcdFx0XHR2YXIgdXBkYXRlID0gcmVxdWlyZShcIi4vXCIgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7XG4gXHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGUpO1xuIFx0fVxuXG4gXHQvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjc1NzlhMWYwZmM4NzFlMDg1NzA1XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImFwcC5zc3JcIjtcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbE1vZHVsZSkge1xuXHRpZiAoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdHZhciBtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsTW9kdWxlKTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgaG90IH0gZnJvbSAncmVhY3QtaG90LWxvYWRlci9yb290JztcclxuaW1wb3J0IExvYWRhYmxlIGZyb20gJ3JlYWN0LWxvYWRhYmxlJztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFN0YXRpY1JvdXRlciwgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJy4vLi4vc3RvcmUnO1xyXG5pbXBvcnQgQXBwUm91dGVzIGZyb20gJ2NvbXBvbmVudHMvUm91dGVzL0FwcFJvdXRlcy5qcyc7XHJcbmltcG9ydCBwYWdlcyBmcm9tICcuLy4uL3BhZ2VzJztcclxuXHJcbmlmICghX19JU19CUk9XU0VSX18pIHtcclxuICAgIHJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydCcpLmluc3RhbGwoKTtcclxufVxyXG5cclxuY29uc3QgUm91dGVyID0gX19JU19CUk9XU0VSX18gPyBCcm93c2VyUm91dGVyIDogU3RhdGljUm91dGVyO1xyXG5cclxuY29uc3QgQXBwID0gcHJvcHMgPT4ge1xyXG4gICAgY29uc3QgaW5pdGlhbERhdGEgPSBwcm9wcy5pbml0aWFsRGF0YVxyXG4gICAgICAgID8gcHJvcHMuaW5pdGlhbERhdGFcclxuICAgICAgICA6IHdpbmRvdy5fX0lOSVRJQUxfREFUQV9fO1xyXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShpbml0aWFsRGF0YSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8UHJvdmlkZXIgey4uLnN0b3JlfT5cclxuICAgICAgICAgICAgPFJvdXRlciBsb2NhdGlvbj17cHJvcHMubG9jYXRpb259IGNvbnRleHQ9e3t9fT5cclxuICAgICAgICAgICAgICAgIDxBcHBSb3V0ZXMgLz5cclxuICAgICAgICAgICAgPC9Sb3V0ZXI+XHJcbiAgICAgICAgPC9Qcm92aWRlcj5cclxuICAgICk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGhvdChBcHApO1xyXG5cclxuZXhwb3J0IHsgcGFnZXMgfTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9ybSwgVGV4dCB9IGZyb20gJ2luZm9ybWVkJztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcblxyXG5jb25zdCBMb2dpbkZvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGxvZ2luIH0gPSB1c2VTdG9yZSgpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Rm9ybSBpZD1cImludHJvLWZvcm1cIiBvblN1Ym1pdD17bG9naW59PlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGFiZWxcIiBodG1sRm9yPVwibG9naW4tdXNlcm5hbWVcIj5cclxuICAgICAgICAgICAgICAgIFVzZXJuYW1lOlxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8VGV4dFxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXRcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgZmllbGQ9XCJ1c2VybmFtZVwiXHJcbiAgICAgICAgICAgICAgICBpZD1cImxvZ2luLXVzZXJuYW1lXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxhYmVsXCIgaHRtbEZvcj1cImxvZ2luLXBhc3N3b3JkXCI+XHJcbiAgICAgICAgICAgICAgICBQYXNzd29yZDpcclxuICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPFRleHRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlucHV0XCJcclxuICAgICAgICAgICAgICAgIGZpZWxkPVwicGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCJcclxuICAgICAgICAgICAgICAgIGlkPVwibG9naW4tcGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImlucHV0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICAgICAgTG9naW5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9Gb3JtPlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2luRm9ybTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU3dpdGNoIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCBwYWdlcyBmcm9tICcuLy4uLy4uL3BhZ2VzJztcclxuaW1wb3J0IExvZ2dlZE91dFJvdXRlIGZyb20gJ2NvbXBvbmVudHMvUm91dGVzL0xvZ2dlZE91dFJvdXRlLmpzJztcclxuaW1wb3J0IFByaXZhdGVSb3V0ZSBmcm9tICdjb21wb25lbnRzL1JvdXRlcy9Qcml2YXRlUm91dGUuanMnO1xyXG5cclxuY29uc3QgQXBwUm91dGVzID0gKCkgPT4gKFxyXG4gICAgPFN3aXRjaD5cclxuICAgICAgICB7cGFnZXMubWFwKFBhZ2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjZmcgPSBQYWdlLnBhZ2VDb25maWc7XHJcbiAgICAgICAgICAgIGNvbnN0IFJvdXRlID1cclxuICAgICAgICAgICAgICAgIGNmZy5hdXRoTGV2ZWwgPT09ICdwcml2YXRlJyA/IFByaXZhdGVSb3V0ZSA6IExvZ2dlZE91dFJvdXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gPFJvdXRlIHsuLi5jZmd9IGNvbXBvbmVudD17UGFnZX0ga2V5PXtjZmcubmFtZX0gLz47XHJcbiAgICAgICAgfSl9XHJcbiAgICA8L1N3aXRjaD5cclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcFJvdXRlcztcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGUsIFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnZGFyaWEtc3RvcmUnO1xyXG5pbXBvcnQgUHJlZmV0Y2hlciBmcm9tICcuL1ByZWZldGNoZXIuanMnO1xyXG5cclxuY29uc3QgTG9nZ2VkT3V0Um91dGUgPSAoeyBjb21wb25lbnQsIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgY29uc3QgeyBhdXRoZW50aWNhdGVkIH0gPSB1c2VTdG9yZShtYXBTdGF0ZVRvUHJvcHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Um91dGVcclxuICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT5cclxuICAgICAgICAgICAgICAgICFhdXRoZW50aWNhdGVkID8gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxQcmVmZXRjaGVyIGNvbXBvbmVudD17Y29tcG9uZW50fSAvPlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgICA8UmVkaXJlY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG89e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiAnL2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZTogeyBmcm9tOiBwcm9wcy5sb2NhdGlvbiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIC8+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHN0b3JlLmF1dGhlbnRpY2F0ZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2dlZE91dFJvdXRlO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuXHJcbmNvbnN0IFByZWZldGNoZXIgPSAoeyBjb21wb25lbnQ6IENvbXBvbmVudCB9KSA9PiB7XHJcbiAgICBjb25zdCBzdG9yZSA9IHVzZVN0b3JlKCk7XHJcbiAgICBjb25zdCBbZmV0Y2hpbmcsIHNldEZldGNoaW5nXSA9IHVzZVN0YXRlKFxyXG4gICAgICAgIChfX0lTX0JST1dTRVJfXyAmJiBzdG9yZS5uZWVkUHJlZmV0Y2gpID09PSB0cnVlXHJcbiAgICApO1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYCR7XHJcbiAgICAgICAgICAgIENvbXBvbmVudC5wYWdlQ29uZmlnLm5hbWVcclxuICAgICAgICB9IHwgRkVUQ0hJTkcgOiAke2ZldGNoaW5nfSwgTkVFRCBQUkVGRVRDSCA6JHtzdG9yZS5uZWVkUHJlZmV0Y2h9YFxyXG4gICAgKTtcclxuICAgIC8vIHVzZUVmZmVjdCBkb2VzbnQgc3VwcG9ydCB1c2VFZmZlY3QoYXN5bmMoKSA9PiB7Li4ufSwgW10pXHJcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgYXdhaXQgQ29tcG9uZW50LmdldEluaXRpYWxTdGF0ZShzdG9yZSk7XHJcbiAgICAgICAgc2V0RmV0Y2hpbmcoZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBlbmFibGVQcmVmZXRjaCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCBzdG9yZS5zZXRTdGF0ZSh7IG5lZWRQcmVmZXRjaDogdHJ1ZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoc3RvcmUubmVlZFByZWZldGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCclY1ByZWZldGNoZXI6IGZldGNoIGRhdGEnLCAnY29sb3I6IG1hZ2VudGEnKTtcclxuICAgICAgICAgICAgZmV0Y2hEYXRhKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghc3RvcmUubmVlZFByZWZldGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgICAgICAgJyVjUHJlZmV0Y2hlcjogc2V0IG5lZWRQcmVmZXRjaCB0byB0cnVlJyxcclxuICAgICAgICAgICAgICAgICdjb2xvcjogbWFnZW50YSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZW5hYmxlUHJlZmV0Y2goKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnJWNQcmVmZXRjaGVyOiBzZXQgZmV0Y2hpbmcgdG8gdHJ1ZScsICdjb2xvcjogbWFnZW50YScpO1xyXG4gICAgICAgICAgICBzZXRGZXRjaGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIHJldHVybiBmZXRjaGluZyA/IDxkaXY+TG9hZGluZyBwYWdlIGRhdGEuLi48L2Rpdj4gOiA8Q29tcG9uZW50IC8+O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihQcmVmZXRjaGVyKTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm91dGUsIFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcbmltcG9ydCB7IHVzZVN0b3JlIH0gZnJvbSAnZGFyaWEtc3RvcmUnO1xyXG5pbXBvcnQgUHJlZmV0Y2hlciBmcm9tICcuL1ByZWZldGNoZXIuanMnO1xyXG5cclxuY29uc3QgTG9nZ2VkT3V0Um91dGUgPSAoeyBjb21wb25lbnQsIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgY29uc3QgeyBhdXRoZW50aWNhdGVkIH0gPSB1c2VTdG9yZShtYXBTdGF0ZVRvUHJvcHMpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8Um91dGVcclxuICAgICAgICAgICAgey4uLnJlc3R9XHJcbiAgICAgICAgICAgIHJlbmRlcj17cHJvcHMgPT5cclxuICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0ZWQgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPFByZWZldGNoZXIgY29tcG9uZW50PXtjb21wb25lbnR9IC8+XHJcbiAgICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgICAgIDxSZWRpcmVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0bz17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6ICcvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlOiB7IGZyb206IHByb3BzLmxvY2F0aW9uIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgLz5cclxuICAgICk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RvcmUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYXV0aGVudGljYXRlZDogc3RvcmUuYXV0aGVudGljYXRlZFxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTG9nZ2VkT3V0Um91dGU7XHJcbiIsIi8vIHN0b3JlL1VzZXJQcm92aWRlci5qc1xyXG5pbXBvcnQgUmVhY3QsIHsgY3JlYXRlQ29udGV4dCwgdXNlU3RhdGUsIG1lbW8gfSBmcm9tICdyZWFjdCc7XHJcblxyXG5leHBvcnQgY29uc3QgU3RvcmVDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7fSk7XHJcblxyXG4vLyBXZSBuZWVkIGEgcmVmZXJlbmNlIHRvIHRoZSBzdGF0ZSBvdXRzaWRlIG9mIHRoZSBjb21wb25lbnQgdG8gYWNjZXNzIGl0IHdpdGggaGV0U3RhdGUoKSBvdGhlcndpc2Ugd2UgZ2V0IHRoZSB1bi1tZW1vaXplZCB2ZXJpc29uIG9mIHRoZSBzdGF0ZSB3aGljaCBpcyBhbiBlbXB0eSBvYmplY3QuXHJcbmxldCBfc3RhdGU7XHJcblxyXG5jb25zdCBSZW5kZXJQdXJlID0gbWVtbygoeyBjaGlsZHJlbiB9KSA9PiBjaGlsZHJlbik7XHJcblxyXG5jb25zdCBtYWtlU3RvcmUgPSAocHJvcHMsIHNldFN0YXRlKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnJWNtYWtlU3RvcmUnLCAnY29sb3I6IGxpbWUnKTtcclxuICAgIGNvbnNvbGUubG9nKF9zdGF0ZSk7XHJcbiAgICBjb25zdCBzdGF0ZVVwZGF0ZUZucyA9IE9iamVjdC5lbnRyaWVzKHByb3BzKVxyXG4gICAgICAgIC5maWx0ZXIoKFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnJlZHVjZShcclxuICAgICAgICAgICAgKGFjYywgW2tleSwgdmFsdWVdKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgLi4uYWNjLFxyXG4gICAgICAgICAgICAgICAgW2tleV06IGFzeW5jICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICclY3N0b3JlLicgKyBrZXkgKyAnLCBjdXJyZW50IHN0YXRlIDonLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnY29sb3I6IGJsdWUnXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gYXdhaXQgdmFsdWUoLi4uYXJncykoX3N0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBfc3RhdGUgPSB7IC4uLl9zdGF0ZSwgLi4ubmV3U3RhdGUgfTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyVjc3RvcmUuJyArIGtleSArICcsIGN1cnJlbnQgc3RhdGUgOicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb2xvcjogYmx1ZSdcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF9zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFN0YXRlKF9zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB7fVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgaWYgKCFfc3RhdGUpIHtcclxuICAgICAgICBfc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIC4uLnByb3BzLFxyXG4gICAgICAgICAgICAuLi5zdGF0ZVVwZGF0ZUZuc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIF9zdGF0ZTtcclxufTtcclxuXHJcbmNvbnN0IFByb3ZpZGVyID0gKHsgY2hpbGRyZW4sIC4uLnByb3BzIH0pID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCclY1BST1ZJREVSIFJFTkRFUicsICdjb2xvcjogcmVkJyk7XHJcbiAgICBjb25zdCBfc2V0U3RhdGUgPSAoLi4uYXJncykgPT4gc2V0U3RhdGUoLi4uYXJncyk7XHJcbiAgICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKG1ha2VTdG9yZShwcm9wcywgX3NldFN0YXRlKSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8U3RvcmVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtzdGF0ZX0+XHJcbiAgICAgICAgICAgIDxSZW5kZXJQdXJlPntjaGlsZHJlbn08L1JlbmRlclB1cmU+XHJcbiAgICAgICAgPC9TdG9yZUNvbnRleHQuUHJvdmlkZXI+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUHJvdmlkZXI7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBob2lzdE5vblJlYWN0U3RhdGljIGZyb20gJ2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzJztcclxuaW1wb3J0IHsgU3RvcmVDb250ZXh0IH0gZnJvbSAnLi9Qcm92aWRlci5qcyc7XHJcblxyXG5jb25zdCBzdWJzY3JpYmUgPSBtYXBTdG9yZVRvUHJvcHMgPT4gV3JhcHBlZCA9PiB7XHJcbiAgICBjb25zdCBTdWJzY3JpYmUgPSBwcm9wcyA9PiAoXHJcbiAgICAgICAgPFN0b3JlQ29udGV4dC5Db25zdW1lcj5cclxuICAgICAgICAgICAge3N0b3JlID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHN0b3JlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwU3RvcmVUb1Byb3BzICYmIHR5cGVvZiBtYXBTdG9yZVRvUHJvcHMgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLm1hcFN0b3JlVG9Qcm9wcyhzdG9yZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFN0YXRlOiBzdG9yZS5zZXRzdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzdG9yZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8V3JhcHBlZCB7Li4ubWFwcGVkfSB7Li4ucHJvcHN9IC8+O1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgIDwvU3RvcmVDb250ZXh0LkNvbnN1bWVyPlxyXG4gICAgKTtcclxuICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWMoU3Vic2NyaWJlLCBXcmFwcGVkKTtcclxuICAgIHJldHVybiBTdWJzY3JpYmU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdWJzY3JpYmU7XHJcblxyXG5mdW5jdGlvbiB1c2VTdG9yZShtYXBTdG9yZVRvUHJvcHMpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gdXNlQ29udGV4dChTdG9yZUNvbnRleHQpO1xyXG4gICAgY29uc3QgbWFwcGVkU3RvcmUgPVxyXG4gICAgICAgIG1hcFN0b3JlVG9Qcm9wcyAmJiB0eXBlb2YgbWFwU3RvcmVUb1Byb3BzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgICAuLi5tYXBTdG9yZVRvUHJvcHMoc3RvcmUpLFxyXG4gICAgICAgICAgICAgICAgICBzZXRTdGF0ZTogc3RvcmUuc2V0c3RhdGVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDogc3RvcmU7XHJcbiAgICByZXR1cm4gbWFwcGVkU3RvcmU7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHVzZVN0b3JlIH07XHJcbiIsImltcG9ydCBQcm92aWRlciwgeyBTdG9yZUNvbnRleHQgfSBmcm9tICcuL1Byb3ZpZGVyLmpzJztcclxuaW1wb3J0IHN1YnNjcmliZSwgeyB1c2VTdG9yZSB9IGZyb20gJy4vU3Vic2NyaWJlLmpzJztcclxuXHJcbmV4cG9ydCB7IFByb3ZpZGVyLCBTdG9yZUNvbnRleHQsIHN1YnNjcmliZSwgdXNlU3RvcmUgfTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCBMb2dpbkZvcm0gZnJvbSAnY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0nO1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvZ291dDogc3RvcmUubG9nb3V0LFxyXG4gICAgICAgIGdldEN1cnJlbnRVc2VyOiBzdG9yZS5nZXRDdXJyZW50VXNlcixcclxuICAgICAgICBjdXJyZW50VXNlcjogc3RvcmUuY3VycmVudFVzZXJcclxuICAgIH07XHJcbn1cclxuXHJcbmNvbnN0IERhc2hib2FyZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgbG9nb3V0LCBjdXJyZW50VXNlciwgZ2V0Q3VycmVudFVzZXIgfSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICAvLyB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gICAgIGdldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAvLyB9LCBbXSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIHshY3VycmVudFVzZXIgPyAoXHJcbiAgICAgICAgICAgICAgICA8cD5Mb2FkaW5nIHVzZXIgZGF0YS4uLjwvcD5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxwPkhlbGxvLCB7Y3VycmVudFVzZXIudXNlcm5hbWV9ICE8L3A+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gbG9nb3V0KCl9PmxvZ291dDwvYnV0dG9uPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKTtcclxufTtcclxuXHJcbkRhc2hib2FyZC5wYWdlQ29uZmlnID0ge1xyXG4gICAgbmFtZTogJ0Rhc2hib2FyZCcsXHJcbiAgICBwYXRoOiAnL2Rhc2hib2FyZCcsXHJcbiAgICBleGFjdDogdHJ1ZSxcclxuICAgIGF1dGhMZXZlbDogJ3ByaXZhdGUnXHJcbn07XHJcblxyXG5EYXNoYm9hcmQuZ2V0SW5pdGlhbFN0YXRlID0gYXN5bmMgKHsgZ2V0Q3VycmVudFVzZXIgfSkgPT4ge1xyXG4gICAgYXdhaXQgZ2V0Q3VycmVudFVzZXIoKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU3RvcmUgfSBmcm9tICdkYXJpYS1zdG9yZSc7XHJcbmltcG9ydCBMb2dpbkZvcm0gZnJvbSAnY29tcG9uZW50cy9BdXRoL0xvZ2luRm9ybS9Mb2dpbkZvcm0nO1xyXG5pbXBvcnQgeyBub29wIH0gZnJvbSAndXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gbWFwU3RhdGVUb1Byb3BzKHN0b3JlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGF1dGhlbnRpY2F0ZWQ6IHN0b3JlLmF1dGhlbnRpY2F0ZWRcclxuICAgIH07XHJcbn1cclxuXHJcbmNvbnN0IEhvbWUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHVzZVN0b3JlKG1hcFN0YXRlVG9Qcm9wcyk7XHJcbiAgICByZXR1cm4gPExvZ2luRm9ybSAvPjtcclxufTtcclxuXHJcbkhvbWUuZ2V0SW5pdGlhbFN0YXRlID0gKCkgPT4ge307XHJcblxyXG5Ib21lLnBhZ2VDb25maWcgPSB7XHJcbiAgICBuYW1lOiAnSG9tZScsXHJcbiAgICBwYXRoOiAnLycsXHJcbiAgICBleGFjdDogdHJ1ZSxcclxuICAgIGF1dGhMZXZlbDogJ3B1YmxpYydcclxufTtcclxuXHJcbkhvbWUuZ2V0SW5pdGlhbFN0YXRlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbm9vcCgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcclxuIiwiaW1wb3J0IEhvbWUgZnJvbSAnLi9Ib21lL0hvbWUuanMnO1xyXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gJy4vRGFzaGJvYXJkL0Rhc2hib2FyZC5qcyc7XHJcbmNvbnN0IHBhZ2VzID0gW0hvbWUsIERhc2hib2FyZF07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwYWdlcztcclxuIiwiaW1wb3J0IEFQSSBmcm9tICdzZXJ2aWNlcy9SRVNUU2VydmljZS5qcyc7XHJcblxyXG5jbGFzcyBVc2VyTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IobW9kZWxEZWYpIHtcclxuICAgICAgICBpZiAoIW1vZGVsRGVmLmlkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVVNlck1vZGVsIGRlZmluaXRpb24gbmVlZHMgYW4gaWQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyAuLi5tb2RlbERlZiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXQoKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IEFQSS5nZXQoYC91c2Vycy8ke3RoaXMuaWR9YCk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IC4uLmRhdGEgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJNb2RlbDtcclxuIiwiaW1wb3J0IGNvbnN0YW50cyBmcm9tICdjb25zdGFudHMnO1xyXG5cclxuY29uc3QgeyBBVVRIX1VSTCB9ID0gY29uc3RhbnRzO1xyXG5cclxuY2xhc3MgQXV0aFNlcnZpY2Uge1xyXG4gICAgc3RhdGljIGFzeW5jIGxvZ2luKGJvZHkpIHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEFVVEhfVVJMICsgJy9sb2dpbicsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgIH1cclxuICAgIC8vQFRPRE8gc2hvdWxkIHByb2JhYmx5IGRvIG1vcmUgdGhhbiB0aGlzIGxvbFxyXG4gICAgc3RhdGljIGFzeW5jIGxvZ291dCgpIHtcclxuICAgICAgICBhd2FpdCBmZXRjaChBVVRIX1VSTCArICcvbG9nb3V0Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGhTZXJ2aWNlO1xyXG4iLCJpbXBvcnQgd3JldGNoIGZyb20gJ3dyZXRjaCc7XHJcbmltcG9ydCB7IGRlZHVwZSB9IGZyb20gJ3dyZXRjaC1taWRkbGV3YXJlcyc7XHJcbmltcG9ydCBjb25zdGFudHMgZnJvbSAnY29uc3RhbnRzJztcclxuXHJcbmNvbnN0IHcgPSB3cmV0Y2goY29uc3RhbnRzLkFQSV9VUkwpXHJcbiAgICAubWlkZGxld2FyZXMoW2RlZHVwZSgpXSlcclxuICAgIC5vcHRpb25zKHsgY3JlZGVudGlhbHM6ICdpbmNsdWRlJywgbW9kZTogJ2NvcnMnIH0pXHJcbiAgICAucmVzb2x2ZShyZXNvbHZlciA9PlxyXG4gICAgICAgIHJlc29sdmVyXHJcbiAgICAgICAgICAgIC5ub3RGb3VuZChhc3luYyAoZXJyb3IsIHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ET1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IDQwNCB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudW5hdXRob3JpemVkKGFzeW5jIChlcnJvciwgcmVxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPXHJcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IDQwMSB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuaW50ZXJuYWxFcnJvcihhc3luYyAoZXJyb3IsIHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IDUwMCB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuanNvbihqc29uID0+IGpzb24pXHJcbiAgICApO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgdzogKCkgPT4gdyxcclxuICAgIGdldDogKHVybCwgcGFyYW1zKSA9PlxyXG4gICAgICAgIHdcclxuICAgICAgICAgICAgLnVybCh1cmwpXHJcbiAgICAgICAgICAgIC5xdWVyeShwYXJhbXMpXHJcbiAgICAgICAgICAgIC5nZXQoKSxcclxuICAgIHBvc3Q6ICh1cmwsIGJvZHkpID0+IHtcclxuICAgICAgICByZXR1cm4gd1xyXG4gICAgICAgICAgICAudXJsKHVybClcclxuICAgICAgICAgICAgLmpzb24oYm9keSlcclxuICAgICAgICAgICAgLnBvc3QoKTtcclxuICAgIH0sXHJcbiAgICBwdXQ6ICh1cmwsIGJvZHkpID0+XHJcbiAgICAgICAgd1xyXG4gICAgICAgICAgICAudXJsKHVybClcclxuICAgICAgICAgICAgLmpzb24oYm9keSlcclxuICAgICAgICAgICAgLnB1dCgpLFxyXG4gICAgZGVsZXRlOiB1cmwgPT4gdy51cmwodXJsKS5kZWxldGUoKVxyXG59O1xyXG4iLCJpbXBvcnQgbm9vcCBmcm9tICcuL25vb3AuanMnO1xyXG5pbXBvcnQgTG9jYWxTdG9yYWdlIGZyb20gJy4vbG9jYWxTdG9yYWdlLmpzJztcclxuXHJcbmV4cG9ydCB7IG5vb3AsIExvY2FsU3RvcmFnZSB9O1xyXG4iLCJmdW5jdGlvbiBnZXQoa2V5KSB7XHJcbiAgICBjb25zdCBpdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldChrZXksIGRhdGEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwganNvbik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZ2V0LFxyXG4gICAgc2V0LFxyXG4gICAgcmVtb3ZlXHJcbn07XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vb3AoKSB7XHJcbiAgICByZXR1cm4gdm9pZCAwO1xyXG59XHJcbiIsImltcG9ydCBBdXRoU2VydmljZSBmcm9tICdyZXNvdXJjZXMvc2VydmljZXMvQXV0aFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICd1dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBhdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuICAgIGxvZ2luOiB2YWx1ZXMgPT4gYXN5bmMgc3RhdGUgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gYXdhaXQgQXV0aFNlcnZpY2UubG9naW4odmFsdWVzKTtcclxuICAgICAgICAgICAgTG9jYWxTdG9yYWdlLnNldCgndWlkJywgaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBhdXRoZW50aWNhdGVkOiB0cnVlIH07XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4geyBhdXRoZW50aWNhdGVkOiBmYWxzZSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsb2dvdXQ6IHZhbHVlcyA9PiBhc3luYyBzdGF0ZSA9PiB7XHJcbiAgICAgICAgYXdhaXQgQXV0aFNlcnZpY2UubG9nb3V0KHZhbHVlcyk7XHJcbiAgICAgICAgcmV0dXJuIHsgYXV0aGVudGljYXRlZDogZmFsc2UsIGN1cnJlbnRVc2VyOiB1bmRlZmluZWQgfTtcclxuICAgIH1cclxufTtcclxuIiwiaW1wb3J0IGF1dGggZnJvbSAnLi9hdXRoLmpzJztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlci5qcyc7XG5cbmNvbnN0IHN0b3JlID0ge1xuICAgIC4uLmF1dGgsXG4gICAgLi4udXNlcixcbiAgICAvLyBARklYTUUgdGhpcyBzaG91bGQgYmUgY3JlYXRlZCBpbiB0aGUgUHJvdmlkZXIgY29tcG9uZW50IGJ1dCBpdCBoYXMgc29tZSB3ZWlyZCBidWdzXG4gICAgc2V0U3RhdGU6IG5ld1N0YXRlID0+IHN0YXRlID0+ICh7IC4uLm5ld1N0YXRlIH0pXG59O1xuXG5jb25zdCBjcmVhdGVTdG9yZSA9IGluaXRpYWxTdG9yZSA9PiAoeyAuLi5zdG9yZSwgLi4uaW5pdGlhbFN0b3JlIH0pO1xuXG5leHBvcnQgZGVmYXVsdCBzdG9yZTtcblxuZXhwb3J0IHsgY3JlYXRlU3RvcmUgfTtcbiIsImltcG9ydCBVc2VyIGZyb20gJ21vZGVscy9Vc2VyTW9kZWwnO1xyXG5pbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tICd1dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBnZXRDdXJyZW50VXNlcjogKCkgPT4gYXN5bmMgc3RhdGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gTG9jYWxTdG9yYWdlLmdldCgndWlkJyk7XHJcbiAgICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHsgaWQgfSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgdXNlci5nZXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgY3VycmVudFVzZXI6IHVzZXIgfTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgICAgICByZXR1cm4geyBjdXJyZW50VXNlckVycm9yOiBlIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb25zdGFudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JlLWpzL21vZHVsZXMvZXM2LmZ1bmN0aW9uLm5hbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmtleXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczYuc3ltYm9sXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvcmUtanMvbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW5mb3JtZWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaG90LWxvYWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1ob3QtbG9hZGVyL3Jvb3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtbG9hZGFibGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic291cmNlLW1hcC1zdXBwb3J0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndyZXRjaFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3cmV0Y2gtbWlkZGxld2FyZXNcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==