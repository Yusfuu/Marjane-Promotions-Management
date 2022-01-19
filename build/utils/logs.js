"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = void 0;
const { prisma } = require("../../prisma/client");
const logs = () => prisma.$use(async (params, next) => {
    const result = await next(params);
    const { action, model } = params;
    if (model !== 'Logs') {
        if (!action.startsWith('find')) {
            const operation = `${model} was ${action}`;
            await prisma.logs.create({ data: { operation } });
        }
    }
    return result;
});
exports.logs = logs;
//# sourceMappingURL=logs.js.map