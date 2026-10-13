import { createRequire as e } from "node:module";
import { BrowserWindow as t, Menu as n, app as r, dialog as i, ipcMain as a, net as o, protocol as s, shell as c } from "electron";
import { fileURLToPath as l, pathToFileURL as u } from "url";
import d, { dirname as f, relative as p, resolve as m } from "path";
import * as h from "fs";
import g, { Stats as _, createReadStream as v, lstat as y, readlinkSync as b } from "fs";
import x from "util";
import S from "node:fs";
import C from "node:path";
import { randomBytes as w, randomUUID as T, scryptSync as E, timingSafeEqual as D } from "node:crypto";
import { Buffer as O } from "node:buffer";
import { randomUUID as k } from "crypto";
import { EventEmitter as A } from "events";
import { DeflateRaw as j } from "zlib";
import { access as M, constants as N } from "node:fs/promises";
import { createRequire as P } from "module";
//#region \0rolldown/runtime.js
var F = Object.create, I = Object.defineProperty, L = Object.getOwnPropertyDescriptor, R = Object.getOwnPropertyNames, z = Object.getPrototypeOf, B = Object.prototype.hasOwnProperty, V = (e, t) => () => (e && (t = e(e = 0)), t), H = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), U = (e, t) => {
	let n = {};
	for (var r in e) I(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || I(n, Symbol.toStringTag, { value: "Module" }), n;
}, W = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = R(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !B.call(e, s) && s !== n && I(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = L(t, s)) || r.enumerable
	});
	return e;
}, G = (e, t, n) => (n = e == null ? {} : F(z(e)), W(t || !e || !e.__esModule ? I(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), K = (e) => B.call(e, "module.exports") ? e["module.exports"] : W(I({}, "__esModule", { value: !0 }), e), q = /* @__PURE__ */ e(import.meta.url), J = /* @__PURE__ */ H(((e) => {
	e.getBooleanOption = (e, t) => {
		let n = !1;
		if (t in e && typeof (n = e[t]) != "boolean") throw TypeError(`Expected the "${t}" option to be a boolean`);
		return n;
	}, e.cppdb = Symbol(), e.inspect = Symbol.for("nodejs.util.inspect.custom");
})), ee = /* @__PURE__ */ H(((e, t) => {
	var n = {
		value: "SqliteError",
		writable: !0,
		enumerable: !1,
		configurable: !0
	};
	function r(e, t) {
		if (new.target !== r) return new r(e, t);
		if (typeof t != "string") throw TypeError("Expected second argument to be a string");
		Error.call(this, e), n.value = "" + e, Object.defineProperty(this, "message", n), Error.captureStackTrace(this, r), this.code = t;
	}
	Object.setPrototypeOf(r, Error), Object.setPrototypeOf(r.prototype, Error.prototype), Object.defineProperty(r.prototype, "name", n), t.exports = r;
})), te = /* @__PURE__ */ H(((e, t) => {
	var n = q("path").sep || "/";
	t.exports = r;
	function r(e) {
		if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://") throw TypeError("must pass in a file:// URI to convert to a file path");
		var t = decodeURI(e.substring(7)), r = t.indexOf("/"), i = t.substring(0, r), a = t.substring(r + 1);
		return i == "localhost" && (i = ""), i &&= n + n + i, a = a.replace(/^(.+)\|/, "$1:"), n == "\\" && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = n + a), i + a;
	}
})), ne = /* @__PURE__ */ H(((e, t) => {
	var n = q("fs"), r = q("path"), i = te(), a = r.join, o = r.dirname, s = n.accessSync && function(e) {
		try {
			n.accessSync(e);
		} catch {
			return !1;
		}
		return !0;
	} || n.existsSync || r.existsSync, c = {
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
	function l(t) {
		typeof t == "string" ? t = { bindings: t } : t ||= {}, Object.keys(c).map(function(e) {
			e in t || (t[e] = c[e]);
		}), t.module_root ||= e.getRoot(e.getFileName()), r.extname(t.bindings) != ".node" && (t.bindings += ".node");
		for (var n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : q, i = [], o = 0, s = t.try.length, l, u, d; o < s; o++) {
			l = a.apply(null, t.try[o].map(function(e) {
				return t[e] || e;
			})), i.push(l);
			try {
				return u = t.path ? n.resolve(l) : n(l), t.path || (u.path = l), u;
			} catch (e) {
				if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) throw e;
			}
		}
		throw d = /* @__PURE__ */ Error("Could not locate the bindings file. Tried:\n" + i.map(function(e) {
			return t.arrow + e;
		}).join("\n")), d.tries = i, d;
	}
	t.exports = e = l, e.getFileName = function(e) {
		var t = Error.prepareStackTrace, n = Error.stackTraceLimit, r = {}, a;
		return Error.stackTraceLimit = 10, Error.prepareStackTrace = function(t, n) {
			for (var r = 0, i = n.length; r < i; r++) if (a = n[r].getFileName(), a !== __filename) if (e) {
				if (a !== e) return;
			} else return;
		}, Error.captureStackTrace(r), r.stack, Error.prepareStackTrace = t, Error.stackTraceLimit = n, a.indexOf("file://") === 0 && (a = i(a)), a;
	}, e.getRoot = function(e) {
		for (var t = o(e), n;;) {
			if (t === "." && (t = process.cwd()), s(a(t, "package.json")) || s(a(t, "node_modules"))) return t;
			if (n === t) throw Error("Could not find module root given file: \"" + e + "\". Do you have a `package.json` file? ");
			n = t, t = a(t, "..");
		}
	};
})), re = /* @__PURE__ */ H(((e) => {
	var { cppdb: t } = J();
	e.prepare = function(e) {
		return this[t].prepare(e, this, !1);
	}, e.exec = function(e) {
		return this[t].exec(e), this;
	}, e.close = function() {
		return this[t].close(), this;
	}, e.loadExtension = function(...e) {
		return this[t].loadExtension(...e), this;
	}, e.defaultSafeIntegers = function(...e) {
		return this[t].defaultSafeIntegers(...e), this;
	}, e.unsafeMode = function(...e) {
		return this[t].unsafeMode(...e), this;
	}, e.getters = {
		name: {
			get: function() {
				return this[t].name;
			},
			enumerable: !0
		},
		open: {
			get: function() {
				return this[t].open;
			},
			enumerable: !0
		},
		inTransaction: {
			get: function() {
				return this[t].inTransaction;
			},
			enumerable: !0
		},
		readonly: {
			get: function() {
				return this[t].readonly;
			},
			enumerable: !0
		},
		memory: {
			get: function() {
				return this[t].memory;
			},
			enumerable: !0
		}
	};
})), ie = /* @__PURE__ */ H(((e, t) => {
	var { cppdb: n } = J(), r = /* @__PURE__ */ new WeakMap();
	t.exports = function(e) {
		if (typeof e != "function") throw TypeError("Expected first argument to be a function");
		let t = this[n], r = i(t, this), { apply: o } = Function.prototype, s = {
			default: { value: a(o, e, t, r.default) },
			deferred: { value: a(o, e, t, r.deferred) },
			immediate: { value: a(o, e, t, r.immediate) },
			exclusive: { value: a(o, e, t, r.exclusive) },
			database: {
				value: this,
				enumerable: !0
			}
		};
		return Object.defineProperties(s.default.value, s), Object.defineProperties(s.deferred.value, s), Object.defineProperties(s.immediate.value, s), Object.defineProperties(s.exclusive.value, s), s.default.value;
	};
	var i = (e, t) => {
		let n = r.get(e);
		if (!n) {
			let i = {
				commit: e.prepare("COMMIT", t, !1),
				rollback: e.prepare("ROLLBACK", t, !1),
				savepoint: e.prepare("SAVEPOINT `	_bs3.	`", t, !1),
				release: e.prepare("RELEASE `	_bs3.	`", t, !1),
				rollbackTo: e.prepare("ROLLBACK TO `	_bs3.	`", t, !1)
			};
			r.set(e, n = {
				default: Object.assign({ begin: e.prepare("BEGIN", t, !1) }, i),
				deferred: Object.assign({ begin: e.prepare("BEGIN DEFERRED", t, !1) }, i),
				immediate: Object.assign({ begin: e.prepare("BEGIN IMMEDIATE", t, !1) }, i),
				exclusive: Object.assign({ begin: e.prepare("BEGIN EXCLUSIVE", t, !1) }, i)
			});
		}
		return n;
	}, a = (e, t, n, { begin: r, commit: i, rollback: a, savepoint: o, release: s, rollbackTo: c }) => function() {
		let l, u, d;
		n.inTransaction ? (l = o, u = s, d = c) : (l = r, u = i, d = a), l.run();
		try {
			let n = e.call(t, this, arguments);
			if (n && typeof n.then == "function") throw TypeError("Transaction function cannot return a promise");
			return u.run(), n;
		} catch (e) {
			throw n.inTransaction && (d.run(), d !== a && u.run()), e;
		}
	};
})), ae = /* @__PURE__ */ H(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = J();
	t.exports = function(e, t) {
		if (t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		let i = n(t, "simple"), a = this[r].prepare(`PRAGMA ${e}`, this, !0);
		return i ? a.pluck().get() : a.all();
	};
})), oe = /* @__PURE__ */ H(((e, t) => {
	var n = q("fs"), r = q("path"), { promisify: i } = q("util"), { cppdb: a } = J(), o = i(n.access);
	t.exports = async function(e, t) {
		if (t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		e = e.trim();
		let n = "attached" in t ? t.attached : "main", i = "progress" in t ? t.progress : null;
		if (!e) throw TypeError("Backup filename cannot be an empty string");
		if (e === ":memory:") throw TypeError("Invalid backup filename \":memory:\"");
		if (typeof n != "string") throw TypeError("Expected the \"attached\" option to be a string");
		if (!n) throw TypeError("The \"attached\" option cannot be an empty string");
		if (i != null && typeof i != "function") throw TypeError("Expected the \"progress\" option to be a function");
		await o(r.dirname(e)).catch(() => {
			throw TypeError("Cannot save backup because the directory does not exist");
		});
		let c = await o(e).then(() => !1, () => !0);
		return s(this[a].backup(this, n, e, c), i || null);
	};
	var s = (e, t) => {
		let n = 0, r = !0;
		return new Promise((i, a) => {
			setImmediate(function o() {
				try {
					let a = e.transfer(n);
					if (!a.remainingPages) {
						e.close(), i(a);
						return;
					}
					if (r && (r = !1, n = 100), t) {
						let e = t(a);
						if (e !== void 0) if (typeof e == "number" && e === e) n = Math.max(0, Math.min(2147483647, Math.round(e)));
						else throw TypeError("Expected progress callback to return a number or undefined");
					}
					setImmediate(o);
				} catch (t) {
					e.close(), a(t);
				}
			});
		});
	};
})), se = /* @__PURE__ */ H(((e, t) => {
	var { cppdb: n } = J();
	t.exports = function(e) {
		if (e ??= {}, typeof e != "object") throw TypeError("Expected first argument to be an options object");
		let t = "attached" in e ? e.attached : "main";
		if (typeof t != "string") throw TypeError("Expected the \"attached\" option to be a string");
		if (!t) throw TypeError("The \"attached\" option cannot be an empty string");
		return this[n].serialize(t);
	};
})), ce = /* @__PURE__ */ H(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = J();
	t.exports = function(e, t, i) {
		if (t ??= {}, typeof t == "function" && (i = t, t = {}), typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof i != "function") throw TypeError("Expected last argument to be a function");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		if (!e) throw TypeError("User-defined function name cannot be an empty string");
		let a = "safeIntegers" in t ? +n(t, "safeIntegers") : 2, o = n(t, "deterministic"), s = n(t, "directOnly"), c = n(t, "varargs"), l = -1;
		if (!c) {
			if (l = i.length, !Number.isInteger(l) || l < 0) throw TypeError("Expected function.length to be a positive integer");
			if (l > 100) throw RangeError("User-defined functions cannot have more than 100 arguments");
		}
		return this[r].function(i, e, l, a, o, s), this;
	};
})), le = /* @__PURE__ */ H(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = J();
	t.exports = function(e, t) {
		if (typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object" || !t) throw TypeError("Expected second argument to be an options object");
		if (!e) throw TypeError("User-defined function name cannot be an empty string");
		let o = "start" in t ? t.start : null, s = i(t, "step", !0), c = i(t, "inverse", !1), l = i(t, "result", !1), u = "safeIntegers" in t ? +n(t, "safeIntegers") : 2, d = n(t, "deterministic"), f = n(t, "directOnly"), p = n(t, "varargs"), m = -1;
		if (!p && (m = Math.max(a(s), c ? a(c) : 0), m > 0 && --m, m > 100)) throw RangeError("User-defined functions cannot have more than 100 arguments");
		return this[r].aggregate(o, s, c, l, e, m, u, d, f), this;
	};
	var i = (e, t, n) => {
		let r = t in e ? e[t] : null;
		if (typeof r == "function") return r;
		if (r != null) throw TypeError(`Expected the "${t}" option to be a function`);
		if (n) throw TypeError(`Missing required option "${t}"`);
		return null;
	}, a = ({ length: e }) => {
		if (Number.isInteger(e) && e >= 0) return e;
		throw TypeError("Expected function.length to be a positive integer");
	};
})), Y = /* @__PURE__ */ H(((e, t) => {
	var { cppdb: n } = J();
	t.exports = function(e, t) {
		if (typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (!e) throw TypeError("Virtual table module name cannot be an empty string");
		let a = !1;
		if (typeof t == "object" && t) a = !0, t = p(i(t, "used", e));
		else {
			if (typeof t != "function") throw TypeError("Expected second argument to be a function or a table definition object");
			t = r(t);
		}
		return this[n].table(t, e, a), this;
	};
	function r(e) {
		return function(t, n, r, ...a) {
			let o = {
				module: t,
				database: n,
				table: r
			}, s = u.call(e, o, a);
			if (typeof s != "object" || !s) throw TypeError(`Virtual table module "${t}" did not return a table definition object`);
			return i(s, "returned", t);
		};
	}
	function i(e, t, n) {
		if (!l.call(e, "rows")) throw TypeError(`Virtual table module "${n}" ${t} a table definition without a "rows" property`);
		if (!l.call(e, "columns")) throw TypeError(`Virtual table module "${n}" ${t} a table definition without a "columns" property`);
		let r = e.rows;
		if (typeof r != "function" || Object.getPrototypeOf(r) !== d) throw TypeError(`Virtual table module "${n}" ${t} a table definition with an invalid "rows" property (should be a generator function)`);
		let i = e.columns;
		if (!Array.isArray(i) || !(i = [...i]).every((e) => typeof e == "string")) throw TypeError(`Virtual table module "${n}" ${t} a table definition with an invalid "columns" property (should be an array of strings)`);
		if (i.length !== new Set(i).size) throw TypeError(`Virtual table module "${n}" ${t} a table definition with duplicate column names`);
		if (!i.length) throw RangeError(`Virtual table module "${n}" ${t} a table definition with zero columns`);
		let o;
		if (l.call(e, "parameters")) {
			if (o = e.parameters, !Array.isArray(o) || !(o = [...o]).every((e) => typeof e == "string")) throw TypeError(`Virtual table module "${n}" ${t} a table definition with an invalid "parameters" property (should be an array of strings)`);
		} else o = c(r);
		if (o.length !== new Set(o).size) throw TypeError(`Virtual table module "${n}" ${t} a table definition with duplicate parameter names`);
		if (o.length > 32) throw RangeError(`Virtual table module "${n}" ${t} a table definition with more than the maximum number of 32 parameters`);
		for (let e of o) if (i.includes(e)) throw TypeError(`Virtual table module "${n}" ${t} a table definition with column "${e}" which was ambiguously defined as both a column and parameter`);
		let s = 2;
		if (l.call(e, "safeIntegers")) {
			let r = e.safeIntegers;
			if (typeof r != "boolean") throw TypeError(`Virtual table module "${n}" ${t} a table definition with an invalid "safeIntegers" property (should be a boolean)`);
			s = +r;
		}
		let u = !1;
		if (l.call(e, "directOnly") && (u = e.directOnly, typeof u != "boolean")) throw TypeError(`Virtual table module "${n}" ${t} a table definition with an invalid "directOnly" property (should be a boolean)`);
		return [
			`CREATE TABLE x(${[...o.map(f).map((e) => `${e} HIDDEN`), ...i.map(f)].join(", ")});`,
			a(r, new Map(i.map((e, t) => [e, o.length + t])), n),
			o,
			s,
			u
		];
	}
	function a(e, t, n) {
		return function* (...r) {
			let i = r.map((e) => Buffer.isBuffer(e) ? Buffer.from(e) : e);
			for (let e = 0; e < t.size; ++e) i.push(null);
			for (let a of e(...r)) if (Array.isArray(a)) o(a, i, t.size, n), yield i;
			else if (typeof a == "object" && a) s(a, i, t, n), yield i;
			else throw TypeError(`Virtual table module "${n}" yielded something that isn't a valid row object`);
		};
	}
	function o(e, t, n, r) {
		if (e.length !== n) throw TypeError(`Virtual table module "${r}" yielded a row with an incorrect number of columns`);
		let i = t.length - n;
		for (let r = 0; r < n; ++r) t[r + i] = e[r];
	}
	function s(e, t, n, r) {
		let i = 0;
		for (let a of Object.keys(e)) {
			let o = n.get(a);
			if (o === void 0) throw TypeError(`Virtual table module "${r}" yielded a row with an undeclared column "${a}"`);
			t[o] = e[a], i += 1;
		}
		if (i !== n.size) throw TypeError(`Virtual table module "${r}" yielded a row with missing columns`);
	}
	function c({ length: e }) {
		if (!Number.isInteger(e) || e < 0) throw TypeError("Expected function.length to be a positive integer");
		let t = [];
		for (let n = 0; n < e; ++n) t.push(`$${n + 1}`);
		return t;
	}
	var { hasOwnProperty: l } = Object.prototype, { apply: u } = Function.prototype, d = Object.getPrototypeOf(function* () {}), f = (e) => `"${e.replace(/"/g, "\"\"")}"`, p = (e) => () => e;
})), ue = /* @__PURE__ */ H(((e, t) => {
	var n = function() {};
	t.exports = function(e, t) {
		return Object.assign(new n(), this);
	};
})), X = /* @__PURE__ */ H(((e, t) => {
	var n = q("fs"), r = q("path"), i = J(), a = ee(), o;
	function s(e, t) {
		if (new.target == null) return new s(e, t);
		let l;
		if (Buffer.isBuffer(e) && (l = e, e = ":memory:"), e ??= "", t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		if ("readOnly" in t) throw TypeError("Misspelled option \"readOnly\" should be \"readonly\"");
		if ("memory" in t) throw TypeError("Option \"memory\" was removed in v7.0.0 (use \":memory:\" filename instead)");
		let u = e.trim(), d = u === "" || u === ":memory:", f = i.getBooleanOption(t, "readonly"), p = i.getBooleanOption(t, "fileMustExist"), m = "timeout" in t ? t.timeout : 5e3, h = "verbose" in t ? t.verbose : null, g = "nativeBinding" in t ? t.nativeBinding : null;
		if (f && d && !l) throw TypeError("In-memory/temporary databases cannot be readonly");
		if (!Number.isInteger(m) || m < 0) throw TypeError("Expected the \"timeout\" option to be a positive integer");
		if (m > 2147483647) throw RangeError("Option \"timeout\" cannot be greater than 2147483647");
		if (h != null && typeof h != "function") throw TypeError("Expected the \"verbose\" option to be a function");
		if (g != null && typeof g != "string" && typeof g != "object") throw TypeError("Expected the \"nativeBinding\" option to be a string or addon object");
		let _;
		if (_ = g == null ? o ||= ne()("better_sqlite3.node") : typeof g == "string" ? (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : q)(r.resolve(g).replace(/(\.node)?$/, ".node")) : g, _.isInitialized || (_.setErrorConstructor(a), _.isInitialized = !0), !d && !u.startsWith("file:") && !n.existsSync(r.dirname(u))) throw TypeError("Cannot open database because the directory does not exist");
		Object.defineProperties(this, {
			[i.cppdb]: { value: new _.Database(u, e, d, f, p, m, h || null, l || null) },
			...c.getters
		});
	}
	var c = re();
	s.prototype.prepare = c.prepare, s.prototype.transaction = ie(), s.prototype.pragma = ae(), s.prototype.backup = oe(), s.prototype.serialize = se(), s.prototype.function = ce(), s.prototype.aggregate = le(), s.prototype.table = Y(), s.prototype.loadExtension = c.loadExtension, s.prototype.exec = c.exec, s.prototype.close = c.close, s.prototype.defaultSafeIntegers = c.defaultSafeIntegers, s.prototype.unsafeMode = c.unsafeMode, s.prototype[i.inspect] = ue(), t.exports = s;
})), de = /* @__PURE__ */ G((/* @__PURE__ */ H(((e, t) => {
	t.exports = X(), t.exports.SqliteError = ee();
})))(), 1), fe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, pe = /^[0-9a-f]{32}$/i, me = /^[0-9a-f]{128}$/i;
function he(e) {
	if (typeof e != "string") throw Error("Username must be text.");
	let t = e.trim();
	if (!t || t.length > 64 || [...t].some((e) => {
		let t = e.codePointAt(0);
		return t < 32 || t === 127;
	})) throw Error("Username must be between 1 and 64 characters.");
	return t;
}
function ge(e) {
	if (typeof e != "string" || e.length < 8 || e.length > 1024) throw Error("Password must be between 8 and 1024 characters.");
	let t = w(16);
	return {
		passwordSalt: t.toString("hex"),
		passwordHash: E(e, t, 64).toString("hex")
	};
}
function _e(e, t) {
	if (typeof t != "string" || t.length > 1024 || !pe.test(e.passwordSalt ?? "") || !me.test(e.passwordHash ?? "")) return !1;
	let n = O.from(e.passwordSalt, "hex"), r = O.from(e.passwordHash, "hex");
	return D(E(t, n, r.length), r);
}
function ve(e) {
	if (!e || typeof e != "object" || !pe.test(e.passwordSalt ?? "") || !me.test(e.passwordHash ?? "")) throw Error("Default profile credentials are invalid.");
	return {
		passwordSalt: e.passwordSalt.toLowerCase(),
		passwordHash: e.passwordHash.toLowerCase()
	};
}
function ye(e) {
	if (!Array.isArray(e)) throw Error("Profiles must be a list.");
	let t = new Set(["user"]), n = /* @__PURE__ */ new Set();
	return e.map((e) => {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Each profile must be an object.");
		let r = e.id;
		if (typeof r != "string" || !fe.test(r) || n.has(r)) throw Error("Each profile must have a unique valid ID.");
		n.add(r);
		let i = he(e.username), a = i.toLocaleLowerCase();
		if (t.has(a)) throw Error(`The username "${i}" is already in use.`);
		if (t.add(a), !pe.test(e.passwordSalt ?? "") || !me.test(e.passwordHash ?? "")) throw Error(`Profile "${i}" has invalid password credentials.`);
		let o = e.dataDirectory ?? null;
		if (o !== null && (typeof o != "string" || !C.isAbsolute(o))) throw Error(`Profile "${i}" has an invalid data directory.`);
		return {
			id: r,
			username: i,
			passwordSalt: e.passwordSalt.toLowerCase(),
			passwordHash: e.passwordHash.toLowerCase(),
			dataDirectory: o
		};
	});
}
//#endregion
//#region src/Backend/appConfig.js
var be = "Cash", xe = [
	"Cash",
	"UPI",
	"Card",
	"Credit"
], Se = [
	"lara",
	"claude",
	"zen",
	"auto-blog"
], Ce = ["light", "dark"];
function we() {
	return {
		shopName: "",
		shopAddress: "",
		shopTelephone: "",
		invoiceNumber: "",
		tpinNumber: "",
		vatPercent: "13"
	};
}
function Te() {
	return {
		defaultPaymentMethod: be,
		dataDirectory: null,
		invoiceDefaults: we(),
		inventoryAddItemMode: null,
		appearanceTheme: "lara",
		appearanceMode: "dark",
		profiles: [],
		activeProfileId: "user",
		defaultProfileCredentials: null
	};
}
function Ee(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Application settings must be a JSON object.");
	let t = e.defaultPaymentMethod ?? "Cash";
	if (!xe.includes(t)) throw Error("Default payment method must be Cash, UPI, Card, or Credit.");
	let n = e.dataDirectory ?? null;
	if (n !== null && (typeof n != "string" || !C.isAbsolute(n))) throw Error("The configured data directory must be an absolute path.");
	let r = e.invoiceDefaults ?? we();
	if (!r || typeof r != "object" || Array.isArray(r)) throw Error("Invoice defaults must be a JSON object.");
	let i = we();
	for (let e of Object.keys(i)) {
		let t = r[e] ?? i[e];
		if (typeof t != "string") throw Error(`Invoice default "${e}" must be text.`);
		i[e] = t.trim();
	}
	let a = Number(i.vatPercent);
	if (!i.vatPercent.trim() || !Number.isFinite(a) || a < 0 || a > 100) throw Error("Default VAT percentage must be between 0 and 100.");
	let o = e.inventoryAddItemMode ?? null;
	if (o !== null && !["default", "bill"].includes(o)) throw Error("Inventory add item mode must be \"default\", \"bill\", or null.");
	let s = e.appearanceTheme ?? "lara";
	if (!Se.includes(s)) throw Error(`Appearance theme must be one of: ${Se.join(", ")}.`);
	let c = e.appearanceMode ?? "dark";
	if (!Ce.includes(c)) throw Error("Appearance mode must be \"light\" or \"dark\".");
	let l = ye(e.profiles ?? []), u = e.defaultProfileCredentials == null ? null : ve(e.defaultProfileCredentials), d = e.activeProfileId ?? "user";
	if (typeof d != "string" || d !== "user" && !l.some((e) => e.id === d)) throw Error("The active profile must exist in the profile list.");
	return {
		defaultPaymentMethod: t,
		dataDirectory: n,
		invoiceDefaults: i,
		inventoryAddItemMode: o,
		appearanceTheme: s,
		appearanceMode: c,
		profiles: l,
		activeProfileId: d,
		defaultProfileCredentials: u
	};
}
function De(e) {
	if (!S.existsSync(e)) return Te();
	let t;
	try {
		t = JSON.parse(S.readFileSync(e, "utf8"));
	} catch (t) {
		throw Error(`Could not read application settings at "${e}".`, { cause: t });
	}
	return Ee(t);
}
function Oe(e, t) {
	let n = Ee(t), r = C.dirname(e);
	S.mkdirSync(r, { recursive: !0 });
	let i = C.join(r, `.settings-${T()}.tmp`);
	try {
		S.writeFileSync(i, `${JSON.stringify(n, null, 2)}\n`, {
			encoding: "utf8",
			flag: "wx"
		}), S.renameSync(i, e);
	} catch (t) {
		throw S.rmSync(i, { force: !0 }), Error(`Could not save application settings at "${e}".`, { cause: t });
	}
	return n;
}
function ke({ config: e, isPackaged: t, userDataPath: n, developmentPath: r }) {
	let i = Ee(e);
	return C.resolve(i.dataDirectory || (t ? n : r));
}
async function Ae(e, t, n) {
	let r = C.resolve(t), i = C.resolve(n);
	if (r === i) throw Error("Choose a different folder from the current data directory.");
	if (S.mkdirSync(i, { recursive: !0 }), S.readdirSync(i).length > 0) throw Error("Choose an empty folder for the StockWise data copy.");
	let a = S.mkdtempSync(C.join(i, ".stockwise-setup-")), o = C.basename(e.name || "inventory.db"), s = C.join(a, o), c = C.join(a, "images"), l = [];
	try {
		await e.backup(s);
		let t = C.join(r, "images");
		S.existsSync(t) && S.cpSync(t, c, {
			recursive: !0,
			errorOnExist: !0
		});
		let n = C.join(i, o);
		if (S.renameSync(s, n), l.push(n), S.existsSync(c)) {
			let e = C.join(i, "images");
			S.renameSync(c, e), l.push(e);
		}
	} catch (e) {
		for (let e of l) S.rmSync(e, {
			recursive: !0,
			force: !0
		});
		throw Error(`Could not copy StockWise data to "${i}".`, { cause: e });
	} finally {
		S.rmSync(a, {
			recursive: !0,
			force: !0
		});
	}
	return i;
}
//#endregion
//#region src/Backend/migrations.js
var je = [
	{
		version: 1,
		up(e) {
			e.exec("\n        CREATE TABLE IF NOT EXISTS products (\n          id TEXT PRIMARY KEY,\n          name TEXT NOT NULL,\n          images TEXT\n        );\n\n        CREATE TABLE IF NOT EXISTS variants (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          product_id TEXT NOT NULL,\n          bucket_size REAL NOT NULL,\n          landing REAL,\n          sales REAL,\n          mp REAL,\n          FOREIGN KEY (product_id) REFERENCES products(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bases (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          product_id TEXT NOT NULL,\n          name TEXT NOT NULL,\n          FOREIGN KEY (product_id) REFERENCES products(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS base_stock (\n          base_id INTEGER NOT NULL,\n          variant_id INTEGER NOT NULL,\n          stock REAL NOT NULL DEFAULT 0,\n          PRIMARY KEY (base_id, variant_id),\n          FOREIGN KEY (base_id) REFERENCES bases(id),\n          FOREIGN KEY (variant_id) REFERENCES variants(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS customers (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          name TEXT NOT NULL,\n          phone TEXT,\n          address TEXT,\n          notes TEXT\n        );\n\n        CREATE TABLE IF NOT EXISTS expenses (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          date TEXT NOT NULL,\n          label TEXT NOT NULL,\n          amount REAL NOT NULL,\n          type TEXT DEFAULT 'General'\n        );\n\n        CREATE TABLE IF NOT EXISTS expense_items (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          expense_id INTEGER NOT NULL,\n          product_name TEXT NOT NULL,\n          base TEXT,\n          bucket_size REAL,\n          quantity REAL NOT NULL,\n          cost_price REAL NOT NULL,\n          FOREIGN KEY (expense_id) REFERENCES expenses(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bills (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          customer_id INTEGER NOT NULL,\n          date TEXT NOT NULL,\n          payment_method TEXT,\n          total_purchased REAL NOT NULL,\n          amount_paid REAL NOT NULL,\n          amount_due REAL NOT NULL,\n          status TEXT NOT NULL,\n          FOREIGN KEY (customer_id) REFERENCES customers(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bill_activity (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          bill_id INTEGER NOT NULL,\n          type TEXT NOT NULL,\n          date TEXT NOT NULL,\n          amount REAL NOT NULL DEFAULT 0,\n          payment_method TEXT,\n          note TEXT,\n          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,\n          FOREIGN KEY (bill_id) REFERENCES bills(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bill_items (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          bill_id INTEGER NOT NULL,\n          product_name TEXT NOT NULL,\n          base TEXT,\n          bucket_size REAL,\n          quantity REAL NOT NULL,\n          price_at_sale REAL NOT NULL,\n          cost_price REAL DEFAULT 0,\n          FOREIGN KEY (bill_id) REFERENCES bills(id)\n        );\n      "), e.prepare("PRAGMA table_info(bill_items)").all().some((e) => e.name === "cost_price") || e.exec("ALTER TABLE bill_items ADD COLUMN cost_price REAL DEFAULT 0");
		}
	},
	{
		version: 2,
		up(e) {
			e.prepare("PRAGMA table_info(expenses)").all().some((e) => e.name === "invoice_data") || e.exec("ALTER TABLE expenses ADD COLUMN invoice_data TEXT");
		}
	},
	{
		version: 3,
		up(e) {
			if (!e.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'bills'").get()) return;
			let t = e.prepare("PRAGMA table_info(bills)").all();
			for (let [n, r] of [
				["bill_type", "TEXT NOT NULL DEFAULT 'default'"],
				["pan_number", "TEXT"],
				["bill_number", "TEXT"],
				["invoice_data", "TEXT"]
			]) t.some((e) => e.name === n) || e.exec(`ALTER TABLE bills ADD COLUMN ${n} ${r}`);
		}
	},
	{
		version: 4,
		up(e) {
			e.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'customers'").get() && (e.prepare("PRAGMA table_info(customers)").all().some((e) => e.name === "notes") || e.exec("ALTER TABLE customers ADD COLUMN notes TEXT"));
		}
	}
];
function Me(e) {
	let t = e.pragma("user_version", { simple: !0 }), n = je.at(-1)?.version ?? 0;
	if (t > n) throw Error(`Database schema version ${t} is newer than supported version ${n}.`);
	for (let n of je) if (!(n.version <= t)) {
		if (n.version !== t + 1) throw Error(`Missing database migration for version ${t + 1}.`);
		e.transaction(() => {
			n.up(e), e.pragma(`user_version = ${n.version}`);
		})(), t = n.version;
	}
	return t;
}
//#endregion
//#region src/Backend/services/settingsProfiles.js
function Ne(e) {
	function t(t) {
		return e.appConfig.profiles.find((e) => e.id === t) ?? null;
	}
	function n(n) {
		if (n === "user") return ke({
			config: e.appConfig,
			isPackaged: e.app.isPackaged,
			userDataPath: e.userDataPath,
			developmentPath: d.join(e.__dirname, "../", "Database")
		});
		let r = t(n);
		if (!r) throw Error("The selected profile does not exist.");
		return d.resolve(r.dataDirectory || d.join(e.userDataPath, "profiles", r.id));
	}
	function r(e) {
		return {
			id: e.id,
			username: e.username,
			isDefault: !1
		};
	}
	function i() {
		let t = { ...e.appConfig };
		return delete t.defaultProfileCredentials, delete t.profiles, {
			...t,
			dataDirectory: e.dataDirectory,
			activeProfileId: e.appConfig.activeProfileId,
			defaultProfilePasswordSet: !!e.appConfig.defaultProfileCredentials,
			profiles: [{
				id: "user",
				username: "user",
				isDefault: !0
			}, ...e.appConfig.profiles.map(r)]
		};
	}
	function a(t) {
		if (e.appConfig.defaultProfileCredentials) throw Error("The default profile password has already been set.");
		return e.appConfig = Oe(e.appConfigPath, {
			...e.appConfig,
			defaultProfileCredentials: ge(t)
		}), i();
	}
	function o(t, n) {
		let r = he(t);
		if (r.toLocaleLowerCase() === "user" || e.appConfig.profiles.some((e) => e.username.toLocaleLowerCase() === r.toLocaleLowerCase())) throw Error(`The username "${r}" is already in use.`);
		let a = {
			id: k(),
			username: r,
			...ge(n),
			dataDirectory: null
		}, o = d.join(e.userDataPath, "profiles", a.id);
		g.mkdirSync(o, { recursive: !0 });
		let s = d.join(o, "inventory.db");
		try {
			let t = new de.default(s);
			try {
				Me(t);
			} finally {
				t.close();
			}
			return e.appConfig = Oe(e.appConfigPath, {
				...e.appConfig,
				profiles: [...e.appConfig.profiles, a]
			}), i();
		} catch (e) {
			throw g.rmSync(o, {
				recursive: !0,
				force: !0
			}), e;
		}
	}
	function s(r, a, o) {
		let s = he(a), c;
		if (r === "user") {
			if (s.toLocaleLowerCase() !== "user" || !e.appConfig.defaultProfileCredentials || !_e(e.appConfig.defaultProfileCredentials, o)) throw Error("The username or password is incorrect.");
		} else if (c = t(r), !c || c.username.toLocaleLowerCase() !== s.toLocaleLowerCase() || !_e(c, o)) throw Error("The username or password is incorrect.");
		let l = n(r), u = d.join(l, "inventory.db");
		if (r === e.appConfig.activeProfileId) return i();
		g.mkdirSync(l, { recursive: !0 });
		let f = new de.default(u);
		try {
			Me(f);
			let t = Oe(e.appConfigPath, {
				...e.appConfig,
				activeProfileId: r
			}), n = e.db;
			return e.db = f, e.dataDirectory = l, e.dbPath = u, e.appConfig = t, n.close(), i();
		} catch (t) {
			throw f.open && f !== e.db && f.close(), t;
		}
	}
	function c(t) {
		return e.appConfig = Oe(e.appConfigPath, {
			...e.appConfig,
			defaultPaymentMethod: t
		}), i();
	}
	function l(t) {
		return e.appConfig = Oe(e.appConfigPath, {
			...e.appConfig,
			invoiceDefaults: t
		}), i();
	}
	function u(t) {
		return e.appConfig = Oe(e.appConfigPath, {
			...e.appConfig,
			inventoryAddItemMode: t
		}), i();
	}
	function f(t, n) {
		return e.appConfig = Oe(e.appConfigPath, {
			...e.appConfig,
			appearanceTheme: t,
			appearanceMode: n
		}), i();
	}
	async function p(t) {
		if (typeof t != "string" || !t.trim()) throw Error("A data directory is required.");
		let n = d.resolve(t);
		if (n === e.dataDirectory) throw Error("Choose a different folder from the current data directory.");
		await Ae(e.db, e.dataDirectory, n);
		let r;
		try {
			r = e.appConfig.activeProfileId === "user" ? Oe(e.appConfigPath, {
				...e.appConfig,
				dataDirectory: n
			}) : Oe(e.appConfigPath, {
				...e.appConfig,
				profiles: e.appConfig.profiles.map((t) => t.id === e.appConfig.activeProfileId ? {
					...t,
					dataDirectory: n
				} : t)
			});
		} catch (e) {
			try {
				g.rmSync(d.join(n, "inventory.db"), { force: !0 }), g.rmSync(d.join(n, "images"), {
					recursive: !0,
					force: !0
				});
			} catch (t) {
				throw AggregateError([e, t], "Could not save the new data folder setting or clean up its copied files.", { cause: t });
			}
			throw e;
		}
		return e.appConfig = r, i();
	}
	return {
		getAppSettings: i,
		setDefaultProfilePassword: a,
		createProfile: o,
		switchProfile: s,
		updateDefaultPaymentMethod: c,
		updateInvoiceDefaults: l,
		updateInventoryAddItemMode: u,
		updateAppearanceSettings: f,
		setLocalDataDirectory: p
	};
}
//#endregion
//#region src/Backend/databaseBackup.js
var Pe = {
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
}, Fe = {
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
function Ie(e) {
	let t = e.pragma("integrity_check", { simple: !0 });
	if (t !== "ok") throw Error(`SQLite integrity check failed: ${t}`);
}
function Le(e, t = !1) {
	let n = t ? Pe : Fe, r = new Set(e.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((e) => e.name));
	if (Object.entries(n).filter(([t, n]) => {
		if (!r.has(t)) return !0;
		let i = new Set(e.prepare(`PRAGMA table_info(${t})`).all().map((e) => e.name));
		return n.some((e) => !i.has(e));
	}).length > 0) throw Error("The selected file does not contain a complete StockWise database schema.");
}
async function Re(e, t) {
	if (!e.open) throw Error("The active database is not open.");
	let n = C.resolve(t);
	if (e.name && C.resolve(e.name) === n) throw Error("Choose a different file from the active database.");
	return await e.backup(n), n;
}
async function ze(e, t) {
	let n = C.resolve(e), r = C.resolve(t);
	if (n === r) throw Error("The restore source and staging file must be different.");
	if (S.existsSync(r)) throw Error("The restore staging file already exists.");
	try {
		let e = new de.default(n, {
			readonly: !0,
			fileMustExist: !0
		});
		try {
			Ie(e), Le(e), await e.backup(r);
		} finally {
			e.close();
		}
		let t = new de.default(r);
		try {
			let e = Me(t);
			return Ie(t), Le(t, !0), { schemaVersion: e };
		} finally {
			t.close();
		}
	} catch (e) {
		throw S.rmSync(r, { force: !0 }), e;
	}
}
function Be(e, t, n) {
	S.renameSync(e, n);
	try {
		S.renameSync(t, e);
	} catch (t) {
		try {
			S.renameSync(n, e);
		} catch (e) {
			throw AggregateError([t, e], "Restore activation failed and the original database could not be put back.", { cause: e });
		}
		throw Error(t.message, { cause: t });
	}
}
//#endregion
//#region node_modules/is-stream/index.js
function Ve(e, { checkOpen: t = !0 } = {}) {
	return typeof e == "object" && !!e && (e.writable || e.readable || !t || e.writable === void 0 && e.readable === void 0) && typeof e.pipe == "function";
}
//#endregion
//#region node_modules/balanced-match/dist/esm/index.js
var He = (e, t, n) => {
	let r = e instanceof RegExp ? Ue(e, n) : e, i = t instanceof RegExp ? Ue(t, n) : t, a = r !== null && i != null && We(r, i, n);
	return a && {
		start: a[0],
		end: a[1],
		pre: n.slice(0, a[0]),
		body: n.slice(a[0] + r.length, a[1]),
		post: n.slice(a[1] + i.length)
	};
}, Ue = (e, t) => {
	let n = t.match(e);
	return n ? n[0] : null;
}, We = (e, t, n) => {
	let r, i, a, o, s, c = n.indexOf(e), l = n.indexOf(t, c + 1), u = c;
	if (c >= 0 && l > 0) {
		if (e === t) return [c, l];
		for (r = [], a = n.length; u >= 0 && !s;) {
			if (u === c) r.push(u), c = n.indexOf(e, u + 1);
			else if (r.length === 1) {
				let e = r.pop();
				e !== void 0 && (s = [e, l]);
			} else i = r.pop(), i !== void 0 && i < a && (a = i, o = l), l = n.indexOf(t, u + 1);
			u = c < l && c >= 0 ? c : l;
		}
		r.length && o !== void 0 && (s = [a, o]);
	}
	return s;
}, Ge = "\0SLASH" + Math.random() + "\0", Ke = "\0OPEN" + Math.random() + "\0", qe = "\0CLOSE" + Math.random() + "\0", Je = "\0COMMA" + Math.random() + "\0", Ye = "\0PERIOD" + Math.random() + "\0", Xe = new RegExp(Ge, "g"), Ze = new RegExp(Ke, "g"), Qe = new RegExp(qe, "g"), $e = new RegExp(Je, "g"), et = new RegExp(Ye, "g"), tt = /\\\\/g, nt = /\\{/g, rt = /\\}/g, it = /\\,/g, at = /\\\./g, ot = 1e5, st = 4e6;
function ct(e) {
	return isNaN(e) ? e.charCodeAt(0) : parseInt(e, 10);
}
function lt(e) {
	return e.replace(tt, Ge).replace(nt, Ke).replace(rt, qe).replace(it, Je).replace(at, Ye);
}
function ut(e) {
	return e.replace(Xe, "\\").replace(Ze, "{").replace(Qe, "}").replace($e, ",").replace(et, ".");
}
function dt(e) {
	if (!e) return [""];
	let t = [], n = He("{", "}", e);
	if (!n) return e.split(",");
	let { pre: r, body: i, post: a } = n, o = r.split(",");
	o[o.length - 1] += "{" + i + "}";
	let s = dt(a);
	return a.length && (o[o.length - 1] += s.shift(), o.push.apply(o, s)), t.push.apply(t, o), t;
}
function ft(e, t = {}) {
	if (!e) return [];
	let { max: n = ot, maxLength: r = st } = t;
	return e.slice(0, 2) === "{}" && (e = "\\{\\}" + e.slice(2)), yt(lt(e), n, r, !0).map(ut);
}
function pt(e) {
	return "{" + e + "}";
}
function mt(e) {
	return /^-?0\d/.test(e);
}
function ht(e, t) {
	return e <= t;
}
function gt(e, t) {
	return e >= t;
}
function _t(e, t, n, r, i, a) {
	let o = [], s = 0;
	for (let c = 0; c < e.length; c++) for (let l = 0; l < n.length; l++) {
		if (o.length >= r) return o;
		let u = e[c] + t + n[l];
		if (!(a && !u)) {
			if (s + u.length > i) return o;
			o.push(u), s += u.length;
		}
	}
	return o;
}
function vt(e, t, n, r) {
	let i = e.split(/\.\./), a = [];
	/* c8 ignore start */
	if (i[0] === void 0 || i[1] === void 0) return a;
	/* c8 ignore stop */
	let o = ct(i[0]), s = ct(i[1]), c = Math.max(i[0].length, i[1].length), l = i.length === 3 && i[2] !== void 0 ? Math.max(Math.abs(ct(i[2])), 1) : 1, u = ht;
	s < o && (l *= -1, u = gt);
	let d = i.some(mt), f = 0;
	for (let e = o; u(e, s) && a.length < n; e += l) {
		let n;
		if (t) n = String.fromCharCode(e), n === "\\" && (n = "");
		else if (n = String(e), d) {
			let t = c - n.length;
			if (t > 0) {
				let r = Array(t + 1).join("0");
				n = e < 0 ? "-" + r + n.slice(1) : r + n;
			}
		}
		if (f + n.length > r) break;
		a.push(n), f += n.length;
	}
	return a;
}
function yt(e, t, n, r) {
	let i = [""], a = !1, o = !0;
	for (;;) {
		let s = He("{", "}", e);
		if (!s) return _t(i, e, [""], t, n, a);
		let c = s.pre;
		if (/\$$/.test(c)) {
			if (i = _t(i, c + "{" + s.body + "}", [""], t, n, a && !s.post.length), o = !1, !s.post.length) break;
			e = s.post;
			continue;
		}
		let l = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body), u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body), d = l || u, f = s.body.indexOf(",") >= 0;
		if (!d && !f) {
			if (s.post.match(/,(?!,).*\}/)) {
				e = s.pre + "{" + s.body + qe + s.post, r = !0;
				continue;
			}
			return _t(i, c + "{" + s.body + "}" + s.post, [""], t, n, a);
		}
		o &&= (a = r && !d, !1);
		let p;
		if (d) p = vt(s.body, u, t, n);
		else {
			let r = dt(s.body);
			if (r.length === 1 && r[0] !== void 0 && (r = yt(r[0], t, n, !1).map(pt), r.length === 1)) {
				if (i = _t(i, c + r[0], [""], t, n, a && !s.post.length), !s.post.length) break;
				e = s.post;
				continue;
			}
			let o = a && !s.post.length && !c;
			for (let e = 0; o && e < i.length; e++) i[e] && (o = !1);
			p = [];
			let l = 0;
			outer: for (let e = 0; e < r.length; e++) {
				let i = yt(r[e], t, n, !1);
				for (let e = 0; e < i.length; e++) {
					let r = i[e];
					if (!(o && !r)) {
						if (p.length >= t || l + r.length > n) break outer;
						p.push(r), l += r.length;
					}
				}
			}
		}
		if (i = _t(i, c, p, t, n, a && !s.post.length), !s.post.length) break;
		e = s.post;
	}
	return i;
}
//#endregion
//#region node_modules/minimatch/dist/esm/assert-valid-pattern.js
var bt = 1024 * 64, xt = (e) => {
	if (typeof e != "string") throw TypeError("invalid pattern");
	if (e.length > bt) throw TypeError("pattern is too long");
}, St = {
	"[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
	"[:alpha:]": ["\\p{L}\\p{Nl}", !0],
	"[:ascii:]": ["\\x00-\\x7f", !1],
	"[:blank:]": ["\\p{Zs}\\t", !0],
	"[:cntrl:]": ["\\p{Cc}", !0],
	"[:digit:]": ["\\p{Nd}", !0],
	"[:graph:]": [
		"\\p{Z}\\p{C}",
		!0,
		!0
	],
	"[:lower:]": ["\\p{Ll}", !0],
	"[:print:]": ["\\p{C}", !0],
	"[:punct:]": ["\\p{P}", !0],
	"[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
	"[:upper:]": ["\\p{Lu}", !0],
	"[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
	"[:xdigit:]": ["A-Fa-f0-9", !1]
}, Ct = (e) => e.replace(/[[\]\\-]/g, "\\$&"), wt = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), Tt = (e) => e.join(""), Et = (e, t) => {
	let n = t;
	/* c8 ignore start */
	if (e.charAt(n) !== "[") throw Error("not in a brace expression");
	/* c8 ignore stop */
	let r = [], i = [], a = n + 1, o = !1, s = !1, c = !1, l = !1, u = n, d = "";
	WHILE: for (; a < e.length;) {
		let t = e.charAt(a);
		if ((t === "!" || t === "^") && a === n + 1) {
			l = !0, a++;
			continue;
		}
		if (t === "]" && o && !c) {
			u = a + 1;
			break;
		}
		if (o = !0, t === "\\" && !c) {
			c = !0, a++;
			continue;
		}
		if (t === "[" && !c) {
			for (let [t, [o, c, l]] of Object.entries(St)) if (e.startsWith(t, a)) {
				if (d) return [
					"$.",
					!1,
					e.length - n,
					!0
				];
				a += t.length, l ? i.push(o) : r.push(o), s ||= c;
				continue WHILE;
			}
		}
		if (c = !1, d) {
			t > d ? r.push(Ct(d) + "-" + Ct(t)) : t === d && r.push(Ct(t)), d = "", a++;
			continue;
		}
		if (e.startsWith("-]", a + 1)) {
			r.push(Ct(t + "-")), a += 2;
			continue;
		}
		if (e.startsWith("-", a + 1)) {
			d = t, a += 2;
			continue;
		}
		r.push(Ct(t)), a++;
	}
	if (u < a) return [
		"",
		!1,
		0,
		!1
	];
	if (!r.length && !i.length) return [
		"$.",
		!1,
		e.length - n,
		!0
	];
	if (i.length === 0 && r.length === 1 && /^\\?.$/.test(r[0]) && !l) return [
		wt(r[0].length === 2 ? r[0].slice(-1) : r[0]),
		!1,
		u - n,
		!1
	];
	let f = "[" + (l ? "^" : "") + Tt(r) + "]", p = "[" + (l ? "" : "^") + Tt(i) + "]";
	return [
		r.length && i.length ? "(" + f + "|" + p + ")" : r.length ? f : p,
		s,
		u - n,
		!0
	];
}, Dt = (e, { windowsPathsNoEscape: t = !1, magicalBraces: n = !0 } = {}) => n ? t ? e.replace(/\[([^/\\])\]/g, "$1") : e.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1") : t ? e.replace(/\[([^/\\{}])\]/g, "$1") : e.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1"), Ot, kt = new Set([
	"!",
	"?",
	"+",
	"*",
	"@"
]), At = (e) => kt.has(e), jt = (e) => At(e.type), Mt = new Map([
	["!", ["@"]],
	["?", ["?", "@"]],
	["@", ["@"]],
	["*", [
		"*",
		"+",
		"?",
		"@"
	]],
	["+", ["+", "@"]]
]), Nt = new Map([
	["!", ["?"]],
	["@", ["?"]],
	["+", ["?", "*"]]
]), Pt = new Map([
	["!", ["?", "@"]],
	["?", ["?", "@"]],
	["@", ["?", "@"]],
	["*", [
		"*",
		"+",
		"?",
		"@"
	]],
	["+", [
		"+",
		"@",
		"?",
		"*"
	]]
]), Ft = new Map([
	["!", new Map([["!", "@"]])],
	["?", new Map([["*", "*"], ["+", "*"]])],
	["@", new Map([
		["!", "!"],
		["?", "?"],
		["@", "@"],
		["*", "*"],
		["+", "+"]
	])],
	["+", new Map([["?", "*"], ["*", "*"]])]
]), It = "(?!(?:^|/)\\.\\.?(?:$|/))", Lt = "(?!\\.)", Rt = new Set(["[", "."]), zt = new Set(["..", "."]), Bt = /* @__PURE__ */ new Set("().*{}+?[]^$\\!"), Vt = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), Ht = "[^/]", Ut = "[^/]*?", Wt = "[^/]+?", Gt = 0, Kt = class {
	type;
	#e;
	#t;
	#n = !1;
	#r = [];
	#i;
	#a;
	#o;
	#s = !1;
	#c;
	#l;
	#u = !1;
	id = ++Gt;
	get depth() {
		return (this.#i?.depth ?? -1) + 1;
	}
	[Symbol.for("nodejs.util.inspect.custom")]() {
		return {
			"@@type": "AST",
			id: this.id,
			type: this.type,
			root: this.#e.id,
			parent: this.#i?.id,
			depth: this.depth,
			partsLength: this.#r.length,
			parts: this.#r
		};
	}
	constructor(e, t, n = {}) {
		this.type = e, e && (this.#t = !0), this.#i = t, this.#e = this.#i ? this.#i.#e : this, this.#c = this.#e === this ? n : this.#e.#c, this.#o = this.#e === this ? [] : this.#e.#o, e === "!" && !this.#e.#s && this.#o.push(this), this.#a = this.#i ? this.#i.#r.length : 0;
	}
	get hasMagic() {
		/* c8 ignore start */
		if (this.#t !== void 0) return this.#t;
		/* c8 ignore stop */
		for (let e of this.#r) if (typeof e != "string" && (e.type || e.hasMagic)) return this.#t = !0;
		return this.#t;
	}
	toString() {
		return this.#l === void 0 ? this.type ? this.#l = this.type + "(" + this.#r.map((e) => String(e)).join("|") + ")" : this.#l = this.#r.map((e) => String(e)).join("") : this.#l;
	}
	#d() {
		/* c8 ignore start */
		if (this !== this.#e) throw Error("should only call on root");
		if (this.#s) return this;
		this.toString(), this.#s = !0;
		let e;
		for (; e = this.#o.pop();) {
			if (e.type !== "!") continue;
			let t = e, n = t.#i;
			for (; n;) {
				for (let r = t.#a + 1; !n.type && r < n.#r.length; r++) for (let t of e.#r) {
					/* c8 ignore start */
					if (typeof t == "string") throw Error("string part in extglob AST??");
					/* c8 ignore stop */
					t.copyIn(n.#r[r]);
				}
				t = n, n = t.#i;
			}
		}
		return this;
	}
	push(...e) {
		for (let t of e) if (t !== "") {
			/* c8 ignore start */
			if (typeof t != "string" && !(t instanceof Ot && t.#i === this)) throw Error("invalid part: " + t);
			/* c8 ignore stop */
			this.#r.push(t);
		}
	}
	toJSON() {
		let e = this.type === null ? this.#r.slice().map((e) => typeof e == "string" ? e : e.toJSON()) : [this.type, ...this.#r.map((e) => e.toJSON())];
		return this.isStart() && !this.type && e.unshift([]), this.isEnd() && (this === this.#e || this.#e.#s && this.#i?.type === "!") && e.push({}), e;
	}
	isStart() {
		if (this.#e === this) return !0;
		if (!this.#i?.isStart()) return !1;
		if (this.#a === 0) return !0;
		let e = this.#i;
		for (let t = 0; t < this.#a; t++) {
			let n = e.#r[t];
			if (!(n instanceof Ot && n.type === "!")) return !1;
		}
		return !0;
	}
	isEnd() {
		if (this.#e === this || this.#i?.type === "!") return !0;
		if (!this.#i?.isEnd()) return !1;
		if (!this.type) return this.#i?.isEnd();
		/* c8 ignore start */
		let e = this.#i ? this.#i.#r.length : 0;
		/* c8 ignore stop */
		return this.#a === e - 1;
	}
	copyIn(e) {
		typeof e == "string" ? this.push(e) : this.push(e.clone(this));
	}
	clone(e) {
		let t = new Ot(this.type, e);
		for (let e of this.#r) t.copyIn(e);
		return t;
	}
	static #f(e, t, n, r, i) {
		let a = r.maxExtglobRecursion ?? 2, o = !1, s = !1, c = -1, l = !1;
		if (t.type === null) {
			let u = n, d = "";
			for (; u < e.length;) {
				let n = e.charAt(u++);
				if (o || n === "\\") {
					o = !o, d += n;
					continue;
				}
				if (s) {
					u === c + 1 ? (n === "^" || n === "!") && (l = !0) : n === "]" && !(u === c + 2 && l) && (s = !1), d += n;
					continue;
				} else if (n === "[") {
					s = !0, c = u, l = !1, d += n;
					continue;
				}
				if (!r.noext && At(n) && e.charAt(u) === "(" && i <= a) {
					t.push(d), d = "";
					let a = new Ot(n, t);
					u = Ot.#f(e, a, u, r, i + 1), t.push(a);
					continue;
				}
				d += n;
			}
			return t.push(d), u;
		}
		let u = n + 1, d = new Ot(null, t), f = [], p = "";
		for (; u < e.length;) {
			let n = e.charAt(u++);
			if (o || n === "\\") {
				o = !o, p += n;
				continue;
			}
			if (s) {
				u === c + 1 ? (n === "^" || n === "!") && (l = !0) : n === "]" && !(u === c + 2 && l) && (s = !1), p += n;
				continue;
			} else if (n === "[") {
				s = !0, c = u, l = !1, p += n;
				continue;
			}
			/* c8 ignore stop */
			if (!r.noext && At(n) && e.charAt(u) === "(" && (i <= a || t && t.#h(n))) {
				let a = t && t.#h(n) ? 0 : 1;
				d.push(p), p = "";
				let o = new Ot(n, d);
				d.push(o), u = Ot.#f(e, o, u, r, i + a);
				continue;
			}
			if (n === "|") {
				d.push(p), p = "", f.push(d), d = new Ot(null, t);
				continue;
			}
			if (n === ")") return p === "" && t.#r.length === 0 && (t.#u = !0), d.push(p), p = "", t.push(...f, d), u;
			p += n;
		}
		return t.type = null, t.#t = void 0, t.#r = [e.substring(n - 1)], u;
	}
	#p(e) {
		return this.#m(e, Nt);
	}
	#m(e, t = Mt) {
		if (!e || typeof e != "object" || e.type !== null || e.#r.length !== 1 || this.type === null) return !1;
		let n = e.#r[0];
		return !n || typeof n != "object" || n.type === null ? !1 : this.#h(n.type, t);
	}
	#h(e, t = Pt) {
		return !!t.get(this.type)?.includes(e);
	}
	#g(e, t) {
		let n = e.#r[0], r = new Ot(null, n, this.options);
		r.#r.push(""), n.push(r), this.#_(e, t);
	}
	#_(e, t) {
		let n = e.#r[0];
		this.#r.splice(t, 1, ...n.#r);
		for (let e of n.#r) typeof e == "object" && (e.#i = this);
		this.#l = void 0;
	}
	#v(e) {
		return !!Ft.get(this.type)?.has(e);
	}
	#y(e) {
		if (!e || typeof e != "object" || e.type !== null || e.#r.length !== 1 || this.type === null || this.#r.length !== 1) return !1;
		let t = e.#r[0];
		return !t || typeof t != "object" || t.type === null ? !1 : this.#v(t.type);
	}
	#b(e) {
		let t = Ft.get(this.type), n = e.#r[0], r = t?.get(n.type);
		/* c8 ignore start - impossible */
		if (!r) return !1;
		/* c8 ignore stop */
		this.#r = n.#r;
		for (let e of this.#r) typeof e == "object" && (e.#i = this);
		this.type = r, this.#l = void 0, this.#u = !1;
	}
	static fromGlob(e, t = {}) {
		let n = new Ot(null, void 0, t);
		return Ot.#f(e, n, 0, t, 0), n;
	}
	toMMPattern() {
		/* c8 ignore start */
		if (this !== this.#e) return this.#e.toMMPattern();
		/* c8 ignore stop */
		let e = this.toString(), [t, n, r, i] = this.toRegExpSource();
		if (!(r || this.#t || this.#c.nocase && !this.#c.nocaseMagicOnly && e.toUpperCase() !== e.toLowerCase())) return n;
		let a = (this.#c.nocase ? "i" : "") + (i ? "u" : "");
		return Object.assign(RegExp(`^${t}$`, a), {
			_src: t,
			_glob: e
		});
	}
	get options() {
		return this.#c;
	}
	toRegExpSource(e) {
		let t = e ?? !!this.#c.dot;
		if (this.#e === this && (this.#x(), this.#d()), !jt(this)) {
			let n = this.isStart() && this.isEnd() && !this.#r.some((e) => typeof e != "string"), r = this.#r.map((t) => {
				let [r, i, a, o] = typeof t == "string" ? Ot.#C(t, this.#t, n) : t.toRegExpSource(e);
				return this.#t = this.#t || a, this.#n = this.#n || o, r;
			}).join(""), i = "";
			if (this.isStart() && typeof this.#r[0] == "string" && !(this.#r.length === 1 && zt.has(this.#r[0]))) {
				let n = Rt, a = t && n.has(r.charAt(0)) || r.startsWith("\\.") && n.has(r.charAt(2)) || r.startsWith("\\.\\.") && n.has(r.charAt(4)), o = !t && !e && n.has(r.charAt(0));
				i = a ? It : o ? Lt : "";
			}
			let a = "";
			return this.isEnd() && this.#e.#s && this.#i?.type === "!" && (a = "(?:$|\\/)"), [
				i + r + a,
				Dt(r),
				this.#t = !!this.#t,
				this.#n
			];
		}
		let n = this.type === "*" || this.type === "+", r = this.type === "!" ? "(?:(?!(?:" : "(?:", i = this.#S(t);
		if (this.isStart() && this.isEnd() && !i && this.type !== "!") {
			let e = this.toString(), t = this;
			return t.#r = [e], t.type = null, t.#t = void 0, [
				e,
				Dt(this.toString()),
				!1,
				!1
			];
		}
		let a = !n || e || t ? "" : this.#S(!0);
		a === i && (a = ""), a && (i = `(?:${i})(?:${a})*?`);
		let o = "";
		if (this.type === "!" && this.#u) o = (this.isStart() && !t ? Lt : "") + Wt;
		else {
			let n = this.type === "!" ? "))" + (this.isStart() && !t && !e ? Lt : "") + "[^/]*?)" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && a ? ")" : this.type === "*" && a ? ")?" : `)${this.type}`;
			o = r + i + n;
		}
		return [
			o,
			Dt(i),
			this.#t = !!this.#t,
			this.#n
		];
	}
	#x() {
		if (jt(this)) {
			let e = 0, t = !1;
			do {
				t = !0;
				for (let e = 0; e < this.#r.length; e++) {
					let n = this.#r[e];
					typeof n == "object" && (n.#x(), this.#m(n) ? (t = !1, this.#_(n, e)) : this.#p(n) ? (t = !1, this.#g(n, e)) : this.#y(n) && (t = !1, this.#b(n)));
				}
			} while (!t && ++e < 10);
		} else for (let e of this.#r) typeof e == "object" && e.#x();
		this.#l = void 0;
	}
	#S(e) {
		return this.#r.map((t) => {
			/* c8 ignore start */
			if (typeof t == "string") throw Error("string type in extglob ast??");
			/* c8 ignore stop */
			let [n, r, i, a] = t.toRegExpSource(e);
			return this.#n = this.#n || a, n;
		}).filter((e) => !(this.isStart() && this.isEnd()) || !!e).join("|");
	}
	static #C(e, t, n = !1) {
		let r = !1, i = "", a = !1, o = !1;
		for (let s = 0; s < e.length; s++) {
			let c = e.charAt(s);
			if (r) {
				r = !1, i += (Bt.has(c) ? "\\" : "") + c;
				continue;
			}
			if (c === "*") {
				if (o) continue;
				o = !0, i += n && /^[*]+$/.test(e) ? Wt : Ut, t = !0;
				continue;
			} else o = !1;
			if (c === "\\") {
				s === e.length - 1 ? i += "\\\\" : r = !0;
				continue;
			}
			if (c === "[") {
				let [n, r, o, c] = Et(e, s);
				if (o) {
					i += n, a ||= r, s += o - 1, t ||= c;
					continue;
				}
			}
			if (c === "?") {
				i += Ht, t = !0;
				continue;
			}
			i += Vt(c);
		}
		return [
			i,
			Dt(e),
			!!t,
			a
		];
	}
};
Ot = Kt;
//#endregion
//#region node_modules/minimatch/dist/esm/escape.js
var qt = (e, { windowsPathsNoEscape: t = !1, magicalBraces: n = !1 } = {}) => n ? t ? e.replace(/[?*()[\]{}]/g, "[$&]") : e.replace(/[?*()[\]\\{}]/g, "\\$&") : t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&"), Jt = (e, t, n = {}) => (xt(t), !n.nocomment && t.charAt(0) === "#" ? !1 : new En(t, n).match(e)), Yt = /^\*+([^+@!?*[(]*)$/, Xt = (e) => (t) => !t.startsWith(".") && t.endsWith(e), Zt = (e) => (t) => t.endsWith(e), Qt = (e) => (e = e.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(e)), $t = (e) => (e = e.toLowerCase(), (t) => t.toLowerCase().endsWith(e)), en = /^\*+\.\*+$/, tn = (e) => !e.startsWith(".") && e.includes("."), nn = (e) => e !== "." && e !== ".." && e.includes("."), rn = /^\.\*+$/, an = (e) => e !== "." && e !== ".." && e.startsWith("."), on = /^\*+$/, sn = (e) => e.length !== 0 && !e.startsWith("."), cn = (e) => e.length !== 0 && e !== "." && e !== "..", ln = /^\?+([^+@!?*[(]*)?$/, un = ([e, t = ""]) => {
	let n = mn([e]);
	return t ? (t = t.toLowerCase(), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
}, dn = ([e, t = ""]) => {
	let n = hn([e]);
	return t ? (t = t.toLowerCase(), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
}, fn = ([e, t = ""]) => {
	let n = hn([e]);
	return t ? (e) => n(e) && e.endsWith(t) : n;
}, pn = ([e, t = ""]) => {
	let n = mn([e]);
	return t ? (e) => n(e) && e.endsWith(t) : n;
}, mn = ([e]) => {
	let t = e.length;
	return (e) => e.length === t && !e.startsWith(".");
}, hn = ([e]) => {
	let t = e.length;
	return (e) => e.length === t && e !== "." && e !== "..";
}, gn = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix", _n = {
	win32: { sep: "\\" },
	posix: { sep: "/" }
};
Jt.sep = gn === "win32" ? _n.win32.sep : _n.posix.sep;
var vn = Symbol("globstar **");
Jt.GLOBSTAR = vn;
var yn = "[^/]*?", bn = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", xn = "(?:(?!(?:\\/|^)\\.).)*?";
Jt.filter = (e, t = {}) => (n) => Jt(n, e, t);
var Sn = (e, t = {}) => Object.assign({}, e, t);
Jt.defaults = (e) => {
	if (!e || typeof e != "object" || !Object.keys(e).length) return Jt;
	let t = Jt;
	return Object.assign((n, r, i = {}) => t(n, r, Sn(e, i)), {
		Minimatch: class extends t.Minimatch {
			constructor(t, n = {}) {
				super(t, Sn(e, n));
			}
			static defaults(n) {
				return t.defaults(Sn(e, n)).Minimatch;
			}
		},
		AST: class extends t.AST {
			/* c8 ignore start */
			constructor(t, n, r = {}) {
				super(t, n, Sn(e, r));
			}
			/* c8 ignore stop */
			static fromGlob(n, r = {}) {
				return t.AST.fromGlob(n, Sn(e, r));
			}
		},
		unescape: (n, r = {}) => t.unescape(n, Sn(e, r)),
		escape: (n, r = {}) => t.escape(n, Sn(e, r)),
		filter: (n, r = {}) => t.filter(n, Sn(e, r)),
		defaults: (n) => t.defaults(Sn(e, n)),
		makeRe: (n, r = {}) => t.makeRe(n, Sn(e, r)),
		braceExpand: (n, r = {}) => t.braceExpand(n, Sn(e, r)),
		match: (n, r, i = {}) => t.match(n, r, Sn(e, i)),
		sep: t.sep,
		GLOBSTAR: vn
	});
};
var Cn = (e, t = {}) => (xt(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : ft(e, { max: t.braceExpandMax }));
Jt.braceExpand = Cn, Jt.makeRe = (e, t = {}) => new En(e, t).makeRe(), Jt.match = (e, t, n = {}) => {
	let r = new En(t, n);
	return e = e.filter((e) => r.match(e)), r.options.nonull && !e.length && e.push(t), e;
};
var wn = /[?*]|[+@!]\(.*?\)|\[|\]/, Tn = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), En = class {
	options;
	set;
	pattern;
	windowsPathsNoEscape;
	nonegate;
	negate;
	comment;
	empty;
	preserveMultipleSlashes;
	partial;
	globSet;
	globParts;
	nocase;
	isWindows;
	platform;
	windowsNoMagicRoot;
	maxGlobstarRecursion;
	regexp;
	constructor(e, t = {}) {
		xt(e), t ||= {}, this.options = t, this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200, this.pattern = e, this.platform = t.platform || gn, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!t.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!t.nonegate, this.comment = !1, this.empty = !1, this.partial = !!t.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = t.windowsNoMagicRoot === void 0 ? !!(this.isWindows && this.nocase) : t.windowsNoMagicRoot, this.globSet = [], this.globParts = [], this.set = [], this.make();
	}
	hasMagic() {
		if (this.options.magicalBraces && this.set.length > 1) return !0;
		for (let e of this.set) for (let t of e) if (typeof t != "string") return !0;
		return !1;
	}
	debug(...e) {}
	make() {
		let e = this.pattern, t = this.options;
		if (!t.nocomment && e.charAt(0) === "#") {
			this.comment = !0;
			return;
		}
		if (!e) {
			this.empty = !0;
			return;
		}
		this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], t.debug && (this.debug = (...e) => console.error(...e)), this.debug(this.pattern, this.globSet);
		let n = this.globSet.map((e) => this.slashSplit(e));
		this.globParts = this.preprocess(n), this.debug(this.pattern, this.globParts);
		let r = this.globParts.map((e, t, n) => {
			if (this.isWindows && this.windowsNoMagicRoot) {
				let t = e[0] === "" && e[1] === "" && (e[2] === "?" || !wn.test(e[2])) && !wn.test(e[3]), n = /^[a-z]:/i.test(e[0]);
				if (t) return [...e.slice(0, 4), ...e.slice(4).map((e) => this.parse(e))];
				if (n) return [e[0], ...e.slice(1).map((e) => this.parse(e))];
			}
			return e.map((e) => this.parse(e));
		});
		if (this.debug(this.pattern, r), this.set = r.filter((e) => e.indexOf(!1) === -1), this.isWindows) for (let e = 0; e < this.set.length; e++) {
			let t = this.set[e];
			t[0] === "" && t[1] === "" && this.globParts[e][2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]) && (t[2] = "?");
		}
		this.debug(this.pattern, this.set);
	}
	preprocess(e) {
		if (this.options.noglobstar) for (let t of e) for (let e = 0; e < t.length; e++) t[e] === "**" && (t[e] = "*");
		let { optimizationLevel: t = 1 } = this.options;
		return t >= 2 ? (e = this.firstPhasePreProcess(e), e = this.secondPhasePreProcess(e)) : e = t >= 1 ? this.levelOneOptimize(e) : this.adjascentGlobstarOptimize(e), e;
	}
	adjascentGlobstarOptimize(e) {
		return e.map((e) => {
			let t = -1;
			for (; (t = e.indexOf("**", t + 1)) !== -1;) {
				let n = t;
				for (; e[n + 1] === "**";) n++;
				n !== t && e.splice(t, n - t);
			}
			return e;
		});
	}
	levelOneOptimize(e) {
		return e.map((e) => (e = e.reduce((e, t) => {
			let n = e[e.length - 1];
			return t === "**" && n === "**" ? e : t === ".." && n && n !== ".." && n !== "." && n !== "**" ? (e.pop(), e) : (e.push(t), e);
		}, []), e.length === 0 ? [""] : e));
	}
	levelTwoFileOptimize(e) {
		Array.isArray(e) || (e = this.slashSplit(e));
		let t = !1;
		do {
			if (t = !1, !this.preserveMultipleSlashes) {
				for (let n = 1; n < e.length - 1; n++) {
					let r = e[n];
					n === 1 && r === "" && e[0] === "" || (r === "." || r === "") && (t = !0, e.splice(n, 1), n--);
				}
				e[0] === "." && e.length === 2 && (e[1] === "." || e[1] === "") && (t = !0, e.pop());
			}
			let n = 0;
			for (; (n = e.indexOf("..", n + 1)) !== -1;) {
				let r = e[n - 1];
				r && r !== "." && r !== ".." && r !== "**" && !(this.isWindows && /^[a-z]:$/i.test(r)) && (t = !0, e.splice(n - 1, 2), n -= 2);
			}
		} while (t);
		return e.length === 0 ? [""] : e;
	}
	firstPhasePreProcess(e) {
		let t = !1;
		do {
			t = !1;
			for (let n of e) {
				let r = -1;
				for (; (r = n.indexOf("**", r + 1)) !== -1;) {
					let i = r;
					for (; n[i + 1] === "**";) i++;
					i > r && n.splice(r + 1, i - r);
					let a = n[r + 1], o = n[r + 2], s = n[r + 3];
					if (a !== ".." || !o || o === "." || o === ".." || !s || s === "." || s === "..") continue;
					t = !0, n.splice(r, 1);
					let c = n.slice(0);
					c[r] = "**", e.push(c), r--;
				}
				if (!this.preserveMultipleSlashes) {
					for (let e = 1; e < n.length - 1; e++) {
						let r = n[e];
						e === 1 && r === "" && n[0] === "" || (r === "." || r === "") && (t = !0, n.splice(e, 1), e--);
					}
					n[0] === "." && n.length === 2 && (n[1] === "." || n[1] === "") && (t = !0, n.pop());
				}
				let i = 0;
				for (; (i = n.indexOf("..", i + 1)) !== -1;) {
					let e = n[i - 1];
					if (e && e !== "." && e !== ".." && e !== "**") {
						t = !0;
						let e = i === 1 && n[i + 1] === "**" ? ["."] : [];
						n.splice(i - 1, 2, ...e), n.length === 0 && n.push(""), i -= 2;
					}
				}
			}
		} while (t);
		return e;
	}
	secondPhasePreProcess(e) {
		for (let t = 0; t < e.length - 1; t++) for (let n = t + 1; n < e.length; n++) {
			let r = this.partsMatch(e[t], e[n], !this.preserveMultipleSlashes);
			if (r) {
				e[t] = [], e[n] = r;
				break;
			}
		}
		return e.filter((e) => e.length);
	}
	partsMatch(e, t, n = !1) {
		let r = 0, i = 0, a = [], o = "";
		for (; r < e.length && i < t.length;) if (e[r] === t[i]) a.push(o === "b" ? t[i] : e[r]), r++, i++;
		else if (n && e[r] === "**" && t[i] === e[r + 1]) a.push(e[r]), r++;
		else if (n && t[i] === "**" && e[r] === t[i + 1]) a.push(t[i]), i++;
		else if (e[r] === "*" && t[i] && (this.options.dot || !t[i].startsWith(".")) && t[i] !== "**") {
			if (o === "b") return !1;
			o = "a", a.push(e[r]), r++, i++;
		} else if (t[i] === "*" && e[r] && (this.options.dot || !e[r].startsWith(".")) && e[r] !== "**") {
			if (o === "a") return !1;
			o = "b", a.push(t[i]), r++, i++;
		} else return !1;
		return e.length === t.length && a;
	}
	parseNegate() {
		if (this.nonegate) return;
		let e = this.pattern, t = !1, n = 0;
		for (let r = 0; r < e.length && e.charAt(r) === "!"; r++) t = !t, n++;
		n && (this.pattern = e.slice(n)), this.negate = t;
	}
	matchOne(e, t, n = !1) {
		let r = 0, i = 0;
		if (this.isWindows) {
			let n = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]), a = !n && e[0] === "" && e[1] === "" && e[2] === "?" && /^[a-z]:$/i.test(e[3]), o = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]), s = !o && t[0] === "" && t[1] === "" && t[2] === "?" && typeof t[3] == "string" && /^[a-z]:$/i.test(t[3]), c = a ? 3 : n ? 0 : void 0, l = s ? 3 : o ? 0 : void 0;
			if (typeof c == "number" && typeof l == "number") {
				let [n, a] = [e[c], t[l]];
				n.toLowerCase() === a.toLowerCase() && (t[l] = n, i = l, r = c);
			}
		}
		let { optimizationLevel: a = 1 } = this.options;
		return a >= 2 && (e = this.levelTwoFileOptimize(e)), t.includes(vn) ? this.#e(e, t, n, r, i) : this.#n(e, t, n, r, i);
	}
	#e(e, t, n, r, i) {
		let a = t.indexOf(vn, i), o = t.lastIndexOf(vn), [s, c, l] = n ? [
			t.slice(i, a),
			t.slice(a + 1),
			[]
		] : [
			t.slice(i, a),
			t.slice(a + 1, o),
			t.slice(o + 1)
		];
		if (s.length) {
			let t = e.slice(r, r + s.length);
			if (!this.#n(t, s, n, 0, 0)) return !1;
			r += s.length, i += s.length;
		}
		let u = 0;
		if (l.length) {
			if (l.length + r > e.length) return !1;
			let t = e.length - l.length;
			if (this.#n(e, l, n, t, 0)) u = l.length;
			else {
				if (e[e.length - 1] !== "" || r + l.length === e.length || (t--, !this.#n(e, l, n, t, 0))) return !1;
				u = l.length + 1;
			}
		}
		if (!c.length) {
			let t = !!u;
			for (let n = r; n < e.length - u; n++) {
				let r = String(e[n]);
				if (t = !0, r === "." || r === ".." || !this.options.dot && r.startsWith(".")) return !1;
			}
			return n || t;
		}
		let d = [[[], 0]], f = d[0], p = 0, m = [0];
		for (let e of c) e === vn ? (m.push(p), f = [[], 0], d.push(f)) : (f[0].push(e), p++);
		let h = d.length - 1, g = e.length - u;
		for (let e of d) e[1] = g - (m[h--] + e[0].length);
		return !!this.#t(e, d, r, 0, n, 0, !!u);
	}
	#t(e, t, n, r, i, a, o) {
		let s = t[r];
		if (!s) {
			for (let t = n; t < e.length; t++) {
				o = !0;
				let n = e[t];
				if (n === "." || n === ".." || !this.options.dot && n.startsWith(".")) return !1;
			}
			return o;
		}
		let [c, l] = s;
		for (; n <= l;) {
			if (this.#n(e.slice(0, n + c.length), c, i, n, 0) && a < this.maxGlobstarRecursion) {
				let s = this.#t(e, t, n + c.length, r + 1, i, a + 1, o);
				if (s !== !1) return s;
			}
			let s = e[n];
			if (s === "." || s === ".." || !this.options.dot && s.startsWith(".")) return !1;
			n++;
		}
		return i || null;
	}
	#n(e, t, n, r, i) {
		let a, o, s, c;
		for (a = r, o = i, c = e.length, s = t.length; a < c && o < s; a++, o++) {
			this.debug("matchOne loop");
			let n = t[o], r = e[a];
			/* c8 ignore start */
			if (this.debug(t, n, r), n === !1 || n === vn) return !1;
			/* c8 ignore stop */
			let i;
			if (typeof n == "string" ? (i = r === n, this.debug("string match", n, r, i)) : (i = n.test(r), this.debug("pattern match", n, r, i)), !i) return !1;
		}
		if (a === c && o === s) return !0;
		if (a === c) return n;
		if (o === s) return a === c - 1 && e[a] === "";
		throw Error("wtf?");
		/* c8 ignore stop */
	}
	braceExpand() {
		return Cn(this.pattern, this.options);
	}
	parse(e) {
		xt(e);
		let t = this.options;
		if (e === "**") return vn;
		if (e === "") return "";
		let n, r = null;
		(n = e.match(on)) ? r = t.dot ? cn : sn : (n = e.match(Yt)) ? r = (t.nocase ? t.dot ? $t : Qt : t.dot ? Zt : Xt)(n[1]) : (n = e.match(ln)) ? r = (t.nocase ? t.dot ? dn : un : t.dot ? fn : pn)(n) : (n = e.match(en)) ? r = t.dot ? nn : tn : (n = e.match(rn)) && (r = an);
		let i = Kt.fromGlob(e, this.options).toMMPattern();
		return r && typeof i == "object" && Reflect.defineProperty(i, "test", { value: r }), i;
	}
	makeRe() {
		if (this.regexp || this.regexp === !1) return this.regexp;
		let e = this.set;
		if (!e.length) return this.regexp = !1, this.regexp;
		let t = this.options, n = t.noglobstar ? yn : t.dot ? bn : xn, r = new Set(t.nocase ? ["i"] : []), i = e.map((e) => {
			let t = e.map((e) => {
				if (e instanceof RegExp) for (let t of e.flags.split("")) r.add(t);
				return typeof e == "string" ? Tn(e) : e === vn ? vn : e._src;
			});
			t.forEach((e, r) => {
				let i = t[r + 1], a = t[r - 1];
				e !== vn || a === vn || (a === void 0 ? i !== void 0 && i !== vn ? t[r + 1] = "(?:\\/|" + n + "\\/)?" + i : t[r] = n : i === void 0 ? t[r - 1] = a + "(?:\\/|\\/" + n + ")?" : i !== vn && (t[r - 1] = a + "(?:\\/|\\/" + n + "\\/)" + i, t[r + 1] = vn));
			});
			let i = t.filter((e) => e !== vn);
			if (this.partial && i.length >= 1) {
				let e = [];
				for (let t = 1; t <= i.length; t++) e.push(i.slice(0, t).join("/"));
				return "(?:" + e.join("|") + ")";
			}
			return i.join("/");
		}).join("|"), [a, o] = e.length > 1 ? ["(?:", ")"] : ["", ""];
		i = "^" + a + i + o + "$", this.partial && (i = "^(?:\\/|" + a + i.slice(1, -1) + o + ")$"), this.negate && (i = "^(?!" + i + ").+$");
		try {
			this.regexp = new RegExp(i, [...r].join(""));
		} catch {
			this.regexp = !1;
		}
		/* c8 ignore stop */
		return this.regexp;
	}
	slashSplit(e) {
		return this.preserveMultipleSlashes ? e.split("/") : this.isWindows && /^\/\/[^/]+/.test(e) ? ["", ...e.split(/\/+/)] : e.split(/\/+/);
	}
	match(e, t = this.partial) {
		if (this.debug("match", e, this.pattern), this.comment) return !1;
		if (this.empty) return e === "";
		if (e === "/" && t) return !0;
		let n = this.options;
		this.isWindows && (e = e.split("\\").join("/"));
		let r = this.slashSplit(e);
		this.debug(this.pattern, "split", r);
		let i = this.set;
		this.debug(this.pattern, "set", i);
		let a = r[r.length - 1];
		if (!a) for (let e = r.length - 2; !a && e >= 0; e--) a = r[e];
		for (let e of i) {
			let i = r;
			if (n.matchBase && e.length === 1 && (i = [a]), this.matchOne(i, e, t)) return n.flipNegate ? !0 : !this.negate;
		}
		return n.flipNegate ? !1 : this.negate;
	}
	static defaults(e) {
		return Jt.defaults(e).Minimatch;
	}
};
Jt.AST = Kt, Jt.Minimatch = En, Jt.escape = qt, Jt.unescape = Dt;
//#endregion
//#region node_modules/readdir-glob/dist/index.mjs
function Dn(e, t) {
	return new Promise((n, r) => {
		h.readdir(e, { withFileTypes: !0 }, (e, i) => {
			if (e) switch (e.code) {
				case "ENOTDIR":
					t ? r(e) : n([]);
					break;
				case "ENOTSUP":
				case "ENOENT":
				case "ENAMETOOLONG":
				case "UNKNOWN":
					n([]);
					break;
				case "ELOOP":
				default:
					r(e);
					break;
			}
			else n(i);
		});
	});
}
function On(e, t) {
	return new Promise((n) => {
		(t ? h.stat : h.lstat)(e, (r, i) => {
			if (r) switch (r.code) {
				case "ENOENT":
					n(t ? On(e, !1) : null);
					break;
				default:
					n(null);
					break;
			}
			else n(i);
		});
	});
}
async function* kn(e, t, n, r, i, a) {
	let o = await Dn(t + e, a);
	for (let a of o) {
		let o = a.name, s = e + "/" + o, c = s.slice(1), l = t + "/" + c, u = a;
		(r || n) && (u = await On(l, n) ?? u), u.isDirectory() ? i(c) || (yield {
			relative: c,
			absolute: l,
			stat: u
		}, yield* kn(s, t, n, r, i, !1)) : yield {
			relative: c,
			absolute: l,
			stat: u
		};
	}
}
async function* An(e, t, n, r) {
	yield* kn("", e, t, n, r, !0);
}
function jn(e) {
	return {
		pattern: e.pattern,
		dot: !!e.dot,
		noglobstar: !!e.noglobstar,
		matchBase: !!e.matchBase,
		nocase: !!e.nocase,
		ignore: e.ignore,
		skip: e.skip,
		follow: !!e.follow,
		stat: !!e.stat,
		nodir: !!e.nodir,
		mark: !!e.mark,
		silent: !!e.silent,
		absolute: !!e.absolute
	};
}
var Mn = class extends A {
	options;
	matchers;
	ignoreMatchers;
	skipMatchers;
	paused;
	aborted;
	inactive;
	iterator;
	constructor(e, t, n) {
		if (super(), typeof t == "function" && (n = t, t = void 0), this.options = jn(t || {}), this.matchers = [], this.options.pattern) {
			let e = Array.isArray(this.options.pattern) ? this.options.pattern : [this.options.pattern];
			this.matchers = e.map((e) => new En(e, {
				dot: this.options.dot,
				noglobstar: this.options.noglobstar,
				matchBase: this.options.matchBase,
				nocase: this.options.nocase
			}));
		}
		if (this.ignoreMatchers = [], this.options.ignore) {
			let e = Array.isArray(this.options.ignore) ? this.options.ignore : [this.options.ignore];
			this.ignoreMatchers = e.map((e) => new En(e, { dot: !0 }));
		}
		if (this.skipMatchers = [], this.options.skip) {
			let e = Array.isArray(this.options.skip) ? this.options.skip : [this.options.skip];
			this.skipMatchers = e.map((e) => new En(e, { dot: !0 }));
		}
		if (this.iterator = An(m(e || "."), this.options.follow, this.options.stat, this._shouldSkipDirectory.bind(this)), this.paused = !1, this.inactive = !1, this.aborted = !1, n) {
			let e = n, t = [];
			this.on("match", (e) => t.push(this.options.absolute ? e.absolute : e.relative)), this.on("error", (t) => e(t)), this.on("end", () => e(null, t));
		}
		setTimeout(() => this._next());
	}
	_shouldSkipDirectory(e) {
		return this.skipMatchers.some((t) => t.match(e));
	}
	_fileMatches(e, t) {
		let n = e + (t ? "/" : "");
		return (this.matchers.length === 0 || this.matchers.some((e) => e.match(n))) && !this.ignoreMatchers.some((e) => e.match(n)) && (!this.options.nodir || !t);
	}
	_next() {
		!this.paused && !this.aborted ? this.iterator.next().then((e) => {
			if (e.done) this.emit("end");
			else {
				let t = e.value.stat.isDirectory();
				if (this._fileMatches(e.value.relative, t)) {
					let n = e.value.relative, r = e.value.absolute;
					this.options.mark && t && (n += "/", r += "/"), this.options.stat ? this.emit("match", {
						relative: n,
						absolute: r,
						stat: e.value.stat
					}) : this.emit("match", {
						relative: n,
						absolute: r
					});
				}
				this._next();
			}
		}).catch((e) => {
			this.abort(), this.emit("error", e), !e.code && !this.options.silent && console.error(e);
		}) : this.inactive = !0;
	}
	abort() {
		this.aborted = !0;
	}
	pause() {
		this.paused = !0;
	}
	resume() {
		this.paused = !1, this.inactive && (this.inactive = !1, this._next());
	}
}, Nn = (e, t, n) => new Mn(e, t, n);
Nn.ReaddirGlob = Mn;
var Pn = Nn, Fn = /* @__PURE__ */ H(((e, t) => {
	typeof process > "u" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0 ? t.exports = { nextTick: n } : t.exports = process;
	function n(e, t, n, r) {
		if (typeof e != "function") throw TypeError("\"callback\" argument must be a function");
		var i = arguments.length, a, o;
		switch (i) {
			case 0:
			case 1: return process.nextTick(e);
			case 2: return process.nextTick(function() {
				e.call(null, t);
			});
			case 3: return process.nextTick(function() {
				e.call(null, t, n);
			});
			case 4: return process.nextTick(function() {
				e.call(null, t, n, r);
			});
			default:
				for (a = Array(i - 1), o = 0; o < a.length;) a[o++] = arguments[o];
				return process.nextTick(function() {
					e.apply(null, a);
				});
		}
	}
})), In = /* @__PURE__ */ H(((e, t) => {
	var n = {}.toString;
	t.exports = Array.isArray || function(e) {
		return n.call(e) == "[object Array]";
	};
})), Ln = /* @__PURE__ */ H(((e, t) => {
	t.exports = q("stream");
})), Rn = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), r = n.Buffer;
	function i(e, t) {
		for (var n in e) t[n] = e[n];
	}
	r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? t.exports = n : (i(n, e), e.Buffer = a);
	function a(e, t, n) {
		return r(e, t, n);
	}
	i(r, a), a.from = function(e, t, n) {
		if (typeof e == "number") throw TypeError("Argument must not be a number");
		return r(e, t, n);
	}, a.alloc = function(e, t, n) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		var i = r(e);
		return t === void 0 ? i.fill(0) : typeof n == "string" ? i.fill(t, n) : i.fill(t), i;
	}, a.allocUnsafe = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return r(e);
	}, a.allocUnsafeSlow = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return n.SlowBuffer(e);
	};
})), zn = /* @__PURE__ */ H(((e) => {
	function t(e) {
		return Array.isArray ? Array.isArray(e) : h(e) === "[object Array]";
	}
	e.isArray = t;
	function n(e) {
		return typeof e == "boolean";
	}
	e.isBoolean = n;
	function r(e) {
		return e === null;
	}
	e.isNull = r;
	function i(e) {
		return e == null;
	}
	e.isNullOrUndefined = i;
	function a(e) {
		return typeof e == "number";
	}
	e.isNumber = a;
	function o(e) {
		return typeof e == "string";
	}
	e.isString = o;
	function s(e) {
		return typeof e == "symbol";
	}
	e.isSymbol = s;
	function c(e) {
		return e === void 0;
	}
	e.isUndefined = c;
	function l(e) {
		return h(e) === "[object RegExp]";
	}
	e.isRegExp = l;
	function u(e) {
		return typeof e == "object" && !!e;
	}
	e.isObject = u;
	function d(e) {
		return h(e) === "[object Date]";
	}
	e.isDate = d;
	function f(e) {
		return h(e) === "[object Error]" || e instanceof Error;
	}
	e.isError = f;
	function p(e) {
		return typeof e == "function";
	}
	e.isFunction = p;
	function m(e) {
		return e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string" || typeof e == "symbol" || e === void 0;
	}
	e.isPrimitive = m, e.isBuffer = q("buffer").Buffer.isBuffer;
	function h(e) {
		return Object.prototype.toString.call(e);
	}
})), Bn = /* @__PURE__ */ H(((e, t) => {
	typeof Object.create == "function" ? t.exports = function(e, t) {
		t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: {
			value: e,
			enumerable: !1,
			writable: !0,
			configurable: !0
		} }));
	} : t.exports = function(e, t) {
		if (t) {
			e.super_ = t;
			var n = function() {};
			n.prototype = t.prototype, e.prototype = new n(), e.prototype.constructor = e;
		}
	};
})), Vn = /* @__PURE__ */ H(((e, t) => {
	try {
		var n = q("util");
		/* istanbul ignore next */
		if (typeof n.inherits != "function") throw "";
		t.exports = n.inherits;
	} catch {
		/* istanbul ignore next */
		t.exports = Bn();
	}
})), Hn = /* @__PURE__ */ H(((e, t) => {
	function n(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	var r = Rn().Buffer, i = q("util");
	function a(e, t, n) {
		e.copy(t, n);
	}
	t.exports = function() {
		function e() {
			n(this, e), this.head = null, this.tail = null, this.length = 0;
		}
		return e.prototype.push = function(e) {
			var t = {
				data: e,
				next: null
			};
			this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
		}, e.prototype.unshift = function(e) {
			var t = {
				data: e,
				next: this.head
			};
			this.length === 0 && (this.tail = t), this.head = t, ++this.length;
		}, e.prototype.shift = function() {
			if (this.length !== 0) {
				var e = this.head.data;
				return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
			}
		}, e.prototype.clear = function() {
			this.head = this.tail = null, this.length = 0;
		}, e.prototype.join = function(e) {
			if (this.length === 0) return "";
			for (var t = this.head, n = "" + t.data; t = t.next;) n += e + t.data;
			return n;
		}, e.prototype.concat = function(e) {
			if (this.length === 0) return r.alloc(0);
			for (var t = r.allocUnsafe(e >>> 0), n = this.head, i = 0; n;) a(n.data, t, i), i += n.data.length, n = n.next;
			return t;
		}, e;
	}(), i && i.inspect && i.inspect.custom && (t.exports.prototype[i.inspect.custom] = function() {
		var e = i.inspect({ length: this.length });
		return this.constructor.name + " " + e;
	});
})), Un = /* @__PURE__ */ H(((e, t) => {
	var n = Fn();
	function r(e, t) {
		var r = this, i = this._readableState && this._readableState.destroyed, o = this._writableState && this._writableState.destroyed;
		return i || o ? (t ? t(e) : e && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, n.nextTick(a, this, e)) : n.nextTick(a, this, e)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function(e) {
			!t && e ? r._writableState ? r._writableState.errorEmitted || (r._writableState.errorEmitted = !0, n.nextTick(a, r, e)) : n.nextTick(a, r, e) : t && t(e);
		}), this);
	}
	function i() {
		this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
	}
	function a(e, t) {
		e.emit("error", t);
	}
	t.exports = {
		destroy: r,
		undestroy: i
	};
})), Wn = /* @__PURE__ */ H(((e, t) => {
	t.exports = q("util").deprecate;
})), Gn = /* @__PURE__ */ H(((e, t) => {
	var n = Fn();
	t.exports = _;
	function r(e) {
		var t = this;
		this.next = null, this.entry = null, this.finish = function() {
			P(t, e);
		};
	}
	var i = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : n.nextTick, a;
	_.WritableState = h;
	var o = Object.create(zn());
	o.inherits = Vn();
	var s = { deprecate: Wn() }, c = Ln(), l = Rn().Buffer, u = (typeof global < "u" ? global : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {};
	function d(e) {
		return l.from(e);
	}
	function f(e) {
		return l.isBuffer(e) || e instanceof u;
	}
	var p = Un();
	o.inherits(_, c);
	function m() {}
	function h(e, t) {
		a ||= Kn(), e ||= {};
		var n = t instanceof a;
		this.objectMode = !!e.objectMode, n && (this.objectMode = this.objectMode || !!e.writableObjectMode);
		var i = e.highWaterMark, o = e.writableHighWaterMark, s = this.objectMode ? 16 : 16 * 1024;
		i || i === 0 ? this.highWaterMark = i : n && (o || o === 0) ? this.highWaterMark = o : this.highWaterMark = s, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
		var c = e.decodeStrings === !1;
		this.decodeStrings = !c, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
			T(t, e);
		}, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
	}
	h.prototype.getBuffer = function() {
		for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
		return t;
	}, (function() {
		try {
			Object.defineProperty(h.prototype, "buffer", { get: s.deprecate(function() {
				return this.getBuffer();
			}, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
		} catch {}
	})();
	var g;
	typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (g = Function.prototype[Symbol.hasInstance], Object.defineProperty(_, Symbol.hasInstance, { value: function(e) {
		return g.call(this, e) ? !0 : this === _ ? e && e._writableState instanceof h : !1;
	} })) : g = function(e) {
		return e instanceof this;
	};
	function _(e) {
		if (a ||= Kn(), !g.call(_, this) && !(this instanceof a)) return new _(e);
		this._writableState = new h(e, this), this.writable = !0, e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final)), c.call(this);
	}
	_.prototype.pipe = function() {
		this.emit("error", /* @__PURE__ */ Error("Cannot pipe, not readable"));
	};
	function v(e, t) {
		var r = /* @__PURE__ */ Error("write after end");
		e.emit("error", r), n.nextTick(t, r);
	}
	function y(e, t, r, i) {
		var a = !0, o = !1;
		return r === null ? o = /* @__PURE__ */ TypeError("May not write null values to stream") : typeof r != "string" && r !== void 0 && !t.objectMode && (o = /* @__PURE__ */ TypeError("Invalid non-string/buffer chunk")), o && (e.emit("error", o), n.nextTick(i, o), a = !1), a;
	}
	_.prototype.write = function(e, t, n) {
		var r = this._writableState, i = !1, a = !r.objectMode && f(e);
		return a && !l.isBuffer(e) && (e = d(e)), typeof t == "function" && (n = t, t = null), a ? t = "buffer" : t ||= r.defaultEncoding, typeof n != "function" && (n = m), r.ended ? v(this, n) : (a || y(this, r, e, n)) && (r.pendingcb++, i = x(this, r, a, e, t, n)), i;
	}, _.prototype.cork = function() {
		var e = this._writableState;
		e.corked++;
	}, _.prototype.uncork = function() {
		var e = this._writableState;
		e.corked && (e.corked--, !e.writing && !e.corked && !e.bufferProcessing && e.bufferedRequest && O(this, e));
	}, _.prototype.setDefaultEncoding = function(e) {
		if (typeof e == "string" && (e = e.toLowerCase()), !([
			"hex",
			"utf8",
			"utf-8",
			"ascii",
			"binary",
			"base64",
			"ucs2",
			"ucs-2",
			"utf16le",
			"utf-16le",
			"raw"
		].indexOf((e + "").toLowerCase()) > -1)) throw TypeError("Unknown encoding: " + e);
		return this._writableState.defaultEncoding = e, this;
	};
	function b(e, t, n) {
		return !e.objectMode && e.decodeStrings !== !1 && typeof t == "string" && (t = l.from(t, n)), t;
	}
	Object.defineProperty(_.prototype, "writableHighWaterMark", {
		enumerable: !1,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function x(e, t, n, r, i, a) {
		if (!n) {
			var o = b(t, r, i);
			r !== o && (n = !0, i = "buffer", r = o);
		}
		var s = t.objectMode ? 1 : r.length;
		t.length += s;
		var c = t.length < t.highWaterMark;
		if (c || (t.needDrain = !0), t.writing || t.corked) {
			var l = t.lastBufferedRequest;
			t.lastBufferedRequest = {
				chunk: r,
				encoding: i,
				isBuf: n,
				callback: a,
				next: null
			}, l ? l.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
		} else S(e, t, !1, s, r, i, a);
		return c;
	}
	function S(e, t, n, r, i, a, o) {
		t.writelen = r, t.writecb = o, t.writing = !0, t.sync = !0, n ? e._writev(i, t.onwrite) : e._write(i, a, t.onwrite), t.sync = !1;
	}
	function C(e, t, r, i, a) {
		--t.pendingcb, r ? (n.nextTick(a, i), n.nextTick(M, e, t), e._writableState.errorEmitted = !0, e.emit("error", i)) : (a(i), e._writableState.errorEmitted = !0, e.emit("error", i), M(e, t));
	}
	function w(e) {
		e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
	}
	function T(e, t) {
		var n = e._writableState, r = n.sync, a = n.writecb;
		if (w(n), t) C(e, n, r, t, a);
		else {
			var o = k(n);
			!o && !n.corked && !n.bufferProcessing && n.bufferedRequest && O(e, n), r ? i(E, e, n, o, a) : E(e, n, o, a);
		}
	}
	function E(e, t, n, r) {
		n || D(e, t), t.pendingcb--, r(), M(e, t);
	}
	function D(e, t) {
		t.length === 0 && t.needDrain && (t.needDrain = !1, e.emit("drain"));
	}
	function O(e, t) {
		t.bufferProcessing = !0;
		var n = t.bufferedRequest;
		if (e._writev && n && n.next) {
			var i = t.bufferedRequestCount, a = Array(i), o = t.corkedRequestsFree;
			o.entry = n;
			for (var s = 0, c = !0; n;) a[s] = n, n.isBuf || (c = !1), n = n.next, s += 1;
			a.allBuffers = c, S(e, t, !0, t.length, a, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, o.next ? (t.corkedRequestsFree = o.next, o.next = null) : t.corkedRequestsFree = new r(t), t.bufferedRequestCount = 0;
		} else {
			for (; n;) {
				var l = n.chunk, u = n.encoding, d = n.callback;
				if (S(e, t, !1, t.objectMode ? 1 : l.length, l, u, d), n = n.next, t.bufferedRequestCount--, t.writing) break;
			}
			n === null && (t.lastBufferedRequest = null);
		}
		t.bufferedRequest = n, t.bufferProcessing = !1;
	}
	_.prototype._write = function(e, t, n) {
		n(/* @__PURE__ */ Error("_write() is not implemented"));
	}, _.prototype._writev = null, _.prototype.end = function(e, t, n) {
		var r = this._writableState;
		typeof e == "function" ? (n = e, e = null, t = null) : typeof t == "function" && (n = t, t = null), e != null && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || N(this, r, n);
	};
	function k(e) {
		return e.ending && e.length === 0 && e.bufferedRequest === null && !e.finished && !e.writing;
	}
	function A(e, t) {
		e._final(function(n) {
			t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), M(e, t);
		});
	}
	function j(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" ? (t.pendingcb++, t.finalCalled = !0, n.nextTick(A, e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function M(e, t) {
		var n = k(t);
		return n && (j(e, t), t.pendingcb === 0 && (t.finished = !0, e.emit("finish"))), n;
	}
	function N(e, t, r) {
		t.ending = !0, M(e, t), r && (t.finished ? n.nextTick(r) : e.once("finish", r)), t.ended = !0, e.writable = !1;
	}
	function P(e, t, n) {
		var r = e.entry;
		for (e.entry = null; r;) {
			var i = r.callback;
			t.pendingcb--, i(n), r = r.next;
		}
		t.corkedRequestsFree.next = e;
	}
	Object.defineProperty(_.prototype, "destroyed", {
		get: function() {
			return this._writableState === void 0 ? !1 : this._writableState.destroyed;
		},
		set: function(e) {
			this._writableState && (this._writableState.destroyed = e);
		}
	}), _.prototype.destroy = p.destroy, _.prototype._undestroy = p.undestroy, _.prototype._destroy = function(e, t) {
		this.end(), t(e);
	};
})), Kn = /* @__PURE__ */ H(((e, t) => {
	var n = Fn(), r = Object.keys || function(e) {
		var t = [];
		for (var n in e) t.push(n);
		return t;
	};
	t.exports = u;
	var i = Object.create(zn());
	i.inherits = Vn();
	var a = Jn(), o = Gn();
	i.inherits(u, a);
	for (var s = r(o.prototype), c = 0; c < s.length; c++) {
		var l = s[c];
		u.prototype[l] || (u.prototype[l] = o.prototype[l]);
	}
	function u(e) {
		if (!(this instanceof u)) return new u(e);
		a.call(this, e), o.call(this, e), e && e.readable === !1 && (this.readable = !1), e && e.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, e && e.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", d);
	}
	Object.defineProperty(u.prototype, "writableHighWaterMark", {
		enumerable: !1,
		get: function() {
			return this._writableState.highWaterMark;
		}
	});
	function d() {
		this.allowHalfOpen || this._writableState.ended || n.nextTick(f, this);
	}
	function f(e) {
		e.end();
	}
	Object.defineProperty(u.prototype, "destroyed", {
		get: function() {
			return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
		},
		set: function(e) {
			this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = e, this._writableState.destroyed = e);
		}
	}), u.prototype._destroy = function(e, t) {
		this.push(null), this.end(), n.nextTick(t, e);
	};
})), qn = /* @__PURE__ */ H(((e) => {
	var t = Rn().Buffer, n = t.isEncoding || function(e) {
		switch (e = "" + e, e && e.toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
			case "raw": return !0;
			default: return !1;
		}
	};
	function r(e) {
		if (!e) return "utf8";
		for (var t;;) switch (e) {
			case "utf8":
			case "utf-8": return "utf8";
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return "utf16le";
			case "latin1":
			case "binary": return "latin1";
			case "base64":
			case "ascii":
			case "hex": return e;
			default:
				if (t) return;
				e = ("" + e).toLowerCase(), t = !0;
		}
	}
	function i(e) {
		var i = r(e);
		if (typeof i != "string" && (t.isEncoding === n || !n(e))) throw Error("Unknown encoding: " + e);
		return i || e;
	}
	e.StringDecoder = a;
	function a(e) {
		this.encoding = i(e);
		var n;
		switch (this.encoding) {
			case "utf16le":
				this.text = f, this.end = p, n = 4;
				break;
			case "utf8":
				this.fillLast = l, n = 4;
				break;
			case "base64":
				this.text = m, this.end = h, n = 3;
				break;
			default:
				this.write = g, this.end = _;
				return;
		}
		this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(n);
	}
	a.prototype.write = function(e) {
		if (e.length === 0) return "";
		var t, n;
		if (this.lastNeed) {
			if (t = this.fillLast(e), t === void 0) return "";
			n = this.lastNeed, this.lastNeed = 0;
		} else n = 0;
		return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || "";
	}, a.prototype.end = d, a.prototype.text = u, a.prototype.fillLast = function(e) {
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
	};
	function o(e) {
		return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
	}
	function s(e, t, n) {
		var r = t.length - 1;
		if (r < n) return 0;
		var i = o(t[r]);
		return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (i === 2 ? i = 0 : e.lastNeed = i - 3), i) : 0));
	}
	function c(e, t, n) {
		if ((t[0] & 192) != 128) return e.lastNeed = 0, "�";
		if (e.lastNeed > 1 && t.length > 1) {
			if ((t[1] & 192) != 128) return e.lastNeed = 1, "�";
			if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) != 128) return e.lastNeed = 2, "�";
		}
	}
	function l(e) {
		var t = this.lastTotal - this.lastNeed, n = c(this, e, t);
		if (n !== void 0) return n;
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length;
	}
	function u(e, t) {
		var n = s(this, e, t);
		if (!this.lastNeed) return e.toString("utf8", t);
		this.lastTotal = n;
		var r = e.length - (n - this.lastNeed);
		return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r);
	}
	function d(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + "�" : t;
	}
	function f(e, t) {
		if ((e.length - t) % 2 == 0) {
			var n = e.toString("utf16le", t);
			if (n) {
				var r = n.charCodeAt(n.length - 1);
				if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1);
			}
			return n;
		}
		return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
	}
	function p(e) {
		var t = e && e.length ? this.write(e) : "";
		if (this.lastNeed) {
			var n = this.lastTotal - this.lastNeed;
			return t + this.lastChar.toString("utf16le", 0, n);
		}
		return t;
	}
	function m(e, t) {
		var n = (e.length - t) % 3;
		return n === 0 ? e.toString("base64", t) : (this.lastNeed = 3 - n, this.lastTotal = 3, n === 1 ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - n));
	}
	function h(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
	}
	function g(e) {
		return e.toString(this.encoding);
	}
	function _(e) {
		return e && e.length ? this.write(e) : "";
	}
})), Jn = /* @__PURE__ */ H(((e, t) => {
	var n = Fn();
	t.exports = b;
	var r = In(), i;
	b.ReadableState = y, q("events").EventEmitter;
	var a = function(e, t) {
		return e.listeners(t).length;
	}, o = Ln(), s = Rn().Buffer, c = (typeof global < "u" ? global : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {};
	function l(e) {
		return s.from(e);
	}
	function u(e) {
		return s.isBuffer(e) || e instanceof c;
	}
	var d = Object.create(zn());
	d.inherits = Vn();
	var f = q("util"), p = void 0;
	p = f && f.debuglog ? f.debuglog("stream") : function() {};
	var m = Hn(), h = Un(), g;
	d.inherits(b, o);
	var _ = [
		"error",
		"close",
		"destroy",
		"pause",
		"resume"
	];
	function v(e, t, n) {
		if (typeof e.prependListener == "function") return e.prependListener(t, n);
		!e._events || !e._events[t] ? e.on(t, n) : r(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]];
	}
	function y(e, t) {
		i ||= Kn(), e ||= {};
		var n = t instanceof i;
		this.objectMode = !!e.objectMode, n && (this.objectMode = this.objectMode || !!e.readableObjectMode);
		var r = e.highWaterMark, a = e.readableHighWaterMark, o = this.objectMode ? 16 : 16 * 1024;
		r || r === 0 ? this.highWaterMark = r : n && (a || a === 0) ? this.highWaterMark = a : this.highWaterMark = o, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new m(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (g ||= qn().StringDecoder, this.decoder = new g(e.encoding), this.encoding = e.encoding);
	}
	function b(e) {
		if (i ||= Kn(), !(this instanceof b)) return new b(e);
		this._readableState = new y(e, this), this.readable = !0, e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy)), o.call(this);
	}
	Object.defineProperty(b.prototype, "destroyed", {
		get: function() {
			return this._readableState === void 0 ? !1 : this._readableState.destroyed;
		},
		set: function(e) {
			this._readableState && (this._readableState.destroyed = e);
		}
	}), b.prototype.destroy = h.destroy, b.prototype._undestroy = h.undestroy, b.prototype._destroy = function(e, t) {
		this.push(null), t(e);
	}, b.prototype.push = function(e, t) {
		var n = this._readableState, r;
		return n.objectMode ? r = !0 : typeof e == "string" && (t ||= n.defaultEncoding, t !== n.encoding && (e = s.from(e, t), t = ""), r = !0), x(this, e, t, !1, r);
	}, b.prototype.unshift = function(e) {
		return x(this, e, null, !0, !1);
	};
	function x(e, t, n, r, i) {
		var a = e._readableState;
		if (t === null) a.reading = !1, O(e, a);
		else {
			var o;
			i || (o = C(a, t)), o ? e.emit("error", o) : a.objectMode || t && t.length > 0 ? (typeof t != "string" && !a.objectMode && Object.getPrototypeOf(t) !== s.prototype && (t = l(t)), r ? a.endEmitted ? e.emit("error", /* @__PURE__ */ Error("stream.unshift() after end event")) : S(e, a, t, !0) : a.ended ? e.emit("error", /* @__PURE__ */ Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !n ? (t = a.decoder.write(t), a.objectMode || t.length !== 0 ? S(e, a, t, !1) : j(e, a)) : S(e, a, t, !1))) : r || (a.reading = !1);
		}
		return w(a);
	}
	function S(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync ? (e.emit("data", n), e.read(0)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && k(e)), j(e, t);
	}
	function C(e, t) {
		var n;
		return !u(t) && typeof t != "string" && t !== void 0 && !e.objectMode && (n = /* @__PURE__ */ TypeError("Invalid non-string/buffer chunk")), n;
	}
	function w(e) {
		return !e.ended && (e.needReadable || e.length < e.highWaterMark || e.length === 0);
	}
	b.prototype.isPaused = function() {
		return this._readableState.flowing === !1;
	}, b.prototype.setEncoding = function(e) {
		return g ||= qn().StringDecoder, this._readableState.decoder = new g(e), this._readableState.encoding = e, this;
	};
	var T = 8388608;
	function E(e) {
		return e >= T ? e = T : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
	}
	function D(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : t.objectMode ? 1 : e === e ? (e > t.highWaterMark && (t.highWaterMark = E(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0)) : t.flowing && t.length ? t.buffer.head.data.length : t.length;
	}
	b.prototype.read = function(e) {
		p("read", e), e = parseInt(e, 10);
		var t = this._readableState, n = e;
		if (e !== 0 && (t.emittedReadable = !1), e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return p("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? H(this) : k(this), null;
		if (e = D(e, t), e === 0 && t.ended) return t.length === 0 && H(this), null;
		var r = t.needReadable;
		p("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, p("length less than watermark", r)), t.ended || t.reading ? (r = !1, p("reading or ended", r)) : r && (p("do read"), t.reading = !0, t.sync = !0, t.length === 0 && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = D(n, t)));
		var i = e > 0 ? R(e, t) : null;
		return i === null ? (t.needReadable = !0, e = 0) : t.length -= e, t.length === 0 && (t.ended || (t.needReadable = !0), n !== e && t.ended && H(this)), i !== null && this.emit("data", i), i;
	};
	function O(e, t) {
		if (!t.ended) {
			if (t.decoder) {
				var n = t.decoder.end();
				n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length);
			}
			t.ended = !0, k(e);
		}
	}
	function k(e) {
		var t = e._readableState;
		t.needReadable = !1, t.emittedReadable || (p("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? n.nextTick(A, e) : A(e));
	}
	function A(e) {
		p("emit readable"), e.emit("readable"), L(e);
	}
	function j(e, t) {
		t.readingMore || (t.readingMore = !0, n.nextTick(M, e, t));
	}
	function M(e, t) {
		for (var n = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (p("maybeReadMore read 0"), e.read(0), n !== t.length);) n = t.length;
		t.readingMore = !1;
	}
	b.prototype._read = function(e) {
		this.emit("error", /* @__PURE__ */ Error("_read() is not implemented"));
	}, b.prototype.pipe = function(e, t) {
		var r = this, i = this._readableState;
		switch (i.pipesCount) {
			case 0:
				i.pipes = e;
				break;
			case 1:
				i.pipes = [i.pipes, e];
				break;
			default:
				i.pipes.push(e);
				break;
		}
		i.pipesCount += 1, p("pipe count=%d opts=%j", i.pipesCount, t);
		var o = (!t || t.end !== !1) && e !== process.stdout && e !== process.stderr ? c : y;
		i.endEmitted ? n.nextTick(o) : r.once("end", o), e.on("unpipe", s);
		function s(e, t) {
			p("onunpipe"), e === r && t && t.hasUnpiped === !1 && (t.hasUnpiped = !0, d());
		}
		function c() {
			p("onend"), e.end();
		}
		var l = N(r);
		e.on("drain", l);
		var u = !1;
		function d() {
			p("cleanup"), e.removeListener("close", g), e.removeListener("finish", _), e.removeListener("drain", l), e.removeListener("error", h), e.removeListener("unpipe", s), r.removeListener("end", c), r.removeListener("end", y), r.removeListener("data", m), u = !0, i.awaitDrain && (!e._writableState || e._writableState.needDrain) && l();
		}
		var f = !1;
		r.on("data", m);
		function m(t) {
			p("ondata"), f = !1, !1 === e.write(t) && !f && ((i.pipesCount === 1 && i.pipes === e || i.pipesCount > 1 && W(i.pipes, e) !== -1) && !u && (p("false write response, pause", i.awaitDrain), i.awaitDrain++, f = !0), r.pause());
		}
		function h(t) {
			p("onerror", t), y(), e.removeListener("error", h), a(e, "error") === 0 && e.emit("error", t);
		}
		v(e, "error", h);
		function g() {
			e.removeListener("finish", _), y();
		}
		e.once("close", g);
		function _() {
			p("onfinish"), e.removeListener("close", g), y();
		}
		e.once("finish", _);
		function y() {
			p("unpipe"), r.unpipe(e);
		}
		return e.emit("pipe", r), i.flowing || (p("pipe resume"), r.resume()), e;
	};
	function N(e) {
		return function() {
			var t = e._readableState;
			p("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, t.awaitDrain === 0 && a(e, "data") && (t.flowing = !0, L(e));
		};
	}
	b.prototype.unpipe = function(e) {
		var t = this._readableState, n = { hasUnpiped: !1 };
		if (t.pipesCount === 0) return this;
		if (t.pipesCount === 1) return e && e !== t.pipes ? this : (e ||= t.pipes, t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
		if (!e) {
			var r = t.pipes, i = t.pipesCount;
			t.pipes = null, t.pipesCount = 0, t.flowing = !1;
			for (var a = 0; a < i; a++) r[a].emit("unpipe", this, { hasUnpiped: !1 });
			return this;
		}
		var o = W(t.pipes, e);
		return o === -1 ? this : (t.pipes.splice(o, 1), --t.pipesCount, t.pipesCount === 1 && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this);
	}, b.prototype.on = function(e, t) {
		var r = o.prototype.on.call(this, e, t);
		if (e === "data") this._readableState.flowing !== !1 && this.resume();
		else if (e === "readable") {
			var i = this._readableState;
			!i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.emittedReadable = !1, i.reading ? i.length && k(this) : n.nextTick(P, this));
		}
		return r;
	}, b.prototype.addListener = b.prototype.on;
	function P(e) {
		p("readable nexttick read 0"), e.read(0);
	}
	b.prototype.resume = function() {
		var e = this._readableState;
		return e.flowing || (p("resume"), e.flowing = !0, F(this, e)), this;
	};
	function F(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(I, e, t));
	}
	function I(e, t) {
		t.reading || (p("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), L(e), t.flowing && !t.reading && e.read(0);
	}
	b.prototype.pause = function() {
		return p("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (p("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
	};
	function L(e) {
		var t = e._readableState;
		for (p("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	b.prototype.wrap = function(e) {
		var t = this, n = this._readableState, r = !1;
		for (var i in e.on("end", function() {
			if (p("wrapped end"), n.decoder && !n.ended) {
				var e = n.decoder.end();
				e && e.length && t.push(e);
			}
			t.push(null);
		}), e.on("data", function(i) {
			p("wrapped data"), n.decoder && (i = n.decoder.write(i)), !(n.objectMode && i == null) && (!n.objectMode && (!i || !i.length) || t.push(i) || (r = !0, e.pause()));
		}), e) this[i] === void 0 && typeof e[i] == "function" && (this[i] = function(t) {
			return function() {
				return e[t].apply(e, arguments);
			};
		}(i));
		for (var a = 0; a < _.length; a++) e.on(_[a], this.emit.bind(this, _[a]));
		return this._read = function(t) {
			p("wrapped _read", t), r && (r = !1, e.resume());
		}, this;
	}, Object.defineProperty(b.prototype, "readableHighWaterMark", {
		enumerable: !1,
		get: function() {
			return this._readableState.highWaterMark;
		}
	}), b._fromList = R;
	function R(e, t) {
		if (t.length === 0) return null;
		var n;
		return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : t.buffer.length === 1 ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : n = z(e, t.buffer, t.decoder), n;
	}
	function z(e, t, n) {
		var r;
		return e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : r = e === t.head.data.length ? t.shift() : n ? B(e, t) : V(e, t), r;
	}
	function B(e, t) {
		var n = t.head, r = 1, i = n.data;
		for (e -= i.length; n = n.next;) {
			var a = n.data, o = e > a.length ? a.length : e;
			if (o === a.length ? i += a : i += a.slice(0, e), e -= o, e === 0) {
				o === a.length ? (++r, n.next ? t.head = n.next : t.head = t.tail = null) : (t.head = n, n.data = a.slice(o));
				break;
			}
			++r;
		}
		return t.length -= r, i;
	}
	function V(e, t) {
		var n = s.allocUnsafe(e), r = t.head, i = 1;
		for (r.data.copy(n), e -= r.data.length; r = r.next;) {
			var a = r.data, o = e > a.length ? a.length : e;
			if (a.copy(n, n.length - e, 0, o), e -= o, e === 0) {
				o === a.length ? (++i, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = a.slice(o));
				break;
			}
			++i;
		}
		return t.length -= i, n;
	}
	function H(e) {
		var t = e._readableState;
		if (t.length > 0) throw Error("\"endReadable()\" called on non-empty stream");
		t.endEmitted || (t.ended = !0, n.nextTick(U, t, e));
	}
	function U(e, t) {
		!e.endEmitted && e.length === 0 && (e.endEmitted = !0, t.readable = !1, t.emit("end"));
	}
	function W(e, t) {
		for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
		return -1;
	}
})), Yn = /* @__PURE__ */ H(((e, t) => {
	t.exports = a;
	var n = Kn(), r = Object.create(zn());
	r.inherits = Vn(), r.inherits(a, n);
	function i(e, t) {
		var n = this._transformState;
		n.transforming = !1;
		var r = n.writecb;
		if (!r) return this.emit("error", /* @__PURE__ */ Error("write callback called multiple times"));
		n.writechunk = null, n.writecb = null, t != null && this.push(t), r(e);
		var i = this._readableState;
		i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
	}
	function a(e) {
		if (!(this instanceof a)) return new a(e);
		n.call(this, e), this._transformState = {
			afterTransform: i.bind(this),
			needTransform: !1,
			transforming: !1,
			writecb: null,
			writechunk: null,
			writeencoding: null
		}, this._readableState.needReadable = !0, this._readableState.sync = !1, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", o);
	}
	function o() {
		var e = this;
		typeof this._flush == "function" ? this._flush(function(t, n) {
			s(e, t, n);
		}) : s(this, null, null);
	}
	a.prototype.push = function(e, t) {
		return this._transformState.needTransform = !1, n.prototype.push.call(this, e, t);
	}, a.prototype._transform = function(e, t, n) {
		throw Error("_transform() is not implemented");
	}, a.prototype._write = function(e, t, n) {
		var r = this._transformState;
		if (r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
			var i = this._readableState;
			(r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
		}
	}, a.prototype._read = function(e) {
		var t = this._transformState;
		t.writechunk !== null && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0;
	}, a.prototype._destroy = function(e, t) {
		var r = this;
		n.prototype._destroy.call(this, e, function(e) {
			t(e), r.emit("close");
		});
	};
	function s(e, t, n) {
		if (t) return e.emit("error", t);
		if (n != null && e.push(n), e._writableState.length) throw Error("Calling transform done when ws.length != 0");
		if (e._transformState.transforming) throw Error("Calling transform done when still transforming");
		return e.push(null);
	}
})), Xn = /* @__PURE__ */ H(((e, t) => {
	t.exports = i;
	var n = Yn(), r = Object.create(zn());
	r.inherits = Vn(), r.inherits(i, n);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		n.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), Zn = /* @__PURE__ */ H(((e, t) => {
	var n = q("stream");
	process.env.READABLE_STREAM === "disable" && n ? (t.exports = n, e = t.exports = n.Readable, e.Readable = n.Readable, e.Writable = n.Writable, e.Duplex = n.Duplex, e.Transform = n.Transform, e.PassThrough = n.PassThrough, e.Stream = n) : (e = t.exports = Jn(), e.Stream = n || e, e.Readable = e, e.Writable = Gn(), e.Duplex = Kn(), e.Transform = Yn(), e.PassThrough = Xn());
})), Qn = /* @__PURE__ */ H(((e, t) => {
	t.exports = Zn().PassThrough;
})), $n = (/* @__PURE__ */ H(((e, t) => {
	var n = q("util"), r = Qn();
	t.exports = {
		Readable: a,
		Writable: o
	}, n.inherits(a, r), n.inherits(o, r);
	function i(e, t, n) {
		e[t] = function() {
			return delete e[t], n.apply(this, arguments), this[t].apply(this, arguments);
		};
	}
	function a(e, t) {
		if (!(this instanceof a)) return new a(e, t);
		r.call(this, t), i(this, "_read", function() {
			var n = e.call(this, t), r = this.emit.bind(this, "error");
			n.on("error", r), n.pipe(this);
		}), this.emit("readable");
	}
	function o(e, t) {
		if (!(this instanceof o)) return new o(e, t);
		r.call(this, t), i(this, "_write", function() {
			var n = e.call(this, t), r = this.emit.bind(this, "error");
			n.on("error", r), this.pipe(n);
		}), this.emit("writable");
	}
})))();
function er(e) {
	return function(...t) {
		var n = t.pop();
		return e.call(this, t, n);
	};
}
/* istanbul ignore file */
var tr = typeof queueMicrotask == "function" && queueMicrotask, nr = typeof setImmediate == "function" && setImmediate, rr = typeof process == "object" && typeof process.nextTick == "function";
function ir(e) {
	setTimeout(e, 0);
}
function ar(e) {
	return (t, ...n) => e(() => t(...n));
}
var or = ar(tr ? queueMicrotask : nr ? setImmediate : rr ? process.nextTick : ir);
function sr(e) {
	return ur(e) ? function(...t) {
		let n = t.pop();
		return cr(e.apply(this, t), n);
	} : er(function(t, n) {
		var r;
		try {
			r = e.apply(this, t);
		} catch (e) {
			return n(e);
		}
		if (r && typeof r.then == "function") return cr(r, n);
		n(null, r);
	});
}
function cr(e, t) {
	return e.then((e) => {
		lr(t, null, e);
	}, (e) => {
		lr(t, e && (e instanceof Error || e.message) ? e : Error(e));
	});
}
function lr(e, t, n) {
	try {
		e(t, n);
	} catch (e) {
		or((e) => {
			throw e;
		}, e);
	}
}
function ur(e) {
	return e[Symbol.toStringTag] === "AsyncFunction";
}
function dr(e) {
	return e[Symbol.toStringTag] === "AsyncGenerator";
}
function fr(e) {
	return typeof e[Symbol.asyncIterator] == "function";
}
function pr(e) {
	if (typeof e != "function") throw Error("expected a function");
	return ur(e) ? sr(e) : e;
}
function Z(e, t) {
	if (t ||= e.length, !t) throw Error("arity is undefined");
	function n(...n) {
		return typeof n[t - 1] == "function" ? e.apply(this, n) : new Promise((r, i) => {
			n[t - 1] = (e, ...t) => {
				if (e) return i(e);
				r(t.length > 1 ? t : t[0]);
			}, e.apply(this, n);
		});
	}
	return n;
}
function mr(e, t, n, r) {
	t ||= [];
	var i = [], a = 0, o = pr(n);
	return e(t, (e, t, n) => {
		var r = a++;
		o(e, (e, t) => {
			i[r] = t, n(e);
		});
	}, (e) => {
		r(e, i);
	});
}
function hr(e) {
	return e && typeof e.length == "number" && e.length >= 0 && e.length % 1 == 0;
}
var gr = {};
function _r(e) {
	function t(...t) {
		if (e !== null) {
			var n = e;
			e = null, n.apply(this, t);
		}
	}
	return Object.assign(t, e), t;
}
function vr(e) {
	return e[Symbol.iterator] && e[Symbol.iterator]();
}
function yr(e) {
	var t = -1, n = e.length;
	return function() {
		return ++t < n ? {
			value: e[t],
			key: t
		} : null;
	};
}
function br(e) {
	var t = -1;
	return function() {
		var n = e.next();
		return n.done ? null : (t++, {
			value: n.value,
			key: t
		});
	};
}
function xr(e) {
	var t = e ? Object.keys(e) : [], n = -1, r = t.length;
	return function i() {
		var a = t[++n];
		return a === "__proto__" ? i() : n < r ? {
			value: e[a],
			key: a
		} : null;
	};
}
function Sr(e) {
	if (hr(e)) return yr(e);
	var t = vr(e);
	return t ? br(t) : xr(e);
}
function Cr(e) {
	return function(...t) {
		if (e === null) throw Error("Callback was already called.");
		var n = e;
		e = null, n.apply(this, t);
	};
}
function wr(e, t, n, r) {
	let i = !1, a = !1, o = !1, s = 0, c = 0;
	function l() {
		s >= t || o || i || (o = !0, e.next().then(({ value: e, done: t }) => {
			if (!(a || i)) {
				if (o = !1, t) {
					i = !0, s <= 0 && r(null);
					return;
				}
				s++, n(e, c, u), c++, l();
			}
		}).catch(d));
	}
	function u(e, t) {
		if (--s, !a) {
			if (e) return d(e);
			if (e === !1) {
				i = !0, a = !0;
				return;
			}
			if (t === gr || i && s <= 0) return i = !0, r(null);
			l();
		}
	}
	function d(e) {
		a || (o = !1, i = !0, r(e));
	}
	l();
}
var Tr = (e) => (t, n, r) => {
	if (r = _r(r), e <= 0) throw RangeError("concurrency limit cannot be less than 1");
	if (!t) return r(null);
	if (dr(t)) return wr(t, e, n, r);
	if (fr(t)) return wr(t[Symbol.asyncIterator](), e, n, r);
	var i = Sr(t), a = !1, o = !1, s = 0, c = !1;
	function l(e, t) {
		if (!o) if (--s, e) a = !0, r(e);
		else if (e === !1) a = !0, o = !0;
		else if (t === gr || a && s <= 0) return a = !0, r(null);
		else c || u();
	}
	function u() {
		for (c = !0; s < e && !a;) {
			var t = i();
			if (t === null) {
				a = !0, s <= 0 && r(null);
				return;
			}
			s += 1, n(t.value, t.key, Cr(l));
		}
		c = !1;
	}
	u();
};
function Er(e, t, n, r) {
	return Tr(t)(e, pr(n), r);
}
var Dr = Z(Er, 4);
function Or(e, t, n) {
	n = _r(n);
	var r = 0, i = 0, { length: a } = e, o = !1;
	a === 0 && n(null);
	function s(e, t) {
		e === !1 && (o = !0), o !== !0 && (e ? n(e) : (++i === a || t === gr) && n(null));
	}
	for (; r < a; r++) t(e[r], r, Cr(s));
}
function kr(e, t, n) {
	return Dr(e, Infinity, t, n);
}
function Ar(e, t, n) {
	return (hr(e) ? Or : kr)(e, pr(t), n);
}
var jr = Z(Ar, 3);
function Mr(e, t, n) {
	return mr(jr, e, t, n);
}
var Nr = Z(Mr, 3);
function Pr(e, t, n) {
	return Dr(e, 1, t, n);
}
var Fr = Z(Pr, 3);
function Ir(e, t, n) {
	return mr(Fr, e, t, n);
}
Z(Ir, 3);
var Lr = class {
	constructor() {
		this.head = this.tail = null, this.length = 0;
	}
	removeLink(e) {
		return e.prev ? e.prev.next = e.next : this.head = e.next, e.next ? e.next.prev = e.prev : this.tail = e.prev, e.prev = e.next = null, --this.length, e;
	}
	empty() {
		for (; this.head;) this.shift();
		return this;
	}
	insertAfter(e, t) {
		t.prev = e, t.next = e.next, e.next ? e.next.prev = t : this.tail = t, e.next = t, this.length += 1;
	}
	insertBefore(e, t) {
		t.prev = e.prev, t.next = e, e.prev ? e.prev.next = t : this.head = t, e.prev = t, this.length += 1;
	}
	unshift(e) {
		this.head ? this.insertBefore(this.head, e) : Rr(this, e);
	}
	push(e) {
		this.tail ? this.insertAfter(this.tail, e) : Rr(this, e);
	}
	shift() {
		return this.head && this.removeLink(this.head);
	}
	pop() {
		return this.tail && this.removeLink(this.tail);
	}
	toArray() {
		return [...this];
	}
	*[Symbol.iterator]() {
		for (var e = this.head; e;) yield e.data, e = e.next;
	}
	remove(e) {
		for (var t = this.head; t;) {
			var { next: n } = t;
			e(t) && this.removeLink(t), t = n;
		}
		return this;
	}
};
function Rr(e, t) {
	e.length = 1, e.head = e.tail = t;
}
function zr(e, t, n) {
	if (t == null) t = 1;
	else if (t === 0) throw RangeError("Concurrency must not be zero");
	var r = pr(e), i = 0, a = [];
	let o = {
		error: [],
		drain: [],
		saturated: [],
		unsaturated: [],
		empty: []
	};
	function s(e, t) {
		o[e].push(t);
	}
	function c(e, t) {
		let n = (...r) => {
			l(e, n), t(...r);
		};
		o[e].push(n);
	}
	function l(e, t) {
		if (!e) return Object.keys(o).forEach((e) => o[e] = []);
		if (!t) return o[e] = [];
		o[e] = o[e].filter((e) => e !== t);
	}
	function u(e, ...t) {
		o[e].forEach((e) => e(...t));
	}
	var d = !1;
	function f(e, t, n, r) {
		if (r != null && typeof r != "function") throw Error("task callback must be a function");
		_.started = !0;
		var i, a;
		function o(e, ...t) {
			if (e) return n ? a(e) : i();
			if (t.length <= 1) return i(t[0]);
			i(t);
		}
		var s = _._createTaskItem(e, n ? o : r || o);
		if (t ? _._tasks.unshift(s) : _._tasks.push(s), d || (d = !0, or(() => {
			d = !1, _.process();
		})), n || !r) return new Promise((e, t) => {
			i = e, a = t;
		});
	}
	function p(e) {
		return function(t, ...n) {
			--i;
			for (var r = 0, o = e.length; r < o; r++) {
				var s = e[r], c = a.indexOf(s);
				c === 0 ? a.shift() : c > 0 && a.splice(c, 1), s.callback(t, ...n), t != null && u("error", t, s.data);
			}
			i <= _.concurrency - _.buffer && u("unsaturated"), _.idle() && u("drain"), _.process();
		};
	}
	function m(e) {
		return e.length === 0 && _.idle() ? (or(() => u("drain")), !0) : !1;
	}
	let h = (e) => (t) => {
		if (!t) return new Promise((t, n) => {
			c(e, (e, r) => {
				if (e) return n(e);
				t(r);
			});
		});
		l(e), s(e, t);
	};
	var g = !1, _ = {
		_tasks: new Lr(),
		_createTaskItem(e, t) {
			return {
				data: e,
				callback: t
			};
		},
		*[Symbol.iterator]() {
			yield* _._tasks[Symbol.iterator]();
		},
		concurrency: t,
		payload: n,
		buffer: t / 4,
		started: !1,
		paused: !1,
		push(e, t) {
			return Array.isArray(e) ? m(e) ? void 0 : e.map((e) => f(e, !1, !1, t)) : f(e, !1, !1, t);
		},
		pushAsync(e, t) {
			return Array.isArray(e) ? m(e) ? void 0 : e.map((e) => f(e, !1, !0, t)) : f(e, !1, !0, t);
		},
		kill() {
			l(), _._tasks.empty();
		},
		unshift(e, t) {
			return Array.isArray(e) ? m(e) ? void 0 : e.map((e) => f(e, !0, !1, t)) : f(e, !0, !1, t);
		},
		unshiftAsync(e, t) {
			return Array.isArray(e) ? m(e) ? void 0 : e.map((e) => f(e, !0, !0, t)) : f(e, !0, !0, t);
		},
		remove(e) {
			_._tasks.remove(e);
		},
		process() {
			if (!g) {
				for (g = !0; !_.paused && i < _.concurrency && _._tasks.length;) {
					var e = [], t = [], n = _._tasks.length;
					_.payload && (n = Math.min(n, _.payload));
					for (var o = 0; o < n; o++) {
						var s = _._tasks.shift();
						e.push(s), a.push(s), t.push(s.data);
					}
					i += 1, _._tasks.length === 0 && u("empty"), i === _.concurrency && u("saturated"), r(t, Cr(p(e)));
				}
				g = !1;
			}
		},
		length() {
			return _._tasks.length;
		},
		running() {
			return i;
		},
		workersList() {
			return a;
		},
		idle() {
			return _._tasks.length + i === 0;
		},
		pause() {
			_.paused = !0;
		},
		resume() {
			_.paused !== !1 && (_.paused = !1, or(_.process));
		}
	};
	return Object.defineProperties(_, {
		saturated: {
			writable: !1,
			value: h("saturated")
		},
		unsaturated: {
			writable: !1,
			value: h("unsaturated")
		},
		empty: {
			writable: !1,
			value: h("empty")
		},
		drain: {
			writable: !1,
			value: h("drain")
		},
		error: {
			writable: !1,
			value: h("error")
		}
	}), _;
}
function Br(e, t, n, r) {
	r = _r(r);
	var i = pr(n);
	return Fr(e, (e, n, r) => {
		i(t, e, (e, n) => {
			t = n, r(e);
		});
	}, (e) => r(e, t));
}
Z(Br, 4);
function Vr(e, t, n, r) {
	return mr(Tr(t), e, n, r);
}
var Hr = Z(Vr, 4);
function Ur(e, t, n, r) {
	var i = pr(n);
	return Hr(e, t, (e, t) => {
		i(e, (e, ...n) => e ? t(e) : t(e, n));
	}, (e, t) => {
		for (var n = [], i = 0; i < t.length; i++) t[i] && (n = n.concat(...t[i]));
		return r(e, n);
	});
}
var Wr = Z(Ur, 4);
function Gr(e, t, n) {
	return Wr(e, Infinity, t, n);
}
Z(Gr, 3);
function Kr(e, t, n) {
	return Wr(e, 1, t, n);
}
Z(Kr, 3);
function qr(e, t) {
	return (n, r, i, a) => {
		var o = !1, s;
		let c = pr(i);
		n(r, (n, r, i) => {
			c(n, (r, a) => {
				if (r || r === !1) return i(r);
				if (e(a) && !s) return o = !0, s = t(!0, n), i(null, gr);
				i();
			});
		}, (e) => {
			if (e) return a(e);
			a(null, o ? s : t(!1));
		});
	};
}
function Jr(e, t, n) {
	return qr((e) => e, (e, t) => t)(jr, e, t, n);
}
Z(Jr, 3);
function Yr(e, t, n, r) {
	return qr((e) => e, (e, t) => t)(Tr(t), e, n, r);
}
Z(Yr, 4);
function Xr(e, t, n) {
	return qr((e) => e, (e, t) => t)(Tr(1), e, t, n);
}
Z(Xr, 3);
function Zr(e, t, n) {
	n = Cr(n);
	var r = pr(e), i = pr(t), a;
	function o(e, ...t) {
		if (e) return n(e);
		e !== !1 && (a = t, i(...t, s));
	}
	function s(e, t) {
		if (e) return n(e);
		if (e !== !1) {
			if (!t) return n(null, ...a);
			r(o);
		}
	}
	return s(null, !0);
}
Z(Zr, 3);
function Qr(e) {
	return (t, n, r) => e(t, r);
}
function $r(e, t, n) {
	return jr(e, Qr(pr(t)), n);
}
Z($r, 3);
function ei(e, t, n, r) {
	return Tr(t)(e, Qr(pr(n)), r);
}
var ti = Z(ei, 4);
function ni(e, t, n) {
	return ti(e, 1, t, n);
}
var ri = Z(ni, 3);
function ii(e) {
	return ur(e) ? e : function(...t) {
		var n = t.pop(), r = !0;
		t.push((...e) => {
			r ? or(() => n(...e)) : n(...e);
		}), e.apply(this, t), r = !1;
	};
}
function ai(e, t, n) {
	return qr((e) => !e, (e) => !e)(jr, e, t, n);
}
Z(ai, 3);
function oi(e, t, n, r) {
	return qr((e) => !e, (e) => !e)(Tr(t), e, n, r);
}
Z(oi, 4);
function si(e, t, n) {
	return qr((e) => !e, (e) => !e)(Fr, e, t, n);
}
Z(si, 3);
function ci(e, t, n, r) {
	var i = Array(t.length);
	e(t, (e, t, r) => {
		n(e, (e, n) => {
			i[t] = !!n, r(e);
		});
	}, (e) => {
		if (e) return r(e);
		for (var n = [], a = 0; a < t.length; a++) i[a] && n.push(t[a]);
		r(null, n);
	});
}
function li(e, t, n, r) {
	var i = [];
	e(t, (e, t, r) => {
		n(e, (n, a) => {
			if (n) return r(n);
			a && i.push({
				index: t,
				value: e
			}), r(n);
		});
	}, (e) => {
		if (e) return r(e);
		r(null, i.sort((e, t) => e.index - t.index).map((e) => e.value));
	});
}
function ui(e, t, n, r) {
	return (hr(t) ? ci : li)(e, t, pr(n), r);
}
function di(e, t, n) {
	return ui(jr, e, t, n);
}
Z(di, 3);
function fi(e, t, n, r) {
	return ui(Tr(t), e, n, r);
}
Z(fi, 4);
function pi(e, t, n) {
	return ui(Fr, e, t, n);
}
Z(pi, 3);
function mi(e, t) {
	var n = Cr(t), r = pr(ii(e));
	function i(e) {
		if (e) return n(e);
		e !== !1 && r(i);
	}
	return i();
}
Z(mi, 2);
function hi(e, t, n, r) {
	var i = pr(n);
	return Hr(e, t, (e, t) => {
		i(e, (n, r) => n ? t(n) : t(n, {
			key: r,
			val: e
		}));
	}, (e, t) => {
		for (var n = {}, { hasOwnProperty: i } = Object.prototype, a = 0; a < t.length; a++) if (t[a]) {
			var { key: o } = t[a], { val: s } = t[a];
			i.call(n, o) ? n[o].push(s) : n[o] = [s];
		}
		return r(e, n);
	});
}
Z(hi, 4);
function gi(e, t, n, r) {
	r = _r(r);
	var i = {}, a = pr(n);
	return Tr(t)(e, (e, t, n) => {
		a(e, t, (e, r) => {
			if (e) return n(e);
			i[t] = r, n(e);
		});
	}, (e) => r(e, i));
}
Z(gi, 4), rr ? process.nextTick : nr && setImmediate, Z((e, t, n) => {
	var r = hr(t) ? [] : {};
	e(t, (e, t, n) => {
		pr(e)((e, ...i) => {
			i.length < 2 && ([i] = i), r[t] = i, n(e);
		});
	}, (e) => n(e, r));
}, 3);
function _i(e, t) {
	var n = pr(e);
	return zr((e, t) => {
		n(e[0], t);
	}, t, 1);
}
function vi(e, t) {
	if (t = _r(t), !Array.isArray(e)) return t(/* @__PURE__ */ TypeError("First argument to race must be an array of functions"));
	if (!e.length) return t();
	for (var n = 0, r = e.length; n < r; n++) pr(e[n])(t);
}
Z(vi, 2);
function yi(e, t, n, r) {
	let i = pr(n);
	return ui(e, t, (e, t) => {
		i(e, (e, n) => {
			t(e, !n);
		});
	}, r);
}
function bi(e, t, n) {
	return yi(jr, e, t, n);
}
Z(bi, 3);
function xi(e, t, n, r) {
	return yi(Tr(t), e, n, r);
}
Z(xi, 4);
function Si(e, t, n) {
	return yi(Fr, e, t, n);
}
Z(Si, 3);
function Ci(e, t, n) {
	return qr(Boolean, (e) => e)(jr, e, t, n);
}
Z(Ci, 3);
function wi(e, t, n, r) {
	return qr(Boolean, (e) => e)(Tr(t), e, n, r);
}
Z(wi, 4);
function Ti(e, t, n) {
	return qr(Boolean, (e) => e)(Fr, e, t, n);
}
Z(Ti, 3);
function Ei(e, t, n) {
	var r = pr(t);
	return Nr(e, (e, t) => {
		r(e, (n, r) => {
			if (n) return t(n);
			t(n, {
				value: e,
				criteria: r
			});
		});
	}, (e, t) => {
		if (e) return n(e);
		n(null, t.sort(i).map((e) => e.value));
	});
	function i(e, t) {
		var n = e.criteria, r = t.criteria;
		return n < r ? -1 : +(n > r);
	}
}
Z(Ei, 3);
function Di(e, t) {
	var n = null, r;
	return ri(e, (e, t) => {
		pr(e)((e, ...i) => {
			if (e === !1) return t(e);
			i.length < 2 ? [r] = i : r = i, n = e, t(e ? null : {});
		});
	}, () => t(n, r));
}
Z(Di);
function Oi(e, t, n) {
	n = Cr(n);
	var r = pr(t), i = pr(e), a = [];
	function o(e, ...t) {
		if (e) return n(e);
		a = t, e !== !1 && i(s);
	}
	function s(e, t) {
		if (e) return n(e);
		if (e !== !1) {
			if (!t) return n(null, ...a);
			r(o);
		}
	}
	return i(s);
}
Z(Oi, 3);
function ki(e, t) {
	if (t = _r(t), !Array.isArray(e)) return t(/* @__PURE__ */ Error("First argument to waterfall must be an array of functions"));
	if (!e.length) return t();
	var n = 0;
	function r(t) {
		pr(e[n++])(...t, Cr(i));
	}
	function i(i, ...a) {
		if (i !== !1) {
			if (i || n === e.length) return t(i, ...a);
			r(a);
		}
	}
	r([]);
}
Z(ki);
//#endregion
//#region node_modules/archiver/lib/error.js
var Ai = {
	ABORTED: "archive was aborted",
	DIRECTORYDIRPATHREQUIRED: "diretory dirpath argument must be a non-empty string value",
	DIRECTORYFUNCTIONINVALIDDATA: "invalid data returned by directory custom data function",
	ENTRYNAMEREQUIRED: "entry name must be a non-empty string value",
	FILEFILEPATHREQUIRED: "file filepath argument must be a non-empty string value",
	FINALIZING: "archive already finalizing",
	QUEUECLOSED: "queue closed",
	NOENDMETHOD: "no suitable finalize/end method defined by module",
	DIRECTORYNOTSUPPORTED: "support for directory entries not defined by module",
	FORMATSET: "archive format already set",
	INPUTSTEAMBUFFERREQUIRED: "input source must be valid Stream or Buffer instance",
	MODULESET: "module already set",
	SYMLINKNOTSUPPORTED: "support for symlink entries not defined by module",
	SYMLINKFILEPATHREQUIRED: "symlink filepath argument must be a non-empty string value",
	SYMLINKTARGETREQUIRED: "symlink target argument must be a non-empty string value",
	ENTRYNOTSUPPORTED: "entry not supported"
};
function ji(e, t) {
	Error.captureStackTrace(this, this.constructor), this.message = Ai[e] || e, this.code = e, this.data = t;
}
x.inherits(ji, Error);
//#endregion
//#region node_modules/archiver/node_modules/readable-stream/lib/ours/primordials.js
var Mi = /* @__PURE__ */ H(((e, t) => {
	t.exports = {
		AggregateError: class extends Error {
			constructor(e) {
				if (!Array.isArray(e)) throw TypeError(`Expected input to be an Array, got ${typeof e}`);
				let t = "";
				for (let n = 0; n < e.length; n++) t += `    ${e[n].stack}\n`;
				super(t), this.name = "AggregateError", this.errors = e;
			}
		},
		ArrayIsArray(e) {
			return Array.isArray(e);
		},
		ArrayPrototypeIncludes(e, t) {
			return e.includes(t);
		},
		ArrayPrototypeIndexOf(e, t) {
			return e.indexOf(t);
		},
		ArrayPrototypeJoin(e, t) {
			return e.join(t);
		},
		ArrayPrototypeMap(e, t) {
			return e.map(t);
		},
		ArrayPrototypePop(e, t) {
			return e.pop(t);
		},
		ArrayPrototypePush(e, t) {
			return e.push(t);
		},
		ArrayPrototypeSlice(e, t, n) {
			return e.slice(t, n);
		},
		Error,
		FunctionPrototypeCall(e, t, ...n) {
			return e.call(t, ...n);
		},
		FunctionPrototypeSymbolHasInstance(e, t) {
			return Function.prototype[Symbol.hasInstance].call(e, t);
		},
		MathFloor: Math.floor,
		Number,
		NumberIsInteger: Number.isInteger,
		NumberIsNaN: Number.isNaN,
		NumberMAX_SAFE_INTEGER: 2 ** 53 - 1,
		NumberMIN_SAFE_INTEGER: -(2 ** 53 - 1),
		NumberParseInt: Number.parseInt,
		ObjectDefineProperties(e, t) {
			return Object.defineProperties(e, t);
		},
		ObjectDefineProperty(e, t, n) {
			return Object.defineProperty(e, t, n);
		},
		ObjectGetOwnPropertyDescriptor(e, t) {
			return Object.getOwnPropertyDescriptor(e, t);
		},
		ObjectKeys(e) {
			return Object.keys(e);
		},
		ObjectSetPrototypeOf(e, t) {
			return Object.setPrototypeOf(e, t);
		},
		Promise,
		PromisePrototypeCatch(e, t) {
			return e.catch(t);
		},
		PromisePrototypeThen(e, t, n) {
			return e.then(t, n);
		},
		PromiseReject(e) {
			return Promise.reject(e);
		},
		PromiseResolve(e) {
			return Promise.resolve(e);
		},
		ReflectApply: Reflect.apply,
		RegExpPrototypeTest(e, t) {
			return e.test(t);
		},
		SafeSet: Set,
		String,
		StringPrototypeSlice(e, t, n) {
			return e.slice(t, n);
		},
		StringPrototypeToLowerCase(e) {
			return e.toLowerCase();
		},
		StringPrototypeToUpperCase(e) {
			return e.toUpperCase();
		},
		StringPrototypeTrim(e) {
			return e.trim();
		},
		Symbol,
		SymbolFor: Symbol.for,
		SymbolAsyncIterator: Symbol.asyncIterator,
		SymbolHasInstance: Symbol.hasInstance,
		SymbolIterator: Symbol.iterator,
		SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
		SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
		TypedArrayPrototypeSet(e, t, n) {
			return e.set(t, n);
		},
		Boolean,
		Uint8Array
	};
})), Ni = /* @__PURE__ */ H(((e, t) => {
	t.exports = {
		format(e, ...t) {
			return e.replace(/%([sdifj])/g, function(...[e, n]) {
				let r = t.shift();
				return n === "f" ? r.toFixed(6) : n === "j" ? JSON.stringify(r) : n === "s" && typeof r == "object" ? `${r.constructor === Object ? "" : r.constructor.name} {}`.trim() : r.toString();
			});
		},
		inspect(e) {
			switch (typeof e) {
				case "string":
					if (e.includes("'")) {
						if (!e.includes("\"")) return `"${e}"`;
						if (!e.includes("`") && !e.includes("${")) return `\`${e}\``;
					}
					return `'${e}'`;
				case "number": return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
				case "bigint": return `${String(e)}n`;
				case "boolean":
				case "undefined": return String(e);
				case "object": return "{}";
			}
		}
	};
})), Pi = /* @__PURE__ */ H(((e, t) => {
	var { format: n, inspect: r } = Ni(), { AggregateError: i } = Mi(), a = globalThis.AggregateError || i, o = Symbol("kIsNodeError"), s = [
		"string",
		"function",
		"number",
		"object",
		"Function",
		"Object",
		"boolean",
		"bigint",
		"symbol"
	], c = /^([A-Z][a-z0-9]*)+$/, l = "__node_internal_", u = {};
	function d(e, t) {
		if (!e) throw new u.ERR_INTERNAL_ASSERTION(t);
	}
	function f(e) {
		let t = "", n = e.length, r = +(e[0] === "-");
		for (; n >= r + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
		return `${e.slice(0, n)}${t}`;
	}
	function p(e, t, r) {
		if (typeof t == "function") return d(t.length <= r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${t.length}).`), t(...r);
		let i = (t.match(/%[dfijoOs]/g) || []).length;
		return d(i === r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${i}).`), r.length === 0 ? t : n(t, ...r);
	}
	function m(e, t, n) {
		n ||= Error;
		class r extends n {
			constructor(...n) {
				super(p(e, t, n));
			}
			toString() {
				return `${this.name} [${e}]: ${this.message}`;
			}
		}
		Object.defineProperties(r.prototype, {
			name: {
				value: n.name,
				writable: !0,
				enumerable: !1,
				configurable: !0
			},
			toString: {
				value() {
					return `${this.name} [${e}]: ${this.message}`;
				},
				writable: !0,
				enumerable: !1,
				configurable: !0
			}
		}), r.prototype.code = e, r.prototype[o] = !0, u[e] = r;
	}
	function h(e) {
		let t = l + e.name;
		return Object.defineProperty(e, "name", { value: t }), e;
	}
	function g(e, t) {
		if (e && t && e !== t) {
			if (Array.isArray(t.errors)) return t.errors.push(e), t;
			let n = new a([t, e], t.message);
			return n.code = t.code, n;
		}
		return e || t;
	}
	var _ = class extends Error {
		constructor(e = "The operation was aborted", t = void 0) {
			if (t !== void 0 && typeof t != "object") throw new u.ERR_INVALID_ARG_TYPE("options", "Object", t);
			super(e, t), this.code = "ABORT_ERR", this.name = "AbortError";
		}
	};
	m("ERR_ASSERTION", "%s", Error), m("ERR_INVALID_ARG_TYPE", (e, t, n) => {
		d(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [t]);
		let i = "The ";
		e.endsWith(" argument") ? i += `${e} ` : i += `"${e}" ${e.includes(".") ? "property" : "argument"} `, i += "must be ";
		let a = [], o = [], l = [];
		for (let e of t) d(typeof e == "string", "All expected entries have to be of type string"), s.includes(e) ? a.push(e.toLowerCase()) : c.test(e) ? o.push(e) : (d(e !== "object", "The value \"object\" should be written as \"Object\""), l.push(e));
		if (o.length > 0) {
			let e = a.indexOf("object");
			e !== -1 && (a.splice(a, e, 1), o.push("Object"));
		}
		if (a.length > 0) {
			switch (a.length) {
				case 1:
					i += `of type ${a[0]}`;
					break;
				case 2:
					i += `one of type ${a[0]} or ${a[1]}`;
					break;
				default: {
					let e = a.pop();
					i += `one of type ${a.join(", ")}, or ${e}`;
				}
			}
			(o.length > 0 || l.length > 0) && (i += " or ");
		}
		if (o.length > 0) {
			switch (o.length) {
				case 1:
					i += `an instance of ${o[0]}`;
					break;
				case 2:
					i += `an instance of ${o[0]} or ${o[1]}`;
					break;
				default: {
					let e = o.pop();
					i += `an instance of ${o.join(", ")}, or ${e}`;
				}
			}
			l.length > 0 && (i += " or ");
		}
		switch (l.length) {
			case 0: break;
			case 1:
				l[0].toLowerCase() !== l[0] && (i += "an "), i += `${l[0]}`;
				break;
			case 2:
				i += `one of ${l[0]} or ${l[1]}`;
				break;
			default: {
				let e = l.pop();
				i += `one of ${l.join(", ")}, or ${e}`;
			}
		}
		if (n == null) i += `. Received ${n}`;
		else if (typeof n == "function" && n.name) i += `. Received function ${n.name}`;
		else if (typeof n == "object") {
			var u;
			if ((u = n.constructor) != null && u.name) i += `. Received an instance of ${n.constructor.name}`;
			else {
				let e = r(n, { depth: -1 });
				i += `. Received ${e}`;
			}
		} else {
			let e = r(n, { colors: !1 });
			e.length > 25 && (e = `${e.slice(0, 25)}...`), i += `. Received type ${typeof n} (${e})`;
		}
		return i;
	}, TypeError), m("ERR_INVALID_ARG_VALUE", (e, t, n = "is invalid") => {
		let i = r(t);
		return i.length > 128 && (i = i.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${n}. Received ${i}`;
	}, TypeError), m("ERR_INVALID_RETURN_VALUE", (e, t, n) => {
		var r;
		return `Expected ${e} to be returned from the "${t}" function but got ${n != null && (r = n.constructor) != null && r.name ? `instance of ${n.constructor.name}` : `type ${typeof n}`}.`;
	}, TypeError), m("ERR_MISSING_ARGS", (...e) => {
		d(e.length > 0, "At least one arg needs to be specified");
		let t, n = e.length;
		switch (e = (Array.isArray(e) ? e : [e]).map((e) => `"${e}"`).join(" or "), n) {
			case 1:
				t += `The ${e[0]} argument`;
				break;
			case 2:
				t += `The ${e[0]} and ${e[1]} arguments`;
				break;
			default:
				{
					let n = e.pop();
					t += `The ${e.join(", ")}, and ${n} arguments`;
				}
				break;
		}
		return `${t} must be specified`;
	}, TypeError), m("ERR_OUT_OF_RANGE", (e, t, n) => {
		d(t, "Missing \"range\" argument");
		let i;
		if (Number.isInteger(n) && Math.abs(n) > 2 ** 32) i = f(String(n));
		else if (typeof n == "bigint") {
			i = String(n);
			let e = BigInt(2) ** BigInt(32);
			(n > e || n < -e) && (i = f(i)), i += "n";
		} else i = r(n);
		return `The value of "${e}" is out of range. It must be ${t}. Received ${i}`;
	}, RangeError), m("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), m("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), m("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), m("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), m("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), m("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), m("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), m("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), m("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), m("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), m("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), t.exports = {
		AbortError: _,
		aggregateTwoErrors: h(g),
		hideStackFrames: h,
		codes: u
	};
}));
//#endregion
//#region node_modules/event-target-shim/dist/event-target-shim.mjs
function Q(e) {
	let t = Qi.get(e);
	return console.assert(t != null, "'this' is expected an Event object, but got", e), t;
}
function Fi(e) {
	if (e.passiveListener != null) {
		typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", e.passiveListener);
		return;
	}
	e.event.cancelable && (e.canceled = !0, typeof e.event.preventDefault == "function" && e.event.preventDefault());
}
function Ii(e, t) {
	Qi.set(this, {
		eventTarget: e,
		event: t,
		eventPhase: 2,
		currentTarget: e,
		canceled: !1,
		stopped: !1,
		immediateStopped: !1,
		passiveListener: null,
		timeStamp: t.timeStamp || Date.now()
	}), Object.defineProperty(this, "isTrusted", {
		value: !1,
		enumerable: !0
	});
	let n = Object.keys(t);
	for (let e = 0; e < n.length; ++e) {
		let t = n[e];
		t in this || Object.defineProperty(this, t, Li(t));
	}
}
function Li(e) {
	return {
		get() {
			return Q(this).event[e];
		},
		set(t) {
			Q(this).event[e] = t;
		},
		configurable: !0,
		enumerable: !0
	};
}
function Ri(e) {
	return {
		value() {
			let t = Q(this).event;
			return t[e].apply(t, arguments);
		},
		configurable: !0,
		enumerable: !0
	};
}
function zi(e, t) {
	let n = Object.keys(t);
	if (n.length === 0) return e;
	function r(t, n) {
		e.call(this, t, n);
	}
	r.prototype = Object.create(e.prototype, { constructor: {
		value: r,
		configurable: !0,
		writable: !0
	} });
	for (let i = 0; i < n.length; ++i) {
		let a = n[i];
		if (!(a in e.prototype)) {
			let e = typeof Object.getOwnPropertyDescriptor(t, a).value == "function";
			Object.defineProperty(r.prototype, a, e ? Ri(a) : Li(a));
		}
	}
	return r;
}
function Bi(e) {
	if (e == null || e === Object.prototype) return Ii;
	let t = $i.get(e);
	return t ?? (t = zi(Bi(Object.getPrototypeOf(e)), e), $i.set(e, t)), t;
}
function Vi(e, t) {
	return new (Bi(Object.getPrototypeOf(t)))(e, t);
}
function Hi(e) {
	return Q(e).immediateStopped;
}
function Ui(e, t) {
	Q(e).eventPhase = t;
}
function Wi(e, t) {
	Q(e).currentTarget = t;
}
function Gi(e, t) {
	Q(e).passiveListener = t;
}
function Ki(e) {
	return typeof e == "object" && !!e;
}
function qi(e) {
	let t = ea.get(e);
	if (t == null) throw TypeError("'this' is expected an EventTarget object, but got another value.");
	return t;
}
function Ji(e) {
	return {
		get() {
			let t = qi(this).get(e);
			for (; t != null;) {
				if (t.listenerType === ra) return t.listener;
				t = t.next;
			}
			return null;
		},
		set(t) {
			typeof t != "function" && !Ki(t) && (t = null);
			let n = qi(this), r = null, i = n.get(e);
			for (; i != null;) i.listenerType === ra ? r === null ? i.next === null ? n.delete(e) : n.set(e, i.next) : r.next = i.next : r = i, i = i.next;
			if (t !== null) {
				let i = {
					listener: t,
					listenerType: ra,
					passive: !1,
					once: !1,
					next: null
				};
				r === null ? n.set(e, i) : r.next = i;
			}
		},
		configurable: !0,
		enumerable: !0
	};
}
function Yi(e, t) {
	Object.defineProperty(e, `on${t}`, Ji(t));
}
function Xi(e) {
	function t() {
		Zi.call(this);
	}
	t.prototype = Object.create(Zi.prototype, { constructor: {
		value: t,
		configurable: !0,
		writable: !0
	} });
	for (let n = 0; n < e.length; ++n) Yi(t.prototype, e[n]);
	return t;
}
function Zi() {
	if (this instanceof Zi) {
		ea.set(this, /* @__PURE__ */ new Map());
		return;
	}
	if (arguments.length === 1 && Array.isArray(arguments[0])) return Xi(arguments[0]);
	if (arguments.length > 0) {
		let e = Array(arguments.length);
		for (let t = 0; t < arguments.length; ++t) e[t] = arguments[t];
		return Xi(e);
	}
	throw TypeError("Cannot call a class as a function");
}
var Qi, $i, ea, ta, na, ra, ia = V((() => {
	Qi = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakMap(), Ii.prototype = {
		get type() {
			return Q(this).event.type;
		},
		get target() {
			return Q(this).eventTarget;
		},
		get currentTarget() {
			return Q(this).currentTarget;
		},
		composedPath() {
			let e = Q(this).currentTarget;
			return e == null ? [] : [e];
		},
		get NONE() {
			return 0;
		},
		get CAPTURING_PHASE() {
			return 1;
		},
		get AT_TARGET() {
			return 2;
		},
		get BUBBLING_PHASE() {
			return 3;
		},
		get eventPhase() {
			return Q(this).eventPhase;
		},
		stopPropagation() {
			let e = Q(this);
			e.stopped = !0, typeof e.event.stopPropagation == "function" && e.event.stopPropagation();
		},
		stopImmediatePropagation() {
			let e = Q(this);
			e.stopped = !0, e.immediateStopped = !0, typeof e.event.stopImmediatePropagation == "function" && e.event.stopImmediatePropagation();
		},
		get bubbles() {
			return !!Q(this).event.bubbles;
		},
		get cancelable() {
			return !!Q(this).event.cancelable;
		},
		preventDefault() {
			Fi(Q(this));
		},
		get defaultPrevented() {
			return Q(this).canceled;
		},
		get composed() {
			return !!Q(this).event.composed;
		},
		get timeStamp() {
			return Q(this).timeStamp;
		},
		get srcElement() {
			return Q(this).eventTarget;
		},
		get cancelBubble() {
			return Q(this).stopped;
		},
		set cancelBubble(e) {
			if (!e) return;
			let t = Q(this);
			t.stopped = !0, typeof t.event.cancelBubble == "boolean" && (t.event.cancelBubble = !0);
		},
		get returnValue() {
			return !Q(this).canceled;
		},
		set returnValue(e) {
			e || Fi(Q(this));
		},
		initEvent() {}
	}, Object.defineProperty(Ii.prototype, "constructor", {
		value: Ii,
		configurable: !0,
		writable: !0
	}), typeof window < "u" && window.Event !== void 0 && (Object.setPrototypeOf(Ii.prototype, window.Event.prototype), $i.set(window.Event.prototype, Ii)), ea = /* @__PURE__ */ new WeakMap(), ta = 1, na = 2, ra = 3, Zi.prototype = {
		addEventListener(e, t, n) {
			if (t == null) return;
			if (typeof t != "function" && !Ki(t)) throw TypeError("'listener' should be a function or an object.");
			let r = qi(this), i = Ki(n), a = (i ? n.capture : n) ? ta : na, o = {
				listener: t,
				listenerType: a,
				passive: i && !!n.passive,
				once: i && !!n.once,
				next: null
			}, s = r.get(e);
			if (s === void 0) {
				r.set(e, o);
				return;
			}
			let c = null;
			for (; s != null;) {
				if (s.listener === t && s.listenerType === a) return;
				c = s, s = s.next;
			}
			c.next = o;
		},
		removeEventListener(e, t, n) {
			if (t == null) return;
			let r = qi(this), i = (Ki(n) ? n.capture : n) ? ta : na, a = null, o = r.get(e);
			for (; o != null;) {
				if (o.listener === t && o.listenerType === i) {
					a === null ? o.next === null ? r.delete(e) : r.set(e, o.next) : a.next = o.next;
					return;
				}
				a = o, o = o.next;
			}
		},
		dispatchEvent(e) {
			if (e == null || typeof e.type != "string") throw TypeError("\"event.type\" should be a string.");
			let t = qi(this), n = e.type, r = t.get(n);
			if (r == null) return !0;
			let i = Vi(this, e), a = null;
			for (; r != null;) {
				if (r.once ? a === null ? r.next === null ? t.delete(n) : t.set(n, r.next) : a.next = r.next : a = r, Gi(i, r.passive ? r.listener : null), typeof r.listener == "function") try {
					r.listener.call(this, i);
				} catch (e) {
					typeof console < "u" && typeof console.error == "function" && console.error(e);
				}
				else r.listenerType !== ra && typeof r.listener.handleEvent == "function" && r.listener.handleEvent(i);
				if (Hi(i)) break;
				r = r.next;
			}
			return Gi(i, null), Ui(i, 0), Wi(i, null), !i.defaultPrevented;
		}
	}, Object.defineProperty(Zi.prototype, "constructor", {
		value: Zi,
		configurable: !0,
		writable: !0
	}), typeof window < "u" && window.EventTarget !== void 0 && Object.setPrototypeOf(Zi.prototype, window.EventTarget.prototype);
})), aa = /* @__PURE__ */ U({
	AbortController: () => da,
	AbortSignal: () => la,
	default: () => da
});
function oa() {
	let e = Object.create(la.prototype);
	return Zi.call(e), ua.set(e, !1), e;
}
function sa(e) {
	ua.get(e) === !1 && (ua.set(e, !0), e.dispatchEvent({ type: "abort" }));
}
function ca(e) {
	let t = fa.get(e);
	if (t == null) throw TypeError(`Expected 'this' to be an 'AbortController' object, but got ${e === null ? "null" : typeof e}`);
	return t;
}
var la, ua, da, fa, pa = V((() => {
	ia(), la = class extends Zi {
		constructor() {
			throw super(), TypeError("AbortSignal cannot be constructed directly");
		}
		get aborted() {
			let e = ua.get(this);
			if (typeof e != "boolean") throw TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
			return e;
		}
	}, Yi(la.prototype, "abort"), ua = /* @__PURE__ */ new WeakMap(), Object.defineProperties(la.prototype, { aborted: { enumerable: !0 } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(la.prototype, Symbol.toStringTag, {
		configurable: !0,
		value: "AbortSignal"
	}), da = class {
		constructor() {
			fa.set(this, oa());
		}
		get signal() {
			return ca(this);
		}
		abort() {
			sa(ca(this));
		}
	}, fa = /* @__PURE__ */ new WeakMap(), Object.defineProperties(da.prototype, {
		signal: { enumerable: !0 },
		abort: { enumerable: !0 }
	}), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(da.prototype, Symbol.toStringTag, {
		configurable: !0,
		value: "AbortController"
	});
})), ma = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), { format: r, inspect: i } = Ni(), { codes: { ERR_INVALID_ARG_TYPE: a } } = Pi(), { kResistStopPropagation: o, AggregateError: s, SymbolDispose: c } = Mi(), l = globalThis.AbortSignal || (pa(), K(aa)).AbortSignal, u = globalThis.AbortController || (pa(), K(aa)).AbortController, d = Object.getPrototypeOf(async function() {}).constructor, f = globalThis.Blob || n.Blob, p = f === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof f;
	}, m = (e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new a(t, "AbortSignal", e);
	}, h = (e, t) => {
		if (typeof e != "function") throw new a(t, "Function", e);
	};
	t.exports = {
		AggregateError: s,
		kEmptyObject: Object.freeze({}),
		once(e) {
			let t = !1;
			return function(...n) {
				t || (t = !0, e.apply(this, n));
			};
		},
		createDeferredPromise: function() {
			let e, t;
			return {
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			};
		},
		promisify(e) {
			return new Promise((t, n) => {
				e((e, ...r) => e ? n(e) : t(...r));
			});
		},
		debuglog() {
			return function() {};
		},
		format: r,
		inspect: i,
		types: {
			isAsyncFunction(e) {
				return e instanceof d;
			},
			isArrayBufferView(e) {
				return ArrayBuffer.isView(e);
			}
		},
		isBlob: p,
		deprecate(e, t) {
			return e;
		},
		addAbortListener: q("events").addAbortListener || function(e, t) {
			if (e === void 0) throw new a("signal", "AbortSignal", e);
			m(e, "signal"), h(t, "listener");
			let n;
			return e.aborted ? queueMicrotask(() => t()) : (e.addEventListener("abort", t, {
				__proto__: null,
				once: !0,
				[o]: !0
			}), n = () => {
				e.removeEventListener("abort", t);
			}), {
				__proto__: null,
				[c]() {
					var e;
					(e = n) == null || e();
				}
			};
		},
		AbortSignalAny: l.any || function(e) {
			if (e.length === 1) return e[0];
			let t = new u(), n = () => t.abort();
			return e.forEach((e) => {
				m(e, "signals"), e.addEventListener("abort", n, { once: !0 });
			}), t.signal.addEventListener("abort", () => {
				e.forEach((e) => e.removeEventListener("abort", n));
			}, { once: !0 }), t.signal;
		}
	}, t.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
})), ha = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i, ArrayPrototypeMap: a, NumberIsInteger: o, NumberIsNaN: s, NumberMAX_SAFE_INTEGER: c, NumberMIN_SAFE_INTEGER: l, NumberParseInt: u, ObjectPrototypeHasOwnProperty: d, RegExpPrototypeExec: f, String: p, StringPrototypeToUpperCase: m, StringPrototypeTrim: h } = Mi(), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: _, ERR_INVALID_ARG_TYPE: v, ERR_INVALID_ARG_VALUE: y, ERR_OUT_OF_RANGE: b, ERR_UNKNOWN_SIGNAL: x } } = Pi(), { normalizeEncoding: S } = ma(), { isAsyncFunction: C, isArrayBufferView: w } = ma().types, T = {};
	function E(e) {
		return e === (e | 0);
	}
	function D(e) {
		return e === e >>> 0;
	}
	var O = /^[0-7]+$/, k = "must be a 32-bit unsigned integer or an octal string";
	function A(e, t, n) {
		if (e === void 0 && (e = n), typeof e == "string") {
			if (f(O, e) === null) throw new y(t, e, k);
			e = u(e, 8);
		}
		return N(e, t), e;
	}
	var j = g((e, t, n = l, r = c) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		if (e < n || e > r) throw new b(t, `>= ${n} && <= ${r}`, e);
	}), M = g((e, t, n = -2147483648, r = 2147483647) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		if (e < n || e > r) throw new b(t, `>= ${n} && <= ${r}`, e);
	}), N = g((e, t, n = !1) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		let r = +!!n, i = 4294967295;
		if (e < r || e > i) throw new b(t, `>= ${r} && <= ${i}`, e);
	});
	function P(e, t) {
		if (typeof e != "string") throw new v(t, "string", e);
	}
	function F(e, t, n = void 0, r) {
		if (typeof e != "number") throw new v(t, "number", e);
		if (n != null && e < n || r != null && e > r || (n != null || r != null) && s(e)) throw new b(t, `${n == null ? "" : `>= ${n}`}${n != null && r != null ? " && " : ""}${r == null ? "" : `<= ${r}`}`, e);
	}
	var I = g((e, t, n) => {
		if (!r(n, e)) throw new y(t, e, "must be one of: " + i(a(n, (e) => typeof e == "string" ? `'${e}'` : p(e)), ", "));
	});
	function L(e, t) {
		if (typeof e != "boolean") throw new v(t, "boolean", e);
	}
	function R(e, t, n) {
		return e == null || !d(e, t) ? n : e[t];
	}
	var z = g((e, t, r = null) => {
		let i = R(r, "allowArray", !1), a = R(r, "allowFunction", !1);
		if (!R(r, "nullable", !1) && e === null || !i && n(e) || typeof e != "object" && (!a || typeof e != "function")) throw new v(t, "Object", e);
	}), B = g((e, t) => {
		if (e != null && typeof e != "object" && typeof e != "function") throw new v(t, "a dictionary", e);
	}), V = g((e, t, r = 0) => {
		if (!n(e)) throw new v(t, "Array", e);
		if (e.length < r) throw new y(t, e, `must be longer than ${r}`);
	});
	function H(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) P(e[n], `${t}[${n}]`);
	}
	function U(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) L(e[n], `${t}[${n}]`);
	}
	function W(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = `${t}[${n}]`;
			if (r == null) throw new v(i, "AbortSignal", r);
			ee(r, i);
		}
	}
	function G(e, t = "signal") {
		if (P(e, t), T[e] === void 0) throw T[m(e)] === void 0 ? new x(e) : new x(e + " (signals must use all capital letters)");
	}
	var K = g((e, t = "buffer") => {
		if (!w(e)) throw new v(t, [
			"Buffer",
			"TypedArray",
			"DataView"
		], e);
	});
	function q(e, t) {
		let n = S(t), r = e.length;
		if (n === "hex" && r % 2 != 0) throw new y("encoding", t, `is invalid for data of length ${r}`);
	}
	function J(e, t = "Port", n = !0) {
		if (typeof e != "number" && typeof e != "string" || typeof e == "string" && h(e).length === 0 || +e != e >>> 0 || e > 65535 || e === 0 && !n) throw new _(t, e, n);
		return e | 0;
	}
	var ee = g((e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new v(t, "AbortSignal", e);
	}), te = g((e, t) => {
		if (typeof e != "function") throw new v(t, "Function", e);
	}), ne = g((e, t) => {
		if (typeof e != "function" || C(e)) throw new v(t, "Function", e);
	}), re = g((e, t) => {
		if (e !== void 0) throw new v(t, "undefined", e);
	});
	function ie(e, t, n) {
		if (!r(n, e)) throw new v(t, `('${i(n, "|")}')`, e);
	}
	var ae = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
	function oe(e, t) {
		if (e === void 0 || !f(ae, e)) throw new y(t, e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	function se(e) {
		if (typeof e == "string") return oe(e, "hints"), e;
		if (n(e)) {
			let t = e.length, n = "";
			if (t === 0) return n;
			for (let r = 0; r < t; r++) {
				let i = e[r];
				oe(i, "hints"), n += i, r !== t - 1 && (n += ", ");
			}
			return n;
		}
		throw new y("hints", e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	t.exports = {
		isInt32: E,
		isUint32: D,
		parseFileMode: A,
		validateArray: V,
		validateStringArray: H,
		validateBooleanArray: U,
		validateAbortSignalArray: W,
		validateBoolean: L,
		validateBuffer: K,
		validateDictionary: B,
		validateEncoding: q,
		validateFunction: te,
		validateInt32: M,
		validateInteger: j,
		validateNumber: F,
		validateObject: z,
		validateOneOf: I,
		validatePlainFunction: ne,
		validatePort: J,
		validateSignalName: G,
		validateString: P,
		validateUint32: N,
		validateUndefined: re,
		validateUnion: ie,
		validateAbortSignal: ee,
		validateLinkHeaderValue: se
	};
})), ga = /* @__PURE__ */ H(((e, t) => {
	t.exports = global.process;
})), _a = /* @__PURE__ */ H(((e, t) => {
	t.exports = ((e, t, n, r) => {
		if (t in e && e[t] === !0) {
			let t;
			for (let i of n) if (i in e && (t = e[i], r(t))) return t;
		}
		return e;
	})(ga(), "__esModule", ["default", "process"], (e) => "nextTick" in e);
})), va = /* @__PURE__ */ H(((e, t) => {
	var { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i } = Mi(), a = i("nodejs.stream.destroyed"), o = i("nodejs.stream.errored"), s = i("nodejs.stream.readable"), c = i("nodejs.stream.writable"), l = i("nodejs.stream.disturbed"), u = i("nodejs.webstream.isClosedPromise"), d = i("nodejs.webstream.controllerErrorFunction");
	function f(e, t = !1) {
		return !!(e && typeof e.pipe == "function" && typeof e.on == "function" && (!t || typeof e.pause == "function" && typeof e.resume == "function") && (!e._writableState || e._readableState?.readable !== !1) && (!e._writableState || e._readableState));
	}
	function p(e) {
		return !!(e && typeof e.write == "function" && typeof e.on == "function" && (!e._readableState || e._writableState?.writable !== !1));
	}
	function m(e) {
		return !!(e && typeof e.pipe == "function" && e._readableState && typeof e.on == "function" && typeof e.write == "function");
	}
	function h(e) {
		return e && (e._readableState || e._writableState || typeof e.write == "function" && typeof e.on == "function" || typeof e.pipe == "function" && typeof e.on == "function");
	}
	function g(e) {
		return !!(e && !h(e) && typeof e.pipeThrough == "function" && typeof e.getReader == "function" && typeof e.cancel == "function");
	}
	function _(e) {
		return !!(e && !h(e) && typeof e.getWriter == "function" && typeof e.abort == "function");
	}
	function v(e) {
		return !!(e && !h(e) && typeof e.readable == "object" && typeof e.writable == "object");
	}
	function y(e) {
		return g(e) || _(e) || v(e);
	}
	function b(e, t) {
		return e == null ? !1 : t === !0 ? typeof e[n] == "function" : t === !1 ? typeof e[r] == "function" : typeof e[n] == "function" || typeof e[r] == "function";
	}
	function x(e) {
		if (!h(e)) return null;
		let t = e._writableState, n = e._readableState, r = t || n;
		return !!(e.destroyed || e[a] || r != null && r.destroyed);
	}
	function S(e) {
		if (!p(e)) return null;
		if (e.writableEnded === !0) return !0;
		let t = e._writableState;
		return t != null && t.errored ? !1 : typeof t?.ended == "boolean" ? t.ended : null;
	}
	function C(e, t) {
		if (!p(e)) return null;
		if (e.writableFinished === !0) return !0;
		let n = e._writableState;
		return n != null && n.errored ? !1 : typeof n?.finished == "boolean" ? !!(n.finished || t === !1 && n.ended === !0 && n.length === 0) : null;
	}
	function w(e) {
		if (!f(e)) return null;
		if (e.readableEnded === !0) return !0;
		let t = e._readableState;
		return !t || t.errored ? !1 : typeof t?.ended == "boolean" ? t.ended : null;
	}
	function T(e, t) {
		if (!f(e)) return null;
		let n = e._readableState;
		return n != null && n.errored ? !1 : typeof n?.endEmitted == "boolean" ? !!(n.endEmitted || t === !1 && n.ended === !0 && n.length === 0) : null;
	}
	function E(e) {
		return e && e[s] != null ? e[s] : typeof e?.readable == "boolean" ? x(e) ? !1 : f(e) && e.readable && !T(e) : null;
	}
	function D(e) {
		return e && e[c] != null ? e[c] : typeof e?.writable == "boolean" ? x(e) ? !1 : p(e) && e.writable && !S(e) : null;
	}
	function O(e, t) {
		return h(e) ? x(e) ? !0 : !(t?.readable !== !1 && E(e) || t?.writable !== !1 && D(e)) : null;
	}
	function k(e) {
		return h(e) ? e.writableErrored ? e.writableErrored : e._writableState?.errored ?? null : null;
	}
	function A(e) {
		return h(e) ? e.readableErrored ? e.readableErrored : e._readableState?.errored ?? null : null;
	}
	function j(e) {
		if (!h(e)) return null;
		if (typeof e.closed == "boolean") return e.closed;
		let t = e._writableState, n = e._readableState;
		return typeof t?.closed == "boolean" || typeof n?.closed == "boolean" ? t?.closed || n?.closed : typeof e._closed == "boolean" && M(e) ? e._closed : null;
	}
	function M(e) {
		return typeof e._closed == "boolean" && typeof e._defaultKeepAlive == "boolean" && typeof e._removedConnection == "boolean" && typeof e._removedContLen == "boolean";
	}
	function N(e) {
		return typeof e._sent100 == "boolean" && M(e);
	}
	function P(e) {
		return typeof e._consuming == "boolean" && typeof e._dumped == "boolean" && e.req?.upgradeOrConnect === void 0;
	}
	function F(e) {
		if (!h(e)) return null;
		let t = e._writableState, n = e._readableState, r = t || n;
		return !r && N(e) || !!(r && r.autoDestroy && r.emitClose && r.closed === !1);
	}
	function I(e) {
		return !!(e && (e[l] ?? (e.readableDidRead || e.readableAborted)));
	}
	function L(e) {
		return !!(e && (e[o] ?? e.readableErrored ?? e.writableErrored ?? e._readableState?.errorEmitted ?? e._writableState?.errorEmitted ?? e._readableState?.errored ?? e._writableState?.errored));
	}
	t.exports = {
		isDestroyed: x,
		kIsDestroyed: a,
		isDisturbed: I,
		kIsDisturbed: l,
		isErrored: L,
		kIsErrored: o,
		isReadable: E,
		kIsReadable: s,
		kIsClosedPromise: u,
		kControllerErrorFunction: d,
		kIsWritable: c,
		isClosed: j,
		isDuplexNodeStream: m,
		isFinished: O,
		isIterable: b,
		isReadableNodeStream: f,
		isReadableStream: g,
		isReadableEnded: w,
		isReadableFinished: T,
		isReadableErrored: A,
		isNodeStream: h,
		isWebStream: y,
		isWritable: D,
		isWritableNodeStream: p,
		isWritableStream: _,
		isWritableEnded: S,
		isWritableFinished: C,
		isWritableErrored: k,
		isServerRequest: P,
		isServerResponse: N,
		willEmitClose: F,
		isTransformStream: v
	};
})), ya = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), { AbortError: r, codes: i } = Pi(), { ERR_INVALID_ARG_TYPE: a, ERR_STREAM_PREMATURE_CLOSE: o } = i, { kEmptyObject: s, once: c } = ma(), { validateAbortSignal: l, validateFunction: u, validateObject: d, validateBoolean: f } = ha(), { Promise: p, PromisePrototypeThen: m, SymbolDispose: h } = Mi(), { isClosed: g, isReadable: _, isReadableNodeStream: v, isReadableStream: y, isReadableFinished: b, isReadableErrored: x, isWritable: S, isWritableNodeStream: C, isWritableStream: w, isWritableFinished: T, isWritableErrored: E, isNodeStream: D, willEmitClose: O, kIsClosedPromise: k } = va(), A;
	function j(e) {
		return e.setHeader && typeof e.abort == "function";
	}
	var M = () => {};
	function N(e, t, i) {
		if (arguments.length === 2 ? (i = t, t = s) : t == null ? t = s : d(t, "options"), u(i, "callback"), l(t.signal, "options.signal"), i = c(i), y(e) || w(e)) return P(e, t, i);
		if (!D(e)) throw new a("stream", [
			"ReadableStream",
			"WritableStream",
			"Stream"
		], e);
		let f = t.readable ?? v(e), p = t.writable ?? C(e), m = e._writableState, k = e._readableState, N = () => {
			e.writable || L();
		}, F = O(e) && v(e) === f && C(e) === p, I = T(e, !1), L = () => {
			I = !0, e.destroyed && (F = !1), !(F && (!e.readable || f)) && (!f || R) && i.call(e);
		}, R = b(e, !1), z = () => {
			R = !0, e.destroyed && (F = !1), !(F && (!e.writable || p)) && (!p || I) && i.call(e);
		}, B = (t) => {
			i.call(e, t);
		}, V = g(e), H = () => {
			V = !0;
			let t = E(e) || x(e);
			if (t && typeof t != "boolean") return i.call(e, t);
			if (f && !R && v(e, !0) && !b(e, !1) || p && !I && !T(e, !1)) return i.call(e, new o());
			i.call(e);
		}, U = () => {
			V = !0;
			let t = E(e) || x(e);
			if (t && typeof t != "boolean") return i.call(e, t);
			i.call(e);
		}, W = () => {
			e.req.on("finish", L);
		};
		j(e) ? (e.on("complete", L), F || e.on("abort", H), e.req ? W() : e.on("request", W)) : p && !m && (e.on("end", N), e.on("close", N)), !F && typeof e.aborted == "boolean" && e.on("aborted", H), e.on("end", z), e.on("finish", L), t.error !== !1 && e.on("error", B), e.on("close", H), V ? n.nextTick(H) : m != null && m.errorEmitted || k != null && k.errorEmitted ? F || n.nextTick(U) : (!f && (!F || _(e)) && (I || S(e) === !1) || !p && (!F || S(e)) && (R || _(e) === !1) || k && e.req && e.aborted) && n.nextTick(U);
		let G = () => {
			i = M, e.removeListener("aborted", H), e.removeListener("complete", L), e.removeListener("abort", H), e.removeListener("request", W), e.req && e.req.removeListener("finish", L), e.removeListener("end", N), e.removeListener("close", N), e.removeListener("finish", L), e.removeListener("end", z), e.removeListener("error", B), e.removeListener("close", H);
		};
		if (t.signal && !V) {
			let a = () => {
				let n = i;
				G(), n.call(e, new r(void 0, { cause: t.signal.reason }));
			};
			if (t.signal.aborted) n.nextTick(a);
			else {
				A ||= ma().addAbortListener;
				let n = A(t.signal, a), r = i;
				i = c((...t) => {
					n[h](), r.apply(e, t);
				});
			}
		}
		return G;
	}
	function P(e, t, i) {
		let a = !1, o = M;
		if (t.signal) if (o = () => {
			a = !0, i.call(e, new r(void 0, { cause: t.signal.reason }));
		}, t.signal.aborted) n.nextTick(o);
		else {
			A ||= ma().addAbortListener;
			let n = A(t.signal, o), r = i;
			i = c((...t) => {
				n[h](), r.apply(e, t);
			});
		}
		let s = (...t) => {
			a || n.nextTick(() => i.apply(e, t));
		};
		return m(e[k].promise, s, s), M;
	}
	function F(e, t) {
		var n;
		let r = !1;
		return t === null && (t = s), (n = t) != null && n.cleanup && (f(t.cleanup, "cleanup"), r = t.cleanup), new p((n, i) => {
			let a = N(e, t, (e) => {
				r && a(), e ? i(e) : n();
			});
		});
	}
	t.exports = N, t.exports.finished = F;
})), ba = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i }, AbortError: a } = Pi(), { Symbol: o } = Mi(), { kIsDestroyed: s, isDestroyed: c, isFinished: l, isServerRequest: u } = va(), d = o("kDestroy"), f = o("kConstruct");
	function p(e, t, n) {
		e && (e.stack, t && !t.errored && (t.errored = e), n && !n.errored && (n.errored = e));
	}
	function m(e, t) {
		let n = this._readableState, i = this._writableState, a = i || n;
		return i != null && i.destroyed || n != null && n.destroyed ? (typeof t == "function" && t(), this) : (p(e, i, n), i && (i.destroyed = !0), n && (n.destroyed = !0), a.constructed ? h(this, e, t) : this.once(d, function(n) {
			h(this, r(n, e), t);
		}), this);
	}
	function h(e, t, r) {
		let i = !1;
		function a(t) {
			if (i) return;
			i = !0;
			let a = e._readableState, o = e._writableState;
			p(t, o, a), o && (o.closed = !0), a && (a.closed = !0), typeof r == "function" && r(t), t ? n.nextTick(g, e, t) : n.nextTick(_, e);
		}
		try {
			e._destroy(t || null, a);
		} catch (e) {
			a(e);
		}
	}
	function g(e, t) {
		v(e, t), _(e);
	}
	function _(e) {
		let t = e._readableState, n = e._writableState;
		n && (n.closeEmitted = !0), t && (t.closeEmitted = !0), (n != null && n.emitClose || t != null && t.emitClose) && e.emit("close");
	}
	function v(e, t) {
		let n = e._readableState, r = e._writableState;
		r != null && r.errorEmitted || n != null && n.errorEmitted || (r && (r.errorEmitted = !0), n && (n.errorEmitted = !0), e.emit("error", t));
	}
	function y() {
		let e = this._readableState, t = this._writableState;
		e && (e.constructed = !0, e.closed = !1, e.closeEmitted = !1, e.destroyed = !1, e.errored = null, e.errorEmitted = !1, e.reading = !1, e.ended = e.readable === !1, e.endEmitted = e.readable === !1), t && (t.constructed = !0, t.destroyed = !1, t.closed = !1, t.closeEmitted = !1, t.errored = null, t.errorEmitted = !1, t.finalCalled = !1, t.prefinished = !1, t.ended = t.writable === !1, t.ending = t.writable === !1, t.finished = t.writable === !1);
	}
	function b(e, t, r) {
		let i = e._readableState, a = e._writableState;
		if (a != null && a.destroyed || i != null && i.destroyed) return this;
		i != null && i.autoDestroy || a != null && a.autoDestroy ? e.destroy(t) : t && (t.stack, a && !a.errored && (a.errored = t), i && !i.errored && (i.errored = t), r ? n.nextTick(v, e, t) : v(e, t));
	}
	function x(e, t) {
		if (typeof e._construct != "function") return;
		let r = e._readableState, i = e._writableState;
		r && (r.constructed = !1), i && (i.constructed = !1), e.once(f, t), !(e.listenerCount(f) > 1) && n.nextTick(S, e);
	}
	function S(e) {
		let t = !1;
		function r(r) {
			if (t) {
				b(e, r ?? new i());
				return;
			}
			t = !0;
			let a = e._readableState, o = e._writableState, s = o || a;
			a && (a.constructed = !0), o && (o.constructed = !0), s.destroyed ? e.emit(d, r) : r ? b(e, r, !0) : n.nextTick(C, e);
		}
		try {
			e._construct((e) => {
				n.nextTick(r, e);
			});
		} catch (e) {
			n.nextTick(r, e);
		}
	}
	function C(e) {
		e.emit(f);
	}
	function w(e) {
		return e?.setHeader && typeof e.abort == "function";
	}
	function T(e) {
		e.emit("close");
	}
	function E(e, t) {
		e.emit("error", t), n.nextTick(T, e);
	}
	function D(e, t) {
		!e || c(e) || (!t && !l(e) && (t = new a()), u(e) ? (e.socket = null, e.destroy(t)) : w(e) ? e.abort() : w(e.req) ? e.req.abort() : typeof e.destroy == "function" ? e.destroy(t) : typeof e.close == "function" ? e.close() : t ? n.nextTick(E, e, t) : n.nextTick(T, e), e.destroyed || (e[s] = !0));
	}
	t.exports = {
		construct: x,
		destroyer: D,
		destroy: m,
		undestroy: y,
		errorOrDestroy: b
	};
})), xa = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ObjectSetPrototypeOf: r } = Mi(), { EventEmitter: i } = q("events");
	function a(e) {
		i.call(this, e);
	}
	r(a.prototype, i.prototype), r(a, i), a.prototype.pipe = function(e, t) {
		let n = this;
		function r(t) {
			e.writable && e.write(t) === !1 && n.pause && n.pause();
		}
		n.on("data", r);
		function i() {
			n.readable && n.resume && n.resume();
		}
		e.on("drain", i), !e._isStdio && (!t || t.end !== !1) && (n.on("end", s), n.on("close", c));
		let a = !1;
		function s() {
			a || (a = !0, e.end());
		}
		function c() {
			a || (a = !0, typeof e.destroy == "function" && e.destroy());
		}
		function l(e) {
			u(), this.listenerCount?.call(this, "error") === 0 && this.emit("error", e);
		}
		o(n, "error", l), o(e, "error", l);
		function u() {
			n.removeListener("data", r), e.removeListener("drain", i), n.removeListener("end", s), n.removeListener("close", c), n.removeListener("error", l), e.removeListener("error", l), n.removeListener("end", u), n.removeListener("close", u), e.removeListener("close", u);
		}
		return n.on("end", u), n.on("close", u), e.on("close", u), e.emit("pipe", n), e;
	};
	function o(e, t, r) {
		if (typeof e.prependListener == "function") return e.prependListener(t, r);
		!e._events || !e._events[t] ? e.on(t, r) : n(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]];
	}
	t.exports = {
		Stream: a,
		prependListener: o
	};
})), Sa = /* @__PURE__ */ H(((e, t) => {
	var { SymbolDispose: n } = Mi(), { AbortError: r, codes: i } = Pi(), { isNodeStream: a, isWebStream: o, kControllerErrorFunction: s } = va(), c = ya(), { ERR_INVALID_ARG_TYPE: l } = i, u, d = (e, t) => {
		if (typeof e != "object" || !("aborted" in e)) throw new l(t, "AbortSignal", e);
	};
	t.exports.addAbortSignal = function(e, n) {
		if (d(e, "signal"), !a(n) && !o(n)) throw new l("stream", [
			"ReadableStream",
			"WritableStream",
			"Stream"
		], n);
		return t.exports.addAbortSignalNoValidate(e, n);
	}, t.exports.addAbortSignalNoValidate = function(e, t) {
		if (typeof e != "object" || !("aborted" in e)) return t;
		let i = a(t) ? () => {
			t.destroy(new r(void 0, { cause: e.reason }));
		} : () => {
			t[s](new r(void 0, { cause: e.reason }));
		};
		return e.aborted ? i() : (u ||= ma().addAbortListener, c(t, u(e, i)[n])), t;
	};
})), Ca = /* @__PURE__ */ H(((e, t) => {
	var { StringPrototypeSlice: n, SymbolIterator: r, TypedArrayPrototypeSet: i, Uint8Array: a } = Mi(), { Buffer: o } = q("buffer"), { inspect: s } = ma();
	t.exports = class {
		constructor() {
			this.head = null, this.tail = null, this.length = 0;
		}
		push(e) {
			let t = {
				data: e,
				next: null
			};
			this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
		}
		unshift(e) {
			let t = {
				data: e,
				next: this.head
			};
			this.length === 0 && (this.tail = t), this.head = t, ++this.length;
		}
		shift() {
			if (this.length === 0) return;
			let e = this.head.data;
			return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
		}
		clear() {
			this.head = this.tail = null, this.length = 0;
		}
		join(e) {
			if (this.length === 0) return "";
			let t = this.head, n = "" + t.data;
			for (; (t = t.next) !== null;) n += e + t.data;
			return n;
		}
		concat(e) {
			if (this.length === 0) return o.alloc(0);
			let t = o.allocUnsafe(e >>> 0), n = this.head, r = 0;
			for (; n;) i(t, n.data, r), r += n.data.length, n = n.next;
			return t;
		}
		consume(e, t) {
			let n = this.head.data;
			if (e < n.length) {
				let t = n.slice(0, e);
				return this.head.data = n.slice(e), t;
			}
			return e === n.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e);
		}
		first() {
			return this.head.data;
		}
		*[r]() {
			for (let e = this.head; e; e = e.next) yield e.data;
		}
		_getString(e) {
			let t = "", r = this.head, i = 0;
			do {
				let a = r.data;
				if (e > a.length) t += a, e -= a.length;
				else {
					e === a.length ? (t += a, ++i, r.next ? this.head = r.next : this.head = this.tail = null) : (t += n(a, 0, e), this.head = r, r.data = n(a, e));
					break;
				}
				++i;
			} while ((r = r.next) !== null);
			return this.length -= i, t;
		}
		_getBuffer(e) {
			let t = o.allocUnsafe(e), n = e, r = this.head, s = 0;
			do {
				let o = r.data;
				if (e > o.length) i(t, o, n - e), e -= o.length;
				else {
					e === o.length ? (i(t, o, n - e), ++s, r.next ? this.head = r.next : this.head = this.tail = null) : (i(t, new a(o.buffer, o.byteOffset, e), n - e), this.head = r, r.data = o.slice(e));
					break;
				}
				++s;
			} while ((r = r.next) !== null);
			return this.length -= s, t;
		}
		[Symbol.for("nodejs.util.inspect.custom")](e, t) {
			return s(this, {
				...t,
				depth: 0,
				customInspect: !1
			});
		}
	};
})), wa = /* @__PURE__ */ H(((e, t) => {
	var { MathFloor: n, NumberIsInteger: r } = Mi(), { validateInteger: i } = ha(), { ERR_INVALID_ARG_VALUE: a } = Pi().codes, o = 16 * 1024, s = 16;
	function c(e, t, n) {
		return e.highWaterMark == null ? t ? e[n] : null : e.highWaterMark;
	}
	function l(e) {
		return e ? s : o;
	}
	function u(e, t) {
		i(t, "value", 0), e ? s = t : o = t;
	}
	function d(e, t, i, o) {
		let s = c(t, o, i);
		if (s != null) {
			if (!r(s) || s < 0) throw new a(o ? `options.${i}` : "options.highWaterMark", s);
			return n(s);
		}
		return l(e.objectMode);
	}
	t.exports = {
		getHighWaterMark: d,
		getDefaultHighWaterMark: l,
		setDefaultHighWaterMark: u
	};
})), Ta = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), r = n.Buffer;
	function i(e, t) {
		for (var n in e) t[n] = e[n];
	}
	r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? t.exports = n : (i(n, e), e.Buffer = a);
	function a(e, t, n) {
		return r(e, t, n);
	}
	a.prototype = Object.create(r.prototype), i(r, a), a.from = function(e, t, n) {
		if (typeof e == "number") throw TypeError("Argument must not be a number");
		return r(e, t, n);
	}, a.alloc = function(e, t, n) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		var i = r(e);
		return t === void 0 ? i.fill(0) : typeof n == "string" ? i.fill(t, n) : i.fill(t), i;
	}, a.allocUnsafe = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return r(e);
	}, a.allocUnsafeSlow = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return n.SlowBuffer(e);
	};
})), Ea = /* @__PURE__ */ H(((e) => {
	var t = Ta().Buffer, n = t.isEncoding || function(e) {
		switch (e = "" + e, e && e.toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
			case "raw": return !0;
			default: return !1;
		}
	};
	function r(e) {
		if (!e) return "utf8";
		for (var t;;) switch (e) {
			case "utf8":
			case "utf-8": return "utf8";
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return "utf16le";
			case "latin1":
			case "binary": return "latin1";
			case "base64":
			case "ascii":
			case "hex": return e;
			default:
				if (t) return;
				e = ("" + e).toLowerCase(), t = !0;
		}
	}
	function i(e) {
		var i = r(e);
		if (typeof i != "string" && (t.isEncoding === n || !n(e))) throw Error("Unknown encoding: " + e);
		return i || e;
	}
	e.StringDecoder = a;
	function a(e) {
		this.encoding = i(e);
		var n;
		switch (this.encoding) {
			case "utf16le":
				this.text = f, this.end = p, n = 4;
				break;
			case "utf8":
				this.fillLast = l, n = 4;
				break;
			case "base64":
				this.text = m, this.end = h, n = 3;
				break;
			default:
				this.write = g, this.end = _;
				return;
		}
		this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(n);
	}
	a.prototype.write = function(e) {
		if (e.length === 0) return "";
		var t, n;
		if (this.lastNeed) {
			if (t = this.fillLast(e), t === void 0) return "";
			n = this.lastNeed, this.lastNeed = 0;
		} else n = 0;
		return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || "";
	}, a.prototype.end = d, a.prototype.text = u, a.prototype.fillLast = function(e) {
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
	};
	function o(e) {
		return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
	}
	function s(e, t, n) {
		var r = t.length - 1;
		if (r < n) return 0;
		var i = o(t[r]);
		return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (i === 2 ? i = 0 : e.lastNeed = i - 3), i) : 0));
	}
	function c(e, t, n) {
		if ((t[0] & 192) != 128) return e.lastNeed = 0, "�";
		if (e.lastNeed > 1 && t.length > 1) {
			if ((t[1] & 192) != 128) return e.lastNeed = 1, "�";
			if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) != 128) return e.lastNeed = 2, "�";
		}
	}
	function l(e) {
		var t = this.lastTotal - this.lastNeed, n = c(this, e, t);
		if (n !== void 0) return n;
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length;
	}
	function u(e, t) {
		var n = s(this, e, t);
		if (!this.lastNeed) return e.toString("utf8", t);
		this.lastTotal = n;
		var r = e.length - (n - this.lastNeed);
		return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r);
	}
	function d(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + "�" : t;
	}
	function f(e, t) {
		if ((e.length - t) % 2 == 0) {
			var n = e.toString("utf16le", t);
			if (n) {
				var r = n.charCodeAt(n.length - 1);
				if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1);
			}
			return n;
		}
		return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
	}
	function p(e) {
		var t = e && e.length ? this.write(e) : "";
		if (this.lastNeed) {
			var n = this.lastTotal - this.lastNeed;
			return t + this.lastChar.toString("utf16le", 0, n);
		}
		return t;
	}
	function m(e, t) {
		var n = (e.length - t) % 3;
		return n === 0 ? e.toString("base64", t) : (this.lastNeed = 3 - n, this.lastTotal = 3, n === 1 ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - n));
	}
	function h(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
	}
	function g(e) {
		return e.toString(this.encoding);
	}
	function _(e) {
		return e && e.length ? this.write(e) : "";
	}
})), Da = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), { PromisePrototypeThen: r, SymbolAsyncIterator: i, SymbolIterator: a } = Mi(), { Buffer: o } = q("buffer"), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: c } = Pi().codes;
	function l(e, t, l) {
		let u;
		if (typeof t == "string" || t instanceof o) return new e({
			objectMode: !0,
			...l,
			read() {
				this.push(t), this.push(null);
			}
		});
		let d;
		if (t && t[i]) d = !0, u = t[i]();
		else if (t && t[a]) d = !1, u = t[a]();
		else throw new s("iterable", ["Iterable"], t);
		let f = new e({
			objectMode: !0,
			highWaterMark: 1,
			...l
		}), p = !1;
		f._read = function() {
			p || (p = !0, h());
		}, f._destroy = function(e, t) {
			r(m(e), () => n.nextTick(t, e), (r) => n.nextTick(t, r || e));
		};
		async function m(e) {
			let t = e != null, n = typeof u.throw == "function";
			if (t && n) {
				let { value: t, done: n } = await u.throw(e);
				if (await t, n) return;
			}
			if (typeof u.return == "function") {
				let { value: e } = await u.return();
				await e;
			}
		}
		async function h() {
			for (;;) {
				try {
					let { value: e, done: t } = d ? await u.next() : u.next();
					if (t) f.push(null);
					else {
						let t = e && typeof e.then == "function" ? await e : e;
						if (t === null) throw p = !1, new c();
						if (f.push(t)) continue;
						p = !1;
					}
				} catch (e) {
					f.destroy(e);
				}
				break;
			}
		}
		return f;
	}
	t.exports = l;
})), Oa = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), { ArrayPrototypeIndexOf: r, NumberIsInteger: i, NumberIsNaN: a, NumberParseInt: o, ObjectDefineProperties: s, ObjectKeys: c, ObjectSetPrototypeOf: l, Promise: u, SafeSet: d, SymbolAsyncDispose: f, SymbolAsyncIterator: p, Symbol: m } = Mi();
	t.exports = X, X.ReadableState = ue;
	var { EventEmitter: h } = q("events"), { Stream: g, prependListener: _ } = xa(), { Buffer: v } = q("buffer"), { addAbortSignal: y } = Sa(), b = ya(), x = ma().debuglog("stream", (e) => {
		x = e;
	}), S = Ca(), C = ba(), { getHighWaterMark: w, getDefaultHighWaterMark: T } = wa(), { aggregateTwoErrors: E, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: O, ERR_OUT_OF_RANGE: k, ERR_STREAM_PUSH_AFTER_EOF: A, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: j }, AbortError: M } = Pi(), { validateObject: N } = ha(), P = m("kPaused"), { StringDecoder: F } = Ea(), I = Da();
	l(X.prototype, g.prototype), l(X, g);
	var L = () => {}, { errorOrDestroy: R } = C, z = 1, B = 2, V = 4, H = 8, U = 16, W = 32, G = 64, K = 128, J = 256, ee = 512, te = 1024, ne = 2048, re = 4096, ie = 8192, ae = 16384, oe = 32768, se = 65536, ce = 1 << 17, le = 1 << 18;
	function Y(e) {
		return {
			enumerable: !1,
			get() {
				return (this.state & e) !== 0;
			},
			set(t) {
				t ? this.state |= e : this.state &= ~e;
			}
		};
	}
	s(ue.prototype, {
		objectMode: Y(z),
		ended: Y(B),
		endEmitted: Y(V),
		reading: Y(H),
		constructed: Y(U),
		sync: Y(W),
		needReadable: Y(G),
		emittedReadable: Y(K),
		readableListening: Y(J),
		resumeScheduled: Y(ee),
		errorEmitted: Y(te),
		emitClose: Y(ne),
		autoDestroy: Y(re),
		destroyed: Y(ie),
		closed: Y(ae),
		closeEmitted: Y(oe),
		multiAwaitDrain: Y(se),
		readingMore: Y(ce),
		dataEmitted: Y(le)
	});
	function ue(e, t, n) {
		typeof n != "boolean" && (n = t instanceof ja()), this.state = 6192, e && e.objectMode && (this.state |= z), n && e && e.readableObjectMode && (this.state |= z), this.highWaterMark = e ? w(this, e, "readableHighWaterMark", n) : T(!1), this.buffer = new S(), this.length = 0, this.pipes = [], this.flowing = null, this[P] = null, e && e.emitClose === !1 && (this.state &= -2049), e && e.autoDestroy === !1 && (this.state &= -4097), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new F(e.encoding), this.encoding = e.encoding);
	}
	function X(e) {
		if (!(this instanceof X)) return new X(e);
		let t = this instanceof ja();
		this._readableState = new ue(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && y(e.signal, this)), g.call(this, e), C.construct(this, () => {
			this._readableState.needReadable && ye(this, this._readableState);
		});
	}
	X.prototype.destroy = C.destroy, X.prototype._undestroy = C.undestroy, X.prototype._destroy = function(e, t) {
		t(e);
	}, X.prototype[h.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	}, X.prototype[f] = function() {
		let e;
		return this.destroyed || (e = this.readableEnded ? null : new M(), this.destroy(e)), new u((t, n) => b(this, (r) => r && r !== e ? n(r) : t(null)));
	}, X.prototype.push = function(e, t) {
		return de(this, e, t, !1);
	}, X.prototype.unshift = function(e, t) {
		return de(this, e, t, !0);
	};
	function de(e, t, n, r) {
		x("readableAddChunk", t);
		let i = e._readableState, a;
		if ((i.state & z) === 0 && (typeof t == "string" ? (n ||= i.defaultEncoding, i.encoding !== n && (r && i.encoding ? t = v.from(t, n).toString(i.encoding) : (t = v.from(t, n), n = ""))) : t instanceof v ? n = "" : g._isUint8Array(t) ? (t = g._uint8ArrayToBuffer(t), n = "") : t != null && (a = new D("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], t))), a) R(e, a);
		else if (t === null) i.state &= -9, ge(e, i);
		else if ((i.state & z) !== 0 || t && t.length > 0) if (r) if ((i.state & V) !== 0) R(e, new j());
		else if (i.destroyed || i.errored) return !1;
		else fe(e, i, t, !0);
		else if (i.ended) R(e, new A());
		else if (i.destroyed || i.errored) return !1;
		else i.state &= -9, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? fe(e, i, t, !1) : ye(e, i)) : fe(e, i, t, !1);
		else r || (i.state &= -9, ye(e, i));
		return !i.ended && (i.length < i.highWaterMark || i.length === 0);
	}
	function fe(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & se) === 0 ? t.awaitDrainWriters = null : t.awaitDrainWriters.clear(), t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), (t.state & G) !== 0 && _e(e)), ye(e, t);
	}
	X.prototype.isPaused = function() {
		let e = this._readableState;
		return e[P] === !0 || e.flowing === !1;
	}, X.prototype.setEncoding = function(e) {
		let t = new F(e);
		this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
		let n = this._readableState.buffer, r = "";
		for (let e of n) r += t.write(e);
		return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
	};
	var pe = 1073741824;
	function me(e) {
		if (e > pe) throw new k("size", "<= 1GiB", e);
		return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
	}
	function he(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & z) === 0 ? a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0 : 1;
	}
	X.prototype.read = function(e) {
		x("read", e), e === void 0 ? e = NaN : i(e) || (e = o(e, 10));
		let t = this._readableState, n = e;
		if (e > t.highWaterMark && (t.highWaterMark = me(e)), e !== 0 && (t.state &= -129), e === 0 && t.needReadable && ((t.highWaterMark === 0 ? t.length > 0 : t.length >= t.highWaterMark) || t.ended)) return x("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? Ae(this) : _e(this), null;
		if (e = he(e, t), e === 0 && t.ended) return t.length === 0 && Ae(this), null;
		let r = (t.state & G) !== 0;
		if (x("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, x("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, x("reading, ended or constructing", r);
		else if (r) {
			x("do read"), t.state |= 40, t.length === 0 && (t.state |= G);
			try {
				this._read(t.highWaterMark);
			} catch (e) {
				R(this, e);
			}
			t.state &= -33, t.reading || (e = he(n, t));
		}
		let a;
		return a = e > 0 ? ke(e, t) : null, a === null ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), t.length === 0 && (t.ended || (t.needReadable = !0), n !== e && t.ended && Ae(this)), a !== null && !t.errorEmitted && !t.closeEmitted && (t.dataEmitted = !0, this.emit("data", a)), a;
	};
	function ge(e, t) {
		if (x("onEofChunk"), !t.ended) {
			if (t.decoder) {
				let e = t.decoder.end();
				e && e.length && (t.buffer.push(e), t.length += t.objectMode ? 1 : e.length);
			}
			t.ended = !0, t.sync ? _e(e) : (t.needReadable = !1, t.emittedReadable = !0, ve(e));
		}
	}
	function _e(e) {
		let t = e._readableState;
		x("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (x("emitReadable", t.flowing), t.emittedReadable = !0, n.nextTick(ve, e));
	}
	function ve(e) {
		let t = e._readableState;
		x("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && !t.errored && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, Ee(e);
	}
	function ye(e, t) {
		!t.readingMore && t.constructed && (t.readingMore = !0, n.nextTick(be, e, t));
	}
	function be(e, t) {
		for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && t.length === 0);) {
			let n = t.length;
			if (x("maybeReadMore read 0"), e.read(0), n === t.length) break;
		}
		t.readingMore = !1;
	}
	X.prototype._read = function(e) {
		throw new O("_read()");
	}, X.prototype.pipe = function(e, t) {
		let r = this, i = this._readableState;
		i.pipes.length === 1 && (i.multiAwaitDrain || (i.multiAwaitDrain = !0, i.awaitDrainWriters = new d(i.awaitDrainWriters ? [i.awaitDrainWriters] : []))), i.pipes.push(e), x("pipe count=%d opts=%j", i.pipes.length, t);
		let a = (!t || t.end !== !1) && e !== n.stdout && e !== n.stderr ? s : v;
		i.endEmitted ? n.nextTick(a) : r.once("end", a), e.on("unpipe", o);
		function o(e, t) {
			x("onunpipe"), e === r && t && t.hasUnpiped === !1 && (t.hasUnpiped = !0, u());
		}
		function s() {
			x("onend"), e.end();
		}
		let c, l = !1;
		function u() {
			x("cleanup"), e.removeListener("close", h), e.removeListener("finish", g), c && e.removeListener("drain", c), e.removeListener("error", m), e.removeListener("unpipe", o), r.removeListener("end", s), r.removeListener("end", v), r.removeListener("data", p), l = !0, c && i.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && c();
		}
		function f() {
			l || (i.pipes.length === 1 && i.pipes[0] === e ? (x("false write response, pause", 0), i.awaitDrainWriters = e, i.multiAwaitDrain = !1) : i.pipes.length > 1 && i.pipes.includes(e) && (x("false write response, pause", i.awaitDrainWriters.size), i.awaitDrainWriters.add(e)), r.pause()), c || (c = xe(r, e), e.on("drain", c));
		}
		r.on("data", p);
		function p(t) {
			x("ondata");
			let n = e.write(t);
			x("dest.write", n), n === !1 && f();
		}
		function m(t) {
			if (x("onerror", t), v(), e.removeListener("error", m), e.listenerCount("error") === 0) {
				let n = e._writableState || e._readableState;
				n && !n.errorEmitted ? R(e, t) : e.emit("error", t);
			}
		}
		_(e, "error", m);
		function h() {
			e.removeListener("finish", g), v();
		}
		e.once("close", h);
		function g() {
			x("onfinish"), e.removeListener("close", h), v();
		}
		e.once("finish", g);
		function v() {
			x("unpipe"), r.unpipe(e);
		}
		return e.emit("pipe", r), e.writableNeedDrain === !0 ? f() : i.flowing || (x("pipe resume"), r.resume()), e;
	};
	function xe(e, t) {
		return function() {
			let n = e._readableState;
			n.awaitDrainWriters === t ? (x("pipeOnDrain", 1), n.awaitDrainWriters = null) : n.multiAwaitDrain && (x("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(t)), (!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) && e.listenerCount("data") && e.resume();
		};
	}
	X.prototype.unpipe = function(e) {
		let t = this._readableState, n = { hasUnpiped: !1 };
		if (t.pipes.length === 0) return this;
		if (!e) {
			let e = t.pipes;
			t.pipes = [], this.pause();
			for (let t = 0; t < e.length; t++) e[t].emit("unpipe", this, { hasUnpiped: !1 });
			return this;
		}
		let i = r(t.pipes, e);
		return i === -1 ? this : (t.pipes.splice(i, 1), t.pipes.length === 0 && this.pause(), e.emit("unpipe", this, n), this);
	}, X.prototype.on = function(e, t) {
		let r = g.prototype.on.call(this, e, t), i = this._readableState;
		return e === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== !1 && this.resume()) : e === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, x("on readable", i.length, i.reading), i.length ? _e(this) : i.reading || n.nextTick(Ce, this)), r;
	}, X.prototype.addListener = X.prototype.on, X.prototype.removeListener = function(e, t) {
		let r = g.prototype.removeListener.call(this, e, t);
		return e === "readable" && n.nextTick(Se, this), r;
	}, X.prototype.off = X.prototype.removeListener, X.prototype.removeAllListeners = function(e) {
		let t = g.prototype.removeAllListeners.apply(this, arguments);
		return (e === "readable" || e === void 0) && n.nextTick(Se, this), t;
	};
	function Se(e) {
		let t = e._readableState;
		t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && t[P] === !1 ? t.flowing = !0 : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null);
	}
	function Ce(e) {
		x("readable nexttick read 0"), e.read(0);
	}
	X.prototype.resume = function() {
		let e = this._readableState;
		return e.flowing || (x("resume"), e.flowing = !e.readableListening, we(this, e)), e[P] = !1, this;
	};
	function we(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(Te, e, t));
	}
	function Te(e, t) {
		x("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), Ee(e), t.flowing && !t.reading && e.read(0);
	}
	X.prototype.pause = function() {
		return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[P] = !0, this;
	};
	function Ee(e) {
		let t = e._readableState;
		for (x("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	X.prototype.wrap = function(e) {
		let t = !1;
		e.on("data", (n) => {
			!this.push(n) && e.pause && (t = !0, e.pause());
		}), e.on("end", () => {
			this.push(null);
		}), e.on("error", (e) => {
			R(this, e);
		}), e.on("close", () => {
			this.destroy();
		}), e.on("destroy", () => {
			this.destroy();
		}), this._read = () => {
			t && e.resume && (t = !1, e.resume());
		};
		let n = c(e);
		for (let t = 1; t < n.length; t++) {
			let r = n[t];
			this[r] === void 0 && typeof e[r] == "function" && (this[r] = e[r].bind(e));
		}
		return this;
	}, X.prototype[p] = function() {
		return De(this);
	}, X.prototype.iterator = function(e) {
		return e !== void 0 && N(e, "options"), De(this, e);
	};
	function De(e, t) {
		typeof e.read != "function" && (e = X.wrap(e, { objectMode: !0 }));
		let n = Oe(e, t);
		return n.stream = e, n;
	}
	async function* Oe(e, t) {
		let n = L;
		function r(t) {
			this === e ? (n(), n = L) : n = t;
		}
		e.on("readable", r);
		let i, a = b(e, { writable: !1 }, (e) => {
			i = e ? E(i, e) : null, n(), n = L;
		});
		try {
			for (;;) {
				let t = e.destroyed ? null : e.read();
				if (t !== null) yield t;
				else if (i) throw i;
				else if (i === null) return;
				else await new u(r);
			}
		} catch (e) {
			throw i = E(i, e), i;
		} finally {
			(i || t?.destroyOnReturn !== !1) && (i === void 0 || e._readableState.autoDestroy) ? C.destroyer(e, null) : (e.off("readable", r), a());
		}
	}
	s(X.prototype, {
		readable: {
			__proto__: null,
			get() {
				let e = this._readableState;
				return !!e && e.readable !== !1 && !e.destroyed && !e.errorEmitted && !e.endEmitted;
			},
			set(e) {
				this._readableState && (this._readableState.readable = !!e);
			}
		},
		readableDidRead: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.dataEmitted;
			}
		},
		readableAborted: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return !!(this._readableState.readable !== !1 && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
			}
		},
		readableHighWaterMark: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.highWaterMark;
			}
		},
		readableBuffer: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState && this._readableState.buffer;
			}
		},
		readableFlowing: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.flowing;
			},
			set: function(e) {
				this._readableState && (this._readableState.flowing = e);
			}
		},
		readableLength: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState.length;
			}
		},
		readableObjectMode: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.objectMode : !1;
			}
		},
		readableEncoding: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.encoding : null;
			}
		},
		errored: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.errored : null;
			}
		},
		closed: {
			__proto__: null,
			get() {
				return this._readableState ? this._readableState.closed : !1;
			}
		},
		destroyed: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.destroyed : !1;
			},
			set(e) {
				this._readableState && (this._readableState.destroyed = e);
			}
		},
		readableEnded: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.endEmitted : !1;
			}
		}
	}), s(ue.prototype, {
		pipesCount: {
			__proto__: null,
			get() {
				return this.pipes.length;
			}
		},
		paused: {
			__proto__: null,
			get() {
				return this[P] !== !1;
			},
			set(e) {
				this[P] = !!e;
			}
		}
	}), X._fromList = ke;
	function ke(e, t) {
		if (t.length === 0) return null;
		let n;
		return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : t.buffer.length === 1 ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n;
	}
	function Ae(e) {
		let t = e._readableState;
		x("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, n.nextTick(je, t, e));
	}
	function je(e, t) {
		if (x("endReadableNT", e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
			if (e.endEmitted = !0, t.emit("end"), t.writable && t.allowHalfOpen === !1) n.nextTick(Me, t);
			else if (e.autoDestroy) {
				let e = t._writableState;
				(!e || e.autoDestroy && (e.finished || e.writable === !1)) && t.destroy();
			}
		}
	}
	function Me(e) {
		e.writable && !e.writableEnded && !e.destroyed && e.end();
	}
	X.from = function(e, t) {
		return I(X, e, t);
	};
	var Ne;
	function Pe() {
		return Ne === void 0 && (Ne = {}), Ne;
	}
	X.fromWeb = function(e, t) {
		return Pe().newStreamReadableFromReadableStream(e, t);
	}, X.toWeb = function(e, t) {
		return Pe().newReadableStreamFromStreamReadable(e, t);
	}, X.wrap = function(e, t) {
		return new X({
			objectMode: e.readableObjectMode ?? e.objectMode ?? !0,
			...t,
			destroy(t, n) {
				C.destroyer(e, t), n(t);
			}
		}).wrap(e);
	};
})), ka = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), { ArrayPrototypeSlice: r, Error: i, FunctionPrototypeSymbolHasInstance: a, ObjectDefineProperty: o, ObjectDefineProperties: s, ObjectSetPrototypeOf: c, StringPrototypeToLowerCase: l, Symbol: u, SymbolHasInstance: d } = Mi();
	t.exports = N, N.WritableState = j;
	var { EventEmitter: f } = q("events"), p = xa().Stream, { Buffer: m } = q("buffer"), h = ba(), { addAbortSignal: g } = Sa(), { getHighWaterMark: _, getDefaultHighWaterMark: v } = wa(), { ERR_INVALID_ARG_TYPE: y, ERR_METHOD_NOT_IMPLEMENTED: b, ERR_MULTIPLE_CALLBACK: x, ERR_STREAM_CANNOT_PIPE: S, ERR_STREAM_DESTROYED: C, ERR_STREAM_ALREADY_FINISHED: w, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: E, ERR_UNKNOWN_ENCODING: D } = Pi().codes, { errorOrDestroy: O } = h;
	c(N.prototype, p.prototype), c(N, p);
	function k() {}
	var A = u("kOnFinished");
	function j(e, t, n) {
		typeof n != "boolean" && (n = t instanceof ja()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", n) : v(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
		let r = !!(e && e.decodeStrings === !1);
		this.decodeStrings = !r, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = R.bind(void 0, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, M(this), this.pendingcb = 0, this.constructed = !0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !e || e.emitClose !== !1, this.autoDestroy = !e || e.autoDestroy !== !1, this.errored = null, this.closed = !1, this.closeEmitted = !1, this[A] = [];
	}
	function M(e) {
		e.buffered = [], e.bufferedIndex = 0, e.allBuffers = !0, e.allNoop = !0;
	}
	j.prototype.getBuffer = function() {
		return r(this.buffered, this.bufferedIndex);
	}, o(j.prototype, "bufferedRequestCount", {
		__proto__: null,
		get() {
			return this.buffered.length - this.bufferedIndex;
		}
	});
	function N(e) {
		let t = this instanceof ja();
		if (!t && !a(N, this)) return new N(e);
		this._writableState = new j(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && g(e.signal, this)), p.call(this, e), h.construct(this, () => {
			let e = this._writableState;
			e.writing || H(this, e), K(this, e);
		});
	}
	o(N, d, {
		__proto__: null,
		value: function(e) {
			return a(this, e) ? !0 : this === N ? e && e._writableState instanceof j : !1;
		}
	}), N.prototype.pipe = function() {
		O(this, new S());
	};
	function P(e, t, r, i) {
		let a = e._writableState;
		if (typeof r == "function") i = r, r = a.defaultEncoding;
		else {
			if (!r) r = a.defaultEncoding;
			else if (r !== "buffer" && !m.isEncoding(r)) throw new D(r);
			typeof i != "function" && (i = k);
		}
		if (t === null) throw new T();
		if (!a.objectMode) if (typeof t == "string") a.decodeStrings !== !1 && (t = m.from(t, r), r = "buffer");
		else if (t instanceof m) r = "buffer";
		else if (p._isUint8Array(t)) t = p._uint8ArrayToBuffer(t), r = "buffer";
		else throw new y("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], t);
		let o;
		return a.ending ? o = new E() : a.destroyed && (o = new C("write")), o ? (n.nextTick(i, o), O(e, o, !0), o) : (a.pendingcb++, F(e, a, t, r, i));
	}
	N.prototype.write = function(e, t, n) {
		return P(this, e, t, n) === !0;
	}, N.prototype.cork = function() {
		this._writableState.corked++;
	}, N.prototype.uncork = function() {
		let e = this._writableState;
		e.corked && (e.corked--, e.writing || H(this, e));
	}, N.prototype.setDefaultEncoding = function(e) {
		if (typeof e == "string" && (e = l(e)), !m.isEncoding(e)) throw new D(e);
		return this._writableState.defaultEncoding = e, this;
	};
	function F(e, t, n, r, i) {
		let a = t.objectMode ? 1 : n.length;
		t.length += a;
		let o = t.length < t.highWaterMark;
		return o || (t.needDrain = !0), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({
			chunk: n,
			encoding: r,
			callback: i
		}), t.allBuffers && r !== "buffer" && (t.allBuffers = !1), t.allNoop && i !== k && (t.allNoop = !1)) : (t.writelen = a, t.writecb = i, t.writing = !0, t.sync = !0, e._write(n, r, t.onwrite), t.sync = !1), o && !t.errored && !t.destroyed;
	}
	function I(e, t, n, r, i, a, o) {
		t.writelen = r, t.writecb = o, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new C("write")) : n ? e._writev(i, t.onwrite) : e._write(i, a, t.onwrite), t.sync = !1;
	}
	function L(e, t, n, r) {
		--t.pendingcb, r(n), V(t), O(e, n);
	}
	function R(e, t) {
		let r = e._writableState, i = r.sync, a = r.writecb;
		if (typeof a != "function") {
			O(e, new x());
			return;
		}
		r.writing = !1, r.writecb = null, r.length -= r.writelen, r.writelen = 0, t ? (t.stack, r.errored ||= t, e._readableState && !e._readableState.errored && (e._readableState.errored = t), i ? n.nextTick(L, e, r, t, a) : L(e, r, t, a)) : (r.buffered.length > r.bufferedIndex && H(e, r), i ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === a ? r.afterWriteTickInfo.count++ : (r.afterWriteTickInfo = {
			count: 1,
			cb: a,
			stream: e,
			state: r
		}, n.nextTick(z, r.afterWriteTickInfo)) : B(e, r, 1, a));
	}
	function z({ stream: e, state: t, count: n, cb: r }) {
		return t.afterWriteTickInfo = null, B(e, t, n, r);
	}
	function B(e, t, n, r) {
		for (!t.ending && !e.destroyed && t.length === 0 && t.needDrain && (t.needDrain = !1, e.emit("drain")); n-- > 0;) t.pendingcb--, r();
		t.destroyed && V(t), K(e, t);
	}
	function V(e) {
		if (e.writing) return;
		for (let t = e.bufferedIndex; t < e.buffered.length; ++t) {
			let { chunk: n, callback: r } = e.buffered[t], i = e.objectMode ? 1 : n.length;
			e.length -= i, r(e.errored ?? new C("write"));
		}
		let t = e[A].splice(0);
		for (let n = 0; n < t.length; n++) t[n](e.errored ?? new C("end"));
		M(e);
	}
	function H(e, t) {
		if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
		let { buffered: n, bufferedIndex: i, objectMode: a } = t, o = n.length - i;
		if (!o) return;
		let s = i;
		if (t.bufferProcessing = !0, o > 1 && e._writev) {
			t.pendingcb -= o - 1;
			let i = t.allNoop ? k : (e) => {
				for (let t = s; t < n.length; ++t) n[t].callback(e);
			}, a = t.allNoop && s === 0 ? n : r(n, s);
			a.allBuffers = t.allBuffers, I(e, t, !0, t.length, a, "", i), M(t);
		} else {
			do {
				let { chunk: r, encoding: i, callback: o } = n[s];
				n[s++] = null, I(e, t, !1, a ? 1 : r.length, r, i, o);
			} while (s < n.length && !t.writing);
			s === n.length ? M(t) : s > 256 ? (n.splice(0, s), t.bufferedIndex = 0) : t.bufferedIndex = s;
		}
		t.bufferProcessing = !1;
	}
	N.prototype._write = function(e, t, n) {
		if (this._writev) this._writev([{
			chunk: e,
			encoding: t
		}], n);
		else throw new b("_write()");
	}, N.prototype._writev = null, N.prototype.end = function(e, t, r) {
		let a = this._writableState;
		typeof e == "function" ? (r = e, e = null, t = null) : typeof t == "function" && (r = t, t = null);
		let o;
		if (e != null) {
			let n = P(this, e, t);
			n instanceof i && (o = n);
		}
		return a.corked && (a.corked = 1, this.uncork()), o || (!a.errored && !a.ending ? (a.ending = !0, K(this, a, !0), a.ended = !0) : a.finished ? o = new w("end") : a.destroyed && (o = new C("end"))), typeof r == "function" && (o || a.finished ? n.nextTick(r, o) : a[A].push(r)), this;
	};
	function U(e) {
		return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
	}
	function W(e, t) {
		let r = !1;
		function i(i) {
			if (r) {
				O(e, i ?? x());
				return;
			}
			if (r = !0, t.pendingcb--, i) {
				let n = t[A].splice(0);
				for (let e = 0; e < n.length; e++) n[e](i);
				O(e, i, t.sync);
			} else U(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, n.nextTick(J, e, t));
		}
		t.sync = !0, t.pendingcb++;
		try {
			e._final(i);
		} catch (e) {
			i(e);
		}
		t.sync = !1;
	}
	function G(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, W(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function K(e, t, r) {
		U(t) && (G(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, n.nextTick((e, t) => {
			U(t) ? J(e, t) : t.pendingcb--;
		}, e, t)) : U(t) && (t.pendingcb++, J(e, t))));
	}
	function J(e, t) {
		t.pendingcb--, t.finished = !0;
		let n = t[A].splice(0);
		for (let e = 0; e < n.length; e++) n[e]();
		if (e.emit("finish"), t.autoDestroy) {
			let t = e._readableState;
			(!t || t.autoDestroy && (t.endEmitted || t.readable === !1)) && e.destroy();
		}
	}
	s(N.prototype, {
		closed: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.closed : !1;
			}
		},
		destroyed: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.destroyed : !1;
			},
			set(e) {
				this._writableState && (this._writableState.destroyed = e);
			}
		},
		writable: {
			__proto__: null,
			get() {
				let e = this._writableState;
				return !!e && e.writable !== !1 && !e.destroyed && !e.errored && !e.ending && !e.ended;
			},
			set(e) {
				this._writableState && (this._writableState.writable = !!e);
			}
		},
		writableFinished: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.finished : !1;
			}
		},
		writableObjectMode: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.objectMode : !1;
			}
		},
		writableBuffer: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.getBuffer();
			}
		},
		writableEnded: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.ending : !1;
			}
		},
		writableNeedDrain: {
			__proto__: null,
			get() {
				let e = this._writableState;
				return e ? !e.destroyed && !e.ending && e.needDrain : !1;
			}
		},
		writableHighWaterMark: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.highWaterMark;
			}
		},
		writableCorked: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.corked : 0;
			}
		},
		writableLength: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.length;
			}
		},
		errored: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._writableState ? this._writableState.errored : null;
			}
		},
		writableAborted: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return !!(this._writableState.writable !== !1 && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
			}
		}
	});
	var ee = h.destroy;
	N.prototype.destroy = function(e, t) {
		let r = this._writableState;
		return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[A].length) && n.nextTick(V, r), ee.call(this, e, t), this;
	}, N.prototype._undestroy = h.undestroy, N.prototype._destroy = function(e, t) {
		t(e);
	}, N.prototype[f.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	};
	var te;
	function ne() {
		return te === void 0 && (te = {}), te;
	}
	N.fromWeb = function(e, t) {
		return ne().newStreamWritableFromWritableStream(e, t);
	}, N.toWeb = function(e) {
		return ne().newWritableStreamFromStreamWritable(e);
	};
})), Aa = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), r = q("buffer"), { isReadable: i, isWritable: a, isIterable: o, isNodeStream: s, isReadableNodeStream: c, isWritableNodeStream: l, isDuplexNodeStream: u, isReadableStream: d, isWritableStream: f } = va(), p = ya(), { AbortError: m, codes: { ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: g } } = Pi(), { destroyer: _ } = ba(), v = ja(), y = Oa(), b = ka(), { createDeferredPromise: x } = ma(), S = Da(), C = globalThis.Blob || r.Blob, w = C === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof C;
	}, T = globalThis.AbortController || (pa(), K(aa)).AbortController, { FunctionPrototypeCall: E } = Mi(), D = class extends v {
		constructor(e) {
			super(e), e?.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e?.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0);
		}
	};
	t.exports = function e(t, r) {
		if (u(t)) return t;
		if (c(t)) return k({ readable: t });
		if (l(t)) return k({ writable: t });
		if (s(t)) return k({
			writable: !1,
			readable: !1
		});
		if (d(t)) return k({ readable: y.fromWeb(t) });
		if (f(t)) return k({ writable: b.fromWeb(t) });
		if (typeof t == "function") {
			let { value: e, write: i, final: a, destroy: s } = O(t);
			if (o(e)) return S(D, e, {
				objectMode: !0,
				write: i,
				final: a,
				destroy: s
			});
			let c = e?.then;
			if (typeof c == "function") {
				let t, r = E(c, e, (e) => {
					if (e != null) throw new g("nully", "body", e);
				}, (e) => {
					_(t, e);
				});
				return t = new D({
					objectMode: !0,
					readable: !1,
					write: i,
					final(e) {
						a(async () => {
							try {
								await r, n.nextTick(e, null);
							} catch (t) {
								n.nextTick(e, t);
							}
						});
					},
					destroy: s
				});
			}
			throw new g("Iterable, AsyncIterable or AsyncFunction", r, e);
		}
		if (w(t)) return e(t.arrayBuffer());
		if (o(t)) return S(D, t, {
			objectMode: !0,
			writable: !1
		});
		if (d(t?.readable) && f(t?.writable)) return D.fromWeb(t);
		if (typeof t?.writable == "object" || typeof t?.readable == "object") return k({
			readable: t != null && t.readable ? c(t?.readable) ? t?.readable : e(t.readable) : void 0,
			writable: t != null && t.writable ? l(t?.writable) ? t?.writable : e(t.writable) : void 0
		});
		let i = t?.then;
		if (typeof i == "function") {
			let e;
			return E(i, t, (t) => {
				t != null && e.push(t), e.push(null);
			}, (t) => {
				_(e, t);
			}), e = new D({
				objectMode: !0,
				writable: !1,
				read() {}
			});
		}
		throw new h(r, [
			"Blob",
			"ReadableStream",
			"WritableStream",
			"Stream",
			"Iterable",
			"AsyncIterable",
			"Function",
			"{ readable, writable } pair",
			"Promise"
		], t);
	};
	function O(e) {
		let { promise: t, resolve: r } = x(), i = new T(), a = i.signal;
		return {
			value: e((async function* () {
				for (;;) {
					let e = t;
					t = null;
					let { chunk: i, done: o, cb: s } = await e;
					if (n.nextTick(s), o) return;
					if (a.aborted) throw new m(void 0, { cause: a.reason });
					({promise: t, resolve: r} = x()), yield i;
				}
			})(), { signal: a }),
			write(e, t, n) {
				let i = r;
				r = null, i({
					chunk: e,
					done: !1,
					cb: n
				});
			},
			final(e) {
				let t = r;
				r = null, t({
					done: !0,
					cb: e
				});
			},
			destroy(e, t) {
				i.abort(), t(e);
			}
		};
	}
	function k(e) {
		let t = e.readable && typeof e.readable.read != "function" ? y.wrap(e.readable) : e.readable, n = e.writable, r = !!i(t), o = !!a(n), s, c, l, u, d;
		function f(e) {
			let t = u;
			u = null, t ? t(e) : e && d.destroy(e);
		}
		return d = new D({
			readableObjectMode: !!(t != null && t.readableObjectMode),
			writableObjectMode: !!(n != null && n.writableObjectMode),
			readable: r,
			writable: o
		}), o && (p(n, (e) => {
			o = !1, e && _(t, e), f(e);
		}), d._write = function(e, t, r) {
			n.write(e, t) ? r() : s = r;
		}, d._final = function(e) {
			n.end(), c = e;
		}, n.on("drain", function() {
			if (s) {
				let e = s;
				s = null, e();
			}
		}), n.on("finish", function() {
			if (c) {
				let e = c;
				c = null, e();
			}
		})), r && (p(t, (e) => {
			r = !1, e && _(t, e), f(e);
		}), t.on("readable", function() {
			if (l) {
				let e = l;
				l = null, e();
			}
		}), t.on("end", function() {
			d.push(null);
		}), d._read = function() {
			for (;;) {
				let e = t.read();
				if (e === null) {
					l = d._read;
					return;
				}
				if (!d.push(e)) return;
			}
		}), d._destroy = function(e, r) {
			!e && u !== null && (e = new m()), l = null, s = null, c = null, u === null ? r(e) : (u = r, _(n, e), _(t, e));
		}, d;
	}
})), ja = /* @__PURE__ */ H(((e, t) => {
	var { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i, ObjectSetPrototypeOf: a } = Mi();
	t.exports = c;
	var o = Oa(), s = ka();
	a(c.prototype, o.prototype), a(c, o);
	{
		let e = i(s.prototype);
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			c.prototype[n] || (c.prototype[n] = s.prototype[n]);
		}
	}
	function c(e) {
		if (!(this instanceof c)) return new c(e);
		o.call(this, e), s.call(this, e), e ? (this.allowHalfOpen = e.allowHalfOpen !== !1, e.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0)) : this.allowHalfOpen = !0;
	}
	n(c.prototype, {
		writable: {
			__proto__: null,
			...r(s.prototype, "writable")
		},
		writableHighWaterMark: {
			__proto__: null,
			...r(s.prototype, "writableHighWaterMark")
		},
		writableObjectMode: {
			__proto__: null,
			...r(s.prototype, "writableObjectMode")
		},
		writableBuffer: {
			__proto__: null,
			...r(s.prototype, "writableBuffer")
		},
		writableLength: {
			__proto__: null,
			...r(s.prototype, "writableLength")
		},
		writableFinished: {
			__proto__: null,
			...r(s.prototype, "writableFinished")
		},
		writableCorked: {
			__proto__: null,
			...r(s.prototype, "writableCorked")
		},
		writableEnded: {
			__proto__: null,
			...r(s.prototype, "writableEnded")
		},
		writableNeedDrain: {
			__proto__: null,
			...r(s.prototype, "writableNeedDrain")
		},
		destroyed: {
			__proto__: null,
			get() {
				return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
			},
			set(e) {
				this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
			}
		}
	});
	var l;
	function u() {
		return l === void 0 && (l = {}), l;
	}
	c.fromWeb = function(e, t) {
		return u().newStreamDuplexFromReadableWritablePair(e, t);
	}, c.toWeb = function(e) {
		return u().newReadableWritablePairFromDuplex(e);
	};
	var d;
	c.from = function(e) {
		return d ||= Aa(), d(e, "body");
	};
})), Ma = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n, Symbol: r } = Mi();
	t.exports = c;
	var { ERR_METHOD_NOT_IMPLEMENTED: i } = Pi().codes, a = ja(), { getHighWaterMark: o } = wa();
	n(c.prototype, a.prototype), n(c, a);
	var s = r("kCallback");
	function c(e) {
		if (!(this instanceof c)) return new c(e);
		let t = e ? o(this, e, "readableHighWaterMark", !0) : null;
		t === 0 && (e = {
			...e,
			highWaterMark: null,
			readableHighWaterMark: t,
			writableHighWaterMark: e.writableHighWaterMark || 0
		}), a.call(this, e), this._readableState.sync = !1, this[s] = null, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", u);
	}
	function l(e) {
		typeof this._flush == "function" && !this.destroyed ? this._flush((t, n) => {
			if (t) {
				e ? e(t) : this.destroy(t);
				return;
			}
			n != null && this.push(n), this.push(null), e && e();
		}) : (this.push(null), e && e());
	}
	function u() {
		this._final !== l && l.call(this);
	}
	c.prototype._final = l, c.prototype._transform = function(e, t, n) {
		throw new i("_transform()");
	}, c.prototype._write = function(e, t, n) {
		let r = this._readableState, i = this._writableState, a = r.length;
		this._transform(e, t, (e, t) => {
			if (e) {
				n(e);
				return;
			}
			t != null && this.push(t), i.ended || a === r.length || r.length < r.highWaterMark ? n() : this[s] = n;
		});
	}, c.prototype._read = function() {
		if (this[s]) {
			let e = this[s];
			this[s] = null, e();
		}
	};
})), Na = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n } = Mi();
	t.exports = i;
	var r = Ma();
	n(i.prototype, r.prototype), n(i, r);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		r.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), Pa = /* @__PURE__ */ H(((e, t) => {
	var n = _a(), { ArrayIsArray: r, Promise: i, SymbolAsyncIterator: a, SymbolDispose: o } = Mi(), s = ya(), { once: c } = ma(), l = ba(), u = ja(), { aggregateTwoErrors: d, codes: { ERR_INVALID_ARG_TYPE: f, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: m, ERR_STREAM_DESTROYED: h, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: _ } = Pi(), { validateFunction: v, validateAbortSignal: y } = ha(), { isIterable: b, isReadable: x, isReadableNodeStream: S, isNodeStream: C, isTransformStream: w, isWebStream: T, isReadableStream: E, isReadableFinished: D } = va(), O = globalThis.AbortController || (pa(), K(aa)).AbortController, k, A, j;
	function M(e, t, n) {
		let r = !1;
		return e.on("close", () => {
			r = !0;
		}), {
			destroy: (t) => {
				r || (r = !0, l.destroyer(e, t || new h("pipe")));
			},
			cleanup: s(e, {
				readable: t,
				writable: n
			}, (e) => {
				r = !e;
			})
		};
	}
	function N(e) {
		return v(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
	}
	function P(e) {
		if (b(e)) return e;
		if (S(e)) return F(e);
		throw new f("val", [
			"Readable",
			"Iterable",
			"AsyncIterable"
		], e);
	}
	async function* F(e) {
		A ||= Oa(), yield* A.prototype[a].call(e);
	}
	async function I(e, t, n, { end: r }) {
		let a, o = null, c = (e) => {
			if (e && (a = e), o) {
				let e = o;
				o = null, e();
			}
		}, l = () => new i((e, t) => {
			a ? t(a) : o = () => {
				a ? t(a) : e();
			};
		});
		t.on("drain", c);
		let u = s(t, { readable: !1 }, c);
		try {
			t.writableNeedDrain && await l();
			for await (let n of e) t.write(n) || await l();
			r && (t.end(), await l()), n();
		} catch (e) {
			n(a === e ? e : d(a, e));
		} finally {
			u(), t.off("drain", c);
		}
	}
	async function L(e, t, n, { end: r }) {
		w(t) && (t = t.writable);
		let i = t.getWriter();
		try {
			for await (let t of e) await i.ready, i.write(t).catch(() => {});
			await i.ready, r && await i.close(), n();
		} catch (e) {
			try {
				await i.abort(e), n(e);
			} catch (e) {
				n(e);
			}
		}
	}
	function R(...e) {
		return z(e, c(N(e)));
	}
	function z(e, t, i) {
		if (e.length === 1 && r(e[0]) && (e = e[0]), e.length < 2) throw new m("streams");
		let a = new O(), s = a.signal, c = i?.signal, l = [];
		y(c, "options.signal");
		function d() {
			F(new _());
		}
		j ||= ma().addAbortListener;
		let h;
		c && (h = j(c, d));
		let g, v, D = [], A = 0;
		function N(e) {
			F(e, --A === 0);
		}
		function F(e, r) {
			var i;
			if (e && (!g || g.code === "ERR_STREAM_PREMATURE_CLOSE") && (g = e), !(!g && !r)) {
				for (; D.length;) D.shift()(g);
				(i = h) == null || i[o](), a.abort(), r && (g || l.forEach((e) => e()), n.nextTick(t, g, v));
			}
		}
		let R;
		for (let t = 0; t < e.length; t++) {
			let r = e[t], a = t < e.length - 1, o = t > 0, c = a || i?.end !== !1, d = t === e.length - 1;
			if (C(r)) {
				if (c) {
					let { destroy: e, cleanup: t } = M(r, a, o);
					D.push(e), x(r) && d && l.push(t);
				}
				function e(e) {
					e && e.name !== "AbortError" && e.code !== "ERR_STREAM_PREMATURE_CLOSE" && N(e);
				}
				r.on("error", e), x(r) && d && l.push(() => {
					r.removeListener("error", e);
				});
			}
			if (t === 0) if (typeof r == "function") {
				if (R = r({ signal: s }), !b(R)) throw new p("Iterable, AsyncIterable or Stream", "source", R);
			} else R = b(r) || S(r) || w(r) ? r : u.from(r);
			else if (typeof r == "function") if (R = w(R) ? P(R?.readable) : P(R), R = r(R, { signal: s }), a) {
				if (!b(R, !0)) throw new p("AsyncIterable", `transform[${t - 1}]`, R);
			} else {
				k ||= Na();
				let e = new k({ objectMode: !0 }), t = R?.then;
				if (typeof t == "function") A++, t.call(R, (t) => {
					v = t, t != null && e.write(t), c && e.end(), n.nextTick(N);
				}, (t) => {
					e.destroy(t), n.nextTick(N, t);
				});
				else if (b(R, !0)) A++, I(R, e, N, { end: c });
				else if (E(R) || w(R)) {
					let t = R.readable || R;
					A++, I(t, e, N, { end: c });
				} else throw new p("AsyncIterable or Promise", "destination", R);
				R = e;
				let { destroy: r, cleanup: i } = M(R, !1, !0);
				D.push(r), d && l.push(i);
			}
			else if (C(r)) {
				if (S(R)) {
					A += 2;
					let e = B(R, r, N, { end: c });
					x(r) && d && l.push(e);
				} else if (w(R) || E(R)) {
					let e = R.readable || R;
					A++, I(e, r, N, { end: c });
				} else if (b(R)) A++, I(R, r, N, { end: c });
				else throw new f("val", [
					"Readable",
					"Iterable",
					"AsyncIterable",
					"ReadableStream",
					"TransformStream"
				], R);
				R = r;
			} else if (T(r)) {
				if (S(R)) A++, L(P(R), r, N, { end: c });
				else if (E(R) || b(R)) A++, L(R, r, N, { end: c });
				else if (w(R)) A++, L(R.readable, r, N, { end: c });
				else throw new f("val", [
					"Readable",
					"Iterable",
					"AsyncIterable",
					"ReadableStream",
					"TransformStream"
				], R);
				R = r;
			} else R = u.from(r);
		}
		return (s != null && s.aborted || c != null && c.aborted) && n.nextTick(d), R;
	}
	function B(e, t, r, { end: i }) {
		let a = !1;
		if (t.on("close", () => {
			a || r(new g());
		}), e.pipe(t, { end: !1 }), i) {
			function r() {
				a = !0, t.end();
			}
			D(e) ? n.nextTick(r) : e.once("end", r);
		} else r();
		return s(e, {
			readable: !0,
			writable: !1
		}, (t) => {
			let n = e._readableState;
			t && t.code === "ERR_STREAM_PREMATURE_CLOSE" && n && n.ended && !n.errored && !n.errorEmitted ? e.once("end", r).once("error", r) : r(t);
		}), s(t, {
			readable: !1,
			writable: !0
		}, r);
	}
	t.exports = {
		pipelineImpl: z,
		pipeline: R
	};
})), Fa = /* @__PURE__ */ H(((e, t) => {
	var { pipeline: n } = Pa(), r = ja(), { destroyer: i } = ba(), { isNodeStream: a, isReadable: o, isWritable: s, isWebStream: c, isTransformStream: l, isWritableStream: u, isReadableStream: d } = va(), { AbortError: f, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: m } } = Pi(), h = ya();
	t.exports = function(...e) {
		if (e.length === 0) throw new m("streams");
		if (e.length === 1) return r.from(e[0]);
		let t = [...e];
		if (typeof e[0] == "function" && (e[0] = r.from(e[0])), typeof e[e.length - 1] == "function") {
			let t = e.length - 1;
			e[t] = r.from(e[t]);
		}
		for (let n = 0; n < e.length; ++n) if (!(!a(e[n]) && !c(e[n]))) {
			if (n < e.length - 1 && !(o(e[n]) || d(e[n]) || l(e[n]))) throw new p(`streams[${n}]`, t[n], "must be readable");
			if (n > 0 && !(s(e[n]) || u(e[n]) || l(e[n]))) throw new p(`streams[${n}]`, t[n], "must be writable");
		}
		let g, _, v, y, b;
		function x(e) {
			let t = y;
			y = null, t ? t(e) : e ? b.destroy(e) : !T && !w && b.destroy();
		}
		let S = e[0], C = n(e, x), w = !!(s(S) || u(S) || l(S)), T = !!(o(C) || d(C) || l(C));
		if (b = new r({
			writableObjectMode: !!(S != null && S.writableObjectMode),
			readableObjectMode: !!(C != null && C.readableObjectMode),
			writable: w,
			readable: T
		}), w) {
			if (a(S)) b._write = function(e, t, n) {
				S.write(e, t) ? n() : g = n;
			}, b._final = function(e) {
				S.end(), _ = e;
			}, S.on("drain", function() {
				if (g) {
					let e = g;
					g = null, e();
				}
			});
			else if (c(S)) {
				let e = (l(S) ? S.writable : S).getWriter();
				b._write = async function(t, n, r) {
					try {
						await e.ready, e.write(t).catch(() => {}), r();
					} catch (e) {
						r(e);
					}
				}, b._final = async function(t) {
					try {
						await e.ready, e.close().catch(() => {}), _ = t;
					} catch (e) {
						t(e);
					}
				};
			}
			h(l(C) ? C.readable : C, () => {
				if (_) {
					let e = _;
					_ = null, e();
				}
			});
		}
		if (T) {
			if (a(C)) C.on("readable", function() {
				if (v) {
					let e = v;
					v = null, e();
				}
			}), C.on("end", function() {
				b.push(null);
			}), b._read = function() {
				for (;;) {
					let e = C.read();
					if (e === null) {
						v = b._read;
						return;
					}
					if (!b.push(e)) return;
				}
			};
			else if (c(C)) {
				let e = (l(C) ? C.readable : C).getReader();
				b._read = async function() {
					for (;;) try {
						let { value: t, done: n } = await e.read();
						if (!b.push(t)) return;
						if (n) {
							b.push(null);
							return;
						}
					} catch {
						return;
					}
				};
			}
		}
		return b._destroy = function(e, t) {
			!e && y !== null && (e = new f()), v = null, g = null, _ = null, y === null ? t(e) : (y = t, a(C) && i(C, e));
		}, b;
	};
})), Ia = /* @__PURE__ */ H(((e, t) => {
	var n = globalThis.AbortController || (pa(), K(aa)).AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i, ERR_MISSING_ARGS: a, ERR_OUT_OF_RANGE: o }, AbortError: s } = Pi(), { validateAbortSignal: c, validateInteger: l, validateObject: u } = ha(), d = Mi().Symbol("kWeak"), f = Mi().Symbol("kResistStopPropagation"), { finished: p } = ya(), m = Fa(), { addAbortSignalNoValidate: h } = Sa(), { isWritable: g, isNodeStream: _ } = va(), { deprecate: v } = ma(), { ArrayPrototypePush: y, Boolean: b, MathFloor: x, Number: S, NumberIsNaN: C, Promise: w, PromiseReject: T, PromiseResolve: E, PromisePrototypeThen: D, Symbol: O } = Mi(), k = O("kEmpty"), A = O("kEof");
	function j(e, t) {
		if (t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), _(e) && !g(e)) throw new r("stream", e, "must be writable");
		let n = m(this, e);
		return t != null && t.signal && h(t.signal, n), n;
	}
	function M(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal");
		let n = 1;
		t?.concurrency != null && (n = x(t.concurrency));
		let r = n - 1;
		return t?.highWaterMark != null && (r = x(t.highWaterMark)), l(n, "options.concurrency", 1), l(r, "options.highWaterMark", 0), r += n, async function* () {
			let i = ma().AbortSignalAny([t?.signal].filter(b)), a = this, o = [], c = { signal: i }, l, u, d = !1, f = 0;
			function p() {
				d = !0, m();
			}
			function m() {
				--f, h();
			}
			function h() {
				u && !d && f < n && o.length < r && (u(), u = null);
			}
			async function g() {
				try {
					for await (let t of a) {
						if (d) return;
						if (i.aborted) throw new s();
						try {
							if (t = e(t, c), t === k) continue;
							t = E(t);
						} catch (e) {
							t = T(e);
						}
						f += 1, D(t, m, p), o.push(t), l &&= (l(), null), !d && (o.length >= r || f >= n) && await new w((e) => {
							u = e;
						});
					}
					o.push(A);
				} catch (e) {
					let t = T(e);
					D(t, m, p), o.push(t);
				} finally {
					d = !0, l &&= (l(), null);
				}
			}
			g();
			try {
				for (;;) {
					for (; o.length > 0;) {
						let e = await o[0];
						if (e === A) return;
						if (i.aborted) throw new s();
						e !== k && (yield e), o.shift(), h();
					}
					await new w((e) => {
						l = e;
					});
				}
			} finally {
				d = !0, u &&= (u(), null);
			}
		}.call(this);
	}
	function N(e = void 0) {
		return e != null && u(e, "options"), e?.signal != null && c(e.signal, "options.signal"), async function* () {
			let t = 0;
			for await (let r of this) {
				var n;
				if (e != null && (n = e.signal) != null && n.aborted) throw new s({ cause: e.signal.reason });
				yield [t++, r];
			}
		}.call(this);
	}
	async function P(e, t = void 0) {
		for await (let n of R.call(this, e, t)) return !0;
		return !1;
	}
	async function F(e, t = void 0) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		return !await P.call(this, async (...t) => !await e(...t), t);
	}
	async function I(e, t) {
		for await (let n of R.call(this, e, t)) return n;
	}
	async function L(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		async function n(t, n) {
			return await e(t, n), k;
		}
		for await (let e of M.call(this, n, t));
	}
	function R(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		async function n(t, n) {
			return await e(t, n) ? t : k;
		}
		return M.call(this, n, t);
	}
	var z = class extends a {
		constructor() {
			super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
		}
	};
	async function B(e, t, r) {
		var a;
		if (typeof e != "function") throw new i("reducer", ["Function", "AsyncFunction"], e);
		r != null && u(r, "options"), r?.signal != null && c(r.signal, "options.signal");
		let o = arguments.length > 1;
		if (r != null && (a = r.signal) != null && a.aborted) {
			let e = new s(void 0, { cause: r.signal.reason });
			throw this.once("error", () => {}), await p(this.destroy(e)), e;
		}
		let l = new n(), m = l.signal;
		if (r != null && r.signal) {
			let e = {
				once: !0,
				[d]: this,
				[f]: !0
			};
			r.signal.addEventListener("abort", () => l.abort(), e);
		}
		let h = !1;
		try {
			for await (let n of this) {
				var g;
				if (h = !0, r != null && (g = r.signal) != null && g.aborted) throw new s();
				o ? t = await e(t, n, { signal: m }) : (t = n, o = !0);
			}
			if (!h && !o) throw new z();
		} finally {
			l.abort();
		}
		return t;
	}
	async function V(e) {
		e != null && u(e, "options"), e?.signal != null && c(e.signal, "options.signal");
		let t = [];
		for await (let r of this) {
			var n;
			if (e != null && (n = e.signal) != null && n.aborted) throw new s(void 0, { cause: e.signal.reason });
			y(t, r);
		}
		return t;
	}
	function H(e, t) {
		let n = M.call(this, e, t);
		return async function* () {
			for await (let e of n) yield* e;
		}.call(this);
	}
	function U(e) {
		if (e = S(e), C(e)) return 0;
		if (e < 0) throw new o("number", ">= 0", e);
		return e;
	}
	function W(e, t = void 0) {
		return t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), e = U(e), async function* () {
			var n;
			if (t != null && (n = t.signal) != null && n.aborted) throw new s();
			for await (let n of this) {
				var r;
				if (t != null && (r = t.signal) != null && r.aborted) throw new s();
				e-- <= 0 && (yield n);
			}
		}.call(this);
	}
	function G(e, t = void 0) {
		return t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), e = U(e), async function* () {
			var n;
			if (t != null && (n = t.signal) != null && n.aborted) throw new s();
			for await (let n of this) {
				var r;
				if (t != null && (r = t.signal) != null && r.aborted) throw new s();
				if (e-- > 0 && (yield n), e <= 0) return;
			}
		}.call(this);
	}
	t.exports.streamReturningOperators = {
		asIndexedPairs: v(N, "readable.asIndexedPairs will be removed in a future version."),
		drop: W,
		filter: R,
		flatMap: H,
		map: M,
		take: G,
		compose: j
	}, t.exports.promiseReturningOperators = {
		every: F,
		forEach: L,
		reduce: B,
		toArray: V,
		some: P,
		find: I
	};
})), La = /* @__PURE__ */ H(((e, t) => {
	var { ArrayPrototypePop: n, Promise: r } = Mi(), { isIterable: i, isNodeStream: a, isWebStream: o } = va(), { pipelineImpl: s } = Pa(), { finished: c } = ya();
	Ra();
	function l(...e) {
		return new r((t, r) => {
			let c, l, u = e[e.length - 1];
			if (u && typeof u == "object" && !a(u) && !i(u) && !o(u)) {
				let t = n(e);
				c = t.signal, l = t.end;
			}
			s(e, (e, n) => {
				e ? r(e) : t(n);
			}, {
				signal: c,
				end: l
			});
		});
	}
	t.exports = {
		finished: c,
		pipeline: l
	};
})), Ra = /* @__PURE__ */ H(((e, t) => {
	var { Buffer: n } = q("buffer"), { ObjectDefineProperty: r, ObjectKeys: i, ReflectApply: a } = Mi(), { promisify: { custom: o } } = ma(), { streamReturningOperators: s, promiseReturningOperators: c } = Ia(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: l } } = Pi(), u = Fa(), { setDefaultHighWaterMark: d, getDefaultHighWaterMark: f } = wa(), { pipeline: p } = Pa(), { destroyer: m } = ba(), h = ya(), g = La(), _ = va(), v = t.exports = xa().Stream;
	v.isDestroyed = _.isDestroyed, v.isDisturbed = _.isDisturbed, v.isErrored = _.isErrored, v.isReadable = _.isReadable, v.isWritable = _.isWritable, v.Readable = Oa();
	for (let e of i(s)) {
		let t = s[e];
		function n(...e) {
			if (new.target) throw l();
			return v.Readable.from(a(t, this, e));
		}
		r(n, "name", {
			__proto__: null,
			value: t.name
		}), r(n, "length", {
			__proto__: null,
			value: t.length
		}), r(v.Readable.prototype, e, {
			__proto__: null,
			value: n,
			enumerable: !1,
			configurable: !0,
			writable: !0
		});
	}
	for (let e of i(c)) {
		let t = c[e];
		function n(...e) {
			if (new.target) throw l();
			return a(t, this, e);
		}
		r(n, "name", {
			__proto__: null,
			value: t.name
		}), r(n, "length", {
			__proto__: null,
			value: t.length
		}), r(v.Readable.prototype, e, {
			__proto__: null,
			value: n,
			enumerable: !1,
			configurable: !0,
			writable: !0
		});
	}
	v.Writable = ka(), v.Duplex = ja(), v.Transform = Ma(), v.PassThrough = Na(), v.pipeline = p;
	var { addAbortSignal: y } = Sa();
	v.addAbortSignal = y, v.finished = h, v.destroy = m, v.compose = u, v.setDefaultHighWaterMark = d, v.getDefaultHighWaterMark = f, r(v, "promises", {
		__proto__: null,
		configurable: !0,
		enumerable: !0,
		get() {
			return g;
		}
	}), r(p, o, {
		__proto__: null,
		enumerable: !0,
		get() {
			return g.pipeline;
		}
	}), r(h, o, {
		__proto__: null,
		enumerable: !0,
		get() {
			return g.finished;
		}
	}), v.Stream = v, v._isUint8Array = function(e) {
		return e instanceof Uint8Array;
	}, v._uint8ArrayToBuffer = function(e) {
		return n.from(e.buffer, e.byteOffset, e.byteLength);
	};
})), za = /* @__PURE__ */ H(((e, t) => {
	var n = q("stream");
	if (n && process.env.READABLE_STREAM === "disable") {
		let e = n.promises;
		t.exports._uint8ArrayToBuffer = n._uint8ArrayToBuffer, t.exports._isUint8Array = n._isUint8Array, t.exports.isDisturbed = n.isDisturbed, t.exports.isErrored = n.isErrored, t.exports.isReadable = n.isReadable, t.exports.Readable = n.Readable, t.exports.Writable = n.Writable, t.exports.Duplex = n.Duplex, t.exports.Transform = n.Transform, t.exports.PassThrough = n.PassThrough, t.exports.addAbortSignal = n.addAbortSignal, t.exports.finished = n.finished, t.exports.destroy = n.destroy, t.exports.pipeline = n.pipeline, t.exports.compose = n.compose, Object.defineProperty(n, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return e;
			}
		}), t.exports.Stream = n.Stream;
	} else {
		let e = Ra(), n = La(), r = e.Readable.destroy;
		t.exports = e.Readable, t.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, t.exports._isUint8Array = e._isUint8Array, t.exports.isDisturbed = e.isDisturbed, t.exports.isErrored = e.isErrored, t.exports.isReadable = e.isReadable, t.exports.Readable = e.Readable, t.exports.Writable = e.Writable, t.exports.Duplex = e.Duplex, t.exports.Transform = e.Transform, t.exports.PassThrough = e.PassThrough, t.exports.addAbortSignal = e.addAbortSignal, t.exports.finished = e.finished, t.exports.destroy = e.destroy, t.exports.destroy = r, t.exports.pipeline = e.pipeline, t.exports.compose = e.compose, Object.defineProperty(e, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return n;
			}
		}), t.exports.Stream = e.Stream;
	}
	t.exports.default = t.exports;
})), Ba = /* @__PURE__ */ G((/* @__PURE__ */ H(((e, t) => {
	t.exports = function(e, t) {
		if (typeof e != "string") throw TypeError("expected path to be a string");
		if (e === "\\" || e === "/") return "/";
		var n = e.length;
		if (n <= 1) return e;
		var r = "";
		if (n > 4 && e[3] === "\\") {
			var i = e[2];
			(i === "?" || i === ".") && e.slice(0, 2) === "\\\\" && (e = e.slice(2), r = "//");
		}
		var a = e.split(/[/\\]+/);
		return t !== !1 && a[a.length - 1] === "" && a.pop(), r + a.join("/");
	};
})))(), 1), Va = za();
function Ha(e) {
	return e ||= /* @__PURE__ */ new Date(), e = e instanceof Date ? e : typeof e == "string" ? new Date(e) : /* @__PURE__ */ new Date(), e;
}
function Ua(e) {
	return e === null ? Buffer.alloc(0) : typeof e == "string" ? Buffer.from(e) : Ve(e) ? e.pipe(new Va.PassThrough()) : e;
}
function Wa(e) {
	return (0, Ba.default)(e, !1).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
}
function Ga(e) {
	return e.slice(-1) === "/" ? e : e + "/";
}
//#endregion
//#region node_modules/archiver/lib/core.js
var { ReaddirGlob: Ka } = Pn, qa = process.platform === "win32", Ja = class extends Va.Transform {
	_supportsDirectory = !1;
	_supportsSymlink = !1;
	constructor(e) {
		e = {
			highWaterMark: 1024 * 1024,
			statConcurrency: 4,
			...e
		}, super(e), this.options = e, this._format = !1, this._module = !1, this._pending = 0, this._pointer = 0, this._entriesCount = 0, this._entriesProcessedCount = 0, this._fsEntriesTotalBytes = 0, this._fsEntriesProcessedBytes = 0, this._queue = _i(this._onQueueTask.bind(this), 1), this._queue.drain(this._onQueueDrain.bind(this)), this._statQueue = _i(this._onStatQueueTask.bind(this), e.statConcurrency), this._statQueue.drain(this._onQueueDrain.bind(this)), this._state = {
			aborted: !1,
			finalize: !1,
			finalizing: !1,
			finalized: !1,
			modulePiped: !1
		}, this._streams = [];
	}
	_abort() {
		this._state.aborted = !0, this._queue.kill(), this._statQueue.kill(), this._queue.idle() && this._shutdown();
	}
	_append(e, t) {
		t ||= {};
		let n = {
			source: null,
			filepath: e
		};
		t.name ||= e, t.sourcePath = e, n.data = t, this._entriesCount++, t.stats && t.stats instanceof _ ? (n = this._updateQueueTaskWithStats(n, t.stats), n && (t.stats.size && (this._fsEntriesTotalBytes += t.stats.size), this._queue.push(n))) : this._statQueue.push(n);
	}
	_finalize() {
		this._state.finalizing || this._state.finalized || this._state.aborted || (this._state.finalizing = !0, this._moduleFinalize(), this._state.finalizing = !1, this._state.finalized = !0);
	}
	_maybeFinalize() {
		return this._state.finalizing || this._state.finalized || this._state.aborted ? !1 : this._state.finalize && this._pending === 0 && this._queue.idle() && this._statQueue.idle() ? (this._finalize(), !0) : !1;
	}
	_moduleAppend(e, t, n) {
		if (this._state.aborted) {
			n();
			return;
		}
		this._module.append(e, t, function(e) {
			if (this._task = null, this._state.aborted) {
				this._shutdown();
				return;
			}
			if (e) {
				this.emit("error", e), setImmediate(n);
				return;
			}
			this.emit("entry", t), this._entriesProcessedCount++, t.stats && t.stats.size && (this._fsEntriesProcessedBytes += t.stats.size), this.emit("progress", {
				entries: {
					total: this._entriesCount,
					processed: this._entriesProcessedCount
				},
				fs: {
					totalBytes: this._fsEntriesTotalBytes,
					processedBytes: this._fsEntriesProcessedBytes
				}
			}), setImmediate(n);
		}.bind(this));
	}
	_moduleFinalize() {
		typeof this._module.finalize == "function" ? this._module.finalize() : typeof this._module.end == "function" ? this._module.end() : this.emit("error", new ji("NOENDMETHOD"));
	}
	_modulePipe() {
		this._module.on("error", this._onModuleError.bind(this)), this._module.pipe(this), this._state.modulePiped = !0;
	}
	_moduleUnpipe() {
		this._module.unpipe(this), this._state.modulePiped = !1;
	}
	_normalizeEntryData(e, t) {
		e = {
			type: "file",
			name: null,
			date: null,
			mode: null,
			prefix: null,
			sourcePath: null,
			stats: !1,
			...e
		}, t && e.stats === !1 && (e.stats = t);
		let n = e.type === "directory";
		return e.name && (typeof e.prefix == "string" && e.prefix !== "" && (e.name = e.prefix + "/" + e.name, e.prefix = null), e.name = Wa(e.name), e.type !== "symlink" && e.name.slice(-1) === "/" ? (n = !0, e.type = "directory") : n && (e.name += "/")), typeof e.mode == "number" ? qa ? e.mode &= 511 : e.mode &= 4095 : e.stats && e.mode === null ? (qa ? e.mode = e.stats.mode & 511 : e.mode = e.stats.mode & 4095, qa && n && (e.mode = 493)) : e.mode === null && (e.mode = n ? 493 : 420), e.stats && e.date === null ? e.date = e.stats.mtime : e.date = Ha(e.date), e;
	}
	_onModuleError(e) {
		this.emit("error", e);
	}
	_onQueueDrain() {
		this._state.finalizing || this._state.finalized || this._state.aborted || this._state.finalize && this._pending === 0 && this._queue.idle() && this._statQueue.idle() && this._finalize();
	}
	_onQueueTask(e, t) {
		let n = () => {
			e.data.callback && e.data.callback(), t();
		};
		if (this._state.finalizing || this._state.finalized || this._state.aborted) {
			n();
			return;
		}
		this._task = e, this._moduleAppend(e.source, e.data, n);
	}
	_onStatQueueTask(e, t) {
		if (this._state.finalizing || this._state.finalized || this._state.aborted) {
			t();
			return;
		}
		y(e.filepath, function(n, r) {
			if (this._state.aborted) {
				setImmediate(t);
				return;
			}
			if (n) {
				this._entriesCount--, this.emit("warning", n), setImmediate(t);
				return;
			}
			e = this._updateQueueTaskWithStats(e, r), e && (r.size && (this._fsEntriesTotalBytes += r.size), this._queue.push(e)), setImmediate(t);
		}.bind(this));
	}
	_shutdown() {
		this._moduleUnpipe(), this.end();
	}
	_transform(e, t, n) {
		e && (this._pointer += e.length), n(null, e);
	}
	_updateQueueTaskWithStats(e, t) {
		if (t.isFile()) e.data.type = "file", e.data.sourceType = "stream", e.source = new $n.Readable(function() {
			return v(e.filepath);
		});
		else if (t.isDirectory() && this._supportsDirectory) e.data.name = Ga(e.data.name), e.data.type = "directory", e.data.sourcePath = Ga(e.filepath), e.data.sourceType = "buffer", e.source = Buffer.concat([]);
		else if (t.isSymbolicLink() && this._supportsSymlink) {
			let t = b(e.filepath), n = f(e.filepath);
			e.data.type = "symlink", e.data.linkname = p(n, m(n, t)), e.data.sourceType = "buffer", e.source = Buffer.concat([]);
		} else return t.isDirectory() ? this.emit("warning", new ji("DIRECTORYNOTSUPPORTED", e.data)) : t.isSymbolicLink() ? this.emit("warning", new ji("SYMLINKNOTSUPPORTED", e.data)) : this.emit("warning", new ji("ENTRYNOTSUPPORTED", e.data)), null;
		return e.data = this._normalizeEntryData(e.data, t), e;
	}
	abort() {
		return this._state.aborted || this._state.finalized || this._abort(), this;
	}
	append(e, t) {
		if (this._state.finalize || this._state.aborted) return this.emit("error", new ji("QUEUECLOSED")), this;
		if (t = this._normalizeEntryData(t), typeof t.name != "string" || t.name.length === 0) return this.emit("error", new ji("ENTRYNAMEREQUIRED")), this;
		if (t.type === "directory" && !this._supportsDirectory) return this.emit("error", new ji("DIRECTORYNOTSUPPORTED", { name: t.name })), this;
		if (e = Ua(e), Buffer.isBuffer(e)) t.sourceType = "buffer";
		else if (Ve(e)) t.sourceType = "stream";
		else return this.emit("error", new ji("INPUTSTEAMBUFFERREQUIRED", { name: t.name })), this;
		return this._entriesCount++, this._queue.push({
			data: t,
			source: e
		}), this;
	}
	directory(e, t, n) {
		if (this._state.finalize || this._state.aborted) return this.emit("error", new ji("QUEUECLOSED")), this;
		if (typeof e != "string" || e.length === 0) return this.emit("error", new ji("DIRECTORYDIRPATHREQUIRED")), this;
		this._pending++, t === !1 ? t = "" : typeof t != "string" && (t = e);
		var r = !1;
		typeof n == "function" ? (r = n, n = {}) : typeof n != "object" && (n = {});
		var i = {
			stat: !0,
			dot: !0
		};
		function a() {
			this._pending--, this._maybeFinalize();
		}
		function o(e) {
			this.emit("error", e);
		}
		function s(i) {
			c.pause();
			let a = !1, o = Object.assign({}, n);
			o.name = i.relative, o.prefix = t, o.stats = i.stat, o.callback = c.resume.bind(c);
			try {
				if (r) {
					if (o = r(o), o === !1) a = !0;
					else if (typeof o != "object") throw new ji("DIRECTORYFUNCTIONINVALIDDATA", { dirpath: e });
				}
			} catch (e) {
				this.emit("error", e);
				return;
			}
			if (a) {
				c.resume();
				return;
			}
			this._append(i.absolute, o);
		}
		let c = Pn(e, i);
		return c.on("error", o.bind(this)), c.on("match", s.bind(this)), c.on("end", a.bind(this)), this;
	}
	file(e, t) {
		return this._state.finalize || this._state.aborted ? (this.emit("error", new ji("QUEUECLOSED")), this) : typeof e != "string" || e.length === 0 ? (this.emit("error", new ji("FILEFILEPATHREQUIRED")), this) : (this._append(e, t), this);
	}
	glob(e, t, n) {
		this._pending++, t = {
			stat: !0,
			pattern: e,
			...t
		};
		function r() {
			this._pending--, this._maybeFinalize();
		}
		function i(e) {
			this.emit("error", e);
		}
		function a(e) {
			o.pause();
			let t = Object.assign({}, n);
			t.callback = o.resume.bind(o), t.stats = e.stat, t.name = e.relative, this._append(e.absolute, t);
		}
		let o = new Ka(t.cwd || ".", t);
		return o.on("error", i.bind(this)), o.on("match", a.bind(this)), o.on("end", r.bind(this)), this;
	}
	finalize() {
		if (this._state.aborted) {
			var e = new ji("ABORTED");
			return this.emit("error", e), Promise.reject(e);
		}
		if (this._state.finalize) {
			var t = new ji("FINALIZING");
			return this.emit("error", t), Promise.reject(t);
		}
		this._state.finalize = !0, this._pending === 0 && this._queue.idle() && this._statQueue.idle() && this._finalize();
		var n = this;
		return new Promise(function(e, t) {
			var r;
			n._module.on("end", function() {
				r || e();
			}), n._module.on("error", function(e) {
				r = !0, t(e);
			});
		});
	}
	symlink(e, t, n) {
		if (this._state.finalize || this._state.aborted) return this.emit("error", new ji("QUEUECLOSED")), this;
		if (typeof e != "string" || e.length === 0) return this.emit("error", new ji("SYMLINKFILEPATHREQUIRED")), this;
		if (typeof t != "string" || t.length === 0) return this.emit("error", new ji("SYMLINKTARGETREQUIRED", { filepath: e })), this;
		if (!this._supportsSymlink) return this.emit("error", new ji("SYMLINKNOTSUPPORTED", { filepath: e })), this;
		var r = {};
		return r.type = "symlink", r.name = e.replace(/\\/g, "/"), r.linkname = t.replace(/\\/g, "/"), r.sourceType = "buffer", typeof n == "number" && (r.mode = n), this._entriesCount++, this._queue.push({
			data: r,
			source: Buffer.concat([])
		}), this;
	}
	pointer() {
		return this._pointer;
	}
}, Ya = class {
	getName() {}
	getSize() {}
	getLastModifiedDate() {}
	isDirectory() {}
};
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/util.js
function Xa(e, t) {
	t ||= !1;
	var n = t ? e.getFullYear() : e.getUTCFullYear();
	if (n < 1980) return 2162688;
	if (n >= 2044) return 2141175677;
	var r = {
		year: n,
		month: t ? e.getMonth() : e.getUTCMonth(),
		date: t ? e.getDate() : e.getUTCDate(),
		hours: t ? e.getHours() : e.getUTCHours(),
		minutes: t ? e.getMinutes() : e.getUTCMinutes(),
		seconds: t ? e.getSeconds() : e.getUTCSeconds()
	};
	return r.year - 1980 << 25 | r.month + 1 << 21 | r.date << 16 | r.hours << 11 | r.minutes << 5 | r.seconds / 2;
}
function Za(e) {
	return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
}
function Qa(e) {
	var t = Buffer.alloc(8);
	return t.writeUInt32LE(e % 4294967296, 0), t.writeUInt32LE(e / 4294967296 | 0, 4), t;
}
function $a(e) {
	var t = Buffer.alloc(2);
	return t.writeUInt16LE((e & 65535) >>> 0, 0), t;
}
function eo(e, t) {
	return e.readUInt16LE(t);
}
function to(e) {
	var t = Buffer.alloc(4);
	return t.writeUInt32LE((e & 4294967295) >>> 0, 0), t;
}
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/general-purpose-bit.js
var no = 8, ro = 1, io = 4, ao = 2, oo = 64, so = 2048, co = class e {
	constructor() {
		return this.descriptor = !1, this.encryption = !1, this.utf8 = !1, this.numberOfShannonFanoTrees = 0, this.strongEncryption = !1, this.slidingDictionarySize = 0, this;
	}
	encode() {
		return $a((this.descriptor ? no : 0) | (this.utf8 ? so : 0) | (this.encryption ? ro : 0) | (this.strongEncryption ? oo : 0));
	}
	static parse(t, n) {
		var r = eo(t, n), i = new e();
		return i.useDataDescriptor((r & no) !== 0), i.useUTF8ForNames((r & so) !== 0), i.useStrongEncryption((r & oo) !== 0), i.useEncryption((r & ro) !== 0), i.setSlidingDictionarySize((r & ao) === 0 ? 4096 : 8192), i.setNumberOfShannonFanoTrees((r & io) === 0 ? 2 : 3), i;
	}
	setNumberOfShannonFanoTrees(e) {
		this.numberOfShannonFanoTrees = e;
	}
	getNumberOfShannonFanoTrees() {
		return this.numberOfShannonFanoTrees;
	}
	setSlidingDictionarySize(e) {
		this.slidingDictionarySize = e;
	}
	getSlidingDictionarySize() {
		return this.slidingDictionarySize;
	}
	useDataDescriptor(e) {
		this.descriptor = e;
	}
	usesDataDescriptor() {
		return this.descriptor;
	}
	useEncryption(e) {
		this.encryption = e;
	}
	usesEncryption() {
		return this.encryption;
	}
	useStrongEncryption(e) {
		this.strongEncryption = e;
	}
	usesStrongEncryption() {
		return this.strongEncryption;
	}
	useUTF8ForNames(e) {
		this.utf8 = e;
	}
	usesUTF8ForNames() {
		return this.utf8;
	}
}, lo = {
	PERM_MASK: 4095,
	FILE_TYPE_FLAG: 61440,
	LINK_FLAG: 40960,
	FILE_FLAG: 32768,
	DIR_FLAG: 16384,
	DEFAULT_LINK_PERM: 511,
	DEFAULT_DIR_PERM: 493,
	DEFAULT_FILE_PERM: 420
}, uo = Buffer.alloc(0), fo = 65535, po = Buffer.from([, ,]), mo = Buffer.from([
	,
	,
	,
	,
]), ho = 67324752, go = 134695760, _o = 33639248, vo = 101010256, yo = 101075792, bo = 117853008, xo = 65535, So = 4294967295, Co = 4095, wo = 16384, To = 32768, Eo = class extends Ya {
	constructor(e) {
		super(), this.platform = 0, this.method = -1, this.name = null, this.size = 0, this.csize = 0, this.gpb = new co(), this.crc = 0, this.time = -1, this.minver = 10, this.mode = -1, this.extra = null, this.exattr = 0, this.inattr = 0, this.comment = null, e && this.setName(e);
	}
	getCentralDirectoryExtra() {
		return this.getExtra();
	}
	getComment() {
		return this.comment === null ? "" : this.comment;
	}
	getCompressedSize() {
		return this.csize;
	}
	getCrc() {
		return this.crc;
	}
	getExternalAttributes = function() {
		return this.exattr;
	};
	getExtra() {
		return this.extra === null ? uo : this.extra;
	}
	getGeneralPurposeBit() {
		return this.gpb;
	}
	getInternalAttributes() {
		return this.inattr;
	}
	getLastModifiedDate() {
		return this.getTime();
	}
	getLocalFileDataExtra() {
		return this.getExtra();
	}
	getMethod() {
		return this.method;
	}
	getName() {
		return this.name;
	}
	getPlatform() {
		return this.platform;
	}
	getSize() {
		return this.size;
	}
	getTime() {
		return this.time === -1 ? -1 : Za(this.time);
	}
	getTimeDos() {
		return this.time === -1 ? 0 : this.time;
	}
	getUnixMode() {
		return this.platform === 3 ? this.getExternalAttributes() >> 16 & fo : 0;
	}
	getVersionNeededToExtract() {
		return this.minver;
	}
	setComment(e) {
		Buffer.byteLength(e) !== e.length && this.getGeneralPurposeBit().useUTF8ForNames(!0), this.comment = e;
	}
	setCompressedSize(e) {
		if (e < 0) throw Error("invalid entry compressed size");
		this.csize = e;
	}
	setCrc(e) {
		if (e < 0) throw Error("invalid entry crc32");
		this.crc = e;
	}
	setExternalAttributes(e) {
		this.exattr = e >>> 0;
	}
	setExtra(e) {
		this.extra = e;
	}
	setGeneralPurposeBit(e) {
		if (!(e instanceof co)) throw Error("invalid entry GeneralPurposeBit");
		this.gpb = e;
	}
	setInternalAttributes(e) {
		this.inattr = e;
	}
	setMethod(e) {
		if (e < 0) throw Error("invalid entry compression method");
		this.method = e;
	}
	setName(e, t = !1) {
		e = (0, Ba.default)(e, !1).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, ""), t && (e = `/${e}`), Buffer.byteLength(e) !== e.length && this.getGeneralPurposeBit().useUTF8ForNames(!0), this.name = e;
	}
	setPlatform(e) {
		this.platform = e;
	}
	setSize(e) {
		if (e < 0) throw Error("invalid entry size");
		this.size = e;
	}
	setTime(e, t) {
		if (!(e instanceof Date)) throw Error("invalid entry time");
		this.time = Xa(e, t);
	}
	setUnixMode(e) {
		e |= this.isDirectory() ? wo : To;
		var t = 0;
		t |= e << 16 | (this.isDirectory() ? 16 : 32), this.setExternalAttributes(t), this.mode = e & Co, this.platform = 3;
	}
	setVersionNeededToExtract(e) {
		this.minver = e;
	}
	isDirectory() {
		return this.getName().slice(-1) === "/";
	}
	isUnixSymlink() {
		return (this.getUnixMode() & lo.FILE_TYPE_FLAG) === lo.LINK_FLAG;
	}
	isZip64() {
		return this.csize > 4294967295 || this.size > 4294967295;
	}
}, Do = /* @__PURE__ */ H(((e, t) => {
	t.exports = {
		AggregateError: class extends Error {
			constructor(e) {
				if (!Array.isArray(e)) throw TypeError(`Expected input to be an Array, got ${typeof e}`);
				let t = "";
				for (let n = 0; n < e.length; n++) t += `    ${e[n].stack}\n`;
				super(t), this.name = "AggregateError", this.errors = e;
			}
		},
		ArrayIsArray(e) {
			return Array.isArray(e);
		},
		ArrayPrototypeIncludes(e, t) {
			return e.includes(t);
		},
		ArrayPrototypeIndexOf(e, t) {
			return e.indexOf(t);
		},
		ArrayPrototypeJoin(e, t) {
			return e.join(t);
		},
		ArrayPrototypeMap(e, t) {
			return e.map(t);
		},
		ArrayPrototypePop(e, t) {
			return e.pop(t);
		},
		ArrayPrototypePush(e, t) {
			return e.push(t);
		},
		ArrayPrototypeSlice(e, t, n) {
			return e.slice(t, n);
		},
		Error,
		FunctionPrototypeCall(e, t, ...n) {
			return e.call(t, ...n);
		},
		FunctionPrototypeSymbolHasInstance(e, t) {
			return Function.prototype[Symbol.hasInstance].call(e, t);
		},
		MathFloor: Math.floor,
		Number,
		NumberIsInteger: Number.isInteger,
		NumberIsNaN: Number.isNaN,
		NumberMAX_SAFE_INTEGER: 2 ** 53 - 1,
		NumberMIN_SAFE_INTEGER: -(2 ** 53 - 1),
		NumberParseInt: Number.parseInt,
		ObjectDefineProperties(e, t) {
			return Object.defineProperties(e, t);
		},
		ObjectDefineProperty(e, t, n) {
			return Object.defineProperty(e, t, n);
		},
		ObjectGetOwnPropertyDescriptor(e, t) {
			return Object.getOwnPropertyDescriptor(e, t);
		},
		ObjectKeys(e) {
			return Object.keys(e);
		},
		ObjectSetPrototypeOf(e, t) {
			return Object.setPrototypeOf(e, t);
		},
		Promise,
		PromisePrototypeCatch(e, t) {
			return e.catch(t);
		},
		PromisePrototypeThen(e, t, n) {
			return e.then(t, n);
		},
		PromiseReject(e) {
			return Promise.reject(e);
		},
		PromiseResolve(e) {
			return Promise.resolve(e);
		},
		ReflectApply: Reflect.apply,
		RegExpPrototypeTest(e, t) {
			return e.test(t);
		},
		SafeSet: Set,
		String,
		StringPrototypeSlice(e, t, n) {
			return e.slice(t, n);
		},
		StringPrototypeToLowerCase(e) {
			return e.toLowerCase();
		},
		StringPrototypeToUpperCase(e) {
			return e.toUpperCase();
		},
		StringPrototypeTrim(e) {
			return e.trim();
		},
		Symbol,
		SymbolFor: Symbol.for,
		SymbolAsyncIterator: Symbol.asyncIterator,
		SymbolHasInstance: Symbol.hasInstance,
		SymbolIterator: Symbol.iterator,
		SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
		SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
		TypedArrayPrototypeSet(e, t, n) {
			return e.set(t, n);
		},
		Boolean,
		Uint8Array
	};
})), Oo = /* @__PURE__ */ H(((e, t) => {
	t.exports = {
		format(e, ...t) {
			return e.replace(/%([sdifj])/g, function(...[e, n]) {
				let r = t.shift();
				return n === "f" ? r.toFixed(6) : n === "j" ? JSON.stringify(r) : n === "s" && typeof r == "object" ? `${r.constructor === Object ? "" : r.constructor.name} {}`.trim() : r.toString();
			});
		},
		inspect(e) {
			switch (typeof e) {
				case "string":
					if (e.includes("'")) {
						if (!e.includes("\"")) return `"${e}"`;
						if (!e.includes("`") && !e.includes("${")) return `\`${e}\``;
					}
					return `'${e}'`;
				case "number": return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
				case "bigint": return `${String(e)}n`;
				case "boolean":
				case "undefined": return String(e);
				case "object": return "{}";
			}
		}
	};
})), ko = /* @__PURE__ */ H(((e, t) => {
	var { format: n, inspect: r } = Oo(), { AggregateError: i } = Do(), a = globalThis.AggregateError || i, o = Symbol("kIsNodeError"), s = [
		"string",
		"function",
		"number",
		"object",
		"Function",
		"Object",
		"boolean",
		"bigint",
		"symbol"
	], c = /^([A-Z][a-z0-9]*)+$/, l = "__node_internal_", u = {};
	function d(e, t) {
		if (!e) throw new u.ERR_INTERNAL_ASSERTION(t);
	}
	function f(e) {
		let t = "", n = e.length, r = +(e[0] === "-");
		for (; n >= r + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
		return `${e.slice(0, n)}${t}`;
	}
	function p(e, t, r) {
		if (typeof t == "function") return d(t.length <= r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${t.length}).`), t(...r);
		let i = (t.match(/%[dfijoOs]/g) || []).length;
		return d(i === r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${i}).`), r.length === 0 ? t : n(t, ...r);
	}
	function m(e, t, n) {
		n ||= Error;
		class r extends n {
			constructor(...n) {
				super(p(e, t, n));
			}
			toString() {
				return `${this.name} [${e}]: ${this.message}`;
			}
		}
		Object.defineProperties(r.prototype, {
			name: {
				value: n.name,
				writable: !0,
				enumerable: !1,
				configurable: !0
			},
			toString: {
				value() {
					return `${this.name} [${e}]: ${this.message}`;
				},
				writable: !0,
				enumerable: !1,
				configurable: !0
			}
		}), r.prototype.code = e, r.prototype[o] = !0, u[e] = r;
	}
	function h(e) {
		let t = l + e.name;
		return Object.defineProperty(e, "name", { value: t }), e;
	}
	function g(e, t) {
		if (e && t && e !== t) {
			if (Array.isArray(t.errors)) return t.errors.push(e), t;
			let n = new a([t, e], t.message);
			return n.code = t.code, n;
		}
		return e || t;
	}
	var _ = class extends Error {
		constructor(e = "The operation was aborted", t = void 0) {
			if (t !== void 0 && typeof t != "object") throw new u.ERR_INVALID_ARG_TYPE("options", "Object", t);
			super(e, t), this.code = "ABORT_ERR", this.name = "AbortError";
		}
	};
	m("ERR_ASSERTION", "%s", Error), m("ERR_INVALID_ARG_TYPE", (e, t, n) => {
		d(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [t]);
		let i = "The ";
		e.endsWith(" argument") ? i += `${e} ` : i += `"${e}" ${e.includes(".") ? "property" : "argument"} `, i += "must be ";
		let a = [], o = [], l = [];
		for (let e of t) d(typeof e == "string", "All expected entries have to be of type string"), s.includes(e) ? a.push(e.toLowerCase()) : c.test(e) ? o.push(e) : (d(e !== "object", "The value \"object\" should be written as \"Object\""), l.push(e));
		if (o.length > 0) {
			let e = a.indexOf("object");
			e !== -1 && (a.splice(a, e, 1), o.push("Object"));
		}
		if (a.length > 0) {
			switch (a.length) {
				case 1:
					i += `of type ${a[0]}`;
					break;
				case 2:
					i += `one of type ${a[0]} or ${a[1]}`;
					break;
				default: {
					let e = a.pop();
					i += `one of type ${a.join(", ")}, or ${e}`;
				}
			}
			(o.length > 0 || l.length > 0) && (i += " or ");
		}
		if (o.length > 0) {
			switch (o.length) {
				case 1:
					i += `an instance of ${o[0]}`;
					break;
				case 2:
					i += `an instance of ${o[0]} or ${o[1]}`;
					break;
				default: {
					let e = o.pop();
					i += `an instance of ${o.join(", ")}, or ${e}`;
				}
			}
			l.length > 0 && (i += " or ");
		}
		switch (l.length) {
			case 0: break;
			case 1:
				l[0].toLowerCase() !== l[0] && (i += "an "), i += `${l[0]}`;
				break;
			case 2:
				i += `one of ${l[0]} or ${l[1]}`;
				break;
			default: {
				let e = l.pop();
				i += `one of ${l.join(", ")}, or ${e}`;
			}
		}
		if (n == null) i += `. Received ${n}`;
		else if (typeof n == "function" && n.name) i += `. Received function ${n.name}`;
		else if (typeof n == "object") {
			var u;
			if ((u = n.constructor) != null && u.name) i += `. Received an instance of ${n.constructor.name}`;
			else {
				let e = r(n, { depth: -1 });
				i += `. Received ${e}`;
			}
		} else {
			let e = r(n, { colors: !1 });
			e.length > 25 && (e = `${e.slice(0, 25)}...`), i += `. Received type ${typeof n} (${e})`;
		}
		return i;
	}, TypeError), m("ERR_INVALID_ARG_VALUE", (e, t, n = "is invalid") => {
		let i = r(t);
		return i.length > 128 && (i = i.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${n}. Received ${i}`;
	}, TypeError), m("ERR_INVALID_RETURN_VALUE", (e, t, n) => {
		var r;
		return `Expected ${e} to be returned from the "${t}" function but got ${n != null && (r = n.constructor) != null && r.name ? `instance of ${n.constructor.name}` : `type ${typeof n}`}.`;
	}, TypeError), m("ERR_MISSING_ARGS", (...e) => {
		d(e.length > 0, "At least one arg needs to be specified");
		let t, n = e.length;
		switch (e = (Array.isArray(e) ? e : [e]).map((e) => `"${e}"`).join(" or "), n) {
			case 1:
				t += `The ${e[0]} argument`;
				break;
			case 2:
				t += `The ${e[0]} and ${e[1]} arguments`;
				break;
			default:
				{
					let n = e.pop();
					t += `The ${e.join(", ")}, and ${n} arguments`;
				}
				break;
		}
		return `${t} must be specified`;
	}, TypeError), m("ERR_OUT_OF_RANGE", (e, t, n) => {
		d(t, "Missing \"range\" argument");
		let i;
		if (Number.isInteger(n) && Math.abs(n) > 2 ** 32) i = f(String(n));
		else if (typeof n == "bigint") {
			i = String(n);
			let e = BigInt(2) ** BigInt(32);
			(n > e || n < -e) && (i = f(i)), i += "n";
		} else i = r(n);
		return `The value of "${e}" is out of range. It must be ${t}. Received ${i}`;
	}, RangeError), m("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), m("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), m("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), m("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), m("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), m("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), m("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), m("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), m("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), m("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), m("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), t.exports = {
		AbortError: _,
		aggregateTwoErrors: h(g),
		hideStackFrames: h,
		codes: u
	};
})), Ao = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), { format: r, inspect: i } = Oo(), { codes: { ERR_INVALID_ARG_TYPE: a } } = ko(), { kResistStopPropagation: o, AggregateError: s, SymbolDispose: c } = Do(), l = globalThis.AbortSignal || (pa(), K(aa)).AbortSignal, u = globalThis.AbortController || (pa(), K(aa)).AbortController, d = Object.getPrototypeOf(async function() {}).constructor, f = globalThis.Blob || n.Blob, p = f === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof f;
	}, m = (e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new a(t, "AbortSignal", e);
	}, h = (e, t) => {
		if (typeof e != "function") throw new a(t, "Function", e);
	};
	t.exports = {
		AggregateError: s,
		kEmptyObject: Object.freeze({}),
		once(e) {
			let t = !1;
			return function(...n) {
				t || (t = !0, e.apply(this, n));
			};
		},
		createDeferredPromise: function() {
			let e, t;
			return {
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			};
		},
		promisify(e) {
			return new Promise((t, n) => {
				e((e, ...r) => e ? n(e) : t(...r));
			});
		},
		debuglog() {
			return function() {};
		},
		format: r,
		inspect: i,
		types: {
			isAsyncFunction(e) {
				return e instanceof d;
			},
			isArrayBufferView(e) {
				return ArrayBuffer.isView(e);
			}
		},
		isBlob: p,
		deprecate(e, t) {
			return e;
		},
		addAbortListener: q("events").addAbortListener || function(e, t) {
			if (e === void 0) throw new a("signal", "AbortSignal", e);
			m(e, "signal"), h(t, "listener");
			let n;
			return e.aborted ? queueMicrotask(() => t()) : (e.addEventListener("abort", t, {
				__proto__: null,
				once: !0,
				[o]: !0
			}), n = () => {
				e.removeEventListener("abort", t);
			}), {
				__proto__: null,
				[c]() {
					var e;
					(e = n) == null || e();
				}
			};
		},
		AbortSignalAny: l.any || function(e) {
			if (e.length === 1) return e[0];
			let t = new u(), n = () => t.abort();
			return e.forEach((e) => {
				m(e, "signals"), e.addEventListener("abort", n, { once: !0 });
			}), t.signal.addEventListener("abort", () => {
				e.forEach((e) => e.removeEventListener("abort", n));
			}, { once: !0 }), t.signal;
		}
	}, t.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
})), jo = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i, ArrayPrototypeMap: a, NumberIsInteger: o, NumberIsNaN: s, NumberMAX_SAFE_INTEGER: c, NumberMIN_SAFE_INTEGER: l, NumberParseInt: u, ObjectPrototypeHasOwnProperty: d, RegExpPrototypeExec: f, String: p, StringPrototypeToUpperCase: m, StringPrototypeTrim: h } = Do(), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: _, ERR_INVALID_ARG_TYPE: v, ERR_INVALID_ARG_VALUE: y, ERR_OUT_OF_RANGE: b, ERR_UNKNOWN_SIGNAL: x } } = ko(), { normalizeEncoding: S } = Ao(), { isAsyncFunction: C, isArrayBufferView: w } = Ao().types, T = {};
	function E(e) {
		return e === (e | 0);
	}
	function D(e) {
		return e === e >>> 0;
	}
	var O = /^[0-7]+$/, k = "must be a 32-bit unsigned integer or an octal string";
	function A(e, t, n) {
		if (e === void 0 && (e = n), typeof e == "string") {
			if (f(O, e) === null) throw new y(t, e, k);
			e = u(e, 8);
		}
		return N(e, t), e;
	}
	var j = g((e, t, n = l, r = c) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		if (e < n || e > r) throw new b(t, `>= ${n} && <= ${r}`, e);
	}), M = g((e, t, n = -2147483648, r = 2147483647) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		if (e < n || e > r) throw new b(t, `>= ${n} && <= ${r}`, e);
	}), N = g((e, t, n = !1) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		let r = +!!n, i = 4294967295;
		if (e < r || e > i) throw new b(t, `>= ${r} && <= ${i}`, e);
	});
	function P(e, t) {
		if (typeof e != "string") throw new v(t, "string", e);
	}
	function F(e, t, n = void 0, r) {
		if (typeof e != "number") throw new v(t, "number", e);
		if (n != null && e < n || r != null && e > r || (n != null || r != null) && s(e)) throw new b(t, `${n == null ? "" : `>= ${n}`}${n != null && r != null ? " && " : ""}${r == null ? "" : `<= ${r}`}`, e);
	}
	var I = g((e, t, n) => {
		if (!r(n, e)) throw new y(t, e, "must be one of: " + i(a(n, (e) => typeof e == "string" ? `'${e}'` : p(e)), ", "));
	});
	function L(e, t) {
		if (typeof e != "boolean") throw new v(t, "boolean", e);
	}
	function R(e, t, n) {
		return e == null || !d(e, t) ? n : e[t];
	}
	var z = g((e, t, r = null) => {
		let i = R(r, "allowArray", !1), a = R(r, "allowFunction", !1);
		if (!R(r, "nullable", !1) && e === null || !i && n(e) || typeof e != "object" && (!a || typeof e != "function")) throw new v(t, "Object", e);
	}), B = g((e, t) => {
		if (e != null && typeof e != "object" && typeof e != "function") throw new v(t, "a dictionary", e);
	}), V = g((e, t, r = 0) => {
		if (!n(e)) throw new v(t, "Array", e);
		if (e.length < r) throw new y(t, e, `must be longer than ${r}`);
	});
	function H(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) P(e[n], `${t}[${n}]`);
	}
	function U(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) L(e[n], `${t}[${n}]`);
	}
	function W(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = `${t}[${n}]`;
			if (r == null) throw new v(i, "AbortSignal", r);
			ee(r, i);
		}
	}
	function G(e, t = "signal") {
		if (P(e, t), T[e] === void 0) throw T[m(e)] === void 0 ? new x(e) : new x(e + " (signals must use all capital letters)");
	}
	var K = g((e, t = "buffer") => {
		if (!w(e)) throw new v(t, [
			"Buffer",
			"TypedArray",
			"DataView"
		], e);
	});
	function q(e, t) {
		let n = S(t), r = e.length;
		if (n === "hex" && r % 2 != 0) throw new y("encoding", t, `is invalid for data of length ${r}`);
	}
	function J(e, t = "Port", n = !0) {
		if (typeof e != "number" && typeof e != "string" || typeof e == "string" && h(e).length === 0 || +e != e >>> 0 || e > 65535 || e === 0 && !n) throw new _(t, e, n);
		return e | 0;
	}
	var ee = g((e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new v(t, "AbortSignal", e);
	}), te = g((e, t) => {
		if (typeof e != "function") throw new v(t, "Function", e);
	}), ne = g((e, t) => {
		if (typeof e != "function" || C(e)) throw new v(t, "Function", e);
	}), re = g((e, t) => {
		if (e !== void 0) throw new v(t, "undefined", e);
	});
	function ie(e, t, n) {
		if (!r(n, e)) throw new v(t, `('${i(n, "|")}')`, e);
	}
	var ae = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
	function oe(e, t) {
		if (e === void 0 || !f(ae, e)) throw new y(t, e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	function se(e) {
		if (typeof e == "string") return oe(e, "hints"), e;
		if (n(e)) {
			let t = e.length, n = "";
			if (t === 0) return n;
			for (let r = 0; r < t; r++) {
				let i = e[r];
				oe(i, "hints"), n += i, r !== t - 1 && (n += ", ");
			}
			return n;
		}
		throw new y("hints", e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	t.exports = {
		isInt32: E,
		isUint32: D,
		parseFileMode: A,
		validateArray: V,
		validateStringArray: H,
		validateBooleanArray: U,
		validateAbortSignalArray: W,
		validateBoolean: L,
		validateBuffer: K,
		validateDictionary: B,
		validateEncoding: q,
		validateFunction: te,
		validateInt32: M,
		validateInteger: j,
		validateNumber: F,
		validateObject: z,
		validateOneOf: I,
		validatePlainFunction: ne,
		validatePort: J,
		validateSignalName: G,
		validateString: P,
		validateUint32: N,
		validateUndefined: re,
		validateUnion: ie,
		validateAbortSignal: ee,
		validateLinkHeaderValue: se
	};
})), Mo = /* @__PURE__ */ H(((e, t) => {
	t.exports = ((e, t, n, r) => {
		if (t in e && e[t] === !0) {
			let t;
			for (let i of n) if (i in e && (t = e[i], r(t))) return t;
		}
		return e;
	})(ga(), "__esModule", ["default", "process"], (e) => "nextTick" in e);
})), No = /* @__PURE__ */ H(((e, t) => {
	var { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i } = Do(), a = i("nodejs.stream.destroyed"), o = i("nodejs.stream.errored"), s = i("nodejs.stream.readable"), c = i("nodejs.stream.writable"), l = i("nodejs.stream.disturbed"), u = i("nodejs.webstream.isClosedPromise"), d = i("nodejs.webstream.controllerErrorFunction");
	function f(e, t = !1) {
		return !!(e && typeof e.pipe == "function" && typeof e.on == "function" && (!t || typeof e.pause == "function" && typeof e.resume == "function") && (!e._writableState || e._readableState?.readable !== !1) && (!e._writableState || e._readableState));
	}
	function p(e) {
		return !!(e && typeof e.write == "function" && typeof e.on == "function" && (!e._readableState || e._writableState?.writable !== !1));
	}
	function m(e) {
		return !!(e && typeof e.pipe == "function" && e._readableState && typeof e.on == "function" && typeof e.write == "function");
	}
	function h(e) {
		return e && (e._readableState || e._writableState || typeof e.write == "function" && typeof e.on == "function" || typeof e.pipe == "function" && typeof e.on == "function");
	}
	function g(e) {
		return !!(e && !h(e) && typeof e.pipeThrough == "function" && typeof e.getReader == "function" && typeof e.cancel == "function");
	}
	function _(e) {
		return !!(e && !h(e) && typeof e.getWriter == "function" && typeof e.abort == "function");
	}
	function v(e) {
		return !!(e && !h(e) && typeof e.readable == "object" && typeof e.writable == "object");
	}
	function y(e) {
		return g(e) || _(e) || v(e);
	}
	function b(e, t) {
		return e == null ? !1 : t === !0 ? typeof e[n] == "function" : t === !1 ? typeof e[r] == "function" : typeof e[n] == "function" || typeof e[r] == "function";
	}
	function x(e) {
		if (!h(e)) return null;
		let t = e._writableState, n = e._readableState, r = t || n;
		return !!(e.destroyed || e[a] || r != null && r.destroyed);
	}
	function S(e) {
		if (!p(e)) return null;
		if (e.writableEnded === !0) return !0;
		let t = e._writableState;
		return t != null && t.errored ? !1 : typeof t?.ended == "boolean" ? t.ended : null;
	}
	function C(e, t) {
		if (!p(e)) return null;
		if (e.writableFinished === !0) return !0;
		let n = e._writableState;
		return n != null && n.errored ? !1 : typeof n?.finished == "boolean" ? !!(n.finished || t === !1 && n.ended === !0 && n.length === 0) : null;
	}
	function w(e) {
		if (!f(e)) return null;
		if (e.readableEnded === !0) return !0;
		let t = e._readableState;
		return !t || t.errored ? !1 : typeof t?.ended == "boolean" ? t.ended : null;
	}
	function T(e, t) {
		if (!f(e)) return null;
		let n = e._readableState;
		return n != null && n.errored ? !1 : typeof n?.endEmitted == "boolean" ? !!(n.endEmitted || t === !1 && n.ended === !0 && n.length === 0) : null;
	}
	function E(e) {
		return e && e[s] != null ? e[s] : typeof e?.readable == "boolean" ? x(e) ? !1 : f(e) && e.readable && !T(e) : null;
	}
	function D(e) {
		return e && e[c] != null ? e[c] : typeof e?.writable == "boolean" ? x(e) ? !1 : p(e) && e.writable && !S(e) : null;
	}
	function O(e, t) {
		return h(e) ? x(e) ? !0 : !(t?.readable !== !1 && E(e) || t?.writable !== !1 && D(e)) : null;
	}
	function k(e) {
		return h(e) ? e.writableErrored ? e.writableErrored : e._writableState?.errored ?? null : null;
	}
	function A(e) {
		return h(e) ? e.readableErrored ? e.readableErrored : e._readableState?.errored ?? null : null;
	}
	function j(e) {
		if (!h(e)) return null;
		if (typeof e.closed == "boolean") return e.closed;
		let t = e._writableState, n = e._readableState;
		return typeof t?.closed == "boolean" || typeof n?.closed == "boolean" ? t?.closed || n?.closed : typeof e._closed == "boolean" && M(e) ? e._closed : null;
	}
	function M(e) {
		return typeof e._closed == "boolean" && typeof e._defaultKeepAlive == "boolean" && typeof e._removedConnection == "boolean" && typeof e._removedContLen == "boolean";
	}
	function N(e) {
		return typeof e._sent100 == "boolean" && M(e);
	}
	function P(e) {
		return typeof e._consuming == "boolean" && typeof e._dumped == "boolean" && e.req?.upgradeOrConnect === void 0;
	}
	function F(e) {
		if (!h(e)) return null;
		let t = e._writableState, n = e._readableState, r = t || n;
		return !r && N(e) || !!(r && r.autoDestroy && r.emitClose && r.closed === !1);
	}
	function I(e) {
		return !!(e && (e[l] ?? (e.readableDidRead || e.readableAborted)));
	}
	function L(e) {
		return !!(e && (e[o] ?? e.readableErrored ?? e.writableErrored ?? e._readableState?.errorEmitted ?? e._writableState?.errorEmitted ?? e._readableState?.errored ?? e._writableState?.errored));
	}
	t.exports = {
		isDestroyed: x,
		kIsDestroyed: a,
		isDisturbed: I,
		kIsDisturbed: l,
		isErrored: L,
		kIsErrored: o,
		isReadable: E,
		kIsReadable: s,
		kIsClosedPromise: u,
		kControllerErrorFunction: d,
		kIsWritable: c,
		isClosed: j,
		isDuplexNodeStream: m,
		isFinished: O,
		isIterable: b,
		isReadableNodeStream: f,
		isReadableStream: g,
		isReadableEnded: w,
		isReadableFinished: T,
		isReadableErrored: A,
		isNodeStream: h,
		isWebStream: y,
		isWritable: D,
		isWritableNodeStream: p,
		isWritableStream: _,
		isWritableEnded: S,
		isWritableFinished: C,
		isWritableErrored: k,
		isServerRequest: P,
		isServerResponse: N,
		willEmitClose: F,
		isTransformStream: v
	};
})), Po = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), { AbortError: r, codes: i } = ko(), { ERR_INVALID_ARG_TYPE: a, ERR_STREAM_PREMATURE_CLOSE: o } = i, { kEmptyObject: s, once: c } = Ao(), { validateAbortSignal: l, validateFunction: u, validateObject: d, validateBoolean: f } = jo(), { Promise: p, PromisePrototypeThen: m, SymbolDispose: h } = Do(), { isClosed: g, isReadable: _, isReadableNodeStream: v, isReadableStream: y, isReadableFinished: b, isReadableErrored: x, isWritable: S, isWritableNodeStream: C, isWritableStream: w, isWritableFinished: T, isWritableErrored: E, isNodeStream: D, willEmitClose: O, kIsClosedPromise: k } = No(), A;
	function j(e) {
		return e.setHeader && typeof e.abort == "function";
	}
	var M = () => {};
	function N(e, t, i) {
		if (arguments.length === 2 ? (i = t, t = s) : t == null ? t = s : d(t, "options"), u(i, "callback"), l(t.signal, "options.signal"), i = c(i), y(e) || w(e)) return P(e, t, i);
		if (!D(e)) throw new a("stream", [
			"ReadableStream",
			"WritableStream",
			"Stream"
		], e);
		let f = t.readable ?? v(e), p = t.writable ?? C(e), m = e._writableState, k = e._readableState, N = () => {
			e.writable || L();
		}, F = O(e) && v(e) === f && C(e) === p, I = T(e, !1), L = () => {
			I = !0, e.destroyed && (F = !1), !(F && (!e.readable || f)) && (!f || R) && i.call(e);
		}, R = b(e, !1), z = () => {
			R = !0, e.destroyed && (F = !1), !(F && (!e.writable || p)) && (!p || I) && i.call(e);
		}, B = (t) => {
			i.call(e, t);
		}, V = g(e), H = () => {
			V = !0;
			let t = E(e) || x(e);
			if (t && typeof t != "boolean") return i.call(e, t);
			if (f && !R && v(e, !0) && !b(e, !1) || p && !I && !T(e, !1)) return i.call(e, new o());
			i.call(e);
		}, U = () => {
			V = !0;
			let t = E(e) || x(e);
			if (t && typeof t != "boolean") return i.call(e, t);
			i.call(e);
		}, W = () => {
			e.req.on("finish", L);
		};
		j(e) ? (e.on("complete", L), F || e.on("abort", H), e.req ? W() : e.on("request", W)) : p && !m && (e.on("end", N), e.on("close", N)), !F && typeof e.aborted == "boolean" && e.on("aborted", H), e.on("end", z), e.on("finish", L), t.error !== !1 && e.on("error", B), e.on("close", H), V ? n.nextTick(H) : m != null && m.errorEmitted || k != null && k.errorEmitted ? F || n.nextTick(U) : (!f && (!F || _(e)) && (I || S(e) === !1) || !p && (!F || S(e)) && (R || _(e) === !1) || k && e.req && e.aborted) && n.nextTick(U);
		let G = () => {
			i = M, e.removeListener("aborted", H), e.removeListener("complete", L), e.removeListener("abort", H), e.removeListener("request", W), e.req && e.req.removeListener("finish", L), e.removeListener("end", N), e.removeListener("close", N), e.removeListener("finish", L), e.removeListener("end", z), e.removeListener("error", B), e.removeListener("close", H);
		};
		if (t.signal && !V) {
			let a = () => {
				let n = i;
				G(), n.call(e, new r(void 0, { cause: t.signal.reason }));
			};
			if (t.signal.aborted) n.nextTick(a);
			else {
				A ||= Ao().addAbortListener;
				let n = A(t.signal, a), r = i;
				i = c((...t) => {
					n[h](), r.apply(e, t);
				});
			}
		}
		return G;
	}
	function P(e, t, i) {
		let a = !1, o = M;
		if (t.signal) if (o = () => {
			a = !0, i.call(e, new r(void 0, { cause: t.signal.reason }));
		}, t.signal.aborted) n.nextTick(o);
		else {
			A ||= Ao().addAbortListener;
			let n = A(t.signal, o), r = i;
			i = c((...t) => {
				n[h](), r.apply(e, t);
			});
		}
		let s = (...t) => {
			a || n.nextTick(() => i.apply(e, t));
		};
		return m(e[k].promise, s, s), M;
	}
	function F(e, t) {
		var n;
		let r = !1;
		return t === null && (t = s), (n = t) != null && n.cleanup && (f(t.cleanup, "cleanup"), r = t.cleanup), new p((n, i) => {
			let a = N(e, t, (e) => {
				r && a(), e ? i(e) : n();
			});
		});
	}
	t.exports = N, t.exports.finished = F;
})), Fo = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i }, AbortError: a } = ko(), { Symbol: o } = Do(), { kIsDestroyed: s, isDestroyed: c, isFinished: l, isServerRequest: u } = No(), d = o("kDestroy"), f = o("kConstruct");
	function p(e, t, n) {
		e && (e.stack, t && !t.errored && (t.errored = e), n && !n.errored && (n.errored = e));
	}
	function m(e, t) {
		let n = this._readableState, i = this._writableState, a = i || n;
		return i != null && i.destroyed || n != null && n.destroyed ? (typeof t == "function" && t(), this) : (p(e, i, n), i && (i.destroyed = !0), n && (n.destroyed = !0), a.constructed ? h(this, e, t) : this.once(d, function(n) {
			h(this, r(n, e), t);
		}), this);
	}
	function h(e, t, r) {
		let i = !1;
		function a(t) {
			if (i) return;
			i = !0;
			let a = e._readableState, o = e._writableState;
			p(t, o, a), o && (o.closed = !0), a && (a.closed = !0), typeof r == "function" && r(t), t ? n.nextTick(g, e, t) : n.nextTick(_, e);
		}
		try {
			e._destroy(t || null, a);
		} catch (e) {
			a(e);
		}
	}
	function g(e, t) {
		v(e, t), _(e);
	}
	function _(e) {
		let t = e._readableState, n = e._writableState;
		n && (n.closeEmitted = !0), t && (t.closeEmitted = !0), (n != null && n.emitClose || t != null && t.emitClose) && e.emit("close");
	}
	function v(e, t) {
		let n = e._readableState, r = e._writableState;
		r != null && r.errorEmitted || n != null && n.errorEmitted || (r && (r.errorEmitted = !0), n && (n.errorEmitted = !0), e.emit("error", t));
	}
	function y() {
		let e = this._readableState, t = this._writableState;
		e && (e.constructed = !0, e.closed = !1, e.closeEmitted = !1, e.destroyed = !1, e.errored = null, e.errorEmitted = !1, e.reading = !1, e.ended = e.readable === !1, e.endEmitted = e.readable === !1), t && (t.constructed = !0, t.destroyed = !1, t.closed = !1, t.closeEmitted = !1, t.errored = null, t.errorEmitted = !1, t.finalCalled = !1, t.prefinished = !1, t.ended = t.writable === !1, t.ending = t.writable === !1, t.finished = t.writable === !1);
	}
	function b(e, t, r) {
		let i = e._readableState, a = e._writableState;
		if (a != null && a.destroyed || i != null && i.destroyed) return this;
		i != null && i.autoDestroy || a != null && a.autoDestroy ? e.destroy(t) : t && (t.stack, a && !a.errored && (a.errored = t), i && !i.errored && (i.errored = t), r ? n.nextTick(v, e, t) : v(e, t));
	}
	function x(e, t) {
		if (typeof e._construct != "function") return;
		let r = e._readableState, i = e._writableState;
		r && (r.constructed = !1), i && (i.constructed = !1), e.once(f, t), !(e.listenerCount(f) > 1) && n.nextTick(S, e);
	}
	function S(e) {
		let t = !1;
		function r(r) {
			if (t) {
				b(e, r ?? new i());
				return;
			}
			t = !0;
			let a = e._readableState, o = e._writableState, s = o || a;
			a && (a.constructed = !0), o && (o.constructed = !0), s.destroyed ? e.emit(d, r) : r ? b(e, r, !0) : n.nextTick(C, e);
		}
		try {
			e._construct((e) => {
				n.nextTick(r, e);
			});
		} catch (e) {
			n.nextTick(r, e);
		}
	}
	function C(e) {
		e.emit(f);
	}
	function w(e) {
		return e?.setHeader && typeof e.abort == "function";
	}
	function T(e) {
		e.emit("close");
	}
	function E(e, t) {
		e.emit("error", t), n.nextTick(T, e);
	}
	function D(e, t) {
		!e || c(e) || (!t && !l(e) && (t = new a()), u(e) ? (e.socket = null, e.destroy(t)) : w(e) ? e.abort() : w(e.req) ? e.req.abort() : typeof e.destroy == "function" ? e.destroy(t) : typeof e.close == "function" ? e.close() : t ? n.nextTick(E, e, t) : n.nextTick(T, e), e.destroyed || (e[s] = !0));
	}
	t.exports = {
		construct: x,
		destroyer: D,
		destroy: m,
		undestroy: y,
		errorOrDestroy: b
	};
})), Io = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ObjectSetPrototypeOf: r } = Do(), { EventEmitter: i } = q("events");
	function a(e) {
		i.call(this, e);
	}
	r(a.prototype, i.prototype), r(a, i), a.prototype.pipe = function(e, t) {
		let n = this;
		function r(t) {
			e.writable && e.write(t) === !1 && n.pause && n.pause();
		}
		n.on("data", r);
		function i() {
			n.readable && n.resume && n.resume();
		}
		e.on("drain", i), !e._isStdio && (!t || t.end !== !1) && (n.on("end", s), n.on("close", c));
		let a = !1;
		function s() {
			a || (a = !0, e.end());
		}
		function c() {
			a || (a = !0, typeof e.destroy == "function" && e.destroy());
		}
		function l(e) {
			u(), this.listenerCount?.call(this, "error") === 0 && this.emit("error", e);
		}
		o(n, "error", l), o(e, "error", l);
		function u() {
			n.removeListener("data", r), e.removeListener("drain", i), n.removeListener("end", s), n.removeListener("close", c), n.removeListener("error", l), e.removeListener("error", l), n.removeListener("end", u), n.removeListener("close", u), e.removeListener("close", u);
		}
		return n.on("end", u), n.on("close", u), e.on("close", u), e.emit("pipe", n), e;
	};
	function o(e, t, r) {
		if (typeof e.prependListener == "function") return e.prependListener(t, r);
		!e._events || !e._events[t] ? e.on(t, r) : n(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]];
	}
	t.exports = {
		Stream: a,
		prependListener: o
	};
})), Lo = /* @__PURE__ */ H(((e, t) => {
	var { SymbolDispose: n } = Do(), { AbortError: r, codes: i } = ko(), { isNodeStream: a, isWebStream: o, kControllerErrorFunction: s } = No(), c = Po(), { ERR_INVALID_ARG_TYPE: l } = i, u, d = (e, t) => {
		if (typeof e != "object" || !("aborted" in e)) throw new l(t, "AbortSignal", e);
	};
	t.exports.addAbortSignal = function(e, n) {
		if (d(e, "signal"), !a(n) && !o(n)) throw new l("stream", [
			"ReadableStream",
			"WritableStream",
			"Stream"
		], n);
		return t.exports.addAbortSignalNoValidate(e, n);
	}, t.exports.addAbortSignalNoValidate = function(e, t) {
		if (typeof e != "object" || !("aborted" in e)) return t;
		let i = a(t) ? () => {
			t.destroy(new r(void 0, { cause: e.reason }));
		} : () => {
			t[s](new r(void 0, { cause: e.reason }));
		};
		return e.aborted ? i() : (u ||= Ao().addAbortListener, c(t, u(e, i)[n])), t;
	};
})), Ro = /* @__PURE__ */ H(((e, t) => {
	var { StringPrototypeSlice: n, SymbolIterator: r, TypedArrayPrototypeSet: i, Uint8Array: a } = Do(), { Buffer: o } = q("buffer"), { inspect: s } = Ao();
	t.exports = class {
		constructor() {
			this.head = null, this.tail = null, this.length = 0;
		}
		push(e) {
			let t = {
				data: e,
				next: null
			};
			this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
		}
		unshift(e) {
			let t = {
				data: e,
				next: this.head
			};
			this.length === 0 && (this.tail = t), this.head = t, ++this.length;
		}
		shift() {
			if (this.length === 0) return;
			let e = this.head.data;
			return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
		}
		clear() {
			this.head = this.tail = null, this.length = 0;
		}
		join(e) {
			if (this.length === 0) return "";
			let t = this.head, n = "" + t.data;
			for (; (t = t.next) !== null;) n += e + t.data;
			return n;
		}
		concat(e) {
			if (this.length === 0) return o.alloc(0);
			let t = o.allocUnsafe(e >>> 0), n = this.head, r = 0;
			for (; n;) i(t, n.data, r), r += n.data.length, n = n.next;
			return t;
		}
		consume(e, t) {
			let n = this.head.data;
			if (e < n.length) {
				let t = n.slice(0, e);
				return this.head.data = n.slice(e), t;
			}
			return e === n.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e);
		}
		first() {
			return this.head.data;
		}
		*[r]() {
			for (let e = this.head; e; e = e.next) yield e.data;
		}
		_getString(e) {
			let t = "", r = this.head, i = 0;
			do {
				let a = r.data;
				if (e > a.length) t += a, e -= a.length;
				else {
					e === a.length ? (t += a, ++i, r.next ? this.head = r.next : this.head = this.tail = null) : (t += n(a, 0, e), this.head = r, r.data = n(a, e));
					break;
				}
				++i;
			} while ((r = r.next) !== null);
			return this.length -= i, t;
		}
		_getBuffer(e) {
			let t = o.allocUnsafe(e), n = e, r = this.head, s = 0;
			do {
				let o = r.data;
				if (e > o.length) i(t, o, n - e), e -= o.length;
				else {
					e === o.length ? (i(t, o, n - e), ++s, r.next ? this.head = r.next : this.head = this.tail = null) : (i(t, new a(o.buffer, o.byteOffset, e), n - e), this.head = r, r.data = o.slice(e));
					break;
				}
				++s;
			} while ((r = r.next) !== null);
			return this.length -= s, t;
		}
		[Symbol.for("nodejs.util.inspect.custom")](e, t) {
			return s(this, {
				...t,
				depth: 0,
				customInspect: !1
			});
		}
	};
})), zo = /* @__PURE__ */ H(((e, t) => {
	var { MathFloor: n, NumberIsInteger: r } = Do(), { validateInteger: i } = jo(), { ERR_INVALID_ARG_VALUE: a } = ko().codes, o = 16 * 1024, s = 16;
	function c(e, t, n) {
		return e.highWaterMark == null ? t ? e[n] : null : e.highWaterMark;
	}
	function l(e) {
		return e ? s : o;
	}
	function u(e, t) {
		i(t, "value", 0), e ? s = t : o = t;
	}
	function d(e, t, i, o) {
		let s = c(t, o, i);
		if (s != null) {
			if (!r(s) || s < 0) throw new a(o ? `options.${i}` : "options.highWaterMark", s);
			return n(s);
		}
		return l(e.objectMode);
	}
	t.exports = {
		getHighWaterMark: d,
		getDefaultHighWaterMark: l,
		setDefaultHighWaterMark: u
	};
})), Bo = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), r = n.Buffer;
	function i(e, t) {
		for (var n in e) t[n] = e[n];
	}
	r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? t.exports = n : (i(n, e), e.Buffer = a);
	function a(e, t, n) {
		return r(e, t, n);
	}
	a.prototype = Object.create(r.prototype), i(r, a), a.from = function(e, t, n) {
		if (typeof e == "number") throw TypeError("Argument must not be a number");
		return r(e, t, n);
	}, a.alloc = function(e, t, n) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		var i = r(e);
		return t === void 0 ? i.fill(0) : typeof n == "string" ? i.fill(t, n) : i.fill(t), i;
	}, a.allocUnsafe = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return r(e);
	}, a.allocUnsafeSlow = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return n.SlowBuffer(e);
	};
})), Vo = /* @__PURE__ */ H(((e) => {
	var t = Bo().Buffer, n = t.isEncoding || function(e) {
		switch (e = "" + e, e && e.toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
			case "raw": return !0;
			default: return !1;
		}
	};
	function r(e) {
		if (!e) return "utf8";
		for (var t;;) switch (e) {
			case "utf8":
			case "utf-8": return "utf8";
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return "utf16le";
			case "latin1":
			case "binary": return "latin1";
			case "base64":
			case "ascii":
			case "hex": return e;
			default:
				if (t) return;
				e = ("" + e).toLowerCase(), t = !0;
		}
	}
	function i(e) {
		var i = r(e);
		if (typeof i != "string" && (t.isEncoding === n || !n(e))) throw Error("Unknown encoding: " + e);
		return i || e;
	}
	e.StringDecoder = a;
	function a(e) {
		this.encoding = i(e);
		var n;
		switch (this.encoding) {
			case "utf16le":
				this.text = f, this.end = p, n = 4;
				break;
			case "utf8":
				this.fillLast = l, n = 4;
				break;
			case "base64":
				this.text = m, this.end = h, n = 3;
				break;
			default:
				this.write = g, this.end = _;
				return;
		}
		this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(n);
	}
	a.prototype.write = function(e) {
		if (e.length === 0) return "";
		var t, n;
		if (this.lastNeed) {
			if (t = this.fillLast(e), t === void 0) return "";
			n = this.lastNeed, this.lastNeed = 0;
		} else n = 0;
		return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || "";
	}, a.prototype.end = d, a.prototype.text = u, a.prototype.fillLast = function(e) {
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
	};
	function o(e) {
		return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
	}
	function s(e, t, n) {
		var r = t.length - 1;
		if (r < n) return 0;
		var i = o(t[r]);
		return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (i === 2 ? i = 0 : e.lastNeed = i - 3), i) : 0));
	}
	function c(e, t, n) {
		if ((t[0] & 192) != 128) return e.lastNeed = 0, "�";
		if (e.lastNeed > 1 && t.length > 1) {
			if ((t[1] & 192) != 128) return e.lastNeed = 1, "�";
			if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) != 128) return e.lastNeed = 2, "�";
		}
	}
	function l(e) {
		var t = this.lastTotal - this.lastNeed, n = c(this, e, t);
		if (n !== void 0) return n;
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length;
	}
	function u(e, t) {
		var n = s(this, e, t);
		if (!this.lastNeed) return e.toString("utf8", t);
		this.lastTotal = n;
		var r = e.length - (n - this.lastNeed);
		return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r);
	}
	function d(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + "�" : t;
	}
	function f(e, t) {
		if ((e.length - t) % 2 == 0) {
			var n = e.toString("utf16le", t);
			if (n) {
				var r = n.charCodeAt(n.length - 1);
				if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1);
			}
			return n;
		}
		return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
	}
	function p(e) {
		var t = e && e.length ? this.write(e) : "";
		if (this.lastNeed) {
			var n = this.lastTotal - this.lastNeed;
			return t + this.lastChar.toString("utf16le", 0, n);
		}
		return t;
	}
	function m(e, t) {
		var n = (e.length - t) % 3;
		return n === 0 ? e.toString("base64", t) : (this.lastNeed = 3 - n, this.lastTotal = 3, n === 1 ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - n));
	}
	function h(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
	}
	function g(e) {
		return e.toString(this.encoding);
	}
	function _(e) {
		return e && e.length ? this.write(e) : "";
	}
})), Ho = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), { PromisePrototypeThen: r, SymbolAsyncIterator: i, SymbolIterator: a } = Do(), { Buffer: o } = q("buffer"), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: c } = ko().codes;
	function l(e, t, l) {
		let u;
		if (typeof t == "string" || t instanceof o) return new e({
			objectMode: !0,
			...l,
			read() {
				this.push(t), this.push(null);
			}
		});
		let d;
		if (t && t[i]) d = !0, u = t[i]();
		else if (t && t[a]) d = !1, u = t[a]();
		else throw new s("iterable", ["Iterable"], t);
		let f = new e({
			objectMode: !0,
			highWaterMark: 1,
			...l
		}), p = !1;
		f._read = function() {
			p || (p = !0, h());
		}, f._destroy = function(e, t) {
			r(m(e), () => n.nextTick(t, e), (r) => n.nextTick(t, r || e));
		};
		async function m(e) {
			let t = e != null, n = typeof u.throw == "function";
			if (t && n) {
				let { value: t, done: n } = await u.throw(e);
				if (await t, n) return;
			}
			if (typeof u.return == "function") {
				let { value: e } = await u.return();
				await e;
			}
		}
		async function h() {
			for (;;) {
				try {
					let { value: e, done: t } = d ? await u.next() : u.next();
					if (t) f.push(null);
					else {
						let t = e && typeof e.then == "function" ? await e : e;
						if (t === null) throw p = !1, new c();
						if (f.push(t)) continue;
						p = !1;
					}
				} catch (e) {
					f.destroy(e);
				}
				break;
			}
		}
		return f;
	}
	t.exports = l;
})), Uo = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), { ArrayPrototypeIndexOf: r, NumberIsInteger: i, NumberIsNaN: a, NumberParseInt: o, ObjectDefineProperties: s, ObjectKeys: c, ObjectSetPrototypeOf: l, Promise: u, SafeSet: d, SymbolAsyncDispose: f, SymbolAsyncIterator: p, Symbol: m } = Do();
	t.exports = X, X.ReadableState = ue;
	var { EventEmitter: h } = q("events"), { Stream: g, prependListener: _ } = Io(), { Buffer: v } = q("buffer"), { addAbortSignal: y } = Lo(), b = Po(), x = Ao().debuglog("stream", (e) => {
		x = e;
	}), S = Ro(), C = Fo(), { getHighWaterMark: w, getDefaultHighWaterMark: T } = zo(), { aggregateTwoErrors: E, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: O, ERR_OUT_OF_RANGE: k, ERR_STREAM_PUSH_AFTER_EOF: A, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: j }, AbortError: M } = ko(), { validateObject: N } = jo(), P = m("kPaused"), { StringDecoder: F } = Vo(), I = Ho();
	l(X.prototype, g.prototype), l(X, g);
	var L = () => {}, { errorOrDestroy: R } = C, z = 1, B = 2, V = 4, H = 8, U = 16, W = 32, G = 64, K = 128, J = 256, ee = 512, te = 1024, ne = 2048, re = 4096, ie = 8192, ae = 16384, oe = 32768, se = 65536, ce = 1 << 17, le = 1 << 18;
	function Y(e) {
		return {
			enumerable: !1,
			get() {
				return (this.state & e) !== 0;
			},
			set(t) {
				t ? this.state |= e : this.state &= ~e;
			}
		};
	}
	s(ue.prototype, {
		objectMode: Y(z),
		ended: Y(B),
		endEmitted: Y(V),
		reading: Y(H),
		constructed: Y(U),
		sync: Y(W),
		needReadable: Y(G),
		emittedReadable: Y(K),
		readableListening: Y(J),
		resumeScheduled: Y(ee),
		errorEmitted: Y(te),
		emitClose: Y(ne),
		autoDestroy: Y(re),
		destroyed: Y(ie),
		closed: Y(ae),
		closeEmitted: Y(oe),
		multiAwaitDrain: Y(se),
		readingMore: Y(ce),
		dataEmitted: Y(le)
	});
	function ue(e, t, n) {
		typeof n != "boolean" && (n = t instanceof Ko()), this.state = 6192, e && e.objectMode && (this.state |= z), n && e && e.readableObjectMode && (this.state |= z), this.highWaterMark = e ? w(this, e, "readableHighWaterMark", n) : T(!1), this.buffer = new S(), this.length = 0, this.pipes = [], this.flowing = null, this[P] = null, e && e.emitClose === !1 && (this.state &= -2049), e && e.autoDestroy === !1 && (this.state &= -4097), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new F(e.encoding), this.encoding = e.encoding);
	}
	function X(e) {
		if (!(this instanceof X)) return new X(e);
		let t = this instanceof Ko();
		this._readableState = new ue(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && y(e.signal, this)), g.call(this, e), C.construct(this, () => {
			this._readableState.needReadable && ye(this, this._readableState);
		});
	}
	X.prototype.destroy = C.destroy, X.prototype._undestroy = C.undestroy, X.prototype._destroy = function(e, t) {
		t(e);
	}, X.prototype[h.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	}, X.prototype[f] = function() {
		let e;
		return this.destroyed || (e = this.readableEnded ? null : new M(), this.destroy(e)), new u((t, n) => b(this, (r) => r && r !== e ? n(r) : t(null)));
	}, X.prototype.push = function(e, t) {
		return de(this, e, t, !1);
	}, X.prototype.unshift = function(e, t) {
		return de(this, e, t, !0);
	};
	function de(e, t, n, r) {
		x("readableAddChunk", t);
		let i = e._readableState, a;
		if ((i.state & z) === 0 && (typeof t == "string" ? (n ||= i.defaultEncoding, i.encoding !== n && (r && i.encoding ? t = v.from(t, n).toString(i.encoding) : (t = v.from(t, n), n = ""))) : t instanceof v ? n = "" : g._isUint8Array(t) ? (t = g._uint8ArrayToBuffer(t), n = "") : t != null && (a = new D("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], t))), a) R(e, a);
		else if (t === null) i.state &= -9, ge(e, i);
		else if ((i.state & z) !== 0 || t && t.length > 0) if (r) if ((i.state & V) !== 0) R(e, new j());
		else if (i.destroyed || i.errored) return !1;
		else fe(e, i, t, !0);
		else if (i.ended) R(e, new A());
		else if (i.destroyed || i.errored) return !1;
		else i.state &= -9, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? fe(e, i, t, !1) : ye(e, i)) : fe(e, i, t, !1);
		else r || (i.state &= -9, ye(e, i));
		return !i.ended && (i.length < i.highWaterMark || i.length === 0);
	}
	function fe(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & se) === 0 ? t.awaitDrainWriters = null : t.awaitDrainWriters.clear(), t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), (t.state & G) !== 0 && _e(e)), ye(e, t);
	}
	X.prototype.isPaused = function() {
		let e = this._readableState;
		return e[P] === !0 || e.flowing === !1;
	}, X.prototype.setEncoding = function(e) {
		let t = new F(e);
		this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
		let n = this._readableState.buffer, r = "";
		for (let e of n) r += t.write(e);
		return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
	};
	var pe = 1073741824;
	function me(e) {
		if (e > pe) throw new k("size", "<= 1GiB", e);
		return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
	}
	function he(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & z) === 0 ? a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0 : 1;
	}
	X.prototype.read = function(e) {
		x("read", e), e === void 0 ? e = NaN : i(e) || (e = o(e, 10));
		let t = this._readableState, n = e;
		if (e > t.highWaterMark && (t.highWaterMark = me(e)), e !== 0 && (t.state &= -129), e === 0 && t.needReadable && ((t.highWaterMark === 0 ? t.length > 0 : t.length >= t.highWaterMark) || t.ended)) return x("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? Ae(this) : _e(this), null;
		if (e = he(e, t), e === 0 && t.ended) return t.length === 0 && Ae(this), null;
		let r = (t.state & G) !== 0;
		if (x("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, x("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, x("reading, ended or constructing", r);
		else if (r) {
			x("do read"), t.state |= 40, t.length === 0 && (t.state |= G);
			try {
				this._read(t.highWaterMark);
			} catch (e) {
				R(this, e);
			}
			t.state &= -33, t.reading || (e = he(n, t));
		}
		let a;
		return a = e > 0 ? ke(e, t) : null, a === null ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), t.length === 0 && (t.ended || (t.needReadable = !0), n !== e && t.ended && Ae(this)), a !== null && !t.errorEmitted && !t.closeEmitted && (t.dataEmitted = !0, this.emit("data", a)), a;
	};
	function ge(e, t) {
		if (x("onEofChunk"), !t.ended) {
			if (t.decoder) {
				let e = t.decoder.end();
				e && e.length && (t.buffer.push(e), t.length += t.objectMode ? 1 : e.length);
			}
			t.ended = !0, t.sync ? _e(e) : (t.needReadable = !1, t.emittedReadable = !0, ve(e));
		}
	}
	function _e(e) {
		let t = e._readableState;
		x("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (x("emitReadable", t.flowing), t.emittedReadable = !0, n.nextTick(ve, e));
	}
	function ve(e) {
		let t = e._readableState;
		x("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && !t.errored && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, Ee(e);
	}
	function ye(e, t) {
		!t.readingMore && t.constructed && (t.readingMore = !0, n.nextTick(be, e, t));
	}
	function be(e, t) {
		for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && t.length === 0);) {
			let n = t.length;
			if (x("maybeReadMore read 0"), e.read(0), n === t.length) break;
		}
		t.readingMore = !1;
	}
	X.prototype._read = function(e) {
		throw new O("_read()");
	}, X.prototype.pipe = function(e, t) {
		let r = this, i = this._readableState;
		i.pipes.length === 1 && (i.multiAwaitDrain || (i.multiAwaitDrain = !0, i.awaitDrainWriters = new d(i.awaitDrainWriters ? [i.awaitDrainWriters] : []))), i.pipes.push(e), x("pipe count=%d opts=%j", i.pipes.length, t);
		let a = (!t || t.end !== !1) && e !== n.stdout && e !== n.stderr ? s : v;
		i.endEmitted ? n.nextTick(a) : r.once("end", a), e.on("unpipe", o);
		function o(e, t) {
			x("onunpipe"), e === r && t && t.hasUnpiped === !1 && (t.hasUnpiped = !0, u());
		}
		function s() {
			x("onend"), e.end();
		}
		let c, l = !1;
		function u() {
			x("cleanup"), e.removeListener("close", h), e.removeListener("finish", g), c && e.removeListener("drain", c), e.removeListener("error", m), e.removeListener("unpipe", o), r.removeListener("end", s), r.removeListener("end", v), r.removeListener("data", p), l = !0, c && i.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && c();
		}
		function f() {
			l || (i.pipes.length === 1 && i.pipes[0] === e ? (x("false write response, pause", 0), i.awaitDrainWriters = e, i.multiAwaitDrain = !1) : i.pipes.length > 1 && i.pipes.includes(e) && (x("false write response, pause", i.awaitDrainWriters.size), i.awaitDrainWriters.add(e)), r.pause()), c || (c = xe(r, e), e.on("drain", c));
		}
		r.on("data", p);
		function p(t) {
			x("ondata");
			let n = e.write(t);
			x("dest.write", n), n === !1 && f();
		}
		function m(t) {
			if (x("onerror", t), v(), e.removeListener("error", m), e.listenerCount("error") === 0) {
				let n = e._writableState || e._readableState;
				n && !n.errorEmitted ? R(e, t) : e.emit("error", t);
			}
		}
		_(e, "error", m);
		function h() {
			e.removeListener("finish", g), v();
		}
		e.once("close", h);
		function g() {
			x("onfinish"), e.removeListener("close", h), v();
		}
		e.once("finish", g);
		function v() {
			x("unpipe"), r.unpipe(e);
		}
		return e.emit("pipe", r), e.writableNeedDrain === !0 ? f() : i.flowing || (x("pipe resume"), r.resume()), e;
	};
	function xe(e, t) {
		return function() {
			let n = e._readableState;
			n.awaitDrainWriters === t ? (x("pipeOnDrain", 1), n.awaitDrainWriters = null) : n.multiAwaitDrain && (x("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(t)), (!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) && e.listenerCount("data") && e.resume();
		};
	}
	X.prototype.unpipe = function(e) {
		let t = this._readableState, n = { hasUnpiped: !1 };
		if (t.pipes.length === 0) return this;
		if (!e) {
			let e = t.pipes;
			t.pipes = [], this.pause();
			for (let t = 0; t < e.length; t++) e[t].emit("unpipe", this, { hasUnpiped: !1 });
			return this;
		}
		let i = r(t.pipes, e);
		return i === -1 ? this : (t.pipes.splice(i, 1), t.pipes.length === 0 && this.pause(), e.emit("unpipe", this, n), this);
	}, X.prototype.on = function(e, t) {
		let r = g.prototype.on.call(this, e, t), i = this._readableState;
		return e === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== !1 && this.resume()) : e === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, x("on readable", i.length, i.reading), i.length ? _e(this) : i.reading || n.nextTick(Ce, this)), r;
	}, X.prototype.addListener = X.prototype.on, X.prototype.removeListener = function(e, t) {
		let r = g.prototype.removeListener.call(this, e, t);
		return e === "readable" && n.nextTick(Se, this), r;
	}, X.prototype.off = X.prototype.removeListener, X.prototype.removeAllListeners = function(e) {
		let t = g.prototype.removeAllListeners.apply(this, arguments);
		return (e === "readable" || e === void 0) && n.nextTick(Se, this), t;
	};
	function Se(e) {
		let t = e._readableState;
		t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && t[P] === !1 ? t.flowing = !0 : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null);
	}
	function Ce(e) {
		x("readable nexttick read 0"), e.read(0);
	}
	X.prototype.resume = function() {
		let e = this._readableState;
		return e.flowing || (x("resume"), e.flowing = !e.readableListening, we(this, e)), e[P] = !1, this;
	};
	function we(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(Te, e, t));
	}
	function Te(e, t) {
		x("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), Ee(e), t.flowing && !t.reading && e.read(0);
	}
	X.prototype.pause = function() {
		return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[P] = !0, this;
	};
	function Ee(e) {
		let t = e._readableState;
		for (x("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	X.prototype.wrap = function(e) {
		let t = !1;
		e.on("data", (n) => {
			!this.push(n) && e.pause && (t = !0, e.pause());
		}), e.on("end", () => {
			this.push(null);
		}), e.on("error", (e) => {
			R(this, e);
		}), e.on("close", () => {
			this.destroy();
		}), e.on("destroy", () => {
			this.destroy();
		}), this._read = () => {
			t && e.resume && (t = !1, e.resume());
		};
		let n = c(e);
		for (let t = 1; t < n.length; t++) {
			let r = n[t];
			this[r] === void 0 && typeof e[r] == "function" && (this[r] = e[r].bind(e));
		}
		return this;
	}, X.prototype[p] = function() {
		return De(this);
	}, X.prototype.iterator = function(e) {
		return e !== void 0 && N(e, "options"), De(this, e);
	};
	function De(e, t) {
		typeof e.read != "function" && (e = X.wrap(e, { objectMode: !0 }));
		let n = Oe(e, t);
		return n.stream = e, n;
	}
	async function* Oe(e, t) {
		let n = L;
		function r(t) {
			this === e ? (n(), n = L) : n = t;
		}
		e.on("readable", r);
		let i, a = b(e, { writable: !1 }, (e) => {
			i = e ? E(i, e) : null, n(), n = L;
		});
		try {
			for (;;) {
				let t = e.destroyed ? null : e.read();
				if (t !== null) yield t;
				else if (i) throw i;
				else if (i === null) return;
				else await new u(r);
			}
		} catch (e) {
			throw i = E(i, e), i;
		} finally {
			(i || t?.destroyOnReturn !== !1) && (i === void 0 || e._readableState.autoDestroy) ? C.destroyer(e, null) : (e.off("readable", r), a());
		}
	}
	s(X.prototype, {
		readable: {
			__proto__: null,
			get() {
				let e = this._readableState;
				return !!e && e.readable !== !1 && !e.destroyed && !e.errorEmitted && !e.endEmitted;
			},
			set(e) {
				this._readableState && (this._readableState.readable = !!e);
			}
		},
		readableDidRead: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.dataEmitted;
			}
		},
		readableAborted: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return !!(this._readableState.readable !== !1 && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
			}
		},
		readableHighWaterMark: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.highWaterMark;
			}
		},
		readableBuffer: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState && this._readableState.buffer;
			}
		},
		readableFlowing: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.flowing;
			},
			set: function(e) {
				this._readableState && (this._readableState.flowing = e);
			}
		},
		readableLength: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState.length;
			}
		},
		readableObjectMode: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.objectMode : !1;
			}
		},
		readableEncoding: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.encoding : null;
			}
		},
		errored: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.errored : null;
			}
		},
		closed: {
			__proto__: null,
			get() {
				return this._readableState ? this._readableState.closed : !1;
			}
		},
		destroyed: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.destroyed : !1;
			},
			set(e) {
				this._readableState && (this._readableState.destroyed = e);
			}
		},
		readableEnded: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.endEmitted : !1;
			}
		}
	}), s(ue.prototype, {
		pipesCount: {
			__proto__: null,
			get() {
				return this.pipes.length;
			}
		},
		paused: {
			__proto__: null,
			get() {
				return this[P] !== !1;
			},
			set(e) {
				this[P] = !!e;
			}
		}
	}), X._fromList = ke;
	function ke(e, t) {
		if (t.length === 0) return null;
		let n;
		return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : t.buffer.length === 1 ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n;
	}
	function Ae(e) {
		let t = e._readableState;
		x("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, n.nextTick(je, t, e));
	}
	function je(e, t) {
		if (x("endReadableNT", e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
			if (e.endEmitted = !0, t.emit("end"), t.writable && t.allowHalfOpen === !1) n.nextTick(Me, t);
			else if (e.autoDestroy) {
				let e = t._writableState;
				(!e || e.autoDestroy && (e.finished || e.writable === !1)) && t.destroy();
			}
		}
	}
	function Me(e) {
		e.writable && !e.writableEnded && !e.destroyed && e.end();
	}
	X.from = function(e, t) {
		return I(X, e, t);
	};
	var Ne;
	function Pe() {
		return Ne === void 0 && (Ne = {}), Ne;
	}
	X.fromWeb = function(e, t) {
		return Pe().newStreamReadableFromReadableStream(e, t);
	}, X.toWeb = function(e, t) {
		return Pe().newReadableStreamFromStreamReadable(e, t);
	}, X.wrap = function(e, t) {
		return new X({
			objectMode: e.readableObjectMode ?? e.objectMode ?? !0,
			...t,
			destroy(t, n) {
				C.destroyer(e, t), n(t);
			}
		}).wrap(e);
	};
})), Wo = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), { ArrayPrototypeSlice: r, Error: i, FunctionPrototypeSymbolHasInstance: a, ObjectDefineProperty: o, ObjectDefineProperties: s, ObjectSetPrototypeOf: c, StringPrototypeToLowerCase: l, Symbol: u, SymbolHasInstance: d } = Do();
	t.exports = N, N.WritableState = j;
	var { EventEmitter: f } = q("events"), p = Io().Stream, { Buffer: m } = q("buffer"), h = Fo(), { addAbortSignal: g } = Lo(), { getHighWaterMark: _, getDefaultHighWaterMark: v } = zo(), { ERR_INVALID_ARG_TYPE: y, ERR_METHOD_NOT_IMPLEMENTED: b, ERR_MULTIPLE_CALLBACK: x, ERR_STREAM_CANNOT_PIPE: S, ERR_STREAM_DESTROYED: C, ERR_STREAM_ALREADY_FINISHED: w, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: E, ERR_UNKNOWN_ENCODING: D } = ko().codes, { errorOrDestroy: O } = h;
	c(N.prototype, p.prototype), c(N, p);
	function k() {}
	var A = u("kOnFinished");
	function j(e, t, n) {
		typeof n != "boolean" && (n = t instanceof Ko()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", n) : v(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
		let r = !!(e && e.decodeStrings === !1);
		this.decodeStrings = !r, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = R.bind(void 0, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, M(this), this.pendingcb = 0, this.constructed = !0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !e || e.emitClose !== !1, this.autoDestroy = !e || e.autoDestroy !== !1, this.errored = null, this.closed = !1, this.closeEmitted = !1, this[A] = [];
	}
	function M(e) {
		e.buffered = [], e.bufferedIndex = 0, e.allBuffers = !0, e.allNoop = !0;
	}
	j.prototype.getBuffer = function() {
		return r(this.buffered, this.bufferedIndex);
	}, o(j.prototype, "bufferedRequestCount", {
		__proto__: null,
		get() {
			return this.buffered.length - this.bufferedIndex;
		}
	});
	function N(e) {
		let t = this instanceof Ko();
		if (!t && !a(N, this)) return new N(e);
		this._writableState = new j(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && g(e.signal, this)), p.call(this, e), h.construct(this, () => {
			let e = this._writableState;
			e.writing || H(this, e), K(this, e);
		});
	}
	o(N, d, {
		__proto__: null,
		value: function(e) {
			return a(this, e) ? !0 : this === N ? e && e._writableState instanceof j : !1;
		}
	}), N.prototype.pipe = function() {
		O(this, new S());
	};
	function P(e, t, r, i) {
		let a = e._writableState;
		if (typeof r == "function") i = r, r = a.defaultEncoding;
		else {
			if (!r) r = a.defaultEncoding;
			else if (r !== "buffer" && !m.isEncoding(r)) throw new D(r);
			typeof i != "function" && (i = k);
		}
		if (t === null) throw new T();
		if (!a.objectMode) if (typeof t == "string") a.decodeStrings !== !1 && (t = m.from(t, r), r = "buffer");
		else if (t instanceof m) r = "buffer";
		else if (p._isUint8Array(t)) t = p._uint8ArrayToBuffer(t), r = "buffer";
		else throw new y("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], t);
		let o;
		return a.ending ? o = new E() : a.destroyed && (o = new C("write")), o ? (n.nextTick(i, o), O(e, o, !0), o) : (a.pendingcb++, F(e, a, t, r, i));
	}
	N.prototype.write = function(e, t, n) {
		return P(this, e, t, n) === !0;
	}, N.prototype.cork = function() {
		this._writableState.corked++;
	}, N.prototype.uncork = function() {
		let e = this._writableState;
		e.corked && (e.corked--, e.writing || H(this, e));
	}, N.prototype.setDefaultEncoding = function(e) {
		if (typeof e == "string" && (e = l(e)), !m.isEncoding(e)) throw new D(e);
		return this._writableState.defaultEncoding = e, this;
	};
	function F(e, t, n, r, i) {
		let a = t.objectMode ? 1 : n.length;
		t.length += a;
		let o = t.length < t.highWaterMark;
		return o || (t.needDrain = !0), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({
			chunk: n,
			encoding: r,
			callback: i
		}), t.allBuffers && r !== "buffer" && (t.allBuffers = !1), t.allNoop && i !== k && (t.allNoop = !1)) : (t.writelen = a, t.writecb = i, t.writing = !0, t.sync = !0, e._write(n, r, t.onwrite), t.sync = !1), o && !t.errored && !t.destroyed;
	}
	function I(e, t, n, r, i, a, o) {
		t.writelen = r, t.writecb = o, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new C("write")) : n ? e._writev(i, t.onwrite) : e._write(i, a, t.onwrite), t.sync = !1;
	}
	function L(e, t, n, r) {
		--t.pendingcb, r(n), V(t), O(e, n);
	}
	function R(e, t) {
		let r = e._writableState, i = r.sync, a = r.writecb;
		if (typeof a != "function") {
			O(e, new x());
			return;
		}
		r.writing = !1, r.writecb = null, r.length -= r.writelen, r.writelen = 0, t ? (t.stack, r.errored ||= t, e._readableState && !e._readableState.errored && (e._readableState.errored = t), i ? n.nextTick(L, e, r, t, a) : L(e, r, t, a)) : (r.buffered.length > r.bufferedIndex && H(e, r), i ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === a ? r.afterWriteTickInfo.count++ : (r.afterWriteTickInfo = {
			count: 1,
			cb: a,
			stream: e,
			state: r
		}, n.nextTick(z, r.afterWriteTickInfo)) : B(e, r, 1, a));
	}
	function z({ stream: e, state: t, count: n, cb: r }) {
		return t.afterWriteTickInfo = null, B(e, t, n, r);
	}
	function B(e, t, n, r) {
		for (!t.ending && !e.destroyed && t.length === 0 && t.needDrain && (t.needDrain = !1, e.emit("drain")); n-- > 0;) t.pendingcb--, r();
		t.destroyed && V(t), K(e, t);
	}
	function V(e) {
		if (e.writing) return;
		for (let t = e.bufferedIndex; t < e.buffered.length; ++t) {
			let { chunk: n, callback: r } = e.buffered[t], i = e.objectMode ? 1 : n.length;
			e.length -= i, r(e.errored ?? new C("write"));
		}
		let t = e[A].splice(0);
		for (let n = 0; n < t.length; n++) t[n](e.errored ?? new C("end"));
		M(e);
	}
	function H(e, t) {
		if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
		let { buffered: n, bufferedIndex: i, objectMode: a } = t, o = n.length - i;
		if (!o) return;
		let s = i;
		if (t.bufferProcessing = !0, o > 1 && e._writev) {
			t.pendingcb -= o - 1;
			let i = t.allNoop ? k : (e) => {
				for (let t = s; t < n.length; ++t) n[t].callback(e);
			}, a = t.allNoop && s === 0 ? n : r(n, s);
			a.allBuffers = t.allBuffers, I(e, t, !0, t.length, a, "", i), M(t);
		} else {
			do {
				let { chunk: r, encoding: i, callback: o } = n[s];
				n[s++] = null, I(e, t, !1, a ? 1 : r.length, r, i, o);
			} while (s < n.length && !t.writing);
			s === n.length ? M(t) : s > 256 ? (n.splice(0, s), t.bufferedIndex = 0) : t.bufferedIndex = s;
		}
		t.bufferProcessing = !1;
	}
	N.prototype._write = function(e, t, n) {
		if (this._writev) this._writev([{
			chunk: e,
			encoding: t
		}], n);
		else throw new b("_write()");
	}, N.prototype._writev = null, N.prototype.end = function(e, t, r) {
		let a = this._writableState;
		typeof e == "function" ? (r = e, e = null, t = null) : typeof t == "function" && (r = t, t = null);
		let o;
		if (e != null) {
			let n = P(this, e, t);
			n instanceof i && (o = n);
		}
		return a.corked && (a.corked = 1, this.uncork()), o || (!a.errored && !a.ending ? (a.ending = !0, K(this, a, !0), a.ended = !0) : a.finished ? o = new w("end") : a.destroyed && (o = new C("end"))), typeof r == "function" && (o || a.finished ? n.nextTick(r, o) : a[A].push(r)), this;
	};
	function U(e) {
		return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
	}
	function W(e, t) {
		let r = !1;
		function i(i) {
			if (r) {
				O(e, i ?? x());
				return;
			}
			if (r = !0, t.pendingcb--, i) {
				let n = t[A].splice(0);
				for (let e = 0; e < n.length; e++) n[e](i);
				O(e, i, t.sync);
			} else U(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, n.nextTick(J, e, t));
		}
		t.sync = !0, t.pendingcb++;
		try {
			e._final(i);
		} catch (e) {
			i(e);
		}
		t.sync = !1;
	}
	function G(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, W(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function K(e, t, r) {
		U(t) && (G(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, n.nextTick((e, t) => {
			U(t) ? J(e, t) : t.pendingcb--;
		}, e, t)) : U(t) && (t.pendingcb++, J(e, t))));
	}
	function J(e, t) {
		t.pendingcb--, t.finished = !0;
		let n = t[A].splice(0);
		for (let e = 0; e < n.length; e++) n[e]();
		if (e.emit("finish"), t.autoDestroy) {
			let t = e._readableState;
			(!t || t.autoDestroy && (t.endEmitted || t.readable === !1)) && e.destroy();
		}
	}
	s(N.prototype, {
		closed: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.closed : !1;
			}
		},
		destroyed: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.destroyed : !1;
			},
			set(e) {
				this._writableState && (this._writableState.destroyed = e);
			}
		},
		writable: {
			__proto__: null,
			get() {
				let e = this._writableState;
				return !!e && e.writable !== !1 && !e.destroyed && !e.errored && !e.ending && !e.ended;
			},
			set(e) {
				this._writableState && (this._writableState.writable = !!e);
			}
		},
		writableFinished: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.finished : !1;
			}
		},
		writableObjectMode: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.objectMode : !1;
			}
		},
		writableBuffer: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.getBuffer();
			}
		},
		writableEnded: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.ending : !1;
			}
		},
		writableNeedDrain: {
			__proto__: null,
			get() {
				let e = this._writableState;
				return e ? !e.destroyed && !e.ending && e.needDrain : !1;
			}
		},
		writableHighWaterMark: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.highWaterMark;
			}
		},
		writableCorked: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.corked : 0;
			}
		},
		writableLength: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.length;
			}
		},
		errored: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._writableState ? this._writableState.errored : null;
			}
		},
		writableAborted: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return !!(this._writableState.writable !== !1 && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
			}
		}
	});
	var ee = h.destroy;
	N.prototype.destroy = function(e, t) {
		let r = this._writableState;
		return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[A].length) && n.nextTick(V, r), ee.call(this, e, t), this;
	}, N.prototype._undestroy = h.undestroy, N.prototype._destroy = function(e, t) {
		t(e);
	}, N.prototype[f.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	};
	var te;
	function ne() {
		return te === void 0 && (te = {}), te;
	}
	N.fromWeb = function(e, t) {
		return ne().newStreamWritableFromWritableStream(e, t);
	}, N.toWeb = function(e) {
		return ne().newWritableStreamFromStreamWritable(e);
	};
})), Go = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), r = q("buffer"), { isReadable: i, isWritable: a, isIterable: o, isNodeStream: s, isReadableNodeStream: c, isWritableNodeStream: l, isDuplexNodeStream: u, isReadableStream: d, isWritableStream: f } = No(), p = Po(), { AbortError: m, codes: { ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: g } } = ko(), { destroyer: _ } = Fo(), v = Ko(), y = Uo(), b = Wo(), { createDeferredPromise: x } = Ao(), S = Ho(), C = globalThis.Blob || r.Blob, w = C === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof C;
	}, T = globalThis.AbortController || (pa(), K(aa)).AbortController, { FunctionPrototypeCall: E } = Do(), D = class extends v {
		constructor(e) {
			super(e), e?.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e?.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0);
		}
	};
	t.exports = function e(t, r) {
		if (u(t)) return t;
		if (c(t)) return k({ readable: t });
		if (l(t)) return k({ writable: t });
		if (s(t)) return k({
			writable: !1,
			readable: !1
		});
		if (d(t)) return k({ readable: y.fromWeb(t) });
		if (f(t)) return k({ writable: b.fromWeb(t) });
		if (typeof t == "function") {
			let { value: e, write: i, final: a, destroy: s } = O(t);
			if (o(e)) return S(D, e, {
				objectMode: !0,
				write: i,
				final: a,
				destroy: s
			});
			let c = e?.then;
			if (typeof c == "function") {
				let t, r = E(c, e, (e) => {
					if (e != null) throw new g("nully", "body", e);
				}, (e) => {
					_(t, e);
				});
				return t = new D({
					objectMode: !0,
					readable: !1,
					write: i,
					final(e) {
						a(async () => {
							try {
								await r, n.nextTick(e, null);
							} catch (t) {
								n.nextTick(e, t);
							}
						});
					},
					destroy: s
				});
			}
			throw new g("Iterable, AsyncIterable or AsyncFunction", r, e);
		}
		if (w(t)) return e(t.arrayBuffer());
		if (o(t)) return S(D, t, {
			objectMode: !0,
			writable: !1
		});
		if (d(t?.readable) && f(t?.writable)) return D.fromWeb(t);
		if (typeof t?.writable == "object" || typeof t?.readable == "object") return k({
			readable: t != null && t.readable ? c(t?.readable) ? t?.readable : e(t.readable) : void 0,
			writable: t != null && t.writable ? l(t?.writable) ? t?.writable : e(t.writable) : void 0
		});
		let i = t?.then;
		if (typeof i == "function") {
			let e;
			return E(i, t, (t) => {
				t != null && e.push(t), e.push(null);
			}, (t) => {
				_(e, t);
			}), e = new D({
				objectMode: !0,
				writable: !1,
				read() {}
			});
		}
		throw new h(r, [
			"Blob",
			"ReadableStream",
			"WritableStream",
			"Stream",
			"Iterable",
			"AsyncIterable",
			"Function",
			"{ readable, writable } pair",
			"Promise"
		], t);
	};
	function O(e) {
		let { promise: t, resolve: r } = x(), i = new T(), a = i.signal;
		return {
			value: e((async function* () {
				for (;;) {
					let e = t;
					t = null;
					let { chunk: i, done: o, cb: s } = await e;
					if (n.nextTick(s), o) return;
					if (a.aborted) throw new m(void 0, { cause: a.reason });
					({promise: t, resolve: r} = x()), yield i;
				}
			})(), { signal: a }),
			write(e, t, n) {
				let i = r;
				r = null, i({
					chunk: e,
					done: !1,
					cb: n
				});
			},
			final(e) {
				let t = r;
				r = null, t({
					done: !0,
					cb: e
				});
			},
			destroy(e, t) {
				i.abort(), t(e);
			}
		};
	}
	function k(e) {
		let t = e.readable && typeof e.readable.read != "function" ? y.wrap(e.readable) : e.readable, n = e.writable, r = !!i(t), o = !!a(n), s, c, l, u, d;
		function f(e) {
			let t = u;
			u = null, t ? t(e) : e && d.destroy(e);
		}
		return d = new D({
			readableObjectMode: !!(t != null && t.readableObjectMode),
			writableObjectMode: !!(n != null && n.writableObjectMode),
			readable: r,
			writable: o
		}), o && (p(n, (e) => {
			o = !1, e && _(t, e), f(e);
		}), d._write = function(e, t, r) {
			n.write(e, t) ? r() : s = r;
		}, d._final = function(e) {
			n.end(), c = e;
		}, n.on("drain", function() {
			if (s) {
				let e = s;
				s = null, e();
			}
		}), n.on("finish", function() {
			if (c) {
				let e = c;
				c = null, e();
			}
		})), r && (p(t, (e) => {
			r = !1, e && _(t, e), f(e);
		}), t.on("readable", function() {
			if (l) {
				let e = l;
				l = null, e();
			}
		}), t.on("end", function() {
			d.push(null);
		}), d._read = function() {
			for (;;) {
				let e = t.read();
				if (e === null) {
					l = d._read;
					return;
				}
				if (!d.push(e)) return;
			}
		}), d._destroy = function(e, r) {
			!e && u !== null && (e = new m()), l = null, s = null, c = null, u === null ? r(e) : (u = r, _(n, e), _(t, e));
		}, d;
	}
})), Ko = /* @__PURE__ */ H(((e, t) => {
	var { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i, ObjectSetPrototypeOf: a } = Do();
	t.exports = c;
	var o = Uo(), s = Wo();
	a(c.prototype, o.prototype), a(c, o);
	{
		let e = i(s.prototype);
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			c.prototype[n] || (c.prototype[n] = s.prototype[n]);
		}
	}
	function c(e) {
		if (!(this instanceof c)) return new c(e);
		o.call(this, e), s.call(this, e), e ? (this.allowHalfOpen = e.allowHalfOpen !== !1, e.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0)) : this.allowHalfOpen = !0;
	}
	n(c.prototype, {
		writable: {
			__proto__: null,
			...r(s.prototype, "writable")
		},
		writableHighWaterMark: {
			__proto__: null,
			...r(s.prototype, "writableHighWaterMark")
		},
		writableObjectMode: {
			__proto__: null,
			...r(s.prototype, "writableObjectMode")
		},
		writableBuffer: {
			__proto__: null,
			...r(s.prototype, "writableBuffer")
		},
		writableLength: {
			__proto__: null,
			...r(s.prototype, "writableLength")
		},
		writableFinished: {
			__proto__: null,
			...r(s.prototype, "writableFinished")
		},
		writableCorked: {
			__proto__: null,
			...r(s.prototype, "writableCorked")
		},
		writableEnded: {
			__proto__: null,
			...r(s.prototype, "writableEnded")
		},
		writableNeedDrain: {
			__proto__: null,
			...r(s.prototype, "writableNeedDrain")
		},
		destroyed: {
			__proto__: null,
			get() {
				return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
			},
			set(e) {
				this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
			}
		}
	});
	var l;
	function u() {
		return l === void 0 && (l = {}), l;
	}
	c.fromWeb = function(e, t) {
		return u().newStreamDuplexFromReadableWritablePair(e, t);
	}, c.toWeb = function(e) {
		return u().newReadableWritablePairFromDuplex(e);
	};
	var d;
	c.from = function(e) {
		return d ||= Go(), d(e, "body");
	};
})), qo = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n, Symbol: r } = Do();
	t.exports = c;
	var { ERR_METHOD_NOT_IMPLEMENTED: i } = ko().codes, a = Ko(), { getHighWaterMark: o } = zo();
	n(c.prototype, a.prototype), n(c, a);
	var s = r("kCallback");
	function c(e) {
		if (!(this instanceof c)) return new c(e);
		let t = e ? o(this, e, "readableHighWaterMark", !0) : null;
		t === 0 && (e = {
			...e,
			highWaterMark: null,
			readableHighWaterMark: t,
			writableHighWaterMark: e.writableHighWaterMark || 0
		}), a.call(this, e), this._readableState.sync = !1, this[s] = null, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", u);
	}
	function l(e) {
		typeof this._flush == "function" && !this.destroyed ? this._flush((t, n) => {
			if (t) {
				e ? e(t) : this.destroy(t);
				return;
			}
			n != null && this.push(n), this.push(null), e && e();
		}) : (this.push(null), e && e());
	}
	function u() {
		this._final !== l && l.call(this);
	}
	c.prototype._final = l, c.prototype._transform = function(e, t, n) {
		throw new i("_transform()");
	}, c.prototype._write = function(e, t, n) {
		let r = this._readableState, i = this._writableState, a = r.length;
		this._transform(e, t, (e, t) => {
			if (e) {
				n(e);
				return;
			}
			t != null && this.push(t), i.ended || a === r.length || r.length < r.highWaterMark ? n() : this[s] = n;
		});
	}, c.prototype._read = function() {
		if (this[s]) {
			let e = this[s];
			this[s] = null, e();
		}
	};
})), Jo = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n } = Do();
	t.exports = i;
	var r = qo();
	n(i.prototype, r.prototype), n(i, r);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		r.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), Yo = /* @__PURE__ */ H(((e, t) => {
	var n = Mo(), { ArrayIsArray: r, Promise: i, SymbolAsyncIterator: a, SymbolDispose: o } = Do(), s = Po(), { once: c } = Ao(), l = Fo(), u = Ko(), { aggregateTwoErrors: d, codes: { ERR_INVALID_ARG_TYPE: f, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: m, ERR_STREAM_DESTROYED: h, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: _ } = ko(), { validateFunction: v, validateAbortSignal: y } = jo(), { isIterable: b, isReadable: x, isReadableNodeStream: S, isNodeStream: C, isTransformStream: w, isWebStream: T, isReadableStream: E, isReadableFinished: D } = No(), O = globalThis.AbortController || (pa(), K(aa)).AbortController, k, A, j;
	function M(e, t, n) {
		let r = !1;
		return e.on("close", () => {
			r = !0;
		}), {
			destroy: (t) => {
				r || (r = !0, l.destroyer(e, t || new h("pipe")));
			},
			cleanup: s(e, {
				readable: t,
				writable: n
			}, (e) => {
				r = !e;
			})
		};
	}
	function N(e) {
		return v(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
	}
	function P(e) {
		if (b(e)) return e;
		if (S(e)) return F(e);
		throw new f("val", [
			"Readable",
			"Iterable",
			"AsyncIterable"
		], e);
	}
	async function* F(e) {
		A ||= Uo(), yield* A.prototype[a].call(e);
	}
	async function I(e, t, n, { end: r }) {
		let a, o = null, c = (e) => {
			if (e && (a = e), o) {
				let e = o;
				o = null, e();
			}
		}, l = () => new i((e, t) => {
			a ? t(a) : o = () => {
				a ? t(a) : e();
			};
		});
		t.on("drain", c);
		let u = s(t, { readable: !1 }, c);
		try {
			t.writableNeedDrain && await l();
			for await (let n of e) t.write(n) || await l();
			r && (t.end(), await l()), n();
		} catch (e) {
			n(a === e ? e : d(a, e));
		} finally {
			u(), t.off("drain", c);
		}
	}
	async function L(e, t, n, { end: r }) {
		w(t) && (t = t.writable);
		let i = t.getWriter();
		try {
			for await (let t of e) await i.ready, i.write(t).catch(() => {});
			await i.ready, r && await i.close(), n();
		} catch (e) {
			try {
				await i.abort(e), n(e);
			} catch (e) {
				n(e);
			}
		}
	}
	function R(...e) {
		return z(e, c(N(e)));
	}
	function z(e, t, i) {
		if (e.length === 1 && r(e[0]) && (e = e[0]), e.length < 2) throw new m("streams");
		let a = new O(), s = a.signal, c = i?.signal, l = [];
		y(c, "options.signal");
		function d() {
			F(new _());
		}
		j ||= Ao().addAbortListener;
		let h;
		c && (h = j(c, d));
		let g, v, D = [], A = 0;
		function N(e) {
			F(e, --A === 0);
		}
		function F(e, r) {
			var i;
			if (e && (!g || g.code === "ERR_STREAM_PREMATURE_CLOSE") && (g = e), !(!g && !r)) {
				for (; D.length;) D.shift()(g);
				(i = h) == null || i[o](), a.abort(), r && (g || l.forEach((e) => e()), n.nextTick(t, g, v));
			}
		}
		let R;
		for (let t = 0; t < e.length; t++) {
			let r = e[t], a = t < e.length - 1, o = t > 0, c = a || i?.end !== !1, d = t === e.length - 1;
			if (C(r)) {
				if (c) {
					let { destroy: e, cleanup: t } = M(r, a, o);
					D.push(e), x(r) && d && l.push(t);
				}
				function e(e) {
					e && e.name !== "AbortError" && e.code !== "ERR_STREAM_PREMATURE_CLOSE" && N(e);
				}
				r.on("error", e), x(r) && d && l.push(() => {
					r.removeListener("error", e);
				});
			}
			if (t === 0) if (typeof r == "function") {
				if (R = r({ signal: s }), !b(R)) throw new p("Iterable, AsyncIterable or Stream", "source", R);
			} else R = b(r) || S(r) || w(r) ? r : u.from(r);
			else if (typeof r == "function") if (R = w(R) ? P(R?.readable) : P(R), R = r(R, { signal: s }), a) {
				if (!b(R, !0)) throw new p("AsyncIterable", `transform[${t - 1}]`, R);
			} else {
				k ||= Jo();
				let e = new k({ objectMode: !0 }), t = R?.then;
				if (typeof t == "function") A++, t.call(R, (t) => {
					v = t, t != null && e.write(t), c && e.end(), n.nextTick(N);
				}, (t) => {
					e.destroy(t), n.nextTick(N, t);
				});
				else if (b(R, !0)) A++, I(R, e, N, { end: c });
				else if (E(R) || w(R)) {
					let t = R.readable || R;
					A++, I(t, e, N, { end: c });
				} else throw new p("AsyncIterable or Promise", "destination", R);
				R = e;
				let { destroy: r, cleanup: i } = M(R, !1, !0);
				D.push(r), d && l.push(i);
			}
			else if (C(r)) {
				if (S(R)) {
					A += 2;
					let e = B(R, r, N, { end: c });
					x(r) && d && l.push(e);
				} else if (w(R) || E(R)) {
					let e = R.readable || R;
					A++, I(e, r, N, { end: c });
				} else if (b(R)) A++, I(R, r, N, { end: c });
				else throw new f("val", [
					"Readable",
					"Iterable",
					"AsyncIterable",
					"ReadableStream",
					"TransformStream"
				], R);
				R = r;
			} else if (T(r)) {
				if (S(R)) A++, L(P(R), r, N, { end: c });
				else if (E(R) || b(R)) A++, L(R, r, N, { end: c });
				else if (w(R)) A++, L(R.readable, r, N, { end: c });
				else throw new f("val", [
					"Readable",
					"Iterable",
					"AsyncIterable",
					"ReadableStream",
					"TransformStream"
				], R);
				R = r;
			} else R = u.from(r);
		}
		return (s != null && s.aborted || c != null && c.aborted) && n.nextTick(d), R;
	}
	function B(e, t, r, { end: i }) {
		let a = !1;
		if (t.on("close", () => {
			a || r(new g());
		}), e.pipe(t, { end: !1 }), i) {
			function r() {
				a = !0, t.end();
			}
			D(e) ? n.nextTick(r) : e.once("end", r);
		} else r();
		return s(e, {
			readable: !0,
			writable: !1
		}, (t) => {
			let n = e._readableState;
			t && t.code === "ERR_STREAM_PREMATURE_CLOSE" && n && n.ended && !n.errored && !n.errorEmitted ? e.once("end", r).once("error", r) : r(t);
		}), s(t, {
			readable: !1,
			writable: !0
		}, r);
	}
	t.exports = {
		pipelineImpl: z,
		pipeline: R
	};
})), Xo = /* @__PURE__ */ H(((e, t) => {
	var { pipeline: n } = Yo(), r = Ko(), { destroyer: i } = Fo(), { isNodeStream: a, isReadable: o, isWritable: s, isWebStream: c, isTransformStream: l, isWritableStream: u, isReadableStream: d } = No(), { AbortError: f, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: m } } = ko(), h = Po();
	t.exports = function(...e) {
		if (e.length === 0) throw new m("streams");
		if (e.length === 1) return r.from(e[0]);
		let t = [...e];
		if (typeof e[0] == "function" && (e[0] = r.from(e[0])), typeof e[e.length - 1] == "function") {
			let t = e.length - 1;
			e[t] = r.from(e[t]);
		}
		for (let n = 0; n < e.length; ++n) if (!(!a(e[n]) && !c(e[n]))) {
			if (n < e.length - 1 && !(o(e[n]) || d(e[n]) || l(e[n]))) throw new p(`streams[${n}]`, t[n], "must be readable");
			if (n > 0 && !(s(e[n]) || u(e[n]) || l(e[n]))) throw new p(`streams[${n}]`, t[n], "must be writable");
		}
		let g, _, v, y, b;
		function x(e) {
			let t = y;
			y = null, t ? t(e) : e ? b.destroy(e) : !T && !w && b.destroy();
		}
		let S = e[0], C = n(e, x), w = !!(s(S) || u(S) || l(S)), T = !!(o(C) || d(C) || l(C));
		if (b = new r({
			writableObjectMode: !!(S != null && S.writableObjectMode),
			readableObjectMode: !!(C != null && C.readableObjectMode),
			writable: w,
			readable: T
		}), w) {
			if (a(S)) b._write = function(e, t, n) {
				S.write(e, t) ? n() : g = n;
			}, b._final = function(e) {
				S.end(), _ = e;
			}, S.on("drain", function() {
				if (g) {
					let e = g;
					g = null, e();
				}
			});
			else if (c(S)) {
				let e = (l(S) ? S.writable : S).getWriter();
				b._write = async function(t, n, r) {
					try {
						await e.ready, e.write(t).catch(() => {}), r();
					} catch (e) {
						r(e);
					}
				}, b._final = async function(t) {
					try {
						await e.ready, e.close().catch(() => {}), _ = t;
					} catch (e) {
						t(e);
					}
				};
			}
			h(l(C) ? C.readable : C, () => {
				if (_) {
					let e = _;
					_ = null, e();
				}
			});
		}
		if (T) {
			if (a(C)) C.on("readable", function() {
				if (v) {
					let e = v;
					v = null, e();
				}
			}), C.on("end", function() {
				b.push(null);
			}), b._read = function() {
				for (;;) {
					let e = C.read();
					if (e === null) {
						v = b._read;
						return;
					}
					if (!b.push(e)) return;
				}
			};
			else if (c(C)) {
				let e = (l(C) ? C.readable : C).getReader();
				b._read = async function() {
					for (;;) try {
						let { value: t, done: n } = await e.read();
						if (!b.push(t)) return;
						if (n) {
							b.push(null);
							return;
						}
					} catch {
						return;
					}
				};
			}
		}
		return b._destroy = function(e, t) {
			!e && y !== null && (e = new f()), v = null, g = null, _ = null, y === null ? t(e) : (y = t, a(C) && i(C, e));
		}, b;
	};
})), Zo = /* @__PURE__ */ H(((e, t) => {
	var n = globalThis.AbortController || (pa(), K(aa)).AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i, ERR_MISSING_ARGS: a, ERR_OUT_OF_RANGE: o }, AbortError: s } = ko(), { validateAbortSignal: c, validateInteger: l, validateObject: u } = jo(), d = Do().Symbol("kWeak"), f = Do().Symbol("kResistStopPropagation"), { finished: p } = Po(), m = Xo(), { addAbortSignalNoValidate: h } = Lo(), { isWritable: g, isNodeStream: _ } = No(), { deprecate: v } = Ao(), { ArrayPrototypePush: y, Boolean: b, MathFloor: x, Number: S, NumberIsNaN: C, Promise: w, PromiseReject: T, PromiseResolve: E, PromisePrototypeThen: D, Symbol: O } = Do(), k = O("kEmpty"), A = O("kEof");
	function j(e, t) {
		if (t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), _(e) && !g(e)) throw new r("stream", e, "must be writable");
		let n = m(this, e);
		return t != null && t.signal && h(t.signal, n), n;
	}
	function M(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal");
		let n = 1;
		t?.concurrency != null && (n = x(t.concurrency));
		let r = n - 1;
		return t?.highWaterMark != null && (r = x(t.highWaterMark)), l(n, "options.concurrency", 1), l(r, "options.highWaterMark", 0), r += n, async function* () {
			let i = Ao().AbortSignalAny([t?.signal].filter(b)), a = this, o = [], c = { signal: i }, l, u, d = !1, f = 0;
			function p() {
				d = !0, m();
			}
			function m() {
				--f, h();
			}
			function h() {
				u && !d && f < n && o.length < r && (u(), u = null);
			}
			async function g() {
				try {
					for await (let t of a) {
						if (d) return;
						if (i.aborted) throw new s();
						try {
							if (t = e(t, c), t === k) continue;
							t = E(t);
						} catch (e) {
							t = T(e);
						}
						f += 1, D(t, m, p), o.push(t), l &&= (l(), null), !d && (o.length >= r || f >= n) && await new w((e) => {
							u = e;
						});
					}
					o.push(A);
				} catch (e) {
					let t = T(e);
					D(t, m, p), o.push(t);
				} finally {
					d = !0, l &&= (l(), null);
				}
			}
			g();
			try {
				for (;;) {
					for (; o.length > 0;) {
						let e = await o[0];
						if (e === A) return;
						if (i.aborted) throw new s();
						e !== k && (yield e), o.shift(), h();
					}
					await new w((e) => {
						l = e;
					});
				}
			} finally {
				d = !0, u &&= (u(), null);
			}
		}.call(this);
	}
	function N(e = void 0) {
		return e != null && u(e, "options"), e?.signal != null && c(e.signal, "options.signal"), async function* () {
			let t = 0;
			for await (let r of this) {
				var n;
				if (e != null && (n = e.signal) != null && n.aborted) throw new s({ cause: e.signal.reason });
				yield [t++, r];
			}
		}.call(this);
	}
	async function P(e, t = void 0) {
		for await (let n of R.call(this, e, t)) return !0;
		return !1;
	}
	async function F(e, t = void 0) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		return !await P.call(this, async (...t) => !await e(...t), t);
	}
	async function I(e, t) {
		for await (let n of R.call(this, e, t)) return n;
	}
	async function L(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		async function n(t, n) {
			return await e(t, n), k;
		}
		for await (let e of M.call(this, n, t));
	}
	function R(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		async function n(t, n) {
			return await e(t, n) ? t : k;
		}
		return M.call(this, n, t);
	}
	var z = class extends a {
		constructor() {
			super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
		}
	};
	async function B(e, t, r) {
		var a;
		if (typeof e != "function") throw new i("reducer", ["Function", "AsyncFunction"], e);
		r != null && u(r, "options"), r?.signal != null && c(r.signal, "options.signal");
		let o = arguments.length > 1;
		if (r != null && (a = r.signal) != null && a.aborted) {
			let e = new s(void 0, { cause: r.signal.reason });
			throw this.once("error", () => {}), await p(this.destroy(e)), e;
		}
		let l = new n(), m = l.signal;
		if (r != null && r.signal) {
			let e = {
				once: !0,
				[d]: this,
				[f]: !0
			};
			r.signal.addEventListener("abort", () => l.abort(), e);
		}
		let h = !1;
		try {
			for await (let n of this) {
				var g;
				if (h = !0, r != null && (g = r.signal) != null && g.aborted) throw new s();
				o ? t = await e(t, n, { signal: m }) : (t = n, o = !0);
			}
			if (!h && !o) throw new z();
		} finally {
			l.abort();
		}
		return t;
	}
	async function V(e) {
		e != null && u(e, "options"), e?.signal != null && c(e.signal, "options.signal");
		let t = [];
		for await (let r of this) {
			var n;
			if (e != null && (n = e.signal) != null && n.aborted) throw new s(void 0, { cause: e.signal.reason });
			y(t, r);
		}
		return t;
	}
	function H(e, t) {
		let n = M.call(this, e, t);
		return async function* () {
			for await (let e of n) yield* e;
		}.call(this);
	}
	function U(e) {
		if (e = S(e), C(e)) return 0;
		if (e < 0) throw new o("number", ">= 0", e);
		return e;
	}
	function W(e, t = void 0) {
		return t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), e = U(e), async function* () {
			var n;
			if (t != null && (n = t.signal) != null && n.aborted) throw new s();
			for await (let n of this) {
				var r;
				if (t != null && (r = t.signal) != null && r.aborted) throw new s();
				e-- <= 0 && (yield n);
			}
		}.call(this);
	}
	function G(e, t = void 0) {
		return t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), e = U(e), async function* () {
			var n;
			if (t != null && (n = t.signal) != null && n.aborted) throw new s();
			for await (let n of this) {
				var r;
				if (t != null && (r = t.signal) != null && r.aborted) throw new s();
				if (e-- > 0 && (yield n), e <= 0) return;
			}
		}.call(this);
	}
	t.exports.streamReturningOperators = {
		asIndexedPairs: v(N, "readable.asIndexedPairs will be removed in a future version."),
		drop: W,
		filter: R,
		flatMap: H,
		map: M,
		take: G,
		compose: j
	}, t.exports.promiseReturningOperators = {
		every: F,
		forEach: L,
		reduce: B,
		toArray: V,
		some: P,
		find: I
	};
})), Qo = /* @__PURE__ */ H(((e, t) => {
	var { ArrayPrototypePop: n, Promise: r } = Do(), { isIterable: i, isNodeStream: a, isWebStream: o } = No(), { pipelineImpl: s } = Yo(), { finished: c } = Po();
	$o();
	function l(...e) {
		return new r((t, r) => {
			let c, l, u = e[e.length - 1];
			if (u && typeof u == "object" && !a(u) && !i(u) && !o(u)) {
				let t = n(e);
				c = t.signal, l = t.end;
			}
			s(e, (e, n) => {
				e ? r(e) : t(n);
			}, {
				signal: c,
				end: l
			});
		});
	}
	t.exports = {
		finished: c,
		pipeline: l
	};
})), $o = /* @__PURE__ */ H(((e, t) => {
	var { Buffer: n } = q("buffer"), { ObjectDefineProperty: r, ObjectKeys: i, ReflectApply: a } = Do(), { promisify: { custom: o } } = Ao(), { streamReturningOperators: s, promiseReturningOperators: c } = Zo(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: l } } = ko(), u = Xo(), { setDefaultHighWaterMark: d, getDefaultHighWaterMark: f } = zo(), { pipeline: p } = Yo(), { destroyer: m } = Fo(), h = Po(), g = Qo(), _ = No(), v = t.exports = Io().Stream;
	v.isDestroyed = _.isDestroyed, v.isDisturbed = _.isDisturbed, v.isErrored = _.isErrored, v.isReadable = _.isReadable, v.isWritable = _.isWritable, v.Readable = Uo();
	for (let e of i(s)) {
		let t = s[e];
		function n(...e) {
			if (new.target) throw l();
			return v.Readable.from(a(t, this, e));
		}
		r(n, "name", {
			__proto__: null,
			value: t.name
		}), r(n, "length", {
			__proto__: null,
			value: t.length
		}), r(v.Readable.prototype, e, {
			__proto__: null,
			value: n,
			enumerable: !1,
			configurable: !0,
			writable: !0
		});
	}
	for (let e of i(c)) {
		let t = c[e];
		function n(...e) {
			if (new.target) throw l();
			return a(t, this, e);
		}
		r(n, "name", {
			__proto__: null,
			value: t.name
		}), r(n, "length", {
			__proto__: null,
			value: t.length
		}), r(v.Readable.prototype, e, {
			__proto__: null,
			value: n,
			enumerable: !1,
			configurable: !0,
			writable: !0
		});
	}
	v.Writable = Wo(), v.Duplex = Ko(), v.Transform = qo(), v.PassThrough = Jo(), v.pipeline = p;
	var { addAbortSignal: y } = Lo();
	v.addAbortSignal = y, v.finished = h, v.destroy = m, v.compose = u, v.setDefaultHighWaterMark = d, v.getDefaultHighWaterMark = f, r(v, "promises", {
		__proto__: null,
		configurable: !0,
		enumerable: !0,
		get() {
			return g;
		}
	}), r(p, o, {
		__proto__: null,
		enumerable: !0,
		get() {
			return g.pipeline;
		}
	}), r(h, o, {
		__proto__: null,
		enumerable: !0,
		get() {
			return g.finished;
		}
	}), v.Stream = v, v._isUint8Array = function(e) {
		return e instanceof Uint8Array;
	}, v._uint8ArrayToBuffer = function(e) {
		return n.from(e.buffer, e.byteOffset, e.byteLength);
	};
})), es = (/* @__PURE__ */ H(((e, t) => {
	var n = q("stream");
	if (n && process.env.READABLE_STREAM === "disable") {
		let e = n.promises;
		t.exports._uint8ArrayToBuffer = n._uint8ArrayToBuffer, t.exports._isUint8Array = n._isUint8Array, t.exports.isDisturbed = n.isDisturbed, t.exports.isErrored = n.isErrored, t.exports.isReadable = n.isReadable, t.exports.Readable = n.Readable, t.exports.Writable = n.Writable, t.exports.Duplex = n.Duplex, t.exports.Transform = n.Transform, t.exports.PassThrough = n.PassThrough, t.exports.addAbortSignal = n.addAbortSignal, t.exports.finished = n.finished, t.exports.destroy = n.destroy, t.exports.pipeline = n.pipeline, t.exports.compose = n.compose, Object.defineProperty(n, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return e;
			}
		}), t.exports.Stream = n.Stream;
	} else {
		let e = $o(), n = Qo(), r = e.Readable.destroy;
		t.exports = e.Readable, t.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, t.exports._isUint8Array = e._isUint8Array, t.exports.isDisturbed = e.isDisturbed, t.exports.isErrored = e.isErrored, t.exports.isReadable = e.isReadable, t.exports.Readable = e.Readable, t.exports.Writable = e.Writable, t.exports.Duplex = e.Duplex, t.exports.Transform = e.Transform, t.exports.PassThrough = e.PassThrough, t.exports.addAbortSignal = e.addAbortSignal, t.exports.finished = e.finished, t.exports.destroy = e.destroy, t.exports.destroy = r, t.exports.pipeline = e.pipeline, t.exports.compose = e.compose, Object.defineProperty(e, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return n;
			}
		}), t.exports.Stream = e.Stream;
	}
	t.exports.default = t.exports;
})))();
function ts(e) {
	if (e === null) return Buffer.alloc(0);
	if (typeof e == "string") return Buffer.from(e);
	if (Ve(e) && !e._readableState) {
		var t = new es.PassThrough();
		return e.pipe(t), t;
	}
	return e;
}
//#endregion
//#region node_modules/compress-commons/lib/archivers/archive-output-stream.js
var ns = class extends es.Transform {
	constructor(e) {
		super(e), this.offset = 0, this._archive = {
			finish: !1,
			finished: !1,
			processing: !1
		};
	}
	_appendBuffer(e, t, n) {}
	_appendStream(e, t, n) {}
	_emitErrorCallback = function(e) {
		e && this.emit("error", e);
	};
	_finish(e) {}
	_normalizeEntry(e) {}
	_transform(e, t, n) {
		n(null, e);
	}
	entry(e, t, n) {
		if (t ||= null, typeof n != "function" && (n = this._emitErrorCallback.bind(this)), !(e instanceof Ya)) {
			n(/* @__PURE__ */ Error("not a valid instance of ArchiveEntry"));
			return;
		}
		if (this._archive.finish || this._archive.finished) {
			n(/* @__PURE__ */ Error("unacceptable entry after finish"));
			return;
		}
		if (this._archive.processing) {
			n(/* @__PURE__ */ Error("already processing an entry"));
			return;
		}
		if (this._archive.processing = !0, this._normalizeEntry(e), this._entry = e, t = ts(t), Buffer.isBuffer(t)) this._appendBuffer(e, t, n);
		else if (Ve(t)) this._appendStream(e, t, n);
		else {
			this._archive.processing = !1, n(/* @__PURE__ */ Error("input source must be valid Stream or Buffer instance"));
			return;
		}
		return this;
	}
	finish() {
		if (this._archive.processing) {
			this._archive.finish = !0;
			return;
		}
		this._finish();
	}
	getBytesWritten() {
		return this.offset;
	}
	write(e, t) {
		return e && (this.offset += e.length), super.write(e, t);
	}
}, rs = /* @__PURE__ */ H(((e) => {
	(function(t) {
		typeof DO_NOT_EXPORT_CRC > "u" ? typeof e == "object" ? t(e) : typeof define == "function" && define.amd ? define(function() {
			var e = {};
			return t(e), e;
		}) : t({}) : t({});
	})(function(e) {
		e.version = "1.2.2";
		function t() {
			for (var e = 0, t = Array(256), n = 0; n != 256; ++n) e = n, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, e = e & 1 ? -306674912 ^ e >>> 1 : e >>> 1, t[n] = e;
			return typeof Int32Array < "u" ? new Int32Array(t) : t;
		}
		var n = t();
		function r(e) {
			var t = 0, n = 0, r = 0, i = typeof Int32Array < "u" ? new Int32Array(4096) : Array(4096);
			for (r = 0; r != 256; ++r) i[r] = e[r];
			for (r = 0; r != 256; ++r) for (n = e[r], t = 256 + r; t < 4096; t += 256) n = i[t] = n >>> 8 ^ e[n & 255];
			var a = [];
			for (r = 1; r != 16; ++r) a[r - 1] = typeof Int32Array < "u" ? i.subarray(r * 256, r * 256 + 256) : i.slice(r * 256, r * 256 + 256);
			return a;
		}
		var i = r(n), a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14];
		function b(e, t) {
			for (var r = t ^ -1, i = 0, a = e.length; i < a;) r = r >>> 8 ^ n[(r ^ e.charCodeAt(i++)) & 255];
			return ~r;
		}
		function x(e, t) {
			for (var r = t ^ -1, i = e.length - 15, b = 0; b < i;) r = y[e[b++] ^ r & 255] ^ v[e[b++] ^ r >> 8 & 255] ^ _[e[b++] ^ r >> 16 & 255] ^ g[e[b++] ^ r >>> 24] ^ h[e[b++]] ^ m[e[b++]] ^ p[e[b++]] ^ f[e[b++]] ^ d[e[b++]] ^ u[e[b++]] ^ l[e[b++]] ^ c[e[b++]] ^ s[e[b++]] ^ o[e[b++]] ^ a[e[b++]] ^ n[e[b++]];
			for (i += 15; b < i;) r = r >>> 8 ^ n[(r ^ e[b++]) & 255];
			return ~r;
		}
		function S(e, t) {
			for (var r = t ^ -1, i = 0, a = e.length, o = 0, s = 0; i < a;) o = e.charCodeAt(i++), o < 128 ? r = r >>> 8 ^ n[(r ^ o) & 255] : o < 2048 ? (r = r >>> 8 ^ n[(r ^ (192 | o >> 6 & 31)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o & 63)) & 255]) : o >= 55296 && o < 57344 ? (o = (o & 1023) + 64, s = e.charCodeAt(i++) & 1023, r = r >>> 8 ^ n[(r ^ (240 | o >> 8 & 7)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o >> 2 & 63)) & 255], r = r >>> 8 ^ n[(r ^ (128 | s >> 6 & 15 | (o & 3) << 4)) & 255], r = r >>> 8 ^ n[(r ^ (128 | s & 63)) & 255]) : (r = r >>> 8 ^ n[(r ^ (224 | o >> 12 & 15)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o >> 6 & 63)) & 255], r = r >>> 8 ^ n[(r ^ (128 | o & 63)) & 255]);
			return ~r;
		}
		e.table = n, e.bstr = b, e.buf = x, e.str = S;
	});
})), is = /* @__PURE__ */ H(((e, t) => {
	t.exports = {
		AggregateError: class extends Error {
			constructor(e) {
				if (!Array.isArray(e)) throw TypeError(`Expected input to be an Array, got ${typeof e}`);
				let t = "";
				for (let n = 0; n < e.length; n++) t += `    ${e[n].stack}\n`;
				super(t), this.name = "AggregateError", this.errors = e;
			}
		},
		ArrayIsArray(e) {
			return Array.isArray(e);
		},
		ArrayPrototypeIncludes(e, t) {
			return e.includes(t);
		},
		ArrayPrototypeIndexOf(e, t) {
			return e.indexOf(t);
		},
		ArrayPrototypeJoin(e, t) {
			return e.join(t);
		},
		ArrayPrototypeMap(e, t) {
			return e.map(t);
		},
		ArrayPrototypePop(e, t) {
			return e.pop(t);
		},
		ArrayPrototypePush(e, t) {
			return e.push(t);
		},
		ArrayPrototypeSlice(e, t, n) {
			return e.slice(t, n);
		},
		Error,
		FunctionPrototypeCall(e, t, ...n) {
			return e.call(t, ...n);
		},
		FunctionPrototypeSymbolHasInstance(e, t) {
			return Function.prototype[Symbol.hasInstance].call(e, t);
		},
		MathFloor: Math.floor,
		Number,
		NumberIsInteger: Number.isInteger,
		NumberIsNaN: Number.isNaN,
		NumberMAX_SAFE_INTEGER: 2 ** 53 - 1,
		NumberMIN_SAFE_INTEGER: -(2 ** 53 - 1),
		NumberParseInt: Number.parseInt,
		ObjectDefineProperties(e, t) {
			return Object.defineProperties(e, t);
		},
		ObjectDefineProperty(e, t, n) {
			return Object.defineProperty(e, t, n);
		},
		ObjectGetOwnPropertyDescriptor(e, t) {
			return Object.getOwnPropertyDescriptor(e, t);
		},
		ObjectKeys(e) {
			return Object.keys(e);
		},
		ObjectSetPrototypeOf(e, t) {
			return Object.setPrototypeOf(e, t);
		},
		Promise,
		PromisePrototypeCatch(e, t) {
			return e.catch(t);
		},
		PromisePrototypeThen(e, t, n) {
			return e.then(t, n);
		},
		PromiseReject(e) {
			return Promise.reject(e);
		},
		PromiseResolve(e) {
			return Promise.resolve(e);
		},
		ReflectApply: Reflect.apply,
		RegExpPrototypeTest(e, t) {
			return e.test(t);
		},
		SafeSet: Set,
		String,
		StringPrototypeSlice(e, t, n) {
			return e.slice(t, n);
		},
		StringPrototypeToLowerCase(e) {
			return e.toLowerCase();
		},
		StringPrototypeToUpperCase(e) {
			return e.toUpperCase();
		},
		StringPrototypeTrim(e) {
			return e.trim();
		},
		Symbol,
		SymbolFor: Symbol.for,
		SymbolAsyncIterator: Symbol.asyncIterator,
		SymbolHasInstance: Symbol.hasInstance,
		SymbolIterator: Symbol.iterator,
		SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
		SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
		TypedArrayPrototypeSet(e, t, n) {
			return e.set(t, n);
		},
		Boolean,
		Uint8Array
	};
})), as = /* @__PURE__ */ H(((e, t) => {
	t.exports = {
		format(e, ...t) {
			return e.replace(/%([sdifj])/g, function(...[e, n]) {
				let r = t.shift();
				return n === "f" ? r.toFixed(6) : n === "j" ? JSON.stringify(r) : n === "s" && typeof r == "object" ? `${r.constructor === Object ? "" : r.constructor.name} {}`.trim() : r.toString();
			});
		},
		inspect(e) {
			switch (typeof e) {
				case "string":
					if (e.includes("'")) {
						if (!e.includes("\"")) return `"${e}"`;
						if (!e.includes("`") && !e.includes("${")) return `\`${e}\``;
					}
					return `'${e}'`;
				case "number": return isNaN(e) ? "NaN" : Object.is(e, -0) ? String(e) : e;
				case "bigint": return `${String(e)}n`;
				case "boolean":
				case "undefined": return String(e);
				case "object": return "{}";
			}
		}
	};
})), os = /* @__PURE__ */ H(((e, t) => {
	var { format: n, inspect: r } = as(), { AggregateError: i } = is(), a = globalThis.AggregateError || i, o = Symbol("kIsNodeError"), s = [
		"string",
		"function",
		"number",
		"object",
		"Function",
		"Object",
		"boolean",
		"bigint",
		"symbol"
	], c = /^([A-Z][a-z0-9]*)+$/, l = "__node_internal_", u = {};
	function d(e, t) {
		if (!e) throw new u.ERR_INTERNAL_ASSERTION(t);
	}
	function f(e) {
		let t = "", n = e.length, r = +(e[0] === "-");
		for (; n >= r + 4; n -= 3) t = `_${e.slice(n - 3, n)}${t}`;
		return `${e.slice(0, n)}${t}`;
	}
	function p(e, t, r) {
		if (typeof t == "function") return d(t.length <= r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${t.length}).`), t(...r);
		let i = (t.match(/%[dfijoOs]/g) || []).length;
		return d(i === r.length, `Code: ${e}; The provided arguments length (${r.length}) does not match the required ones (${i}).`), r.length === 0 ? t : n(t, ...r);
	}
	function m(e, t, n) {
		n ||= Error;
		class r extends n {
			constructor(...n) {
				super(p(e, t, n));
			}
			toString() {
				return `${this.name} [${e}]: ${this.message}`;
			}
		}
		Object.defineProperties(r.prototype, {
			name: {
				value: n.name,
				writable: !0,
				enumerable: !1,
				configurable: !0
			},
			toString: {
				value() {
					return `${this.name} [${e}]: ${this.message}`;
				},
				writable: !0,
				enumerable: !1,
				configurable: !0
			}
		}), r.prototype.code = e, r.prototype[o] = !0, u[e] = r;
	}
	function h(e) {
		let t = l + e.name;
		return Object.defineProperty(e, "name", { value: t }), e;
	}
	function g(e, t) {
		if (e && t && e !== t) {
			if (Array.isArray(t.errors)) return t.errors.push(e), t;
			let n = new a([t, e], t.message);
			return n.code = t.code, n;
		}
		return e || t;
	}
	var _ = class extends Error {
		constructor(e = "The operation was aborted", t = void 0) {
			if (t !== void 0 && typeof t != "object") throw new u.ERR_INVALID_ARG_TYPE("options", "Object", t);
			super(e, t), this.code = "ABORT_ERR", this.name = "AbortError";
		}
	};
	m("ERR_ASSERTION", "%s", Error), m("ERR_INVALID_ARG_TYPE", (e, t, n) => {
		d(typeof e == "string", "'name' must be a string"), Array.isArray(t) || (t = [t]);
		let i = "The ";
		e.endsWith(" argument") ? i += `${e} ` : i += `"${e}" ${e.includes(".") ? "property" : "argument"} `, i += "must be ";
		let a = [], o = [], l = [];
		for (let e of t) d(typeof e == "string", "All expected entries have to be of type string"), s.includes(e) ? a.push(e.toLowerCase()) : c.test(e) ? o.push(e) : (d(e !== "object", "The value \"object\" should be written as \"Object\""), l.push(e));
		if (o.length > 0) {
			let e = a.indexOf("object");
			e !== -1 && (a.splice(a, e, 1), o.push("Object"));
		}
		if (a.length > 0) {
			switch (a.length) {
				case 1:
					i += `of type ${a[0]}`;
					break;
				case 2:
					i += `one of type ${a[0]} or ${a[1]}`;
					break;
				default: {
					let e = a.pop();
					i += `one of type ${a.join(", ")}, or ${e}`;
				}
			}
			(o.length > 0 || l.length > 0) && (i += " or ");
		}
		if (o.length > 0) {
			switch (o.length) {
				case 1:
					i += `an instance of ${o[0]}`;
					break;
				case 2:
					i += `an instance of ${o[0]} or ${o[1]}`;
					break;
				default: {
					let e = o.pop();
					i += `an instance of ${o.join(", ")}, or ${e}`;
				}
			}
			l.length > 0 && (i += " or ");
		}
		switch (l.length) {
			case 0: break;
			case 1:
				l[0].toLowerCase() !== l[0] && (i += "an "), i += `${l[0]}`;
				break;
			case 2:
				i += `one of ${l[0]} or ${l[1]}`;
				break;
			default: {
				let e = l.pop();
				i += `one of ${l.join(", ")}, or ${e}`;
			}
		}
		if (n == null) i += `. Received ${n}`;
		else if (typeof n == "function" && n.name) i += `. Received function ${n.name}`;
		else if (typeof n == "object") {
			var u;
			if ((u = n.constructor) != null && u.name) i += `. Received an instance of ${n.constructor.name}`;
			else {
				let e = r(n, { depth: -1 });
				i += `. Received ${e}`;
			}
		} else {
			let e = r(n, { colors: !1 });
			e.length > 25 && (e = `${e.slice(0, 25)}...`), i += `. Received type ${typeof n} (${e})`;
		}
		return i;
	}, TypeError), m("ERR_INVALID_ARG_VALUE", (e, t, n = "is invalid") => {
		let i = r(t);
		return i.length > 128 && (i = i.slice(0, 128) + "..."), `The ${e.includes(".") ? "property" : "argument"} '${e}' ${n}. Received ${i}`;
	}, TypeError), m("ERR_INVALID_RETURN_VALUE", (e, t, n) => {
		var r;
		return `Expected ${e} to be returned from the "${t}" function but got ${n != null && (r = n.constructor) != null && r.name ? `instance of ${n.constructor.name}` : `type ${typeof n}`}.`;
	}, TypeError), m("ERR_MISSING_ARGS", (...e) => {
		d(e.length > 0, "At least one arg needs to be specified");
		let t, n = e.length;
		switch (e = (Array.isArray(e) ? e : [e]).map((e) => `"${e}"`).join(" or "), n) {
			case 1:
				t += `The ${e[0]} argument`;
				break;
			case 2:
				t += `The ${e[0]} and ${e[1]} arguments`;
				break;
			default:
				{
					let n = e.pop();
					t += `The ${e.join(", ")}, and ${n} arguments`;
				}
				break;
		}
		return `${t} must be specified`;
	}, TypeError), m("ERR_OUT_OF_RANGE", (e, t, n) => {
		d(t, "Missing \"range\" argument");
		let i;
		if (Number.isInteger(n) && Math.abs(n) > 2 ** 32) i = f(String(n));
		else if (typeof n == "bigint") {
			i = String(n);
			let e = BigInt(2) ** BigInt(32);
			(n > e || n < -e) && (i = f(i)), i += "n";
		} else i = r(n);
		return `The value of "${e}" is out of range. It must be ${t}. Received ${i}`;
	}, RangeError), m("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), m("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), m("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), m("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), m("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), m("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), m("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), m("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), m("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), m("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), m("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), t.exports = {
		AbortError: _,
		aggregateTwoErrors: h(g),
		hideStackFrames: h,
		codes: u
	};
})), ss = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), { format: r, inspect: i } = as(), { codes: { ERR_INVALID_ARG_TYPE: a } } = os(), { kResistStopPropagation: o, AggregateError: s, SymbolDispose: c } = is(), l = globalThis.AbortSignal || (pa(), K(aa)).AbortSignal, u = globalThis.AbortController || (pa(), K(aa)).AbortController, d = Object.getPrototypeOf(async function() {}).constructor, f = globalThis.Blob || n.Blob, p = f === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof f;
	}, m = (e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new a(t, "AbortSignal", e);
	}, h = (e, t) => {
		if (typeof e != "function") throw new a(t, "Function", e);
	};
	t.exports = {
		AggregateError: s,
		kEmptyObject: Object.freeze({}),
		once(e) {
			let t = !1;
			return function(...n) {
				t || (t = !0, e.apply(this, n));
			};
		},
		createDeferredPromise: function() {
			let e, t;
			return {
				promise: new Promise((n, r) => {
					e = n, t = r;
				}),
				resolve: e,
				reject: t
			};
		},
		promisify(e) {
			return new Promise((t, n) => {
				e((e, ...r) => e ? n(e) : t(...r));
			});
		},
		debuglog() {
			return function() {};
		},
		format: r,
		inspect: i,
		types: {
			isAsyncFunction(e) {
				return e instanceof d;
			},
			isArrayBufferView(e) {
				return ArrayBuffer.isView(e);
			}
		},
		isBlob: p,
		deprecate(e, t) {
			return e;
		},
		addAbortListener: q("events").addAbortListener || function(e, t) {
			if (e === void 0) throw new a("signal", "AbortSignal", e);
			m(e, "signal"), h(t, "listener");
			let n;
			return e.aborted ? queueMicrotask(() => t()) : (e.addEventListener("abort", t, {
				__proto__: null,
				once: !0,
				[o]: !0
			}), n = () => {
				e.removeEventListener("abort", t);
			}), {
				__proto__: null,
				[c]() {
					var e;
					(e = n) == null || e();
				}
			};
		},
		AbortSignalAny: l.any || function(e) {
			if (e.length === 1) return e[0];
			let t = new u(), n = () => t.abort();
			return e.forEach((e) => {
				m(e, "signals"), e.addEventListener("abort", n, { once: !0 });
			}), t.signal.addEventListener("abort", () => {
				e.forEach((e) => e.removeEventListener("abort", n));
			}, { once: !0 }), t.signal;
		}
	}, t.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
})), cs = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i, ArrayPrototypeMap: a, NumberIsInteger: o, NumberIsNaN: s, NumberMAX_SAFE_INTEGER: c, NumberMIN_SAFE_INTEGER: l, NumberParseInt: u, ObjectPrototypeHasOwnProperty: d, RegExpPrototypeExec: f, String: p, StringPrototypeToUpperCase: m, StringPrototypeTrim: h } = is(), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: _, ERR_INVALID_ARG_TYPE: v, ERR_INVALID_ARG_VALUE: y, ERR_OUT_OF_RANGE: b, ERR_UNKNOWN_SIGNAL: x } } = os(), { normalizeEncoding: S } = ss(), { isAsyncFunction: C, isArrayBufferView: w } = ss().types, T = {};
	function E(e) {
		return e === (e | 0);
	}
	function D(e) {
		return e === e >>> 0;
	}
	var O = /^[0-7]+$/, k = "must be a 32-bit unsigned integer or an octal string";
	function A(e, t, n) {
		if (e === void 0 && (e = n), typeof e == "string") {
			if (f(O, e) === null) throw new y(t, e, k);
			e = u(e, 8);
		}
		return N(e, t), e;
	}
	var j = g((e, t, n = l, r = c) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		if (e < n || e > r) throw new b(t, `>= ${n} && <= ${r}`, e);
	}), M = g((e, t, n = -2147483648, r = 2147483647) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		if (e < n || e > r) throw new b(t, `>= ${n} && <= ${r}`, e);
	}), N = g((e, t, n = !1) => {
		if (typeof e != "number") throw new v(t, "number", e);
		if (!o(e)) throw new b(t, "an integer", e);
		let r = +!!n, i = 4294967295;
		if (e < r || e > i) throw new b(t, `>= ${r} && <= ${i}`, e);
	});
	function P(e, t) {
		if (typeof e != "string") throw new v(t, "string", e);
	}
	function F(e, t, n = void 0, r) {
		if (typeof e != "number") throw new v(t, "number", e);
		if (n != null && e < n || r != null && e > r || (n != null || r != null) && s(e)) throw new b(t, `${n == null ? "" : `>= ${n}`}${n != null && r != null ? " && " : ""}${r == null ? "" : `<= ${r}`}`, e);
	}
	var I = g((e, t, n) => {
		if (!r(n, e)) throw new y(t, e, "must be one of: " + i(a(n, (e) => typeof e == "string" ? `'${e}'` : p(e)), ", "));
	});
	function L(e, t) {
		if (typeof e != "boolean") throw new v(t, "boolean", e);
	}
	function R(e, t, n) {
		return e == null || !d(e, t) ? n : e[t];
	}
	var z = g((e, t, r = null) => {
		let i = R(r, "allowArray", !1), a = R(r, "allowFunction", !1);
		if (!R(r, "nullable", !1) && e === null || !i && n(e) || typeof e != "object" && (!a || typeof e != "function")) throw new v(t, "Object", e);
	}), B = g((e, t) => {
		if (e != null && typeof e != "object" && typeof e != "function") throw new v(t, "a dictionary", e);
	}), V = g((e, t, r = 0) => {
		if (!n(e)) throw new v(t, "Array", e);
		if (e.length < r) throw new y(t, e, `must be longer than ${r}`);
	});
	function H(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) P(e[n], `${t}[${n}]`);
	}
	function U(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) L(e[n], `${t}[${n}]`);
	}
	function W(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = `${t}[${n}]`;
			if (r == null) throw new v(i, "AbortSignal", r);
			ee(r, i);
		}
	}
	function G(e, t = "signal") {
		if (P(e, t), T[e] === void 0) throw T[m(e)] === void 0 ? new x(e) : new x(e + " (signals must use all capital letters)");
	}
	var K = g((e, t = "buffer") => {
		if (!w(e)) throw new v(t, [
			"Buffer",
			"TypedArray",
			"DataView"
		], e);
	});
	function q(e, t) {
		let n = S(t), r = e.length;
		if (n === "hex" && r % 2 != 0) throw new y("encoding", t, `is invalid for data of length ${r}`);
	}
	function J(e, t = "Port", n = !0) {
		if (typeof e != "number" && typeof e != "string" || typeof e == "string" && h(e).length === 0 || +e != e >>> 0 || e > 65535 || e === 0 && !n) throw new _(t, e, n);
		return e | 0;
	}
	var ee = g((e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new v(t, "AbortSignal", e);
	}), te = g((e, t) => {
		if (typeof e != "function") throw new v(t, "Function", e);
	}), ne = g((e, t) => {
		if (typeof e != "function" || C(e)) throw new v(t, "Function", e);
	}), re = g((e, t) => {
		if (e !== void 0) throw new v(t, "undefined", e);
	});
	function ie(e, t, n) {
		if (!r(n, e)) throw new v(t, `('${i(n, "|")}')`, e);
	}
	var ae = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
	function oe(e, t) {
		if (e === void 0 || !f(ae, e)) throw new y(t, e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	function se(e) {
		if (typeof e == "string") return oe(e, "hints"), e;
		if (n(e)) {
			let t = e.length, n = "";
			if (t === 0) return n;
			for (let r = 0; r < t; r++) {
				let i = e[r];
				oe(i, "hints"), n += i, r !== t - 1 && (n += ", ");
			}
			return n;
		}
		throw new y("hints", e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	t.exports = {
		isInt32: E,
		isUint32: D,
		parseFileMode: A,
		validateArray: V,
		validateStringArray: H,
		validateBooleanArray: U,
		validateAbortSignalArray: W,
		validateBoolean: L,
		validateBuffer: K,
		validateDictionary: B,
		validateEncoding: q,
		validateFunction: te,
		validateInt32: M,
		validateInteger: j,
		validateNumber: F,
		validateObject: z,
		validateOneOf: I,
		validatePlainFunction: ne,
		validatePort: J,
		validateSignalName: G,
		validateString: P,
		validateUint32: N,
		validateUndefined: re,
		validateUnion: ie,
		validateAbortSignal: ee,
		validateLinkHeaderValue: se
	};
})), ls = /* @__PURE__ */ H(((e, t) => {
	t.exports = ((e, t, n, r) => {
		if (t in e && e[t] === !0) {
			let t;
			for (let i of n) if (i in e && (t = e[i], r(t))) return t;
		}
		return e;
	})(ga(), "__esModule", ["default", "process"], (e) => "nextTick" in e);
})), us = /* @__PURE__ */ H(((e, t) => {
	var { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i } = is(), a = i("nodejs.stream.destroyed"), o = i("nodejs.stream.errored"), s = i("nodejs.stream.readable"), c = i("nodejs.stream.writable"), l = i("nodejs.stream.disturbed"), u = i("nodejs.webstream.isClosedPromise"), d = i("nodejs.webstream.controllerErrorFunction");
	function f(e, t = !1) {
		return !!(e && typeof e.pipe == "function" && typeof e.on == "function" && (!t || typeof e.pause == "function" && typeof e.resume == "function") && (!e._writableState || e._readableState?.readable !== !1) && (!e._writableState || e._readableState));
	}
	function p(e) {
		return !!(e && typeof e.write == "function" && typeof e.on == "function" && (!e._readableState || e._writableState?.writable !== !1));
	}
	function m(e) {
		return !!(e && typeof e.pipe == "function" && e._readableState && typeof e.on == "function" && typeof e.write == "function");
	}
	function h(e) {
		return e && (e._readableState || e._writableState || typeof e.write == "function" && typeof e.on == "function" || typeof e.pipe == "function" && typeof e.on == "function");
	}
	function g(e) {
		return !!(e && !h(e) && typeof e.pipeThrough == "function" && typeof e.getReader == "function" && typeof e.cancel == "function");
	}
	function _(e) {
		return !!(e && !h(e) && typeof e.getWriter == "function" && typeof e.abort == "function");
	}
	function v(e) {
		return !!(e && !h(e) && typeof e.readable == "object" && typeof e.writable == "object");
	}
	function y(e) {
		return g(e) || _(e) || v(e);
	}
	function b(e, t) {
		return e == null ? !1 : t === !0 ? typeof e[n] == "function" : t === !1 ? typeof e[r] == "function" : typeof e[n] == "function" || typeof e[r] == "function";
	}
	function x(e) {
		if (!h(e)) return null;
		let t = e._writableState, n = e._readableState, r = t || n;
		return !!(e.destroyed || e[a] || r != null && r.destroyed);
	}
	function S(e) {
		if (!p(e)) return null;
		if (e.writableEnded === !0) return !0;
		let t = e._writableState;
		return t != null && t.errored ? !1 : typeof t?.ended == "boolean" ? t.ended : null;
	}
	function C(e, t) {
		if (!p(e)) return null;
		if (e.writableFinished === !0) return !0;
		let n = e._writableState;
		return n != null && n.errored ? !1 : typeof n?.finished == "boolean" ? !!(n.finished || t === !1 && n.ended === !0 && n.length === 0) : null;
	}
	function w(e) {
		if (!f(e)) return null;
		if (e.readableEnded === !0) return !0;
		let t = e._readableState;
		return !t || t.errored ? !1 : typeof t?.ended == "boolean" ? t.ended : null;
	}
	function T(e, t) {
		if (!f(e)) return null;
		let n = e._readableState;
		return n != null && n.errored ? !1 : typeof n?.endEmitted == "boolean" ? !!(n.endEmitted || t === !1 && n.ended === !0 && n.length === 0) : null;
	}
	function E(e) {
		return e && e[s] != null ? e[s] : typeof e?.readable == "boolean" ? x(e) ? !1 : f(e) && e.readable && !T(e) : null;
	}
	function D(e) {
		return e && e[c] != null ? e[c] : typeof e?.writable == "boolean" ? x(e) ? !1 : p(e) && e.writable && !S(e) : null;
	}
	function O(e, t) {
		return h(e) ? x(e) ? !0 : !(t?.readable !== !1 && E(e) || t?.writable !== !1 && D(e)) : null;
	}
	function k(e) {
		return h(e) ? e.writableErrored ? e.writableErrored : e._writableState?.errored ?? null : null;
	}
	function A(e) {
		return h(e) ? e.readableErrored ? e.readableErrored : e._readableState?.errored ?? null : null;
	}
	function j(e) {
		if (!h(e)) return null;
		if (typeof e.closed == "boolean") return e.closed;
		let t = e._writableState, n = e._readableState;
		return typeof t?.closed == "boolean" || typeof n?.closed == "boolean" ? t?.closed || n?.closed : typeof e._closed == "boolean" && M(e) ? e._closed : null;
	}
	function M(e) {
		return typeof e._closed == "boolean" && typeof e._defaultKeepAlive == "boolean" && typeof e._removedConnection == "boolean" && typeof e._removedContLen == "boolean";
	}
	function N(e) {
		return typeof e._sent100 == "boolean" && M(e);
	}
	function P(e) {
		return typeof e._consuming == "boolean" && typeof e._dumped == "boolean" && e.req?.upgradeOrConnect === void 0;
	}
	function F(e) {
		if (!h(e)) return null;
		let t = e._writableState, n = e._readableState, r = t || n;
		return !r && N(e) || !!(r && r.autoDestroy && r.emitClose && r.closed === !1);
	}
	function I(e) {
		return !!(e && (e[l] ?? (e.readableDidRead || e.readableAborted)));
	}
	function L(e) {
		return !!(e && (e[o] ?? e.readableErrored ?? e.writableErrored ?? e._readableState?.errorEmitted ?? e._writableState?.errorEmitted ?? e._readableState?.errored ?? e._writableState?.errored));
	}
	t.exports = {
		isDestroyed: x,
		kIsDestroyed: a,
		isDisturbed: I,
		kIsDisturbed: l,
		isErrored: L,
		kIsErrored: o,
		isReadable: E,
		kIsReadable: s,
		kIsClosedPromise: u,
		kControllerErrorFunction: d,
		kIsWritable: c,
		isClosed: j,
		isDuplexNodeStream: m,
		isFinished: O,
		isIterable: b,
		isReadableNodeStream: f,
		isReadableStream: g,
		isReadableEnded: w,
		isReadableFinished: T,
		isReadableErrored: A,
		isNodeStream: h,
		isWebStream: y,
		isWritable: D,
		isWritableNodeStream: p,
		isWritableStream: _,
		isWritableEnded: S,
		isWritableFinished: C,
		isWritableErrored: k,
		isServerRequest: P,
		isServerResponse: N,
		willEmitClose: F,
		isTransformStream: v
	};
})), ds = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), { AbortError: r, codes: i } = os(), { ERR_INVALID_ARG_TYPE: a, ERR_STREAM_PREMATURE_CLOSE: o } = i, { kEmptyObject: s, once: c } = ss(), { validateAbortSignal: l, validateFunction: u, validateObject: d, validateBoolean: f } = cs(), { Promise: p, PromisePrototypeThen: m, SymbolDispose: h } = is(), { isClosed: g, isReadable: _, isReadableNodeStream: v, isReadableStream: y, isReadableFinished: b, isReadableErrored: x, isWritable: S, isWritableNodeStream: C, isWritableStream: w, isWritableFinished: T, isWritableErrored: E, isNodeStream: D, willEmitClose: O, kIsClosedPromise: k } = us(), A;
	function j(e) {
		return e.setHeader && typeof e.abort == "function";
	}
	var M = () => {};
	function N(e, t, i) {
		if (arguments.length === 2 ? (i = t, t = s) : t == null ? t = s : d(t, "options"), u(i, "callback"), l(t.signal, "options.signal"), i = c(i), y(e) || w(e)) return P(e, t, i);
		if (!D(e)) throw new a("stream", [
			"ReadableStream",
			"WritableStream",
			"Stream"
		], e);
		let f = t.readable ?? v(e), p = t.writable ?? C(e), m = e._writableState, k = e._readableState, N = () => {
			e.writable || L();
		}, F = O(e) && v(e) === f && C(e) === p, I = T(e, !1), L = () => {
			I = !0, e.destroyed && (F = !1), !(F && (!e.readable || f)) && (!f || R) && i.call(e);
		}, R = b(e, !1), z = () => {
			R = !0, e.destroyed && (F = !1), !(F && (!e.writable || p)) && (!p || I) && i.call(e);
		}, B = (t) => {
			i.call(e, t);
		}, V = g(e), H = () => {
			V = !0;
			let t = E(e) || x(e);
			if (t && typeof t != "boolean") return i.call(e, t);
			if (f && !R && v(e, !0) && !b(e, !1) || p && !I && !T(e, !1)) return i.call(e, new o());
			i.call(e);
		}, U = () => {
			V = !0;
			let t = E(e) || x(e);
			if (t && typeof t != "boolean") return i.call(e, t);
			i.call(e);
		}, W = () => {
			e.req.on("finish", L);
		};
		j(e) ? (e.on("complete", L), F || e.on("abort", H), e.req ? W() : e.on("request", W)) : p && !m && (e.on("end", N), e.on("close", N)), !F && typeof e.aborted == "boolean" && e.on("aborted", H), e.on("end", z), e.on("finish", L), t.error !== !1 && e.on("error", B), e.on("close", H), V ? n.nextTick(H) : m != null && m.errorEmitted || k != null && k.errorEmitted ? F || n.nextTick(U) : (!f && (!F || _(e)) && (I || S(e) === !1) || !p && (!F || S(e)) && (R || _(e) === !1) || k && e.req && e.aborted) && n.nextTick(U);
		let G = () => {
			i = M, e.removeListener("aborted", H), e.removeListener("complete", L), e.removeListener("abort", H), e.removeListener("request", W), e.req && e.req.removeListener("finish", L), e.removeListener("end", N), e.removeListener("close", N), e.removeListener("finish", L), e.removeListener("end", z), e.removeListener("error", B), e.removeListener("close", H);
		};
		if (t.signal && !V) {
			let a = () => {
				let n = i;
				G(), n.call(e, new r(void 0, { cause: t.signal.reason }));
			};
			if (t.signal.aborted) n.nextTick(a);
			else {
				A ||= ss().addAbortListener;
				let n = A(t.signal, a), r = i;
				i = c((...t) => {
					n[h](), r.apply(e, t);
				});
			}
		}
		return G;
	}
	function P(e, t, i) {
		let a = !1, o = M;
		if (t.signal) if (o = () => {
			a = !0, i.call(e, new r(void 0, { cause: t.signal.reason }));
		}, t.signal.aborted) n.nextTick(o);
		else {
			A ||= ss().addAbortListener;
			let n = A(t.signal, o), r = i;
			i = c((...t) => {
				n[h](), r.apply(e, t);
			});
		}
		let s = (...t) => {
			a || n.nextTick(() => i.apply(e, t));
		};
		return m(e[k].promise, s, s), M;
	}
	function F(e, t) {
		var n;
		let r = !1;
		return t === null && (t = s), (n = t) != null && n.cleanup && (f(t.cleanup, "cleanup"), r = t.cleanup), new p((n, i) => {
			let a = N(e, t, (e) => {
				r && a(), e ? i(e) : n();
			});
		});
	}
	t.exports = N, t.exports.finished = F;
})), fs = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i }, AbortError: a } = os(), { Symbol: o } = is(), { kIsDestroyed: s, isDestroyed: c, isFinished: l, isServerRequest: u } = us(), d = o("kDestroy"), f = o("kConstruct");
	function p(e, t, n) {
		e && (e.stack, t && !t.errored && (t.errored = e), n && !n.errored && (n.errored = e));
	}
	function m(e, t) {
		let n = this._readableState, i = this._writableState, a = i || n;
		return i != null && i.destroyed || n != null && n.destroyed ? (typeof t == "function" && t(), this) : (p(e, i, n), i && (i.destroyed = !0), n && (n.destroyed = !0), a.constructed ? h(this, e, t) : this.once(d, function(n) {
			h(this, r(n, e), t);
		}), this);
	}
	function h(e, t, r) {
		let i = !1;
		function a(t) {
			if (i) return;
			i = !0;
			let a = e._readableState, o = e._writableState;
			p(t, o, a), o && (o.closed = !0), a && (a.closed = !0), typeof r == "function" && r(t), t ? n.nextTick(g, e, t) : n.nextTick(_, e);
		}
		try {
			e._destroy(t || null, a);
		} catch (e) {
			a(e);
		}
	}
	function g(e, t) {
		v(e, t), _(e);
	}
	function _(e) {
		let t = e._readableState, n = e._writableState;
		n && (n.closeEmitted = !0), t && (t.closeEmitted = !0), (n != null && n.emitClose || t != null && t.emitClose) && e.emit("close");
	}
	function v(e, t) {
		let n = e._readableState, r = e._writableState;
		r != null && r.errorEmitted || n != null && n.errorEmitted || (r && (r.errorEmitted = !0), n && (n.errorEmitted = !0), e.emit("error", t));
	}
	function y() {
		let e = this._readableState, t = this._writableState;
		e && (e.constructed = !0, e.closed = !1, e.closeEmitted = !1, e.destroyed = !1, e.errored = null, e.errorEmitted = !1, e.reading = !1, e.ended = e.readable === !1, e.endEmitted = e.readable === !1), t && (t.constructed = !0, t.destroyed = !1, t.closed = !1, t.closeEmitted = !1, t.errored = null, t.errorEmitted = !1, t.finalCalled = !1, t.prefinished = !1, t.ended = t.writable === !1, t.ending = t.writable === !1, t.finished = t.writable === !1);
	}
	function b(e, t, r) {
		let i = e._readableState, a = e._writableState;
		if (a != null && a.destroyed || i != null && i.destroyed) return this;
		i != null && i.autoDestroy || a != null && a.autoDestroy ? e.destroy(t) : t && (t.stack, a && !a.errored && (a.errored = t), i && !i.errored && (i.errored = t), r ? n.nextTick(v, e, t) : v(e, t));
	}
	function x(e, t) {
		if (typeof e._construct != "function") return;
		let r = e._readableState, i = e._writableState;
		r && (r.constructed = !1), i && (i.constructed = !1), e.once(f, t), !(e.listenerCount(f) > 1) && n.nextTick(S, e);
	}
	function S(e) {
		let t = !1;
		function r(r) {
			if (t) {
				b(e, r ?? new i());
				return;
			}
			t = !0;
			let a = e._readableState, o = e._writableState, s = o || a;
			a && (a.constructed = !0), o && (o.constructed = !0), s.destroyed ? e.emit(d, r) : r ? b(e, r, !0) : n.nextTick(C, e);
		}
		try {
			e._construct((e) => {
				n.nextTick(r, e);
			});
		} catch (e) {
			n.nextTick(r, e);
		}
	}
	function C(e) {
		e.emit(f);
	}
	function w(e) {
		return e?.setHeader && typeof e.abort == "function";
	}
	function T(e) {
		e.emit("close");
	}
	function E(e, t) {
		e.emit("error", t), n.nextTick(T, e);
	}
	function D(e, t) {
		!e || c(e) || (!t && !l(e) && (t = new a()), u(e) ? (e.socket = null, e.destroy(t)) : w(e) ? e.abort() : w(e.req) ? e.req.abort() : typeof e.destroy == "function" ? e.destroy(t) : typeof e.close == "function" ? e.close() : t ? n.nextTick(E, e, t) : n.nextTick(T, e), e.destroyed || (e[s] = !0));
	}
	t.exports = {
		construct: x,
		destroyer: D,
		destroy: m,
		undestroy: y,
		errorOrDestroy: b
	};
})), ps = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ObjectSetPrototypeOf: r } = is(), { EventEmitter: i } = q("events");
	function a(e) {
		i.call(this, e);
	}
	r(a.prototype, i.prototype), r(a, i), a.prototype.pipe = function(e, t) {
		let n = this;
		function r(t) {
			e.writable && e.write(t) === !1 && n.pause && n.pause();
		}
		n.on("data", r);
		function i() {
			n.readable && n.resume && n.resume();
		}
		e.on("drain", i), !e._isStdio && (!t || t.end !== !1) && (n.on("end", s), n.on("close", c));
		let a = !1;
		function s() {
			a || (a = !0, e.end());
		}
		function c() {
			a || (a = !0, typeof e.destroy == "function" && e.destroy());
		}
		function l(e) {
			u(), this.listenerCount?.call(this, "error") === 0 && this.emit("error", e);
		}
		o(n, "error", l), o(e, "error", l);
		function u() {
			n.removeListener("data", r), e.removeListener("drain", i), n.removeListener("end", s), n.removeListener("close", c), n.removeListener("error", l), e.removeListener("error", l), n.removeListener("end", u), n.removeListener("close", u), e.removeListener("close", u);
		}
		return n.on("end", u), n.on("close", u), e.on("close", u), e.emit("pipe", n), e;
	};
	function o(e, t, r) {
		if (typeof e.prependListener == "function") return e.prependListener(t, r);
		!e._events || !e._events[t] ? e.on(t, r) : n(e._events[t]) ? e._events[t].unshift(r) : e._events[t] = [r, e._events[t]];
	}
	t.exports = {
		Stream: a,
		prependListener: o
	};
})), ms = /* @__PURE__ */ H(((e, t) => {
	var { SymbolDispose: n } = is(), { AbortError: r, codes: i } = os(), { isNodeStream: a, isWebStream: o, kControllerErrorFunction: s } = us(), c = ds(), { ERR_INVALID_ARG_TYPE: l } = i, u, d = (e, t) => {
		if (typeof e != "object" || !("aborted" in e)) throw new l(t, "AbortSignal", e);
	};
	t.exports.addAbortSignal = function(e, n) {
		if (d(e, "signal"), !a(n) && !o(n)) throw new l("stream", [
			"ReadableStream",
			"WritableStream",
			"Stream"
		], n);
		return t.exports.addAbortSignalNoValidate(e, n);
	}, t.exports.addAbortSignalNoValidate = function(e, t) {
		if (typeof e != "object" || !("aborted" in e)) return t;
		let i = a(t) ? () => {
			t.destroy(new r(void 0, { cause: e.reason }));
		} : () => {
			t[s](new r(void 0, { cause: e.reason }));
		};
		return e.aborted ? i() : (u ||= ss().addAbortListener, c(t, u(e, i)[n])), t;
	};
})), hs = /* @__PURE__ */ H(((e, t) => {
	var { StringPrototypeSlice: n, SymbolIterator: r, TypedArrayPrototypeSet: i, Uint8Array: a } = is(), { Buffer: o } = q("buffer"), { inspect: s } = ss();
	t.exports = class {
		constructor() {
			this.head = null, this.tail = null, this.length = 0;
		}
		push(e) {
			let t = {
				data: e,
				next: null
			};
			this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
		}
		unshift(e) {
			let t = {
				data: e,
				next: this.head
			};
			this.length === 0 && (this.tail = t), this.head = t, ++this.length;
		}
		shift() {
			if (this.length === 0) return;
			let e = this.head.data;
			return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
		}
		clear() {
			this.head = this.tail = null, this.length = 0;
		}
		join(e) {
			if (this.length === 0) return "";
			let t = this.head, n = "" + t.data;
			for (; (t = t.next) !== null;) n += e + t.data;
			return n;
		}
		concat(e) {
			if (this.length === 0) return o.alloc(0);
			let t = o.allocUnsafe(e >>> 0), n = this.head, r = 0;
			for (; n;) i(t, n.data, r), r += n.data.length, n = n.next;
			return t;
		}
		consume(e, t) {
			let n = this.head.data;
			if (e < n.length) {
				let t = n.slice(0, e);
				return this.head.data = n.slice(e), t;
			}
			return e === n.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e);
		}
		first() {
			return this.head.data;
		}
		*[r]() {
			for (let e = this.head; e; e = e.next) yield e.data;
		}
		_getString(e) {
			let t = "", r = this.head, i = 0;
			do {
				let a = r.data;
				if (e > a.length) t += a, e -= a.length;
				else {
					e === a.length ? (t += a, ++i, r.next ? this.head = r.next : this.head = this.tail = null) : (t += n(a, 0, e), this.head = r, r.data = n(a, e));
					break;
				}
				++i;
			} while ((r = r.next) !== null);
			return this.length -= i, t;
		}
		_getBuffer(e) {
			let t = o.allocUnsafe(e), n = e, r = this.head, s = 0;
			do {
				let o = r.data;
				if (e > o.length) i(t, o, n - e), e -= o.length;
				else {
					e === o.length ? (i(t, o, n - e), ++s, r.next ? this.head = r.next : this.head = this.tail = null) : (i(t, new a(o.buffer, o.byteOffset, e), n - e), this.head = r, r.data = o.slice(e));
					break;
				}
				++s;
			} while ((r = r.next) !== null);
			return this.length -= s, t;
		}
		[Symbol.for("nodejs.util.inspect.custom")](e, t) {
			return s(this, {
				...t,
				depth: 0,
				customInspect: !1
			});
		}
	};
})), gs = /* @__PURE__ */ H(((e, t) => {
	var { MathFloor: n, NumberIsInteger: r } = is(), { validateInteger: i } = cs(), { ERR_INVALID_ARG_VALUE: a } = os().codes, o = 16 * 1024, s = 16;
	function c(e, t, n) {
		return e.highWaterMark == null ? t ? e[n] : null : e.highWaterMark;
	}
	function l(e) {
		return e ? s : o;
	}
	function u(e, t) {
		i(t, "value", 0), e ? s = t : o = t;
	}
	function d(e, t, i, o) {
		let s = c(t, o, i);
		if (s != null) {
			if (!r(s) || s < 0) throw new a(o ? `options.${i}` : "options.highWaterMark", s);
			return n(s);
		}
		return l(e.objectMode);
	}
	t.exports = {
		getHighWaterMark: d,
		getDefaultHighWaterMark: l,
		setDefaultHighWaterMark: u
	};
})), _s = /* @__PURE__ */ H(((e, t) => {
	var n = q("buffer"), r = n.Buffer;
	function i(e, t) {
		for (var n in e) t[n] = e[n];
	}
	r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? t.exports = n : (i(n, e), e.Buffer = a);
	function a(e, t, n) {
		return r(e, t, n);
	}
	a.prototype = Object.create(r.prototype), i(r, a), a.from = function(e, t, n) {
		if (typeof e == "number") throw TypeError("Argument must not be a number");
		return r(e, t, n);
	}, a.alloc = function(e, t, n) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		var i = r(e);
		return t === void 0 ? i.fill(0) : typeof n == "string" ? i.fill(t, n) : i.fill(t), i;
	}, a.allocUnsafe = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return r(e);
	}, a.allocUnsafeSlow = function(e) {
		if (typeof e != "number") throw TypeError("Argument must be a number");
		return n.SlowBuffer(e);
	};
})), vs = /* @__PURE__ */ H(((e) => {
	var t = _s().Buffer, n = t.isEncoding || function(e) {
		switch (e = "" + e, e && e.toLowerCase()) {
			case "hex":
			case "utf8":
			case "utf-8":
			case "ascii":
			case "binary":
			case "base64":
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
			case "raw": return !0;
			default: return !1;
		}
	};
	function r(e) {
		if (!e) return "utf8";
		for (var t;;) switch (e) {
			case "utf8":
			case "utf-8": return "utf8";
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return "utf16le";
			case "latin1":
			case "binary": return "latin1";
			case "base64":
			case "ascii":
			case "hex": return e;
			default:
				if (t) return;
				e = ("" + e).toLowerCase(), t = !0;
		}
	}
	function i(e) {
		var i = r(e);
		if (typeof i != "string" && (t.isEncoding === n || !n(e))) throw Error("Unknown encoding: " + e);
		return i || e;
	}
	e.StringDecoder = a;
	function a(e) {
		this.encoding = i(e);
		var n;
		switch (this.encoding) {
			case "utf16le":
				this.text = f, this.end = p, n = 4;
				break;
			case "utf8":
				this.fillLast = l, n = 4;
				break;
			case "base64":
				this.text = m, this.end = h, n = 3;
				break;
			default:
				this.write = g, this.end = _;
				return;
		}
		this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(n);
	}
	a.prototype.write = function(e) {
		if (e.length === 0) return "";
		var t, n;
		if (this.lastNeed) {
			if (t = this.fillLast(e), t === void 0) return "";
			n = this.lastNeed, this.lastNeed = 0;
		} else n = 0;
		return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || "";
	}, a.prototype.end = d, a.prototype.text = u, a.prototype.fillLast = function(e) {
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length;
	};
	function o(e) {
		return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2;
	}
	function s(e, t, n) {
		var r = t.length - 1;
		if (r < n) return 0;
		var i = o(t[r]);
		return i >= 0 ? (i > 0 && (e.lastNeed = i - 1), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (e.lastNeed = i - 2), i) : --r < n || i === -2 ? 0 : (i = o(t[r]), i >= 0 ? (i > 0 && (i === 2 ? i = 0 : e.lastNeed = i - 3), i) : 0));
	}
	function c(e, t, n) {
		if ((t[0] & 192) != 128) return e.lastNeed = 0, "�";
		if (e.lastNeed > 1 && t.length > 1) {
			if ((t[1] & 192) != 128) return e.lastNeed = 1, "�";
			if (e.lastNeed > 2 && t.length > 2 && (t[2] & 192) != 128) return e.lastNeed = 2, "�";
		}
	}
	function l(e) {
		var t = this.lastTotal - this.lastNeed, n = c(this, e, t);
		if (n !== void 0) return n;
		if (this.lastNeed <= e.length) return e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
		e.copy(this.lastChar, t, 0, e.length), this.lastNeed -= e.length;
	}
	function u(e, t) {
		var n = s(this, e, t);
		if (!this.lastNeed) return e.toString("utf8", t);
		this.lastTotal = n;
		var r = e.length - (n - this.lastNeed);
		return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r);
	}
	function d(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + "�" : t;
	}
	function f(e, t) {
		if ((e.length - t) % 2 == 0) {
			var n = e.toString("utf16le", t);
			if (n) {
				var r = n.charCodeAt(n.length - 1);
				if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1);
			}
			return n;
		}
		return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1);
	}
	function p(e) {
		var t = e && e.length ? this.write(e) : "";
		if (this.lastNeed) {
			var n = this.lastTotal - this.lastNeed;
			return t + this.lastChar.toString("utf16le", 0, n);
		}
		return t;
	}
	function m(e, t) {
		var n = (e.length - t) % 3;
		return n === 0 ? e.toString("base64", t) : (this.lastNeed = 3 - n, this.lastTotal = 3, n === 1 ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - n));
	}
	function h(e) {
		var t = e && e.length ? this.write(e) : "";
		return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t;
	}
	function g(e) {
		return e.toString(this.encoding);
	}
	function _(e) {
		return e && e.length ? this.write(e) : "";
	}
})), ys = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), { PromisePrototypeThen: r, SymbolAsyncIterator: i, SymbolIterator: a } = is(), { Buffer: o } = q("buffer"), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: c } = os().codes;
	function l(e, t, l) {
		let u;
		if (typeof t == "string" || t instanceof o) return new e({
			objectMode: !0,
			...l,
			read() {
				this.push(t), this.push(null);
			}
		});
		let d;
		if (t && t[i]) d = !0, u = t[i]();
		else if (t && t[a]) d = !1, u = t[a]();
		else throw new s("iterable", ["Iterable"], t);
		let f = new e({
			objectMode: !0,
			highWaterMark: 1,
			...l
		}), p = !1;
		f._read = function() {
			p || (p = !0, h());
		}, f._destroy = function(e, t) {
			r(m(e), () => n.nextTick(t, e), (r) => n.nextTick(t, r || e));
		};
		async function m(e) {
			let t = e != null, n = typeof u.throw == "function";
			if (t && n) {
				let { value: t, done: n } = await u.throw(e);
				if (await t, n) return;
			}
			if (typeof u.return == "function") {
				let { value: e } = await u.return();
				await e;
			}
		}
		async function h() {
			for (;;) {
				try {
					let { value: e, done: t } = d ? await u.next() : u.next();
					if (t) f.push(null);
					else {
						let t = e && typeof e.then == "function" ? await e : e;
						if (t === null) throw p = !1, new c();
						if (f.push(t)) continue;
						p = !1;
					}
				} catch (e) {
					f.destroy(e);
				}
				break;
			}
		}
		return f;
	}
	t.exports = l;
})), bs = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), { ArrayPrototypeIndexOf: r, NumberIsInteger: i, NumberIsNaN: a, NumberParseInt: o, ObjectDefineProperties: s, ObjectKeys: c, ObjectSetPrototypeOf: l, Promise: u, SafeSet: d, SymbolAsyncDispose: f, SymbolAsyncIterator: p, Symbol: m } = is();
	t.exports = X, X.ReadableState = ue;
	var { EventEmitter: h } = q("events"), { Stream: g, prependListener: _ } = ps(), { Buffer: v } = q("buffer"), { addAbortSignal: y } = ms(), b = ds(), x = ss().debuglog("stream", (e) => {
		x = e;
	}), S = hs(), C = fs(), { getHighWaterMark: w, getDefaultHighWaterMark: T } = gs(), { aggregateTwoErrors: E, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: O, ERR_OUT_OF_RANGE: k, ERR_STREAM_PUSH_AFTER_EOF: A, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: j }, AbortError: M } = os(), { validateObject: N } = cs(), P = m("kPaused"), { StringDecoder: F } = vs(), I = ys();
	l(X.prototype, g.prototype), l(X, g);
	var L = () => {}, { errorOrDestroy: R } = C, z = 1, B = 2, V = 4, H = 8, U = 16, W = 32, G = 64, K = 128, J = 256, ee = 512, te = 1024, ne = 2048, re = 4096, ie = 8192, ae = 16384, oe = 32768, se = 65536, ce = 1 << 17, le = 1 << 18;
	function Y(e) {
		return {
			enumerable: !1,
			get() {
				return (this.state & e) !== 0;
			},
			set(t) {
				t ? this.state |= e : this.state &= ~e;
			}
		};
	}
	s(ue.prototype, {
		objectMode: Y(z),
		ended: Y(B),
		endEmitted: Y(V),
		reading: Y(H),
		constructed: Y(U),
		sync: Y(W),
		needReadable: Y(G),
		emittedReadable: Y(K),
		readableListening: Y(J),
		resumeScheduled: Y(ee),
		errorEmitted: Y(te),
		emitClose: Y(ne),
		autoDestroy: Y(re),
		destroyed: Y(ie),
		closed: Y(ae),
		closeEmitted: Y(oe),
		multiAwaitDrain: Y(se),
		readingMore: Y(ce),
		dataEmitted: Y(le)
	});
	function ue(e, t, n) {
		typeof n != "boolean" && (n = t instanceof Cs()), this.state = 6192, e && e.objectMode && (this.state |= z), n && e && e.readableObjectMode && (this.state |= z), this.highWaterMark = e ? w(this, e, "readableHighWaterMark", n) : T(!1), this.buffer = new S(), this.length = 0, this.pipes = [], this.flowing = null, this[P] = null, e && e.emitClose === !1 && (this.state &= -2049), e && e.autoDestroy === !1 && (this.state &= -4097), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new F(e.encoding), this.encoding = e.encoding);
	}
	function X(e) {
		if (!(this instanceof X)) return new X(e);
		let t = this instanceof Cs();
		this._readableState = new ue(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && y(e.signal, this)), g.call(this, e), C.construct(this, () => {
			this._readableState.needReadable && ye(this, this._readableState);
		});
	}
	X.prototype.destroy = C.destroy, X.prototype._undestroy = C.undestroy, X.prototype._destroy = function(e, t) {
		t(e);
	}, X.prototype[h.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	}, X.prototype[f] = function() {
		let e;
		return this.destroyed || (e = this.readableEnded ? null : new M(), this.destroy(e)), new u((t, n) => b(this, (r) => r && r !== e ? n(r) : t(null)));
	}, X.prototype.push = function(e, t) {
		return de(this, e, t, !1);
	}, X.prototype.unshift = function(e, t) {
		return de(this, e, t, !0);
	};
	function de(e, t, n, r) {
		x("readableAddChunk", t);
		let i = e._readableState, a;
		if ((i.state & z) === 0 && (typeof t == "string" ? (n ||= i.defaultEncoding, i.encoding !== n && (r && i.encoding ? t = v.from(t, n).toString(i.encoding) : (t = v.from(t, n), n = ""))) : t instanceof v ? n = "" : g._isUint8Array(t) ? (t = g._uint8ArrayToBuffer(t), n = "") : t != null && (a = new D("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], t))), a) R(e, a);
		else if (t === null) i.state &= -9, ge(e, i);
		else if ((i.state & z) !== 0 || t && t.length > 0) if (r) if ((i.state & V) !== 0) R(e, new j());
		else if (i.destroyed || i.errored) return !1;
		else fe(e, i, t, !0);
		else if (i.ended) R(e, new A());
		else if (i.destroyed || i.errored) return !1;
		else i.state &= -9, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? fe(e, i, t, !1) : ye(e, i)) : fe(e, i, t, !1);
		else r || (i.state &= -9, ye(e, i));
		return !i.ended && (i.length < i.highWaterMark || i.length === 0);
	}
	function fe(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & se) === 0 ? t.awaitDrainWriters = null : t.awaitDrainWriters.clear(), t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), (t.state & G) !== 0 && _e(e)), ye(e, t);
	}
	X.prototype.isPaused = function() {
		let e = this._readableState;
		return e[P] === !0 || e.flowing === !1;
	}, X.prototype.setEncoding = function(e) {
		let t = new F(e);
		this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
		let n = this._readableState.buffer, r = "";
		for (let e of n) r += t.write(e);
		return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
	};
	var pe = 1073741824;
	function me(e) {
		if (e > pe) throw new k("size", "<= 1GiB", e);
		return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
	}
	function he(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & z) === 0 ? a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0 : 1;
	}
	X.prototype.read = function(e) {
		x("read", e), e === void 0 ? e = NaN : i(e) || (e = o(e, 10));
		let t = this._readableState, n = e;
		if (e > t.highWaterMark && (t.highWaterMark = me(e)), e !== 0 && (t.state &= -129), e === 0 && t.needReadable && ((t.highWaterMark === 0 ? t.length > 0 : t.length >= t.highWaterMark) || t.ended)) return x("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? Ae(this) : _e(this), null;
		if (e = he(e, t), e === 0 && t.ended) return t.length === 0 && Ae(this), null;
		let r = (t.state & G) !== 0;
		if (x("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, x("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, x("reading, ended or constructing", r);
		else if (r) {
			x("do read"), t.state |= 40, t.length === 0 && (t.state |= G);
			try {
				this._read(t.highWaterMark);
			} catch (e) {
				R(this, e);
			}
			t.state &= -33, t.reading || (e = he(n, t));
		}
		let a;
		return a = e > 0 ? ke(e, t) : null, a === null ? (t.needReadable = t.length <= t.highWaterMark, e = 0) : (t.length -= e, t.multiAwaitDrain ? t.awaitDrainWriters.clear() : t.awaitDrainWriters = null), t.length === 0 && (t.ended || (t.needReadable = !0), n !== e && t.ended && Ae(this)), a !== null && !t.errorEmitted && !t.closeEmitted && (t.dataEmitted = !0, this.emit("data", a)), a;
	};
	function ge(e, t) {
		if (x("onEofChunk"), !t.ended) {
			if (t.decoder) {
				let e = t.decoder.end();
				e && e.length && (t.buffer.push(e), t.length += t.objectMode ? 1 : e.length);
			}
			t.ended = !0, t.sync ? _e(e) : (t.needReadable = !1, t.emittedReadable = !0, ve(e));
		}
	}
	function _e(e) {
		let t = e._readableState;
		x("emitReadable", t.needReadable, t.emittedReadable), t.needReadable = !1, t.emittedReadable || (x("emitReadable", t.flowing), t.emittedReadable = !0, n.nextTick(ve, e));
	}
	function ve(e) {
		let t = e._readableState;
		x("emitReadable_", t.destroyed, t.length, t.ended), !t.destroyed && !t.errored && (t.length || t.ended) && (e.emit("readable"), t.emittedReadable = !1), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, Ee(e);
	}
	function ye(e, t) {
		!t.readingMore && t.constructed && (t.readingMore = !0, n.nextTick(be, e, t));
	}
	function be(e, t) {
		for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && t.length === 0);) {
			let n = t.length;
			if (x("maybeReadMore read 0"), e.read(0), n === t.length) break;
		}
		t.readingMore = !1;
	}
	X.prototype._read = function(e) {
		throw new O("_read()");
	}, X.prototype.pipe = function(e, t) {
		let r = this, i = this._readableState;
		i.pipes.length === 1 && (i.multiAwaitDrain || (i.multiAwaitDrain = !0, i.awaitDrainWriters = new d(i.awaitDrainWriters ? [i.awaitDrainWriters] : []))), i.pipes.push(e), x("pipe count=%d opts=%j", i.pipes.length, t);
		let a = (!t || t.end !== !1) && e !== n.stdout && e !== n.stderr ? s : v;
		i.endEmitted ? n.nextTick(a) : r.once("end", a), e.on("unpipe", o);
		function o(e, t) {
			x("onunpipe"), e === r && t && t.hasUnpiped === !1 && (t.hasUnpiped = !0, u());
		}
		function s() {
			x("onend"), e.end();
		}
		let c, l = !1;
		function u() {
			x("cleanup"), e.removeListener("close", h), e.removeListener("finish", g), c && e.removeListener("drain", c), e.removeListener("error", m), e.removeListener("unpipe", o), r.removeListener("end", s), r.removeListener("end", v), r.removeListener("data", p), l = !0, c && i.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && c();
		}
		function f() {
			l || (i.pipes.length === 1 && i.pipes[0] === e ? (x("false write response, pause", 0), i.awaitDrainWriters = e, i.multiAwaitDrain = !1) : i.pipes.length > 1 && i.pipes.includes(e) && (x("false write response, pause", i.awaitDrainWriters.size), i.awaitDrainWriters.add(e)), r.pause()), c || (c = xe(r, e), e.on("drain", c));
		}
		r.on("data", p);
		function p(t) {
			x("ondata");
			let n = e.write(t);
			x("dest.write", n), n === !1 && f();
		}
		function m(t) {
			if (x("onerror", t), v(), e.removeListener("error", m), e.listenerCount("error") === 0) {
				let n = e._writableState || e._readableState;
				n && !n.errorEmitted ? R(e, t) : e.emit("error", t);
			}
		}
		_(e, "error", m);
		function h() {
			e.removeListener("finish", g), v();
		}
		e.once("close", h);
		function g() {
			x("onfinish"), e.removeListener("close", h), v();
		}
		e.once("finish", g);
		function v() {
			x("unpipe"), r.unpipe(e);
		}
		return e.emit("pipe", r), e.writableNeedDrain === !0 ? f() : i.flowing || (x("pipe resume"), r.resume()), e;
	};
	function xe(e, t) {
		return function() {
			let n = e._readableState;
			n.awaitDrainWriters === t ? (x("pipeOnDrain", 1), n.awaitDrainWriters = null) : n.multiAwaitDrain && (x("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(t)), (!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) && e.listenerCount("data") && e.resume();
		};
	}
	X.prototype.unpipe = function(e) {
		let t = this._readableState, n = { hasUnpiped: !1 };
		if (t.pipes.length === 0) return this;
		if (!e) {
			let e = t.pipes;
			t.pipes = [], this.pause();
			for (let t = 0; t < e.length; t++) e[t].emit("unpipe", this, { hasUnpiped: !1 });
			return this;
		}
		let i = r(t.pipes, e);
		return i === -1 ? this : (t.pipes.splice(i, 1), t.pipes.length === 0 && this.pause(), e.emit("unpipe", this, n), this);
	}, X.prototype.on = function(e, t) {
		let r = g.prototype.on.call(this, e, t), i = this._readableState;
		return e === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== !1 && this.resume()) : e === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, x("on readable", i.length, i.reading), i.length ? _e(this) : i.reading || n.nextTick(Ce, this)), r;
	}, X.prototype.addListener = X.prototype.on, X.prototype.removeListener = function(e, t) {
		let r = g.prototype.removeListener.call(this, e, t);
		return e === "readable" && n.nextTick(Se, this), r;
	}, X.prototype.off = X.prototype.removeListener, X.prototype.removeAllListeners = function(e) {
		let t = g.prototype.removeAllListeners.apply(this, arguments);
		return (e === "readable" || e === void 0) && n.nextTick(Se, this), t;
	};
	function Se(e) {
		let t = e._readableState;
		t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && t[P] === !1 ? t.flowing = !0 : e.listenerCount("data") > 0 ? e.resume() : t.readableListening || (t.flowing = null);
	}
	function Ce(e) {
		x("readable nexttick read 0"), e.read(0);
	}
	X.prototype.resume = function() {
		let e = this._readableState;
		return e.flowing || (x("resume"), e.flowing = !e.readableListening, we(this, e)), e[P] = !1, this;
	};
	function we(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(Te, e, t));
	}
	function Te(e, t) {
		x("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), Ee(e), t.flowing && !t.reading && e.read(0);
	}
	X.prototype.pause = function() {
		return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[P] = !0, this;
	};
	function Ee(e) {
		let t = e._readableState;
		for (x("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	X.prototype.wrap = function(e) {
		let t = !1;
		e.on("data", (n) => {
			!this.push(n) && e.pause && (t = !0, e.pause());
		}), e.on("end", () => {
			this.push(null);
		}), e.on("error", (e) => {
			R(this, e);
		}), e.on("close", () => {
			this.destroy();
		}), e.on("destroy", () => {
			this.destroy();
		}), this._read = () => {
			t && e.resume && (t = !1, e.resume());
		};
		let n = c(e);
		for (let t = 1; t < n.length; t++) {
			let r = n[t];
			this[r] === void 0 && typeof e[r] == "function" && (this[r] = e[r].bind(e));
		}
		return this;
	}, X.prototype[p] = function() {
		return De(this);
	}, X.prototype.iterator = function(e) {
		return e !== void 0 && N(e, "options"), De(this, e);
	};
	function De(e, t) {
		typeof e.read != "function" && (e = X.wrap(e, { objectMode: !0 }));
		let n = Oe(e, t);
		return n.stream = e, n;
	}
	async function* Oe(e, t) {
		let n = L;
		function r(t) {
			this === e ? (n(), n = L) : n = t;
		}
		e.on("readable", r);
		let i, a = b(e, { writable: !1 }, (e) => {
			i = e ? E(i, e) : null, n(), n = L;
		});
		try {
			for (;;) {
				let t = e.destroyed ? null : e.read();
				if (t !== null) yield t;
				else if (i) throw i;
				else if (i === null) return;
				else await new u(r);
			}
		} catch (e) {
			throw i = E(i, e), i;
		} finally {
			(i || t?.destroyOnReturn !== !1) && (i === void 0 || e._readableState.autoDestroy) ? C.destroyer(e, null) : (e.off("readable", r), a());
		}
	}
	s(X.prototype, {
		readable: {
			__proto__: null,
			get() {
				let e = this._readableState;
				return !!e && e.readable !== !1 && !e.destroyed && !e.errorEmitted && !e.endEmitted;
			},
			set(e) {
				this._readableState && (this._readableState.readable = !!e);
			}
		},
		readableDidRead: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.dataEmitted;
			}
		},
		readableAborted: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return !!(this._readableState.readable !== !1 && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
			}
		},
		readableHighWaterMark: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.highWaterMark;
			}
		},
		readableBuffer: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState && this._readableState.buffer;
			}
		},
		readableFlowing: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return this._readableState.flowing;
			},
			set: function(e) {
				this._readableState && (this._readableState.flowing = e);
			}
		},
		readableLength: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState.length;
			}
		},
		readableObjectMode: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.objectMode : !1;
			}
		},
		readableEncoding: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.encoding : null;
			}
		},
		errored: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.errored : null;
			}
		},
		closed: {
			__proto__: null,
			get() {
				return this._readableState ? this._readableState.closed : !1;
			}
		},
		destroyed: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.destroyed : !1;
			},
			set(e) {
				this._readableState && (this._readableState.destroyed = e);
			}
		},
		readableEnded: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._readableState ? this._readableState.endEmitted : !1;
			}
		}
	}), s(ue.prototype, {
		pipesCount: {
			__proto__: null,
			get() {
				return this.pipes.length;
			}
		},
		paused: {
			__proto__: null,
			get() {
				return this[P] !== !1;
			},
			set(e) {
				this[P] = !!e;
			}
		}
	}), X._fromList = ke;
	function ke(e, t) {
		if (t.length === 0) return null;
		let n;
		return t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : t.buffer.length === 1 ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n;
	}
	function Ae(e) {
		let t = e._readableState;
		x("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, n.nextTick(je, t, e));
	}
	function je(e, t) {
		if (x("endReadableNT", e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
			if (e.endEmitted = !0, t.emit("end"), t.writable && t.allowHalfOpen === !1) n.nextTick(Me, t);
			else if (e.autoDestroy) {
				let e = t._writableState;
				(!e || e.autoDestroy && (e.finished || e.writable === !1)) && t.destroy();
			}
		}
	}
	function Me(e) {
		e.writable && !e.writableEnded && !e.destroyed && e.end();
	}
	X.from = function(e, t) {
		return I(X, e, t);
	};
	var Ne;
	function Pe() {
		return Ne === void 0 && (Ne = {}), Ne;
	}
	X.fromWeb = function(e, t) {
		return Pe().newStreamReadableFromReadableStream(e, t);
	}, X.toWeb = function(e, t) {
		return Pe().newReadableStreamFromStreamReadable(e, t);
	}, X.wrap = function(e, t) {
		return new X({
			objectMode: e.readableObjectMode ?? e.objectMode ?? !0,
			...t,
			destroy(t, n) {
				C.destroyer(e, t), n(t);
			}
		}).wrap(e);
	};
})), xs = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), { ArrayPrototypeSlice: r, Error: i, FunctionPrototypeSymbolHasInstance: a, ObjectDefineProperty: o, ObjectDefineProperties: s, ObjectSetPrototypeOf: c, StringPrototypeToLowerCase: l, Symbol: u, SymbolHasInstance: d } = is();
	t.exports = N, N.WritableState = j;
	var { EventEmitter: f } = q("events"), p = ps().Stream, { Buffer: m } = q("buffer"), h = fs(), { addAbortSignal: g } = ms(), { getHighWaterMark: _, getDefaultHighWaterMark: v } = gs(), { ERR_INVALID_ARG_TYPE: y, ERR_METHOD_NOT_IMPLEMENTED: b, ERR_MULTIPLE_CALLBACK: x, ERR_STREAM_CANNOT_PIPE: S, ERR_STREAM_DESTROYED: C, ERR_STREAM_ALREADY_FINISHED: w, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: E, ERR_UNKNOWN_ENCODING: D } = os().codes, { errorOrDestroy: O } = h;
	c(N.prototype, p.prototype), c(N, p);
	function k() {}
	var A = u("kOnFinished");
	function j(e, t, n) {
		typeof n != "boolean" && (n = t instanceof Cs()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", n) : v(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
		let r = !!(e && e.decodeStrings === !1);
		this.decodeStrings = !r, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = R.bind(void 0, t), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, M(this), this.pendingcb = 0, this.constructed = !0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !e || e.emitClose !== !1, this.autoDestroy = !e || e.autoDestroy !== !1, this.errored = null, this.closed = !1, this.closeEmitted = !1, this[A] = [];
	}
	function M(e) {
		e.buffered = [], e.bufferedIndex = 0, e.allBuffers = !0, e.allNoop = !0;
	}
	j.prototype.getBuffer = function() {
		return r(this.buffered, this.bufferedIndex);
	}, o(j.prototype, "bufferedRequestCount", {
		__proto__: null,
		get() {
			return this.buffered.length - this.bufferedIndex;
		}
	});
	function N(e) {
		let t = this instanceof Cs();
		if (!t && !a(N, this)) return new N(e);
		this._writableState = new j(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && g(e.signal, this)), p.call(this, e), h.construct(this, () => {
			let e = this._writableState;
			e.writing || H(this, e), K(this, e);
		});
	}
	o(N, d, {
		__proto__: null,
		value: function(e) {
			return a(this, e) ? !0 : this === N ? e && e._writableState instanceof j : !1;
		}
	}), N.prototype.pipe = function() {
		O(this, new S());
	};
	function P(e, t, r, i) {
		let a = e._writableState;
		if (typeof r == "function") i = r, r = a.defaultEncoding;
		else {
			if (!r) r = a.defaultEncoding;
			else if (r !== "buffer" && !m.isEncoding(r)) throw new D(r);
			typeof i != "function" && (i = k);
		}
		if (t === null) throw new T();
		if (!a.objectMode) if (typeof t == "string") a.decodeStrings !== !1 && (t = m.from(t, r), r = "buffer");
		else if (t instanceof m) r = "buffer";
		else if (p._isUint8Array(t)) t = p._uint8ArrayToBuffer(t), r = "buffer";
		else throw new y("chunk", [
			"string",
			"Buffer",
			"Uint8Array"
		], t);
		let o;
		return a.ending ? o = new E() : a.destroyed && (o = new C("write")), o ? (n.nextTick(i, o), O(e, o, !0), o) : (a.pendingcb++, F(e, a, t, r, i));
	}
	N.prototype.write = function(e, t, n) {
		return P(this, e, t, n) === !0;
	}, N.prototype.cork = function() {
		this._writableState.corked++;
	}, N.prototype.uncork = function() {
		let e = this._writableState;
		e.corked && (e.corked--, e.writing || H(this, e));
	}, N.prototype.setDefaultEncoding = function(e) {
		if (typeof e == "string" && (e = l(e)), !m.isEncoding(e)) throw new D(e);
		return this._writableState.defaultEncoding = e, this;
	};
	function F(e, t, n, r, i) {
		let a = t.objectMode ? 1 : n.length;
		t.length += a;
		let o = t.length < t.highWaterMark;
		return o || (t.needDrain = !0), t.writing || t.corked || t.errored || !t.constructed ? (t.buffered.push({
			chunk: n,
			encoding: r,
			callback: i
		}), t.allBuffers && r !== "buffer" && (t.allBuffers = !1), t.allNoop && i !== k && (t.allNoop = !1)) : (t.writelen = a, t.writecb = i, t.writing = !0, t.sync = !0, e._write(n, r, t.onwrite), t.sync = !1), o && !t.errored && !t.destroyed;
	}
	function I(e, t, n, r, i, a, o) {
		t.writelen = r, t.writecb = o, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new C("write")) : n ? e._writev(i, t.onwrite) : e._write(i, a, t.onwrite), t.sync = !1;
	}
	function L(e, t, n, r) {
		--t.pendingcb, r(n), V(t), O(e, n);
	}
	function R(e, t) {
		let r = e._writableState, i = r.sync, a = r.writecb;
		if (typeof a != "function") {
			O(e, new x());
			return;
		}
		r.writing = !1, r.writecb = null, r.length -= r.writelen, r.writelen = 0, t ? (t.stack, r.errored ||= t, e._readableState && !e._readableState.errored && (e._readableState.errored = t), i ? n.nextTick(L, e, r, t, a) : L(e, r, t, a)) : (r.buffered.length > r.bufferedIndex && H(e, r), i ? r.afterWriteTickInfo !== null && r.afterWriteTickInfo.cb === a ? r.afterWriteTickInfo.count++ : (r.afterWriteTickInfo = {
			count: 1,
			cb: a,
			stream: e,
			state: r
		}, n.nextTick(z, r.afterWriteTickInfo)) : B(e, r, 1, a));
	}
	function z({ stream: e, state: t, count: n, cb: r }) {
		return t.afterWriteTickInfo = null, B(e, t, n, r);
	}
	function B(e, t, n, r) {
		for (!t.ending && !e.destroyed && t.length === 0 && t.needDrain && (t.needDrain = !1, e.emit("drain")); n-- > 0;) t.pendingcb--, r();
		t.destroyed && V(t), K(e, t);
	}
	function V(e) {
		if (e.writing) return;
		for (let t = e.bufferedIndex; t < e.buffered.length; ++t) {
			let { chunk: n, callback: r } = e.buffered[t], i = e.objectMode ? 1 : n.length;
			e.length -= i, r(e.errored ?? new C("write"));
		}
		let t = e[A].splice(0);
		for (let n = 0; n < t.length; n++) t[n](e.errored ?? new C("end"));
		M(e);
	}
	function H(e, t) {
		if (t.corked || t.bufferProcessing || t.destroyed || !t.constructed) return;
		let { buffered: n, bufferedIndex: i, objectMode: a } = t, o = n.length - i;
		if (!o) return;
		let s = i;
		if (t.bufferProcessing = !0, o > 1 && e._writev) {
			t.pendingcb -= o - 1;
			let i = t.allNoop ? k : (e) => {
				for (let t = s; t < n.length; ++t) n[t].callback(e);
			}, a = t.allNoop && s === 0 ? n : r(n, s);
			a.allBuffers = t.allBuffers, I(e, t, !0, t.length, a, "", i), M(t);
		} else {
			do {
				let { chunk: r, encoding: i, callback: o } = n[s];
				n[s++] = null, I(e, t, !1, a ? 1 : r.length, r, i, o);
			} while (s < n.length && !t.writing);
			s === n.length ? M(t) : s > 256 ? (n.splice(0, s), t.bufferedIndex = 0) : t.bufferedIndex = s;
		}
		t.bufferProcessing = !1;
	}
	N.prototype._write = function(e, t, n) {
		if (this._writev) this._writev([{
			chunk: e,
			encoding: t
		}], n);
		else throw new b("_write()");
	}, N.prototype._writev = null, N.prototype.end = function(e, t, r) {
		let a = this._writableState;
		typeof e == "function" ? (r = e, e = null, t = null) : typeof t == "function" && (r = t, t = null);
		let o;
		if (e != null) {
			let n = P(this, e, t);
			n instanceof i && (o = n);
		}
		return a.corked && (a.corked = 1, this.uncork()), o || (!a.errored && !a.ending ? (a.ending = !0, K(this, a, !0), a.ended = !0) : a.finished ? o = new w("end") : a.destroyed && (o = new C("end"))), typeof r == "function" && (o || a.finished ? n.nextTick(r, o) : a[A].push(r)), this;
	};
	function U(e) {
		return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
	}
	function W(e, t) {
		let r = !1;
		function i(i) {
			if (r) {
				O(e, i ?? x());
				return;
			}
			if (r = !0, t.pendingcb--, i) {
				let n = t[A].splice(0);
				for (let e = 0; e < n.length; e++) n[e](i);
				O(e, i, t.sync);
			} else U(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, n.nextTick(J, e, t));
		}
		t.sync = !0, t.pendingcb++;
		try {
			e._final(i);
		} catch (e) {
			i(e);
		}
		t.sync = !1;
	}
	function G(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, W(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function K(e, t, r) {
		U(t) && (G(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, n.nextTick((e, t) => {
			U(t) ? J(e, t) : t.pendingcb--;
		}, e, t)) : U(t) && (t.pendingcb++, J(e, t))));
	}
	function J(e, t) {
		t.pendingcb--, t.finished = !0;
		let n = t[A].splice(0);
		for (let e = 0; e < n.length; e++) n[e]();
		if (e.emit("finish"), t.autoDestroy) {
			let t = e._readableState;
			(!t || t.autoDestroy && (t.endEmitted || t.readable === !1)) && e.destroy();
		}
	}
	s(N.prototype, {
		closed: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.closed : !1;
			}
		},
		destroyed: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.destroyed : !1;
			},
			set(e) {
				this._writableState && (this._writableState.destroyed = e);
			}
		},
		writable: {
			__proto__: null,
			get() {
				let e = this._writableState;
				return !!e && e.writable !== !1 && !e.destroyed && !e.errored && !e.ending && !e.ended;
			},
			set(e) {
				this._writableState && (this._writableState.writable = !!e);
			}
		},
		writableFinished: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.finished : !1;
			}
		},
		writableObjectMode: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.objectMode : !1;
			}
		},
		writableBuffer: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.getBuffer();
			}
		},
		writableEnded: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.ending : !1;
			}
		},
		writableNeedDrain: {
			__proto__: null,
			get() {
				let e = this._writableState;
				return e ? !e.destroyed && !e.ending && e.needDrain : !1;
			}
		},
		writableHighWaterMark: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.highWaterMark;
			}
		},
		writableCorked: {
			__proto__: null,
			get() {
				return this._writableState ? this._writableState.corked : 0;
			}
		},
		writableLength: {
			__proto__: null,
			get() {
				return this._writableState && this._writableState.length;
			}
		},
		errored: {
			__proto__: null,
			enumerable: !1,
			get() {
				return this._writableState ? this._writableState.errored : null;
			}
		},
		writableAborted: {
			__proto__: null,
			enumerable: !1,
			get: function() {
				return !!(this._writableState.writable !== !1 && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
			}
		}
	});
	var ee = h.destroy;
	N.prototype.destroy = function(e, t) {
		let r = this._writableState;
		return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[A].length) && n.nextTick(V, r), ee.call(this, e, t), this;
	}, N.prototype._undestroy = h.undestroy, N.prototype._destroy = function(e, t) {
		t(e);
	}, N.prototype[f.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	};
	var te;
	function ne() {
		return te === void 0 && (te = {}), te;
	}
	N.fromWeb = function(e, t) {
		return ne().newStreamWritableFromWritableStream(e, t);
	}, N.toWeb = function(e) {
		return ne().newWritableStreamFromStreamWritable(e);
	};
})), Ss = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), r = q("buffer"), { isReadable: i, isWritable: a, isIterable: o, isNodeStream: s, isReadableNodeStream: c, isWritableNodeStream: l, isDuplexNodeStream: u, isReadableStream: d, isWritableStream: f } = us(), p = ds(), { AbortError: m, codes: { ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: g } } = os(), { destroyer: _ } = fs(), v = Cs(), y = bs(), b = xs(), { createDeferredPromise: x } = ss(), S = ys(), C = globalThis.Blob || r.Blob, w = C === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof C;
	}, T = globalThis.AbortController || (pa(), K(aa)).AbortController, { FunctionPrototypeCall: E } = is(), D = class extends v {
		constructor(e) {
			super(e), e?.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e?.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0);
		}
	};
	t.exports = function e(t, r) {
		if (u(t)) return t;
		if (c(t)) return k({ readable: t });
		if (l(t)) return k({ writable: t });
		if (s(t)) return k({
			writable: !1,
			readable: !1
		});
		if (d(t)) return k({ readable: y.fromWeb(t) });
		if (f(t)) return k({ writable: b.fromWeb(t) });
		if (typeof t == "function") {
			let { value: e, write: i, final: a, destroy: s } = O(t);
			if (o(e)) return S(D, e, {
				objectMode: !0,
				write: i,
				final: a,
				destroy: s
			});
			let c = e?.then;
			if (typeof c == "function") {
				let t, r = E(c, e, (e) => {
					if (e != null) throw new g("nully", "body", e);
				}, (e) => {
					_(t, e);
				});
				return t = new D({
					objectMode: !0,
					readable: !1,
					write: i,
					final(e) {
						a(async () => {
							try {
								await r, n.nextTick(e, null);
							} catch (t) {
								n.nextTick(e, t);
							}
						});
					},
					destroy: s
				});
			}
			throw new g("Iterable, AsyncIterable or AsyncFunction", r, e);
		}
		if (w(t)) return e(t.arrayBuffer());
		if (o(t)) return S(D, t, {
			objectMode: !0,
			writable: !1
		});
		if (d(t?.readable) && f(t?.writable)) return D.fromWeb(t);
		if (typeof t?.writable == "object" || typeof t?.readable == "object") return k({
			readable: t != null && t.readable ? c(t?.readable) ? t?.readable : e(t.readable) : void 0,
			writable: t != null && t.writable ? l(t?.writable) ? t?.writable : e(t.writable) : void 0
		});
		let i = t?.then;
		if (typeof i == "function") {
			let e;
			return E(i, t, (t) => {
				t != null && e.push(t), e.push(null);
			}, (t) => {
				_(e, t);
			}), e = new D({
				objectMode: !0,
				writable: !1,
				read() {}
			});
		}
		throw new h(r, [
			"Blob",
			"ReadableStream",
			"WritableStream",
			"Stream",
			"Iterable",
			"AsyncIterable",
			"Function",
			"{ readable, writable } pair",
			"Promise"
		], t);
	};
	function O(e) {
		let { promise: t, resolve: r } = x(), i = new T(), a = i.signal;
		return {
			value: e((async function* () {
				for (;;) {
					let e = t;
					t = null;
					let { chunk: i, done: o, cb: s } = await e;
					if (n.nextTick(s), o) return;
					if (a.aborted) throw new m(void 0, { cause: a.reason });
					({promise: t, resolve: r} = x()), yield i;
				}
			})(), { signal: a }),
			write(e, t, n) {
				let i = r;
				r = null, i({
					chunk: e,
					done: !1,
					cb: n
				});
			},
			final(e) {
				let t = r;
				r = null, t({
					done: !0,
					cb: e
				});
			},
			destroy(e, t) {
				i.abort(), t(e);
			}
		};
	}
	function k(e) {
		let t = e.readable && typeof e.readable.read != "function" ? y.wrap(e.readable) : e.readable, n = e.writable, r = !!i(t), o = !!a(n), s, c, l, u, d;
		function f(e) {
			let t = u;
			u = null, t ? t(e) : e && d.destroy(e);
		}
		return d = new D({
			readableObjectMode: !!(t != null && t.readableObjectMode),
			writableObjectMode: !!(n != null && n.writableObjectMode),
			readable: r,
			writable: o
		}), o && (p(n, (e) => {
			o = !1, e && _(t, e), f(e);
		}), d._write = function(e, t, r) {
			n.write(e, t) ? r() : s = r;
		}, d._final = function(e) {
			n.end(), c = e;
		}, n.on("drain", function() {
			if (s) {
				let e = s;
				s = null, e();
			}
		}), n.on("finish", function() {
			if (c) {
				let e = c;
				c = null, e();
			}
		})), r && (p(t, (e) => {
			r = !1, e && _(t, e), f(e);
		}), t.on("readable", function() {
			if (l) {
				let e = l;
				l = null, e();
			}
		}), t.on("end", function() {
			d.push(null);
		}), d._read = function() {
			for (;;) {
				let e = t.read();
				if (e === null) {
					l = d._read;
					return;
				}
				if (!d.push(e)) return;
			}
		}), d._destroy = function(e, r) {
			!e && u !== null && (e = new m()), l = null, s = null, c = null, u === null ? r(e) : (u = r, _(n, e), _(t, e));
		}, d;
	}
})), Cs = /* @__PURE__ */ H(((e, t) => {
	var { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i, ObjectSetPrototypeOf: a } = is();
	t.exports = c;
	var o = bs(), s = xs();
	a(c.prototype, o.prototype), a(c, o);
	{
		let e = i(s.prototype);
		for (let t = 0; t < e.length; t++) {
			let n = e[t];
			c.prototype[n] || (c.prototype[n] = s.prototype[n]);
		}
	}
	function c(e) {
		if (!(this instanceof c)) return new c(e);
		o.call(this, e), s.call(this, e), e ? (this.allowHalfOpen = e.allowHalfOpen !== !1, e.readable === !1 && (this._readableState.readable = !1, this._readableState.ended = !0, this._readableState.endEmitted = !0), e.writable === !1 && (this._writableState.writable = !1, this._writableState.ending = !0, this._writableState.ended = !0, this._writableState.finished = !0)) : this.allowHalfOpen = !0;
	}
	n(c.prototype, {
		writable: {
			__proto__: null,
			...r(s.prototype, "writable")
		},
		writableHighWaterMark: {
			__proto__: null,
			...r(s.prototype, "writableHighWaterMark")
		},
		writableObjectMode: {
			__proto__: null,
			...r(s.prototype, "writableObjectMode")
		},
		writableBuffer: {
			__proto__: null,
			...r(s.prototype, "writableBuffer")
		},
		writableLength: {
			__proto__: null,
			...r(s.prototype, "writableLength")
		},
		writableFinished: {
			__proto__: null,
			...r(s.prototype, "writableFinished")
		},
		writableCorked: {
			__proto__: null,
			...r(s.prototype, "writableCorked")
		},
		writableEnded: {
			__proto__: null,
			...r(s.prototype, "writableEnded")
		},
		writableNeedDrain: {
			__proto__: null,
			...r(s.prototype, "writableNeedDrain")
		},
		destroyed: {
			__proto__: null,
			get() {
				return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
			},
			set(e) {
				this._readableState && this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e);
			}
		}
	});
	var l;
	function u() {
		return l === void 0 && (l = {}), l;
	}
	c.fromWeb = function(e, t) {
		return u().newStreamDuplexFromReadableWritablePair(e, t);
	}, c.toWeb = function(e) {
		return u().newReadableWritablePairFromDuplex(e);
	};
	var d;
	c.from = function(e) {
		return d ||= Ss(), d(e, "body");
	};
})), ws = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n, Symbol: r } = is();
	t.exports = c;
	var { ERR_METHOD_NOT_IMPLEMENTED: i } = os().codes, a = Cs(), { getHighWaterMark: o } = gs();
	n(c.prototype, a.prototype), n(c, a);
	var s = r("kCallback");
	function c(e) {
		if (!(this instanceof c)) return new c(e);
		let t = e ? o(this, e, "readableHighWaterMark", !0) : null;
		t === 0 && (e = {
			...e,
			highWaterMark: null,
			readableHighWaterMark: t,
			writableHighWaterMark: e.writableHighWaterMark || 0
		}), a.call(this, e), this._readableState.sync = !1, this[s] = null, e && (typeof e.transform == "function" && (this._transform = e.transform), typeof e.flush == "function" && (this._flush = e.flush)), this.on("prefinish", u);
	}
	function l(e) {
		typeof this._flush == "function" && !this.destroyed ? this._flush((t, n) => {
			if (t) {
				e ? e(t) : this.destroy(t);
				return;
			}
			n != null && this.push(n), this.push(null), e && e();
		}) : (this.push(null), e && e());
	}
	function u() {
		this._final !== l && l.call(this);
	}
	c.prototype._final = l, c.prototype._transform = function(e, t, n) {
		throw new i("_transform()");
	}, c.prototype._write = function(e, t, n) {
		let r = this._readableState, i = this._writableState, a = r.length;
		this._transform(e, t, (e, t) => {
			if (e) {
				n(e);
				return;
			}
			t != null && this.push(t), i.ended || a === r.length || r.length < r.highWaterMark ? n() : this[s] = n;
		});
	}, c.prototype._read = function() {
		if (this[s]) {
			let e = this[s];
			this[s] = null, e();
		}
	};
})), Ts = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n } = is();
	t.exports = i;
	var r = ws();
	n(i.prototype, r.prototype), n(i, r);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		r.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), Es = /* @__PURE__ */ H(((e, t) => {
	var n = ls(), { ArrayIsArray: r, Promise: i, SymbolAsyncIterator: a, SymbolDispose: o } = is(), s = ds(), { once: c } = ss(), l = fs(), u = Cs(), { aggregateTwoErrors: d, codes: { ERR_INVALID_ARG_TYPE: f, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: m, ERR_STREAM_DESTROYED: h, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: _ } = os(), { validateFunction: v, validateAbortSignal: y } = cs(), { isIterable: b, isReadable: x, isReadableNodeStream: S, isNodeStream: C, isTransformStream: w, isWebStream: T, isReadableStream: E, isReadableFinished: D } = us(), O = globalThis.AbortController || (pa(), K(aa)).AbortController, k, A, j;
	function M(e, t, n) {
		let r = !1;
		return e.on("close", () => {
			r = !0;
		}), {
			destroy: (t) => {
				r || (r = !0, l.destroyer(e, t || new h("pipe")));
			},
			cleanup: s(e, {
				readable: t,
				writable: n
			}, (e) => {
				r = !e;
			})
		};
	}
	function N(e) {
		return v(e[e.length - 1], "streams[stream.length - 1]"), e.pop();
	}
	function P(e) {
		if (b(e)) return e;
		if (S(e)) return F(e);
		throw new f("val", [
			"Readable",
			"Iterable",
			"AsyncIterable"
		], e);
	}
	async function* F(e) {
		A ||= bs(), yield* A.prototype[a].call(e);
	}
	async function I(e, t, n, { end: r }) {
		let a, o = null, c = (e) => {
			if (e && (a = e), o) {
				let e = o;
				o = null, e();
			}
		}, l = () => new i((e, t) => {
			a ? t(a) : o = () => {
				a ? t(a) : e();
			};
		});
		t.on("drain", c);
		let u = s(t, { readable: !1 }, c);
		try {
			t.writableNeedDrain && await l();
			for await (let n of e) t.write(n) || await l();
			r && (t.end(), await l()), n();
		} catch (e) {
			n(a === e ? e : d(a, e));
		} finally {
			u(), t.off("drain", c);
		}
	}
	async function L(e, t, n, { end: r }) {
		w(t) && (t = t.writable);
		let i = t.getWriter();
		try {
			for await (let t of e) await i.ready, i.write(t).catch(() => {});
			await i.ready, r && await i.close(), n();
		} catch (e) {
			try {
				await i.abort(e), n(e);
			} catch (e) {
				n(e);
			}
		}
	}
	function R(...e) {
		return z(e, c(N(e)));
	}
	function z(e, t, i) {
		if (e.length === 1 && r(e[0]) && (e = e[0]), e.length < 2) throw new m("streams");
		let a = new O(), s = a.signal, c = i?.signal, l = [];
		y(c, "options.signal");
		function d() {
			F(new _());
		}
		j ||= ss().addAbortListener;
		let h;
		c && (h = j(c, d));
		let g, v, D = [], A = 0;
		function N(e) {
			F(e, --A === 0);
		}
		function F(e, r) {
			var i;
			if (e && (!g || g.code === "ERR_STREAM_PREMATURE_CLOSE") && (g = e), !(!g && !r)) {
				for (; D.length;) D.shift()(g);
				(i = h) == null || i[o](), a.abort(), r && (g || l.forEach((e) => e()), n.nextTick(t, g, v));
			}
		}
		let R;
		for (let t = 0; t < e.length; t++) {
			let r = e[t], a = t < e.length - 1, o = t > 0, c = a || i?.end !== !1, d = t === e.length - 1;
			if (C(r)) {
				if (c) {
					let { destroy: e, cleanup: t } = M(r, a, o);
					D.push(e), x(r) && d && l.push(t);
				}
				function e(e) {
					e && e.name !== "AbortError" && e.code !== "ERR_STREAM_PREMATURE_CLOSE" && N(e);
				}
				r.on("error", e), x(r) && d && l.push(() => {
					r.removeListener("error", e);
				});
			}
			if (t === 0) if (typeof r == "function") {
				if (R = r({ signal: s }), !b(R)) throw new p("Iterable, AsyncIterable or Stream", "source", R);
			} else R = b(r) || S(r) || w(r) ? r : u.from(r);
			else if (typeof r == "function") if (R = w(R) ? P(R?.readable) : P(R), R = r(R, { signal: s }), a) {
				if (!b(R, !0)) throw new p("AsyncIterable", `transform[${t - 1}]`, R);
			} else {
				k ||= Ts();
				let e = new k({ objectMode: !0 }), t = R?.then;
				if (typeof t == "function") A++, t.call(R, (t) => {
					v = t, t != null && e.write(t), c && e.end(), n.nextTick(N);
				}, (t) => {
					e.destroy(t), n.nextTick(N, t);
				});
				else if (b(R, !0)) A++, I(R, e, N, { end: c });
				else if (E(R) || w(R)) {
					let t = R.readable || R;
					A++, I(t, e, N, { end: c });
				} else throw new p("AsyncIterable or Promise", "destination", R);
				R = e;
				let { destroy: r, cleanup: i } = M(R, !1, !0);
				D.push(r), d && l.push(i);
			}
			else if (C(r)) {
				if (S(R)) {
					A += 2;
					let e = B(R, r, N, { end: c });
					x(r) && d && l.push(e);
				} else if (w(R) || E(R)) {
					let e = R.readable || R;
					A++, I(e, r, N, { end: c });
				} else if (b(R)) A++, I(R, r, N, { end: c });
				else throw new f("val", [
					"Readable",
					"Iterable",
					"AsyncIterable",
					"ReadableStream",
					"TransformStream"
				], R);
				R = r;
			} else if (T(r)) {
				if (S(R)) A++, L(P(R), r, N, { end: c });
				else if (E(R) || b(R)) A++, L(R, r, N, { end: c });
				else if (w(R)) A++, L(R.readable, r, N, { end: c });
				else throw new f("val", [
					"Readable",
					"Iterable",
					"AsyncIterable",
					"ReadableStream",
					"TransformStream"
				], R);
				R = r;
			} else R = u.from(r);
		}
		return (s != null && s.aborted || c != null && c.aborted) && n.nextTick(d), R;
	}
	function B(e, t, r, { end: i }) {
		let a = !1;
		if (t.on("close", () => {
			a || r(new g());
		}), e.pipe(t, { end: !1 }), i) {
			function r() {
				a = !0, t.end();
			}
			D(e) ? n.nextTick(r) : e.once("end", r);
		} else r();
		return s(e, {
			readable: !0,
			writable: !1
		}, (t) => {
			let n = e._readableState;
			t && t.code === "ERR_STREAM_PREMATURE_CLOSE" && n && n.ended && !n.errored && !n.errorEmitted ? e.once("end", r).once("error", r) : r(t);
		}), s(t, {
			readable: !1,
			writable: !0
		}, r);
	}
	t.exports = {
		pipelineImpl: z,
		pipeline: R
	};
})), Ds = /* @__PURE__ */ H(((e, t) => {
	var { pipeline: n } = Es(), r = Cs(), { destroyer: i } = fs(), { isNodeStream: a, isReadable: o, isWritable: s, isWebStream: c, isTransformStream: l, isWritableStream: u, isReadableStream: d } = us(), { AbortError: f, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: m } } = os(), h = ds();
	t.exports = function(...e) {
		if (e.length === 0) throw new m("streams");
		if (e.length === 1) return r.from(e[0]);
		let t = [...e];
		if (typeof e[0] == "function" && (e[0] = r.from(e[0])), typeof e[e.length - 1] == "function") {
			let t = e.length - 1;
			e[t] = r.from(e[t]);
		}
		for (let n = 0; n < e.length; ++n) if (!(!a(e[n]) && !c(e[n]))) {
			if (n < e.length - 1 && !(o(e[n]) || d(e[n]) || l(e[n]))) throw new p(`streams[${n}]`, t[n], "must be readable");
			if (n > 0 && !(s(e[n]) || u(e[n]) || l(e[n]))) throw new p(`streams[${n}]`, t[n], "must be writable");
		}
		let g, _, v, y, b;
		function x(e) {
			let t = y;
			y = null, t ? t(e) : e ? b.destroy(e) : !T && !w && b.destroy();
		}
		let S = e[0], C = n(e, x), w = !!(s(S) || u(S) || l(S)), T = !!(o(C) || d(C) || l(C));
		if (b = new r({
			writableObjectMode: !!(S != null && S.writableObjectMode),
			readableObjectMode: !!(C != null && C.readableObjectMode),
			writable: w,
			readable: T
		}), w) {
			if (a(S)) b._write = function(e, t, n) {
				S.write(e, t) ? n() : g = n;
			}, b._final = function(e) {
				S.end(), _ = e;
			}, S.on("drain", function() {
				if (g) {
					let e = g;
					g = null, e();
				}
			});
			else if (c(S)) {
				let e = (l(S) ? S.writable : S).getWriter();
				b._write = async function(t, n, r) {
					try {
						await e.ready, e.write(t).catch(() => {}), r();
					} catch (e) {
						r(e);
					}
				}, b._final = async function(t) {
					try {
						await e.ready, e.close().catch(() => {}), _ = t;
					} catch (e) {
						t(e);
					}
				};
			}
			h(l(C) ? C.readable : C, () => {
				if (_) {
					let e = _;
					_ = null, e();
				}
			});
		}
		if (T) {
			if (a(C)) C.on("readable", function() {
				if (v) {
					let e = v;
					v = null, e();
				}
			}), C.on("end", function() {
				b.push(null);
			}), b._read = function() {
				for (;;) {
					let e = C.read();
					if (e === null) {
						v = b._read;
						return;
					}
					if (!b.push(e)) return;
				}
			};
			else if (c(C)) {
				let e = (l(C) ? C.readable : C).getReader();
				b._read = async function() {
					for (;;) try {
						let { value: t, done: n } = await e.read();
						if (!b.push(t)) return;
						if (n) {
							b.push(null);
							return;
						}
					} catch {
						return;
					}
				};
			}
		}
		return b._destroy = function(e, t) {
			!e && y !== null && (e = new f()), v = null, g = null, _ = null, y === null ? t(e) : (y = t, a(C) && i(C, e));
		}, b;
	};
})), Os = /* @__PURE__ */ H(((e, t) => {
	var n = globalThis.AbortController || (pa(), K(aa)).AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i, ERR_MISSING_ARGS: a, ERR_OUT_OF_RANGE: o }, AbortError: s } = os(), { validateAbortSignal: c, validateInteger: l, validateObject: u } = cs(), d = is().Symbol("kWeak"), f = is().Symbol("kResistStopPropagation"), { finished: p } = ds(), m = Ds(), { addAbortSignalNoValidate: h } = ms(), { isWritable: g, isNodeStream: _ } = us(), { deprecate: v } = ss(), { ArrayPrototypePush: y, Boolean: b, MathFloor: x, Number: S, NumberIsNaN: C, Promise: w, PromiseReject: T, PromiseResolve: E, PromisePrototypeThen: D, Symbol: O } = is(), k = O("kEmpty"), A = O("kEof");
	function j(e, t) {
		if (t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), _(e) && !g(e)) throw new r("stream", e, "must be writable");
		let n = m(this, e);
		return t != null && t.signal && h(t.signal, n), n;
	}
	function M(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal");
		let n = 1;
		t?.concurrency != null && (n = x(t.concurrency));
		let r = n - 1;
		return t?.highWaterMark != null && (r = x(t.highWaterMark)), l(n, "options.concurrency", 1), l(r, "options.highWaterMark", 0), r += n, async function* () {
			let i = ss().AbortSignalAny([t?.signal].filter(b)), a = this, o = [], c = { signal: i }, l, u, d = !1, f = 0;
			function p() {
				d = !0, m();
			}
			function m() {
				--f, h();
			}
			function h() {
				u && !d && f < n && o.length < r && (u(), u = null);
			}
			async function g() {
				try {
					for await (let t of a) {
						if (d) return;
						if (i.aborted) throw new s();
						try {
							if (t = e(t, c), t === k) continue;
							t = E(t);
						} catch (e) {
							t = T(e);
						}
						f += 1, D(t, m, p), o.push(t), l &&= (l(), null), !d && (o.length >= r || f >= n) && await new w((e) => {
							u = e;
						});
					}
					o.push(A);
				} catch (e) {
					let t = T(e);
					D(t, m, p), o.push(t);
				} finally {
					d = !0, l &&= (l(), null);
				}
			}
			g();
			try {
				for (;;) {
					for (; o.length > 0;) {
						let e = await o[0];
						if (e === A) return;
						if (i.aborted) throw new s();
						e !== k && (yield e), o.shift(), h();
					}
					await new w((e) => {
						l = e;
					});
				}
			} finally {
				d = !0, u &&= (u(), null);
			}
		}.call(this);
	}
	function N(e = void 0) {
		return e != null && u(e, "options"), e?.signal != null && c(e.signal, "options.signal"), async function* () {
			let t = 0;
			for await (let r of this) {
				var n;
				if (e != null && (n = e.signal) != null && n.aborted) throw new s({ cause: e.signal.reason });
				yield [t++, r];
			}
		}.call(this);
	}
	async function P(e, t = void 0) {
		for await (let n of R.call(this, e, t)) return !0;
		return !1;
	}
	async function F(e, t = void 0) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		return !await P.call(this, async (...t) => !await e(...t), t);
	}
	async function I(e, t) {
		for await (let n of R.call(this, e, t)) return n;
	}
	async function L(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		async function n(t, n) {
			return await e(t, n), k;
		}
		for await (let e of M.call(this, n, t));
	}
	function R(e, t) {
		if (typeof e != "function") throw new i("fn", ["Function", "AsyncFunction"], e);
		async function n(t, n) {
			return await e(t, n) ? t : k;
		}
		return M.call(this, n, t);
	}
	var z = class extends a {
		constructor() {
			super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
		}
	};
	async function B(e, t, r) {
		var a;
		if (typeof e != "function") throw new i("reducer", ["Function", "AsyncFunction"], e);
		r != null && u(r, "options"), r?.signal != null && c(r.signal, "options.signal");
		let o = arguments.length > 1;
		if (r != null && (a = r.signal) != null && a.aborted) {
			let e = new s(void 0, { cause: r.signal.reason });
			throw this.once("error", () => {}), await p(this.destroy(e)), e;
		}
		let l = new n(), m = l.signal;
		if (r != null && r.signal) {
			let e = {
				once: !0,
				[d]: this,
				[f]: !0
			};
			r.signal.addEventListener("abort", () => l.abort(), e);
		}
		let h = !1;
		try {
			for await (let n of this) {
				var g;
				if (h = !0, r != null && (g = r.signal) != null && g.aborted) throw new s();
				o ? t = await e(t, n, { signal: m }) : (t = n, o = !0);
			}
			if (!h && !o) throw new z();
		} finally {
			l.abort();
		}
		return t;
	}
	async function V(e) {
		e != null && u(e, "options"), e?.signal != null && c(e.signal, "options.signal");
		let t = [];
		for await (let r of this) {
			var n;
			if (e != null && (n = e.signal) != null && n.aborted) throw new s(void 0, { cause: e.signal.reason });
			y(t, r);
		}
		return t;
	}
	function H(e, t) {
		let n = M.call(this, e, t);
		return async function* () {
			for await (let e of n) yield* e;
		}.call(this);
	}
	function U(e) {
		if (e = S(e), C(e)) return 0;
		if (e < 0) throw new o("number", ">= 0", e);
		return e;
	}
	function W(e, t = void 0) {
		return t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), e = U(e), async function* () {
			var n;
			if (t != null && (n = t.signal) != null && n.aborted) throw new s();
			for await (let n of this) {
				var r;
				if (t != null && (r = t.signal) != null && r.aborted) throw new s();
				e-- <= 0 && (yield n);
			}
		}.call(this);
	}
	function G(e, t = void 0) {
		return t != null && u(t, "options"), t?.signal != null && c(t.signal, "options.signal"), e = U(e), async function* () {
			var n;
			if (t != null && (n = t.signal) != null && n.aborted) throw new s();
			for await (let n of this) {
				var r;
				if (t != null && (r = t.signal) != null && r.aborted) throw new s();
				if (e-- > 0 && (yield n), e <= 0) return;
			}
		}.call(this);
	}
	t.exports.streamReturningOperators = {
		asIndexedPairs: v(N, "readable.asIndexedPairs will be removed in a future version."),
		drop: W,
		filter: R,
		flatMap: H,
		map: M,
		take: G,
		compose: j
	}, t.exports.promiseReturningOperators = {
		every: F,
		forEach: L,
		reduce: B,
		toArray: V,
		some: P,
		find: I
	};
})), ks = /* @__PURE__ */ H(((e, t) => {
	var { ArrayPrototypePop: n, Promise: r } = is(), { isIterable: i, isNodeStream: a, isWebStream: o } = us(), { pipelineImpl: s } = Es(), { finished: c } = ds();
	As();
	function l(...e) {
		return new r((t, r) => {
			let c, l, u = e[e.length - 1];
			if (u && typeof u == "object" && !a(u) && !i(u) && !o(u)) {
				let t = n(e);
				c = t.signal, l = t.end;
			}
			s(e, (e, n) => {
				e ? r(e) : t(n);
			}, {
				signal: c,
				end: l
			});
		});
	}
	t.exports = {
		finished: c,
		pipeline: l
	};
})), As = /* @__PURE__ */ H(((e, t) => {
	var { Buffer: n } = q("buffer"), { ObjectDefineProperty: r, ObjectKeys: i, ReflectApply: a } = is(), { promisify: { custom: o } } = ss(), { streamReturningOperators: s, promiseReturningOperators: c } = Os(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: l } } = os(), u = Ds(), { setDefaultHighWaterMark: d, getDefaultHighWaterMark: f } = gs(), { pipeline: p } = Es(), { destroyer: m } = fs(), h = ds(), g = ks(), _ = us(), v = t.exports = ps().Stream;
	v.isDestroyed = _.isDestroyed, v.isDisturbed = _.isDisturbed, v.isErrored = _.isErrored, v.isReadable = _.isReadable, v.isWritable = _.isWritable, v.Readable = bs();
	for (let e of i(s)) {
		let t = s[e];
		function n(...e) {
			if (new.target) throw l();
			return v.Readable.from(a(t, this, e));
		}
		r(n, "name", {
			__proto__: null,
			value: t.name
		}), r(n, "length", {
			__proto__: null,
			value: t.length
		}), r(v.Readable.prototype, e, {
			__proto__: null,
			value: n,
			enumerable: !1,
			configurable: !0,
			writable: !0
		});
	}
	for (let e of i(c)) {
		let t = c[e];
		function n(...e) {
			if (new.target) throw l();
			return a(t, this, e);
		}
		r(n, "name", {
			__proto__: null,
			value: t.name
		}), r(n, "length", {
			__proto__: null,
			value: t.length
		}), r(v.Readable.prototype, e, {
			__proto__: null,
			value: n,
			enumerable: !1,
			configurable: !0,
			writable: !0
		});
	}
	v.Writable = xs(), v.Duplex = Cs(), v.Transform = ws(), v.PassThrough = Ts(), v.pipeline = p;
	var { addAbortSignal: y } = ms();
	v.addAbortSignal = y, v.finished = h, v.destroy = m, v.compose = u, v.setDefaultHighWaterMark = d, v.getDefaultHighWaterMark = f, r(v, "promises", {
		__proto__: null,
		configurable: !0,
		enumerable: !0,
		get() {
			return g;
		}
	}), r(p, o, {
		__proto__: null,
		enumerable: !0,
		get() {
			return g.pipeline;
		}
	}), r(h, o, {
		__proto__: null,
		enumerable: !0,
		get() {
			return g.finished;
		}
	}), v.Stream = v, v._isUint8Array = function(e) {
		return e instanceof Uint8Array;
	}, v._uint8ArrayToBuffer = function(e) {
		return n.from(e.buffer, e.byteOffset, e.byteLength);
	};
})), js = (/* @__PURE__ */ H(((e, t) => {
	var n = q("stream");
	if (n && process.env.READABLE_STREAM === "disable") {
		let e = n.promises;
		t.exports._uint8ArrayToBuffer = n._uint8ArrayToBuffer, t.exports._isUint8Array = n._isUint8Array, t.exports.isDisturbed = n.isDisturbed, t.exports.isErrored = n.isErrored, t.exports.isReadable = n.isReadable, t.exports.Readable = n.Readable, t.exports.Writable = n.Writable, t.exports.Duplex = n.Duplex, t.exports.Transform = n.Transform, t.exports.PassThrough = n.PassThrough, t.exports.addAbortSignal = n.addAbortSignal, t.exports.finished = n.finished, t.exports.destroy = n.destroy, t.exports.pipeline = n.pipeline, t.exports.compose = n.compose, Object.defineProperty(n, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return e;
			}
		}), t.exports.Stream = n.Stream;
	} else {
		let e = As(), n = ks(), r = e.Readable.destroy;
		t.exports = e.Readable, t.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, t.exports._isUint8Array = e._isUint8Array, t.exports.isDisturbed = e.isDisturbed, t.exports.isErrored = e.isErrored, t.exports.isReadable = e.isReadable, t.exports.Readable = e.Readable, t.exports.Writable = e.Writable, t.exports.Duplex = e.Duplex, t.exports.Transform = e.Transform, t.exports.PassThrough = e.PassThrough, t.exports.addAbortSignal = e.addAbortSignal, t.exports.finished = e.finished, t.exports.destroy = e.destroy, t.exports.destroy = r, t.exports.pipeline = e.pipeline, t.exports.compose = e.compose, Object.defineProperty(e, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return n;
			}
		}), t.exports.Stream = e.Stream;
	}
	t.exports.default = t.exports;
})))(), Ms = /* @__PURE__ */ G(rs(), 1), Ns = class extends js.Transform {
	constructor(e) {
		super(e), this.checksum = Buffer.allocUnsafe(4), this.checksum.writeInt32BE(0, 0), this.rawSize = 0;
	}
	_transform(e, t, n) {
		e && (this.checksum = Ms.default.buf(e, this.checksum) >>> 0, this.rawSize += e.length), n(null, e);
	}
	digest(e) {
		let t = Buffer.allocUnsafe(4);
		return t.writeUInt32BE(this.checksum >>> 0, 0), e ? t.toString(e) : t;
	}
	hex() {
		return this.digest("hex").toUpperCase();
	}
	size() {
		return this.rawSize;
	}
}, Ps = class extends j {
	constructor(e) {
		super(e), this.checksum = Buffer.allocUnsafe(4), this.checksum.writeInt32BE(0, 0), this.rawSize = 0, this.compressedSize = 0;
	}
	push(e, t) {
		return e && (this.compressedSize += e.length), super.push(e, t);
	}
	_transform(e, t, n) {
		e && (this.checksum = Ms.default.buf(e, this.checksum) >>> 0, this.rawSize += e.length), super._transform(e, t, n);
	}
	digest(e) {
		let t = Buffer.allocUnsafe(4);
		return t.writeUInt32BE(this.checksum >>> 0, 0), e ? t.toString(e) : t;
	}
	hex() {
		return this.digest("hex").toUpperCase();
	}
	size(e = !1) {
		return e ? this.compressedSize : this.rawSize;
	}
};
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/zip-archive-output-stream.js
function Fs(e) {
	return typeof e != "object" && (e = {}), typeof e.zlib != "object" && (e.zlib = {}), typeof e.zlib.level != "number" && (e.zlib.level = 1), e.forceZip64 = !!e.forceZip64, e.forceLocalTime = !!e.forceLocalTime, e;
}
var Is = class extends ns {
	constructor(e) {
		let t = Fs(e);
		super(t), this.options = t, this._entry = null, this._entries = [], this._archive = {
			centralLength: 0,
			centralOffset: 0,
			comment: "",
			finish: !1,
			finished: !1,
			processing: !1,
			forceZip64: t.forceZip64,
			forceLocalTime: t.forceLocalTime
		};
	}
	_afterAppend(e) {
		this._entries.push(e), e.getGeneralPurposeBit().usesDataDescriptor() && this._writeDataDescriptor(e), this._archive.processing = !1, this._entry = null, this._archive.finish && !this._archive.finished && this._finish();
	}
	_appendBuffer(e, t, n) {
		t.length === 0 && e.setMethod(0);
		var r = e.getMethod();
		if (r === 0 && (e.setSize(t.length), e.setCompressedSize(t.length), e.setCrc(Ms.default.buf(t) >>> 0)), this._writeLocalFileHeader(e), r === 0) {
			this.write(t), this._afterAppend(e), n(null, e);
			return;
		} else if (r === 8) {
			this._smartStream(e, n).end(t);
			return;
		} else {
			n(/* @__PURE__ */ Error("compression method " + r + " not implemented"));
			return;
		}
	}
	_appendStream(e, t, n) {
		e.getGeneralPurposeBit().useDataDescriptor(!0), e.setVersionNeededToExtract(20), this._writeLocalFileHeader(e);
		var r = this._smartStream(e, n);
		t.once("error", function(e) {
			r.emit("error", e), r.end();
		}), t.pipe(r);
	}
	_finish() {
		this._archive.centralOffset = this.offset, this._entries.forEach(function(e) {
			this._writeCentralFileHeader(e);
		}.bind(this)), this._archive.centralLength = this.offset - this._archive.centralOffset, this.isZip64() && this._writeCentralDirectoryZip64(), this._writeCentralDirectoryEnd(), this._archive.processing = !1, this._archive.finish = !0, this._archive.finished = !0, this.end();
	}
	_normalizeEntry(e) {
		e.getMethod() === -1 && e.setMethod(8), e.getMethod() === 8 && (e.getGeneralPurposeBit().useDataDescriptor(!0), e.setVersionNeededToExtract(20)), e.getTime() === -1 && e.setTime(/* @__PURE__ */ new Date(), this._archive.forceLocalTime), e._offsets = {
			file: 0,
			data: 0,
			contents: 0
		};
	}
	_smartStream(e, t) {
		var n = e.getMethod() === 8 ? new Ps(this.options.zlib) : new Ns(), r = null;
		function i() {
			var i = n.digest().readUInt32BE(0);
			e.setCrc(i), e.setSize(n.size()), e.setCompressedSize(n.size(!0)), this._afterAppend(e), t(r, e);
		}
		return n.once("end", i.bind(this)), n.once("error", function(e) {
			r = e;
		}), n.pipe(this, { end: !1 }), n;
	}
	_writeCentralDirectoryEnd() {
		var e = this._entries.length, t = this._archive.centralLength, n = this._archive.centralOffset;
		this.isZip64() && (e = xo, t = So, n = So), this.write(to(vo)), this.write(po), this.write(po), this.write($a(e)), this.write($a(e)), this.write(to(t)), this.write(to(n));
		var r = this.getComment(), i = Buffer.byteLength(r);
		this.write($a(i)), this.write(r);
	}
	_writeCentralDirectoryZip64() {
		this.write(to(yo)), this.write(Qa(44)), this.write($a(45)), this.write($a(45)), this.write(mo), this.write(mo), this.write(Qa(this._entries.length)), this.write(Qa(this._entries.length)), this.write(Qa(this._archive.centralLength)), this.write(Qa(this._archive.centralOffset)), this.write(to(bo)), this.write(mo), this.write(Qa(this._archive.centralOffset + this._archive.centralLength)), this.write(to(1));
	}
	_writeCentralFileHeader(e) {
		var t = e.getGeneralPurposeBit(), n = e.getMethod(), r = e._offsets.file, i = e.getSize(), a = e.getCompressedSize();
		if (e.isZip64() || r > 4294967295) {
			i = So, a = So, r = So, e.setVersionNeededToExtract(45);
			var o = Buffer.concat([
				$a(1),
				$a(24),
				Qa(e.getSize()),
				Qa(e.getCompressedSize()),
				Qa(e._offsets.file)
			], 28);
			e.setExtra(o);
		}
		this.write(to(_o)), this.write($a(e.getPlatform() << 8 | 45)), this.write($a(e.getVersionNeededToExtract())), this.write(t.encode()), this.write($a(n)), this.write(to(e.getTimeDos())), this.write(to(e.getCrc())), this.write(to(a)), this.write(to(i));
		var s = e.getName(), c = e.getComment(), l = e.getCentralDirectoryExtra();
		t.usesUTF8ForNames() && (s = Buffer.from(s), c = Buffer.from(c)), this.write($a(s.length)), this.write($a(l.length)), this.write($a(c.length)), this.write(po), this.write($a(e.getInternalAttributes())), this.write(to(e.getExternalAttributes())), this.write(to(r)), this.write(s), this.write(l), this.write(c);
	}
	_writeDataDescriptor(e) {
		this.write(to(go)), this.write(to(e.getCrc())), e.isZip64() ? (this.write(Qa(e.getCompressedSize())), this.write(Qa(e.getSize()))) : (this.write(to(e.getCompressedSize())), this.write(to(e.getSize())));
	}
	_writeLocalFileHeader(e) {
		var t = e.getGeneralPurposeBit(), n = e.getMethod(), r = e.getName(), i = e.getLocalFileDataExtra();
		e.isZip64() && (t.useDataDescriptor(!0), e.setVersionNeededToExtract(45)), t.usesUTF8ForNames() && (r = Buffer.from(r)), e._offsets.file = this.offset, this.write(to(ho)), this.write($a(e.getVersionNeededToExtract())), this.write(t.encode()), this.write($a(n)), this.write(to(e.getTimeDos())), e._offsets.data = this.offset, t.usesDataDescriptor() ? (this.write(mo), this.write(mo), this.write(mo)) : (this.write(to(e.getCrc())), this.write(to(e.getCompressedSize())), this.write(to(e.getSize()))), this.write($a(r.length)), this.write($a(i.length)), this.write(r), this.write(i), e._offsets.contents = this.offset;
	}
	getComment(e) {
		return this._archive.comment === null ? "" : this._archive.comment;
	}
	isZip64() {
		return this._archive.forceZip64 || this._entries.length > 65535 || this._archive.centralLength > 4294967295 || this._archive.centralOffset > 4294967295;
	}
	setComment(e) {
		this._archive.comment = e;
	}
};
//#endregion
//#region node_modules/zip-stream/utils.js
function Ls(e) {
	return e ||= /* @__PURE__ */ new Date(), e = e instanceof Date ? e : typeof e == "string" ? new Date(e) : /* @__PURE__ */ new Date(), e;
}
function Rs(e) {
	return (0, Ba.default)(e, !1).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
}
//#endregion
//#region node_modules/zip-stream/index.js
var zs = class extends Is {
	constructor(e) {
		e ||= {}, e.zlib = e.zlib || {}, typeof e.level == "number" && e.level >= 0 && (e.zlib.level = e.level, delete e.level), !e.forceZip64 && typeof e.zlib.level == "number" && e.zlib.level === 0 && (e.store = !0), e.namePrependSlash = e.namePrependSlash || !1, super(e), e.comment && e.comment.length > 0 && this.setComment(e.comment);
	}
	_normalizeFileData(e) {
		e = {
			type: "file",
			name: null,
			namePrependSlash: this.options.namePrependSlash,
			linkname: null,
			date: null,
			mode: null,
			store: this.options.store,
			comment: "",
			...e
		};
		let t = e.type === "directory", n = e.type === "symlink";
		return e.name && (e.name = Rs(e.name), !n && e.name.slice(-1) === "/" ? (t = !0, e.type = "directory") : t && (e.name += "/")), (t || n) && (e.store = !0), e.date = Ls(e.date), e;
	}
	entry(e, t, n) {
		if (typeof n != "function" && (n = this._emitErrorCallback.bind(this)), t = this._normalizeFileData(t), t.type !== "file" && t.type !== "directory" && t.type !== "symlink") {
			n(/* @__PURE__ */ Error(t.type + " entries not currently supported"));
			return;
		}
		if (typeof t.name != "string" || t.name.length === 0) {
			n(/* @__PURE__ */ Error("entry name must be a non-empty string value"));
			return;
		}
		if (t.type === "symlink" && typeof t.linkname != "string") {
			n(/* @__PURE__ */ Error("entry linkname must be a non-empty string value when type equals symlink"));
			return;
		}
		let r = new Eo(t.name);
		return r.setTime(t.date, this.options.forceLocalTime), t.namePrependSlash && r.setName(t.name, !0), t.store && r.setMethod(0), t.comment.length > 0 && r.setComment(t.comment), t.type === "symlink" && typeof t.mode != "number" && (t.mode = 40960), typeof t.mode == "number" && (t.type === "symlink" && (t.mode |= 40960), r.setUnixMode(t.mode)), t.type === "symlink" && typeof t.linkname == "string" && (e = Buffer.from(t.linkname)), super.entry(r, e, n);
	}
	finalize() {
		this.finish();
	}
}, Bs = class {
	constructor(e) {
		e = this.options = {
			comment: "",
			forceUTC: !1,
			namePrependSlash: !1,
			store: !1,
			...e
		}, this.engine = new zs(e);
	}
	append(e, t, n) {
		this.engine.entry(e, t, n);
	}
	finalize() {
		this.engine.finalize();
	}
	on() {
		return this.engine.on.apply(this.engine, arguments);
	}
	pipe() {
		return this.engine.pipe.apply(this.engine, arguments);
	}
	unpipe() {
		return this.engine.unpipe.apply(this.engine, arguments);
	}
}, Vs = /* @__PURE__ */ H(((e, t) => {
	t.exports = q("events");
})), Hs = /* @__PURE__ */ H(((e, t) => {
	t.exports = class {
		constructor(e) {
			if (!(e > 0) || e - 1 & e) throw Error("Max size for a FixedFIFO should be a power of two");
			this.buffer = Array(e), this.mask = e - 1, this.top = 0, this.btm = 0, this.next = null;
		}
		clear() {
			this.top = this.btm = 0, this.next = null, this.buffer.fill(void 0);
		}
		push(e) {
			return this.buffer[this.top] === void 0 ? (this.buffer[this.top] = e, this.top = this.top + 1 & this.mask, !0) : !1;
		}
		shift() {
			let e = this.buffer[this.btm];
			if (e !== void 0) return this.buffer[this.btm] = void 0, this.btm = this.btm + 1 & this.mask, e;
		}
		peek() {
			return this.buffer[this.btm];
		}
		isEmpty() {
			return this.buffer[this.btm] === void 0;
		}
	};
})), Us = /* @__PURE__ */ H(((e, t) => {
	var n = Hs();
	t.exports = class {
		constructor(e) {
			this.hwm = e || 16, this.head = new n(this.hwm), this.tail = this.head, this.length = 0;
		}
		clear() {
			this.head = this.tail, this.head.clear(), this.length = 0;
		}
		push(e) {
			if (this.length++, !this.head.push(e)) {
				let t = this.head;
				this.head = t.next = new n(2 * this.head.buffer.length), this.head.push(e);
			}
		}
		shift() {
			this.length !== 0 && this.length--;
			let e = this.tail.shift();
			if (e === void 0 && this.tail.next) {
				let e = this.tail.next;
				return this.tail.next = null, this.tail = e, this.tail.shift();
			}
			return e;
		}
		peek() {
			let e = this.tail.peek();
			return e === void 0 && this.tail.next ? this.tail.next.peek() : e;
		}
		isEmpty() {
			return this.length === 0;
		}
	};
})), Ws = /* @__PURE__ */ H(((e, t) => {
	function n(e) {
		return Buffer.isBuffer(e) || e instanceof Uint8Array;
	}
	function r(e) {
		return Buffer.isEncoding(e);
	}
	function i(e, t, n) {
		return Buffer.alloc(e, t, n);
	}
	function a(e) {
		return Buffer.allocUnsafe(e);
	}
	function o(e) {
		return Buffer.allocUnsafeSlow(e);
	}
	function s(e, t) {
		return Buffer.byteLength(e, t);
	}
	function c(e, t) {
		return Buffer.compare(e, t);
	}
	function l(e, t) {
		return Buffer.concat(e, t);
	}
	function u(e, t, n, r, i) {
		return b(e).copy(t, n, r, i);
	}
	function d(e, t) {
		return b(e).equals(t);
	}
	function f(e, t, n, r, i) {
		return b(e).fill(t, n, r, i);
	}
	function p(e, t, n) {
		return Buffer.from(e, t, n);
	}
	function m(e, t, n, r) {
		return b(e).includes(t, n, r);
	}
	function h(e, t, n, r) {
		return b(e).indexOf(t, n, r);
	}
	function g(e, t, n, r) {
		return b(e).lastIndexOf(t, n, r);
	}
	function _(e) {
		return b(e).swap16();
	}
	function v(e) {
		return b(e).swap32();
	}
	function y(e) {
		return b(e).swap64();
	}
	function b(e) {
		return Buffer.isBuffer(e) ? e : Buffer.from(e.buffer, e.byteOffset, e.byteLength);
	}
	function x(e, t, n, r) {
		return b(e).toString(t, n, r);
	}
	function S(e, t, n) {
		return b(e).toString("hex", t, n);
	}
	function C(e, t, n, r, i) {
		return b(e).write(t, n, r, i);
	}
	function w(e, t) {
		return b(e).readDoubleBE(t);
	}
	function T(e, t) {
		return b(e).readDoubleLE(t);
	}
	function E(e, t) {
		return b(e).readFloatBE(t);
	}
	function D(e, t) {
		return b(e).readFloatLE(t);
	}
	function O(e, t) {
		return b(e).readInt32BE(t);
	}
	function k(e, t) {
		return b(e).readInt32LE(t);
	}
	function A(e, t) {
		return b(e).readUInt32BE(t);
	}
	function j(e, t) {
		return b(e).readUInt32LE(t);
	}
	function M(e, t, n) {
		return b(e).writeDoubleBE(t, n);
	}
	function N(e, t, n) {
		return b(e).writeDoubleLE(t, n);
	}
	function P(e, t, n) {
		return b(e).writeFloatBE(t, n);
	}
	function F(e, t, n) {
		return b(e).writeFloatLE(t, n);
	}
	function I(e, t, n) {
		return b(e).writeInt32BE(t, n);
	}
	function L(e, t, n) {
		return b(e).writeInt32LE(t, n);
	}
	function R(e, t, n) {
		return b(e).writeUInt32BE(t, n);
	}
	function z(e, t, n) {
		return b(e).writeUInt32LE(t, n);
	}
	t.exports = {
		isBuffer: n,
		isEncoding: r,
		alloc: i,
		allocUnsafe: a,
		allocUnsafeSlow: o,
		byteLength: s,
		compare: c,
		concat: l,
		copy: u,
		equals: d,
		fill: f,
		from: p,
		includes: m,
		indexOf: h,
		lastIndexOf: g,
		swap16: _,
		swap32: v,
		swap64: y,
		toBuffer: b,
		toString: x,
		toHex: S,
		write: C,
		readDoubleBE: w,
		readDoubleLE: T,
		readFloatBE: E,
		readFloatLE: D,
		readInt32BE: O,
		readInt32LE: k,
		readUInt32BE: A,
		readUInt32LE: j,
		writeDoubleBE: M,
		writeDoubleLE: N,
		writeFloatBE: P,
		writeFloatLE: F,
		writeInt32BE: I,
		writeInt32LE: L,
		writeUInt32BE: R,
		writeUInt32LE: z
	};
})), Gs = /* @__PURE__ */ H(((e, t) => {
	var n = Ws();
	t.exports = class {
		constructor(e) {
			this.encoding = e;
		}
		get remaining() {
			return 0;
		}
		decode(e) {
			return n.toString(e, this.encoding);
		}
		flush() {
			return "";
		}
	};
})), Ks = /* @__PURE__ */ H(((e, t) => {
	var n = Ws();
	t.exports = class {
		constructor() {
			this._reset();
		}
		get remaining() {
			return this.bytesSeen;
		}
		decode(e) {
			if (e.byteLength === 0) return "";
			if (this.bytesNeeded === 0 && r(e, 0) === 0) return this.bytesSeen = i(e), n.toString(e, "utf8");
			let t = "", a = 0;
			if (this.bytesNeeded > 0) {
				for (; a < e.byteLength;) {
					let n = e[a];
					if (n < this.lowerBoundary || n > this.upperBoundary) {
						t += "�", this._reset();
						break;
					}
					if (this.lowerBoundary = 128, this.upperBoundary = 191, this.codePoint = this.codePoint << 6 | n & 63, this.bytesSeen++, a++, this.bytesSeen === this.bytesNeeded) {
						t += String.fromCodePoint(this.codePoint), this._reset();
						break;
					}
				}
				if (this.bytesNeeded > 0) return t;
			}
			let o = r(e, a), s = e.byteLength - o;
			s > a && (t += n.toString(e, "utf8", a, s));
			for (let n = s; n < e.byteLength; n++) {
				let r = e[n];
				if (this.bytesNeeded === 0) {
					r <= 127 ? (this.bytesSeen = 0, t += String.fromCharCode(r)) : r >= 194 && r <= 223 ? (this.bytesNeeded = 2, this.bytesSeen = 1, this.codePoint = r & 31) : r >= 224 && r <= 239 ? (r === 224 ? this.lowerBoundary = 160 : r === 237 && (this.upperBoundary = 159), this.bytesNeeded = 3, this.bytesSeen = 1, this.codePoint = r & 15) : r >= 240 && r <= 244 ? (r === 240 ? this.lowerBoundary = 144 : r === 244 && (this.upperBoundary = 143), this.bytesNeeded = 4, this.bytesSeen = 1, this.codePoint = r & 7) : (this.bytesSeen = 1, t += "�");
					continue;
				}
				if (r < this.lowerBoundary || r > this.upperBoundary) {
					t += "�", n--, this._reset();
					continue;
				}
				this.lowerBoundary = 128, this.upperBoundary = 191, this.codePoint = this.codePoint << 6 | r & 63, this.bytesSeen++, this.bytesSeen === this.bytesNeeded && (t += String.fromCodePoint(this.codePoint), this._reset());
			}
			return t;
		}
		flush() {
			let e = this.bytesNeeded > 0 ? "�" : "";
			return this._reset(), e;
		}
		_reset() {
			this.codePoint = 0, this.bytesNeeded = 0, this.bytesSeen = 0, this.lowerBoundary = 128, this.upperBoundary = 191;
		}
	};
	function r(e, t) {
		let n = e.byteLength;
		if (n <= t) return 0;
		let r = Math.max(t, n - 4), i = n - 1;
		for (; i > r && (e[i] & 192) == 128;) i--;
		if (i < t) return 0;
		let a = e[i], o;
		if (a <= 127) return 0;
		if (a >= 194 && a <= 223) o = 2;
		else if (a >= 224 && a <= 239) o = 3;
		else if (a >= 240 && a <= 244) o = 4;
		else return 0;
		let s = n - i;
		return s < o ? s : 0;
	}
	function i(e) {
		let t = e.byteLength;
		if (t === 0) return 0;
		let n = e[t - 1];
		if (n <= 127) return 0;
		if ((n & 192) != 128) return 1;
		let r = Math.max(0, t - 4), i = t - 2;
		for (; i >= r && (e[i] & 192) == 128;) i--;
		if (i < 0) return 1;
		let a = e[i], o;
		if (a >= 194 && a <= 223) o = 2;
		else if (a >= 224 && a <= 239) o = 3;
		else if (a >= 240 && a <= 244) o = 4;
		else return 1;
		if (t - i !== o) return 1;
		if (o >= 3) {
			let t = e[i + 1];
			if (a === 224 && t < 160 || a === 237 && t > 159 || a === 240 && t < 144 || a === 244 && t > 143) return 1;
		}
		return 0;
	}
})), qs = /* @__PURE__ */ H(((e, t) => {
	var n = Gs(), r = Ks();
	t.exports = class {
		constructor(e = "utf8") {
			switch (this.encoding = i(e), this.encoding) {
				case "utf8":
					this.decoder = new r();
					break;
				case "utf16le":
				case "base64": throw Error("Unsupported encoding: " + this.encoding);
				default: this.decoder = new n(this.encoding);
			}
		}
		get remaining() {
			return this.decoder.remaining;
		}
		push(e) {
			return typeof e == "string" ? e : this.decoder.decode(e);
		}
		write(e) {
			return this.push(e);
		}
		end(e) {
			let t = "";
			return e && (t = this.push(e)), t += this.decoder.flush(), t;
		}
	};
	function i(e) {
		switch (e = e.toLowerCase(), e) {
			case "utf8":
			case "utf-8": return "utf8";
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le": return "utf16le";
			case "latin1":
			case "binary": return "latin1";
			case "base64":
			case "ascii":
			case "hex": return e;
			default: throw Error("Unknown encoding: " + e);
		}
	}
})), Js = /* @__PURE__ */ H(((e, t) => {
	t.exports = class e extends Error {
		constructor(t, n, r = e) {
			super(t), this.code = n, Error.captureStackTrace && Error.captureStackTrace(this, r);
		}
		static isStreamDestroyed(e) {
			return e && e.code === "STREAM_DESTROYED";
		}
		static isPrematureClose(e) {
			return e && e.code === "PREMATURE_CLOSE";
		}
		static isAborted(e) {
			return e && e.code === "ABORTED";
		}
		static isBadArgument(e) {
			return e && e.code === "BAD_ARGUMENT";
		}
		get name() {
			return "StreamError";
		}
		static STREAM_DESTROYED() {
			return new e("Stream was destroyed", "STREAM_DESTROYED", e.STREAM_DESTROYED);
		}
		static PREMATURE_CLOSE(t = "Premature close") {
			return new e(t, "PREMATURE_CLOSE", e.PREMATURE_CLOSE);
		}
		static ABORTED() {
			return new e("Stream aborted", "ABORTED", e.ABORTED);
		}
		static BAD_ARGUMENT(t = "Bad argument") {
			return new e(t, "BAD_ARGUMENT", e.BAD_ARGUMENT);
		}
	};
})), Ys = /* @__PURE__ */ H(((e, t) => {
	var { EventEmitter: n } = Vs(), r = Us(), i = qs(), a = Js(), o = typeof queueMicrotask > "u" ? (e) => global.process.nextTick(e) : queueMicrotask, s = 1, c = 2, l = 4, u = 8, d = 536870910, f = 536870909, p = 32, m = 64, h = 128, g = 256, _ = 512, v = 1024, y = 2048, b = 4096, x = 8192, S = 16384, C = 32768, w = 131072, T = 768, E = 65552, D = 80, O = 4224, k = 131328, A = 536870895, j = 536805311, M = 536805375, N = 536870655, P = 536862591, F = 536869887, I = 536870143, L = 536838143, R = 536870879, z = 536739839, B = 536739583, V = 1 << 18, H = 2 << 18, U = 4 << 18, W = 8 << 18, G = 16 << 18, K = 32 << 18, q = 64 << 18, J = 128 << 18, ee = 256 << 18, te = 512 << 18, ne = 1024 << 18, re = 469499903, ie = 535822335, ae = 402391039, oe = 532676607, se = 534773759, ce = 503316479, le = 536346623, Y = 268435455, ue = 262160, X = 536608751, de = 8404992, fe = 14, pe = 15, me = 8405006, he = 535822271, ge = 33587200, _e = 33587215, ve = 17423, ye = 16527, be = 1167, xe = 12431, Se = 214047, Ce = 17422, we = 32879, Te = 32769, Ee = 142606351, De = 6291456, Oe = 2359296, ke = 6553615, Ae = 270794767, je = 1310720, Me = 67371008, Ne = 144965647, Pe = 146800654, Fe = 35127311, Ie = 142606350, Le = Symbol.asyncIterator || Symbol("asyncIterator"), Re = class {
		constructor(e, { highWaterMark: t = 16384, map: n = null, mapWritable: i, byteLength: a, byteLengthWritable: o } = {}) {
			this.stream = e, this.queue = new r(), this.highWaterMark = t, this.buffered = 0, this.error = null, this.pipeline = null, this.drains = null, this.byteLength = o || a || yt, this.map = i || n, this.afterWrite = Ge.bind(this), this.afterUpdateNextTick = Je.bind(this);
		}
		get ending() {
			return (this.stream._duplexState & te) !== 0;
		}
		get ended() {
			return (this.stream._duplexState & K) !== 0;
		}
		push(e) {
			return (this.stream._duplexState & Ie) === 0 ? (this.map !== null && (e = this.map(e)), this.buffered += this.byteLength(e), this.queue.push(e), this.buffered < this.highWaterMark ? (this.stream._duplexState |= W, !0) : (this.stream._duplexState |= De, !1)) : !1;
		}
		shift() {
			let e = this.queue.shift();
			return this.buffered -= this.byteLength(e), this.buffered === 0 && (this.stream._duplexState &= se), e;
		}
		end(e) {
			typeof e == "function" ? this.stream.once("finish", e) : e != null && this.push(e), this.stream._duplexState = (this.stream._duplexState | te) & ie;
		}
		autoBatch(e, t) {
			let n = [], r = this.stream;
			for (n.push(e); (r._duplexState & Ae) === Oe;) n.push(r._writableState.shift());
			if ((r._duplexState & pe) !== 0) return t(null);
			r._writev(n, t);
		}
		update() {
			let e = this.stream;
			e._duplexState |= H;
			do {
				for (; (e._duplexState & Ae) === W;) {
					let t = this.shift();
					e._duplexState |= Me, e._write(t, this.afterWrite);
				}
				(e._duplexState & je) === 0 && this.updateNonPrimary();
			} while (this.continueUpdate() === !0);
			e._duplexState &= le;
		}
		updateNonPrimary() {
			let e = this.stream;
			if ((e._duplexState & Ne) === te) {
				e._duplexState |= V, e._final(Ue.bind(this));
				return;
			}
			if ((e._duplexState & fe) === l) {
				(e._duplexState & ge) === 0 && (e._duplexState |= ue, e._destroy(We.bind(this)));
				return;
			}
			(e._duplexState & _e) === s && (e._duplexState = (e._duplexState | ue) & d, e._open(Xe.bind(this)));
		}
		continueUpdate() {
			return (this.stream._duplexState & J) === 0 ? !1 : (this.stream._duplexState &= ce, !0);
		}
		updateCallback() {
			(this.stream._duplexState & Fe) === U ? this.update() : this.updateNextTick();
		}
		updateNextTick() {
			(this.stream._duplexState & J) === 0 && (this.stream._duplexState |= J, (this.stream._duplexState & H) === 0 && o(this.afterUpdateNextTick));
		}
	}, ze = class {
		constructor(e, { highWaterMark: t = 16384, map: n = null, mapReadable: i, byteLength: a, byteLengthReadable: o } = {}) {
			this.stream = e, this.queue = new r(), this.highWaterMark = t === 0 ? 1 : t, this.buffered = 0, this.readAhead = t > 0, this.error = null, this.pipeline = null, this.byteLength = o || a || yt, this.map = i || n, this.pipeTo = null, this.afterRead = Ke.bind(this), this.afterUpdateNextTick = qe.bind(this);
		}
		get ending() {
			return (this.stream._duplexState & v) !== 0;
		}
		get ended() {
			return (this.stream._duplexState & S) !== 0;
		}
		pipe(e, t) {
			if (this.pipeTo !== null) throw a.BAD_ARGUMENT("Can only pipe to one destination");
			if (typeof t != "function" && (t = null), this.stream._duplexState |= _, this.pipeTo = e, this.pipeline = new Ve(this.stream, e, t), t && this.stream.on("error", bt), ut(e)) e._writableState.pipeline = this.pipeline, t && e.on("error", bt), e.on("finish", this.pipeline.finished.bind(this.pipeline));
			else {
				let t = this.pipeline.done.bind(this.pipeline, e), n = this.pipeline.done.bind(this.pipeline, e, null);
				e.on("error", t), e.on("close", n), e.on("finish", this.pipeline.finished.bind(this.pipeline));
			}
			e.on("drain", He.bind(this)), this.stream.emit("piping", e), e.emit("pipe", this.stream);
		}
		push(e) {
			let t = this.stream;
			return e === null ? (this.highWaterMark = 0, t._duplexState = (t._duplexState | v) & j, !1) : this.map !== null && (e = this.map(e), e === null) ? (t._duplexState &= M, this.buffered < this.highWaterMark) : (this.buffered += this.byteLength(e), this.queue.push(e), t._duplexState = (t._duplexState | h) & M, this.buffered < this.highWaterMark);
		}
		shift() {
			let e = this.queue.shift();
			return this.buffered -= this.byteLength(e), this.buffered === 0 && (this.stream._duplexState &= P), e;
		}
		unshift(e) {
			let t = [this.map === null ? e : this.map(e)];
			for (; this.buffered > 0;) t.push(this.shift());
			for (let e = 0; e < t.length - 1; e++) {
				let n = t[e];
				this.buffered += this.byteLength(n), this.queue.push(n);
			}
			this.push(t[t.length - 1]);
		}
		read() {
			let e = this.stream;
			if ((e._duplexState & ye) === h) {
				let t = this.shift();
				return this.pipeTo !== null && this.pipeTo.write(t) === !1 && (e._duplexState &= I), (e._duplexState & y) !== 0 && e.emit("data", t), t;
			}
			return this.readAhead === !1 && (e._duplexState |= w, this.updateNextTick()), null;
		}
		drain() {
			let e = this.stream;
			for (; (e._duplexState & ye) === h && (e._duplexState & T) !== 0;) {
				let t = this.shift();
				this.pipeTo !== null && this.pipeTo.write(t) === !1 && (e._duplexState &= I), (e._duplexState & y) !== 0 && e.emit("data", t);
			}
		}
		update() {
			let e = this.stream;
			e._duplexState |= p;
			do {
				for (this.drain(); this.buffered < this.highWaterMark && (e._duplexState & Se) === w;) e._duplexState |= E, e._read(this.afterRead), this.drain();
				(e._duplexState & xe) === O && (e._duplexState |= x, e.emit("readable")), (e._duplexState & D) === 0 && this.updateNonPrimary();
			} while (this.continueUpdate() === !0);
			e._duplexState &= R;
		}
		updateNonPrimary() {
			let e = this.stream;
			if ((e._duplexState & be) === v && (e._duplexState = (e._duplexState | S) & F, e.emit("end"), (e._duplexState & me) === de && (e._duplexState |= l), this.pipeTo !== null && this.pipeTo.end()), (e._duplexState & fe) === l) {
				(e._duplexState & ge) === 0 && (e._duplexState |= ue, e._destroy(We.bind(this)));
				return;
			}
			(e._duplexState & _e) === s && (e._duplexState = (e._duplexState | ue) & d, e._open(Xe.bind(this)));
		}
		continueUpdate() {
			return (this.stream._duplexState & C) === 0 ? !1 : (this.stream._duplexState &= L, !0);
		}
		updateCallback() {
			(this.stream._duplexState & we) === m ? this.update() : this.updateNextTick();
		}
		updateNextTickIfOpen() {
			(this.stream._duplexState & Te) === 0 && (this.stream._duplexState |= C, (this.stream._duplexState & p) === 0 && o(this.afterUpdateNextTick));
		}
		updateNextTick() {
			(this.stream._duplexState & C) === 0 && (this.stream._duplexState |= C, (this.stream._duplexState & p) === 0 && o(this.afterUpdateNextTick));
		}
	}, Be = class {
		constructor(e) {
			this.data = null, this.afterTransform = Ze.bind(e), this.afterFinal = null;
		}
	}, Ve = class {
		constructor(e, t, n) {
			this.from = e, this.to = t, this.afterPipe = n, this.error = null, this.pipeToFinished = !1;
		}
		finished() {
			this.pipeToFinished = !0;
		}
		done(e, t) {
			if (t && (this.error = t), e === this.to && (this.to = null, this.from !== null)) {
				((this.from._duplexState & S) === 0 || !this.pipeToFinished) && this.from.destroy(this.error || a.PREMATURE_CLOSE("Writable stream closed"));
				return;
			}
			if (e === this.from && (this.from = null, this.to !== null)) {
				(e._duplexState & S) === 0 && this.to.destroy(this.error || a.PREMATURE_CLOSE("Readable stream closed"));
				return;
			}
			this.afterPipe !== null && this.afterPipe(this.error), this.to = this.from = this.afterPipe = null;
		}
	};
	function He() {
		this.stream._duplexState |= _, this.updateCallback();
	}
	function Ue(e) {
		let t = this.stream;
		e && t.destroy(e), (t._duplexState & fe) === 0 && (t._duplexState |= K, t.emit("finish")), (t._duplexState & me) === de && (t._duplexState |= l), t._duplexState &= ae, (t._duplexState & H) === 0 ? this.update() : this.updateNextTick();
	}
	function We(e) {
		let t = this.stream;
		!e && !a.isStreamDestroyed(this.error) && (e = this.error), e && t.emit("error", e), t._duplexState |= u, t.emit("close");
		let n = t._readableState, r = t._writableState;
		if (n !== null && n.pipeline !== null && n.pipeline.done(t, e), r !== null) {
			for (; r.drains !== null && r.drains.length > 0;) r.drains.shift().resolve(!1);
			r.pipeline !== null && r.pipeline.done(t, e);
		}
	}
	function Ge(e) {
		let t = this.stream;
		e && t.destroy(e), t._duplexState &= re, this.drains !== null && Ye(this.drains), (t._duplexState & ke) === G && (t._duplexState &= oe, (t._duplexState & q) === q && t.emit("drain")), this.updateCallback();
	}
	function Ke(e) {
		e && this.stream.destroy(e), this.stream._duplexState &= A, this.readAhead === !1 && (this.stream._duplexState & g) === 0 && (this.stream._duplexState &= z), this.updateCallback();
	}
	function qe() {
		(this.stream._duplexState & p) === 0 && (this.stream._duplexState &= L, this.update());
	}
	function Je() {
		(this.stream._duplexState & H) === 0 && (this.stream._duplexState &= ce, this.update());
	}
	function Ye(e) {
		for (let t = 0; t < e.length; t++) --e[t].writes === 0 && (e.shift().resolve(!0), t--);
	}
	function Xe(e) {
		let t = this.stream;
		e && t.destroy(e), (t._duplexState & l) === 0 && ((t._duplexState & ve) === 0 && (t._duplexState |= m), (t._duplexState & Ee) === 0 && (t._duplexState |= U), t.emit("open")), t._duplexState &= X, t._writableState !== null && t._writableState.updateCallback(), t._readableState !== null && t._readableState.updateCallback();
	}
	function Ze(e, t) {
		t != null && this.push(t), this._writableState.afterWrite(e);
	}
	function Qe(e) {
		this._readableState !== null && (e === "data" && (this._duplexState |= 133376, this._readableState.updateNextTick()), e === "readable" && (this._duplexState |= b, this._readableState.updateNextTick())), this._writableState !== null && e === "drain" && (this._duplexState |= q, this._writableState.updateNextTick());
	}
	var $e = class extends n {
		constructor(e) {
			super(), this._duplexState = 0, this._readableState = null, this._writableState = null, e && (e.open && (this._open = e.open), e.destroy && (this._destroy = e.destroy), e.predestroy && (this._predestroy = e.predestroy), e.signal && e.signal.addEventListener("abort", xt.bind(this))), this.on("newListener", Qe);
		}
		_open(e) {
			e(null);
		}
		_destroy(e) {
			e(null);
		}
		_predestroy() {}
		get readable() {
			return this._readableState === null ? void 0 : !0;
		}
		get writable() {
			return this._writableState === null ? void 0 : !0;
		}
		get destroyed() {
			return (this._duplexState & u) !== 0;
		}
		get destroying() {
			return (this._duplexState & fe) !== 0;
		}
		destroy(e) {
			(this._duplexState & fe) === 0 && (e ||= a.STREAM_DESTROYED(), this._duplexState = (this._duplexState | l) & he, this._readableState !== null && (this._readableState.highWaterMark = 0, this._readableState.error = e), this._writableState !== null && (this._writableState.highWaterMark = 0, this._writableState.error = e), this._duplexState |= c, this._predestroy(), this._duplexState &= f, this._readableState !== null && this._readableState.updateNextTick(), this._writableState !== null && this._writableState.updateNextTick());
		}
	}, et = class e extends $e {
		constructor(e) {
			super(e), this._duplexState |= 8519681, this._readableState = new ze(this, e), e && (this._readableState.readAhead === !1 && (this._duplexState &= z), e.read && (this._read = e.read), e.eagerOpen && this._readableState.updateNextTick(), e.encoding && this.setEncoding(e.encoding));
		}
		static deferred(e, t) {
			let n = new it(t);
			return e().then((e) => {
				if (e === null) return n.end();
				n.destroying || st(e, n, bt);
			}).catch((e) => n.destroy(e)), n;
		}
		setEncoding(e) {
			let t = new i(e), n = this._readableState.map || ct;
			return this._readableState.map = r, this;
			function r(e) {
				let r = t.push(e);
				return r === "" && (e.byteLength !== 0 || t.remaining > 0) ? null : n(r);
			}
		}
		_read(e) {
			e(null);
		}
		pipe(e, t) {
			return this._readableState.updateNextTick(), this._readableState.pipe(e, t), e;
		}
		read() {
			return this._readableState.updateNextTick(), this._readableState.read();
		}
		push(e) {
			return this._readableState.updateNextTickIfOpen(), this._readableState.push(e);
		}
		unshift(e) {
			return this._readableState.updateNextTickIfOpen(), this._readableState.unshift(e);
		}
		resume() {
			return this._duplexState |= k, this._readableState.updateNextTick(), this;
		}
		pause() {
			return this._duplexState &= this._readableState.readAhead === !1 ? B : N, this;
		}
		static _fromAsyncIterator(t, n) {
			let r, i = new e({
				...n,
				read(e) {
					t.next().then(a).then(e.bind(null, null)).catch(e);
				},
				predestroy() {
					r = t.return();
				},
				destroy(e) {
					if (!r) return e(null);
					r.then(e.bind(null, null)).catch(e);
				}
			});
			return i;
			function a(e) {
				e.done ? i.push(null) : i.push(e.value);
			}
		}
		static from(t, n) {
			if (gt(t)) return t;
			if (t[Le]) return this._fromAsyncIterator(t[Le](), n);
			Array.isArray(t) || (t = t === void 0 ? [] : [t]);
			let r = 0;
			return new e({
				...n,
				read(e) {
					this.push(r === t.length ? null : t[r++]), e(null);
				}
			});
		}
		static isBackpressured(e) {
			return (e._duplexState & Ce) !== 0 || e._readableState.buffered >= e._readableState.highWaterMark;
		}
		static isPaused(e) {
			return (e._duplexState & g) === 0;
		}
		[Le]() {
			let e = this, t = null, n = null, r = null;
			return this.on("error", (e) => {
				t = e;
			}), this.on("readable", i), this.on("close", o), {
				[Le]() {
					return this;
				},
				next() {
					return new Promise(function(t, i) {
						n = t, r = i;
						let a = e.read();
						a === null ? (e._duplexState & u) !== 0 && s(null) : s(a);
					});
				},
				return() {
					return c(null);
				},
				throw(e) {
					return c(e);
				}
			};
			function i() {
				n !== null && s(e.read());
			}
			function o() {
				n !== null && s(null);
			}
			function s(i) {
				r !== null && (t ? r(t) : i === null && (e._duplexState & S) === 0 ? r(a.STREAM_DESTROYED()) : n({
					value: i,
					done: i === null
				}), r = n = null);
			}
			function c(t) {
				return e.destroy(t), new Promise((n, r) => {
					if (e._duplexState & u) return n({
						value: void 0,
						done: !0
					});
					e.once("close", function() {
						t ? r(t) : n({
							value: void 0,
							done: !0
						});
					});
				});
			}
		}
	}, tt = class extends $e {
		constructor(e) {
			super(e), this._duplexState |= 16385, this._writableState = new Re(this, e), e && (e.writev && (this._writev = e.writev), e.write && (this._write = e.write), e.final && (this._final = e.final), e.eagerOpen && this._writableState.updateNextTick());
		}
		cork() {
			this._duplexState |= ne;
		}
		uncork() {
			this._duplexState &= Y, this._writableState.updateNextTick();
		}
		_writev(e, t) {
			t(null);
		}
		_write(e, t) {
			this._writableState.autoBatch(e, t);
		}
		_final(e) {
			e(null);
		}
		static isBackpressured(e) {
			return (e._duplexState & Pe) !== 0;
		}
		static drained(e) {
			if (e.destroyed) return Promise.resolve(!1);
			let t = e._writableState, n = (St(e) ? Math.min(1, t.queue.length) : t.queue.length) + (e._duplexState & ee ? 1 : 0);
			return n === 0 ? Promise.resolve(!0) : (t.drains === null && (t.drains = []), new Promise((e) => {
				t.drains.push({
					writes: n,
					resolve: e
				});
			}));
		}
		write(e) {
			return this._writableState.updateNextTick(), this._writableState.push(e);
		}
		end(e) {
			return this._writableState.updateNextTick(), this._writableState.end(e), this;
		}
	}, nt = class extends et {
		constructor(e) {
			super(e), this._duplexState = s | this._duplexState & w, this._writableState = new Re(this, e), e && (e.writev && (this._writev = e.writev), e.write && (this._write = e.write), e.final && (this._final = e.final));
		}
		cork() {
			this._duplexState |= ne;
		}
		uncork() {
			this._duplexState &= Y, this._writableState.updateNextTick();
		}
		_writev(e, t) {
			t(null);
		}
		_write(e, t) {
			this._writableState.autoBatch(e, t);
		}
		_final(e) {
			e(null);
		}
		write(e) {
			return this._writableState.updateNextTick(), this._writableState.push(e);
		}
		end(e) {
			return this._writableState.updateNextTick(), this._writableState.end(e), this;
		}
	}, rt = class extends nt {
		constructor(e) {
			super(e), this._transformState = new Be(this), e && (e.transform && (this._transform = e.transform), e.flush && (this._flush = e.flush));
		}
		_write(e, t) {
			this._readableState.buffered >= this._readableState.highWaterMark ? this._transformState.data = e : this._transform(e, this._transformState.afterTransform);
		}
		_read(e) {
			if (this._transformState.data !== null) {
				let t = this._transformState.data;
				this._transformState.data = null, e(null), this._transform(t, this._transformState.afterTransform);
			} else e(null);
		}
		destroy(e) {
			super.destroy(e), this._transformState.data !== null && (this._transformState.data = null, this._transformState.afterTransform());
		}
		_transform(e, t) {
			t(null, e);
		}
		_flush(e) {
			e(null);
		}
		_final(e) {
			this._transformState.afterFinal = e, this._flush(at.bind(this));
		}
	}, it = class extends rt {};
	function at(e, t) {
		let n = this._transformState.afterFinal;
		if (e) return n(e);
		t != null && this.push(t), this.push(null), n(null);
	}
	function ot(...e) {
		return new Promise((t, n) => st(...e, (e) => {
			if (e) return n(e);
			t();
		}));
	}
	function st(e, ...t) {
		let n = Array.isArray(e) ? [...e, ...t] : [e, ...t], r = n.length && typeof n[n.length - 1] == "function" ? n.pop() : null;
		if (n.length < 2) throw a.BAD_ARGUMENT("Pipeline requires at least 2 streams");
		let i = n[0], o = null, s = null;
		for (let e = 1; e < n.length; e++) o = n[e], ut(i) ? i.pipe(o, l) : (c(i, !0, e > 1, l), i.pipe(o)), i = o;
		if (r) {
			let e = !1, t = ut(o) || !!(o._writableState && o._writableState.autoDestroy);
			o.on("error", (e) => {
				s === null && (s = e);
			}), o.on("finish", () => {
				e = !0, t || r(s);
			}), t && o.on("close", () => r(s || (e ? null : a.PREMATURE_CLOSE())));
		}
		return o;
		function c(e, t, n, r) {
			e.on("error", r), e.on("close", i);
			function i() {
				if (t && e._readableState && !e._readableState.ended || n && e._writableState && !e._writableState.ended) return r(a.PREMATURE_CLOSE());
			}
		}
		function l(e) {
			if (!(!e || s)) {
				s = e;
				for (let t of n) t.destroy(e);
			}
		}
	}
	function ct(e) {
		return e;
	}
	function lt(e) {
		return !!e._readableState || !!e._writableState;
	}
	function ut(e) {
		return typeof e._duplexState == "number" && lt(e);
	}
	function dt(e) {
		return !!e._readableState && e._readableState.ending;
	}
	function ft(e) {
		return !!e._readableState && e._readableState.ended;
	}
	function pt(e) {
		return !!e._writableState && e._writableState.ending;
	}
	function mt(e) {
		return !!e._writableState && e._writableState.ended;
	}
	function ht(e, t = {}) {
		let n = e._readableState && e._readableState.error || e._writableState && e._writableState.error;
		return !t.all && a.isStreamDestroyed(n) ? null : n;
	}
	function gt(e) {
		return ut(e) && e.readable;
	}
	function _t(e) {
		return (e._duplexState & s) !== s || (e._duplexState & l) === l || (e._duplexState & ge) !== 0;
	}
	function vt(e) {
		return typeof e == "object" && !!e && typeof e.byteLength == "number";
	}
	function yt(e) {
		return vt(e) ? e.byteLength : 1024;
	}
	function bt() {}
	function xt() {
		this.destroy(a.ABORTED());
	}
	function St(e) {
		return e._writev !== tt.prototype._writev && e._writev !== nt.prototype._writev;
	}
	t.exports = {
		pipeline: st,
		pipelinePromise: ot,
		isStream: lt,
		isStreamx: ut,
		isEnding: dt,
		isEnded: ft,
		isFinishing: pt,
		isFinished: mt,
		isDisturbed: _t,
		getStreamError: ht,
		Stream: $e,
		Writable: tt,
		Readable: et,
		Duplex: nt,
		Transform: rt,
		PassThrough: it
	};
})), Xs = /* @__PURE__ */ H(((e) => {
	var t = Ws(), n = "0000000000000000000", r = "7777777777777777777", i = 48, a = t.from([
		117,
		115,
		116,
		97,
		114,
		0
	]), o = t.from([i, i]), s = t.from([
		117,
		115,
		116,
		97,
		114,
		32
	]), c = t.from([32, 0]), l = 4095, u = 257, d = 263;
	e.decodeLongPath = function(e, t) {
		return w(e, 0, e.length, t);
	}, e.encodePax = function(e) {
		let n = "";
		e.name && (n += T(" path=" + e.name + "\n")), e.linkname && (n += T(" linkpath=" + e.linkname + "\n"));
		let r = e.pax;
		if (r) for (let e in r) n += T(" " + e + "=" + r[e] + "\n");
		return t.from(n);
	}, e.decodePax = function(e) {
		let n = {};
		for (; e.length;) {
			let r = 0;
			for (; r < e.length && e[r] !== 32;) r++;
			let i = parseInt(t.toString(e.subarray(0, r)), 10);
			if (!i) return n;
			let a = t.toString(e.subarray(r + 1, i - 1)), o = a.indexOf("=");
			if (o === -1) return n;
			n[a.slice(0, o)] = a.slice(o + 1), e = e.subarray(i);
		}
		return n;
	}, e.encode = function(e) {
		let n = t.alloc(512), r = e.name, s = "";
		if (e.typeflag === 5 && r[r.length - 1] !== "/" && (r += "/"), t.byteLength(r) !== r.length) return null;
		for (; t.byteLength(r) > 100;) {
			let e = r.indexOf("/");
			if (e === -1) return null;
			s += s ? "/" + r.slice(0, e) : r.slice(0, e), r = r.slice(e + 1);
		}
		return t.byteLength(r) > 100 || t.byteLength(s) > 155 || e.linkname && t.byteLength(e.linkname) > 100 ? null : (t.write(n, r), t.write(n, y(e.mode & l, 6), 100), t.write(n, y(e.uid, 6), 108), t.write(n, y(e.gid, 6), 116), x(e.size, n, 124), t.write(n, y(e.mtime.getTime() / 1e3 | 0, 11), 136), n[156] = i + g(e.type), e.linkname && t.write(n, e.linkname, 157), t.copy(a, n, u), t.copy(o, n, d), e.uname && t.write(n, e.uname, 265), e.gname && t.write(n, e.gname, 297), t.write(n, y(e.devmajor || 0, 6), 329), t.write(n, y(e.devminor || 0, 6), 337), s && t.write(n, s, 345), t.write(n, y(v(n), 6), 148), n);
	}, e.decode = function(e, t, n) {
		let r = e[156] === 0 ? 0 : e[156] - i, a = w(e, 0, 100, t), o = C(e, 100, 8), s = C(e, 108, 8), c = C(e, 116, 8), l = C(e, 124, 12), u = C(e, 136, 12), d = h(r), m = e[157] === 0 ? null : w(e, 157, 100, t), g = w(e, 265, 32), _ = w(e, 297, 32), y = C(e, 329, 8), b = C(e, 337, 8), x = v(e);
		if (x === 256) return null;
		if (x !== C(e, 148, 8)) throw Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
		if (f(e)) e[345] && (a = w(e, 345, 155, t) + "/" + a);
		else if (!p(e) && !n) throw Error("Invalid tar header: unknown format.");
		return r === 0 && a && a[a.length - 1] === "/" && (r = 5), {
			name: a,
			mode: o,
			uid: s,
			gid: c,
			size: l,
			byteOffset: 0,
			mtime: /* @__PURE__ */ new Date(1e3 * u),
			type: d,
			linkname: m,
			uname: g,
			gname: _,
			devmajor: y,
			devminor: b,
			pax: null
		};
	};
	function f(e) {
		return t.equals(a, e.subarray(u, 263));
	}
	function p(e) {
		return t.equals(s, e.subarray(u, 263)) && t.equals(c, e.subarray(d, 265));
	}
	function m(e, t, n) {
		return typeof e == "number" ? (e = ~~e, e >= t ? t : e >= 0 || (e += t, e >= 0) ? e : 0) : n;
	}
	function h(e) {
		switch (e) {
			case 0: return "file";
			case 1: return "link";
			case 2: return "symlink";
			case 3: return "character-device";
			case 4: return "block-device";
			case 5: return "directory";
			case 6: return "fifo";
			case 7: return "contiguous-file";
			case 72: return "pax-header";
			case 55: return "pax-global-header";
			case 27: return "gnu-long-link-path";
			case 28:
			case 30: return "gnu-long-path";
		}
		return null;
	}
	function g(e) {
		switch (e) {
			case "file": return 0;
			case "link": return 1;
			case "symlink": return 2;
			case "character-device": return 3;
			case "block-device": return 4;
			case "directory": return 5;
			case "fifo": return 6;
			case "contiguous-file": return 7;
			case "pax-header": return 72;
		}
		return 0;
	}
	function _(e, t, n, r) {
		for (; n < r; n++) if (e[n] === t) return n;
		return r;
	}
	function v(e) {
		let t = 256;
		for (let n = 0; n < 148; n++) t += e[n];
		for (let n = 156; n < 512; n++) t += e[n];
		return t;
	}
	function y(e, t) {
		return e = e.toString(8), e.length > t ? r.slice(0, t) + " " : n.slice(0, t - e.length) + e + " ";
	}
	function b(e, t, n) {
		t[n] = 128;
		for (let r = 11; r > 0; r--) t[n + r] = e & 255, e = Math.floor(e / 256);
	}
	function x(e, n, r) {
		e.toString(8).length > 11 ? b(e, n, r) : t.write(n, y(e, 11), r);
	}
	function S(e) {
		let t;
		if (e[0] === 128) t = !0;
		else if (e[0] === 255) t = !1;
		else return null;
		let n = [], r;
		for (r = e.length - 1; r > 0; r--) {
			let i = e[r];
			t ? n.push(i) : n.push(255 - i);
		}
		let i = 0, a = n.length;
		for (r = 0; r < a; r++) i += n[r] * 256 ** r;
		return t ? i : -1 * i;
	}
	function C(e, n, r) {
		if (e = e.subarray(n, n + r), n = 0, e[n] & 128) return S(e);
		{
			for (; n < e.length && e[n] === 32;) n++;
			let r = m(_(e, 32, n, e.length), e.length, e.length);
			for (; n < r && e[n] === 0;) n++;
			return r === n ? 0 : parseInt(t.toString(e.subarray(n, r)), 8);
		}
	}
	function w(e, n, r, i) {
		return t.toString(e.subarray(n, _(e, 0, n, n + r)), i);
	}
	function T(e) {
		let n = t.byteLength(e), r = Math.floor(Math.log(n) / Math.log(10)) + 1;
		return n + r >= 10 ** r && r++, n + r + e;
	}
})), Zs = /* @__PURE__ */ H(((e, t) => {
	var { Writable: n, Readable: r, getStreamError: i } = Ys(), a = Us(), o = Ws(), s = Xs(), c = o.alloc(0), l = 4 * 1024 * 1024, u = class {
		constructor() {
			this.buffered = 0, this.shifted = 0, this.queue = new a(), this._offset = 0;
		}
		push(e) {
			this.buffered += e.byteLength, this.queue.push(e);
		}
		shiftFirst(e) {
			return this.buffered === 0 ? null : this._next(e);
		}
		shift(e) {
			if (e > this.buffered) return null;
			if (e === 0) return c;
			let t = this._next(e);
			if (e === t.byteLength) return t;
			let n = [t];
			for (; (e -= t.byteLength) > 0;) t = this._next(e), n.push(t);
			return o.concat(n);
		}
		_next(e) {
			let t = this.queue.peek(), n = t.byteLength - this._offset;
			if (e >= n) {
				let e = this._offset ? t.subarray(this._offset, t.byteLength) : t;
				return this.queue.shift(), this._offset = 0, this.buffered -= n, this.shifted += n, e;
			}
			return this.buffered -= e, this.shifted += e, t.subarray(this._offset, this._offset += e);
		}
	}, d = class extends r {
		constructor(e, t, n) {
			super(), this.header = t, this.offset = n, this._parent = e;
		}
		_read(e) {
			this.header.size === 0 && this.push(null), this._parent._stream === this && this._parent._update(), e(null);
		}
		_predestroy() {
			this._parent.destroy(i(this));
		}
		_detach() {
			this._parent._stream === this && (this._parent._stream = null, this._parent._missing = m(this.header.size), this._parent._update());
		}
		_destroy(e) {
			this._detach(), e(null);
		}
	}, f = class extends n {
		constructor(e) {
			super(e), e ||= {}, this._buffer = new u(), this._offset = 0, this._header = null, this._stream = null, this._missing = 0, this._longHeader = !1, this._callback = p, this._locked = !1, this._finished = !1, this._pax = null, this._paxGlobal = null, this._gnuLongPath = null, this._gnuLongLinkPath = null, this._filenameEncoding = e.filenameEncoding || "utf-8", this._allowUnknownFormat = !!e.allowUnknownFormat, this._unlockBound = this._unlock.bind(this);
		}
		_unlock(e) {
			if (this._locked = !1, e) {
				this.destroy(e), this._continueWrite(e);
				return;
			}
			this._update();
		}
		_consumeHeader() {
			if (this._locked) return !1;
			this._offset = this._buffer.shifted;
			try {
				this._header = s.decode(this._buffer.shift(512), this._filenameEncoding, this._allowUnknownFormat);
			} catch (e) {
				return this._continueWrite(e), !1;
			}
			if (!this._header) return !0;
			switch (this._header.byteOffset = this._buffer.shifted, this._header.type) {
				case "gnu-long-path":
				case "gnu-long-link-path":
				case "pax-global-header":
				case "pax-header": return this._longHeader = !0, this._missing = this._header.size, this._missing > l ? (this._continueWrite(/* @__PURE__ */ Error("Header exceeds max size")), !1) : !0;
			}
			return this._locked = !0, this._applyLongHeaders(), this._header.size >= 0 ? this._header.size === 0 || this._header.type === "directory" ? (this.emit("entry", this._header, this._createStream(), this._unlockBound), !0) : (this._stream = this._createStream(), this._missing = this._header.size, this.emit("entry", this._header, this._stream, this._unlockBound), !0) : (this._continueWrite(/* @__PURE__ */ Error("Invalid header")), !1);
		}
		_applyLongHeaders() {
			this._gnuLongPath &&= (this._header.name = this._gnuLongPath, null), this._gnuLongLinkPath &&= (this._header.linkname = this._gnuLongLinkPath, null), this._pax &&= (this._pax.path && (this._header.name = this._pax.path), this._pax.linkpath && (this._header.linkname = this._pax.linkpath), this._pax.size && (this._header.size = parseInt(this._pax.size, 10)), this._header.pax = this._pax, null);
		}
		_decodeLongHeader(e) {
			switch (this._header.type) {
				case "gnu-long-path":
					this._gnuLongPath = s.decodeLongPath(e, this._filenameEncoding);
					break;
				case "gnu-long-link-path":
					this._gnuLongLinkPath = s.decodeLongPath(e, this._filenameEncoding);
					break;
				case "pax-global-header":
					this._paxGlobal = s.decodePax(e);
					break;
				case "pax-header":
					this._pax = this._paxGlobal === null ? s.decodePax(e) : Object.assign({}, this._paxGlobal, s.decodePax(e));
					break;
			}
		}
		_consumeLongHeader() {
			this._longHeader = !1, this._missing = m(this._header.size);
			let e = this._buffer.shift(this._header.size);
			try {
				this._decodeLongHeader(e);
			} catch (e) {
				return this._continueWrite(e), !1;
			}
			return !0;
		}
		_consumeStream() {
			let e = this._buffer.shiftFirst(this._missing);
			if (e === null) return !1;
			this._missing -= e.byteLength;
			let t = this._stream.push(e);
			return this._missing === 0 ? (this._stream.push(null), t && this._stream._detach(), t && this._locked === !1) : t;
		}
		_createStream() {
			return new d(this, this._header, this._offset);
		}
		_update() {
			for (; this._buffer.buffered > 0 && !this.destroying;) {
				if (this._missing > 0) {
					if (this._stream !== null) {
						if (this._consumeStream() === !1) return;
						continue;
					}
					if (this._longHeader === !0) {
						if (this._missing > this._buffer.buffered) break;
						if (this._consumeLongHeader() === !1) return !1;
						continue;
					}
					let e = this._buffer.shiftFirst(this._missing);
					e !== null && (this._missing -= e.byteLength);
					continue;
				}
				if (this._buffer.buffered < 512) break;
				if (this._stream !== null || this._consumeHeader() === !1) return;
			}
			this._continueWrite(null);
		}
		_continueWrite(e) {
			let t = this._callback;
			this._callback = p, t(e);
		}
		_write(e, t) {
			this._callback = t, this._buffer.push(e), this._update();
		}
		_final(e) {
			this._finished = this._missing === 0 && this._buffer.buffered === 0, e(this._finished ? null : /* @__PURE__ */ Error("Unexpected end of data"));
		}
		_predestroy() {
			this._continueWrite(null);
		}
		_destroy(e) {
			this._stream && this._stream.destroy(i(this)), e(null);
		}
		[Symbol.asyncIterator]() {
			let e = null, t = null, n = null, r = null, i = null, a = this;
			return this.on("entry", c), this.on("error", (t) => {
				e = t;
			}), this.on("close", l), {
				[Symbol.asyncIterator]() {
					return this;
				},
				next() {
					return new Promise(s);
				},
				return() {
					return u(null);
				},
				throw(e) {
					return u(e);
				}
			};
			function o(e) {
				if (!i) return;
				let t = i;
				i = null, t(e);
			}
			function s(i, s) {
				if (e) return s(e);
				if (r) {
					i({
						value: r,
						done: !1
					}), r = null;
					return;
				}
				t = i, n = s, o(null), a._finished && t && (t({
					value: void 0,
					done: !0
				}), t = n = null);
			}
			function c(e, a, o) {
				i = o, a.on("error", p), t ? (t({
					value: a,
					done: !1
				}), t = n = null) : r = a;
			}
			function l() {
				o(e), t &&= (e ? n(e) : t({
					value: void 0,
					done: !0
				}), n = null);
			}
			function u(e) {
				return a.destroy(e), o(e), new Promise((t, n) => {
					if (a.destroyed) return t({
						value: void 0,
						done: !0
					});
					a.once("close", function() {
						e ? n(e) : t({
							value: void 0,
							done: !0
						});
					});
				});
			}
		}
	};
	t.exports = function(e) {
		return new f(e);
	};
	function p() {}
	function m(e) {
		return e &= 511, e && 512 - e;
	}
})), Qs = /* @__PURE__ */ H(((e, t) => {
	var n = {
		S_IFMT: 61440,
		S_IFDIR: 16384,
		S_IFCHR: 8192,
		S_IFBLK: 24576,
		S_IFIFO: 4096,
		S_IFLNK: 40960
	};
	try {
		t.exports = q("fs").constants || n;
	} catch {
		t.exports = n;
	}
})), $s = /* @__PURE__ */ H(((e, t) => {
	var { Readable: n, Writable: r, getStreamError: i } = Ys(), a = Ws(), o = Qs(), s = Xs(), c = 493, l = 420, u = a.alloc(1024), d = class extends r {
		constructor(e, t, n) {
			super({
				mapWritable: g,
				eagerOpen: !0
			}), this.written = 0, this.header = t, this._callback = n, this._linkname = null, this._isLinkname = t.type === "symlink" && !t.linkname, this._isVoid = t.type !== "file" && t.type !== "contiguous-file", this._finished = !1, this._pack = e, this._openCallback = null, this._pack._stream === null ? this._pack._stream = this : this._pack._pending.push(this);
		}
		_open(e) {
			this._openCallback = e, this._pack._stream === this && this._continueOpen();
		}
		_continuePack(e) {
			if (this._callback === null) return;
			let t = this._callback;
			this._callback = null, t(e);
		}
		_continueOpen() {
			this._pack._stream === null && (this._pack._stream = this);
			let e = this._openCallback;
			if (this._openCallback = null, e !== null) {
				if (this._pack.destroying) return e(/* @__PURE__ */ Error("pack stream destroyed"));
				if (this._pack._finalized) return e(/* @__PURE__ */ Error("pack stream is already finalized"));
				this._pack._stream = this, this._isLinkname || this._pack._encode(this.header), this._isVoid && (this._finish(), this._continuePack(null)), e(null);
			}
		}
		_write(e, t) {
			if (this._isLinkname) return this._linkname = this._linkname ? a.concat([this._linkname, e]) : e, t(null);
			if (this._isVoid) return e.byteLength > 0 ? t(/* @__PURE__ */ Error("No body allowed for this entry")) : t();
			if (this.written += e.byteLength, this._pack.push(e)) return t();
			this._pack._drain = t;
		}
		_finish() {
			this._finished || (this._finished = !0, this._isLinkname && (this.header.linkname = this._linkname ? a.toString(this._linkname, "utf-8") : "", this._pack._encode(this.header)), h(this._pack, this.header.size), this._pack._done(this));
		}
		_final(e) {
			if (this.written !== this.header.size) return e(/* @__PURE__ */ Error("Size mismatch"));
			this._finish(), e(null);
		}
		_getError() {
			return i(this) || /* @__PURE__ */ Error("tar entry destroyed");
		}
		_predestroy() {
			this._pack.destroy(this._getError());
		}
		_destroy(e) {
			this._pack._done(this), this._continuePack(this._finished ? null : this._getError()), e();
		}
	}, f = class extends n {
		constructor(e) {
			super(e), this._drain = m, this._finalized = !1, this._finalizing = !1, this._pending = [], this._stream = null;
		}
		entry(e, t, n) {
			if (this._finalized || this.destroying) throw Error("already finalized or destroyed");
			typeof t == "function" && (n = t, t = null), n ||= m, (!e.size || e.type === "symlink") && (e.size = 0), e.type ||= p(e.mode), e.mode ||= e.type === "directory" ? c : l, e.uid ||= 0, e.gid ||= 0, e.mtime ||= /* @__PURE__ */ new Date(), typeof t == "string" && (t = a.from(t));
			let r = new d(this, e, n);
			return a.isBuffer(t) ? (e.size = t.byteLength, r.write(t), r.end(), r) : (r._isVoid, r);
		}
		finalize() {
			if (this._stream || this._pending.length > 0) {
				this._finalizing = !0;
				return;
			}
			this._finalized || (this._finalized = !0, this.push(u), this.push(null));
		}
		_done(e) {
			e === this._stream && (this._stream = null, this._finalizing && this.finalize(), this._pending.length && this._pending.shift()._continueOpen());
		}
		_encode(e) {
			if (!e.pax) {
				let t = s.encode(e);
				if (t) {
					this.push(t);
					return;
				}
			}
			this._encodePax(e);
		}
		_encodePax(e) {
			let t = s.encodePax({
				name: e.name,
				linkname: e.linkname,
				pax: e.pax
			}), n = {
				name: "PaxHeader",
				mode: e.mode,
				uid: e.uid,
				gid: e.gid,
				size: t.byteLength,
				mtime: e.mtime,
				type: "pax-header",
				linkname: e.linkname && "PaxHeader",
				uname: e.uname,
				gname: e.gname,
				devmajor: e.devmajor,
				devminor: e.devminor
			};
			this.push(s.encode(n)), this.push(t), h(this, t.byteLength), n.size = e.size, n.type = e.type, this.push(s.encode(n));
		}
		_doDrain() {
			let e = this._drain;
			this._drain = m, e();
		}
		_predestroy() {
			let e = i(this);
			for (this._stream && this._stream.destroy(e); this._pending.length;) {
				let t = this._pending.shift();
				t.destroy(e), t._continueOpen();
			}
			this._doDrain();
		}
		_read(e) {
			this._doDrain(), e();
		}
	};
	t.exports = function(e) {
		return new f(e);
	};
	function p(e) {
		switch (e & o.S_IFMT) {
			case o.S_IFBLK: return "block-device";
			case o.S_IFCHR: return "character-device";
			case o.S_IFDIR: return "directory";
			case o.S_IFIFO: return "fifo";
			case o.S_IFLNK: return "symlink";
		}
		return "file";
	}
	function m() {}
	function h(e, t) {
		t &= 511, t && e.push(u.subarray(0, 512 - t));
	}
	function g(e) {
		return a.isBuffer(e) ? e : a.from(e);
	}
}));
(/* @__PURE__ */ H(((e) => {
	e.extract = Zs(), e.pack = $s();
})))();
//#endregion
//#region node_modules/archiver/node_modules/buffer-crc32/dist/index.mjs
var ec = new Int32Array([
	0,
	1996959894,
	3993919788,
	2567524794,
	124634137,
	1886057615,
	3915621685,
	2657392035,
	249268274,
	2044508324,
	3772115230,
	2547177864,
	162941995,
	2125561021,
	3887607047,
	2428444049,
	498536548,
	1789927666,
	4089016648,
	2227061214,
	450548861,
	1843258603,
	4107580753,
	2211677639,
	325883990,
	1684777152,
	4251122042,
	2321926636,
	335633487,
	1661365465,
	4195302755,
	2366115317,
	997073096,
	1281953886,
	3579855332,
	2724688242,
	1006888145,
	1258607687,
	3524101629,
	2768942443,
	901097722,
	1119000684,
	3686517206,
	2898065728,
	853044451,
	1172266101,
	3705015759,
	2882616665,
	651767980,
	1373503546,
	3369554304,
	3218104598,
	565507253,
	1454621731,
	3485111705,
	3099436303,
	671266974,
	1594198024,
	3322730930,
	2970347812,
	795835527,
	1483230225,
	3244367275,
	3060149565,
	1994146192,
	31158534,
	2563907772,
	4023717930,
	1907459465,
	112637215,
	2680153253,
	3904427059,
	2013776290,
	251722036,
	2517215374,
	3775830040,
	2137656763,
	141376813,
	2439277719,
	3865271297,
	1802195444,
	476864866,
	2238001368,
	4066508878,
	1812370925,
	453092731,
	2181625025,
	4111451223,
	1706088902,
	314042704,
	2344532202,
	4240017532,
	1658658271,
	366619977,
	2362670323,
	4224994405,
	1303535960,
	984961486,
	2747007092,
	3569037538,
	1256170817,
	1037604311,
	2765210733,
	3554079995,
	1131014506,
	879679996,
	2909243462,
	3663771856,
	1141124467,
	855842277,
	2852801631,
	3708648649,
	1342533948,
	654459306,
	3188396048,
	3373015174,
	1466479909,
	544179635,
	3110523913,
	3462522015,
	1591671054,
	702138776,
	2966460450,
	3352799412,
	1504918807,
	783551873,
	3082640443,
	3233442989,
	3988292384,
	2596254646,
	62317068,
	1957810842,
	3939845945,
	2647816111,
	81470997,
	1943803523,
	3814918930,
	2489596804,
	225274430,
	2053790376,
	3826175755,
	2466906013,
	167816743,
	2097651377,
	4027552580,
	2265490386,
	503444072,
	1762050814,
	4150417245,
	2154129355,
	426522225,
	1852507879,
	4275313526,
	2312317920,
	282753626,
	1742555852,
	4189708143,
	2394877945,
	397917763,
	1622183637,
	3604390888,
	2714866558,
	953729732,
	1340076626,
	3518719985,
	2797360999,
	1068828381,
	1219638859,
	3624741850,
	2936675148,
	906185462,
	1090812512,
	3747672003,
	2825379669,
	829329135,
	1181335161,
	3412177804,
	3160834842,
	628085408,
	1382605366,
	3423369109,
	3138078467,
	570562233,
	1426400815,
	3317316542,
	2998733608,
	733239954,
	1555261956,
	3268935591,
	3050360625,
	752459403,
	1541320221,
	2607071920,
	3965973030,
	1969922972,
	40735498,
	2617837225,
	3943577151,
	1913087877,
	83908371,
	2512341634,
	3803740692,
	2075208622,
	213261112,
	2463272603,
	3855990285,
	2094854071,
	198958881,
	2262029012,
	4057260610,
	1759359992,
	534414190,
	2176718541,
	4139329115,
	1873836001,
	414664567,
	2282248934,
	4279200368,
	1711684554,
	285281116,
	2405801727,
	4167216745,
	1634467795,
	376229701,
	2685067896,
	3608007406,
	1308918612,
	956543938,
	2808555105,
	3495958263,
	1231636301,
	1047427035,
	2932959818,
	3654703836,
	1088359270,
	936918e3,
	2847714899,
	3736837829,
	1202900863,
	817233897,
	3183342108,
	3401237130,
	1404277552,
	615818150,
	3134207493,
	3453421203,
	1423857449,
	601450431,
	3009837614,
	3294710456,
	1567103746,
	711928724,
	3020668471,
	3272380065,
	1510334235,
	755167117
]);
function tc(e) {
	if (Buffer.isBuffer(e)) return e;
	if (typeof e == "number") return Buffer.alloc(e);
	if (typeof e == "string") return Buffer.from(e);
	throw Error("input must be buffer, number, or string, received " + typeof e);
}
function nc(e) {
	let t = tc(4);
	return t.writeInt32BE(e, 0), t;
}
function rc(e, t) {
	e = tc(e), Buffer.isBuffer(t) && (t = t.readUInt32BE(0));
	let n = ~~t ^ -1;
	for (var r = 0; r < e.length; r++) n = ec[(n ^ e[r]) & 255] ^ n >>> 8;
	return n ^ -1;
}
function ic() {
	return nc(rc.apply(null, arguments));
}
ic.signed = function() {
	return rc.apply(null, arguments);
}, ic.unsigned = function() {
	return rc.apply(null, arguments) >>> 0;
};
//#endregion
//#region node_modules/archiver/index.js
var ac = class extends Ja {
	constructor(e) {
		super(e), this._format = "zip", this._module = new Bs(e), this._supportsDirectory = !0, this._supportsSymlink = !0, this._modulePipe();
	}
}, oc = e(import.meta.url)("adm-zip"), sc = 1, cc = "inventory.db";
function lc(e, t) {
	let n = C.resolve(e) + C.sep, r = C.resolve(t);
	if (r !== C.resolve(e) && !r.startsWith(n)) throw Error("The portable backup contains an unsafe file path.");
}
function uc(e, t, n) {
	return new Promise((r, i) => {
		let a = S.createWriteStream(e, { flags: "wx" }), o = new ac({ zlib: { level: 9 } }), s = (e) => i(e);
		a.on("close", r), a.on("error", s), o.on("error", s), o.pipe(a);
		for (let e of t) o.append(e.content, { name: e.name });
		n && o.directory(n.path, n.name), o.finalize().catch(i);
	});
}
async function dc(e, t, n, r) {
	if (!e.open) throw Error("The active database is not open.");
	let i = C.resolve(n);
	if (C.resolve(e.name) === i) throw Error("Choose a different file from the active database.");
	let a = S.mkdtempSync(C.join(t, ".stockwise-backup-")), o = C.join(a, cc), s = `${i}.${Date.now()}.tmp`, c = C.join(t, "images");
	try {
		await e.backup(o);
		let t = {
			format: "stockwise-portable-backup",
			formatVersion: sc,
			appVersion: r || null,
			schemaVersion: e.pragma("user_version", { simple: !0 }),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			includesImages: S.existsSync(c)
		};
		return await uc(s, [{
			name: "backup-manifest.json",
			content: `${JSON.stringify(t, null, 2)}\n`
		}, {
			name: cc,
			content: S.readFileSync(o)
		}], S.existsSync(c) ? {
			path: c,
			name: "images"
		} : null), S.renameSync(s, i), i;
	} catch (e) {
		throw S.rmSync(s, { force: !0 }), Error("Could not create the portable StockWise backup.", { cause: e });
	} finally {
		S.rmSync(a, {
			recursive: !0,
			force: !0
		});
	}
}
function fc(e, t) {
	let n = C.resolve(e), r = C.resolve(t);
	S.mkdirSync(r, { recursive: !0 });
	let i = C.join(r, "archive");
	S.mkdirSync(i);
	try {
		let e = new oc(n);
		for (let t of e.getEntries()) lc(i, C.join(i, t.entryName));
		e.extractAllTo(i, !0);
		let t = C.join(i, "backup-manifest.json");
		if (!S.existsSync(t)) throw Error("This file is missing the StockWise backup manifest.");
		let r = JSON.parse(S.readFileSync(t, "utf8"));
		if (r.format !== "stockwise-portable-backup" || r.formatVersion !== sc) throw Error("This portable backup format is not supported by this version of StockWise.");
		let a = C.join(i, cc);
		if (!S.existsSync(a)) throw Error("This portable backup does not contain a database.");
		let o = C.join(i, "images");
		return {
			databasePath: a,
			imagesPath: S.existsSync(o) ? o : null,
			manifest: r
		};
	} catch (e) {
		throw S.rmSync(r, {
			recursive: !0,
			force: !0
		}), Error(e.message || "Could not read the portable StockWise backup.", { cause: e });
	}
}
//#endregion
//#region src/Backend/dataExport.js
var pc = e(import.meta.url), mc = pc("xlsx"), hc = pc("pdfkit"), { ZipArchive: gc } = pc("archiver"), _c = [
	"products",
	"customers",
	"bills",
	"imports",
	"expenses"
], vc = {
	products: "Products and their variants, bases, and current stock quantities.",
	customers: "Customers and their associated sales records.",
	bills: "Sales bills, line items, and bill activity entries.",
	imports: "Inventory import expenses and the items added by each import.",
	expenses: "All recorded expenses and their associated expense items."
};
function yc(e) {
	if (!e || typeof e != "object") throw Error("Choose at least one data section to export.");
	let t = Object.fromEntries(_c.map((t) => [t, e[t] === !0]));
	if (!Object.values(t).some(Boolean)) throw Error("Choose at least one data section to export.");
	return t;
}
async function bc(e) {
	if (typeof e != "string" || !e.trim()) throw Error("Choose an export destination folder.");
	let t = C.resolve(e), n;
	try {
		n = await S.promises.stat(t), await M(t, N.W_OK);
	} catch (e) {
		throw Error("The export destination does not exist or is not writable.", { cause: e });
	}
	if (!n.isDirectory()) throw Error("The export destination must be a folder.");
	return t;
}
function xc(e, t, n = []) {
	return e.prepare(t).all(...n);
}
function Sc(e, t) {
	let n = {};
	t.products && (n.products = xc(e, "SELECT id, name, images FROM products ORDER BY name COLLATE NOCASE"), n.variants = xc(e, "\n      SELECT id, product_id, bucket_size, landing, sales, mp\n      FROM variants ORDER BY product_id, bucket_size\n    "), n.bases = xc(e, "\n      SELECT id, product_id, name FROM bases ORDER BY product_id, name COLLATE NOCASE\n    "), n.stock = xc(e, "\n      SELECT base_id, variant_id, stock FROM base_stock ORDER BY base_id, variant_id\n    "));
	let r = t.customers || t.bills;
	return t.customers && (n.customers = xc(e, "SELECT id, name, phone, address, notes FROM customers ORDER BY name COLLATE NOCASE")), r && (n.bills = xc(e, "\n      SELECT id, customer_id, date, payment_method, total_purchased, amount_paid,\n             amount_due, status, bill_type, pan_number, bill_number, invoice_data\n      FROM bills ORDER BY date, id\n    "), n.billItems = xc(e, "\n      SELECT id, bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price\n      FROM bill_items ORDER BY bill_id, id\n    "), n.billActivity = xc(e, "\n      SELECT id, bill_id, type, date, amount, payment_method, note, created_at\n      FROM bill_activity ORDER BY bill_id, date, id\n    ")), t.imports && (n.imports = xc(e, "\n      SELECT id, date, label, amount, type, invoice_data\n      FROM expenses WHERE type = 'Import' ORDER BY date, id\n    "), n.importItems = xc(e, "\n      SELECT id, expense_id, product_name, base, bucket_size, quantity, cost_price\n      FROM expense_items\n      WHERE expense_id IN (SELECT id FROM expenses WHERE type = 'Import')\n      ORDER BY expense_id, id\n    ")), t.expenses && (n.expenses = xc(e, "\n      SELECT id, date, label, amount, type, invoice_data\n      FROM expenses ORDER BY date, id\n    "), n.expenseItems = xc(e, "\n      SELECT id, expense_id, product_name, base, bucket_size, quantity, cost_price\n      FROM expense_items ORDER BY expense_id, id\n    ")), n;
}
function Cc(e) {
	return e.length ? e : [{ "No records": "" }];
}
function wc(e, t, n) {
	let r = mc.utils.json_to_sheet(Cc(n));
	r["!cols"] = (n.length ? Object.keys(n[0]) : ["No records"]).map((e) => {
		let t = Math.max(e.length, ...n.map((t) => String(t[e] ?? "").length));
		return { wch: Math.min(Math.max(t + 2, 12), 55) };
	}), mc.utils.book_append_sheet(e, r, t);
}
function Tc(e) {
	return new Promise((t, n) => {
		let r = new hc({
			margin: 42,
			size: "A4"
		}), i = [];
		r.on("data", (e) => i.push(e)), r.on("end", () => t(O.concat(i))), r.on("error", n);
		try {
			e(r), r.end();
		} catch (e) {
			n(e);
		}
	});
}
function Ec(e) {
	return `NPR ${Number(e || 0).toLocaleString("en-NP", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
async function Dc(e, t, n) {
	return Tc((r) => {
		r.fontSize(22).text("StockWise Data Export", { align: "center" }), r.moveDown(), r.fontSize(11).text(`Exported: ${t}`), r.text(`App version: ${n || "Unavailable"}`), r.moveDown(), r.fontSize(14).text("Included sections"), r.moveDown(.5);
		for (let t of _c) e[t] && (r.fontSize(11).text(`${t[0].toUpperCase()}${t.slice(1)}`, { continued: !0 }), r.text(` — ${vc[t]}`), r.moveDown(.35));
		r.moveDown(), r.fontSize(10).fillColor("#555").text("This archive contains a spreadsheet export of the selected StockWise records and, when sales are included, printable copies of the exported bills.");
	});
}
async function Oc(e) {
	let t = xc(e, "\n    SELECT b.*, c.name AS customer_name, c.phone AS customer_phone,\n           c.address AS customer_address\n    FROM bills b\n    LEFT JOIN customers c ON c.id = b.customer_id\n    ORDER BY b.date, b.id\n  "), n = xc(e, "\n    SELECT * FROM bill_items ORDER BY bill_id, id\n  "), r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = r.get(e.bill_id) || [];
		t.push(e), r.set(e.bill_id, t);
	}
	return Tc((e) => {
		t.forEach((t, n) => {
			n > 0 && e.addPage();
			let i = r.get(t.id) || [], a = String(t.bill_type || "default").toLowerCase(), o = null;
			if (a === "vat" && t.invoice_data) try {
				let e = JSON.parse(t.invoice_data);
				e && typeof e == "object" && !Array.isArray(e) && (o = e);
			} catch {
				o = null;
			}
			if (a === "vat" && o) {
				let n = i.reduce((e, t) => e + Number(t.quantity || 0) * Number(t.price_at_sale || 0), 0), r = Number(o.discount || 0), a = Number(o.taxableAmount ?? n - r), s = Number(o.vatPercent || 0), c = Number(o.tax ?? a * s / 100), l = a + c;
				e.fillColor("#111").fontSize(20).text(o.shopName || "StockWise", { align: "center" }), e.fontSize(10), e.text(o.shopAddress || "", { align: "center" }), e.text(o.shopTelephone ? `Tel: ${o.shopTelephone}` : "", { align: "center" }), e.moveDown(), e.fontSize(15).text("VAT Invoice", { align: "center" }), e.moveDown(), e.fontSize(10), e.text(`Invoice Number: ${o.invoiceNumber || t.bill_number || t.id}`), e.text(`TPIN: ${o.tpinNumber || "—"}`), e.text(`Date: ${t.date}`, e.page.width - 180, e.y - 24, {
					width: 135,
					align: "right"
				}), e.moveDown(), e.text(`Buyer Name: ${o.buyerName || t.customer_name || "Unknown"}`), e.text(`Buyer Address: ${o.buyerAddress || t.customer_address || "—"}`), e.text(`Buyer TPIN: ${o.buyerTpin || "—"}`), e.text(`Mode of Payment: ${o.paymentMode || t.payment_method || "—"}`), e.moveDown();
				let u = e.x, d = [
					["S.N.", 35],
					["Particulars", 245],
					["Qty", 55],
					["Rate", 80],
					["Amount (Rs. and Ps.)", 105]
				];
				e.font("Helvetica-Bold");
				let f = u;
				for (let [t, n] of d) e.text(t, f, e.y, { width: n }), f += n;
				e.moveDown(.8), e.font("Helvetica"), i.forEach((t, n) => {
					f = u;
					let r = [
						String(n + 1),
						[
							t.product_name,
							t.base || "",
							t.bucket_size ? `Size: ${t.bucket_size}` : ""
						].filter(Boolean).join(" — "),
						String(t.quantity),
						Ec(t.price_at_sale),
						Ec(t.quantity * t.price_at_sale)
					], i = e.y;
					d.forEach(([, t], n) => {
						e.text(r[n], f, i, { width: t }), f += t;
					}), e.moveDown(.8);
				}), e.moveDown(), e.font("Helvetica-Bold").text(`Amount: ${Ec(n)}`, { align: "right" }), e.font("Helvetica").text(`Discount: ${Ec(r)}`, { align: "right" }), e.text(`Taxable Amount: ${Ec(a)}`, { align: "right" }), e.text(`VAT: ${s}%`, { align: "right" }), e.text(`Tax: ${Ec(c)}`, { align: "right" }), e.font("Helvetica-Bold").text(`Grand Total: ${Ec(l)}`, { align: "right" }), e.font("Helvetica");
				return;
			}
			e.fillColor("#111").fontSize(20).text("StockWise", { align: "center" }), e.fontSize(15).text("Sales Bill", { align: "center" }), e.moveDown(), e.fontSize(10), e.text(`Bill No: ${t.bill_number || t.id}`), a === "pan" && e.text(`PAN Number: ${t.pan_number || "—"}`), e.text(`Date: ${t.date}`), e.text(`Bill Type: ${t.bill_type || "default"}`), e.text(`Payment Method: ${t.payment_method || "—"}`), e.moveDown(), e.text(`Customer: ${t.customer_name || "Unknown"}`), e.text(`Phone: ${t.customer_phone || "—"}`), e.text(`Address: ${t.customer_address || "—"}`), e.moveDown();
			let s = e.x, c = [
				["Product", 190],
				["Base", 90],
				["Size", 55],
				["Qty", 45],
				["Price", 75],
				["Subtotal", 80]
			];
			e.font("Helvetica-Bold");
			let l = s;
			for (let [t, n] of c) e.text(t, l, e.y, { width: n }), l += n;
			e.moveDown(.8), e.font("Helvetica");
			for (let t of i) {
				l = s;
				let n = [
					t.product_name,
					t.base || "—",
					String(t.bucket_size ?? "—"),
					String(t.quantity),
					Ec(t.price_at_sale),
					Ec(t.quantity * t.price_at_sale)
				], r = e.y;
				c.forEach(([, t], i) => {
					e.text(n[i], l, r, { width: t }), l += t;
				}), e.moveDown(.8);
			}
			e.moveDown(), e.font("Helvetica-Bold").text(`Total: ${Ec(t.total_purchased)}`, { align: "right" }), e.font("Helvetica").text(`Paid: ${Ec(t.amount_paid)}`, { align: "right" }), e.text(`Due: ${Ec(t.amount_due)}`, { align: "right" }), e.text(`Status: ${t.status}`, { align: "right" }), e.font("Helvetica");
		});
	});
}
async function kc(e, t) {
	let n = C.join(e, `stockwise-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`), r = `${n}.${Date.now()}.tmp`;
	try {
		let e = S.createWriteStream(r, { flags: "wx" }), i = new gc({ zlib: { level: 9 } }), a = new Promise((t, n) => {
			e.on("close", t), e.on("error", n), i.on("error", n);
		});
		i.pipe(e);
		for (let e of t) i.append(e.content, { name: e.name });
		return await i.finalize(), await a, S.renameSync(r, n), n;
	} catch (e) {
		throw S.rmSync(r, { force: !0 }), Error("Could not finish the StockWise export archive.", { cause: e });
	}
}
async function Ac(e, t, n, r) {
	let i = yc(n), a = await bc(t), o = Sc(e, i), s = mc.utils.book_new();
	for (let [e, t] of [
		["Products", "products"],
		["Variants", "variants"],
		["Bases", "bases"],
		["Stock", "stock"],
		["Customers", "customers"],
		["Bills", "bills"],
		["Bill Items", "billItems"],
		["Bill Activity", "billActivity"],
		["Imports", "imports"],
		["Import Items", "importItems"],
		["Expenses", "expenses"],
		["Expense Items", "expenseItems"]
	]) o[t] && wc(s, e, o[t]);
	let c = [{
		name: "introduction.pdf",
		content: await Dc(i, (/* @__PURE__ */ new Date()).toLocaleString(), r)
	}, {
		name: "data.xlsx",
		content: mc.write(s, {
			type: "buffer",
			bookType: "xlsx"
		})
	}];
	return (i.bills || i.customers) && c.push({
		name: "bills.pdf",
		content: await Oc(e)
	}), kc(a, c);
}
//#endregion
//#region src/Backend/services/backupExport.js
function jc(e) {
	function t(t) {
		return Re(e.db, t);
	}
	function n(t, n, r) {
		return Ac(e.db, t, n, r);
	}
	function r(t, n) {
		return dc(e.db, e.dataDirectory, t, n);
	}
	async function i(t) {
		let n = d.resolve(t);
		if (n === d.resolve(e.dbPath)) throw Error("Choose a backup file, not the active database.");
		let r = g.mkdtempSync(d.join(d.dirname(e.dbPath), ".stockwise-restore-")), i = d.join(r, "restored.db"), a = d.join(r, "previous.db"), o = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${k()}.db`, s = d.join(d.dirname(e.dbPath), o);
		try {
			await ze(n, i), await Re(e.db, s), e.db.close();
			try {
				Be(e.dbPath, i, a);
			} catch (t) {
				try {
					e.openDatabase();
				} catch (e) {
					throw AggregateError([t, e], "Restore failed and the active database could not be reopened.", { cause: e });
				}
				throw t;
			}
			return { recoveryBackupPath: s };
		} finally {
			g.rmSync(r, {
				recursive: !0,
				force: !0
			});
		}
	}
	async function a(t) {
		let n = g.mkdtempSync(d.join(d.dirname(e.dbPath), ".stockwise-portable-restore-")), r = d.join(n, "restored.db"), i = d.join(n, "images"), a = d.join(n, "previous.db"), o = d.join(n, "previous-images"), s = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${k()}.db`, c = d.join(d.dirname(e.dbPath), s), l = !1;
		try {
			let s = fc(t, n);
			await ze(s.databasePath, r), s.imagesPath && g.cpSync(s.imagesPath, i, { recursive: !0 }), await Re(e.db, c), e.db.close();
			try {
				g.renameSync(e.dbPath, a);
				let t = d.join(e.dataDirectory, "images");
				g.existsSync(t) && (g.renameSync(t, o), l = !0), g.renameSync(r, e.dbPath), g.existsSync(i) && g.renameSync(i, t), e.openDatabase();
			} catch (t) {
				throw e.db?.open && e.db.close(), g.existsSync(e.dbPath) && g.rmSync(e.dbPath, { force: !0 }), g.existsSync(a) && g.renameSync(a, e.dbPath), l && g.existsSync(o) && (g.rmSync(d.join(e.dataDirectory, "images"), {
					recursive: !0,
					force: !0
				}), g.renameSync(o, d.join(e.dataDirectory, "images"))), e.openDatabase(), t;
			}
			return {
				recoveryBackupPath: c,
				includesImages: !!s.imagesPath
			};
		} finally {
			g.rmSync(n, {
				recursive: !0,
				force: !0
			});
		}
	}
	return {
		backupDatabase: t,
		exportDatabase: n,
		createPortableDatabaseBackup: r,
		restoreDatabase: i,
		restorePortableDatabase: a
	};
}
//#endregion
//#region src/Backend/validation.js
function Mc(e, t) {
	if (!e) throw Error(t);
}
function $(e, t = "") {
	return e == null ? t : String(e).trim();
}
function Nc(e, t, { min: n = -Infinity, allowZero: r = !0 } = {}) {
	let i = Number(e);
	if (!Number.isFinite(i)) throw Error(`${t} must be a valid number.`);
	if (i < n) throw Error(`${t} must be at least ${n}.`);
	if (!r && i === 0) throw Error(`${t} cannot be zero.`);
	return i;
}
function Pc(e) {
	if (!e || typeof e != "object") throw Error("Invalid product payload.");
	let t = $(e.name);
	Mc(t.length > 0, "Product name is required.");
	let n = Array.isArray(e.variants) ? e.variants : [], r = Array.isArray(e.bases) ? e.bases : [];
	Mc(n.length > 0 || r.length > 0, "Product must include at least one variant or base.");
	let i = n.map((e, t) => {
		let n = Nc(e?.bucket_size ?? e?.bucketSize, `Variant ${t + 1} size`, {
			min: 1e-4,
			allowZero: !1
		});
		return {
			...e,
			bucket_size: n,
			landing: Nc(e?.landing ?? 0, `Variant ${t + 1} landing`, { min: 0 }),
			sales: Nc(e?.sales ?? 0, `Variant ${t + 1} sales`, { min: 0 }),
			mp: Nc(e?.mp ?? 0, `Variant ${t + 1} market price`, { min: 0 })
		};
	}), a = r.map((e, t) => {
		let n = $(e?.name ?? e?.baseName);
		Mc(n.length > 0, `Base ${t + 1} name is required.`);
		let r = Array.isArray(e?.stocks) ? e.stocks : [];
		return i.length > 0 && Mc(r.length === i.length, `Base "${n}" must contain stock values for every variant.`), {
			...e,
			name: n,
			stocks: r.map((e, t) => Nc(e, `Base "${n}" stock for variant ${t + 1}`, { min: 0 }))
		};
	});
	return {
		...e,
		id: $(e.id, ""),
		name: t,
		images: e.images ?? "",
		variants: i,
		bases: a
	};
}
function Fc(e) {
	if (!e || typeof e != "object") throw Error("Invalid customer payload.");
	let t = $(e.name);
	return Mc(t.length > 0, "Customer name is required."), {
		...e,
		name: t,
		phone: $(e.phone, ""),
		address: $(e.address, ""),
		notes: $(e.notes, "")
	};
}
function Ic(e, t) {
	if (!t || typeof t != "object") throw Error("Invalid bill payload.");
	let n = Number(e);
	Mc(Number.isInteger(n) && n > 0, "A valid customer is required.");
	let r = $(t.date);
	Mc(r.length > 0, "Bill date is required.");
	let i = $(t.billType ?? t.bill_type ?? "default").toLowerCase();
	Mc([
		"default",
		"pan",
		"vat"
	].includes(i), "Bill type must be Default, PAN, or VAT.");
	let a = Nc(t.totalPurchased, "Total purchased", { min: 0 }), o = Nc(t.amountPaid, "Amount paid", { min: 0 }), s = Nc(t.amountDue, "Amount due", { min: 0 });
	Mc(Array.isArray(t.products) && t.products.length > 0, "Bill must contain at least one product.");
	let c = 0, l = t.products.map((e, t) => {
		let n = $(e?.productName ?? e?.product_name), r = $(e?.base), i = Nc(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = Nc(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = Nc(e?.priceAtSale ?? e?.price_at_sale ?? 0, `Item ${t + 1} price`, { min: 0 });
		return Mc(n.length > 0, `Item ${t + 1} product name is required.`), c += a * o, {
			...e,
			productName: n,
			base: r,
			bucketSize: i,
			quantity: a,
			priceAtSale: o
		};
	}), u = c, d = null;
	if (i === "vat") {
		d = t.invoiceData && typeof t.invoiceData == "object" ? t.invoiceData : {};
		let e = Nc(d.discount ?? 0, "Invoice discount", { min: 0 });
		Mc(e <= c, "Invoice discount cannot exceed the item subtotal.");
		let n = c - e;
		Mc($(d.vatPercent ?? "13").length > 0, "VAT percentage is required.");
		let r = Nc(d.vatPercent ?? 13, "VAT percentage", { min: 0 });
		Mc(r <= 100, "VAT percentage cannot exceed 100.");
		let i = Nc(d.tax ?? n * r / 100, "VAT amount", { min: 0 });
		Mc(Math.abs(i - n * r / 100) < .01, `VAT must equal ${r}% of the taxable amount.`), u = n + i, d = {
			...d,
			discount: e,
			vatPercent: r,
			tax: i,
			taxableAmount: n
		};
	}
	return Mc(Math.abs(u - a) < .01, "Bill total does not match its items and applicable tax/discount."), Mc(Math.abs(o + s - a) < .01, "Bill payment values must add up to the total purchased."), {
		date: r,
		paymentMethod: $(t.paymentMethod, ""),
		totalPurchased: a,
		amountPaid: o,
		amountDue: s,
		status: $(t.status, "Open"),
		products: l,
		customerId: n,
		billType: i,
		panNumber: $(t.panNumber ?? t.pan_number ?? ""),
		billNumber: $(t.billNumber ?? t.bill_number ?? ""),
		invoiceData: d
	};
}
function Lc(e) {
	if (!e || typeof e != "object") throw Error("Invalid expense payload.");
	let t = $(e.date);
	Mc(t.length > 0, "Expense date is required.");
	let n = $(e.nameOfExpense ?? e.label);
	Mc(n.length > 0, "Expense label is required.");
	let r = $(e.typeOfExpense ?? e.type ?? "General");
	return Mc([
		"General",
		"Import",
		"Taxes"
	].includes(r), "Expense type must be General, Import, or Taxes."), {
		date: t,
		nameOfExpense: n,
		amountOfExpense: Nc(e.amountOfExpense ?? e.amount ?? 0, "Expense amount", {
			min: 1e-4,
			allowZero: !1
		}),
		typeOfExpense: r
	};
}
function Rc(e) {
	if (!Array.isArray(e) || e.length === 0) throw Error("At least one import item is required.");
	return e.map((e, t) => {
		let n = $(e?.productName ?? e?.product_name), r = $(e?.base), i = Nc(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = Nc(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = Nc(e?.costPrice ?? e?.cost_price ?? 0, `Item ${t + 1} cost price`, { min: 0 });
		return Mc(n.length > 0, `Item ${t + 1} product name is required.`), {
			...e,
			productName: n,
			base: r,
			bucketSize: i,
			quantity: a,
			costPrice: o
		};
	});
}
//#endregion
//#region src/Backend/businessFlows.js
function zc(e, t) {
	let n = Pc(t), r = n.id || T();
	if (e.prepare("SELECT 1 FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n.name)) throw Error(`Product "${n.name}" already exists.`);
	return e.transaction(() => {
		e.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(r, n.name, n.images);
		for (let t of n.variants) e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(r, t.bucket_size, t.landing, t.sales, t.mp);
		for (let t of n.bases) {
			let n = e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(r, t.name).lastInsertRowid;
			for (let i = 0; i < t.stocks.length; i += 1) {
				let a = e.prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?").get(r, i);
				if (!a) throw Error(`Variant lookup failed while saving base "${t.name}".`);
				e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(n, a.id, t.stocks[i]);
			}
		}
	})(), r;
}
function Bc(e, t, n) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT id FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	let r = Pc(n), i = r.name;
	if (e.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE AND id != ?").get(i, t)) throw Error(`Another product already uses the name "${i}".`);
	e.transaction(() => {
		e.prepare("UPDATE products SET name = ?, images = ? WHERE id = ?").run(i, r.images, t);
		let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t);
		for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
		e.prepare("DELETE FROM variants WHERE product_id = ?").run(t);
		let a = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t);
		for (let t of a) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
		e.prepare("DELETE FROM bases WHERE product_id = ?").run(t);
		for (let n of r.variants) e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(t, n.bucket_size, n.landing, n.sales, n.mp);
		for (let n of r.bases) {
			let r = e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(t, n.name).lastInsertRowid;
			for (let i = 0; i < n.stocks.length; i += 1) {
				let a = e.prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?").get(t, i);
				if (!a) throw Error(`Variant lookup failed while updating base "${n.name}".`);
				e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(r, a.id, n.stocks[i]);
			}
		}
	})();
}
function Vc(e, t) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT 1 FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	e.transaction(() => {
		let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t), r = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t);
		for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
		for (let t of r) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
		e.prepare("DELETE FROM variants WHERE product_id = ?").run(t), e.prepare("DELETE FROM bases WHERE product_id = ?").run(t), e.prepare("DELETE FROM products WHERE id = ?").run(t);
	})();
}
function Hc(e) {
	if (!Array.isArray(e) || e.length === 0) throw Error("Select at least one product.");
	let t = [...new Set(e)];
	if (t.some((e) => typeof e != "string" || e.trim() === "")) throw Error("Selected product ids are invalid.");
	return t;
}
function Uc(e, t) {
	let n = t.map((t) => e.prepare("SELECT id, name FROM products WHERE id = ?").get(t));
	if (t.filter((e, t) => !n[t] || n[t].id !== e).length > 0) throw Error("One or more selected products no longer exist.");
	return n;
}
function Wc(e, t) {
	let n = Uc(e, Hc(t)), r = e.prepare("\n    SELECT 1\n    FROM bill_items\n    WHERE TRIM(product_name) = TRIM(?) COLLATE NOCASE\n    LIMIT 1\n  ");
	return n.filter((e) => r.get(e.name)).map((e) => ({
		id: e.id,
		name: e.name
	}));
}
function Gc(e, t) {
	let n = Hc(t), r = Uc(e, n), i = Wc(e, n);
	if (i.length > 0) throw Error(`Cannot delete products referenced by existing bills: ${i.map((e) => e.name).join(", ")}.`);
	return e.transaction(() => {
		for (let t of r) {
			let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t.id), r = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t.id);
			for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
			for (let t of r) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
			e.prepare("DELETE FROM variants WHERE product_id = ?").run(t.id), e.prepare("DELETE FROM bases WHERE product_id = ?").run(t.id), e.prepare("DELETE FROM products WHERE id = ?").run(t.id);
		}
	})(), { count: r.length };
}
function Kc(e, t) {
	if (!Array.isArray(t) || t.length === 0) throw Error("Select at least one inventory item.");
	let n = [], r = /* @__PURE__ */ new Set();
	for (let e of t) {
		if (!e || ![
			"product",
			"base",
			"size"
		].includes(e.type)) throw Error("Selected inventory targets are invalid.");
		let t = `${e.type}:${e.id}:${e.baseId ?? ""}:${e.variantId ?? ""}`;
		r.has(t) || (r.add(t), n.push(e));
	}
	let i = n.filter((e) => e.type === "product").map((e) => e.id);
	if (i.length > 0 && Wc(e, i).length > 0) throw Error("Cannot delete products referenced by existing bills.");
	e.transaction(() => {
		for (let t of n) if (t.type === "product") {
			let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t.id), r = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t.id);
			for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
			for (let t of r) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
			e.prepare("DELETE FROM variants WHERE product_id = ?").run(t.id), e.prepare("DELETE FROM bases WHERE product_id = ?").run(t.id), e.prepare("DELETE FROM products WHERE id = ?").run(t.id);
		} else t.type === "base" ? (e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id), e.prepare("DELETE FROM bases WHERE id = ?").run(t.id)) : t.baseId ? e.prepare("DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?").run(t.baseId, t.variantId) : (e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.variantId), e.prepare("DELETE FROM variants WHERE id = ?").run(t.variantId));
	})();
}
function qc(e, t) {
	if (e == null || e === "") return null;
	let n = typeof e == "number" ? e : Number(e);
	if (!Number.isFinite(n) || n < 0) throw Error(`${t} must be a non-negative number.`);
	return n;
}
function Jc(e, t, n) {
	let r = Hc(t), i = qc(n?.sellingPrice, "Selling price"), a = qc(n?.baseStock, "Base stock quantity");
	if (i === null && a === null) throw Error("Enter a selling price or base stock quantity to update.");
	let o = Uc(e, r);
	return e.transaction(() => {
		for (let t of o) i !== null && e.prepare("UPDATE variants SET sales = ? WHERE product_id = ?").run(i, t.id), a !== null && e.prepare("\n          UPDATE base_stock\n          SET stock = ?\n          WHERE base_id IN (SELECT id FROM bases WHERE product_id = ?)\n        ").run(a, t.id);
	})(), { count: o.length };
}
function Yc(e, t) {
	let n = typeof e == "number" ? e : Number(e);
	if (!Number.isFinite(n) || n < 0) throw Error(`${t} must be a non-negative number.`);
	return n;
}
function Xc(e, t, n, r, i, a) {
	if (!t || !n || !r) throw Error("Product, base, and size are required.");
	if (![
		"landing",
		"mp",
		"sales"
	].includes(i)) throw Error("Unsupported variant price field.");
	let o = Yc(a, "Price");
	if (!e.prepare("\n    SELECT v.id\n    FROM variants v\n    JOIN bases b ON b.product_id = v.product_id\n    WHERE v.id = ? AND v.product_id = ? AND b.id = ?\n  ").get(r, t, n)) throw Error("The selected product row was not found.");
	if (e.prepare(`UPDATE variants SET ${i} = ? WHERE id = ? AND product_id = ?`).run(o, r, t).changes !== 1) throw Error("The selected price could not be updated.");
	return o;
}
function Zc(e, t, n, r, i) {
	if (!t || !n || !r) throw Error("Product, base, and size are required.");
	let a = Yc(i, "Stock");
	if (e.prepare("\n    UPDATE base_stock\n    SET stock = ?\n    WHERE base_id = ? AND variant_id = ?\n      AND EXISTS (\n        SELECT 1 FROM bases\n        WHERE bases.id = base_stock.base_id AND bases.product_id = ?\n      )\n      AND EXISTS (\n        SELECT 1 FROM variants\n        WHERE variants.id = base_stock.variant_id AND variants.product_id = ?\n      )\n  ").run(a, n, r, t, t).changes !== 1) throw Error("The selected stock could not be updated.");
	return a;
}
function Qc(e, t, n, r, i) {
	let a = t ? String(t).trim() : "", o = n ? String(n).trim() : "", s = parseFloat(r) || 0, c = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(a);
	if (!c) return;
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c.id, s);
	if (!l) return;
	let u = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c.id, o);
	u && e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(i, u.id, l.id);
}
function $c(e, t, n) {
	let r = e.prepare("SELECT * FROM products WHERE name = ?").get(t);
	if (!r) return 0;
	let i = e.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(r.id, n);
	return i ? i.landing : 0;
}
function el(e, t, n) {
	e.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(t, n.type, n.date, n.amount, n.paymentMethod, n.note);
}
function tl(e, t, n) {
	let r = Ic(t, n);
	if (!e.prepare("SELECT id FROM customers WHERE id = ?").get(r.customerId)) throw Error("Customer not found.");
	return e.transaction(() => {
		let t = e.prepare("\n      INSERT INTO bills (\n        customer_id, date, payment_method, total_purchased, amount_paid, amount_due,\n        status, bill_type, pan_number, bill_number, invoice_data\n      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ").run(r.customerId, r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status, r.billType, r.panNumber, r.billNumber, r.invoiceData ? JSON.stringify(r.invoiceData) : null).lastInsertRowid;
		el(e, t, {
			type: "sale",
			date: r.date,
			amount: r.totalPurchased,
			paymentMethod: r.paymentMethod,
			note: "Initial bill entry"
		});
		for (let n of r.products) {
			let r = $c(e, n.productName, n.bucketSize);
			e.prepare("\n        INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.priceAtSale, r), Qc(e, n.productName, n.base, n.bucketSize, -n.quantity);
		}
		return r.amountPaid > 0 && el(e, t, {
			type: "payment",
			date: r.date,
			amount: r.amountPaid,
			paymentMethod: r.paymentMethod,
			note: "Payment recorded on bill creation"
		}), t;
	})();
}
function nl(e, t) {
	let n = t.productName ? String(t.productName).trim() : "", r = t.base ? String(t.base).trim() : "", i = parseFloat(t.bucketSize) || 0, a = parseFloat(t.quantity) || 0, o = parseFloat(t.costPrice) || 0, s = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n), c;
	s ? c = s.id : (c = T(), e.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(c, n, ""));
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c, i), u;
	l ? (u = l.id, e.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(o, u)) : u = e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(c, i, o, 0, 0).lastInsertRowid;
	let d = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c, r)?.id ?? e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(c, r).lastInsertRowid;
	e.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(d, u) ? e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(a, d, u) : e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(d, u, a);
}
function rl(e, t) {
	Qc(e, t.product_name, t.base, t.bucket_size, -t.quantity);
}
function il(e) {
	if (e == null) return null;
	if (typeof e != "object" || Array.isArray(e)) throw Error("Invoice data must be an object.");
	return JSON.stringify(e);
}
function al(e, t) {
	return e.prepare("\n    SELECT id, invoice_data FROM expenses\n    WHERE type = 'Import' AND invoice_data IS NOT NULL\n  ").all().filter((e) => e.id !== Number(t)).map((e) => {
		try {
			return JSON.parse(e.invoice_data)?.invoiceNumber;
		} catch (t) {
			throw Error(`Invoice details for import ${e.id} are corrupted.`, { cause: t });
		}
	}).filter((e) => typeof e == "string" && e.trim()).map((e) => e.trim());
}
function ol(e, t, n) {
	let r = String(t ?? "").trim().toLocaleLowerCase();
	return r ? !al(e, n).some((e) => e.toLocaleLowerCase() === r) : !1;
}
function sl(e, t = "") {
	let n = String(t ?? "").trim(), r = /^(.*?)(\d+)$/.exec(n), i = r?.[1] ?? "", a = r?.[2]?.length ?? 1, o = r ? Number(r[2]) : 0, s = al(e).map((e) => {
		let t = /^(.*?)(\d+)$/.exec(e);
		return t && t[1].toLocaleLowerCase() === i.toLocaleLowerCase() ? Number(t[2]) : 0;
	}), c = Math.max(o, ...s) + 1, l = `${i}${String(c).padStart(a, "0")}`;
	for (; !ol(e, l);) c += 1, l = `${i}${String(c).padStart(a, "0")}`;
	return l;
}
function cl(e, t, n) {
	let r = Rc(n), i = r.reduce((e, t) => e + t.costPrice * t.quantity, 0), a = Lc({
		...t,
		amountOfExpense: i,
		typeOfExpense: "Import"
	});
	return {
		id: e.transaction(() => {
			let n = t.invoiceData?.invoiceNumber;
			if (n && !ol(e, n)) throw Error("This invoice number is already in use. Choose another number.");
			for (let t of r) nl(e, t);
			let o = e.prepare("INSERT INTO expenses (date, label, amount, type, invoice_data) VALUES (?, ?, ?, ?, ?)").run(a.date, a.nameOfExpense, i, "Import", il(t.invoiceData)).lastInsertRowid;
			for (let t of r) e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(o, t.productName, t.base, t.bucketSize, t.quantity, t.costPrice);
			return o;
		})(),
		totalCost: i
	};
}
function ll(e, t, n, r) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	let i = Rc(r), a = i.reduce((e, t) => e + t.costPrice * t.quantity, 0), o = Lc({
		...n,
		amountOfExpense: a,
		typeOfExpense: "Import"
	}), s = il(n.invoiceData), c = n.invoiceData?.invoiceNumber, l = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
	return e.transaction(() => {
		if (c && !ol(e, c, t)) throw Error("This invoice number is already in use. Choose another number.");
		for (let t of l) rl(e, t);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t);
		for (let n of i) nl(e, n), e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.costPrice);
		e.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, invoice_data = ? WHERE id = ?").run(o.date, o.nameOfExpense, a, s, t);
	})(), a;
}
//#endregion
//#region src/Backend/inventoryDeletes.js
function ul(e, t, n) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	e.transaction(() => {
		let r = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
		for (let e of r) n(e);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t), e.prepare("DELETE FROM expenses WHERE id = ?").run(t);
	})();
}
function dl(e, t) {
	e.transaction(() => {
		e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t), e.prepare("DELETE FROM variants WHERE id = ?").run(t);
	})();
}
//#endregion
//#region src/Backend/inventoryWrites.js
function fl(e, t) {
	let n = Pc(t), r = e.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n.name);
	return e.transaction(() => {
		let t = r?.id || n.id || T();
		r || e.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(t, n.name, n.images);
		let i = n.variants.map((n) => e.prepare("SELECT id FROM variants WHERE product_id = ? AND bucket_size = ?").get(t, n.bucket_size) || { id: e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(t, n.bucket_size, n.landing, n.sales, n.mp).lastInsertRowid });
		for (let r of n.bases) {
			let n = e.prepare("SELECT id FROM bases WHERE product_id = ? AND name = ?").get(t, r.name)?.id ?? e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(t, r.name).lastInsertRowid;
			i.forEach((t, i) => {
				let a = r.stocks[i];
				e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(a, n, t.id).changes === 0 && e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(n, t.id, a);
			});
		}
		return t;
	})();
}
//#endregion
//#region src/Backend/services/products.js
var pl = P(import.meta.url)("xlsx");
function ml(e) {
	function t(t) {
		return fl(e.db, t);
	}
	function n(t) {
		return zc(e.db, t);
	}
	function r() {
		let t = e.db.prepare("SELECT * FROM products").all();
		for (let n of t) {
			n.variants = e.db.prepare("SELECT * FROM variants WHERE product_id = ?").all(n.id);
			let t = e.db.prepare("SELECT * FROM bases WHERE product_id = ?").all(n.id);
			for (let r of t) {
				let t = e.db.prepare("SELECT variant_id, stock FROM base_stock WHERE base_id = ?").all(r.id);
				r.stockMap = {};
				for (let e of t) r.stockMap[e.variant_id] = e.stock;
				r.stocks = n.variants.map((e) => r.stockMap[e.id] ?? 0);
			}
			n.bases = t;
		}
		return t;
	}
	function i() {
		return sl(e.db, e.appConfig.invoiceDefaults?.invoiceNumber);
	}
	function a(t, n) {
		return ol(e.db, t, n);
	}
	function o(t) {
		Vc(e.db, t);
	}
	function s(t) {
		return Gc(e.db, t);
	}
	function c(t) {
		return Kc(e.db, t);
	}
	function l(t) {
		return Wc(e.db, t);
	}
	function u(t, n) {
		return Jc(e.db, t, n);
	}
	function f(t, n, r, i, a) {
		return Xc(e.db, t, n, r, i, a);
	}
	function p(t, n, r, i) {
		return Zc(e.db, t, n, r, i);
	}
	function m(t, n) {
		Bc(e.db, t, n);
	}
	function h(t) {
		return e.db.prepare("SELECT * FROM products WHERE name = ?").get(t);
	}
	function _(t, n) {
		return e.db.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(t, n);
	}
	function v(t, n) {
		return e.db.prepare("\n    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)\n    VALUES (?, ?, ?, ?, ?)\n  ").run(t, n.bucket_size, n.landing, n.sales, n.mp).lastInsertRowid;
	}
	function y(t, n) {
		return e.db.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(t, n).lastInsertRowid;
	}
	function b(t, n) {
		return e.db.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(t, n);
	}
	function x(t, n, r) {
		e.db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(t, n, r);
	}
	function S(t) {
		let n = d.basename(t), r = d.join(e.dataDirectory, "images", "product-images"), i = d.join(r, n);
		return g.existsSync(r) || g.mkdirSync(r, { recursive: !0 }), g.existsSync(i) || g.copyFileSync(t, i), `images/product-images/${n}`;
	}
	function C(t) {
		return t ? d.join(e.dataDirectory, t) : null;
	}
	function w(t, n) {
		e.db.prepare("DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?").run(t, n);
	}
	function T(t) {
		e.db.transaction(() => {
			if (e.db.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t), e.db.prepare("DELETE FROM bases WHERE id = ?").run(t).changes !== 1) throw Error("Base not found.");
		})();
	}
	function E(t) {
		dl(e.db, t);
	}
	function D(t) {
		if (typeof t != "string" || t.trim() === "") throw Error("Choose an Excel file to import.");
		let n;
		try {
			n = pl.readFile(t);
		} catch (e) {
			throw Error("Could not read the selected Excel file. Check that it is a valid, accessible workbook.", { cause: e });
		}
		let r = n.Sheets["JESTH- 2083"];
		if (!r) throw Error("Sheet \"JESTH- 2083\" not found in this file.");
		let i = pl.utils.sheet_to_json(r, {
			header: 1,
			range: 1
		}), a = /^([A-Za-z]+)((?:\d+)(?:\/\d+)*)$/, o = /^([A-Za-z]+?)(I{1,3}|IV)$/, s = new Set([
			1,
			4,
			10,
			20
		]);
		function c(e) {
			return e.split(" ").map((e) => e && e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
		}
		function l(e) {
			let t = parseFloat(e);
			return isNaN(t) ? null : t;
		}
		function u(e) {
			if (!e) return [null, []];
			let t = String(e).trim();
			if (t.toUpperCase().startsWith("PGE")) {
				let e = t.slice(3).trim(), n = a.exec(e), r = o.exec(e);
				if (n) {
					let e = n[1];
					return ["Enamel", n[2].split("/").map((t) => e + t)];
				} else if (r) return ["Enamel", [e]];
				else return [`Enamel ${c(e)}`.trim(), []];
			}
			let n = t.split(" "), r, i;
			n.length >= 2 ? (i = n[n.length - 1], r = n.slice(0, -1).join(" ")) : (r = t, i = "");
			let s = a.exec(i);
			if (s) {
				let e = s[1], t = s[2].split("/");
				return [c(r.trim()), t.map((t) => e + t)];
			}
			return [c(t), []];
		}
		let d = [], f, p = [], m = !1;
		for (let e of i) {
			let t = e[0];
			!m || t !== f ? (m && d.push([f, p]), f = t, p = [e], m = !0) : p.push(e);
		}
		m && d.push([f, p]);
		let h = {};
		for (let [e, t] of d) {
			let [n, r] = u(e);
			if (!n) continue;
			h[n] || (h[n] = {
				bases: [],
				variants: {},
				canonicalSet: !1
			});
			let i = h[n];
			for (let e of r) i.bases.includes(e) || i.bases.push(e);
			if (!i.canonicalSet && t.some((e) => l(e[17]) !== null && l(e[14]) !== null)) {
				for (let e of t) {
					let t = e[1];
					if (s.has(t)) {
						let n = l(e[17]), r = l(e[14]), a = l(e[13]);
						if (n === null || r === null) continue;
						a === null && (a = 0), i.variants[t] = {
							landing: n,
							mp: r,
							sales: a
						};
					}
				}
				Object.keys(i.variants).length > 0 && (i.canonicalSet = !0);
			}
		}
		let g = 0, _ = 0;
		return e.db.transaction(() => {
			for (let [t, n] of Object.entries(h)) {
				let r = Object.keys(n.variants);
				if (r.length === 0) {
					_++;
					continue;
				}
				let i = e.db.prepare("SELECT * FROM products WHERE name = ?").get(t), a;
				i ? a = i.id : (a = k(), e.db.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(a, t, ""));
				let o = {};
				for (let t of r) {
					let r = n.variants[t], i = e.db.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(a, Number(t));
					i ? o[t] = i.id : o[t] = e.db.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(a, Number(t), r.landing, r.sales, r.mp).lastInsertRowid;
				}
				for (let t of n.bases) {
					let n = e.db.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(a, t), i;
					i = n ? n.id : e.db.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(a, t).lastInsertRowid;
					for (let t of r) {
						let n = o[t];
						e.db.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(i, n) || e.db.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)").run(i, n);
					}
				}
				g++;
			}
		})(), {
			imported: g,
			skipped: _
		};
	}
	return {
		saveInventoryProductChanges: t,
		addProduct: n,
		getProducts: r,
		getNextInvoiceNumber: i,
		isInvoiceNumberAvailable: a,
		deleteProduct: o,
		deleteProducts: s,
		deleteInventoryRows: c,
		findProductsReferencedByBills: l,
		updateProducts: u,
		updateVariantPrice: f,
		updateBaseStock: p,
		editProduct: m,
		getProductByName: h,
		getVariantBySize: _,
		addVariant: v,
		addBase: y,
		getBaseByName: b,
		addBaseStock: x,
		copyImageToDatabase: S,
		resolveImagePath: C,
		deleteBaseStock: w,
		deleteBase: T,
		deleteVariant: E,
		importProductsFromExcel: D
	};
}
//#endregion
//#region src/Backend/services/customersBills.js
function hl(e) {
	function t(t) {
		let n = Fc(t);
		if (e.db.prepare("SELECT 1 FROM customers WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n.name)) throw Error(`Customer "${n.name}" already exists.`);
		return e.db.prepare("\n    INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)\n  ").run(n.name, n.phone, n.address, n.notes).lastInsertRowid;
	}
	function n(t, n) {
		if (!t) throw Error("Bill id is required.");
		let r = $(n?.type ?? "adjustment"), i = $(n?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), a = Number(n?.amount ?? 0), o = $(n?.paymentMethod ?? ""), s = $(n?.note ?? "");
		e.db.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(t, r, i, a, o, s);
	}
	function r(t) {
		return e.db.prepare("SELECT * FROM bill_activity WHERE bill_id = ? ORDER BY date ASC, id ASC").all(t);
	}
	function i(t, n) {
		return tl(e.db, t, n);
	}
	function a() {
		let t = e.db.prepare("SELECT * FROM customers").all();
		for (let n of t) {
			let t = e.db.prepare("SELECT * FROM bills WHERE customer_id = ?").all(n.id);
			for (let n of t) n.products = e.db.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(n.id);
			n.bills = t, n.totalDue = t.reduce((e, t) => e + t.amount_due, 0);
		}
		return t;
	}
	function o(t) {
		if (!e.db.prepare("SELECT id FROM customers WHERE id = ?").get(t)) throw Error("Customer not found.");
		e.db.transaction(() => {
			let n = e.db.prepare("SELECT id FROM bills WHERE customer_id = ?").all(t);
			for (let t of n) e.db.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(t.id);
			e.db.prepare("DELETE FROM bills WHERE customer_id = ?").run(t), e.db.prepare("DELETE FROM customers WHERE id = ?").run(t);
		})();
	}
	function s(n, r) {
		return e.db.transaction(() => {
			let e = t(n);
			return i(e, r), e;
		})();
	}
	function c(t) {
		if (!e.db.prepare("SELECT id FROM bills WHERE id = ?").get(t)) throw Error("Bill not found.");
		e.db.transaction(() => {
			let n = e.db.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t);
			for (let t of n) Qc(e.db, t.product_name, t.base, t.bucket_size, t.quantity);
			e.db.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(t), e.db.prepare("DELETE FROM bills WHERE id = ?").run(t);
		})();
	}
	function l(t, n) {
		let r = Fc(n);
		if (!e.db.prepare("SELECT id FROM customers WHERE id = ?").get(t)) throw Error("Customer not found.");
		e.db.prepare("\n    UPDATE customers SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?\n  ").run(r.name, r.phone, r.address, r.notes, t);
	}
	function u(t, r) {
		let i = e.db.prepare("SELECT * FROM bills WHERE id = ?").get(t);
		if (!i) throw Error("Bill not found.");
		let a = Ic(i.customer_id, r);
		e.db.transaction(() => {
			let r = e.db.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t);
			for (let t of r) Qc(e.db, t.product_name, t.base, t.bucket_size, t.quantity);
			let o = Number(i.total_purchased || 0), s = Number(i.amount_paid || 0), c = a.totalPurchased - o, l = a.amountPaid - s;
			e.db.prepare("\n      UPDATE bills SET\n        date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?,\n        status = ?, bill_type = ?, pan_number = ?, bill_number = ?, invoice_data = ?\n      WHERE id = ?\n    ").run(a.date, a.paymentMethod, a.totalPurchased, a.amountPaid, a.amountDue, a.status, a.billType, a.panNumber, a.billNumber, a.invoiceData ? JSON.stringify(a.invoiceData) : null, t), e.db.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(t);
			for (let n of a.products) {
				let r = f(n.productName, n.bucketSize);
				e.db.prepare("\n      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.priceAtSale, r), Qc(e.db, n.productName, n.base, n.bucketSize, -n.quantity);
			}
			Math.abs(c) > .01 && n(t, {
				type: "adjustment",
				date: a.date,
				amount: c,
				paymentMethod: a.paymentMethod,
				note: c >= 0 ? "Additional products added to bill" : "Bill value reduced"
			}), Math.abs(l) > .01 && n(t, {
				type: "payment",
				date: a.date,
				amount: l,
				paymentMethod: a.paymentMethod,
				note: l >= 0 ? "Customer payment recorded" : "Payment adjusted"
			});
		})();
	}
	function d(t, n, r, i) {
		e.db.transaction(() => {
			l(t, n), u(r, i);
		})();
	}
	function f(t, n) {
		let r = e.db.prepare("SELECT * FROM products WHERE name = ?").get(t);
		if (!r) return 0;
		let i = e.db.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(r.id, n);
		return i ? i.landing : 0;
	}
	return {
		addCustomer: t,
		addBillActivity: n,
		getBillActivity: r,
		addBill: i,
		getCustomers: a,
		deleteCustomer: o,
		addCustomerBill: s,
		deleteBill: c,
		editCustomer: l,
		editBill: u,
		editCustomerBill: d
	};
}
//#endregion
//#region src/Backend/services/expensesAnalytics.js
function gl(e) {
	function t(t) {
		let n = Lc(t);
		return e.db.prepare("INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)").run(n.date, n.nameOfExpense, n.amountOfExpense, n.typeOfExpense).lastInsertRowid;
	}
	function n() {
		return e.db.prepare("SELECT * FROM expenses ORDER BY date DESC").all().map((e) => ({
			id: e.id,
			date: e.date,
			nameOfExpense: e.label,
			typeOfExpense: e.type,
			amountOfExpense: e.amount
		}));
	}
	function r(t) {
		ul(e.db, t, c);
	}
	function i() {
		let t = e.db.prepare("SELECT * FROM bills").all(), n = {};
		return t.map((t) => {
			let r = e.db.prepare("SELECT * FROM customers WHERE id = ?").get(t.customer_id), i = e.db.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
			if (!(t.customer_id in n)) {
				let r = e.db.prepare("SELECT amount_due FROM bills WHERE customer_id = ?").all(t.customer_id);
				n[t.customer_id] = r.reduce((e, t) => e + t.amount_due, 0);
			}
			let a = i.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), o = t.total_purchased, s = t.invoice_data ? JSON.parse(t.invoice_data) : null, c = o - (Number(s?.tax) || 0) - a;
			return {
				id: t.id,
				billType: t.bill_type || "default",
				panNumber: t.pan_number || "",
				billNumber: t.bill_number || "",
				invoiceData: s,
				customer: {
					id: r.id,
					name: r.name,
					phone: r.phone,
					address: r.address,
					date: t.date,
					paymentMethod: t.payment_method,
					totalPurchased: t.total_purchased,
					amountPaid: t.amount_paid,
					amountDue: t.amount_due,
					totalDue: n[t.customer_id],
					status: t.status
				},
				purchasedProducts: i.map((e) => ({
					name: e.product_name,
					base: e.base,
					bucketSize: e.bucket_size,
					quantity: e.quantity,
					priceAtSale: e.price_at_sale,
					costPrice: e.cost_price
				})),
				sellingPrice: o,
				costPrice: a,
				netGain: c
			};
		});
	}
	function a(t) {
		let n = /* @__PURE__ */ new Date(), r;
		if (t === "yearly") r = `${n.getFullYear()}-01-01`;
		else if (t === "weekly") {
			let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
			r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
		} else r = t === "all" ? "0000-01-01" : `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
		let i = e.db.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = 0, o = 0, s = 0, c = 0, l = {};
		for (let t of i) {
			let n = e.db.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
			a += t.total_purchased;
			let r = t.invoice_data ? JSON.parse(t.invoice_data) : null;
			s += Number(r?.tax) || 0, o += n.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), c += t.amount_due;
			for (let e of n) l[e.product_name] = (l[e.product_name] || 0) + e.quantity;
		}
		let u = a - s - o, d = e.db.prepare("SELECT * FROM expenses WHERE date >= ?").all(r), f = d.reduce((e, t) => e + t.amount, 0), p = "-", m = 0;
		for (let [e, t] of Object.entries(l)) t > m && (m = t, p = e);
		let h = i.map((e) => ({
			label: `Sale #${e.id}`,
			date: e.date,
			amount: e.total_purchased
		})), g = d.map((e) => ({
			label: e.label,
			date: e.date,
			amount: -e.amount
		})), _ = [...h, ...g].sort((e, t) => new Date(t.date) - new Date(e.date)).slice(0, 8);
		return {
			totalEarned: a,
			totalExpenses: f,
			totalDue: c,
			totalProfit: u,
			netPosition: u - f,
			totalSales: i.length,
			profitPerSale: i.length > 0 ? u / i.length : 0,
			topCategory: p,
			recentActivity: _
		};
	}
	function o(t, n = 5) {
		let r = /* @__PURE__ */ new Date(), i;
		if (t === "yearly") i = `${r.getFullYear()}-01-01`;
		else if (t === "weekly") {
			let e = r.getDay(), t = r.getDate() - e + (e === 0 ? -6 : 1);
			i = new Date(r.getFullYear(), r.getMonth(), t).toISOString().slice(0, 10);
		} else i = `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-01`;
		let a = e.db.prepare("SELECT * FROM bills WHERE date >= ?").all(i), o = {};
		for (let t of a) {
			let n = e.db.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
			for (let e of n) o[e.product_name] || (o[e.product_name] = {
				units: 0,
				revenue: 0
			}), o[e.product_name].units += e.quantity, o[e.product_name].revenue += e.price_at_sale * e.quantity;
		}
		return Object.entries(o).map(([e, t]) => ({
			name: e,
			units: t.units,
			revenue: t.revenue
		})).sort((e, t) => t.revenue - e.revenue).slice(0, n);
	}
	function s(t, n = 5) {
		let r = /* @__PURE__ */ new Date(), i;
		if (t === "yearly") i = `${r.getFullYear()}-01-01`;
		else if (t === "weekly") {
			let e = r.getDay(), t = r.getDate() - e + (e === 0 ? -6 : 1);
			i = new Date(r.getFullYear(), r.getMonth(), t).toISOString().slice(0, 10);
		} else i = `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-01`;
		let a = e.db.prepare("SELECT * FROM bills WHERE date >= ?").all(i), o = {};
		for (let t of a) {
			let n = e.db.prepare("SELECT * FROM customers WHERE id = ?").get(t.customer_id);
			n && (o[n.id] || (o[n.id] = {
				name: n.name,
				orders: 0,
				spend: 0
			}), o[n.id].orders += 1, o[n.id].spend += t.total_purchased);
		}
		return Object.values(o).sort((e, t) => t.spend - e.spend).slice(0, n);
	}
	function c(t) {
		Qc(e.db, t.product_name, t.base, t.bucket_size, -t.quantity);
	}
	function l(t, n) {
		return cl(e.db, t, n);
	}
	function u(t, n, r) {
		return ll(e.db, t, n, r);
	}
	function d(t, n) {
		let r = Lc(n);
		if (!e.db.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
		e.db.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?").run(r.date, r.nameOfExpense, r.amountOfExpense, r.typeOfExpense, t);
	}
	function f(t) {
		let n = e.db.prepare("SELECT * FROM expenses WHERE id = ?").get(t);
		if (!n) return null;
		let r = e.db.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
		return {
			id: n.id,
			date: n.date,
			nameOfExpense: n.label,
			typeOfExpense: n.type,
			amountOfExpense: n.amount,
			invoiceData: n.invoice_data ? JSON.parse(n.invoice_data) : null,
			items: r.map((e) => ({
				productName: e.product_name,
				base: e.base,
				bucketSize: e.bucket_size,
				quantity: e.quantity,
				costPrice: e.cost_price
			}))
		};
	}
	return {
		addExpense: t,
		getExpenses: n,
		deleteExpense: r,
		getSales: i,
		getNetPosition: a,
		getTopProducts: o,
		getTopCustomers: s,
		recordImportExpense: l,
		editImportExpense: u,
		editExpense: d,
		getExpenseDetails: f
	};
}
//#endregion
//#region src/Backend/server.js
var _l = d.dirname(l(import.meta.url)), vl = d.join(r.getPath("userData"), "settings.json"), yl = r.getPath("userData"), bl = De(vl), xl = ke({
	config: bl,
	isPackaged: r.isPackaged,
	userDataPath: yl,
	developmentPath: d.join(_l, "../", "Database")
}), Sl = d.join(xl, "inventory.db"), Cl;
function wl() {
	g.mkdirSync(xl, { recursive: !0 }), Cl = new de.default(Sl), Me(Cl);
}
wl();
var Tl = {
	get appConfig() {
		return bl;
	},
	set appConfig(e) {
		bl = e;
	},
	get dataDirectory() {
		return xl;
	},
	set dataDirectory(e) {
		xl = e;
	},
	get dbPath() {
		return Sl;
	},
	set dbPath(e) {
		Sl = e;
	},
	get db() {
		return Cl;
	},
	set db(e) {
		Cl = e;
	},
	app: r,
	appConfigPath: vl,
	userDataPath: yl,
	__dirname: _l,
	openDatabase: wl
}, El = [
	Ne(Tl),
	jc(Tl),
	ml(Tl),
	hl(Tl),
	gl(Tl)
], { getAppSettings: Dl, setDefaultProfilePassword: Ol, createProfile: kl, switchProfile: Al, updateDefaultPaymentMethod: jl, updateInvoiceDefaults: Ml, updateInventoryAddItemMode: Nl, updateAppearanceSettings: Pl, setLocalDataDirectory: Fl } = El[0], { backupDatabase: Il, exportDatabase: Ll, createPortableDatabaseBackup: Rl, restoreDatabase: zl, restorePortableDatabase: Bl } = El[1], { saveInventoryProductChanges: Vl, addProduct: Hl, getProducts: Ul, getNextInvoiceNumber: Wl, isInvoiceNumberAvailable: Gl, deleteProduct: Kl, editProduct: ql, getProductByName: Jl, getVariantBySize: Yl, addVariant: Xl, addBase: Zl, getBaseByName: Ql, addBaseStock: $l, copyImageToDatabase: eu, resolveImagePath: tu, deleteBaseStock: nu, deleteBase: ru, deleteVariant: iu, importProductsFromExcel: au, deleteProducts: ou, deleteInventoryRows: su, findProductsReferencedByBills: cu, updateProducts: lu, updateVariantPrice: uu, updateBaseStock: du } = El[2], { addCustomer: fu, addBillActivity: pu, getBillActivity: mu, addBill: hu, getCustomers: gu, deleteCustomer: _u, addCustomerBill: vu, deleteBill: yu, editCustomer: bu, editBill: xu, editCustomerBill: Su } = El[3], { addExpense: Cu, getExpenses: wu, deleteExpense: Tu, getSales: Eu, getNetPosition: Du, getTopProducts: Ou, getTopCustomers: ku, recordImportExpense: Au, editImportExpense: ju, editExpense: Mu, getExpenseDetails: Nu } = El[4], Pu = d.dirname(l(import.meta.url)), Fu = r.requestSingleInstanceLock();
Fu || r.quit();
function Iu() {
	for (let e of t.getAllWindows()) e.destroy();
	r.relaunch(), r.exit(0);
}
function Lu() {
	let e = new t({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: d.join(Pu, "preload.cjs"),
			spellcheck: !0
		}
	});
	e.webContents.on("before-input-event", (t, n) => {
		let r = n.key === "F12" || n.key.toLowerCase() === "i" && n.shift && (n.control || n.meta);
		n.type === "keyDown" && r && (t.preventDefault(), e.webContents.toggleDevTools());
	}), e.webContents.session.setSpellCheckerLanguages(["en-US"]), e.webContents.on("context-menu", (t, r) => {
		if (!r.misspelledWord) return;
		let i = (r.dictionarySuggestions || []).slice(0, 5), a = i.length ? i.map((t) => ({
			label: t,
			click: () => e.webContents.replaceMisspelling(t)
		})) : [{
			label: "No spelling suggestions",
			enabled: !1
		}];
		a.push({ type: "separator" }, {
			label: `Add “${r.misspelledWord}” to dictionary`,
			click: () => e.webContents.session.addWordToSpellCheckerDictionary(r.misspelledWord)
		}), n.buildFromTemplate(a).popup({ window: e });
	}), process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(d.join(Pu, "../dist/index.html"));
}
s.registerSchemesAsPrivileged([{
	scheme: "app-image",
	privileges: {
		standard: !0,
		secure: !0,
		supportFetchAPI: !0,
		stream: !0
	}
}]), r.whenReady().then(() => {
	Fu && (n.setApplicationMenu(null), s.handle("app-image", (e) => {
		try {
			let t = new URL(e.url).searchParams.get("path");
			if (!t) throw Error("No path provided");
			let n = u(t).href;
			return o.fetch(n);
		} catch (t) {
			return console.error("app-image protocol error:", t.message, e.url), new Response("Not found", { status: 404 });
		}
	}), a.handle("db:addProduct", (e, t) => Hl(t)), a.handle("db:saveInventoryProduct", (e, t) => Vl(t)), a.handle("db:getProducts", () => Ul()), a.handle("db:getNextInvoiceNumber", () => Wl()), a.handle("db:isInvoiceNumberAvailable", (e, t, n) => Gl(t, n)), a.handle("db:deleteProduct", (e, t) => Kl(t)), a.handle("db:deleteProducts", (e, t) => ou(t)), a.handle("db:deleteInventoryRows", (e, t) => su(t)), a.handle("db:findProductsReferencedByBills", (e, t) => cu(t)), a.handle("db:updateProducts", (e, t, n) => lu(t, n)), a.handle("db:updateVariantPrice", (e, t, n, r, i, a) => uu(t, n, r, i, a)), a.handle("db:updateBaseStock", (e, t, n, r, i) => du(t, n, r, i)), a.handle("db:editProduct", (e, t, n) => ql(t, n)), a.handle("db:addExpense", (e, t) => Cu(t)), a.handle("db:getExpenses", () => wu()), a.handle("db:deleteExpense", (e, t) => Tu(t)), a.handle("db:getSales", () => Eu()), a.handle("db:getNetPosition", (e, t) => Du(t)), a.handle("db:getProductByName", (e, t) => Jl(t)), a.handle("db:getVariantBySize", (e, t, n) => Yl(t, n)), a.handle("db:addVariant", (e, t, n) => Xl(t, n)), a.handle("db:addBase", (e, t, n) => Zl(t, n)), a.handle("db:addBaseStock", (e, t, n, r) => $l(t, n, r)), a.handle("db:getBaseByName", (e, t, n) => Ql(t, n)), a.handle("db:addCustomer", (e, t) => fu(t)), a.handle("db:addBill", (e, t, n) => hu(t, n)), a.handle("db:addCustomerBill", (e, t, n) => vu(t, n)), a.handle("db:editCustomerBill", (e, t, n, r, i) => Su(t, n, r, i)), a.handle("db:addBillActivity", (e, t, n) => pu(t, n)), a.handle("db:getBillActivity", (e, t) => mu(t)), a.handle("db:editCustomer", (e, t, n) => bu(t, n)), a.handle("db:getExpenseDetails", (e, t) => Nu(t)), a.handle("db:editExpense", (e, t, n) => Mu(t, n)), a.handle("db:editImportExpense", (e, t, n, r) => ju(t, n, r)), a.handle("db:editBill", (e, t, n) => xu(t, n)), a.handle("db:getCustomers", () => gu()), a.handle("db:deleteCustomer", (e, t) => _u(t)), a.handle("db:deleteBill", (e, t) => yu(t)), a.handle("db:resolveImagePath", (e, t) => tu(t)), a.handle("db:createBackup", async (e) => {
		let n = await i.showSaveDialog(t.fromWebContents(e.sender), {
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
		return n.canceled || !n.filePath ? null : { filePath: await Il(n.filePath) };
	}), a.handle("db:restoreBackup", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
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
		if (n.canceled || n.filePaths.length === 0) return null;
		let r = await zl(n.filePaths[0]);
		return process.nextTick(Iu), r;
	}), a.handle("db:createPortableBackup", async (e) => {
		let n = await i.showSaveDialog(t.fromWebContents(e.sender), {
			title: "Create Portable StockWise Backup",
			defaultPath: `StockWise-Portable-Backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`,
			filters: [{
				name: "StockWise Portable Backup",
				extensions: ["zip"]
			}]
		});
		return n.canceled || !n.filePath ? null : { filePath: await Rl(n.filePath, r.getVersion()) };
	}), a.handle("db:restorePortableBackup", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Restore Portable StockWise Backup",
			properties: ["openFile"],
			filters: [{
				name: "StockWise Portable Backup",
				extensions: ["zip"]
			}]
		});
		if (n.canceled || n.filePaths.length === 0) return null;
		let r = await Bl(n.filePaths[0]);
		return process.nextTick(Iu), r;
	}), a.handle("settings:pickExportDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose StockWise Export Folder",
			properties: ["openDirectory", "createDirectory"]
		});
		return n.canceled || n.filePaths.length === 0 ? null : n.filePaths[0];
	}), a.handle("settings:exportData", (e, t, n) => Ll(t, n, r.getVersion())), a.handle("settings:get", () => Dl()), a.handle("settings:createProfile", (e, t, n) => kl(t, n)), a.handle("settings:setDefaultProfilePassword", (e, t) => Ol(t)), a.handle("settings:switchProfile", (e, n, r, i) => {
		let a = Al(n, r, i);
		return setTimeout(() => {
			let n = t.fromWebContents(e.sender);
			n && !n.isDestroyed() && n.webContents.reload();
		}, 100), a;
	}), a.handle("settings:updateDefaultPaymentMethod", (e, t) => jl(t)), a.handle("settings:updateInvoiceDefaults", (e, t) => Ml(t)), a.handle("settings:updateInventoryAddItemMode", (e, t) => Nl(t)), a.handle("settings:updateAppearance", (e, t, n) => Pl(t, n)), a.handle("settings:openDataDirectory", async () => {
		let e = await c.openPath(Dl().dataDirectory);
		if (e) throw Error(`Could not open the data folder: ${e}`);
	}), a.handle("settings:changeDataDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose an Empty StockWise Data Folder",
			properties: ["openDirectory"]
		});
		if (n.canceled || n.filePaths.length === 0) return null;
		let r = await Fl(n.filePaths[0]);
		return process.nextTick(Iu), r;
	}), a.handle("dialog:pickExcelFile", async () => {
		let e = await i.showOpenDialog({
			properties: ["openFile"],
			filters: [{
				name: "Excel Files",
				extensions: ["xlsx", "xls"]
			}]
		});
		return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
	}), a.handle("db:recordImportExpense", (e, t, n) => Au(t, n)), a.handle("db:importExcel", (e, t) => au(t)), a.handle("db:copyImage", (e, t) => eu(t)), a.handle("db:deleteBaseStock", (e, t, n) => nu(t, n)), a.handle("db:deleteBase", (e, t) => ru(t)), a.handle("db:deleteVariant", (e, t) => iu(t)), a.handle("db:getTopProducts", (e, t) => Ou(t)), a.handle("db:getTopCustomers", (e, t) => ku(t)), a.handle("dialog:pickImage", async () => {
		let e = await i.showOpenDialog({
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
		return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
	}), Lu());
}), r.on("window-all-closed", () => {
	process.platform !== "darwin" && r.quit();
}), r.on("second-instance", () => {
	let [e] = t.getAllWindows();
	e && (e.isMinimized() && e.restore(), e.focus());
}), r.on("activate", () => {
	t.getAllWindows().length === 0 && Lu();
});
//#endregion
export {};
