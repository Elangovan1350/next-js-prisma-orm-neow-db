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

  try {
    // creating new users
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
  } catch (error) {
    // Check if user already exists
    const exetingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exetingUser) {
      return new Response("User already exists", { status: 409 });
    }
    console.error("Error creating user:", error);
    return new Response("Error creating user", { status: 500 });
  }
}
