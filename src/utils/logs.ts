import { prisma } from "@lib/prisma";

export const logs = () => prisma.$use(async (params, next: (arg0: any) => any) => {
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