import { createRequire as e } from "node:module";
import { BrowserWindow as t, Menu as n, app as r, dialog as i, ipcMain as a, net as o, protocol as s, shell as c } from "electron";
import { fileURLToPath as l, pathToFileURL as u } from "url";
import d from "path";
import f from "fs";
import { createRequire as p } from "module";
import { randomUUID as m } from "crypto";
import h from "node:fs";
import g from "node:path";
import { randomUUID as _ } from "node:crypto";
//#region \0rolldown/runtime.js
var ee = Object.create, v = Object.defineProperty, te = Object.getOwnPropertyDescriptor, ne = Object.getOwnPropertyNames, re = Object.getPrototypeOf, ie = Object.prototype.hasOwnProperty, y = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ae = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = ne(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !ie.call(e, s) && s !== n && v(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = te(t, s)) || r.enumerable
	});
	return e;
}, oe = (e, t, n) => (n = e == null ? {} : ee(re(e)), ae(t || !e || !e.__esModule ? v(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), b = /* @__PURE__ */ e(import.meta.url), x = /* @__PURE__ */ y(((e) => {
	e.getBooleanOption = (e, t) => {
		let n = !1;
		if (t in e && typeof (n = e[t]) != "boolean") throw TypeError(`Expected the "${t}" option to be a boolean`);
		return n;
	}, e.cppdb = Symbol(), e.inspect = Symbol.for("nodejs.util.inspect.custom");
})), S = /* @__PURE__ */ y(((e, t) => {
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
})), se = /* @__PURE__ */ y(((e, t) => {
	var n = b("path").sep || "/";
	t.exports = r;
	function r(e) {
		if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://") throw TypeError("must pass in a file:// URI to convert to a file path");
		var t = decodeURI(e.substring(7)), r = t.indexOf("/"), i = t.substring(0, r), a = t.substring(r + 1);
		return i == "localhost" && (i = ""), i &&= n + n + i, a = a.replace(/^(.+)\|/, "$1:"), n == "\\" && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = n + a), i + a;
	}
})), ce = /* @__PURE__ */ y(((e, t) => {
	var n = b("fs"), r = b("path"), i = se(), a = r.join, o = r.dirname, s = n.accessSync && function(e) {
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
		for (var n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : b, i = [], o = 0, s = t.try.length, l, u, d; o < s; o++) {
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
})), le = /* @__PURE__ */ y(((e) => {
	var { cppdb: t } = x();
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
})), ue = /* @__PURE__ */ y(((e, t) => {
	var { cppdb: n } = x(), r = /* @__PURE__ */ new WeakMap();
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
})), de = /* @__PURE__ */ y(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = x();
	t.exports = function(e, t) {
		if (t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		let i = n(t, "simple"), a = this[r].prepare(`PRAGMA ${e}`, this, !0);
		return i ? a.pluck().get() : a.all();
	};
})), fe = /* @__PURE__ */ y(((e, t) => {
	var n = b("fs"), r = b("path"), { promisify: i } = b("util"), { cppdb: a } = x(), o = i(n.access);
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
})), pe = /* @__PURE__ */ y(((e, t) => {
	var { cppdb: n } = x();
	t.exports = function(e) {
		if (e ??= {}, typeof e != "object") throw TypeError("Expected first argument to be an options object");
		let t = "attached" in e ? e.attached : "main";
		if (typeof t != "string") throw TypeError("Expected the \"attached\" option to be a string");
		if (!t) throw TypeError("The \"attached\" option cannot be an empty string");
		return this[n].serialize(t);
	};
})), me = /* @__PURE__ */ y(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = x();
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
})), he = /* @__PURE__ */ y(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = x();
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
})), ge = /* @__PURE__ */ y(((e, t) => {
	var { cppdb: n } = x();
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
})), _e = /* @__PURE__ */ y(((e, t) => {
	var n = function() {};
	t.exports = function(e, t) {
		return Object.assign(new n(), this);
	};
})), ve = /* @__PURE__ */ y(((e, t) => {
	var n = b("fs"), r = b("path"), i = x(), a = S(), o;
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
		if (_ = g == null ? o ||= ce()("better_sqlite3.node") : typeof g == "string" ? (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : b)(r.resolve(g).replace(/(\.node)?$/, ".node")) : g, _.isInitialized || (_.setErrorConstructor(a), _.isInitialized = !0), !d && !u.startsWith("file:") && !n.existsSync(r.dirname(u))) throw TypeError("Cannot open database because the directory does not exist");
		Object.defineProperties(this, {
			[i.cppdb]: { value: new _.Database(u, e, d, f, p, m, h || null, l || null) },
			...c.getters
		});
	}
	var c = le();
	s.prototype.prepare = c.prepare, s.prototype.transaction = ue(), s.prototype.pragma = de(), s.prototype.backup = fe(), s.prototype.serialize = pe(), s.prototype.function = me(), s.prototype.aggregate = he(), s.prototype.table = ge(), s.prototype.loadExtension = c.loadExtension, s.prototype.exec = c.exec, s.prototype.close = c.close, s.prototype.defaultSafeIntegers = c.defaultSafeIntegers, s.prototype.unsafeMode = c.unsafeMode, s.prototype[i.inspect] = _e(), t.exports = s;
})), C = /* @__PURE__ */ oe((/* @__PURE__ */ y(((e, t) => {
	t.exports = ve(), t.exports.SqliteError = S();
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
	let i = E(t.totalPurchased, "Total purchased", { min: 0 }), a = E(t.amountPaid, "Amount paid", { min: 0 }), o = E(t.amountDue, "Amount due", { min: 0 });
	w(Array.isArray(t.products) && t.products.length > 0, "Bill must contain at least one product.");
	let s = 0, c = t.products.map((e, t) => {
		let n = T(e?.productName ?? e?.product_name), r = T(e?.base), i = E(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = E(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = E(e?.priceAtSale ?? e?.price_at_sale ?? 0, `Item ${t + 1} price`, { min: 0 });
		return w(n.length > 0, `Item ${t + 1} product name is required.`), w(r.length > 0, `Item ${t + 1} base is required.`), s += a * o, {
			...e,
			productName: n,
			base: r,
			bucketSize: i,
			quantity: a,
			priceAtSale: o
		};
	});
	return w(Math.abs(s - i) < .01, "Bill total does not match the sum of item prices."), w(Math.abs(a + o - i) < .01, "Bill payment values must add up to the total purchased."), {
		date: r,
		paymentMethod: T(t.paymentMethod, ""),
		totalPurchased: i,
		amountPaid: a,
		amountDue: o,
		status: T(t.status, "Open"),
		products: c,
		customerId: n
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
function j(e) {
	if (!Array.isArray(e) || e.length === 0) throw Error("At least one import item is required.");
	return e.map((e, t) => {
		let n = T(e?.productName ?? e?.product_name), r = T(e?.base), i = E(e?.bucketSize ?? e?.bucket_size, `Item ${t + 1} bucket size`, {
			min: 1e-4,
			allowZero: !1
		}), a = E(e?.quantity, `Item ${t + 1} quantity`, {
			min: 1e-4,
			allowZero: !1
		}), o = E(e?.costPrice ?? e?.cost_price ?? 0, `Item ${t + 1} cost price`, { min: 0 });
		return w(n.length > 0, `Item ${t + 1} product name is required.`), w(r.length > 0, `Item ${t + 1} base is required.`), {
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
var M = [{
	version: 1,
	up(e) {
		e.exec("\n        CREATE TABLE IF NOT EXISTS products (\n          id TEXT PRIMARY KEY,\n          name TEXT NOT NULL,\n          images TEXT\n        );\n\n        CREATE TABLE IF NOT EXISTS variants (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          product_id TEXT NOT NULL,\n          bucket_size REAL NOT NULL,\n          landing REAL,\n          sales REAL,\n          mp REAL,\n          FOREIGN KEY (product_id) REFERENCES products(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bases (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          product_id TEXT NOT NULL,\n          name TEXT NOT NULL,\n          FOREIGN KEY (product_id) REFERENCES products(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS base_stock (\n          base_id INTEGER NOT NULL,\n          variant_id INTEGER NOT NULL,\n          stock REAL NOT NULL DEFAULT 0,\n          PRIMARY KEY (base_id, variant_id),\n          FOREIGN KEY (base_id) REFERENCES bases(id),\n          FOREIGN KEY (variant_id) REFERENCES variants(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS customers (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          name TEXT NOT NULL,\n          phone TEXT,\n          address TEXT,\n          notes TEXT\n        );\n\n        CREATE TABLE IF NOT EXISTS expenses (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          date TEXT NOT NULL,\n          label TEXT NOT NULL,\n          amount REAL NOT NULL,\n          type TEXT DEFAULT 'General'\n        );\n\n        CREATE TABLE IF NOT EXISTS expense_items (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          expense_id INTEGER NOT NULL,\n          product_name TEXT NOT NULL,\n          base TEXT,\n          bucket_size REAL,\n          quantity REAL NOT NULL,\n          cost_price REAL NOT NULL,\n          FOREIGN KEY (expense_id) REFERENCES expenses(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bills (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          customer_id INTEGER NOT NULL,\n          date TEXT NOT NULL,\n          payment_method TEXT,\n          total_purchased REAL NOT NULL,\n          amount_paid REAL NOT NULL,\n          amount_due REAL NOT NULL,\n          status TEXT NOT NULL,\n          FOREIGN KEY (customer_id) REFERENCES customers(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bill_activity (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          bill_id INTEGER NOT NULL,\n          type TEXT NOT NULL,\n          date TEXT NOT NULL,\n          amount REAL NOT NULL DEFAULT 0,\n          payment_method TEXT,\n          note TEXT,\n          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,\n          FOREIGN KEY (bill_id) REFERENCES bills(id)\n        );\n\n        CREATE TABLE IF NOT EXISTS bill_items (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          bill_id INTEGER NOT NULL,\n          product_name TEXT NOT NULL,\n          base TEXT,\n          bucket_size REAL,\n          quantity REAL NOT NULL,\n          price_at_sale REAL NOT NULL,\n          cost_price REAL DEFAULT 0,\n          FOREIGN KEY (bill_id) REFERENCES bills(id)\n        );\n      "), e.prepare("PRAGMA table_info(bill_items)").all().some((e) => e.name === "cost_price") || e.exec("ALTER TABLE bill_items ADD COLUMN cost_price REAL DEFAULT 0");
	}
}, {
	version: 2,
	up(e) {
		e.prepare("PRAGMA table_info(expenses)").all().some((e) => e.name === "invoice_data") || e.exec("ALTER TABLE expenses ADD COLUMN invoice_data TEXT");
	}
}];
function N(e) {
	let t = e.pragma("user_version", { simple: !0 }), n = M.at(-1)?.version ?? 0;
	if (t > n) throw Error(`Database schema version ${t} is newer than supported version ${n}.`);
	for (let n of M) if (!(n.version <= t)) {
		if (n.version !== t + 1) throw Error(`Missing database migration for version ${t + 1}.`);
		e.transaction(() => {
			n.up(e), e.pragma(`user_version = ${n.version}`);
		})(), t = n.version;
	}
	return t;
}
//#endregion
//#region src/Backend/appConfig.js
var ye = "Cash", be = [
	"Cash",
	"UPI",
	"Card",
	"Credit"
];
function P() {
	return {
		shopName: "",
		shopAddress: "",
		shopTelephone: "",
		invoiceNumber: "",
		tpinNumber: ""
	};
}
function xe() {
	return {
		defaultPaymentMethod: ye,
		dataDirectory: null,
		invoiceDefaults: P()
	};
}
function F(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw Error("Application settings must be a JSON object.");
	let t = e.defaultPaymentMethod ?? "Cash";
	if (!be.includes(t)) throw Error("Default payment method must be Cash, UPI, Card, or Credit.");
	let n = e.dataDirectory ?? null;
	if (n !== null && (typeof n != "string" || !g.isAbsolute(n))) throw Error("The configured data directory must be an absolute path.");
	let r = e.invoiceDefaults ?? P();
	if (!r || typeof r != "object" || Array.isArray(r)) throw Error("Invoice defaults must be a JSON object.");
	let i = P();
	for (let e of Object.keys(i)) {
		let t = r[e] ?? "";
		if (typeof t != "string") throw Error(`Invoice default "${e}" must be text.`);
		i[e] = t.trim();
	}
	return {
		defaultPaymentMethod: t,
		dataDirectory: n,
		invoiceDefaults: i
	};
}
function Se(e) {
	if (!h.existsSync(e)) return xe();
	let t;
	try {
		t = JSON.parse(h.readFileSync(e, "utf8"));
	} catch (t) {
		throw Error(`Could not read application settings at "${e}".`, { cause: t });
	}
	return F(t);
}
function I(e, t) {
	let n = F(t), r = g.dirname(e);
	h.mkdirSync(r, { recursive: !0 });
	let i = g.join(r, `.settings-${_()}.tmp`);
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
function Ce({ config: e, isPackaged: t, userDataPath: n, developmentPath: r }) {
	let i = F(e);
	return g.resolve(i.dataDirectory || (t ? n : r));
}
async function we(e, t, n) {
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
function Te(e, t) {
	let n = D(t), r = e.prepare("SELECT id FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n.name);
	return e.transaction(() => {
		let t = r?.id || n.id || _();
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
function Ee(e, t) {
	let n = D(t), r = n.id || _();
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
function De(e, t, n) {
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
function Oe(e, t) {
	if (!t) throw Error("Product id is required.");
	if (!e.prepare("SELECT 1 FROM products WHERE id = ?").get(t)) throw Error("Product not found.");
	e.transaction(() => {
		let n = e.prepare("SELECT id FROM variants WHERE product_id = ?").all(t), r = e.prepare("SELECT id FROM bases WHERE product_id = ?").all(t);
		for (let t of n) e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t.id);
		for (let t of r) e.prepare("DELETE FROM base_stock WHERE base_id = ?").run(t.id);
		e.prepare("DELETE FROM variants WHERE product_id = ?").run(t), e.prepare("DELETE FROM bases WHERE product_id = ?").run(t), e.prepare("DELETE FROM products WHERE id = ?").run(t);
	})();
}
function L(e, t, n, r, i) {
	let a = t ? String(t).trim() : "", o = n ? String(n).trim() : "", s = parseFloat(r) || 0, c = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(a);
	if (!c) return;
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c.id, s);
	if (!l) return;
	let u = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c.id, o);
	u && e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(i, u.id, l.id);
}
function ke(e, t, n) {
	let r = e.prepare("SELECT * FROM products WHERE name = ?").get(t);
	if (!r) return 0;
	let i = e.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(r.id, n);
	return i ? i.landing : 0;
}
function Ae(e, t, n) {
	e.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(t, n.type, n.date, n.amount, n.paymentMethod, n.note);
}
function je(e, t, n) {
	let r = k(t, n);
	if (!e.prepare("SELECT id FROM customers WHERE id = ?").get(r.customerId)) throw Error("Customer not found.");
	return e.transaction(() => {
		let t = e.prepare("\n        INSERT INTO bills (customer_id, date, payment_method, total_purchased, amount_paid, amount_due, status)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ").run(r.customerId, r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status).lastInsertRowid;
		Ae(e, t, {
			type: "sale",
			date: r.date,
			amount: r.totalPurchased,
			paymentMethod: r.paymentMethod,
			note: "Initial bill entry"
		});
		for (let n of r.products) {
			let r = ke(e, n.productName, n.bucketSize);
			e.prepare("\n        INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.priceAtSale, r), L(e, n.productName, n.base, n.bucketSize, -n.quantity);
		}
		return r.amountPaid > 0 && Ae(e, t, {
			type: "payment",
			date: r.date,
			amount: r.amountPaid,
			paymentMethod: r.paymentMethod,
			note: "Payment recorded on bill creation"
		}), t;
	})();
}
function Me(e, t) {
	let n = t.productName ? String(t.productName).trim() : "", r = t.base ? String(t.base).trim() : "", i = parseFloat(t.bucketSize) || 0, a = parseFloat(t.quantity) || 0, o = parseFloat(t.costPrice) || 0, s = e.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(n), c;
	s ? c = s.id : (c = _(), e.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(c, n, ""));
	let l = e.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(c, i), u;
	l ? (u = l.id, e.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(o, u)) : u = e.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(c, i, o, 0, 0).lastInsertRowid;
	let d = e.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(c, r)?.id ?? e.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(c, r).lastInsertRowid;
	e.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(d, u) ? e.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(a, d, u) : e.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(d, u, a);
}
function Ne(e, t) {
	L(e, t.product_name, t.base, t.bucket_size, -t.quantity);
}
function R(e) {
	if (e == null) return null;
	if (typeof e != "object" || Array.isArray(e)) throw Error("Invoice data must be an object.");
	return JSON.stringify(e);
}
function Pe(e, t, n) {
	let r = j(n), i = r.reduce((e, t) => e + t.costPrice * t.quantity, 0), a = A({
		...t,
		amountOfExpense: i,
		typeOfExpense: "Import"
	});
	return {
		id: e.transaction(() => {
			for (let t of r) Me(e, t);
			let n = e.prepare("INSERT INTO expenses (date, label, amount, type, invoice_data) VALUES (?, ?, ?, ?, ?)").run(a.date, a.nameOfExpense, i, "Import", R(t.invoiceData)).lastInsertRowid;
			for (let t of r) e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(n, t.productName, t.base, t.bucketSize, t.quantity, t.costPrice);
			return n;
		})(),
		totalCost: i
	};
}
function Fe(e, t, n, r) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	let i = j(r), a = i.reduce((e, t) => e + t.costPrice * t.quantity, 0), o = A({
		...n,
		amountOfExpense: a,
		typeOfExpense: "Import"
	}), s = R(n.invoiceData), c = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
	return e.transaction(() => {
		for (let t of c) Ne(e, t);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t);
		for (let n of i) Me(e, n), e.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(t, n.productName, n.base, n.bucketSize, n.quantity, n.costPrice);
		e.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, invoice_data = ? WHERE id = ?").run(o.date, o.nameOfExpense, a, s, t);
	})(), a;
}
//#endregion
//#region src/Backend/inventoryDeletes.js
function Ie(e, t, n) {
	if (!e.prepare("SELECT id FROM expenses WHERE id = ?").get(t)) throw Error("Expense not found.");
	e.transaction(() => {
		let r = e.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(t);
		for (let e of r) n(e);
		e.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(t), e.prepare("DELETE FROM expenses WHERE id = ?").run(t);
	})();
}
function Le(e, t) {
	e.transaction(() => {
		e.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(t), e.prepare("DELETE FROM variants WHERE id = ?").run(t);
	})();
}
//#endregion
//#region src/Backend/databaseBackup.js
var Re = {
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
		"status"
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
}, ze = {
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
function z(e) {
	let t = e.pragma("integrity_check", { simple: !0 });
	if (t !== "ok") throw Error(`SQLite integrity check failed: ${t}`);
}
function B(e, t = !1) {
	let n = t ? Re : ze, r = new Set(e.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map((e) => e.name));
	if (Object.entries(n).filter(([t, n]) => {
		if (!r.has(t)) return !0;
		let i = new Set(e.prepare(`PRAGMA table_info(${t})`).all().map((e) => e.name));
		return n.some((e) => !i.has(e));
	}).length > 0) throw Error("The selected file does not contain a complete StockWise database schema.");
}
async function V(e, t) {
	if (!e.open) throw Error("The active database is not open.");
	let n = g.resolve(t);
	if (e.name && g.resolve(e.name) === n) throw Error("Choose a different file from the active database.");
	return await e.backup(n), n;
}
async function Be(e, t) {
	let n = g.resolve(e), r = g.resolve(t);
	if (n === r) throw Error("The restore source and staging file must be different.");
	if (h.existsSync(r)) throw Error("The restore staging file already exists.");
	try {
		let e = new C.default(n, {
			readonly: !0,
			fileMustExist: !0
		});
		try {
			z(e), B(e), await e.backup(r);
		} finally {
			e.close();
		}
		let t = new C.default(r);
		try {
			let e = N(t);
			return z(t), B(t, !0), { schemaVersion: e };
		} finally {
			t.close();
		}
	} catch (e) {
		throw h.rmSync(r, { force: !0 }), e;
	}
}
function Ve(e, t, n) {
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
//#region src/Backend/server.js
var H = p(import.meta.url)("xlsx"), He = d.dirname(l(import.meta.url)), U = d.join(r.getPath("userData"), "settings.json"), W = Se(U), G = Ce({
	config: W,
	isPackaged: r.isPackaged,
	userDataPath: r.getPath("userData"),
	developmentPath: d.join(He, "../", "Database")
}), K = d.join(G, "inventory.db"), q;
function J() {
	f.mkdirSync(G, { recursive: !0 }), q = new C.default(K), N(q);
}
J();
function Ue(e) {
	return V(q, e);
}
function We(e) {
	return Te(q, e);
}
function Y() {
	return {
		...W,
		dataDirectory: G
	};
}
function Ge(e) {
	return W = I(U, {
		...W,
		defaultPaymentMethod: e
	}), Y();
}
function Ke(e) {
	return W = I(U, {
		...W,
		invoiceDefaults: e
	}), Y();
}
async function qe(e) {
	if (typeof e != "string" || !e.trim()) throw Error("A data directory is required.");
	let t = d.resolve(e);
	if (t === G) throw Error("Choose a different folder from the current data directory.");
	await we(q, G, t);
	let n;
	try {
		n = I(U, {
			...W,
			dataDirectory: t
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
	return W = n, {
		...W,
		dataDirectory: t
	};
}
async function Je(e) {
	let t = d.resolve(e);
	if (t === d.resolve(K)) throw Error("Choose a backup file, not the active database.");
	let n = f.mkdtempSync(d.join(d.dirname(K), ".stockwise-restore-")), r = d.join(n, "restored.db"), i = d.join(n, "previous.db"), a = `StockWise-Recovery-${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-${m()}.db`, o = d.join(d.dirname(K), a);
	try {
		await Be(t, r), await V(q, o), q.close();
		try {
			Ve(K, r, i);
		} catch (e) {
			try {
				J();
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
function Ye(e) {
	return Ee(q, e);
}
function Xe() {
	let e = q.prepare("SELECT * FROM products").all();
	for (let t of e) {
		t.variants = q.prepare("SELECT * FROM variants WHERE product_id = ?").all(t.id);
		let e = q.prepare("SELECT * FROM bases WHERE product_id = ?").all(t.id);
		for (let n of e) {
			let e = q.prepare("SELECT variant_id, stock FROM base_stock WHERE base_id = ?").all(n.id);
			n.stockMap = {};
			for (let t of e) n.stockMap[t.variant_id] = t.stock;
			n.stocks = t.variants.map((e) => n.stockMap[e.id] ?? 0);
		}
		t.bases = e;
	}
	return e;
}
function Ze(e) {
	Oe(q, e);
}
function Qe(e, t) {
	De(q, e, t);
}
function $e(e) {
	return q.prepare("SELECT * FROM products WHERE name = ?").get(e);
}
function et(e, t) {
	return q.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(e, t);
}
function tt(e, t) {
	return q.prepare("\n    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)\n    VALUES (?, ?, ?, ?, ?)\n  ").run(e, t.bucket_size, t.landing, t.sales, t.mp).lastInsertRowid;
}
function nt(e, t) {
	return q.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(e, t).lastInsertRowid;
}
function rt(e, t) {
	return q.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(e, t);
}
function it(e, t, n) {
	q.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(e, t, n);
}
function at(e) {
	let t = d.basename(e), n = d.join(G, "images", "product-images"), r = d.join(n, t);
	return f.existsSync(n) || f.mkdirSync(n, { recursive: !0 }), f.existsSync(r) || f.copyFileSync(e, r), `images/product-images/${t}`;
}
function ot(e) {
	return e ? d.join(G, e) : null;
}
function X(e) {
	let t = O(e);
	if (q.prepare("SELECT 1 FROM customers WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(t.name)) throw Error(`Customer "${t.name}" already exists.`);
	return q.prepare("\n    INSERT INTO customers (name, phone, address, notes) VALUES (?, ?, ?, ?)\n  ").run(t.name, t.phone, t.address, t.notes).lastInsertRowid;
}
function Z(e, t) {
	if (!e) throw Error("Bill id is required.");
	let n = T(t?.type ?? "adjustment"), r = T(t?.date ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)), i = Number(t?.amount ?? 0), a = T(t?.paymentMethod ?? ""), o = T(t?.note ?? "");
	q.prepare("INSERT INTO bill_activity (bill_id, type, date, amount, payment_method, note) VALUES (?, ?, ?, ?, ?, ?)").run(e, n, r, i, a, o);
}
function st(e) {
	return q.prepare("SELECT * FROM bill_activity WHERE bill_id = ? ORDER BY date ASC, id ASC").all(e);
}
function Q(e, t) {
	return je(q, e, t);
}
function ct() {
	let e = q.prepare("SELECT * FROM customers").all();
	for (let t of e) {
		let e = q.prepare("SELECT * FROM bills WHERE customer_id = ?").all(t.id);
		for (let t of e) t.products = q.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
		t.bills = e, t.totalDue = e.reduce((e, t) => e + t.amount_due, 0);
	}
	return e;
}
function lt(e) {
	if (!q.prepare("SELECT id FROM customers WHERE id = ?").get(e)) throw Error("Customer not found.");
	q.transaction(() => {
		let t = q.prepare("SELECT id FROM bills WHERE customer_id = ?").all(e);
		for (let e of t) q.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e.id);
		q.prepare("DELETE FROM bills WHERE customer_id = ?").run(e), q.prepare("DELETE FROM customers WHERE id = ?").run(e);
	})();
}
function ut(e, t) {
	return q.transaction(() => {
		let n = X(e);
		return Q(n, t), n;
	})();
}
function dt(e) {
	if (!q.prepare("SELECT id FROM bills WHERE id = ?").get(e)) throw Error("Bill not found.");
	q.transaction(() => {
		let t = q.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
		for (let e of t) $(e.product_name, e.base, e.bucket_size, e.quantity);
		q.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e), q.prepare("DELETE FROM bills WHERE id = ?").run(e);
	})();
}
function ft(e, t) {
	let n = O(t);
	if (!q.prepare("SELECT id FROM customers WHERE id = ?").get(e)) throw Error("Customer not found.");
	q.prepare("\n    UPDATE customers SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?\n  ").run(n.name, n.phone, n.address, n.notes, e);
}
function pt(e, t) {
	let n = q.prepare("SELECT * FROM bills WHERE id = ?").get(e);
	if (!n) throw Error("Bill not found.");
	let r = k(n.customer_id, t);
	q.transaction(() => {
		let t = q.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
		for (let e of t) $(e.product_name, e.base, e.bucket_size, e.quantity);
		let i = Number(n.total_purchased || 0), a = Number(n.amount_paid || 0), o = r.totalPurchased - i, s = r.amountPaid - a;
		q.prepare("\n      UPDATE bills SET date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?, status = ?\n      WHERE id = ?\n    ").run(r.date, r.paymentMethod, r.totalPurchased, r.amountPaid, r.amountDue, r.status, e), q.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e);
		for (let t of r.products) {
			let n = Dt(t.productName, t.bucketSize);
			q.prepare("\n      INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n      VALUES (?, ?, ?, ?, ?, ?, ?)\n    ").run(e, t.productName, t.base, t.bucketSize, t.quantity, t.priceAtSale, n), $(t.productName, t.base, t.bucketSize, -t.quantity);
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
function mt(e, t, n, r) {
	q.transaction(() => {
		ft(e, t), pt(n, r);
	})();
}
function $(e, t, n, r) {
	let i = e ? String(e).trim() : "", a = t ? String(t).trim() : "", o = parseFloat(n) || 0, s = q.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(i);
	if (!s) return;
	let c = q.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(s.id, o);
	if (!c) return;
	let l = q.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(s.id, a);
	l && q.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(r, l.id, c.id);
}
function ht(e) {
	let t = A(e);
	return q.prepare("INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)").run(t.date, t.nameOfExpense, t.amountOfExpense, t.typeOfExpense).lastInsertRowid;
}
function gt() {
	return q.prepare("SELECT * FROM expenses ORDER BY date DESC").all().map((e) => ({
		id: e.id,
		date: e.date,
		nameOfExpense: e.label,
		typeOfExpense: e.type,
		amountOfExpense: e.amount
	}));
}
function _t(e) {
	Ie(q, e, St);
}
function vt() {
	let e = q.prepare("SELECT * FROM bills").all(), t = {};
	return e.map((e) => {
		let n = q.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id), r = q.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		if (!(e.customer_id in t)) {
			let n = q.prepare("SELECT amount_due FROM bills WHERE customer_id = ?").all(e.customer_id);
			t[e.customer_id] = n.reduce((e, t) => e + t.amount_due, 0);
		}
		let i = r.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), a = e.total_purchased, o = a - i;
		return {
			id: e.id,
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
			netGain: o
		};
	});
}
function yt(e) {
	let t = /* @__PURE__ */ new Date(), n;
	if (e === "yearly") n = `${t.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = t.getDay(), r = t.getDate() - e + (e === 0 ? -6 : 1);
		n = new Date(t.getFullYear(), t.getMonth(), r).toISOString().slice(0, 10);
	} else n = e === "all" ? "0000-01-01" : `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-01`;
	let r = q.prepare("SELECT * FROM bills WHERE date >= ?").all(n), i = 0, a = 0, o = 0, s = {};
	for (let e of r) {
		let t = q.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		i += e.total_purchased, a += t.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), o += e.amount_due;
		for (let e of t) s[e.product_name] = (s[e.product_name] || 0) + e.quantity;
	}
	let c = i - a, l = q.prepare("SELECT * FROM expenses WHERE date >= ?").all(n), u = l.reduce((e, t) => e + t.amount, 0), d = "-", f = 0;
	for (let [e, t] of Object.entries(s)) t > f && (f = t, d = e);
	let p = r.map((e) => ({
		label: `Sale #${e.id}`,
		date: e.date,
		amount: e.total_purchased
	})), m = l.map((e) => ({
		label: e.label,
		date: e.date,
		amount: -e.amount
	})), h = [...p, ...m].sort((e, t) => new Date(t.date) - new Date(e.date)).slice(0, 8);
	return {
		totalEarned: i,
		totalExpenses: u,
		totalDue: o,
		totalProfit: c,
		netPosition: c - u,
		totalSales: r.length,
		profitPerSale: r.length > 0 ? c / r.length : 0,
		topCategory: d,
		recentActivity: h
	};
}
function bt(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = q.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = q.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
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
function xt(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = q.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = q.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id);
		t && (a[t.id] || (a[t.id] = {
			name: t.name,
			orders: 0,
			spend: 0
		}), a[t.id].orders += 1, a[t.id].spend += e.total_purchased);
	}
	return Object.values(a).sort((e, t) => t.spend - e.spend).slice(0, t);
}
function St(e) {
	$(e.product_name, e.base, e.bucket_size, -e.quantity);
}
function Ct(e, t) {
	return Pe(q, e, t);
}
function wt(e, t, n) {
	return Fe(q, e, t, n);
}
function Tt(e, t) {
	let n = A(t);
	if (!q.prepare("SELECT id FROM expenses WHERE id = ?").get(e)) throw Error("Expense not found.");
	q.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?").run(n.date, n.nameOfExpense, n.amountOfExpense, n.typeOfExpense, e);
}
function Et(e) {
	let t = q.prepare("SELECT * FROM expenses WHERE id = ?").get(e);
	if (!t) return null;
	let n = q.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(e);
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
function Dt(e, t) {
	let n = q.prepare("SELECT * FROM products WHERE name = ?").get(e);
	if (!n) return 0;
	let r = q.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(n.id, t);
	return r ? r.landing : 0;
}
function Ot(e, t) {
	q.prepare("DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?").run(e, t);
}
function kt(e) {
	Le(q, e);
}
function At(e) {
	if (typeof e != "string" || e.trim() === "") throw Error("Choose an Excel file to import.");
	let t;
	try {
		t = H.readFile(e);
	} catch (e) {
		throw Error("Could not read the selected Excel file. Check that it is a valid, accessible workbook.", { cause: e });
	}
	let n = t.Sheets["JESTH- 2083"];
	if (!n) throw Error("Sheet \"JESTH- 2083\" not found in this file.");
	let r = H.utils.sheet_to_json(n, {
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
	return q.transaction(() => {
		for (let [e, t] of Object.entries(h)) {
			let n = Object.keys(t.variants);
			if (n.length === 0) {
				_++;
				continue;
			}
			let r = q.prepare("SELECT * FROM products WHERE name = ?").get(e), i;
			r ? i = r.id : (i = m(), q.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(i, e, ""));
			let a = {};
			for (let e of n) {
				let n = t.variants[e], r = q.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(i, Number(e));
				r ? a[e] = r.id : a[e] = q.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(i, Number(e), n.landing, n.sales, n.mp).lastInsertRowid;
			}
			for (let e of t.bases) {
				let t = q.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(i, e), r;
				r = t ? t.id : q.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(i, e).lastInsertRowid;
				for (let e of n) {
					let t = a[e];
					q.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(r, t) || q.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)").run(r, t);
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
var jt = d.dirname(l(import.meta.url));
function Mt() {
	let e = new t({
		width: 1200,
		height: 800,
		webPreferences: {
			preload: d.join(jt, "preload.cjs"),
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
	}), process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(d.join(jt, "../dist/index.html"));
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
	s.handle("app-image", (e) => {
		try {
			let t = new URL(e.url).searchParams.get("path");
			if (!t) throw Error("No path provided");
			let n = u(t).href;
			return o.fetch(n);
		} catch (t) {
			return console.error("app-image protocol error:", t.message, e.url), new Response("Not found", { status: 404 });
		}
	}), a.handle("db:addProduct", (e, t) => Ye(t)), a.handle("db:saveInventoryProduct", (e, t) => We(t)), a.handle("db:getProducts", () => Xe()), a.handle("db:deleteProduct", (e, t) => Ze(t)), a.handle("db:editProduct", (e, t, n) => Qe(t, n)), a.handle("db:addExpense", (e, t) => ht(t)), a.handle("db:getExpenses", () => gt()), a.handle("db:deleteExpense", (e, t) => _t(t)), a.handle("db:getSales", () => vt()), a.handle("db:getNetPosition", (e, t) => yt(t)), a.handle("db:getProductByName", (e, t) => $e(t)), a.handle("db:getVariantBySize", (e, t, n) => et(t, n)), a.handle("db:addVariant", (e, t, n) => tt(t, n)), a.handle("db:addBase", (e, t, n) => nt(t, n)), a.handle("db:addBaseStock", (e, t, n, r) => it(t, n, r)), a.handle("db:getBaseByName", (e, t, n) => rt(t, n)), a.handle("db:addCustomer", (e, t) => X(t)), a.handle("db:addBill", (e, t, n) => Q(t, n)), a.handle("db:addCustomerBill", (e, t, n) => ut(t, n)), a.handle("db:editCustomerBill", (e, t, n, r, i) => mt(t, n, r, i)), a.handle("db:addBillActivity", (e, t, n) => Z(t, n)), a.handle("db:getBillActivity", (e, t) => st(t)), a.handle("db:editCustomer", (e, t, n) => ft(t, n)), a.handle("db:getExpenseDetails", (e, t) => Et(t)), a.handle("db:editExpense", (e, t, n) => Tt(t, n)), a.handle("db:editImportExpense", (e, t, n, r) => wt(t, n, r)), a.handle("db:editBill", (e, t, n) => pt(t, n)), a.handle("db:getCustomers", () => ct()), a.handle("db:deleteCustomer", (e, t) => lt(t)), a.handle("db:deleteBill", (e, t) => dt(t)), a.handle("db:resolveImagePath", (e, t) => ot(t)), a.handle("db:createBackup", async (e) => {
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
		return n.canceled || !n.filePath ? null : { filePath: await Ue(n.filePath) };
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
		let a = await Je(n.filePaths[0]);
		return setTimeout(() => {
			r.relaunch(), r.exit(0);
		}, 1e3), a;
	}), a.handle("settings:get", () => Y()), a.handle("settings:updateDefaultPaymentMethod", (e, t) => Ge(t)), a.handle("settings:updateInvoiceDefaults", (e, t) => Ke(t)), a.handle("settings:openDataDirectory", async () => {
		let e = await c.openPath(Y().dataDirectory);
		if (e) throw Error(`Could not open the data folder: ${e}`);
	}), a.handle("settings:changeDataDirectory", async (e) => {
		let n = await i.showOpenDialog(t.fromWebContents(e.sender), {
			title: "Choose an Empty StockWise Data Folder",
			properties: ["openDirectory"]
		});
		if (n.canceled || n.filePaths.length === 0) return null;
		let a = await qe(n.filePaths[0]);
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
	}), a.handle("db:recordImportExpense", (e, t, n) => Ct(t, n)), a.handle("db:importExcel", (e, t) => At(t)), a.handle("db:copyImage", (e, t) => at(t)), a.handle("db:deleteBaseStock", (e, t, n) => Ot(t, n)), a.handle("db:deleteVariant", (e, t) => kt(t)), a.handle("db:getTopProducts", (e, t) => bt(t)), a.handle("db:getTopCustomers", (e, t) => xt(t)), a.handle("dialog:pickImage", async () => {
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
	}), Mt();
}), r.on("window-all-closed", () => {
	process.platform !== "darwin" && r.quit();
}), r.on("activate", () => {
	t.getAllWindows().length === 0 && Mt();
});
//#endregion
export {};
