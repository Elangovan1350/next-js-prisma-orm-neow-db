import { prisma } from "@/lib/prismaconnect";

export async function GET() {
  const user = await prisma.user.findMany();

  return new Response(JSON.stringify(user), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name } = body;
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
