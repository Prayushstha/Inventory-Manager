import { createRequire } from "node:module";
import { BrowserWindow, Menu, app, dialog, ipcMain, net, protocol, shell } from "electron";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs";
import { createRequire as createRequire$1 } from "module";
import { randomUUID } from "crypto";
import fs$1 from "node:fs";
import path$1 from "node:path";
import { randomUUID as randomUUID$1 } from "node:crypto";
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ createRequire(import.meta.url);
//#endregion
//#region node_modules/better-sqlite3/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.getBooleanOption = (options, key) => {
		let value = false;
		if (key in options && typeof (value = options[key]) !== "boolean") throw new TypeError(`Expected the "${key}" option to be a boolean`);
		return value;
	};
	exports.cppdb = Symbol();
	exports.inspect = Symbol.for("nodejs.util.inspect.custom");
}));
//#endregion
//#region node_modules/better-sqlite3/lib/sqlite-error.js
var require_sqlite_error = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var descriptor = {
		value: "SqliteError",
		writable: true,
		enumerable: false,
		configurable: true
	};
	function SqliteError(message, code) {
		if (new.target !== SqliteError) return new SqliteError(message, code);
		if (typeof code !== "string") throw new TypeError("Expected second argument to be a string");
		Error.call(this, message);
		descriptor.value = "" + message;
		Object.defineProperty(this, "message", descriptor);
		Error.captureStackTrace(this, SqliteError);
		this.code = code;
	}
	Object.setPrototypeOf(SqliteError, Error);
	Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
	Object.defineProperty(SqliteError.prototype, "name", descriptor);
	module.exports = SqliteError;
}));
//#endregion
//#region node_modules/file-uri-to-path/index.js
var require_file_uri_to_path = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var sep = __require("path").sep || "/";
	/**
	* Module exports.
	*/
	module.exports = fileUriToPath;
	/**
	* File URI to Path function.
	*
	* @param {String} uri
	* @return {String} path
	* @api public
	*/
	function fileUriToPath(uri) {
		if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) throw new TypeError("must pass in a file:// URI to convert to a file path");
		var rest = decodeURI(uri.substring(7));
		var firstSlash = rest.indexOf("/");
		var host = rest.substring(0, firstSlash);
		var path = rest.substring(firstSlash + 1);
		if ("localhost" == host) host = "";
		if (host) host = sep + sep + host;
		path = path.replace(/^(.+)\|/, "$1:");
		if (sep == "\\") path = path.replace(/\//g, "\\");
		if (/^.+\:/.test(path)) {} else path = sep + path;
		return host + path;
	}
}));
//#endregion
//#region node_modules/bindings/bindings.js
var require_bindings = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Module dependencies.
	*/
	var fs$4 = __require("fs"), path$4 = __require("path"), fileURLToPath$1 = require_file_uri_to_path(), join = path$4.join, dirname = path$4.dirname, exists = fs$4.accessSync && function(path) {
		try {
			fs$4.accessSync(path);
		} catch (e) {
			return false;
		}
		return true;
	} || fs$4.existsSync || path$4.existsSync, defaults = {
		arrow: process.env.NODE_BINDINGS_ARROW || " → ",
		compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
		platform: process.platform,
		arch: process.arch,
		nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
		version: process.versions.node,
		bindings: "bindings.node",
		try: [
			[
				"module_root",
				"build",
				"bindings"
			],
			[
				"module_root",
				"build",
				"Debug",
				"bindings"
			],
			[
				"module_root",
				"build",
				"Release",
				"bindings"
			],
			[
				"module_root",
				"out",
				"Debug",
				"bindings"
			],
			[
				"module_root",
				"Debug",
				"bindings"
			],
			[
				"module_root",
				"out",
				"Release",
				"bindings"
			],
			[
				"module_root",
				"Release",
				"bindings"
			],
			[
				"module_root",
				"build",
				"default",
				"bindings"
			],
			[
				"module_root",
				"compiled",
				"version",
				"platform",
				"arch",
				"bindings"
			],
			[
				"module_root",
				"addon-build",
				"release",
				"install-root",
				"bindings"
			],
			[
				"module_root",
				"addon-build",
				"debug",
				"install-root",
				"bindings"
			],
			[
				"module_root",
				"addon-build",
				"default",
				"install-root",
				"bindings"
			],
			[
				"module_root",
				"lib",
				"binding",
				"nodePreGyp",
				"bindings"
			]
		]
	};
	/**
	* The main `bindings()` function loads the compiled bindings for a given module.
	* It uses V8's Error API to determine the parent filename that this function is
	* being invoked from, which is then used to find the root directory.
	*/
	function bindings(opts) {
		if (typeof opts == "string") opts = { bindings: opts };
		else if (!opts) opts = {};
		Object.keys(defaults).map(function(i) {
			if (!(i in opts)) opts[i] = defaults[i];
		});
		if (!opts.module_root) opts.module_root = exports.getRoot(exports.getFileName());
		if (path$4.extname(opts.bindings) != ".node") opts.bindings += ".node";
		var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : __require;
		var tries = [], i = 0, l = opts.try.length, n, b, err;
		for (; i < l; i++) {
			n = join.apply(null, opts.try[i].map(function(p) {
				return opts[p] || p;
			}));
			tries.push(n);
			try {
				b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
				if (!opts.path) b.path = n;
				return b;
			} catch (e) {
				if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) throw e;
			}
		}
		err = /* @__PURE__ */ new Error("Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
			return opts.arrow + a;
		}).join("\n"));
		err.tries = tries;
		throw err;
	}
	module.exports = exports = bindings;
	/**
	* Gets the filename of the JavaScript file that invokes this function.
	* Used to help find the root directory of a module.
	* Optionally accepts an filename argument to skip when searching for the invoking filename
	*/
	exports.getFileName = function getFileName(calling_file) {
		var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
		Error.stackTraceLimit = 10;
		Error.prepareStackTrace = function(e, st) {
			for (var i = 0, l = st.length; i < l; i++) {
				fileName = st[i].getFileName();
				if (fileName !== __filename) if (calling_file) {
					if (fileName !== calling_file) return;
				} else return;
			}
		};
		Error.captureStackTrace(dummy);
		dummy.stack;
		Error.prepareStackTrace = origPST;
		Error.stackTraceLimit = origSTL;
		if (fileName.indexOf("file://") === 0) fileName = fileURLToPath$1(fileName);
		return fileName;
	};
	/**
	* Gets the root directory of a module, given an arbitrary filename
	* somewhere in the module tree. The "root directory" is the directory
	* containing the `package.json` file.
	*
	*   In:  /home/nate/node-native-module/lib/index.js
	*   Out: /home/nate/node-native-module
	*/
	exports.getRoot = function getRoot(file) {
		var dir = dirname(file), prev;
		while (true) {
			if (dir === ".") dir = process.cwd();
			if (exists(join(dir, "package.json")) || exists(join(dir, "node_modules"))) return dir;
			if (prev === dir) throw new Error("Could not find module root given file: \"" + file + "\". Do you have a `package.json` file? ");
			prev = dir;
			dir = join(dir, "..");
		}
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/wrappers.js
var require_wrappers = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { cppdb } = require_util();
	exports.prepare = function prepare(sql) {
		return this[cppdb].prepare(sql, this, false);
	};
	exports.exec = function exec(sql) {
		this[cppdb].exec(sql);
		return this;
	};
	exports.close = function close() {
		this[cppdb].close();
		return this;
	};
	exports.loadExtension = function loadExtension(...args) {
		this[cppdb].loadExtension(...args);
		return this;
	};
	exports.defaultSafeIntegers = function defaultSafeIntegers(...args) {
		this[cppdb].defaultSafeIntegers(...args);
		return this;
	};
	exports.unsafeMode = function unsafeMode(...args) {
		this[cppdb].unsafeMode(...args);
		return this;
	};
	exports.getters = {
		name: {
			get: function name() {
				return this[cppdb].name;
			},
			enumerable: true
		},
		open: {
			get: function open() {
				return this[cppdb].open;
			},
			enumerable: true
		},
		inTransaction: {
			get: function inTransaction() {
				return this[cppdb].inTransaction;
			},
			enumerable: true
		},
		readonly: {
			get: function readonly() {
				return this[cppdb].readonly;
			},
			enumerable: true
		},
		memory: {
			get: function memory() {
				return this[cppdb].memory;
			},
			enumerable: true
		}
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/transaction.js
var require_transaction = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { cppdb } = require_util();
	var controllers = /* @__PURE__ */ new WeakMap();
	module.exports = function transaction(fn) {
		if (typeof fn !== "function") throw new TypeError("Expected first argument to be a function");
		const db = this[cppdb];
		const controller = getController(db, this);
		const { apply } = Function.prototype;
		const properties = {
			default: { value: wrapTransaction(apply, fn, db, controller.default) },
			deferred: { value: wrapTransaction(apply, fn, db, controller.deferred) },
			immediate: { value: wrapTransaction(apply, fn, db, controller.immediate) },
			exclusive: { value: wrapTransaction(apply, fn, db, controller.exclusive) },
			database: {
				value: this,
				enumerable: true
			}
		};
		Object.defineProperties(properties.default.value, properties);
		Object.defineProperties(properties.deferred.value, properties);
		Object.defineProperties(properties.immediate.value, properties);
		Object.defineProperties(properties.exclusive.value, properties);
		return properties.default.value;
	};
	var getController = (db, self) => {
		let controller = controllers.get(db);
		if (!controller) {
			const shared = {
				commit: db.prepare("COMMIT", self, false),
				rollback: db.prepare("ROLLBACK", self, false),
				savepoint: db.prepare("SAVEPOINT `	_bs3.	`", self, false),
				release: db.prepare("RELEASE `	_bs3.	`", self, false),
				rollbackTo: db.prepare("ROLLBACK TO `	_bs3.	`", self, false)
			};
			controllers.set(db, controller = {
				default: Object.assign({ begin: db.prepare("BEGIN", self, false) }, shared),
				deferred: Object.assign({ begin: db.prepare("BEGIN DEFERRED", self, false) }, shared),
				immediate: Object.assign({ begin: db.prepare("BEGIN IMMEDIATE", self, false) }, shared),
				exclusive: Object.assign({ begin: db.prepare("BEGIN EXCLUSIVE", self, false) }, shared)
			});
		}
		return controller;
	};
	var wrapTransaction = (apply, fn, db, { begin, commit, rollback, savepoint, release, rollbackTo }) => function sqliteTransaction() {
		let before, after, undo;
		if (db.inTransaction) {
			before = savepoint;
			after = release;
			undo = rollbackTo;
		} else {
			before = begin;
			after = commit;
			undo = rollback;
		}
		before.run();
		try {
			const result = apply.call(fn, this, arguments);
			if (result && typeof result.then === "function") throw new TypeError("Transaction function cannot return a promise");
			after.run();
			return result;
		} catch (ex) {
			if (db.inTransaction) {
				undo.run();
				if (undo !== rollback) after.run();
			}
			throw ex;
		}
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/pragma.js
var require_pragma = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { getBooleanOption, cppdb } = require_util();
	module.exports = function pragma(source, options) {
		if (options == null) options = {};
		if (typeof source !== "string") throw new TypeError("Expected first argument to be a string");
		if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
		const simple = getBooleanOption(options, "simple");
		const stmt = this[cppdb].prepare(`PRAGMA ${source}`, this, true);
		return simple ? stmt.pluck().get() : stmt.all();
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/backup.js
var require_backup = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$3 = __require("fs");
	var path$3 = __require("path");
	var { promisify } = __require("util");
	var { cppdb } = require_util();
	var fsAccess = promisify(fs$3.access);
	module.exports = async function backup(filename, options) {
		if (options == null) options = {};
		if (typeof filename !== "string") throw new TypeError("Expected first argument to be a string");
		if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
		filename = filename.trim();
		const attachedName = "attached" in options ? options.attached : "main";
		const handler = "progress" in options ? options.progress : null;
		if (!filename) throw new TypeError("Backup filename cannot be an empty string");
		if (filename === ":memory:") throw new TypeError("Invalid backup filename \":memory:\"");
		if (typeof attachedName !== "string") throw new TypeError("Expected the \"attached\" option to be a string");
		if (!attachedName) throw new TypeError("The \"attached\" option cannot be an empty string");
		if (handler != null && typeof handler !== "function") throw new TypeError("Expected the \"progress\" option to be a function");
		await fsAccess(path$3.dirname(filename)).catch(() => {
			throw new TypeError("Cannot save backup because the directory does not exist");
		});
		const isNewFile = await fsAccess(filename).then(() => false, () => true);
		return runBackup(this[cppdb].backup(this, attachedName, filename, isNewFile), handler || null);
	};
	var runBackup = (backup, handler) => {
		let rate = 0;
		let useDefault = true;
		return new Promise((resolve, reject) => {
			setImmediate(function step() {
				try {
					const progress = backup.transfer(rate);
					if (!progress.remainingPages) {
						backup.close();
						resolve(progress);
						return;
					}
					if (useDefault) {
						useDefault = false;
						rate = 100;
					}
					if (handler) {
						const ret = handler(progress);
						if (ret !== void 0) if (typeof ret === "number" && ret === ret) rate = Math.max(0, Math.min(2147483647, Math.round(ret)));
						else throw new TypeError("Expected progress callback to return a number or undefined");
					}
					setImmediate(step);
				} catch (err) {
					backup.close();
					reject(err);
				}
			});
		});
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/serialize.js
var require_serialize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { cppdb } = require_util();
	module.exports = function serialize(options) {
		if (options == null) options = {};
		if (typeof options !== "object") throw new TypeError("Expected first argument to be an options object");
		const attachedName = "attached" in options ? options.attached : "main";
		if (typeof attachedName !== "string") throw new TypeError("Expected the \"attached\" option to be a string");
		if (!attachedName) throw new TypeError("The \"attached\" option cannot be an empty string");
		return this[cppdb].serialize(attachedName);
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/function.js
var require_function = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { getBooleanOption, cppdb } = require_util();
	module.exports = function defineFunction(name, options, fn) {
		if (options == null) options = {};
		if (typeof options === "function") {
			fn = options;
			options = {};
		}
		if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
		if (typeof fn !== "function") throw new TypeError("Expected last argument to be a function");
		if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
		if (!name) throw new TypeError("User-defined function name cannot be an empty string");
		const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
		const deterministic = getBooleanOption(options, "deterministic");
		const directOnly = getBooleanOption(options, "directOnly");
		const varargs = getBooleanOption(options, "varargs");
		let argCount = -1;
		if (!varargs) {
			argCount = fn.length;
			if (!Number.isInteger(argCount) || argCount < 0) throw new TypeError("Expected function.length to be a positive integer");
			if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
		}
		this[cppdb].function(fn, name, argCount, safeIntegers, deterministic, directOnly);
		return this;
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/aggregate.js
var require_aggregate = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { getBooleanOption, cppdb } = require_util();
	module.exports = function defineAggregate(name, options) {
		if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
		if (typeof options !== "object" || options === null) throw new TypeError("Expected second argument to be an options object");
		if (!name) throw new TypeError("User-defined function name cannot be an empty string");
		const start = "start" in options ? options.start : null;
		const step = getFunctionOption(options, "step", true);
		const inverse = getFunctionOption(options, "inverse", false);
		const result = getFunctionOption(options, "result", false);
		const safeIntegers = "safeIntegers" in options ? +getBooleanOption(options, "safeIntegers") : 2;
		const deterministic = getBooleanOption(options, "deterministic");
		const directOnly = getBooleanOption(options, "directOnly");
		const varargs = getBooleanOption(options, "varargs");
		let argCount = -1;
		if (!varargs) {
			argCount = Math.max(getLength(step), inverse ? getLength(inverse) : 0);
			if (argCount > 0) argCount -= 1;
			if (argCount > 100) throw new RangeError("User-defined functions cannot have more than 100 arguments");
		}
		this[cppdb].aggregate(start, step, inverse, result, name, argCount, safeIntegers, deterministic, directOnly);
		return this;
	};
	var getFunctionOption = (options, key, required) => {
		const value = key in options ? options[key] : null;
		if (typeof value === "function") return value;
		if (value != null) throw new TypeError(`Expected the "${key}" option to be a function`);
		if (required) throw new TypeError(`Missing required option "${key}"`);
		return null;
	};
	var getLength = ({ length }) => {
		if (Number.isInteger(length) && length >= 0) return length;
		throw new TypeError("Expected function.length to be a positive integer");
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/table.js
var require_table = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var { cppdb } = require_util();
	module.exports = function defineTable(name, factory) {
		if (typeof name !== "string") throw new TypeError("Expected first argument to be a string");
		if (!name) throw new TypeError("Virtual table module name cannot be an empty string");
		let eponymous = false;
		if (typeof factory === "object" && factory !== null) {
			eponymous = true;
			factory = defer(parseTableDefinition(factory, "used", name));
		} else {
			if (typeof factory !== "function") throw new TypeError("Expected second argument to be a function or a table definition object");
			factory = wrapFactory(factory);
		}
		this[cppdb].table(factory, name, eponymous);
		return this;
	};
	function wrapFactory(factory) {
		return function virtualTableFactory(moduleName, databaseName, tableName, ...args) {
			const thisObject = {
				module: moduleName,
				database: databaseName,
				table: tableName
			};
			const def = apply.call(factory, thisObject, args);
			if (typeof def !== "object" || def === null) throw new TypeError(`Virtual table module "${moduleName}" did not return a table definition object`);
			return parseTableDefinition(def, "returned", moduleName);
		};
	}
	function parseTableDefinition(def, verb, moduleName) {
		if (!hasOwnProperty.call(def, "rows")) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "rows" property`);
		if (!hasOwnProperty.call(def, "columns")) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition without a "columns" property`);
		const rows = def.rows;
		if (typeof rows !== "function" || Object.getPrototypeOf(rows) !== GeneratorFunctionPrototype) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "rows" property (should be a generator function)`);
		let columns = def.columns;
		if (!Array.isArray(columns) || !(columns = [...columns]).every((x) => typeof x === "string")) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "columns" property (should be an array of strings)`);
		if (columns.length !== new Set(columns).size) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate column names`);
		if (!columns.length) throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with zero columns`);
		let parameters;
		if (hasOwnProperty.call(def, "parameters")) {
			parameters = def.parameters;
			if (!Array.isArray(parameters) || !(parameters = [...parameters]).every((x) => typeof x === "string")) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "parameters" property (should be an array of strings)`);
		} else parameters = inferParameters(rows);
		if (parameters.length !== new Set(parameters).size) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with duplicate parameter names`);
		if (parameters.length > 32) throw new RangeError(`Virtual table module "${moduleName}" ${verb} a table definition with more than the maximum number of 32 parameters`);
		for (const parameter of parameters) if (columns.includes(parameter)) throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with column "${parameter}" which was ambiguously defined as both a column and parameter`);
		let safeIntegers = 2;
		if (hasOwnProperty.call(def, "safeIntegers")) {
			const bool = def.safeIntegers;
			if (typeof bool !== "boolean") throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
			safeIntegers = +bool;
		}
		let directOnly = false;
		if (hasOwnProperty.call(def, "directOnly")) {
			directOnly = def.directOnly;
			if (typeof directOnly !== "boolean") throw new TypeError(`Virtual table module "${moduleName}" ${verb} a table definition with an invalid "directOnly" property (should be a boolean)`);
		}
		return [
			`CREATE TABLE x(${[...parameters.map(identifier).map((str) => `${str} HIDDEN`), ...columns.map(identifier)].join(", ")});`,
			wrapGenerator(rows, new Map(columns.map((x, i) => [x, parameters.length + i])), moduleName),
			parameters,
			safeIntegers,
			directOnly
		];
	}
	function wrapGenerator(generator, columnMap, moduleName) {
		return function* virtualTable(...args) {
			const output = args.map((x) => Buffer.isBuffer(x) ? Buffer.from(x) : x);
			for (let i = 0; i < columnMap.size; ++i) output.push(null);
			for (const row of generator(...args)) if (Array.isArray(row)) {
				extractRowArray(row, output, columnMap.size, moduleName);
				yield output;
			} else if (typeof row === "object" && row !== null) {
				extractRowObject(row, output, columnMap, moduleName);
				yield output;
			} else throw new TypeError(`Virtual table module "${moduleName}" yielded something that isn't a valid row object`);
		};
	}
	function extractRowArray(row, output, columnCount, moduleName) {
		if (row.length !== columnCount) throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an incorrect number of columns`);
		const offset = output.length - columnCount;
		for (let i = 0; i < columnCount; ++i) output[i + offset] = row[i];
	}
	function extractRowObject(row, output, columnMap, moduleName) {
		let count = 0;
		for (const key of Object.keys(row)) {
			const index = columnMap.get(key);
			if (index === void 0) throw new TypeError(`Virtual table module "${moduleName}" yielded a row with an undeclared column "${key}"`);
			output[index] = row[key];
			count += 1;
		}
		if (count !== columnMap.size) throw new TypeError(`Virtual table module "${moduleName}" yielded a row with missing columns`);
	}
	function inferParameters({ length }) {
		if (!Number.isInteger(length) || length < 0) throw new TypeError("Expected function.length to be a positive integer");
		const params = [];
		for (let i = 0; i < length; ++i) params.push(`$${i + 1}`);
		return params;
	}
	var { hasOwnProperty } = Object.prototype;
	var { apply } = Function.prototype;
	var GeneratorFunctionPrototype = Object.getPrototypeOf(function* () {});
	var identifier = (str) => `"${str.replace(/"/g, "\"\"")}"`;
	var defer = (x) => () => x;
}));
//#endregion
//#region node_modules/better-sqlite3/lib/methods/inspect.js
var require_inspect = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var DatabaseInspection = function Database() {};
	module.exports = function inspect(depth, opts) {
		return Object.assign(new DatabaseInspection(), this);
	};
}));
//#endregion
//#region node_modules/better-sqlite3/lib/database.js
var require_database = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var fs$2 = __require("fs");
	var path$2 = __require("path");
	var util = require_util();
	var SqliteError = require_sqlite_error();
	var DEFAULT_ADDON;
	function Database(filenameGiven, options) {
		if (new.target == null) return new Database(filenameGiven, options);
		let buffer;
		if (Buffer.isBuffer(filenameGiven)) {
			buffer = filenameGiven;
			filenameGiven = ":memory:";
		}
		if (filenameGiven == null) filenameGiven = "";
		if (options == null) options = {};
		if (typeof filenameGiven !== "string") throw new TypeError("Expected first argument to be a string");
		if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
		if ("readOnly" in options) throw new TypeError("Misspelled option \"readOnly\" should be \"readonly\"");
		if ("memory" in options) throw new TypeError("Option \"memory\" was removed in v7.0.0 (use \":memory:\" filename instead)");
		const filename = filenameGiven.trim();
		const anonymous = filename === "" || filename === ":memory:";
		const readonly = util.getBooleanOption(options, "readonly");
		const fileMustExist = util.getBooleanOption(options, "fileMustExist");
		const timeout = "timeout" in options ? options.timeout : 5e3;
		const verbose = "verbose" in options ? options.verbose : null;
		const nativeBinding = "nativeBinding" in options ? options.nativeBinding : null;
		if (readonly && anonymous && !buffer) throw new TypeError("In-memory/temporary databases cannot be readonly");
		if (!Number.isInteger(timeout) || timeout < 0) throw new TypeError("Expected the \"timeout\" option to be a positive integer");
		if (timeout > 2147483647) throw new RangeError("Option \"timeout\" cannot be greater than 2147483647");
		if (verbose != null && typeof verbose !== "function") throw new TypeError("Expected the \"verbose\" option to be a function");
		if (nativeBinding != null && typeof nativeBinding !== "string" && typeof nativeBinding !== "object") throw new TypeError("Expected the \"nativeBinding\" option to be a string or addon object");
		let addon;
		if (nativeBinding == null) addon = DEFAULT_ADDON || (DEFAULT_ADDON = require_bindings()("better_sqlite3.node"));
		else if (typeof nativeBinding === "string") addon = (typeof __non_webpack_require__ === "function" ? __non_webpack_require__ : __require)(path$2.resolve(nativeBinding).replace(/(\.node)?$/, ".node"));
		else addon = nativeBinding;
		if (!addon.isInitialized) {
			addon.setErrorConstructor(SqliteError);
			addon.isInitialized = true;
		}
		if (!anonymous && !filename.startsWith("file:") && !fs$2.existsSync(path$2.dirname(filename))) throw new TypeError("Cannot open database because the directory does not exist");
		Object.defineProperties(this, {
			[util.cppdb]: { value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null) },
			...wrappers.getters
		});
	}
	var wrappers = require_wrappers();
	Database.prototype.prepare = wrappers.prepare;
	Database.prototype.transaction = require_transaction();
	Database.prototype.pragma = require_pragma();
	Database.prototype.backup = require_backup();
	Database.prototype.serialize = require_serialize();
	Database.prototype.function = require_function();
	Database.prototype.aggregate = require_aggregate();
	Database.prototype.table = require_table();
	Database.prototype.loadExtension = wrappers.loadExtension;
	Database.prototype.exec = wrappers.exec;
	Database.prototype.close = wrappers.close;
	Database.prototype.defaultSafeIntegers = wrappers.defaultSafeIntegers;
	Database.prototype.unsafeMode = wrappers.unsafeMode;
	Database.prototype[util.inspect] = require_inspect();
	module.exports = Database;
}));
//#endregion
//#region src/Backend/validation.js
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_database();
	module.exports.SqliteError = require_sqlite_error();
})))(), 1);
function assert(condition, message) {
	if (!condition) throw new Error(message);
}
function normalizeText(value, fallback = "") {
	if (value === null || value === void 0) return fallback;
	return String(value).trim();
}
function parseRequiredNumber(value, label, { min = Number.NEGATIVE_INFINITY, allowZero = true } = {}) {
	const parsed = Number(value);
	if (!Number.isFinite(parsed)) throw new Error(`${label} must be a valid number.`);
	if (parsed < min) throw new Error(`${label} must be at least ${min}.`);
	if (!allowZero && parsed === 0) throw new Error(`${label} cannot be zero.`);
	return parsed;
}
function validateProduct(product) {
	if (!product || typeof product !== "object") throw new Error("Invalid product payload.");
	const name = normalizeText(product.name);
	assert(name.length > 0, "Product name is required.");
	const variants = Array.isArray(product.variants) ? product.variants : [];
	const bases = Array.isArray(product.bases) ? product.bases : [];
	assert(variants.length > 0 || bases.length > 0, "Product must include at least one variant or base.");
	const nextVariants = variants.map((variant, index) => {
		const bucketSize = parseRequiredNumber(variant?.bucket_size ?? variant?.bucketSize, `Variant ${index + 1} size`, {
			min: 1e-4,
			allowZero: false
		});
		return {
			...variant,
			bucket_size: bucketSize,
			landing: parseRequiredNumber(variant?.landing ?? 0, `Variant ${index + 1} landing`, { min: 0 }),
			sales: parseRequiredNumber(variant?.sales ?? 0, `Variant ${index + 1} sales`, { min: 0 }),
			mp: parseRequiredNumber(variant?.mp ?? 0, `Variant ${index + 1} market price`, { min: 0 })
		};
	});
	const nextBases = bases.map((base, index) => {
		const baseName = normalizeText(base?.name ?? base?.baseName);
		assert(baseName.length > 0, `Base ${index + 1} name is required.`);
		const stocks = Array.isArray(base?.stocks) ? base.stocks : [];
		if (nextVariants.length > 0) assert(stocks.length === nextVariants.length, `Base "${baseName}" must contain stock values for every variant.`);
		return {
			...base,
			name: baseName,
			stocks: stocks.map((stock, stockIndex) => parseRequiredNumber(stock, `Base "${baseName}" stock for variant ${stockIndex + 1}`, { min: 0 }))
		};
	});
	return {
		...product,
		id: normalizeText(product.id, ""),
		name,
		images: product.images ?? "",
		variants: nextVariants,
		bases: nextBases
	};
}
function validateCustomer(customer) {
	if (!customer || typeof customer !== "object") throw new Error("Invalid customer payload.");
	const name = normalizeText(customer.name);
	assert(name.length > 0, "Customer name is required.");
	return {
		...customer,
		name,
		phone: normalizeText(customer.phone, ""),
		address: normalizeText(customer.address, ""),
		notes: normalizeText(customer.notes, "")
	};
}
function validateBillPayload(customerId, bill) {
	if (!bill || typeof bill !== "object") throw new Error("Invalid bill payload.");
	const normalizedCustomerId = Number(customerId);
	assert(Number.isInteger(normalizedCustomerId) && normalizedCustomerId > 0, "A valid customer is required.");
	const date = normalizeText(bill.date);
	assert(date.length > 0, "Bill date is required.");
	const billType = normalizeText(bill.billType ?? bill.bill_type ?? "default").toLowerCase();
	assert([
		"default",
		"pan",
		"vat"
	].includes(billType), "Bill type must be Default, PAN, or VAT.");
	const totalPurchased = parseRequiredNumber(bill.totalPurchased, "Total purchased", { min: 0 });
	const amountPaid = parseRequiredNumber(bill.amountPaid, "Amount paid", { min: 0 });
	const amountDue = parseRequiredNumber(bill.amountDue, "Amount due", { min: 0 });
	assert(Array.isArray(bill.products) && bill.products.length > 0, "Bill must contain at least one product.");
	let computedTotal = 0;
	const items = bill.products.map((item, index) => {
		const productName = normalizeText(item?.productName ?? item?.product_name);
		const base = normalizeText(item?.base);
		const bucketSize = parseRequiredNumber(item?.bucketSize ?? item?.bucket_size, `Item ${index + 1} bucket size`, {
			min: 1e-4,
			allowZero: false
		});
		const quantity = parseRequiredNumber(item?.quantity, `Item ${index + 1} quantity`, {
			min: 1e-4,
			allowZero: false
		});
		const priceAtSale = parseRequiredNumber(item?.priceAtSale ?? item?.price_at_sale ?? 0, `Item ${index + 1} price`, { min: 0 });
		assert(productName.length > 0, `Item ${index + 1} product name is required.`);
		assert(base.length > 0, `Item ${index + 1} base is required.`);
		computedTotal += quantity * priceAtSale;
		return {
			...item,
			productName,
			base,
			bucketSize,
			quantity,
			priceAtSale
		};
	});
	let expectedTotal = computedTotal;
	let invoiceData = null;
	if (billType === "vat") {
		invoiceData = bill.invoiceData && typeof bill.invoiceData === "object" ? bill.invoiceData : {};
		const discount = parseRequiredNumber(invoiceData.discount ?? 0, "Invoice discount", { min: 0 });
		assert(discount <= computedTotal, "Invoice discount cannot exceed the item subtotal.");
		const taxableAmount = computedTotal - discount;
		const tax = parseRequiredNumber(invoiceData.tax ?? taxableAmount * .13, "VAT amount", { min: 0 });
		assert(Math.abs(tax - taxableAmount * .13) < .01, "VAT must equal 13% of the taxable amount.");
		expectedTotal = taxableAmount + tax;
		invoiceData = {
			...invoiceData,
			discount,
			tax,
			taxableAmount
		};
	}
	assert(Math.abs(expectedTotal - totalPurchased) < .01, "Bill total does not match its items and applicable tax/discount.");
	assert(Math.abs(amountPaid + amountDue - totalPurchased) < .01, "Bill payment values must add up to the total purchased.");
	return {
		date,
		paymentMethod: normalizeText(bill.paymentMethod, ""),
		totalPurchased,
		amountPaid,
		amountDue,
		status: normalizeText(bill.status, "Open"),
		products: items,
		customerId: normalizedCustomerId,
		billType,
		panNumber: normalizeText(bill.panNumber ?? bill.pan_number ?? ""),
		billNumber: normalizeText(bill.billNumber ?? bill.bill_number ?? ""),
		invoiceData
	};
}
function validateExpensePayload(expense) {
	if (!expense || typeof expense !== "object") throw new Error("Invalid expense payload.");
	const date = normalizeText(expense.date);
	assert(date.length > 0, "Expense date is required.");
	const nameOfExpense = normalizeText(expense.nameOfExpense ?? expense.label);
	assert(nameOfExpense.length > 0, "Expense label is required.");
	const typeOfExpense = normalizeText(expense.typeOfExpense ?? expense.type ?? "General");
	assert([
		"General",
		"Import",
		"Taxes"
	].includes(typeOfExpense), "Expense type must be General, Import, or Taxes.");
	return {
		date,
		nameOfExpense,
		amountOfExpense: parseRequiredNumber(expense.amountOfExpense ?? expense.amount ?? 0, "Expense amount", {
			min: 1e-4,
			allowZero: false
		}),
		typeOfExpense
	};
}
function validateImportItems(items) {
	if (!Array.isArray(items) || items.length === 0) throw new Error("At least one import item is required.");
	return items.map((item, index) => {
		const productName = normalizeText(item?.productName ?? item?.product_name);
		const base = normalizeText(item?.base);
		const bucketSize = parseRequiredNumber(item?.bucketSize ?? item?.bucket_size, `Item ${index + 1} bucket size`, {
			min: 1e-4,
			allowZero: false
		});
		const quantity = parseRequiredNumber(item?.quantity, `Item ${index + 1} quantity`, {
			min: 1e-4,
			allowZero: false
		});
		const costPrice = parseRequiredNumber(item?.costPrice ?? item?.cost_price ?? 0, `Item ${index + 1} cost price`, { min: 0 });
		assert(productName.length > 0, `Item ${index + 1} product name is required.`);
		assert(base.length > 0, `Item ${index + 1} base is required.`);
		return {
			...item,
			productName,
			base,
			bucketSize,
			quantity,
			costPrice
		};
	});
}
//#endregion
//#region src/Backend/migrations.js
var migrations = [
	{
		version: 1,
		up(db) {
			db.exec(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          images TEXT
        );

        CREATE TABLE IF NOT EXISTS variants (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id TEXT NOT NULL,
          bucket_size REAL NOT NULL,
          landing REAL,
          sales REAL,
          mp REAL,
          FOREIGN KEY (product_id) REFERENCES products(id)
        );

        CREATE TABLE IF NOT EXISTS bases (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id TEXT NOT NULL,
          name TEXT NOT NULL,
          FOREIGN KEY (product_id) REFERENCES products(id)
        );

        CREATE TABLE IF NOT EXISTS base_stock (
          base_id INTEGER NOT NULL,
          variant_id INTEGER NOT NULL,
          stock REAL NOT NULL DEFAULT 0,
          PRIMARY KEY (base_id, variant_id),
          FOREIGN KEY (base_id) REFERENCES bases(id),
          FOREIGN KEY (variant_id) REFERENCES variants(id)
        );

        CREATE TABLE IF NOT EXISTS customers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT,
          address TEXT,
          notes TEXT
        );

        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          label TEXT NOT NULL,
          amount REAL NOT NULL,
          type TEXT DEFAULT 'General'
        );

        CREATE TABLE IF NOT EXISTS expense_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          expense_id INTEGER NOT NULL,
          product_name TEXT NOT NULL,
          base TEXT,
          bucket_size REAL,
          quantity REAL NOT NULL,
          cost_price REAL NOT NULL,
          FOREIGN KEY (expense_id) REFERENCES expenses(id)
        );

        CREATE TABLE IF NOT EXISTS bills (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_id INTEGER NOT NULL,
          date TEXT NOT NULL,
          payment_method TEXT,
          total_purchased REAL NOT NULL,
          amount_paid REAL NOT NULL,
          amount_due REAL NOT NULL,
          status TEXT NOT NULL,
          FOREIGN KEY (customer_id) REFERENCES customers(id)
        );

        CREATE TABLE IF NOT EXISTS bill_activity (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bill_id INTEGER NOT NULL,
          type TEXT NOT NULL,
          date TEXT NOT NULL,
          amount REAL NOT NULL DEFAULT 0,
          payment_method TEXT,
          note TEXT,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (bill_id) REFERENCES bills(id)
        );

        CREATE TABLE IF NOT EXISTS bill_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bill_id INTEGER NOT NULL,
          product_name TEXT NOT NULL,
          base TEXT,
          bucket_size REAL,
          quantity REAL NOT NULL,
          price_at_sale REAL NOT NULL,
          cost_price REAL DEFAULT 0,
          FOREIGN KEY (bill_id) REFERENCES bills(id)
        );
      `);
			if (!db.prepare("PRAGMA table_info(bill_items)").all().some((column) => column.name === "cost_price")) db.exec("ALTER TABLE bill_items ADD COLUMN cost_price REAL DEFAULT 0");
		}
	},
	{
		version: 2,
		up(db) {
			if (!db.prepare("PRAGMA table_info(expenses)").all().some((column) => column.name === "invoice_data")) db.exec("ALTER TABLE expenses ADD COLUMN invoice_data TEXT");
		}
	},
	{
		version: 3,
		up(db) {
			if (!db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'bills'").get()) return;
			const billColumns = db.prepare("PRAGMA table_info(bills)").all();
			for (const [column, definition] of [
				["bill_type", "TEXT NOT NULL DEFAULT 'default'"],
				["pan_number", "TEXT"],
				["bill_number", "TEXT"],
				["invoice_data", "TEXT"]
			]) if (!billColumns.some((row) => row.name === column)) db.exec(`ALTER TABLE bills ADD COLUMN ${column} ${definition}`);
		}
	}
];
function migrateDatabase(db) {
	let currentVersion = db.pragma("user_version", { simple: true });
	const latestVersion = migrations.at(-1)?.version ?? 0;
	if (currentVersion > latestVersion) throw new Error(`Database schema version ${currentVersion} is newer than supported version ${latestVersion}.`);
	for (const migration of migrations) {
		if (migration.version <= currentVersion) continue;
		if (migration.version !== currentVersion + 1) throw new Error(`Missing database migration for version ${currentVersion + 1}.`);
		db.transaction(() => {
			migration.up(db);
			db.pragma(`user_version = ${migration.version}`);
		})();
		currentVersion = migration.version;
	}
	return currentVersion;
}
//#endregion
//#region src/Backend/appConfig.js
var DEFAULT_PAYMENT_METHOD = "Cash";
var PAYMENT_METHODS = [
	"Cash",
	"UPI",
	"Card",
	"Credit"
];
function defaultInvoiceDefaults() {
	return {
		shopName: "",
		shopAddress: "",
		shopTelephone: "",
		invoiceNumber: "",
		tpinNumber: ""
	};
}
function defaultAppConfig() {
	return {
		defaultPaymentMethod: DEFAULT_PAYMENT_METHOD,
		dataDirectory: null,
		invoiceDefaults: defaultInvoiceDefaults(),
		inventoryAddItemMode: null
	};
}
function validateAppConfig(config) {
	if (!config || typeof config !== "object" || Array.isArray(config)) throw new Error("Application settings must be a JSON object.");
	const defaultPaymentMethod = config.defaultPaymentMethod ?? "Cash";
	if (!PAYMENT_METHODS.includes(defaultPaymentMethod)) throw new Error("Default payment method must be Cash, UPI, Card, or Credit.");
	const dataDirectory = config.dataDirectory ?? null;
	if (dataDirectory !== null && (typeof dataDirectory !== "string" || !path$1.isAbsolute(dataDirectory))) throw new Error("The configured data directory must be an absolute path.");
	const invoiceDefaults = config.invoiceDefaults ?? defaultInvoiceDefaults();
	if (!invoiceDefaults || typeof invoiceDefaults !== "object" || Array.isArray(invoiceDefaults)) throw new Error("Invoice defaults must be a JSON object.");
	const defaults = defaultInvoiceDefaults();
	for (const key of Object.keys(defaults)) {
		const value = invoiceDefaults[key] ?? "";
		if (typeof value !== "string") throw new Error(`Invoice default "${key}" must be text.`);
		defaults[key] = value.trim();
	}
	const inventoryAddItemMode = config.inventoryAddItemMode ?? null;
	if (inventoryAddItemMode !== null && !["default", "bill"].includes(inventoryAddItemMode)) throw new Error("Inventory add item mode must be \"default\", \"bill\", or null.");
	return {
		defaultPaymentMethod,
		dataDirectory,
		invoiceDefaults: defaults,
		inventoryAddItemMode
	};
}
function loadAppConfig(configPath) {
	if (!fs$1.existsSync(configPath)) return defaultAppConfig();
	let contents;
	try {
		contents = JSON.parse(fs$1.readFileSync(configPath, "utf8"));
	} catch (error) {
		throw new Error(`Could not read application settings at "${configPath}".`, { cause: error });
	}
	return validateAppConfig(contents);
}
function saveAppConfig(configPath, config) {
	const validatedConfig = validateAppConfig(config);
	const directory = path$1.dirname(configPath);
	fs$1.mkdirSync(directory, { recursive: true });
	const temporaryPath = path$1.join(directory, `.settings-${randomUUID$1()}.tmp`);
	try {
		fs$1.writeFileSync(temporaryPath, `${JSON.stringify(validatedConfig, null, 2)}\n`, {
			encoding: "utf8",
			flag: "wx"
		});
		fs$1.renameSync(temporaryPath, configPath);
	} catch (error) {
		fs$1.rmSync(temporaryPath, { force: true });
		throw new Error(`Could not save application settings at "${configPath}".`, { cause: error });
	}
	return validatedConfig;
}
function resolveDataDirectory({ config, isPackaged, userDataPath, developmentPath }) {
	const validatedConfig = validateAppConfig(config);
	return path$1.resolve(validatedConfig.dataDirectory || (isPackaged ? userDataPath : developmentPath));
}
async function copyDatabaseToDirectory(db, sourceDirectory, targetDirectory) {
	const source = path$1.resolve(sourceDirectory);
	const target = path$1.resolve(targetDirectory);
	if (source === target) throw new Error("Choose a different folder from the current data directory.");
	fs$1.mkdirSync(target, { recursive: true });
	if (fs$1.readdirSync(target).length > 0) throw new Error("Choose an empty folder for the StockWise data copy.");
	const stagingDirectory = fs$1.mkdtempSync(path$1.join(target, ".stockwise-setup-"));
	const databaseFilename = path$1.basename(db.name || "inventory.db");
	const stagedDatabasePath = path$1.join(stagingDirectory, databaseFilename);
	const stagedImagesPath = path$1.join(stagingDirectory, "images");
	const createdPaths = [];
	try {
		await db.backup(stagedDatabasePath);
		const sourceImagesPath = path$1.join(source, "images");
		if (fs$1.existsSync(sourceImagesPath)) fs$1.cpSync(sourceImagesPath, stagedImagesPath, {
			recursive: true,
			errorOnExist: true
		});
		const targetDatabasePath = path$1.join(target, databaseFilename);
		fs$1.renameSync(stagedDatabasePath, targetDatabasePath);
		createdPaths.push(targetDatabasePath);
		if (fs$1.existsSync(stagedImagesPath)) {
			const targetImagesPath = path$1.join(target, "images");
			fs$1.renameSync(stagedImagesPath, targetImagesPath);
			createdPaths.push(targetImagesPath);
		}
	} catch (error) {
		for (const createdPath of createdPaths) fs$1.rmSync(createdPath, {
			recursive: true,
			force: true
		});
		throw new Error(`Could not copy StockWise data to "${target}".`, { cause: error });
	} finally {
		fs$1.rmSync(stagingDirectory, {
			recursive: true,
			force: true
		});
	}
	return target;
}
//#endregion
//#region src/Backend/inventoryWrites.js
function saveInventoryProduct(db, product) {
	const validatedProduct = validateProduct(product);
	const existingProduct = db.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(validatedProduct.name);
	return db.transaction(() => {
		const productId = existingProduct?.id || validatedProduct.id || randomUUID$1();
		if (!existingProduct) db.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(productId, validatedProduct.name, validatedProduct.images);
		const variants = validatedProduct.variants.map((variant) => {
			const existingVariant = db.prepare("SELECT id FROM variants WHERE product_id = ? AND bucket_size = ?").get(productId, variant.bucket_size);
			if (existingVariant) return existingVariant;
			return { id: db.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(productId, variant.bucket_size, variant.landing, variant.sales, variant.mp).lastInsertRowid };
		});
		for (const base of validatedProduct.bases) {
			const baseId = db.prepare("SELECT id FROM bases WHERE product_id = ? AND name = ?").get(productId, base.name)?.id ?? db.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(productId, base.name).lastInsertRowid;
			variants.forEach((variant, index) => {
				const stock = base.stocks[index];
				if (db.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(stock, baseId, variant.id).changes === 0) db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(baseId, variant.id, stock);
			});
		}
		return productId;
	})();
}
//#endregion
//#region src/Backend/businessFlows.js
function addInventoryProduct(db, product) {
	const validatedProduct = validateProduct(product);
	const productId = validatedProduct.id || randomUUID$1();
	if (db.prepare("SELECT 1 FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(validatedProduct.name)) throw new Error(`Product "${validatedProduct.name}" already exists.`);
	db.transaction(() => {
		db.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(productId, validatedProduct.name, validatedProduct.images);
		for (const variant of validatedProduct.variants) db.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(productId, variant.bucket_size, variant.landing, variant.sales, variant.mp);
		for (const base of validatedProduct.bases) {
			const baseId = db.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(productId, base.name).lastInsertRowid;
			for (let index = 0; index < base.stocks.length; index += 1) {
				const variant = db.prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?").get(productId, index);
				if (!variant) throw new Error(`Variant lookup failed while saving base "${base.name}".`);
				db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(baseId, variant.id, base.stocks[index]);
			}
		}
	})();
	return productId;
}
function updateInventoryProduct(db, id, product) {
	if (!id) throw new Error("Product id is required.");
	if (!db.prepare("SELECT id FROM products WHERE id = ?").get(id)) throw new Error("Product not found.");
	const validatedProduct = validateProduct(product);
	const normalizedName = validatedProduct.name;
	if (db.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE AND id != ?").get(normalizedName, id)) throw new Error(`Another product already uses the name "${normalizedName}".`);
	db.transaction(() => {
		db.prepare("UPDATE products SET name = ?, images = ? WHERE id = ?").run(normalizedName, validatedProduct.images, id);
		const existingVariants = db.prepare("SELECT id FROM variants WHERE product_id = ?").all(id);
		for (const variant of existingVariants) db.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(variant.id);
		db.prepare("DELETE FROM variants WHERE product_id = ?").run(id);
		const oldBases = db.prepare("SELECT id FROM bases WHERE product_id = ?").all(id);
		for (const base of oldBases) db.prepare("DELETE FROM base_stock WHERE base_id = ?").run(base.id);
		db.prepare("DELETE FROM bases WHERE product_id = ?").run(id);
		for (const variant of validatedProduct.variants) db.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(id, variant.bucket_size, variant.landing, variant.sales, variant.mp);
		for (const base of validatedProduct.bases) {
			const baseId = db.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(id, base.name).lastInsertRowid;
			for (let index = 0; index < base.stocks.length; index += 1) {
				const variant = db.prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?").get(id, index);
				if (!variant) throw new Error(`Variant lookup failed while updating base "${base.name}".`);
				db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(baseId, variant.id, base.stocks[index]);
			}
		}
	})();
}
function deleteInventoryProduct(db, id) {
	if (!id) throw new Error("Product id is required.");
	if (!db.prepare("SELECT 1 FROM products WHERE id = ?").get(id)) throw new Error("Product not found.");
	db.transaction(() => {
		const variants = db.prepare("SELECT id FROM variants WHERE product_id = ?").all(id);
		const bases = db.prepare("SELECT id FROM bases WHERE product_id = ?").all(id);
		for (const variant of variants) db.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(variant.id);
		for (const base of bases) db.prepare("DELETE FROM base_stock WHERE base_id = ?").run(base.id);
		db.prepare("DELETE FROM variants WHERE product_id = ?").run(id);
		db.prepare("DELETE FROM bases WHERE product_id = ?").run(id);
		db.prepare("DELETE FROM products WHERE id = ?").run(id);
	})();
}
function adjustStock(db, productName, baseName, bucketSize, deltaQty) {
	const pName = productName ? String(productName).trim() : "";
	const bName = baseName ? String(baseName).trim() : "";
	const bSize = parseFloat(bucketSize) || 0;
	const product = db.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(pName);
	if (!product) return;
	const variant = db.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(product.id, bSize);
	if (!variant) return;
	const base = db.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(product.id, bName);
	if (!base) return;
	db.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(deltaQty, base.id, variant.id);
}
function getLandingPrice$1(db, productName, bucketSize) {
	const product = db.prepare("SELECT * FROM products WHERE name = ?").get(productName);
	if (!product) return 0;
	const variant = db.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(product.id, bucketSize);
	return variant ? variant.landing : 0;
}
function insertBillActivity(db, billId, activity) {
	db.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(billId, activity.type, activity.date, activity.amount, activity.paymentMethod, activity.note);
}
function addBill$1(db, customerId, bill) {
	const normalizedBill = validateBillPayload(customerId, bill);
	if (!db.prepare("SELECT id FROM customers WHERE id = ?").get(normalizedBill.customerId)) throw new Error("Customer not found.");
	return db.transaction(() => {
		const billId = db.prepare(`
      INSERT INTO bills (
        customer_id, date, payment_method, total_purchased, amount_paid, amount_due,
        status, bill_type, pan_number, bill_number, invoice_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(normalizedBill.customerId, normalizedBill.date, normalizedBill.paymentMethod, normalizedBill.totalPurchased, normalizedBill.amountPaid, normalizedBill.amountDue, normalizedBill.status, normalizedBill.billType, normalizedBill.panNumber, normalizedBill.billNumber, normalizedBill.invoiceData ? JSON.stringify(normalizedBill.invoiceData) : null).lastInsertRowid;
		insertBillActivity(db, billId, {
			type: "sale",
			date: normalizedBill.date,
			amount: normalizedBill.totalPurchased,
			paymentMethod: normalizedBill.paymentMethod,
			note: "Initial bill entry"
		});
		for (const item of normalizedBill.products) {
			const costPrice = getLandingPrice$1(db, item.productName, item.bucketSize);
			db.prepare(`
        INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(billId, item.productName, item.base, item.bucketSize, item.quantity, item.priceAtSale, costPrice);
			adjustStock(db, item.productName, item.base, item.bucketSize, -item.quantity);
		}
		if (normalizedBill.amountPaid > 0) insertBillActivity(db, billId, {
			type: "payment",
			date: normalizedBill.date,
			amount: normalizedBill.amountPaid,
			paymentMethod: normalizedBill.paymentMethod,
			note: "Payment recorded on bill creation"
		});
		return billId;
	})();
}
function applyImportItemToStock(db, item) {
	const productName = item.productName ? String(item.productName).trim() : "";
	const baseName = item.base ? String(item.base).trim() : "";
	const bucketSize = parseFloat(item.bucketSize) || 0;
	const quantity = parseFloat(item.quantity) || 0;
	const costPrice = parseFloat(item.costPrice) || 0;
	let product = db.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(productName);
	let productId;
	if (!product) {
		productId = randomUUID$1();
		db.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(productId, productName, "");
	} else productId = product.id;
	const variant = db.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(productId, bucketSize);
	let variantId;
	if (!variant) variantId = db.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(productId, bucketSize, costPrice, 0, 0).lastInsertRowid;
	else {
		variantId = variant.id;
		db.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(costPrice, variantId);
	}
	const baseId = db.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(productId, baseName)?.id ?? db.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(productId, baseName).lastInsertRowid;
	if (db.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(baseId, variantId)) db.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(quantity, baseId, variantId);
	else db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(baseId, variantId, quantity);
}
function reverseImportItemFromStock$1(db, item) {
	adjustStock(db, item.product_name, item.base, item.bucket_size, -item.quantity);
}
function serializeInvoiceData(invoiceData) {
	if (invoiceData == null) return null;
	if (typeof invoiceData !== "object" || Array.isArray(invoiceData)) throw new Error("Invoice data must be an object.");
	return JSON.stringify(invoiceData);
}
function storedInvoiceNumbers(db, excludeExpenseId) {
	return db.prepare(`
    SELECT id, invoice_data FROM expenses
    WHERE type = 'Import' AND invoice_data IS NOT NULL
  `).all().filter((row) => row.id !== Number(excludeExpenseId)).map((row) => {
		try {
			return JSON.parse(row.invoice_data)?.invoiceNumber;
		} catch (error) {
			throw new Error(`Invoice details for import ${row.id} are corrupted.`, { cause: error });
		}
	}).filter((value) => typeof value === "string" && value.trim()).map((value) => value.trim());
}
function isInvoiceNumberAvailable$1(db, invoiceNumber, excludeExpenseId) {
	const normalizedNumber = String(invoiceNumber ?? "").trim().toLocaleLowerCase();
	if (!normalizedNumber) return false;
	return !storedInvoiceNumbers(db, excludeExpenseId).some((value) => value.toLocaleLowerCase() === normalizedNumber);
}
function getNextInvoiceNumber$1(db, previousNumber = "") {
	const preferred = String(previousNumber ?? "").trim();
	const match = /^(.*?)(\d+)$/.exec(preferred);
	const prefix = match?.[1] ?? "";
	const width = match?.[2]?.length ?? 1;
	const previousSequence = match ? Number(match[2]) : 0;
	const matchingSequences = storedInvoiceNumbers(db).map((value) => {
		const numberMatch = /^(.*?)(\d+)$/.exec(value);
		return numberMatch && numberMatch[1].toLocaleLowerCase() === prefix.toLocaleLowerCase() ? Number(numberMatch[2]) : 0;
	});
	let nextSequence = Math.max(previousSequence, ...matchingSequences) + 1;
	let candidate = `${prefix}${String(nextSequence).padStart(width, "0")}`;
	while (!isInvoiceNumberAvailable$1(db, candidate)) {
		nextSequence += 1;
		candidate = `${prefix}${String(nextSequence).padStart(width, "0")}`;
	}
	return candidate;
}
function recordImportExpense$1(db, expenseMeta, items) {
	const validatedItems = validateImportItems(items);
	const totalCost = validatedItems.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
	const validatedExpenseMeta = validateExpensePayload({
		...expenseMeta,
		amountOfExpense: totalCost,
		typeOfExpense: "Import"
	});
	return {
		id: db.transaction(() => {
			const invoiceNumber = expenseMeta.invoiceData?.invoiceNumber;
			if (invoiceNumber && !isInvoiceNumberAvailable$1(db, invoiceNumber)) throw new Error("This invoice number is already in use. Choose another number.");
			for (const item of validatedItems) applyImportItemToStock(db, item);
			const expenseId = db.prepare("INSERT INTO expenses (date, label, amount, type, invoice_data) VALUES (?, ?, ?, ?, ?)").run(validatedExpenseMeta.date, validatedExpenseMeta.nameOfExpense, totalCost, "Import", serializeInvoiceData(expenseMeta.invoiceData)).lastInsertRowid;
			for (const item of validatedItems) db.prepare(`
        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(expenseId, item.productName, item.base, item.bucketSize, item.quantity, item.costPrice);
			return expenseId;
		})(),
		totalCost
	};
}
function editImportExpense$1(db, expenseId, expenseMeta, newItems) {
	if (!db.prepare("SELECT id FROM expenses WHERE id = ?").get(expenseId)) throw new Error("Expense not found.");
	const validatedItems = validateImportItems(newItems);
	const totalCost = validatedItems.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
	const validatedExpenseMeta = validateExpensePayload({
		...expenseMeta,
		amountOfExpense: totalCost,
		typeOfExpense: "Import"
	});
	const invoiceData = serializeInvoiceData(expenseMeta.invoiceData);
	const invoiceNumber = expenseMeta.invoiceData?.invoiceNumber;
	const oldItems = db.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(expenseId);
	db.transaction(() => {
		if (invoiceNumber && !isInvoiceNumberAvailable$1(db, invoiceNumber, expenseId)) throw new Error("This invoice number is already in use. Choose another number.");
		for (const item of oldItems) reverseImportItemFromStock$1(db, item);
		db.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(expenseId);
		for (const item of validatedItems) {
			applyImportItemToStock(db, item);
			db.prepare(`
        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(expenseId, item.productName, item.base, item.bucketSize, item.quantity, item.costPrice);
		}
		db.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, invoice_data = ? WHERE id = ?").run(validatedExpenseMeta.date, validatedExpenseMeta.nameOfExpense, totalCost, invoiceData, expenseId);
	})();
	return totalCost;
}
//#endregion
//#region src/Backend/inventoryDeletes.js
function deleteExpenseAndRestoreStock(db, expenseId, reverseStock) {
	if (!db.prepare("SELECT id FROM expenses WHERE id = ?").get(expenseId)) throw new Error("Expense not found.");
	db.transaction(() => {
		const items = db.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(expenseId);
		for (const item of items) reverseStock(item);
		db.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(expenseId);
		db.prepare("DELETE FROM expenses WHERE id = ?").run(expenseId);
	})();
}
function deleteVariantAndStock(db, variantId) {
	db.transaction(() => {
		db.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(variantId);
		db.prepare("DELETE FROM variants WHERE id = ?").run(variantId);
	})();
}
//#endregion
//#region src/Backend/databaseBackup.js
var requiredColumns = {
	products: [
		"id",
		"name",
		"images"
	],
	variants: [
		"id",
		"product_id",
		"bucket_size",
		"landing",
		"sales",
		"mp"
	],
	bases: [
		"id",
		"product_id",
		"name"
	],
	base_stock: [
		"base_id",
		"variant_id",
		"stock"
	],
	customers: [
		"id",
		"name",
		"phone",
		"address",
		"notes"
	],
	expenses: [
		"id",
		"date",
		"label",
		"amount",
		"type",
		"invoice_data"
	],
	expense_items: [
		"id",
		"expense_id",
		"product_name",
		"base",
		"bucket_size",
		"quantity",
		"cost_price"
	],
	bills: [
		"id",
		"customer_id",
		"date",
		"payment_method",
		"total_purchased",
		"amount_paid",
		"amount_due",
		"status",
		"bill_type",
		"pan_number",
		"bill_number",
		"invoice_data"
	],
	bill_activity: [
		"id",
		"bill_id",
		"type",
		"date",
		"amount",
		"payment_method",
		"note",
		"created_at"
	],
	bill_items: [
		"id",
		"bill_id",
		"product_name",
		"base",
		"bucket_size",
		"quantity",
		"price_at_sale",
		"cost_price"
	]
};
var legacyIdentityColumns = {
	products: ["id", "name"],
	customers: ["id", "name"],
	bills: ["id", "customer_id"],
	bill_items: [
		"id",
		"bill_id",
		"product_name",
		"quantity",
		"price_at_sale"
	]
};
function assertDatabaseIntegrity(db) {
	const result = db.pragma("integrity_check", { simple: true });
	if (result !== "ok") throw new Error(`SQLite integrity check failed: ${result}`);
}
function assertStockWiseDatabase(db, requireCurrentSchema = false) {
	const expectedColumns = requireCurrentSchema ? requiredColumns : legacyIdentityColumns;
	const tables = new Set(db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((row) => row.name));
	if (Object.entries(expectedColumns).filter(([table, columns]) => {
		if (!tables.has(table)) return true;
		const presentColumns = new Set(db.prepare(`PRAGMA table_info(${table})`).all().map((column) => column.name));
		return columns.some((column) => !presentColumns.has(column));
	}).length > 0) throw new Error("The selected file does not contain a complete StockWise database schema.");
}
async function createDatabaseBackup(db, destinationPath) {
	if (!db.open) throw new Error("The active database is not open.");
	const destination = path$1.resolve(destinationPath);
	if (db.name && path$1.resolve(db.name) === destination) throw new Error("Choose a different file from the active database.");
	await db.backup(destination);
	return destination;
}
async function stageDatabaseRestore(sourcePath, stagingPath) {
	const source = path$1.resolve(sourcePath);
	const staging = path$1.resolve(stagingPath);
	if (source === staging) throw new Error("The restore source and staging file must be different.");
	if (fs$1.existsSync(staging)) throw new Error("The restore staging file already exists.");
	try {
		const sourceDb = new import_lib.default(source, {
			readonly: true,
			fileMustExist: true
		});
		try {
			assertDatabaseIntegrity(sourceDb);
			assertStockWiseDatabase(sourceDb);
			await sourceDb.backup(staging);
		} finally {
			sourceDb.close();
		}
		const stagedDb = new import_lib.default(staging);
		try {
			const schemaVersion = migrateDatabase(stagedDb);
			assertDatabaseIntegrity(stagedDb);
			assertStockWiseDatabase(stagedDb, true);
			return { schemaVersion };
		} finally {
			stagedDb.close();
		}
	} catch (error) {
		fs$1.rmSync(staging, { force: true });
		throw error;
	}
}
function activateStagedDatabase(activePath, stagingPath, previousPath) {
	fs$1.renameSync(activePath, previousPath);
	try {
		fs$1.renameSync(stagingPath, activePath);
	} catch (error) {
		try {
			fs$1.renameSync(previousPath, activePath);
		} catch (rollbackError) {
			throw new AggregateError([error, rollbackError], "Restore activation failed and the original database could not be put back.", { cause: rollbackError });
		}
		throw new Error(error.message, { cause: error });
	}
}
//#endregion
//#region src/Backend/server.js
var XLSX = createRequire$1(import.meta.url)("xlsx");
var __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
var appConfigPath = path.join(app.getPath("userData"), "settings.json");
var appConfig = loadAppConfig(appConfigPath);
var dataDirectory = resolveDataDirectory({
	config: appConfig,
	isPackaged: app.isPackaged,
	userDataPath: app.getPath("userData"),
	developmentPath: path.join(__dirname$1, "../", "Database")
});
var dbPath = path.join(dataDirectory, "inventory.db");
var db;
function openDatabase() {
	fs.mkdirSync(dataDirectory, { recursive: true });
	db = new import_lib.default(dbPath);
	migrateDatabase(db);
}
openDatabase();
function backupDatabase(destinationPath) {
	return createDatabaseBackup(db, destinationPath);
}
function saveInventoryProductChanges(product) {
	return saveInventoryProduct(db, product);
}
function getAppSettings() {
	return {
		...appConfig,
		dataDirectory
	};
}
function updateDefaultPaymentMethod(paymentMethod) {
	appConfig = saveAppConfig(appConfigPath, {
		...appConfig,
		defaultPaymentMethod: paymentMethod
	});
	return getAppSettings();
}
function updateInvoiceDefaults(invoiceDefaults) {
	appConfig = saveAppConfig(appConfigPath, {
		...appConfig,
		invoiceDefaults
	});
	return getAppSettings();
}
function updateInventoryAddItemMode(inventoryAddItemMode) {
	appConfig = saveAppConfig(appConfigPath, {
		...appConfig,
		inventoryAddItemMode
	});
	return getAppSettings();
}
async function setLocalDataDirectory(destinationDirectory) {
	if (typeof destinationDirectory !== "string" || !destinationDirectory.trim()) throw new Error("A data directory is required.");
	const destination = path.resolve(destinationDirectory);
	if (destination === dataDirectory) throw new Error("Choose a different folder from the current data directory.");
	await copyDatabaseToDirectory(db, dataDirectory, destination);
	let nextConfig;
	try {
		nextConfig = saveAppConfig(appConfigPath, {
			...appConfig,
			dataDirectory: destination
		});
	} catch (error) {
		try {
			fs.rmSync(path.join(destination, "inventory.db"), { force: true });
			fs.rmSync(path.join(destination, "images"), {
				recursive: true,
				force: true
			});
		} catch (cleanupError) {
			throw new AggregateError([error, cleanupError], "Could not save the new data folder setting or clean up its copied files.", { cause: cleanupError });
		}
		throw error;
	}
	appConfig = nextConfig;
	return {
		...appConfig,
		dataDirectory: destination
	};
}
async function restoreDatabase(sourcePath) {
	const source = path.resolve(sourcePath);
	if (source === path.resolve(dbPath)) throw new Error("Choose a backup file, not the active database.");
	const stagingDirectory = fs.mkdtempSync(path.join(path.dirname(dbPath), ".stockwise-restore-"));
	const stagingPath = path.join(stagingDirectory, "restored.db");
	const previousPath = path.join(stagingDirectory, "previous.db");
	const recoveryName = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${randomUUID()}.db`;
	const recoveryPath = path.join(path.dirname(dbPath), recoveryName);
	try {
		await stageDatabaseRestore(source, stagingPath);
		await createDatabaseBackup(db, recoveryPath);
		db.close();
		try {
			activateStagedDatabase(dbPath, stagingPath, previousPath);
		} catch (error) {
			try {
				openDatabase();
			} catch (reopenError) {
				throw new AggregateError([error, reopenError], "Restore failed and the active database could not be reopened.", { cause: reopenError });
			}
			throw error;
		}
		return { recoveryBackupPath: recoveryPath };
	} finally {
		fs.rmSync(stagingDirectory, {
			recursive: true,
			force: true
		});
	}
}
function addProduct(product) {
	return addInventoryProduct(db, product);
}
function getProducts() {
	const products = db.prepare(`SELECT * FROM products`).all();
	for (const product of products) {
		product.variants = db.prepare(`SELECT * FROM variants WHERE product_id = ?`).all(product.id);
		const bases = db.prepare(`SELECT * FROM bases WHERE product_id = ?`).all(product.id);
		for (const base of bases) {
			const stockRows = db.prepare(`SELECT variant_id, stock FROM base_stock WHERE base_id = ?`).all(base.id);
			base.stockMap = {};
			for (const row of stockRows) base.stockMap[row.variant_id] = row.stock;
			base.stocks = product.variants.map((v) => base.stockMap[v.id] ?? 0);
		}
		product.bases = bases;
	}
	return products;
}
function getNextInvoiceNumber() {
	return getNextInvoiceNumber$1(db, appConfig.invoiceDefaults?.invoiceNumber);
}
function isInvoiceNumberAvailable(invoiceNumber, excludeExpenseId) {
	return isInvoiceNumberAvailable$1(db, invoiceNumber, excludeExpenseId);
}
function deleteProduct(id) {
	deleteInventoryProduct(db, id);
}
function editProduct(id, product) {
	updateInventoryProduct(db, id, product);
}
function getProductByName(name) {
	return db.prepare(`SELECT * FROM products WHERE name = ?`).get(name);
}
function getVariantBySize(productId, bucketSize) {
	return db.prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`).get(productId, bucketSize);
}
function addVariant(productId, variant) {
	return db.prepare(`
    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)
    VALUES (?, ?, ?, ?, ?)
  `).run(productId, variant.bucket_size, variant.landing, variant.sales, variant.mp).lastInsertRowid;
}
function addBase(productId, baseName) {
	return db.prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`).run(productId, baseName).lastInsertRowid;
}
function getBaseByName(productId, baseName) {
	return db.prepare(`SELECT * FROM bases WHERE product_id = ? AND name = ?`).get(productId, baseName);
}
function addBaseStock(baseId, variantId, stock) {
	db.prepare(`INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)`).run(baseId, variantId, stock);
}
function copyImageToDatabase(sourcePath) {
	const fileName = path.basename(sourcePath);
	const destDir = path.join(dataDirectory, "images", "product-images");
	const destPath = path.join(destDir, fileName);
	if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
	if (!fs.existsSync(destPath)) fs.copyFileSync(sourcePath, destPath);
	return `images/product-images/${fileName}`;
}
function resolveImagePath(relativePath) {
	if (!relativePath) return null;
	return path.join(dataDirectory, relativePath);
}
function addCustomer(customer) {
	const validatedCustomer = validateCustomer(customer);
	if (db.prepare(`SELECT 1 FROM customers WHERE TRIM(name) = TRIM(?) COLLATE NOCASE`).get(validatedCustomer.name)) throw new Error(`Customer "${validatedCustomer.name}" already exists.`);
	return db.prepare(`
    INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)
  `).run(validatedCustomer.name, validatedCustomer.phone, validatedCustomer.address, validatedCustomer.notes).lastInsertRowid;
}
function addBillActivity(billId, activity) {
	if (!billId) throw new Error("Bill id is required.");
	const type = normalizeText(activity?.type ?? "adjustment");
	const date = normalizeText(activity?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const amount = Number(activity?.amount ?? 0);
	const paymentMethod = normalizeText(activity?.paymentMethod ?? "");
	const note = normalizeText(activity?.note ?? "");
	db.prepare(`INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)`).run(billId, type, date, amount, paymentMethod, note);
}
function getBillActivity(billId) {
	return db.prepare(`SELECT * FROM bill_activity WHERE bill_id = ? ORDER BY date ASC, id ASC`).all(billId);
}
function addBill(customerId, bill) {
	return addBill$1(db, customerId, bill);
}
function getCustomers() {
	const customers = db.prepare(`SELECT * FROM customers`).all();
	for (const customer of customers) {
		const bills = db.prepare(`SELECT * FROM bills WHERE customer_id = ?`).all(customer.id);
		for (const bill of bills) bill.products = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(bill.id);
		customer.bills = bills;
		customer.totalDue = bills.reduce((sum, b) => sum + b.amount_due, 0);
	}
	return customers;
}
function deleteCustomer(id) {
	if (!db.prepare(`SELECT id FROM customers WHERE id = ?`).get(id)) throw new Error("Customer not found.");
	db.transaction(() => {
		const bills = db.prepare(`SELECT id FROM bills WHERE customer_id = ?`).all(id);
		for (const bill of bills) db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(bill.id);
		db.prepare(`DELETE FROM bills WHERE customer_id = ?`).run(id);
		db.prepare(`DELETE FROM customers WHERE id = ?`).run(id);
	})();
}
function addCustomerBill(customer, bill) {
	return db.transaction(() => {
		const customerId = addCustomer(customer);
		addBill(customerId, bill);
		return customerId;
	})();
}
function deleteBill(billId) {
	if (!db.prepare(`SELECT id FROM bills WHERE id = ?`).get(billId)) throw new Error("Bill not found.");
	db.transaction(() => {
		const items = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(billId);
		for (const item of items) adjustStock(db, item.product_name, item.base, item.bucket_size, item.quantity);
		db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(billId);
		db.prepare(`DELETE FROM bills WHERE id = ?`).run(billId);
	})();
}
function editCustomer(id, customer) {
	const validatedCustomer = validateCustomer(customer);
	if (!db.prepare(`SELECT id FROM customers WHERE id = ?`).get(id)) throw new Error("Customer not found.");
	db.prepare(`
    UPDATE customers SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?
  `).run(validatedCustomer.name, validatedCustomer.phone, validatedCustomer.address, validatedCustomer.notes, id);
}
function editBill(billId, bill) {
	const billRecord = db.prepare(`SELECT * FROM bills WHERE id = ?`).get(billId);
	if (!billRecord) throw new Error("Bill not found.");
	const normalizedBill = validateBillPayload(billRecord.customer_id, bill);
	db.transaction(() => {
		const oldItems = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(billId);
		for (const item of oldItems) adjustStock(db, item.product_name, item.base, item.bucket_size, item.quantity);
		const previousTotal = Number(billRecord.total_purchased || 0);
		const previousPaid = Number(billRecord.amount_paid || 0);
		const totalDelta = normalizedBill.totalPurchased - previousTotal;
		const paidDelta = normalizedBill.amountPaid - previousPaid;
		db.prepare(`
      UPDATE bills SET
        date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?,
        status = ?, bill_type = ?, pan_number = ?, bill_number = ?, invoice_data = ?
      WHERE id = ?
    `).run(normalizedBill.date, normalizedBill.paymentMethod, normalizedBill.totalPurchased, normalizedBill.amountPaid, normalizedBill.amountDue, normalizedBill.status, normalizedBill.billType, normalizedBill.panNumber, normalizedBill.billNumber, normalizedBill.invoiceData ? JSON.stringify(normalizedBill.invoiceData) : null, billId);
		db.prepare(`DELETE FROM bill_items WHERE bill_id = ?`).run(billId);
		for (const item of normalizedBill.products) {
			const costPrice = getLandingPrice(item.productName, item.bucketSize);
			db.prepare(`
      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(billId, item.productName, item.base, item.bucketSize, item.quantity, item.priceAtSale, costPrice);
			adjustStock(db, item.productName, item.base, item.bucketSize, -item.quantity);
		}
		if (Math.abs(totalDelta) > .01) addBillActivity(billId, {
			type: "adjustment",
			date: normalizedBill.date,
			amount: totalDelta,
			paymentMethod: normalizedBill.paymentMethod,
			note: totalDelta >= 0 ? "Additional products added to bill" : "Bill value reduced"
		});
		if (Math.abs(paidDelta) > .01) addBillActivity(billId, {
			type: "payment",
			date: normalizedBill.date,
			amount: paidDelta,
			paymentMethod: normalizedBill.paymentMethod,
			note: paidDelta >= 0 ? "Customer payment recorded" : "Payment adjusted"
		});
	})();
}
function editCustomerBill(customerId, customer, billId, bill) {
	db.transaction(() => {
		editCustomer(customerId, customer);
		editBill(billId, bill);
	})();
}
function addExpense(expense) {
	const validatedExpense = validateExpensePayload(expense);
	return db.prepare(`INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)`).run(validatedExpense.date, validatedExpense.nameOfExpense, validatedExpense.amountOfExpense, validatedExpense.typeOfExpense).lastInsertRowid;
}
function getExpenses() {
	return db.prepare(`SELECT * FROM expenses ORDER BY date DESC`).all().map((r) => ({
		id: r.id,
		date: r.date,
		nameOfExpense: r.label,
		typeOfExpense: r.type,
		amountOfExpense: r.amount
	}));
}
function deleteExpense(id) {
	deleteExpenseAndRestoreStock(db, id, reverseImportItemFromStock);
}
function getSales() {
	const bills = db.prepare(`SELECT * FROM bills`).all();
	const customerTotalDue = {};
	return bills.map((bill) => {
		const customer = db.prepare(`SELECT * FROM customers WHERE id = ?`).get(bill.customer_id);
		const items = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(bill.id);
		if (!(bill.customer_id in customerTotalDue)) {
			const allBills = db.prepare(`SELECT amount_due FROM bills WHERE customer_id = ?`).all(bill.customer_id);
			customerTotalDue[bill.customer_id] = allBills.reduce((sum, b) => sum + b.amount_due, 0);
		}
		const costPrice = items.reduce((sum, i) => sum + (i.cost_price || 0) * i.quantity, 0);
		const sellingPrice = bill.total_purchased;
		const invoiceData = bill.invoice_data ? JSON.parse(bill.invoice_data) : null;
		const netGain = sellingPrice - (Number(invoiceData?.tax) || 0) - costPrice;
		return {
			id: bill.id,
			billType: bill.bill_type || "default",
			panNumber: bill.pan_number || "",
			billNumber: bill.bill_number || "",
			invoiceData,
			customer: {
				id: customer.id,
				name: customer.name,
				phone: customer.phone,
				address: customer.address,
				date: bill.date,
				paymentMethod: bill.payment_method,
				totalPurchased: bill.total_purchased,
				amountPaid: bill.amount_paid,
				amountDue: bill.amount_due,
				totalDue: customerTotalDue[bill.customer_id],
				status: bill.status
			},
			purchasedProducts: items.map((i) => ({
				name: i.product_name,
				base: i.base,
				bucketSize: i.bucket_size,
				quantity: i.quantity,
				priceAtSale: i.price_at_sale,
				costPrice: i.cost_price
			})),
			sellingPrice,
			costPrice,
			netGain
		};
	});
}
function getNetPosition(period) {
	const now = /* @__PURE__ */ new Date();
	let startDate;
	if (period === "yearly") startDate = `${now.getFullYear()}-01-01`;
	else if (period === "weekly") {
		const day = now.getDay();
		const diff = now.getDate() - day + (day === 0 ? -6 : 1);
		startDate = new Date(now.getFullYear(), now.getMonth(), diff).toISOString().slice(0, 10);
	} else if (period === "all") startDate = "0000-01-01";
	else startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
	const bills = db.prepare(`SELECT * FROM bills WHERE date >= ?`).all(startDate);
	let totalEarned = 0;
	let totalCost = 0;
	let totalVat = 0;
	let totalDue = 0;
	const productTotals = {};
	for (const bill of bills) {
		const items = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(bill.id);
		totalEarned += bill.total_purchased;
		const invoiceData = bill.invoice_data ? JSON.parse(bill.invoice_data) : null;
		totalVat += Number(invoiceData?.tax) || 0;
		totalCost += items.reduce((sum, i) => sum + (i.cost_price || 0) * i.quantity, 0);
		totalDue += bill.amount_due;
		for (const i of items) productTotals[i.product_name] = (productTotals[i.product_name] || 0) + i.quantity;
	}
	const totalProfit = totalEarned - totalVat - totalCost;
	const expenseRows = db.prepare(`SELECT * FROM expenses WHERE date >= ?`).all(startDate);
	const totalExpenses = expenseRows.reduce((sum, e) => sum + e.amount, 0);
	let topCategory = "-";
	let topQty = 0;
	for (const [name, qty] of Object.entries(productTotals)) if (qty > topQty) {
		topQty = qty;
		topCategory = name;
	}
	const salesActivity = bills.map((b) => ({
		label: `Sale #${b.id}`,
		date: b.date,
		amount: b.total_purchased
	}));
	const expenseActivity = expenseRows.map((e) => ({
		label: e.label,
		date: e.date,
		amount: -e.amount
	}));
	const recentActivity = [...salesActivity, ...expenseActivity].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);
	return {
		totalEarned,
		totalExpenses,
		totalDue,
		totalProfit,
		netPosition: totalProfit - totalExpenses,
		totalSales: bills.length,
		profitPerSale: bills.length > 0 ? totalProfit / bills.length : 0,
		topCategory,
		recentActivity
	};
}
function getTopProducts(period, limit = 5) {
	const now = /* @__PURE__ */ new Date();
	let startDate;
	if (period === "yearly") startDate = `${now.getFullYear()}-01-01`;
	else if (period === "weekly") {
		const day = now.getDay();
		const diff = now.getDate() - day + (day === 0 ? -6 : 1);
		startDate = new Date(now.getFullYear(), now.getMonth(), diff).toISOString().slice(0, 10);
	} else startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
	const bills = db.prepare(`SELECT * FROM bills WHERE date >= ?`).all(startDate);
	const productStats = {};
	for (const bill of bills) {
		const items = db.prepare(`SELECT * FROM bill_items WHERE bill_id = ?`).all(bill.id);
		for (const item of items) {
			if (!productStats[item.product_name]) productStats[item.product_name] = {
				units: 0,
				revenue: 0
			};
			productStats[item.product_name].units += item.quantity;
			productStats[item.product_name].revenue += item.price_at_sale * item.quantity;
		}
	}
	return Object.entries(productStats).map(([name, stats]) => ({
		name,
		units: stats.units,
		revenue: stats.revenue
	})).sort((a, b) => b.revenue - a.revenue).slice(0, limit);
}
function getTopCustomers(period, limit = 5) {
	const now = /* @__PURE__ */ new Date();
	let startDate;
	if (period === "yearly") startDate = `${now.getFullYear()}-01-01`;
	else if (period === "weekly") {
		const day = now.getDay();
		const diff = now.getDate() - day + (day === 0 ? -6 : 1);
		startDate = new Date(now.getFullYear(), now.getMonth(), diff).toISOString().slice(0, 10);
	} else startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
	const bills = db.prepare(`SELECT * FROM bills WHERE date >= ?`).all(startDate);
	const customerStats = {};
	for (const bill of bills) {
		const customer = db.prepare(`SELECT * FROM customers WHERE id = ?`).get(bill.customer_id);
		if (customer) {
			if (!customerStats[customer.id]) customerStats[customer.id] = {
				name: customer.name,
				orders: 0,
				spend: 0
			};
			customerStats[customer.id].orders += 1;
			customerStats[customer.id].spend += bill.total_purchased;
		}
	}
	return Object.values(customerStats).sort((a, b) => b.spend - a.spend).slice(0, limit);
}
function reverseImportItemFromStock(item) {
	adjustStock(db, item.product_name, item.base, item.bucket_size, -item.quantity);
}
function recordImportExpense(expenseMeta, items) {
	return recordImportExpense$1(db, expenseMeta, items);
}
function editImportExpense(expenseId, expenseMeta, newItems) {
	return editImportExpense$1(db, expenseId, expenseMeta, newItems);
}
function editExpense(id, expense) {
	const validatedExpense = validateExpensePayload(expense);
	if (!db.prepare(`SELECT id FROM expenses WHERE id = ?`).get(id)) throw new Error("Expense not found.");
	db.prepare(`UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?`).run(validatedExpense.date, validatedExpense.nameOfExpense, validatedExpense.amountOfExpense, validatedExpense.typeOfExpense, id);
}
function getExpenseDetails(expenseId) {
	const expense = db.prepare(`SELECT * FROM expenses WHERE id = ?`).get(expenseId);
	if (!expense) return null;
	const items = db.prepare(`SELECT * FROM expense_items WHERE expense_id = ?`).all(expenseId);
	return {
		id: expense.id,
		date: expense.date,
		nameOfExpense: expense.label,
		typeOfExpense: expense.type,
		amountOfExpense: expense.amount,
		invoiceData: expense.invoice_data ? JSON.parse(expense.invoice_data) : null,
		items: items.map((i) => ({
			productName: i.product_name,
			base: i.base,
			bucketSize: i.bucket_size,
			quantity: i.quantity,
			costPrice: i.cost_price
		}))
	};
}
function getLandingPrice(productName, bucketSize) {
	const product = db.prepare(`SELECT * FROM products WHERE name = ?`).get(productName);
	if (!product) return 0;
	const variant = db.prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`).get(product.id, bucketSize);
	return variant ? variant.landing : 0;
}
function deleteBaseStock(baseId, variantId) {
	db.prepare(`DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?`).run(baseId, variantId);
}
function deleteVariant(variantId) {
	deleteVariantAndStock(db, variantId);
}
function importProductsFromExcel(filePath) {
	if (typeof filePath !== "string" || filePath.trim() === "") throw new Error("Choose an Excel file to import.");
	let workbook;
	try {
		workbook = XLSX.readFile(filePath);
	} catch (error) {
		throw new Error("Could not read the selected Excel file. Check that it is a valid, accessible workbook.", { cause: error });
	}
	const sheet = workbook.Sheets["JESTH- 2083"];
	if (!sheet) throw new Error("Sheet \"JESTH- 2083\" not found in this file.");
	const rows = XLSX.utils.sheet_to_json(sheet, {
		header: 1,
		range: 1
	});
	const BASE_DIGIT_RE = /^([A-Za-z]+)((?:\d+)(?:\/\d+)*)$/;
	const ROMAN_RE = /^([A-Za-z]+?)(I{1,3}|IV)$/;
	const ALLOWED_SIZES = new Set([
		1,
		4,
		10,
		20
	]);
	function titleCase(s) {
		return s.split(" ").map((w) => w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w).join(" ");
	}
	function toNum(v) {
		const n = parseFloat(v);
		return isNaN(n) ? null : n;
	}
	function parseColA(raw) {
		if (!raw) return [null, []];
		const s = String(raw).trim();
		if (s.toUpperCase().startsWith("PGE")) {
			const rest = s.slice(3).trim();
			const mDigit = BASE_DIGIT_RE.exec(rest);
			const mRoman = ROMAN_RE.exec(rest);
			if (mDigit) {
				const prefix = mDigit[1];
				return ["Enamel", mDigit[2].split("/").map((n) => prefix + n)];
			} else if (mRoman) return ["Enamel", [rest]];
			else return [`Enamel ${titleCase(rest)}`.trim(), []];
		}
		const parts = s.split(" ");
		let head, last;
		if (parts.length >= 2) {
			last = parts[parts.length - 1];
			head = parts.slice(0, -1).join(" ");
		} else {
			head = s;
			last = "";
		}
		const m = BASE_DIGIT_RE.exec(last);
		if (m) {
			const prefix = m[1];
			const nums = m[2].split("/");
			return [titleCase(head.trim()), nums.map((n) => prefix + n)];
		}
		return [titleCase(s), []];
	}
	const groups = [];
	let currentKey;
	let currentRows = [];
	let started = false;
	for (const r of rows) {
		const key = r[0];
		if (!started || key !== currentKey) {
			if (started) groups.push([currentKey, currentRows]);
			currentKey = key;
			currentRows = [r];
			started = true;
		} else currentRows.push(r);
	}
	if (started) groups.push([currentKey, currentRows]);
	const products = {};
	for (const [colA, groupRows] of groups) {
		const [name, bases] = parseColA(colA);
		if (!name) continue;
		if (!products[name]) products[name] = {
			bases: [],
			variants: {},
			canonicalSet: false
		};
		const product = products[name];
		for (const b of bases) if (!product.bases.includes(b)) product.bases.push(b);
		if (!product.canonicalSet) {
			if (groupRows.some((r) => toNum(r[17]) !== null && toNum(r[14]) !== null)) {
				for (const r of groupRows) {
					const size = r[1];
					if (ALLOWED_SIZES.has(size)) {
						const landing = toNum(r[17]);
						const mp = toNum(r[14]);
						let sales = toNum(r[13]);
						if (landing === null || mp === null) continue;
						if (sales === null) sales = 0;
						product.variants[size] = {
							landing,
							mp,
							sales
						};
					}
				}
				if (Object.keys(product.variants).length > 0) product.canonicalSet = true;
			}
		}
	}
	let importedCount = 0;
	let skippedCount = 0;
	db.transaction(() => {
		for (const [name, data] of Object.entries(products)) {
			const sizes = Object.keys(data.variants);
			if (sizes.length === 0) {
				skippedCount++;
				continue;
			}
			let productRow = db.prepare(`SELECT * FROM products WHERE name = ?`).get(name);
			let productId;
			if (!productRow) {
				productId = randomUUID();
				db.prepare(`INSERT INTO products (id, name, images) VALUES (?, ?, ?)`).run(productId, name, "");
			} else productId = productRow.id;
			const variantIds = {};
			for (const size of sizes) {
				const v = data.variants[size];
				let variant = db.prepare(`SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?`).get(productId, Number(size));
				if (!variant) variantIds[size] = db.prepare(`INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)`).run(productId, Number(size), v.landing, v.sales, v.mp).lastInsertRowid;
				else variantIds[size] = variant.id;
			}
			for (const baseName of data.bases) {
				let base = db.prepare(`SELECT * FROM bases WHERE product_id = ? AND name = ?`).get(productId, baseName);
				let baseId;
				if (!base) baseId = db.prepare(`INSERT INTO bases (product_id, name) VALUES (?, ?)`).run(productId, baseName).lastInsertRowid;
				else baseId = base.id;
				for (const size of sizes) {
					const variantId = variantIds[size];
					if (!db.prepare(`SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?`).get(baseId, variantId)) db.prepare(`INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)`).run(baseId, variantId);
				}
			}
			importedCount++;
		}
	})();
	return {
		imported: importedCount,
		skipped: skippedCount
	};
}
//#endregion
//#region electron/main.js
var __dirname = path.dirname(fileURLToPath(import.meta.url));
function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, "preload.cjs"),
			spellcheck: true
		}
	});
	win.webContents.session.setSpellCheckerLanguages(["en-US"]);
	win.webContents.on("context-menu", (_event, params) => {
		if (!params.misspelledWord) return;
		const suggestions = (params.dictionarySuggestions || []).slice(0, 5);
		const template = suggestions.length ? suggestions.map((suggestion) => ({
			label: suggestion,
			click: () => win.webContents.replaceMisspelling(suggestion)
		})) : [{
			label: "No spelling suggestions",
			enabled: false
		}];
		template.push({ type: "separator" }, {
			label: `Add “${params.misspelledWord}” to dictionary`,
			click: () => win.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
		});
		Menu.buildFromTemplate(template).popup({ window: win });
	});
	if (process.env.VITE_DEV_SERVER_URL) win.loadURL(process.env.VITE_DEV_SERVER_URL);
	else win.loadFile(path.join(__dirname, "../dist/index.html"));
}
protocol.registerSchemesAsPrivileged([{
	scheme: "app-image",
	privileges: {
		standard: true,
		secure: true,
		supportFetchAPI: true,
		stream: true
	}
}]);
app.whenReady().then(() => {
	protocol.handle("app-image", (request) => {
		try {
			const filePath = new URL(request.url).searchParams.get("path");
			if (!filePath) throw new Error("No path provided");
			const fileUrl = pathToFileURL(filePath).href;
			return net.fetch(fileUrl);
		} catch (err) {
			console.error("app-image protocol error:", err.message, request.url);
			return new Response("Not found", { status: 404 });
		}
	});
	ipcMain.handle("db:addProduct", (_, product) => addProduct(product));
	ipcMain.handle("db:saveInventoryProduct", (_, product) => saveInventoryProductChanges(product));
	ipcMain.handle("db:getProducts", () => getProducts());
	ipcMain.handle("db:getNextInvoiceNumber", () => getNextInvoiceNumber());
	ipcMain.handle("db:isInvoiceNumberAvailable", (_, number, excludeExpenseId) => isInvoiceNumberAvailable(number, excludeExpenseId));
	ipcMain.handle("db:deleteProduct", (_, id) => deleteProduct(id));
	ipcMain.handle("db:editProduct", (_, id, product) => editProduct(id, product));
	ipcMain.handle("db:addExpense", (_, expense) => addExpense(expense));
	ipcMain.handle("db:getExpenses", () => getExpenses());
	ipcMain.handle("db:deleteExpense", (_, id) => deleteExpense(id));
	ipcMain.handle("db:getSales", () => getSales());
	ipcMain.handle("db:getNetPosition", (_, period) => getNetPosition(period));
	ipcMain.handle("db:getProductByName", (_, name) => getProductByName(name));
	ipcMain.handle("db:getVariantBySize", (_, productId, bucketSize) => getVariantBySize(productId, bucketSize));
	ipcMain.handle("db:addVariant", (_, productId, variant) => addVariant(productId, variant));
	ipcMain.handle("db:addBase", (_, productId, baseName) => addBase(productId, baseName));
	ipcMain.handle("db:addBaseStock", (_, baseId, variantId, stock) => addBaseStock(baseId, variantId, stock));
	ipcMain.handle("db:getBaseByName", (_, productId, baseName) => getBaseByName(productId, baseName));
	ipcMain.handle("db:addCustomer", (_, customer) => addCustomer(customer));
	ipcMain.handle("db:addBill", (_, customerId, bill) => addBill(customerId, bill));
	ipcMain.handle("db:addCustomerBill", (_, customer, bill) => addCustomerBill(customer, bill));
	ipcMain.handle("db:editCustomerBill", (_, customerId, customer, billId, bill) => editCustomerBill(customerId, customer, billId, bill));
	ipcMain.handle("db:addBillActivity", (_, billId, activity) => addBillActivity(billId, activity));
	ipcMain.handle("db:getBillActivity", (_, billId) => getBillActivity(billId));
	ipcMain.handle("db:editCustomer", (_, id, customer) => editCustomer(id, customer));
	ipcMain.handle("db:getExpenseDetails", (_, id) => getExpenseDetails(id));
	ipcMain.handle("db:editExpense", (_, id, expense) => editExpense(id, expense));
	ipcMain.handle("db:editImportExpense", (_, id, expenseMeta, items) => editImportExpense(id, expenseMeta, items));
	ipcMain.handle("db:editBill", (_, billId, bill) => editBill(billId, bill));
	ipcMain.handle("db:getCustomers", () => getCustomers());
	ipcMain.handle("db:deleteCustomer", (_, id) => deleteCustomer(id));
	ipcMain.handle("db:deleteBill", (_, billId) => deleteBill(billId));
	ipcMain.handle("db:resolveImagePath", (_, relativePath) => resolveImagePath(relativePath));
	ipcMain.handle("db:createBackup", async (event) => {
		const result = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
			title: "Back Up StockWise Data",
			defaultPath: `StockWise-Backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.db`,
			filters: [{
				name: "SQLite Database",
				extensions: [
					"db",
					"sqlite",
					"sqlite3"
				]
			}]
		});
		if (result.canceled || !result.filePath) return null;
		return { filePath: await backupDatabase(result.filePath) };
	});
	ipcMain.handle("db:restoreBackup", async (event) => {
		const result = await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender), {
			title: "Restore StockWise Backup",
			properties: ["openFile"],
			filters: [{
				name: "SQLite Database",
				extensions: [
					"db",
					"sqlite",
					"sqlite3"
				]
			}]
		});
		if (result.canceled || result.filePaths.length === 0) return null;
		const restoreResult = await restoreDatabase(result.filePaths[0]);
		setTimeout(() => {
			app.relaunch();
			app.exit(0);
		}, 1e3);
		return restoreResult;
	});
	ipcMain.handle("settings:get", () => getAppSettings());
	ipcMain.handle("settings:updateDefaultPaymentMethod", (_, paymentMethod) => updateDefaultPaymentMethod(paymentMethod));
	ipcMain.handle("settings:updateInvoiceDefaults", (_, invoiceDefaults) => updateInvoiceDefaults(invoiceDefaults));
	ipcMain.handle("settings:updateInventoryAddItemMode", (_, mode) => updateInventoryAddItemMode(mode));
	ipcMain.handle("settings:openDataDirectory", async () => {
		const error = await shell.openPath(getAppSettings().dataDirectory);
		if (error) throw new Error(`Could not open the data folder: ${error}`);
	});
	ipcMain.handle("settings:changeDataDirectory", async (event) => {
		const result = await dialog.showOpenDialog(BrowserWindow.fromWebContents(event.sender), {
			title: "Choose an Empty StockWise Data Folder",
			properties: ["openDirectory"]
		});
		if (result.canceled || result.filePaths.length === 0) return null;
		const settings = await setLocalDataDirectory(result.filePaths[0]);
		setTimeout(() => {
			app.relaunch();
			app.exit(0);
		}, 1200);
		return settings;
	});
	ipcMain.handle("dialog:pickExcelFile", async () => {
		const result = await dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [{
				name: "Excel Files",
				extensions: ["xlsx", "xls"]
			}]
		});
		if (result.canceled || result.filePaths.length === 0) return null;
		return result.filePaths[0];
	});
	ipcMain.handle("db:recordImportExpense", (_, expenseMeta, items) => recordImportExpense(expenseMeta, items));
	ipcMain.handle("db:importExcel", (_, filePath) => importProductsFromExcel(filePath));
	ipcMain.handle("db:copyImage", (_, sourcePath) => copyImageToDatabase(sourcePath));
	ipcMain.handle("db:deleteBaseStock", (_, baseId, variantId) => deleteBaseStock(baseId, variantId));
	ipcMain.handle("db:deleteVariant", (_, variantId) => deleteVariant(variantId));
	ipcMain.handle("db:getTopProducts", (_, period) => getTopProducts(period));
	ipcMain.handle("db:getTopCustomers", (_, period) => getTopCustomers(period));
	ipcMain.handle("dialog:pickImage", async () => {
		const result = await dialog.showOpenDialog({
			properties: ["openFile"],
			filters: [{
				name: "Images",
				extensions: [
					"jpg",
					"jpeg",
					"png",
					"webp"
				]
			}]
		});
		if (result.canceled || result.filePaths.length === 0) return null;
		return result.filePaths[0];
	});
	createWindow();
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
//#endregion
export {};
