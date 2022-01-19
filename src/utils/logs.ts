const { prisma } = require("../../prisma/client");

export const logs = () => prisma.$use(async (params: { action: any; model: any; }, next: (arg0: any) => any) => {
  const result = await next(params)
  const { action, model } = params;

  if (model !== 'Logs') {
    if (!action.startsWith('find')) {
      const operation = `${model} was ${action}`;
      await prisma.logs.create({ data: { operation } });
    }
  }

  return result;
});