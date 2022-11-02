import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

const prisma = new PrismaClient();

async function main() {
    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            avatarUrl: 'https://github.com/LuisFelipeAP.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: code,
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-12T12:00:00.043Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 1,
                    secondTeamPoints: 7,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-13T12:00:00.043Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
        }
    })

}

main();
