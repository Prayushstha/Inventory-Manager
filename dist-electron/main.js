import { createRequire as e } from "node:module";
import { BrowserWindow as t, app as n, dialog as r, ipcMain as i, net as a, protocol as o } from "electron";
import { fileURLToPath as s, pathToFileURL as c } from "url";
import l from "path";
import u from "fs";
import { createRequire as d } from "module";
import { randomUUID as f } from "crypto";
//#region \0rolldown/runtime.js
var p = Object.create, m = Object.defineProperty, h = Object.getOwnPropertyDescriptor, g = Object.getOwnPropertyNames, _ = Object.getPrototypeOf, v = Object.prototype.hasOwnProperty, y = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), b = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = g(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !v.call(e, s) && s !== n && m(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = h(t, s)) || r.enumerable
	});
	return e;
}, x = (e, t, n) => (n = e == null ? {} : p(_(e)), b(t || !e || !e.__esModule ? m(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), S = /* @__PURE__ */ e(import.meta.url), C = /* @__PURE__ */ y(((e) => {
	e.getBooleanOption = (e, t) => {
		let n = !1;
		if (t in e && typeof (n = e[t]) != "boolean") throw TypeError(`Expected the "${t}" option to be a boolean`);
		return n;
	}, e.cppdb = Symbol(), e.inspect = Symbol.for("nodejs.util.inspect.custom");
})), w = /* @__PURE__ */ y(((e, t) => {
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
})), ee = /* @__PURE__ */ y(((e, t) => {
	var n = S("path").sep || "/";
	t.exports = r;
	function r(e) {
		if (typeof e != "string" || e.length <= 7 || e.substring(0, 7) != "file://") throw TypeError("must pass in a file:// URI to convert to a file path");
		var t = decodeURI(e.substring(7)), r = t.indexOf("/"), i = t.substring(0, r), a = t.substring(r + 1);
		return i == "localhost" && (i = ""), i &&= n + n + i, a = a.replace(/^(.+)\|/, "$1:"), n == "\\" && (a = a.replace(/\//g, "\\")), /^.+\:/.test(a) || (a = n + a), i + a;
	}
})), te = /* @__PURE__ */ y(((e, t) => {
	var n = S("fs"), r = S("path"), i = ee(), a = r.join, o = r.dirname, s = n.accessSync && function(e) {
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
		for (var n = typeof __webpack_require__ == "function" ? __non_webpack_require__ : S, i = [], o = 0, s = t.try.length, l, u, d; o < s; o++) {
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
})), ne = /* @__PURE__ */ y(((e) => {
	var { cppdb: t } = C();
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
})), re = /* @__PURE__ */ y(((e, t) => {
	var { cppdb: n } = C(), r = /* @__PURE__ */ new WeakMap();
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
})), ie = /* @__PURE__ */ y(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = C();
	t.exports = function(e, t) {
		if (t ??= {}, typeof e != "string") throw TypeError("Expected first argument to be a string");
		if (typeof t != "object") throw TypeError("Expected second argument to be an options object");
		let i = n(t, "simple"), a = this[r].prepare(`PRAGMA ${e}`, this, !0);
		return i ? a.pluck().get() : a.all();
	};
})), ae = /* @__PURE__ */ y(((e, t) => {
	var n = S("fs"), r = S("path"), { promisify: i } = S("util"), { cppdb: a } = C(), o = i(n.access);
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
})), oe = /* @__PURE__ */ y(((e, t) => {
	var { cppdb: n } = C();
	t.exports = function(e) {
		if (e ??= {}, typeof e != "object") throw TypeError("Expected first argument to be an options object");
		let t = "attached" in e ? e.attached : "main";
		if (typeof t != "string") throw TypeError("Expected the \"attached\" option to be a string");
		if (!t) throw TypeError("The \"attached\" option cannot be an empty string");
		return this[n].serialize(t);
	};
})), se = /* @__PURE__ */ y(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = C();
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
})), T = /* @__PURE__ */ y(((e, t) => {
	var { getBooleanOption: n, cppdb: r } = C();
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
})), E = /* @__PURE__ */ y(((e, t) => {
	var { cppdb: n } = C();
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
})), D = /* @__PURE__ */ y(((e, t) => {
	var n = function() {};
	t.exports = function(e, t) {
		return Object.assign(new n(), this);
	};
})), O = /* @__PURE__ */ y(((e, t) => {
	var n = S("fs"), r = S("path"), i = C(), a = w(), o;
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
		if (_ = g == null ? o ||= te()("better_sqlite3.node") : typeof g == "string" ? (typeof __non_webpack_require__ == "function" ? __non_webpack_require__ : S)(r.resolve(g).replace(/(\.node)?$/, ".node")) : g, _.isInitialized || (_.setErrorConstructor(a), _.isInitialized = !0), !d && !u.startsWith("file:") && !n.existsSync(r.dirname(u))) throw TypeError("Cannot open database because the directory does not exist");
		Object.defineProperties(this, {
			[i.cppdb]: { value: new _.Database(u, e, d, f, p, m, h || null, l || null) },
			...c.getters
		});
	}
	var c = ne();
	s.prototype.prepare = c.prepare, s.prototype.transaction = re(), s.prototype.pragma = ie(), s.prototype.backup = ae(), s.prototype.serialize = oe(), s.prototype.function = se(), s.prototype.aggregate = T(), s.prototype.table = E(), s.prototype.loadExtension = c.loadExtension, s.prototype.exec = c.exec, s.prototype.close = c.close, s.prototype.defaultSafeIntegers = c.defaultSafeIntegers, s.prototype.unsafeMode = c.unsafeMode, s.prototype[i.inspect] = D(), t.exports = s;
})), k = /* @__PURE__ */ x((/* @__PURE__ */ y(((e, t) => {
	t.exports = O(), t.exports.SqliteError = w();
})))(), 1), A = d(import.meta.url)("xlsx"), j = l.dirname(s(import.meta.url)), M = new k.default(n.isPackaged ? l.join(n.getPath("userData"), "inventory.db") : l.join(j, "../", "Database", "inventory.db"));
M.exec("\n  CREATE TABLE IF NOT EXISTS products (\n    id TEXT PRIMARY KEY,\n    name TEXT NOT NULL, \n    images TEXT\n  );\n\n  CREATE TABLE IF NOT EXISTS variants (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    product_id TEXT NOT NULL,\n    bucket_size REAL NOT NULL,\n    landing REAL,\n    sales REAL,\n    mp REAL,\n    FOREIGN KEY (product_id) REFERENCES products(id)\n  );\n\n  CREATE TABLE IF NOT EXISTS bases (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    product_id TEXT NOT NULL,\n    name TEXT NOT NULL,\n    FOREIGN KEY (product_id) REFERENCES products(id)\n  );\n\n  CREATE TABLE IF NOT EXISTS base_stock (\n    base_id INTEGER NOT NULL,\n    variant_id INTEGER NOT NULL,\n    stock REAL NOT NULL DEFAULT 0,\n    PRIMARY KEY (base_id, variant_id),\n    FOREIGN KEY (base_id) REFERENCES bases(id),\n    FOREIGN KEY (variant_id) REFERENCES variants(id)\n  );\n  CREATE TABLE IF NOT EXISTS customers (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    name TEXT NOT NULL,\n    phone TEXT,\n    address TEXT\n  );\n  CREATE TABLE IF NOT EXISTS expense_items (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  expense_id INTEGER NOT NULL,\n  product_name TEXT NOT NULL,\n  base TEXT,\n  bucket_size REAL,\n  quantity REAL NOT NULL,\n  cost_price REAL NOT NULL,\n  FOREIGN KEY (expense_id) REFERENCES expenses(id)\n);\n  CREATE TABLE IF NOT EXISTS bills (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    customer_id INTEGER NOT NULL,\n    date TEXT NOT NULL,\n    payment_method TEXT,\n    total_purchased REAL NOT NULL,\n    amount_paid REAL NOT NULL,\n    amount_due REAL NOT NULL,\n    status TEXT NOT NULL,\n    FOREIGN KEY (customer_id) REFERENCES customers(id)\n  );\n\n  CREATE TABLE IF NOT EXISTS bill_items (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    bill_id INTEGER NOT NULL,\n    product_name TEXT NOT NULL,\n    base TEXT,\n    bucket_size REAL,\n    quantity REAL NOT NULL,\n    price_at_sale REAL NOT NULL,\n    FOREIGN KEY (bill_id) REFERENCES bills(id)\n  );\n"), M.prepare("PRAGMA table_info(bill_items)").all().some((e) => e.name === "cost_price") || M.exec("ALTER TABLE bill_items ADD COLUMN cost_price REAL DEFAULT 0"), M.exec("\n  CREATE TABLE IF NOT EXISTS expenses (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    date TEXT NOT NULL,\n    label TEXT NOT NULL,\n    amount REAL NOT NULL,\n    type TEXT DEFAULT 'General'\n  );\n");
function N(e) {
	let { id: t, name: n, images: r, variants: i, bases: a } = e;
	M.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(t, n, r);
	for (let e of i) M.prepare("\n      INSERT INTO variants (product_id, bucket_size, rate, tax_bucket, scheme, after_scheme, after_trade, net_value, vat, with_vat, sales, mp)\n      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ").run(t, e.bucket_size, e.rate, e.tax_bucket, e.scheme, e.after_scheme, e.after_trade, e.net_value, e.vat, e.with_vat, e.sales, e.mp);
	for (let e of a) {
		let n = M.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(t, e.name).lastInsertRowid;
		for (let r = 0; r < e.stocks.length; r++) {
			let i = M.prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?").get(t, r);
			M.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(n, i.id, e.stocks[r]);
		}
	}
}
function P() {
	let e = M.prepare("SELECT * FROM products").all();
	for (let t of e) {
		t.variants = M.prepare("SELECT * FROM variants WHERE product_id = ?").all(t.id);
		let e = M.prepare("SELECT * FROM bases WHERE product_id = ?").all(t.id);
		for (let n of e) {
			let e = M.prepare("SELECT variant_id, stock FROM base_stock WHERE base_id = ?").all(n.id);
			n.stockMap = {};
			for (let t of e) n.stockMap[t.variant_id] = t.stock;
			n.stocks = t.variants.map((e) => n.stockMap[e.id] ?? 0);
		}
		t.bases = e;
	}
	return e;
}
function F(e) {
	let t = M.prepare("SELECT id FROM variants WHERE product_id = ?").all(e), n = M.prepare("SELECT id FROM bases WHERE product_id = ?").all(e);
	for (let e of t) M.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(e.id);
	for (let e of n) M.prepare("DELETE FROM base_stock WHERE base_id = ?").run(e.id);
	M.prepare("DELETE FROM variants WHERE product_id = ?").run(e), M.prepare("DELETE FROM bases WHERE product_id = ?").run(e), M.prepare("DELETE FROM products WHERE id = ?").run(e);
}
function I(e, t) {
	let { name: n, images: r, variants: i, bases: a } = t;
	M.prepare("UPDATE products SET name = ?, images = ? WHERE id = ?").run(n, r, e), M.prepare("DELETE FROM variants WHERE product_id = ?").run(e);
	for (let t of i) M.prepare("\n      INSERT INTO variants (product_id, bucket_size, rate, tax_bucket, scheme, after_scheme, after_trade, net_value, vat, with_vat, sales, mp)\n      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\n    ").run(e, t.bucket_size, t.rate, t.tax_bucket, t.scheme, t.after_scheme, t.after_trade, t.net_value, t.vat, t.with_vat, t.sales, t.mp);
	let o = M.prepare("SELECT id FROM bases WHERE product_id = ?").all(e);
	for (let e of o) M.prepare("DELETE FROM base_stock WHERE base_id = ?").run(e.id);
	M.prepare("DELETE FROM bases WHERE product_id = ?").run(e);
	for (let t of a) {
		let n = M.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(e, t.name).lastInsertRowid;
		for (let r = 0; r < t.stocks.length; r++) {
			let i = M.prepare("SELECT id FROM variants WHERE product_id = ? LIMIT 1 OFFSET ?").get(e, r);
			M.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(n, i.id, t.stocks[r]);
		}
	}
}
function L(e) {
	return M.prepare("SELECT * FROM products WHERE name = ?").get(e);
}
function R(e, t) {
	return M.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(e, t);
}
function z(e, t) {
	return M.prepare("\n    INSERT INTO variants (product_id, bucket_size, landing, sales, mp)\n    VALUES (?, ?, ?, ?, ?)\n  ").run(e, t.bucket_size, t.landing, t.sales, t.mp).lastInsertRowid;
}
function B(e, t) {
	return M.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(e, t).lastInsertRowid;
}
function V(e, t) {
	return M.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(e, t);
}
function H(e, t, n) {
	M.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(e, t, n);
}
function U(e) {
	let t = l.basename(e), r = n.isPackaged ? l.join(n.getPath("userData"), "images", "product-images") : l.join(j, "../", "Database", "images", "product-images"), i = l.join(r, t);
	return u.existsSync(r) || u.mkdirSync(r, { recursive: !0 }), u.existsSync(i) || u.copyFileSync(e, i), `images/product-images/${t}`;
}
function W(e) {
	if (!e) return null;
	let t = n.isPackaged ? n.getPath("userData") : l.join(j, "../", "Database");
	return l.join(t, e);
}
function G(e) {
	return M.prepare("\n    INSERT INTO customers (name, phone, address) VALUES (?, ?, ?)\n  ").run(e.name, e.phone, e.address).lastInsertRowid;
}
function K(e, t) {
	let n = M.prepare("\n    INSERT INTO bills (customer_id, date, payment_method, total_purchased, amount_paid, amount_due, status)\n    VALUES (?, ?, ?, ?, ?, ?, ?)\n  ").run(e, t.date, t.paymentMethod, t.totalPurchased, t.amountPaid, t.amountDue, t.status).lastInsertRowid;
	for (let e of t.products) {
		let t = X(e.productName, e.bucketSize);
		M.prepare("\n    INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n    VALUES (?, ?, ?, ?, ?, ?, ?)\n  ").run(n, e.productName, e.base, e.bucketSize, e.quantity, e.priceAtSale, t), q(e.productName, e.base, e.bucketSize, -e.quantity);
	}
	return n;
}
function ce() {
	let e = M.prepare("SELECT * FROM customers").all();
	for (let t of e) {
		let e = M.prepare("SELECT * FROM bills WHERE customer_id = ?").all(t.id);
		for (let t of e) t.products = M.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(t.id);
		t.bills = e, t.totalDue = e.reduce((e, t) => e + t.amount_due, 0);
	}
	return e;
}
function le(e) {
	let t = M.prepare("SELECT id FROM bills WHERE customer_id = ?").all(e);
	for (let e of t) M.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e.id);
	M.prepare("DELETE FROM bills WHERE customer_id = ?").run(e), M.prepare("DELETE FROM customers WHERE id = ?").run(e);
}
function ue(e) {
	let t = M.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e);
	for (let e of t) q(e.product_name, e.base, e.bucket_size, e.quantity);
	M.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e), M.prepare("DELETE FROM bills WHERE id = ?").run(e);
}
function de(e, t) {
	M.prepare("\n    UPDATE customers SET name = ?, phone = ?, address = ? WHERE id = ?\n  ").run(t.name, t.phone, t.address, e);
}
function fe(e, t) {
	M.prepare("\n    UPDATE bills SET date = ?, payment_method = ?, total_purchased = ?, amount_paid = ?, amount_due = ?, status = ?\n    WHERE id = ?\n  ").run(t.date, t.paymentMethod, t.totalPurchased, t.amountPaid, t.amountDue, t.status, e), M.prepare("DELETE FROM bill_items WHERE bill_id = ?").run(e);
	for (let n of t.products) {
		let t = X(n.productName, n.bucketSize);
		M.prepare("\n    INSERT INTO bill_items (bill_id, product_name, base, bucket_size, quantity, price_at_sale, cost_price)\n    VALUES (?, ?, ?, ?, ?, ?, ?)\n  ").run(e, n.productName, n.base, n.bucketSize, n.quantity, n.priceAtSale, t);
	}
}
function q(e, t, n, r) {
	let i = e ? String(e).trim() : "", a = t ? String(t).trim() : "", o = parseFloat(n) || 0, s = M.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(i);
	if (!s) return;
	let c = M.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(s.id, o);
	if (!c) return;
	let l = M.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(s.id, a);
	l && M.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(r, l.id, c.id);
}
function pe(e) {
	return M.prepare("INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)").run(e.date, e.nameOfExpense, e.amountOfExpense, e.typeOfExpense).lastInsertRowid;
}
function me() {
	return M.prepare("SELECT * FROM expenses ORDER BY date DESC").all().map((e) => ({
		id: e.id,
		date: e.date,
		nameOfExpense: e.label,
		typeOfExpense: e.type,
		amountOfExpense: e.amount
	}));
}
function he(e) {
	let t = M.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(e);
	for (let e of t) Y(e);
	M.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(e), M.prepare("DELETE FROM expenses WHERE id = ?").run(e);
}
function ge() {
	let e = M.prepare("SELECT * FROM bills").all(), t = {};
	return e.map((e) => {
		let n = M.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id), r = M.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		if (!(e.customer_id in t)) {
			let n = M.prepare("SELECT amount_due FROM bills WHERE customer_id = ?").all(e.customer_id);
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
function _e(e) {
	let t = /* @__PURE__ */ new Date(), n;
	if (e === "yearly") n = `${t.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = t.getDay(), r = t.getDate() - e + (e === 0 ? -6 : 1);
		n = new Date(t.getFullYear(), t.getMonth(), r).toISOString().slice(0, 10);
	} else n = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-01`;
	let r = M.prepare("SELECT * FROM bills WHERE date >= ?").all(n), i = 0, a = 0, o = 0, s = {};
	for (let e of r) {
		let t = M.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
		i += e.total_purchased, a += t.reduce((e, t) => e + (t.cost_price || 0) * t.quantity, 0), o += e.amount_due;
		for (let e of t) s[e.product_name] = (s[e.product_name] || 0) + e.quantity;
	}
	let c = i - a, l = M.prepare("SELECT * FROM expenses WHERE date >= ?").all(n), u = l.reduce((e, t) => e + t.amount, 0), d = "-", f = 0;
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
function ve(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = M.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = M.prepare("SELECT * FROM bill_items WHERE bill_id = ?").all(e.id);
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
function ye(e, t = 5) {
	let n = /* @__PURE__ */ new Date(), r;
	if (e === "yearly") r = `${n.getFullYear()}-01-01`;
	else if (e === "weekly") {
		let e = n.getDay(), t = n.getDate() - e + (e === 0 ? -6 : 1);
		r = new Date(n.getFullYear(), n.getMonth(), t).toISOString().slice(0, 10);
	} else r = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-01`;
	let i = M.prepare("SELECT * FROM bills WHERE date >= ?").all(r), a = {};
	for (let e of i) {
		let t = M.prepare("SELECT * FROM customers WHERE id = ?").get(e.customer_id);
		t && (a[t.id] || (a[t.id] = {
			name: t.name,
			orders: 0,
			spend: 0
		}), a[t.id].orders += 1, a[t.id].spend += e.total_purchased);
	}
	return Object.values(a).sort((e, t) => t.spend - e.spend).slice(0, t);
}
function J(e) {
	let t = e.productName ? String(e.productName).trim() : "", n = e.base ? String(e.base).trim() : "", r = parseFloat(e.bucketSize) || 0, i = parseFloat(e.quantity) || 0, a = parseFloat(e.costPrice) || 0, o = M.prepare("SELECT * FROM products WHERE TRIM(name) = TRIM(?) COLLATE NOCASE").get(t), s;
	o ? s = o.id : (s = f(), M.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(s, t, ""));
	let c = M.prepare("SELECT * FROM variants WHERE product_id = ? AND ABS(bucket_size - ?) < 0.001").get(s, r), l;
	c ? (l = c.id, M.prepare("UPDATE variants SET landing = ? WHERE id = ?").run(a, l)) : l = M.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(s, r, a, 0, 0).lastInsertRowid;
	let u = M.prepare("SELECT * FROM bases WHERE product_id = ? AND TRIM(name) = TRIM(?) COLLATE NOCASE").get(s, n), d;
	d = u ? u.id : M.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(s, n).lastInsertRowid, M.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(d, l) ? M.prepare("UPDATE base_stock SET stock = stock + ? WHERE base_id = ? AND variant_id = ?").run(i, d, l) : M.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, ?)").run(d, l, i);
}
function Y(e) {
	q(e.product_name, e.base, e.bucket_size, -e.quantity);
}
function be(e, t) {
	let n = t.reduce((e, t) => e + (parseFloat(t.costPrice) || 0) * (parseFloat(t.quantity) || 0), 0), r;
	return M.transaction(() => {
		for (let e of t) J(e);
		r = M.prepare("INSERT INTO expenses (date, label, amount, type) VALUES (?, ?, ?, ?)").run(e.date, e.nameOfExpense, n, "Import").lastInsertRowid;
		for (let e of t) M.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(r, e.productName, e.base, Number(e.bucketSize), parseFloat(e.quantity), parseFloat(e.costPrice));
	})(), {
		id: r,
		totalCost: n
	};
}
function xe(e, t, n) {
	let r = M.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(e), i = n.reduce((e, t) => e + (parseFloat(t.costPrice) || 0) * (parseFloat(t.quantity) || 0), 0);
	return M.transaction(() => {
		for (let e of r) Y(e);
		M.prepare("DELETE FROM expense_items WHERE expense_id = ?").run(e);
		for (let t of n) J(t), M.prepare("\n        INSERT INTO expense_items (expense_id, product_name, base, bucket_size, quantity, cost_price)\n        VALUES (?, ?, ?, ?, ?, ?)\n      ").run(e, t.productName, t.base, Number(t.bucketSize), parseFloat(t.quantity), parseFloat(t.costPrice));
		M.prepare("UPDATE expenses SET date = ?, label = ?, amount = ? WHERE id = ?").run(t.date, t.nameOfExpense, i, e);
	})(), i;
}
function Se(e, t) {
	M.prepare("UPDATE expenses SET date = ?, label = ?, amount = ?, type = ? WHERE id = ?").run(t.date, t.nameOfExpense, t.amountOfExpense, t.typeOfExpense, e);
}
function Ce(e) {
	let t = M.prepare("SELECT * FROM expenses WHERE id = ?").get(e);
	if (!t) return null;
	let n = M.prepare("SELECT * FROM expense_items WHERE expense_id = ?").all(e);
	return {
		id: t.id,
		date: t.date,
		nameOfExpense: t.label,
		typeOfExpense: t.type,
		amountOfExpense: t.amount,
		items: n.map((e) => ({
			productName: e.product_name,
			base: e.base,
			bucketSize: e.bucket_size,
			quantity: e.quantity,
			costPrice: e.cost_price
		}))
	};
}
function X(e, t) {
	let n = M.prepare("SELECT * FROM products WHERE name = ?").get(e);
	if (!n) return 0;
	let r = M.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(n.id, t);
	return r ? r.landing : 0;
}
function we(e, t) {
	M.prepare("DELETE FROM base_stock WHERE base_id = ? AND variant_id = ?").run(e, t);
}
function Te(e) {
	M.prepare("DELETE FROM base_stock WHERE variant_id = ?").run(e), M.prepare("DELETE FROM variants WHERE id = ?").run(e);
}
function Z(e) {
	let t = A.readFile(e).Sheets["JESTH- 2083"];
	if (!t) throw Error("Sheet \"JESTH- 2083\" not found in this file.");
	let n = A.utils.sheet_to_json(t, {
		header: 1,
		range: 1
	}), r = /^([A-Za-z]+)((?:\d+)(?:\/\d+)*)$/, i = /^([A-Za-z]+?)(I{1,3}|IV)$/, a = new Set([
		1,
		4,
		10,
		20
	]);
	function o(e) {
		return e.split(" ").map((e) => e && e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
	}
	function s(e) {
		let t = parseFloat(e);
		return isNaN(t) ? null : t;
	}
	function c(e) {
		if (!e) return [null, []];
		let t = String(e).trim();
		if (t.toUpperCase().startsWith("PGE")) {
			let e = t.slice(3).trim(), n = r.exec(e), a = i.exec(e);
			if (n) {
				let e = n[1];
				return ["Enamel", n[2].split("/").map((t) => e + t)];
			} else if (a) return ["Enamel", [e]];
			else return [`Enamel ${o(e)}`.trim(), []];
		}
		let n = t.split(" "), a, s;
		n.length >= 2 ? (s = n[n.length - 1], a = n.slice(0, -1).join(" ")) : (a = t, s = "");
		let c = r.exec(s);
		if (c) {
			let e = c[1], t = c[2].split("/");
			return [o(a.trim()), t.map((t) => e + t)];
		}
		return [o(t), []];
	}
	let l = [], u, d = [], p = !1;
	for (let e of n) {
		let t = e[0];
		!p || t !== u ? (p && l.push([u, d]), u = t, d = [e], p = !0) : d.push(e);
	}
	p && l.push([u, d]);
	let m = {};
	for (let [e, t] of l) {
		let [n, r] = c(e);
		if (!n) continue;
		m[n] || (m[n] = {
			bases: [],
			variants: {},
			canonicalSet: !1
		});
		let i = m[n];
		for (let e of r) i.bases.includes(e) || i.bases.push(e);
		if (!i.canonicalSet && t.some((e) => s(e[17]) !== null && s(e[14]) !== null)) {
			for (let e of t) {
				let t = e[1];
				if (a.has(t)) {
					let n = s(e[17]), r = s(e[14]), a = s(e[13]);
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
	return M.transaction(() => {
		for (let [e, t] of Object.entries(m)) {
			let n = Object.keys(t.variants);
			if (n.length === 0) {
				g++;
				continue;
			}
			let r = M.prepare("SELECT * FROM products WHERE name = ?").get(e), i;
			r ? i = r.id : (i = f(), M.prepare("INSERT INTO products (id, name, images) VALUES (?, ?, ?)").run(i, e, ""));
			let a = {};
			for (let e of n) {
				let n = t.variants[e], r = M.prepare("SELECT * FROM variants WHERE product_id = ? AND bucket_size = ?").get(i, Number(e));
				r ? a[e] = r.id : a[e] = M.prepare("INSERT INTO variants (product_id, bucket_size, landing, sales, mp) VALUES (?, ?, ?, ?, ?)").run(i, Number(e), n.landing, n.sales, n.mp).lastInsertRowid;
			}
			for (let e of t.bases) {
				let t = M.prepare("SELECT * FROM bases WHERE product_id = ? AND name = ?").get(i, e), r;
				r = t ? t.id : M.prepare("INSERT INTO bases (product_id, name) VALUES (?, ?)").run(i, e).lastInsertRowid;
				for (let e of n) {
					let t = a[e];
					M.prepare("SELECT * FROM base_stock WHERE base_id = ? AND variant_id = ?").get(r, t) || M.prepare("INSERT INTO base_stock (base_id, variant_id, stock) VALUES (?, ?, 0)").run(r, t);
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
var Q = l.dirname(s(import.meta.url));
function $() {
	let e = new t({
		width: 1200,
		height: 800,
		webPreferences: { preload: l.join(Q, "preload.cjs") }
	});
	process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(l.join(Q, "../dist/index.html"));
}
o.registerSchemesAsPrivileged([{
	scheme: "app-image",
	privileges: {
		standard: !0,
		secure: !0,
		supportFetchAPI: !0,
		stream: !0
	}
}]), n.whenReady().then(() => {
	o.handle("app-image", (e) => {
		try {
			let t = new URL(e.url).searchParams.get("path");
			if (!t) throw Error("No path provided");
			let n = c(t).href;
			return a.fetch(n);
		} catch (t) {
			return console.error("app-image protocol error:", t.message, e.url), new Response("Not found", { status: 404 });
		}
	}), i.handle("db:addProduct", (e, t) => N(t)), i.handle("db:getProducts", () => P()), i.handle("db:deleteProduct", (e, t) => F(t)), i.handle("db:editProduct", (e, t, n) => I(t, n)), i.handle("db:addExpense", (e, t) => pe(t)), i.handle("db:getExpenses", () => me()), i.handle("db:deleteExpense", (e, t) => he(t)), i.handle("db:getSales", () => ge()), i.handle("db:getNetPosition", (e, t) => _e(t)), i.handle("db:getProductByName", (e, t) => L(t)), i.handle("db:getVariantBySize", (e, t, n) => R(t, n)), i.handle("db:addVariant", (e, t, n) => z(t, n)), i.handle("db:addBase", (e, t, n) => B(t, n)), i.handle("db:addBaseStock", (e, t, n, r) => H(t, n, r)), i.handle("db:getBaseByName", (e, t, n) => V(t, n)), i.handle("db:addCustomer", (e, t) => G(t)), i.handle("db:addBill", (e, t, n) => K(t, n)), i.handle("db:editCustomer", (e, t, n) => de(t, n)), i.handle("db:getExpenseDetails", (e, t) => Ce(t)), i.handle("db:editExpense", (e, t, n) => Se(t, n)), i.handle("db:editImportExpense", (e, t, n, r) => xe(t, n, r)), i.handle("db:editBill", (e, t, n) => fe(t, n)), i.handle("db:getCustomers", () => ce()), i.handle("db:deleteCustomer", (e, t) => le(t)), i.handle("db:deleteBill", (e, t) => ue(t)), i.handle("db:resolveImagePath", (e, t) => W(t)), i.handle("dialog:pickExcelFile", async () => {
		let e = await r.showOpenDialog({
			properties: ["openFile"],
			filters: [{
				name: "Excel Files",
				extensions: ["xlsx", "xls"]
			}]
		});
		return e.canceled || e.filePaths.length === 0 ? null : e.filePaths[0];
	}), i.handle("db:recordImportExpense", (e, t, n) => be(t, n)), i.handle("db:importExcel", (e, t) => Z(t)), i.handle("db:copyImage", (e, t) => U(t)), i.handle("db:deleteBaseStock", (e, t, n) => we(t, n)), i.handle("db:deleteVariant", (e, t) => Te(t)), i.handle("db:getTopProducts", (e, t) => ve(t)), i.handle("db:getTopCustomers", (e, t) => ye(t)), i.handle("dialog:pickImage", async () => {
		let e = await r.showOpenDialog({
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
}), n.on("window-all-closed", () => {
	process.platform !== "darwin" && n.quit();
}), n.on("activate", () => {
	t.getAllWindows().length === 0 && $();
});
//#endregion
export {};
