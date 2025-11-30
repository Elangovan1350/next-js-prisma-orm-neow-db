import axios from "axios";

export default async function Home() {
  const response = await axios.get(`${process.env.URL}/api/users`);
  const data = response.data;
  // console.log("Fetched users:", data);
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Next.js + Prisma ORM</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
