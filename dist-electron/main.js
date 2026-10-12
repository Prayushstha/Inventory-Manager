import { createRequire as e } from "node:module";
import { BrowserWindow as t, Menu as n, app as r, dialog as i, ipcMain as a, net as o, protocol as s, shell as c } from "electron";
import { fileURLToPath as l, pathToFileURL as u } from "url";
import d, { dirname as f, relative as p, resolve as m } from "path";
import * as h from "fs";
import g, { Stats as _, createReadStream as v, lstat as y, readlinkSync as b } from "fs";
import x from "util";
import { createRequire as S } from "module";
import { randomUUID as C } from "crypto";
import w from "node:fs";
import T from "node:path";
import { randomBytes as E, randomUUID as D, scryptSync as O, timingSafeEqual as k } from "node:crypto";
import { Buffer as A } from "node:buffer";
import { access as j, constants as M } from "node:fs/promises";
import { EventEmitter as N } from "events";
import { DeflateRaw as P } from "zlib";
//#region \0rolldown/runtime.js
var F = Object.create, I = Object.defineProperty, L = Object.getOwnPropertyDescriptor, R = Object.getOwnPropertyNames, z = Object.getPrototypeOf, B = Object.prototype.hasOwnProperty, V = (e, t) => () => (e && (t = e(e = 0)), t), H = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), U = (e, t) => {
	let n = {};
	for (var r in e) I(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || I(n, Symbol.toStringTag, { value: "Module" }), n;
}, ee = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = R(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !B.call(e, s) && s !== n && I(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = L(t, s)) || r.enumerable
	});
	return e;
}, W = (e, t, n) => (n = e == null ? {} : F(z(e)), ee(t || !e || !e.__esModule ? I(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), G = (e) => B.call(e, "module.exports") ? e["module.exports"] : ee(I({}, "__esModule", { value: !0 }), e), K = /* @__PURE__ */ e(import.meta.url), te = /* @__PURE__ */ H(((e) => {
	e.getBooleanOption = (e, t) => {
		let n = !1;
		if (t in e && typeof (n = e[t]) != "boolean") throw TypeError(`Expected the "${t}" option to be a boolean`);
		return n;
	}, e.cppdb = Symbol(), e.inspect = Symbol.for("nodejs.util.inspect.custom");
})), ne = /* @__PURE__ */ H(((e, t) => {
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
})), re = /* @__PURE__ */ H(((e, t) => {
	var n = K("path").sep || "/";
	t.exports = r;
	function r(e) {
		if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://") throw TypeError("must pass in a file:// URI to convert to a file path");
		var t = decodeURI(e.substring(7)), r = t.indexOf("/"), i = t.substring(0, r), a = t.substring(r + 1);
		return i == "localhost" && (i = ""), i &&= n + n + i, a = a.replace(/^(.+)\|/, "$1:"), n == "\\" && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = n + a), i + a;
	}
})), ie = /* @__PURE__ */ H(((e, t) => {
	var n = K("fs"), r = K("path"), i = re(), a = r.join, o = r.dirname, s = n.accessSync && function(e) {
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
		for (var n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : K, i = [], o = 0, s = t.try.length, l, u, d; o < s; o++) {
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
})), ae = /* @__PURE__ */ H(((e) => {
	var { cppdb: t } = te();
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
})), oe = /* @__PURE__ */ H(((e, t) => {
	var { cppdb: n } = te(), r = /* @__PURE__ */ new WeakMap();
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
})), se = /* @__PURE__ */ H(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = te();
	t.exports = function(e, t) {
		if (t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		let i = n(t, "simple"), a = this[r].prepare(`PRAGMA ${e}`, this, !0);
		return i ? a.pluck().get() : a.all();
	};
})), ce = /* @__PURE__ */ H(((e, t) => {
	var n = K("fs"), r = K("path"), { promisify: i } = K("util"), { cppdb: a } = te(), o = i(n.access);
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
})), le = /* @__PURE__ */ H(((e, t) => {
	var { cppdb: n } = te();
	t.exports = function(e) {
		if (e ??= {}, typeof e != "object") throw TypeError("Expected first argument to be an options object");
		let t = "attached" in e ? e.attached : "main";
		if (typeof t != "string") throw TypeError("Expected the \"attached\" option to be a string");
		if (!t) throw TypeError("The \"attached\" option cannot be an empty string");
		return this[n].serialize(t);
	};
})), ue = /* @__PURE__ */ H(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = te();
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
})), de = /* @__PURE__ */ H(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = te();
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
})), q = /* @__PURE__ */ H(((e, t) => {
	var { cppdb: n } = te();
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
})), fe = /* @__PURE__ */ H(((e, t) => {
	var n = function() {};
	t.exports = function(e, t) {
		return Object.assign(new n(), this);
	};
})), J = /* @__PURE__ */ H(((e, t) => {
	var n = K("fs"), r = K("path"), i = te(), a = ne(), o;
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
		if (_ = g == null ? o ||= ie()("better_sqlite3.node") : typeof g == "string" ? (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : K)(r.resolve(g).replace(/(\.node)?$/, ".node")) : g, _.isInitialized || (_.setErrorConstructor(a), _.isInitialized = !0), !d && !u.startsWith("file:") && !n.existsSync(r.dirname(u))) throw TypeError("Cannot open database because the directory does not exist");
		Object.defineProperties(this, {
			[i.cppdb]: { value: new _.Database(u, e, d, f, p, m, h || null, l || null) },
			...c.getters
		});
	}
	var c = ae();
	s.prototype.prepare = c.prepare, s.prototype.transaction = oe(), s.prototype.pragma = se(), s.prototype.backup = ce(), s.prototype.serialize = le(), s.prototype.function = ue(), s.prototype.aggregate = de(), s.prototype.table = q(), s.prototype.loadExtension = c.loadExtension, s.prototype.exec = c.exec, s.prototype.close = c.close, s.prototype.defaultSafeIntegers = c.defaultSafeIntegers, s.prototype.unsafeMode = c.unsafeMode, s.prototype[i.inspect] = fe(), t.exports = s;
})), pe = /* @__PURE__ */ W((/* @__PURE__ */ H(((e, t) => {
	t.exports = J(), t.exports.SqliteError = ne();
})))(), 1);
function Y(e, t) {
	if (!e) throw Error(t);
}
function X(e, t = "") {
	return e == null ? t : String(e).trim();
}
function me(e, t, { min: n = -Infinity, allowZero: r = !0 } = {}) {
	let i = Number(e);
	if (!Number.isFinite(i)) throw Error(`${t} must be a valid number.`);
	if (i < n) throw Error(`${t} must be at least ${n}.`);
	if (!r && i === 0) throw Error(`${t} cannot be zero.`);
	return i;
}
function he(e) {
	if (!e || typeof e != "object") throw Error("Invalid product payload.");
	let t = X(e.name);
	Y(t.length > 0, "Product name is required.");
	let n = Array.isArray(e.variants) ? e.variants : [], r = Array.isArray(e.bases) ? e.bases : [];
	Y(n.length > 0 || r.length > 0, "Product must include at least one variant or base.");
	let i = n.map((e, t) => {
		let n = me(e?.bucket_size ?? e?.bucketSize, `Variant ${t + 1} size`, {
			min: 1e-4,
			allowZero: !1
		});
		return {
			...e,
			bucket_size: n,
			landing: me(e?.landing ?? 0, `Variant ${t + 1} landing`, { min: 0 }),
			sales: me(e?.sales ?? 0, `Variant ${t + 1} sales`, { min: 0 }),
			mp: me(e?.mp ?? 0, `Variant ${t + 1} market price`, { min: 0 })
		};
	}), a = r.map((e, t) => {
		let n = X(e?.name ?? e?.baseName);
		Y(n.length > 0, `Base ${t + 1} name is required.`);
		let r = Array.isArray(e?.stocks) ? e.stocks : [];
		return i.length > 0 && Y(r.length === i.length, `Base "${n}" must contain stock values for every variant.`), {
			...e,
			name: n,
			stocks: r.map((e, t) => me(e, `Base "${n}" stock for variant ${t + 1}`, { min: 0 }))
		};
	});
	return {
		...e,
		id: X(e.id, ""),
		name: t,
		images: e.images ?? "",
		variants: i,
		bases: a
	};
}
function ge(e) {
	if (!e || typeof e != "object") throw Error("Invalid customer payload.");
	let t = X(e.name);
	return Y(t.length > 0, "Customer name is required."), {
		...e,
		name: t,
		phone: X(e.phone, ""),
		address: X(e.address, ""),
		notes: X(e.notes, "")
	};
}
function _e(e, t) {
	if (!t || typeof t != "object") throw Error("Invalid bill payload.");
	let n = Number(e);
	Y(Number.isInteger(n) && n > 0, "A valid customer is required.");
	let r = X(t.date);
	Y(r.length > 0, "Bill date is required.");
	let i = X(t.billType ?? t.bill_type ?? "default").toLowerCase();
	Y([
		"default",
		"pan",
		"vat"
	].includes(i), "Bill type must be Default, PAN, or VAT.");
	let a = me(t.totalPurchased, "Total purchased", { min: 0 }), o = me(t.amountPaid, "Amount paid", { min: 0 }), s = me(t.amountDue, "Amount due", { min: 0 });
	Y(Array.isArray(t.products) && t.products.length > 0, "Bill must contain at least one product.");
	let c = 0, l = t.products.map((e, t) => {
		let n = X(e?.productName ?? e?.product_name), r = X(e?.base), i = me(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = me(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = me(e?.priceAtSale ?? e?.price_at_sale ?? 0, `Item ${t + 1} price`, { min: 0 });
		return Y(n.length > 0, `Item ${t + 1} product name is required.`), c += a * o, {
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
		let e = me(d.discount ?? 0, "Invoice discount", { min: 0 });
		Y(e <= c, "Invoice discount cannot exceed the item subtotal.");
		let n = c - e;
		Y(X(d.vatPercent ?? "13").length > 0, "VAT percentage is required.");
		let r = me(d.vatPercent ?? 13, "VAT percentage", { min: 0 });
		Y(r <= 100, "VAT percentage cannot exceed 100.");
		let i = me(d.tax ?? n * r / 100, "VAT amount", { min: 0 });
		Y(Math.abs(i - n * r / 100) < .01, `VAT must equal ${r}% of the taxable amount.`), u = n + i, d = {
			...d,
			discount: e,
			vatPercent: r,
			tax: i,
			taxableAmount: n
		};
	}
	return Y(Math.abs(u - a) < .01, "Bill total does not match its items and applicable tax/discount."), Y(Math.abs(o + s - a) < .01, "Bill payment values must add up to the total purchased."), {
		date: r,
		paymentMethod: X(t.paymentMethod, ""),
		totalPurchased: a,
		amountPaid: o,
		amountDue: s,
		status: X(t.status, "Open"),
		products: l,
		customerId: n,
		billType: i,
		panNumber: X(t.panNumber ?? t.pan_number ?? ""),
		billNumber: X(t.billNumber ?? t.bill_number ?? ""),
		invoiceData: d
	};
}
function ve(e) {
	if (!e || typeof e != "object") throw Error("Invalid expense payload.");
	let t = X(e.date);
	Y(t.length > 0, "Expense date is required.");
	let n = X(e.nameOfExpense ?? e.label);
	Y(n.length > 0, "Expense label is required.");
	let r = X(e.typeOfExpense ?? e.type ?? "General");
	return Y([
		"General",
		"Import",
		"Taxes"
	].includes(r), "Expense type must be General, Import, or Taxes."), {
		date: t,
		nameOfExpense: n,
		amountOfExpense: me(e.amountOfExpense ?? e.amount ?? 0, "Expense amount", {
			min: 1e-4,
			allowZero: !1
		}),
		typeOfExpense: r
	};
}
function ye(e) {
	if (!Array.isArray(e) || e.length === 0) throw Error("At least one import item is required.");
	return e.map((e, t) => {
		let n = X(e?.productName ?? e?.product_name), r = X(e?.base), i = me(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = me(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = me(e?.costPrice ?? e?.cost_price ?? 0, `Item ${t + 1} cost price`, { min: 0 });
		return Y(n.length > 0, `Item ${t + 1} product name is required.`), {
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
//#region src/Backend/migrations.js
var be = [
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
function xe(e) {
	let t = e.pragma("user_version", { simple: !0 }), n = be.at(-1)?.version ?? 0;
	if (t > n) throw Error(`Database schema version ${t} is newer than supported version ${n}.`);
	for (let n of be) if (!(n.version <= t)) {
		if (n.version !== t + 1) throw Error(`Missing database migration for version ${t + 1}.`);
		e.transaction(() => {
			n.up(e), e.pragma(`user_version = ${n.version}`);
		})(), t = n.version;
	}
	return t;
}
//#endregion
//#region src/Backend/profileAuth.js
var Se = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, Ce = /^[0-9a-f]{32}$/i, we = /^[0-9a-f]{128}$/i;
function Te(e) {
	if (typeof e != "string") throw Error("Username must be text.");
	let t = e.trim();
	if (!t || t.length > 64 || [...t].some((e) => {
		let t = e.codePointAt(0);
		return t < 32 || t === 127;
	})) throw Error("Username must be between 1 and 64 characters.");
	return t;
}
function Ee(e) {
	if (typeof e != "string" || e.length < 8 || e.length > 1024) throw Error("Password must be between 8 and 1024 characters.");
	let t = E(16);
	return {
		passwordSalt: t.toString("hex"),
		passwordHash: O(e, t, 64).toString("hex")
	};
}
function De(e, t) {
	if (typeof t != "string" || t.length > 1024 || !Ce.test(e.passwordSalt ?? "") || !we.test(e.passwordHash ?? "")) return !1;
	let n = A.from(e.passwordSalt, "hex"), r = A.from(e.passwordHash, "hex");
	return k(O(t, n, r.length), r);
}
function Oe(e) {
	if (!e || typeof e != "object" || !Ce.test(e.passwordSalt ?? "") || !we.test(e.passwordHash ?? "")) throw Error("Default profile credentials are invalid.");
	return {
		passwordSalt: e.passwordSalt.toLowerCase(),
		passwordHash: e.passwordHash.toLowerCase()
	};
}
function ke(e) {
	if (!Array.isArray(e)) throw Error("Profiles must be a list.");
	let t = new Set(["user"]), n = /* @__PURE__ */ new Set();
	return e.map((e) => {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Each profile must be an object.");
		let r = e.id;
		if (typeof r != "string" || !Se.test(r) || n.has(r)) throw Error("Each profile must have a unique valid ID.");
		n.add(r);
		let i = Te(e.username), a = i.toLocaleLowerCase();
		if (t.has(a)) throw Error(`The username "${i}" is already in use.`);
		if (t.add(a), !Ce.test(e.passwordSalt ?? "") || !we.test(e.passwordHash ?? "")) throw Error(`Profile "${i}" has invalid password credentials.`);
		let o = e.dataDirectory ?? null;
		if (o !== null && (typeof o != "string" || !T.isAbsolute(o))) throw Error(`Profile "${i}" has an invalid data directory.`);
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
var Ae = "Cash", je = [
	"Cash",
	"UPI",
	"Card",
	"Credit"
], Me = [
	"lara",
	"claude",
	"zen",
	"auto-blog"
], Ne = ["light", "dark"];
function Pe() {
	return {
		shopName: "",
		shopAddress: "",
		shopTelephone: "",
		invoiceNumber: "",
		tpinNumber: "",
		vatPercent: "13"
	};
}
function Fe() {
	return {
		defaultPaymentMethod: Ae,
		dataDirectory: null,
		invoiceDefaults: Pe(),
		inventoryAddItemMode: null,
		appearanceTheme: "lara",
		appearanceMode: "dark",
		profiles: [],
		activeProfileId: "user",
		defaultProfileCredentials: null
	};
}
function Ie(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Application settings must be a JSON object.");
	let t = e.defaultPaymentMethod ?? "Cash";
	if (!je.includes(t)) throw Error("Default payment method must be Cash, UPI, Card, or Credit.");
	let n = e.dataDirectory ?? null;
	if (n !== null && (typeof n != "string" || !T.isAbsolute(n))) throw Error("The configured data directory must be an absolute path.");
	let r = e.invoiceDefaults ?? Pe();
	if (!r || typeof r != "object" || Array.isArray(r)) throw Error("Invoice defaults must be a JSON object.");
	let i = Pe();
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
	if (!Me.includes(s)) throw Error(`Appearance theme must be one of: ${Me.join(", ")}.`);
	let c = e.appearanceMode ?? "dark";
	if (!Ne.includes(c)) throw Error("Appearance mode must be \"light\" or \"dark\".");
	let l = ke(e.profiles ?? []), u = e.defaultProfileCredentials == null ? null : Oe(e.defaultProfileCredentials), d = e.activeProfileId ?? "user";
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
function Le(e) {
	if (!w.existsSync(e)) return Fe();
	let t;
	try {
		t = JSON.parse(w.readFileSync(e, "utf8"));
	} catch (t) {
		throw Error(`Could not read application settings at "${e}".`, { cause: t });
	}
	return Ie(t);
}
function Re(e, t) {
	let n = Ie(t), r = T.dirname(e);
	w.mkdirSync(r, { recursive: !0 });
	let i = T.join(r, `.settings-${D()}.tmp`);
	try {
		w.writeFileSync(i, `${JSON.stringify(n, null, 2)}\n`, {
			encoding: "utf8",
			flag: "wx"
		}), w.renameSync(i, e);
	} catch (t) {
		throw w.rmSync(i, { force: !0 }), Error(`Could not save application settings at "${e}".`, { cause: t });
	}
	return n;
}
function ze({ config: e, isPackaged: t, userDataPath: n, developmentPath: r }) {
	let i = Ie(e);
	return T.resolve(i.dataDirectory || (t ? n : r));
}
async function Be(e, t, n) {
	let r = T.resolve(t), i = T.resolve(n);
	if (r === i) throw Error("Choose a different folder from the current data directory.");
	if (w.mkdirSync(i, { recursive: !0 }), w.readdirSync(i).length > 0) throw Error("Choose an empty folder for the StockWise data copy.");
	let a = w.mkdtempSync(T.join(i, ".stockwise-setup-")), o = T.basename(e.name || "inventory.db"), s = T.join(a, o), c = T.join(a, "images"), l = [];
	try {
		await e.backup(s);
		let t = T.join(r, "images");
		w.existsSync(t) && w.cpSync(t, c, {
			recursive: !0,
			errorOnExist: !0
		});
		let n = T.join(i, o);
		if (w.renameSync(s, n), l.push(n), w.existsSync(c)) {
			let e = T.join(i, "images");
			w.renameSync(c, e), l.push(e);
		}
	} catch (e) {
		for (let e of l) w.rmSync(e, {
			recursive: !0,
			force: !0
		});
		throw Error(`Could not copy StockWise data to "${i}".`, { cause: e });
	} finally {
		w.rmSync(a, {
			recursive: !0,
			force: !0
		});
	}
	return i;
}
//#endregion
//#region src/Backend/inventoryWrites.js
function Ve(e, t) {
	let n = he(t), r = e.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n.name);
	return e.transaction(() => {
		let t = r?.id || n.id || D();
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
//#region src/Backend/businessFlows.js
function He(e, t) {
	let n = he(t), r = n.id || D();
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
function Ue(e, t, n) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT id FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	let r = he(n), i = r.name;
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
function We(e, t) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT 1 FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	e.transaction(() => {
		let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t), r = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t);
		for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
		for (let t of r) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
		e.prepare("DELETE FROM variants WHERE product_id = ?").run(t), e.prepare("DELETE FROM bases WHERE product_id = ?").run(t), e.prepare("DELETE FROM products WHERE id = ?").run(t);
	})();
}
function Ge(e, t, n, r, i) {
	let a = t ? String(t).trim() : "", o = n ? String(n).trim() : "", s = parseFloat(r) || 0, c = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(a);
	if (!c) return;
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c.id, s);
	if (!l) return;
	let u = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c.id, o);
	u && e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(i, u.id, l.id);
}
function Ke(e, t, n) {
	let r = e.prepare("SELECT * FROM products WHERE name = ?").get(t);
	if (!r) return 0;
	let i = e.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(r.id, n);
	return i ? i.landing : 0;
}
function qe(e, t, n) {
	e.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(t, n.type, n.date, n.amount, n.paymentMethod, n.note);
}
function Je(e, t, n) {
	let r = _e(t, n);
	if (!e.prepare("SELECT id FROM customers WHERE id = ?").get(r.customerId)) throw Error("Customer not found.");
	return e.transaction(() => {
		let t = e.prepare("\n      INSERT INTO bills (\n        customer_id, date, payment_method, total_purchased, amount_paid, amount_due,\n        status, bill_type, pan_number, bill_number, invoice_data\n      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ").run(r.customerId, r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status, r.billType, r.panNumber, r.billNumber, r.invoiceData ? JSON.stringify(r.invoiceData) : null).lastInsertRowid;
		qe(e, t, {
			type: "sale",
			date: r.date,
			amount: r.totalPurchased,
			paymentMethod: r.paymentMethod,
			note: "Initial bill entry"
		});
		for (let n of r.products) {
			let r = Ke(e, n.productName, n.bucketSize);
			e.prepare("\n        INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.priceAtSale, r), Ge(e, n.productName, n.base, n.bucketSize, -n.quantity);
		}
		return r.amountPaid > 0 && qe(e, t, {
			type: "payment",
			date: r.date,
			amount: r.amountPaid,
			paymentMethod: r.paymentMethod,
			note: "Payment recorded on bill creation"
		}), t;
	})();
}
function Ye(e, t) {
	let n = t.productName ? String(t.productName).trim() : "", r = t.base ? String(t.base).trim() : "", i = parseFloat(t.bucketSize) || 0, a = parseFloat(t.quantity) || 0, o = parseFloat(t.costPrice) || 0, s = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n), c;
	s ? c = s.id : (c = D(), e.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(c, n, ""));
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c, i), u;
	l ? (u = l.id, e.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(o, u)) : u = e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(c, i, o, 0, 0).lastInsertRowid;
	let d = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c, r)?.id ?? e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(c, r).lastInsertRowid;
	e.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(d, u) ? e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(a, d, u) : e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(d, u, a);
}
function Xe(e, t) {
	Ge(e, t.product_name, t.base, t.bucket_size, -t.quantity);
}
function Ze(e) {
	if (e == null) return null;
	if (typeof e != "object" || Array.isArray(e)) throw Error("Invoice data must be an object.");
	return JSON.stringify(e);
}
function Qe(e, t) {
	return e.prepare("\n    SELECT id, invoice_data FROM expenses\n    WHERE type = 'Import' AND invoice_data IS NOT NULL\n  ").all().filter((e) => e.id !== Number(t)).map((e) => {
		try {
			return JSON.parse(e.invoice_data)?.invoiceNumber;
		} catch (t) {
			throw Error(`Invoice details for import ${e.id} are corrupted.`, { cause: t });
		}
	}).filter((e) => typeof e == "string" && e.trim()).map((e) => e.trim());
}
function $e(e, t, n) {
	let r = String(t ?? "").trim().toLocaleLowerCase();
	return r ? !Qe(e, n).some((e) => e.toLocaleLowerCase() === r) : !1;
}
function et(e, t = "") {
	let n = String(t ?? "").trim(), r = /^(.*?)(\d+)$/.exec(n), i = r?.[1] ?? "", a = r?.[2]?.length ?? 1, o = r ? Number(r[2]) : 0, s = Qe(e).map((e) => {
		let t = /^(.*?)(\d+)$/.exec(e);
		return t && t[1].toLocaleLowerCase() === i.toLocaleLowerCase() ? Number(t[2]) : 0;
	}), c = Math.max(o, ...s) + 1, l = `${i}${String(c).padStart(a, "0")}`;
	for (; !$e(e, l);) c += 1, l = `${i}${String(c).padStart(a, "0")}`;
	return l;
}
function tt(e, t, n) {
	let r = ye(n), i = r.reduce((e, t) => e + t.costPrice * t.quantity, 0), a = ve({
		...t,
		amountOfExpense: i,
		typeOfExpense: "Import"
	});
	return {
		id: e.transaction(() => {
			let n = t.invoiceData?.invoiceNumber;
			if (n && !$e(e, n)) throw Error("This invoice number is already in use. Choose another number.");
			for (let t of r) Ye(e, t);
			let o = e.prepare("INSERT INTO expenses (date, label, amount, type, invoice_data) VALUES (?, ?, ?, ?, ?)").run(a.date, a.nameOfExpense, i, "Import", Ze(t.invoiceData)).lastInsertRowid;
			for (let t of r) e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(o, t.productName, t.base, t.bucketSize, t.quantity, t.costPrice);
			return o;
		})(),
		totalCost: i
	};
}
function nt(e, t, n, r) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	let i = ye(r), a = i.reduce((e, t) => e + t.costPrice * t.quantity, 0), o = ve({
		...n,
		amountOfExpense: a,
		typeOfExpense: "Import"
	}), s = Ze(n.invoiceData), c = n.invoiceData?.invoiceNumber, l = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
	return e.transaction(() => {
		if (c && !$e(e, c, t)) throw Error("This invoice number is already in use. Choose another number.");
		for (let t of l) Xe(e, t);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t);
		for (let n of i) Ye(e, n), e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.costPrice);
		e.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, invoice_data = ? WHERE id = ?").run(o.date, o.nameOfExpense, a, s, t);
	})(), a;
}
//#endregion
//#region src/Backend/inventoryDeletes.js
function rt(e, t, n) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	e.transaction(() => {
		let r = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
		for (let e of r) n(e);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t), e.prepare("DELETE FROM expenses WHERE id = ?").run(t);
	})();
}
function it(e, t) {
	e.transaction(() => {
		e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t), e.prepare("DELETE FROM variants WHERE id = ?").run(t);
	})();
}
//#endregion
//#region src/Backend/databaseBackup.js
var at = {
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
}, ot = {
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
function st(e) {
	let t = e.pragma("integrity_check", { simple: !0 });
	if (t !== "ok") throw Error(`SQLite integrity check failed: ${t}`);
}
function ct(e, t = !1) {
	let n = t ? at : ot, r = new Set(e.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((e) => e.name));
	if (Object.entries(n).filter(([t, n]) => {
		if (!r.has(t)) return !0;
		let i = new Set(e.prepare(`PRAGMA table_info(${t})`).all().map((e) => e.name));
		return n.some((e) => !i.has(e));
	}).length > 0) throw Error("The selected file does not contain a complete StockWise database schema.");
}
async function lt(e, t) {
	if (!e.open) throw Error("The active database is not open.");
	let n = T.resolve(t);
	if (e.name && T.resolve(e.name) === n) throw Error("Choose a different file from the active database.");
	return await e.backup(n), n;
}
async function ut(e, t) {
	let n = T.resolve(e), r = T.resolve(t);
	if (n === r) throw Error("The restore source and staging file must be different.");
	if (w.existsSync(r)) throw Error("The restore staging file already exists.");
	try {
		let e = new pe.default(n, {
			readonly: !0,
			fileMustExist: !0
		});
		try {
			st(e), ct(e), await e.backup(r);
		} finally {
			e.close();
		}
		let t = new pe.default(r);
		try {
			let e = xe(t);
			return st(t), ct(t, !0), { schemaVersion: e };
		} finally {
			t.close();
		}
	} catch (e) {
		throw w.rmSync(r, { force: !0 }), e;
	}
}
function dt(e, t, n) {
	w.renameSync(e, n);
	try {
		w.renameSync(t, e);
	} catch (t) {
		try {
			w.renameSync(n, e);
		} catch (e) {
			throw AggregateError([t, e], "Restore activation failed and the original database could not be put back.", { cause: e });
		}
		throw Error(t.message, { cause: t });
	}
}
//#endregion
//#region src/Backend/dataExport.js
var ft = e(import.meta.url), pt = ft("xlsx"), mt = ft("pdfkit"), { ZipArchive: ht } = ft("archiver"), gt = [
	"products",
	"customers",
	"bills",
	"imports",
	"expenses"
], _t = {
	products: "Products and their variants, bases, and current stock quantities.",
	customers: "Customers and their associated sales records.",
	bills: "Sales bills, line items, and bill activity entries.",
	imports: "Inventory import expenses and the items added by each import.",
	expenses: "All recorded expenses and their associated expense items."
};
function vt(e) {
	if (!e || typeof e != "object") throw Error("Choose at least one data section to export.");
	let t = Object.fromEntries(gt.map((t) => [t, e[t] === !0]));
	if (!Object.values(t).some(Boolean)) throw Error("Choose at least one data section to export.");
	return t;
}
async function yt(e) {
	if (typeof e != "string" || !e.trim()) throw Error("Choose an export destination folder.");
	let t = T.resolve(e), n;
	try {
		n = await w.promises.stat(t), await j(t, M.W_OK);
	} catch (e) {
		throw Error("The export destination does not exist or is not writable.", { cause: e });
	}
	if (!n.isDirectory()) throw Error("The export destination must be a folder.");
	return t;
}
function bt(e, t, n = []) {
	return e.prepare(t).all(...n);
}
function xt(e, t) {
	let n = {};
	t.products && (n.products = bt(e, "SELECT id, name, images FROM products ORDER BY name COLLATE NOCASE"), n.variants = bt(e, "\n      SELECT id, product_id, bucket_size, landing, sales, mp\n      FROM variants ORDER BY product_id, bucket_size\n    "), n.bases = bt(e, "\n      SELECT id, product_id, name FROM bases ORDER BY product_id, name COLLATE NOCASE\n    "), n.stock = bt(e, "\n      SELECT base_id, variant_id, stock FROM base_stock ORDER BY base_id, variant_id\n    "));
	let r = t.customers || t.bills;
	return t.customers && (n.customers = bt(e, "SELECT id, name, phone, address, notes FROM customers ORDER BY name COLLATE NOCASE")), r && (n.bills = bt(e, "\n      SELECT id, customer_id, date, payment_method, total_purchased, amount_paid,\n             amount_due, status, bill_type, pan_number, bill_number, invoice_data\n      FROM bills ORDER BY date, id\n    "), n.billItems = bt(e, "\n      SELECT id, bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price\n      FROM bill_items ORDER BY bill_id, id\n    "), n.billActivity = bt(e, "\n      SELECT id, bill_id, type, date, amount, payment_method, note, created_at\n      FROM bill_activity ORDER BY bill_id, date, id\n    ")), t.imports && (n.imports = bt(e, "\n      SELECT id, date, label, amount, type, invoice_data\n      FROM expenses WHERE type = 'Import' ORDER BY date, id\n    "), n.importItems = bt(e, "\n      SELECT id, expense_id, product_name, base, bucket_size, quantity, cost_price\n      FROM expense_items\n      WHERE expense_id IN (SELECT id FROM expenses WHERE type = 'Import')\n      ORDER BY expense_id, id\n    ")), t.expenses && (n.expenses = bt(e, "\n      SELECT id, date, label, amount, type, invoice_data\n      FROM expenses ORDER BY date, id\n    "), n.expenseItems = bt(e, "\n      SELECT id, expense_id, product_name, base, bucket_size, quantity, cost_price\n      FROM expense_items ORDER BY expense_id, id\n    ")), n;
}
function St(e) {
	return e.length ? e : [{ "No records": "" }];
}
function Ct(e, t, n) {
	let r = pt.utils.json_to_sheet(St(n));
	r["!cols"] = (n.length ? Object.keys(n[0]) : ["No records"]).map((e) => {
		let t = Math.max(e.length, ...n.map((t) => String(t[e] ?? "").length));
		return { wch: Math.min(Math.max(t + 2, 12), 55) };
	}), pt.utils.book_append_sheet(e, r, t);
}
function wt(e) {
	return new Promise((t, n) => {
		let r = new mt({
			margin: 42,
			size: "A4"
		}), i = [];
		r.on("data", (e) => i.push(e)), r.on("end", () => t(A.concat(i))), r.on("error", n);
		try {
			e(r), r.end();
		} catch (e) {
			n(e);
		}
	});
}
function Tt(e) {
	return `NPR ${Number(e || 0).toLocaleString("en-NP", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
async function Et(e, t, n) {
	return wt((r) => {
		r.fontSize(22).text("StockWise Data Export", { align: "center" }), r.moveDown(), r.fontSize(11).text(`Exported: ${t}`), r.text(`App version: ${n || "Unavailable"}`), r.moveDown(), r.fontSize(14).text("Included sections"), r.moveDown(.5);
		for (let t of gt) e[t] && (r.fontSize(11).text(`${t[0].toUpperCase()}${t.slice(1)}`, { continued: !0 }), r.text(` — ${_t[t]}`), r.moveDown(.35));
		r.moveDown(), r.fontSize(10).fillColor("#555").text("This archive contains a spreadsheet export of the selected StockWise records and, when sales are included, printable copies of the exported bills.");
	});
}
async function Dt(e) {
	let t = bt(e, "\n    SELECT b.*, c.name AS customer_name, c.phone AS customer_phone,\n           c.address AS customer_address\n    FROM bills b\n    LEFT JOIN customers c ON c.id = b.customer_id\n    ORDER BY b.date, b.id\n  "), n = bt(e, "\n    SELECT * FROM bill_items ORDER BY bill_id, id\n  "), r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = r.get(e.bill_id) || [];
		t.push(e), r.set(e.bill_id, t);
	}
	return wt((e) => {
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
						Tt(t.price_at_sale),
						Tt(t.quantity * t.price_at_sale)
					], i = e.y;
					d.forEach(([, t], n) => {
						e.text(r[n], f, i, { width: t }), f += t;
					}), e.moveDown(.8);
				}), e.moveDown(), e.font("Helvetica-Bold").text(`Amount: ${Tt(n)}`, { align: "right" }), e.font("Helvetica").text(`Discount: ${Tt(r)}`, { align: "right" }), e.text(`Taxable Amount: ${Tt(a)}`, { align: "right" }), e.text(`VAT: ${s}%`, { align: "right" }), e.text(`Tax: ${Tt(c)}`, { align: "right" }), e.font("Helvetica-Bold").text(`Grand Total: ${Tt(l)}`, { align: "right" }), e.font("Helvetica");
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
					Tt(t.price_at_sale),
					Tt(t.quantity * t.price_at_sale)
				], r = e.y;
				c.forEach(([, t], i) => {
					e.text(n[i], l, r, { width: t }), l += t;
				}), e.moveDown(.8);
			}
			e.moveDown(), e.font("Helvetica-Bold").text(`Total: ${Tt(t.total_purchased)}`, { align: "right" }), e.font("Helvetica").text(`Paid: ${Tt(t.amount_paid)}`, { align: "right" }), e.text(`Due: ${Tt(t.amount_due)}`, { align: "right" }), e.text(`Status: ${t.status}`, { align: "right" }), e.font("Helvetica");
		});
	});
}
async function Ot(e, t) {
	let n = T.join(e, `stockwise-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`), r = `${n}.${Date.now()}.tmp`;
	try {
		let e = w.createWriteStream(r, { flags: "wx" }), i = new ht({ zlib: { level: 9 } }), a = new Promise((t, n) => {
			e.on("close", t), e.on("error", n), i.on("error", n);
		});
		i.pipe(e);
		for (let e of t) i.append(e.content, { name: e.name });
		return await i.finalize(), await a, w.renameSync(r, n), n;
	} catch (e) {
		throw w.rmSync(r, { force: !0 }), Error("Could not finish the StockWise export archive.", { cause: e });
	}
}
async function kt(e, t, n, r) {
	let i = vt(n), a = await yt(t), o = xt(e, i), s = pt.utils.book_new();
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
	]) o[t] && Ct(s, e, o[t]);
	let c = [{
		name: "introduction.pdf",
		content: await Et(i, (/* @__PURE__ */ new Date()).toLocaleString(), r)
	}, {
		name: "data.xlsx",
		content: pt.write(s, {
			type: "buffer",
			bookType: "xlsx"
		})
	}];
	return (i.bills || i.customers) && c.push({
		name: "bills.pdf",
		content: await Dt(e)
	}), Ot(a, c);
}
//#endregion
//#region node_modules/is-stream/index.js
function At(e, { checkOpen: t = !0 } = {}) {
	return typeof e == "object" && !!e && (e.writable || e.readable || !t || e.writable === void 0 && e.readable === void 0) && typeof e.pipe == "function";
}
//#endregion
//#region node_modules/balanced-match/dist/esm/index.js
var jt = (e, t, n) => {
	let r = e instanceof RegExp ? Mt(e, n) : e, i = t instanceof RegExp ? Mt(t, n) : t, a = r !== null && i != null && Nt(r, i, n);
	return a && {
		start: a[0],
		end: a[1],
		pre: n.slice(0, a[0]),
		body: n.slice(a[0] + r.length, a[1]),
		post: n.slice(a[1] + i.length)
	};
}, Mt = (e, t) => {
	let n = t.match(e);
	return n ? n[0] : null;
}, Nt = (e, t, n) => {
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
}, Pt = "\0SLASH" + Math.random() + "\0", Ft = "\0OPEN" + Math.random() + "\0", It = "\0CLOSE" + Math.random() + "\0", Lt = "\0COMMA" + Math.random() + "\0", Rt = "\0PERIOD" + Math.random() + "\0", zt = new RegExp(Pt, "g"), Bt = new RegExp(Ft, "g"), Vt = new RegExp(It, "g"), Ht = new RegExp(Lt, "g"), Ut = new RegExp(Rt, "g"), Wt = /\\\\/g, Gt = /\\{/g, Kt = /\\}/g, qt = /\\,/g, Jt = /\\\./g, Yt = 1e5, Xt = 4e6;
function Zt(e) {
	return isNaN(e) ? e.charCodeAt(0) : parseInt(e, 10);
}
function Qt(e) {
	return e.replace(Wt, Pt).replace(Gt, Ft).replace(Kt, It).replace(qt, Lt).replace(Jt, Rt);
}
function $t(e) {
	return e.replace(zt, "\\").replace(Bt, "{").replace(Vt, "}").replace(Ht, ",").replace(Ut, ".");
}
function en(e) {
	if (!e) return [""];
	let t = [], n = jt("{", "}", e);
	if (!n) return e.split(",");
	let { pre: r, body: i, post: a } = n, o = r.split(",");
	o[o.length - 1] += "{" + i + "}";
	let s = en(a);
	return a.length && (o[o.length - 1] += s.shift(), o.push.apply(o, s)), t.push.apply(t, o), t;
}
function tn(e, t = {}) {
	if (!e) return [];
	let { max: n = Yt, maxLength: r = Xt } = t;
	return e.slice(0, 2) === "{}" && (e = "\\{\\}" + e.slice(2)), ln(Qt(e), n, r, !0).map($t);
}
function nn(e) {
	return "{" + e + "}";
}
function rn(e) {
	return /^-?0\d/.test(e);
}
function an(e, t) {
	return e <= t;
}
function on(e, t) {
	return e >= t;
}
function sn(e, t, n, r, i, a) {
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
function cn(e, t, n, r) {
	let i = e.split(/\.\./), a = [];
	/* c8 ignore start */
	if (i[0] === void 0 || i[1] === void 0) return a;
	/* c8 ignore stop */
	let o = Zt(i[0]), s = Zt(i[1]), c = Math.max(i[0].length, i[1].length), l = i.length === 3 && i[2] !== void 0 ? Math.max(Math.abs(Zt(i[2])), 1) : 1, u = an;
	s < o && (l *= -1, u = on);
	let d = i.some(rn), f = 0;
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
function ln(e, t, n, r) {
	let i = [""], a = !1, o = !0;
	for (;;) {
		let s = jt("{", "}", e);
		if (!s) return sn(i, e, [""], t, n, a);
		let c = s.pre;
		if (/\$$/.test(c)) {
			if (i = sn(i, c + "{" + s.body + "}", [""], t, n, a && !s.post.length), o = !1, !s.post.length) break;
			e = s.post;
			continue;
		}
		let l = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body), u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body), d = l || u, f = s.body.indexOf(",") >= 0;
		if (!d && !f) {
			if (s.post.match(/,(?!,).*\}/)) {
				e = s.pre + "{" + s.body + It + s.post, r = !0;
				continue;
			}
			return sn(i, c + "{" + s.body + "}" + s.post, [""], t, n, a);
		}
		o &&= (a = r && !d, !1);
		let p;
		if (d) p = cn(s.body, u, t, n);
		else {
			let r = en(s.body);
			if (r.length === 1 && r[0] !== void 0 && (r = ln(r[0], t, n, !1).map(nn), r.length === 1)) {
				if (i = sn(i, c + r[0], [""], t, n, a && !s.post.length), !s.post.length) break;
				e = s.post;
				continue;
			}
			let o = a && !s.post.length && !c;
			for (let e = 0; o && e < i.length; e++) i[e] && (o = !1);
			p = [];
			let l = 0;
			outer: for (let e = 0; e < r.length; e++) {
				let i = ln(r[e], t, n, !1);
				for (let e = 0; e < i.length; e++) {
					let r = i[e];
					if (!(o && !r)) {
						if (p.length >= t || l + r.length > n) break outer;
						p.push(r), l += r.length;
					}
				}
			}
		}
		if (i = sn(i, c, p, t, n, a && !s.post.length), !s.post.length) break;
		e = s.post;
	}
	return i;
}
//#endregion
//#region node_modules/minimatch/dist/esm/assert-valid-pattern.js
var un = 1024 * 64, dn = (e) => {
	if (typeof e != "string") throw TypeError("invalid pattern");
	if (e.length > un) throw TypeError("pattern is too long");
}, fn = {
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
}, pn = (e) => e.replace(/[[\]\\-]/g, "\\$&"), mn = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), hn = (e) => e.join(""), gn = (e, t) => {
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
			for (let [t, [o, c, l]] of Object.entries(fn)) if (e.startsWith(t, a)) {
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
			t > d ? r.push(pn(d) + "-" + pn(t)) : t === d && r.push(pn(t)), d = "", a++;
			continue;
		}
		if (e.startsWith("-]", a + 1)) {
			r.push(pn(t + "-")), a += 2;
			continue;
		}
		if (e.startsWith("-", a + 1)) {
			d = t, a += 2;
			continue;
		}
		r.push(pn(t)), a++;
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
		mn(r[0].length === 2 ? r[0].slice(-1) : r[0]),
		!1,
		u - n,
		!1
	];
	let f = "[" + (l ? "^" : "") + hn(r) + "]", p = "[" + (l ? "" : "^") + hn(i) + "]";
	return [
		r.length && i.length ? "(" + f + "|" + p + ")" : r.length ? f : p,
		s,
		u - n,
		!0
	];
}, _n = (e, { windowsPathsNoEscape: t = !1, magicalBraces: n = !0 } = {}) => n ? t ? e.replace(/\[([^/\\])\]/g, "$1") : e.replace(/((?!\\).|^)\[([^/\\])\]/g, "$1$2").replace(/\\([^/])/g, "$1") : t ? e.replace(/\[([^/\\{}])\]/g, "$1") : e.replace(/((?!\\).|^)\[([^/\\{}])\]/g, "$1$2").replace(/\\([^/{}])/g, "$1"), vn, yn = new Set([
	"!",
	"?",
	"+",
	"*",
	"@"
]), bn = (e) => yn.has(e), xn = (e) => bn(e.type), Sn = new Map([
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
]), Cn = new Map([
	["!", ["?"]],
	["@", ["?"]],
	["+", ["?", "*"]]
]), wn = new Map([
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
]), Tn = new Map([
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
]), En = "(?!(?:^|/)\\.\\.?(?:$|/))", Dn = "(?!\\.)", On = new Set(["[", "."]), kn = new Set(["..", "."]), An = /* @__PURE__ */ new Set("().*{}+?[]^$\\!"), jn = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), Mn = "[^/]", Nn = "[^/]*?", Pn = "[^/]+?", Fn = 0, In = class {
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
	id = ++Fn;
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
			if (typeof t != "string" && !(t instanceof vn && t.#i === this)) throw Error("invalid part: " + t);
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
			if (!(n instanceof vn && n.type === "!")) return !1;
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
		let t = new vn(this.type, e);
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
				if (!r.noext && bn(n) && e.charAt(u) === "(" && i <= a) {
					t.push(d), d = "";
					let a = new vn(n, t);
					u = vn.#f(e, a, u, r, i + 1), t.push(a);
					continue;
				}
				d += n;
			}
			return t.push(d), u;
		}
		let u = n + 1, d = new vn(null, t), f = [], p = "";
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
			if (!r.noext && bn(n) && e.charAt(u) === "(" && (i <= a || t && t.#h(n))) {
				let a = t && t.#h(n) ? 0 : 1;
				d.push(p), p = "";
				let o = new vn(n, d);
				d.push(o), u = vn.#f(e, o, u, r, i + a);
				continue;
			}
			if (n === "|") {
				d.push(p), p = "", f.push(d), d = new vn(null, t);
				continue;
			}
			if (n === ")") return p === "" && t.#r.length === 0 && (t.#u = !0), d.push(p), p = "", t.push(...f, d), u;
			p += n;
		}
		return t.type = null, t.#t = void 0, t.#r = [e.substring(n - 1)], u;
	}
	#p(e) {
		return this.#m(e, Cn);
	}
	#m(e, t = Sn) {
		if (!e || typeof e != "object" || e.type !== null || e.#r.length !== 1 || this.type === null) return !1;
		let n = e.#r[0];
		return !n || typeof n != "object" || n.type === null ? !1 : this.#h(n.type, t);
	}
	#h(e, t = wn) {
		return !!t.get(this.type)?.includes(e);
	}
	#g(e, t) {
		let n = e.#r[0], r = new vn(null, n, this.options);
		r.#r.push(""), n.push(r), this.#_(e, t);
	}
	#_(e, t) {
		let n = e.#r[0];
		this.#r.splice(t, 1, ...n.#r);
		for (let e of n.#r) typeof e == "object" && (e.#i = this);
		this.#l = void 0;
	}
	#v(e) {
		return !!Tn.get(this.type)?.has(e);
	}
	#y(e) {
		if (!e || typeof e != "object" || e.type !== null || e.#r.length !== 1 || this.type === null || this.#r.length !== 1) return !1;
		let t = e.#r[0];
		return !t || typeof t != "object" || t.type === null ? !1 : this.#v(t.type);
	}
	#b(e) {
		let t = Tn.get(this.type), n = e.#r[0], r = t?.get(n.type);
		/* c8 ignore start - impossible */
		if (!r) return !1;
		/* c8 ignore stop */
		this.#r = n.#r;
		for (let e of this.#r) typeof e == "object" && (e.#i = this);
		this.type = r, this.#l = void 0, this.#u = !1;
	}
	static fromGlob(e, t = {}) {
		let n = new vn(null, void 0, t);
		return vn.#f(e, n, 0, t, 0), n;
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
		if (this.#e === this && (this.#x(), this.#d()), !xn(this)) {
			let n = this.isStart() && this.isEnd() && !this.#r.some((e) => typeof e != "string"), r = this.#r.map((t) => {
				let [r, i, a, o] = typeof t == "string" ? vn.#C(t, this.#t, n) : t.toRegExpSource(e);
				return this.#t = this.#t || a, this.#n = this.#n || o, r;
			}).join(""), i = "";
			if (this.isStart() && typeof this.#r[0] == "string" && !(this.#r.length === 1 && kn.has(this.#r[0]))) {
				let n = On, a = t && n.has(r.charAt(0)) || r.startsWith("\\.") && n.has(r.charAt(2)) || r.startsWith("\\.\\.") && n.has(r.charAt(4)), o = !t && !e && n.has(r.charAt(0));
				i = a ? En : o ? Dn : "";
			}
			let a = "";
			return this.isEnd() && this.#e.#s && this.#i?.type === "!" && (a = "(?:$|\\/)"), [
				i + r + a,
				_n(r),
				this.#t = !!this.#t,
				this.#n
			];
		}
		let n = this.type === "*" || this.type === "+", r = this.type === "!" ? "(?:(?!(?:" : "(?:", i = this.#S(t);
		if (this.isStart() && this.isEnd() && !i && this.type !== "!") {
			let e = this.toString(), t = this;
			return t.#r = [e], t.type = null, t.#t = void 0, [
				e,
				_n(this.toString()),
				!1,
				!1
			];
		}
		let a = !n || e || t ? "" : this.#S(!0);
		a === i && (a = ""), a && (i = `(?:${i})(?:${a})*?`);
		let o = "";
		if (this.type === "!" && this.#u) o = (this.isStart() && !t ? Dn : "") + Pn;
		else {
			let n = this.type === "!" ? "))" + (this.isStart() && !t && !e ? Dn : "") + "[^/]*?)" : this.type === "@" ? ")" : this.type === "?" ? ")?" : this.type === "+" && a ? ")" : this.type === "*" && a ? ")?" : `)${this.type}`;
			o = r + i + n;
		}
		return [
			o,
			_n(i),
			this.#t = !!this.#t,
			this.#n
		];
	}
	#x() {
		if (xn(this)) {
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
				r = !1, i += (An.has(c) ? "\\" : "") + c;
				continue;
			}
			if (c === "*") {
				if (o) continue;
				o = !0, i += n && /^[*]+$/.test(e) ? Pn : Nn, t = !0;
				continue;
			} else o = !1;
			if (c === "\\") {
				s === e.length - 1 ? i += "\\\\" : r = !0;
				continue;
			}
			if (c === "[") {
				let [n, r, o, c] = gn(e, s);
				if (o) {
					i += n, a ||= r, s += o - 1, t ||= c;
					continue;
				}
			}
			if (c === "?") {
				i += Mn, t = !0;
				continue;
			}
			i += jn(c);
		}
		return [
			i,
			_n(e),
			!!t,
			a
		];
	}
};
vn = In;
//#endregion
//#region node_modules/minimatch/dist/esm/escape.js
var Ln = (e, { windowsPathsNoEscape: t = !1, magicalBraces: n = !1 } = {}) => n ? t ? e.replace(/[?*()[\]{}]/g, "[$&]") : e.replace(/[?*()[\]\\{}]/g, "\\$&") : t ? e.replace(/[?*()[\]]/g, "[$&]") : e.replace(/[?*()[\]\\]/g, "\\$&"), Rn = (e, t, n = {}) => (dn(t), !n.nocomment && t.charAt(0) === "#" ? !1 : new hr(t, n).match(e)), zn = /^\*+([^+@!?*[(]*)$/, Bn = (e) => (t) => !t.startsWith(".") && t.endsWith(e), Vn = (e) => (t) => t.endsWith(e), Hn = (e) => (e = e.toLowerCase(), (t) => !t.startsWith(".") && t.toLowerCase().endsWith(e)), Un = (e) => (e = e.toLowerCase(), (t) => t.toLowerCase().endsWith(e)), Wn = /^\*+\.\*+$/, Gn = (e) => !e.startsWith(".") && e.includes("."), Kn = (e) => e !== "." && e !== ".." && e.includes("."), qn = /^\.\*+$/, Jn = (e) => e !== "." && e !== ".." && e.startsWith("."), Yn = /^\*+$/, Xn = (e) => e.length !== 0 && !e.startsWith("."), Zn = (e) => e.length !== 0 && e !== "." && e !== "..", Qn = /^\?+([^+@!?*[(]*)?$/, $n = ([e, t = ""]) => {
	let n = rr([e]);
	return t ? (t = t.toLowerCase(), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
}, er = ([e, t = ""]) => {
	let n = ir([e]);
	return t ? (t = t.toLowerCase(), (e) => n(e) && e.toLowerCase().endsWith(t)) : n;
}, tr = ([e, t = ""]) => {
	let n = ir([e]);
	return t ? (e) => n(e) && e.endsWith(t) : n;
}, nr = ([e, t = ""]) => {
	let n = rr([e]);
	return t ? (e) => n(e) && e.endsWith(t) : n;
}, rr = ([e]) => {
	let t = e.length;
	return (e) => e.length === t && !e.startsWith(".");
}, ir = ([e]) => {
	let t = e.length;
	return (e) => e.length === t && e !== "." && e !== "..";
}, ar = typeof process == "object" && process ? typeof process.env == "object" && process.env && process.env.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix", or = {
	win32: { sep: "\\" },
	posix: { sep: "/" }
};
Rn.sep = ar === "win32" ? or.win32.sep : or.posix.sep;
var sr = Symbol("globstar **");
Rn.GLOBSTAR = sr;
var cr = "[^/]*?", lr = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?", ur = "(?:(?!(?:\\/|^)\\.).)*?";
Rn.filter = (e, t = {}) => (n) => Rn(n, e, t);
var dr = (e, t = {}) => Object.assign({}, e, t);
Rn.defaults = (e) => {
	if (!e || typeof e != "object" || !Object.keys(e).length) return Rn;
	let t = Rn;
	return Object.assign((n, r, i = {}) => t(n, r, dr(e, i)), {
		Minimatch: class extends t.Minimatch {
			constructor(t, n = {}) {
				super(t, dr(e, n));
			}
			static defaults(n) {
				return t.defaults(dr(e, n)).Minimatch;
			}
		},
		AST: class extends t.AST {
			/* c8 ignore start */
			constructor(t, n, r = {}) {
				super(t, n, dr(e, r));
			}
			/* c8 ignore stop */
			static fromGlob(n, r = {}) {
				return t.AST.fromGlob(n, dr(e, r));
			}
		},
		unescape: (n, r = {}) => t.unescape(n, dr(e, r)),
		escape: (n, r = {}) => t.escape(n, dr(e, r)),
		filter: (n, r = {}) => t.filter(n, dr(e, r)),
		defaults: (n) => t.defaults(dr(e, n)),
		makeRe: (n, r = {}) => t.makeRe(n, dr(e, r)),
		braceExpand: (n, r = {}) => t.braceExpand(n, dr(e, r)),
		match: (n, r, i = {}) => t.match(n, r, dr(e, i)),
		sep: t.sep,
		GLOBSTAR: sr
	});
};
var fr = (e, t = {}) => (dn(e), t.nobrace || !/\{(?:(?!\{).)*\}/.test(e) ? [e] : tn(e, { max: t.braceExpandMax }));
Rn.braceExpand = fr, Rn.makeRe = (e, t = {}) => new hr(e, t).makeRe(), Rn.match = (e, t, n = {}) => {
	let r = new hr(t, n);
	return e = e.filter((e) => r.match(e)), r.options.nonull && !e.length && e.push(t), e;
};
var pr = /[?*]|[+@!]\(.*?\)|\[|\]/, mr = (e) => e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), hr = class {
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
		dn(e), t ||= {}, this.options = t, this.maxGlobstarRecursion = t.maxGlobstarRecursion ?? 200, this.pattern = e, this.platform = t.platform || ar, this.isWindows = this.platform === "win32", this.windowsPathsNoEscape = !!t.windowsPathsNoEscape || t.allowWindowsEscape === !1, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!t.preserveMultipleSlashes, this.regexp = null, this.negate = !1, this.nonegate = !!t.nonegate, this.comment = !1, this.empty = !1, this.partial = !!t.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = t.windowsNoMagicRoot === void 0 ? !!(this.isWindows && this.nocase) : t.windowsNoMagicRoot, this.globSet = [], this.globParts = [], this.set = [], this.make();
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
				let t = e[0] === "" && e[1] === "" && (e[2] === "?" || !pr.test(e[2])) && !pr.test(e[3]), n = /^[a-z]:/i.test(e[0]);
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
		return a >= 2 && (e = this.levelTwoFileOptimize(e)), t.includes(sr) ? this.#e(e, t, n, r, i) : this.#n(e, t, n, r, i);
	}
	#e(e, t, n, r, i) {
		let a = t.indexOf(sr, i), o = t.lastIndexOf(sr), [s, c, l] = n ? [
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
		for (let e of c) e === sr ? (m.push(p), f = [[], 0], d.push(f)) : (f[0].push(e), p++);
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
			if (this.debug(t, n, r), n === !1 || n === sr) return !1;
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
		return fr(this.pattern, this.options);
	}
	parse(e) {
		dn(e);
		let t = this.options;
		if (e === "**") return sr;
		if (e === "") return "";
		let n, r = null;
		(n = e.match(Yn)) ? r = t.dot ? Zn : Xn : (n = e.match(zn)) ? r = (t.nocase ? t.dot ? Un : Hn : t.dot ? Vn : Bn)(n[1]) : (n = e.match(Qn)) ? r = (t.nocase ? t.dot ? er : $n : t.dot ? tr : nr)(n) : (n = e.match(Wn)) ? r = t.dot ? Kn : Gn : (n = e.match(qn)) && (r = Jn);
		let i = In.fromGlob(e, this.options).toMMPattern();
		return r && typeof i == "object" && Reflect.defineProperty(i, "test", { value: r }), i;
	}
	makeRe() {
		if (this.regexp || this.regexp === !1) return this.regexp;
		let e = this.set;
		if (!e.length) return this.regexp = !1, this.regexp;
		let t = this.options, n = t.noglobstar ? cr : t.dot ? lr : ur, r = new Set(t.nocase ? ["i"] : []), i = e.map((e) => {
			let t = e.map((e) => {
				if (e instanceof RegExp) for (let t of e.flags.split("")) r.add(t);
				return typeof e == "string" ? mr(e) : e === sr ? sr : e._src;
			});
			t.forEach((e, r) => {
				let i = t[r + 1], a = t[r - 1];
				e !== sr || a === sr || (a === void 0 ? i !== void 0 && i !== sr ? t[r + 1] = "(?:\\/|" + n + "\\/)?" + i : t[r] = n : i === void 0 ? t[r - 1] = a + "(?:\\/|\\/" + n + ")?" : i !== sr && (t[r - 1] = a + "(?:\\/|\\/" + n + "\\/)" + i, t[r + 1] = sr));
			});
			let i = t.filter((e) => e !== sr);
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
		return Rn.defaults(e).Minimatch;
	}
};
Rn.AST = In, Rn.Minimatch = hr, Rn.escape = Ln, Rn.unescape = _n;
//#endregion
//#region node_modules/readdir-glob/dist/index.mjs
function gr(e, t) {
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
function _r(e, t) {
	return new Promise((n) => {
		(t ? h.stat : h.lstat)(e, (r, i) => {
			if (r) switch (r.code) {
				case "ENOENT":
					n(t ? _r(e, !1) : null);
					break;
				default:
					n(null);
					break;
			}
			else n(i);
		});
	});
}
async function* vr(e, t, n, r, i, a) {
	let o = await gr(t + e, a);
	for (let a of o) {
		let o = a.name, s = e + "/" + o, c = s.slice(1), l = t + "/" + c, u = a;
		(r || n) && (u = await _r(l, n) ?? u), u.isDirectory() ? i(c) || (yield {
			relative: c,
			absolute: l,
			stat: u
		}, yield* vr(s, t, n, r, i, !1)) : yield {
			relative: c,
			absolute: l,
			stat: u
		};
	}
}
async function* yr(e, t, n, r) {
	yield* vr("", e, t, n, r, !0);
}
function br(e) {
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
var xr = class extends N {
	options;
	matchers;
	ignoreMatchers;
	skipMatchers;
	paused;
	aborted;
	inactive;
	iterator;
	constructor(e, t, n) {
		if (super(), typeof t == "function" && (n = t, t = void 0), this.options = br(t || {}), this.matchers = [], this.options.pattern) {
			let e = Array.isArray(this.options.pattern) ? this.options.pattern : [this.options.pattern];
			this.matchers = e.map((e) => new hr(e, {
				dot: this.options.dot,
				noglobstar: this.options.noglobstar,
				matchBase: this.options.matchBase,
				nocase: this.options.nocase
			}));
		}
		if (this.ignoreMatchers = [], this.options.ignore) {
			let e = Array.isArray(this.options.ignore) ? this.options.ignore : [this.options.ignore];
			this.ignoreMatchers = e.map((e) => new hr(e, { dot: !0 }));
		}
		if (this.skipMatchers = [], this.options.skip) {
			let e = Array.isArray(this.options.skip) ? this.options.skip : [this.options.skip];
			this.skipMatchers = e.map((e) => new hr(e, { dot: !0 }));
		}
		if (this.iterator = yr(m(e || "."), this.options.follow, this.options.stat, this._shouldSkipDirectory.bind(this)), this.paused = !1, this.inactive = !1, this.aborted = !1, n) {
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
}, Sr = (e, t, n) => new xr(e, t, n);
Sr.ReaddirGlob = xr;
var Cr = Sr, wr = /* @__PURE__ */ H(((e, t) => {
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
})), Tr = /* @__PURE__ */ H(((e, t) => {
	var n = {}.toString;
	t.exports = Array.isArray || function(e) {
		return n.call(e) == "[object Array]";
	};
})), Er = /* @__PURE__ */ H(((e, t) => {
	t.exports = K("stream");
})), Dr = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), r = n.Buffer;
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
})), Or = /* @__PURE__ */ H(((e) => {
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
	e.isPrimitive = m, e.isBuffer = K("buffer").Buffer.isBuffer;
	function h(e) {
		return Object.prototype.toString.call(e);
	}
})), kr = /* @__PURE__ */ H(((e, t) => {
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
})), Ar = /* @__PURE__ */ H(((e, t) => {
	try {
		var n = K("util");
		/* istanbul ignore next */
		if (typeof n.inherits != "function") throw "";
		t.exports = n.inherits;
	} catch {
		/* istanbul ignore next */
		t.exports = kr();
	}
})), jr = /* @__PURE__ */ H(((e, t) => {
	function n(e, t) {
		if (!(e instanceof t)) throw TypeError("Cannot call a class as a function");
	}
	var r = Dr().Buffer, i = K("util");
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
})), Mr = /* @__PURE__ */ H(((e, t) => {
	var n = wr();
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
})), Nr = /* @__PURE__ */ H(((e, t) => {
	t.exports = K("util").deprecate;
})), Pr = /* @__PURE__ */ H(((e, t) => {
	var n = wr();
	t.exports = _;
	function r(e) {
		var t = this;
		this.next = null, this.entry = null, this.finish = function() {
			P(t, e);
		};
	}
	var i = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : n.nextTick, a;
	_.WritableState = h;
	var o = Object.create(Or());
	o.inherits = Ar();
	var s = { deprecate: Nr() }, c = Er(), l = Dr().Buffer, u = (typeof global < "u" ? global : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {};
	function d(e) {
		return l.from(e);
	}
	function f(e) {
		return l.isBuffer(e) || e instanceof u;
	}
	var p = Mr();
	o.inherits(_, c);
	function m() {}
	function h(e, t) {
		a ||= Fr(), e ||= {};
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
		if (a ||= Fr(), !g.call(_, this) && !(this instanceof a)) return new _(e);
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
})), Fr = /* @__PURE__ */ H(((e, t) => {
	var n = wr(), r = Object.keys || function(e) {
		var t = [];
		for (var n in e) t.push(n);
		return t;
	};
	t.exports = u;
	var i = Object.create(Or());
	i.inherits = Ar();
	var a = Lr(), o = Pr();
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
})), Ir = /* @__PURE__ */ H(((e) => {
	var t = Dr().Buffer, n = t.isEncoding || function(e) {
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
})), Lr = /* @__PURE__ */ H(((e, t) => {
	var n = wr();
	t.exports = b;
	var r = Tr(), i;
	b.ReadableState = y, K("events").EventEmitter;
	var a = function(e, t) {
		return e.listeners(t).length;
	}, o = Er(), s = Dr().Buffer, c = (typeof global < "u" ? global : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {};
	function l(e) {
		return s.from(e);
	}
	function u(e) {
		return s.isBuffer(e) || e instanceof c;
	}
	var d = Object.create(Or());
	d.inherits = Ar();
	var f = K("util"), p = void 0;
	p = f && f.debuglog ? f.debuglog("stream") : function() {};
	var m = jr(), h = Mr(), g;
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
		i ||= Fr(), e ||= {};
		var n = t instanceof i;
		this.objectMode = !!e.objectMode, n && (this.objectMode = this.objectMode || !!e.readableObjectMode);
		var r = e.highWaterMark, a = e.readableHighWaterMark, o = this.objectMode ? 16 : 16 * 1024;
		r || r === 0 ? this.highWaterMark = r : n && (a || a === 0) ? this.highWaterMark = a : this.highWaterMark = o, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new m(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (g ||= Ir().StringDecoder, this.decoder = new g(e.encoding), this.encoding = e.encoding);
	}
	function b(e) {
		if (i ||= Fr(), !(this instanceof b)) return new b(e);
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
		return g ||= Ir().StringDecoder, this._readableState.decoder = new g(e), this._readableState.encoding = e, this;
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
			p("ondata"), f = !1, !1 === e.write(t) && !f && ((i.pipesCount === 1 && i.pipes === e || i.pipesCount > 1 && ee(i.pipes, e) !== -1) && !u && (p("false write response, pause", i.awaitDrain), i.awaitDrain++, f = !0), r.pause());
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
		var o = ee(t.pipes, e);
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
	function ee(e, t) {
		for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
		return -1;
	}
})), Rr = /* @__PURE__ */ H(((e, t) => {
	t.exports = a;
	var n = Fr(), r = Object.create(Or());
	r.inherits = Ar(), r.inherits(a, n);
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
})), zr = /* @__PURE__ */ H(((e, t) => {
	t.exports = i;
	var n = Rr(), r = Object.create(Or());
	r.inherits = Ar(), r.inherits(i, n);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		n.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), Br = /* @__PURE__ */ H(((e, t) => {
	var n = K("stream");
	process.env.READABLE_STREAM === "disable" && n ? (t.exports = n, e = t.exports = n.Readable, e.Readable = n.Readable, e.Writable = n.Writable, e.Duplex = n.Duplex, e.Transform = n.Transform, e.PassThrough = n.PassThrough, e.Stream = n) : (e = t.exports = Lr(), e.Stream = n || e, e.Readable = e, e.Writable = Pr(), e.Duplex = Fr(), e.Transform = Rr(), e.PassThrough = zr());
})), Vr = /* @__PURE__ */ H(((e, t) => {
	t.exports = Br().PassThrough;
})), Hr = (/* @__PURE__ */ H(((e, t) => {
	var n = K("util"), r = Vr();
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
function Ur(e) {
	return function(...t) {
		var n = t.pop();
		return e.call(this, t, n);
	};
}
/* istanbul ignore file */
var Wr = typeof queueMicrotask == "function" && queueMicrotask, Gr = typeof setImmediate == "function" && setImmediate, Kr = typeof process == "object" && typeof process.nextTick == "function";
function qr(e) {
	setTimeout(e, 0);
}
function Jr(e) {
	return (t, ...n) => e(() => t(...n));
}
var Yr = Jr(Wr ? queueMicrotask : Gr ? setImmediate : Kr ? process.nextTick : qr);
function Xr(e) {
	return $r(e) ? function(...t) {
		let n = t.pop();
		return Zr(e.apply(this, t), n);
	} : Ur(function(t, n) {
		var r;
		try {
			r = e.apply(this, t);
		} catch (e) {
			return n(e);
		}
		if (r && typeof r.then == "function") return Zr(r, n);
		n(null, r);
	});
}
function Zr(e, t) {
	return e.then((e) => {
		Qr(t, null, e);
	}, (e) => {
		Qr(t, e && (e instanceof Error || e.message) ? e : Error(e));
	});
}
function Qr(e, t, n) {
	try {
		e(t, n);
	} catch (e) {
		Yr((e) => {
			throw e;
		}, e);
	}
}
function $r(e) {
	return e[Symbol.toStringTag] === "AsyncFunction";
}
function ei(e) {
	return e[Symbol.toStringTag] === "AsyncGenerator";
}
function ti(e) {
	return typeof e[Symbol.asyncIterator] == "function";
}
function ni(e) {
	if (typeof e != "function") throw Error("expected a function");
	return $r(e) ? Xr(e) : e;
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
function ri(e, t, n, r) {
	t ||= [];
	var i = [], a = 0, o = ni(n);
	return e(t, (e, t, n) => {
		var r = a++;
		o(e, (e, t) => {
			i[r] = t, n(e);
		});
	}, (e) => {
		r(e, i);
	});
}
function ii(e) {
	return e && typeof e.length == "number" && e.length >= 0 && e.length % 1 == 0;
}
var ai = {};
function oi(e) {
	function t(...t) {
		if (e !== null) {
			var n = e;
			e = null, n.apply(this, t);
		}
	}
	return Object.assign(t, e), t;
}
function si(e) {
	return e[Symbol.iterator] && e[Symbol.iterator]();
}
function ci(e) {
	var t = -1, n = e.length;
	return function() {
		return ++t < n ? {
			value: e[t],
			key: t
		} : null;
	};
}
function li(e) {
	var t = -1;
	return function() {
		var n = e.next();
		return n.done ? null : (t++, {
			value: n.value,
			key: t
		});
	};
}
function ui(e) {
	var t = e ? Object.keys(e) : [], n = -1, r = t.length;
	return function i() {
		var a = t[++n];
		return a === "__proto__" ? i() : n < r ? {
			value: e[a],
			key: a
		} : null;
	};
}
function di(e) {
	if (ii(e)) return ci(e);
	var t = si(e);
	return t ? li(t) : ui(e);
}
function fi(e) {
	return function(...t) {
		if (e === null) throw Error("Callback was already called.");
		var n = e;
		e = null, n.apply(this, t);
	};
}
function pi(e, t, n, r) {
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
			if (t === ai || i && s <= 0) return i = !0, r(null);
			l();
		}
	}
	function d(e) {
		a || (o = !1, i = !0, r(e));
	}
	l();
}
var mi = (e) => (t, n, r) => {
	if (r = oi(r), e <= 0) throw RangeError("concurrency limit cannot be less than 1");
	if (!t) return r(null);
	if (ei(t)) return pi(t, e, n, r);
	if (ti(t)) return pi(t[Symbol.asyncIterator](), e, n, r);
	var i = di(t), a = !1, o = !1, s = 0, c = !1;
	function l(e, t) {
		if (!o) if (--s, e) a = !0, r(e);
		else if (e === !1) a = !0, o = !0;
		else if (t === ai || a && s <= 0) return a = !0, r(null);
		else c || u();
	}
	function u() {
		for (c = !0; s < e && !a;) {
			var t = i();
			if (t === null) {
				a = !0, s <= 0 && r(null);
				return;
			}
			s += 1, n(t.value, t.key, fi(l));
		}
		c = !1;
	}
	u();
};
function hi(e, t, n, r) {
	return mi(t)(e, ni(n), r);
}
var gi = Z(hi, 4);
function _i(e, t, n) {
	n = oi(n);
	var r = 0, i = 0, { length: a } = e, o = !1;
	a === 0 && n(null);
	function s(e, t) {
		e === !1 && (o = !0), o !== !0 && (e ? n(e) : (++i === a || t === ai) && n(null));
	}
	for (; r < a; r++) t(e[r], r, fi(s));
}
function vi(e, t, n) {
	return gi(e, Infinity, t, n);
}
function yi(e, t, n) {
	return (ii(e) ? _i : vi)(e, ni(t), n);
}
var bi = Z(yi, 3);
function xi(e, t, n) {
	return ri(bi, e, t, n);
}
var Si = Z(xi, 3);
function Ci(e, t, n) {
	return gi(e, 1, t, n);
}
var wi = Z(Ci, 3);
function Ti(e, t, n) {
	return ri(wi, e, t, n);
}
Z(Ti, 3);
var Ei = class {
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
		this.head ? this.insertBefore(this.head, e) : Di(this, e);
	}
	push(e) {
		this.tail ? this.insertAfter(this.tail, e) : Di(this, e);
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
function Di(e, t) {
	e.length = 1, e.head = e.tail = t;
}
function Oi(e, t, n) {
	if (t == null) t = 1;
	else if (t === 0) throw RangeError("Concurrency must not be zero");
	var r = ni(e), i = 0, a = [];
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
		if (t ? _._tasks.unshift(s) : _._tasks.push(s), d || (d = !0, Yr(() => {
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
		return e.length === 0 && _.idle() ? (Yr(() => u("drain")), !0) : !1;
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
		_tasks: new Ei(),
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
					i += 1, _._tasks.length === 0 && u("empty"), i === _.concurrency && u("saturated"), r(t, fi(p(e)));
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
			_.paused !== !1 && (_.paused = !1, Yr(_.process));
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
function ki(e, t, n, r) {
	r = oi(r);
	var i = ni(n);
	return wi(e, (e, n, r) => {
		i(t, e, (e, n) => {
			t = n, r(e);
		});
	}, (e) => r(e, t));
}
Z(ki, 4);
function Ai(e, t, n, r) {
	return ri(mi(t), e, n, r);
}
var ji = Z(Ai, 4);
function Mi(e, t, n, r) {
	var i = ni(n);
	return ji(e, t, (e, t) => {
		i(e, (e, ...n) => e ? t(e) : t(e, n));
	}, (e, t) => {
		for (var n = [], i = 0; i < t.length; i++) t[i] && (n = n.concat(...t[i]));
		return r(e, n);
	});
}
var Ni = Z(Mi, 4);
function Pi(e, t, n) {
	return Ni(e, Infinity, t, n);
}
Z(Pi, 3);
function Fi(e, t, n) {
	return Ni(e, 1, t, n);
}
Z(Fi, 3);
function Ii(e, t) {
	return (n, r, i, a) => {
		var o = !1, s;
		let c = ni(i);
		n(r, (n, r, i) => {
			c(n, (r, a) => {
				if (r || r === !1) return i(r);
				if (e(a) && !s) return o = !0, s = t(!0, n), i(null, ai);
				i();
			});
		}, (e) => {
			if (e) return a(e);
			a(null, o ? s : t(!1));
		});
	};
}
function Li(e, t, n) {
	return Ii((e) => e, (e, t) => t)(bi, e, t, n);
}
Z(Li, 3);
function Ri(e, t, n, r) {
	return Ii((e) => e, (e, t) => t)(mi(t), e, n, r);
}
Z(Ri, 4);
function zi(e, t, n) {
	return Ii((e) => e, (e, t) => t)(mi(1), e, t, n);
}
Z(zi, 3);
function Bi(e, t, n) {
	n = fi(n);
	var r = ni(e), i = ni(t), a;
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
Z(Bi, 3);
function Vi(e) {
	return (t, n, r) => e(t, r);
}
function Hi(e, t, n) {
	return bi(e, Vi(ni(t)), n);
}
Z(Hi, 3);
function Ui(e, t, n, r) {
	return mi(t)(e, Vi(ni(n)), r);
}
var Wi = Z(Ui, 4);
function Gi(e, t, n) {
	return Wi(e, 1, t, n);
}
var Ki = Z(Gi, 3);
function qi(e) {
	return $r(e) ? e : function(...t) {
		var n = t.pop(), r = !0;
		t.push((...e) => {
			r ? Yr(() => n(...e)) : n(...e);
		}), e.apply(this, t), r = !1;
	};
}
function Ji(e, t, n) {
	return Ii((e) => !e, (e) => !e)(bi, e, t, n);
}
Z(Ji, 3);
function Yi(e, t, n, r) {
	return Ii((e) => !e, (e) => !e)(mi(t), e, n, r);
}
Z(Yi, 4);
function Xi(e, t, n) {
	return Ii((e) => !e, (e) => !e)(wi, e, t, n);
}
Z(Xi, 3);
function Zi(e, t, n, r) {
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
function Qi(e, t, n, r) {
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
function $i(e, t, n, r) {
	return (ii(t) ? Zi : Qi)(e, t, ni(n), r);
}
function ea(e, t, n) {
	return $i(bi, e, t, n);
}
Z(ea, 3);
function ta(e, t, n, r) {
	return $i(mi(t), e, n, r);
}
Z(ta, 4);
function na(e, t, n) {
	return $i(wi, e, t, n);
}
Z(na, 3);
function ra(e, t) {
	var n = fi(t), r = ni(qi(e));
	function i(e) {
		if (e) return n(e);
		e !== !1 && r(i);
	}
	return i();
}
Z(ra, 2);
function ia(e, t, n, r) {
	var i = ni(n);
	return ji(e, t, (e, t) => {
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
Z(ia, 4);
function aa(e, t, n, r) {
	r = oi(r);
	var i = {}, a = ni(n);
	return mi(t)(e, (e, t, n) => {
		a(e, t, (e, r) => {
			if (e) return n(e);
			i[t] = r, n(e);
		});
	}, (e) => r(e, i));
}
Z(aa, 4), Kr ? process.nextTick : Gr && setImmediate, Z((e, t, n) => {
	var r = ii(t) ? [] : {};
	e(t, (e, t, n) => {
		ni(e)((e, ...i) => {
			i.length < 2 && ([i] = i), r[t] = i, n(e);
		});
	}, (e) => n(e, r));
}, 3);
function oa(e, t) {
	var n = ni(e);
	return Oi((e, t) => {
		n(e[0], t);
	}, t, 1);
}
function sa(e, t) {
	if (t = oi(t), !Array.isArray(e)) return t(/* @__PURE__ */ TypeError("First argument to race must be an array of functions"));
	if (!e.length) return t();
	for (var n = 0, r = e.length; n < r; n++) ni(e[n])(t);
}
Z(sa, 2);
function ca(e, t, n, r) {
	let i = ni(n);
	return $i(e, t, (e, t) => {
		i(e, (e, n) => {
			t(e, !n);
		});
	}, r);
}
function la(e, t, n) {
	return ca(bi, e, t, n);
}
Z(la, 3);
function ua(e, t, n, r) {
	return ca(mi(t), e, n, r);
}
Z(ua, 4);
function da(e, t, n) {
	return ca(wi, e, t, n);
}
Z(da, 3);
function fa(e, t, n) {
	return Ii(Boolean, (e) => e)(bi, e, t, n);
}
Z(fa, 3);
function pa(e, t, n, r) {
	return Ii(Boolean, (e) => e)(mi(t), e, n, r);
}
Z(pa, 4);
function ma(e, t, n) {
	return Ii(Boolean, (e) => e)(wi, e, t, n);
}
Z(ma, 3);
function ha(e, t, n) {
	var r = ni(t);
	return Si(e, (e, t) => {
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
Z(ha, 3);
function ga(e, t) {
	var n = null, r;
	return Ki(e, (e, t) => {
		ni(e)((e, ...i) => {
			if (e === !1) return t(e);
			i.length < 2 ? [r] = i : r = i, n = e, t(e ? null : {});
		});
	}, () => t(n, r));
}
Z(ga);
function _a(e, t, n) {
	n = fi(n);
	var r = ni(t), i = ni(e), a = [];
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
Z(_a, 3);
function va(e, t) {
	if (t = oi(t), !Array.isArray(e)) return t(/* @__PURE__ */ Error("First argument to waterfall must be an array of functions"));
	if (!e.length) return t();
	var n = 0;
	function r(t) {
		ni(e[n++])(...t, fi(i));
	}
	function i(i, ...a) {
		if (i !== !1) {
			if (i || n === e.length) return t(i, ...a);
			r(a);
		}
	}
	r([]);
}
Z(va);
//#endregion
//#region node_modules/archiver/lib/error.js
var ya = {
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
function ba(e, t) {
	Error.captureStackTrace(this, this.constructor), this.message = ya[e] || e, this.code = e, this.data = t;
}
x.inherits(ba, Error);
//#endregion
//#region node_modules/archiver/node_modules/readable-stream/lib/ours/primordials.js
var xa = /* @__PURE__ */ H(((e, t) => {
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
})), Sa = /* @__PURE__ */ H(((e, t) => {
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
})), Ca = /* @__PURE__ */ H(((e, t) => {
	var { format: n, inspect: r } = Sa(), { AggregateError: i } = xa(), a = globalThis.AggregateError || i, o = Symbol("kIsNodeError"), s = [
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
function wa(e) {
	let t = Ha.get(e);
	return console.assert(t != null, "'this' is expected an Event object, but got", e), t;
}
function Ta(e) {
	if (e.passiveListener != null) {
		typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", e.passiveListener);
		return;
	}
	e.event.cancelable && (e.canceled = !0, typeof e.event.preventDefault == "function" && e.event.preventDefault());
}
function Ea(e, t) {
	Ha.set(this, {
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
		t in this || Object.defineProperty(this, t, Da(t));
	}
}
function Da(e) {
	return {
		get() {
			return wa(this).event[e];
		},
		set(t) {
			wa(this).event[e] = t;
		},
		configurable: !0,
		enumerable: !0
	};
}
function Oa(e) {
	return {
		value() {
			let t = wa(this).event;
			return t[e].apply(t, arguments);
		},
		configurable: !0,
		enumerable: !0
	};
}
function ka(e, t) {
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
			Object.defineProperty(r.prototype, a, e ? Oa(a) : Da(a));
		}
	}
	return r;
}
function Aa(e) {
	if (e == null || e === Object.prototype) return Ea;
	let t = Ua.get(e);
	return t ?? (t = ka(Aa(Object.getPrototypeOf(e)), e), Ua.set(e, t)), t;
}
function ja(e, t) {
	return new (Aa(Object.getPrototypeOf(t)))(e, t);
}
function Ma(e) {
	return wa(e).immediateStopped;
}
function Na(e, t) {
	wa(e).eventPhase = t;
}
function Pa(e, t) {
	wa(e).currentTarget = t;
}
function Fa(e, t) {
	wa(e).passiveListener = t;
}
function Ia(e) {
	return typeof e == "object" && !!e;
}
function La(e) {
	let t = Wa.get(e);
	if (t == null) throw TypeError("'this' is expected an EventTarget object, but got another value.");
	return t;
}
function Ra(e) {
	return {
		get() {
			let t = La(this).get(e);
			for (; t != null;) {
				if (t.listenerType === qa) return t.listener;
				t = t.next;
			}
			return null;
		},
		set(t) {
			typeof t != "function" && !Ia(t) && (t = null);
			let n = La(this), r = null, i = n.get(e);
			for (; i != null;) i.listenerType === qa ? r === null ? i.next === null ? n.delete(e) : n.set(e, i.next) : r.next = i.next : r = i, i = i.next;
			if (t !== null) {
				let i = {
					listener: t,
					listenerType: qa,
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
function za(e, t) {
	Object.defineProperty(e, `on${t}`, Ra(t));
}
function Ba(e) {
	function t() {
		Va.call(this);
	}
	t.prototype = Object.create(Va.prototype, { constructor: {
		value: t,
		configurable: !0,
		writable: !0
	} });
	for (let n = 0; n < e.length; ++n) za(t.prototype, e[n]);
	return t;
}
function Va() {
	if (this instanceof Va) {
		Wa.set(this, /* @__PURE__ */ new Map());
		return;
	}
	if (arguments.length === 1 && Array.isArray(arguments[0])) return Ba(arguments[0]);
	if (arguments.length > 0) {
		let e = Array(arguments.length);
		for (let t = 0; t < arguments.length; ++t) e[t] = arguments[t];
		return Ba(e);
	}
	throw TypeError("Cannot call a class as a function");
}
var Ha, Ua, Wa, Ga, Ka, qa, Ja = V((() => {
	Ha = /* @__PURE__ */ new WeakMap(), Ua = /* @__PURE__ */ new WeakMap(), Ea.prototype = {
		get type() {
			return wa(this).event.type;
		},
		get target() {
			return wa(this).eventTarget;
		},
		get currentTarget() {
			return wa(this).currentTarget;
		},
		composedPath() {
			let e = wa(this).currentTarget;
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
			return wa(this).eventPhase;
		},
		stopPropagation() {
			let e = wa(this);
			e.stopped = !0, typeof e.event.stopPropagation == "function" && e.event.stopPropagation();
		},
		stopImmediatePropagation() {
			let e = wa(this);
			e.stopped = !0, e.immediateStopped = !0, typeof e.event.stopImmediatePropagation == "function" && e.event.stopImmediatePropagation();
		},
		get bubbles() {
			return !!wa(this).event.bubbles;
		},
		get cancelable() {
			return !!wa(this).event.cancelable;
		},
		preventDefault() {
			Ta(wa(this));
		},
		get defaultPrevented() {
			return wa(this).canceled;
		},
		get composed() {
			return !!wa(this).event.composed;
		},
		get timeStamp() {
			return wa(this).timeStamp;
		},
		get srcElement() {
			return wa(this).eventTarget;
		},
		get cancelBubble() {
			return wa(this).stopped;
		},
		set cancelBubble(e) {
			if (!e) return;
			let t = wa(this);
			t.stopped = !0, typeof t.event.cancelBubble == "boolean" && (t.event.cancelBubble = !0);
		},
		get returnValue() {
			return !wa(this).canceled;
		},
		set returnValue(e) {
			e || Ta(wa(this));
		},
		initEvent() {}
	}, Object.defineProperty(Ea.prototype, "constructor", {
		value: Ea,
		configurable: !0,
		writable: !0
	}), typeof window < "u" && window.Event !== void 0 && (Object.setPrototypeOf(Ea.prototype, window.Event.prototype), Ua.set(window.Event.prototype, Ea)), Wa = /* @__PURE__ */ new WeakMap(), Ga = 1, Ka = 2, qa = 3, Va.prototype = {
		addEventListener(e, t, n) {
			if (t == null) return;
			if (typeof t != "function" && !Ia(t)) throw TypeError("'listener' should be a function or an object.");
			let r = La(this), i = Ia(n), a = (i ? n.capture : n) ? Ga : Ka, o = {
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
			let r = La(this), i = (Ia(n) ? n.capture : n) ? Ga : Ka, a = null, o = r.get(e);
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
			let t = La(this), n = e.type, r = t.get(n);
			if (r == null) return !0;
			let i = ja(this, e), a = null;
			for (; r != null;) {
				if (r.once ? a === null ? r.next === null ? t.delete(n) : t.set(n, r.next) : a.next = r.next : a = r, Fa(i, r.passive ? r.listener : null), typeof r.listener == "function") try {
					r.listener.call(this, i);
				} catch (e) {
					typeof console < "u" && typeof console.error == "function" && console.error(e);
				}
				else r.listenerType !== qa && typeof r.listener.handleEvent == "function" && r.listener.handleEvent(i);
				if (Ma(i)) break;
				r = r.next;
			}
			return Fa(i, null), Na(i, 0), Pa(i, null), !i.defaultPrevented;
		}
	}, Object.defineProperty(Va.prototype, "constructor", {
		value: Va,
		configurable: !0,
		writable: !0
	}), typeof window < "u" && window.EventTarget !== void 0 && Object.setPrototypeOf(Va.prototype, window.EventTarget.prototype);
})), Ya = /* @__PURE__ */ U({
	AbortController: () => to,
	AbortSignal: () => $a,
	default: () => to
});
function Xa() {
	let e = Object.create($a.prototype);
	return Va.call(e), eo.set(e, !1), e;
}
function Za(e) {
	eo.get(e) === !1 && (eo.set(e, !0), e.dispatchEvent({ type: "abort" }));
}
function Qa(e) {
	let t = no.get(e);
	if (t == null) throw TypeError(`Expected 'this' to be an 'AbortController' object, but got ${e === null ? "null" : typeof e}`);
	return t;
}
var $a, eo, to, no, ro = V((() => {
	Ja(), $a = class extends Va {
		constructor() {
			throw super(), TypeError("AbortSignal cannot be constructed directly");
		}
		get aborted() {
			let e = eo.get(this);
			if (typeof e != "boolean") throw TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
			return e;
		}
	}, za($a.prototype, "abort"), eo = /* @__PURE__ */ new WeakMap(), Object.defineProperties($a.prototype, { aborted: { enumerable: !0 } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty($a.prototype, Symbol.toStringTag, {
		configurable: !0,
		value: "AbortSignal"
	}), to = class {
		constructor() {
			no.set(this, Xa());
		}
		get signal() {
			return Qa(this);
		}
		abort() {
			Za(Qa(this));
		}
	}, no = /* @__PURE__ */ new WeakMap(), Object.defineProperties(to.prototype, {
		signal: { enumerable: !0 },
		abort: { enumerable: !0 }
	}), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(to.prototype, Symbol.toStringTag, {
		configurable: !0,
		value: "AbortController"
	});
})), io = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), { format: r, inspect: i } = Sa(), { codes: { ERR_INVALID_ARG_TYPE: a } } = Ca(), { kResistStopPropagation: o, AggregateError: s, SymbolDispose: c } = xa(), l = globalThis.AbortSignal || (ro(), G(Ya)).AbortSignal, u = globalThis.AbortController || (ro(), G(Ya)).AbortController, d = Object.getPrototypeOf(async function() {}).constructor, f = globalThis.Blob || n.Blob, p = f === void 0 ? function(e) {
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
		addAbortListener: K("events").addAbortListener || function(e, t) {
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
})), ao = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i, ArrayPrototypeMap: a, NumberIsInteger: o, NumberIsNaN: s, NumberMAX_SAFE_INTEGER: c, NumberMIN_SAFE_INTEGER: l, NumberParseInt: u, ObjectPrototypeHasOwnProperty: d, RegExpPrototypeExec: f, String: p, StringPrototypeToUpperCase: m, StringPrototypeTrim: h } = xa(), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: _, ERR_INVALID_ARG_TYPE: v, ERR_INVALID_ARG_VALUE: y, ERR_OUT_OF_RANGE: b, ERR_UNKNOWN_SIGNAL: x } } = Ca(), { normalizeEncoding: S } = io(), { isAsyncFunction: C, isArrayBufferView: w } = io().types, T = {};
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
	function ee(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = `${t}[${n}]`;
			if (r == null) throw new v(i, "AbortSignal", r);
			ne(r, i);
		}
	}
	function W(e, t = "signal") {
		if (P(e, t), T[e] === void 0) throw T[m(e)] === void 0 ? new x(e) : new x(e + " (signals must use all capital letters)");
	}
	var G = g((e, t = "buffer") => {
		if (!w(e)) throw new v(t, [
			"Buffer",
			"TypedArray",
			"DataView"
		], e);
	});
	function K(e, t) {
		let n = S(t), r = e.length;
		if (n === "hex" && r % 2 != 0) throw new y("encoding", t, `is invalid for data of length ${r}`);
	}
	function te(e, t = "Port", n = !0) {
		if (typeof e != "number" && typeof e != "string" || typeof e == "string" && h(e).length === 0 || +e != e >>> 0 || e > 65535 || e === 0 && !n) throw new _(t, e, n);
		return e | 0;
	}
	var ne = g((e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new v(t, "AbortSignal", e);
	}), re = g((e, t) => {
		if (typeof e != "function") throw new v(t, "Function", e);
	}), ie = g((e, t) => {
		if (typeof e != "function" || C(e)) throw new v(t, "Function", e);
	}), ae = g((e, t) => {
		if (e !== void 0) throw new v(t, "undefined", e);
	});
	function oe(e, t, n) {
		if (!r(n, e)) throw new v(t, `('${i(n, "|")}')`, e);
	}
	var se = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
	function ce(e, t) {
		if (e === void 0 || !f(se, e)) throw new y(t, e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	function le(e) {
		if (typeof e == "string") return ce(e, "hints"), e;
		if (n(e)) {
			let t = e.length, n = "";
			if (t === 0) return n;
			for (let r = 0; r < t; r++) {
				let i = e[r];
				ce(i, "hints"), n += i, r !== t - 1 && (n += ", ");
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
		validateAbortSignalArray: ee,
		validateBoolean: L,
		validateBuffer: G,
		validateDictionary: B,
		validateEncoding: K,
		validateFunction: re,
		validateInt32: M,
		validateInteger: j,
		validateNumber: F,
		validateObject: z,
		validateOneOf: I,
		validatePlainFunction: ie,
		validatePort: te,
		validateSignalName: W,
		validateString: P,
		validateUint32: N,
		validateUndefined: ae,
		validateUnion: oe,
		validateAbortSignal: ne,
		validateLinkHeaderValue: le
	};
})), oo = /* @__PURE__ */ H(((e, t) => {
	t.exports = global.process;
})), so = /* @__PURE__ */ H(((e, t) => {
	t.exports = ((e, t, n, r) => {
		if (t in e && e[t] === !0) {
			let t;
			for (let i of n) if (i in e && (t = e[i], r(t))) return t;
		}
		return e;
	})(oo(), "__esModule", ["default", "process"], (e) => "nextTick" in e);
})), co = /* @__PURE__ */ H(((e, t) => {
	var { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i } = xa(), a = i("nodejs.stream.destroyed"), o = i("nodejs.stream.errored"), s = i("nodejs.stream.readable"), c = i("nodejs.stream.writable"), l = i("nodejs.stream.disturbed"), u = i("nodejs.webstream.isClosedPromise"), d = i("nodejs.webstream.controllerErrorFunction");
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
})), lo = /* @__PURE__ */ H(((e, t) => {
	var n = so(), { AbortError: r, codes: i } = Ca(), { ERR_INVALID_ARG_TYPE: a, ERR_STREAM_PREMATURE_CLOSE: o } = i, { kEmptyObject: s, once: c } = io(), { validateAbortSignal: l, validateFunction: u, validateObject: d, validateBoolean: f } = ao(), { Promise: p, PromisePrototypeThen: m, SymbolDispose: h } = xa(), { isClosed: g, isReadable: _, isReadableNodeStream: v, isReadableStream: y, isReadableFinished: b, isReadableErrored: x, isWritable: S, isWritableNodeStream: C, isWritableStream: w, isWritableFinished: T, isWritableErrored: E, isNodeStream: D, willEmitClose: O, kIsClosedPromise: k } = co(), A;
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
		}, ee = () => {
			e.req.on("finish", L);
		};
		j(e) ? (e.on("complete", L), F || e.on("abort", H), e.req ? ee() : e.on("request", ee)) : p && !m && (e.on("end", N), e.on("close", N)), !F && typeof e.aborted == "boolean" && e.on("aborted", H), e.on("end", z), e.on("finish", L), t.error !== !1 && e.on("error", B), e.on("close", H), V ? n.nextTick(H) : m != null && m.errorEmitted || k != null && k.errorEmitted ? F || n.nextTick(U) : (!f && (!F || _(e)) && (I || S(e) === !1) || !p && (!F || S(e)) && (R || _(e) === !1) || k && e.req && e.aborted) && n.nextTick(U);
		let W = () => {
			i = M, e.removeListener("aborted", H), e.removeListener("complete", L), e.removeListener("abort", H), e.removeListener("request", ee), e.req && e.req.removeListener("finish", L), e.removeListener("end", N), e.removeListener("close", N), e.removeListener("finish", L), e.removeListener("end", z), e.removeListener("error", B), e.removeListener("close", H);
		};
		if (t.signal && !V) {
			let a = () => {
				let n = i;
				W(), n.call(e, new r(void 0, { cause: t.signal.reason }));
			};
			if (t.signal.aborted) n.nextTick(a);
			else {
				A ||= io().addAbortListener;
				let n = A(t.signal, a), r = i;
				i = c((...t) => {
					n[h](), r.apply(e, t);
				});
			}
		}
		return W;
	}
	function P(e, t, i) {
		let a = !1, o = M;
		if (t.signal) if (o = () => {
			a = !0, i.call(e, new r(void 0, { cause: t.signal.reason }));
		}, t.signal.aborted) n.nextTick(o);
		else {
			A ||= io().addAbortListener;
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
})), uo = /* @__PURE__ */ H(((e, t) => {
	var n = so(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i }, AbortError: a } = Ca(), { Symbol: o } = xa(), { kIsDestroyed: s, isDestroyed: c, isFinished: l, isServerRequest: u } = co(), d = o("kDestroy"), f = o("kConstruct");
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
})), fo = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ObjectSetPrototypeOf: r } = xa(), { EventEmitter: i } = K("events");
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
})), po = /* @__PURE__ */ H(((e, t) => {
	var { SymbolDispose: n } = xa(), { AbortError: r, codes: i } = Ca(), { isNodeStream: a, isWebStream: o, kControllerErrorFunction: s } = co(), c = lo(), { ERR_INVALID_ARG_TYPE: l } = i, u, d = (e, t) => {
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
		return e.aborted ? i() : (u ||= io().addAbortListener, c(t, u(e, i)[n])), t;
	};
})), mo = /* @__PURE__ */ H(((e, t) => {
	var { StringPrototypeSlice: n, SymbolIterator: r, TypedArrayPrototypeSet: i, Uint8Array: a } = xa(), { Buffer: o } = K("buffer"), { inspect: s } = io();
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
})), ho = /* @__PURE__ */ H(((e, t) => {
	var { MathFloor: n, NumberIsInteger: r } = xa(), { validateInteger: i } = ao(), { ERR_INVALID_ARG_VALUE: a } = Ca().codes, o = 16 * 1024, s = 16;
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
})), go = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), r = n.Buffer;
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
})), _o = /* @__PURE__ */ H(((e) => {
	var t = go().Buffer, n = t.isEncoding || function(e) {
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
})), vo = /* @__PURE__ */ H(((e, t) => {
	var n = so(), { PromisePrototypeThen: r, SymbolAsyncIterator: i, SymbolIterator: a } = xa(), { Buffer: o } = K("buffer"), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: c } = Ca().codes;
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
})), yo = /* @__PURE__ */ H(((e, t) => {
	var n = so(), { ArrayPrototypeIndexOf: r, NumberIsInteger: i, NumberIsNaN: a, NumberParseInt: o, ObjectDefineProperties: s, ObjectKeys: c, ObjectSetPrototypeOf: l, Promise: u, SafeSet: d, SymbolAsyncDispose: f, SymbolAsyncIterator: p, Symbol: m } = xa();
	t.exports = J, J.ReadableState = fe;
	var { EventEmitter: h } = K("events"), { Stream: g, prependListener: _ } = fo(), { Buffer: v } = K("buffer"), { addAbortSignal: y } = po(), b = lo(), x = io().debuglog("stream", (e) => {
		x = e;
	}), S = mo(), C = uo(), { getHighWaterMark: w, getDefaultHighWaterMark: T } = ho(), { aggregateTwoErrors: E, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: O, ERR_OUT_OF_RANGE: k, ERR_STREAM_PUSH_AFTER_EOF: A, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: j }, AbortError: M } = Ca(), { validateObject: N } = ao(), P = m("kPaused"), { StringDecoder: F } = _o(), I = vo();
	l(J.prototype, g.prototype), l(J, g);
	var L = () => {}, { errorOrDestroy: R } = C, z = 1, B = 2, V = 4, H = 8, U = 16, ee = 32, W = 64, G = 128, te = 256, ne = 512, re = 1024, ie = 2048, ae = 4096, oe = 8192, se = 16384, ce = 32768, le = 65536, ue = 1 << 17, de = 1 << 18;
	function q(e) {
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
	s(fe.prototype, {
		objectMode: q(z),
		ended: q(B),
		endEmitted: q(V),
		reading: q(H),
		constructed: q(U),
		sync: q(ee),
		needReadable: q(W),
		emittedReadable: q(G),
		readableListening: q(te),
		resumeScheduled: q(ne),
		errorEmitted: q(re),
		emitClose: q(ie),
		autoDestroy: q(ae),
		destroyed: q(oe),
		closed: q(se),
		closeEmitted: q(ce),
		multiAwaitDrain: q(le),
		readingMore: q(ue),
		dataEmitted: q(de)
	});
	function fe(e, t, n) {
		typeof n != "boolean" && (n = t instanceof So()), this.state = 6192, e && e.objectMode && (this.state |= z), n && e && e.readableObjectMode && (this.state |= z), this.highWaterMark = e ? w(this, e, "readableHighWaterMark", n) : T(!1), this.buffer = new S(), this.length = 0, this.pipes = [], this.flowing = null, this[P] = null, e && e.emitClose === !1 && (this.state &= -2049), e && e.autoDestroy === !1 && (this.state &= -4097), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new F(e.encoding), this.encoding = e.encoding);
	}
	function J(e) {
		if (!(this instanceof J)) return new J(e);
		let t = this instanceof So();
		this._readableState = new fe(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && y(e.signal, this)), g.call(this, e), C.construct(this, () => {
			this._readableState.needReadable && ye(this, this._readableState);
		});
	}
	J.prototype.destroy = C.destroy, J.prototype._undestroy = C.undestroy, J.prototype._destroy = function(e, t) {
		t(e);
	}, J.prototype[h.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	}, J.prototype[f] = function() {
		let e;
		return this.destroyed || (e = this.readableEnded ? null : new M(), this.destroy(e)), new u((t, n) => b(this, (r) => r && r !== e ? n(r) : t(null)));
	}, J.prototype.push = function(e, t) {
		return pe(this, e, t, !1);
	}, J.prototype.unshift = function(e, t) {
		return pe(this, e, t, !0);
	};
	function pe(e, t, n, r) {
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
		else Y(e, i, t, !0);
		else if (i.ended) R(e, new A());
		else if (i.destroyed || i.errored) return !1;
		else i.state &= -9, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? Y(e, i, t, !1) : ye(e, i)) : Y(e, i, t, !1);
		else r || (i.state &= -9, ye(e, i));
		return !i.ended && (i.length < i.highWaterMark || i.length === 0);
	}
	function Y(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & le) === 0 ? t.awaitDrainWriters = null : t.awaitDrainWriters.clear(), t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), (t.state & W) !== 0 && _e(e)), ye(e, t);
	}
	J.prototype.isPaused = function() {
		let e = this._readableState;
		return e[P] === !0 || e.flowing === !1;
	}, J.prototype.setEncoding = function(e) {
		let t = new F(e);
		this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
		let n = this._readableState.buffer, r = "";
		for (let e of n) r += t.write(e);
		return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
	};
	var X = 1073741824;
	function me(e) {
		if (e > X) throw new k("size", "<= 1GiB", e);
		return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
	}
	function he(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & z) === 0 ? a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0 : 1;
	}
	J.prototype.read = function(e) {
		x("read", e), e === void 0 ? e = NaN : i(e) || (e = o(e, 10));
		let t = this._readableState, n = e;
		if (e > t.highWaterMark && (t.highWaterMark = me(e)), e !== 0 && (t.state &= -129), e === 0 && t.needReadable && ((t.highWaterMark === 0 ? t.length > 0 : t.length >= t.highWaterMark) || t.ended)) return x("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? Ae(this) : _e(this), null;
		if (e = he(e, t), e === 0 && t.ended) return t.length === 0 && Ae(this), null;
		let r = (t.state & W) !== 0;
		if (x("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, x("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, x("reading, ended or constructing", r);
		else if (r) {
			x("do read"), t.state |= 40, t.length === 0 && (t.state |= W);
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
	J.prototype._read = function(e) {
		throw new O("_read()");
	}, J.prototype.pipe = function(e, t) {
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
	J.prototype.unpipe = function(e) {
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
	}, J.prototype.on = function(e, t) {
		let r = g.prototype.on.call(this, e, t), i = this._readableState;
		return e === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== !1 && this.resume()) : e === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, x("on readable", i.length, i.reading), i.length ? _e(this) : i.reading || n.nextTick(Ce, this)), r;
	}, J.prototype.addListener = J.prototype.on, J.prototype.removeListener = function(e, t) {
		let r = g.prototype.removeListener.call(this, e, t);
		return e === "readable" && n.nextTick(Se, this), r;
	}, J.prototype.off = J.prototype.removeListener, J.prototype.removeAllListeners = function(e) {
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
	J.prototype.resume = function() {
		let e = this._readableState;
		return e.flowing || (x("resume"), e.flowing = !e.readableListening, we(this, e)), e[P] = !1, this;
	};
	function we(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(Te, e, t));
	}
	function Te(e, t) {
		x("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), Ee(e), t.flowing && !t.reading && e.read(0);
	}
	J.prototype.pause = function() {
		return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[P] = !0, this;
	};
	function Ee(e) {
		let t = e._readableState;
		for (x("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	J.prototype.wrap = function(e) {
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
	}, J.prototype[p] = function() {
		return De(this);
	}, J.prototype.iterator = function(e) {
		return e !== void 0 && N(e, "options"), De(this, e);
	};
	function De(e, t) {
		typeof e.read != "function" && (e = J.wrap(e, { objectMode: !0 }));
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
	s(J.prototype, {
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
	}), s(fe.prototype, {
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
	}), J._fromList = ke;
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
	J.from = function(e, t) {
		return I(J, e, t);
	};
	var Ne;
	function Pe() {
		return Ne === void 0 && (Ne = {}), Ne;
	}
	J.fromWeb = function(e, t) {
		return Pe().newStreamReadableFromReadableStream(e, t);
	}, J.toWeb = function(e, t) {
		return Pe().newReadableStreamFromStreamReadable(e, t);
	}, J.wrap = function(e, t) {
		return new J({
			objectMode: e.readableObjectMode ?? e.objectMode ?? !0,
			...t,
			destroy(t, n) {
				C.destroyer(e, t), n(t);
			}
		}).wrap(e);
	};
})), bo = /* @__PURE__ */ H(((e, t) => {
	var n = so(), { ArrayPrototypeSlice: r, Error: i, FunctionPrototypeSymbolHasInstance: a, ObjectDefineProperty: o, ObjectDefineProperties: s, ObjectSetPrototypeOf: c, StringPrototypeToLowerCase: l, Symbol: u, SymbolHasInstance: d } = xa();
	t.exports = N, N.WritableState = j;
	var { EventEmitter: f } = K("events"), p = fo().Stream, { Buffer: m } = K("buffer"), h = uo(), { addAbortSignal: g } = po(), { getHighWaterMark: _, getDefaultHighWaterMark: v } = ho(), { ERR_INVALID_ARG_TYPE: y, ERR_METHOD_NOT_IMPLEMENTED: b, ERR_MULTIPLE_CALLBACK: x, ERR_STREAM_CANNOT_PIPE: S, ERR_STREAM_DESTROYED: C, ERR_STREAM_ALREADY_FINISHED: w, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: E, ERR_UNKNOWN_ENCODING: D } = Ca().codes, { errorOrDestroy: O } = h;
	c(N.prototype, p.prototype), c(N, p);
	function k() {}
	var A = u("kOnFinished");
	function j(e, t, n) {
		typeof n != "boolean" && (n = t instanceof So()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", n) : v(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
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
		let t = this instanceof So();
		if (!t && !a(N, this)) return new N(e);
		this._writableState = new j(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && g(e.signal, this)), p.call(this, e), h.construct(this, () => {
			let e = this._writableState;
			e.writing || H(this, e), G(this, e);
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
		t.destroyed && V(t), G(e, t);
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
		return a.corked && (a.corked = 1, this.uncork()), o || (!a.errored && !a.ending ? (a.ending = !0, G(this, a, !0), a.ended = !0) : a.finished ? o = new w("end") : a.destroyed && (o = new C("end"))), typeof r == "function" && (o || a.finished ? n.nextTick(r, o) : a[A].push(r)), this;
	};
	function U(e) {
		return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
	}
	function ee(e, t) {
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
			} else U(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, n.nextTick(te, e, t));
		}
		t.sync = !0, t.pendingcb++;
		try {
			e._final(i);
		} catch (e) {
			i(e);
		}
		t.sync = !1;
	}
	function W(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, ee(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function G(e, t, r) {
		U(t) && (W(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, n.nextTick((e, t) => {
			U(t) ? te(e, t) : t.pendingcb--;
		}, e, t)) : U(t) && (t.pendingcb++, te(e, t))));
	}
	function te(e, t) {
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
	var ne = h.destroy;
	N.prototype.destroy = function(e, t) {
		let r = this._writableState;
		return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[A].length) && n.nextTick(V, r), ne.call(this, e, t), this;
	}, N.prototype._undestroy = h.undestroy, N.prototype._destroy = function(e, t) {
		t(e);
	}, N.prototype[f.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	};
	var re;
	function ie() {
		return re === void 0 && (re = {}), re;
	}
	N.fromWeb = function(e, t) {
		return ie().newStreamWritableFromWritableStream(e, t);
	}, N.toWeb = function(e) {
		return ie().newWritableStreamFromStreamWritable(e);
	};
})), xo = /* @__PURE__ */ H(((e, t) => {
	var n = so(), r = K("buffer"), { isReadable: i, isWritable: a, isIterable: o, isNodeStream: s, isReadableNodeStream: c, isWritableNodeStream: l, isDuplexNodeStream: u, isReadableStream: d, isWritableStream: f } = co(), p = lo(), { AbortError: m, codes: { ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: g } } = Ca(), { destroyer: _ } = uo(), v = So(), y = yo(), b = bo(), { createDeferredPromise: x } = io(), S = vo(), C = globalThis.Blob || r.Blob, w = C === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof C;
	}, T = globalThis.AbortController || (ro(), G(Ya)).AbortController, { FunctionPrototypeCall: E } = xa(), D = class extends v {
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
})), So = /* @__PURE__ */ H(((e, t) => {
	var { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i, ObjectSetPrototypeOf: a } = xa();
	t.exports = c;
	var o = yo(), s = bo();
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
		return d ||= xo(), d(e, "body");
	};
})), Co = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n, Symbol: r } = xa();
	t.exports = c;
	var { ERR_METHOD_NOT_IMPLEMENTED: i } = Ca().codes, a = So(), { getHighWaterMark: o } = ho();
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
})), wo = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n } = xa();
	t.exports = i;
	var r = Co();
	n(i.prototype, r.prototype), n(i, r);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		r.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), To = /* @__PURE__ */ H(((e, t) => {
	var n = so(), { ArrayIsArray: r, Promise: i, SymbolAsyncIterator: a, SymbolDispose: o } = xa(), s = lo(), { once: c } = io(), l = uo(), u = So(), { aggregateTwoErrors: d, codes: { ERR_INVALID_ARG_TYPE: f, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: m, ERR_STREAM_DESTROYED: h, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: _ } = Ca(), { validateFunction: v, validateAbortSignal: y } = ao(), { isIterable: b, isReadable: x, isReadableNodeStream: S, isNodeStream: C, isTransformStream: w, isWebStream: T, isReadableStream: E, isReadableFinished: D } = co(), O = globalThis.AbortController || (ro(), G(Ya)).AbortController, k, A, j;
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
		A ||= yo(), yield* A.prototype[a].call(e);
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
		j ||= io().addAbortListener;
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
				k ||= wo();
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
})), Eo = /* @__PURE__ */ H(((e, t) => {
	var { pipeline: n } = To(), r = So(), { destroyer: i } = uo(), { isNodeStream: a, isReadable: o, isWritable: s, isWebStream: c, isTransformStream: l, isWritableStream: u, isReadableStream: d } = co(), { AbortError: f, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: m } } = Ca(), h = lo();
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
})), Do = /* @__PURE__ */ H(((e, t) => {
	var n = globalThis.AbortController || (ro(), G(Ya)).AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i, ERR_MISSING_ARGS: a, ERR_OUT_OF_RANGE: o }, AbortError: s } = Ca(), { validateAbortSignal: c, validateInteger: l, validateObject: u } = ao(), d = xa().Symbol("kWeak"), f = xa().Symbol("kResistStopPropagation"), { finished: p } = lo(), m = Eo(), { addAbortSignalNoValidate: h } = po(), { isWritable: g, isNodeStream: _ } = co(), { deprecate: v } = io(), { ArrayPrototypePush: y, Boolean: b, MathFloor: x, Number: S, NumberIsNaN: C, Promise: w, PromiseReject: T, PromiseResolve: E, PromisePrototypeThen: D, Symbol: O } = xa(), k = O("kEmpty"), A = O("kEof");
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
			let i = io().AbortSignalAny([t?.signal].filter(b)), a = this, o = [], c = { signal: i }, l, u, d = !1, f = 0;
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
	function ee(e, t = void 0) {
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
	function W(e, t = void 0) {
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
		drop: ee,
		filter: R,
		flatMap: H,
		map: M,
		take: W,
		compose: j
	}, t.exports.promiseReturningOperators = {
		every: F,
		forEach: L,
		reduce: B,
		toArray: V,
		some: P,
		find: I
	};
})), Oo = /* @__PURE__ */ H(((e, t) => {
	var { ArrayPrototypePop: n, Promise: r } = xa(), { isIterable: i, isNodeStream: a, isWebStream: o } = co(), { pipelineImpl: s } = To(), { finished: c } = lo();
	ko();
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
})), ko = /* @__PURE__ */ H(((e, t) => {
	var { Buffer: n } = K("buffer"), { ObjectDefineProperty: r, ObjectKeys: i, ReflectApply: a } = xa(), { promisify: { custom: o } } = io(), { streamReturningOperators: s, promiseReturningOperators: c } = Do(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: l } } = Ca(), u = Eo(), { setDefaultHighWaterMark: d, getDefaultHighWaterMark: f } = ho(), { pipeline: p } = To(), { destroyer: m } = uo(), h = lo(), g = Oo(), _ = co(), v = t.exports = fo().Stream;
	v.isDestroyed = _.isDestroyed, v.isDisturbed = _.isDisturbed, v.isErrored = _.isErrored, v.isReadable = _.isReadable, v.isWritable = _.isWritable, v.Readable = yo();
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
	v.Writable = bo(), v.Duplex = So(), v.Transform = Co(), v.PassThrough = wo(), v.pipeline = p;
	var { addAbortSignal: y } = po();
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
})), Ao = /* @__PURE__ */ H(((e, t) => {
	var n = K("stream");
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
		let e = ko(), n = Oo(), r = e.Readable.destroy;
		t.exports = e.Readable, t.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, t.exports._isUint8Array = e._isUint8Array, t.exports.isDisturbed = e.isDisturbed, t.exports.isErrored = e.isErrored, t.exports.isReadable = e.isReadable, t.exports.Readable = e.Readable, t.exports.Writable = e.Writable, t.exports.Duplex = e.Duplex, t.exports.Transform = e.Transform, t.exports.PassThrough = e.PassThrough, t.exports.addAbortSignal = e.addAbortSignal, t.exports.finished = e.finished, t.exports.destroy = e.destroy, t.exports.destroy = r, t.exports.pipeline = e.pipeline, t.exports.compose = e.compose, Object.defineProperty(e, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return n;
			}
		}), t.exports.Stream = e.Stream;
	}
	t.exports.default = t.exports;
})), jo = /* @__PURE__ */ W((/* @__PURE__ */ H(((e, t) => {
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
})))(), 1), Mo = Ao();
function No(e) {
	return e ||= /* @__PURE__ */ new Date(), e = e instanceof Date ? e : typeof e == "string" ? new Date(e) : /* @__PURE__ */ new Date(), e;
}
function Po(e) {
	return e === null ? Buffer.alloc(0) : typeof e == "string" ? Buffer.from(e) : At(e) ? e.pipe(new Mo.PassThrough()) : e;
}
function Fo(e) {
	return (0, jo.default)(e, !1).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
}
function Io(e) {
	return e.slice(-1) === "/" ? e : e + "/";
}
//#endregion
//#region node_modules/archiver/lib/core.js
var { ReaddirGlob: Lo } = Cr, Ro = process.platform === "win32", zo = class extends Mo.Transform {
	_supportsDirectory = !1;
	_supportsSymlink = !1;
	constructor(e) {
		e = {
			highWaterMark: 1024 * 1024,
			statConcurrency: 4,
			...e
		}, super(e), this.options = e, this._format = !1, this._module = !1, this._pending = 0, this._pointer = 0, this._entriesCount = 0, this._entriesProcessedCount = 0, this._fsEntriesTotalBytes = 0, this._fsEntriesProcessedBytes = 0, this._queue = oa(this._onQueueTask.bind(this), 1), this._queue.drain(this._onQueueDrain.bind(this)), this._statQueue = oa(this._onStatQueueTask.bind(this), e.statConcurrency), this._statQueue.drain(this._onQueueDrain.bind(this)), this._state = {
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
		typeof this._module.finalize == "function" ? this._module.finalize() : typeof this._module.end == "function" ? this._module.end() : this.emit("error", new ba("NOENDMETHOD"));
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
		return e.name && (typeof e.prefix == "string" && e.prefix !== "" && (e.name = e.prefix + "/" + e.name, e.prefix = null), e.name = Fo(e.name), e.type !== "symlink" && e.name.slice(-1) === "/" ? (n = !0, e.type = "directory") : n && (e.name += "/")), typeof e.mode == "number" ? Ro ? e.mode &= 511 : e.mode &= 4095 : e.stats && e.mode === null ? (Ro ? e.mode = e.stats.mode & 511 : e.mode = e.stats.mode & 4095, Ro && n && (e.mode = 493)) : e.mode === null && (e.mode = n ? 493 : 420), e.stats && e.date === null ? e.date = e.stats.mtime : e.date = No(e.date), e;
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
		if (t.isFile()) e.data.type = "file", e.data.sourceType = "stream", e.source = new Hr.Readable(function() {
			return v(e.filepath);
		});
		else if (t.isDirectory() && this._supportsDirectory) e.data.name = Io(e.data.name), e.data.type = "directory", e.data.sourcePath = Io(e.filepath), e.data.sourceType = "buffer", e.source = Buffer.concat([]);
		else if (t.isSymbolicLink() && this._supportsSymlink) {
			let t = b(e.filepath), n = f(e.filepath);
			e.data.type = "symlink", e.data.linkname = p(n, m(n, t)), e.data.sourceType = "buffer", e.source = Buffer.concat([]);
		} else return t.isDirectory() ? this.emit("warning", new ba("DIRECTORYNOTSUPPORTED", e.data)) : t.isSymbolicLink() ? this.emit("warning", new ba("SYMLINKNOTSUPPORTED", e.data)) : this.emit("warning", new ba("ENTRYNOTSUPPORTED", e.data)), null;
		return e.data = this._normalizeEntryData(e.data, t), e;
	}
	abort() {
		return this._state.aborted || this._state.finalized || this._abort(), this;
	}
	append(e, t) {
		if (this._state.finalize || this._state.aborted) return this.emit("error", new ba("QUEUECLOSED")), this;
		if (t = this._normalizeEntryData(t), typeof t.name != "string" || t.name.length === 0) return this.emit("error", new ba("ENTRYNAMEREQUIRED")), this;
		if (t.type === "directory" && !this._supportsDirectory) return this.emit("error", new ba("DIRECTORYNOTSUPPORTED", { name: t.name })), this;
		if (e = Po(e), Buffer.isBuffer(e)) t.sourceType = "buffer";
		else if (At(e)) t.sourceType = "stream";
		else return this.emit("error", new ba("INPUTSTEAMBUFFERREQUIRED", { name: t.name })), this;
		return this._entriesCount++, this._queue.push({
			data: t,
			source: e
		}), this;
	}
	directory(e, t, n) {
		if (this._state.finalize || this._state.aborted) return this.emit("error", new ba("QUEUECLOSED")), this;
		if (typeof e != "string" || e.length === 0) return this.emit("error", new ba("DIRECTORYDIRPATHREQUIRED")), this;
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
					else if (typeof o != "object") throw new ba("DIRECTORYFUNCTIONINVALIDDATA", { dirpath: e });
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
		let c = Cr(e, i);
		return c.on("error", o.bind(this)), c.on("match", s.bind(this)), c.on("end", a.bind(this)), this;
	}
	file(e, t) {
		return this._state.finalize || this._state.aborted ? (this.emit("error", new ba("QUEUECLOSED")), this) : typeof e != "string" || e.length === 0 ? (this.emit("error", new ba("FILEFILEPATHREQUIRED")), this) : (this._append(e, t), this);
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
		let o = new Lo(t.cwd || ".", t);
		return o.on("error", i.bind(this)), o.on("match", a.bind(this)), o.on("end", r.bind(this)), this;
	}
	finalize() {
		if (this._state.aborted) {
			var e = new ba("ABORTED");
			return this.emit("error", e), Promise.reject(e);
		}
		if (this._state.finalize) {
			var t = new ba("FINALIZING");
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
		if (this._state.finalize || this._state.aborted) return this.emit("error", new ba("QUEUECLOSED")), this;
		if (typeof e != "string" || e.length === 0) return this.emit("error", new ba("SYMLINKFILEPATHREQUIRED")), this;
		if (typeof t != "string" || t.length === 0) return this.emit("error", new ba("SYMLINKTARGETREQUIRED", { filepath: e })), this;
		if (!this._supportsSymlink) return this.emit("error", new ba("SYMLINKNOTSUPPORTED", { filepath: e })), this;
		var r = {};
		return r.type = "symlink", r.name = e.replace(/\\/g, "/"), r.linkname = t.replace(/\\/g, "/"), r.sourceType = "buffer", typeof n == "number" && (r.mode = n), this._entriesCount++, this._queue.push({
			data: r,
			source: Buffer.concat([])
		}), this;
	}
	pointer() {
		return this._pointer;
	}
}, Bo = class {
	getName() {}
	getSize() {}
	getLastModifiedDate() {}
	isDirectory() {}
};
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/util.js
function Vo(e, t) {
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
function Ho(e) {
	return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
}
function Uo(e) {
	var t = Buffer.alloc(8);
	return t.writeUInt32LE(e % 4294967296, 0), t.writeUInt32LE(e / 4294967296 | 0, 4), t;
}
function Wo(e) {
	var t = Buffer.alloc(2);
	return t.writeUInt16LE((e & 65535) >>> 0, 0), t;
}
function Go(e, t) {
	return e.readUInt16LE(t);
}
function Ko(e) {
	var t = Buffer.alloc(4);
	return t.writeUInt32LE((e & 4294967295) >>> 0, 0), t;
}
//#endregion
//#region node_modules/compress-commons/lib/archivers/zip/general-purpose-bit.js
var qo = 8, Jo = 1, Yo = 4, Xo = 2, Zo = 64, Qo = 2048, $o = class e {
	constructor() {
		return this.descriptor = !1, this.encryption = !1, this.utf8 = !1, this.numberOfShannonFanoTrees = 0, this.strongEncryption = !1, this.slidingDictionarySize = 0, this;
	}
	encode() {
		return Wo((this.descriptor ? qo : 0) | (this.utf8 ? Qo : 0) | (this.encryption ? Jo : 0) | (this.strongEncryption ? Zo : 0));
	}
	static parse(t, n) {
		var r = Go(t, n), i = new e();
		return i.useDataDescriptor((r & qo) !== 0), i.useUTF8ForNames((r & Qo) !== 0), i.useStrongEncryption((r & Zo) !== 0), i.useEncryption((r & Jo) !== 0), i.setSlidingDictionarySize((r & Xo) === 0 ? 4096 : 8192), i.setNumberOfShannonFanoTrees((r & Yo) === 0 ? 2 : 3), i;
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
}, es = {
	PERM_MASK: 4095,
	FILE_TYPE_FLAG: 61440,
	LINK_FLAG: 40960,
	FILE_FLAG: 32768,
	DIR_FLAG: 16384,
	DEFAULT_LINK_PERM: 511,
	DEFAULT_DIR_PERM: 493,
	DEFAULT_FILE_PERM: 420
}, ts = Buffer.alloc(0), ns = 65535, rs = Buffer.from([, ,]), is = Buffer.from([
	,
	,
	,
	,
]), as = 67324752, os = 134695760, ss = 33639248, cs = 101010256, ls = 101075792, us = 117853008, ds = 65535, fs = 4294967295, ps = 4095, ms = 16384, hs = 32768, gs = class extends Bo {
	constructor(e) {
		super(), this.platform = 0, this.method = -1, this.name = null, this.size = 0, this.csize = 0, this.gpb = new $o(), this.crc = 0, this.time = -1, this.minver = 10, this.mode = -1, this.extra = null, this.exattr = 0, this.inattr = 0, this.comment = null, e && this.setName(e);
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
		return this.extra === null ? ts : this.extra;
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
		return this.time === -1 ? -1 : Ho(this.time);
	}
	getTimeDos() {
		return this.time === -1 ? 0 : this.time;
	}
	getUnixMode() {
		return this.platform === 3 ? this.getExternalAttributes() >> 16 & ns : 0;
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
		if (!(e instanceof $o)) throw Error("invalid entry GeneralPurposeBit");
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
		e = (0, jo.default)(e, !1).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, ""), t && (e = `/${e}`), Buffer.byteLength(e) !== e.length && this.getGeneralPurposeBit().useUTF8ForNames(!0), this.name = e;
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
		this.time = Vo(e, t);
	}
	setUnixMode(e) {
		e |= this.isDirectory() ? ms : hs;
		var t = 0;
		t |= e << 16 | (this.isDirectory() ? 16 : 32), this.setExternalAttributes(t), this.mode = e & ps, this.platform = 3;
	}
	setVersionNeededToExtract(e) {
		this.minver = e;
	}
	isDirectory() {
		return this.getName().slice(-1) === "/";
	}
	isUnixSymlink() {
		return (this.getUnixMode() & es.FILE_TYPE_FLAG) === es.LINK_FLAG;
	}
	isZip64() {
		return this.csize > 4294967295 || this.size > 4294967295;
	}
}, _s = /* @__PURE__ */ H(((e, t) => {
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
})), vs = /* @__PURE__ */ H(((e, t) => {
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
})), ys = /* @__PURE__ */ H(((e, t) => {
	var { format: n, inspect: r } = vs(), { AggregateError: i } = _s(), a = globalThis.AggregateError || i, o = Symbol("kIsNodeError"), s = [
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
})), bs = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), { format: r, inspect: i } = vs(), { codes: { ERR_INVALID_ARG_TYPE: a } } = ys(), { kResistStopPropagation: o, AggregateError: s, SymbolDispose: c } = _s(), l = globalThis.AbortSignal || (ro(), G(Ya)).AbortSignal, u = globalThis.AbortController || (ro(), G(Ya)).AbortController, d = Object.getPrototypeOf(async function() {}).constructor, f = globalThis.Blob || n.Blob, p = f === void 0 ? function(e) {
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
		addAbortListener: K("events").addAbortListener || function(e, t) {
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
})), xs = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i, ArrayPrototypeMap: a, NumberIsInteger: o, NumberIsNaN: s, NumberMAX_SAFE_INTEGER: c, NumberMIN_SAFE_INTEGER: l, NumberParseInt: u, ObjectPrototypeHasOwnProperty: d, RegExpPrototypeExec: f, String: p, StringPrototypeToUpperCase: m, StringPrototypeTrim: h } = _s(), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: _, ERR_INVALID_ARG_TYPE: v, ERR_INVALID_ARG_VALUE: y, ERR_OUT_OF_RANGE: b, ERR_UNKNOWN_SIGNAL: x } } = ys(), { normalizeEncoding: S } = bs(), { isAsyncFunction: C, isArrayBufferView: w } = bs().types, T = {};
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
	function ee(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = `${t}[${n}]`;
			if (r == null) throw new v(i, "AbortSignal", r);
			ne(r, i);
		}
	}
	function W(e, t = "signal") {
		if (P(e, t), T[e] === void 0) throw T[m(e)] === void 0 ? new x(e) : new x(e + " (signals must use all capital letters)");
	}
	var G = g((e, t = "buffer") => {
		if (!w(e)) throw new v(t, [
			"Buffer",
			"TypedArray",
			"DataView"
		], e);
	});
	function K(e, t) {
		let n = S(t), r = e.length;
		if (n === "hex" && r % 2 != 0) throw new y("encoding", t, `is invalid for data of length ${r}`);
	}
	function te(e, t = "Port", n = !0) {
		if (typeof e != "number" && typeof e != "string" || typeof e == "string" && h(e).length === 0 || +e != e >>> 0 || e > 65535 || e === 0 && !n) throw new _(t, e, n);
		return e | 0;
	}
	var ne = g((e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new v(t, "AbortSignal", e);
	}), re = g((e, t) => {
		if (typeof e != "function") throw new v(t, "Function", e);
	}), ie = g((e, t) => {
		if (typeof e != "function" || C(e)) throw new v(t, "Function", e);
	}), ae = g((e, t) => {
		if (e !== void 0) throw new v(t, "undefined", e);
	});
	function oe(e, t, n) {
		if (!r(n, e)) throw new v(t, `('${i(n, "|")}')`, e);
	}
	var se = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
	function ce(e, t) {
		if (e === void 0 || !f(se, e)) throw new y(t, e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	function le(e) {
		if (typeof e == "string") return ce(e, "hints"), e;
		if (n(e)) {
			let t = e.length, n = "";
			if (t === 0) return n;
			for (let r = 0; r < t; r++) {
				let i = e[r];
				ce(i, "hints"), n += i, r !== t - 1 && (n += ", ");
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
		validateAbortSignalArray: ee,
		validateBoolean: L,
		validateBuffer: G,
		validateDictionary: B,
		validateEncoding: K,
		validateFunction: re,
		validateInt32: M,
		validateInteger: j,
		validateNumber: F,
		validateObject: z,
		validateOneOf: I,
		validatePlainFunction: ie,
		validatePort: te,
		validateSignalName: W,
		validateString: P,
		validateUint32: N,
		validateUndefined: ae,
		validateUnion: oe,
		validateAbortSignal: ne,
		validateLinkHeaderValue: le
	};
})), Ss = /* @__PURE__ */ H(((e, t) => {
	t.exports = ((e, t, n, r) => {
		if (t in e && e[t] === !0) {
			let t;
			for (let i of n) if (i in e && (t = e[i], r(t))) return t;
		}
		return e;
	})(oo(), "__esModule", ["default", "process"], (e) => "nextTick" in e);
})), Cs = /* @__PURE__ */ H(((e, t) => {
	var { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i } = _s(), a = i("nodejs.stream.destroyed"), o = i("nodejs.stream.errored"), s = i("nodejs.stream.readable"), c = i("nodejs.stream.writable"), l = i("nodejs.stream.disturbed"), u = i("nodejs.webstream.isClosedPromise"), d = i("nodejs.webstream.controllerErrorFunction");
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
})), ws = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), { AbortError: r, codes: i } = ys(), { ERR_INVALID_ARG_TYPE: a, ERR_STREAM_PREMATURE_CLOSE: o } = i, { kEmptyObject: s, once: c } = bs(), { validateAbortSignal: l, validateFunction: u, validateObject: d, validateBoolean: f } = xs(), { Promise: p, PromisePrototypeThen: m, SymbolDispose: h } = _s(), { isClosed: g, isReadable: _, isReadableNodeStream: v, isReadableStream: y, isReadableFinished: b, isReadableErrored: x, isWritable: S, isWritableNodeStream: C, isWritableStream: w, isWritableFinished: T, isWritableErrored: E, isNodeStream: D, willEmitClose: O, kIsClosedPromise: k } = Cs(), A;
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
		}, ee = () => {
			e.req.on("finish", L);
		};
		j(e) ? (e.on("complete", L), F || e.on("abort", H), e.req ? ee() : e.on("request", ee)) : p && !m && (e.on("end", N), e.on("close", N)), !F && typeof e.aborted == "boolean" && e.on("aborted", H), e.on("end", z), e.on("finish", L), t.error !== !1 && e.on("error", B), e.on("close", H), V ? n.nextTick(H) : m != null && m.errorEmitted || k != null && k.errorEmitted ? F || n.nextTick(U) : (!f && (!F || _(e)) && (I || S(e) === !1) || !p && (!F || S(e)) && (R || _(e) === !1) || k && e.req && e.aborted) && n.nextTick(U);
		let W = () => {
			i = M, e.removeListener("aborted", H), e.removeListener("complete", L), e.removeListener("abort", H), e.removeListener("request", ee), e.req && e.req.removeListener("finish", L), e.removeListener("end", N), e.removeListener("close", N), e.removeListener("finish", L), e.removeListener("end", z), e.removeListener("error", B), e.removeListener("close", H);
		};
		if (t.signal && !V) {
			let a = () => {
				let n = i;
				W(), n.call(e, new r(void 0, { cause: t.signal.reason }));
			};
			if (t.signal.aborted) n.nextTick(a);
			else {
				A ||= bs().addAbortListener;
				let n = A(t.signal, a), r = i;
				i = c((...t) => {
					n[h](), r.apply(e, t);
				});
			}
		}
		return W;
	}
	function P(e, t, i) {
		let a = !1, o = M;
		if (t.signal) if (o = () => {
			a = !0, i.call(e, new r(void 0, { cause: t.signal.reason }));
		}, t.signal.aborted) n.nextTick(o);
		else {
			A ||= bs().addAbortListener;
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
})), Ts = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i }, AbortError: a } = ys(), { Symbol: o } = _s(), { kIsDestroyed: s, isDestroyed: c, isFinished: l, isServerRequest: u } = Cs(), d = o("kDestroy"), f = o("kConstruct");
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
})), Es = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ObjectSetPrototypeOf: r } = _s(), { EventEmitter: i } = K("events");
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
})), Ds = /* @__PURE__ */ H(((e, t) => {
	var { SymbolDispose: n } = _s(), { AbortError: r, codes: i } = ys(), { isNodeStream: a, isWebStream: o, kControllerErrorFunction: s } = Cs(), c = ws(), { ERR_INVALID_ARG_TYPE: l } = i, u, d = (e, t) => {
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
		return e.aborted ? i() : (u ||= bs().addAbortListener, c(t, u(e, i)[n])), t;
	};
})), Os = /* @__PURE__ */ H(((e, t) => {
	var { StringPrototypeSlice: n, SymbolIterator: r, TypedArrayPrototypeSet: i, Uint8Array: a } = _s(), { Buffer: o } = K("buffer"), { inspect: s } = bs();
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
})), ks = /* @__PURE__ */ H(((e, t) => {
	var { MathFloor: n, NumberIsInteger: r } = _s(), { validateInteger: i } = xs(), { ERR_INVALID_ARG_VALUE: a } = ys().codes, o = 16 * 1024, s = 16;
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
})), As = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), r = n.Buffer;
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
})), js = /* @__PURE__ */ H(((e) => {
	var t = As().Buffer, n = t.isEncoding || function(e) {
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
})), Ms = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), { PromisePrototypeThen: r, SymbolAsyncIterator: i, SymbolIterator: a } = _s(), { Buffer: o } = K("buffer"), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: c } = ys().codes;
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
})), Ns = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), { ArrayPrototypeIndexOf: r, NumberIsInteger: i, NumberIsNaN: a, NumberParseInt: o, ObjectDefineProperties: s, ObjectKeys: c, ObjectSetPrototypeOf: l, Promise: u, SafeSet: d, SymbolAsyncDispose: f, SymbolAsyncIterator: p, Symbol: m } = _s();
	t.exports = J, J.ReadableState = fe;
	var { EventEmitter: h } = K("events"), { Stream: g, prependListener: _ } = Es(), { Buffer: v } = K("buffer"), { addAbortSignal: y } = Ds(), b = ws(), x = bs().debuglog("stream", (e) => {
		x = e;
	}), S = Os(), C = Ts(), { getHighWaterMark: w, getDefaultHighWaterMark: T } = ks(), { aggregateTwoErrors: E, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: O, ERR_OUT_OF_RANGE: k, ERR_STREAM_PUSH_AFTER_EOF: A, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: j }, AbortError: M } = ys(), { validateObject: N } = xs(), P = m("kPaused"), { StringDecoder: F } = js(), I = Ms();
	l(J.prototype, g.prototype), l(J, g);
	var L = () => {}, { errorOrDestroy: R } = C, z = 1, B = 2, V = 4, H = 8, U = 16, ee = 32, W = 64, G = 128, te = 256, ne = 512, re = 1024, ie = 2048, ae = 4096, oe = 8192, se = 16384, ce = 32768, le = 65536, ue = 1 << 17, de = 1 << 18;
	function q(e) {
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
	s(fe.prototype, {
		objectMode: q(z),
		ended: q(B),
		endEmitted: q(V),
		reading: q(H),
		constructed: q(U),
		sync: q(ee),
		needReadable: q(W),
		emittedReadable: q(G),
		readableListening: q(te),
		resumeScheduled: q(ne),
		errorEmitted: q(re),
		emitClose: q(ie),
		autoDestroy: q(ae),
		destroyed: q(oe),
		closed: q(se),
		closeEmitted: q(ce),
		multiAwaitDrain: q(le),
		readingMore: q(ue),
		dataEmitted: q(de)
	});
	function fe(e, t, n) {
		typeof n != "boolean" && (n = t instanceof Is()), this.state = 6192, e && e.objectMode && (this.state |= z), n && e && e.readableObjectMode && (this.state |= z), this.highWaterMark = e ? w(this, e, "readableHighWaterMark", n) : T(!1), this.buffer = new S(), this.length = 0, this.pipes = [], this.flowing = null, this[P] = null, e && e.emitClose === !1 && (this.state &= -2049), e && e.autoDestroy === !1 && (this.state &= -4097), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new F(e.encoding), this.encoding = e.encoding);
	}
	function J(e) {
		if (!(this instanceof J)) return new J(e);
		let t = this instanceof Is();
		this._readableState = new fe(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && y(e.signal, this)), g.call(this, e), C.construct(this, () => {
			this._readableState.needReadable && ye(this, this._readableState);
		});
	}
	J.prototype.destroy = C.destroy, J.prototype._undestroy = C.undestroy, J.prototype._destroy = function(e, t) {
		t(e);
	}, J.prototype[h.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	}, J.prototype[f] = function() {
		let e;
		return this.destroyed || (e = this.readableEnded ? null : new M(), this.destroy(e)), new u((t, n) => b(this, (r) => r && r !== e ? n(r) : t(null)));
	}, J.prototype.push = function(e, t) {
		return pe(this, e, t, !1);
	}, J.prototype.unshift = function(e, t) {
		return pe(this, e, t, !0);
	};
	function pe(e, t, n, r) {
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
		else Y(e, i, t, !0);
		else if (i.ended) R(e, new A());
		else if (i.destroyed || i.errored) return !1;
		else i.state &= -9, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? Y(e, i, t, !1) : ye(e, i)) : Y(e, i, t, !1);
		else r || (i.state &= -9, ye(e, i));
		return !i.ended && (i.length < i.highWaterMark || i.length === 0);
	}
	function Y(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & le) === 0 ? t.awaitDrainWriters = null : t.awaitDrainWriters.clear(), t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), (t.state & W) !== 0 && _e(e)), ye(e, t);
	}
	J.prototype.isPaused = function() {
		let e = this._readableState;
		return e[P] === !0 || e.flowing === !1;
	}, J.prototype.setEncoding = function(e) {
		let t = new F(e);
		this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
		let n = this._readableState.buffer, r = "";
		for (let e of n) r += t.write(e);
		return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
	};
	var X = 1073741824;
	function me(e) {
		if (e > X) throw new k("size", "<= 1GiB", e);
		return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
	}
	function he(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & z) === 0 ? a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0 : 1;
	}
	J.prototype.read = function(e) {
		x("read", e), e === void 0 ? e = NaN : i(e) || (e = o(e, 10));
		let t = this._readableState, n = e;
		if (e > t.highWaterMark && (t.highWaterMark = me(e)), e !== 0 && (t.state &= -129), e === 0 && t.needReadable && ((t.highWaterMark === 0 ? t.length > 0 : t.length >= t.highWaterMark) || t.ended)) return x("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? Ae(this) : _e(this), null;
		if (e = he(e, t), e === 0 && t.ended) return t.length === 0 && Ae(this), null;
		let r = (t.state & W) !== 0;
		if (x("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, x("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, x("reading, ended or constructing", r);
		else if (r) {
			x("do read"), t.state |= 40, t.length === 0 && (t.state |= W);
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
	J.prototype._read = function(e) {
		throw new O("_read()");
	}, J.prototype.pipe = function(e, t) {
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
	J.prototype.unpipe = function(e) {
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
	}, J.prototype.on = function(e, t) {
		let r = g.prototype.on.call(this, e, t), i = this._readableState;
		return e === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== !1 && this.resume()) : e === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, x("on readable", i.length, i.reading), i.length ? _e(this) : i.reading || n.nextTick(Ce, this)), r;
	}, J.prototype.addListener = J.prototype.on, J.prototype.removeListener = function(e, t) {
		let r = g.prototype.removeListener.call(this, e, t);
		return e === "readable" && n.nextTick(Se, this), r;
	}, J.prototype.off = J.prototype.removeListener, J.prototype.removeAllListeners = function(e) {
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
	J.prototype.resume = function() {
		let e = this._readableState;
		return e.flowing || (x("resume"), e.flowing = !e.readableListening, we(this, e)), e[P] = !1, this;
	};
	function we(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(Te, e, t));
	}
	function Te(e, t) {
		x("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), Ee(e), t.flowing && !t.reading && e.read(0);
	}
	J.prototype.pause = function() {
		return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[P] = !0, this;
	};
	function Ee(e) {
		let t = e._readableState;
		for (x("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	J.prototype.wrap = function(e) {
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
	}, J.prototype[p] = function() {
		return De(this);
	}, J.prototype.iterator = function(e) {
		return e !== void 0 && N(e, "options"), De(this, e);
	};
	function De(e, t) {
		typeof e.read != "function" && (e = J.wrap(e, { objectMode: !0 }));
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
	s(J.prototype, {
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
	}), s(fe.prototype, {
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
	}), J._fromList = ke;
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
	J.from = function(e, t) {
		return I(J, e, t);
	};
	var Ne;
	function Pe() {
		return Ne === void 0 && (Ne = {}), Ne;
	}
	J.fromWeb = function(e, t) {
		return Pe().newStreamReadableFromReadableStream(e, t);
	}, J.toWeb = function(e, t) {
		return Pe().newReadableStreamFromStreamReadable(e, t);
	}, J.wrap = function(e, t) {
		return new J({
			objectMode: e.readableObjectMode ?? e.objectMode ?? !0,
			...t,
			destroy(t, n) {
				C.destroyer(e, t), n(t);
			}
		}).wrap(e);
	};
})), Ps = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), { ArrayPrototypeSlice: r, Error: i, FunctionPrototypeSymbolHasInstance: a, ObjectDefineProperty: o, ObjectDefineProperties: s, ObjectSetPrototypeOf: c, StringPrototypeToLowerCase: l, Symbol: u, SymbolHasInstance: d } = _s();
	t.exports = N, N.WritableState = j;
	var { EventEmitter: f } = K("events"), p = Es().Stream, { Buffer: m } = K("buffer"), h = Ts(), { addAbortSignal: g } = Ds(), { getHighWaterMark: _, getDefaultHighWaterMark: v } = ks(), { ERR_INVALID_ARG_TYPE: y, ERR_METHOD_NOT_IMPLEMENTED: b, ERR_MULTIPLE_CALLBACK: x, ERR_STREAM_CANNOT_PIPE: S, ERR_STREAM_DESTROYED: C, ERR_STREAM_ALREADY_FINISHED: w, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: E, ERR_UNKNOWN_ENCODING: D } = ys().codes, { errorOrDestroy: O } = h;
	c(N.prototype, p.prototype), c(N, p);
	function k() {}
	var A = u("kOnFinished");
	function j(e, t, n) {
		typeof n != "boolean" && (n = t instanceof Is()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", n) : v(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
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
		let t = this instanceof Is();
		if (!t && !a(N, this)) return new N(e);
		this._writableState = new j(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && g(e.signal, this)), p.call(this, e), h.construct(this, () => {
			let e = this._writableState;
			e.writing || H(this, e), G(this, e);
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
		t.destroyed && V(t), G(e, t);
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
		return a.corked && (a.corked = 1, this.uncork()), o || (!a.errored && !a.ending ? (a.ending = !0, G(this, a, !0), a.ended = !0) : a.finished ? o = new w("end") : a.destroyed && (o = new C("end"))), typeof r == "function" && (o || a.finished ? n.nextTick(r, o) : a[A].push(r)), this;
	};
	function U(e) {
		return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
	}
	function ee(e, t) {
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
			} else U(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, n.nextTick(te, e, t));
		}
		t.sync = !0, t.pendingcb++;
		try {
			e._final(i);
		} catch (e) {
			i(e);
		}
		t.sync = !1;
	}
	function W(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, ee(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function G(e, t, r) {
		U(t) && (W(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, n.nextTick((e, t) => {
			U(t) ? te(e, t) : t.pendingcb--;
		}, e, t)) : U(t) && (t.pendingcb++, te(e, t))));
	}
	function te(e, t) {
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
	var ne = h.destroy;
	N.prototype.destroy = function(e, t) {
		let r = this._writableState;
		return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[A].length) && n.nextTick(V, r), ne.call(this, e, t), this;
	}, N.prototype._undestroy = h.undestroy, N.prototype._destroy = function(e, t) {
		t(e);
	}, N.prototype[f.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	};
	var re;
	function ie() {
		return re === void 0 && (re = {}), re;
	}
	N.fromWeb = function(e, t) {
		return ie().newStreamWritableFromWritableStream(e, t);
	}, N.toWeb = function(e) {
		return ie().newWritableStreamFromStreamWritable(e);
	};
})), Fs = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), r = K("buffer"), { isReadable: i, isWritable: a, isIterable: o, isNodeStream: s, isReadableNodeStream: c, isWritableNodeStream: l, isDuplexNodeStream: u, isReadableStream: d, isWritableStream: f } = Cs(), p = ws(), { AbortError: m, codes: { ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: g } } = ys(), { destroyer: _ } = Ts(), v = Is(), y = Ns(), b = Ps(), { createDeferredPromise: x } = bs(), S = Ms(), C = globalThis.Blob || r.Blob, w = C === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof C;
	}, T = globalThis.AbortController || (ro(), G(Ya)).AbortController, { FunctionPrototypeCall: E } = _s(), D = class extends v {
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
})), Is = /* @__PURE__ */ H(((e, t) => {
	var { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i, ObjectSetPrototypeOf: a } = _s();
	t.exports = c;
	var o = Ns(), s = Ps();
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
		return d ||= Fs(), d(e, "body");
	};
})), Ls = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n, Symbol: r } = _s();
	t.exports = c;
	var { ERR_METHOD_NOT_IMPLEMENTED: i } = ys().codes, a = Is(), { getHighWaterMark: o } = ks();
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
})), Rs = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n } = _s();
	t.exports = i;
	var r = Ls();
	n(i.prototype, r.prototype), n(i, r);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		r.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), zs = /* @__PURE__ */ H(((e, t) => {
	var n = Ss(), { ArrayIsArray: r, Promise: i, SymbolAsyncIterator: a, SymbolDispose: o } = _s(), s = ws(), { once: c } = bs(), l = Ts(), u = Is(), { aggregateTwoErrors: d, codes: { ERR_INVALID_ARG_TYPE: f, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: m, ERR_STREAM_DESTROYED: h, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: _ } = ys(), { validateFunction: v, validateAbortSignal: y } = xs(), { isIterable: b, isReadable: x, isReadableNodeStream: S, isNodeStream: C, isTransformStream: w, isWebStream: T, isReadableStream: E, isReadableFinished: D } = Cs(), O = globalThis.AbortController || (ro(), G(Ya)).AbortController, k, A, j;
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
		A ||= Ns(), yield* A.prototype[a].call(e);
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
		j ||= bs().addAbortListener;
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
				k ||= Rs();
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
})), Bs = /* @__PURE__ */ H(((e, t) => {
	var { pipeline: n } = zs(), r = Is(), { destroyer: i } = Ts(), { isNodeStream: a, isReadable: o, isWritable: s, isWebStream: c, isTransformStream: l, isWritableStream: u, isReadableStream: d } = Cs(), { AbortError: f, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: m } } = ys(), h = ws();
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
})), Vs = /* @__PURE__ */ H(((e, t) => {
	var n = globalThis.AbortController || (ro(), G(Ya)).AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i, ERR_MISSING_ARGS: a, ERR_OUT_OF_RANGE: o }, AbortError: s } = ys(), { validateAbortSignal: c, validateInteger: l, validateObject: u } = xs(), d = _s().Symbol("kWeak"), f = _s().Symbol("kResistStopPropagation"), { finished: p } = ws(), m = Bs(), { addAbortSignalNoValidate: h } = Ds(), { isWritable: g, isNodeStream: _ } = Cs(), { deprecate: v } = bs(), { ArrayPrototypePush: y, Boolean: b, MathFloor: x, Number: S, NumberIsNaN: C, Promise: w, PromiseReject: T, PromiseResolve: E, PromisePrototypeThen: D, Symbol: O } = _s(), k = O("kEmpty"), A = O("kEof");
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
			let i = bs().AbortSignalAny([t?.signal].filter(b)), a = this, o = [], c = { signal: i }, l, u, d = !1, f = 0;
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
	function ee(e, t = void 0) {
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
	function W(e, t = void 0) {
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
		drop: ee,
		filter: R,
		flatMap: H,
		map: M,
		take: W,
		compose: j
	}, t.exports.promiseReturningOperators = {
		every: F,
		forEach: L,
		reduce: B,
		toArray: V,
		some: P,
		find: I
	};
})), Hs = /* @__PURE__ */ H(((e, t) => {
	var { ArrayPrototypePop: n, Promise: r } = _s(), { isIterable: i, isNodeStream: a, isWebStream: o } = Cs(), { pipelineImpl: s } = zs(), { finished: c } = ws();
	Us();
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
})), Us = /* @__PURE__ */ H(((e, t) => {
	var { Buffer: n } = K("buffer"), { ObjectDefineProperty: r, ObjectKeys: i, ReflectApply: a } = _s(), { promisify: { custom: o } } = bs(), { streamReturningOperators: s, promiseReturningOperators: c } = Vs(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: l } } = ys(), u = Bs(), { setDefaultHighWaterMark: d, getDefaultHighWaterMark: f } = ks(), { pipeline: p } = zs(), { destroyer: m } = Ts(), h = ws(), g = Hs(), _ = Cs(), v = t.exports = Es().Stream;
	v.isDestroyed = _.isDestroyed, v.isDisturbed = _.isDisturbed, v.isErrored = _.isErrored, v.isReadable = _.isReadable, v.isWritable = _.isWritable, v.Readable = Ns();
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
	v.Writable = Ps(), v.Duplex = Is(), v.Transform = Ls(), v.PassThrough = Rs(), v.pipeline = p;
	var { addAbortSignal: y } = Ds();
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
})), Ws = (/* @__PURE__ */ H(((e, t) => {
	var n = K("stream");
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
		let e = Us(), n = Hs(), r = e.Readable.destroy;
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
function Gs(e) {
	if (e === null) return Buffer.alloc(0);
	if (typeof e == "string") return Buffer.from(e);
	if (At(e) && !e._readableState) {
		var t = new Ws.PassThrough();
		return e.pipe(t), t;
	}
	return e;
}
//#endregion
//#region node_modules/compress-commons/lib/archivers/archive-output-stream.js
var Ks = class extends Ws.Transform {
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
		if (t ||= null, typeof n != "function" && (n = this._emitErrorCallback.bind(this)), !(e instanceof Bo)) {
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
		if (this._archive.processing = !0, this._normalizeEntry(e), this._entry = e, t = Gs(t), Buffer.isBuffer(t)) this._appendBuffer(e, t, n);
		else if (At(t)) this._appendStream(e, t, n);
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
}, qs = /* @__PURE__ */ H(((e) => {
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
})), Js = /* @__PURE__ */ H(((e, t) => {
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
})), Ys = /* @__PURE__ */ H(((e, t) => {
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
})), Xs = /* @__PURE__ */ H(((e, t) => {
	var { format: n, inspect: r } = Ys(), { AggregateError: i } = Js(), a = globalThis.AggregateError || i, o = Symbol("kIsNodeError"), s = [
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
})), Zs = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), { format: r, inspect: i } = Ys(), { codes: { ERR_INVALID_ARG_TYPE: a } } = Xs(), { kResistStopPropagation: o, AggregateError: s, SymbolDispose: c } = Js(), l = globalThis.AbortSignal || (ro(), G(Ya)).AbortSignal, u = globalThis.AbortController || (ro(), G(Ya)).AbortController, d = Object.getPrototypeOf(async function() {}).constructor, f = globalThis.Blob || n.Blob, p = f === void 0 ? function(e) {
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
		addAbortListener: K("events").addAbortListener || function(e, t) {
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
})), Qs = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i, ArrayPrototypeMap: a, NumberIsInteger: o, NumberIsNaN: s, NumberMAX_SAFE_INTEGER: c, NumberMIN_SAFE_INTEGER: l, NumberParseInt: u, ObjectPrototypeHasOwnProperty: d, RegExpPrototypeExec: f, String: p, StringPrototypeToUpperCase: m, StringPrototypeTrim: h } = Js(), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: _, ERR_INVALID_ARG_TYPE: v, ERR_INVALID_ARG_VALUE: y, ERR_OUT_OF_RANGE: b, ERR_UNKNOWN_SIGNAL: x } } = Xs(), { normalizeEncoding: S } = Zs(), { isAsyncFunction: C, isArrayBufferView: w } = Zs().types, T = {};
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
	function ee(e, t) {
		V(e, t);
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = `${t}[${n}]`;
			if (r == null) throw new v(i, "AbortSignal", r);
			ne(r, i);
		}
	}
	function W(e, t = "signal") {
		if (P(e, t), T[e] === void 0) throw T[m(e)] === void 0 ? new x(e) : new x(e + " (signals must use all capital letters)");
	}
	var G = g((e, t = "buffer") => {
		if (!w(e)) throw new v(t, [
			"Buffer",
			"TypedArray",
			"DataView"
		], e);
	});
	function K(e, t) {
		let n = S(t), r = e.length;
		if (n === "hex" && r % 2 != 0) throw new y("encoding", t, `is invalid for data of length ${r}`);
	}
	function te(e, t = "Port", n = !0) {
		if (typeof e != "number" && typeof e != "string" || typeof e == "string" && h(e).length === 0 || +e != e >>> 0 || e > 65535 || e === 0 && !n) throw new _(t, e, n);
		return e | 0;
	}
	var ne = g((e, t) => {
		if (e !== void 0 && (typeof e != "object" || !e || !("aborted" in e))) throw new v(t, "AbortSignal", e);
	}), re = g((e, t) => {
		if (typeof e != "function") throw new v(t, "Function", e);
	}), ie = g((e, t) => {
		if (typeof e != "function" || C(e)) throw new v(t, "Function", e);
	}), ae = g((e, t) => {
		if (e !== void 0) throw new v(t, "undefined", e);
	});
	function oe(e, t, n) {
		if (!r(n, e)) throw new v(t, `('${i(n, "|")}')`, e);
	}
	var se = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
	function ce(e, t) {
		if (e === void 0 || !f(se, e)) throw new y(t, e, "must be an array or string of format \"</styles.css>; rel=preload; as=style\"");
	}
	function le(e) {
		if (typeof e == "string") return ce(e, "hints"), e;
		if (n(e)) {
			let t = e.length, n = "";
			if (t === 0) return n;
			for (let r = 0; r < t; r++) {
				let i = e[r];
				ce(i, "hints"), n += i, r !== t - 1 && (n += ", ");
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
		validateAbortSignalArray: ee,
		validateBoolean: L,
		validateBuffer: G,
		validateDictionary: B,
		validateEncoding: K,
		validateFunction: re,
		validateInt32: M,
		validateInteger: j,
		validateNumber: F,
		validateObject: z,
		validateOneOf: I,
		validatePlainFunction: ie,
		validatePort: te,
		validateSignalName: W,
		validateString: P,
		validateUint32: N,
		validateUndefined: ae,
		validateUnion: oe,
		validateAbortSignal: ne,
		validateLinkHeaderValue: le
	};
})), $s = /* @__PURE__ */ H(((e, t) => {
	t.exports = ((e, t, n, r) => {
		if (t in e && e[t] === !0) {
			let t;
			for (let i of n) if (i in e && (t = e[i], r(t))) return t;
		}
		return e;
	})(oo(), "__esModule", ["default", "process"], (e) => "nextTick" in e);
})), ec = /* @__PURE__ */ H(((e, t) => {
	var { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i } = Js(), a = i("nodejs.stream.destroyed"), o = i("nodejs.stream.errored"), s = i("nodejs.stream.readable"), c = i("nodejs.stream.writable"), l = i("nodejs.stream.disturbed"), u = i("nodejs.webstream.isClosedPromise"), d = i("nodejs.webstream.controllerErrorFunction");
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
})), tc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), { AbortError: r, codes: i } = Xs(), { ERR_INVALID_ARG_TYPE: a, ERR_STREAM_PREMATURE_CLOSE: o } = i, { kEmptyObject: s, once: c } = Zs(), { validateAbortSignal: l, validateFunction: u, validateObject: d, validateBoolean: f } = Qs(), { Promise: p, PromisePrototypeThen: m, SymbolDispose: h } = Js(), { isClosed: g, isReadable: _, isReadableNodeStream: v, isReadableStream: y, isReadableFinished: b, isReadableErrored: x, isWritable: S, isWritableNodeStream: C, isWritableStream: w, isWritableFinished: T, isWritableErrored: E, isNodeStream: D, willEmitClose: O, kIsClosedPromise: k } = ec(), A;
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
		}, ee = () => {
			e.req.on("finish", L);
		};
		j(e) ? (e.on("complete", L), F || e.on("abort", H), e.req ? ee() : e.on("request", ee)) : p && !m && (e.on("end", N), e.on("close", N)), !F && typeof e.aborted == "boolean" && e.on("aborted", H), e.on("end", z), e.on("finish", L), t.error !== !1 && e.on("error", B), e.on("close", H), V ? n.nextTick(H) : m != null && m.errorEmitted || k != null && k.errorEmitted ? F || n.nextTick(U) : (!f && (!F || _(e)) && (I || S(e) === !1) || !p && (!F || S(e)) && (R || _(e) === !1) || k && e.req && e.aborted) && n.nextTick(U);
		let W = () => {
			i = M, e.removeListener("aborted", H), e.removeListener("complete", L), e.removeListener("abort", H), e.removeListener("request", ee), e.req && e.req.removeListener("finish", L), e.removeListener("end", N), e.removeListener("close", N), e.removeListener("finish", L), e.removeListener("end", z), e.removeListener("error", B), e.removeListener("close", H);
		};
		if (t.signal && !V) {
			let a = () => {
				let n = i;
				W(), n.call(e, new r(void 0, { cause: t.signal.reason }));
			};
			if (t.signal.aborted) n.nextTick(a);
			else {
				A ||= Zs().addAbortListener;
				let n = A(t.signal, a), r = i;
				i = c((...t) => {
					n[h](), r.apply(e, t);
				});
			}
		}
		return W;
	}
	function P(e, t, i) {
		let a = !1, o = M;
		if (t.signal) if (o = () => {
			a = !0, i.call(e, new r(void 0, { cause: t.signal.reason }));
		}, t.signal.aborted) n.nextTick(o);
		else {
			A ||= Zs().addAbortListener;
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
})), nc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i }, AbortError: a } = Xs(), { Symbol: o } = Js(), { kIsDestroyed: s, isDestroyed: c, isFinished: l, isServerRequest: u } = ec(), d = o("kDestroy"), f = o("kConstruct");
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
})), rc = /* @__PURE__ */ H(((e, t) => {
	var { ArrayIsArray: n, ObjectSetPrototypeOf: r } = Js(), { EventEmitter: i } = K("events");
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
})), ic = /* @__PURE__ */ H(((e, t) => {
	var { SymbolDispose: n } = Js(), { AbortError: r, codes: i } = Xs(), { isNodeStream: a, isWebStream: o, kControllerErrorFunction: s } = ec(), c = tc(), { ERR_INVALID_ARG_TYPE: l } = i, u, d = (e, t) => {
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
		return e.aborted ? i() : (u ||= Zs().addAbortListener, c(t, u(e, i)[n])), t;
	};
})), ac = /* @__PURE__ */ H(((e, t) => {
	var { StringPrototypeSlice: n, SymbolIterator: r, TypedArrayPrototypeSet: i, Uint8Array: a } = Js(), { Buffer: o } = K("buffer"), { inspect: s } = Zs();
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
})), oc = /* @__PURE__ */ H(((e, t) => {
	var { MathFloor: n, NumberIsInteger: r } = Js(), { validateInteger: i } = Qs(), { ERR_INVALID_ARG_VALUE: a } = Xs().codes, o = 16 * 1024, s = 16;
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
})), sc = /* @__PURE__ */ H(((e, t) => {
	var n = K("buffer"), r = n.Buffer;
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
})), cc = /* @__PURE__ */ H(((e) => {
	var t = sc().Buffer, n = t.isEncoding || function(e) {
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
})), lc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), { PromisePrototypeThen: r, SymbolAsyncIterator: i, SymbolIterator: a } = Js(), { Buffer: o } = K("buffer"), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_NULL_VALUES: c } = Xs().codes;
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
})), uc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), { ArrayPrototypeIndexOf: r, NumberIsInteger: i, NumberIsNaN: a, NumberParseInt: o, ObjectDefineProperties: s, ObjectKeys: c, ObjectSetPrototypeOf: l, Promise: u, SafeSet: d, SymbolAsyncDispose: f, SymbolAsyncIterator: p, Symbol: m } = Js();
	t.exports = J, J.ReadableState = fe;
	var { EventEmitter: h } = K("events"), { Stream: g, prependListener: _ } = rc(), { Buffer: v } = K("buffer"), { addAbortSignal: y } = ic(), b = tc(), x = Zs().debuglog("stream", (e) => {
		x = e;
	}), S = ac(), C = nc(), { getHighWaterMark: w, getDefaultHighWaterMark: T } = oc(), { aggregateTwoErrors: E, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: O, ERR_OUT_OF_RANGE: k, ERR_STREAM_PUSH_AFTER_EOF: A, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: j }, AbortError: M } = Xs(), { validateObject: N } = Qs(), P = m("kPaused"), { StringDecoder: F } = cc(), I = lc();
	l(J.prototype, g.prototype), l(J, g);
	var L = () => {}, { errorOrDestroy: R } = C, z = 1, B = 2, V = 4, H = 8, U = 16, ee = 32, W = 64, G = 128, te = 256, ne = 512, re = 1024, ie = 2048, ae = 4096, oe = 8192, se = 16384, ce = 32768, le = 65536, ue = 1 << 17, de = 1 << 18;
	function q(e) {
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
	s(fe.prototype, {
		objectMode: q(z),
		ended: q(B),
		endEmitted: q(V),
		reading: q(H),
		constructed: q(U),
		sync: q(ee),
		needReadable: q(W),
		emittedReadable: q(G),
		readableListening: q(te),
		resumeScheduled: q(ne),
		errorEmitted: q(re),
		emitClose: q(ie),
		autoDestroy: q(ae),
		destroyed: q(oe),
		closed: q(se),
		closeEmitted: q(ce),
		multiAwaitDrain: q(le),
		readingMore: q(ue),
		dataEmitted: q(de)
	});
	function fe(e, t, n) {
		typeof n != "boolean" && (n = t instanceof pc()), this.state = 6192, e && e.objectMode && (this.state |= z), n && e && e.readableObjectMode && (this.state |= z), this.highWaterMark = e ? w(this, e, "readableHighWaterMark", n) : T(!1), this.buffer = new S(), this.length = 0, this.pipes = [], this.flowing = null, this[P] = null, e && e.emitClose === !1 && (this.state &= -2049), e && e.autoDestroy === !1 && (this.state &= -4097), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new F(e.encoding), this.encoding = e.encoding);
	}
	function J(e) {
		if (!(this instanceof J)) return new J(e);
		let t = this instanceof pc();
		this._readableState = new fe(e, this, t), e && (typeof e.read == "function" && (this._read = e.read), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.construct == "function" && (this._construct = e.construct), e.signal && !t && y(e.signal, this)), g.call(this, e), C.construct(this, () => {
			this._readableState.needReadable && ye(this, this._readableState);
		});
	}
	J.prototype.destroy = C.destroy, J.prototype._undestroy = C.undestroy, J.prototype._destroy = function(e, t) {
		t(e);
	}, J.prototype[h.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	}, J.prototype[f] = function() {
		let e;
		return this.destroyed || (e = this.readableEnded ? null : new M(), this.destroy(e)), new u((t, n) => b(this, (r) => r && r !== e ? n(r) : t(null)));
	}, J.prototype.push = function(e, t) {
		return pe(this, e, t, !1);
	}, J.prototype.unshift = function(e, t) {
		return pe(this, e, t, !0);
	};
	function pe(e, t, n, r) {
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
		else Y(e, i, t, !0);
		else if (i.ended) R(e, new A());
		else if (i.destroyed || i.errored) return !1;
		else i.state &= -9, i.decoder && !n ? (t = i.decoder.write(t), i.objectMode || t.length !== 0 ? Y(e, i, t, !1) : ye(e, i)) : Y(e, i, t, !1);
		else r || (i.state &= -9, ye(e, i));
		return !i.ended && (i.length < i.highWaterMark || i.length === 0);
	}
	function Y(e, t, n, r) {
		t.flowing && t.length === 0 && !t.sync && e.listenerCount("data") > 0 ? ((t.state & le) === 0 ? t.awaitDrainWriters = null : t.awaitDrainWriters.clear(), t.dataEmitted = !0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), (t.state & W) !== 0 && _e(e)), ye(e, t);
	}
	J.prototype.isPaused = function() {
		let e = this._readableState;
		return e[P] === !0 || e.flowing === !1;
	}, J.prototype.setEncoding = function(e) {
		let t = new F(e);
		this._readableState.decoder = t, this._readableState.encoding = this._readableState.decoder.encoding;
		let n = this._readableState.buffer, r = "";
		for (let e of n) r += t.write(e);
		return n.clear(), r !== "" && n.push(r), this._readableState.length = r.length, this;
	};
	var X = 1073741824;
	function me(e) {
		if (e > X) throw new k("size", "<= 1GiB", e);
		return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
	}
	function he(e, t) {
		return e <= 0 || t.length === 0 && t.ended ? 0 : (t.state & z) === 0 ? a(e) ? t.flowing && t.length ? t.buffer.first().length : t.length : e <= t.length ? e : t.ended ? t.length : 0 : 1;
	}
	J.prototype.read = function(e) {
		x("read", e), e === void 0 ? e = NaN : i(e) || (e = o(e, 10));
		let t = this._readableState, n = e;
		if (e > t.highWaterMark && (t.highWaterMark = me(e)), e !== 0 && (t.state &= -129), e === 0 && t.needReadable && ((t.highWaterMark === 0 ? t.length > 0 : t.length >= t.highWaterMark) || t.ended)) return x("read: emitReadable", t.length, t.ended), t.length === 0 && t.ended ? Ae(this) : _e(this), null;
		if (e = he(e, t), e === 0 && t.ended) return t.length === 0 && Ae(this), null;
		let r = (t.state & W) !== 0;
		if (x("need readable", r), (t.length === 0 || t.length - e < t.highWaterMark) && (r = !0, x("length less than watermark", r)), t.ended || t.reading || t.destroyed || t.errored || !t.constructed) r = !1, x("reading, ended or constructing", r);
		else if (r) {
			x("do read"), t.state |= 40, t.length === 0 && (t.state |= W);
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
	J.prototype._read = function(e) {
		throw new O("_read()");
	}, J.prototype.pipe = function(e, t) {
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
	J.prototype.unpipe = function(e) {
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
	}, J.prototype.on = function(e, t) {
		let r = g.prototype.on.call(this, e, t), i = this._readableState;
		return e === "data" ? (i.readableListening = this.listenerCount("readable") > 0, i.flowing !== !1 && this.resume()) : e === "readable" && !i.endEmitted && !i.readableListening && (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, x("on readable", i.length, i.reading), i.length ? _e(this) : i.reading || n.nextTick(Ce, this)), r;
	}, J.prototype.addListener = J.prototype.on, J.prototype.removeListener = function(e, t) {
		let r = g.prototype.removeListener.call(this, e, t);
		return e === "readable" && n.nextTick(Se, this), r;
	}, J.prototype.off = J.prototype.removeListener, J.prototype.removeAllListeners = function(e) {
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
	J.prototype.resume = function() {
		let e = this._readableState;
		return e.flowing || (x("resume"), e.flowing = !e.readableListening, we(this, e)), e[P] = !1, this;
	};
	function we(e, t) {
		t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(Te, e, t));
	}
	function Te(e, t) {
		x("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), Ee(e), t.flowing && !t.reading && e.read(0);
	}
	J.prototype.pause = function() {
		return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState[P] = !0, this;
	};
	function Ee(e) {
		let t = e._readableState;
		for (x("flow", t.flowing); t.flowing && e.read() !== null;);
	}
	J.prototype.wrap = function(e) {
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
	}, J.prototype[p] = function() {
		return De(this);
	}, J.prototype.iterator = function(e) {
		return e !== void 0 && N(e, "options"), De(this, e);
	};
	function De(e, t) {
		typeof e.read != "function" && (e = J.wrap(e, { objectMode: !0 }));
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
	s(J.prototype, {
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
	}), s(fe.prototype, {
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
	}), J._fromList = ke;
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
	J.from = function(e, t) {
		return I(J, e, t);
	};
	var Ne;
	function Pe() {
		return Ne === void 0 && (Ne = {}), Ne;
	}
	J.fromWeb = function(e, t) {
		return Pe().newStreamReadableFromReadableStream(e, t);
	}, J.toWeb = function(e, t) {
		return Pe().newReadableStreamFromStreamReadable(e, t);
	}, J.wrap = function(e, t) {
		return new J({
			objectMode: e.readableObjectMode ?? e.objectMode ?? !0,
			...t,
			destroy(t, n) {
				C.destroyer(e, t), n(t);
			}
		}).wrap(e);
	};
})), dc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), { ArrayPrototypeSlice: r, Error: i, FunctionPrototypeSymbolHasInstance: a, ObjectDefineProperty: o, ObjectDefineProperties: s, ObjectSetPrototypeOf: c, StringPrototypeToLowerCase: l, Symbol: u, SymbolHasInstance: d } = Js();
	t.exports = N, N.WritableState = j;
	var { EventEmitter: f } = K("events"), p = rc().Stream, { Buffer: m } = K("buffer"), h = nc(), { addAbortSignal: g } = ic(), { getHighWaterMark: _, getDefaultHighWaterMark: v } = oc(), { ERR_INVALID_ARG_TYPE: y, ERR_METHOD_NOT_IMPLEMENTED: b, ERR_MULTIPLE_CALLBACK: x, ERR_STREAM_CANNOT_PIPE: S, ERR_STREAM_DESTROYED: C, ERR_STREAM_ALREADY_FINISHED: w, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: E, ERR_UNKNOWN_ENCODING: D } = Xs().codes, { errorOrDestroy: O } = h;
	c(N.prototype, p.prototype), c(N, p);
	function k() {}
	var A = u("kOnFinished");
	function j(e, t, n) {
		typeof n != "boolean" && (n = t instanceof pc()), this.objectMode = !!(e && e.objectMode), n && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? _(this, e, "writableHighWaterMark", n) : v(!1), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
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
		let t = this instanceof pc();
		if (!t && !a(N, this)) return new N(e);
		this._writableState = new j(e, this, t), e && (typeof e.write == "function" && (this._write = e.write), typeof e.writev == "function" && (this._writev = e.writev), typeof e.destroy == "function" && (this._destroy = e.destroy), typeof e.final == "function" && (this._final = e.final), typeof e.construct == "function" && (this._construct = e.construct), e.signal && g(e.signal, this)), p.call(this, e), h.construct(this, () => {
			let e = this._writableState;
			e.writing || H(this, e), G(this, e);
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
		t.destroyed && V(t), G(e, t);
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
		return a.corked && (a.corked = 1, this.uncork()), o || (!a.errored && !a.ending ? (a.ending = !0, G(this, a, !0), a.ended = !0) : a.finished ? o = new w("end") : a.destroyed && (o = new C("end"))), typeof r == "function" && (o || a.finished ? n.nextTick(r, o) : a[A].push(r)), this;
	};
	function U(e) {
		return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
	}
	function ee(e, t) {
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
			} else U(t) && (t.prefinished = !0, e.emit("prefinish"), t.pendingcb++, n.nextTick(te, e, t));
		}
		t.sync = !0, t.pendingcb++;
		try {
			e._final(i);
		} catch (e) {
			i(e);
		}
		t.sync = !1;
	}
	function W(e, t) {
		!t.prefinished && !t.finalCalled && (typeof e._final == "function" && !t.destroyed ? (t.finalCalled = !0, ee(e, t)) : (t.prefinished = !0, e.emit("prefinish")));
	}
	function G(e, t, r) {
		U(t) && (W(e, t), t.pendingcb === 0 && (r ? (t.pendingcb++, n.nextTick((e, t) => {
			U(t) ? te(e, t) : t.pendingcb--;
		}, e, t)) : U(t) && (t.pendingcb++, te(e, t))));
	}
	function te(e, t) {
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
	var ne = h.destroy;
	N.prototype.destroy = function(e, t) {
		let r = this._writableState;
		return !r.destroyed && (r.bufferedIndex < r.buffered.length || r[A].length) && n.nextTick(V, r), ne.call(this, e, t), this;
	}, N.prototype._undestroy = h.undestroy, N.prototype._destroy = function(e, t) {
		t(e);
	}, N.prototype[f.captureRejectionSymbol] = function(e) {
		this.destroy(e);
	};
	var re;
	function ie() {
		return re === void 0 && (re = {}), re;
	}
	N.fromWeb = function(e, t) {
		return ie().newStreamWritableFromWritableStream(e, t);
	}, N.toWeb = function(e) {
		return ie().newWritableStreamFromStreamWritable(e);
	};
})), fc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), r = K("buffer"), { isReadable: i, isWritable: a, isIterable: o, isNodeStream: s, isReadableNodeStream: c, isWritableNodeStream: l, isDuplexNodeStream: u, isReadableStream: d, isWritableStream: f } = ec(), p = tc(), { AbortError: m, codes: { ERR_INVALID_ARG_TYPE: h, ERR_INVALID_RETURN_VALUE: g } } = Xs(), { destroyer: _ } = nc(), v = pc(), y = uc(), b = dc(), { createDeferredPromise: x } = Zs(), S = lc(), C = globalThis.Blob || r.Blob, w = C === void 0 ? function(e) {
		return !1;
	} : function(e) {
		return e instanceof C;
	}, T = globalThis.AbortController || (ro(), G(Ya)).AbortController, { FunctionPrototypeCall: E } = Js(), D = class extends v {
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
})), pc = /* @__PURE__ */ H(((e, t) => {
	var { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i, ObjectSetPrototypeOf: a } = Js();
	t.exports = c;
	var o = uc(), s = dc();
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
		return d ||= fc(), d(e, "body");
	};
})), mc = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n, Symbol: r } = Js();
	t.exports = c;
	var { ERR_METHOD_NOT_IMPLEMENTED: i } = Xs().codes, a = pc(), { getHighWaterMark: o } = oc();
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
})), hc = /* @__PURE__ */ H(((e, t) => {
	var { ObjectSetPrototypeOf: n } = Js();
	t.exports = i;
	var r = mc();
	n(i.prototype, r.prototype), n(i, r);
	function i(e) {
		if (!(this instanceof i)) return new i(e);
		r.call(this, e);
	}
	i.prototype._transform = function(e, t, n) {
		n(null, e);
	};
})), gc = /* @__PURE__ */ H(((e, t) => {
	var n = $s(), { ArrayIsArray: r, Promise: i, SymbolAsyncIterator: a, SymbolDispose: o } = Js(), s = tc(), { once: c } = Zs(), l = nc(), u = pc(), { aggregateTwoErrors: d, codes: { ERR_INVALID_ARG_TYPE: f, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: m, ERR_STREAM_DESTROYED: h, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: _ } = Xs(), { validateFunction: v, validateAbortSignal: y } = Qs(), { isIterable: b, isReadable: x, isReadableNodeStream: S, isNodeStream: C, isTransformStream: w, isWebStream: T, isReadableStream: E, isReadableFinished: D } = ec(), O = globalThis.AbortController || (ro(), G(Ya)).AbortController, k, A, j;
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
		A ||= uc(), yield* A.prototype[a].call(e);
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
		j ||= Zs().addAbortListener;
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
				k ||= hc();
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
})), _c = /* @__PURE__ */ H(((e, t) => {
	var { pipeline: n } = gc(), r = pc(), { destroyer: i } = nc(), { isNodeStream: a, isReadable: o, isWritable: s, isWebStream: c, isTransformStream: l, isWritableStream: u, isReadableStream: d } = ec(), { AbortError: f, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: m } } = Xs(), h = tc();
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
})), vc = /* @__PURE__ */ H(((e, t) => {
	var n = globalThis.AbortController || (ro(), G(Ya)).AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i, ERR_MISSING_ARGS: a, ERR_OUT_OF_RANGE: o }, AbortError: s } = Xs(), { validateAbortSignal: c, validateInteger: l, validateObject: u } = Qs(), d = Js().Symbol("kWeak"), f = Js().Symbol("kResistStopPropagation"), { finished: p } = tc(), m = _c(), { addAbortSignalNoValidate: h } = ic(), { isWritable: g, isNodeStream: _ } = ec(), { deprecate: v } = Zs(), { ArrayPrototypePush: y, Boolean: b, MathFloor: x, Number: S, NumberIsNaN: C, Promise: w, PromiseReject: T, PromiseResolve: E, PromisePrototypeThen: D, Symbol: O } = Js(), k = O("kEmpty"), A = O("kEof");
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
			let i = Zs().AbortSignalAny([t?.signal].filter(b)), a = this, o = [], c = { signal: i }, l, u, d = !1, f = 0;
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
	function ee(e, t = void 0) {
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
	function W(e, t = void 0) {
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
		drop: ee,
		filter: R,
		flatMap: H,
		map: M,
		take: W,
		compose: j
	}, t.exports.promiseReturningOperators = {
		every: F,
		forEach: L,
		reduce: B,
		toArray: V,
		some: P,
		find: I
	};
})), yc = /* @__PURE__ */ H(((e, t) => {
	var { ArrayPrototypePop: n, Promise: r } = Js(), { isIterable: i, isNodeStream: a, isWebStream: o } = ec(), { pipelineImpl: s } = gc(), { finished: c } = tc();
	bc();
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
})), bc = /* @__PURE__ */ H(((e, t) => {
	var { Buffer: n } = K("buffer"), { ObjectDefineProperty: r, ObjectKeys: i, ReflectApply: a } = Js(), { promisify: { custom: o } } = Zs(), { streamReturningOperators: s, promiseReturningOperators: c } = vc(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: l } } = Xs(), u = _c(), { setDefaultHighWaterMark: d, getDefaultHighWaterMark: f } = oc(), { pipeline: p } = gc(), { destroyer: m } = nc(), h = tc(), g = yc(), _ = ec(), v = t.exports = rc().Stream;
	v.isDestroyed = _.isDestroyed, v.isDisturbed = _.isDisturbed, v.isErrored = _.isErrored, v.isReadable = _.isReadable, v.isWritable = _.isWritable, v.Readable = uc();
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
	v.Writable = dc(), v.Duplex = pc(), v.Transform = mc(), v.PassThrough = hc(), v.pipeline = p;
	var { addAbortSignal: y } = ic();
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
})), xc = (/* @__PURE__ */ H(((e, t) => {
	var n = K("stream");
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
		let e = bc(), n = yc(), r = e.Readable.destroy;
		t.exports = e.Readable, t.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, t.exports._isUint8Array = e._isUint8Array, t.exports.isDisturbed = e.isDisturbed, t.exports.isErrored = e.isErrored, t.exports.isReadable = e.isReadable, t.exports.Readable = e.Readable, t.exports.Writable = e.Writable, t.exports.Duplex = e.Duplex, t.exports.Transform = e.Transform, t.exports.PassThrough = e.PassThrough, t.exports.addAbortSignal = e.addAbortSignal, t.exports.finished = e.finished, t.exports.destroy = e.destroy, t.exports.destroy = r, t.exports.pipeline = e.pipeline, t.exports.compose = e.compose, Object.defineProperty(e, "promises", {
			configurable: !0,
			enumerable: !0,
			get() {
				return n;
			}
		}), t.exports.Stream = e.Stream;
	}
	t.exports.default = t.exports;
})))(), Sc = /* @__PURE__ */ W(qs(), 1), Cc = class extends xc.Transform {
	constructor(e) {
		super(e), this.checksum = Buffer.allocUnsafe(4), this.checksum.writeInt32BE(0, 0), this.rawSize = 0;
	}
	_transform(e, t, n) {
		e && (this.checksum = Sc.default.buf(e, this.checksum) >>> 0, this.rawSize += e.length), n(null, e);
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
}, wc = class extends P {
	constructor(e) {
		super(e), this.checksum = Buffer.allocUnsafe(4), this.checksum.writeInt32BE(0, 0), this.rawSize = 0, this.compressedSize = 0;
	}
	push(e, t) {
		return e && (this.compressedSize += e.length), super.push(e, t);
	}
	_transform(e, t, n) {
		e && (this.checksum = Sc.default.buf(e, this.checksum) >>> 0, this.rawSize += e.length), super._transform(e, t, n);
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
function Tc(e) {
	return typeof e != "object" && (e = {}), typeof e.zlib != "object" && (e.zlib = {}), typeof e.zlib.level != "number" && (e.zlib.level = 1), e.forceZip64 = !!e.forceZip64, e.forceLocalTime = !!e.forceLocalTime, e;
}
var Ec = class extends Ks {
	constructor(e) {
		let t = Tc(e);
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
		if (r === 0 && (e.setSize(t.length), e.setCompressedSize(t.length), e.setCrc(Sc.default.buf(t) >>> 0)), this._writeLocalFileHeader(e), r === 0) {
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
		var n = e.getMethod() === 8 ? new wc(this.options.zlib) : new Cc(), r = null;
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
		this.isZip64() && (e = ds, t = fs, n = fs), this.write(Ko(cs)), this.write(rs), this.write(rs), this.write(Wo(e)), this.write(Wo(e)), this.write(Ko(t)), this.write(Ko(n));
		var r = this.getComment(), i = Buffer.byteLength(r);
		this.write(Wo(i)), this.write(r);
	}
	_writeCentralDirectoryZip64() {
		this.write(Ko(ls)), this.write(Uo(44)), this.write(Wo(45)), this.write(Wo(45)), this.write(is), this.write(is), this.write(Uo(this._entries.length)), this.write(Uo(this._entries.length)), this.write(Uo(this._archive.centralLength)), this.write(Uo(this._archive.centralOffset)), this.write(Ko(us)), this.write(is), this.write(Uo(this._archive.centralOffset + this._archive.centralLength)), this.write(Ko(1));
	}
	_writeCentralFileHeader(e) {
		var t = e.getGeneralPurposeBit(), n = e.getMethod(), r = e._offsets.file, i = e.getSize(), a = e.getCompressedSize();
		if (e.isZip64() || r > 4294967295) {
			i = fs, a = fs, r = fs, e.setVersionNeededToExtract(45);
			var o = Buffer.concat([
				Wo(1),
				Wo(24),
				Uo(e.getSize()),
				Uo(e.getCompressedSize()),
				Uo(e._offsets.file)
			], 28);
			e.setExtra(o);
		}
		this.write(Ko(ss)), this.write(Wo(e.getPlatform() << 8 | 45)), this.write(Wo(e.getVersionNeededToExtract())), this.write(t.encode()), this.write(Wo(n)), this.write(Ko(e.getTimeDos())), this.write(Ko(e.getCrc())), this.write(Ko(a)), this.write(Ko(i));
		var s = e.getName(), c = e.getComment(), l = e.getCentralDirectoryExtra();
		t.usesUTF8ForNames() && (s = Buffer.from(s), c = Buffer.from(c)), this.write(Wo(s.length)), this.write(Wo(l.length)), this.write(Wo(c.length)), this.write(rs), this.write(Wo(e.getInternalAttributes())), this.write(Ko(e.getExternalAttributes())), this.write(Ko(r)), this.write(s), this.write(l), this.write(c);
	}
	_writeDataDescriptor(e) {
		this.write(Ko(os)), this.write(Ko(e.getCrc())), e.isZip64() ? (this.write(Uo(e.getCompressedSize())), this.write(Uo(e.getSize()))) : (this.write(Ko(e.getCompressedSize())), this.write(Ko(e.getSize())));
	}
	_writeLocalFileHeader(e) {
		var t = e.getGeneralPurposeBit(), n = e.getMethod(), r = e.getName(), i = e.getLocalFileDataExtra();
		e.isZip64() && (t.useDataDescriptor(!0), e.setVersionNeededToExtract(45)), t.usesUTF8ForNames() && (r = Buffer.from(r)), e._offsets.file = this.offset, this.write(Ko(as)), this.write(Wo(e.getVersionNeededToExtract())), this.write(t.encode()), this.write(Wo(n)), this.write(Ko(e.getTimeDos())), e._offsets.data = this.offset, t.usesDataDescriptor() ? (this.write(is), this.write(is), this.write(is)) : (this.write(Ko(e.getCrc())), this.write(Ko(e.getCompressedSize())), this.write(Ko(e.getSize()))), this.write(Wo(r.length)), this.write(Wo(i.length)), this.write(r), this.write(i), e._offsets.contents = this.offset;
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
function Dc(e) {
	return e ||= /* @__PURE__ */ new Date(), e = e instanceof Date ? e : typeof e == "string" ? new Date(e) : /* @__PURE__ */ new Date(), e;
}
function Oc(e) {
	return (0, jo.default)(e, !1).replace(/^\w+:/, "").replace(/^(\.\.\/|\/)+/, "");
}
//#endregion
//#region node_modules/zip-stream/index.js
var kc = class extends Ec {
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
		return e.name && (e.name = Oc(e.name), !n && e.name.slice(-1) === "/" ? (t = !0, e.type = "directory") : t && (e.name += "/")), (t || n) && (e.store = !0), e.date = Dc(e.date), e;
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
		let r = new gs(t.name);
		return r.setTime(t.date, this.options.forceLocalTime), t.namePrependSlash && r.setName(t.name, !0), t.store && r.setMethod(0), t.comment.length > 0 && r.setComment(t.comment), t.type === "symlink" && typeof t.mode != "number" && (t.mode = 40960), typeof t.mode == "number" && (t.type === "symlink" && (t.mode |= 40960), r.setUnixMode(t.mode)), t.type === "symlink" && typeof t.linkname == "string" && (e = Buffer.from(t.linkname)), super.entry(r, e, n);
	}
	finalize() {
		this.finish();
	}
}, Ac = class {
	constructor(e) {
		e = this.options = {
			comment: "",
			forceUTC: !1,
			namePrependSlash: !1,
			store: !1,
			...e
		}, this.engine = new kc(e);
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
}, jc = /* @__PURE__ */ H(((e, t) => {
	t.exports = K("events");
})), Mc = /* @__PURE__ */ H(((e, t) => {
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
})), Nc = /* @__PURE__ */ H(((e, t) => {
	var n = Mc();
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
})), Pc = /* @__PURE__ */ H(((e, t) => {
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
})), Fc = /* @__PURE__ */ H(((e, t) => {
	var n = Pc();
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
})), Ic = /* @__PURE__ */ H(((e, t) => {
	var n = Pc();
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
})), Lc = /* @__PURE__ */ H(((e, t) => {
	var n = Fc(), r = Ic();
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
})), Rc = /* @__PURE__ */ H(((e, t) => {
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
})), zc = /* @__PURE__ */ H(((e, t) => {
	var { EventEmitter: n } = jc(), r = Nc(), i = Lc(), a = Rc(), o = typeof queueMicrotask > "u" ? (e) => global.process.nextTick(e) : queueMicrotask, s = 1, c = 2, l = 4, u = 8, d = 536870910, f = 536870909, p = 32, m = 64, h = 128, g = 256, _ = 512, v = 1024, y = 2048, b = 4096, x = 8192, S = 16384, C = 32768, w = 131072, T = 768, E = 65552, D = 80, O = 4224, k = 131328, A = 536870895, j = 536805311, M = 536805375, N = 536870655, P = 536862591, F = 536869887, I = 536870143, L = 536838143, R = 536870879, z = 536739839, B = 536739583, V = 1 << 18, H = 2 << 18, U = 4 << 18, ee = 8 << 18, W = 16 << 18, G = 32 << 18, K = 64 << 18, te = 128 << 18, ne = 256 << 18, re = 512 << 18, ie = 1024 << 18, ae = 469499903, oe = 535822335, se = 402391039, ce = 532676607, le = 534773759, ue = 503316479, de = 536346623, q = 268435455, fe = 262160, J = 536608751, pe = 8404992, Y = 14, X = 15, me = 8405006, he = 535822271, ge = 33587200, _e = 33587215, ve = 17423, ye = 16527, be = 1167, xe = 12431, Se = 214047, Ce = 17422, we = 32879, Te = 32769, Ee = 142606351, De = 6291456, Oe = 2359296, ke = 6553615, Ae = 270794767, je = 1310720, Me = 67371008, Ne = 144965647, Pe = 146800654, Fe = 35127311, Ie = 142606350, Le = Symbol.asyncIterator || Symbol("asyncIterator"), Re = class {
		constructor(e, { highWaterMark: t = 16384, map: n = null, mapWritable: i, byteLength: a, byteLengthWritable: o } = {}) {
			this.stream = e, this.queue = new r(), this.highWaterMark = t, this.buffered = 0, this.error = null, this.pipeline = null, this.drains = null, this.byteLength = o || a || yt, this.map = i || n, this.afterWrite = Ge.bind(this), this.afterUpdateNextTick = Je.bind(this);
		}
		get ending() {
			return (this.stream._duplexState & re) !== 0;
		}
		get ended() {
			return (this.stream._duplexState & G) !== 0;
		}
		push(e) {
			return (this.stream._duplexState & Ie) === 0 ? (this.map !== null && (e = this.map(e)), this.buffered += this.byteLength(e), this.queue.push(e), this.buffered < this.highWaterMark ? (this.stream._duplexState |= ee, !0) : (this.stream._duplexState |= De, !1)) : !1;
		}
		shift() {
			let e = this.queue.shift();
			return this.buffered -= this.byteLength(e), this.buffered === 0 && (this.stream._duplexState &= le), e;
		}
		end(e) {
			typeof e == "function" ? this.stream.once("finish", e) : e != null && this.push(e), this.stream._duplexState = (this.stream._duplexState | re) & oe;
		}
		autoBatch(e, t) {
			let n = [], r = this.stream;
			for (n.push(e); (r._duplexState & Ae) === Oe;) n.push(r._writableState.shift());
			if ((r._duplexState & X) !== 0) return t(null);
			r._writev(n, t);
		}
		update() {
			let e = this.stream;
			e._duplexState |= H;
			do {
				for (; (e._duplexState & Ae) === ee;) {
					let t = this.shift();
					e._duplexState |= Me, e._write(t, this.afterWrite);
				}
				(e._duplexState & je) === 0 && this.updateNonPrimary();
			} while (this.continueUpdate() === !0);
			e._duplexState &= de;
		}
		updateNonPrimary() {
			let e = this.stream;
			if ((e._duplexState & Ne) === re) {
				e._duplexState |= V, e._final(Ue.bind(this));
				return;
			}
			if ((e._duplexState & Y) === l) {
				(e._duplexState & ge) === 0 && (e._duplexState |= fe, e._destroy(We.bind(this)));
				return;
			}
			(e._duplexState & _e) === s && (e._duplexState = (e._duplexState | fe) & d, e._open(Xe.bind(this)));
		}
		continueUpdate() {
			return (this.stream._duplexState & te) === 0 ? !1 : (this.stream._duplexState &= ue, !0);
		}
		updateCallback() {
			(this.stream._duplexState & Fe) === U ? this.update() : this.updateNextTick();
		}
		updateNextTick() {
			(this.stream._duplexState & te) === 0 && (this.stream._duplexState |= te, (this.stream._duplexState & H) === 0 && o(this.afterUpdateNextTick));
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
			if ((e._duplexState & be) === v && (e._duplexState = (e._duplexState | S) & F, e.emit("end"), (e._duplexState & me) === pe && (e._duplexState |= l), this.pipeTo !== null && this.pipeTo.end()), (e._duplexState & Y) === l) {
				(e._duplexState & ge) === 0 && (e._duplexState |= fe, e._destroy(We.bind(this)));
				return;
			}
			(e._duplexState & _e) === s && (e._duplexState = (e._duplexState | fe) & d, e._open(Xe.bind(this)));
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
		e && t.destroy(e), (t._duplexState & Y) === 0 && (t._duplexState |= G, t.emit("finish")), (t._duplexState & me) === pe && (t._duplexState |= l), t._duplexState &= se, (t._duplexState & H) === 0 ? this.update() : this.updateNextTick();
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
		e && t.destroy(e), t._duplexState &= ae, this.drains !== null && Ye(this.drains), (t._duplexState & ke) === W && (t._duplexState &= ce, (t._duplexState & K) === K && t.emit("drain")), this.updateCallback();
	}
	function Ke(e) {
		e && this.stream.destroy(e), this.stream._duplexState &= A, this.readAhead === !1 && (this.stream._duplexState & g) === 0 && (this.stream._duplexState &= z), this.updateCallback();
	}
	function qe() {
		(this.stream._duplexState & p) === 0 && (this.stream._duplexState &= L, this.update());
	}
	function Je() {
		(this.stream._duplexState & H) === 0 && (this.stream._duplexState &= ue, this.update());
	}
	function Ye(e) {
		for (let t = 0; t < e.length; t++) --e[t].writes === 0 && (e.shift().resolve(!0), t--);
	}
	function Xe(e) {
		let t = this.stream;
		e && t.destroy(e), (t._duplexState & l) === 0 && ((t._duplexState & ve) === 0 && (t._duplexState |= m), (t._duplexState & Ee) === 0 && (t._duplexState |= U), t.emit("open")), t._duplexState &= J, t._writableState !== null && t._writableState.updateCallback(), t._readableState !== null && t._readableState.updateCallback();
	}
	function Ze(e, t) {
		t != null && this.push(t), this._writableState.afterWrite(e);
	}
	function Qe(e) {
		this._readableState !== null && (e === "data" && (this._duplexState |= 133376, this._readableState.updateNextTick()), e === "readable" && (this._duplexState |= b, this._readableState.updateNextTick())), this._writableState !== null && e === "drain" && (this._duplexState |= K, this._writableState.updateNextTick());
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
			return (this._duplexState & Y) !== 0;
		}
		destroy(e) {
			(this._duplexState & Y) === 0 && (e ||= a.STREAM_DESTROYED(), this._duplexState = (this._duplexState | l) & he, this._readableState !== null && (this._readableState.highWaterMark = 0, this._readableState.error = e), this._writableState !== null && (this._writableState.highWaterMark = 0, this._writableState.error = e), this._duplexState |= c, this._predestroy(), this._duplexState &= f, this._readableState !== null && this._readableState.updateNextTick(), this._writableState !== null && this._writableState.updateNextTick());
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
			this._duplexState |= ie;
		}
		uncork() {
			this._duplexState &= q, this._writableState.updateNextTick();
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
			let t = e._writableState, n = (St(e) ? Math.min(1, t.queue.length) : t.queue.length) + (e._duplexState & ne ? 1 : 0);
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
			this._duplexState |= ie;
		}
		uncork() {
			this._duplexState &= q, this._writableState.updateNextTick();
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
})), Bc = /* @__PURE__ */ H(((e) => {
	var t = Pc(), n = "0000000000000000000", r = "7777777777777777777", i = 48, a = t.from([
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
})), Vc = /* @__PURE__ */ H(((e, t) => {
	var { Writable: n, Readable: r, getStreamError: i } = zc(), a = Nc(), o = Pc(), s = Bc(), c = o.alloc(0), l = 4 * 1024 * 1024, u = class {
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
})), Hc = /* @__PURE__ */ H(((e, t) => {
	var n = {
		S_IFMT: 61440,
		S_IFDIR: 16384,
		S_IFCHR: 8192,
		S_IFBLK: 24576,
		S_IFIFO: 4096,
		S_IFLNK: 40960
	};
	try {
		t.exports = K("fs").constants || n;
	} catch {
		t.exports = n;
	}
})), Uc = /* @__PURE__ */ H(((e, t) => {
	var { Readable: n, Writable: r, getStreamError: i } = zc(), a = Pc(), o = Hc(), s = Bc(), c = 493, l = 420, u = a.alloc(1024), d = class extends r {
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
	e.extract = Vc(), e.pack = Uc();
})))();
//#endregion
//#region node_modules/archiver/node_modules/buffer-crc32/dist/index.mjs
var Wc = new Int32Array([
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
function Gc(e) {
	if (Buffer.isBuffer(e)) return e;
	if (typeof e == "number") return Buffer.alloc(e);
	if (typeof e == "string") return Buffer.from(e);
	throw Error("input must be buffer, number, or string, received " + typeof e);
}
function Kc(e) {
	let t = Gc(4);
	return t.writeInt32BE(e, 0), t;
}
function qc(e, t) {
	e = Gc(e), Buffer.isBuffer(t) && (t = t.readUInt32BE(0));
	let n = ~~t ^ -1;
	for (var r = 0; r < e.length; r++) n = Wc[(n ^ e[r]) & 255] ^ n >>> 8;
	return n ^ -1;
}
function Jc() {
	return Kc(qc.apply(null, arguments));
}
Jc.signed = function() {
	return qc.apply(null, arguments);
}, Jc.unsigned = function() {
	return qc.apply(null, arguments) >>> 0;
};
//#endregion
//#region node_modules/archiver/index.js
var Yc = class extends zo {
	constructor(e) {
		super(e), this._format = "zip", this._module = new Ac(e), this._supportsDirectory = !0, this._supportsSymlink = !0, this._modulePipe();
	}
}, Xc = e(import.meta.url)("adm-zip"), Zc = 1, Qc = "inventory.db";
function $c(e, t) {
	let n = T.resolve(e) + T.sep, r = T.resolve(t);
	if (r !== T.resolve(e) && !r.startsWith(n)) throw Error("The portable backup contains an unsafe file path.");
}
function el(e, t, n) {
	return new Promise((r, i) => {
		let a = w.createWriteStream(e, { flags: "wx" }), o = new Yc({ zlib: { level: 9 } }), s = (e) => i(e);
		a.on("close", r), a.on("error", s), o.on("error", s), o.pipe(a);
		for (let e of t) o.append(e.content, { name: e.name });
		n && o.directory(n.path, n.name), o.finalize().catch(i);
	});
}
async function tl(e, t, n, r) {
	if (!e.open) throw Error("The active database is not open.");
	let i = T.resolve(n);
	if (T.resolve(e.name) === i) throw Error("Choose a different file from the active database.");
	let a = w.mkdtempSync(T.join(t, ".stockwise-backup-")), o = T.join(a, Qc), s = `${i}.${Date.now()}.tmp`, c = T.join(t, "images");
	try {
		await e.backup(o);
		let t = {
			format: "stockwise-portable-backup",
			formatVersion: Zc,
			appVersion: r || null,
			schemaVersion: e.pragma("user_version", { simple: !0 }),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			includesImages: w.existsSync(c)
		};
		return await el(s, [{
			name: "backup-manifest.json",
			content: `${JSON.stringify(t, null, 2)}\n`
		}, {
			name: Qc,
			content: w.readFileSync(o)
		}], w.existsSync(c) ? {
			path: c,
			name: "images"
		} : null), w.renameSync(s, i), i;
	} catch (e) {
		throw w.rmSync(s, { force: !0 }), Error("Could not create the portable StockWise backup.", { cause: e });
	} finally {
		w.rmSync(a, {
			recursive: !0,
			force: !0
		});
	}
}
function nl(e, t) {
	let n = T.resolve(e), r = T.resolve(t);
	w.mkdirSync(r, { recursive: !0 });
	let i = T.join(r, "archive");
	w.mkdirSync(i);
	try {
		let e = new Xc(n);
		for (let t of e.getEntries()) $c(i, T.join(i, t.entryName));
		e.extractAllTo(i, !0);
		let t = T.join(i, "backup-manifest.json");
		if (!w.existsSync(t)) throw Error("This file is missing the StockWise backup manifest.");
		let r = JSON.parse(w.readFileSync(t, "utf8"));
		if (r.format !== "stockwise-portable-backup" || r.formatVersion !== Zc) throw Error("This portable backup format is not supported by this version of StockWise.");
		let a = T.join(i, Qc);
		if (!w.existsSync(a)) throw Error("This portable backup does not contain a database.");
		let o = T.join(i, "images");
		return {
			databasePath: a,
			imagesPath: w.existsSync(o) ? o : null,
			manifest: r
		};
	} catch (e) {
		throw w.rmSync(r, {
			recursive: !0,
			force: !0
		}), Error(e.message || "Could not read the portable StockWise backup.", { cause: e });
	}
}
//#endregion
//#region src/Backend/server.js
var rl = S(import.meta.url)("xlsx"), il = d.dirname(l(import.meta.url)), al = d.join(r.getPath("userData"), "settings.json"), Q = Le(al), ol = r.getPath("userData");
function sl(e) {
	return Q.profiles.find((t) => t.id === e) ?? null;
}
function cl(e) {
	if (e === "user") return ze({
		config: Q,
		isPackaged: r.isPackaged,
		userDataPath: ol,
		developmentPath: d.join(il, "../", "Database")
	});
	let t = sl(e);
	if (!t) throw Error("The selected profile does not exist.");
	return d.resolve(t.dataDirectory || d.join(ol, "profiles", t.id));
}
var ll = cl(Q.activeProfileId), ul = d.join(ll, "inventory.db"), $;
function dl() {
	g.mkdirSync(ll, { recursive: !0 }), $ = new pe.default(ul), xe($);
}
dl();
function fl(e) {
	return {
		id: e.id,
		username: e.username,
		isDefault: !1
	};
}
function pl(e) {
	return lt($, e);
}
function ml(e, t, n) {
	return kt($, e, t, n);
}
function hl(e, t) {
	return tl($, ll, e, t);
}
function gl(e) {
	return Ve($, e);
}
function _l() {
	let e = { ...Q };
	return delete e.defaultProfileCredentials, delete e.profiles, {
		...e,
		dataDirectory: ll,
		activeProfileId: Q.activeProfileId,
		defaultProfilePasswordSet: !!Q.defaultProfileCredentials,
		profiles: [{
			id: "user",
			username: "user",
			isDefault: !0
		}, ...Q.profiles.map(fl)]
	};
}
function vl(e) {
	if (Q.defaultProfileCredentials) throw Error("The default profile password has already been set.");
	return Q = Re(al, {
		...Q,
		defaultProfileCredentials: Ee(e)
	}), _l();
}
function yl(e, t) {
	let n = Te(e);
	if (n.toLocaleLowerCase() === "user" || Q.profiles.some((e) => e.username.toLocaleLowerCase() === n.toLocaleLowerCase())) throw Error(`The username "${n}" is already in use.`);
	let r = {
		id: C(),
		username: n,
		...Ee(t),
		dataDirectory: null
	}, i = d.join(ol, "profiles", r.id);
	g.mkdirSync(i, { recursive: !0 });
	let a = d.join(i, "inventory.db");
	try {
		let e = new pe.default(a);
		try {
			xe(e);
		} finally {
			e.close();
		}
		return Q = Re(al, {
			...Q,
			profiles: [...Q.profiles, r]
		}), _l();
	} catch (e) {
		throw g.rmSync(i, {
			recursive: !0,
			force: !0
		}), e;
	}
}
function bl(e, t, n) {
	let r = Te(t), i;
	if (e === "user") {
		if (r.toLocaleLowerCase() !== "user" || !Q.defaultProfileCredentials || !De(Q.defaultProfileCredentials, n)) throw Error("The username or password is incorrect.");
	} else if (i = sl(e), !i || i.username.toLocaleLowerCase() !== r.toLocaleLowerCase() || !De(i, n)) throw Error("The username or password is incorrect.");
	let a = cl(e), o = d.join(a, "inventory.db");
	if (e === Q.activeProfileId) return _l();
	g.mkdirSync(a, { recursive: !0 });
	let s = new pe.default(o);
	try {
		xe(s);
		let t = Re(al, {
			...Q,
			activeProfileId: e
		}), n = $;
		return $ = s, ll = a, ul = o, Q = t, n.close(), _l();
	} catch (e) {
		throw s.open && s !== $ && s.close(), e;
	}
}
function xl(e) {
	return Q = Re(al, {
		...Q,
		defaultPaymentMethod: e
	}), _l();
}
function Sl(e) {
	return Q = Re(al, {
		...Q,
		invoiceDefaults: e
	}), _l();
}
function Cl(e) {
	return Q = Re(al, {
		...Q,
		inventoryAddItemMode: e
	}), _l();
}
function wl(e, t) {
	return Q = Re(al, {
		...Q,
		appearanceTheme: e,
		appearanceMode: t
	}), _l();
}
async function Tl(e) {
	if (typeof e != "string" || !e.trim()) throw Error("A data directory is required.");
	let t = d.resolve(e);
	if (t === ll) throw Error("Choose a different folder from the current data directory.");
	await Be($, ll, t);
	let n;
	try {
		n = Q.activeProfileId === "user" ? Re(al, {
			...Q,
			dataDirectory: t
		}) : Re(al, {
			...Q,
			profiles: Q.profiles.map((e) => e.id === Q.activeProfileId ? {
				...e,
				dataDirectory: t
			} : e)
		});
	} catch (e) {
		try {
			g.rmSync(d.join(t, "inventory.db"), { force: !0 }), g.rmSync(d.join(t, "images"), {
				recursive: !0,
				force: !0
			});
		} catch (t) {
			throw AggregateError([e, t], "Could not save the new data folder setting or clean up its copied files.", { cause: t });
		}
		throw e;
	}
	return Q = n, _l();
}
async function El(e) {
	let t = d.resolve(e);
	if (t === d.resolve(ul)) throw Error("Choose a backup file, not the active database.");
	let n = g.mkdtempSync(d.join(d.dirname(ul), ".stockwise-restore-")), r = d.join(n, "restored.db"), i = d.join(n, "previous.db"), a = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${C()}.db`, o = d.join(d.dirname(ul), a);
	try {
		await ut(t, r), await lt($, o), $.close();
		try {
			dt(ul, r, i);
		} catch (e) {
			try {
				dl();
			} catch (t) {
				throw AggregateError([e, t], "Restore failed and the active database could not be reopened.", { cause: t });
			}
			throw e;
		}
		return { recoveryBackupPath: o };
	} finally {
		g.rmSync(n, {
			recursive: !0,
			force: !0
		});
	}
}
async function Dl(e) {
	let t = g.mkdtempSync(d.join(d.dirname(ul), ".stockwise-portable-restore-")), n = d.join(t, "restored.db"), r = d.join(t, "images"), i = d.join(t, "previous.db"), a = d.join(t, "previous-images"), o = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${C()}.db`, s = d.join(d.dirname(ul), o), c = !1;
	try {
		let o = nl(e, t);
		await ut(o.databasePath, n), o.imagesPath && g.cpSync(o.imagesPath, r, { recursive: !0 }), await lt($, s), $.close();
		try {
			g.renameSync(ul, i);
			let e = d.join(ll, "images");
			g.existsSync(e) && (g.renameSync(e, a), c = !0), g.renameSync(n, ul), g.existsSync(r) && g.renameSync(r, e), dl();
		} catch (e) {
			throw $?.open && $.close(), g.existsSync(ul) && g.rmSync(ul, { force: !0 }), g.existsSync(i) && g.renameSync(i, ul), c && g.existsSync(a) && (g.rmSync(d.join(ll, "images"), {
				recursive: !0,
				force: !0
			}), g.renameSync(a, d.join(ll, "images"))), dl(), e;
		}
		return {
			recoveryBackupPath: s,
			includesImages: !!o.imagesPath
		};
	} finally {
		g.rmSync(t, {
			recursive: !0,
			force: !0
		});
	}
}
function Ol(e) {
	return He($, e);
}
function kl() {
	let e = $.prepare("SELECT * FROM products").all();
	for (let t of e) {
		t.variants = $.prepare("SELECT * FROM variants WHERE product_id = ?").all(t.id);
		let e = $.prepare("SELECT * FROM bases WHERE product_id = ?").all(t.id);
		for (let n of e) {
			let e = $.prepare("SELECT variant_id, stock FROM base_stock WHERE base_id = ?").all(n.id);
			n.stockMap = {};
			for (let t of e) n.stockMap[t.variant_id] = t.stock;
			n.stocks = t.variants.map((e) => n.stockMap[e.id] ?? 0);
		}
		t.bases = e;
	}
	return e;
}
function Al() {
	return et($, Q.invoiceDefaults?.invoiceNumber);
}
function jl(e, t) {
	return $e($, e, t);
}
function Ml(e) {
	We($, e);
}
function Nl(e, t) {
	Ue($, e, t);
}
function Pl(e) {
	return $.prepare("SELECT * FROM products WHERE name = ?").get(e);
}
function Fl(e, t) {
	return $.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(e, t);
}
function Il(e, t) {
	return $.prepare("\n    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)\n    VALUES (?, ?, ?, ?, ?)\n  ").run(e, t.bucket_size, t.landing, t.sales, t.mp).lastInsertRowid;
}
function Ll(e, t) {
	return $.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(e, t).lastInsertRowid;
}
function Rl(e, t) {
	return $.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(e, t);
}
function zl(e, t, n) {
	$.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(e, t, n);
}
function Bl(e) {
	let t = d.basename(e), n = d.join(ll, "images", "product-images"), r = d.join(n, t);
	return g.existsSync(n) || g.mkdirSync(n, { recursive: !0 }), g.existsSync(r) || g.copyFileSync(e, r), `images/product-images/${t}`;
}
function Vl(e) {
	return e ? d.join(ll, e) : null;
}
function Hl(e) {
	let t = ge(e);
	if ($.prepare("SELECT 1 FROM customers WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(t.name)) throw Error(`Customer "${t.name}" already exists.`);
	return $.prepare("\n    INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)\n  ").run(t.name, t.phone, t.address, t.notes).lastInsertRowid;
}
function Ul(e, t) {
	if (!e) throw Error("Bill id is required.");
	let n = X(t?.type ?? "adjustment"), r = X(t?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), i = Number(t?.amount ?? 0), a = X(t?.paymentMethod ?? ""), o = X(t?.note ?? "");
	$.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(e, n, r, i, a, o);
}
function Wl(e) {
	return $.prepare("SELECT * FROM bill_activity WHERE bill_id = ? ORDER BY date ASC, id ASC").all(e);
}
function Gl(e, t) {
	return Je($, e, t);
}
function Kl() {
	let e = $.prepare("SELECT * FROM customers").all();
	for (let t of e) {
		let e = $.prepare("SELECT * FROM bills WHERE customer_id = ?").all(t.id);
		for (let t of e) t.products = $.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
		t.bills = e, t.totalDue = e.reduce((e, t) => e + t.amount_due, 0);
	}
	return e;
}
function ql(e) {
	if (!$.prepare("SELECT id FROM customers WHERE id = ?").get(e)) throw Error("Customer not found.");
	$.transaction(() => {
		let t = $.prepare("SELECT id FROM bills WHERE customer_id = ?").all(e);
		for (let e of t) $.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e.id);
		$.prepare("DELETE FROM bills WHERE customer_id = ?").run(e), $.prepare("DELETE FROM customers WHERE id = ?").run(e);
	})();
}
function Jl(e, t) {
	return $.transaction(() => {
		let n = Hl(e);
		return Gl(n, t), n;
	})();
}
function Yl(e) {
	if (!$.prepare("SELECT id FROM bills WHERE id = ?").get(e)) throw Error("Bill not found.");
	$.transaction(() => {
		let t = $.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
		for (let e of t) Ge($, e.product_name, e.base, e.bucket_size, e.quantity);
		$.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e), $.prepare("DELETE FROM bills WHERE id = ?").run(e);
	})();
}
function Xl(e, t) {
	let n = ge(t);
	if (!$.prepare("SELECT id FROM customers WHERE id = ?").get(e)) throw Error("Customer not found.");
	$.prepare("\n    UPDATE customers SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?\n  ").run(n.name, n.phone, n.address, n.notes, e);
}
function Zl(e, t) {
	let n = $.prepare("SELECT * FROM bills WHERE id = ?").get(e);
	if (!n) throw Error("Bill not found.");
	let r = _e(n.customer_id, t);
	$.transaction(() => {
		let t = $.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
		for (let e of t) Ge($, e.product_name, e.base, e.bucket_size, e.quantity);
		let i = Number(n.total_purchased || 0), a = Number(n.amount_paid || 0), o = r.totalPurchased - i, s = r.amountPaid - a;
		$.prepare("\n      UPDATE bills SET\n        date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?,\n        status = ?, bill_type = ?, pan_number = ?, bill_number = ?, invoice_data = ?\n      WHERE id = ?\n    ").run(r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status, r.billType, r.panNumber, r.billNumber, r.invoiceData ? JSON.stringify(r.invoiceData) : null, e), $.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e);
		for (let t of r.products) {
			let n = du(t.productName, t.bucketSize);
			$.prepare("\n      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ").run(e, t.productName, t.base, t.bucketSize, t.quantity, t.priceAtSale, n), Ge($, t.productName, t.base, t.bucketSize, -t.quantity);
		}
		Math.abs(o) > .01 && Ul(e, {
			type: "adjustment",
			date: r.date,
			amount: o,
			paymentMethod: r.paymentMethod,
			note: o >= 0 ? "Additional products added to bill" : "Bill value reduced"
		}), Math.abs(s) > .01 && Ul(e, {
			type: "payment",
			date: r.date,
			amount: s,
			paymentMethod: r.paymentMethod,
			note: s >= 0 ? "Customer payment recorded" : "Payment adjusted"
		});
	})();
}
function Ql(e, t, n, r) {
	$.transaction(() => {
		Xl(e, t), Zl(n, r);
	})();
}
function $l(e) {
	let t = ve(e);
	return $.prepare("INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)").run(t.date, t.nameOfExpense, t.amountOfExpense, t.typeOfExpense).lastInsertRowid;
}
function eu() {
	return $.prepare("SELECT * FROM expenses ORDER BY date DESC").all().map((e) => ({
		id: e.id,
		date: e.date,
		nameOfExpense: e.label,
		typeOfExpense: e.type,
		amountOfExpense: e.amount
	}));
}
function tu(e) {
	rt($, e, ou);
}
function nu() {
	let e = $.prepare("SELECT * FROM bills").all(), t = {};
	return e.map((e) => {
		let n = $.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id), r = $.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		if (!(e.customer_id in t)) {
			let n = $.prepare("SELECT amount_due FROM bills WHERE customer_id = ?").all(e.customer_id);
			t[e.customer_id] = n.reduce((e, t) => e + t.amount_due, 0);
		}
		let i = r.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), a = e.total_purchased, o = e.invoice_data ? JSON.parse(e.invoice_data) : null, s = a - (Number(o?.tax) || 0) - i;
		return {
			id: e.id,
			billType: e.bill_type || "default",
			panNumber: e.pan_number || "",
			billNumber: e.bill_number || "",
			invoiceData: o,
			customer: {
				id: n.id,
				name: n.name,
				phone: n.phone,
				address: n.address,
				date: e.date,
				paymentMethod: e.payment_method,
				totalPurchased: e.total_purchased,
				amountPaid: e.amount_paid,
				amountDue: e.amount_due,
				totalDue: t[e.customer_id],
				status: e.status
			},
			purchasedProducts: r.map((e) => ({
				name: e.product_name,
				base: e.base,
				bucketSize: e.bucket_size,
				quantity: e.quantity,
				priceAtSale: e.price_at_sale,
				costPrice: e.cost_price
			})),
			sellingPrice: a,
			costPrice: i,
			netGain: s
		};
	});
}
function ru(e) {
	let t = /* @__PURE__ */ new Date(), n;
	if (e === "yearly") n = `${t.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = t.getDay(), r = t.getDate() - e + (e === 0 ? -6 : 1);
		n = new Date(t.getFullYear(), t.getMonth(), r).toISOString().slice(0, 10);
	} else n = e === "all" ? "0000-01-01" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-01`;
	let r = $.prepare("SELECT * FROM bills WHERE date >= ?").all(n), i = 0, a = 0, o = 0, s = 0, c = {};
	for (let e of r) {
		let t = $.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		i += e.total_purchased;
		let n = e.invoice_data ? JSON.parse(e.invoice_data) : null;
		o += Number(n?.tax) || 0, a += t.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), s += e.amount_due;
		for (let e of t) c[e.product_name] = (c[e.product_name] || 0) + e.quantity;
	}
	let l = i - o - a, u = $.prepare("SELECT * FROM expenses WHERE date >= ?").all(n), d = u.reduce((e, t) => e + t.amount, 0), f = "-", p = 0;
	for (let [e, t] of Object.entries(c)) t > p && (p = t, f = e);
	let m = r.map((e) => ({
		label: `Sale #${e.id}`,
		date: e.date,
		amount: e.total_purchased
	})), h = u.map((e) => ({
		label: e.label,
		date: e.date,
		amount: -e.amount
	})), g = [...m, ...h].sort((e, t) => new Date(t.date) - new Date(e.date)).slice(0, 8);
	return {
		totalEarned: i,
		totalExpenses: d,
		totalDue: s,
		totalProfit: l,
		netPosition: l - d,
		totalSales: r.length,
		profitPerSale: r.length > 0 ? l / r.length : 0,
		topCategory: f,
		recentActivity: g
	};
}
function iu(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = $.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = $.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		for (let e of t) a[e.product_name] || (a[e.product_name] = {
			units: 0,
			revenue: 0
		}), a[e.product_name].units += e.quantity, a[e.product_name].revenue += e.price_at_sale * e.quantity;
	}
	return Object.entries(a).map(([e, t]) => ({
		name: e,
		units: t.units,
		revenue: t.revenue
	})).sort((e, t) => t.revenue - e.revenue).slice(0, t);
}
function au(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = $.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = $.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id);
		t && (a[t.id] || (a[t.id] = {
			name: t.name,
			orders: 0,
			spend: 0
		}), a[t.id].orders += 1, a[t.id].spend += e.total_purchased);
	}
	return Object.values(a).sort((e, t) => t.spend - e.spend).slice(0, t);
}
function ou(e) {
	Ge($, e.product_name, e.base, e.bucket_size, -e.quantity);
}
function su(e, t) {
	return tt($, e, t);
}
function cu(e, t, n) {
	return nt($, e, t, n);
}
function lu(e, t) {
	let n = ve(t);
	if (!$.prepare("SELECT id FROM expenses WHERE id = ?").get(e)) throw Error("Expense not found.");
	$.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?").run(n.date, n.nameOfExpense, n.amountOfExpense, n.typeOfExpense, e);
}
function uu(e) {
	let t = $.prepare("SELECT * FROM expenses WHERE id = ?").get(e);
	if (!t) return null;
	let n = $.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(e);
	return {
		id: t.id,
		date: t.date,
		nameOfExpense: t.label,
		typeOfExpense: t.type,
		amountOfExpense: t.amount,
		invoiceData: t.invoice_data ? JSON.parse(t.invoice_data) : null,
		items: n.map((e) => ({
			productName: e.product_name,
			base: e.base,
			bucketSize: e.bucket_size,
			quantity: e.quantity,
			costPrice: e.cost_price
		}))
	};
}
function du(e, t) {
	let n = $.prepare("SELECT * FROM products WHERE name = ?").get(e);
	if (!n) return 0;
	let r = $.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(n.id, t);
	return r ? r.landing : 0;
}
function fu(e, t) {
	$.prepare("DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?").run(e, t);
}
function pu(e) {
	it($, e);
}
function mu(e) {
	if (typeof e != "string" || e.trim() === "") throw Error("Choose an Excel file to import.");
	let t;
	try {
		t = rl.readFile(e);
	} catch (e) {
		throw Error("Could not read the selected Excel file. Check that it is a valid, accessible workbook.", { cause: e });
	}
	let n = t.Sheets["JESTH- 2083"];
	if (!n) throw Error("Sheet \"JESTH- 2083\" not found in this file.");
	let r = rl.utils.sheet_to_json(n, {
		header: 1,
		range: 1
	}), i = /^([A-Za-z]+)((?:\d+)(?:\/\d+)*)$/, a = /^([A-Za-z]+?)(I{1,3}|IV)$/, o = new Set([
		1,
		4,
		10,
		20
	]);
	function s(e) {
		return e.split(" ").map((e) => e && e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
	}
	function c(e) {
		let t = parseFloat(e);
		return isNaN(t) ? null : t;
	}
	function l(e) {
		if (!e) return [null, []];
		let t = String(e).trim();
		if (t.toUpperCase().startsWith("PGE")) {
			let e = t.slice(3).trim(), n = i.exec(e), r = a.exec(e);
			if (n) {
				let e = n[1];
				return ["Enamel", n[2].split("/").map((t) => e + t)];
			} else if (r) return ["Enamel", [e]];
			else return [`Enamel ${s(e)}`.trim(), []];
		}
		let n = t.split(" "), r, o;
		n.length >= 2 ? (o = n[n.length - 1], r = n.slice(0, -1).join(" ")) : (r = t, o = "");
		let c = i.exec(o);
		if (c) {
			let e = c[1], t = c[2].split("/");
			return [s(r.trim()), t.map((t) => e + t)];
		}
		return [s(t), []];
	}
	let u = [], d, f = [], p = !1;
	for (let e of r) {
		let t = e[0];
		!p || t !== d ? (p && u.push([d, f]), d = t, f = [e], p = !0) : f.push(e);
	}
	p && u.push([d, f]);
	let m = {};
	for (let [e, t] of u) {
		let [n, r] = l(e);
		if (!n) continue;
		m[n] || (m[n] = {
			bases: [],
			variants: {},
			canonicalSet: !1
		});
		let i = m[n];
		for (let e of r) i.bases.includes(e) || i.bases.push(e);
		if (!i.canonicalSet && t.some((e) => c(e[17]) !== null && c(e[14]) !== null)) {
			for (let e of t) {
				let t = e[1];
				if (o.has(t)) {
					let n = c(e[17]), r = c(e[14]), a = c(e[13]);
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
	let h = 0, g = 0;
	return $.transaction(() => {
		for (let [e, t] of Object.entries(m)) {
			let n = Object.keys(t.variants);
			if (n.length === 0) {
				g++;
				continue;
			}
			let r = $.prepare("SELECT * FROM products WHERE name = ?").get(e), i;
			r ? i = r.id : (i = C(), $.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(i, e, ""));
			let a = {};
			for (let e of n) {
				let n = t.variants[e], r = $.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(i, Number(e));
				r ? a[e] = r.id : a[e] = $.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(i, Number(e), n.landing, n.sales, n.mp).lastInsertRowid;
			}
			for (let e of t.bases) {
				let t = $.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(i, e), r;
				r = t ? t.id : $.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(i, e).lastInsertRowid;
				for (let e of n) {
					let t = a[e];
					$.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(r, t) || $.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)").run(r, t);
				}
			}
			h++;
		}
	})(), {
		imported: h,
		skipped: g
	};
}
//#endregion
//#region electron/main.js
var hu = d.dirname(l(import.meta.url));
function gu() {
	let e = new t({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: d.join(hu, "preload.cjs"),
			spellcheck: !0
		}
	});
	e.webContents.session.setSpellCheckerLanguages(["en-US"]), e.webContents.on("context-menu", (t, r) => {
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
	}), process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(d.join(hu, "../dist/index.html"));
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
	n.setApplicationMenu(null), s.handle("app-image", (e) => {
		try {
			let t = new URL(e.url).searchParams.get("path");
			if (!t) throw Error("No path provided");
			let n = u(t).href;
			return o.fetch(n);
		} catch (t) {
			return console.error("app-image protocol error:", t.message, e.url), new Response("Not found", { status: 404 });
		}
	}), a.handle("db:addProduct", (e, t) => Ol(t)), a.handle("db:saveInventoryProduct", (e, t) => gl(t)), a.handle("db:getProducts", () => kl()), a.handle("db:getNextInvoiceNumber", () => Al()), a.handle("db:isInvoiceNumberAvailable", (e, t, n) => jl(t, n)), a.handle("db:deleteProduct", (e, t) => Ml(t)), a.handle("db:editProduct", (e, t, n) => Nl(t, n)), a.handle("db:addExpense", (e, t) => $l(t)), a.handle("db:getExpenses", () => eu()), a.handle("db:deleteExpense", (e, t) => tu(t)), a.handle("db:getSales", () => nu()), a.handle("db:getNetPosition", (e, t) => ru(t)), a.handle("db:getProductByName", (e, t) => Pl(t)), a.handle("db:getVariantBySize", (e, t, n) => Fl(t, n)), a.handle("db:addVariant", (e, t, n) => Il(t, n)), a.handle("db:addBase", (e, t, n) => Ll(t, n)), a.handle("db:addBaseStock", (e, t, n, r) => zl(t, n, r)), a.handle("db:getBaseByName", (e, t, n) => Rl(t, n)), a.handle("db:addCustomer", (e, t) => Hl(t)), a.handle("db:addBill", (e, t, n) => Gl(t, n)), a.handle("db:addCustomerBill", (e, t, n) => Jl(t, n)), a.handle("db:editCustomerBill", (e, t, n, r, i) => Ql(t, n, r, i)), a.handle("db:addBillActivity", (e, t, n) => Ul(t, n)), a.handle("db:getBillActivity", (e, t) => Wl(t)), a.handle("db:editCustomer", (e, t, n) => Xl(t, n)), a.handle("db:getExpenseDetails", (e, t) => uu(t)), a.handle("db:editExpense", (e, t, n) => lu(t, n)), a.handle("db:editImportExpense", (e, t, n, r) => cu(t, n, r)), a.handle("db:editBill", (e, t, n) => Zl(t, n)), a.handle("db:getCustomers", () => Kl()), a.handle("db:deleteCustomer", (e, t) => ql(t)), a.handle("db:deleteBill", (e, t) => Yl(t)), a.handle("db:resolveImagePath", (e, t) => Vl(t)), a.handle("db:createBackup", async (e) => {
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
		return n.canceled || !n.filePath ? null : { filePath: await pl(n.filePath) };
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
		let a = await El(n.filePaths[0]);
		return setTimeout(() => {
			r.relaunch(), r.exit(0);
		}, 1e3), a;
	}), a.handle("db:createPortableBackup", async (e) => {
		let n = await i.showSaveDialog(t.fromWebContents(e.sender), {
			title: "Create Portable StockWise Backup",
			defaultPath: `StockWise-Portable-Backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`,
			filters: [{
				name: "StockWise Portable Backup",
				extensions: ["zip"]
			}]
		});
		return n.canceled || !n.filePath ? null : { filePath: await hl(n.filePath, r.getVersion()) };
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
		let a = await Dl(n.filePaths[0]);
		return setTimeout(() => {
			r.relaunch(), r.exit(0);
		}, 1e3), a;
	}), a.handle("settings:pickExportDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose StockWise Export Folder",
			properties: ["openDirectory", "createDirectory"]
		});
		return n.canceled || n.filePaths.length === 0 ? null : n.filePaths[0];
	}), a.handle("settings:exportData", (e, t, n) => ml(t, n, r.getVersion())), a.handle("settings:get", () => _l()), a.handle("settings:createProfile", (e, t, n) => yl(t, n)), a.handle("settings:setDefaultProfilePassword", (e, t) => vl(t)), a.handle("settings:switchProfile", (e, n, r, i) => {
		let a = bl(n, r, i);
		return setTimeout(() => {
			let n = t.fromWebContents(e.sender);
			n && !n.isDestroyed() && n.webContents.reload();
		}, 100), a;
	}), a.handle("settings:updateDefaultPaymentMethod", (e, t) => xl(t)), a.handle("settings:updateInvoiceDefaults", (e, t) => Sl(t)), a.handle("settings:updateInventoryAddItemMode", (e, t) => Cl(t)), a.handle("settings:updateAppearance", (e, t, n) => wl(t, n)), a.handle("settings:openDataDirectory", async () => {
		let e = await c.openPath(_l().dataDirectory);
		if (e) throw Error(`Could not open the data folder: ${e}`);
	}), a.handle("settings:changeDataDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose an Empty StockWise Data Folder",
			properties: ["openDirectory"]
		});
		if (n.canceled || n.filePaths.length === 0) return null;
		let a = await Tl(n.filePaths[0]);
		return setTimeout(() => {
			r.relaunch(), r.exit(0);
		}, 1200), a;
	}), a.handle("dialog:pickExcelFile", async () => {
		let e = await i.showOpenDialog({
			properties: ["openFile"],
			filters: [{
				name: "Excel Files",
				extensions: ["xlsx", "xls"]
			}]
		});
		return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
	}), a.handle("db:recordImportExpense", (e, t, n) => su(t, n)), a.handle("db:importExcel", (e, t) => mu(t)), a.handle("db:copyImage", (e, t) => Bl(t)), a.handle("db:deleteBaseStock", (e, t, n) => fu(t, n)), a.handle("db:deleteVariant", (e, t) => pu(t)), a.handle("db:getTopProducts", (e, t) => iu(t)), a.handle("db:getTopCustomers", (e, t) => au(t)), a.handle("dialog:pickImage", async () => {
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
	}), gu();
}), r.on("window-all-closed", () => {
	process.platform !== "darwin" && r.quit();
}), r.on("activate", () => {
	t.getAllWindows().length === 0 && gu();
});
//#endregion
export {};
