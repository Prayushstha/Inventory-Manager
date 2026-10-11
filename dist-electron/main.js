import { createRequire as e } from "node:module";
import { BrowserWindow as t, Menu as n, app as r, dialog as i, ipcMain as a, net as o, protocol as s, shell as c } from "electron";
import { fileURLToPath as l, pathToFileURL as u } from "url";
import d from "path";
import f from "fs";
import { createRequire as p } from "module";
import { randomUUID as m } from "crypto";
import h from "node:fs";
import g from "node:path";
import { randomBytes as _, randomUUID as v, scryptSync as ee, timingSafeEqual as te } from "node:crypto";
import { Buffer as y } from "node:buffer";
import { access as ne, constants as re } from "node:fs/promises";
//#region \0rolldown/runtime.js
var ie = Object.create, ae = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, se = Object.getOwnPropertyNames, ce = Object.getPrototypeOf, le = Object.prototype.hasOwnProperty, b = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ue = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = se(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !le.call(e, s) && s !== n && ae(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = oe(t, s)) || r.enumerable
	});
	return e;
}, de = (e, t, n) => (n = e == null ? {} : ie(ce(e)), ue(t || !e || !e.__esModule ? ae(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), x = /* @__PURE__ */ e(import.meta.url), S = /* @__PURE__ */ b(((e) => {
	e.getBooleanOption = (e, t) => {
		let n = !1;
		if (t in e && typeof (n = e[t]) != "boolean") throw TypeError(`Expected the "${t}" option to be a boolean`);
		return n;
	}, e.cppdb = Symbol(), e.inspect = Symbol.for("nodejs.util.inspect.custom");
})), fe = /* @__PURE__ */ b(((e, t) => {
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
})), pe = /* @__PURE__ */ b(((e, t) => {
	var n = x("path").sep || "/";
	t.exports = r;
	function r(e) {
		if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://") throw TypeError("must pass in a file:// URI to convert to a file path");
		var t = decodeURI(e.substring(7)), r = t.indexOf("/"), i = t.substring(0, r), a = t.substring(r + 1);
		return i == "localhost" && (i = ""), i &&= n + n + i, a = a.replace(/^(.+)\|/, "$1:"), n == "\\" && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = n + a), i + a;
	}
})), me = /* @__PURE__ */ b(((e, t) => {
	var n = x("fs"), r = x("path"), i = pe(), a = r.join, o = r.dirname, s = n.accessSync && function(e) {
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
		for (var n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : x, i = [], o = 0, s = t.try.length, l, u, d; o < s; o++) {
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
})), he = /* @__PURE__ */ b(((e) => {
	var { cppdb: t } = S();
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
})), ge = /* @__PURE__ */ b(((e, t) => {
	var { cppdb: n } = S(), r = /* @__PURE__ */ new WeakMap();
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
})), _e = /* @__PURE__ */ b(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = S();
	t.exports = function(e, t) {
		if (t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		let i = n(t, "simple"), a = this[r].prepare(`PRAGMA ${e}`, this, !0);
		return i ? a.pluck().get() : a.all();
	};
})), ve = /* @__PURE__ */ b(((e, t) => {
	var n = x("fs"), r = x("path"), { promisify: i } = x("util"), { cppdb: a } = S(), o = i(n.access);
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
})), ye = /* @__PURE__ */ b(((e, t) => {
	var { cppdb: n } = S();
	t.exports = function(e) {
		if (e ??= {}, typeof e != "object") throw TypeError("Expected first argument to be an options object");
		let t = "attached" in e ? e.attached : "main";
		if (typeof t != "string") throw TypeError("Expected the \"attached\" option to be a string");
		if (!t) throw TypeError("The \"attached\" option cannot be an empty string");
		return this[n].serialize(t);
	};
})), be = /* @__PURE__ */ b(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = S();
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
})), xe = /* @__PURE__ */ b(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = S();
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
})), Se = /* @__PURE__ */ b(((e, t) => {
	var { cppdb: n } = S();
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
})), Ce = /* @__PURE__ */ b(((e, t) => {
	var n = function() {};
	t.exports = function(e, t) {
		return Object.assign(new n(), this);
	};
})), we = /* @__PURE__ */ b(((e, t) => {
	var n = x("fs"), r = x("path"), i = S(), a = fe(), o;
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
		if (_ = g == null ? o ||= me()("better_sqlite3.node") : typeof g == "string" ? (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : x)(r.resolve(g).replace(/(\.node)?$/, ".node")) : g, _.isInitialized || (_.setErrorConstructor(a), _.isInitialized = !0), !d && !u.startsWith("file:") && !n.existsSync(r.dirname(u))) throw TypeError("Cannot open database because the directory does not exist");
		Object.defineProperties(this, {
			[i.cppdb]: { value: new _.Database(u, e, d, f, p, m, h || null, l || null) },
			...c.getters
		});
	}
	var c = he();
	s.prototype.prepare = c.prepare, s.prototype.transaction = ge(), s.prototype.pragma = _e(), s.prototype.backup = ve(), s.prototype.serialize = ye(), s.prototype.function = be(), s.prototype.aggregate = xe(), s.prototype.table = Se(), s.prototype.loadExtension = c.loadExtension, s.prototype.exec = c.exec, s.prototype.close = c.close, s.prototype.defaultSafeIntegers = c.defaultSafeIntegers, s.prototype.unsafeMode = c.unsafeMode, s.prototype[i.inspect] = Ce(), t.exports = s;
})), C = /* @__PURE__ */ de((/* @__PURE__ */ b(((e, t) => {
	t.exports = we(), t.exports.SqliteError = fe();
})))(), 1);
function w(e, t) {
	if (!e) throw Error(t);
}
function T(e, t = "") {
	return e == null ? t : String(e).trim();
}
function E(e, t, { min: n = -Infinity, allowZero: r = !0 } = {}) {
	let i = Number(e);
	if (!Number.isFinite(i)) throw Error(`${t} must be a valid number.`);
	if (i < n) throw Error(`${t} must be at least ${n}.`);
	if (!r && i === 0) throw Error(`${t} cannot be zero.`);
	return i;
}
function D(e) {
	if (!e || typeof e != "object") throw Error("Invalid product payload.");
	let t = T(e.name);
	w(t.length > 0, "Product name is required.");
	let n = Array.isArray(e.variants) ? e.variants : [], r = Array.isArray(e.bases) ? e.bases : [];
	w(n.length > 0 || r.length > 0, "Product must include at least one variant or base.");
	let i = n.map((e, t) => {
		let n = E(e?.bucket_size ?? e?.bucketSize, `Variant ${t + 1} size`, {
			min: 1e-4,
			allowZero: !1
		});
		return {
			...e,
			bucket_size: n,
			landing: E(e?.landing ?? 0, `Variant ${t + 1} landing`, { min: 0 }),
			sales: E(e?.sales ?? 0, `Variant ${t + 1} sales`, { min: 0 }),
			mp: E(e?.mp ?? 0, `Variant ${t + 1} market price`, { min: 0 })
		};
	}), a = r.map((e, t) => {
		let n = T(e?.name ?? e?.baseName);
		w(n.length > 0, `Base ${t + 1} name is required.`);
		let r = Array.isArray(e?.stocks) ? e.stocks : [];
		return i.length > 0 && w(r.length === i.length, `Base "${n}" must contain stock values for every variant.`), {
			...e,
			name: n,
			stocks: r.map((e, t) => E(e, `Base "${n}" stock for variant ${t + 1}`, { min: 0 }))
		};
	});
	return {
		...e,
		id: T(e.id, ""),
		name: t,
		images: e.images ?? "",
		variants: i,
		bases: a
	};
}
function O(e) {
	if (!e || typeof e != "object") throw Error("Invalid customer payload.");
	let t = T(e.name);
	return w(t.length > 0, "Customer name is required."), {
		...e,
		name: t,
		phone: T(e.phone, ""),
		address: T(e.address, ""),
		notes: T(e.notes, "")
	};
}
function k(e, t) {
	if (!t || typeof t != "object") throw Error("Invalid bill payload.");
	let n = Number(e);
	w(Number.isInteger(n) && n > 0, "A valid customer is required.");
	let r = T(t.date);
	w(r.length > 0, "Bill date is required.");
	let i = T(t.billType ?? t.bill_type ?? "default").toLowerCase();
	w([
		"default",
		"pan",
		"vat"
	].includes(i), "Bill type must be Default, PAN, or VAT.");
	let a = E(t.totalPurchased, "Total purchased", { min: 0 }), o = E(t.amountPaid, "Amount paid", { min: 0 }), s = E(t.amountDue, "Amount due", { min: 0 });
	w(Array.isArray(t.products) && t.products.length > 0, "Bill must contain at least one product.");
	let c = 0, l = t.products.map((e, t) => {
		let n = T(e?.productName ?? e?.product_name), r = T(e?.base), i = E(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = E(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = E(e?.priceAtSale ?? e?.price_at_sale ?? 0, `Item ${t + 1} price`, { min: 0 });
		return w(n.length > 0, `Item ${t + 1} product name is required.`), c += a * o, {
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
		let e = E(d.discount ?? 0, "Invoice discount", { min: 0 });
		w(e <= c, "Invoice discount cannot exceed the item subtotal.");
		let n = c - e;
		w(T(d.vatPercent ?? "13").length > 0, "VAT percentage is required.");
		let r = E(d.vatPercent ?? 13, "VAT percentage", { min: 0 });
		w(r <= 100, "VAT percentage cannot exceed 100.");
		let i = E(d.tax ?? n * r / 100, "VAT amount", { min: 0 });
		w(Math.abs(i - n * r / 100) < .01, `VAT must equal ${r}% of the taxable amount.`), u = n + i, d = {
			...d,
			discount: e,
			vatPercent: r,
			tax: i,
			taxableAmount: n
		};
	}
	return w(Math.abs(u - a) < .01, "Bill total does not match its items and applicable tax/discount."), w(Math.abs(o + s - a) < .01, "Bill payment values must add up to the total purchased."), {
		date: r,
		paymentMethod: T(t.paymentMethod, ""),
		totalPurchased: a,
		amountPaid: o,
		amountDue: s,
		status: T(t.status, "Open"),
		products: l,
		customerId: n,
		billType: i,
		panNumber: T(t.panNumber ?? t.pan_number ?? ""),
		billNumber: T(t.billNumber ?? t.bill_number ?? ""),
		invoiceData: d
	};
}
function A(e) {
	if (!e || typeof e != "object") throw Error("Invalid expense payload.");
	let t = T(e.date);
	w(t.length > 0, "Expense date is required.");
	let n = T(e.nameOfExpense ?? e.label);
	w(n.length > 0, "Expense label is required.");
	let r = T(e.typeOfExpense ?? e.type ?? "General");
	return w([
		"General",
		"Import",
		"Taxes"
	].includes(r), "Expense type must be General, Import, or Taxes."), {
		date: t,
		nameOfExpense: n,
		amountOfExpense: E(e.amountOfExpense ?? e.amount ?? 0, "Expense amount", {
			min: 1e-4,
			allowZero: !1
		}),
		typeOfExpense: r
	};
}
function Te(e) {
	if (!Array.isArray(e) || e.length === 0) throw Error("At least one import item is required.");
	return e.map((e, t) => {
		let n = T(e?.productName ?? e?.product_name), r = T(e?.base), i = E(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = E(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = E(e?.costPrice ?? e?.cost_price ?? 0, `Item ${t + 1} cost price`, { min: 0 });
		return w(n.length > 0, `Item ${t + 1} product name is required.`), {
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
var Ee = [
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
	}
];
function j(e) {
	let t = e.pragma("user_version", { simple: !0 }), n = Ee.at(-1)?.version ?? 0;
	if (t > n) throw Error(`Database schema version ${t} is newer than supported version ${n}.`);
	for (let n of Ee) if (!(n.version <= t)) {
		if (n.version !== t + 1) throw Error(`Missing database migration for version ${t + 1}.`);
		e.transaction(() => {
			n.up(e), e.pragma(`user_version = ${n.version}`);
		})(), t = n.version;
	}
	return t;
}
//#endregion
//#region src/Backend/profileAuth.js
var De = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i, M = /^[0-9a-f]{32}$/i, N = /^[0-9a-f]{128}$/i;
function P(e) {
	if (typeof e != "string") throw Error("Username must be text.");
	let t = e.trim();
	if (!t || t.length > 64 || [...t].some((e) => {
		let t = e.codePointAt(0);
		return t < 32 || t === 127;
	})) throw Error("Username must be between 1 and 64 characters.");
	return t;
}
function Oe(e) {
	if (typeof e != "string" || e.length < 8 || e.length > 1024) throw Error("Password must be between 8 and 1024 characters.");
	let t = _(16);
	return {
		passwordSalt: t.toString("hex"),
		passwordHash: ee(e, t, 64).toString("hex")
	};
}
function ke(e, t) {
	if (typeof t != "string" || t.length > 1024 || !M.test(e.passwordSalt ?? "") || !N.test(e.passwordHash ?? "")) return !1;
	let n = y.from(e.passwordSalt, "hex"), r = y.from(e.passwordHash, "hex");
	return te(ee(t, n, r.length), r);
}
function Ae(e) {
	if (!e || typeof e != "object" || !M.test(e.passwordSalt ?? "") || !N.test(e.passwordHash ?? "")) throw Error("Default profile credentials are invalid.");
	return {
		passwordSalt: e.passwordSalt.toLowerCase(),
		passwordHash: e.passwordHash.toLowerCase()
	};
}
function je(e) {
	if (!Array.isArray(e)) throw Error("Profiles must be a list.");
	let t = new Set(["user"]), n = /* @__PURE__ */ new Set();
	return e.map((e) => {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Each profile must be an object.");
		let r = e.id;
		if (typeof r != "string" || !De.test(r) || n.has(r)) throw Error("Each profile must have a unique valid ID.");
		n.add(r);
		let i = P(e.username), a = i.toLocaleLowerCase();
		if (t.has(a)) throw Error(`The username "${i}" is already in use.`);
		if (t.add(a), !M.test(e.passwordSalt ?? "") || !N.test(e.passwordHash ?? "")) throw Error(`Profile "${i}" has invalid password credentials.`);
		let o = e.dataDirectory ?? null;
		if (o !== null && (typeof o != "string" || !g.isAbsolute(o))) throw Error(`Profile "${i}" has an invalid data directory.`);
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
var Me = "Cash", Ne = [
	"Cash",
	"UPI",
	"Card",
	"Credit"
], Pe = [
	"lara",
	"claude",
	"zen",
	"auto-blog"
], Fe = ["light", "dark"];
function F() {
	return {
		shopName: "",
		shopAddress: "",
		shopTelephone: "",
		invoiceNumber: "",
		tpinNumber: "",
		vatPercent: "13"
	};
}
function Ie() {
	return {
		defaultPaymentMethod: Me,
		dataDirectory: null,
		invoiceDefaults: F(),
		inventoryAddItemMode: null,
		appearanceTheme: "lara",
		appearanceMode: "dark",
		profiles: [],
		activeProfileId: "user",
		defaultProfileCredentials: null
	};
}
function I(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Application settings must be a JSON object.");
	let t = e.defaultPaymentMethod ?? "Cash";
	if (!Ne.includes(t)) throw Error("Default payment method must be Cash, UPI, Card, or Credit.");
	let n = e.dataDirectory ?? null;
	if (n !== null && (typeof n != "string" || !g.isAbsolute(n))) throw Error("The configured data directory must be an absolute path.");
	let r = e.invoiceDefaults ?? F();
	if (!r || typeof r != "object" || Array.isArray(r)) throw Error("Invoice defaults must be a JSON object.");
	let i = F();
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
	if (!Pe.includes(s)) throw Error(`Appearance theme must be one of: ${Pe.join(", ")}.`);
	let c = e.appearanceMode ?? "dark";
	if (!Fe.includes(c)) throw Error("Appearance mode must be \"light\" or \"dark\".");
	let l = je(e.profiles ?? []), u = e.defaultProfileCredentials == null ? null : Ae(e.defaultProfileCredentials), d = e.activeProfileId ?? "user";
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
	if (!h.existsSync(e)) return Ie();
	let t;
	try {
		t = JSON.parse(h.readFileSync(e, "utf8"));
	} catch (t) {
		throw Error(`Could not read application settings at "${e}".`, { cause: t });
	}
	return I(t);
}
function L(e, t) {
	let n = I(t), r = g.dirname(e);
	h.mkdirSync(r, { recursive: !0 });
	let i = g.join(r, `.settings-${v()}.tmp`);
	try {
		h.writeFileSync(i, `${JSON.stringify(n, null, 2)}\n`, {
			encoding: "utf8",
			flag: "wx"
		}), h.renameSync(i, e);
	} catch (t) {
		throw h.rmSync(i, { force: !0 }), Error(`Could not save application settings at "${e}".`, { cause: t });
	}
	return n;
}
function Re({ config: e, isPackaged: t, userDataPath: n, developmentPath: r }) {
	let i = I(e);
	return g.resolve(i.dataDirectory || (t ? n : r));
}
async function ze(e, t, n) {
	let r = g.resolve(t), i = g.resolve(n);
	if (r === i) throw Error("Choose a different folder from the current data directory.");
	if (h.mkdirSync(i, { recursive: !0 }), h.readdirSync(i).length > 0) throw Error("Choose an empty folder for the StockWise data copy.");
	let a = h.mkdtempSync(g.join(i, ".stockwise-setup-")), o = g.basename(e.name || "inventory.db"), s = g.join(a, o), c = g.join(a, "images"), l = [];
	try {
		await e.backup(s);
		let t = g.join(r, "images");
		h.existsSync(t) && h.cpSync(t, c, {
			recursive: !0,
			errorOnExist: !0
		});
		let n = g.join(i, o);
		if (h.renameSync(s, n), l.push(n), h.existsSync(c)) {
			let e = g.join(i, "images");
			h.renameSync(c, e), l.push(e);
		}
	} catch (e) {
		for (let e of l) h.rmSync(e, {
			recursive: !0,
			force: !0
		});
		throw Error(`Could not copy StockWise data to "${i}".`, { cause: e });
	} finally {
		h.rmSync(a, {
			recursive: !0,
			force: !0
		});
	}
	return i;
}
//#endregion
//#region src/Backend/inventoryWrites.js
function Be(e, t) {
	let n = D(t), r = e.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n.name);
	return e.transaction(() => {
		let t = r?.id || n.id || v();
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
function Ve(e, t) {
	let n = D(t), r = n.id || v();
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
function He(e, t, n) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT id FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	let r = D(n), i = r.name;
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
function Ue(e, t) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT 1 FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	e.transaction(() => {
		let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t), r = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t);
		for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
		for (let t of r) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
		e.prepare("DELETE FROM variants WHERE product_id = ?").run(t), e.prepare("DELETE FROM bases WHERE product_id = ?").run(t), e.prepare("DELETE FROM products WHERE id = ?").run(t);
	})();
}
function R(e, t, n, r, i) {
	let a = t ? String(t).trim() : "", o = n ? String(n).trim() : "", s = parseFloat(r) || 0, c = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(a);
	if (!c) return;
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c.id, s);
	if (!l) return;
	let u = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c.id, o);
	u && e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(i, u.id, l.id);
}
function We(e, t, n) {
	let r = e.prepare("SELECT * FROM products WHERE name = ?").get(t);
	if (!r) return 0;
	let i = e.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(r.id, n);
	return i ? i.landing : 0;
}
function Ge(e, t, n) {
	e.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(t, n.type, n.date, n.amount, n.paymentMethod, n.note);
}
function Ke(e, t, n) {
	let r = k(t, n);
	if (!e.prepare("SELECT id FROM customers WHERE id = ?").get(r.customerId)) throw Error("Customer not found.");
	return e.transaction(() => {
		let t = e.prepare("\n      INSERT INTO bills (\n        customer_id, date, payment_method, total_purchased, amount_paid, amount_due,\n        status, bill_type, pan_number, bill_number, invoice_data\n      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ").run(r.customerId, r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status, r.billType, r.panNumber, r.billNumber, r.invoiceData ? JSON.stringify(r.invoiceData) : null).lastInsertRowid;
		Ge(e, t, {
			type: "sale",
			date: r.date,
			amount: r.totalPurchased,
			paymentMethod: r.paymentMethod,
			note: "Initial bill entry"
		});
		for (let n of r.products) {
			let r = We(e, n.productName, n.bucketSize);
			e.prepare("\n        INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.priceAtSale, r), R(e, n.productName, n.base, n.bucketSize, -n.quantity);
		}
		return r.amountPaid > 0 && Ge(e, t, {
			type: "payment",
			date: r.date,
			amount: r.amountPaid,
			paymentMethod: r.paymentMethod,
			note: "Payment recorded on bill creation"
		}), t;
	})();
}
function qe(e, t) {
	let n = t.productName ? String(t.productName).trim() : "", r = t.base ? String(t.base).trim() : "", i = parseFloat(t.bucketSize) || 0, a = parseFloat(t.quantity) || 0, o = parseFloat(t.costPrice) || 0, s = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n), c;
	s ? c = s.id : (c = v(), e.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(c, n, ""));
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c, i), u;
	l ? (u = l.id, e.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(o, u)) : u = e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(c, i, o, 0, 0).lastInsertRowid;
	let d = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c, r)?.id ?? e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(c, r).lastInsertRowid;
	e.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(d, u) ? e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(a, d, u) : e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(d, u, a);
}
function Je(e, t) {
	R(e, t.product_name, t.base, t.bucket_size, -t.quantity);
}
function Ye(e) {
	if (e == null) return null;
	if (typeof e != "object" || Array.isArray(e)) throw Error("Invoice data must be an object.");
	return JSON.stringify(e);
}
function Xe(e, t) {
	return e.prepare("\n    SELECT id, invoice_data FROM expenses\n    WHERE type = 'Import' AND invoice_data IS NOT NULL\n  ").all().filter((e) => e.id !== Number(t)).map((e) => {
		try {
			return JSON.parse(e.invoice_data)?.invoiceNumber;
		} catch (t) {
			throw Error(`Invoice details for import ${e.id} are corrupted.`, { cause: t });
		}
	}).filter((e) => typeof e == "string" && e.trim()).map((e) => e.trim());
}
function z(e, t, n) {
	let r = String(t ?? "").trim().toLocaleLowerCase();
	return r ? !Xe(e, n).some((e) => e.toLocaleLowerCase() === r) : !1;
}
function Ze(e, t = "") {
	let n = String(t ?? "").trim(), r = /^(.*?)(\d+)$/.exec(n), i = r?.[1] ?? "", a = r?.[2]?.length ?? 1, o = r ? Number(r[2]) : 0, s = Xe(e).map((e) => {
		let t = /^(.*?)(\d+)$/.exec(e);
		return t && t[1].toLocaleLowerCase() === i.toLocaleLowerCase() ? Number(t[2]) : 0;
	}), c = Math.max(o, ...s) + 1, l = `${i}${String(c).padStart(a, "0")}`;
	for (; !z(e, l);) c += 1, l = `${i}${String(c).padStart(a, "0")}`;
	return l;
}
function Qe(e, t, n) {
	let r = Te(n), i = r.reduce((e, t) => e + t.costPrice * t.quantity, 0), a = A({
		...t,
		amountOfExpense: i,
		typeOfExpense: "Import"
	});
	return {
		id: e.transaction(() => {
			let n = t.invoiceData?.invoiceNumber;
			if (n && !z(e, n)) throw Error("This invoice number is already in use. Choose another number.");
			for (let t of r) qe(e, t);
			let o = e.prepare("INSERT INTO expenses (date, label, amount, type, invoice_data) VALUES (?, ?, ?, ?, ?)").run(a.date, a.nameOfExpense, i, "Import", Ye(t.invoiceData)).lastInsertRowid;
			for (let t of r) e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(o, t.productName, t.base, t.bucketSize, t.quantity, t.costPrice);
			return o;
		})(),
		totalCost: i
	};
}
function $e(e, t, n, r) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	let i = Te(r), a = i.reduce((e, t) => e + t.costPrice * t.quantity, 0), o = A({
		...n,
		amountOfExpense: a,
		typeOfExpense: "Import"
	}), s = Ye(n.invoiceData), c = n.invoiceData?.invoiceNumber, l = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
	return e.transaction(() => {
		if (c && !z(e, c, t)) throw Error("This invoice number is already in use. Choose another number.");
		for (let t of l) Je(e, t);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t);
		for (let n of i) qe(e, n), e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.costPrice);
		e.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, invoice_data = ? WHERE id = ?").run(o.date, o.nameOfExpense, a, s, t);
	})(), a;
}
//#endregion
//#region src/Backend/inventoryDeletes.js
function et(e, t, n) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	e.transaction(() => {
		let r = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
		for (let e of r) n(e);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t), e.prepare("DELETE FROM expenses WHERE id = ?").run(t);
	})();
}
function tt(e, t) {
	e.transaction(() => {
		e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t), e.prepare("DELETE FROM variants WHERE id = ?").run(t);
	})();
}
//#endregion
//#region src/Backend/databaseBackup.js
var nt = {
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
}, rt = {
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
function it(e) {
	let t = e.pragma("integrity_check", { simple: !0 });
	if (t !== "ok") throw Error(`SQLite integrity check failed: ${t}`);
}
function at(e, t = !1) {
	let n = t ? nt : rt, r = new Set(e.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((e) => e.name));
	if (Object.entries(n).filter(([t, n]) => {
		if (!r.has(t)) return !0;
		let i = new Set(e.prepare(`PRAGMA table_info(${t})`).all().map((e) => e.name));
		return n.some((e) => !i.has(e));
	}).length > 0) throw Error("The selected file does not contain a complete StockWise database schema.");
}
async function ot(e, t) {
	if (!e.open) throw Error("The active database is not open.");
	let n = g.resolve(t);
	if (e.name && g.resolve(e.name) === n) throw Error("Choose a different file from the active database.");
	return await e.backup(n), n;
}
async function st(e, t) {
	let n = g.resolve(e), r = g.resolve(t);
	if (n === r) throw Error("The restore source and staging file must be different.");
	if (h.existsSync(r)) throw Error("The restore staging file already exists.");
	try {
		let e = new C.default(n, {
			readonly: !0,
			fileMustExist: !0
		});
		try {
			it(e), at(e), await e.backup(r);
		} finally {
			e.close();
		}
		let t = new C.default(r);
		try {
			let e = j(t);
			return it(t), at(t, !0), { schemaVersion: e };
		} finally {
			t.close();
		}
	} catch (e) {
		throw h.rmSync(r, { force: !0 }), e;
	}
}
function ct(e, t, n) {
	h.renameSync(e, n);
	try {
		h.renameSync(t, e);
	} catch (t) {
		try {
			h.renameSync(n, e);
		} catch (e) {
			throw AggregateError([t, e], "Restore activation failed and the original database could not be put back.", { cause: e });
		}
		throw Error(t.message, { cause: t });
	}
}
//#endregion
//#region src/Backend/dataExport.js
var B = e(import.meta.url), V = B("xlsx"), lt = B("pdfkit"), { ZipArchive: ut } = B("archiver"), dt = [
	"products",
	"customers",
	"bills",
	"imports",
	"expenses"
], ft = {
	products: "Products and their variants, bases, and current stock quantities.",
	customers: "Customers and their associated sales records.",
	bills: "Sales bills, line items, and bill activity entries.",
	imports: "Inventory import expenses and the items added by each import.",
	expenses: "All recorded expenses and their associated expense items."
};
function pt(e) {
	if (!e || typeof e != "object") throw Error("Choose at least one data section to export.");
	let t = Object.fromEntries(dt.map((t) => [t, e[t] === !0]));
	if (!Object.values(t).some(Boolean)) throw Error("Choose at least one data section to export.");
	return t;
}
async function mt(e) {
	if (typeof e != "string" || !e.trim()) throw Error("Choose an export destination folder.");
	let t = g.resolve(e), n;
	try {
		n = await h.promises.stat(t), await ne(t, re.W_OK);
	} catch (e) {
		throw Error("The export destination does not exist or is not writable.", { cause: e });
	}
	if (!n.isDirectory()) throw Error("The export destination must be a folder.");
	return t;
}
function H(e, t, n = []) {
	return e.prepare(t).all(...n);
}
function ht(e, t) {
	let n = {};
	t.products && (n.products = H(e, "SELECT id, name, images FROM products ORDER BY name COLLATE NOCASE"), n.variants = H(e, "\n      SELECT id, product_id, bucket_size, landing, sales, mp\n      FROM variants ORDER BY product_id, bucket_size\n    "), n.bases = H(e, "\n      SELECT id, product_id, name FROM bases ORDER BY product_id, name COLLATE NOCASE\n    "), n.stock = H(e, "\n      SELECT base_id, variant_id, stock FROM base_stock ORDER BY base_id, variant_id\n    "));
	let r = t.customers || t.bills;
	return t.customers && (n.customers = H(e, "SELECT id, name, phone, address, notes FROM customers ORDER BY name COLLATE NOCASE")), r && (n.bills = H(e, "\n      SELECT id, customer_id, date, payment_method, total_purchased, amount_paid,\n             amount_due, status, bill_type, pan_number, bill_number, invoice_data\n      FROM bills ORDER BY date, id\n    "), n.billItems = H(e, "\n      SELECT id, bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price\n      FROM bill_items ORDER BY bill_id, id\n    "), n.billActivity = H(e, "\n      SELECT id, bill_id, type, date, amount, payment_method, note, created_at\n      FROM bill_activity ORDER BY bill_id, date, id\n    ")), t.imports && (n.imports = H(e, "\n      SELECT id, date, label, amount, type, invoice_data\n      FROM expenses WHERE type = 'Import' ORDER BY date, id\n    "), n.importItems = H(e, "\n      SELECT id, expense_id, product_name, base, bucket_size, quantity, cost_price\n      FROM expense_items\n      WHERE expense_id IN (SELECT id FROM expenses WHERE type = 'Import')\n      ORDER BY expense_id, id\n    ")), t.expenses && (n.expenses = H(e, "\n      SELECT id, date, label, amount, type, invoice_data\n      FROM expenses ORDER BY date, id\n    "), n.expenseItems = H(e, "\n      SELECT id, expense_id, product_name, base, bucket_size, quantity, cost_price\n      FROM expense_items ORDER BY expense_id, id\n    ")), n;
}
function gt(e) {
	return e.length ? e : [{ "No records": "" }];
}
function _t(e, t, n) {
	let r = V.utils.json_to_sheet(gt(n));
	r["!cols"] = (n.length ? Object.keys(n[0]) : ["No records"]).map((e) => {
		let t = Math.max(e.length, ...n.map((t) => String(t[e] ?? "").length));
		return { wch: Math.min(Math.max(t + 2, 12), 55) };
	}), V.utils.book_append_sheet(e, r, t);
}
function vt(e) {
	return new Promise((t, n) => {
		let r = new lt({
			margin: 42,
			size: "A4"
		}), i = [];
		r.on("data", (e) => i.push(e)), r.on("end", () => t(y.concat(i))), r.on("error", n);
		try {
			e(r), r.end();
		} catch (e) {
			n(e);
		}
	});
}
function U(e) {
	return `NPR ${Number(e || 0).toLocaleString("en-NP", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})}`;
}
async function yt(e, t, n) {
	return vt((r) => {
		r.fontSize(22).text("StockWise Data Export", { align: "center" }), r.moveDown(), r.fontSize(11).text(`Exported: ${t}`), r.text(`App version: ${n || "Unavailable"}`), r.moveDown(), r.fontSize(14).text("Included sections"), r.moveDown(.5);
		for (let t of dt) e[t] && (r.fontSize(11).text(`${t[0].toUpperCase()}${t.slice(1)}`, { continued: !0 }), r.text(` — ${ft[t]}`), r.moveDown(.35));
		r.moveDown(), r.fontSize(10).fillColor("#555").text("This archive contains a spreadsheet export of the selected StockWise records and, when sales are included, printable copies of the exported bills.");
	});
}
async function bt(e) {
	let t = H(e, "\n    SELECT b.*, c.name AS customer_name, c.phone AS customer_phone,\n           c.address AS customer_address\n    FROM bills b\n    LEFT JOIN customers c ON c.id = b.customer_id\n    ORDER BY b.date, b.id\n  "), n = H(e, "\n    SELECT * FROM bill_items ORDER BY bill_id, id\n  "), r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = r.get(e.bill_id) || [];
		t.push(e), r.set(e.bill_id, t);
	}
	return vt((e) => {
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
						U(t.price_at_sale),
						U(t.quantity * t.price_at_sale)
					], i = e.y;
					d.forEach(([, t], n) => {
						e.text(r[n], f, i, { width: t }), f += t;
					}), e.moveDown(.8);
				}), e.moveDown(), e.font("Helvetica-Bold").text(`Amount: ${U(n)}`, { align: "right" }), e.font("Helvetica").text(`Discount: ${U(r)}`, { align: "right" }), e.text(`Taxable Amount: ${U(a)}`, { align: "right" }), e.text(`VAT: ${s}%`, { align: "right" }), e.text(`Tax: ${U(c)}`, { align: "right" }), e.font("Helvetica-Bold").text(`Grand Total: ${U(l)}`, { align: "right" }), e.font("Helvetica");
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
					U(t.price_at_sale),
					U(t.quantity * t.price_at_sale)
				], r = e.y;
				c.forEach(([, t], i) => {
					e.text(n[i], l, r, { width: t }), l += t;
				}), e.moveDown(.8);
			}
			e.moveDown(), e.font("Helvetica-Bold").text(`Total: ${U(t.total_purchased)}`, { align: "right" }), e.font("Helvetica").text(`Paid: ${U(t.amount_paid)}`, { align: "right" }), e.text(`Due: ${U(t.amount_due)}`, { align: "right" }), e.text(`Status: ${t.status}`, { align: "right" }), e.font("Helvetica");
		});
	});
}
async function xt(e, t) {
	let n = g.join(e, `stockwise-export-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`), r = `${n}.${Date.now()}.tmp`;
	try {
		let e = h.createWriteStream(r, { flags: "wx" }), i = new ut({ zlib: { level: 9 } }), a = new Promise((t, n) => {
			e.on("close", t), e.on("error", n), i.on("error", n);
		});
		i.pipe(e);
		for (let e of t) i.append(e.content, { name: e.name });
		return await i.finalize(), await a, h.renameSync(r, n), n;
	} catch (e) {
		throw h.rmSync(r, { force: !0 }), Error("Could not finish the StockWise export archive.", { cause: e });
	}
}
async function St(e, t, n, r) {
	let i = pt(n), a = await mt(t), o = ht(e, i), s = V.utils.book_new();
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
	]) o[t] && _t(s, e, o[t]);
	let c = [{
		name: "introduction.pdf",
		content: await yt(i, (/* @__PURE__ */ new Date()).toLocaleString(), r)
	}, {
		name: "data.xlsx",
		content: V.write(s, {
			type: "buffer",
			bookType: "xlsx"
		})
	}];
	return (i.bills || i.customers) && c.push({
		name: "bills.pdf",
		content: await bt(e)
	}), xt(a, c);
}
//#endregion
//#region src/Backend/server.js
var Ct = p(import.meta.url)("xlsx"), wt = d.dirname(l(import.meta.url)), W = d.join(r.getPath("userData"), "settings.json"), G = Le(W), K = r.getPath("userData");
function Tt(e) {
	return G.profiles.find((t) => t.id === e) ?? null;
}
function Et(e) {
	if (e === "user") return Re({
		config: G,
		isPackaged: r.isPackaged,
		userDataPath: K,
		developmentPath: d.join(wt, "../", "Database")
	});
	let t = Tt(e);
	if (!t) throw Error("The selected profile does not exist.");
	return d.resolve(t.dataDirectory || d.join(K, "profiles", t.id));
}
var q = Et(G.activeProfileId), J = d.join(q, "inventory.db"), Y;
function Dt() {
	f.mkdirSync(q, { recursive: !0 }), Y = new C.default(J), j(Y);
}
Dt();
function Ot(e) {
	return {
		id: e.id,
		username: e.username,
		isDefault: !1
	};
}
function kt(e) {
	return ot(Y, e);
}
function At(e, t, n) {
	return St(Y, e, t, n);
}
function jt(e) {
	return Be(Y, e);
}
function X() {
	let e = { ...G };
	return delete e.defaultProfileCredentials, delete e.profiles, {
		...e,
		dataDirectory: q,
		activeProfileId: G.activeProfileId,
		defaultProfilePasswordSet: !!G.defaultProfileCredentials,
		profiles: [{
			id: "user",
			username: "user",
			isDefault: !0
		}, ...G.profiles.map(Ot)]
	};
}
function Mt(e) {
	if (G.defaultProfileCredentials) throw Error("The default profile password has already been set.");
	return G = L(W, {
		...G,
		defaultProfileCredentials: Oe(e)
	}), X();
}
function Nt(e, t) {
	let n = P(e);
	if (n.toLocaleLowerCase() === "user" || G.profiles.some((e) => e.username.toLocaleLowerCase() === n.toLocaleLowerCase())) throw Error(`The username "${n}" is already in use.`);
	let r = {
		id: m(),
		username: n,
		...Oe(t),
		dataDirectory: null
	}, i = d.join(K, "profiles", r.id);
	f.mkdirSync(i, { recursive: !0 });
	let a = d.join(i, "inventory.db");
	try {
		let e = new C.default(a);
		try {
			j(e);
		} finally {
			e.close();
		}
		return G = L(W, {
			...G,
			profiles: [...G.profiles, r]
		}), X();
	} catch (e) {
		throw f.rmSync(i, {
			recursive: !0,
			force: !0
		}), e;
	}
}
function Pt(e, t, n) {
	let r = P(t), i;
	if (e === "user") {
		if (r.toLocaleLowerCase() !== "user" || !G.defaultProfileCredentials || !ke(G.defaultProfileCredentials, n)) throw Error("The username or password is incorrect.");
	} else if (i = Tt(e), !i || i.username.toLocaleLowerCase() !== r.toLocaleLowerCase() || !ke(i, n)) throw Error("The username or password is incorrect.");
	let a = Et(e), o = d.join(a, "inventory.db");
	if (e === G.activeProfileId) return X();
	f.mkdirSync(a, { recursive: !0 });
	let s = new C.default(o);
	try {
		j(s);
		let t = L(W, {
			...G,
			activeProfileId: e
		}), n = Y;
		return Y = s, q = a, J = o, G = t, n.close(), X();
	} catch (e) {
		throw s.open && s !== Y && s.close(), e;
	}
}
function Ft(e) {
	return G = L(W, {
		...G,
		defaultPaymentMethod: e
	}), X();
}
function It(e) {
	return G = L(W, {
		...G,
		invoiceDefaults: e
	}), X();
}
function Lt(e) {
	return G = L(W, {
		...G,
		inventoryAddItemMode: e
	}), X();
}
function Rt(e, t) {
	return G = L(W, {
		...G,
		appearanceTheme: e,
		appearanceMode: t
	}), X();
}
async function zt(e) {
	if (typeof e != "string" || !e.trim()) throw Error("A data directory is required.");
	let t = d.resolve(e);
	if (t === q) throw Error("Choose a different folder from the current data directory.");
	await ze(Y, q, t);
	let n;
	try {
		n = G.activeProfileId === "user" ? L(W, {
			...G,
			dataDirectory: t
		}) : L(W, {
			...G,
			profiles: G.profiles.map((e) => e.id === G.activeProfileId ? {
				...e,
				dataDirectory: t
			} : e)
		});
	} catch (e) {
		try {
			f.rmSync(d.join(t, "inventory.db"), { force: !0 }), f.rmSync(d.join(t, "images"), {
				recursive: !0,
				force: !0
			});
		} catch (t) {
			throw AggregateError([e, t], "Could not save the new data folder setting or clean up its copied files.", { cause: t });
		}
		throw e;
	}
	return G = n, X();
}
async function Bt(e) {
	let t = d.resolve(e);
	if (t === d.resolve(J)) throw Error("Choose a backup file, not the active database.");
	let n = f.mkdtempSync(d.join(d.dirname(J), ".stockwise-restore-")), r = d.join(n, "restored.db"), i = d.join(n, "previous.db"), a = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${m()}.db`, o = d.join(d.dirname(J), a);
	try {
		await st(t, r), await ot(Y, o), Y.close();
		try {
			ct(J, r, i);
		} catch (e) {
			try {
				Dt();
			} catch (t) {
				throw AggregateError([e, t], "Restore failed and the active database could not be reopened.", { cause: t });
			}
			throw e;
		}
		return { recoveryBackupPath: o };
	} finally {
		f.rmSync(n, {
			recursive: !0,
			force: !0
		});
	}
}
function Vt(e) {
	return Ve(Y, e);
}
function Ht() {
	let e = Y.prepare("SELECT * FROM products").all();
	for (let t of e) {
		t.variants = Y.prepare("SELECT * FROM variants WHERE product_id = ?").all(t.id);
		let e = Y.prepare("SELECT * FROM bases WHERE product_id = ?").all(t.id);
		for (let n of e) {
			let e = Y.prepare("SELECT variant_id, stock FROM base_stock WHERE base_id = ?").all(n.id);
			n.stockMap = {};
			for (let t of e) n.stockMap[t.variant_id] = t.stock;
			n.stocks = t.variants.map((e) => n.stockMap[e.id] ?? 0);
		}
		t.bases = e;
	}
	return e;
}
function Ut() {
	return Ze(Y, G.invoiceDefaults?.invoiceNumber);
}
function Wt(e, t) {
	return z(Y, e, t);
}
function Gt(e) {
	Ue(Y, e);
}
function Kt(e, t) {
	He(Y, e, t);
}
function qt(e) {
	return Y.prepare("SELECT * FROM products WHERE name = ?").get(e);
}
function Jt(e, t) {
	return Y.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(e, t);
}
function Yt(e, t) {
	return Y.prepare("\n    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)\n    VALUES (?, ?, ?, ?, ?)\n  ").run(e, t.bucket_size, t.landing, t.sales, t.mp).lastInsertRowid;
}
function Xt(e, t) {
	return Y.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(e, t).lastInsertRowid;
}
function Zt(e, t) {
	return Y.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(e, t);
}
function Qt(e, t, n) {
	Y.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(e, t, n);
}
function $t(e) {
	let t = d.basename(e), n = d.join(q, "images", "product-images"), r = d.join(n, t);
	return f.existsSync(n) || f.mkdirSync(n, { recursive: !0 }), f.existsSync(r) || f.copyFileSync(e, r), `images/product-images/${t}`;
}
function en(e) {
	return e ? d.join(q, e) : null;
}
function tn(e) {
	let t = O(e);
	if (Y.prepare("SELECT 1 FROM customers WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(t.name)) throw Error(`Customer "${t.name}" already exists.`);
	return Y.prepare("\n    INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)\n  ").run(t.name, t.phone, t.address, t.notes).lastInsertRowid;
}
function Z(e, t) {
	if (!e) throw Error("Bill id is required.");
	let n = T(t?.type ?? "adjustment"), r = T(t?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), i = Number(t?.amount ?? 0), a = T(t?.paymentMethod ?? ""), o = T(t?.note ?? "");
	Y.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(e, n, r, i, a, o);
}
function nn(e) {
	return Y.prepare("SELECT * FROM bill_activity WHERE bill_id = ? ORDER BY date ASC, id ASC").all(e);
}
function rn(e, t) {
	return Ke(Y, e, t);
}
function an() {
	let e = Y.prepare("SELECT * FROM customers").all();
	for (let t of e) {
		let e = Y.prepare("SELECT * FROM bills WHERE customer_id = ?").all(t.id);
		for (let t of e) t.products = Y.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
		t.bills = e, t.totalDue = e.reduce((e, t) => e + t.amount_due, 0);
	}
	return e;
}
function on(e) {
	if (!Y.prepare("SELECT id FROM customers WHERE id = ?").get(e)) throw Error("Customer not found.");
	Y.transaction(() => {
		let t = Y.prepare("SELECT id FROM bills WHERE customer_id = ?").all(e);
		for (let e of t) Y.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e.id);
		Y.prepare("DELETE FROM bills WHERE customer_id = ?").run(e), Y.prepare("DELETE FROM customers WHERE id = ?").run(e);
	})();
}
function sn(e, t) {
	return Y.transaction(() => {
		let n = tn(e);
		return rn(n, t), n;
	})();
}
function cn(e) {
	if (!Y.prepare("SELECT id FROM bills WHERE id = ?").get(e)) throw Error("Bill not found.");
	Y.transaction(() => {
		let t = Y.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
		for (let e of t) R(Y, e.product_name, e.base, e.bucket_size, e.quantity);
		Y.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e), Y.prepare("DELETE FROM bills WHERE id = ?").run(e);
	})();
}
function ln(e, t) {
	let n = O(t);
	if (!Y.prepare("SELECT id FROM customers WHERE id = ?").get(e)) throw Error("Customer not found.");
	Y.prepare("\n    UPDATE customers SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?\n  ").run(n.name, n.phone, n.address, n.notes, e);
}
function Q(e, t) {
	let n = Y.prepare("SELECT * FROM bills WHERE id = ?").get(e);
	if (!n) throw Error("Bill not found.");
	let r = k(n.customer_id, t);
	Y.transaction(() => {
		let t = Y.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
		for (let e of t) R(Y, e.product_name, e.base, e.bucket_size, e.quantity);
		let i = Number(n.total_purchased || 0), a = Number(n.amount_paid || 0), o = r.totalPurchased - i, s = r.amountPaid - a;
		Y.prepare("\n      UPDATE bills SET\n        date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?,\n        status = ?, bill_type = ?, pan_number = ?, bill_number = ?, invoice_data = ?\n      WHERE id = ?\n    ").run(r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status, r.billType, r.panNumber, r.billNumber, r.invoiceData ? JSON.stringify(r.invoiceData) : null, e), Y.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e);
		for (let t of r.products) {
			let n = Cn(t.productName, t.bucketSize);
			Y.prepare("\n      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ").run(e, t.productName, t.base, t.bucketSize, t.quantity, t.priceAtSale, n), R(Y, t.productName, t.base, t.bucketSize, -t.quantity);
		}
		Math.abs(o) > .01 && Z(e, {
			type: "adjustment",
			date: r.date,
			amount: o,
			paymentMethod: r.paymentMethod,
			note: o >= 0 ? "Additional products added to bill" : "Bill value reduced"
		}), Math.abs(s) > .01 && Z(e, {
			type: "payment",
			date: r.date,
			amount: s,
			paymentMethod: r.paymentMethod,
			note: s >= 0 ? "Customer payment recorded" : "Payment adjusted"
		});
	})();
}
function un(e, t, n, r) {
	Y.transaction(() => {
		ln(e, t), Q(n, r);
	})();
}
function dn(e) {
	let t = A(e);
	return Y.prepare("INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)").run(t.date, t.nameOfExpense, t.amountOfExpense, t.typeOfExpense).lastInsertRowid;
}
function fn() {
	return Y.prepare("SELECT * FROM expenses ORDER BY date DESC").all().map((e) => ({
		id: e.id,
		date: e.date,
		nameOfExpense: e.label,
		typeOfExpense: e.type,
		amountOfExpense: e.amount
	}));
}
function pn(e) {
	et(Y, e, vn);
}
function mn() {
	let e = Y.prepare("SELECT * FROM bills").all(), t = {};
	return e.map((e) => {
		let n = Y.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id), r = Y.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		if (!(e.customer_id in t)) {
			let n = Y.prepare("SELECT amount_due FROM bills WHERE customer_id = ?").all(e.customer_id);
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
function hn(e) {
	let t = /* @__PURE__ */ new Date(), n;
	if (e === "yearly") n = `${t.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = t.getDay(), r = t.getDate() - e + (e === 0 ? -6 : 1);
		n = new Date(t.getFullYear(), t.getMonth(), r).toISOString().slice(0, 10);
	} else n = e === "all" ? "0000-01-01" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-01`;
	let r = Y.prepare("SELECT * FROM bills WHERE date >= ?").all(n), i = 0, a = 0, o = 0, s = 0, c = {};
	for (let e of r) {
		let t = Y.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		i += e.total_purchased;
		let n = e.invoice_data ? JSON.parse(e.invoice_data) : null;
		o += Number(n?.tax) || 0, a += t.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), s += e.amount_due;
		for (let e of t) c[e.product_name] = (c[e.product_name] || 0) + e.quantity;
	}
	let l = i - o - a, u = Y.prepare("SELECT * FROM expenses WHERE date >= ?").all(n), d = u.reduce((e, t) => e + t.amount, 0), f = "-", p = 0;
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
function gn(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = Y.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = Y.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
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
function _n(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = Y.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = Y.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id);
		t && (a[t.id] || (a[t.id] = {
			name: t.name,
			orders: 0,
			spend: 0
		}), a[t.id].orders += 1, a[t.id].spend += e.total_purchased);
	}
	return Object.values(a).sort((e, t) => t.spend - e.spend).slice(0, t);
}
function vn(e) {
	R(Y, e.product_name, e.base, e.bucket_size, -e.quantity);
}
function yn(e, t) {
	return Qe(Y, e, t);
}
function bn(e, t, n) {
	return $e(Y, e, t, n);
}
function xn(e, t) {
	let n = A(t);
	if (!Y.prepare("SELECT id FROM expenses WHERE id = ?").get(e)) throw Error("Expense not found.");
	Y.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?").run(n.date, n.nameOfExpense, n.amountOfExpense, n.typeOfExpense, e);
}
function Sn(e) {
	let t = Y.prepare("SELECT * FROM expenses WHERE id = ?").get(e);
	if (!t) return null;
	let n = Y.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(e);
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
function Cn(e, t) {
	let n = Y.prepare("SELECT * FROM products WHERE name = ?").get(e);
	if (!n) return 0;
	let r = Y.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(n.id, t);
	return r ? r.landing : 0;
}
function wn(e, t) {
	Y.prepare("DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?").run(e, t);
}
function Tn(e) {
	tt(Y, e);
}
function En(e) {
	if (typeof e != "string" || e.trim() === "") throw Error("Choose an Excel file to import.");
	let t;
	try {
		t = Ct.readFile(e);
	} catch (e) {
		throw Error("Could not read the selected Excel file. Check that it is a valid, accessible workbook.", { cause: e });
	}
	let n = t.Sheets["JESTH- 2083"];
	if (!n) throw Error("Sheet \"JESTH- 2083\" not found in this file.");
	let r = Ct.utils.sheet_to_json(n, {
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
	let h = {};
	for (let [e, t] of u) {
		let [n, r] = l(e);
		if (!n) continue;
		h[n] || (h[n] = {
			bases: [],
			variants: {},
			canonicalSet: !1
		});
		let i = h[n];
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
	let g = 0, _ = 0;
	return Y.transaction(() => {
		for (let [e, t] of Object.entries(h)) {
			let n = Object.keys(t.variants);
			if (n.length === 0) {
				_++;
				continue;
			}
			let r = Y.prepare("SELECT * FROM products WHERE name = ?").get(e), i;
			r ? i = r.id : (i = m(), Y.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(i, e, ""));
			let a = {};
			for (let e of n) {
				let n = t.variants[e], r = Y.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(i, Number(e));
				r ? a[e] = r.id : a[e] = Y.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(i, Number(e), n.landing, n.sales, n.mp).lastInsertRowid;
			}
			for (let e of t.bases) {
				let t = Y.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(i, e), r;
				r = t ? t.id : Y.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(i, e).lastInsertRowid;
				for (let e of n) {
					let t = a[e];
					Y.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(r, t) || Y.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)").run(r, t);
				}
			}
			g++;
		}
	})(), {
		imported: g,
		skipped: _
	};
}
//#endregion
//#region electron/main.js
var Dn = d.dirname(l(import.meta.url));
function $() {
	let e = new t({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: d.join(Dn, "preload.cjs"),
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
	}), process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(d.join(Dn, "../dist/index.html"));
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
	}), a.handle("db:addProduct", (e, t) => Vt(t)), a.handle("db:saveInventoryProduct", (e, t) => jt(t)), a.handle("db:getProducts", () => Ht()), a.handle("db:getNextInvoiceNumber", () => Ut()), a.handle("db:isInvoiceNumberAvailable", (e, t, n) => Wt(t, n)), a.handle("db:deleteProduct", (e, t) => Gt(t)), a.handle("db:editProduct", (e, t, n) => Kt(t, n)), a.handle("db:addExpense", (e, t) => dn(t)), a.handle("db:getExpenses", () => fn()), a.handle("db:deleteExpense", (e, t) => pn(t)), a.handle("db:getSales", () => mn()), a.handle("db:getNetPosition", (e, t) => hn(t)), a.handle("db:getProductByName", (e, t) => qt(t)), a.handle("db:getVariantBySize", (e, t, n) => Jt(t, n)), a.handle("db:addVariant", (e, t, n) => Yt(t, n)), a.handle("db:addBase", (e, t, n) => Xt(t, n)), a.handle("db:addBaseStock", (e, t, n, r) => Qt(t, n, r)), a.handle("db:getBaseByName", (e, t, n) => Zt(t, n)), a.handle("db:addCustomer", (e, t) => tn(t)), a.handle("db:addBill", (e, t, n) => rn(t, n)), a.handle("db:addCustomerBill", (e, t, n) => sn(t, n)), a.handle("db:editCustomerBill", (e, t, n, r, i) => un(t, n, r, i)), a.handle("db:addBillActivity", (e, t, n) => Z(t, n)), a.handle("db:getBillActivity", (e, t) => nn(t)), a.handle("db:editCustomer", (e, t, n) => ln(t, n)), a.handle("db:getExpenseDetails", (e, t) => Sn(t)), a.handle("db:editExpense", (e, t, n) => xn(t, n)), a.handle("db:editImportExpense", (e, t, n, r) => bn(t, n, r)), a.handle("db:editBill", (e, t, n) => Q(t, n)), a.handle("db:getCustomers", () => an()), a.handle("db:deleteCustomer", (e, t) => on(t)), a.handle("db:deleteBill", (e, t) => cn(t)), a.handle("db:resolveImagePath", (e, t) => en(t)), a.handle("db:createBackup", async (e) => {
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
		return n.canceled || !n.filePath ? null : { filePath: await kt(n.filePath) };
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
		let a = await Bt(n.filePaths[0]);
		return setTimeout(() => {
			r.relaunch(), r.exit(0);
		}, 1e3), a;
	}), a.handle("settings:pickExportDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose StockWise Export Folder",
			properties: ["openDirectory", "createDirectory"]
		});
		return n.canceled || n.filePaths.length === 0 ? null : n.filePaths[0];
	}), a.handle("settings:exportData", (e, t, n) => At(t, n, r.getVersion())), a.handle("settings:get", () => X()), a.handle("settings:createProfile", (e, t, n) => Nt(t, n)), a.handle("settings:setDefaultProfilePassword", (e, t) => Mt(t)), a.handle("settings:switchProfile", (e, n, r, i) => {
		let a = Pt(n, r, i);
		return setTimeout(() => {
			let n = t.fromWebContents(e.sender);
			n && !n.isDestroyed() && n.webContents.reload();
		}, 100), a;
	}), a.handle("settings:updateDefaultPaymentMethod", (e, t) => Ft(t)), a.handle("settings:updateInvoiceDefaults", (e, t) => It(t)), a.handle("settings:updateInventoryAddItemMode", (e, t) => Lt(t)), a.handle("settings:updateAppearance", (e, t, n) => Rt(t, n)), a.handle("settings:openDataDirectory", async () => {
		let e = await c.openPath(X().dataDirectory);
		if (e) throw Error(`Could not open the data folder: ${e}`);
	}), a.handle("settings:changeDataDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose an Empty StockWise Data Folder",
			properties: ["openDirectory"]
		});
		if (n.canceled || n.filePaths.length === 0) return null;
		let a = await zt(n.filePaths[0]);
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
	}), a.handle("db:recordImportExpense", (e, t, n) => yn(t, n)), a.handle("db:importExcel", (e, t) => En(t)), a.handle("db:copyImage", (e, t) => $t(t)), a.handle("db:deleteBaseStock", (e, t, n) => wn(t, n)), a.handle("db:deleteVariant", (e, t) => Tn(t)), a.handle("db:getTopProducts", (e, t) => gn(t)), a.handle("db:getTopCustomers", (e, t) => _n(t)), a.handle("dialog:pickImage", async () => {
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
	}), $();
}), r.on("window-all-closed", () => {
	process.platform !== "darwin" && r.quit();
}), r.on("activate", () => {
	t.getAllWindows().length === 0 && $();
});
//#endregion
export {};
