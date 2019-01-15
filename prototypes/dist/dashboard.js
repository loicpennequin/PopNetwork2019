/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "02e3cce44bb6202133ab";
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
/******/ 			var chunkId = "dashboard";
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./prototypes/dashboard/index.js")(__webpack_require__.s = "./prototypes/dashboard/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-hot-loader/hotModuleReplacement.js":
/*!*************************************************************!*\
  !*** ./node_modules/css-hot-loader/hotModuleReplacement.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var normalizeUrl = __webpack_require__(/*! normalize-url */ "./node_modules/normalize-url/index.js");
var srcByModuleId = Object.create(null);
var debounce = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");

var noDocument = typeof document === 'undefined';
var forEach = Array.prototype.forEach;

var noop = function () {};

var getCurrentScriptUrl = function(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  return function(fileMap) {
    var splitResult = /([^\\/]+)\.js$/.exec(src);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace('.js', '.css')];
    }
    return fileMap.split(',').map(function(mapRule) {
      var reg = new RegExp(filename + '\\.js$', 'g')
      return normalizeUrl(src.replace(reg, mapRule.replace(/{fileName}/g, filename) + '.css'), { stripWWW: false });
    });
  };
};

function updateCss(el, url) {
  if (!url) {
    url = el.href.split('?')[0];
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf('.css') > -1)) return;

  el.visited = true;
  var newEl = el.cloneNode();

  newEl.isLoaded = false;
  newEl.addEventListener('load', function () {
    newEl.isLoaded = true;
    el.remove();
  });
  newEl.addEventListener('error', function () {
    newEl.isLoaded = true;
    el.remove();
  });

  newEl.href = url + '?' + Date.now();
  // insert new <link /> right to the old one's position
  el.parentNode.insertBefore(newEl, el.nextSibling);
}

function reloadStyle(src) {
  var elements = document.querySelectorAll('link');
  var loaded = false;

  forEach.call(elements, function(el) {
    if (el.visited === true) return;

    var url = getReloadUrl(el.href, src);
    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });

  return loaded;
}

function getReloadUrl(href, src) {
  href = normalizeUrl(href, { stripWWW: false });
  var ret;
  src.some(function(url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  forEach.call(elements, function(el) {
    if (el.visited === true) return;
    updateCss(el);
  });
}

module.exports = function(moduleId, options) {
  var getScriptSrc;

  if (noDocument) {
    return noop;
  }

  getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.fileMap);
    var reloaded = reloadStyle(src);
    if (reloaded && !options.reloadAll) {
      console.log('[HMR] css reload %s', src.join(' '));
    } else {
      console.log('[HMR] Reload all css');
      reloadAll();
    }
  }

  return debounce(update, 10);
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./prototypes/dashboard/dashboard.sass":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-2!./node_modules/sass-loader/lib/loader.js!./prototypes/dashboard/dashboard.sass ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ":root {\n  --color-primary: #383f47;\n  --color-primary-dark: #22262b;\n  --color-primary-darker: black;\n  --color-primary-light: #4f5864;\n  --color-primary-lighter: #707d8f;\n  --color-primary-half: rgba(56, 63, 71, 0.5);\n  --color-secondary: #2bb0ee;\n  --color-secondary-dark: #1197d4;\n  --color-secondary-darker: #0b648e;\n  --color-secondary-light: #5ac2f2;\n  --color-secondary-lighter: #a1dcf7;\n  --color-secondary-half: rgba(43, 176, 238, 0.5);\n  --color-black: #0d0d0d;\n  --color-dark: #4d4d4d;\n  --color-light: #f2f2f2;\n  --color-white: white;\n  --color-info: #2bb0ee;\n  --color-success: #55c359;\n  --color-warning: #f5b656;\n  --color-danger: #e73e32;\n  --color-text: #4d4d4d;\n  --color-title: #0d0d0d;\n  --color-subtitle: #4d4d4d;\n  --color-link: #383f47;\n  --color-link-hovered: #22262b;\n  --color-link-visited: #383f47;\n  --color-foreground: white;\n  --color-background: #eceef8; }\n\n:root {\n  --font-primary: Roboto, Helvetica, arial, sans-serif;\n  --font-title: Roboto, Helvetica, arial, cursive;\n  --font-serif: Roboto, Garamond, Georgia, Times New Roman, serif;\n  --font-monospace: Roboto Mono, monospace;\n  --text-scale-ratio: 1.2;\n  --text-scale-ratio-mobile: 1.2; }\n\n:root {\n  --text-scale-ratio: 1.2;\n  --spacing-unit: 1em;\n  --fixed-spacing-unit: 1rem; }\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font: inherit;\n    font-font-size: 100%; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nul, ol {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n* {\n  box-sizing: border-box; }\n\n.text-primary {\n  color: #383f47; }\n\n.bg-primary {\n  background-color: #383f47;\n  color: white; }\n\n.text-primary-dark {\n  color: #22262b; }\n\n.bg-primary-dark {\n  background-color: #22262b;\n  color: white; }\n\n.text-primary-darker {\n  color: black; }\n\n.bg-primary-darker {\n  background-color: black;\n  color: white; }\n\n.text-primary-light {\n  color: #4f5864; }\n\n.bg-primary-light {\n  background-color: #4f5864;\n  color: white; }\n\n.text-primary-lighter {\n  color: #707d8f; }\n\n.bg-primary-lighter {\n  background-color: #707d8f;\n  color: white; }\n\n.text-primary-half {\n  color: rgba(56, 63, 71, 0.5); }\n\n.bg-primary-half {\n  background-color: rgba(56, 63, 71, 0.5);\n  color: white; }\n\n.text-secondary {\n  color: #2bb0ee; }\n\n.bg-secondary {\n  background-color: #2bb0ee;\n  color: white; }\n\n.text-secondary-dark {\n  color: #1197d4; }\n\n.bg-secondary-dark {\n  background-color: #1197d4;\n  color: white; }\n\n.text-secondary-darker {\n  color: #0b648e; }\n\n.bg-secondary-darker {\n  background-color: #0b648e;\n  color: white; }\n\n.text-secondary-light {\n  color: #5ac2f2; }\n\n.bg-secondary-light {\n  background-color: #5ac2f2;\n  color: white; }\n\n.text-secondary-lighter {\n  color: #a1dcf7; }\n\n.bg-secondary-lighter {\n  background-color: #a1dcf7;\n  color: #222; }\n\n.text-secondary-half {\n  color: rgba(43, 176, 238, 0.5); }\n\n.bg-secondary-half {\n  background-color: rgba(43, 176, 238, 0.5);\n  color: white; }\n\n.text-black {\n  color: #0d0d0d; }\n\n.bg-black {\n  background-color: #0d0d0d;\n  color: white; }\n\n.text-dark {\n  color: #4d4d4d; }\n\n.bg-dark {\n  background-color: #4d4d4d;\n  color: white; }\n\n.text-light {\n  color: #f2f2f2; }\n\n.bg-light {\n  background-color: #f2f2f2;\n  color: #222; }\n\n.text-white {\n  color: white; }\n\n.bg-white {\n  background-color: white;\n  color: #222; }\n\n.text-info {\n  color: #2bb0ee; }\n\n.bg-info {\n  background-color: #2bb0ee;\n  color: white; }\n\n.text-success {\n  color: #55c359; }\n\n.bg-success {\n  background-color: #55c359;\n  color: white; }\n\n.text-warning {\n  color: #f5b656; }\n\n.bg-warning {\n  background-color: #f5b656;\n  color: #222; }\n\n.text-danger {\n  color: #e73e32; }\n\n.bg-danger {\n  background-color: #e73e32;\n  color: white; }\n\n.text-text {\n  color: #4d4d4d; }\n\n.bg-text {\n  background-color: #4d4d4d;\n  color: white; }\n\n.text-title {\n  color: #0d0d0d; }\n\n.bg-title {\n  background-color: #0d0d0d;\n  color: white; }\n\n.text-subtitle {\n  color: #4d4d4d; }\n\n.bg-subtitle {\n  background-color: #4d4d4d;\n  color: white; }\n\n.text-link {\n  color: #383f47; }\n\n.bg-link {\n  background-color: #383f47;\n  color: white; }\n\n.text-link-hovered {\n  color: #22262b; }\n\n.bg-link-hovered {\n  background-color: #22262b;\n  color: white; }\n\n.text-link-visited {\n  color: #383f47; }\n\n.bg-link-visited {\n  background-color: #383f47;\n  color: white; }\n\n.text-foreground {\n  color: white; }\n\n.bg-foreground {\n  background-color: white;\n  color: #222; }\n\n.text-background {\n  color: #eceef8; }\n\n.bg-background {\n  background-color: #eceef8;\n  color: #222; }\n\n.text-font-primary {\n  font-family: \"Roboto\", Helvetica, arial, sans-serif; }\n\n.text-font-title {\n  font-family: \"Roboto\", Helvetica, arial, cursive; }\n\n.text-font-serif {\n  font-family: \"Roboto\", Garamond, Georgia, Times New Roman, serif; }\n\n.text-font-monospace {\n  font-family: \"Roboto Mono\", monospace; }\n\n.text-xs {\n  font-size: calc(1.05em / (1.2 * 1.2)); }\n\n.text-sm {\n  font-size: calc(1.05em / 1.2); }\n\n.text-md {\n  font-size: calc(1.05em * 1.2); }\n\n.text-lg {\n  font-size: calc(1.05em * 1.2 * 1.2); }\n\n.text-xl {\n  font-size: calc(1.05em * 1.2 * 1.2 * 1.2); }\n\n.text-xxl {\n  font-size: calc(1.05em * 1.2 * 1.2 * 1.2 * 1.2); }\n\n.text-xxxl {\n  font-size: calc(1.05em * 1.2 * 1.2 * 1.2 * 1.2 * 1.2); }\n\n.text-center {\n  text-align: center; }\n\n.text-right {\n  text-align: right; }\n\n.text-left {\n  text-align: left; }\n\n.grid-1 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-1 {\n  grid-column: span 1; }\n\n.row-1 {\n  grid-row: span 1; }\n\n.grid-1-1 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-1-1 {\n  grid-column: 1 / 1; }\n\n.row-1-1 {\n  grid-row: 1 / 1; }\n\n.grid-1-2 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-1-2 {\n  grid-column: 1 / 2; }\n\n.row-1-2 {\n  grid-row: 1 / 2; }\n\n.grid-1-3 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-1-3 {\n  grid-column: 1 / 3; }\n\n.row-1-3 {\n  grid-row: 1 / 3; }\n\n.grid-1-4 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-1-4 {\n  grid-column: 1 / 4; }\n\n.row-1-4 {\n  grid-row: 1 / 4; }\n\n.grid-1-5 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-1-5 {\n  grid-column: 1 / 5; }\n\n.row-1-5 {\n  grid-row: 1 / 5; }\n\n.grid-1-6 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-1-6 {\n  grid-column: 1 / 6; }\n\n.row-1-6 {\n  grid-row: 1 / 6; }\n\n.grid-1-7 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-1-7 {\n  grid-column: 1 / 7; }\n\n.row-1-7 {\n  grid-row: 1 / 7; }\n\n.grid-1-8 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-1-8 {\n  grid-column: 1 / 8; }\n\n.row-1-8 {\n  grid-row: 1 / 8; }\n\n.grid-1-9 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-1-9 {\n  grid-column: 1 / 9; }\n\n.row-1-9 {\n  grid-row: 1 / 9; }\n\n.grid-1-10 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-1-10 {\n  grid-column: 1 / 10; }\n\n.row-1-10 {\n  grid-row: 1 / 10; }\n\n.grid-1-11 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-1-11 {\n  grid-column: 1 / 11; }\n\n.row-1-11 {\n  grid-row: 1 / 11; }\n\n.grid-1-12 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-1-12 {\n  grid-column: 1 / 12; }\n\n.row-1-12 {\n  grid-row: 1 / 12; }\n\n.grid-1-13 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-1-13 {\n  grid-column: 1 / 13; }\n\n.row-1-13 {\n  grid-row: 1 / 13; }\n\n.grid-1-14 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-1-14 {\n  grid-column: 1 / 14; }\n\n.row-1-14 {\n  grid-row: 1 / 14; }\n\n.grid-1-15 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-1-15 {\n  grid-column: 1 / 15; }\n\n.row-1-15 {\n  grid-row: 1 / 15; }\n\n.grid-2 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-2 {\n  grid-column: span 2; }\n\n.row-2 {\n  grid-row: span 2; }\n\n.grid-2-1 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-2-1 {\n  grid-column: 2 / 1; }\n\n.row-2-1 {\n  grid-row: 2 / 1; }\n\n.grid-2-2 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-2-2 {\n  grid-column: 2 / 2; }\n\n.row-2-2 {\n  grid-row: 2 / 2; }\n\n.grid-2-3 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-2-3 {\n  grid-column: 2 / 3; }\n\n.row-2-3 {\n  grid-row: 2 / 3; }\n\n.grid-2-4 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-2-4 {\n  grid-column: 2 / 4; }\n\n.row-2-4 {\n  grid-row: 2 / 4; }\n\n.grid-2-5 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-2-5 {\n  grid-column: 2 / 5; }\n\n.row-2-5 {\n  grid-row: 2 / 5; }\n\n.grid-2-6 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-2-6 {\n  grid-column: 2 / 6; }\n\n.row-2-6 {\n  grid-row: 2 / 6; }\n\n.grid-2-7 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-2-7 {\n  grid-column: 2 / 7; }\n\n.row-2-7 {\n  grid-row: 2 / 7; }\n\n.grid-2-8 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-2-8 {\n  grid-column: 2 / 8; }\n\n.row-2-8 {\n  grid-row: 2 / 8; }\n\n.grid-2-9 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-2-9 {\n  grid-column: 2 / 9; }\n\n.row-2-9 {\n  grid-row: 2 / 9; }\n\n.grid-2-10 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-2-10 {\n  grid-column: 2 / 10; }\n\n.row-2-10 {\n  grid-row: 2 / 10; }\n\n.grid-2-11 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-2-11 {\n  grid-column: 2 / 11; }\n\n.row-2-11 {\n  grid-row: 2 / 11; }\n\n.grid-2-12 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-2-12 {\n  grid-column: 2 / 12; }\n\n.row-2-12 {\n  grid-row: 2 / 12; }\n\n.grid-2-13 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-2-13 {\n  grid-column: 2 / 13; }\n\n.row-2-13 {\n  grid-row: 2 / 13; }\n\n.grid-2-14 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-2-14 {\n  grid-column: 2 / 14; }\n\n.row-2-14 {\n  grid-row: 2 / 14; }\n\n.grid-2-15 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-2-15 {\n  grid-column: 2 / 15; }\n\n.row-2-15 {\n  grid-row: 2 / 15; }\n\n.grid-3 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-3 {\n  grid-column: span 3; }\n\n.row-3 {\n  grid-row: span 3; }\n\n.grid-3-1 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-3-1 {\n  grid-column: 3 / 1; }\n\n.row-3-1 {\n  grid-row: 3 / 1; }\n\n.grid-3-2 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-3-2 {\n  grid-column: 3 / 2; }\n\n.row-3-2 {\n  grid-row: 3 / 2; }\n\n.grid-3-3 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-3-3 {\n  grid-column: 3 / 3; }\n\n.row-3-3 {\n  grid-row: 3 / 3; }\n\n.grid-3-4 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-3-4 {\n  grid-column: 3 / 4; }\n\n.row-3-4 {\n  grid-row: 3 / 4; }\n\n.grid-3-5 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-3-5 {\n  grid-column: 3 / 5; }\n\n.row-3-5 {\n  grid-row: 3 / 5; }\n\n.grid-3-6 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-3-6 {\n  grid-column: 3 / 6; }\n\n.row-3-6 {\n  grid-row: 3 / 6; }\n\n.grid-3-7 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-3-7 {\n  grid-column: 3 / 7; }\n\n.row-3-7 {\n  grid-row: 3 / 7; }\n\n.grid-3-8 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-3-8 {\n  grid-column: 3 / 8; }\n\n.row-3-8 {\n  grid-row: 3 / 8; }\n\n.grid-3-9 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-3-9 {\n  grid-column: 3 / 9; }\n\n.row-3-9 {\n  grid-row: 3 / 9; }\n\n.grid-3-10 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-3-10 {\n  grid-column: 3 / 10; }\n\n.row-3-10 {\n  grid-row: 3 / 10; }\n\n.grid-3-11 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-3-11 {\n  grid-column: 3 / 11; }\n\n.row-3-11 {\n  grid-row: 3 / 11; }\n\n.grid-3-12 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-3-12 {\n  grid-column: 3 / 12; }\n\n.row-3-12 {\n  grid-row: 3 / 12; }\n\n.grid-3-13 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-3-13 {\n  grid-column: 3 / 13; }\n\n.row-3-13 {\n  grid-row: 3 / 13; }\n\n.grid-3-14 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-3-14 {\n  grid-column: 3 / 14; }\n\n.row-3-14 {\n  grid-row: 3 / 14; }\n\n.grid-3-15 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-3-15 {\n  grid-column: 3 / 15; }\n\n.row-3-15 {\n  grid-row: 3 / 15; }\n\n.grid-4 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-4 {\n  grid-column: span 4; }\n\n.row-4 {\n  grid-row: span 4; }\n\n.grid-4-1 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-4-1 {\n  grid-column: 4 / 1; }\n\n.row-4-1 {\n  grid-row: 4 / 1; }\n\n.grid-4-2 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-4-2 {\n  grid-column: 4 / 2; }\n\n.row-4-2 {\n  grid-row: 4 / 2; }\n\n.grid-4-3 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-4-3 {\n  grid-column: 4 / 3; }\n\n.row-4-3 {\n  grid-row: 4 / 3; }\n\n.grid-4-4 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-4-4 {\n  grid-column: 4 / 4; }\n\n.row-4-4 {\n  grid-row: 4 / 4; }\n\n.grid-4-5 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-4-5 {\n  grid-column: 4 / 5; }\n\n.row-4-5 {\n  grid-row: 4 / 5; }\n\n.grid-4-6 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-4-6 {\n  grid-column: 4 / 6; }\n\n.row-4-6 {\n  grid-row: 4 / 6; }\n\n.grid-4-7 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-4-7 {\n  grid-column: 4 / 7; }\n\n.row-4-7 {\n  grid-row: 4 / 7; }\n\n.grid-4-8 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-4-8 {\n  grid-column: 4 / 8; }\n\n.row-4-8 {\n  grid-row: 4 / 8; }\n\n.grid-4-9 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-4-9 {\n  grid-column: 4 / 9; }\n\n.row-4-9 {\n  grid-row: 4 / 9; }\n\n.grid-4-10 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-4-10 {\n  grid-column: 4 / 10; }\n\n.row-4-10 {\n  grid-row: 4 / 10; }\n\n.grid-4-11 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-4-11 {\n  grid-column: 4 / 11; }\n\n.row-4-11 {\n  grid-row: 4 / 11; }\n\n.grid-4-12 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-4-12 {\n  grid-column: 4 / 12; }\n\n.row-4-12 {\n  grid-row: 4 / 12; }\n\n.grid-4-13 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-4-13 {\n  grid-column: 4 / 13; }\n\n.row-4-13 {\n  grid-row: 4 / 13; }\n\n.grid-4-14 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-4-14 {\n  grid-column: 4 / 14; }\n\n.row-4-14 {\n  grid-row: 4 / 14; }\n\n.grid-4-15 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-4-15 {\n  grid-column: 4 / 15; }\n\n.row-4-15 {\n  grid-row: 4 / 15; }\n\n.grid-5 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-5 {\n  grid-column: span 5; }\n\n.row-5 {\n  grid-row: span 5; }\n\n.grid-5-1 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-5-1 {\n  grid-column: 5 / 1; }\n\n.row-5-1 {\n  grid-row: 5 / 1; }\n\n.grid-5-2 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-5-2 {\n  grid-column: 5 / 2; }\n\n.row-5-2 {\n  grid-row: 5 / 2; }\n\n.grid-5-3 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-5-3 {\n  grid-column: 5 / 3; }\n\n.row-5-3 {\n  grid-row: 5 / 3; }\n\n.grid-5-4 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-5-4 {\n  grid-column: 5 / 4; }\n\n.row-5-4 {\n  grid-row: 5 / 4; }\n\n.grid-5-5 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-5-5 {\n  grid-column: 5 / 5; }\n\n.row-5-5 {\n  grid-row: 5 / 5; }\n\n.grid-5-6 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-5-6 {\n  grid-column: 5 / 6; }\n\n.row-5-6 {\n  grid-row: 5 / 6; }\n\n.grid-5-7 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-5-7 {\n  grid-column: 5 / 7; }\n\n.row-5-7 {\n  grid-row: 5 / 7; }\n\n.grid-5-8 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-5-8 {\n  grid-column: 5 / 8; }\n\n.row-5-8 {\n  grid-row: 5 / 8; }\n\n.grid-5-9 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-5-9 {\n  grid-column: 5 / 9; }\n\n.row-5-9 {\n  grid-row: 5 / 9; }\n\n.grid-5-10 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-5-10 {\n  grid-column: 5 / 10; }\n\n.row-5-10 {\n  grid-row: 5 / 10; }\n\n.grid-5-11 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-5-11 {\n  grid-column: 5 / 11; }\n\n.row-5-11 {\n  grid-row: 5 / 11; }\n\n.grid-5-12 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-5-12 {\n  grid-column: 5 / 12; }\n\n.row-5-12 {\n  grid-row: 5 / 12; }\n\n.grid-5-13 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-5-13 {\n  grid-column: 5 / 13; }\n\n.row-5-13 {\n  grid-row: 5 / 13; }\n\n.grid-5-14 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-5-14 {\n  grid-column: 5 / 14; }\n\n.row-5-14 {\n  grid-row: 5 / 14; }\n\n.grid-5-15 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-5-15 {\n  grid-column: 5 / 15; }\n\n.row-5-15 {\n  grid-row: 5 / 15; }\n\n.grid-6 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-6 {\n  grid-column: span 6; }\n\n.row-6 {\n  grid-row: span 6; }\n\n.grid-6-1 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-6-1 {\n  grid-column: 6 / 1; }\n\n.row-6-1 {\n  grid-row: 6 / 1; }\n\n.grid-6-2 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-6-2 {\n  grid-column: 6 / 2; }\n\n.row-6-2 {\n  grid-row: 6 / 2; }\n\n.grid-6-3 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-6-3 {\n  grid-column: 6 / 3; }\n\n.row-6-3 {\n  grid-row: 6 / 3; }\n\n.grid-6-4 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-6-4 {\n  grid-column: 6 / 4; }\n\n.row-6-4 {\n  grid-row: 6 / 4; }\n\n.grid-6-5 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-6-5 {\n  grid-column: 6 / 5; }\n\n.row-6-5 {\n  grid-row: 6 / 5; }\n\n.grid-6-6 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-6-6 {\n  grid-column: 6 / 6; }\n\n.row-6-6 {\n  grid-row: 6 / 6; }\n\n.grid-6-7 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-6-7 {\n  grid-column: 6 / 7; }\n\n.row-6-7 {\n  grid-row: 6 / 7; }\n\n.grid-6-8 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-6-8 {\n  grid-column: 6 / 8; }\n\n.row-6-8 {\n  grid-row: 6 / 8; }\n\n.grid-6-9 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-6-9 {\n  grid-column: 6 / 9; }\n\n.row-6-9 {\n  grid-row: 6 / 9; }\n\n.grid-6-10 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-6-10 {\n  grid-column: 6 / 10; }\n\n.row-6-10 {\n  grid-row: 6 / 10; }\n\n.grid-6-11 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-6-11 {\n  grid-column: 6 / 11; }\n\n.row-6-11 {\n  grid-row: 6 / 11; }\n\n.grid-6-12 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-6-12 {\n  grid-column: 6 / 12; }\n\n.row-6-12 {\n  grid-row: 6 / 12; }\n\n.grid-6-13 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-6-13 {\n  grid-column: 6 / 13; }\n\n.row-6-13 {\n  grid-row: 6 / 13; }\n\n.grid-6-14 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-6-14 {\n  grid-column: 6 / 14; }\n\n.row-6-14 {\n  grid-row: 6 / 14; }\n\n.grid-6-15 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-6-15 {\n  grid-column: 6 / 15; }\n\n.row-6-15 {\n  grid-row: 6 / 15; }\n\n.grid-7 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-7 {\n  grid-column: span 7; }\n\n.row-7 {\n  grid-row: span 7; }\n\n.grid-7-1 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-7-1 {\n  grid-column: 7 / 1; }\n\n.row-7-1 {\n  grid-row: 7 / 1; }\n\n.grid-7-2 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-7-2 {\n  grid-column: 7 / 2; }\n\n.row-7-2 {\n  grid-row: 7 / 2; }\n\n.grid-7-3 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-7-3 {\n  grid-column: 7 / 3; }\n\n.row-7-3 {\n  grid-row: 7 / 3; }\n\n.grid-7-4 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-7-4 {\n  grid-column: 7 / 4; }\n\n.row-7-4 {\n  grid-row: 7 / 4; }\n\n.grid-7-5 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-7-5 {\n  grid-column: 7 / 5; }\n\n.row-7-5 {\n  grid-row: 7 / 5; }\n\n.grid-7-6 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-7-6 {\n  grid-column: 7 / 6; }\n\n.row-7-6 {\n  grid-row: 7 / 6; }\n\n.grid-7-7 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-7-7 {\n  grid-column: 7 / 7; }\n\n.row-7-7 {\n  grid-row: 7 / 7; }\n\n.grid-7-8 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-7-8 {\n  grid-column: 7 / 8; }\n\n.row-7-8 {\n  grid-row: 7 / 8; }\n\n.grid-7-9 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-7-9 {\n  grid-column: 7 / 9; }\n\n.row-7-9 {\n  grid-row: 7 / 9; }\n\n.grid-7-10 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-7-10 {\n  grid-column: 7 / 10; }\n\n.row-7-10 {\n  grid-row: 7 / 10; }\n\n.grid-7-11 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-7-11 {\n  grid-column: 7 / 11; }\n\n.row-7-11 {\n  grid-row: 7 / 11; }\n\n.grid-7-12 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-7-12 {\n  grid-column: 7 / 12; }\n\n.row-7-12 {\n  grid-row: 7 / 12; }\n\n.grid-7-13 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-7-13 {\n  grid-column: 7 / 13; }\n\n.row-7-13 {\n  grid-row: 7 / 13; }\n\n.grid-7-14 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-7-14 {\n  grid-column: 7 / 14; }\n\n.row-7-14 {\n  grid-row: 7 / 14; }\n\n.grid-7-15 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-7-15 {\n  grid-column: 7 / 15; }\n\n.row-7-15 {\n  grid-row: 7 / 15; }\n\n.grid-8 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-8 {\n  grid-column: span 8; }\n\n.row-8 {\n  grid-row: span 8; }\n\n.grid-8-1 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-8-1 {\n  grid-column: 8 / 1; }\n\n.row-8-1 {\n  grid-row: 8 / 1; }\n\n.grid-8-2 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-8-2 {\n  grid-column: 8 / 2; }\n\n.row-8-2 {\n  grid-row: 8 / 2; }\n\n.grid-8-3 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-8-3 {\n  grid-column: 8 / 3; }\n\n.row-8-3 {\n  grid-row: 8 / 3; }\n\n.grid-8-4 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-8-4 {\n  grid-column: 8 / 4; }\n\n.row-8-4 {\n  grid-row: 8 / 4; }\n\n.grid-8-5 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-8-5 {\n  grid-column: 8 / 5; }\n\n.row-8-5 {\n  grid-row: 8 / 5; }\n\n.grid-8-6 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-8-6 {\n  grid-column: 8 / 6; }\n\n.row-8-6 {\n  grid-row: 8 / 6; }\n\n.grid-8-7 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-8-7 {\n  grid-column: 8 / 7; }\n\n.row-8-7 {\n  grid-row: 8 / 7; }\n\n.grid-8-8 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-8-8 {\n  grid-column: 8 / 8; }\n\n.row-8-8 {\n  grid-row: 8 / 8; }\n\n.grid-8-9 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-8-9 {\n  grid-column: 8 / 9; }\n\n.row-8-9 {\n  grid-row: 8 / 9; }\n\n.grid-8-10 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-8-10 {\n  grid-column: 8 / 10; }\n\n.row-8-10 {\n  grid-row: 8 / 10; }\n\n.grid-8-11 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-8-11 {\n  grid-column: 8 / 11; }\n\n.row-8-11 {\n  grid-row: 8 / 11; }\n\n.grid-8-12 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-8-12 {\n  grid-column: 8 / 12; }\n\n.row-8-12 {\n  grid-row: 8 / 12; }\n\n.grid-8-13 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-8-13 {\n  grid-column: 8 / 13; }\n\n.row-8-13 {\n  grid-row: 8 / 13; }\n\n.grid-8-14 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-8-14 {\n  grid-column: 8 / 14; }\n\n.row-8-14 {\n  grid-row: 8 / 14; }\n\n.grid-8-15 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-8-15 {\n  grid-column: 8 / 15; }\n\n.row-8-15 {\n  grid-row: 8 / 15; }\n\n.grid-9 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-9 {\n  grid-column: span 9; }\n\n.row-9 {\n  grid-row: span 9; }\n\n.grid-9-1 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-9-1 {\n  grid-column: 9 / 1; }\n\n.row-9-1 {\n  grid-row: 9 / 1; }\n\n.grid-9-2 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-9-2 {\n  grid-column: 9 / 2; }\n\n.row-9-2 {\n  grid-row: 9 / 2; }\n\n.grid-9-3 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-9-3 {\n  grid-column: 9 / 3; }\n\n.row-9-3 {\n  grid-row: 9 / 3; }\n\n.grid-9-4 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-9-4 {\n  grid-column: 9 / 4; }\n\n.row-9-4 {\n  grid-row: 9 / 4; }\n\n.grid-9-5 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-9-5 {\n  grid-column: 9 / 5; }\n\n.row-9-5 {\n  grid-row: 9 / 5; }\n\n.grid-9-6 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-9-6 {\n  grid-column: 9 / 6; }\n\n.row-9-6 {\n  grid-row: 9 / 6; }\n\n.grid-9-7 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-9-7 {\n  grid-column: 9 / 7; }\n\n.row-9-7 {\n  grid-row: 9 / 7; }\n\n.grid-9-8 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-9-8 {\n  grid-column: 9 / 8; }\n\n.row-9-8 {\n  grid-row: 9 / 8; }\n\n.grid-9-9 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-9-9 {\n  grid-column: 9 / 9; }\n\n.row-9-9 {\n  grid-row: 9 / 9; }\n\n.grid-9-10 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-9-10 {\n  grid-column: 9 / 10; }\n\n.row-9-10 {\n  grid-row: 9 / 10; }\n\n.grid-9-11 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-9-11 {\n  grid-column: 9 / 11; }\n\n.row-9-11 {\n  grid-row: 9 / 11; }\n\n.grid-9-12 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-9-12 {\n  grid-column: 9 / 12; }\n\n.row-9-12 {\n  grid-row: 9 / 12; }\n\n.grid-9-13 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-9-13 {\n  grid-column: 9 / 13; }\n\n.row-9-13 {\n  grid-row: 9 / 13; }\n\n.grid-9-14 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-9-14 {\n  grid-column: 9 / 14; }\n\n.row-9-14 {\n  grid-row: 9 / 14; }\n\n.grid-9-15 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-9-15 {\n  grid-column: 9 / 15; }\n\n.row-9-15 {\n  grid-row: 9 / 15; }\n\n.grid-10 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-10 {\n  grid-column: span 10; }\n\n.row-10 {\n  grid-row: span 10; }\n\n.grid-10-1 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-10-1 {\n  grid-column: 10 / 1; }\n\n.row-10-1 {\n  grid-row: 10 / 1; }\n\n.grid-10-2 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-10-2 {\n  grid-column: 10 / 2; }\n\n.row-10-2 {\n  grid-row: 10 / 2; }\n\n.grid-10-3 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-10-3 {\n  grid-column: 10 / 3; }\n\n.row-10-3 {\n  grid-row: 10 / 3; }\n\n.grid-10-4 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-10-4 {\n  grid-column: 10 / 4; }\n\n.row-10-4 {\n  grid-row: 10 / 4; }\n\n.grid-10-5 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-10-5 {\n  grid-column: 10 / 5; }\n\n.row-10-5 {\n  grid-row: 10 / 5; }\n\n.grid-10-6 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-10-6 {\n  grid-column: 10 / 6; }\n\n.row-10-6 {\n  grid-row: 10 / 6; }\n\n.grid-10-7 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-10-7 {\n  grid-column: 10 / 7; }\n\n.row-10-7 {\n  grid-row: 10 / 7; }\n\n.grid-10-8 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-10-8 {\n  grid-column: 10 / 8; }\n\n.row-10-8 {\n  grid-row: 10 / 8; }\n\n.grid-10-9 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-10-9 {\n  grid-column: 10 / 9; }\n\n.row-10-9 {\n  grid-row: 10 / 9; }\n\n.grid-10-10 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-10-10 {\n  grid-column: 10 / 10; }\n\n.row-10-10 {\n  grid-row: 10 / 10; }\n\n.grid-10-11 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-10-11 {\n  grid-column: 10 / 11; }\n\n.row-10-11 {\n  grid-row: 10 / 11; }\n\n.grid-10-12 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-10-12 {\n  grid-column: 10 / 12; }\n\n.row-10-12 {\n  grid-row: 10 / 12; }\n\n.grid-10-13 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-10-13 {\n  grid-column: 10 / 13; }\n\n.row-10-13 {\n  grid-row: 10 / 13; }\n\n.grid-10-14 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-10-14 {\n  grid-column: 10 / 14; }\n\n.row-10-14 {\n  grid-row: 10 / 14; }\n\n.grid-10-15 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-10-15 {\n  grid-column: 10 / 15; }\n\n.row-10-15 {\n  grid-row: 10 / 15; }\n\n.grid-11 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-11 {\n  grid-column: span 11; }\n\n.row-11 {\n  grid-row: span 11; }\n\n.grid-11-1 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-11-1 {\n  grid-column: 11 / 1; }\n\n.row-11-1 {\n  grid-row: 11 / 1; }\n\n.grid-11-2 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-11-2 {\n  grid-column: 11 / 2; }\n\n.row-11-2 {\n  grid-row: 11 / 2; }\n\n.grid-11-3 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-11-3 {\n  grid-column: 11 / 3; }\n\n.row-11-3 {\n  grid-row: 11 / 3; }\n\n.grid-11-4 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-11-4 {\n  grid-column: 11 / 4; }\n\n.row-11-4 {\n  grid-row: 11 / 4; }\n\n.grid-11-5 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-11-5 {\n  grid-column: 11 / 5; }\n\n.row-11-5 {\n  grid-row: 11 / 5; }\n\n.grid-11-6 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-11-6 {\n  grid-column: 11 / 6; }\n\n.row-11-6 {\n  grid-row: 11 / 6; }\n\n.grid-11-7 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-11-7 {\n  grid-column: 11 / 7; }\n\n.row-11-7 {\n  grid-row: 11 / 7; }\n\n.grid-11-8 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-11-8 {\n  grid-column: 11 / 8; }\n\n.row-11-8 {\n  grid-row: 11 / 8; }\n\n.grid-11-9 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-11-9 {\n  grid-column: 11 / 9; }\n\n.row-11-9 {\n  grid-row: 11 / 9; }\n\n.grid-11-10 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-11-10 {\n  grid-column: 11 / 10; }\n\n.row-11-10 {\n  grid-row: 11 / 10; }\n\n.grid-11-11 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-11-11 {\n  grid-column: 11 / 11; }\n\n.row-11-11 {\n  grid-row: 11 / 11; }\n\n.grid-11-12 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-11-12 {\n  grid-column: 11 / 12; }\n\n.row-11-12 {\n  grid-row: 11 / 12; }\n\n.grid-11-13 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-11-13 {\n  grid-column: 11 / 13; }\n\n.row-11-13 {\n  grid-row: 11 / 13; }\n\n.grid-11-14 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-11-14 {\n  grid-column: 11 / 14; }\n\n.row-11-14 {\n  grid-row: 11 / 14; }\n\n.grid-11-15 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-11-15 {\n  grid-column: 11 / 15; }\n\n.row-11-15 {\n  grid-row: 11 / 15; }\n\n.grid-12 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-12 {\n  grid-column: span 12; }\n\n.row-12 {\n  grid-row: span 12; }\n\n.grid-12-1 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-12-1 {\n  grid-column: 12 / 1; }\n\n.row-12-1 {\n  grid-row: 12 / 1; }\n\n.grid-12-2 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-12-2 {\n  grid-column: 12 / 2; }\n\n.row-12-2 {\n  grid-row: 12 / 2; }\n\n.grid-12-3 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-12-3 {\n  grid-column: 12 / 3; }\n\n.row-12-3 {\n  grid-row: 12 / 3; }\n\n.grid-12-4 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-12-4 {\n  grid-column: 12 / 4; }\n\n.row-12-4 {\n  grid-row: 12 / 4; }\n\n.grid-12-5 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-12-5 {\n  grid-column: 12 / 5; }\n\n.row-12-5 {\n  grid-row: 12 / 5; }\n\n.grid-12-6 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-12-6 {\n  grid-column: 12 / 6; }\n\n.row-12-6 {\n  grid-row: 12 / 6; }\n\n.grid-12-7 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-12-7 {\n  grid-column: 12 / 7; }\n\n.row-12-7 {\n  grid-row: 12 / 7; }\n\n.grid-12-8 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-12-8 {\n  grid-column: 12 / 8; }\n\n.row-12-8 {\n  grid-row: 12 / 8; }\n\n.grid-12-9 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-12-9 {\n  grid-column: 12 / 9; }\n\n.row-12-9 {\n  grid-row: 12 / 9; }\n\n.grid-12-10 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-12-10 {\n  grid-column: 12 / 10; }\n\n.row-12-10 {\n  grid-row: 12 / 10; }\n\n.grid-12-11 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-12-11 {\n  grid-column: 12 / 11; }\n\n.row-12-11 {\n  grid-row: 12 / 11; }\n\n.grid-12-12 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-12-12 {\n  grid-column: 12 / 12; }\n\n.row-12-12 {\n  grid-row: 12 / 12; }\n\n.grid-12-13 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-12-13 {\n  grid-column: 12 / 13; }\n\n.row-12-13 {\n  grid-row: 12 / 13; }\n\n.grid-12-14 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-12-14 {\n  grid-column: 12 / 14; }\n\n.row-12-14 {\n  grid-row: 12 / 14; }\n\n.grid-12-15 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-12-15 {\n  grid-column: 12 / 15; }\n\n.row-12-15 {\n  grid-row: 12 / 15; }\n\n.grid-13 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-13 {\n  grid-column: span 13; }\n\n.row-13 {\n  grid-row: span 13; }\n\n.grid-13-1 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-13-1 {\n  grid-column: 13 / 1; }\n\n.row-13-1 {\n  grid-row: 13 / 1; }\n\n.grid-13-2 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-13-2 {\n  grid-column: 13 / 2; }\n\n.row-13-2 {\n  grid-row: 13 / 2; }\n\n.grid-13-3 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-13-3 {\n  grid-column: 13 / 3; }\n\n.row-13-3 {\n  grid-row: 13 / 3; }\n\n.grid-13-4 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-13-4 {\n  grid-column: 13 / 4; }\n\n.row-13-4 {\n  grid-row: 13 / 4; }\n\n.grid-13-5 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-13-5 {\n  grid-column: 13 / 5; }\n\n.row-13-5 {\n  grid-row: 13 / 5; }\n\n.grid-13-6 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-13-6 {\n  grid-column: 13 / 6; }\n\n.row-13-6 {\n  grid-row: 13 / 6; }\n\n.grid-13-7 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-13-7 {\n  grid-column: 13 / 7; }\n\n.row-13-7 {\n  grid-row: 13 / 7; }\n\n.grid-13-8 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-13-8 {\n  grid-column: 13 / 8; }\n\n.row-13-8 {\n  grid-row: 13 / 8; }\n\n.grid-13-9 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-13-9 {\n  grid-column: 13 / 9; }\n\n.row-13-9 {\n  grid-row: 13 / 9; }\n\n.grid-13-10 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-13-10 {\n  grid-column: 13 / 10; }\n\n.row-13-10 {\n  grid-row: 13 / 10; }\n\n.grid-13-11 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-13-11 {\n  grid-column: 13 / 11; }\n\n.row-13-11 {\n  grid-row: 13 / 11; }\n\n.grid-13-12 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-13-12 {\n  grid-column: 13 / 12; }\n\n.row-13-12 {\n  grid-row: 13 / 12; }\n\n.grid-13-13 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-13-13 {\n  grid-column: 13 / 13; }\n\n.row-13-13 {\n  grid-row: 13 / 13; }\n\n.grid-13-14 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-13-14 {\n  grid-column: 13 / 14; }\n\n.row-13-14 {\n  grid-row: 13 / 14; }\n\n.grid-13-15 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-13-15 {\n  grid-column: 13 / 15; }\n\n.row-13-15 {\n  grid-row: 13 / 15; }\n\n.grid-14 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-14 {\n  grid-column: span 14; }\n\n.row-14 {\n  grid-row: span 14; }\n\n.grid-14-1 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-14-1 {\n  grid-column: 14 / 1; }\n\n.row-14-1 {\n  grid-row: 14 / 1; }\n\n.grid-14-2 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-14-2 {\n  grid-column: 14 / 2; }\n\n.row-14-2 {\n  grid-row: 14 / 2; }\n\n.grid-14-3 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-14-3 {\n  grid-column: 14 / 3; }\n\n.row-14-3 {\n  grid-row: 14 / 3; }\n\n.grid-14-4 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-14-4 {\n  grid-column: 14 / 4; }\n\n.row-14-4 {\n  grid-row: 14 / 4; }\n\n.grid-14-5 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-14-5 {\n  grid-column: 14 / 5; }\n\n.row-14-5 {\n  grid-row: 14 / 5; }\n\n.grid-14-6 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-14-6 {\n  grid-column: 14 / 6; }\n\n.row-14-6 {\n  grid-row: 14 / 6; }\n\n.grid-14-7 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-14-7 {\n  grid-column: 14 / 7; }\n\n.row-14-7 {\n  grid-row: 14 / 7; }\n\n.grid-14-8 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-14-8 {\n  grid-column: 14 / 8; }\n\n.row-14-8 {\n  grid-row: 14 / 8; }\n\n.grid-14-9 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-14-9 {\n  grid-column: 14 / 9; }\n\n.row-14-9 {\n  grid-row: 14 / 9; }\n\n.grid-14-10 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-14-10 {\n  grid-column: 14 / 10; }\n\n.row-14-10 {\n  grid-row: 14 / 10; }\n\n.grid-14-11 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-14-11 {\n  grid-column: 14 / 11; }\n\n.row-14-11 {\n  grid-row: 14 / 11; }\n\n.grid-14-12 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-14-12 {\n  grid-column: 14 / 12; }\n\n.row-14-12 {\n  grid-row: 14 / 12; }\n\n.grid-14-13 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-14-13 {\n  grid-column: 14 / 13; }\n\n.row-14-13 {\n  grid-row: 14 / 13; }\n\n.grid-14-14 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-14-14 {\n  grid-column: 14 / 14; }\n\n.row-14-14 {\n  grid-row: 14 / 14; }\n\n.grid-14-15 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-14-15 {\n  grid-column: 14 / 15; }\n\n.row-14-15 {\n  grid-row: 14 / 15; }\n\n.grid-15 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-15 {\n  grid-column: span 15; }\n\n.row-15 {\n  grid-row: span 15; }\n\n.grid-15-1 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-15-1 {\n  grid-column: 15 / 1; }\n\n.row-15-1 {\n  grid-row: 15 / 1; }\n\n.grid-15-2 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-15-2 {\n  grid-column: 15 / 2; }\n\n.row-15-2 {\n  grid-row: 15 / 2; }\n\n.grid-15-3 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-15-3 {\n  grid-column: 15 / 3; }\n\n.row-15-3 {\n  grid-row: 15 / 3; }\n\n.grid-15-4 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-15-4 {\n  grid-column: 15 / 4; }\n\n.row-15-4 {\n  grid-row: 15 / 4; }\n\n.grid-15-5 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-15-5 {\n  grid-column: 15 / 5; }\n\n.row-15-5 {\n  grid-row: 15 / 5; }\n\n.grid-15-6 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-15-6 {\n  grid-column: 15 / 6; }\n\n.row-15-6 {\n  grid-row: 15 / 6; }\n\n.grid-15-7 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-15-7 {\n  grid-column: 15 / 7; }\n\n.row-15-7 {\n  grid-row: 15 / 7; }\n\n.grid-15-8 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-15-8 {\n  grid-column: 15 / 8; }\n\n.row-15-8 {\n  grid-row: 15 / 8; }\n\n.grid-15-9 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-15-9 {\n  grid-column: 15 / 9; }\n\n.row-15-9 {\n  grid-row: 15 / 9; }\n\n.grid-15-10 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-15-10 {\n  grid-column: 15 / 10; }\n\n.row-15-10 {\n  grid-row: 15 / 10; }\n\n.grid-15-11 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-15-11 {\n  grid-column: 15 / 11; }\n\n.row-15-11 {\n  grid-row: 15 / 11; }\n\n.grid-15-12 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-15-12 {\n  grid-column: 15 / 12; }\n\n.row-15-12 {\n  grid-row: 15 / 12; }\n\n.grid-15-13 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-15-13 {\n  grid-column: 15 / 13; }\n\n.row-15-13 {\n  grid-row: 15 / 13; }\n\n.grid-15-14 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-15-14 {\n  grid-column: 15 / 14; }\n\n.row-15-14 {\n  grid-row: 15 / 14; }\n\n.grid-15-15 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-15-15 {\n  grid-column: 15 / 15; }\n\n.row-15-15 {\n  grid-row: 15 / 15; }\n\n.header_wrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  color: inherit;\n  padding: calc(0.75 * var(--spacing-unit));\n  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.18);\n  margin-bottom: calc(1.25 * var(--spacing-unit)); }\n\n.page-title {\n  font-weight: bold;\n  font-family: \"Roboto\", Helvetica, arial, cursive;\n  padding: calc(0.25 * var(--fixed-spacing-unit));\n  border: solid 2px currentColor;\n  border-radius: calc(0.75 * var(--fixed-spacing-unit)); }\n\n.navbar {\n  margin-left: auto;\n  margin-right: calc(1.25 * var(--spacing-unit)); }\n  .navbar a {\n    text-decoration: none; }\n\n.promotions_title {\n  position: relative;\n  padding-bottom: calc(0.75 * var(--fixed-spacing-unit));\n  margin-bottom: calc(0.5 * var(--spacing-unit));\n  font-weight: bold; }\n  .promotions_title::after {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    left: 50%;\n    transform: translate(-50%);\n    height: 1px;\n    width: 3em;\n    background-color: #383f47; }\n\n.promotion-list {\n  margin: calc(0.75 * var(--spacing-unit)); }\n\n.promotion-create_form.disabled {\n  opacity: 0.5; }\n  .promotion-create_form.disabled .input[type=\"submit\"] {\n    cursor: not-allowed; }\n\n.promotion-detail_infos {\n  font-size: calc(1.05em * 1.2 * 1.2);\n  font-family: \"Roboto\", Helvetica, arial, cursive; }\n  .promotion-detail_infos .info {\n    font-family: \"Roboto Mono\", monospace;\n    font-size: calc(1.05em / (1.2 * 1.2));\n    font-weight: normal;\n    display: block;\n    margin-top: calc(0.5 * var(--spacing-unit));\n    margin-bottom: calc(0.75 * var(--spacing-unit)); }\n  .promotion-detail_infos .action-bar {\n    padding: calc(0.75 * var(--spacing-unit)); }\n\n.student-list {\n  margin: calc(0.75 * var(--spacing-unit)); }\n\n.student-list_action-bar {\n  padding: calc(0.75 * var(--spacing-unit)); }\n\n:global(.input) {\n  display: block;\n  width: 100%;\n  padding: calc(0.5 * var(--spacing-unit));\n  border: solid 1px #cccccc; }\n  :global(.input):focus {\n    outline-color: #383f47; }\n  :global(.input)[type=submit] {\n    background-color: #383f47;\n    color: white;\n    font-weight: bold;\n    text-transform: uppercase;\n    font-family: \"Roboto\", Helvetica, arial, cursive;\n    letter-spacing: 4px;\n    cursor: pointer; }\n    :global(.input)[type=submit]:hover, :global(.input)[type=submit]:focus {\n      background-color: #22262b; }\n\n:global(.label) {\n  margin-bottom: calc(0.75 * var(--spacing-unit));\n  display: block; }\n\n.rich-list {\n  --border: solid 1px #cccccc;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(1, 1fr);\n  border: var(--border);\n  border-bottom-color: rgba(0, 0, 0, 0); }\n\n.rich-list_item:nth-of-type(3n-2) a, .rich-list_item:nth-of-type(3n-1) a {\n  border-right: var(--border); }\n\n.rich-list_item:nth-of-type(odd) a {\n  background-color: #f2f2f2; }\n\n.rich-list_item:nth-of-type(even) a {\n  background-color: white; }\n\n.rich-list_item a {\n  padding: calc(0.75 * var(--spacing-unit)) calc(0.5 * var(--spacing-unit));\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-bottom: var(--border);\n  height: 100%; }\n  .rich-list_item a:hover {\n    background-color: #383f47;\n    color: white; }\n\n.modal {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: modal-appear 0.35s; }\n  .modal.hidden {\n    display: none; }\n\n.modal-content {\n  background-color: white;\n  padding: calc(1.25 * var(--spacing-unit)); }\n\n.modal-action-bar {\n  margin-top: calc(0.75 * var(--spacing-unit)); }\n\n@keyframes modal-appear {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n:global(.btn-primary) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #383f47;\n  color: white; }\n  :global(.btn-primary):hover {\n    background-color: #22262b; }\n  :global(.btn-primary).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #383f47;\n    border: solid 1px #383f47; }\n    :global(.btn-primary).outlined:hover {\n      color: #22262b;\n      border-color: #22262b; }\n\n:global(.btn-primary-dark) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #22262b;\n  color: white; }\n  :global(.btn-primary-dark):hover {\n    background-color: #0b0d0e; }\n  :global(.btn-primary-dark).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #22262b;\n    border: solid 1px #22262b; }\n    :global(.btn-primary-dark).outlined:hover {\n      color: #0b0d0e;\n      border-color: #0b0d0e; }\n\n:global(.btn-primary-darker) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: black;\n  color: white; }\n  :global(.btn-primary-darker):hover {\n    background-color: black; }\n  :global(.btn-primary-darker).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: black;\n    border: solid 1px black; }\n    :global(.btn-primary-darker).outlined:hover {\n      color: black;\n      border-color: black; }\n\n:global(.btn-primary-light) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4f5864;\n  color: white; }\n  :global(.btn-primary-light):hover {\n    background-color: #383f47; }\n  :global(.btn-primary-light).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4f5864;\n    border: solid 1px #4f5864; }\n    :global(.btn-primary-light).outlined:hover {\n      color: #383f47;\n      border-color: #383f47; }\n\n:global(.btn-primary-lighter) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #707d8f;\n  color: white; }\n  :global(.btn-primary-lighter):hover {\n    background-color: #5a6472; }\n  :global(.btn-primary-lighter).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #707d8f;\n    border: solid 1px #707d8f; }\n    :global(.btn-primary-lighter).outlined:hover {\n      color: #5a6472;\n      border-color: #5a6472; }\n\n:global(.btn-primary-half) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: rgba(56, 63, 71, 0.5);\n  color: white; }\n  :global(.btn-primary-half):hover {\n    background-color: rgba(34, 38, 43, 0.5); }\n  :global(.btn-primary-half).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: rgba(56, 63, 71, 0.5);\n    border: solid 1px rgba(56, 63, 71, 0.5); }\n    :global(.btn-primary-half).outlined:hover {\n      color: rgba(34, 38, 43, 0.5);\n      border-color: rgba(34, 38, 43, 0.5); }\n\n:global(.btn-secondary) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #2bb0ee;\n  color: white; }\n  :global(.btn-secondary):hover {\n    background-color: #1197d4; }\n  :global(.btn-secondary).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #2bb0ee;\n    border: solid 1px #2bb0ee; }\n    :global(.btn-secondary).outlined:hover {\n      color: #1197d4;\n      border-color: #1197d4; }\n\n:global(.btn-secondary-dark) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #1197d4;\n  color: white; }\n  :global(.btn-secondary-dark):hover {\n    background-color: #0d75a5; }\n  :global(.btn-secondary-dark).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #1197d4;\n    border: solid 1px #1197d4; }\n    :global(.btn-secondary-dark).outlined:hover {\n      color: #0d75a5;\n      border-color: #0d75a5; }\n\n:global(.btn-secondary-darker) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #0b648e;\n  color: white; }\n  :global(.btn-secondary-darker):hover {\n    background-color: #08435e; }\n  :global(.btn-secondary-darker).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #0b648e;\n    border: solid 1px #0b648e; }\n    :global(.btn-secondary-darker).outlined:hover {\n      color: #08435e;\n      border-color: #08435e; }\n\n:global(.btn-secondary-light) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #5ac2f2;\n  color: white; }\n  :global(.btn-secondary-light):hover {\n    background-color: #2bb0ee; }\n  :global(.btn-secondary-light).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #5ac2f2;\n    border: solid 1px #5ac2f2; }\n    :global(.btn-secondary-light).outlined:hover {\n      color: #2bb0ee;\n      border-color: #2bb0ee; }\n\n:global(.btn-secondary-lighter) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #a1dcf7;\n  color: #222; }\n  :global(.btn-secondary-lighter):hover {\n    background-color: #71caf4; }\n  :global(.btn-secondary-lighter).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #a1dcf7;\n    border: solid 1px #a1dcf7; }\n    :global(.btn-secondary-lighter).outlined:hover {\n      color: #71caf4;\n      border-color: #71caf4; }\n\n:global(.btn-secondary-half) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: rgba(43, 176, 238, 0.5);\n  color: white; }\n  :global(.btn-secondary-half):hover {\n    background-color: rgba(17, 151, 212, 0.5); }\n  :global(.btn-secondary-half).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: rgba(43, 176, 238, 0.5);\n    border: solid 1px rgba(43, 176, 238, 0.5); }\n    :global(.btn-secondary-half).outlined:hover {\n      color: rgba(17, 151, 212, 0.5);\n      border-color: rgba(17, 151, 212, 0.5); }\n\n:global(.btn-black) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #0d0d0d;\n  color: white; }\n  :global(.btn-black):hover {\n    background-color: black; }\n  :global(.btn-black).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #0d0d0d;\n    border: solid 1px #0d0d0d; }\n    :global(.btn-black).outlined:hover {\n      color: black;\n      border-color: black; }\n\n:global(.btn-dark) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4d4d4d;\n  color: white; }\n  :global(.btn-dark):hover {\n    background-color: #333333; }\n  :global(.btn-dark).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4d4d4d;\n    border: solid 1px #4d4d4d; }\n    :global(.btn-dark).outlined:hover {\n      color: #333333;\n      border-color: #333333; }\n\n:global(.btn-light) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #f2f2f2;\n  color: #222; }\n  :global(.btn-light):hover {\n    background-color: #d9d9d9; }\n  :global(.btn-light).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #f2f2f2;\n    border: solid 1px #f2f2f2; }\n    :global(.btn-light).outlined:hover {\n      color: #d9d9d9;\n      border-color: #d9d9d9; }\n\n:global(.btn-white) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: white;\n  color: #222; }\n  :global(.btn-white):hover {\n    background-color: #e6e6e6; }\n  :global(.btn-white).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: white;\n    border: solid 1px white; }\n    :global(.btn-white).outlined:hover {\n      color: #e6e6e6;\n      border-color: #e6e6e6; }\n\n:global(.btn-info) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #2bb0ee;\n  color: white; }\n  :global(.btn-info):hover {\n    background-color: #1197d4; }\n  :global(.btn-info).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #2bb0ee;\n    border: solid 1px #2bb0ee; }\n    :global(.btn-info).outlined:hover {\n      color: #1197d4;\n      border-color: #1197d4; }\n\n:global(.btn-success) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #55c359;\n  color: white; }\n  :global(.btn-success):hover {\n    background-color: #3caa3f; }\n  :global(.btn-success).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #55c359;\n    border: solid 1px #55c359; }\n    :global(.btn-success).outlined:hover {\n      color: #3caa3f;\n      border-color: #3caa3f; }\n\n:global(.btn-warning) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #f5b656;\n  color: #222; }\n  :global(.btn-warning):hover {\n    background-color: #f2a126; }\n  :global(.btn-warning).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #f5b656;\n    border: solid 1px #f5b656; }\n    :global(.btn-warning).outlined:hover {\n      color: #f2a126;\n      border-color: #f2a126; }\n\n:global(.btn-danger) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #e73e32;\n  color: white; }\n  :global(.btn-danger):hover {\n    background-color: #cd2418; }\n  :global(.btn-danger).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #e73e32;\n    border: solid 1px #e73e32; }\n    :global(.btn-danger).outlined:hover {\n      color: #cd2418;\n      border-color: #cd2418; }\n\n:global(.btn-text) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4d4d4d;\n  color: white; }\n  :global(.btn-text):hover {\n    background-color: #333333; }\n  :global(.btn-text).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4d4d4d;\n    border: solid 1px #4d4d4d; }\n    :global(.btn-text).outlined:hover {\n      color: #333333;\n      border-color: #333333; }\n\n:global(.btn-title) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #0d0d0d;\n  color: white; }\n  :global(.btn-title):hover {\n    background-color: black; }\n  :global(.btn-title).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #0d0d0d;\n    border: solid 1px #0d0d0d; }\n    :global(.btn-title).outlined:hover {\n      color: black;\n      border-color: black; }\n\n:global(.btn-subtitle) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4d4d4d;\n  color: white; }\n  :global(.btn-subtitle):hover {\n    background-color: #333333; }\n  :global(.btn-subtitle).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4d4d4d;\n    border: solid 1px #4d4d4d; }\n    :global(.btn-subtitle).outlined:hover {\n      color: #333333;\n      border-color: #333333; }\n\n:global(.btn-link) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #383f47;\n  color: white; }\n  :global(.btn-link):hover {\n    background-color: #22262b; }\n  :global(.btn-link).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #383f47;\n    border: solid 1px #383f47; }\n    :global(.btn-link).outlined:hover {\n      color: #22262b;\n      border-color: #22262b; }\n\n:global(.btn-link-hovered) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #22262b;\n  color: white; }\n  :global(.btn-link-hovered):hover {\n    background-color: #0b0d0e; }\n  :global(.btn-link-hovered).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #22262b;\n    border: solid 1px #22262b; }\n    :global(.btn-link-hovered).outlined:hover {\n      color: #0b0d0e;\n      border-color: #0b0d0e; }\n\n:global(.btn-link-visited) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #383f47;\n  color: white; }\n  :global(.btn-link-visited):hover {\n    background-color: #22262b; }\n  :global(.btn-link-visited).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #383f47;\n    border: solid 1px #383f47; }\n    :global(.btn-link-visited).outlined:hover {\n      color: #22262b;\n      border-color: #22262b; }\n\n:global(.btn-foreground) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: white;\n  color: #222; }\n  :global(.btn-foreground):hover {\n    background-color: #e6e6e6; }\n  :global(.btn-foreground).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: white;\n    border: solid 1px white; }\n    :global(.btn-foreground).outlined:hover {\n      color: #e6e6e6;\n      border-color: #e6e6e6; }\n\n:global(.btn-background) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #eceef8;\n  color: #222; }\n  :global(.btn-background):hover {\n    background-color: #c7cceb; }\n  :global(.btn-background).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #eceef8;\n    border: solid 1px #eceef8; }\n    :global(.btn-background).outlined:hover {\n      color: #c7cceb;\n      border-color: #c7cceb; }\n\n:global(.btn-clear) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0);\n  color: inherit; }\n\n:global(#app) {\n  font-size: 1.05em;\n  font-family: \"Roboto\", Helvetica, arial, sans-serif;\n  line-height: 1.1;\n  color: var(--color-text);\n  background-color: #eceef8;\n  overflow-x: hidden;\n  min-height: 100vh;\n  width: 100vw;\n  background: radial-gradient(circle at center, white 50%, #f2f2f2); }\n\na {\n  color: #383f47; }\n  a:hover {\n    color: #22262b; }\n", "",{"version":3,"sources":["c:/Users/lpennequin/Documents/projects/PopNetwork2019/prototypes/dashboard/dashboard.sass"],"names":[],"mappings":"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","file":"dashboard.sass","sourcesContent":[":root {\n  --color-primary: #383f47;\n  --color-primary-dark: #22262b;\n  --color-primary-darker: black;\n  --color-primary-light: #4f5864;\n  --color-primary-lighter: #707d8f;\n  --color-primary-half: rgba(56, 63, 71, 0.5);\n  --color-secondary: #2bb0ee;\n  --color-secondary-dark: #1197d4;\n  --color-secondary-darker: #0b648e;\n  --color-secondary-light: #5ac2f2;\n  --color-secondary-lighter: #a1dcf7;\n  --color-secondary-half: rgba(43, 176, 238, 0.5);\n  --color-black: #0d0d0d;\n  --color-dark: #4d4d4d;\n  --color-light: #f2f2f2;\n  --color-white: white;\n  --color-info: #2bb0ee;\n  --color-success: #55c359;\n  --color-warning: #f5b656;\n  --color-danger: #e73e32;\n  --color-text: #4d4d4d;\n  --color-title: #0d0d0d;\n  --color-subtitle: #4d4d4d;\n  --color-link: #383f47;\n  --color-link-hovered: #22262b;\n  --color-link-visited: #383f47;\n  --color-foreground: white;\n  --color-background: #eceef8; }\n\n:root {\n  --font-primary: Roboto, Helvetica, arial, sans-serif;\n  --font-title: Roboto, Helvetica, arial, cursive;\n  --font-serif: Roboto, Garamond, Georgia, Times New Roman, serif;\n  --font-monospace: Roboto Mono, monospace;\n  --text-scale-ratio: 1.2;\n  --text-scale-ratio-mobile: 1.2; }\n\n:root {\n  --text-scale-ratio: 1.2;\n  --spacing-unit: 1em;\n  --fixed-spacing-unit: 1rem; }\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font: inherit;\n    font-font-size: 100%; }\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block; }\n\nbody {\n  line-height: 1; }\n\nul, ol {\n  list-style: none; }\n\nblockquote, q {\n  quotes: none; }\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: '';\n  content: none; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n* {\n  box-sizing: border-box; }\n\n.text-primary {\n  color: #383f47; }\n\n.bg-primary {\n  background-color: #383f47;\n  color: white; }\n\n.text-primary-dark {\n  color: #22262b; }\n\n.bg-primary-dark {\n  background-color: #22262b;\n  color: white; }\n\n.text-primary-darker {\n  color: black; }\n\n.bg-primary-darker {\n  background-color: black;\n  color: white; }\n\n.text-primary-light {\n  color: #4f5864; }\n\n.bg-primary-light {\n  background-color: #4f5864;\n  color: white; }\n\n.text-primary-lighter {\n  color: #707d8f; }\n\n.bg-primary-lighter {\n  background-color: #707d8f;\n  color: white; }\n\n.text-primary-half {\n  color: rgba(56, 63, 71, 0.5); }\n\n.bg-primary-half {\n  background-color: rgba(56, 63, 71, 0.5);\n  color: white; }\n\n.text-secondary {\n  color: #2bb0ee; }\n\n.bg-secondary {\n  background-color: #2bb0ee;\n  color: white; }\n\n.text-secondary-dark {\n  color: #1197d4; }\n\n.bg-secondary-dark {\n  background-color: #1197d4;\n  color: white; }\n\n.text-secondary-darker {\n  color: #0b648e; }\n\n.bg-secondary-darker {\n  background-color: #0b648e;\n  color: white; }\n\n.text-secondary-light {\n  color: #5ac2f2; }\n\n.bg-secondary-light {\n  background-color: #5ac2f2;\n  color: white; }\n\n.text-secondary-lighter {\n  color: #a1dcf7; }\n\n.bg-secondary-lighter {\n  background-color: #a1dcf7;\n  color: #222; }\n\n.text-secondary-half {\n  color: rgba(43, 176, 238, 0.5); }\n\n.bg-secondary-half {\n  background-color: rgba(43, 176, 238, 0.5);\n  color: white; }\n\n.text-black {\n  color: #0d0d0d; }\n\n.bg-black {\n  background-color: #0d0d0d;\n  color: white; }\n\n.text-dark {\n  color: #4d4d4d; }\n\n.bg-dark {\n  background-color: #4d4d4d;\n  color: white; }\n\n.text-light {\n  color: #f2f2f2; }\n\n.bg-light {\n  background-color: #f2f2f2;\n  color: #222; }\n\n.text-white {\n  color: white; }\n\n.bg-white {\n  background-color: white;\n  color: #222; }\n\n.text-info {\n  color: #2bb0ee; }\n\n.bg-info {\n  background-color: #2bb0ee;\n  color: white; }\n\n.text-success {\n  color: #55c359; }\n\n.bg-success {\n  background-color: #55c359;\n  color: white; }\n\n.text-warning {\n  color: #f5b656; }\n\n.bg-warning {\n  background-color: #f5b656;\n  color: #222; }\n\n.text-danger {\n  color: #e73e32; }\n\n.bg-danger {\n  background-color: #e73e32;\n  color: white; }\n\n.text-text {\n  color: #4d4d4d; }\n\n.bg-text {\n  background-color: #4d4d4d;\n  color: white; }\n\n.text-title {\n  color: #0d0d0d; }\n\n.bg-title {\n  background-color: #0d0d0d;\n  color: white; }\n\n.text-subtitle {\n  color: #4d4d4d; }\n\n.bg-subtitle {\n  background-color: #4d4d4d;\n  color: white; }\n\n.text-link {\n  color: #383f47; }\n\n.bg-link {\n  background-color: #383f47;\n  color: white; }\n\n.text-link-hovered {\n  color: #22262b; }\n\n.bg-link-hovered {\n  background-color: #22262b;\n  color: white; }\n\n.text-link-visited {\n  color: #383f47; }\n\n.bg-link-visited {\n  background-color: #383f47;\n  color: white; }\n\n.text-foreground {\n  color: white; }\n\n.bg-foreground {\n  background-color: white;\n  color: #222; }\n\n.text-background {\n  color: #eceef8; }\n\n.bg-background {\n  background-color: #eceef8;\n  color: #222; }\n\n.text-font-primary {\n  font-family: \"Roboto\", Helvetica, arial, sans-serif; }\n\n.text-font-title {\n  font-family: \"Roboto\", Helvetica, arial, cursive; }\n\n.text-font-serif {\n  font-family: \"Roboto\", Garamond, Georgia, Times New Roman, serif; }\n\n.text-font-monospace {\n  font-family: \"Roboto Mono\", monospace; }\n\n.text-xs {\n  font-size: calc(1.05em / (1.2 * 1.2)); }\n\n.text-sm {\n  font-size: calc(1.05em / 1.2); }\n\n.text-md {\n  font-size: calc(1.05em * 1.2); }\n\n.text-lg {\n  font-size: calc(1.05em * 1.2 * 1.2); }\n\n.text-xl {\n  font-size: calc(1.05em * 1.2 * 1.2 * 1.2); }\n\n.text-xxl {\n  font-size: calc(1.05em * 1.2 * 1.2 * 1.2 * 1.2); }\n\n.text-xxxl {\n  font-size: calc(1.05em * 1.2 * 1.2 * 1.2 * 1.2 * 1.2); }\n\n.text-center {\n  text-align: center; }\n\n.text-right {\n  text-align: right; }\n\n.text-left {\n  text-align: left; }\n\n.grid-1 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-1 {\n  grid-column: span 1; }\n\n.row-1 {\n  grid-row: span 1; }\n\n.grid-1-1 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-1-1 {\n  grid-column: 1 / 1; }\n\n.row-1-1 {\n  grid-row: 1 / 1; }\n\n.grid-1-2 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-1-2 {\n  grid-column: 1 / 2; }\n\n.row-1-2 {\n  grid-row: 1 / 2; }\n\n.grid-1-3 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-1-3 {\n  grid-column: 1 / 3; }\n\n.row-1-3 {\n  grid-row: 1 / 3; }\n\n.grid-1-4 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-1-4 {\n  grid-column: 1 / 4; }\n\n.row-1-4 {\n  grid-row: 1 / 4; }\n\n.grid-1-5 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-1-5 {\n  grid-column: 1 / 5; }\n\n.row-1-5 {\n  grid-row: 1 / 5; }\n\n.grid-1-6 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-1-6 {\n  grid-column: 1 / 6; }\n\n.row-1-6 {\n  grid-row: 1 / 6; }\n\n.grid-1-7 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-1-7 {\n  grid-column: 1 / 7; }\n\n.row-1-7 {\n  grid-row: 1 / 7; }\n\n.grid-1-8 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-1-8 {\n  grid-column: 1 / 8; }\n\n.row-1-8 {\n  grid-row: 1 / 8; }\n\n.grid-1-9 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-1-9 {\n  grid-column: 1 / 9; }\n\n.row-1-9 {\n  grid-row: 1 / 9; }\n\n.grid-1-10 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-1-10 {\n  grid-column: 1 / 10; }\n\n.row-1-10 {\n  grid-row: 1 / 10; }\n\n.grid-1-11 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-1-11 {\n  grid-column: 1 / 11; }\n\n.row-1-11 {\n  grid-row: 1 / 11; }\n\n.grid-1-12 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-1-12 {\n  grid-column: 1 / 12; }\n\n.row-1-12 {\n  grid-row: 1 / 12; }\n\n.grid-1-13 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-1-13 {\n  grid-column: 1 / 13; }\n\n.row-1-13 {\n  grid-row: 1 / 13; }\n\n.grid-1-14 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-1-14 {\n  grid-column: 1 / 14; }\n\n.row-1-14 {\n  grid-row: 1 / 14; }\n\n.grid-1-15 {\n  display: grid;\n  grid-template-columns: repeat(1, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-1-15 {\n  grid-column: 1 / 15; }\n\n.row-1-15 {\n  grid-row: 1 / 15; }\n\n.grid-2 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-2 {\n  grid-column: span 2; }\n\n.row-2 {\n  grid-row: span 2; }\n\n.grid-2-1 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-2-1 {\n  grid-column: 2 / 1; }\n\n.row-2-1 {\n  grid-row: 2 / 1; }\n\n.grid-2-2 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-2-2 {\n  grid-column: 2 / 2; }\n\n.row-2-2 {\n  grid-row: 2 / 2; }\n\n.grid-2-3 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-2-3 {\n  grid-column: 2 / 3; }\n\n.row-2-3 {\n  grid-row: 2 / 3; }\n\n.grid-2-4 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-2-4 {\n  grid-column: 2 / 4; }\n\n.row-2-4 {\n  grid-row: 2 / 4; }\n\n.grid-2-5 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-2-5 {\n  grid-column: 2 / 5; }\n\n.row-2-5 {\n  grid-row: 2 / 5; }\n\n.grid-2-6 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-2-6 {\n  grid-column: 2 / 6; }\n\n.row-2-6 {\n  grid-row: 2 / 6; }\n\n.grid-2-7 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-2-7 {\n  grid-column: 2 / 7; }\n\n.row-2-7 {\n  grid-row: 2 / 7; }\n\n.grid-2-8 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-2-8 {\n  grid-column: 2 / 8; }\n\n.row-2-8 {\n  grid-row: 2 / 8; }\n\n.grid-2-9 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-2-9 {\n  grid-column: 2 / 9; }\n\n.row-2-9 {\n  grid-row: 2 / 9; }\n\n.grid-2-10 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-2-10 {\n  grid-column: 2 / 10; }\n\n.row-2-10 {\n  grid-row: 2 / 10; }\n\n.grid-2-11 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-2-11 {\n  grid-column: 2 / 11; }\n\n.row-2-11 {\n  grid-row: 2 / 11; }\n\n.grid-2-12 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-2-12 {\n  grid-column: 2 / 12; }\n\n.row-2-12 {\n  grid-row: 2 / 12; }\n\n.grid-2-13 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-2-13 {\n  grid-column: 2 / 13; }\n\n.row-2-13 {\n  grid-row: 2 / 13; }\n\n.grid-2-14 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-2-14 {\n  grid-column: 2 / 14; }\n\n.row-2-14 {\n  grid-row: 2 / 14; }\n\n.grid-2-15 {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-2-15 {\n  grid-column: 2 / 15; }\n\n.row-2-15 {\n  grid-row: 2 / 15; }\n\n.grid-3 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-3 {\n  grid-column: span 3; }\n\n.row-3 {\n  grid-row: span 3; }\n\n.grid-3-1 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-3-1 {\n  grid-column: 3 / 1; }\n\n.row-3-1 {\n  grid-row: 3 / 1; }\n\n.grid-3-2 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-3-2 {\n  grid-column: 3 / 2; }\n\n.row-3-2 {\n  grid-row: 3 / 2; }\n\n.grid-3-3 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-3-3 {\n  grid-column: 3 / 3; }\n\n.row-3-3 {\n  grid-row: 3 / 3; }\n\n.grid-3-4 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-3-4 {\n  grid-column: 3 / 4; }\n\n.row-3-4 {\n  grid-row: 3 / 4; }\n\n.grid-3-5 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-3-5 {\n  grid-column: 3 / 5; }\n\n.row-3-5 {\n  grid-row: 3 / 5; }\n\n.grid-3-6 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-3-6 {\n  grid-column: 3 / 6; }\n\n.row-3-6 {\n  grid-row: 3 / 6; }\n\n.grid-3-7 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-3-7 {\n  grid-column: 3 / 7; }\n\n.row-3-7 {\n  grid-row: 3 / 7; }\n\n.grid-3-8 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-3-8 {\n  grid-column: 3 / 8; }\n\n.row-3-8 {\n  grid-row: 3 / 8; }\n\n.grid-3-9 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-3-9 {\n  grid-column: 3 / 9; }\n\n.row-3-9 {\n  grid-row: 3 / 9; }\n\n.grid-3-10 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-3-10 {\n  grid-column: 3 / 10; }\n\n.row-3-10 {\n  grid-row: 3 / 10; }\n\n.grid-3-11 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-3-11 {\n  grid-column: 3 / 11; }\n\n.row-3-11 {\n  grid-row: 3 / 11; }\n\n.grid-3-12 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-3-12 {\n  grid-column: 3 / 12; }\n\n.row-3-12 {\n  grid-row: 3 / 12; }\n\n.grid-3-13 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-3-13 {\n  grid-column: 3 / 13; }\n\n.row-3-13 {\n  grid-row: 3 / 13; }\n\n.grid-3-14 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-3-14 {\n  grid-column: 3 / 14; }\n\n.row-3-14 {\n  grid-row: 3 / 14; }\n\n.grid-3-15 {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-3-15 {\n  grid-column: 3 / 15; }\n\n.row-3-15 {\n  grid-row: 3 / 15; }\n\n.grid-4 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-4 {\n  grid-column: span 4; }\n\n.row-4 {\n  grid-row: span 4; }\n\n.grid-4-1 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-4-1 {\n  grid-column: 4 / 1; }\n\n.row-4-1 {\n  grid-row: 4 / 1; }\n\n.grid-4-2 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-4-2 {\n  grid-column: 4 / 2; }\n\n.row-4-2 {\n  grid-row: 4 / 2; }\n\n.grid-4-3 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-4-3 {\n  grid-column: 4 / 3; }\n\n.row-4-3 {\n  grid-row: 4 / 3; }\n\n.grid-4-4 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-4-4 {\n  grid-column: 4 / 4; }\n\n.row-4-4 {\n  grid-row: 4 / 4; }\n\n.grid-4-5 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-4-5 {\n  grid-column: 4 / 5; }\n\n.row-4-5 {\n  grid-row: 4 / 5; }\n\n.grid-4-6 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-4-6 {\n  grid-column: 4 / 6; }\n\n.row-4-6 {\n  grid-row: 4 / 6; }\n\n.grid-4-7 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-4-7 {\n  grid-column: 4 / 7; }\n\n.row-4-7 {\n  grid-row: 4 / 7; }\n\n.grid-4-8 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-4-8 {\n  grid-column: 4 / 8; }\n\n.row-4-8 {\n  grid-row: 4 / 8; }\n\n.grid-4-9 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-4-9 {\n  grid-column: 4 / 9; }\n\n.row-4-9 {\n  grid-row: 4 / 9; }\n\n.grid-4-10 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-4-10 {\n  grid-column: 4 / 10; }\n\n.row-4-10 {\n  grid-row: 4 / 10; }\n\n.grid-4-11 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-4-11 {\n  grid-column: 4 / 11; }\n\n.row-4-11 {\n  grid-row: 4 / 11; }\n\n.grid-4-12 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-4-12 {\n  grid-column: 4 / 12; }\n\n.row-4-12 {\n  grid-row: 4 / 12; }\n\n.grid-4-13 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-4-13 {\n  grid-column: 4 / 13; }\n\n.row-4-13 {\n  grid-row: 4 / 13; }\n\n.grid-4-14 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-4-14 {\n  grid-column: 4 / 14; }\n\n.row-4-14 {\n  grid-row: 4 / 14; }\n\n.grid-4-15 {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-4-15 {\n  grid-column: 4 / 15; }\n\n.row-4-15 {\n  grid-row: 4 / 15; }\n\n.grid-5 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-5 {\n  grid-column: span 5; }\n\n.row-5 {\n  grid-row: span 5; }\n\n.grid-5-1 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-5-1 {\n  grid-column: 5 / 1; }\n\n.row-5-1 {\n  grid-row: 5 / 1; }\n\n.grid-5-2 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-5-2 {\n  grid-column: 5 / 2; }\n\n.row-5-2 {\n  grid-row: 5 / 2; }\n\n.grid-5-3 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-5-3 {\n  grid-column: 5 / 3; }\n\n.row-5-3 {\n  grid-row: 5 / 3; }\n\n.grid-5-4 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-5-4 {\n  grid-column: 5 / 4; }\n\n.row-5-4 {\n  grid-row: 5 / 4; }\n\n.grid-5-5 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-5-5 {\n  grid-column: 5 / 5; }\n\n.row-5-5 {\n  grid-row: 5 / 5; }\n\n.grid-5-6 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-5-6 {\n  grid-column: 5 / 6; }\n\n.row-5-6 {\n  grid-row: 5 / 6; }\n\n.grid-5-7 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-5-7 {\n  grid-column: 5 / 7; }\n\n.row-5-7 {\n  grid-row: 5 / 7; }\n\n.grid-5-8 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-5-8 {\n  grid-column: 5 / 8; }\n\n.row-5-8 {\n  grid-row: 5 / 8; }\n\n.grid-5-9 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-5-9 {\n  grid-column: 5 / 9; }\n\n.row-5-9 {\n  grid-row: 5 / 9; }\n\n.grid-5-10 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-5-10 {\n  grid-column: 5 / 10; }\n\n.row-5-10 {\n  grid-row: 5 / 10; }\n\n.grid-5-11 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-5-11 {\n  grid-column: 5 / 11; }\n\n.row-5-11 {\n  grid-row: 5 / 11; }\n\n.grid-5-12 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-5-12 {\n  grid-column: 5 / 12; }\n\n.row-5-12 {\n  grid-row: 5 / 12; }\n\n.grid-5-13 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-5-13 {\n  grid-column: 5 / 13; }\n\n.row-5-13 {\n  grid-row: 5 / 13; }\n\n.grid-5-14 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-5-14 {\n  grid-column: 5 / 14; }\n\n.row-5-14 {\n  grid-row: 5 / 14; }\n\n.grid-5-15 {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-5-15 {\n  grid-column: 5 / 15; }\n\n.row-5-15 {\n  grid-row: 5 / 15; }\n\n.grid-6 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-6 {\n  grid-column: span 6; }\n\n.row-6 {\n  grid-row: span 6; }\n\n.grid-6-1 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-6-1 {\n  grid-column: 6 / 1; }\n\n.row-6-1 {\n  grid-row: 6 / 1; }\n\n.grid-6-2 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-6-2 {\n  grid-column: 6 / 2; }\n\n.row-6-2 {\n  grid-row: 6 / 2; }\n\n.grid-6-3 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-6-3 {\n  grid-column: 6 / 3; }\n\n.row-6-3 {\n  grid-row: 6 / 3; }\n\n.grid-6-4 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-6-4 {\n  grid-column: 6 / 4; }\n\n.row-6-4 {\n  grid-row: 6 / 4; }\n\n.grid-6-5 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-6-5 {\n  grid-column: 6 / 5; }\n\n.row-6-5 {\n  grid-row: 6 / 5; }\n\n.grid-6-6 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-6-6 {\n  grid-column: 6 / 6; }\n\n.row-6-6 {\n  grid-row: 6 / 6; }\n\n.grid-6-7 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-6-7 {\n  grid-column: 6 / 7; }\n\n.row-6-7 {\n  grid-row: 6 / 7; }\n\n.grid-6-8 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-6-8 {\n  grid-column: 6 / 8; }\n\n.row-6-8 {\n  grid-row: 6 / 8; }\n\n.grid-6-9 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-6-9 {\n  grid-column: 6 / 9; }\n\n.row-6-9 {\n  grid-row: 6 / 9; }\n\n.grid-6-10 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-6-10 {\n  grid-column: 6 / 10; }\n\n.row-6-10 {\n  grid-row: 6 / 10; }\n\n.grid-6-11 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-6-11 {\n  grid-column: 6 / 11; }\n\n.row-6-11 {\n  grid-row: 6 / 11; }\n\n.grid-6-12 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-6-12 {\n  grid-column: 6 / 12; }\n\n.row-6-12 {\n  grid-row: 6 / 12; }\n\n.grid-6-13 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-6-13 {\n  grid-column: 6 / 13; }\n\n.row-6-13 {\n  grid-row: 6 / 13; }\n\n.grid-6-14 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-6-14 {\n  grid-column: 6 / 14; }\n\n.row-6-14 {\n  grid-row: 6 / 14; }\n\n.grid-6-15 {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-6-15 {\n  grid-column: 6 / 15; }\n\n.row-6-15 {\n  grid-row: 6 / 15; }\n\n.grid-7 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-7 {\n  grid-column: span 7; }\n\n.row-7 {\n  grid-row: span 7; }\n\n.grid-7-1 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-7-1 {\n  grid-column: 7 / 1; }\n\n.row-7-1 {\n  grid-row: 7 / 1; }\n\n.grid-7-2 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-7-2 {\n  grid-column: 7 / 2; }\n\n.row-7-2 {\n  grid-row: 7 / 2; }\n\n.grid-7-3 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-7-3 {\n  grid-column: 7 / 3; }\n\n.row-7-3 {\n  grid-row: 7 / 3; }\n\n.grid-7-4 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-7-4 {\n  grid-column: 7 / 4; }\n\n.row-7-4 {\n  grid-row: 7 / 4; }\n\n.grid-7-5 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-7-5 {\n  grid-column: 7 / 5; }\n\n.row-7-5 {\n  grid-row: 7 / 5; }\n\n.grid-7-6 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-7-6 {\n  grid-column: 7 / 6; }\n\n.row-7-6 {\n  grid-row: 7 / 6; }\n\n.grid-7-7 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-7-7 {\n  grid-column: 7 / 7; }\n\n.row-7-7 {\n  grid-row: 7 / 7; }\n\n.grid-7-8 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-7-8 {\n  grid-column: 7 / 8; }\n\n.row-7-8 {\n  grid-row: 7 / 8; }\n\n.grid-7-9 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-7-9 {\n  grid-column: 7 / 9; }\n\n.row-7-9 {\n  grid-row: 7 / 9; }\n\n.grid-7-10 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-7-10 {\n  grid-column: 7 / 10; }\n\n.row-7-10 {\n  grid-row: 7 / 10; }\n\n.grid-7-11 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-7-11 {\n  grid-column: 7 / 11; }\n\n.row-7-11 {\n  grid-row: 7 / 11; }\n\n.grid-7-12 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-7-12 {\n  grid-column: 7 / 12; }\n\n.row-7-12 {\n  grid-row: 7 / 12; }\n\n.grid-7-13 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-7-13 {\n  grid-column: 7 / 13; }\n\n.row-7-13 {\n  grid-row: 7 / 13; }\n\n.grid-7-14 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-7-14 {\n  grid-column: 7 / 14; }\n\n.row-7-14 {\n  grid-row: 7 / 14; }\n\n.grid-7-15 {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-7-15 {\n  grid-column: 7 / 15; }\n\n.row-7-15 {\n  grid-row: 7 / 15; }\n\n.grid-8 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-8 {\n  grid-column: span 8; }\n\n.row-8 {\n  grid-row: span 8; }\n\n.grid-8-1 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-8-1 {\n  grid-column: 8 / 1; }\n\n.row-8-1 {\n  grid-row: 8 / 1; }\n\n.grid-8-2 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-8-2 {\n  grid-column: 8 / 2; }\n\n.row-8-2 {\n  grid-row: 8 / 2; }\n\n.grid-8-3 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-8-3 {\n  grid-column: 8 / 3; }\n\n.row-8-3 {\n  grid-row: 8 / 3; }\n\n.grid-8-4 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-8-4 {\n  grid-column: 8 / 4; }\n\n.row-8-4 {\n  grid-row: 8 / 4; }\n\n.grid-8-5 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-8-5 {\n  grid-column: 8 / 5; }\n\n.row-8-5 {\n  grid-row: 8 / 5; }\n\n.grid-8-6 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-8-6 {\n  grid-column: 8 / 6; }\n\n.row-8-6 {\n  grid-row: 8 / 6; }\n\n.grid-8-7 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-8-7 {\n  grid-column: 8 / 7; }\n\n.row-8-7 {\n  grid-row: 8 / 7; }\n\n.grid-8-8 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-8-8 {\n  grid-column: 8 / 8; }\n\n.row-8-8 {\n  grid-row: 8 / 8; }\n\n.grid-8-9 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-8-9 {\n  grid-column: 8 / 9; }\n\n.row-8-9 {\n  grid-row: 8 / 9; }\n\n.grid-8-10 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-8-10 {\n  grid-column: 8 / 10; }\n\n.row-8-10 {\n  grid-row: 8 / 10; }\n\n.grid-8-11 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-8-11 {\n  grid-column: 8 / 11; }\n\n.row-8-11 {\n  grid-row: 8 / 11; }\n\n.grid-8-12 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-8-12 {\n  grid-column: 8 / 12; }\n\n.row-8-12 {\n  grid-row: 8 / 12; }\n\n.grid-8-13 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-8-13 {\n  grid-column: 8 / 13; }\n\n.row-8-13 {\n  grid-row: 8 / 13; }\n\n.grid-8-14 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-8-14 {\n  grid-column: 8 / 14; }\n\n.row-8-14 {\n  grid-row: 8 / 14; }\n\n.grid-8-15 {\n  display: grid;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-8-15 {\n  grid-column: 8 / 15; }\n\n.row-8-15 {\n  grid-row: 8 / 15; }\n\n.grid-9 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-9 {\n  grid-column: span 9; }\n\n.row-9 {\n  grid-row: span 9; }\n\n.grid-9-1 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-9-1 {\n  grid-column: 9 / 1; }\n\n.row-9-1 {\n  grid-row: 9 / 1; }\n\n.grid-9-2 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-9-2 {\n  grid-column: 9 / 2; }\n\n.row-9-2 {\n  grid-row: 9 / 2; }\n\n.grid-9-3 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-9-3 {\n  grid-column: 9 / 3; }\n\n.row-9-3 {\n  grid-row: 9 / 3; }\n\n.grid-9-4 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-9-4 {\n  grid-column: 9 / 4; }\n\n.row-9-4 {\n  grid-row: 9 / 4; }\n\n.grid-9-5 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-9-5 {\n  grid-column: 9 / 5; }\n\n.row-9-5 {\n  grid-row: 9 / 5; }\n\n.grid-9-6 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-9-6 {\n  grid-column: 9 / 6; }\n\n.row-9-6 {\n  grid-row: 9 / 6; }\n\n.grid-9-7 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-9-7 {\n  grid-column: 9 / 7; }\n\n.row-9-7 {\n  grid-row: 9 / 7; }\n\n.grid-9-8 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-9-8 {\n  grid-column: 9 / 8; }\n\n.row-9-8 {\n  grid-row: 9 / 8; }\n\n.grid-9-9 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-9-9 {\n  grid-column: 9 / 9; }\n\n.row-9-9 {\n  grid-row: 9 / 9; }\n\n.grid-9-10 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-9-10 {\n  grid-column: 9 / 10; }\n\n.row-9-10 {\n  grid-row: 9 / 10; }\n\n.grid-9-11 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-9-11 {\n  grid-column: 9 / 11; }\n\n.row-9-11 {\n  grid-row: 9 / 11; }\n\n.grid-9-12 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-9-12 {\n  grid-column: 9 / 12; }\n\n.row-9-12 {\n  grid-row: 9 / 12; }\n\n.grid-9-13 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-9-13 {\n  grid-column: 9 / 13; }\n\n.row-9-13 {\n  grid-row: 9 / 13; }\n\n.grid-9-14 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-9-14 {\n  grid-column: 9 / 14; }\n\n.row-9-14 {\n  grid-row: 9 / 14; }\n\n.grid-9-15 {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-9-15 {\n  grid-column: 9 / 15; }\n\n.row-9-15 {\n  grid-row: 9 / 15; }\n\n.grid-10 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-10 {\n  grid-column: span 10; }\n\n.row-10 {\n  grid-row: span 10; }\n\n.grid-10-1 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-10-1 {\n  grid-column: 10 / 1; }\n\n.row-10-1 {\n  grid-row: 10 / 1; }\n\n.grid-10-2 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-10-2 {\n  grid-column: 10 / 2; }\n\n.row-10-2 {\n  grid-row: 10 / 2; }\n\n.grid-10-3 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-10-3 {\n  grid-column: 10 / 3; }\n\n.row-10-3 {\n  grid-row: 10 / 3; }\n\n.grid-10-4 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-10-4 {\n  grid-column: 10 / 4; }\n\n.row-10-4 {\n  grid-row: 10 / 4; }\n\n.grid-10-5 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-10-5 {\n  grid-column: 10 / 5; }\n\n.row-10-5 {\n  grid-row: 10 / 5; }\n\n.grid-10-6 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-10-6 {\n  grid-column: 10 / 6; }\n\n.row-10-6 {\n  grid-row: 10 / 6; }\n\n.grid-10-7 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-10-7 {\n  grid-column: 10 / 7; }\n\n.row-10-7 {\n  grid-row: 10 / 7; }\n\n.grid-10-8 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-10-8 {\n  grid-column: 10 / 8; }\n\n.row-10-8 {\n  grid-row: 10 / 8; }\n\n.grid-10-9 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-10-9 {\n  grid-column: 10 / 9; }\n\n.row-10-9 {\n  grid-row: 10 / 9; }\n\n.grid-10-10 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-10-10 {\n  grid-column: 10 / 10; }\n\n.row-10-10 {\n  grid-row: 10 / 10; }\n\n.grid-10-11 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-10-11 {\n  grid-column: 10 / 11; }\n\n.row-10-11 {\n  grid-row: 10 / 11; }\n\n.grid-10-12 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-10-12 {\n  grid-column: 10 / 12; }\n\n.row-10-12 {\n  grid-row: 10 / 12; }\n\n.grid-10-13 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-10-13 {\n  grid-column: 10 / 13; }\n\n.row-10-13 {\n  grid-row: 10 / 13; }\n\n.grid-10-14 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-10-14 {\n  grid-column: 10 / 14; }\n\n.row-10-14 {\n  grid-row: 10 / 14; }\n\n.grid-10-15 {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-10-15 {\n  grid-column: 10 / 15; }\n\n.row-10-15 {\n  grid-row: 10 / 15; }\n\n.grid-11 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-11 {\n  grid-column: span 11; }\n\n.row-11 {\n  grid-row: span 11; }\n\n.grid-11-1 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-11-1 {\n  grid-column: 11 / 1; }\n\n.row-11-1 {\n  grid-row: 11 / 1; }\n\n.grid-11-2 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-11-2 {\n  grid-column: 11 / 2; }\n\n.row-11-2 {\n  grid-row: 11 / 2; }\n\n.grid-11-3 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-11-3 {\n  grid-column: 11 / 3; }\n\n.row-11-3 {\n  grid-row: 11 / 3; }\n\n.grid-11-4 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-11-4 {\n  grid-column: 11 / 4; }\n\n.row-11-4 {\n  grid-row: 11 / 4; }\n\n.grid-11-5 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-11-5 {\n  grid-column: 11 / 5; }\n\n.row-11-5 {\n  grid-row: 11 / 5; }\n\n.grid-11-6 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-11-6 {\n  grid-column: 11 / 6; }\n\n.row-11-6 {\n  grid-row: 11 / 6; }\n\n.grid-11-7 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-11-7 {\n  grid-column: 11 / 7; }\n\n.row-11-7 {\n  grid-row: 11 / 7; }\n\n.grid-11-8 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-11-8 {\n  grid-column: 11 / 8; }\n\n.row-11-8 {\n  grid-row: 11 / 8; }\n\n.grid-11-9 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-11-9 {\n  grid-column: 11 / 9; }\n\n.row-11-9 {\n  grid-row: 11 / 9; }\n\n.grid-11-10 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-11-10 {\n  grid-column: 11 / 10; }\n\n.row-11-10 {\n  grid-row: 11 / 10; }\n\n.grid-11-11 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-11-11 {\n  grid-column: 11 / 11; }\n\n.row-11-11 {\n  grid-row: 11 / 11; }\n\n.grid-11-12 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-11-12 {\n  grid-column: 11 / 12; }\n\n.row-11-12 {\n  grid-row: 11 / 12; }\n\n.grid-11-13 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-11-13 {\n  grid-column: 11 / 13; }\n\n.row-11-13 {\n  grid-row: 11 / 13; }\n\n.grid-11-14 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-11-14 {\n  grid-column: 11 / 14; }\n\n.row-11-14 {\n  grid-row: 11 / 14; }\n\n.grid-11-15 {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-11-15 {\n  grid-column: 11 / 15; }\n\n.row-11-15 {\n  grid-row: 11 / 15; }\n\n.grid-12 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-12 {\n  grid-column: span 12; }\n\n.row-12 {\n  grid-row: span 12; }\n\n.grid-12-1 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-12-1 {\n  grid-column: 12 / 1; }\n\n.row-12-1 {\n  grid-row: 12 / 1; }\n\n.grid-12-2 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-12-2 {\n  grid-column: 12 / 2; }\n\n.row-12-2 {\n  grid-row: 12 / 2; }\n\n.grid-12-3 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-12-3 {\n  grid-column: 12 / 3; }\n\n.row-12-3 {\n  grid-row: 12 / 3; }\n\n.grid-12-4 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-12-4 {\n  grid-column: 12 / 4; }\n\n.row-12-4 {\n  grid-row: 12 / 4; }\n\n.grid-12-5 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-12-5 {\n  grid-column: 12 / 5; }\n\n.row-12-5 {\n  grid-row: 12 / 5; }\n\n.grid-12-6 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-12-6 {\n  grid-column: 12 / 6; }\n\n.row-12-6 {\n  grid-row: 12 / 6; }\n\n.grid-12-7 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-12-7 {\n  grid-column: 12 / 7; }\n\n.row-12-7 {\n  grid-row: 12 / 7; }\n\n.grid-12-8 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-12-8 {\n  grid-column: 12 / 8; }\n\n.row-12-8 {\n  grid-row: 12 / 8; }\n\n.grid-12-9 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-12-9 {\n  grid-column: 12 / 9; }\n\n.row-12-9 {\n  grid-row: 12 / 9; }\n\n.grid-12-10 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-12-10 {\n  grid-column: 12 / 10; }\n\n.row-12-10 {\n  grid-row: 12 / 10; }\n\n.grid-12-11 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-12-11 {\n  grid-column: 12 / 11; }\n\n.row-12-11 {\n  grid-row: 12 / 11; }\n\n.grid-12-12 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-12-12 {\n  grid-column: 12 / 12; }\n\n.row-12-12 {\n  grid-row: 12 / 12; }\n\n.grid-12-13 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-12-13 {\n  grid-column: 12 / 13; }\n\n.row-12-13 {\n  grid-row: 12 / 13; }\n\n.grid-12-14 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-12-14 {\n  grid-column: 12 / 14; }\n\n.row-12-14 {\n  grid-row: 12 / 14; }\n\n.grid-12-15 {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-12-15 {\n  grid-column: 12 / 15; }\n\n.row-12-15 {\n  grid-row: 12 / 15; }\n\n.grid-13 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-13 {\n  grid-column: span 13; }\n\n.row-13 {\n  grid-row: span 13; }\n\n.grid-13-1 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-13-1 {\n  grid-column: 13 / 1; }\n\n.row-13-1 {\n  grid-row: 13 / 1; }\n\n.grid-13-2 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-13-2 {\n  grid-column: 13 / 2; }\n\n.row-13-2 {\n  grid-row: 13 / 2; }\n\n.grid-13-3 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-13-3 {\n  grid-column: 13 / 3; }\n\n.row-13-3 {\n  grid-row: 13 / 3; }\n\n.grid-13-4 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-13-4 {\n  grid-column: 13 / 4; }\n\n.row-13-4 {\n  grid-row: 13 / 4; }\n\n.grid-13-5 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-13-5 {\n  grid-column: 13 / 5; }\n\n.row-13-5 {\n  grid-row: 13 / 5; }\n\n.grid-13-6 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-13-6 {\n  grid-column: 13 / 6; }\n\n.row-13-6 {\n  grid-row: 13 / 6; }\n\n.grid-13-7 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-13-7 {\n  grid-column: 13 / 7; }\n\n.row-13-7 {\n  grid-row: 13 / 7; }\n\n.grid-13-8 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-13-8 {\n  grid-column: 13 / 8; }\n\n.row-13-8 {\n  grid-row: 13 / 8; }\n\n.grid-13-9 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-13-9 {\n  grid-column: 13 / 9; }\n\n.row-13-9 {\n  grid-row: 13 / 9; }\n\n.grid-13-10 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-13-10 {\n  grid-column: 13 / 10; }\n\n.row-13-10 {\n  grid-row: 13 / 10; }\n\n.grid-13-11 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-13-11 {\n  grid-column: 13 / 11; }\n\n.row-13-11 {\n  grid-row: 13 / 11; }\n\n.grid-13-12 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-13-12 {\n  grid-column: 13 / 12; }\n\n.row-13-12 {\n  grid-row: 13 / 12; }\n\n.grid-13-13 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-13-13 {\n  grid-column: 13 / 13; }\n\n.row-13-13 {\n  grid-row: 13 / 13; }\n\n.grid-13-14 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-13-14 {\n  grid-column: 13 / 14; }\n\n.row-13-14 {\n  grid-row: 13 / 14; }\n\n.grid-13-15 {\n  display: grid;\n  grid-template-columns: repeat(13, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-13-15 {\n  grid-column: 13 / 15; }\n\n.row-13-15 {\n  grid-row: 13 / 15; }\n\n.grid-14 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-14 {\n  grid-column: span 14; }\n\n.row-14 {\n  grid-row: span 14; }\n\n.grid-14-1 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-14-1 {\n  grid-column: 14 / 1; }\n\n.row-14-1 {\n  grid-row: 14 / 1; }\n\n.grid-14-2 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-14-2 {\n  grid-column: 14 / 2; }\n\n.row-14-2 {\n  grid-row: 14 / 2; }\n\n.grid-14-3 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-14-3 {\n  grid-column: 14 / 3; }\n\n.row-14-3 {\n  grid-row: 14 / 3; }\n\n.grid-14-4 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-14-4 {\n  grid-column: 14 / 4; }\n\n.row-14-4 {\n  grid-row: 14 / 4; }\n\n.grid-14-5 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-14-5 {\n  grid-column: 14 / 5; }\n\n.row-14-5 {\n  grid-row: 14 / 5; }\n\n.grid-14-6 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-14-6 {\n  grid-column: 14 / 6; }\n\n.row-14-6 {\n  grid-row: 14 / 6; }\n\n.grid-14-7 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-14-7 {\n  grid-column: 14 / 7; }\n\n.row-14-7 {\n  grid-row: 14 / 7; }\n\n.grid-14-8 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-14-8 {\n  grid-column: 14 / 8; }\n\n.row-14-8 {\n  grid-row: 14 / 8; }\n\n.grid-14-9 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-14-9 {\n  grid-column: 14 / 9; }\n\n.row-14-9 {\n  grid-row: 14 / 9; }\n\n.grid-14-10 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-14-10 {\n  grid-column: 14 / 10; }\n\n.row-14-10 {\n  grid-row: 14 / 10; }\n\n.grid-14-11 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-14-11 {\n  grid-column: 14 / 11; }\n\n.row-14-11 {\n  grid-row: 14 / 11; }\n\n.grid-14-12 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-14-12 {\n  grid-column: 14 / 12; }\n\n.row-14-12 {\n  grid-row: 14 / 12; }\n\n.grid-14-13 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-14-13 {\n  grid-column: 14 / 13; }\n\n.row-14-13 {\n  grid-row: 14 / 13; }\n\n.grid-14-14 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-14-14 {\n  grid-column: 14 / 14; }\n\n.row-14-14 {\n  grid-row: 14 / 14; }\n\n.grid-14-15 {\n  display: grid;\n  grid-template-columns: repeat(14, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-14-15 {\n  grid-column: 14 / 15; }\n\n.row-14-15 {\n  grid-row: 14 / 15; }\n\n.grid-15 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-15 {\n  grid-column: span 15; }\n\n.row-15 {\n  grid-row: span 15; }\n\n.grid-15-1 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(1, 1fr); }\n\n.column-15-1 {\n  grid-column: 15 / 1; }\n\n.row-15-1 {\n  grid-row: 15 / 1; }\n\n.grid-15-2 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(2, 1fr); }\n\n.column-15-2 {\n  grid-column: 15 / 2; }\n\n.row-15-2 {\n  grid-row: 15 / 2; }\n\n.grid-15-3 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(3, 1fr); }\n\n.column-15-3 {\n  grid-column: 15 / 3; }\n\n.row-15-3 {\n  grid-row: 15 / 3; }\n\n.grid-15-4 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(4, 1fr); }\n\n.column-15-4 {\n  grid-column: 15 / 4; }\n\n.row-15-4 {\n  grid-row: 15 / 4; }\n\n.grid-15-5 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(5, 1fr); }\n\n.column-15-5 {\n  grid-column: 15 / 5; }\n\n.row-15-5 {\n  grid-row: 15 / 5; }\n\n.grid-15-6 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(6, 1fr); }\n\n.column-15-6 {\n  grid-column: 15 / 6; }\n\n.row-15-6 {\n  grid-row: 15 / 6; }\n\n.grid-15-7 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(7, 1fr); }\n\n.column-15-7 {\n  grid-column: 15 / 7; }\n\n.row-15-7 {\n  grid-row: 15 / 7; }\n\n.grid-15-8 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(8, 1fr); }\n\n.column-15-8 {\n  grid-column: 15 / 8; }\n\n.row-15-8 {\n  grid-row: 15 / 8; }\n\n.grid-15-9 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(9, 1fr); }\n\n.column-15-9 {\n  grid-column: 15 / 9; }\n\n.row-15-9 {\n  grid-row: 15 / 9; }\n\n.grid-15-10 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(10, 1fr); }\n\n.column-15-10 {\n  grid-column: 15 / 10; }\n\n.row-15-10 {\n  grid-row: 15 / 10; }\n\n.grid-15-11 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(11, 1fr); }\n\n.column-15-11 {\n  grid-column: 15 / 11; }\n\n.row-15-11 {\n  grid-row: 15 / 11; }\n\n.grid-15-12 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(12, 1fr); }\n\n.column-15-12 {\n  grid-column: 15 / 12; }\n\n.row-15-12 {\n  grid-row: 15 / 12; }\n\n.grid-15-13 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(13, 1fr); }\n\n.column-15-13 {\n  grid-column: 15 / 13; }\n\n.row-15-13 {\n  grid-row: 15 / 13; }\n\n.grid-15-14 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(14, 1fr); }\n\n.column-15-14 {\n  grid-column: 15 / 14; }\n\n.row-15-14 {\n  grid-row: 15 / 14; }\n\n.grid-15-15 {\n  display: grid;\n  grid-template-columns: repeat(15, 1fr);\n  grid-template-rows: repeat(15, 1fr); }\n\n.column-15-15 {\n  grid-column: 15 / 15; }\n\n.row-15-15 {\n  grid-row: 15 / 15; }\n\n.header_wrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  color: inherit;\n  padding: calc(0.75 * var(--spacing-unit));\n  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.18);\n  margin-bottom: calc(1.25 * var(--spacing-unit)); }\n\n.page-title {\n  font-weight: bold;\n  font-family: \"Roboto\", Helvetica, arial, cursive;\n  padding: calc(0.25 * var(--fixed-spacing-unit));\n  border: solid 2px currentColor;\n  border-radius: calc(0.75 * var(--fixed-spacing-unit)); }\n\n.navbar {\n  margin-left: auto;\n  margin-right: calc(1.25 * var(--spacing-unit)); }\n  .navbar a {\n    text-decoration: none; }\n\n.promotions_title {\n  position: relative;\n  padding-bottom: calc(0.75 * var(--fixed-spacing-unit));\n  margin-bottom: calc(0.5 * var(--spacing-unit));\n  font-weight: bold; }\n  .promotions_title::after {\n    content: \"\";\n    position: absolute;\n    bottom: 0;\n    left: 50%;\n    transform: translate(-50%);\n    height: 1px;\n    width: 3em;\n    background-color: #383f47; }\n\n.promotion-list {\n  margin: calc(0.75 * var(--spacing-unit)); }\n\n.promotion-create_form.disabled {\n  opacity: 0.5; }\n  .promotion-create_form.disabled .input[type=\"submit\"] {\n    cursor: not-allowed; }\n\n.promotion-detail_infos {\n  font-size: calc(1.05em * 1.2 * 1.2);\n  font-family: \"Roboto\", Helvetica, arial, cursive; }\n  .promotion-detail_infos .info {\n    font-family: \"Roboto Mono\", monospace;\n    font-size: calc(1.05em / (1.2 * 1.2));\n    font-weight: normal;\n    display: block;\n    margin-top: calc(0.5 * var(--spacing-unit));\n    margin-bottom: calc(0.75 * var(--spacing-unit)); }\n  .promotion-detail_infos .action-bar {\n    padding: calc(0.75 * var(--spacing-unit)); }\n\n.student-list {\n  margin: calc(0.75 * var(--spacing-unit)); }\n\n.student-list_action-bar {\n  padding: calc(0.75 * var(--spacing-unit)); }\n\n:global(.input) {\n  display: block;\n  width: 100%;\n  padding: calc(0.5 * var(--spacing-unit));\n  border: solid 1px #cccccc; }\n  :global(.input):focus {\n    outline-color: #383f47; }\n  :global(.input)[type=submit] {\n    background-color: #383f47;\n    color: white;\n    font-weight: bold;\n    text-transform: uppercase;\n    font-family: \"Roboto\", Helvetica, arial, cursive;\n    letter-spacing: 4px;\n    cursor: pointer; }\n    :global(.input)[type=submit]:hover, :global(.input)[type=submit]:focus {\n      background-color: #22262b; }\n\n:global(.label) {\n  margin-bottom: calc(0.75 * var(--spacing-unit));\n  display: block; }\n\n.rich-list {\n  --border: solid 1px #cccccc;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: repeat(1, 1fr);\n  border: var(--border);\n  border-bottom-color: rgba(0, 0, 0, 0); }\n\n.rich-list_item:nth-of-type(3n-2) a, .rich-list_item:nth-of-type(3n-1) a {\n  border-right: var(--border); }\n\n.rich-list_item:nth-of-type(odd) a {\n  background-color: #f2f2f2; }\n\n.rich-list_item:nth-of-type(even) a {\n  background-color: white; }\n\n.rich-list_item a {\n  padding: calc(0.75 * var(--spacing-unit)) calc(0.5 * var(--spacing-unit));\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-bottom: var(--border);\n  height: 100%; }\n  .rich-list_item a:hover {\n    background-color: #383f47;\n    color: white; }\n\n.modal {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0.6);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: modal-appear 0.35s; }\n  .modal.hidden {\n    display: none; }\n\n.modal-content {\n  background-color: white;\n  padding: calc(1.25 * var(--spacing-unit)); }\n\n.modal-action-bar {\n  margin-top: calc(0.75 * var(--spacing-unit)); }\n\n@keyframes modal-appear {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n:global(.btn-primary) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #383f47;\n  color: white; }\n  :global(.btn-primary):hover {\n    background-color: #22262b; }\n  :global(.btn-primary).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #383f47;\n    border: solid 1px #383f47; }\n    :global(.btn-primary).outlined:hover {\n      color: #22262b;\n      border-color: #22262b; }\n\n:global(.btn-primary-dark) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #22262b;\n  color: white; }\n  :global(.btn-primary-dark):hover {\n    background-color: #0b0d0e; }\n  :global(.btn-primary-dark).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #22262b;\n    border: solid 1px #22262b; }\n    :global(.btn-primary-dark).outlined:hover {\n      color: #0b0d0e;\n      border-color: #0b0d0e; }\n\n:global(.btn-primary-darker) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: black;\n  color: white; }\n  :global(.btn-primary-darker):hover {\n    background-color: black; }\n  :global(.btn-primary-darker).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: black;\n    border: solid 1px black; }\n    :global(.btn-primary-darker).outlined:hover {\n      color: black;\n      border-color: black; }\n\n:global(.btn-primary-light) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4f5864;\n  color: white; }\n  :global(.btn-primary-light):hover {\n    background-color: #383f47; }\n  :global(.btn-primary-light).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4f5864;\n    border: solid 1px #4f5864; }\n    :global(.btn-primary-light).outlined:hover {\n      color: #383f47;\n      border-color: #383f47; }\n\n:global(.btn-primary-lighter) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #707d8f;\n  color: white; }\n  :global(.btn-primary-lighter):hover {\n    background-color: #5a6472; }\n  :global(.btn-primary-lighter).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #707d8f;\n    border: solid 1px #707d8f; }\n    :global(.btn-primary-lighter).outlined:hover {\n      color: #5a6472;\n      border-color: #5a6472; }\n\n:global(.btn-primary-half) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: rgba(56, 63, 71, 0.5);\n  color: white; }\n  :global(.btn-primary-half):hover {\n    background-color: rgba(34, 38, 43, 0.5); }\n  :global(.btn-primary-half).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: rgba(56, 63, 71, 0.5);\n    border: solid 1px rgba(56, 63, 71, 0.5); }\n    :global(.btn-primary-half).outlined:hover {\n      color: rgba(34, 38, 43, 0.5);\n      border-color: rgba(34, 38, 43, 0.5); }\n\n:global(.btn-secondary) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #2bb0ee;\n  color: white; }\n  :global(.btn-secondary):hover {\n    background-color: #1197d4; }\n  :global(.btn-secondary).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #2bb0ee;\n    border: solid 1px #2bb0ee; }\n    :global(.btn-secondary).outlined:hover {\n      color: #1197d4;\n      border-color: #1197d4; }\n\n:global(.btn-secondary-dark) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #1197d4;\n  color: white; }\n  :global(.btn-secondary-dark):hover {\n    background-color: #0d75a5; }\n  :global(.btn-secondary-dark).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #1197d4;\n    border: solid 1px #1197d4; }\n    :global(.btn-secondary-dark).outlined:hover {\n      color: #0d75a5;\n      border-color: #0d75a5; }\n\n:global(.btn-secondary-darker) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #0b648e;\n  color: white; }\n  :global(.btn-secondary-darker):hover {\n    background-color: #08435e; }\n  :global(.btn-secondary-darker).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #0b648e;\n    border: solid 1px #0b648e; }\n    :global(.btn-secondary-darker).outlined:hover {\n      color: #08435e;\n      border-color: #08435e; }\n\n:global(.btn-secondary-light) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #5ac2f2;\n  color: white; }\n  :global(.btn-secondary-light):hover {\n    background-color: #2bb0ee; }\n  :global(.btn-secondary-light).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #5ac2f2;\n    border: solid 1px #5ac2f2; }\n    :global(.btn-secondary-light).outlined:hover {\n      color: #2bb0ee;\n      border-color: #2bb0ee; }\n\n:global(.btn-secondary-lighter) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #a1dcf7;\n  color: #222; }\n  :global(.btn-secondary-lighter):hover {\n    background-color: #71caf4; }\n  :global(.btn-secondary-lighter).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #a1dcf7;\n    border: solid 1px #a1dcf7; }\n    :global(.btn-secondary-lighter).outlined:hover {\n      color: #71caf4;\n      border-color: #71caf4; }\n\n:global(.btn-secondary-half) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: rgba(43, 176, 238, 0.5);\n  color: white; }\n  :global(.btn-secondary-half):hover {\n    background-color: rgba(17, 151, 212, 0.5); }\n  :global(.btn-secondary-half).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: rgba(43, 176, 238, 0.5);\n    border: solid 1px rgba(43, 176, 238, 0.5); }\n    :global(.btn-secondary-half).outlined:hover {\n      color: rgba(17, 151, 212, 0.5);\n      border-color: rgba(17, 151, 212, 0.5); }\n\n:global(.btn-black) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #0d0d0d;\n  color: white; }\n  :global(.btn-black):hover {\n    background-color: black; }\n  :global(.btn-black).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #0d0d0d;\n    border: solid 1px #0d0d0d; }\n    :global(.btn-black).outlined:hover {\n      color: black;\n      border-color: black; }\n\n:global(.btn-dark) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4d4d4d;\n  color: white; }\n  :global(.btn-dark):hover {\n    background-color: #333333; }\n  :global(.btn-dark).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4d4d4d;\n    border: solid 1px #4d4d4d; }\n    :global(.btn-dark).outlined:hover {\n      color: #333333;\n      border-color: #333333; }\n\n:global(.btn-light) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #f2f2f2;\n  color: #222; }\n  :global(.btn-light):hover {\n    background-color: #d9d9d9; }\n  :global(.btn-light).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #f2f2f2;\n    border: solid 1px #f2f2f2; }\n    :global(.btn-light).outlined:hover {\n      color: #d9d9d9;\n      border-color: #d9d9d9; }\n\n:global(.btn-white) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: white;\n  color: #222; }\n  :global(.btn-white):hover {\n    background-color: #e6e6e6; }\n  :global(.btn-white).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: white;\n    border: solid 1px white; }\n    :global(.btn-white).outlined:hover {\n      color: #e6e6e6;\n      border-color: #e6e6e6; }\n\n:global(.btn-info) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #2bb0ee;\n  color: white; }\n  :global(.btn-info):hover {\n    background-color: #1197d4; }\n  :global(.btn-info).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #2bb0ee;\n    border: solid 1px #2bb0ee; }\n    :global(.btn-info).outlined:hover {\n      color: #1197d4;\n      border-color: #1197d4; }\n\n:global(.btn-success) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #55c359;\n  color: white; }\n  :global(.btn-success):hover {\n    background-color: #3caa3f; }\n  :global(.btn-success).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #55c359;\n    border: solid 1px #55c359; }\n    :global(.btn-success).outlined:hover {\n      color: #3caa3f;\n      border-color: #3caa3f; }\n\n:global(.btn-warning) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #f5b656;\n  color: #222; }\n  :global(.btn-warning):hover {\n    background-color: #f2a126; }\n  :global(.btn-warning).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #f5b656;\n    border: solid 1px #f5b656; }\n    :global(.btn-warning).outlined:hover {\n      color: #f2a126;\n      border-color: #f2a126; }\n\n:global(.btn-danger) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #e73e32;\n  color: white; }\n  :global(.btn-danger):hover {\n    background-color: #cd2418; }\n  :global(.btn-danger).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #e73e32;\n    border: solid 1px #e73e32; }\n    :global(.btn-danger).outlined:hover {\n      color: #cd2418;\n      border-color: #cd2418; }\n\n:global(.btn-text) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4d4d4d;\n  color: white; }\n  :global(.btn-text):hover {\n    background-color: #333333; }\n  :global(.btn-text).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4d4d4d;\n    border: solid 1px #4d4d4d; }\n    :global(.btn-text).outlined:hover {\n      color: #333333;\n      border-color: #333333; }\n\n:global(.btn-title) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #0d0d0d;\n  color: white; }\n  :global(.btn-title):hover {\n    background-color: black; }\n  :global(.btn-title).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #0d0d0d;\n    border: solid 1px #0d0d0d; }\n    :global(.btn-title).outlined:hover {\n      color: black;\n      border-color: black; }\n\n:global(.btn-subtitle) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #4d4d4d;\n  color: white; }\n  :global(.btn-subtitle):hover {\n    background-color: #333333; }\n  :global(.btn-subtitle).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #4d4d4d;\n    border: solid 1px #4d4d4d; }\n    :global(.btn-subtitle).outlined:hover {\n      color: #333333;\n      border-color: #333333; }\n\n:global(.btn-link) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #383f47;\n  color: white; }\n  :global(.btn-link):hover {\n    background-color: #22262b; }\n  :global(.btn-link).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #383f47;\n    border: solid 1px #383f47; }\n    :global(.btn-link).outlined:hover {\n      color: #22262b;\n      border-color: #22262b; }\n\n:global(.btn-link-hovered) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #22262b;\n  color: white; }\n  :global(.btn-link-hovered):hover {\n    background-color: #0b0d0e; }\n  :global(.btn-link-hovered).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #22262b;\n    border: solid 1px #22262b; }\n    :global(.btn-link-hovered).outlined:hover {\n      color: #0b0d0e;\n      border-color: #0b0d0e; }\n\n:global(.btn-link-visited) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #383f47;\n  color: white; }\n  :global(.btn-link-visited):hover {\n    background-color: #22262b; }\n  :global(.btn-link-visited).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #383f47;\n    border: solid 1px #383f47; }\n    :global(.btn-link-visited).outlined:hover {\n      color: #22262b;\n      border-color: #22262b; }\n\n:global(.btn-foreground) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: white;\n  color: #222; }\n  :global(.btn-foreground):hover {\n    background-color: #e6e6e6; }\n  :global(.btn-foreground).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: white;\n    border: solid 1px white; }\n    :global(.btn-foreground).outlined:hover {\n      color: #e6e6e6;\n      border-color: #e6e6e6; }\n\n:global(.btn-background) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: #eceef8;\n  color: #222; }\n  :global(.btn-background):hover {\n    background-color: #c7cceb; }\n  :global(.btn-background).outlined {\n    background-color: rgba(0, 0, 0, 0);\n    color: #eceef8;\n    border: solid 1px #eceef8; }\n    :global(.btn-background).outlined:hover {\n      color: #c7cceb;\n      border-color: #c7cceb; }\n\n:global(.btn-clear) {\n  border: none;\n  padding: calc(0.5 * var(--spacing-unit)) calc(0.75 * var(--spacing-unit));\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0);\n  color: inherit; }\n\n:global(#app) {\n  font-size: 1.05em;\n  font-family: \"Roboto\", Helvetica, arial, sans-serif;\n  line-height: 1.1;\n  color: var(--color-text);\n  background-color: #eceef8;\n  overflow-x: hidden;\n  min-height: 100vh;\n  width: 100vw;\n  background: radial-gradient(circle at center, white 50%, #f2f2f2); }\n\na {\n  color: #383f47; }\n  a:hover {\n    color: #22262b; }\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/normalize-url/index.js":
/*!*********************************************!*\
  !*** ./node_modules/normalize-url/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
var prependHttp = __webpack_require__(/*! prepend-http */ "./node_modules/prepend-http/index.js");
var sortKeys = __webpack_require__(/*! sort-keys */ "./node_modules/sort-keys/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var DEFAULT_PORTS = {
	'http:': 80,
	'https:': 443,
	'ftp:': 21
};

// protocols that always contain a `//`` bit
var slashedProtocol = {
	'http': true,
	'https': true,
	'ftp': true,
	'gopher': true,
	'file': true,
	'http:': true,
	'https:': true,
	'ftp:': true,
	'gopher:': true,
	'file:': true
};

function testParameter(name, filters) {
	return filters.some(function (filter) {
		return filter instanceof RegExp ? filter.test(name) : filter === name;
	});
}

module.exports = function (str, opts) {
	opts = objectAssign({
		normalizeProtocol: true,
		normalizeHttps: false,
		stripFragment: true,
		stripWWW: true,
		removeQueryParameters: [/^utm_\w+/i],
		removeTrailingSlash: true,
		removeDirectoryIndex: false
	}, opts);

	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	var hasRelativeProtocol = str.indexOf('//') === 0;

	// prepend protocol
	str = prependHttp(str.trim()).replace(/^\/\//, 'http://');

	var urlObj = url.parse(str);

	if (opts.normalizeHttps && urlObj.protocol === 'https:') {
		urlObj.protocol = 'http:';
	}

	if (!urlObj.hostname && !urlObj.pathname) {
		throw new Error('Invalid URL');
	}

	// prevent these from being used by `url.format`
	delete urlObj.host;
	delete urlObj.query;

	// remove fragment
	if (opts.stripFragment) {
		delete urlObj.hash;
	}

	// remove default port
	var port = DEFAULT_PORTS[urlObj.protocol];
	if (Number(urlObj.port) === port) {
		delete urlObj.port;
	}

	// remove duplicate slashes
	if (urlObj.pathname) {
		urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, '/');
	}

	// decode URI octets
	if (urlObj.pathname) {
		urlObj.pathname = decodeURI(urlObj.pathname);
	}

	// remove directory index
	if (opts.removeDirectoryIndex === true) {
		opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
	}

	if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length) {
		var pathComponents = urlObj.pathname.split('/');
		var lastComponent = pathComponents[pathComponents.length - 1];

		if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
			pathComponents = pathComponents.slice(0, pathComponents.length - 1);
			urlObj.pathname = pathComponents.slice(1).join('/') + '/';
		}
	}

	// resolve relative paths, but only for slashed protocols
	if (slashedProtocol[urlObj.protocol]) {
		var domain = urlObj.protocol + '//' + urlObj.hostname;
		var relative = url.resolve(domain, urlObj.pathname);
		urlObj.pathname = relative.replace(domain, '');
	}

	if (urlObj.hostname) {
		// IDN to Unicode
		urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();

		// remove trailing dot
		urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

		// remove `www.`
		if (opts.stripWWW) {
			urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
		}
	}

	// remove URL with empty query string
	if (urlObj.search === '?') {
		delete urlObj.search;
	}

	var queryParameters = queryString.parse(urlObj.search);

	// remove query unwanted parameters
	if (Array.isArray(opts.removeQueryParameters)) {
		for (var key in queryParameters) {
			if (testParameter(key, opts.removeQueryParameters)) {
				delete queryParameters[key];
			}
		}
	}

	// sort query parameters
	urlObj.search = queryString.stringify(sortKeys(queryParameters));

	// decode query parameters
	urlObj.search = decodeURIComponent(urlObj.search);

	// take advantage of many of the Node `url` normalizations
	str = url.format(urlObj);

	// remove ending `/`
	if (opts.removeTrailingSlash || urlObj.pathname === '/') {
		str = str.replace(/\/$/, '');
	}

	// restore relative protocol, if applicable
	if (hasRelativeProtocol && !opts.normalizeProtocol) {
		str = str.replace(/^http:\/\//, '//');
	}

	return str;
};


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prepend-http/index.js":
/*!********************************************!*\
  !*** ./node_modules/prepend-http/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (url) {
	if (typeof url !== 'string') {
		throw new TypeError('Expected a string, got ' + typeof url);
	}

	url = url.trim();

	if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
		return url;
	}

	return url.replace(/^(?!(?:\w+:)?\/\/)/, 'http://');
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/sort-keys/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sort-keys/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isPlainObj = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js");

module.exports = function (obj, opts) {
	if (!isPlainObj(obj)) {
		throw new TypeError('Expected a plain object');
	}

	opts = opts || {};

	// DEPRECATED
	if (typeof opts === 'function') {
		opts = {compare: opts};
	}

	var deep = opts.deep;
	var seenInput = [];
	var seenOutput = [];

	var sortKeys = function (x) {
		var seenIndex = seenInput.indexOf(x);

		if (seenIndex !== -1) {
			return seenOutput[seenIndex];
		}

		var ret = {};
		var keys = Object.keys(x).sort(opts.compare);

		seenInput.push(x);
		seenOutput.push(ret);

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var val = x[key];

			ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
		}

		return ret;
	};

	return sortKeys(obj);
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
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
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./prototypes/dashboard/dashboard.sass":
/*!*********************************************!*\
  !*** ./prototypes/dashboard/dashboard.sass ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../node_modules/sass-loader/lib/loader.js!./dashboard.sass */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./prototypes/dashboard/dashboard.sass");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../node_modules/sass-loader/lib/loader.js!./dashboard.sass */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./prototypes/dashboard/dashboard.sass", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-2!../../node_modules/sass-loader/lib/loader.js!./dashboard.sass */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js!./prototypes/dashboard/dashboard.sass");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}
    if(true) {
      // 1547550909715
      var cssReload = __webpack_require__(/*! ../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./prototypes/dashboard/index.js":
/*!***************************************!*\
  !*** ./prototypes/dashboard/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.sass */ "./prototypes/dashboard/dashboard.sass");
/* harmony import */ var _dashboard_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dashboard_sass__WEBPACK_IMPORTED_MODULE_0__);


if (true) {
  module.hot.accept(/*! ./dashboard.sass */ "./prototypes/dashboard/dashboard.sass", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _dashboard_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard.sass */ "./prototypes/dashboard/dashboard.sass");
/* harmony import */ _dashboard_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dashboard_sass__WEBPACK_IMPORTED_MODULE_0__);
(function () {
    __webpack_require__(/*! ./dashboard.sass */ "./prototypes/dashboard/dashboard.sass");
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzIiwid2VicGFjazovLy8uL3Byb3RvdHlwZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zYXNzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iai9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wdW55Y29kZS9wdW55Y29kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLXVybC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJlcGVuZC1odHRwL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeS1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ydC1rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHJpY3QtdXJpLWVuY29kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXJsL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3Byb3RvdHlwZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zYXNzPzgwZWEiLCJ3ZWJwYWNrOi8vLy4vcHJvdG90eXBlcy9kYXNoYm9hcmQvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUFNLFlBQVksaUJBQWlCLE1BQU0sZ0JBQWdCLE1BQU0sWUFBWSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGlCQUFpQixNQUFNLGdCQUFnQixNQUFNLFlBQVksaUJBQWlCLE1BQU0sZ0JBQWdCLE1BQU0sWUFBWSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGlCQUFpQixNQUFNLGdCQUFnQixNQUFNLFlBQVksaUJBQWlCLE1BQU0sZ0JBQWdCLE1BQU0sWUFBWSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGlCQUFpQixNQUFNLGdCQUFnQixNQUFNLFlBQVksaUJBQWlCLE1BQU0sZ0JBQWdCLE1BQU0sWUFBWSxpQkFBaUIsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLGlCQUFpQixNQUFNLGdCQUFnQixNQUFNLFlBQVksaUJBQWlCLE1BQU0sZ0JBQWdCLE1BQU0sWUFBWSxpQkFBaUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxtQkFBbUIsTUFBTSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxtQkFBbUIsTUFBTSxZQUFZLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixNQUFNLFlBQVksa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGFBQWEsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLFdBQVcsVUFBVSxrQkFBa0IsTUFBTSxrQkFBa0IsTUFBTSxlQUFlLEtBQUssa0JBQWtCLE1BQU0sWUFBWSxrQkFBa0IsTUFBTSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sVUFBVSxVQUFVLFlBQVksa0JBQWtCLE1BQU0saUJBQWlCLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLFlBQVksaUJBQWlCLE1BQU0sWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxrQkFBa0IsTUFBTSxnQkFBZ0IsTUFBTSxZQUFZLG1CQUFtQixNQUFNLGtCQUFrQixNQUFNLEtBQUssZUFBZSxLQUFLLHFCQUFxQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksYUFBYSxrQkFBa0IsTUFBTSxZQUFZLG1CQUFtQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksYUFBYSxrQkFBa0IsTUFBTSxZQUFZLG1CQUFtQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxrQkFBa0IsTUFBTSxVQUFVLFlBQVksYUFBYSxhQUFhLGdCQUFnQixLQUFLLGlCQUFpQixNQUFNLFlBQVksV0FBVyxpQkFBaUIsTUFBTSxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsZ0JBQWdCLEtBQUssaUJBQWlCLE1BQU0sWUFBWSxXQUFXLGlCQUFpQixNQUFNLFVBQVUsa0JBQWtCLE1BQU0sVUFBVSxZQUFZLGFBQWEsYUFBYSxnQkFBZ0IsS0FBSyxpQkFBaUIsTUFBTSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0s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cUIsRUFBRSxnQkFBZ0Isa0JBQWtCLDBDQUEwQyx3Q0FBd0MsRUFBRSxrQkFBa0Isd0JBQXdCLEVBQUUsZUFBZSxxQkFBcUIsRUFBRSxnQkFBZ0Isa0JBQWtCLDBDQUEwQyx3Q0FBd0MsRUFBRSxrQkFBa0Isd0JBQXdCLEVBQUUsZUFBZSxxQkFBcUIsRUFBRSxnQkFBZ0Isa0JBQWtCLDBDQUEwQyx3Q0FBd0MsRUFBRSxrQkFBa0Isd0JBQXdCLEVBQUUsZUFBZSxxQkFBcUIsRUFBRSxnQkFBZ0Isa0JBQWtCLDBDQUEwQyx3Q0FBd0MsRUFBRSxrQkFBa0Isd0JBQXdCLEVBQUUsZUFBZSxxQkFBcUIsRUFBRSxjQUFjLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsZ0JBQWdCLHlCQUF5QixFQUFFLGFBQWEsc0JBQXNCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVBQUUsZ0JBQWdCLGtCQUFrQiwyQ0FBMkMsdUNBQXVDLEVBQUUsa0JBQWtCLHdCQUF3QixFQUFFLGVBQWUscUJBQXFCLEVB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O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixvQkFBb0I7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7QUM1TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7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QUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsS0FBSyxLQUF3QyxFQUFFLEVBRTdDOztBQUVGLFFBQVEsc0JBQWlCO0FBQ3pCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtB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RztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzN0QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcEJBLGNBQWMsbUJBQU8sQ0FBQyxpUEFBcUg7O0FBRTNJLDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzR0FBbUQ7O0FBRXhFOztBQUVBLEdBQUcsSUFBVTtBQUNiLG1CQUFtQixpUEFBcUg7QUFDeEksbUJBQW1CLG1CQUFPLENBQUMsaVBBQXFIOztBQUVoSixvREFBb0QsUUFBUzs7QUFFN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxFQUFFOztBQUVGLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUM7QUFDQSxPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQyx3SEFBNEQsRUFBRSxRQUFTLEdBQUcsWUFBWSxTQUFTLEVBQUU7QUFDL0g7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbERBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjAyZTNjY2U0NGJiNjIwMjEzM2FiXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImRhc2hib2FyZFwiO1xuIFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1sb25lLWJsb2Nrc1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZShcIi4vcHJvdG90eXBlcy9kYXNoYm9hcmQvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3Byb3RvdHlwZXMvZGFzaGJvYXJkL2luZGV4LmpzXCIpO1xuIiwidmFyIG5vcm1hbGl6ZVVybCA9IHJlcXVpcmUoJ25vcm1hbGl6ZS11cmwnKTtcbnZhciBzcmNCeU1vZHVsZUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJ2xvZGFzaC9kZWJvdW5jZScpO1xuXG52YXIgbm9Eb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCc7XG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9O1xuXG52YXIgZ2V0Q3VycmVudFNjcmlwdFVybCA9IGZ1bmN0aW9uKG1vZHVsZUlkKSB7XG4gIHZhciBzcmMgPSBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXTtcblxuICBpZiAoIXNyYykge1xuICAgIGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KSB7XG4gICAgICBzcmMgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgICB2YXIgbGFzdFNjcmlwdFRhZyA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKGxhc3RTY3JpcHRUYWcpIHtcbiAgICAgICAgc3JjID0gbGFzdFNjcmlwdFRhZy5zcmM7XG4gICAgICB9XG4gICAgfVxuICAgIHNyY0J5TW9kdWxlSWRbbW9kdWxlSWRdID0gc3JjO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZpbGVNYXApIHtcbiAgICB2YXIgc3BsaXRSZXN1bHQgPSAvKFteXFxcXC9dKylcXC5qcyQvLmV4ZWMoc3JjKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBzcGxpdFJlc3VsdCAmJiBzcGxpdFJlc3VsdFsxXTtcbiAgICBpZiAoIWZpbGVuYW1lKSB7XG4gICAgICByZXR1cm4gW3NyYy5yZXBsYWNlKCcuanMnLCAnLmNzcycpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZpbGVNYXAuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24obWFwUnVsZSkge1xuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoZmlsZW5hbWUgKyAnXFxcXC5qcyQnLCAnZycpXG4gICAgICByZXR1cm4gbm9ybWFsaXplVXJsKHNyYy5yZXBsYWNlKHJlZywgbWFwUnVsZS5yZXBsYWNlKC97ZmlsZU5hbWV9L2csIGZpbGVuYW1lKSArICcuY3NzJyksIHsgc3RyaXBXV1c6IGZhbHNlIH0pO1xuICAgIH0pO1xuICB9O1xufTtcblxuZnVuY3Rpb24gdXBkYXRlQ3NzKGVsLCB1cmwpIHtcbiAgaWYgKCF1cmwpIHtcbiAgICB1cmwgPSBlbC5ocmVmLnNwbGl0KCc/JylbMF07XG4gIH1cbiAgaWYgKGVsLmlzTG9hZGVkID09PSBmYWxzZSkge1xuICAgIC8vIFdlIHNlZW0gdG8gYmUgYWJvdXQgdG8gcmVwbGFjZSBhIGNzcyBsaW5rIHRoYXQgaGFzbid0IGxvYWRlZCB5ZXQuXG4gICAgLy8gV2UncmUgcHJvYmFibHkgY2hhbmdpbmcgdGhlIHNhbWUgZmlsZSBtb3JlIHRoYW4gb25jZS5cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCF1cmwgfHwgISh1cmwuaW5kZXhPZignLmNzcycpID4gLTEpKSByZXR1cm47XG5cbiAgZWwudmlzaXRlZCA9IHRydWU7XG4gIHZhciBuZXdFbCA9IGVsLmNsb25lTm9kZSgpO1xuXG4gIG5ld0VsLmlzTG9hZGVkID0gZmFsc2U7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3RWwuaXNMb2FkZWQgPSB0cnVlO1xuICAgIGVsLnJlbW92ZSgpO1xuICB9KTtcbiAgbmV3RWwuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgbmV3RWwuaXNMb2FkZWQgPSB0cnVlO1xuICAgIGVsLnJlbW92ZSgpO1xuICB9KTtcblxuICBuZXdFbC5ocmVmID0gdXJsICsgJz8nICsgRGF0ZS5ub3coKTtcbiAgLy8gaW5zZXJ0IG5ldyA8bGluayAvPiByaWdodCB0byB0aGUgb2xkIG9uZSdzIHBvc2l0aW9uXG4gIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsLCBlbC5uZXh0U2libGluZyk7XG59XG5cbmZ1bmN0aW9uIHJlbG9hZFN0eWxlKHNyYykge1xuICB2YXIgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rJyk7XG4gIHZhciBsb2FkZWQgPSBmYWxzZTtcblxuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHJldHVybjtcblxuICAgIHZhciB1cmwgPSBnZXRSZWxvYWRVcmwoZWwuaHJlZiwgc3JjKTtcbiAgICBpZiAodXJsKSB7XG4gICAgICB1cGRhdGVDc3MoZWwsIHVybCk7XG4gICAgICBsb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGxvYWRlZDtcbn1cblxuZnVuY3Rpb24gZ2V0UmVsb2FkVXJsKGhyZWYsIHNyYykge1xuICBocmVmID0gbm9ybWFsaXplVXJsKGhyZWYsIHsgc3RyaXBXV1c6IGZhbHNlIH0pO1xuICB2YXIgcmV0O1xuICBzcmMuc29tZShmdW5jdGlvbih1cmwpIHtcbiAgICBpZiAoaHJlZi5pbmRleE9mKHNyYykgPiAtMSkge1xuICAgICAgcmV0ID0gdXJsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIHJlbG9hZEFsbCgpIHtcbiAgdmFyIGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnbGluaycpO1xuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uKGVsKSB7XG4gICAgaWYgKGVsLnZpc2l0ZWQgPT09IHRydWUpIHJldHVybjtcbiAgICB1cGRhdGVDc3MoZWwpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGVJZCwgb3B0aW9ucykge1xuICB2YXIgZ2V0U2NyaXB0U3JjO1xuXG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgcmV0dXJuIG5vb3A7XG4gIH1cblxuICBnZXRTY3JpcHRTcmMgPSBnZXRDdXJyZW50U2NyaXB0VXJsKG1vZHVsZUlkKTtcblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHNyYyA9IGdldFNjcmlwdFNyYyhvcHRpb25zLmZpbGVNYXApO1xuICAgIHZhciByZWxvYWRlZCA9IHJlbG9hZFN0eWxlKHNyYyk7XG4gICAgaWYgKHJlbG9hZGVkICYmICFvcHRpb25zLnJlbG9hZEFsbCkge1xuICAgICAgY29uc29sZS5sb2coJ1tITVJdIGNzcyByZWxvYWQgJXMnLCBzcmMuam9pbignICcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1tITVJdIFJlbG9hZCBhbGwgY3NzJyk7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVib3VuY2UodXBkYXRlLCAxMCk7XG59O1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikodHJ1ZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tY29sb3ItcHJpbWFyeTogIzM4M2Y0NztcXG4gIC0tY29sb3ItcHJpbWFyeS1kYXJrOiAjMjIyNjJiO1xcbiAgLS1jb2xvci1wcmltYXJ5LWRhcmtlcjogYmxhY2s7XFxuICAtLWNvbG9yLXByaW1hcnktbGlnaHQ6ICM0ZjU4NjQ7XFxuICAtLWNvbG9yLXByaW1hcnktbGlnaHRlcjogIzcwN2Q4ZjtcXG4gIC0tY29sb3ItcHJpbWFyeS1oYWxmOiByZ2JhKDU2LCA2MywgNzEsIDAuNSk7XFxuICAtLWNvbG9yLXNlY29uZGFyeTogIzJiYjBlZTtcXG4gIC0tY29sb3Itc2Vjb25kYXJ5LWRhcms6ICMxMTk3ZDQ7XFxuICAtLWNvbG9yLXNlY29uZGFyeS1kYXJrZXI6ICMwYjY0OGU7XFxuICAtLWNvbG9yLXNlY29uZGFyeS1saWdodDogIzVhYzJmMjtcXG4gIC0tY29sb3Itc2Vjb25kYXJ5LWxpZ2h0ZXI6ICNhMWRjZjc7XFxuICAtLWNvbG9yLXNlY29uZGFyeS1oYWxmOiByZ2JhKDQzLCAxNzYsIDIzOCwgMC41KTtcXG4gIC0tY29sb3ItYmxhY2s6ICMwZDBkMGQ7XFxuICAtLWNvbG9yLWRhcms6ICM0ZDRkNGQ7XFxuICAtLWNvbG9yLWxpZ2h0OiAjZjJmMmYyO1xcbiAgLS1jb2xvci13aGl0ZTogd2hpdGU7XFxuICAtLWNvbG9yLWluZm86ICMyYmIwZWU7XFxuICAtLWNvbG9yLXN1Y2Nlc3M6ICM1NWMzNTk7XFxuICAtLWNvbG9yLXdhcm5pbmc6ICNmNWI2NTY7XFxuICAtLWNvbG9yLWRhbmdlcjogI2U3M2UzMjtcXG4gIC0tY29sb3ItdGV4dDogIzRkNGQ0ZDtcXG4gIC0tY29sb3ItdGl0bGU6ICMwZDBkMGQ7XFxuICAtLWNvbG9yLXN1YnRpdGxlOiAjNGQ0ZDRkO1xcbiAgLS1jb2xvci1saW5rOiAjMzgzZjQ3O1xcbiAgLS1jb2xvci1saW5rLWhvdmVyZWQ6ICMyMjI2MmI7XFxuICAtLWNvbG9yLWxpbmstdmlzaXRlZDogIzM4M2Y0NztcXG4gIC0tY29sb3ItZm9yZWdyb3VuZDogd2hpdGU7XFxuICAtLWNvbG9yLWJhY2tncm91bmQ6ICNlY2VlZjg7IH1cXG5cXG46cm9vdCB7XFxuICAtLWZvbnQtcHJpbWFyeTogUm9ib3RvLCBIZWx2ZXRpY2EsIGFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgLS1mb250LXRpdGxlOiBSb2JvdG8sIEhlbHZldGljYSwgYXJpYWwsIGN1cnNpdmU7XFxuICAtLWZvbnQtc2VyaWY6IFJvYm90bywgR2FyYW1vbmQsIEdlb3JnaWEsIFRpbWVzIE5ldyBSb21hbiwgc2VyaWY7XFxuICAtLWZvbnQtbW9ub3NwYWNlOiBSb2JvdG8gTW9ubywgbW9ub3NwYWNlO1xcbiAgLS10ZXh0LXNjYWxlLXJhdGlvOiAxLjI7XFxuICAtLXRleHQtc2NhbGUtcmF0aW8tbW9iaWxlOiAxLjI7IH1cXG5cXG46cm9vdCB7XFxuICAtLXRleHQtc2NhbGUtcmF0aW86IDEuMjtcXG4gIC0tc3BhY2luZy11bml0OiAxZW07XFxuICAtLWZpeGVkLXNwYWNpbmctdW5pdDogMXJlbTsgfVxcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICAgIGZvbnQtZm9udC1zaXplOiAxMDAlOyB9XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTsgfVxcblxcbnVsLCBvbCB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGNvbnRlbnQ6IG5vbmU7IH1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7IH1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4udGV4dC1wcmltYXJ5IHtcXG4gIGNvbG9yOiAjMzgzZjQ3OyB9XFxuXFxuLmJnLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4M2Y0NztcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXByaW1hcnktZGFyayB7XFxuICBjb2xvcjogIzIyMjYyYjsgfVxcblxcbi5iZy1wcmltYXJ5LWRhcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjYyYjtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXByaW1hcnktZGFya2VyIHtcXG4gIGNvbG9yOiBibGFjazsgfVxcblxcbi5iZy1wcmltYXJ5LWRhcmtlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXByaW1hcnktbGlnaHQge1xcbiAgY29sb3I6ICM0ZjU4NjQ7IH1cXG5cXG4uYmctcHJpbWFyeS1saWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGY1ODY0O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLnRleHQtcHJpbWFyeS1saWdodGVyIHtcXG4gIGNvbG9yOiAjNzA3ZDhmOyB9XFxuXFxuLmJnLXByaW1hcnktbGlnaHRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzA3ZDhmO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLnRleHQtcHJpbWFyeS1oYWxmIHtcXG4gIGNvbG9yOiByZ2JhKDU2LCA2MywgNzEsIDAuNSk7IH1cXG5cXG4uYmctcHJpbWFyeS1oYWxmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTYsIDYzLCA3MSwgMC41KTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeSB7XFxuICBjb2xvcjogIzJiYjBlZTsgfVxcblxcbi5iZy1zZWNvbmRhcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJiYjBlZTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1kYXJrIHtcXG4gIGNvbG9yOiAjMTE5N2Q0OyB9XFxuXFxuLmJnLXNlY29uZGFyeS1kYXJrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTk3ZDQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1zZWNvbmRhcnktZGFya2VyIHtcXG4gIGNvbG9yOiAjMGI2NDhlOyB9XFxuXFxuLmJnLXNlY29uZGFyeS1kYXJrZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBiNjQ4ZTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1saWdodCB7XFxuICBjb2xvcjogIzVhYzJmMjsgfVxcblxcbi5iZy1zZWNvbmRhcnktbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVhYzJmMjtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1saWdodGVyIHtcXG4gIGNvbG9yOiAjYTFkY2Y3OyB9XFxuXFxuLmJnLXNlY29uZGFyeS1saWdodGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZjc7XFxuICBjb2xvcjogIzIyMjsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1oYWxmIHtcXG4gIGNvbG9yOiByZ2JhKDQzLCAxNzYsIDIzOCwgMC41KTsgfVxcblxcbi5iZy1zZWNvbmRhcnktaGFsZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQzLCAxNzYsIDIzOCwgMC41KTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LWJsYWNrIHtcXG4gIGNvbG9yOiAjMGQwZDBkOyB9XFxuXFxuLmJnLWJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDBkMGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1kYXJrIHtcXG4gIGNvbG9yOiAjNGQ0ZDRkOyB9XFxuXFxuLmJnLWRhcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGQ0ZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LWxpZ2h0IHtcXG4gIGNvbG9yOiAjZjJmMmYyOyB9XFxuXFxuLmJnLWxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XFxuICBjb2xvcjogIzIyMjsgfVxcblxcbi50ZXh0LXdoaXRlIHtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi5iZy13aGl0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuXFxuLnRleHQtaW5mbyB7XFxuICBjb2xvcjogIzJiYjBlZTsgfVxcblxcbi5iZy1pbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmIwZWU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1zdWNjZXNzIHtcXG4gIGNvbG9yOiAjNTVjMzU5OyB9XFxuXFxuLmJnLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1YzM1OTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXdhcm5pbmcge1xcbiAgY29sb3I6ICNmNWI2NTY7IH1cXG5cXG4uYmctd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjViNjU2O1xcbiAgY29sb3I6ICMyMjI7IH1cXG5cXG4udGV4dC1kYW5nZXIge1xcbiAgY29sb3I6ICNlNzNlMzI7IH1cXG5cXG4uYmctZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNzNlMzI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC10ZXh0IHtcXG4gIGNvbG9yOiAjNGQ0ZDRkOyB9XFxuXFxuLmJnLXRleHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGQ0ZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXRpdGxlIHtcXG4gIGNvbG9yOiAjMGQwZDBkOyB9XFxuXFxuLmJnLXRpdGxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDBkMGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1zdWJ0aXRsZSB7XFxuICBjb2xvcjogIzRkNGQ0ZDsgfVxcblxcbi5iZy1zdWJ0aXRsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGQ0ZDRkO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLnRleHQtbGluayB7XFxuICBjb2xvcjogIzM4M2Y0NzsgfVxcblxcbi5iZy1saW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1saW5rLWhvdmVyZWQge1xcbiAgY29sb3I6ICMyMjI2MmI7IH1cXG5cXG4uYmctbGluay1ob3ZlcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1saW5rLXZpc2l0ZWQge1xcbiAgY29sb3I6ICMzODNmNDc7IH1cXG5cXG4uYmctbGluay12aXNpdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1mb3JlZ3JvdW5kIHtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi5iZy1mb3JlZ3JvdW5kIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgY29sb3I6ICMyMjI7IH1cXG5cXG4udGV4dC1iYWNrZ3JvdW5kIHtcXG4gIGNvbG9yOiAjZWNlZWY4OyB9XFxuXFxuLmJnLWJhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWVmODtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuXFxuLnRleHQtZm9udC1wcmltYXJ5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgSGVsdmV0aWNhLCBhcmlhbCwgc2Fucy1zZXJpZjsgfVxcblxcbi50ZXh0LWZvbnQtdGl0bGUge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBIZWx2ZXRpY2EsIGFyaWFsLCBjdXJzaXZlOyB9XFxuXFxuLnRleHQtZm9udC1zZXJpZiB7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIEdhcmFtb25kLCBHZW9yZ2lhLCBUaW1lcyBOZXcgUm9tYW4sIHNlcmlmOyB9XFxuXFxuLnRleHQtZm9udC1tb25vc3BhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8gTW9ub1xcXCIsIG1vbm9zcGFjZTsgfVxcblxcbi50ZXh0LXhzIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjA1ZW0gLyAoMS4yICogMS4yKSk7IH1cXG5cXG4udGV4dC1zbSB7XFxuICBmb250LXNpemU6IGNhbGMoMS4wNWVtIC8gMS4yKTsgfVxcblxcbi50ZXh0LW1kIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjA1ZW0gKiAxLjIpOyB9XFxuXFxuLnRleHQtbGcge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAqIDEuMiAqIDEuMik7IH1cXG5cXG4udGV4dC14bCB7XFxuICBmb250LXNpemU6IGNhbGMoMS4wNWVtICogMS4yICogMS4yICogMS4yKTsgfVxcblxcbi50ZXh0LXh4bCB7XFxuICBmb250LXNpemU6IGNhbGMoMS4wNWVtICogMS4yICogMS4yICogMS4yICogMS4yKTsgfVxcblxcbi50ZXh0LXh4eGwge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAqIDEuMiAqIDEuMiAqIDEuMiAqIDEuMiAqIDEuMik7IH1cXG5cXG4udGV4dC1jZW50ZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLnRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4udGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7IH1cXG5cXG4uZ3JpZC0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxOyB9XFxuXFxuLnJvdy0xIHtcXG4gIGdyaWQtcm93OiBzcGFuIDE7IH1cXG5cXG4uZ3JpZC0xLTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAxOyB9XFxuXFxuLnJvdy0xLTEge1xcbiAgZ3JpZC1yb3c6IDEgLyAxOyB9XFxuXFxuLmdyaWQtMS0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS0yIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMjsgfVxcblxcbi5yb3ctMS0yIHtcXG4gIGdyaWQtcm93OiAxIC8gMjsgfVxcblxcbi5ncmlkLTEtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtMyB7XFxuICBncmlkLWNvbHVtbjogMSAvIDM7IH1cXG5cXG4ucm93LTEtMyB7XFxuICBncmlkLXJvdzogMSAvIDM7IH1cXG5cXG4uZ3JpZC0xLTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyA0OyB9XFxuXFxuLnJvdy0xLTQge1xcbiAgZ3JpZC1yb3c6IDEgLyA0OyB9XFxuXFxuLmdyaWQtMS01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS01IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gNTsgfVxcblxcbi5yb3ctMS01IHtcXG4gIGdyaWQtcm93OiAxIC8gNTsgfVxcblxcbi5ncmlkLTEtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtNiB7XFxuICBncmlkLWNvbHVtbjogMSAvIDY7IH1cXG5cXG4ucm93LTEtNiB7XFxuICBncmlkLXJvdzogMSAvIDY7IH1cXG5cXG4uZ3JpZC0xLTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyA3OyB9XFxuXFxuLnJvdy0xLTcge1xcbiAgZ3JpZC1yb3c6IDEgLyA3OyB9XFxuXFxuLmdyaWQtMS04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS04IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gODsgfVxcblxcbi5yb3ctMS04IHtcXG4gIGdyaWQtcm93OiAxIC8gODsgfVxcblxcbi5ncmlkLTEtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtOSB7XFxuICBncmlkLWNvbHVtbjogMSAvIDk7IH1cXG5cXG4ucm93LTEtOSB7XFxuICBncmlkLXJvdzogMSAvIDk7IH1cXG5cXG4uZ3JpZC0xLTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAxMDsgfVxcblxcbi5yb3ctMS0xMCB7XFxuICBncmlkLXJvdzogMSAvIDEwOyB9XFxuXFxuLmdyaWQtMS0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMTE7IH1cXG5cXG4ucm93LTEtMTEge1xcbiAgZ3JpZC1yb3c6IDEgLyAxMTsgfVxcblxcbi5ncmlkLTEtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS0xMiB7XFxuICBncmlkLWNvbHVtbjogMSAvIDEyOyB9XFxuXFxuLnJvdy0xLTEyIHtcXG4gIGdyaWQtcm93OiAxIC8gMTI7IH1cXG5cXG4uZ3JpZC0xLTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAxMzsgfVxcblxcbi5yb3ctMS0xMyB7XFxuICBncmlkLXJvdzogMSAvIDEzOyB9XFxuXFxuLmdyaWQtMS0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMTQ7IH1cXG5cXG4ucm93LTEtMTQge1xcbiAgZ3JpZC1yb3c6IDEgLyAxNDsgfVxcblxcbi5ncmlkLTEtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS0xNSB7XFxuICBncmlkLWNvbHVtbjogMSAvIDE1OyB9XFxuXFxuLnJvdy0xLTE1IHtcXG4gIGdyaWQtcm93OiAxIC8gMTU7IH1cXG5cXG4uZ3JpZC0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMiB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAyOyB9XFxuXFxuLnJvdy0yIHtcXG4gIGdyaWQtcm93OiBzcGFuIDI7IH1cXG5cXG4uZ3JpZC0yLTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTEge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAxOyB9XFxuXFxuLnJvdy0yLTEge1xcbiAgZ3JpZC1yb3c6IDIgLyAxOyB9XFxuXFxuLmdyaWQtMi0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi0yIHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMjsgfVxcblxcbi5yb3ctMi0yIHtcXG4gIGdyaWQtcm93OiAyIC8gMjsgfVxcblxcbi5ncmlkLTItMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItMyB7XFxuICBncmlkLWNvbHVtbjogMiAvIDM7IH1cXG5cXG4ucm93LTItMyB7XFxuICBncmlkLXJvdzogMiAvIDM7IH1cXG5cXG4uZ3JpZC0yLTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTQge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyA0OyB9XFxuXFxuLnJvdy0yLTQge1xcbiAgZ3JpZC1yb3c6IDIgLyA0OyB9XFxuXFxuLmdyaWQtMi01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi01IHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gNTsgfVxcblxcbi5yb3ctMi01IHtcXG4gIGdyaWQtcm93OiAyIC8gNTsgfVxcblxcbi5ncmlkLTItNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItNiB7XFxuICBncmlkLWNvbHVtbjogMiAvIDY7IH1cXG5cXG4ucm93LTItNiB7XFxuICBncmlkLXJvdzogMiAvIDY7IH1cXG5cXG4uZ3JpZC0yLTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTcge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyA3OyB9XFxuXFxuLnJvdy0yLTcge1xcbiAgZ3JpZC1yb3c6IDIgLyA3OyB9XFxuXFxuLmdyaWQtMi04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi04IHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gODsgfVxcblxcbi5yb3ctMi04IHtcXG4gIGdyaWQtcm93OiAyIC8gODsgfVxcblxcbi5ncmlkLTItOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTItOSB7XFxuICBncmlkLWNvbHVtbjogMiAvIDk7IH1cXG5cXG4ucm93LTItOSB7XFxuICBncmlkLXJvdzogMiAvIDk7IH1cXG5cXG4uZ3JpZC0yLTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItMTAge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAxMDsgfVxcblxcbi5yb3ctMi0xMCB7XFxuICBncmlkLXJvdzogMiAvIDEwOyB9XFxuXFxuLmdyaWQtMi0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTExIHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMTE7IH1cXG5cXG4ucm93LTItMTEge1xcbiAgZ3JpZC1yb3c6IDIgLyAxMTsgfVxcblxcbi5ncmlkLTItMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi0xMiB7XFxuICBncmlkLWNvbHVtbjogMiAvIDEyOyB9XFxuXFxuLnJvdy0yLTEyIHtcXG4gIGdyaWQtcm93OiAyIC8gMTI7IH1cXG5cXG4uZ3JpZC0yLTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItMTMge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAxMzsgfVxcblxcbi5yb3ctMi0xMyB7XFxuICBncmlkLXJvdzogMiAvIDEzOyB9XFxuXFxuLmdyaWQtMi0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMTQ7IH1cXG5cXG4ucm93LTItMTQge1xcbiAgZ3JpZC1yb3c6IDIgLyAxNDsgfVxcblxcbi5ncmlkLTItMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi0xNSB7XFxuICBncmlkLWNvbHVtbjogMiAvIDE1OyB9XFxuXFxuLnJvdy0yLTE1IHtcXG4gIGdyaWQtcm93OiAyIC8gMTU7IH1cXG5cXG4uZ3JpZC0zIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMyB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAzOyB9XFxuXFxuLnJvdy0zIHtcXG4gIGdyaWQtcm93OiBzcGFuIDM7IH1cXG5cXG4uZ3JpZC0zLTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTEge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyAxOyB9XFxuXFxuLnJvdy0zLTEge1xcbiAgZ3JpZC1yb3c6IDMgLyAxOyB9XFxuXFxuLmdyaWQtMy0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy0yIHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gMjsgfVxcblxcbi5yb3ctMy0yIHtcXG4gIGdyaWQtcm93OiAzIC8gMjsgfVxcblxcbi5ncmlkLTMtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtMyB7XFxuICBncmlkLWNvbHVtbjogMyAvIDM7IH1cXG5cXG4ucm93LTMtMyB7XFxuICBncmlkLXJvdzogMyAvIDM7IH1cXG5cXG4uZ3JpZC0zLTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTQge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyA0OyB9XFxuXFxuLnJvdy0zLTQge1xcbiAgZ3JpZC1yb3c6IDMgLyA0OyB9XFxuXFxuLmdyaWQtMy01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy01IHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gNTsgfVxcblxcbi5yb3ctMy01IHtcXG4gIGdyaWQtcm93OiAzIC8gNTsgfVxcblxcbi5ncmlkLTMtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtNiB7XFxuICBncmlkLWNvbHVtbjogMyAvIDY7IH1cXG5cXG4ucm93LTMtNiB7XFxuICBncmlkLXJvdzogMyAvIDY7IH1cXG5cXG4uZ3JpZC0zLTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTcge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyA3OyB9XFxuXFxuLnJvdy0zLTcge1xcbiAgZ3JpZC1yb3c6IDMgLyA3OyB9XFxuXFxuLmdyaWQtMy04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy04IHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gODsgfVxcblxcbi5yb3ctMy04IHtcXG4gIGdyaWQtcm93OiAzIC8gODsgfVxcblxcbi5ncmlkLTMtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtOSB7XFxuICBncmlkLWNvbHVtbjogMyAvIDk7IH1cXG5cXG4ucm93LTMtOSB7XFxuICBncmlkLXJvdzogMyAvIDk7IH1cXG5cXG4uZ3JpZC0zLTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyAxMDsgfVxcblxcbi5yb3ctMy0xMCB7XFxuICBncmlkLXJvdzogMyAvIDEwOyB9XFxuXFxuLmdyaWQtMy0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTExIHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gMTE7IH1cXG5cXG4ucm93LTMtMTEge1xcbiAgZ3JpZC1yb3c6IDMgLyAxMTsgfVxcblxcbi5ncmlkLTMtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy0xMiB7XFxuICBncmlkLWNvbHVtbjogMyAvIDEyOyB9XFxuXFxuLnJvdy0zLTEyIHtcXG4gIGdyaWQtcm93OiAzIC8gMTI7IH1cXG5cXG4uZ3JpZC0zLTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyAxMzsgfVxcblxcbi5yb3ctMy0xMyB7XFxuICBncmlkLXJvdzogMyAvIDEzOyB9XFxuXFxuLmdyaWQtMy0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gMTQ7IH1cXG5cXG4ucm93LTMtMTQge1xcbiAgZ3JpZC1yb3c6IDMgLyAxNDsgfVxcblxcbi5ncmlkLTMtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy0xNSB7XFxuICBncmlkLWNvbHVtbjogMyAvIDE1OyB9XFxuXFxuLnJvdy0zLTE1IHtcXG4gIGdyaWQtcm93OiAzIC8gMTU7IH1cXG5cXG4uZ3JpZC00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA0OyB9XFxuXFxuLnJvdy00IHtcXG4gIGdyaWQtcm93OiBzcGFuIDQ7IH1cXG5cXG4uZ3JpZC00LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTEge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyAxOyB9XFxuXFxuLnJvdy00LTEge1xcbiAgZ3JpZC1yb3c6IDQgLyAxOyB9XFxuXFxuLmdyaWQtNC0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC0yIHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gMjsgfVxcblxcbi5yb3ctNC0yIHtcXG4gIGdyaWQtcm93OiA0IC8gMjsgfVxcblxcbi5ncmlkLTQtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtMyB7XFxuICBncmlkLWNvbHVtbjogNCAvIDM7IH1cXG5cXG4ucm93LTQtMyB7XFxuICBncmlkLXJvdzogNCAvIDM7IH1cXG5cXG4uZ3JpZC00LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTQge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA0OyB9XFxuXFxuLnJvdy00LTQge1xcbiAgZ3JpZC1yb3c6IDQgLyA0OyB9XFxuXFxuLmdyaWQtNC01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC01IHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTsgfVxcblxcbi5yb3ctNC01IHtcXG4gIGdyaWQtcm93OiA0IC8gNTsgfVxcblxcbi5ncmlkLTQtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtNiB7XFxuICBncmlkLWNvbHVtbjogNCAvIDY7IH1cXG5cXG4ucm93LTQtNiB7XFxuICBncmlkLXJvdzogNCAvIDY7IH1cXG5cXG4uZ3JpZC00LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTcge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA3OyB9XFxuXFxuLnJvdy00LTcge1xcbiAgZ3JpZC1yb3c6IDQgLyA3OyB9XFxuXFxuLmdyaWQtNC04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC04IHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gODsgfVxcblxcbi5yb3ctNC04IHtcXG4gIGdyaWQtcm93OiA0IC8gODsgfVxcblxcbi5ncmlkLTQtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtOSB7XFxuICBncmlkLWNvbHVtbjogNCAvIDk7IH1cXG5cXG4ucm93LTQtOSB7XFxuICBncmlkLXJvdzogNCAvIDk7IH1cXG5cXG4uZ3JpZC00LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyAxMDsgfVxcblxcbi5yb3ctNC0xMCB7XFxuICBncmlkLXJvdzogNCAvIDEwOyB9XFxuXFxuLmdyaWQtNC0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTExIHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gMTE7IH1cXG5cXG4ucm93LTQtMTEge1xcbiAgZ3JpZC1yb3c6IDQgLyAxMTsgfVxcblxcbi5ncmlkLTQtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC0xMiB7XFxuICBncmlkLWNvbHVtbjogNCAvIDEyOyB9XFxuXFxuLnJvdy00LTEyIHtcXG4gIGdyaWQtcm93OiA0IC8gMTI7IH1cXG5cXG4uZ3JpZC00LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyAxMzsgfVxcblxcbi5yb3ctNC0xMyB7XFxuICBncmlkLXJvdzogNCAvIDEzOyB9XFxuXFxuLmdyaWQtNC0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gMTQ7IH1cXG5cXG4ucm93LTQtMTQge1xcbiAgZ3JpZC1yb3c6IDQgLyAxNDsgfVxcblxcbi5ncmlkLTQtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC0xNSB7XFxuICBncmlkLWNvbHVtbjogNCAvIDE1OyB9XFxuXFxuLnJvdy00LTE1IHtcXG4gIGdyaWQtcm93OiA0IC8gMTU7IH1cXG5cXG4uZ3JpZC01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA1OyB9XFxuXFxuLnJvdy01IHtcXG4gIGdyaWQtcm93OiBzcGFuIDU7IH1cXG5cXG4uZ3JpZC01LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTEge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyAxOyB9XFxuXFxuLnJvdy01LTEge1xcbiAgZ3JpZC1yb3c6IDUgLyAxOyB9XFxuXFxuLmdyaWQtNS0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS0yIHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gMjsgfVxcblxcbi5yb3ctNS0yIHtcXG4gIGdyaWQtcm93OiA1IC8gMjsgfVxcblxcbi5ncmlkLTUtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtMyB7XFxuICBncmlkLWNvbHVtbjogNSAvIDM7IH1cXG5cXG4ucm93LTUtMyB7XFxuICBncmlkLXJvdzogNSAvIDM7IH1cXG5cXG4uZ3JpZC01LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTQge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyA0OyB9XFxuXFxuLnJvdy01LTQge1xcbiAgZ3JpZC1yb3c6IDUgLyA0OyB9XFxuXFxuLmdyaWQtNS01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS01IHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gNTsgfVxcblxcbi5yb3ctNS01IHtcXG4gIGdyaWQtcm93OiA1IC8gNTsgfVxcblxcbi5ncmlkLTUtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtNiB7XFxuICBncmlkLWNvbHVtbjogNSAvIDY7IH1cXG5cXG4ucm93LTUtNiB7XFxuICBncmlkLXJvdzogNSAvIDY7IH1cXG5cXG4uZ3JpZC01LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTcge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyA3OyB9XFxuXFxuLnJvdy01LTcge1xcbiAgZ3JpZC1yb3c6IDUgLyA3OyB9XFxuXFxuLmdyaWQtNS04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS04IHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gODsgfVxcblxcbi5yb3ctNS04IHtcXG4gIGdyaWQtcm93OiA1IC8gODsgfVxcblxcbi5ncmlkLTUtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtOSB7XFxuICBncmlkLWNvbHVtbjogNSAvIDk7IH1cXG5cXG4ucm93LTUtOSB7XFxuICBncmlkLXJvdzogNSAvIDk7IH1cXG5cXG4uZ3JpZC01LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyAxMDsgfVxcblxcbi5yb3ctNS0xMCB7XFxuICBncmlkLXJvdzogNSAvIDEwOyB9XFxuXFxuLmdyaWQtNS0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTExIHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gMTE7IH1cXG5cXG4ucm93LTUtMTEge1xcbiAgZ3JpZC1yb3c6IDUgLyAxMTsgfVxcblxcbi5ncmlkLTUtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS0xMiB7XFxuICBncmlkLWNvbHVtbjogNSAvIDEyOyB9XFxuXFxuLnJvdy01LTEyIHtcXG4gIGdyaWQtcm93OiA1IC8gMTI7IH1cXG5cXG4uZ3JpZC01LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyAxMzsgfVxcblxcbi5yb3ctNS0xMyB7XFxuICBncmlkLXJvdzogNSAvIDEzOyB9XFxuXFxuLmdyaWQtNS0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gMTQ7IH1cXG5cXG4ucm93LTUtMTQge1xcbiAgZ3JpZC1yb3c6IDUgLyAxNDsgfVxcblxcbi5ncmlkLTUtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS0xNSB7XFxuICBncmlkLWNvbHVtbjogNSAvIDE1OyB9XFxuXFxuLnJvdy01LTE1IHtcXG4gIGdyaWQtcm93OiA1IC8gMTU7IH1cXG5cXG4uZ3JpZC02IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNiB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA2OyB9XFxuXFxuLnJvdy02IHtcXG4gIGdyaWQtcm93OiBzcGFuIDY7IH1cXG5cXG4uZ3JpZC02LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTEge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyAxOyB9XFxuXFxuLnJvdy02LTEge1xcbiAgZ3JpZC1yb3c6IDYgLyAxOyB9XFxuXFxuLmdyaWQtNi0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi0yIHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gMjsgfVxcblxcbi5yb3ctNi0yIHtcXG4gIGdyaWQtcm93OiA2IC8gMjsgfVxcblxcbi5ncmlkLTYtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtMyB7XFxuICBncmlkLWNvbHVtbjogNiAvIDM7IH1cXG5cXG4ucm93LTYtMyB7XFxuICBncmlkLXJvdzogNiAvIDM7IH1cXG5cXG4uZ3JpZC02LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTQge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyA0OyB9XFxuXFxuLnJvdy02LTQge1xcbiAgZ3JpZC1yb3c6IDYgLyA0OyB9XFxuXFxuLmdyaWQtNi01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi01IHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gNTsgfVxcblxcbi5yb3ctNi01IHtcXG4gIGdyaWQtcm93OiA2IC8gNTsgfVxcblxcbi5ncmlkLTYtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtNiB7XFxuICBncmlkLWNvbHVtbjogNiAvIDY7IH1cXG5cXG4ucm93LTYtNiB7XFxuICBncmlkLXJvdzogNiAvIDY7IH1cXG5cXG4uZ3JpZC02LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTcge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyA3OyB9XFxuXFxuLnJvdy02LTcge1xcbiAgZ3JpZC1yb3c6IDYgLyA3OyB9XFxuXFxuLmdyaWQtNi04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi04IHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gODsgfVxcblxcbi5yb3ctNi04IHtcXG4gIGdyaWQtcm93OiA2IC8gODsgfVxcblxcbi5ncmlkLTYtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtOSB7XFxuICBncmlkLWNvbHVtbjogNiAvIDk7IH1cXG5cXG4ucm93LTYtOSB7XFxuICBncmlkLXJvdzogNiAvIDk7IH1cXG5cXG4uZ3JpZC02LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyAxMDsgfVxcblxcbi5yb3ctNi0xMCB7XFxuICBncmlkLXJvdzogNiAvIDEwOyB9XFxuXFxuLmdyaWQtNi0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTExIHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gMTE7IH1cXG5cXG4ucm93LTYtMTEge1xcbiAgZ3JpZC1yb3c6IDYgLyAxMTsgfVxcblxcbi5ncmlkLTYtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi0xMiB7XFxuICBncmlkLWNvbHVtbjogNiAvIDEyOyB9XFxuXFxuLnJvdy02LTEyIHtcXG4gIGdyaWQtcm93OiA2IC8gMTI7IH1cXG5cXG4uZ3JpZC02LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyAxMzsgfVxcblxcbi5yb3ctNi0xMyB7XFxuICBncmlkLXJvdzogNiAvIDEzOyB9XFxuXFxuLmdyaWQtNi0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gMTQ7IH1cXG5cXG4ucm93LTYtMTQge1xcbiAgZ3JpZC1yb3c6IDYgLyAxNDsgfVxcblxcbi5ncmlkLTYtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi0xNSB7XFxuICBncmlkLWNvbHVtbjogNiAvIDE1OyB9XFxuXFxuLnJvdy02LTE1IHtcXG4gIGdyaWQtcm93OiA2IC8gMTU7IH1cXG5cXG4uZ3JpZC03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNyB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA3OyB9XFxuXFxuLnJvdy03IHtcXG4gIGdyaWQtcm93OiBzcGFuIDc7IH1cXG5cXG4uZ3JpZC03LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTEge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyAxOyB9XFxuXFxuLnJvdy03LTEge1xcbiAgZ3JpZC1yb3c6IDcgLyAxOyB9XFxuXFxuLmdyaWQtNy0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy0yIHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gMjsgfVxcblxcbi5yb3ctNy0yIHtcXG4gIGdyaWQtcm93OiA3IC8gMjsgfVxcblxcbi5ncmlkLTctMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctMyB7XFxuICBncmlkLWNvbHVtbjogNyAvIDM7IH1cXG5cXG4ucm93LTctMyB7XFxuICBncmlkLXJvdzogNyAvIDM7IH1cXG5cXG4uZ3JpZC03LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTQge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyA0OyB9XFxuXFxuLnJvdy03LTQge1xcbiAgZ3JpZC1yb3c6IDcgLyA0OyB9XFxuXFxuLmdyaWQtNy01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy01IHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gNTsgfVxcblxcbi5yb3ctNy01IHtcXG4gIGdyaWQtcm93OiA3IC8gNTsgfVxcblxcbi5ncmlkLTctNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctNiB7XFxuICBncmlkLWNvbHVtbjogNyAvIDY7IH1cXG5cXG4ucm93LTctNiB7XFxuICBncmlkLXJvdzogNyAvIDY7IH1cXG5cXG4uZ3JpZC03LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTcge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyA3OyB9XFxuXFxuLnJvdy03LTcge1xcbiAgZ3JpZC1yb3c6IDcgLyA3OyB9XFxuXFxuLmdyaWQtNy04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy04IHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gODsgfVxcblxcbi5yb3ctNy04IHtcXG4gIGdyaWQtcm93OiA3IC8gODsgfVxcblxcbi5ncmlkLTctOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTctOSB7XFxuICBncmlkLWNvbHVtbjogNyAvIDk7IH1cXG5cXG4ucm93LTctOSB7XFxuICBncmlkLXJvdzogNyAvIDk7IH1cXG5cXG4uZ3JpZC03LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctMTAge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyAxMDsgfVxcblxcbi5yb3ctNy0xMCB7XFxuICBncmlkLXJvdzogNyAvIDEwOyB9XFxuXFxuLmdyaWQtNy0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTExIHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gMTE7IH1cXG5cXG4ucm93LTctMTEge1xcbiAgZ3JpZC1yb3c6IDcgLyAxMTsgfVxcblxcbi5ncmlkLTctMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy0xMiB7XFxuICBncmlkLWNvbHVtbjogNyAvIDEyOyB9XFxuXFxuLnJvdy03LTEyIHtcXG4gIGdyaWQtcm93OiA3IC8gMTI7IH1cXG5cXG4uZ3JpZC03LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctMTMge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyAxMzsgfVxcblxcbi5yb3ctNy0xMyB7XFxuICBncmlkLXJvdzogNyAvIDEzOyB9XFxuXFxuLmdyaWQtNy0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gMTQ7IH1cXG5cXG4ucm93LTctMTQge1xcbiAgZ3JpZC1yb3c6IDcgLyAxNDsgfVxcblxcbi5ncmlkLTctMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy0xNSB7XFxuICBncmlkLWNvbHVtbjogNyAvIDE1OyB9XFxuXFxuLnJvdy03LTE1IHtcXG4gIGdyaWQtcm93OiA3IC8gMTU7IH1cXG5cXG4uZ3JpZC04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA4OyB9XFxuXFxuLnJvdy04IHtcXG4gIGdyaWQtcm93OiBzcGFuIDg7IH1cXG5cXG4uZ3JpZC04LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTEge1xcbiAgZ3JpZC1jb2x1bW46IDggLyAxOyB9XFxuXFxuLnJvdy04LTEge1xcbiAgZ3JpZC1yb3c6IDggLyAxOyB9XFxuXFxuLmdyaWQtOC0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC0yIHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gMjsgfVxcblxcbi5yb3ctOC0yIHtcXG4gIGdyaWQtcm93OiA4IC8gMjsgfVxcblxcbi5ncmlkLTgtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtMyB7XFxuICBncmlkLWNvbHVtbjogOCAvIDM7IH1cXG5cXG4ucm93LTgtMyB7XFxuICBncmlkLXJvdzogOCAvIDM7IH1cXG5cXG4uZ3JpZC04LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTQge1xcbiAgZ3JpZC1jb2x1bW46IDggLyA0OyB9XFxuXFxuLnJvdy04LTQge1xcbiAgZ3JpZC1yb3c6IDggLyA0OyB9XFxuXFxuLmdyaWQtOC01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC01IHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gNTsgfVxcblxcbi5yb3ctOC01IHtcXG4gIGdyaWQtcm93OiA4IC8gNTsgfVxcblxcbi5ncmlkLTgtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtNiB7XFxuICBncmlkLWNvbHVtbjogOCAvIDY7IH1cXG5cXG4ucm93LTgtNiB7XFxuICBncmlkLXJvdzogOCAvIDY7IH1cXG5cXG4uZ3JpZC04LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTcge1xcbiAgZ3JpZC1jb2x1bW46IDggLyA3OyB9XFxuXFxuLnJvdy04LTcge1xcbiAgZ3JpZC1yb3c6IDggLyA3OyB9XFxuXFxuLmdyaWQtOC04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC04IHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gODsgfVxcblxcbi5yb3ctOC04IHtcXG4gIGdyaWQtcm93OiA4IC8gODsgfVxcblxcbi5ncmlkLTgtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtOSB7XFxuICBncmlkLWNvbHVtbjogOCAvIDk7IH1cXG5cXG4ucm93LTgtOSB7XFxuICBncmlkLXJvdzogOCAvIDk7IH1cXG5cXG4uZ3JpZC04LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDggLyAxMDsgfVxcblxcbi5yb3ctOC0xMCB7XFxuICBncmlkLXJvdzogOCAvIDEwOyB9XFxuXFxuLmdyaWQtOC0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTExIHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gMTE7IH1cXG5cXG4ucm93LTgtMTEge1xcbiAgZ3JpZC1yb3c6IDggLyAxMTsgfVxcblxcbi5ncmlkLTgtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC0xMiB7XFxuICBncmlkLWNvbHVtbjogOCAvIDEyOyB9XFxuXFxuLnJvdy04LTEyIHtcXG4gIGdyaWQtcm93OiA4IC8gMTI7IH1cXG5cXG4uZ3JpZC04LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDggLyAxMzsgfVxcblxcbi5yb3ctOC0xMyB7XFxuICBncmlkLXJvdzogOCAvIDEzOyB9XFxuXFxuLmdyaWQtOC0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gMTQ7IH1cXG5cXG4ucm93LTgtMTQge1xcbiAgZ3JpZC1yb3c6IDggLyAxNDsgfVxcblxcbi5ncmlkLTgtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC0xNSB7XFxuICBncmlkLWNvbHVtbjogOCAvIDE1OyB9XFxuXFxuLnJvdy04LTE1IHtcXG4gIGdyaWQtcm93OiA4IC8gMTU7IH1cXG5cXG4uZ3JpZC05IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA5OyB9XFxuXFxuLnJvdy05IHtcXG4gIGdyaWQtcm93OiBzcGFuIDk7IH1cXG5cXG4uZ3JpZC05LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTEge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyAxOyB9XFxuXFxuLnJvdy05LTEge1xcbiAgZ3JpZC1yb3c6IDkgLyAxOyB9XFxuXFxuLmdyaWQtOS0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS0yIHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gMjsgfVxcblxcbi5yb3ctOS0yIHtcXG4gIGdyaWQtcm93OiA5IC8gMjsgfVxcblxcbi5ncmlkLTktMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktMyB7XFxuICBncmlkLWNvbHVtbjogOSAvIDM7IH1cXG5cXG4ucm93LTktMyB7XFxuICBncmlkLXJvdzogOSAvIDM7IH1cXG5cXG4uZ3JpZC05LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTQge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyA0OyB9XFxuXFxuLnJvdy05LTQge1xcbiAgZ3JpZC1yb3c6IDkgLyA0OyB9XFxuXFxuLmdyaWQtOS01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS01IHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gNTsgfVxcblxcbi5yb3ctOS01IHtcXG4gIGdyaWQtcm93OiA5IC8gNTsgfVxcblxcbi5ncmlkLTktNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktNiB7XFxuICBncmlkLWNvbHVtbjogOSAvIDY7IH1cXG5cXG4ucm93LTktNiB7XFxuICBncmlkLXJvdzogOSAvIDY7IH1cXG5cXG4uZ3JpZC05LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTcge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyA3OyB9XFxuXFxuLnJvdy05LTcge1xcbiAgZ3JpZC1yb3c6IDkgLyA3OyB9XFxuXFxuLmdyaWQtOS04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS04IHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gODsgfVxcblxcbi5yb3ctOS04IHtcXG4gIGdyaWQtcm93OiA5IC8gODsgfVxcblxcbi5ncmlkLTktOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTktOSB7XFxuICBncmlkLWNvbHVtbjogOSAvIDk7IH1cXG5cXG4ucm93LTktOSB7XFxuICBncmlkLXJvdzogOSAvIDk7IH1cXG5cXG4uZ3JpZC05LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktMTAge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyAxMDsgfVxcblxcbi5yb3ctOS0xMCB7XFxuICBncmlkLXJvdzogOSAvIDEwOyB9XFxuXFxuLmdyaWQtOS0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTExIHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gMTE7IH1cXG5cXG4ucm93LTktMTEge1xcbiAgZ3JpZC1yb3c6IDkgLyAxMTsgfVxcblxcbi5ncmlkLTktMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS0xMiB7XFxuICBncmlkLWNvbHVtbjogOSAvIDEyOyB9XFxuXFxuLnJvdy05LTEyIHtcXG4gIGdyaWQtcm93OiA5IC8gMTI7IH1cXG5cXG4uZ3JpZC05LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktMTMge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyAxMzsgfVxcblxcbi5yb3ctOS0xMyB7XFxuICBncmlkLXJvdzogOSAvIDEzOyB9XFxuXFxuLmdyaWQtOS0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gMTQ7IH1cXG5cXG4ucm93LTktMTQge1xcbiAgZ3JpZC1yb3c6IDkgLyAxNDsgfVxcblxcbi5ncmlkLTktMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS0xNSB7XFxuICBncmlkLWNvbHVtbjogOSAvIDE1OyB9XFxuXFxuLnJvdy05LTE1IHtcXG4gIGdyaWQtcm93OiA5IC8gMTU7IH1cXG5cXG4uZ3JpZC0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMDsgfVxcblxcbi5yb3ctMTAge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTA7IH1cXG5cXG4uZ3JpZC0xMC0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gMTsgfVxcblxcbi5yb3ctMTAtMSB7XFxuICBncmlkLXJvdzogMTAgLyAxOyB9XFxuXFxuLmdyaWQtMTAtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDI7IH1cXG5cXG4ucm93LTEwLTIge1xcbiAgZ3JpZC1yb3c6IDEwIC8gMjsgfVxcblxcbi5ncmlkLTEwLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtMyB7XFxuICBncmlkLWNvbHVtbjogMTAgLyAzOyB9XFxuXFxuLnJvdy0xMC0zIHtcXG4gIGdyaWQtcm93OiAxMCAvIDM7IH1cXG5cXG4uZ3JpZC0xMC00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gNDsgfVxcblxcbi5yb3ctMTAtNCB7XFxuICBncmlkLXJvdzogMTAgLyA0OyB9XFxuXFxuLmdyaWQtMTAtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC01IHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDU7IH1cXG5cXG4ucm93LTEwLTUge1xcbiAgZ3JpZC1yb3c6IDEwIC8gNTsgfVxcblxcbi5ncmlkLTEwLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtNiB7XFxuICBncmlkLWNvbHVtbjogMTAgLyA2OyB9XFxuXFxuLnJvdy0xMC02IHtcXG4gIGdyaWQtcm93OiAxMCAvIDY7IH1cXG5cXG4uZ3JpZC0xMC03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gNzsgfVxcblxcbi5yb3ctMTAtNyB7XFxuICBncmlkLXJvdzogMTAgLyA3OyB9XFxuXFxuLmdyaWQtMTAtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC04IHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDg7IH1cXG5cXG4ucm93LTEwLTgge1xcbiAgZ3JpZC1yb3c6IDEwIC8gODsgfVxcblxcbi5ncmlkLTEwLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtOSB7XFxuICBncmlkLWNvbHVtbjogMTAgLyA5OyB9XFxuXFxuLnJvdy0xMC05IHtcXG4gIGdyaWQtcm93OiAxMCAvIDk7IH1cXG5cXG4uZ3JpZC0xMC0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gMTA7IH1cXG5cXG4ucm93LTEwLTEwIHtcXG4gIGdyaWQtcm93OiAxMCAvIDEwOyB9XFxuXFxuLmdyaWQtMTAtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDExOyB9XFxuXFxuLnJvdy0xMC0xMSB7XFxuICBncmlkLXJvdzogMTAgLyAxMTsgfVxcblxcbi5ncmlkLTEwLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC0xMiB7XFxuICBncmlkLWNvbHVtbjogMTAgLyAxMjsgfVxcblxcbi5yb3ctMTAtMTIge1xcbiAgZ3JpZC1yb3c6IDEwIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMC0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gMTM7IH1cXG5cXG4ucm93LTEwLTEzIHtcXG4gIGdyaWQtcm93OiAxMCAvIDEzOyB9XFxuXFxuLmdyaWQtMTAtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDE0OyB9XFxuXFxuLnJvdy0xMC0xNCB7XFxuICBncmlkLXJvdzogMTAgLyAxNDsgfVxcblxcbi5ncmlkLTEwLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC0xNSB7XFxuICBncmlkLWNvbHVtbjogMTAgLyAxNTsgfVxcblxcbi5yb3ctMTAtMTUge1xcbiAgZ3JpZC1yb3c6IDEwIC8gMTU7IH1cXG5cXG4uZ3JpZC0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMTsgfVxcblxcbi5yb3ctMTEge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTE7IH1cXG5cXG4uZ3JpZC0xMS0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTEge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gMTsgfVxcblxcbi5yb3ctMTEtMSB7XFxuICBncmlkLXJvdzogMTEgLyAxOyB9XFxuXFxuLmdyaWQtMTEtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDI7IH1cXG5cXG4ucm93LTExLTIge1xcbiAgZ3JpZC1yb3c6IDExIC8gMjsgfVxcblxcbi5ncmlkLTExLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtMyB7XFxuICBncmlkLWNvbHVtbjogMTEgLyAzOyB9XFxuXFxuLnJvdy0xMS0zIHtcXG4gIGdyaWQtcm93OiAxMSAvIDM7IH1cXG5cXG4uZ3JpZC0xMS00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTQge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gNDsgfVxcblxcbi5yb3ctMTEtNCB7XFxuICBncmlkLXJvdzogMTEgLyA0OyB9XFxuXFxuLmdyaWQtMTEtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS01IHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDU7IH1cXG5cXG4ucm93LTExLTUge1xcbiAgZ3JpZC1yb3c6IDExIC8gNTsgfVxcblxcbi5ncmlkLTExLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtNiB7XFxuICBncmlkLWNvbHVtbjogMTEgLyA2OyB9XFxuXFxuLnJvdy0xMS02IHtcXG4gIGdyaWQtcm93OiAxMSAvIDY7IH1cXG5cXG4uZ3JpZC0xMS03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTcge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gNzsgfVxcblxcbi5yb3ctMTEtNyB7XFxuICBncmlkLXJvdzogMTEgLyA3OyB9XFxuXFxuLmdyaWQtMTEtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS04IHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDg7IH1cXG5cXG4ucm93LTExLTgge1xcbiAgZ3JpZC1yb3c6IDExIC8gODsgfVxcblxcbi5ncmlkLTExLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtOSB7XFxuICBncmlkLWNvbHVtbjogMTEgLyA5OyB9XFxuXFxuLnJvdy0xMS05IHtcXG4gIGdyaWQtcm93OiAxMSAvIDk7IH1cXG5cXG4uZ3JpZC0xMS0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gMTA7IH1cXG5cXG4ucm93LTExLTEwIHtcXG4gIGdyaWQtcm93OiAxMSAvIDEwOyB9XFxuXFxuLmdyaWQtMTEtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDExOyB9XFxuXFxuLnJvdy0xMS0xMSB7XFxuICBncmlkLXJvdzogMTEgLyAxMTsgfVxcblxcbi5ncmlkLTExLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS0xMiB7XFxuICBncmlkLWNvbHVtbjogMTEgLyAxMjsgfVxcblxcbi5yb3ctMTEtMTIge1xcbiAgZ3JpZC1yb3c6IDExIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMS0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gMTM7IH1cXG5cXG4ucm93LTExLTEzIHtcXG4gIGdyaWQtcm93OiAxMSAvIDEzOyB9XFxuXFxuLmdyaWQtMTEtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDE0OyB9XFxuXFxuLnJvdy0xMS0xNCB7XFxuICBncmlkLXJvdzogMTEgLyAxNDsgfVxcblxcbi5ncmlkLTExLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS0xNSB7XFxuICBncmlkLWNvbHVtbjogMTEgLyAxNTsgfVxcblxcbi5yb3ctMTEtMTUge1xcbiAgZ3JpZC1yb3c6IDExIC8gMTU7IH1cXG5cXG4uZ3JpZC0xMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMiB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMjsgfVxcblxcbi5yb3ctMTIge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTI7IH1cXG5cXG4uZ3JpZC0xMi0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gMTsgfVxcblxcbi5yb3ctMTItMSB7XFxuICBncmlkLXJvdzogMTIgLyAxOyB9XFxuXFxuLmdyaWQtMTItMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDI7IH1cXG5cXG4ucm93LTEyLTIge1xcbiAgZ3JpZC1yb3c6IDEyIC8gMjsgfVxcblxcbi5ncmlkLTEyLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItMyB7XFxuICBncmlkLWNvbHVtbjogMTIgLyAzOyB9XFxuXFxuLnJvdy0xMi0zIHtcXG4gIGdyaWQtcm93OiAxMiAvIDM7IH1cXG5cXG4uZ3JpZC0xMi00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gNDsgfVxcblxcbi5yb3ctMTItNCB7XFxuICBncmlkLXJvdzogMTIgLyA0OyB9XFxuXFxuLmdyaWQtMTItNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi01IHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDU7IH1cXG5cXG4ucm93LTEyLTUge1xcbiAgZ3JpZC1yb3c6IDEyIC8gNTsgfVxcblxcbi5ncmlkLTEyLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItNiB7XFxuICBncmlkLWNvbHVtbjogMTIgLyA2OyB9XFxuXFxuLnJvdy0xMi02IHtcXG4gIGdyaWQtcm93OiAxMiAvIDY7IH1cXG5cXG4uZ3JpZC0xMi03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gNzsgfVxcblxcbi5yb3ctMTItNyB7XFxuICBncmlkLXJvdzogMTIgLyA3OyB9XFxuXFxuLmdyaWQtMTItOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi04IHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDg7IH1cXG5cXG4ucm93LTEyLTgge1xcbiAgZ3JpZC1yb3c6IDEyIC8gODsgfVxcblxcbi5ncmlkLTEyLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItOSB7XFxuICBncmlkLWNvbHVtbjogMTIgLyA5OyB9XFxuXFxuLnJvdy0xMi05IHtcXG4gIGdyaWQtcm93OiAxMiAvIDk7IH1cXG5cXG4uZ3JpZC0xMi0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gMTA7IH1cXG5cXG4ucm93LTEyLTEwIHtcXG4gIGdyaWQtcm93OiAxMiAvIDEwOyB9XFxuXFxuLmdyaWQtMTItMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDExOyB9XFxuXFxuLnJvdy0xMi0xMSB7XFxuICBncmlkLXJvdzogMTIgLyAxMTsgfVxcblxcbi5ncmlkLTEyLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi0xMiB7XFxuICBncmlkLWNvbHVtbjogMTIgLyAxMjsgfVxcblxcbi5yb3ctMTItMTIge1xcbiAgZ3JpZC1yb3c6IDEyIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMi0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gMTM7IH1cXG5cXG4ucm93LTEyLTEzIHtcXG4gIGdyaWQtcm93OiAxMiAvIDEzOyB9XFxuXFxuLmdyaWQtMTItMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDE0OyB9XFxuXFxuLnJvdy0xMi0xNCB7XFxuICBncmlkLXJvdzogMTIgLyAxNDsgfVxcblxcbi5ncmlkLTEyLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi0xNSB7XFxuICBncmlkLWNvbHVtbjogMTIgLyAxNTsgfVxcblxcbi5yb3ctMTItMTUge1xcbiAgZ3JpZC1yb3c6IDEyIC8gMTU7IH1cXG5cXG4uZ3JpZC0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMyB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMzsgfVxcblxcbi5yb3ctMTMge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTM7IH1cXG5cXG4uZ3JpZC0xMy0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gMTsgfVxcblxcbi5yb3ctMTMtMSB7XFxuICBncmlkLXJvdzogMTMgLyAxOyB9XFxuXFxuLmdyaWQtMTMtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDI7IH1cXG5cXG4ucm93LTEzLTIge1xcbiAgZ3JpZC1yb3c6IDEzIC8gMjsgfVxcblxcbi5ncmlkLTEzLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtMyB7XFxuICBncmlkLWNvbHVtbjogMTMgLyAzOyB9XFxuXFxuLnJvdy0xMy0zIHtcXG4gIGdyaWQtcm93OiAxMyAvIDM7IH1cXG5cXG4uZ3JpZC0xMy00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gNDsgfVxcblxcbi5yb3ctMTMtNCB7XFxuICBncmlkLXJvdzogMTMgLyA0OyB9XFxuXFxuLmdyaWQtMTMtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy01IHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDU7IH1cXG5cXG4ucm93LTEzLTUge1xcbiAgZ3JpZC1yb3c6IDEzIC8gNTsgfVxcblxcbi5ncmlkLTEzLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtNiB7XFxuICBncmlkLWNvbHVtbjogMTMgLyA2OyB9XFxuXFxuLnJvdy0xMy02IHtcXG4gIGdyaWQtcm93OiAxMyAvIDY7IH1cXG5cXG4uZ3JpZC0xMy03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gNzsgfVxcblxcbi5yb3ctMTMtNyB7XFxuICBncmlkLXJvdzogMTMgLyA3OyB9XFxuXFxuLmdyaWQtMTMtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy04IHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDg7IH1cXG5cXG4ucm93LTEzLTgge1xcbiAgZ3JpZC1yb3c6IDEzIC8gODsgfVxcblxcbi5ncmlkLTEzLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtOSB7XFxuICBncmlkLWNvbHVtbjogMTMgLyA5OyB9XFxuXFxuLnJvdy0xMy05IHtcXG4gIGdyaWQtcm93OiAxMyAvIDk7IH1cXG5cXG4uZ3JpZC0xMy0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gMTA7IH1cXG5cXG4ucm93LTEzLTEwIHtcXG4gIGdyaWQtcm93OiAxMyAvIDEwOyB9XFxuXFxuLmdyaWQtMTMtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDExOyB9XFxuXFxuLnJvdy0xMy0xMSB7XFxuICBncmlkLXJvdzogMTMgLyAxMTsgfVxcblxcbi5ncmlkLTEzLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy0xMiB7XFxuICBncmlkLWNvbHVtbjogMTMgLyAxMjsgfVxcblxcbi5yb3ctMTMtMTIge1xcbiAgZ3JpZC1yb3c6IDEzIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMy0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gMTM7IH1cXG5cXG4ucm93LTEzLTEzIHtcXG4gIGdyaWQtcm93OiAxMyAvIDEzOyB9XFxuXFxuLmdyaWQtMTMtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDE0OyB9XFxuXFxuLnJvdy0xMy0xNCB7XFxuICBncmlkLXJvdzogMTMgLyAxNDsgfVxcblxcbi5ncmlkLTEzLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy0xNSB7XFxuICBncmlkLWNvbHVtbjogMTMgLyAxNTsgfVxcblxcbi5yb3ctMTMtMTUge1xcbiAgZ3JpZC1yb3c6IDEzIC8gMTU7IH1cXG5cXG4uZ3JpZC0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxNDsgfVxcblxcbi5yb3ctMTQge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTQ7IH1cXG5cXG4uZ3JpZC0xNC0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTEge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gMTsgfVxcblxcbi5yb3ctMTQtMSB7XFxuICBncmlkLXJvdzogMTQgLyAxOyB9XFxuXFxuLmdyaWQtMTQtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC0yIHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDI7IH1cXG5cXG4ucm93LTE0LTIge1xcbiAgZ3JpZC1yb3c6IDE0IC8gMjsgfVxcblxcbi5ncmlkLTE0LTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtMyB7XFxuICBncmlkLWNvbHVtbjogMTQgLyAzOyB9XFxuXFxuLnJvdy0xNC0zIHtcXG4gIGdyaWQtcm93OiAxNCAvIDM7IH1cXG5cXG4uZ3JpZC0xNC00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTQge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gNDsgfVxcblxcbi5yb3ctMTQtNCB7XFxuICBncmlkLXJvdzogMTQgLyA0OyB9XFxuXFxuLmdyaWQtMTQtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC01IHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDU7IH1cXG5cXG4ucm93LTE0LTUge1xcbiAgZ3JpZC1yb3c6IDE0IC8gNTsgfVxcblxcbi5ncmlkLTE0LTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtNiB7XFxuICBncmlkLWNvbHVtbjogMTQgLyA2OyB9XFxuXFxuLnJvdy0xNC02IHtcXG4gIGdyaWQtcm93OiAxNCAvIDY7IH1cXG5cXG4uZ3JpZC0xNC03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTcge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gNzsgfVxcblxcbi5yb3ctMTQtNyB7XFxuICBncmlkLXJvdzogMTQgLyA3OyB9XFxuXFxuLmdyaWQtMTQtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC04IHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDg7IH1cXG5cXG4ucm93LTE0LTgge1xcbiAgZ3JpZC1yb3c6IDE0IC8gODsgfVxcblxcbi5ncmlkLTE0LTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtOSB7XFxuICBncmlkLWNvbHVtbjogMTQgLyA5OyB9XFxuXFxuLnJvdy0xNC05IHtcXG4gIGdyaWQtcm93OiAxNCAvIDk7IH1cXG5cXG4uZ3JpZC0xNC0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gMTA7IH1cXG5cXG4ucm93LTE0LTEwIHtcXG4gIGdyaWQtcm93OiAxNCAvIDEwOyB9XFxuXFxuLmdyaWQtMTQtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTExIHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDExOyB9XFxuXFxuLnJvdy0xNC0xMSB7XFxuICBncmlkLXJvdzogMTQgLyAxMTsgfVxcblxcbi5ncmlkLTE0LTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC0xMiB7XFxuICBncmlkLWNvbHVtbjogMTQgLyAxMjsgfVxcblxcbi5yb3ctMTQtMTIge1xcbiAgZ3JpZC1yb3c6IDE0IC8gMTI7IH1cXG5cXG4uZ3JpZC0xNC0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gMTM7IH1cXG5cXG4ucm93LTE0LTEzIHtcXG4gIGdyaWQtcm93OiAxNCAvIDEzOyB9XFxuXFxuLmdyaWQtMTQtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDE0OyB9XFxuXFxuLnJvdy0xNC0xNCB7XFxuICBncmlkLXJvdzogMTQgLyAxNDsgfVxcblxcbi5ncmlkLTE0LTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC0xNSB7XFxuICBncmlkLWNvbHVtbjogMTQgLyAxNTsgfVxcblxcbi5yb3ctMTQtMTUge1xcbiAgZ3JpZC1yb3c6IDE0IC8gMTU7IH1cXG5cXG4uZ3JpZC0xNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxNTsgfVxcblxcbi5yb3ctMTUge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTU7IH1cXG5cXG4uZ3JpZC0xNS0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTEge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gMTsgfVxcblxcbi5yb3ctMTUtMSB7XFxuICBncmlkLXJvdzogMTUgLyAxOyB9XFxuXFxuLmdyaWQtMTUtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS0yIHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDI7IH1cXG5cXG4ucm93LTE1LTIge1xcbiAgZ3JpZC1yb3c6IDE1IC8gMjsgfVxcblxcbi5ncmlkLTE1LTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtMyB7XFxuICBncmlkLWNvbHVtbjogMTUgLyAzOyB9XFxuXFxuLnJvdy0xNS0zIHtcXG4gIGdyaWQtcm93OiAxNSAvIDM7IH1cXG5cXG4uZ3JpZC0xNS00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTQge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gNDsgfVxcblxcbi5yb3ctMTUtNCB7XFxuICBncmlkLXJvdzogMTUgLyA0OyB9XFxuXFxuLmdyaWQtMTUtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS01IHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDU7IH1cXG5cXG4ucm93LTE1LTUge1xcbiAgZ3JpZC1yb3c6IDE1IC8gNTsgfVxcblxcbi5ncmlkLTE1LTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtNiB7XFxuICBncmlkLWNvbHVtbjogMTUgLyA2OyB9XFxuXFxuLnJvdy0xNS02IHtcXG4gIGdyaWQtcm93OiAxNSAvIDY7IH1cXG5cXG4uZ3JpZC0xNS03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTcge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gNzsgfVxcblxcbi5yb3ctMTUtNyB7XFxuICBncmlkLXJvdzogMTUgLyA3OyB9XFxuXFxuLmdyaWQtMTUtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS04IHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDg7IH1cXG5cXG4ucm93LTE1LTgge1xcbiAgZ3JpZC1yb3c6IDE1IC8gODsgfVxcblxcbi5ncmlkLTE1LTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtOSB7XFxuICBncmlkLWNvbHVtbjogMTUgLyA5OyB9XFxuXFxuLnJvdy0xNS05IHtcXG4gIGdyaWQtcm93OiAxNSAvIDk7IH1cXG5cXG4uZ3JpZC0xNS0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gMTA7IH1cXG5cXG4ucm93LTE1LTEwIHtcXG4gIGdyaWQtcm93OiAxNSAvIDEwOyB9XFxuXFxuLmdyaWQtMTUtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTExIHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDExOyB9XFxuXFxuLnJvdy0xNS0xMSB7XFxuICBncmlkLXJvdzogMTUgLyAxMTsgfVxcblxcbi5ncmlkLTE1LTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS0xMiB7XFxuICBncmlkLWNvbHVtbjogMTUgLyAxMjsgfVxcblxcbi5yb3ctMTUtMTIge1xcbiAgZ3JpZC1yb3c6IDE1IC8gMTI7IH1cXG5cXG4uZ3JpZC0xNS0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gMTM7IH1cXG5cXG4ucm93LTE1LTEzIHtcXG4gIGdyaWQtcm93OiAxNSAvIDEzOyB9XFxuXFxuLmdyaWQtMTUtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDE0OyB9XFxuXFxuLnJvdy0xNS0xNCB7XFxuICBncmlkLXJvdzogMTUgLyAxNDsgfVxcblxcbi5ncmlkLTE1LTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS0xNSB7XFxuICBncmlkLWNvbHVtbjogMTUgLyAxNTsgfVxcblxcbi5yb3ctMTUtMTUge1xcbiAgZ3JpZC1yb3c6IDE1IC8gMTU7IH1cXG5cXG4uaGVhZGVyX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBwYWRkaW5nOiBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMTgpO1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygxLjI1ICogdmFyKC0tc3BhY2luZy11bml0KSk7IH1cXG5cXG4ucGFnZS10aXRsZSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgSGVsdmV0aWNhLCBhcmlhbCwgY3Vyc2l2ZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC4yNSAqIHZhcigtLWZpeGVkLXNwYWNpbmctdW5pdCkpO1xcbiAgYm9yZGVyOiBzb2xpZCAycHggY3VycmVudENvbG9yO1xcbiAgYm9yZGVyLXJhZGl1czogY2FsYygwLjc1ICogdmFyKC0tZml4ZWQtc3BhY2luZy11bml0KSk7IH1cXG5cXG4ubmF2YmFyIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBjYWxjKDEuMjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTsgfVxcbiAgLm5hdmJhciBhIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuXFxuLnByb21vdGlvbnNfdGl0bGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1ib3R0b206IGNhbGMoMC43NSAqIHZhcigtLWZpeGVkLXNwYWNpbmctdW5pdCkpO1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuICAucHJvbW90aW9uc190aXRsZTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSk7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogM2VtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3OyB9XFxuXFxuLnByb21vdGlvbi1saXN0IHtcXG4gIG1hcmdpbjogY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7IH1cXG5cXG4ucHJvbW90aW9uLWNyZWF0ZV9mb3JtLmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNTsgfVxcbiAgLnByb21vdGlvbi1jcmVhdGVfZm9ybS5kaXNhYmxlZCAuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XFxuXFxuLnByb21vdGlvbi1kZXRhaWxfaW5mb3Mge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAqIDEuMiAqIDEuMik7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIEhlbHZldGljYSwgYXJpYWwsIGN1cnNpdmU7IH1cXG4gIC5wcm9tb3Rpb24tZGV0YWlsX2luZm9zIC5pbmZvIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8gTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAvICgxLjIgKiAxLjIpKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG1hcmdpbi10b3A6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICAgIG1hcmdpbi1ib3R0b206IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuICAucHJvbW90aW9uLWRldGFpbF9pbmZvcyAuYWN0aW9uLWJhciB7XFxuICAgIHBhZGRpbmc6IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuLnN0dWRlbnQtbGlzdCB7XFxuICBtYXJnaW46IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuLnN0dWRlbnQtbGlzdF9hY3Rpb24tYmFyIHtcXG4gIHBhZGRpbmc6IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuOmdsb2JhbCguaW5wdXQpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYzsgfVxcbiAgOmdsb2JhbCguaW5wdXQpOmZvY3VzIHtcXG4gICAgb3V0bGluZS1jb2xvcjogIzM4M2Y0NzsgfVxcbiAgOmdsb2JhbCguaW5wdXQpW3R5cGU9c3VibWl0XSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgSGVsdmV0aWNhLCBhcmlhbCwgY3Vyc2l2ZTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDRweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIDpnbG9iYWwoLmlucHV0KVt0eXBlPXN1Ym1pdF06aG92ZXIsIDpnbG9iYWwoLmlucHV0KVt0eXBlPXN1Ym1pdF06Zm9jdXMge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7IH1cXG5cXG46Z2xvYmFsKC5sYWJlbCkge1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5yaWNoLWxpc3Qge1xcbiAgLS1ib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpO1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXIpO1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTsgfVxcblxcbi5yaWNoLWxpc3RfaXRlbTpudGgtb2YtdHlwZSgzbi0yKSBhLCAucmljaC1saXN0X2l0ZW06bnRoLW9mLXR5cGUoM24tMSkgYSB7XFxuICBib3JkZXItcmlnaHQ6IHZhcigtLWJvcmRlcik7IH1cXG5cXG4ucmljaC1saXN0X2l0ZW06bnRoLW9mLXR5cGUob2RkKSBhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7IH1cXG5cXG4ucmljaC1saXN0X2l0ZW06bnRoLW9mLXR5cGUoZXZlbikgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgfVxcblxcbi5yaWNoLWxpc3RfaXRlbSBhIHtcXG4gIHBhZGRpbmc6IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0tYm9yZGVyKTtcXG4gIGhlaWdodDogMTAwJTsgfVxcbiAgLnJpY2gtbGlzdF9pdGVtIGE6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3O1xcbiAgICBjb2xvcjogd2hpdGU7IH1cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhbmltYXRpb246IG1vZGFsLWFwcGVhciAwLjM1czsgfVxcbiAgLm1vZGFsLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4ubW9kYWwtY29udGVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IGNhbGMoMS4yNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuLm1vZGFsLWFjdGlvbi1iYXIge1xcbiAgbWFyZ2luLXRvcDogY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsLWFwcGVhciB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG46Z2xvYmFsKC5idG4tcHJpbWFyeSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5KTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5KS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjMzgzZjQ3O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzgzZjQ3OyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1wcmltYXJ5KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMyMjI2MmI7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMjIyNjJiOyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktZGFyaykge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWRhcmspOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzBiMGQwZTsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktZGFyaykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzIyMjYyYjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzIyMjYyYjsgfVxcbiAgICA6Z2xvYmFsKC5idG4tcHJpbWFyeS1kYXJrKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMwYjBkMGU7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMGIwZDBlOyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktZGFya2VyKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWRhcmtlcik6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktZGFya2VyKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7IH1cXG4gICAgOmdsb2JhbCguYnRuLXByaW1hcnktZGFya2VyKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG5cXG46Z2xvYmFsKC5idG4tcHJpbWFyeS1saWdodCkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZjU4NjQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0KTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0KS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjNGY1ODY0O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjNGY1ODY0OyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMzODNmNDc7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzgzZjQ3OyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktbGlnaHRlcikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3MDdkOGY7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0ZXIpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVhNjQ3MjsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktbGlnaHRlcikub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzcwN2Q4ZjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzcwN2Q4ZjsgfVxcbiAgICA6Z2xvYmFsKC5idG4tcHJpbWFyeS1saWdodGVyKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICM1YTY0NzI7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjNWE2NDcyOyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktaGFsZikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTYsIDYzLCA3MSwgMC41KTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktaGFsZik6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM0LCAzOCwgNDMsIDAuNSk7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWhhbGYpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6IHJnYmEoNTYsIDYzLCA3MSwgMC41KTtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiYSg1NiwgNjMsIDcxLCAwLjUpOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWhhbGYpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogcmdiYSgzNCwgMzgsIDQzLCAwLjUpO1xcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgzNCwgMzgsIDQzLCAwLjUpOyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmIwZWU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnkpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzExOTdkNDsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeSkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzJiYjBlZTtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzJiYjBlZTsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMxMTk3ZDQ7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMTE5N2Q0OyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeS1kYXJrKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExOTdkNDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeS1kYXJrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwZDc1YTU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFyaykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzExOTdkNDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzExOTdkNDsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWRhcmspLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzBkNzVhNTtcXG4gICAgICBib3JkZXItY29sb3I6ICMwZDc1YTU7IH1cXG5cXG46Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWRhcmtlcikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYjY0OGU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFya2VyKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwODQzNWU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFya2VyKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjMGI2NDhlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMGI2NDhlOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFya2VyKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMwODQzNWU7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMDg0MzVlOyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodCkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YWMyZjI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktbGlnaHQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiYjBlZTsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodCkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzVhYzJmMjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzVhYzJmMjsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWxpZ2h0KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMyYmIwZWU7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMmJiMGVlOyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodGVyKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmNztcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWxpZ2h0ZXIpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcxY2FmNDsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodGVyKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjYTFkY2Y3O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjYTFkY2Y3OyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktbGlnaHRlcikub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjNzFjYWY0O1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzcxY2FmNDsgfVxcblxcbjpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktaGFsZikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDMsIDE3NiwgMjM4LCAwLjUpO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWhhbGYpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNywgMTUxLCAyMTIsIDAuNSk7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktaGFsZikub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogcmdiYSg0MywgMTc2LCAyMzgsIDAuNSk7XFxuICAgIGJvcmRlcjogc29saWQgMXB4IHJnYmEoNDMsIDE3NiwgMjM4LCAwLjUpOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktaGFsZikub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiByZ2JhKDE3LCAxNTEsIDIxMiwgMC41KTtcXG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMTcsIDE1MSwgMjEyLCAwLjUpOyB9XFxuXFxuOmdsb2JhbCguYnRuLWJsYWNrKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBkMGQwZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLWJsYWNrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrOyB9XFxuICA6Z2xvYmFsKC5idG4tYmxhY2spLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICMwZDBkMGQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMwZDBkMGQ7IH1cXG4gICAgOmdsb2JhbCguYnRuLWJsYWNrKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG5cXG46Z2xvYmFsKC5idG4tZGFyaykge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZDRkNGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1kYXJrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7IH1cXG4gIDpnbG9iYWwoLmJ0bi1kYXJrKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjNGQ0ZDRkO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjNGQ0ZDRkOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1kYXJrKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMzMzMzMzM7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuOmdsb2JhbCguYnRuLWxpZ2h0KSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4tbGlnaHQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZDlkOTsgfVxcbiAgOmdsb2JhbCguYnRuLWxpZ2h0KS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjZjJmMmYyO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZjJmMmYyOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1saWdodCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZDlkOWQ5O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2Q5ZDlkOTsgfVxcblxcbjpnbG9iYWwoLmJ0bi13aGl0ZSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgY29sb3I6ICMyMjI7IH1cXG4gIDpnbG9iYWwoLmJ0bi13aGl0ZSk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2OyB9XFxuICA6Z2xvYmFsKC5idG4td2hpdGUpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcbiAgICA6Z2xvYmFsKC5idG4td2hpdGUpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogI2U2ZTZlNjtcXG4gICAgICBib3JkZXItY29sb3I6ICNlNmU2ZTY7IH1cXG5cXG46Z2xvYmFsKC5idG4taW5mbykge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmIwZWU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1pbmZvKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMTk3ZDQ7IH1cXG4gIDpnbG9iYWwoLmJ0bi1pbmZvKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjMmJiMGVlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMmJiMGVlOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1pbmZvKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMxMTk3ZDQ7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMTE5N2Q0OyB9XFxuXFxuOmdsb2JhbCguYnRuLXN1Y2Nlc3MpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTVjMzU5O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tc3VjY2Vzcyk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2NhYTNmOyB9XFxuICA6Z2xvYmFsKC5idG4tc3VjY2Vzcykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzU1YzM1OTtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzU1YzM1OTsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc3VjY2Vzcykub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjM2NhYTNmO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzNjYWEzZjsgfVxcblxcbjpnbG9iYWwoLmJ0bi13YXJuaW5nKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1YjY1NjtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4td2FybmluZyk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJhMTI2OyB9XFxuICA6Z2xvYmFsKC5idG4td2FybmluZykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogI2Y1YjY1NjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2Y1YjY1NjsgfVxcbiAgICA6Z2xvYmFsKC5idG4td2FybmluZykub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZjJhMTI2O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2YyYTEyNjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1kYW5nZXIpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTczZTMyO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tZGFuZ2VyKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjZDI0MTg7IH1cXG4gIDpnbG9iYWwoLmJ0bi1kYW5nZXIpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICNlNzNlMzI7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNlNzNlMzI7IH1cXG4gICAgOmdsb2JhbCguYnRuLWRhbmdlcikub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjY2QyNDE4O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2NkMjQxODsgfVxcblxcbjpnbG9iYWwoLmJ0bi10ZXh0KSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGQ0ZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLXRleHQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMzsgfVxcbiAgOmdsb2JhbCguYnRuLXRleHQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICM0ZDRkNGQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICM0ZDRkNGQ7IH1cXG4gICAgOmdsb2JhbCguYnRuLXRleHQpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgICBib3JkZXItY29sb3I6ICMzMzMzMzM7IH1cXG5cXG46Z2xvYmFsKC5idG4tdGl0bGUpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQwZDBkO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tdGl0bGUpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IH1cXG4gIDpnbG9iYWwoLmJ0bi10aXRsZSkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzBkMGQwZDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzBkMGQwZDsgfVxcbiAgICA6Z2xvYmFsKC5idG4tdGl0bGUpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogYmxhY2s7XFxuICAgICAgYm9yZGVyLWNvbG9yOiBibGFjazsgfVxcblxcbjpnbG9iYWwoLmJ0bi1zdWJ0aXRsZSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZDRkNGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zdWJ0aXRsZSk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzOyB9XFxuICA6Z2xvYmFsKC5idG4tc3VidGl0bGUpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICM0ZDRkNGQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICM0ZDRkNGQ7IH1cXG4gICAgOmdsb2JhbCguYnRuLXN1YnRpdGxlKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMzMzMzMzM7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuOmdsb2JhbCguYnRuLWxpbmspIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluayk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyNjJiOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluaykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzM4M2Y0NztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzM4M2Y0NzsgfVxcbiAgICA6Z2xvYmFsKC5idG4tbGluaykub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMjIyNjJiO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzIyMjYyYjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1saW5rLWhvdmVyZWQpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyNjJiO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluay1ob3ZlcmVkKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwYjBkMGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1saW5rLWhvdmVyZWQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICMyMjI2MmI7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMyMjI2MmI7IH1cXG4gICAgOmdsb2JhbCguYnRuLWxpbmstaG92ZXJlZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMGIwZDBlO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzBiMGQwZTsgfVxcblxcbjpnbG9iYWwoLmJ0bi1saW5rLXZpc2l0ZWQpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluay12aXNpdGVkKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7IH1cXG4gIDpnbG9iYWwoLmJ0bi1saW5rLXZpc2l0ZWQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICMzODNmNDc7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzODNmNDc7IH1cXG4gICAgOmdsb2JhbCguYnRuLWxpbmstdmlzaXRlZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMjIyNjJiO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzIyMjYyYjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1mb3JlZ3JvdW5kKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBjb2xvcjogIzIyMjsgfVxcbiAgOmdsb2JhbCguYnRuLWZvcmVncm91bmQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjsgfVxcbiAgOmdsb2JhbCguYnRuLWZvcmVncm91bmQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcbiAgICA6Z2xvYmFsKC5idG4tZm9yZWdyb3VuZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZTZlNmU2O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2U2ZTZlNjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1iYWNrZ3JvdW5kKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWVmODtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4tYmFja2dyb3VuZCk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzdjY2ViOyB9XFxuICA6Z2xvYmFsKC5idG4tYmFja2dyb3VuZCkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogI2VjZWVmODtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2VjZWVmODsgfVxcbiAgICA6Z2xvYmFsKC5idG4tYmFja2dyb3VuZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjYzdjY2ViO1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2M3Y2NlYjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1jbGVhcikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICBjb2xvcjogaW5oZXJpdDsgfVxcblxcbjpnbG9iYWwoI2FwcCkge1xcbiAgZm9udC1zaXplOiAxLjA1ZW07XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIEhlbHZldGljYSwgYXJpYWwsIHNhbnMtc2VyaWY7XFxuICBsaW5lLWhlaWdodDogMS4xO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWVmODtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCBjZW50ZXIsIHdoaXRlIDUwJSwgI2YyZjJmMik7IH1cXG5cXG5hIHtcXG4gIGNvbG9yOiAjMzgzZjQ3OyB9XFxuICBhOmhvdmVyIHtcXG4gICAgY29sb3I6ICMyMjI2MmI7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJjOi9Vc2Vycy9scGVubmVxdWluL0RvY3VtZW50cy9wcm9qZWN0cy9Qb3BOZXR3b3JrMjAxOS9wcm90b3R5cGVzL2Rhc2hib2FyZC9kYXNoYm9hcmQuc2Fzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlCQUF5QjtFQUN6Qiw4QkFBOEI7RUFDOUIsOEJBQThCO0VBQzlCLCtCQUErQjtFQUMvQixpQ0FBaUM7RUFDakMsNENBQTRDO0VBQzVDLDJCQUEyQjtFQUMzQixnQ0FBZ0M7RUFDaEMsa0NBQWtDO0VBQ2xDLGlDQUFpQztFQUNqQyxtQ0FBbUM7RUFDbkMsZ0RBQWdEO0VBQ2hELHVCQUF1QjtFQUN2QixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6Qix3QkFBd0I7RUFDeEIsc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QiwwQkFBMEI7RUFDMUIsc0JBQXNCO0VBQ3RCLDhCQUE4QjtFQUM5Qiw4QkFBOEI7RUFDOUIsMEJBQTBCO0VBQzFCLDRCQUE0QixFQUFFOztBQUVoQztFQUNFLHFEQUFxRDtFQUNyRCxnREFBZ0Q7RUFDaEQsZ0VBQWdFO0VBQ2hFLHlDQUF5QztFQUN6Qyx3QkFBd0I7RUFDeEIsK0JBQStCLEVBQUU7O0FBRW5DO0VBQ0Usd0JBQXdCO0VBQ3hCLG9CQUFvQjtFQUNwQiwyQkFBMkIsRUFBRTs7QUFFL0I7Ozs7Ozs7Ozs7Ozs7RUFhRSxVQUFVO0VBQ1YsV0FBVztFQUNYLFVBQVU7RUFDVixjQUFjO0lBQ1oscUJBQXFCLEVBQUU7O0FBRTNCLGlEQUFpRDtBQUNqRDs7RUFFRSxlQUFlLEVBQUU7O0FBRW5CO0VBQ0UsZUFBZSxFQUFFOztBQUVuQjtFQUNFLGlCQUFpQixFQUFFOztBQUVyQjtFQUNFLGFBQWEsRUFBRTs7QUFFakI7O0VBRUUsWUFBWTtFQUNaLGNBQWMsRUFBRTs7QUFFbEI7RUFDRSwwQkFBMEI7RUFDMUIsa0JBQWtCLEVBQUU7O0FBRXRCO0VBQ0UsdUJBQXVCLEVBQUU7O0FBRTNCO0VBQ0UsZUFBZSxFQUFFOztBQUVuQjtFQUNFLDBCQUEwQjtFQUMxQixhQUFhLEVBQUU7O0FBRWpCO0VBQ0UsZUFBZSxFQUFFOztBQUVuQjtFQUNFLDBCQUEwQjtFQUMxQixhQUFhLEVBQUU7O0FBRWpCO0VBQ0UsYUFBYSxFQUFFOztBQUVqQjtFQUNFLHdCQUF3QjtFQUN4QixhQUFhLEVBQUU7O0FBRWpCO0VBQ0UsZUFBZSxFQUFFOztBQUVuQjtFQUNFLDBCQUEwQjtFQUMxQixhQUFhLEVBQUU7O0FBRWpCO0VBQ0UsZUFBZSxFQUFFOztBQUVuQjtFQUNFLDBCQUEwQjtFQUMxQixhQUFhLEVBQUU7O0FBRWpCO0VBQ0UsNkJBQTZCLEVBQUU7O0FBRWpDO0VBQ0Usd0NBQXdDO0VBQ3hDLGFBQWEsRUFBRTs7QUFFakI7RUFDRSxlQUFlLEVBQUU7O0FBRW5CO0VBQ0UsMEJBQTBCO0VBQzFCLGFBQWEsRUFBRTs7QUFFakI7RUFDRSxlQUFlLEVBQUU7O0FBRW5CO0VBQ0UsMEJBQTBCO0VBQzFCLGFBQWEsRUFBRTs7QUFFakI7RUFDRSxlQUFlLEVBQUU7O0FBRW5CO0VBQ0UsMEJBQTBCO0VBQzFCLGFBQWEsRUFBRTs7QUFFakI7RUFDRSxlQUFlLEVBQUU7O0FBRW5CO0VBQ0UsMEJBQTBCO0VBQzFCLGFBQWEsRUFBRTs7QUFFakI7RUFDRSxlQUFlLEVBQUU7O0FBRW5CO0VBQ0UsMEJBQTBCO0VBQzFCLFlBQVksRUFBRTs7QUFFaEI7RUFDRSwrQkFBK0IsRUFBRTs7QUFFbkM7RUFDRSwwQ0FBMEM7RUFDMUMsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsWUFBWSxFQUFFOztBQUVoQjtFQUNFLGFBQWEsRUFBRTs7QUFFakI7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWSxFQUFFOztBQUVoQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsWUFBWSxFQUFFOztBQUVoQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsYUFBYSxFQUFFOztBQUVqQjtFQUNFLGFBQWEsRUFBRTs7QUFFakI7RUFDRSx3QkFBd0I7RUFDeEIsWUFBWSxFQUFFOztBQUVoQjtFQUNFLGVBQWUsRUFBRTs7QUFFbkI7RUFDRSwwQkFBMEI7RUFDMUIsWUFBWSxF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bkMsZUFBZTtJQUNmLDBCQUEwQixFQUFFO0lBQzVCO01BQ0UsZUFBZTtNQUNmLHNCQUFzQixFQUFFOztBQUU5QjtFQUNFLGFBQWE7RUFDYiwwRUFBMEU7RUFDMUUsZ0JBQWdCO0VBQ2hCLDBCQUEwQjtFQUMxQixhQUFhLEVBQUU7RUFDZjtJQUNFLDBCQUEwQixFQUFFO0VBQzlCO0lBQ0UsbUNBQW1DO0lBQ25DLGVBQWU7SUFDZiwwQkFBMEIsRUFBRTtJQUM1QjtNQUNFLGVBQWU7TUFDZixzQkFBc0IsRUFBRTs7QUFFOUI7RUFDRSxhQUFhO0VBQ2IsMEVBQTBFO0VBQzFFLGdCQUFnQjtFQUNoQix3QkFBd0I7RUFDeEIsWUFBWSxFQUFFO0VBQ2Q7SUFDRSwwQkFBMEIsRUFBRTtFQUM5QjtJQUNFLG1DQUFtQztJQUNuQyxhQUFhO0lBQ2Isd0JBQXdCLEVBQUU7SUFDMUI7TUFDRSxlQUFlO01BQ2Ysc0JBQXNCLEVBQUU7O0FBRTlCO0VBQ0UsYUFBYTtFQUNiLDBFQUEwRTtFQUMxRSxnQkFBZ0I7RUFDaEIsMEJBQTBCO0VBQzFCLFlBQVksRUFBRTtFQUNkO0lBQ0UsMEJBQTBCLEVBQUU7RUFDOUI7SUFDRSxtQ0FBbUM7SUFDbkMsZUFBZTtJQUNmLDBCQUEwQixFQUFFO0lBQzVCO01BQ0UsZUFBZTtNQUNmLHNCQUFzQixFQUFFOztBQUU5QjtFQUNFLGFBQWE7RUFDYiwwRUFBMEU7RUFDMUUsZ0JBQWdCO0VBQ2hCLG1DQUFtQztFQUNuQyxlQUFlLEVBQUU7O0FBRW5CO0VBQ0Usa0JBQWtCO0VBQ2xCLG9EQUFvRDtFQUNwRCxpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixrRUFBa0UsRUFBRTs7QUFFdEU7RUFDRSxlQUFlLEVBQUU7RUFDakI7SUFDRSxlQUFlLEVBQUVcIixcImZpbGVcIjpcImRhc2hib2FyZC5zYXNzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0tY29sb3ItcHJpbWFyeTogIzM4M2Y0NztcXG4gIC0tY29sb3ItcHJpbWFyeS1kYXJrOiAjMjIyNjJiO1xcbiAgLS1jb2xvci1wcmltYXJ5LWRhcmtlcjogYmxhY2s7XFxuICAtLWNvbG9yLXByaW1hcnktbGlnaHQ6ICM0ZjU4NjQ7XFxuICAtLWNvbG9yLXByaW1hcnktbGlnaHRlcjogIzcwN2Q4ZjtcXG4gIC0tY29sb3ItcHJpbWFyeS1oYWxmOiByZ2JhKDU2LCA2MywgNzEsIDAuNSk7XFxuICAtLWNvbG9yLXNlY29uZGFyeTogIzJiYjBlZTtcXG4gIC0tY29sb3Itc2Vjb25kYXJ5LWRhcms6ICMxMTk3ZDQ7XFxuICAtLWNvbG9yLXNlY29uZGFyeS1kYXJrZXI6ICMwYjY0OGU7XFxuICAtLWNvbG9yLXNlY29uZGFyeS1saWdodDogIzVhYzJmMjtcXG4gIC0tY29sb3Itc2Vjb25kYXJ5LWxpZ2h0ZXI6ICNhMWRjZjc7XFxuICAtLWNvbG9yLXNlY29uZGFyeS1oYWxmOiByZ2JhKDQzLCAxNzYsIDIzOCwgMC41KTtcXG4gIC0tY29sb3ItYmxhY2s6ICMwZDBkMGQ7XFxuICAtLWNvbG9yLWRhcms6ICM0ZDRkNGQ7XFxuICAtLWNvbG9yLWxpZ2h0OiAjZjJmMmYyO1xcbiAgLS1jb2xvci13aGl0ZTogd2hpdGU7XFxuICAtLWNvbG9yLWluZm86ICMyYmIwZWU7XFxuICAtLWNvbG9yLXN1Y2Nlc3M6ICM1NWMzNTk7XFxuICAtLWNvbG9yLXdhcm5pbmc6ICNmNWI2NTY7XFxuICAtLWNvbG9yLWRhbmdlcjogI2U3M2UzMjtcXG4gIC0tY29sb3ItdGV4dDogIzRkNGQ0ZDtcXG4gIC0tY29sb3ItdGl0bGU6ICMwZDBkMGQ7XFxuICAtLWNvbG9yLXN1YnRpdGxlOiAjNGQ0ZDRkO1xcbiAgLS1jb2xvci1saW5rOiAjMzgzZjQ3O1xcbiAgLS1jb2xvci1saW5rLWhvdmVyZWQ6ICMyMjI2MmI7XFxuICAtLWNvbG9yLWxpbmstdmlzaXRlZDogIzM4M2Y0NztcXG4gIC0tY29sb3ItZm9yZWdyb3VuZDogd2hpdGU7XFxuICAtLWNvbG9yLWJhY2tncm91bmQ6ICNlY2VlZjg7IH1cXG5cXG46cm9vdCB7XFxuICAtLWZvbnQtcHJpbWFyeTogUm9ib3RvLCBIZWx2ZXRpY2EsIGFyaWFsLCBzYW5zLXNlcmlmO1xcbiAgLS1mb250LXRpdGxlOiBSb2JvdG8sIEhlbHZldGljYSwgYXJpYWwsIGN1cnNpdmU7XFxuICAtLWZvbnQtc2VyaWY6IFJvYm90bywgR2FyYW1vbmQsIEdlb3JnaWEsIFRpbWVzIE5ldyBSb21hbiwgc2VyaWY7XFxuICAtLWZvbnQtbW9ub3NwYWNlOiBSb2JvdG8gTW9ubywgbW9ub3NwYWNlO1xcbiAgLS10ZXh0LXNjYWxlLXJhdGlvOiAxLjI7XFxuICAtLXRleHQtc2NhbGUtcmF0aW8tbW9iaWxlOiAxLjI7IH1cXG5cXG46cm9vdCB7XFxuICAtLXRleHQtc2NhbGUtcmF0aW86IDEuMjtcXG4gIC0tc3BhY2luZy11bml0OiAxZW07XFxuICAtLWZpeGVkLXNwYWNpbmctdW5pdDogMXJlbTsgfVxcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCxcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICAgIGZvbnQtZm9udC1zaXplOiAxMDAlOyB9XFxuXFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTsgfVxcblxcbnVsLCBvbCB7XFxuICBsaXN0LXN0eWxlOiBub25lOyB9XFxuXFxuYmxvY2txdW90ZSwgcSB7XFxuICBxdW90ZXM6IG5vbmU7IH1cXG5cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGNvbnRlbnQ6IG5vbmU7IH1cXG5cXG50YWJsZSB7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgYm9yZGVyLXNwYWNpbmc6IDA7IH1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4udGV4dC1wcmltYXJ5IHtcXG4gIGNvbG9yOiAjMzgzZjQ3OyB9XFxuXFxuLmJnLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4M2Y0NztcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXByaW1hcnktZGFyayB7XFxuICBjb2xvcjogIzIyMjYyYjsgfVxcblxcbi5iZy1wcmltYXJ5LWRhcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjYyYjtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXByaW1hcnktZGFya2VyIHtcXG4gIGNvbG9yOiBibGFjazsgfVxcblxcbi5iZy1wcmltYXJ5LWRhcmtlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXByaW1hcnktbGlnaHQge1xcbiAgY29sb3I6ICM0ZjU4NjQ7IH1cXG5cXG4uYmctcHJpbWFyeS1saWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGY1ODY0O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLnRleHQtcHJpbWFyeS1saWdodGVyIHtcXG4gIGNvbG9yOiAjNzA3ZDhmOyB9XFxuXFxuLmJnLXByaW1hcnktbGlnaHRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzA3ZDhmO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLnRleHQtcHJpbWFyeS1oYWxmIHtcXG4gIGNvbG9yOiByZ2JhKDU2LCA2MywgNzEsIDAuNSk7IH1cXG5cXG4uYmctcHJpbWFyeS1oYWxmIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTYsIDYzLCA3MSwgMC41KTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeSB7XFxuICBjb2xvcjogIzJiYjBlZTsgfVxcblxcbi5iZy1zZWNvbmRhcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJiYjBlZTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1kYXJrIHtcXG4gIGNvbG9yOiAjMTE5N2Q0OyB9XFxuXFxuLmJnLXNlY29uZGFyeS1kYXJrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMTk3ZDQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1zZWNvbmRhcnktZGFya2VyIHtcXG4gIGNvbG9yOiAjMGI2NDhlOyB9XFxuXFxuLmJnLXNlY29uZGFyeS1kYXJrZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBiNjQ4ZTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1saWdodCB7XFxuICBjb2xvcjogIzVhYzJmMjsgfVxcblxcbi5iZy1zZWNvbmRhcnktbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVhYzJmMjtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1saWdodGVyIHtcXG4gIGNvbG9yOiAjYTFkY2Y3OyB9XFxuXFxuLmJnLXNlY29uZGFyeS1saWdodGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhMWRjZjc7XFxuICBjb2xvcjogIzIyMjsgfVxcblxcbi50ZXh0LXNlY29uZGFyeS1oYWxmIHtcXG4gIGNvbG9yOiByZ2JhKDQzLCAxNzYsIDIzOCwgMC41KTsgfVxcblxcbi5iZy1zZWNvbmRhcnktaGFsZiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQzLCAxNzYsIDIzOCwgMC41KTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LWJsYWNrIHtcXG4gIGNvbG9yOiAjMGQwZDBkOyB9XFxuXFxuLmJnLWJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDBkMGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1kYXJrIHtcXG4gIGNvbG9yOiAjNGQ0ZDRkOyB9XFxuXFxuLmJnLWRhcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGQ0ZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LWxpZ2h0IHtcXG4gIGNvbG9yOiAjZjJmMmYyOyB9XFxuXFxuLmJnLWxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XFxuICBjb2xvcjogIzIyMjsgfVxcblxcbi50ZXh0LXdoaXRlIHtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi5iZy13aGl0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuXFxuLnRleHQtaW5mbyB7XFxuICBjb2xvcjogIzJiYjBlZTsgfVxcblxcbi5iZy1pbmZvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmIwZWU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1zdWNjZXNzIHtcXG4gIGNvbG9yOiAjNTVjMzU5OyB9XFxuXFxuLmJnLXN1Y2Nlc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzU1YzM1OTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXdhcm5pbmcge1xcbiAgY29sb3I6ICNmNWI2NTY7IH1cXG5cXG4uYmctd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjViNjU2O1xcbiAgY29sb3I6ICMyMjI7IH1cXG5cXG4udGV4dC1kYW5nZXIge1xcbiAgY29sb3I6ICNlNzNlMzI7IH1cXG5cXG4uYmctZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlNzNlMzI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC10ZXh0IHtcXG4gIGNvbG9yOiAjNGQ0ZDRkOyB9XFxuXFxuLmJnLXRleHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGQ0ZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi50ZXh0LXRpdGxlIHtcXG4gIGNvbG9yOiAjMGQwZDBkOyB9XFxuXFxuLmJnLXRpdGxlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwZDBkMGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1zdWJ0aXRsZSB7XFxuICBjb2xvcjogIzRkNGQ0ZDsgfVxcblxcbi5iZy1zdWJ0aXRsZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGQ0ZDRkO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxuLnRleHQtbGluayB7XFxuICBjb2xvcjogIzM4M2Y0NzsgfVxcblxcbi5iZy1saW5rIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1saW5rLWhvdmVyZWQge1xcbiAgY29sb3I6ICMyMjI2MmI7IH1cXG5cXG4uYmctbGluay1ob3ZlcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1saW5rLXZpc2l0ZWQge1xcbiAgY29sb3I6ICMzODNmNDc7IH1cXG5cXG4uYmctbGluay12aXNpdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICBjb2xvcjogd2hpdGU7IH1cXG5cXG4udGV4dC1mb3JlZ3JvdW5kIHtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbi5iZy1mb3JlZ3JvdW5kIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgY29sb3I6ICMyMjI7IH1cXG5cXG4udGV4dC1iYWNrZ3JvdW5kIHtcXG4gIGNvbG9yOiAjZWNlZWY4OyB9XFxuXFxuLmJnLWJhY2tncm91bmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWVmODtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuXFxuLnRleHQtZm9udC1wcmltYXJ5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgSGVsdmV0aWNhLCBhcmlhbCwgc2Fucy1zZXJpZjsgfVxcblxcbi50ZXh0LWZvbnQtdGl0bGUge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBIZWx2ZXRpY2EsIGFyaWFsLCBjdXJzaXZlOyB9XFxuXFxuLnRleHQtZm9udC1zZXJpZiB7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIEdhcmFtb25kLCBHZW9yZ2lhLCBUaW1lcyBOZXcgUm9tYW4sIHNlcmlmOyB9XFxuXFxuLnRleHQtZm9udC1tb25vc3BhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8gTW9ub1xcXCIsIG1vbm9zcGFjZTsgfVxcblxcbi50ZXh0LXhzIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjA1ZW0gLyAoMS4yICogMS4yKSk7IH1cXG5cXG4udGV4dC1zbSB7XFxuICBmb250LXNpemU6IGNhbGMoMS4wNWVtIC8gMS4yKTsgfVxcblxcbi50ZXh0LW1kIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjA1ZW0gKiAxLjIpOyB9XFxuXFxuLnRleHQtbGcge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAqIDEuMiAqIDEuMik7IH1cXG5cXG4udGV4dC14bCB7XFxuICBmb250LXNpemU6IGNhbGMoMS4wNWVtICogMS4yICogMS4yICogMS4yKTsgfVxcblxcbi50ZXh0LXh4bCB7XFxuICBmb250LXNpemU6IGNhbGMoMS4wNWVtICogMS4yICogMS4yICogMS4yICogMS4yKTsgfVxcblxcbi50ZXh0LXh4eGwge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAqIDEuMiAqIDEuMiAqIDEuMiAqIDEuMiAqIDEuMik7IH1cXG5cXG4udGV4dC1jZW50ZXIge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXFxuLnRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4udGV4dC1sZWZ0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7IH1cXG5cXG4uZ3JpZC0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxOyB9XFxuXFxuLnJvdy0xIHtcXG4gIGdyaWQtcm93OiBzcGFuIDE7IH1cXG5cXG4uZ3JpZC0xLTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAxOyB9XFxuXFxuLnJvdy0xLTEge1xcbiAgZ3JpZC1yb3c6IDEgLyAxOyB9XFxuXFxuLmdyaWQtMS0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS0yIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMjsgfVxcblxcbi5yb3ctMS0yIHtcXG4gIGdyaWQtcm93OiAxIC8gMjsgfVxcblxcbi5ncmlkLTEtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtMyB7XFxuICBncmlkLWNvbHVtbjogMSAvIDM7IH1cXG5cXG4ucm93LTEtMyB7XFxuICBncmlkLXJvdzogMSAvIDM7IH1cXG5cXG4uZ3JpZC0xLTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyA0OyB9XFxuXFxuLnJvdy0xLTQge1xcbiAgZ3JpZC1yb3c6IDEgLyA0OyB9XFxuXFxuLmdyaWQtMS01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS01IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gNTsgfVxcblxcbi5yb3ctMS01IHtcXG4gIGdyaWQtcm93OiAxIC8gNTsgfVxcblxcbi5ncmlkLTEtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtNiB7XFxuICBncmlkLWNvbHVtbjogMSAvIDY7IH1cXG5cXG4ucm93LTEtNiB7XFxuICBncmlkLXJvdzogMSAvIDY7IH1cXG5cXG4uZ3JpZC0xLTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyA3OyB9XFxuXFxuLnJvdy0xLTcge1xcbiAgZ3JpZC1yb3c6IDEgLyA3OyB9XFxuXFxuLmdyaWQtMS04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS04IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gODsgfVxcblxcbi5yb3ctMS04IHtcXG4gIGdyaWQtcm93OiAxIC8gODsgfVxcblxcbi5ncmlkLTEtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtOSB7XFxuICBncmlkLWNvbHVtbjogMSAvIDk7IH1cXG5cXG4ucm93LTEtOSB7XFxuICBncmlkLXJvdzogMSAvIDk7IH1cXG5cXG4uZ3JpZC0xLTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAxMDsgfVxcblxcbi5yb3ctMS0xMCB7XFxuICBncmlkLXJvdzogMSAvIDEwOyB9XFxuXFxuLmdyaWQtMS0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMTE7IH1cXG5cXG4ucm93LTEtMTEge1xcbiAgZ3JpZC1yb3c6IDEgLyAxMTsgfVxcblxcbi5ncmlkLTEtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS0xMiB7XFxuICBncmlkLWNvbHVtbjogMSAvIDEyOyB9XFxuXFxuLnJvdy0xLTEyIHtcXG4gIGdyaWQtcm93OiAxIC8gMTI7IH1cXG5cXG4uZ3JpZC0xLTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEgLyAxMzsgfVxcblxcbi5yb3ctMS0xMyB7XFxuICBncmlkLXJvdzogMSAvIDEzOyB9XFxuXFxuLmdyaWQtMS0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxIC8gMTQ7IH1cXG5cXG4ucm93LTEtMTQge1xcbiAgZ3JpZC1yb3c6IDEgLyAxNDsgfVxcblxcbi5ncmlkLTEtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMS0xNSB7XFxuICBncmlkLWNvbHVtbjogMSAvIDE1OyB9XFxuXFxuLnJvdy0xLTE1IHtcXG4gIGdyaWQtcm93OiAxIC8gMTU7IH1cXG5cXG4uZ3JpZC0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMiB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAyOyB9XFxuXFxuLnJvdy0yIHtcXG4gIGdyaWQtcm93OiBzcGFuIDI7IH1cXG5cXG4uZ3JpZC0yLTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTEge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAxOyB9XFxuXFxuLnJvdy0yLTEge1xcbiAgZ3JpZC1yb3c6IDIgLyAxOyB9XFxuXFxuLmdyaWQtMi0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi0yIHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMjsgfVxcblxcbi5yb3ctMi0yIHtcXG4gIGdyaWQtcm93OiAyIC8gMjsgfVxcblxcbi5ncmlkLTItMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItMyB7XFxuICBncmlkLWNvbHVtbjogMiAvIDM7IH1cXG5cXG4ucm93LTItMyB7XFxuICBncmlkLXJvdzogMiAvIDM7IH1cXG5cXG4uZ3JpZC0yLTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTQge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyA0OyB9XFxuXFxuLnJvdy0yLTQge1xcbiAgZ3JpZC1yb3c6IDIgLyA0OyB9XFxuXFxuLmdyaWQtMi01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi01IHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gNTsgfVxcblxcbi5yb3ctMi01IHtcXG4gIGdyaWQtcm93OiAyIC8gNTsgfVxcblxcbi5ncmlkLTItNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItNiB7XFxuICBncmlkLWNvbHVtbjogMiAvIDY7IH1cXG5cXG4ucm93LTItNiB7XFxuICBncmlkLXJvdzogMiAvIDY7IH1cXG5cXG4uZ3JpZC0yLTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTcge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyA3OyB9XFxuXFxuLnJvdy0yLTcge1xcbiAgZ3JpZC1yb3c6IDIgLyA3OyB9XFxuXFxuLmdyaWQtMi04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi04IHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gODsgfVxcblxcbi5yb3ctMi04IHtcXG4gIGdyaWQtcm93OiAyIC8gODsgfVxcblxcbi5ncmlkLTItOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTItOSB7XFxuICBncmlkLWNvbHVtbjogMiAvIDk7IH1cXG5cXG4ucm93LTItOSB7XFxuICBncmlkLXJvdzogMiAvIDk7IH1cXG5cXG4uZ3JpZC0yLTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItMTAge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAxMDsgfVxcblxcbi5yb3ctMi0xMCB7XFxuICBncmlkLXJvdzogMiAvIDEwOyB9XFxuXFxuLmdyaWQtMi0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTExIHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMTE7IH1cXG5cXG4ucm93LTItMTEge1xcbiAgZ3JpZC1yb3c6IDIgLyAxMTsgfVxcblxcbi5ncmlkLTItMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi0xMiB7XFxuICBncmlkLWNvbHVtbjogMiAvIDEyOyB9XFxuXFxuLnJvdy0yLTEyIHtcXG4gIGdyaWQtcm93OiAyIC8gMTI7IH1cXG5cXG4uZ3JpZC0yLTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTItMTMge1xcbiAgZ3JpZC1jb2x1bW46IDIgLyAxMzsgfVxcblxcbi5yb3ctMi0xMyB7XFxuICBncmlkLXJvdzogMiAvIDEzOyB9XFxuXFxuLmdyaWQtMi0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0yLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAyIC8gMTQ7IH1cXG5cXG4ucm93LTItMTQge1xcbiAgZ3JpZC1yb3c6IDIgLyAxNDsgfVxcblxcbi5ncmlkLTItMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMi0xNSB7XFxuICBncmlkLWNvbHVtbjogMiAvIDE1OyB9XFxuXFxuLnJvdy0yLTE1IHtcXG4gIGdyaWQtcm93OiAyIC8gMTU7IH1cXG5cXG4uZ3JpZC0zIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMyB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAzOyB9XFxuXFxuLnJvdy0zIHtcXG4gIGdyaWQtcm93OiBzcGFuIDM7IH1cXG5cXG4uZ3JpZC0zLTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTEge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyAxOyB9XFxuXFxuLnJvdy0zLTEge1xcbiAgZ3JpZC1yb3c6IDMgLyAxOyB9XFxuXFxuLmdyaWQtMy0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy0yIHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gMjsgfVxcblxcbi5yb3ctMy0yIHtcXG4gIGdyaWQtcm93OiAzIC8gMjsgfVxcblxcbi5ncmlkLTMtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtMyB7XFxuICBncmlkLWNvbHVtbjogMyAvIDM7IH1cXG5cXG4ucm93LTMtMyB7XFxuICBncmlkLXJvdzogMyAvIDM7IH1cXG5cXG4uZ3JpZC0zLTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTQge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyA0OyB9XFxuXFxuLnJvdy0zLTQge1xcbiAgZ3JpZC1yb3c6IDMgLyA0OyB9XFxuXFxuLmdyaWQtMy01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy01IHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gNTsgfVxcblxcbi5yb3ctMy01IHtcXG4gIGdyaWQtcm93OiAzIC8gNTsgfVxcblxcbi5ncmlkLTMtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtNiB7XFxuICBncmlkLWNvbHVtbjogMyAvIDY7IH1cXG5cXG4ucm93LTMtNiB7XFxuICBncmlkLXJvdzogMyAvIDY7IH1cXG5cXG4uZ3JpZC0zLTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTcge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyA3OyB9XFxuXFxuLnJvdy0zLTcge1xcbiAgZ3JpZC1yb3c6IDMgLyA3OyB9XFxuXFxuLmdyaWQtMy04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy04IHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gODsgfVxcblxcbi5yb3ctMy04IHtcXG4gIGdyaWQtcm93OiAzIC8gODsgfVxcblxcbi5ncmlkLTMtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtOSB7XFxuICBncmlkLWNvbHVtbjogMyAvIDk7IH1cXG5cXG4ucm93LTMtOSB7XFxuICBncmlkLXJvdzogMyAvIDk7IH1cXG5cXG4uZ3JpZC0zLTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyAxMDsgfVxcblxcbi5yb3ctMy0xMCB7XFxuICBncmlkLXJvdzogMyAvIDEwOyB9XFxuXFxuLmdyaWQtMy0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTExIHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gMTE7IH1cXG5cXG4ucm93LTMtMTEge1xcbiAgZ3JpZC1yb3c6IDMgLyAxMTsgfVxcblxcbi5ncmlkLTMtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy0xMiB7XFxuICBncmlkLWNvbHVtbjogMyAvIDEyOyB9XFxuXFxuLnJvdy0zLTEyIHtcXG4gIGdyaWQtcm93OiAzIC8gMTI7IH1cXG5cXG4uZ3JpZC0zLTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTMtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDMgLyAxMzsgfVxcblxcbi5yb3ctMy0xMyB7XFxuICBncmlkLXJvdzogMyAvIDEzOyB9XFxuXFxuLmdyaWQtMy0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0zLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAzIC8gMTQ7IH1cXG5cXG4ucm93LTMtMTQge1xcbiAgZ3JpZC1yb3c6IDMgLyAxNDsgfVxcblxcbi5ncmlkLTMtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMy0xNSB7XFxuICBncmlkLWNvbHVtbjogMyAvIDE1OyB9XFxuXFxuLnJvdy0zLTE1IHtcXG4gIGdyaWQtcm93OiAzIC8gMTU7IH1cXG5cXG4uZ3JpZC00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA0OyB9XFxuXFxuLnJvdy00IHtcXG4gIGdyaWQtcm93OiBzcGFuIDQ7IH1cXG5cXG4uZ3JpZC00LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTEge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyAxOyB9XFxuXFxuLnJvdy00LTEge1xcbiAgZ3JpZC1yb3c6IDQgLyAxOyB9XFxuXFxuLmdyaWQtNC0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC0yIHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gMjsgfVxcblxcbi5yb3ctNC0yIHtcXG4gIGdyaWQtcm93OiA0IC8gMjsgfVxcblxcbi5ncmlkLTQtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtMyB7XFxuICBncmlkLWNvbHVtbjogNCAvIDM7IH1cXG5cXG4ucm93LTQtMyB7XFxuICBncmlkLXJvdzogNCAvIDM7IH1cXG5cXG4uZ3JpZC00LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTQge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA0OyB9XFxuXFxuLnJvdy00LTQge1xcbiAgZ3JpZC1yb3c6IDQgLyA0OyB9XFxuXFxuLmdyaWQtNC01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC01IHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gNTsgfVxcblxcbi5yb3ctNC01IHtcXG4gIGdyaWQtcm93OiA0IC8gNTsgfVxcblxcbi5ncmlkLTQtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtNiB7XFxuICBncmlkLWNvbHVtbjogNCAvIDY7IH1cXG5cXG4ucm93LTQtNiB7XFxuICBncmlkLXJvdzogNCAvIDY7IH1cXG5cXG4uZ3JpZC00LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTcge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyA3OyB9XFxuXFxuLnJvdy00LTcge1xcbiAgZ3JpZC1yb3c6IDQgLyA3OyB9XFxuXFxuLmdyaWQtNC04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC04IHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gODsgfVxcblxcbi5yb3ctNC04IHtcXG4gIGdyaWQtcm93OiA0IC8gODsgfVxcblxcbi5ncmlkLTQtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtOSB7XFxuICBncmlkLWNvbHVtbjogNCAvIDk7IH1cXG5cXG4ucm93LTQtOSB7XFxuICBncmlkLXJvdzogNCAvIDk7IH1cXG5cXG4uZ3JpZC00LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyAxMDsgfVxcblxcbi5yb3ctNC0xMCB7XFxuICBncmlkLXJvdzogNCAvIDEwOyB9XFxuXFxuLmdyaWQtNC0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTExIHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gMTE7IH1cXG5cXG4ucm93LTQtMTEge1xcbiAgZ3JpZC1yb3c6IDQgLyAxMTsgfVxcblxcbi5ncmlkLTQtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC0xMiB7XFxuICBncmlkLWNvbHVtbjogNCAvIDEyOyB9XFxuXFxuLnJvdy00LTEyIHtcXG4gIGdyaWQtcm93OiA0IC8gMTI7IH1cXG5cXG4uZ3JpZC00LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTQtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDQgLyAxMzsgfVxcblxcbi5yb3ctNC0xMyB7XFxuICBncmlkLXJvdzogNCAvIDEzOyB9XFxuXFxuLmdyaWQtNC0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi00LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA0IC8gMTQ7IH1cXG5cXG4ucm93LTQtMTQge1xcbiAgZ3JpZC1yb3c6IDQgLyAxNDsgfVxcblxcbi5ncmlkLTQtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNC0xNSB7XFxuICBncmlkLWNvbHVtbjogNCAvIDE1OyB9XFxuXFxuLnJvdy00LTE1IHtcXG4gIGdyaWQtcm93OiA0IC8gMTU7IH1cXG5cXG4uZ3JpZC01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA1OyB9XFxuXFxuLnJvdy01IHtcXG4gIGdyaWQtcm93OiBzcGFuIDU7IH1cXG5cXG4uZ3JpZC01LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTEge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyAxOyB9XFxuXFxuLnJvdy01LTEge1xcbiAgZ3JpZC1yb3c6IDUgLyAxOyB9XFxuXFxuLmdyaWQtNS0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS0yIHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gMjsgfVxcblxcbi5yb3ctNS0yIHtcXG4gIGdyaWQtcm93OiA1IC8gMjsgfVxcblxcbi5ncmlkLTUtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtMyB7XFxuICBncmlkLWNvbHVtbjogNSAvIDM7IH1cXG5cXG4ucm93LTUtMyB7XFxuICBncmlkLXJvdzogNSAvIDM7IH1cXG5cXG4uZ3JpZC01LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTQge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyA0OyB9XFxuXFxuLnJvdy01LTQge1xcbiAgZ3JpZC1yb3c6IDUgLyA0OyB9XFxuXFxuLmdyaWQtNS01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS01IHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gNTsgfVxcblxcbi5yb3ctNS01IHtcXG4gIGdyaWQtcm93OiA1IC8gNTsgfVxcblxcbi5ncmlkLTUtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtNiB7XFxuICBncmlkLWNvbHVtbjogNSAvIDY7IH1cXG5cXG4ucm93LTUtNiB7XFxuICBncmlkLXJvdzogNSAvIDY7IH1cXG5cXG4uZ3JpZC01LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTcge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyA3OyB9XFxuXFxuLnJvdy01LTcge1xcbiAgZ3JpZC1yb3c6IDUgLyA3OyB9XFxuXFxuLmdyaWQtNS04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS04IHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gODsgfVxcblxcbi5yb3ctNS04IHtcXG4gIGdyaWQtcm93OiA1IC8gODsgfVxcblxcbi5ncmlkLTUtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtOSB7XFxuICBncmlkLWNvbHVtbjogNSAvIDk7IH1cXG5cXG4ucm93LTUtOSB7XFxuICBncmlkLXJvdzogNSAvIDk7IH1cXG5cXG4uZ3JpZC01LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyAxMDsgfVxcblxcbi5yb3ctNS0xMCB7XFxuICBncmlkLXJvdzogNSAvIDEwOyB9XFxuXFxuLmdyaWQtNS0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTExIHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gMTE7IH1cXG5cXG4ucm93LTUtMTEge1xcbiAgZ3JpZC1yb3c6IDUgLyAxMTsgfVxcblxcbi5ncmlkLTUtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS0xMiB7XFxuICBncmlkLWNvbHVtbjogNSAvIDEyOyB9XFxuXFxuLnJvdy01LTEyIHtcXG4gIGdyaWQtcm93OiA1IC8gMTI7IH1cXG5cXG4uZ3JpZC01LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTUtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDUgLyAxMzsgfVxcblxcbi5yb3ctNS0xMyB7XFxuICBncmlkLXJvdzogNSAvIDEzOyB9XFxuXFxuLmdyaWQtNS0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi01LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA1IC8gMTQ7IH1cXG5cXG4ucm93LTUtMTQge1xcbiAgZ3JpZC1yb3c6IDUgLyAxNDsgfVxcblxcbi5ncmlkLTUtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNS0xNSB7XFxuICBncmlkLWNvbHVtbjogNSAvIDE1OyB9XFxuXFxuLnJvdy01LTE1IHtcXG4gIGdyaWQtcm93OiA1IC8gMTU7IH1cXG5cXG4uZ3JpZC02IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNiB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA2OyB9XFxuXFxuLnJvdy02IHtcXG4gIGdyaWQtcm93OiBzcGFuIDY7IH1cXG5cXG4uZ3JpZC02LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTEge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyAxOyB9XFxuXFxuLnJvdy02LTEge1xcbiAgZ3JpZC1yb3c6IDYgLyAxOyB9XFxuXFxuLmdyaWQtNi0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi0yIHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gMjsgfVxcblxcbi5yb3ctNi0yIHtcXG4gIGdyaWQtcm93OiA2IC8gMjsgfVxcblxcbi5ncmlkLTYtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtMyB7XFxuICBncmlkLWNvbHVtbjogNiAvIDM7IH1cXG5cXG4ucm93LTYtMyB7XFxuICBncmlkLXJvdzogNiAvIDM7IH1cXG5cXG4uZ3JpZC02LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTQge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyA0OyB9XFxuXFxuLnJvdy02LTQge1xcbiAgZ3JpZC1yb3c6IDYgLyA0OyB9XFxuXFxuLmdyaWQtNi01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi01IHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gNTsgfVxcblxcbi5yb3ctNi01IHtcXG4gIGdyaWQtcm93OiA2IC8gNTsgfVxcblxcbi5ncmlkLTYtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtNiB7XFxuICBncmlkLWNvbHVtbjogNiAvIDY7IH1cXG5cXG4ucm93LTYtNiB7XFxuICBncmlkLXJvdzogNiAvIDY7IH1cXG5cXG4uZ3JpZC02LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTcge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyA3OyB9XFxuXFxuLnJvdy02LTcge1xcbiAgZ3JpZC1yb3c6IDYgLyA3OyB9XFxuXFxuLmdyaWQtNi04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi04IHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gODsgfVxcblxcbi5yb3ctNi04IHtcXG4gIGdyaWQtcm93OiA2IC8gODsgfVxcblxcbi5ncmlkLTYtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtOSB7XFxuICBncmlkLWNvbHVtbjogNiAvIDk7IH1cXG5cXG4ucm93LTYtOSB7XFxuICBncmlkLXJvdzogNiAvIDk7IH1cXG5cXG4uZ3JpZC02LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyAxMDsgfVxcblxcbi5yb3ctNi0xMCB7XFxuICBncmlkLXJvdzogNiAvIDEwOyB9XFxuXFxuLmdyaWQtNi0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTExIHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gMTE7IH1cXG5cXG4ucm93LTYtMTEge1xcbiAgZ3JpZC1yb3c6IDYgLyAxMTsgfVxcblxcbi5ncmlkLTYtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi0xMiB7XFxuICBncmlkLWNvbHVtbjogNiAvIDEyOyB9XFxuXFxuLnJvdy02LTEyIHtcXG4gIGdyaWQtcm93OiA2IC8gMTI7IH1cXG5cXG4uZ3JpZC02LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTYtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDYgLyAxMzsgfVxcblxcbi5yb3ctNi0xMyB7XFxuICBncmlkLXJvdzogNiAvIDEzOyB9XFxuXFxuLmdyaWQtNi0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi02LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA2IC8gMTQ7IH1cXG5cXG4ucm93LTYtMTQge1xcbiAgZ3JpZC1yb3c6IDYgLyAxNDsgfVxcblxcbi5ncmlkLTYtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNi0xNSB7XFxuICBncmlkLWNvbHVtbjogNiAvIDE1OyB9XFxuXFxuLnJvdy02LTE1IHtcXG4gIGdyaWQtcm93OiA2IC8gMTU7IH1cXG5cXG4uZ3JpZC03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNyB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA3OyB9XFxuXFxuLnJvdy03IHtcXG4gIGdyaWQtcm93OiBzcGFuIDc7IH1cXG5cXG4uZ3JpZC03LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTEge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyAxOyB9XFxuXFxuLnJvdy03LTEge1xcbiAgZ3JpZC1yb3c6IDcgLyAxOyB9XFxuXFxuLmdyaWQtNy0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy0yIHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gMjsgfVxcblxcbi5yb3ctNy0yIHtcXG4gIGdyaWQtcm93OiA3IC8gMjsgfVxcblxcbi5ncmlkLTctMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctMyB7XFxuICBncmlkLWNvbHVtbjogNyAvIDM7IH1cXG5cXG4ucm93LTctMyB7XFxuICBncmlkLXJvdzogNyAvIDM7IH1cXG5cXG4uZ3JpZC03LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTQge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyA0OyB9XFxuXFxuLnJvdy03LTQge1xcbiAgZ3JpZC1yb3c6IDcgLyA0OyB9XFxuXFxuLmdyaWQtNy01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy01IHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gNTsgfVxcblxcbi5yb3ctNy01IHtcXG4gIGdyaWQtcm93OiA3IC8gNTsgfVxcblxcbi5ncmlkLTctNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctNiB7XFxuICBncmlkLWNvbHVtbjogNyAvIDY7IH1cXG5cXG4ucm93LTctNiB7XFxuICBncmlkLXJvdzogNyAvIDY7IH1cXG5cXG4uZ3JpZC03LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTcge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyA3OyB9XFxuXFxuLnJvdy03LTcge1xcbiAgZ3JpZC1yb3c6IDcgLyA3OyB9XFxuXFxuLmdyaWQtNy04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy04IHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gODsgfVxcblxcbi5yb3ctNy04IHtcXG4gIGdyaWQtcm93OiA3IC8gODsgfVxcblxcbi5ncmlkLTctOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTctOSB7XFxuICBncmlkLWNvbHVtbjogNyAvIDk7IH1cXG5cXG4ucm93LTctOSB7XFxuICBncmlkLXJvdzogNyAvIDk7IH1cXG5cXG4uZ3JpZC03LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctMTAge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyAxMDsgfVxcblxcbi5yb3ctNy0xMCB7XFxuICBncmlkLXJvdzogNyAvIDEwOyB9XFxuXFxuLmdyaWQtNy0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTExIHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gMTE7IH1cXG5cXG4ucm93LTctMTEge1xcbiAgZ3JpZC1yb3c6IDcgLyAxMTsgfVxcblxcbi5ncmlkLTctMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy0xMiB7XFxuICBncmlkLWNvbHVtbjogNyAvIDEyOyB9XFxuXFxuLnJvdy03LTEyIHtcXG4gIGdyaWQtcm93OiA3IC8gMTI7IH1cXG5cXG4uZ3JpZC03LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg3LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTctMTMge1xcbiAgZ3JpZC1jb2x1bW46IDcgLyAxMzsgfVxcblxcbi5yb3ctNy0xMyB7XFxuICBncmlkLXJvdzogNyAvIDEzOyB9XFxuXFxuLmdyaWQtNy0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi03LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA3IC8gMTQ7IH1cXG5cXG4ucm93LTctMTQge1xcbiAgZ3JpZC1yb3c6IDcgLyAxNDsgfVxcblxcbi5ncmlkLTctMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tNy0xNSB7XFxuICBncmlkLWNvbHVtbjogNyAvIDE1OyB9XFxuXFxuLnJvdy03LTE1IHtcXG4gIGdyaWQtcm93OiA3IC8gMTU7IH1cXG5cXG4uZ3JpZC04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA4OyB9XFxuXFxuLnJvdy04IHtcXG4gIGdyaWQtcm93OiBzcGFuIDg7IH1cXG5cXG4uZ3JpZC04LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTEge1xcbiAgZ3JpZC1jb2x1bW46IDggLyAxOyB9XFxuXFxuLnJvdy04LTEge1xcbiAgZ3JpZC1yb3c6IDggLyAxOyB9XFxuXFxuLmdyaWQtOC0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC0yIHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gMjsgfVxcblxcbi5yb3ctOC0yIHtcXG4gIGdyaWQtcm93OiA4IC8gMjsgfVxcblxcbi5ncmlkLTgtMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtMyB7XFxuICBncmlkLWNvbHVtbjogOCAvIDM7IH1cXG5cXG4ucm93LTgtMyB7XFxuICBncmlkLXJvdzogOCAvIDM7IH1cXG5cXG4uZ3JpZC04LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTQge1xcbiAgZ3JpZC1jb2x1bW46IDggLyA0OyB9XFxuXFxuLnJvdy04LTQge1xcbiAgZ3JpZC1yb3c6IDggLyA0OyB9XFxuXFxuLmdyaWQtOC01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC01IHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gNTsgfVxcblxcbi5yb3ctOC01IHtcXG4gIGdyaWQtcm93OiA4IC8gNTsgfVxcblxcbi5ncmlkLTgtNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtNiB7XFxuICBncmlkLWNvbHVtbjogOCAvIDY7IH1cXG5cXG4ucm93LTgtNiB7XFxuICBncmlkLXJvdzogOCAvIDY7IH1cXG5cXG4uZ3JpZC04LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTcge1xcbiAgZ3JpZC1jb2x1bW46IDggLyA3OyB9XFxuXFxuLnJvdy04LTcge1xcbiAgZ3JpZC1yb3c6IDggLyA3OyB9XFxuXFxuLmdyaWQtOC04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC04IHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gODsgfVxcblxcbi5yb3ctOC04IHtcXG4gIGdyaWQtcm93OiA4IC8gODsgfVxcblxcbi5ncmlkLTgtOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtOSB7XFxuICBncmlkLWNvbHVtbjogOCAvIDk7IH1cXG5cXG4ucm93LTgtOSB7XFxuICBncmlkLXJvdzogOCAvIDk7IH1cXG5cXG4uZ3JpZC04LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDggLyAxMDsgfVxcblxcbi5yb3ctOC0xMCB7XFxuICBncmlkLXJvdzogOCAvIDEwOyB9XFxuXFxuLmdyaWQtOC0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTExIHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gMTE7IH1cXG5cXG4ucm93LTgtMTEge1xcbiAgZ3JpZC1yb3c6IDggLyAxMTsgfVxcblxcbi5ncmlkLTgtMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC0xMiB7XFxuICBncmlkLWNvbHVtbjogOCAvIDEyOyB9XFxuXFxuLnJvdy04LTEyIHtcXG4gIGdyaWQtcm93OiA4IC8gMTI7IH1cXG5cXG4uZ3JpZC04LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTgtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDggLyAxMzsgfVxcblxcbi5yb3ctOC0xMyB7XFxuICBncmlkLXJvdzogOCAvIDEzOyB9XFxuXFxuLmdyaWQtOC0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi04LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA4IC8gMTQ7IH1cXG5cXG4ucm93LTgtMTQge1xcbiAgZ3JpZC1yb3c6IDggLyAxNDsgfVxcblxcbi5ncmlkLTgtMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOC0xNSB7XFxuICBncmlkLWNvbHVtbjogOCAvIDE1OyB9XFxuXFxuLnJvdy04LTE1IHtcXG4gIGdyaWQtcm93OiA4IC8gMTU7IH1cXG5cXG4uZ3JpZC05IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiA5OyB9XFxuXFxuLnJvdy05IHtcXG4gIGdyaWQtcm93OiBzcGFuIDk7IH1cXG5cXG4uZ3JpZC05LTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTEge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyAxOyB9XFxuXFxuLnJvdy05LTEge1xcbiAgZ3JpZC1yb3c6IDkgLyAxOyB9XFxuXFxuLmdyaWQtOS0yIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS0yIHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gMjsgfVxcblxcbi5yb3ctOS0yIHtcXG4gIGdyaWQtcm93OiA5IC8gMjsgfVxcblxcbi5ncmlkLTktMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktMyB7XFxuICBncmlkLWNvbHVtbjogOSAvIDM7IH1cXG5cXG4ucm93LTktMyB7XFxuICBncmlkLXJvdzogOSAvIDM7IH1cXG5cXG4uZ3JpZC05LTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTQge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyA0OyB9XFxuXFxuLnJvdy05LTQge1xcbiAgZ3JpZC1yb3c6IDkgLyA0OyB9XFxuXFxuLmdyaWQtOS01IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS01IHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gNTsgfVxcblxcbi5yb3ctOS01IHtcXG4gIGdyaWQtcm93OiA5IC8gNTsgfVxcblxcbi5ncmlkLTktNiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktNiB7XFxuICBncmlkLWNvbHVtbjogOSAvIDY7IH1cXG5cXG4ucm93LTktNiB7XFxuICBncmlkLXJvdzogOSAvIDY7IH1cXG5cXG4uZ3JpZC05LTcge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg3LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTcge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyA3OyB9XFxuXFxuLnJvdy05LTcge1xcbiAgZ3JpZC1yb3c6IDkgLyA3OyB9XFxuXFxuLmdyaWQtOS04IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS04IHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gODsgfVxcblxcbi5yb3ctOS04IHtcXG4gIGdyaWQtcm93OiA5IC8gODsgfVxcblxcbi5ncmlkLTktOSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDksIDFmcik7IH1cXG5cXG4uY29sdW1uLTktOSB7XFxuICBncmlkLWNvbHVtbjogOSAvIDk7IH1cXG5cXG4ucm93LTktOSB7XFxuICBncmlkLXJvdzogOSAvIDk7IH1cXG5cXG4uZ3JpZC05LTEwIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktMTAge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyAxMDsgfVxcblxcbi5yb3ctOS0xMCB7XFxuICBncmlkLXJvdzogOSAvIDEwOyB9XFxuXFxuLmdyaWQtOS0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDExLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTExIHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gMTE7IH1cXG5cXG4ucm93LTktMTEge1xcbiAgZ3JpZC1yb3c6IDkgLyAxMTsgfVxcblxcbi5ncmlkLTktMTIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS0xMiB7XFxuICBncmlkLWNvbHVtbjogOSAvIDEyOyB9XFxuXFxuLnJvdy05LTEyIHtcXG4gIGdyaWQtcm93OiA5IC8gMTI7IH1cXG5cXG4uZ3JpZC05LTEzIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg5LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTMsIDFmcik7IH1cXG5cXG4uY29sdW1uLTktMTMge1xcbiAgZ3JpZC1jb2x1bW46IDkgLyAxMzsgfVxcblxcbi5yb3ctOS0xMyB7XFxuICBncmlkLXJvdzogOSAvIDEzOyB9XFxuXFxuLmdyaWQtOS0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE0LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi05LTE0IHtcXG4gIGdyaWQtY29sdW1uOiA5IC8gMTQ7IH1cXG5cXG4ucm93LTktMTQge1xcbiAgZ3JpZC1yb3c6IDkgLyAxNDsgfVxcblxcbi5ncmlkLTktMTUge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDksIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxNSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tOS0xNSB7XFxuICBncmlkLWNvbHVtbjogOSAvIDE1OyB9XFxuXFxuLnJvdy05LTE1IHtcXG4gIGdyaWQtcm93OiA5IC8gMTU7IH1cXG5cXG4uZ3JpZC0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMDsgfVxcblxcbi5yb3ctMTAge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTA7IH1cXG5cXG4uZ3JpZC0xMC0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gMTsgfVxcblxcbi5yb3ctMTAtMSB7XFxuICBncmlkLXJvdzogMTAgLyAxOyB9XFxuXFxuLmdyaWQtMTAtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDI7IH1cXG5cXG4ucm93LTEwLTIge1xcbiAgZ3JpZC1yb3c6IDEwIC8gMjsgfVxcblxcbi5ncmlkLTEwLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtMyB7XFxuICBncmlkLWNvbHVtbjogMTAgLyAzOyB9XFxuXFxuLnJvdy0xMC0zIHtcXG4gIGdyaWQtcm93OiAxMCAvIDM7IH1cXG5cXG4uZ3JpZC0xMC00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gNDsgfVxcblxcbi5yb3ctMTAtNCB7XFxuICBncmlkLXJvdzogMTAgLyA0OyB9XFxuXFxuLmdyaWQtMTAtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC01IHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDU7IH1cXG5cXG4ucm93LTEwLTUge1xcbiAgZ3JpZC1yb3c6IDEwIC8gNTsgfVxcblxcbi5ncmlkLTEwLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtNiB7XFxuICBncmlkLWNvbHVtbjogMTAgLyA2OyB9XFxuXFxuLnJvdy0xMC02IHtcXG4gIGdyaWQtcm93OiAxMCAvIDY7IH1cXG5cXG4uZ3JpZC0xMC03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gNzsgfVxcblxcbi5yb3ctMTAtNyB7XFxuICBncmlkLXJvdzogMTAgLyA3OyB9XFxuXFxuLmdyaWQtMTAtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC04IHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDg7IH1cXG5cXG4ucm93LTEwLTgge1xcbiAgZ3JpZC1yb3c6IDEwIC8gODsgfVxcblxcbi5ncmlkLTEwLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtOSB7XFxuICBncmlkLWNvbHVtbjogMTAgLyA5OyB9XFxuXFxuLnJvdy0xMC05IHtcXG4gIGdyaWQtcm93OiAxMCAvIDk7IH1cXG5cXG4uZ3JpZC0xMC0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gMTA7IH1cXG5cXG4ucm93LTEwLTEwIHtcXG4gIGdyaWQtcm93OiAxMCAvIDEwOyB9XFxuXFxuLmdyaWQtMTAtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDExOyB9XFxuXFxuLnJvdy0xMC0xMSB7XFxuICBncmlkLXJvdzogMTAgLyAxMTsgfVxcblxcbi5ncmlkLTEwLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC0xMiB7XFxuICBncmlkLWNvbHVtbjogMTAgLyAxMjsgfVxcblxcbi5yb3ctMTAtMTIge1xcbiAgZ3JpZC1yb3c6IDEwIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMC0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTAtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEwIC8gMTM7IH1cXG5cXG4ucm93LTEwLTEzIHtcXG4gIGdyaWQtcm93OiAxMCAvIDEzOyB9XFxuXFxuLmdyaWQtMTAtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEwLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMCAvIDE0OyB9XFxuXFxuLnJvdy0xMC0xNCB7XFxuICBncmlkLXJvdzogMTAgLyAxNDsgfVxcblxcbi5ncmlkLTEwLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMC0xNSB7XFxuICBncmlkLWNvbHVtbjogMTAgLyAxNTsgfVxcblxcbi5yb3ctMTAtMTUge1xcbiAgZ3JpZC1yb3c6IDEwIC8gMTU7IH1cXG5cXG4uZ3JpZC0xMSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMTsgfVxcblxcbi5yb3ctMTEge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTE7IH1cXG5cXG4uZ3JpZC0xMS0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTEge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gMTsgfVxcblxcbi5yb3ctMTEtMSB7XFxuICBncmlkLXJvdzogMTEgLyAxOyB9XFxuXFxuLmdyaWQtMTEtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDI7IH1cXG5cXG4ucm93LTExLTIge1xcbiAgZ3JpZC1yb3c6IDExIC8gMjsgfVxcblxcbi5ncmlkLTExLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtMyB7XFxuICBncmlkLWNvbHVtbjogMTEgLyAzOyB9XFxuXFxuLnJvdy0xMS0zIHtcXG4gIGdyaWQtcm93OiAxMSAvIDM7IH1cXG5cXG4uZ3JpZC0xMS00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTQge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gNDsgfVxcblxcbi5yb3ctMTEtNCB7XFxuICBncmlkLXJvdzogMTEgLyA0OyB9XFxuXFxuLmdyaWQtMTEtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS01IHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDU7IH1cXG5cXG4ucm93LTExLTUge1xcbiAgZ3JpZC1yb3c6IDExIC8gNTsgfVxcblxcbi5ncmlkLTExLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtNiB7XFxuICBncmlkLWNvbHVtbjogMTEgLyA2OyB9XFxuXFxuLnJvdy0xMS02IHtcXG4gIGdyaWQtcm93OiAxMSAvIDY7IH1cXG5cXG4uZ3JpZC0xMS03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTcge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gNzsgfVxcblxcbi5yb3ctMTEtNyB7XFxuICBncmlkLXJvdzogMTEgLyA3OyB9XFxuXFxuLmdyaWQtMTEtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS04IHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDg7IH1cXG5cXG4ucm93LTExLTgge1xcbiAgZ3JpZC1yb3c6IDExIC8gODsgfVxcblxcbi5ncmlkLTExLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtOSB7XFxuICBncmlkLWNvbHVtbjogMTEgLyA5OyB9XFxuXFxuLnJvdy0xMS05IHtcXG4gIGdyaWQtcm93OiAxMSAvIDk7IH1cXG5cXG4uZ3JpZC0xMS0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gMTA7IH1cXG5cXG4ucm93LTExLTEwIHtcXG4gIGdyaWQtcm93OiAxMSAvIDEwOyB9XFxuXFxuLmdyaWQtMTEtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDExOyB9XFxuXFxuLnJvdy0xMS0xMSB7XFxuICBncmlkLXJvdzogMTEgLyAxMTsgfVxcblxcbi5ncmlkLTExLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS0xMiB7XFxuICBncmlkLWNvbHVtbjogMTEgLyAxMjsgfVxcblxcbi5yb3ctMTEtMTIge1xcbiAgZ3JpZC1yb3c6IDExIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMS0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTEsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTEtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDExIC8gMTM7IH1cXG5cXG4ucm93LTExLTEzIHtcXG4gIGdyaWQtcm93OiAxMSAvIDEzOyB9XFxuXFxuLmdyaWQtMTEtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDExLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTExLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMSAvIDE0OyB9XFxuXFxuLnJvdy0xMS0xNCB7XFxuICBncmlkLXJvdzogMTEgLyAxNDsgfVxcblxcbi5ncmlkLTExLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMS0xNSB7XFxuICBncmlkLWNvbHVtbjogMTEgLyAxNTsgfVxcblxcbi5yb3ctMTEtMTUge1xcbiAgZ3JpZC1yb3c6IDExIC8gMTU7IH1cXG5cXG4uZ3JpZC0xMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMiB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMjsgfVxcblxcbi5yb3ctMTIge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTI7IH1cXG5cXG4uZ3JpZC0xMi0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gMTsgfVxcblxcbi5yb3ctMTItMSB7XFxuICBncmlkLXJvdzogMTIgLyAxOyB9XFxuXFxuLmdyaWQtMTItMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDI7IH1cXG5cXG4ucm93LTEyLTIge1xcbiAgZ3JpZC1yb3c6IDEyIC8gMjsgfVxcblxcbi5ncmlkLTEyLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItMyB7XFxuICBncmlkLWNvbHVtbjogMTIgLyAzOyB9XFxuXFxuLnJvdy0xMi0zIHtcXG4gIGdyaWQtcm93OiAxMiAvIDM7IH1cXG5cXG4uZ3JpZC0xMi00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gNDsgfVxcblxcbi5yb3ctMTItNCB7XFxuICBncmlkLXJvdzogMTIgLyA0OyB9XFxuXFxuLmdyaWQtMTItNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi01IHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDU7IH1cXG5cXG4ucm93LTEyLTUge1xcbiAgZ3JpZC1yb3c6IDEyIC8gNTsgfVxcblxcbi5ncmlkLTEyLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItNiB7XFxuICBncmlkLWNvbHVtbjogMTIgLyA2OyB9XFxuXFxuLnJvdy0xMi02IHtcXG4gIGdyaWQtcm93OiAxMiAvIDY7IH1cXG5cXG4uZ3JpZC0xMi03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gNzsgfVxcblxcbi5yb3ctMTItNyB7XFxuICBncmlkLXJvdzogMTIgLyA3OyB9XFxuXFxuLmdyaWQtMTItOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi04IHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDg7IH1cXG5cXG4ucm93LTEyLTgge1xcbiAgZ3JpZC1yb3c6IDEyIC8gODsgfVxcblxcbi5ncmlkLTEyLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItOSB7XFxuICBncmlkLWNvbHVtbjogMTIgLyA5OyB9XFxuXFxuLnJvdy0xMi05IHtcXG4gIGdyaWQtcm93OiAxMiAvIDk7IH1cXG5cXG4uZ3JpZC0xMi0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gMTA7IH1cXG5cXG4ucm93LTEyLTEwIHtcXG4gIGdyaWQtcm93OiAxMiAvIDEwOyB9XFxuXFxuLmdyaWQtMTItMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDExOyB9XFxuXFxuLnJvdy0xMi0xMSB7XFxuICBncmlkLXJvdzogMTIgLyAxMTsgfVxcblxcbi5ncmlkLTEyLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi0xMiB7XFxuICBncmlkLWNvbHVtbjogMTIgLyAxMjsgfVxcblxcbi5yb3ctMTItMTIge1xcbiAgZ3JpZC1yb3c6IDEyIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMi0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTIsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTItMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEyIC8gMTM7IH1cXG5cXG4ucm93LTEyLTEzIHtcXG4gIGdyaWQtcm93OiAxMiAvIDEzOyB9XFxuXFxuLmdyaWQtMTItMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEyLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEyLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMiAvIDE0OyB9XFxuXFxuLnJvdy0xMi0xNCB7XFxuICBncmlkLXJvdzogMTIgLyAxNDsgfVxcblxcbi5ncmlkLTEyLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMiwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMi0xNSB7XFxuICBncmlkLWNvbHVtbjogMTIgLyAxNTsgfVxcblxcbi5yb3ctMTItMTUge1xcbiAgZ3JpZC1yb3c6IDEyIC8gMTU7IH1cXG5cXG4uZ3JpZC0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMyB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxMzsgfVxcblxcbi5yb3ctMTMge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTM7IH1cXG5cXG4uZ3JpZC0xMy0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTEge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gMTsgfVxcblxcbi5yb3ctMTMtMSB7XFxuICBncmlkLXJvdzogMTMgLyAxOyB9XFxuXFxuLmdyaWQtMTMtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy0yIHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDI7IH1cXG5cXG4ucm93LTEzLTIge1xcbiAgZ3JpZC1yb3c6IDEzIC8gMjsgfVxcblxcbi5ncmlkLTEzLTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtMyB7XFxuICBncmlkLWNvbHVtbjogMTMgLyAzOyB9XFxuXFxuLnJvdy0xMy0zIHtcXG4gIGdyaWQtcm93OiAxMyAvIDM7IH1cXG5cXG4uZ3JpZC0xMy00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTQge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gNDsgfVxcblxcbi5yb3ctMTMtNCB7XFxuICBncmlkLXJvdzogMTMgLyA0OyB9XFxuXFxuLmdyaWQtMTMtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy01IHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDU7IH1cXG5cXG4ucm93LTEzLTUge1xcbiAgZ3JpZC1yb3c6IDEzIC8gNTsgfVxcblxcbi5ncmlkLTEzLTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtNiB7XFxuICBncmlkLWNvbHVtbjogMTMgLyA2OyB9XFxuXFxuLnJvdy0xMy02IHtcXG4gIGdyaWQtcm93OiAxMyAvIDY7IH1cXG5cXG4uZ3JpZC0xMy03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTcge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gNzsgfVxcblxcbi5yb3ctMTMtNyB7XFxuICBncmlkLXJvdzogMTMgLyA3OyB9XFxuXFxuLmdyaWQtMTMtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy04IHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDg7IH1cXG5cXG4ucm93LTEzLTgge1xcbiAgZ3JpZC1yb3c6IDEzIC8gODsgfVxcblxcbi5ncmlkLTEzLTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtOSB7XFxuICBncmlkLWNvbHVtbjogMTMgLyA5OyB9XFxuXFxuLnJvdy0xMy05IHtcXG4gIGdyaWQtcm93OiAxMyAvIDk7IH1cXG5cXG4uZ3JpZC0xMy0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gMTA7IH1cXG5cXG4ucm93LTEzLTEwIHtcXG4gIGdyaWQtcm93OiAxMyAvIDEwOyB9XFxuXFxuLmdyaWQtMTMtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTExIHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDExOyB9XFxuXFxuLnJvdy0xMy0xMSB7XFxuICBncmlkLXJvdzogMTMgLyAxMTsgfVxcblxcbi5ncmlkLTEzLTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy0xMiB7XFxuICBncmlkLWNvbHVtbjogMTMgLyAxMjsgfVxcblxcbi5yb3ctMTMtMTIge1xcbiAgZ3JpZC1yb3c6IDEzIC8gMTI7IH1cXG5cXG4uZ3JpZC0xMy0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTMtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDEzIC8gMTM7IH1cXG5cXG4ucm93LTEzLTEzIHtcXG4gIGdyaWQtcm93OiAxMyAvIDEzOyB9XFxuXFxuLmdyaWQtMTMtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEzLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTEzLTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxMyAvIDE0OyB9XFxuXFxuLnJvdy0xMy0xNCB7XFxuICBncmlkLXJvdzogMTMgLyAxNDsgfVxcblxcbi5ncmlkLTEzLTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMywgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xMy0xNSB7XFxuICBncmlkLWNvbHVtbjogMTMgLyAxNTsgfVxcblxcbi5yb3ctMTMtMTUge1xcbiAgZ3JpZC1yb3c6IDEzIC8gMTU7IH1cXG5cXG4uZ3JpZC0xNCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNCB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxNDsgfVxcblxcbi5yb3ctMTQge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTQ7IH1cXG5cXG4uZ3JpZC0xNC0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTEge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gMTsgfVxcblxcbi5yb3ctMTQtMSB7XFxuICBncmlkLXJvdzogMTQgLyAxOyB9XFxuXFxuLmdyaWQtMTQtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC0yIHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDI7IH1cXG5cXG4ucm93LTE0LTIge1xcbiAgZ3JpZC1yb3c6IDE0IC8gMjsgfVxcblxcbi5ncmlkLTE0LTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtMyB7XFxuICBncmlkLWNvbHVtbjogMTQgLyAzOyB9XFxuXFxuLnJvdy0xNC0zIHtcXG4gIGdyaWQtcm93OiAxNCAvIDM7IH1cXG5cXG4uZ3JpZC0xNC00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTQge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gNDsgfVxcblxcbi5yb3ctMTQtNCB7XFxuICBncmlkLXJvdzogMTQgLyA0OyB9XFxuXFxuLmdyaWQtMTQtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC01IHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDU7IH1cXG5cXG4ucm93LTE0LTUge1xcbiAgZ3JpZC1yb3c6IDE0IC8gNTsgfVxcblxcbi5ncmlkLTE0LTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtNiB7XFxuICBncmlkLWNvbHVtbjogMTQgLyA2OyB9XFxuXFxuLnJvdy0xNC02IHtcXG4gIGdyaWQtcm93OiAxNCAvIDY7IH1cXG5cXG4uZ3JpZC0xNC03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTcge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gNzsgfVxcblxcbi5yb3ctMTQtNyB7XFxuICBncmlkLXJvdzogMTQgLyA3OyB9XFxuXFxuLmdyaWQtMTQtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC04IHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDg7IH1cXG5cXG4ucm93LTE0LTgge1xcbiAgZ3JpZC1yb3c6IDE0IC8gODsgfVxcblxcbi5ncmlkLTE0LTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtOSB7XFxuICBncmlkLWNvbHVtbjogMTQgLyA5OyB9XFxuXFxuLnJvdy0xNC05IHtcXG4gIGdyaWQtcm93OiAxNCAvIDk7IH1cXG5cXG4uZ3JpZC0xNC0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gMTA7IH1cXG5cXG4ucm93LTE0LTEwIHtcXG4gIGdyaWQtcm93OiAxNCAvIDEwOyB9XFxuXFxuLmdyaWQtMTQtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTExIHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDExOyB9XFxuXFxuLnJvdy0xNC0xMSB7XFxuICBncmlkLXJvdzogMTQgLyAxMTsgfVxcblxcbi5ncmlkLTE0LTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC0xMiB7XFxuICBncmlkLWNvbHVtbjogMTQgLyAxMjsgfVxcblxcbi5yb3ctMTQtMTIge1xcbiAgZ3JpZC1yb3c6IDE0IC8gMTI7IH1cXG5cXG4uZ3JpZC0xNC0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTQsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTQtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDE0IC8gMTM7IH1cXG5cXG4ucm93LTE0LTEzIHtcXG4gIGdyaWQtcm93OiAxNCAvIDEzOyB9XFxuXFxuLmdyaWQtMTQtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE0LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE0LTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxNCAvIDE0OyB9XFxuXFxuLnJvdy0xNC0xNCB7XFxuICBncmlkLXJvdzogMTQgLyAxNDsgfVxcblxcbi5ncmlkLTE0LTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNC0xNSB7XFxuICBncmlkLWNvbHVtbjogMTQgLyAxNTsgfVxcblxcbi5yb3ctMTQtMTUge1xcbiAgZ3JpZC1yb3c6IDE0IC8gMTU7IH1cXG5cXG4uZ3JpZC0xNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNSB7XFxuICBncmlkLWNvbHVtbjogc3BhbiAxNTsgfVxcblxcbi5yb3ctMTUge1xcbiAgZ3JpZC1yb3c6IHNwYW4gMTU7IH1cXG5cXG4uZ3JpZC0xNS0xIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTEge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gMTsgfVxcblxcbi5yb3ctMTUtMSB7XFxuICBncmlkLXJvdzogMTUgLyAxOyB9XFxuXFxuLmdyaWQtMTUtMiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS0yIHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDI7IH1cXG5cXG4ucm93LTE1LTIge1xcbiAgZ3JpZC1yb3c6IDE1IC8gMjsgfVxcblxcbi5ncmlkLTE1LTMge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtMyB7XFxuICBncmlkLWNvbHVtbjogMTUgLyAzOyB9XFxuXFxuLnJvdy0xNS0zIHtcXG4gIGdyaWQtcm93OiAxNSAvIDM7IH1cXG5cXG4uZ3JpZC0xNS00IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTQge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gNDsgfVxcblxcbi5yb3ctMTUtNCB7XFxuICBncmlkLXJvdzogMTUgLyA0OyB9XFxuXFxuLmdyaWQtMTUtNSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS01IHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDU7IH1cXG5cXG4ucm93LTE1LTUge1xcbiAgZ3JpZC1yb3c6IDE1IC8gNTsgfVxcblxcbi5ncmlkLTE1LTYge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtNiB7XFxuICBncmlkLWNvbHVtbjogMTUgLyA2OyB9XFxuXFxuLnJvdy0xNS02IHtcXG4gIGdyaWQtcm93OiAxNSAvIDY7IH1cXG5cXG4uZ3JpZC0xNS03IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDcsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTcge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gNzsgfVxcblxcbi5yb3ctMTUtNyB7XFxuICBncmlkLXJvdzogMTUgLyA3OyB9XFxuXFxuLmdyaWQtMTUtOCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS04IHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDg7IH1cXG5cXG4ucm93LTE1LTgge1xcbiAgZ3JpZC1yb3c6IDE1IC8gODsgfVxcblxcbi5ncmlkLTE1LTkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOSwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtOSB7XFxuICBncmlkLWNvbHVtbjogMTUgLyA5OyB9XFxuXFxuLnJvdy0xNS05IHtcXG4gIGdyaWQtcm93OiAxNSAvIDk7IH1cXG5cXG4uZ3JpZC0xNS0xMCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtMTAge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gMTA7IH1cXG5cXG4ucm93LTE1LTEwIHtcXG4gIGdyaWQtcm93OiAxNSAvIDEwOyB9XFxuXFxuLmdyaWQtMTUtMTEge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTEsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTExIHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDExOyB9XFxuXFxuLnJvdy0xNS0xMSB7XFxuICBncmlkLXJvdzogMTUgLyAxMTsgfVxcblxcbi5ncmlkLTE1LTEyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEyLCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS0xMiB7XFxuICBncmlkLWNvbHVtbjogMTUgLyAxMjsgfVxcblxcbi5yb3ctMTUtMTIge1xcbiAgZ3JpZC1yb3c6IDE1IC8gMTI7IH1cXG5cXG4uZ3JpZC0xNS0xMyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTUsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMywgMWZyKTsgfVxcblxcbi5jb2x1bW4tMTUtMTMge1xcbiAgZ3JpZC1jb2x1bW46IDE1IC8gMTM7IH1cXG5cXG4ucm93LTE1LTEzIHtcXG4gIGdyaWQtcm93OiAxNSAvIDEzOyB9XFxuXFxuLmdyaWQtMTUtMTQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE1LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTQsIDFmcik7IH1cXG5cXG4uY29sdW1uLTE1LTE0IHtcXG4gIGdyaWQtY29sdW1uOiAxNSAvIDE0OyB9XFxuXFxuLnJvdy0xNS0xNCB7XFxuICBncmlkLXJvdzogMTUgLyAxNDsgfVxcblxcbi5ncmlkLTE1LTE1IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxNSwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDE1LCAxZnIpOyB9XFxuXFxuLmNvbHVtbi0xNS0xNSB7XFxuICBncmlkLWNvbHVtbjogMTUgLyAxNTsgfVxcblxcbi5yb3ctMTUtMTUge1xcbiAgZ3JpZC1yb3c6IDE1IC8gMTU7IH1cXG5cXG4uaGVhZGVyX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBwYWRkaW5nOiBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDdweCByZ2JhKDAsIDAsIDAsIDAuMTgpO1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygxLjI1ICogdmFyKC0tc3BhY2luZy11bml0KSk7IH1cXG5cXG4ucGFnZS10aXRsZSB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgSGVsdmV0aWNhLCBhcmlhbCwgY3Vyc2l2ZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC4yNSAqIHZhcigtLWZpeGVkLXNwYWNpbmctdW5pdCkpO1xcbiAgYm9yZGVyOiBzb2xpZCAycHggY3VycmVudENvbG9yO1xcbiAgYm9yZGVyLXJhZGl1czogY2FsYygwLjc1ICogdmFyKC0tZml4ZWQtc3BhY2luZy11bml0KSk7IH1cXG5cXG4ubmF2YmFyIHtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBjYWxjKDEuMjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTsgfVxcbiAgLm5hdmJhciBhIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuXFxuLnByb21vdGlvbnNfdGl0bGUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1ib3R0b206IGNhbGMoMC43NSAqIHZhcigtLWZpeGVkLXNwYWNpbmctdW5pdCkpO1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuICAucHJvbW90aW9uc190aXRsZTo6YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSk7XFxuICAgIGhlaWdodDogMXB4O1xcbiAgICB3aWR0aDogM2VtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3OyB9XFxuXFxuLnByb21vdGlvbi1saXN0IHtcXG4gIG1hcmdpbjogY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7IH1cXG5cXG4ucHJvbW90aW9uLWNyZWF0ZV9mb3JtLmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNTsgfVxcbiAgLnByb21vdGlvbi1jcmVhdGVfZm9ybS5kaXNhYmxlZCAuaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0ge1xcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XFxuXFxuLnByb21vdGlvbi1kZXRhaWxfaW5mb3Mge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAqIDEuMiAqIDEuMik7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIEhlbHZldGljYSwgYXJpYWwsIGN1cnNpdmU7IH1cXG4gIC5wcm9tb3Rpb24tZGV0YWlsX2luZm9zIC5pbmZvIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG8gTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gICAgZm9udC1zaXplOiBjYWxjKDEuMDVlbSAvICgxLjIgKiAxLjIpKTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG1hcmdpbi10b3A6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICAgIG1hcmdpbi1ib3R0b206IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuICAucHJvbW90aW9uLWRldGFpbF9pbmZvcyAuYWN0aW9uLWJhciB7XFxuICAgIHBhZGRpbmc6IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuLnN0dWRlbnQtbGlzdCB7XFxuICBtYXJnaW46IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuLnN0dWRlbnQtbGlzdF9hY3Rpb24tYmFyIHtcXG4gIHBhZGRpbmc6IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuOmdsb2JhbCguaW5wdXQpIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYzsgfVxcbiAgOmdsb2JhbCguaW5wdXQpOmZvY3VzIHtcXG4gICAgb3V0bGluZS1jb2xvcjogIzM4M2Y0NzsgfVxcbiAgOmdsb2JhbCguaW5wdXQpW3R5cGU9c3VibWl0XSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICAgIGNvbG9yOiB3aGl0ZTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgSGVsdmV0aWNhLCBhcmlhbCwgY3Vyc2l2ZTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDRweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIDpnbG9iYWwoLmlucHV0KVt0eXBlPXN1Ym1pdF06aG92ZXIsIDpnbG9iYWwoLmlucHV0KVt0eXBlPXN1Ym1pdF06Zm9jdXMge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7IH1cXG5cXG46Z2xvYmFsKC5sYWJlbCkge1xcbiAgbWFyZ2luLWJvdHRvbTogY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5yaWNoLWxpc3Qge1xcbiAgLS1ib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxLCAxZnIpO1xcbiAgYm9yZGVyOiB2YXIoLS1ib3JkZXIpO1xcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTsgfVxcblxcbi5yaWNoLWxpc3RfaXRlbTpudGgtb2YtdHlwZSgzbi0yKSBhLCAucmljaC1saXN0X2l0ZW06bnRoLW9mLXR5cGUoM24tMSkgYSB7XFxuICBib3JkZXItcmlnaHQ6IHZhcigtLWJvcmRlcik7IH1cXG5cXG4ucmljaC1saXN0X2l0ZW06bnRoLW9mLXR5cGUob2RkKSBhIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7IH1cXG5cXG4ucmljaC1saXN0X2l0ZW06bnRoLW9mLXR5cGUoZXZlbikgYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgfVxcblxcbi5yaWNoLWxpc3RfaXRlbSBhIHtcXG4gIHBhZGRpbmc6IGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0tYm9yZGVyKTtcXG4gIGhlaWdodDogMTAwJTsgfVxcbiAgLnJpY2gtbGlzdF9pdGVtIGE6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3O1xcbiAgICBjb2xvcjogd2hpdGU7IH1cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhbmltYXRpb246IG1vZGFsLWFwcGVhciAwLjM1czsgfVxcbiAgLm1vZGFsLmhpZGRlbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4ubW9kYWwtY29udGVudCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IGNhbGMoMS4yNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpOyB9XFxuXFxuLm1vZGFsLWFjdGlvbi1iYXIge1xcbiAgbWFyZ2luLXRvcDogY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsLWFwcGVhciB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG46Z2xvYmFsKC5idG4tcHJpbWFyeSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5KTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5KS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjMzgzZjQ3O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMzgzZjQ3OyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1wcmltYXJ5KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMyMjI2MmI7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMjIyNjJiOyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktZGFyaykge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWRhcmspOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzBiMGQwZTsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktZGFyaykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzIyMjYyYjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzIyMjYyYjsgfVxcbiAgICA6Z2xvYmFsKC5idG4tcHJpbWFyeS1kYXJrKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMwYjBkMGU7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMGIwZDBlOyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktZGFya2VyKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWRhcmtlcik6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktZGFya2VyKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggYmxhY2s7IH1cXG4gICAgOmdsb2JhbCguYnRuLXByaW1hcnktZGFya2VyKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG5cXG46Z2xvYmFsKC5idG4tcHJpbWFyeS1saWdodCkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZjU4NjQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0KTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzODNmNDc7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0KS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjNGY1ODY0O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjNGY1ODY0OyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMzODNmNDc7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzgzZjQ3OyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktbGlnaHRlcikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM3MDdkOGY7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWxpZ2h0ZXIpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzVhNjQ3MjsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktbGlnaHRlcikub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzcwN2Q4ZjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzcwN2Q4ZjsgfVxcbiAgICA6Z2xvYmFsKC5idG4tcHJpbWFyeS1saWdodGVyKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICM1YTY0NzI7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjNWE2NDcyOyB9XFxuXFxuOmdsb2JhbCguYnRuLXByaW1hcnktaGFsZikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNTYsIDYzLCA3MSwgMC41KTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLXByaW1hcnktaGFsZik6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM0LCAzOCwgNDMsIDAuNSk7IH1cXG4gIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWhhbGYpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6IHJnYmEoNTYsIDYzLCA3MSwgMC41KTtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiYSg1NiwgNjMsIDcxLCAwLjUpOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1wcmltYXJ5LWhhbGYpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogcmdiYSgzNCwgMzgsIDQzLCAwLjUpO1xcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgzNCwgMzgsIDQzLCAwLjUpOyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmIwZWU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnkpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzExOTdkNDsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeSkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzJiYjBlZTtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzJiYjBlZTsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMxMTk3ZDQ7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMTE5N2Q0OyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeS1kYXJrKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzExOTdkNDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeS1kYXJrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwZDc1YTU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFyaykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzExOTdkNDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzExOTdkNDsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWRhcmspLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzBkNzVhNTtcXG4gICAgICBib3JkZXItY29sb3I6ICMwZDc1YTU7IH1cXG5cXG46Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWRhcmtlcikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYjY0OGU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFya2VyKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwODQzNWU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFya2VyKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjMGI2NDhlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMGI2NDhlOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktZGFya2VyKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMwODQzNWU7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMDg0MzVlOyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodCkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YWMyZjI7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktbGlnaHQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzJiYjBlZTsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodCkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzVhYzJmMjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzVhYzJmMjsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWxpZ2h0KS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMyYmIwZWU7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMmJiMGVlOyB9XFxuXFxuOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodGVyKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ExZGNmNztcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWxpZ2h0ZXIpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzcxY2FmNDsgfVxcbiAgOmdsb2JhbCguYnRuLXNlY29uZGFyeS1saWdodGVyKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjYTFkY2Y3O1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjYTFkY2Y3OyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktbGlnaHRlcikub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjNzFjYWY0O1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzcxY2FmNDsgfVxcblxcbjpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktaGFsZikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDMsIDE3NiwgMjM4LCAwLjUpO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tc2Vjb25kYXJ5LWhhbGYpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNywgMTUxLCAyMTIsIDAuNSk7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktaGFsZikub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogcmdiYSg0MywgMTc2LCAyMzgsIDAuNSk7XFxuICAgIGJvcmRlcjogc29saWQgMXB4IHJnYmEoNDMsIDE3NiwgMjM4LCAwLjUpOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1zZWNvbmRhcnktaGFsZikub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiByZ2JhKDE3LCAxNTEsIDIxMiwgMC41KTtcXG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMTcsIDE1MSwgMjEyLCAwLjUpOyB9XFxuXFxuOmdsb2JhbCguYnRuLWJsYWNrKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBkMGQwZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLWJsYWNrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrOyB9XFxuICA6Z2xvYmFsKC5idG4tYmxhY2spLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICMwZDBkMGQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMwZDBkMGQ7IH1cXG4gICAgOmdsb2JhbCguYnRuLWJsYWNrKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6IGJsYWNrO1xcbiAgICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG5cXG46Z2xvYmFsKC5idG4tZGFyaykge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZDRkNGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1kYXJrKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7IH1cXG4gIDpnbG9iYWwoLmJ0bi1kYXJrKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjNGQ0ZDRkO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjNGQ0ZDRkOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1kYXJrKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMzMzMzMzM7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuOmdsb2JhbCguYnRuLWxpZ2h0KSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4tbGlnaHQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZDlkOTsgfVxcbiAgOmdsb2JhbCguYnRuLWxpZ2h0KS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjZjJmMmYyO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjZjJmMmYyOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1saWdodCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZDlkOWQ5O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2Q5ZDlkOTsgfVxcblxcbjpnbG9iYWwoLmJ0bi13aGl0ZSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgY29sb3I6ICMyMjI7IH1cXG4gIDpnbG9iYWwoLmJ0bi13aGl0ZSk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZlNmU2OyB9XFxuICA6Z2xvYmFsKC5idG4td2hpdGUpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcbiAgICA6Z2xvYmFsKC5idG4td2hpdGUpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogI2U2ZTZlNjtcXG4gICAgICBib3JkZXItY29sb3I6ICNlNmU2ZTY7IH1cXG5cXG46Z2xvYmFsKC5idG4taW5mbykge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYmIwZWU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1pbmZvKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxMTk3ZDQ7IH1cXG4gIDpnbG9iYWwoLmJ0bi1pbmZvKS5vdXRsaW5lZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICAgIGNvbG9yOiAjMmJiMGVlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjMmJiMGVlOyB9XFxuICAgIDpnbG9iYWwoLmJ0bi1pbmZvKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMxMTk3ZDQ7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMTE5N2Q0OyB9XFxuXFxuOmdsb2JhbCguYnRuLXN1Y2Nlc3MpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTVjMzU5O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tc3VjY2Vzcyk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2NhYTNmOyB9XFxuICA6Z2xvYmFsKC5idG4tc3VjY2Vzcykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzU1YzM1OTtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzU1YzM1OTsgfVxcbiAgICA6Z2xvYmFsKC5idG4tc3VjY2Vzcykub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjM2NhYTNmO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzNjYWEzZjsgfVxcblxcbjpnbG9iYWwoLmJ0bi13YXJuaW5nKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1YjY1NjtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4td2FybmluZyk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJhMTI2OyB9XFxuICA6Z2xvYmFsKC5idG4td2FybmluZykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogI2Y1YjY1NjtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2Y1YjY1NjsgfVxcbiAgICA6Z2xvYmFsKC5idG4td2FybmluZykub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZjJhMTI2O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2YyYTEyNjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1kYW5nZXIpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTczZTMyO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tZGFuZ2VyKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjZDI0MTg7IH1cXG4gIDpnbG9iYWwoLmJ0bi1kYW5nZXIpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICNlNzNlMzI7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICNlNzNlMzI7IH1cXG4gICAgOmdsb2JhbCguYnRuLWRhbmdlcikub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjY2QyNDE4O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2NkMjQxODsgfVxcblxcbjpnbG9iYWwoLmJ0bi10ZXh0KSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRkNGQ0ZDtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgOmdsb2JhbCguYnRuLXRleHQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMzsgfVxcbiAgOmdsb2JhbCguYnRuLXRleHQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICM0ZDRkNGQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICM0ZDRkNGQ7IH1cXG4gICAgOmdsb2JhbCguYnRuLXRleHQpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzMzMzMzMztcXG4gICAgICBib3JkZXItY29sb3I6ICMzMzMzMzM7IH1cXG5cXG46Z2xvYmFsKC5idG4tdGl0bGUpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGQwZDBkO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tdGl0bGUpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IH1cXG4gIDpnbG9iYWwoLmJ0bi10aXRsZSkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzBkMGQwZDtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzBkMGQwZDsgfVxcbiAgICA6Z2xvYmFsKC5idG4tdGl0bGUpLm91dGxpbmVkOmhvdmVyIHtcXG4gICAgICBjb2xvcjogYmxhY2s7XFxuICAgICAgYm9yZGVyLWNvbG9yOiBibGFjazsgfVxcblxcbjpnbG9iYWwoLmJ0bi1zdWJ0aXRsZSkge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZDRkNGQ7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1zdWJ0aXRsZSk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzOyB9XFxuICA6Z2xvYmFsKC5idG4tc3VidGl0bGUpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICM0ZDRkNGQ7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICM0ZDRkNGQ7IH1cXG4gICAgOmdsb2JhbCguYnRuLXN1YnRpdGxlKS5vdXRsaW5lZDpob3ZlciB7XFxuICAgICAgY29sb3I6ICMzMzMzMzM7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjMzMzMzMzOyB9XFxuXFxuOmdsb2JhbCguYnRuLWxpbmspIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluayk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyNjJiOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluaykub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogIzM4M2Y0NztcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzM4M2Y0NzsgfVxcbiAgICA6Z2xvYmFsKC5idG4tbGluaykub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMjIyNjJiO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzIyMjYyYjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1saW5rLWhvdmVyZWQpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyNjJiO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluay1ob3ZlcmVkKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwYjBkMGU7IH1cXG4gIDpnbG9iYWwoLmJ0bi1saW5rLWhvdmVyZWQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICMyMjI2MmI7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMyMjI2MmI7IH1cXG4gICAgOmdsb2JhbCguYnRuLWxpbmstaG92ZXJlZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMGIwZDBlO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzBiMGQwZTsgfVxcblxcbjpnbG9iYWwoLmJ0bi1saW5rLXZpc2l0ZWQpIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IGNhbGMoMC41ICogdmFyKC0tc3BhY2luZy11bml0KSkgY2FsYygwLjc1ICogdmFyKC0tc3BhY2luZy11bml0KSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzZjQ3O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICA6Z2xvYmFsKC5idG4tbGluay12aXNpdGVkKTpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjI2MmI7IH1cXG4gIDpnbG9iYWwoLmJ0bi1saW5rLXZpc2l0ZWQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6ICMzODNmNDc7XFxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzODNmNDc7IH1cXG4gICAgOmdsb2JhbCguYnRuLWxpbmstdmlzaXRlZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMjIyNjJiO1xcbiAgICAgIGJvcmRlci1jb2xvcjogIzIyMjYyYjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1mb3JlZ3JvdW5kKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBjb2xvcjogIzIyMjsgfVxcbiAgOmdsb2JhbCguYnRuLWZvcmVncm91bmQpOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U2ZTZlNjsgfVxcbiAgOmdsb2JhbCguYnRuLWZvcmVncm91bmQpLm91dGxpbmVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcbiAgICA6Z2xvYmFsKC5idG4tZm9yZWdyb3VuZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZTZlNmU2O1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2U2ZTZlNjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1iYWNrZ3JvdW5kKSB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiBjYWxjKDAuNSAqIHZhcigtLXNwYWNpbmctdW5pdCkpIGNhbGMoMC43NSAqIHZhcigtLXNwYWNpbmctdW5pdCkpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWVmODtcXG4gIGNvbG9yOiAjMjIyOyB9XFxuICA6Z2xvYmFsKC5idG4tYmFja2dyb3VuZCk6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzdjY2ViOyB9XFxuICA6Z2xvYmFsKC5idG4tYmFja2dyb3VuZCkub3V0bGluZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgICBjb2xvcjogI2VjZWVmODtcXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2VjZWVmODsgfVxcbiAgICA6Z2xvYmFsKC5idG4tYmFja2dyb3VuZCkub3V0bGluZWQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjYzdjY2ViO1xcbiAgICAgIGJvcmRlci1jb2xvcjogI2M3Y2NlYjsgfVxcblxcbjpnbG9iYWwoLmJ0bi1jbGVhcikge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogY2FsYygwLjUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKSBjYWxjKDAuNzUgKiB2YXIoLS1zcGFjaW5nLXVuaXQpKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICBjb2xvcjogaW5oZXJpdDsgfVxcblxcbjpnbG9iYWwoI2FwcCkge1xcbiAgZm9udC1zaXplOiAxLjA1ZW07XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIEhlbHZldGljYSwgYXJpYWwsIHNhbnMtc2VyaWY7XFxuICBsaW5lLWhlaWdodDogMS4xO1xcbiAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWVmODtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCBjZW50ZXIsIHdoaXRlIDUwJSwgI2YyZjJmMik7IH1cXG5cXG5hIHtcXG4gIGNvbG9yOiAjMzgzZjQ3OyB9XFxuICBhOmhvdmVyIHtcXG4gICAgY29sb3I6ICMyMjI2MmI7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuICdAbWVkaWEgJyArIGl0ZW1bMl0gKyAneycgKyBjb250ZW50ICsgJ30nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgICB9XG4gICAgfSkuam9pbignJyk7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsICcnXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG1vZHVsZXNbaV07IC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcbiAgICAgIC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG4gICAgICAvLyB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG4gICAgICAvLyBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cbiAgICAgIGlmIChpdGVtWzBdID09IG51bGwgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgaWYgKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgICAgaXRlbVsyXSA9ICcoJyArIGl0ZW1bMl0gKyAnKSBhbmQgKCcgKyBtZWRpYVF1ZXJ5ICsgJyknO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gJy8qIyBzb3VyY2VVUkw9JyArIGNzc01hcHBpbmcuc291cmNlUm9vdCArIHNvdXJjZSArICcgKi8nO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9ICdzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCwnICsgYmFzZTY0O1xuICByZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufSIsIid1c2Ugc3RyaWN0JztcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHgpIHtcblx0dmFyIHByb3RvdHlwZTtcblx0cmV0dXJuIHRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nICYmIChwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoeCksIHByb3RvdHlwZSA9PT0gbnVsbCB8fCBwcm90b3R5cGUgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih7fSkpO1xufTtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgbm93ID0gcmVxdWlyZSgnLi9ub3cnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHRpbWVXYWl0aW5nID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZ1xuICAgICAgPyBuYXRpdmVNaW4odGltZVdhaXRpbmcsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKVxuICAgICAgOiB0aW1lV2FpdGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3c7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b051bWJlcjtcbiIsIi8qISBodHRwczovL210aHMuYmUvcHVueWNvZGUgdjEuNC4xIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGVzICovXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHQhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChcblx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsXG5cdCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHVueWNvZGVgIG9iamVjdC5cblx0ICogQG5hbWUgcHVueWNvZGVcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHR2YXIgcHVueWNvZGUsXG5cblx0LyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cblx0LyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xuXHRiYXNlID0gMzYsXG5cdHRNaW4gPSAxLFxuXHR0TWF4ID0gMjYsXG5cdHNrZXcgPSAzOCxcblx0ZGFtcCA9IDcwMCxcblx0aW5pdGlhbEJpYXMgPSA3Mixcblx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0ZGVsaW1pdGVyID0gJy0nLCAvLyAnXFx4MkQnXG5cblx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0cmVnZXhQdW55Y29kZSA9IC9eeG4tLS8sXG5cdHJlZ2V4Tm9uQVNDSUkgPSAvW15cXHgyMC1cXHg3RV0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuNC4xJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykge1xuXHRcdFx0Ly8gaW4gTm9kZS5qcywgaW8uanMsIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xudmFyIHF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgncXVlcnktc3RyaW5nJyk7XG52YXIgcHJlcGVuZEh0dHAgPSByZXF1aXJlKCdwcmVwZW5kLWh0dHAnKTtcbnZhciBzb3J0S2V5cyA9IHJlcXVpcmUoJ3NvcnQta2V5cycpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIERFRkFVTFRfUE9SVFMgPSB7XG5cdCdodHRwOic6IDgwLFxuXHQnaHR0cHM6JzogNDQzLFxuXHQnZnRwOic6IDIxXG59O1xuXG4vLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIGAvL2BgIGJpdFxudmFyIHNsYXNoZWRQcm90b2NvbCA9IHtcblx0J2h0dHAnOiB0cnVlLFxuXHQnaHR0cHMnOiB0cnVlLFxuXHQnZnRwJzogdHJ1ZSxcblx0J2dvcGhlcic6IHRydWUsXG5cdCdmaWxlJzogdHJ1ZSxcblx0J2h0dHA6JzogdHJ1ZSxcblx0J2h0dHBzOic6IHRydWUsXG5cdCdmdHA6JzogdHJ1ZSxcblx0J2dvcGhlcjonOiB0cnVlLFxuXHQnZmlsZTonOiB0cnVlXG59O1xuXG5mdW5jdGlvbiB0ZXN0UGFyYW1ldGVyKG5hbWUsIGZpbHRlcnMpIHtcblx0cmV0dXJuIGZpbHRlcnMuc29tZShmdW5jdGlvbiAoZmlsdGVyKSB7XG5cdFx0cmV0dXJuIGZpbHRlciBpbnN0YW5jZW9mIFJlZ0V4cCA/IGZpbHRlci50ZXN0KG5hbWUpIDogZmlsdGVyID09PSBuYW1lO1xuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG5cdG9wdHMgPSBvYmplY3RBc3NpZ24oe1xuXHRcdG5vcm1hbGl6ZVByb3RvY29sOiB0cnVlLFxuXHRcdG5vcm1hbGl6ZUh0dHBzOiBmYWxzZSxcblx0XHRzdHJpcEZyYWdtZW50OiB0cnVlLFxuXHRcdHN0cmlwV1dXOiB0cnVlLFxuXHRcdHJlbW92ZVF1ZXJ5UGFyYW1ldGVyczogWy9edXRtX1xcdysvaV0sXG5cdFx0cmVtb3ZlVHJhaWxpbmdTbGFzaDogdHJ1ZSxcblx0XHRyZW1vdmVEaXJlY3RvcnlJbmRleDogZmFsc2Vcblx0fSwgb3B0cyk7XG5cblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdHZhciBoYXNSZWxhdGl2ZVByb3RvY29sID0gc3RyLmluZGV4T2YoJy8vJykgPT09IDA7XG5cblx0Ly8gcHJlcGVuZCBwcm90b2NvbFxuXHRzdHIgPSBwcmVwZW5kSHR0cChzdHIudHJpbSgpKS5yZXBsYWNlKC9eXFwvXFwvLywgJ2h0dHA6Ly8nKTtcblxuXHR2YXIgdXJsT2JqID0gdXJsLnBhcnNlKHN0cik7XG5cblx0aWYgKG9wdHMubm9ybWFsaXplSHR0cHMgJiYgdXJsT2JqLnByb3RvY29sID09PSAnaHR0cHM6Jykge1xuXHRcdHVybE9iai5wcm90b2NvbCA9ICdodHRwOic7XG5cdH1cblxuXHRpZiAoIXVybE9iai5ob3N0bmFtZSAmJiAhdXJsT2JqLnBhdGhuYW1lKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFVSTCcpO1xuXHR9XG5cblx0Ly8gcHJldmVudCB0aGVzZSBmcm9tIGJlaW5nIHVzZWQgYnkgYHVybC5mb3JtYXRgXG5cdGRlbGV0ZSB1cmxPYmouaG9zdDtcblx0ZGVsZXRlIHVybE9iai5xdWVyeTtcblxuXHQvLyByZW1vdmUgZnJhZ21lbnRcblx0aWYgKG9wdHMuc3RyaXBGcmFnbWVudCkge1xuXHRcdGRlbGV0ZSB1cmxPYmouaGFzaDtcblx0fVxuXG5cdC8vIHJlbW92ZSBkZWZhdWx0IHBvcnRcblx0dmFyIHBvcnQgPSBERUZBVUxUX1BPUlRTW3VybE9iai5wcm90b2NvbF07XG5cdGlmIChOdW1iZXIodXJsT2JqLnBvcnQpID09PSBwb3J0KSB7XG5cdFx0ZGVsZXRlIHVybE9iai5wb3J0O1xuXHR9XG5cblx0Ly8gcmVtb3ZlIGR1cGxpY2F0ZSBzbGFzaGVzXG5cdGlmICh1cmxPYmoucGF0aG5hbWUpIHtcblx0XHR1cmxPYmoucGF0aG5hbWUgPSB1cmxPYmoucGF0aG5hbWUucmVwbGFjZSgvXFwvezIsfS9nLCAnLycpO1xuXHR9XG5cblx0Ly8gZGVjb2RlIFVSSSBvY3RldHNcblx0aWYgKHVybE9iai5wYXRobmFtZSkge1xuXHRcdHVybE9iai5wYXRobmFtZSA9IGRlY29kZVVSSSh1cmxPYmoucGF0aG5hbWUpO1xuXHR9XG5cblx0Ly8gcmVtb3ZlIGRpcmVjdG9yeSBpbmRleFxuXHRpZiAob3B0cy5yZW1vdmVEaXJlY3RvcnlJbmRleCA9PT0gdHJ1ZSkge1xuXHRcdG9wdHMucmVtb3ZlRGlyZWN0b3J5SW5kZXggPSBbL15pbmRleFxcLlthLXpdKyQvXTtcblx0fVxuXG5cdGlmIChBcnJheS5pc0FycmF5KG9wdHMucmVtb3ZlRGlyZWN0b3J5SW5kZXgpICYmIG9wdHMucmVtb3ZlRGlyZWN0b3J5SW5kZXgubGVuZ3RoKSB7XG5cdFx0dmFyIHBhdGhDb21wb25lbnRzID0gdXJsT2JqLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG5cdFx0dmFyIGxhc3RDb21wb25lbnQgPSBwYXRoQ29tcG9uZW50c1twYXRoQ29tcG9uZW50cy5sZW5ndGggLSAxXTtcblxuXHRcdGlmICh0ZXN0UGFyYW1ldGVyKGxhc3RDb21wb25lbnQsIG9wdHMucmVtb3ZlRGlyZWN0b3J5SW5kZXgpKSB7XG5cdFx0XHRwYXRoQ29tcG9uZW50cyA9IHBhdGhDb21wb25lbnRzLnNsaWNlKDAsIHBhdGhDb21wb25lbnRzLmxlbmd0aCAtIDEpO1xuXHRcdFx0dXJsT2JqLnBhdGhuYW1lID0gcGF0aENvbXBvbmVudHMuc2xpY2UoMSkuam9pbignLycpICsgJy8nO1xuXHRcdH1cblx0fVxuXG5cdC8vIHJlc29sdmUgcmVsYXRpdmUgcGF0aHMsIGJ1dCBvbmx5IGZvciBzbGFzaGVkIHByb3RvY29sc1xuXHRpZiAoc2xhc2hlZFByb3RvY29sW3VybE9iai5wcm90b2NvbF0pIHtcblx0XHR2YXIgZG9tYWluID0gdXJsT2JqLnByb3RvY29sICsgJy8vJyArIHVybE9iai5ob3N0bmFtZTtcblx0XHR2YXIgcmVsYXRpdmUgPSB1cmwucmVzb2x2ZShkb21haW4sIHVybE9iai5wYXRobmFtZSk7XG5cdFx0dXJsT2JqLnBhdGhuYW1lID0gcmVsYXRpdmUucmVwbGFjZShkb21haW4sICcnKTtcblx0fVxuXG5cdGlmICh1cmxPYmouaG9zdG5hbWUpIHtcblx0XHQvLyBJRE4gdG8gVW5pY29kZVxuXHRcdHVybE9iai5ob3N0bmFtZSA9IHB1bnljb2RlLnRvVW5pY29kZSh1cmxPYmouaG9zdG5hbWUpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHQvLyByZW1vdmUgdHJhaWxpbmcgZG90XG5cdFx0dXJsT2JqLmhvc3RuYW1lID0gdXJsT2JqLmhvc3RuYW1lLnJlcGxhY2UoL1xcLiQvLCAnJyk7XG5cblx0XHQvLyByZW1vdmUgYHd3dy5gXG5cdFx0aWYgKG9wdHMuc3RyaXBXV1cpIHtcblx0XHRcdHVybE9iai5ob3N0bmFtZSA9IHVybE9iai5ob3N0bmFtZS5yZXBsYWNlKC9ed3d3XFwuLywgJycpO1xuXHRcdH1cblx0fVxuXG5cdC8vIHJlbW92ZSBVUkwgd2l0aCBlbXB0eSBxdWVyeSBzdHJpbmdcblx0aWYgKHVybE9iai5zZWFyY2ggPT09ICc/Jykge1xuXHRcdGRlbGV0ZSB1cmxPYmouc2VhcmNoO1xuXHR9XG5cblx0dmFyIHF1ZXJ5UGFyYW1ldGVycyA9IHF1ZXJ5U3RyaW5nLnBhcnNlKHVybE9iai5zZWFyY2gpO1xuXG5cdC8vIHJlbW92ZSBxdWVyeSB1bndhbnRlZCBwYXJhbWV0ZXJzXG5cdGlmIChBcnJheS5pc0FycmF5KG9wdHMucmVtb3ZlUXVlcnlQYXJhbWV0ZXJzKSkge1xuXHRcdGZvciAodmFyIGtleSBpbiBxdWVyeVBhcmFtZXRlcnMpIHtcblx0XHRcdGlmICh0ZXN0UGFyYW1ldGVyKGtleSwgb3B0cy5yZW1vdmVRdWVyeVBhcmFtZXRlcnMpKSB7XG5cdFx0XHRcdGRlbGV0ZSBxdWVyeVBhcmFtZXRlcnNba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBzb3J0IHF1ZXJ5IHBhcmFtZXRlcnNcblx0dXJsT2JqLnNlYXJjaCA9IHF1ZXJ5U3RyaW5nLnN0cmluZ2lmeShzb3J0S2V5cyhxdWVyeVBhcmFtZXRlcnMpKTtcblxuXHQvLyBkZWNvZGUgcXVlcnkgcGFyYW1ldGVyc1xuXHR1cmxPYmouc2VhcmNoID0gZGVjb2RlVVJJQ29tcG9uZW50KHVybE9iai5zZWFyY2gpO1xuXG5cdC8vIHRha2UgYWR2YW50YWdlIG9mIG1hbnkgb2YgdGhlIE5vZGUgYHVybGAgbm9ybWFsaXphdGlvbnNcblx0c3RyID0gdXJsLmZvcm1hdCh1cmxPYmopO1xuXG5cdC8vIHJlbW92ZSBlbmRpbmcgYC9gXG5cdGlmIChvcHRzLnJlbW92ZVRyYWlsaW5nU2xhc2ggfHwgdXJsT2JqLnBhdGhuYW1lID09PSAnLycpIHtcblx0XHRzdHIgPSBzdHIucmVwbGFjZSgvXFwvJC8sICcnKTtcblx0fVxuXG5cdC8vIHJlc3RvcmUgcmVsYXRpdmUgcHJvdG9jb2wsIGlmIGFwcGxpY2FibGVcblx0aWYgKGhhc1JlbGF0aXZlUHJvdG9jb2wgJiYgIW9wdHMubm9ybWFsaXplUHJvdG9jb2wpIHtcblx0XHRzdHIgPSBzdHIucmVwbGFjZSgvXmh0dHA6XFwvXFwvLywgJy8vJyk7XG5cdH1cblxuXHRyZXR1cm4gc3RyO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwpIHtcblx0aWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcsIGdvdCAnICsgdHlwZW9mIHVybCk7XG5cdH1cblxuXHR1cmwgPSB1cmwudHJpbSgpO1xuXG5cdGlmICgvXlxcLipcXC98Xig/IWxvY2FsaG9zdClcXHcrOi8udGVzdCh1cmwpKSB7XG5cdFx0cmV0dXJuIHVybDtcblx0fVxuXG5cdHJldHVybiB1cmwucmVwbGFjZSgvXig/ISg/Olxcdys6KT9cXC9cXC8pLywgJ2h0dHA6Ly8nKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgc3RyaWN0VXJpRW5jb2RlID0gcmVxdWlyZSgnc3RyaWN0LXVyaS1lbmNvZGUnKTtcbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbmZ1bmN0aW9uIGVuY29kZXJGb3JBcnJheUZvcm1hdChvcHRzKSB7XG5cdHN3aXRjaCAob3B0cy5hcnJheUZvcm1hdCkge1xuXHRcdGNhc2UgJ2luZGV4Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBudWxsID8gW1xuXHRcdFx0XHRcdGVuY29kZShrZXksIG9wdHMpLFxuXHRcdFx0XHRcdCdbJyxcblx0XHRcdFx0XHRpbmRleCxcblx0XHRcdFx0XHQnXSdcblx0XHRcdFx0XS5qb2luKCcnKSA6IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnWycsXG5cdFx0XHRcdFx0ZW5jb2RlKGluZGV4LCBvcHRzKSxcblx0XHRcdFx0XHQnXT0nLFxuXHRcdFx0XHRcdGVuY29kZSh2YWx1ZSwgb3B0cylcblx0XHRcdFx0XS5qb2luKCcnKTtcblx0XHRcdH07XG5cblx0XHRjYXNlICdicmFja2V0Jzpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IG51bGwgPyBlbmNvZGUoa2V5LCBvcHRzKSA6IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnW109Jyxcblx0XHRcdFx0XHRlbmNvZGUodmFsdWUsIG9wdHMpXG5cdFx0XHRcdF0uam9pbignJyk7XG5cdFx0XHR9O1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWUgPT09IG51bGwgPyBlbmNvZGUoa2V5LCBvcHRzKSA6IFtcblx0XHRcdFx0XHRlbmNvZGUoa2V5LCBvcHRzKSxcblx0XHRcdFx0XHQnPScsXG5cdFx0XHRcdFx0ZW5jb2RlKHZhbHVlLCBvcHRzKVxuXHRcdFx0XHRdLmpvaW4oJycpO1xuXHRcdFx0fTtcblx0fVxufVxuXG5mdW5jdGlvbiBwYXJzZXJGb3JBcnJheUZvcm1hdChvcHRzKSB7XG5cdHZhciByZXN1bHQ7XG5cblx0c3dpdGNoIChvcHRzLmFycmF5Rm9ybWF0KSB7XG5cdFx0Y2FzZSAnaW5kZXgnOlxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChrZXksIHZhbHVlLCBhY2N1bXVsYXRvcikge1xuXHRcdFx0XHRyZXN1bHQgPSAvXFxbKFxcZCopXFxdJC8uZXhlYyhrZXkpO1xuXG5cdFx0XHRcdGtleSA9IGtleS5yZXBsYWNlKC9cXFtcXGQqXFxdJC8sICcnKTtcblxuXHRcdFx0XHRpZiAoIXJlc3VsdCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSB2YWx1ZTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYWNjdW11bGF0b3Jba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IHt9O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XVtyZXN1bHRbMV1dID0gdmFsdWU7XG5cdFx0XHR9O1xuXG5cdFx0Y2FzZSAnYnJhY2tldCc6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSB7XG5cdFx0XHRcdHJlc3VsdCA9IC8oXFxbXFxdKSQvLmV4ZWMoa2V5KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1xcW1xcXSQvLCAnJyk7XG5cblx0XHRcdFx0aWYgKCFyZXN1bHQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFjY3VtdWxhdG9yW2tleV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbdmFsdWVdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGFjY3VtdWxhdG9yW2tleV0gPSBbXS5jb25jYXQoYWNjdW11bGF0b3Jba2V5XSwgdmFsdWUpO1xuXHRcdFx0fTtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGtleSwgdmFsdWUsIGFjY3VtdWxhdG9yKSB7XG5cdFx0XHRcdGlmIChhY2N1bXVsYXRvcltrZXldID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRhY2N1bXVsYXRvcltrZXldID0gdmFsdWU7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWNjdW11bGF0b3Jba2V5XSA9IFtdLmNvbmNhdChhY2N1bXVsYXRvcltrZXldLCB2YWx1ZSk7XG5cdFx0XHR9O1xuXHR9XG59XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWx1ZSwgb3B0cykge1xuXHRpZiAob3B0cy5lbmNvZGUpIHtcblx0XHRyZXR1cm4gb3B0cy5zdHJpY3QgPyBzdHJpY3RVcmlFbmNvZGUodmFsdWUpIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24ga2V5c1NvcnRlcihpbnB1dCkge1xuXHRpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQuc29ydCgpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4ga2V5c1NvcnRlcihPYmplY3Qua2V5cyhpbnB1dCkpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdHJldHVybiBOdW1iZXIoYSkgLSBOdW1iZXIoYik7XG5cdFx0fSkubWFwKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBpbnB1dFtrZXldO1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGlucHV0O1xufVxuXG5leHBvcnRzLmV4dHJhY3QgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiBzdHIuc3BsaXQoJz8nKVsxXSB8fCAnJztcbn07XG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG5cdG9wdHMgPSBvYmplY3RBc3NpZ24oe2FycmF5Rm9ybWF0OiAnbm9uZSd9LCBvcHRzKTtcblxuXHR2YXIgZm9ybWF0dGVyID0gcGFyc2VyRm9yQXJyYXlGb3JtYXQob3B0cyk7XG5cblx0Ly8gQ3JlYXRlIGFuIG9iamVjdCB3aXRoIG5vIHByb3RvdHlwZVxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3F1ZXJ5LXN0cmluZy9pc3N1ZXMvNDdcblx0dmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHN0ciA9IHN0ci50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcblxuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRzdHIuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuXHRcdHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG5cdFx0Ly8gRmlyZWZveCAocHJlIDQwKSBkZWNvZGVzIGAlM0RgIHRvIGA9YFxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvcXVlcnktc3RyaW5nL3B1bGwvMzdcblx0XHR2YXIga2V5ID0gcGFydHMuc2hpZnQoKTtcblx0XHR2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IHVuZGVmaW5lZDtcblxuXHRcdC8vIG1pc3NpbmcgYD1gIHNob3VsZCBiZSBgbnVsbGA6XG5cdFx0Ly8gaHR0cDovL3czLm9yZy9UUi8yMDEyL1dELXVybC0yMDEyMDUyNC8jY29sbGVjdC11cmwtcGFyYW1ldGVyc1xuXHRcdHZhbCA9IHZhbCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGRlY29kZVVSSUNvbXBvbmVudCh2YWwpO1xuXG5cdFx0Zm9ybWF0dGVyKGRlY29kZVVSSUNvbXBvbmVudChrZXkpLCB2YWwsIHJldCk7XG5cdH0pO1xuXG5cdHJldHVybiBPYmplY3Qua2V5cyhyZXQpLnNvcnQoKS5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwga2V5KSB7XG5cdFx0dmFyIHZhbCA9IHJldFtrZXldO1xuXHRcdGlmIChCb29sZWFuKHZhbCkgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsKSkge1xuXHRcdFx0Ly8gU29ydCBvYmplY3Qga2V5cywgbm90IHZhbHVlc1xuXHRcdFx0cmVzdWx0W2tleV0gPSBrZXlzU29ydGVyKHZhbCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdFtrZXldID0gdmFsO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xufTtcblxuZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAob2JqLCBvcHRzKSB7XG5cdHZhciBkZWZhdWx0cyA9IHtcblx0XHRlbmNvZGU6IHRydWUsXG5cdFx0c3RyaWN0OiB0cnVlLFxuXHRcdGFycmF5Rm9ybWF0OiAnbm9uZSdcblx0fTtcblxuXHRvcHRzID0gb2JqZWN0QXNzaWduKGRlZmF1bHRzLCBvcHRzKTtcblxuXHR2YXIgZm9ybWF0dGVyID0gZW5jb2RlckZvckFycmF5Rm9ybWF0KG9wdHMpO1xuXG5cdHJldHVybiBvYmogPyBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuXHRcdHZhciB2YWwgPSBvYmpba2V5XTtcblxuXHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmICh2YWwgPT09IG51bGwpIHtcblx0XHRcdHJldHVybiBlbmNvZGUoa2V5LCBvcHRzKTtcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cblx0XHRcdHZhbC5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKHZhbDIpIHtcblx0XHRcdFx0aWYgKHZhbDIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGZvcm1hdHRlcihrZXksIHZhbDIsIHJlc3VsdC5sZW5ndGgpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oJyYnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZW5jb2RlKGtleSwgb3B0cykgKyAnPScgKyBlbmNvZGUodmFsLCBvcHRzKTtcblx0fSkuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG5cdFx0cmV0dXJuIHgubGVuZ3RoID4gMDtcblx0fSkuam9pbignJicpIDogJyc7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgaXNQbGFpbk9iaiA9IHJlcXVpcmUoJ2lzLXBsYWluLW9iaicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcblx0aWYgKCFpc1BsYWluT2JqKG9iaikpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHBsYWluIG9iamVjdCcpO1xuXHR9XG5cblx0b3B0cyA9IG9wdHMgfHwge307XG5cblx0Ly8gREVQUkVDQVRFRFxuXHRpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcblx0XHRvcHRzID0ge2NvbXBhcmU6IG9wdHN9O1xuXHR9XG5cblx0dmFyIGRlZXAgPSBvcHRzLmRlZXA7XG5cdHZhciBzZWVuSW5wdXQgPSBbXTtcblx0dmFyIHNlZW5PdXRwdXQgPSBbXTtcblxuXHR2YXIgc29ydEtleXMgPSBmdW5jdGlvbiAoeCkge1xuXHRcdHZhciBzZWVuSW5kZXggPSBzZWVuSW5wdXQuaW5kZXhPZih4KTtcblxuXHRcdGlmIChzZWVuSW5kZXggIT09IC0xKSB7XG5cdFx0XHRyZXR1cm4gc2Vlbk91dHB1dFtzZWVuSW5kZXhdO1xuXHRcdH1cblxuXHRcdHZhciByZXQgPSB7fTtcblx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKHgpLnNvcnQob3B0cy5jb21wYXJlKTtcblxuXHRcdHNlZW5JbnB1dC5wdXNoKHgpO1xuXHRcdHNlZW5PdXRwdXQucHVzaChyZXQpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIga2V5ID0ga2V5c1tpXTtcblx0XHRcdHZhciB2YWwgPSB4W2tleV07XG5cblx0XHRcdHJldFtrZXldID0gZGVlcCAmJiBpc1BsYWluT2JqKHZhbCkgPyBzb3J0S2V5cyh2YWwpIDogdmFsO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH07XG5cblx0cmV0dXJuIHNvcnRLZXlzKG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uIChjKSB7XG5cdFx0cmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0fSk7XG59O1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHB1bnljb2RlID0gcmVxdWlyZSgncHVueWNvZGUnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmV4cG9ydHMucGFyc2UgPSB1cmxQYXJzZTtcbmV4cG9ydHMucmVzb2x2ZSA9IHVybFJlc29sdmU7XG5leHBvcnRzLnJlc29sdmVPYmplY3QgPSB1cmxSZXNvbHZlT2JqZWN0O1xuZXhwb3J0cy5mb3JtYXQgPSB1cmxGb3JtYXQ7XG5cbmV4cG9ydHMuVXJsID0gVXJsO1xuXG5mdW5jdGlvbiBVcmwoKSB7XG4gIHRoaXMucHJvdG9jb2wgPSBudWxsO1xuICB0aGlzLnNsYXNoZXMgPSBudWxsO1xuICB0aGlzLmF1dGggPSBudWxsO1xuICB0aGlzLmhvc3QgPSBudWxsO1xuICB0aGlzLnBvcnQgPSBudWxsO1xuICB0aGlzLmhvc3RuYW1lID0gbnVsbDtcbiAgdGhpcy5oYXNoID0gbnVsbDtcbiAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgdGhpcy5wYXRobmFtZSA9IG51bGw7XG4gIHRoaXMucGF0aCA9IG51bGw7XG4gIHRoaXMuaHJlZiA9IG51bGw7XG59XG5cbi8vIFJlZmVyZW5jZTogUkZDIDM5ODYsIFJGQyAxODA4LCBSRkMgMjM5NlxuXG4vLyBkZWZpbmUgdGhlc2UgaGVyZSBzbyBhdCBsZWFzdCB0aGV5IG9ubHkgaGF2ZSB0byBiZVxuLy8gY29tcGlsZWQgb25jZSBvbiB0aGUgZmlyc3QgbW9kdWxlIGxvYWQuXG52YXIgcHJvdG9jb2xQYXR0ZXJuID0gL14oW2EtejAtOS4rLV0rOikvaSxcbiAgICBwb3J0UGF0dGVybiA9IC86WzAtOV0qJC8sXG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGEgc2ltcGxlIHBhdGggVVJMXG4gICAgc2ltcGxlUGF0aFBhdHRlcm4gPSAvXihcXC9cXC8/KD8hXFwvKVteXFw/XFxzXSopKFxcP1teXFxzXSopPyQvLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cbiAgICAvLyBXZSBhY3R1YWxseSBqdXN0IGF1dG8tZXNjYXBlIHRoZXNlLlxuICAgIGRlbGltcyA9IFsnPCcsICc+JywgJ1wiJywgJ2AnLCAnICcsICdcXHInLCAnXFxuJywgJ1xcdCddLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbJ3snLCAnfScsICd8JywgJ1xcXFwnLCAnXicsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KHVud2lzZSksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbJy8nLCAnPycsICcjJ10sXG4gICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG4gICAgaG9zdG5hbWVQYXJ0UGF0dGVybiA9IC9eWythLXowLTlBLVpfLV17MCw2M30kLyxcbiAgICBob3N0bmFtZVBhcnRTdGFydCA9IC9eKFsrYS16MC05QS1aXy1dezAsNjN9KSguKikkLyxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBjYW4gYWxsb3cgXCJ1bnNhZmVcIiBhbmQgXCJ1bndpc2VcIiBjaGFycy5cbiAgICB1bnNhZmVQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IG5ldmVyIGhhdmUgYSBob3N0bmFtZS5cbiAgICBob3N0bGVzc1Byb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgYWx3YXlzIGNvbnRhaW4gYSAvLyBiaXQuXG4gICAgc2xhc2hlZFByb3RvY29sID0ge1xuICAgICAgJ2h0dHAnOiB0cnVlLFxuICAgICAgJ2h0dHBzJzogdHJ1ZSxcbiAgICAgICdmdHAnOiB0cnVlLFxuICAgICAgJ2dvcGhlcic6IHRydWUsXG4gICAgICAnZmlsZSc6IHRydWUsXG4gICAgICAnaHR0cDonOiB0cnVlLFxuICAgICAgJ2h0dHBzOic6IHRydWUsXG4gICAgICAnZnRwOic6IHRydWUsXG4gICAgICAnZ29waGVyOic6IHRydWUsXG4gICAgICAnZmlsZTonOiB0cnVlXG4gICAgfSxcbiAgICBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5cbmZ1bmN0aW9uIHVybFBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKHVybCAmJiB1dGlsLmlzT2JqZWN0KHVybCkgJiYgdXJsIGluc3RhbmNlb2YgVXJsKSByZXR1cm4gdXJsO1xuXG4gIHZhciB1ID0gbmV3IFVybDtcbiAgdS5wYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KTtcbiAgcmV0dXJuIHU7XG59XG5cblVybC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbih1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICghdXRpbC5pc1N0cmluZyh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhcmFtZXRlciAndXJsJyBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgdXJsKTtcbiAgfVxuXG4gIC8vIENvcHkgY2hyb21lLCBJRSwgb3BlcmEgYmFja3NsYXNoLWhhbmRsaW5nIGJlaGF2aW9yLlxuICAvLyBCYWNrIHNsYXNoZXMgYmVmb3JlIHRoZSBxdWVyeSBzdHJpbmcgZ2V0IGNvbnZlcnRlZCB0byBmb3J3YXJkIHNsYXNoZXNcbiAgLy8gU2VlOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjU5MTZcbiAgdmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZignPycpLFxuICAgICAgc3BsaXR0ZXIgPVxuICAgICAgICAgIChxdWVyeUluZGV4ICE9PSAtMSAmJiBxdWVyeUluZGV4IDwgdXJsLmluZGV4T2YoJyMnKSkgPyAnPycgOiAnIycsXG4gICAgICB1U3BsaXQgPSB1cmwuc3BsaXQoc3BsaXR0ZXIpLFxuICAgICAgc2xhc2hSZWdleCA9IC9cXFxcL2c7XG4gIHVTcGxpdFswXSA9IHVTcGxpdFswXS5yZXBsYWNlKHNsYXNoUmVnZXgsICcvJyk7XG4gIHVybCA9IHVTcGxpdC5qb2luKHNwbGl0dGVyKTtcblxuICB2YXIgcmVzdCA9IHVybDtcblxuICAvLyB0cmltIGJlZm9yZSBwcm9jZWVkaW5nLlxuICAvLyBUaGlzIGlzIHRvIHN1cHBvcnQgcGFyc2Ugc3R1ZmYgbGlrZSBcIiAgaHR0cDovL2Zvby5jb20gIFxcblwiXG4gIHJlc3QgPSByZXN0LnRyaW0oKTtcblxuICBpZiAoIXNsYXNoZXNEZW5vdGVIb3N0ICYmIHVybC5zcGxpdCgnIycpLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIFRyeSBmYXN0IHBhdGggcmVnZXhwXG4gICAgdmFyIHNpbXBsZVBhdGggPSBzaW1wbGVQYXRoUGF0dGVybi5leGVjKHJlc3QpO1xuICAgIGlmIChzaW1wbGVQYXRoKSB7XG4gICAgICB0aGlzLnBhdGggPSByZXN0O1xuICAgICAgdGhpcy5ocmVmID0gcmVzdDtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBzaW1wbGVQYXRoWzFdO1xuICAgICAgaWYgKHNpbXBsZVBhdGhbMl0pIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBzaW1wbGVQYXRoWzJdO1xuICAgICAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnNlYXJjaC5zdWJzdHIoMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvdG8gPSBwcm90b2NvbFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgaWYgKHByb3RvKSB7XG4gICAgcHJvdG8gPSBwcm90b1swXTtcbiAgICB2YXIgbG93ZXJQcm90byA9IHByb3RvLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5wcm90b2NvbCA9IGxvd2VyUHJvdG87XG4gICAgcmVzdCA9IHJlc3Quc3Vic3RyKHByb3RvLmxlbmd0aCk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGlmIGl0J3MgZ290IGEgaG9zdFxuICAvLyB1c2VyQHNlcnZlciBpcyAqYWx3YXlzKiBpbnRlcnByZXRlZCBhcyBhIGhvc3RuYW1lLCBhbmQgdXJsXG4gIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3NcbiAgLy8gaG93IHRoZSBicm93c2VyIHJlc29sdmVzIHJlbGF0aXZlIFVSTHMuXG4gIGlmIChzbGFzaGVzRGVub3RlSG9zdCB8fCBwcm90byB8fCByZXN0Lm1hdGNoKC9eXFwvXFwvW15AXFwvXStAW15AXFwvXSsvKSkge1xuICAgIHZhciBzbGFzaGVzID0gcmVzdC5zdWJzdHIoMCwgMikgPT09ICcvLyc7XG4gICAgaWYgKHNsYXNoZXMgJiYgIShwcm90byAmJiBob3N0bGVzc1Byb3RvY29sW3Byb3RvXSkpIHtcbiAgICAgIHJlc3QgPSByZXN0LnN1YnN0cigyKTtcbiAgICAgIHRoaXMuc2xhc2hlcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFob3N0bGVzc1Byb3RvY29sW3Byb3RvXSAmJlxuICAgICAgKHNsYXNoZXMgfHwgKHByb3RvICYmICFzbGFzaGVkUHJvdG9jb2xbcHJvdG9dKSkpIHtcblxuICAgIC8vIHRoZXJlJ3MgYSBob3N0bmFtZS5cbiAgICAvLyB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgLywgPywgOywgb3IgIyBlbmRzIHRoZSBob3N0LlxuICAgIC8vXG4gICAgLy8gSWYgdGhlcmUgaXMgYW4gQCBpbiB0aGUgaG9zdG5hbWUsIHRoZW4gbm9uLWhvc3QgY2hhcnMgKmFyZSogYWxsb3dlZFxuICAgIC8vIHRvIHRoZSBsZWZ0IG9mIHRoZSBsYXN0IEAgc2lnbiwgdW5sZXNzIHNvbWUgaG9zdC1lbmRpbmcgY2hhcmFjdGVyXG4gICAgLy8gY29tZXMgKmJlZm9yZSogdGhlIEAtc2lnbi5cbiAgICAvLyBVUkxzIGFyZSBvYm5veGlvdXMuXG4gICAgLy9cbiAgICAvLyBleDpcbiAgICAvLyBodHRwOi8vYUBiQGMvID0+IHVzZXI6YUBiIGhvc3Q6Y1xuICAgIC8vIGh0dHA6Ly9hQGI/QGMgPT4gdXNlcjphIGhvc3Q6YyBwYXRoOi8/QGNcblxuICAgIC8vIHYwLjEyIFRPRE8oaXNhYWNzKTogVGhpcyBpcyBub3QgcXVpdGUgaG93IENocm9tZSBkb2VzIHRoaW5ncy5cbiAgICAvLyBSZXZpZXcgb3VyIHRlc3QgY2FzZSBhZ2FpbnN0IGJyb3dzZXJzIG1vcmUgY29tcHJlaGVuc2l2ZWx5LlxuXG4gICAgLy8gZmluZCB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgYW55IGhvc3RFbmRpbmdDaGFyc1xuICAgIHZhciBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3N0RW5kaW5nQ2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2YoaG9zdEVuZGluZ0NoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG5cbiAgICAvLyBhdCB0aGlzIHBvaW50LCBlaXRoZXIgd2UgaGF2ZSBhbiBleHBsaWNpdCBwb2ludCB3aGVyZSB0aGVcbiAgICAvLyBhdXRoIHBvcnRpb24gY2Fubm90IGdvIHBhc3QsIG9yIHRoZSBsYXN0IEAgY2hhciBpcyB0aGUgZGVjaWRlci5cbiAgICB2YXIgYXV0aCwgYXRTaWduO1xuICAgIGlmIChob3N0RW5kID09PSAtMSkge1xuICAgICAgLy8gYXRTaWduIGNhbiBiZSBhbnl3aGVyZS5cbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXRTaWduIG11c3QgYmUgaW4gYXV0aCBwb3J0aW9uLlxuICAgICAgLy8gaHR0cDovL2FAYi9jQGQgPT4gaG9zdDpiIGF1dGg6YSBwYXRoOi9jQGRcbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnLCBob3N0RW5kKTtcbiAgICB9XG5cbiAgICAvLyBOb3cgd2UgaGF2ZSBhIHBvcnRpb24gd2hpY2ggaXMgZGVmaW5pdGVseSB0aGUgYXV0aC5cbiAgICAvLyBQdWxsIHRoYXQgb2ZmLlxuICAgIGlmIChhdFNpZ24gIT09IC0xKSB7XG4gICAgICBhdXRoID0gcmVzdC5zbGljZSgwLCBhdFNpZ24pO1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoYXRTaWduICsgMSk7XG4gICAgICB0aGlzLmF1dGggPSBkZWNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgfVxuXG4gICAgLy8gdGhlIGhvc3QgaXMgdGhlIHJlbWFpbmluZyB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3Qgbm9uLWhvc3QgY2hhclxuICAgIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vbkhvc3RDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihub25Ib3N0Q2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKVxuICAgICAgaG9zdEVuZCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVzdC5zbGljZSgwLCBob3N0RW5kKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZShob3N0RW5kKTtcblxuICAgIC8vIHB1bGwgb3V0IHBvcnQuXG4gICAgdGhpcy5wYXJzZUhvc3QoKTtcblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblxuICAgIC8vIGlmIGhvc3RuYW1lIGJlZ2lucyB3aXRoIFsgYW5kIGVuZHMgd2l0aCBdXG4gICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG4gICAgdmFyIGlwdjZIb3N0bmFtZSA9IHRoaXMuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICB0aGlzLmhvc3RuYW1lW3RoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMV0gPT09ICddJztcblxuICAgIC8vIHZhbGlkYXRlIGEgbGl0dGxlLlxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGhvc3RwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSBob3N0cGFydHNbaV07XG4gICAgICAgIGlmICghcGFydCkgY29udGludWU7XG4gICAgICAgIGlmICghcGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgIHZhciBuZXdwYXJ0ID0gJyc7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcnQuY2hhckNvZGVBdChqKSA+IDEyNykge1xuICAgICAgICAgICAgICAvLyB3ZSByZXBsYWNlIG5vbi1BU0NJSSBjaGFyIHdpdGggYSB0ZW1wb3JhcnkgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuICAgICAgICAgICAgICAvLyBicm9rZW4gYnkgcmVwbGFjaW5nIG5vbi1BU0NJSSBieSBub3RoaW5nXG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gJ3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3cGFydCArPSBwYXJ0W2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSB0ZXN0IGFnYWluIHdpdGggQVNDSUkgY2hhciBvbmx5XG4gICAgICAgICAgaWYgKCFuZXdwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHZhciBub3RIb3N0ID0gaG9zdHBhcnRzLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIHZhciBiaXQgPSBwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgdmFsaWRQYXJ0cy5wdXNoKGJpdFsxXSk7XG4gICAgICAgICAgICAgIG5vdEhvc3QudW5zaGlmdChiaXRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdEhvc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSAnLycgKyBub3RIb3N0LmpvaW4oJy4nKSArIHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZS5sZW5ndGggPiBob3N0bmFtZU1heExlbikge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBob3N0bmFtZXMgYXJlIGFsd2F5cyBsb3dlciBjYXNlLlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgLy8gSUROQSBTdXBwb3J0OiBSZXR1cm5zIGEgcHVueWNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG4gICAgICAvLyBJdCBvbmx5IGNvbnZlcnRzIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB0aGF0XG4gICAgICAvLyBoYXZlIG5vbi1BU0NJSSBjaGFyYWN0ZXJzLCBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmXG4gICAgICAvLyB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQgYWxyZWFkeSBpcyBBU0NJSS1vbmx5LlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHB1bnljb2RlLnRvQVNDSUkodGhpcy5ob3N0bmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIHAgPSB0aGlzLnBvcnQgPyAnOicgKyB0aGlzLnBvcnQgOiAnJztcbiAgICB2YXIgaCA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG4gICAgdGhpcy5ob3N0ID0gaCArIHA7XG4gICAgdGhpcy5ocmVmICs9IHRoaXMuaG9zdDtcblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuICAgIGlmIChpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnN1YnN0cigxLCB0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgaWYgKHJlc3RbMF0gIT09ICcvJykge1xuICAgICAgICByZXN0ID0gJy8nICsgcmVzdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBub3cgcmVzdCBpcyBzZXQgdG8gdGhlIHBvc3QtaG9zdCBzdHVmZi5cbiAgLy8gY2hvcCBvZmYgYW55IGRlbGltIGNoYXJzLlxuICBpZiAoIXVuc2FmZVByb3RvY29sW2xvd2VyUHJvdG9dKSB7XG5cbiAgICAvLyBGaXJzdCwgbWFrZSAxMDAlIHN1cmUgdGhhdCBhbnkgXCJhdXRvRXNjYXBlXCIgY2hhcnMgZ2V0XG4gICAgLy8gZXNjYXBlZCwgZXZlbiBpZiBlbmNvZGVVUklDb21wb25lbnQgZG9lc24ndCB0aGluayB0aGV5XG4gICAgLy8gbmVlZCB0byBiZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF1dG9Fc2NhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgYWUgPSBhdXRvRXNjYXBlW2ldO1xuICAgICAgaWYgKHJlc3QuaW5kZXhPZihhZSkgPT09IC0xKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHZhciBlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoYWUpO1xuICAgICAgaWYgKGVzYyA9PT0gYWUpIHtcbiAgICAgICAgZXNjID0gZXNjYXBlKGFlKTtcbiAgICAgIH1cbiAgICAgIHJlc3QgPSByZXN0LnNwbGl0KGFlKS5qb2luKGVzYyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBjaG9wIG9mZiBmcm9tIHRoZSB0YWlsIGZpcnN0LlxuICB2YXIgaGFzaCA9IHJlc3QuaW5kZXhPZignIycpO1xuICBpZiAoaGFzaCAhPT0gLTEpIHtcbiAgICAvLyBnb3QgYSBmcmFnbWVudCBzdHJpbmcuXG4gICAgdGhpcy5oYXNoID0gcmVzdC5zdWJzdHIoaGFzaCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgaGFzaCk7XG4gIH1cbiAgdmFyIHFtID0gcmVzdC5pbmRleE9mKCc/Jyk7XG4gIGlmIChxbSAhPT0gLTEpIHtcbiAgICB0aGlzLnNlYXJjaCA9IHJlc3Quc3Vic3RyKHFtKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcmVzdC5zdWJzdHIocW0gKyAxKTtcbiAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMucXVlcnkpO1xuICAgIH1cbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBxbSk7XG4gIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgIC8vIG5vIHF1ZXJ5IHN0cmluZywgYnV0IHBhcnNlUXVlcnlTdHJpbmcgc3RpbGwgcmVxdWVzdGVkXG4gICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICB0aGlzLnF1ZXJ5ID0ge307XG4gIH1cbiAgaWYgKHJlc3QpIHRoaXMucGF0aG5hbWUgPSByZXN0O1xuICBpZiAoc2xhc2hlZFByb3RvY29sW2xvd2VyUHJvdG9dICYmXG4gICAgICB0aGlzLmhvc3RuYW1lICYmICF0aGlzLnBhdGhuYW1lKSB7XG4gICAgdGhpcy5wYXRobmFtZSA9ICcvJztcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgaWYgKHRoaXMucGF0aG5hbWUgfHwgdGhpcy5zZWFyY2gpIHtcbiAgICB2YXIgcCA9IHRoaXMucGF0aG5hbWUgfHwgJyc7XG4gICAgdmFyIHMgPSB0aGlzLnNlYXJjaCB8fCAnJztcbiAgICB0aGlzLnBhdGggPSBwICsgcztcbiAgfVxuXG4gIC8vIGZpbmFsbHksIHJlY29uc3RydWN0IHRoZSBocmVmIGJhc2VkIG9uIHdoYXQgaGFzIGJlZW4gdmFsaWRhdGVkLlxuICB0aGlzLmhyZWYgPSB0aGlzLmZvcm1hdCgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGZvcm1hdCBhIHBhcnNlZCBvYmplY3QgaW50byBhIHVybCBzdHJpbmdcbmZ1bmN0aW9uIHVybEZvcm1hdChvYmopIHtcbiAgLy8gZW5zdXJlIGl0J3MgYW4gb2JqZWN0LCBhbmQgbm90IGEgc3RyaW5nIHVybC5cbiAgLy8gSWYgaXQncyBhbiBvYmosIHRoaXMgaXMgYSBuby1vcC5cbiAgLy8gdGhpcyB3YXksIHlvdSBjYW4gY2FsbCB1cmxfZm9ybWF0KCkgb24gc3RyaW5nc1xuICAvLyB0byBjbGVhbiB1cCBwb3RlbnRpYWxseSB3b25reSB1cmxzLlxuICBpZiAodXRpbC5pc1N0cmluZyhvYmopKSBvYmogPSB1cmxQYXJzZShvYmopO1xuICBpZiAoIShvYmogaW5zdGFuY2VvZiBVcmwpKSByZXR1cm4gVXJsLnByb3RvdHlwZS5mb3JtYXQuY2FsbChvYmopO1xuICByZXR1cm4gb2JqLmZvcm1hdCgpO1xufVxuXG5VcmwucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXV0aCA9IHRoaXMuYXV0aCB8fCAnJztcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCAnOicpO1xuICAgIGF1dGggKz0gJ0AnO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdGhpcy5wcm90b2NvbCB8fCAnJyxcbiAgICAgIHBhdGhuYW1lID0gdGhpcy5wYXRobmFtZSB8fCAnJyxcbiAgICAgIGhhc2ggPSB0aGlzLmhhc2ggfHwgJycsXG4gICAgICBob3N0ID0gZmFsc2UsXG4gICAgICBxdWVyeSA9ICcnO1xuXG4gIGlmICh0aGlzLmhvc3QpIHtcbiAgICBob3N0ID0gYXV0aCArIHRoaXMuaG9zdDtcbiAgfSBlbHNlIGlmICh0aGlzLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAodGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgPT09IC0xID9cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA6XG4gICAgICAgICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScpO1xuICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdGhpcy5wb3J0O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLnF1ZXJ5ICYmXG4gICAgICB1dGlsLmlzT2JqZWN0KHRoaXMucXVlcnkpICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCB8fCAocXVlcnkgJiYgKCc/JyArIHF1ZXJ5KSkgfHwgJyc7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIC8vIG9ubHkgdGhlIHNsYXNoZWRQcm90b2NvbHMgZ2V0IHRoZSAvLy4gIE5vdCBtYWlsdG86LCB4bXBwOiwgZXRjLlxuICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuICBpZiAodGhpcy5zbGFzaGVzIHx8XG4gICAgICAoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbFtwcm90b2NvbF0pICYmIGhvc3QgIT09IGZhbHNlKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lO1xuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnO1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2g7XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblxuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZShzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgcmV0dXJuIHRoaXMucmVzb2x2ZU9iamVjdCh1cmxQYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpKS5mb3JtYXQoKTtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHJlbGF0aXZlO1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIGlmICh1dGlsLmlzU3RyaW5nKHJlbGF0aXZlKSkge1xuICAgIHZhciByZWwgPSBuZXcgVXJsKCk7XG4gICAgcmVsLnBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgcmVsYXRpdmUgPSByZWw7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFVybCgpO1xuICB2YXIgdGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgZm9yICh2YXIgdGsgPSAwOyB0ayA8IHRrZXlzLmxlbmd0aDsgdGsrKykge1xuICAgIHZhciB0a2V5ID0gdGtleXNbdGtdO1xuICAgIHJlc3VsdFt0a2V5XSA9IHRoaXNbdGtleV07XG4gIH1cblxuICAvLyBoYXNoIGlzIGFsd2F5cyBvdmVycmlkZGVuLCBubyBtYXR0ZXIgd2hhdC5cbiAgLy8gZXZlbiBocmVmPVwiXCIgd2lsbCByZW1vdmUgaXQuXG4gIHJlc3VsdC5oYXNoID0gcmVsYXRpdmUuaGFzaDtcblxuICAvLyBpZiB0aGUgcmVsYXRpdmUgdXJsIGlzIGVtcHR5LCB0aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIGRvIGhlcmUuXG4gIGlmIChyZWxhdGl2ZS5ocmVmID09PSAnJykge1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBocmVmcyBsaWtlIC8vZm9vL2JhciBhbHdheXMgY3V0IHRvIHRoZSBwcm90b2NvbC5cbiAgaWYgKHJlbGF0aXZlLnNsYXNoZXMgJiYgIXJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgLy8gdGFrZSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgcHJvdG9jb2wgZnJvbSByZWxhdGl2ZVxuICAgIHZhciBya2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICBmb3IgKHZhciByayA9IDA7IHJrIDwgcmtleXMubGVuZ3RoOyByaysrKSB7XG4gICAgICB2YXIgcmtleSA9IHJrZXlzW3JrXTtcbiAgICAgIGlmIChya2V5ICE9PSAncHJvdG9jb2wnKVxuICAgICAgICByZXN1bHRbcmtleV0gPSByZWxhdGl2ZVtya2V5XTtcbiAgICB9XG5cbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXSAmJlxuICAgICAgICByZXN1bHQuaG9zdG5hbWUgJiYgIXJlc3VsdC5wYXRobmFtZSkge1xuICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuXG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChyZWxhdGl2ZS5wcm90b2NvbCAmJiByZWxhdGl2ZS5wcm90b2NvbCAhPT0gcmVzdWx0LnByb3RvY29sKSB7XG4gICAgLy8gaWYgaXQncyBhIGtub3duIHVybCBwcm90b2NvbCwgdGhlbiBjaGFuZ2luZ1xuICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuICAgIC8vIGZpcnN0LCBpZiBpdCdzIG5vdCBmaWxlOiwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBob3N0LFxuICAgIC8vIGFuZCBpZiB0aGVyZSB3YXMgYSBwYXRoXG4gICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuICAgIC8vIGlmIGl0IGlzIGZpbGU6LCB0aGVuIHRoZSBob3N0IGlzIGRyb3BwZWQsXG4gICAgLy8gYmVjYXVzZSB0aGF0J3Mga25vd24gdG8gYmUgaG9zdGxlc3MuXG4gICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuICAgIGlmICghc2xhc2hlZFByb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgICBmb3IgKHZhciB2ID0gMDsgdiA8IGtleXMubGVuZ3RoOyB2KyspIHtcbiAgICAgICAgdmFyIGsgPSBrZXlzW3ZdO1xuICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQucHJvdG9jb2wgPSByZWxhdGl2ZS5wcm90b2NvbDtcbiAgICBpZiAoIXJlbGF0aXZlLmhvc3QgJiYgIWhvc3RsZXNzUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIHdoaWxlIChyZWxQYXRoLmxlbmd0aCAmJiAhKHJlbGF0aXZlLmhvc3QgPSByZWxQYXRoLnNoaWZ0KCkpKTtcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdCkgcmVsYXRpdmUuaG9zdCA9ICcnO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcbiAgICAgIGlmIChyZWxQYXRoWzBdICE9PSAnJykgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIGlmIChyZWxQYXRoLmxlbmd0aCA8IDIpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxQYXRoLmpvaW4oJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsYXRpdmUucGF0aG5hbWU7XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgcmVzdWx0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0IHx8ICcnO1xuICAgIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0O1xuICAgIHJlc3VsdC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAvLyB0byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQucGF0aG5hbWUgfHwgcmVzdWx0LnNlYXJjaCkge1xuICAgICAgdmFyIHAgPSByZXN1bHQucGF0aG5hbWUgfHwgJyc7XG4gICAgICB2YXIgcyA9IHJlc3VsdC5zZWFyY2ggfHwgJyc7XG4gICAgICByZXN1bHQucGF0aCA9IHAgKyBzO1xuICAgIH1cbiAgICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBpc1NvdXJjZUFicyA9IChyZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcbiAgICAgIGlzUmVsQWJzID0gKFxuICAgICAgICAgIHJlbGF0aXZlLmhvc3QgfHxcbiAgICAgICAgICByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJ1xuICAgICAgKSxcbiAgICAgIG11c3RFbmRBYnMgPSAoaXNSZWxBYnMgfHwgaXNTb3VyY2VBYnMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5ob3N0ICYmIHJlbGF0aXZlLnBhdGhuYW1lKSksXG4gICAgICByZW1vdmVBbGxEb3RzID0gbXVzdEVuZEFicyxcbiAgICAgIHNyY1BhdGggPSByZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICByZWxQYXRoID0gcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHBzeWNob3RpYyA9IHJlc3VsdC5wcm90b2NvbCAmJiAhc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF07XG5cbiAgLy8gaWYgdGhlIHVybCBpcyBhIG5vbi1zbGFzaGVkIHVybCwgdGhlbiByZWxhdGl2ZVxuICAvLyBsaW5rcyBsaWtlIC4uLy4uIHNob3VsZCBiZSBhYmxlXG4gIC8vIHRvIGNyYXdsIHVwIHRvIHRoZSBob3N0bmFtZSwgYXMgd2VsbC4gIFRoaXMgaXMgc3RyYW5nZS5cbiAgLy8gcmVzdWx0LnByb3RvY29sIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IG5vdy5cbiAgLy8gTGF0ZXIgb24sIHB1dCB0aGUgZmlyc3QgcGF0aCBwYXJ0IGludG8gdGhlIGhvc3QgZmllbGQuXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAnJztcbiAgICByZXN1bHQucG9ydCA9IG51bGw7XG4gICAgaWYgKHJlc3VsdC5ob3N0KSB7XG4gICAgICBpZiAoc3JjUGF0aFswXSA9PT0gJycpIHNyY1BhdGhbMF0gPSByZXN1bHQuaG9zdDtcbiAgICAgIGVsc2Ugc3JjUGF0aC51bnNoaWZ0KHJlc3VsdC5ob3N0KTtcbiAgICB9XG4gICAgcmVzdWx0Lmhvc3QgPSAnJztcbiAgICBpZiAocmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAgIHJlbGF0aXZlLmhvc3RuYW1lID0gbnVsbDtcbiAgICAgIHJlbGF0aXZlLnBvcnQgPSBudWxsO1xuICAgICAgaWYgKHJlbGF0aXZlLmhvc3QpIHtcbiAgICAgICAgaWYgKHJlbFBhdGhbMF0gPT09ICcnKSByZWxQYXRoWzBdID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgZWxzZSByZWxQYXRoLnVuc2hpZnQocmVsYXRpdmUuaG9zdCk7XG4gICAgICB9XG4gICAgICByZWxhdGl2ZS5ob3N0ID0gbnVsbDtcbiAgICB9XG4gICAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgJiYgKHJlbFBhdGhbMF0gPT09ICcnIHx8IHNyY1BhdGhbMF0gPT09ICcnKTtcbiAgfVxuXG4gIGlmIChpc1JlbEFicykge1xuICAgIC8vIGl0J3MgYWJzb2x1dGUuXG4gICAgcmVzdWx0Lmhvc3QgPSAocmVsYXRpdmUuaG9zdCB8fCByZWxhdGl2ZS5ob3N0ID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdCA6IHJlc3VsdC5ob3N0O1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IChyZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0bmFtZSA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA6IHJlc3VsdC5ob3N0bmFtZTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHNyY1BhdGggPSByZWxQYXRoO1xuICAgIC8vIGZhbGwgdGhyb3VnaCB0byB0aGUgZG90LWhhbmRsaW5nIGJlbG93LlxuICB9IGVsc2UgaWYgKHJlbFBhdGgubGVuZ3RoKSB7XG4gICAgLy8gaXQncyByZWxhdGl2ZVxuICAgIC8vIHRocm93IGF3YXkgdGhlIGV4aXN0aW5nIGZpbGUsIGFuZCB0YWtlIHRoZSBuZXcgcGF0aCBpbnN0ZWFkLlxuICAgIGlmICghc3JjUGF0aCkgc3JjUGF0aCA9IFtdO1xuICAgIHNyY1BhdGgucG9wKCk7XG4gICAgc3JjUGF0aCA9IHNyY1BhdGguY29uY2F0KHJlbFBhdGgpO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gIH0gZWxzZSBpZiAoIXV0aWwuaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgLy8gbm8gcGF0aCBhdCBhbGwuICBlYXN5LlxuICAgIC8vIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCB0aGUgb3RoZXIgc3R1ZmYgYWJvdmUuXG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gJy8nICsgcmVzdWx0LnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaWYgYSB1cmwgRU5EcyBpbiAuIG9yIC4uLCB0aGVuIGl0IG11c3QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIC8vIGhvd2V2ZXIsIGlmIGl0IGVuZHMgaW4gYW55dGhpbmcgZWxzZSBub24tc2xhc2h5LFxuICAvLyB0aGVuIGl0IG11c3QgTk9UIGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgbGFzdCA9IHNyY1BhdGguc2xpY2UoLTEpWzBdO1xuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IChcbiAgICAgIChyZXN1bHQuaG9zdCB8fCByZWxhdGl2ZS5ob3N0IHx8IHNyY1BhdGgubGVuZ3RoID4gMSkgJiZcbiAgICAgIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgfHwgbGFzdCA9PT0gJycpO1xuXG4gIC8vIHN0cmlwIHNpbmdsZSBkb3RzLCByZXNvbHZlIGRvdWJsZSBkb3RzIHRvIHBhcmVudCBkaXJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHNyY1BhdGgubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIGxhc3QgPSBzcmNQYXRoW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmICghbXVzdEVuZEFicyAmJiAhcmVtb3ZlQWxsRG90cykge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgc3JjUGF0aC51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtdXN0RW5kQWJzICYmIHNyY1BhdGhbMF0gIT09ICcnICYmXG4gICAgICAoIXNyY1BhdGhbMF0gfHwgc3JjUGF0aFswXS5jaGFyQXQoMCkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgKHNyY1BhdGguam9pbignLycpLnN1YnN0cigtMSkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnB1c2goJycpO1xuICB9XG5cbiAgdmFyIGlzQWJzb2x1dGUgPSBzcmNQYXRoWzBdID09PSAnJyB8fFxuICAgICAgKHNyY1BhdGhbMF0gJiYgc3JjUGF0aFswXS5jaGFyQXQoMCkgPT09ICcvJyk7XG5cbiAgLy8gcHV0IHRoZSBob3N0IGJhY2tcbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gaXNBYnNvbHV0ZSA/ICcnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BhdGgubGVuZ3RoID8gc3JjUGF0aC5zaGlmdCgpIDogJyc7XG4gICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyB8fCAocmVzdWx0Lmhvc3QgJiYgc3JjUGF0aC5sZW5ndGgpO1xuXG4gIGlmIChtdXN0RW5kQWJzICYmICFpc0Fic29sdXRlKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBzcmNQYXRoLmpvaW4oJy8nKTtcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCByZXF1ZXN0Lmh0dHBcbiAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gIH1cbiAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcbiAgICB9XG4gICAgaG9zdCA9IGhvc3Quc3Vic3RyKDAsIGhvc3QubGVuZ3RoIC0gcG9ydC5sZW5ndGgpO1xuICB9XG4gIGlmIChob3N0KSB0aGlzLmhvc3RuYW1lID0gaG9zdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1N0cmluZzogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHR5cGVvZihhcmcpID09PSAnc3RyaW5nJztcbiAgfSxcbiAgaXNPYmplY3Q6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xuICB9LFxuICBpc051bGw6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBhcmcgPT09IG51bGw7XG4gIH0sXG4gIGlzTnVsbE9yVW5kZWZpbmVkOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09IG51bGw7XG4gIH1cbn07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZGFzaGJvYXJkLnNhc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTUtMiEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2Rhc2hib2FyZC5zYXNzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS0yIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZGFzaGJvYXJkLnNhc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTQ3NTUwOTA5NzE1XG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICIsImltcG9ydCAnLi9kYXNoYm9hcmQuc2Fzcyc7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=