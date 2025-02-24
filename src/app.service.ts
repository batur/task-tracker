import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async getHello() {
    const val = await prisma.post.findMany({
      take: 10,
    });
    console.log(val);
    return val;
  }
}
