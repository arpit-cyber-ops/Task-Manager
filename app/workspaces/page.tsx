import Homepage_Header from "@/components/workspace/Homepage-Header";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"
import WorkspaceCard from "@/components/workspace/workspacecard";
import TitleBar from "@/components/workspace/Title-Bar";

export default async function Workspace() {

  await auth.protect();
  const { userId } = await auth();
  const workspaces = await prisma.workspace.findMany({
    where: {
      memberships: {
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
    <div className="min-h-screen bg-muted/30">

      <Homepage_Header />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        <TitleBar />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

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