export default async function Home() {
  const response = await fetch(`${process.env.URL}/api/users`);
  const data = await response.json();
  console.log("Fetched users:", data);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Next.js + Prisma ORM</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
