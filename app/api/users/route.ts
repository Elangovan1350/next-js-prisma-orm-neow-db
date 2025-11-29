import { prisma } from "@/lib/prismaconnect";

export async function GET() {
  const user = await prisma.user.findMany();

  return Response.json(
    { data: user, message: "Users retrieved successfully" },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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

    return Response.json(
      { data: newUser, message: "User created successfully" },
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // Check if user already exists
    const exetingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exetingUser) {
      return Response.json({ message: "User already exists" }, { status: 200 });
    }
    console.error("Error creating user:", error);
    return Response.json({ message: "Error creating user" }, { status: 500 });
  }
}
