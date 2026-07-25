import Homepage_Header from "@/components/Homepage-Header";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"
import WorkspaceCard from "@/components/workspacecard";
import WorkspaceForm from "@/components/WorkspaceForm";
import TitleBar from "@/components/Title-Bar";

export default async function Workspace() {

  await auth.protect();
  const { userId } = await auth();
  // const workspaces = await prisma.workspace.findMany({
  //     where: {
  //         memberships : {
  //             some: {
  //                 userId: userId!
  //             }
  //         }
  //     },

  //     include: {
  //         _count: {
  //             select: {
  //                 memberships: true,
  //                 tasks: true,
  //             }
  //         }
  //     },
  // })
  const workspaces = [
    {
      id: "ws_001",
      name: "Personal",
      ownerId: "user_123",
      createdAt: new Date("2026-07-01"),
      updatedAt: new Date("2026-07-20"),
      _count: {
        memberships: 1,
        tasks: 12,
      },
    },
    {
      id: "ws_002",
      name: "College Project",
      ownerId: "user_123",
      createdAt: new Date("2026-07-03"),
      updatedAt: new Date("2026-07-22"),
      _count: {
        memberships: 5,
        tasks: 31,
      },
    },
    {
      id: "ws_003",
      name: "Photography Portfolio Full Stack Web Development RoadmapFull Stack Web Development RoadmapFull Stack Web Development RoadmapFull Stack Web Development Roadmap",
      ownerId: "user_123",
      createdAt: new Date("2026-07-06"),
      updatedAt: new Date("2026-07-24"),
      _count: {
        memberships: 3,
        tasks: 8,
      },
    },
    {
      id: "ws_004",
      name: "DSA Practice",
      ownerId: "user_123",
      createdAt: new Date("2026-07-08"),
      updatedAt: new Date("2026-07-21"),
      _count: {
        memberships: 1,
        tasks: 54,
      },
    },
    {
      id: "ws_005",
      name: "Open Source Contributions",
      ownerId: "user_123",
      createdAt: new Date("2026-07-10"),
      updatedAt: new Date("2026-07-23"),
      _count: {
        memberships: 12,
        tasks: 97,
      },
    },
    {
      id: "ws_006",
      name: "Startup Ideas",
      ownerId: "user_123",
      createdAt: new Date("2026-07-12"),
      updatedAt: new Date("2026-07-19"),
      _count: {
        memberships: 4,
        tasks: 19,
      },
    },
    {
      id: "ws_007",
      name: "Travel Planner",
      ownerId: "user_123",
      createdAt: new Date("2026-07-14"),
      updatedAt: new Date("2026-07-23"),
      _count: {
        memberships: 2,
        tasks: 26,
      },
    },
    {
      id: "ws_008",
      name: "Full Stack Web Development Roadmap",
      ownerId: "user_123",
      createdAt: new Date("2026-07-15"),
      updatedAt: new Date("2026-07-24"),
      _count: {
        memberships: 27,
        tasks: 143,
      },
    },
  ];

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