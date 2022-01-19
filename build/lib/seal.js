"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unseal = exports.seal = void 0;
const iron_session_1 = require("iron-session");
const password = process.env.MAGIC_LINK;
const seal = async (data) => (0, iron_session_1.sealData)(data, { password });
exports.seal = seal;
const unseal = async (data) => (0, iron_session_1.unsealData)(data, { password });
exports.unseal = unseal;
//# sourceMappingURL=seal.js.map