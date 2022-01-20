"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logs = void 0;
const prisma_1 = require("../lib/prisma");
const logs = () => prisma_1.prisma.$use(async (params, next) => {
    const result = await next(params);
    const { action, model } = params;
    if (model !== 'Logs') {
        if (!action.startsWith('find')) {
            const operation = `${model} was ${action}`;
            await prisma_1.prisma.logs.create({ data: { operation } });
        }
    }
    return result;
});
exports.logs = logs;
//# sourceMappingURL=logs.js.map