"use server";

import prisma from "@/lib/db";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"

type setToolsToGroupProp = {
  asset: string;
  groupId: string[] | null;
}
export async function setToolsToGroup({ asset, groupId }: setToolsToGroupProp) {
  try {
    const assetData = await prisma.toolsData.findUnique({
      where: {
        asset: asset
      }
    })
    if (!assetData) return ({ status: 404, message: "ไม่พบข้อมูล", });

    if (groupId === null) {
      await prisma.toolsData.update({
        where: {
          asset: asset
        },
        data: {
          assetCustomList: {
            deleteMany: {},
          }
        }
      })
      return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });
    }


    const update = await prisma.toolsData.update({
      where: {
        asset: asset
      },
      data: {
        assetCustomList: {
          deleteMany: {},
          create: groupId.map((id) => ({
            assetCustomListId: Number(id),
          })),
        }
      },
      include: {
        assetCustomList: true
      }
    });

    if (!update) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}

















export type toolslist = {
  id: number;
  name: string;
}

export type UserOptions = {
  groupTools?: toolslist[];
  [key: string]: unknown;
};

export async function addGroupToolsTOuser(id: number) {
  const session = await getServerSession(options);
  if (!session) {
    return { status: 401 };
  }

  const assetCustomList = await prisma.assetCustomList.findUnique({
    where: {
      assetCustomListId: id,
    },
  });

  if (!assetCustomList) {
    return { status: 404, message: "Asset not found" };
  }

  const user = await prisma.person.findUnique({
    where: {
      id_no: String(session.user.email),
    },
  });

  if (!user) {
    return { status: 404, message: "User not found" };
  }



  const existingOptions = (user.options as UserOptions | null) ?? {};
  const existingGroupTools = Array.isArray(existingOptions.groupTools)
    ? existingOptions.groupTools
    : [];

  // เช็กว่ามี id นี้อยู่แล้วหรือยัง
  const isAlreadyExist = existingGroupTools.some(
    (tool: toolslist) => tool.id === assetCustomList.assetCustomListId
  );

  if (isAlreadyExist) {
    return { status: 409, message: "This groupTool already exists in user's options." };
  }

  // ถ้ายังไม่มี -> เพิ่มเข้าไป
  const updatedOptions = {
    ...existingOptions,
    groupTools: [
      ...existingGroupTools,
      {
        id: assetCustomList.assetCustomListId,
        name: assetCustomList.name, // หรือ field อื่นที่ต้องการ
      },
    ],
  };

  const updateUser = await prisma.person.update({
    where: {
      id_no: String(session.user.email),
    },
    data: {
      options: updatedOptions,
    },
  });

  return { status: 200, user: updateUser };
}
















export async function removeGroupToolsFromUser(id: number) {
  const session = await getServerSession(options);
  if (!session) {
    return { status: 401 };
  }

  const user = await prisma.person.findUnique({
    where: {
      id_no: String(session.user.email),
    },
  });

  if (!user) {
    return { status: 404, message: "User not found" };
  }

  // const existingOptions = user.options ?? {};
  // const existingOptions = user.options as { groupTools?: toolslist[] };
  const existingOptions = (user.options as UserOptions | null) ?? {};
  const existingGroupTools = Array.isArray(existingOptions.groupTools)
    ? existingOptions.groupTools
    : [];

  const updatedGroupTools = existingGroupTools.filter(
    (tool: toolslist) => tool.id !== id
  );

  // ถ้าไม่มีอะไรเปลี่ยนแปลง (เช่น ไม่พบ id ที่จะลบ)
  if (updatedGroupTools.length === existingGroupTools.length) {
    return { status: 404, message: "GroupTool ID not found in user's options." };
  }

  const updatedOptions = {
    ...existingOptions,
    groupTools: updatedGroupTools,
  };

  const updatedUser = await prisma.person.update({
    where: {
      id_no: String(session.user.email),
    },
    data: {
      options: updatedOptions,
    },
  });

  return { status: 200, user: updatedUser };
}







type setToolsCerProp = {
  asset: string;
  status: boolean;
}



export async function setToolsCer({ asset, status }: setToolsCerProp) {
  try {
    const assetData = await prisma.toolsData.findUnique({
      where: {
        asset: asset
      }
    })
    if (!assetData) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const update = await prisma.toolsData.update({
      where: {
        asset: asset
      },
      data: {
        hasCer: status
      },
    });

    if (!update) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}


type setToolsCerDateProp = {
  asset: string;
  date: string | null; // date can be a string or null
}


export async function setToolsCerDate({ asset, date }: setToolsCerDateProp) {
  try {
    const assetData = await prisma.toolsData.findUnique({
      where: {
        asset: asset
      }
    })
    if (!assetData) return ({ status: 404, message: "ไม่พบข้อมูล", });

    const update = await prisma.toolsData.update({
      where: {
        asset: asset
      },
      data: {
        CerDate: date ? new Date(date) : null, // Convert to Date object if date is provided
      },
    });

    if (!update) return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });

    return ({ status: 200, message: "แก้ไขข้อมูลสำเร็จ", });


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // console.log(error);
    return ({ status: 404, message: "แก้ไขข้อมูลไม่สำเร็จ", });
  }
}
