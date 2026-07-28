import Homepage_Header from "@/components/Homepage-Header";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"
import WorkspaceCard from "@/components/workspacecard";
import TitleBar from "@/components/Title-Bar";

export default async function Workspace() {

  await auth.protect();
  const { userId } = await auth();
  const workspaces = await prisma.workspace.findMany({
      where: {
          memberships : {
              some: {
                  userId: userId!
              }
          }
      },

      include: {
          _count: {
              select: {
                  memberships: true,
                  tasks: true,
              }
          },
          memberships: {
            where: {
              userId: userId!,
            },
            select: {
              role: true,
            }
          },
      },
  });

  return (
    <div className="bg-violet-400">

      <Homepage_Header />

      <div className="flex flex-col gap-2">

        <TitleBar />

        <div className="grid grid-cols-4 gap-6 p-4">

          {
            workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace} />
            ))
          }

        </div>

      </div>

    </div>
  )
}