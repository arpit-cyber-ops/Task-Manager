import { auth } from "@clerk/nextjs/server";

export default async function App() {

  await auth.protect();

  return (
    <div>
      DashBoard
    </div>
  )
}
